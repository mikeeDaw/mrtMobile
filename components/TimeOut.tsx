import React, {createContext, useContext, useEffect, useState} from 'react';
import UserInactivity from 'react-native-user-detector-active-inactive';
//import RNExitApp from 'react-native-exit-app';

interface UserInactivityContextType {
  resetTimer: () => void;
}

const UserInactivityContext = createContext<UserInactivityContextType>({
  resetTimer: () => {},
});

interface UserInactivityWrapperProps {
  children: React.ReactNode;
  setShowTimeOut: React.Dispatch<React.SetStateAction<boolean>>;
}

const TimeOut: React.FC<UserInactivityWrapperProps> = ({
  children,
  setShowTimeOut,
}) => {
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    resetTimer(); // Initial call to set the timer

    return () => {
      clearTimeout(timeoutId); // Clear the timeout when unmounting the component
    };
  }, []);

  const resetTimer = () => {
    // Generate a new key to reset the timer
    setTimerKey(prevKey => prevKey + 1);
  };

  return (
    <UserInactivityContext.Provider value={{resetTimer}}>
      <UserInactivity
        key={timerKey} // This key change will reset the timer
        timeForInactivity={60} // 60 seconds of inactivity
        onHandleActiveInactive={() => {
          console.log('User inactive. Logging out...');
          setShowTimeOut(true);
          //   SimpleToast.show('User inactive, closing app.', SimpleToast.SHORT, { tapToDismissEnabled: true, backgroundColor: '#172459' });
          //   RNExitApp.exitApp();
        }} // Reset the timer on activity
      >
        {children}
      </UserInactivity>
    </UserInactivityContext.Provider>
  );
};

export default TimeOut;

export const useUserInactivity = () => useContext(UserInactivityContext);
