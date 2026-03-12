import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { Icon, IconProps } from 'iconsax-react-native';
import {
  Activity,
  ArrowDown2,
  ArrowRight2,
  Award,
  Book1,
  Brodcast,
  Calculator,
  Calendar,
  Camera,
  Card,
  Chart21,
  ChemicalGlass,
  Clock,
  CloseCircle,
  ColorSwatch,
  Danger,
  Document,
  DocumentText,
  Folder,
  FolderOpen,
  Gallery,
  Global,
  Home2,
  Eye,
  Import,
  InfoCircle,
  LanguageCircle,
  Minus,
  Mobile,
  MoneyRecive,
  Musicnote,
  NotificationBing,
  NotificationStatus,
  People,
  Profile,
  ReceiptItem,
  SearchNormal1,
  Setting2,
  Star1,
  TickCircle,
  Timer1,
  TrendDown,
  TrendUp,
  Warning2,
  WalletMoney,
} from 'iconsax-react-native';

const iconMap: Record<string, Icon> = {
  'alert-circle': Danger,
  analytics: Chart21,
  book: Book1,
  calendar: Calendar,
  'calendar-outline': Calendar,
  calculator: Calculator,
  camera: Camera,
  card: Card,
  cash: MoneyRecive,
  'checkmark-circle': TickCircle,
  'chevron-down': ArrowDown2,
  'chevron-forward': ArrowRight2,
  close: CloseCircle,
  'close-circle': CloseCircle,
  construct: Setting2,
  document: Document,
  'document-outline': Document,
  'document-text': DocumentText,
  dollar: MoneyRecive,
  'download-outline': Import,
  eye: Eye,
  fitness: Activity,
  flask: ChemicalGlass,
  folder: Folder,
  'folder-open-outline': FolderOpen,
  globe: Global,
  'home-fill': Home2,
  hourglass: Timer1,
  image: Gallery,
  'information-circle': InfoCircle,
  language: LanguageCircle,
  megaphone: Brodcast,
  'megaphone-outline': Brodcast,
  'musical-notes': Musicnote,
  'notifications-off-outline': NotificationStatus,
  'notifications-outline': NotificationBing,
  people: People,
  person: Profile,
  'phone-portrait': Mobile,
  receipt: ReceiptItem,
  'remove-outline': Minus,
  search: SearchNormal1,
  star: Star1,
  time: Clock,
  'trending-down': TrendDown,
  'trending-up': TrendUp,
  trophy: Award,
  user: Profile,
  wallet: WalletMoney,
  warning: Warning2,
};

interface AppIconProps extends Omit<IconProps, 'ref'> {
  name: string;
  style?: StyleProp<ViewStyle>;
}

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  color = '#111827',
  size = 24,
  variant = 'Linear',
  style,
  ...rest
}) => {
  const IconComponent = iconMap[name] ?? InfoCircle;

  return (
    <IconComponent
      color={color}
      size={size}
      variant={variant}
      style={style}
      {...rest}
    />
  );
};