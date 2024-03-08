import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  DeviceEventEmitter,
  Keyboard,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ellipse, Svg} from 'react-native-svg';
import {fonts} from '../fonts';
import LinearGradient from 'react-native-linear-gradient';
import Check from '../svg/Check';
import {storage} from '../store/Storage';
import {HomeProps} from '../types/Types';
import Thrash from '../svg/Thrash';
import Unlink from '../components/Unlink';

const Home = ({beepCards, selectedID, setSelectedID}: HomeProps) => {
  const [addUID, setAddUID] = useState('');
  const [addName, setAddName] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showUnlink, setShowUnlink] = useState(false);
  const [deleteID, setDeleteID] = useState({});
  const handleChangeUID = (text: string) => {
    setAddUID(text);
  };
  const handleChangeName = (text: string) => {
    setAddName(text);
  };

  const getCard = async () => {
    const response = await fetch(
      'https://mrt-line-3-api.onrender.com/beep/getOne',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({uid: addUID}),
      },
    )
      .then(async jason => {
        return jason;
      })
      .catch(error => error);
    return response;
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      //setFlag(!addFlag);
      DeviceEventEmitter.emit('Added');
    }, 2000);
    setRefreshing(false);
    console.log('tapos');
  }, []);

  const handleAddCard = async () => {
    if (addUID !== '' && addName !== '') {
      let resp = await getCard();
      if (resp.status === 200) {
        let tmpJason = storage.getString('cards') ?? undefined;
        let convJason = tmpJason ? JSON.parse(tmpJason) : {};
        let cardJason = {...convJason, [addUID]: addName};
        storage.set('cards', JSON.stringify(cardJason));
        console.log(cardJason);
        setAddName('');
        setAddUID('');
        setShowAdd(false);
        Keyboard.dismiss();

        DeviceEventEmitter.emit('Added');
      } else {
        console.log('nagerror');
      }
    } else {
      console.log('missing input');
    }
  };

  return (
    <SafeAreaView>
      <View className="relative h-[100vh] bg-[#F9F9F9]">
        {/* Unlink Card */}
        {showUnlink && (
          <Unlink
            setShowUnlink={setShowUnlink}
            showUnlink={showUnlink}
            deleteID={deleteID}
          />
        )}

        {/* Header */}
        <View className="w-full bg-white z-20 relative">
          <View className="px-5 w-full flex flex-row bg-white justify-between items-center py-2 pb-4 mt-1 z-20">
            <Text className="text-xl" style={fonts.montSemi}>
              My Cards
            </Text>
            <TouchableOpacity
              className={
                'w-fit self-end py-1 px-3 rounded-full ' +
                (showAdd ? 'bg-red-200' : 'bg-slate-100')
              }
              onPress={() => {
                setShowAdd(!showAdd);
              }}>
              <Text className="text-2xl self-center">
                {showAdd ? 'X' : '+'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Add Card Modal */}
          <View
            className={
              'absolute bg-[#FFFFFF] border-t-black border-t rounded-b-2xl w-full transition-all ' +
              (showAdd
                ? 'top-full pointer-events-auto opacity-1'
                : 'top-[-200px] opacity-0')
            }>
            <View className="px-6 py-5">
              <View className="relative">
                <TextInput
                  className="border border-black rounded-2xl pl-[75px] py-1.5 text-lg"
                  style={fonts.montSemi}
                  keyboardType="numeric"
                  maxLength={12}
                  value={addUID}
                  onChangeText={text => handleChangeUID(text)}
                />
                <Text
                  className="absolute left-4 top-1/2 translate-y-[-11px] text-lg"
                  style={fonts.bebas}>
                  Card UID
                </Text>
              </View>

              <View className="relative mt-3">
                <TextInput
                  className="border border-black rounded-2xl pl-[75px] py-1.5"
                  style={fonts.montSemi}
                  keyboardType="default"
                  maxLength={15}
                  placeholder="(Optional)"
                  onChangeText={text => handleChangeName(text)}
                  value={addName}
                />
                <Text
                  className="absolute left-4 top-1/2 translate-y-[-11px] text-lg"
                  style={fonts.bebas}>
                  Name
                </Text>
              </View>

              <TouchableOpacity
                className="relative mt-3 self-end bg-[#716bff] px-4 py-1.5 rounded-2xl"
                onPress={handleAddCard}>
                <Text className=" text-lg text-white" style={fonts.bebas}>
                  Add Card
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="w-full h-[80%]">
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {/* Cards List */}
            <View className="flex w-full flex-col mb-1 px-5 relative z-0">
              {beepCards.map((card, idx) => (
                <TouchableOpacity
                  className="w-full bg-[#716bff] h-[160px] relative rounded-3xl overflow-hidden py-2 px-3 mb-2"
                  key={idx + 1000}
                  onPress={() => {
                    setSelectedID(card);
                  }}>
                  <View
                    className={
                      'flex w-[27px] z-30 h-[27px] p-1.5 bg-white absolute right-5 top-4 justify-center items-center rounded-full ' +
                      (selectedID.uid === card.uid
                        ? 'bg-emerald-500'
                        : 'bg-[#00000020] border border-[#00000030] ')
                    }>
                    {selectedID.uid === card.uid && <Check />}
                  </View>
                  <TouchableOpacity
                    className="absolute top-4 right-16 rounded-full translate-y-[-7px] p-1 z-30"
                    onPress={() => {
                      setShowUnlink(true);
                      setDeleteID({uid: card.uid, name: ''});
                    }}>
                    <Thrash width={30} height={30} stroke={'#ff6c6c'} />
                  </TouchableOpacity>
                  <Svg
                    height={200}
                    width={300}
                    className="absolute left-[-10%] top-[-55%] rotate-[0deg] "
                    viewBox="0 0 100 100">
                    <Ellipse
                      cx={'40'}
                      cy={'20'}
                      rx={'90'}
                      ry={'55'}
                      fill={'#5f3ffd'}
                    />
                  </Svg>

                  <View className="flex flex-col justify-between h-full py-1 px-2 z-20">
                    <View className="flex flex-col">
                      <Text
                        className="text-white text-lg tracking-widest"
                        style={fonts.montSemi}>
                        {card.uid}
                      </Text>
                      <Text className="text-white" style={fonts.montReg}>
                        {JSON.parse(storage.getString('cards')!)[card.uid]}
                      </Text>
                    </View>

                    <View className="flex flex-row w-full items-end justify-evenly">
                      <View className="flex flex-col grow">
                        <Text className="text-white">Balance</Text>
                        <Text
                          className="text-white text-2xl tracking-widest"
                          style={fonts.montBold}>
                          ₱ {`${card.balance}.00`}
                        </Text>
                      </View>

                      <View className="flex flex-row grow justify-end">
                        <Text className="text-[#CBCBCB]">As of: </Text>
                        <Text className="text-white">
                          {new Date(card.updatedAt).toLocaleString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <Svg
                    height={200}
                    width={500}
                    className="absolute right-[-20%] bottom-[-95%] rotate-[-6deg] "
                    viewBox="0 0 100 100">
                    <Ellipse
                      cx={'50'}
                      cy={'50'}
                      rx={'105'}
                      ry={'45'}
                      fill={'#5f3ffd'}
                    />
                  </Svg>
                </TouchableOpacity>
              ))}
            </View>

            {/* Add Card Area */}
            <TouchableOpacity
              className="flex w-full flex-col px-5 relative z-0"
              onPress={() => setShowAdd(true)}>
              <View
                className="w-full h-[130px] relative rounded-3xl overflow-hidden flex justify-center items-center relative"
                style={{
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  borderColor: '#5f3ffd',
                }}>
                <LinearGradient
                  colors={['#AACCE7', '#FFFFFF']}
                  className="w-full h-full absolute"
                />
                <View className="flex px-16 w-full justify-center items-center ">
                  <Text
                    className="text-lg text-[#434343] translate-y-[4px]"
                    style={fonts.bebas}>
                    + Add a beep Card
                  </Text>
                  <Text
                    className="text-center text-xs text-[#878787]"
                    style={fonts.montSemi}>
                    The card number is found at the back of your beep card
                  </Text>
                  <View className="bg-[#716bff] px-3 py-1.5 mt-2 rounded-full">
                    <Text className="text-white text-xs" style={fonts.montSemi}>
                      Add Card
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
