import React from 'react';
import {View, Text, TouchableOpacity, DeviceEventEmitter} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fonts} from '../fonts';
import RArrow from '../svg/RArrow';
import {SettingsProps} from '../types/Types';

const Settings = ({navigation, route}: SettingsProps) => {
  return (
    <SafeAreaView>
      <View className="w-full py-2 h-[91%] p-5">
        <View className="flex flex-col">
          <Text className="text-3xl text-[#171717]" style={fonts.bebas}>
            SETTINGS
          </Text>
          <View className="flex flex-col pt-6 pb-8  my-2 border-b border-[#696969] border-dashed">
            <TouchableOpacity
              className="w-full bg-white py-2 px-5 rounded-full flex flex-row justify-between items-center"
              style={{elevation: 4}}>
              <Text className="text-base text-[#585858]" style={fonts.montSemi}>
                Change MPIN
              </Text>
              <RArrow width={30} height={30} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="w-full bg-[#EE5050] py-2 px-5 rounded-full mt-4 flex"
            onPress={() => DeviceEventEmitter.emit('SetLogOut')}>
            <Text
              className="text-base text-white self-center"
              style={fonts.montSemi}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
