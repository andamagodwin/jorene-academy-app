import { StyleSheet } from 'react-native';
import { AppIcon } from './AppIcon';

type TabBarIconProps = {
  name: string;
  color: string;
  focused?: boolean;
};

export const TabBarIcon = (props: TabBarIconProps) => {
  const { focused = false, ...rest } = props;

  return (
    <AppIcon
      size={24}
      variant={focused ? 'Bold' : 'Linear'}
      style={styles.tabBarIcon}
      {...rest}
    />
  );
};

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
