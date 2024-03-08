import React from 'react';
import {DeviceEventEmitter, Text, TouchableOpacity, View} from 'react-native';
import {fonts} from '../fonts';
import {storage} from '../store/Storage';

interface Props {
  showUnlink: boolean;
  deleteID: any;
  setShowUnlink: React.Dispatch<React.SetStateAction<boolean>>;
}

const Unlink: React.FC<Props> = ({showUnlink, deleteID, setShowUnlink}) => {
  const unlinkCard = () => {
    const jsonStorage = JSON.parse(storage.getString('cards')!);
    delete jsonStorage[deleteID.uid];
    storage.set('cards', JSON.stringify(jsonStorage) ?? '');
    DeviceEventEmitter.emit('Added');
  };
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
          Delete Your Card "{deleteID.name}"?
        </Text>
        <TouchableOpacity
          className="bg-[#716bff] px-4 py-1 rounded-xl mt-4"
          onPress={unlinkCard}>
          <Text
            className="text-lg text-center text-white tracking-widest"
            style={fonts.bebas}>
            Unlink
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Unlink;
