import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import KeyIcon from '../svg/KeyIcon';
import {fonts} from '../fonts';
import {Svg, Ellipse, Circle} from 'react-native-svg';
import {storage} from '../store/Storage';
import Lock from '../svg/Lock';
import {RegProps} from '../types/Types';

const Register = ({navigation, setLog}: RegProps) => {
  const inputRefs = useRef<Array<TextInput>>([]);
  const [pin, setPin] = useState<Array<number | undefined>>(
    new Array(5).fill(undefined),
  );
  const [attempt, setAttempt] = useState(false);
  const [confirmBtn, setConfirmBtn] = useState(true);
  const [savedPin, setSavedPin] = useState('');

  const handleChange = (text: string, idx: number) => {
    let tmpArr = pin;
    let regex = /^\d+$/;
    tmpArr[idx] = regex.test(text) ? Number(text) : undefined;
    setPin(tmpArr);

    if (pin.every(item => item !== undefined)) {
      if (savedPin !== '') {
        console.log(pin.join(''));
        if (savedPin === pin.join('')) {
          storage.set('PIN', savedPin);
          navigation.navigate('Login');
        } else setAttempt(true);
      }
      setConfirmBtn(false);
    } else {
      setConfirmBtn(true);
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
    setConfirmBtn(true);
  };

  const handleConfirm = () => {
    setSavedPin(pin.join(''));
    setPin(new Array(5).fill(undefined));
    inputRefs.current.forEach(item => {
      item.clear();
    });
    Keyboard.dismiss();
    setConfirmBtn(true);
  };

  const handleReset = () => {
    setSavedPin('');
    setPin(new Array(5).fill(undefined));
    inputRefs.current.forEach(item => {
      item.clear();
    });
    Keyboard.dismiss();
    setConfirmBtn(true);
    setAttempt(false);
  };
  return (
    <SafeAreaView>
      <View className="flex flex-col bg-[#FFFFFF] h-[100vh] w-full items-start justify-center relative">
        <View className="w-full h-[20%]"></View>

        <View className="w-full h-[80%] flex flex-col justify-between px-8 relative pt-[85px]">
          {/* Shapes for UI */}
          <Svg
            width={500}
            height={600}
            className="absolute top-0 left-[0px]"
            viewBox="0 0 100 100">
            <Ellipse cx={25} cy={45} rx={65} ry={55} fill={'#cffafe'} />
          </Svg>

          <View className="absolute bottom-0 inset-x-0 h-[170px] z-0 bg-[#cffafe]" />

          <View className="bg-[#5f3ffd] p-8 rounded-full absolute top-[-60px] left-9 ">
            <Lock height={70} width={70} />
          </View>

          <View className="flex flex-col">
            <Text
              className="text-4xl text-black mt-7 tracking-wider"
              style={fonts.bebas}>
              {savedPin === '' ? 'Create your MPIN' : 'Confirm the MPIN'}
            </Text>

            <View className="w-full mt-1" style={{paddingEnd: 50}}>
              <Text
                className="text-[16px] text-[#888888]"
                style={fonts.montSemi}>
                Re-enter your MPIN to and confirm and save the passcode.
              </Text>
            </View>

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

            {savedPin !== '' ? (
              <View className="mt-4 w-full flex flex-row justify-end">
                <TouchableOpacity onPress={handleReset}>
                  <Text
                    className="text-lg tracking-wider text-indigo-600"
                    style={fonts.bebas}>
                    Reset
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            )}
          </View>

          <View className="w-full self-center mb-7">
            <TouchableOpacity
              className={
                'flex justify-center rounded-lg items-center bg-[#5f3ffd] py-4 ' +
                (confirmBtn ? 'opacity-60' : '')
              }
              disabled={confirmBtn}
              onPress={handleConfirm}>
              <Text
                className="text-white tracking-wider"
                style={fonts.montSemi}>
                CONFIRM
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
