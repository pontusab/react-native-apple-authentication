import React from 'react';
import {View, Text} from 'react-native';
import DeviceLocale from 'react-native-device-locale';

console.log(DeviceLocale);

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Device Country: {DeviceLocale.deviceCountry}</Text>
      <Text>Device Locale: {DeviceLocale.deviceLocale}</Text>
      <Text>Timezone: {DeviceLocale.timezone}</Text>
    </View>
  );
};

export default App;
