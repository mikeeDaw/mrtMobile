import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TouchableHighlight,
  TouchableOpacity,
  DeviceEventEmitter,
  SafeAreaView,
} from 'react-native';
import {QRProps} from '../types/Types';
import {
  useCameraDevice,
  Camera,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';
import QrBorder from '../svg/QrBorder';
import {fonts} from '../fonts';
import ToastManager, {Toast} from 'toastify-react-native';
import TapSummary from '../components/TapSummary';

const QrView = ({navigation, cardData}: QRProps) => {
  const [camPermission, setCamPermission] = useState(false);
  const [active, setActive] = useState(false);
  const [tapModal, setTapModal] = useState(false);
  const [tapValue, setTapValue] = useState<any>({});
  const {hasPermission, requestPermission} = useCameraPermission();
  const [passMethod, setPassMethod] = useState('in');
  const [originStat, setOriginStat] = useState('');
  const [tapOutShow, setTapOutShow] = useState(false);
  const [tapOutVal, setTapOutVal] = useState<any>({});
  const isFocused = useIsFocused();

  const checkCameraPermission = async () => {
    console.log('run camera permission');
    const status = await requestPermission();
    setCamPermission(status === true);
  };

  const device = useCameraDevice('back');

  useEffect(() => {
    if (!hasPermission) {
      checkCameraPermission();
    } else {
      setTimeout(() => {
        setActive(isFocused);
      }, 500);
    }
  }, [hasPermission, requestPermission, isFocused]);

  const noCam = () => {
    console.log('No Camera');
    return (
      <View>
        <Text> Your Device has no Camera.</Text>
      </View>
    );
  };

  const scanning = async () => {
    console.log(
      cardData.uid,
      cardData.balance,
      cardData.tapped,
      cardData.origin,
      passMethod,
      originStat,
    );
    if (passMethod === 'in') {
      if (!cardData.tapped) {
        const data = await fetch(
          'https://mrt-line-3-api.onrender.com/beep/tapIn',
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              uid: cardData.uid,
              origin: originStat.toUpperCase(),
            }),
          },
        )
          .then(async jason => {
            if (jason.status === 200) {
              DeviceEventEmitter.emit('Added');
              Toast.success(`Tapped In Successfully.`, 'top');
              return await jason.json();
            } else if (jason.status === 401) {
              Toast.error(`Insufficient Balance.`, 'top');
            } else {
              const jasons = await jason.json();
              console.log(jasons);
              Toast.error(`Error. Try Again`, 'top');
            }
          })
          .catch(error => console.log(error));
      } else {
        Toast.error(`Already Tapped In.`, 'top');
      }
    } else {
      if (cardData.tapped) {
        const data = await fetch(
          'https://mrt-line-3-api.onrender.com/mobile/tapOut',
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              uid: cardData.uid,
              currentStation: originStat.toUpperCase(),
              desc: `${cardData?.origin.toUpperCase()} - ${originStat.toUpperCase()}`,
            }),
          },
        ).then(async jason => {
          if (jason.status === 200) {
            let result = await jason.json();
            DeviceEventEmitter.emit('Added');
            Toast.success(`Tapped Out Successfully.`, 'top');
            setTapOutShow(true);
            setTapOutVal(result);
            console.log('Result is', result._doc.balance);
          } else if (jason.status === 401) {
            Toast.error(`Insufficient Balance`, 'top');
          } else {
            Toast.error(`Error. Try Again`, 'top');
          }
        });
      } else {
        Toast.error(`Please Tap In First.`, 'top');
      }
    }

    setTapModal(false);
    setTapValue({});
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: async codes => {
      let corners = codes[0].corners;
      let readFlag = false;

      if (
        corners![0].x >= 494 &&
        corners![0].y >= 246 &&
        corners![1].x <= 758 &&
        corners![1].y >= 240 &&
        corners![2].x <= 733 &&
        corners![2].y <= 488 &&
        corners![3].x >= 489 &&
        corners![3].y <= 497
      ) {
        if (codes[0].value!.startsWith('{') && codes[0].value!.endsWith('}')) {
          const value = JSON.parse(codes[0].value!);
          console.log('OK!', codes[0].value!);
          setOriginStat(value.station);
          setPassMethod(value.pass);
          setTapValue(value);
          setTapModal(true);
        }
      }

      //   console.log(codes[0].corners);
    },
  });

  return (
    <SafeAreaView>
      {device && active && (
        <View className="w-screen h-screen">
          {/* Toast Message */}
          <ToastManager position={'top'} positionValue={110} theme={'dark'} />
          {/* Tap Out Summary */}
          {tapOutShow && tapOutVal && (
            <TapSummary
              desc={tapOutVal.desc}
              distance={tapOutVal.distance}
              fare={tapOutVal.price}
              newBalance={tapOutVal._doc.balance}
              showSumm={setTapOutShow}
            />
          )}

          {/* QR Elements */}
          <View className="self-center absolute z-20 top-16 p-3 bg-[#53535380] rounded-full">
            <Text className="text-white"> Scan Your QR Code </Text>
          </View>
          <View className="absolute z-20 self-center top-1/2 translate-y-[-150px]">
            <QrBorder fill={'#FFFFFF90'} width={270} height={270} />
          </View>
          <Camera
            className="w-full h-full z-0"
            device={device}
            isActive={active}
            codeScanner={codeScanner}
          />
          {tapModal && (
            <TouchableOpacity
              className="absolute bg-white self-center bottom-[20%] px-4 py-2 rounded-xl"
              onPress={scanning}>
              <View className="">
                <Text className="text-2xl" style={fonts.bebas}>
                  {`Tap ${tapValue.pass}  -  ${tapValue.station}`}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default QrView;
