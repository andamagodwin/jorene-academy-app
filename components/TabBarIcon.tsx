import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import { StyleSheet } from 'react-native';

type TabBarIconProps = 
  | { name: React.ComponentProps<typeof FontAwesome>['name']; color: string; family?: 'fontawesome' }
  | { name: React.ComponentProps<typeof Octicons>['name']; color: string; family: 'octicons' };

export const TabBarIcon = (props: TabBarIconProps) => {
  const { family = 'fontawesome', ...rest } = props;
  
  if (family === 'octicons') {
    return <Octicons size={24} style={styles.tabBarIcon} {...rest as any} />;
  }
  
  return <FontAwesome size={28} style={styles.tabBarIcon} {...rest as any} />;
};

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
