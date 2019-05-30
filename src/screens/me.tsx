import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView, DrawerItems } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const CustomDrawerContentComponent = (props: any) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
)

export default CustomDrawerContentComponent;
