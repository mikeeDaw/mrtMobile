import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TouchableHighlight,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import KeyIcon from '../svg/KeyIcon';
import {fonts} from '../fonts';
import {Svg, Ellipse, Circle} from 'react-native-svg';
import {LoginProps} from '../types/Types';
import {storage} from '../store/Storage';

const Pin = ({navigation}: LoginProps) => {
  const inputRefs = useRef<Array<TextInput>>([]);
  const [pin, setPin] = useState<Array<number | undefined>>(
    new Array(5).fill(undefined),
  );
  const [attempt, setAttempt] = useState(false);

  const handleChange = (text: string, idx: number) => {
    let tmpArr = pin;
    tmpArr[idx] = text !== '' ? Number(text) : undefined;
    setPin(tmpArr);
    console.log(pin);

    if (pin.every(item => item !== undefined)) {
      const passcode = pin.join('');
      if (storage.getString('PIN') === passcode) {
        DeviceEventEmitter.emit('SetLogIn');
      } else {
        setAttempt(true);
      }
    }
    if (text.length !== 0) {
      return inputRefs?.current[idx + 1]?.focus();
    }
    return inputRefs?.current[idx - 1]?.focus();
  };

  const handleBackspace = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    idx: number,
  ) => {
    const {nativeEvent} = e;
    if (nativeEvent.key === 'Backspace') {
      setAttempt(false);
      handleChange('', idx);
    }
  };

  const handleClear = () => {
    inputRefs.current.forEach(item => {
      item.clear();
    });
    inputRefs?.current[0].focus();
    setAttempt(false);
    setPin(new Array(5).fill(undefined));
  };

  return (
    <SafeAreaView>
      <View className="flex flex-col bg-[#155e75] h-full w-full items-start justify-center px-8 relative">
        {/* Shapes for UI */}
        <Svg
          width={500}
          height={700}
          className="absolute"
          viewBox="0 0 100 100">
          <Ellipse cx={25} cy={70} rx={65} ry={50} fill={'#cffafe'} />
        </Svg>

        <View className="absolute bottom-0 inset-x-0 h-[170px] z-0 bg-[#cffafe]" />

        <View className="bg-[#5f3ffd] p-8 rounded-full">
          <KeyIcon keyHeight={70} keyWidth={70} />
        </View>

        <Text
          className="text-4xl text-black mt-7 tracking-wider"
          style={fonts.bebas}>
          MPIN Authentication
        </Text>

        <Text
          className="text-[16px] mt-4 text-[#888888]"
          style={fonts.montSemi}>
          Please enter your 5-digit passcode to your account.
        </Text>

        {/* PIN Area */}
        <View className="flex flex-row w-full mt-11 relative">
          {[...Array(5)].map((_, idx) => (
            <TextInput
              ref={ref => {
                if (ref && !inputRefs.current.includes(ref)) {
                  inputRefs.current = [...inputRefs.current, ref];
                }
              }}
              key={idx}
              className={
                'w-[57px] h-[60px] text-[28px] border text-center bg-white rounded-xl ' +
                (attempt ? 'border-red-400 ' : 'border-transparent ') +
                (idx === 4 ? '' : 'mr-[8px]')
              }
              style={{elevation: 10, ...fonts.bebas}}
              keyboardType="decimal-pad"
              maxLength={1}
              contextMenuHidden
              selectTextOnFocus
              editable={true}
              onChangeText={text => {
                handleChange(text, idx);
              }}
              onKeyPress={event => handleBackspace(event, idx)}
              secureTextEntry={true}
            />
          ))}
        </View>

        <View className="mt-7 w-full flex flex-row justify-end">
          <TouchableOpacity onPress={handleClear}>
            <Text
              className="text-lg tracking-wider text-indigo-600"
              style={fonts.bebas}>
              Clear MPIN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Pin;
