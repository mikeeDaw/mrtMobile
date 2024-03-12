import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  DeviceEventEmitter,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Nav from '../navigation/Nav';
import {CardProps} from '../types/Types';
import {Ellipse, Svg} from 'react-native-svg';
import {fonts} from '../fonts';
import {storage} from '../store/Storage';
import EmptyIcon from '../svg/EmptyIcon';

const CardsView = ({selectedID}: CardProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const timestamp = (str: string) => {
    const theDate = new Date(str);
    return `${theDate.getHours()}:${theDate.getMinutes()}`;
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      DeviceEventEmitter.emit('Added');
    }, 2000);
    setRefreshing(false);
    console.log('tapos');
  }, []);
  return (
    <SafeAreaView>
      <View className="relative h-full bg-emerald-100">
        <View className="w-full h-[28%] absolute top-0">
          <Image
            source={require('../assets/images/landScapeBlue.jpg')}
            className="w-full h-full"
          />
        </View>
        <View className="flex flex-col h-full">
          <View className="h-[30%] w-full flex items-center">
            <Text
              className="text-slate-600 text-xl mt-7 tracking-widest"
              style={fonts.bebas}>
              Transactions
            </Text>
          </View>
          <View className="h-[70%] bg-[#E9E9E9] relative">
            {/* Arc */}
            <View className="absolute w-full top-[-80px]">
              <Svg height={150} width="100%" className="" viewBox="0 0 100 100">
                <Ellipse
                  cx={'50'}
                  cy={'100%'}
                  rx={'75%'}
                  ry={'90%'}
                  fill={'#E9E9E9'}
                />
              </Svg>
            </View>
            {/* Beep Icon */}
            <View className="w-[100px] h-[100px] p-1 bg-white rounded-full absolute top-[-110px] right-1/2 translate-x-[50px]">
              <Image
                source={require('../assets/images/BeepIcon.png')}
                className="w-full h-full"
              />
            </View>
            <View className="w-full h-full flex flex-col items-center px-10">
              <View className="flex flex-col w-full items-center mb-4">
                <Text className="text-lg" style={fonts.montSemi}>
                  {selectedID
                    ? JSON.parse(storage.getString('cards')!)[selectedID.uid]
                    : '- Select a Card -'}
                </Text>
                <Text>
                  {selectedID
                    ? 'As of ' +
                      new Date(selectedID.updatedAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      }) +
                      ' •' +
                      timestamp(selectedID.updatedAt)
                    : ''}
                  {/* As of{' '}
                  {new Date(selectedID.updatedAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}{' '}
                  • {timestamp(selectedID.updatedAt)} */}
                </Text>
              </View>

              {/* Transactions  */}
              <View className="flex flex-col  w-full h-[65%] overflow-scroll">
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }>
                  {selectedID ? (
                    selectedID.transactions.length !== 0 ? (
                      selectedID.transactions
                        .reverse()
                        .map((data: any, idx: any) => (
                          <View
                            className="rounded-xl bg-white px-3 py-2 flex flex-row w-full mb-2"
                            key={idx + 265}>
                            <View className="flex flex-col w-5/6">
                              <Text className="text-lg" style={fonts.bebas}>
                                {new Date(data.date).toLocaleString('en-US', {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                                }) +
                                  ' - ' +
                                  timestamp(data.date)}
                              </Text>
                              <Text className="text-xs" style={fonts.montSemi}>
                                {data.desc}
                              </Text>
                              <View className="w-fit mt-3">
                                <Text className="text-black self-start px-2 py-1 text-[9px] text-white bg-[#101582] rounded-xl">
                                  MRT 3
                                </Text>
                              </View>
                            </View>

                            <View className="flex justify-end flex-col items-end absolute right-5 bottom-2">
                              <Text
                                className="text-[#565656] text-base translate-y-[5px]"
                                style={fonts.bebas}>
                                {data.desc.search('Load') === -1
                                  ? 'Fare'
                                  : 'Load'}
                              </Text>
                              <Text
                                className={
                                  'text-2xl ' +
                                  (data.desc.search('Load') === -1
                                    ? 'text-red-500'
                                    : 'text-emerald-500')
                                }
                                style={fonts.bebas}>
                                {data.desc.search('Load') === -1
                                  ? `- ₱${data.amount}.00`
                                  : `+ ₱${data.amount}.00`}
                              </Text>
                            </View>
                          </View>
                        ))
                    ) : (
                      <View className="w-full h-[300px] bg-white flex flex-col rounded-xl justify-center items-center">
                        <EmptyIcon width={60} height={60} />
                        <Text
                          className="text-[#c2c2c2] mt-6"
                          style={fonts.montSemi}>
                          No Transactions Yet.
                        </Text>
                      </View>
                    )
                  ) : (
                    <View className="w-full h-[300px] bg-white flex flex-col rounded-xl justify-center items-center">
                      <EmptyIcon width={60} height={60} />
                      <Text
                        className="text-[#c2c2c2] mt-6"
                        style={fonts.montSemi}>
                        No Transactions Yet.
                      </Text>
                    </View>
                  )}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>

        {/* <Nav navigation={navigation} /> */}
      </View>
    </SafeAreaView>
  );
};

export default CardsView;
