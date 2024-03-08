import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {fonts} from '../fonts';

interface Props {
  showUnlink: boolean;
  deleteID: any;
  setShowUnlink: React.Dispatch<React.SetStateAction<boolean>>;
}

const Unlink: React.FC<Props> = ({showUnlink, deleteID, setShowUnlink}) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setShowUnlink(false);
        }}
        className="absolute w-full h-full z-40 bg-[#00000030]"></TouchableOpacity>
      <View className="absolute self-center p-3 bg-slate-100 z-50 top-[40%] w-[70%] rounded-xl flex flex-col">
        <Text
          className="text-xl text-[#a8a8a8] border-b border-[#a8a8a8] pb-2"
          style={fonts.bebas}>
          Unlink Beep Card
        </Text>
        <Text className="mt-3 text-base" style={fonts.montSemi}>
          Delete Your Card "Card Name"?
        </Text>
        <TouchableOpacity className="bg-[#202758] px-4 py-1 rounded-xl mt-4">
          <Text className="text-lg text-center text-white" style={fonts.bebas}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Unlink;
