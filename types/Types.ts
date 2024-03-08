import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Cards: {selectedID: any};
  Home: {
    beepCards: any[];
    selectedID: any;
    setSelectedID: React.Dispatch<any>;
  };
  Test: undefined;
  PinSuccess: {setLog: React.Dispatch<React.SetStateAction<boolean>>};
  Login: undefined;
  Settings: undefined;
  QR: {
    cardData: any;
  };
  Register: {setLog: React.Dispatch<React.SetStateAction<boolean>>};
};

export type CardProps = NativeStackScreenProps<RootStackParamList, 'Cards'> & {
  selectedID: any;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'> & {
  beepCards: any[];
  selectedID: any;
  setSelectedID: React.Dispatch<any>;
};

export type TestProps = NativeStackScreenProps<RootStackParamList, 'Test'>;

export type QRProps = NativeStackScreenProps<RootStackParamList, 'QR'> & {
  cardData: any;
};

export type RegProps = NativeStackScreenProps<
  RootStackParamList,
  'Register'
> & {
  setLog: React.Dispatch<React.SetStateAction<boolean>>;
};

export type LogProps = NativeStackScreenProps<
  RootStackParamList,
  'PinSuccess'
> & {
  setLog: React.Dispatch<React.SetStateAction<boolean>>;
};

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export type SettingsProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;
