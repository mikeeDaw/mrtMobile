import React from 'react';
import {DeviceEventEmitter, Text, TouchableOpacity, View} from 'react-native';
import {fonts} from '../fonts';
import {useNavigation} from '@react-navigation/native';
import RNExitApp from 'react-native-exit-app';

interface Props {
  setTimeOut: React.Dispatch<React.SetStateAction<boolean>>;
  setLog: React.Dispatch<React.SetStateAction<boolean>>;
}

const TimeOutModal: React.FC<Props> = ({setTimeOut, setLog}) => {
  const navi = useNavigation();
  return (
    <>
      <View className="w-screen h-screen absolute top-0 left-0 bg-[#89898940] z-20 flex justify-center items-center">
        <View
          className="bg-white w-8/12 p-3 rounded-xl flex flex-col"
          style={{elevation: 8}}>
          <Text
            style={fonts.bebas}
            className="text-2xl border-b border-black pb-1">
            User Inactive
          </Text>
          <Text
            className="mt-4 text-base self-center text-center px-3"
            style={fonts.montReg}>
            Your session has expired due to inactivity.
          </Text>
          <TouchableOpacity
            className="mt-4 self-center bg-[#00B38C] px-5 py-1 rounded-xl"
            onPress={() => {
              setTimeOut(false);
              setLog(false);
            }}>
            <Text className="text-white text-lg" style={fonts.bebas}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default TimeOutModal;
