import "react-navigation";
declare module 'react-navigation' {
  function createMaterialTopTabNavigator(
    routeConfigMap: NavigationRouteConfigMap,
    TabNavigatorConfig?: TabNavigatorConfig,
  ): NavigationContainer;
  function createStackNavigator(
    routeConfigMap: NavigationRouteConfigMap,
    stackConfig?: StackNavigatorConfig,
  ): NavigationContainer;
  function createDrawerNavigator(
    routeConfigMap: NavigationRouteConfigMap,
    drawerConfig?: DrawerNavigatorConfig,
  ): NavigationContainer;
  function createSwitchNavigator(
    routeConfigMap: NavigationRouteConfigMap,
    switchConfig?: SwitchNavigatorConfig
  ): NavigationContainer;
  function createBottomTabNavigator(
    routeConfigMap: NavigationRouteConfigMap,
    BottomTabNavigatorConfig?: TabNavigatorConfig
  ): NavigationContainer;
}
