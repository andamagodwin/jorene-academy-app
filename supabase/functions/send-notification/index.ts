import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

interface WebhookPayload {
  type: "INSERT" | "UPDATE";
  table: string;
  record: any;
  old_record: any;
}

serve(async (req: Request) => {
  try {
    const payload: WebhookPayload = await req.json();

    // 1. Determine whom to notify based on the table
    let title = "";
    let body = "";
    let targetRoles: string[] = [];

    if (payload.table === "announcements" && payload.type === "INSERT") {
      title = payload.record.title;
      body = payload.record.content;
      
      if (payload.record.target_audience === "all") {
        targetRoles = ["parent", "teacher", "admin", "student"];
      } else {
        targetRoles = [payload.record.target_audience];
      }
    } else {
      // Ignore unsupported table or event types
      return new Response("Not an actionable webhook event", { status: 200 });
    }

    // Initialize Supabase Admin Client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 2. Fetch push tokens for the target audience
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("push_token")
      .in("role", targetRoles)
      .not("push_token", "is", null);

    if (error) {
      throw error;
    }

    const pushTokens = profiles
      .filter((p) => p.push_token)
      .map((p) => p.push_token);

    if (pushTokens.length === 0) {
      return new Response("No target devices found", { status: 200 });
    }

    // 3. Send out push notifications using Expo Push API
    const messages = pushTokens.map((token) => ({
      to: token,
      sound: "default",
      title: title,
      body: body,
      data: { table: payload.table, recordId: payload.record.id },
    }));

    // Expo Push API usually expects chunks of up to 100 messages, but for MVP we send directly.
    const expoResponse = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });

    const expoResult = await expoResponse.json();
    console.log("Expo push result:", expoResult);

    return new Response(JSON.stringify({ success: true, messagesSent: pushTokens.length }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
