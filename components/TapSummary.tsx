import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {fonts} from '../fonts';

interface Props {
  desc: string;
  distance: number;
  fare: number;
  newBalance: number;
  showSumm: React.Dispatch<React.SetStateAction<boolean>>;
}

const TapSummary: React.FC<Props> = ({
  desc,
  distance,
  fare,
  newBalance,
  showSumm,
}) => {
  return (
    <TouchableOpacity
      className="absolute self-center top-[40%] w-[80%] z-50 "
      onPress={() => showSumm(false)}>
      <View className="bg-white self-center p-3 pb-5 rounded-xl flex flex-col border border-black">
        <Text
          className="text-[#676767] text-2xl border-b border-[#595959] mb-3 pb-1"
          style={fonts.bebas}>
          Tap Out Summary
        </Text>
        <View className="flex flex-col w-full">
          <Text
            className="text-center text-xl text-indigo-500 mb-1"
            style={fonts.bebas}>
            {desc}
          </Text>
          <View className="flex flex-row gap-3">
            <Text
              className="font-medium w-[40%] text-right"
              style={fonts.montBold}>
              Distance :
            </Text>
            <Text className="" style={fonts.montReg}>
              {`${distance} KM`}
            </Text>
          </View>
          <View className="flex flex-row gap-3">
            <Text
              className="font-medium w-[40%] text-right"
              style={fonts.montBold}>
              Fare :
            </Text>
            <Text className="" style={fonts.montReg}>
              {`₱ ${fare}.00`}
            </Text>
          </View>
          <View className="flex flex-row gap-3">
            <Text
              className="font-medium w-[40%] text-right"
              style={fonts.montBold}>
              Balance :
            </Text>
            <Text className="" style={fonts.montReg}>
              {`₱ ${newBalance}.00`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TapSummary;
