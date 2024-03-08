import React from 'react';
import {View, Text, Image} from 'react-native';
import HomeIcon from '../svg/HomeIcon';
import TransactIcon from '../svg/TransactIcon';
import SettingsIcon from '../svg/SettingsIcon';
import QRIcon from '../svg/QRIcon';
import {fonts} from '../fonts';

interface Props {
  navigation: any;
  currTab: string;
  setCurrTab: React.Dispatch<React.SetStateAction<string>>;
  selectedCard: any;
}

const Nav: React.FC<Props> = ({
  navigation,
  currTab,
  setCurrTab,
  selectedCard,
}) => {
  return (
    <View
      className="absolute bottom-0 bg-white w-10/12 translate-y-[-17px] self-center flex items-center justify-evenly px-5 rounded-xl flex-row z-30 h-[50px]"
      style={{
        shadowColor: '#000',
        elevation: 5,
      }}>
      <View
        className={
          'flex flex-col items-center border-t py-3.5 border-transparent relative w-1/4'
        }>
        {currTab === 'Home' ? (
          <View className="absolute translate-y-[-40px] flex flex-col items-center">
            <View className="bg-white rounded-full p-1">
              <View className="bg-[#716bff] p-2.5 rounded-full">
                <HomeIcon selected={true} />
              </View>
            </View>
            <Text className=" text-sm text-black" style={fonts.bebas}>
              Home
            </Text>
          </View>
        ) : (
          <View className={'absolute '}>
            <HomeIcon
              onPress={() => {
                setCurrTab('Home');
                navigation.navigate('Home');
              }}
            />
          </View>
        )}
      </View>

      <View className={'flex flex-col items-center py-3.5 relative w-1/4'}>
        {currTab === 'Cards' ? (
          <View className="absolute translate-y-[-40px] flex flex-col items-center">
            <View className="bg-white rounded-full p-1">
              <View className="bg-[#716bff] p-2.5 rounded-full">
                <TransactIcon selected={true} />
              </View>
            </View>
            <Text className="text-sm text-black" style={fonts.bebas}>
              Transactions
            </Text>
          </View>
        ) : (
          <View className="absolute">
            <TransactIcon
              onPress={() => {
                setCurrTab('Cards');
                navigation.navigate('Cards');
              }}
            />
          </View>
        )}
      </View>

      <View
        className={
          'flex flex-col items-center border-t border-transparent py-3.5 relative w-1/4'
        }>
        {currTab === 'Settings' ? (
          <View className="absolute translate-y-[-40px] flex flex-col items-center">
            <View className="bg-white rounded-full p-1">
              <View className="bg-[#716bff] p-2.5 rounded-full">
                <SettingsIcon selected={true} />
              </View>
            </View>
            <Text className="text-sm text-black bebasNeue" style={fonts.bebas}>
              Settings
            </Text>
          </View>
        ) : (
          <View className="absolute">
            <SettingsIcon
              onPress={() => {
                setCurrTab('Settings');
                navigation.navigate('Settings');
              }}
            />
          </View>
        )}
      </View>

      <View
        className={
          'flex flex-col items-center border-t border-transparent py-3.5 relative w-1/4'
        }>
        {currTab === 'QR' ? (
          <View className="absolute translate-y-[-40px] flex flex-col items-center">
            <View className="bg-white rounded-full p-1">
              <View className="bg-[#716bff] p-2.5 rounded-full">
                <QRIcon selected={true} />
              </View>
            </View>
            <Text className="text-sm text-black bebasNeue" style={fonts.bebas}>
              QR Scan
            </Text>
          </View>
        ) : (
          <View
            className={
              'absolute ' +
              (selectedCard !== undefined
                ? Object.keys(selectedCard).length === 0
                  ? 'opacity-30'
                  : ''
                : 'opacity-30')
            }>
            <QRIcon
              onPress={
                selectedCard !== undefined
                  ? Object.keys(selectedCard).length !== 0
                    ? () => {
                        setCurrTab('QR');
                        navigation.navigate('QR');
                      }
                    : () => {}
                  : () => {}
              }
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Nav;
