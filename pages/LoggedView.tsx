import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Nav from '../navigation/Nav';
import Home from './Home';
import CardsView from './CardsView';
import Settings from './Settings';
import {LogProps, RootStackParamList} from '../types/Types';
import {storage} from '../store/Storage';
import {DeviceEventEmitter} from 'react-native';
import QrView from './QrView';

const LoggedView = ({navigation, setLog}: LogProps) => {
  const BotTab = createBottomTabNavigator<RootStackParamList>();
  const [selectedTab, setSelectedTab] = useState('Home');
  const [beepCards, setBeepCards] = useState<any[]>([]);
  const [selectedID, setSelectedID] = useState<any>({});
  const [addFlag, setAddFlag] = useState(false);

  const getCards = async () => {
    const cards = storage.getString('cards')
      ? JSON.parse(storage.getString('cards')!)
      : {};
    console.log(cards, 'card');
    const cardUID: {uids: Array<string>} = {uids: []};
    for (const [key, val] of Object.entries(cards)) {
      cardUID.uids.push(key);
    }
    console.log(cardUID, 'cards');

    const response = await fetch(
      'https://mrt-line-3-api.onrender.com/beep/cards/mobile',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardUID),
      },
    )
      .then(async jason => {
        if (jason.status === 200) {
          const data = await jason.json();
          setBeepCards(data.data);
          selectedID ?? setSelectedID(data.data[0]);
          console.log(Object.keys(selectedID).length);
          console.log(data.data);
          if (Object.keys(selectedID).length !== 0) {
            let theCard = data.data.find(
              (item: any) => item.uid === selectedID.uid,
            );
            setSelectedID(theCard);
          } else {
            setSelectedID(data.data[0]);
          }
        }
      })
      .catch(error => console.log(error.message));
  };

  useEffect(() => {
    if (storage.getString('cards') !== undefined) {
      getCards();
    }
    console.log(storage.getString('cards'), 'nag run');
  }, [addFlag]);

  useEffect(() => {
    DeviceEventEmitter.addListener('Added', () => {
      console.log('emitted');
      getCards();
    });
    return () => {
      DeviceEventEmitter.removeAllListeners('Added');
    };
  }, []);

  return (
    <>
      <BotTab.Navigator
        tabBar={props => (
          <Nav
            {...props}
            currTab={selectedTab}
            setCurrTab={setSelectedTab}
            selectedCard={selectedID}
          />
        )}>
        <BotTab.Screen name="Home" options={{headerShown: false}}>
          {props => (
            <Home
              {...props}
              beepCards={beepCards}
              selectedID={selectedID}
              setSelectedID={setSelectedID}
            />
          )}
        </BotTab.Screen>
        <BotTab.Screen name="Cards" options={{headerShown: false}}>
          {props => <CardsView {...props} selectedID={selectedID} />}
        </BotTab.Screen>
        <BotTab.Screen name="Settings" options={{headerShown: false}}>
          {props => <Settings {...props} />}
        </BotTab.Screen>
        <BotTab.Screen name="QR" options={{headerShown: false}}>
          {props => <QrView {...props} cardData={selectedID} />}
        </BotTab.Screen>
      </BotTab.Navigator>
    </>
  );
};

export default LoggedView;