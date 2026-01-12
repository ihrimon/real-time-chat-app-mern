import Button from '@/components/Button';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors } from '@/constants/theme';
import { useAuth } from '@/contexts/authContext';
import { testSocket } from '@/socket/socket-events';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

const Home = () => {
  const { user, signOut } = useAuth();

  console.log(user);

  useEffect(() => {
    testSocket(testSocketCallbackHandler);
    testSocket(null);

    return () => {
      testSocket(testSocketCallbackHandler, true);
    };
  }, []);

  const testSocketCallbackHandler = (data: any) => {
    console.log('Got response from testSocket event: ', data);
  };

  const handleLogout = async () => {
    await signOut();
  };
  
  return (
    <ScreenWrapper>
      <Typo color={colors.white}>home</Typo>

      <Button onPress={handleLogout}>
        <Typo>Logout</Typo>
      </Button>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
