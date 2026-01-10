import Button from '@/components/Button';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors } from '@/constants/theme';
import { useAuth } from '@/contexts/authContext';
import React from 'react';
import { StyleSheet } from 'react-native';

const Home = () => {
    const {user, signOut} = useAuth();

    console.log(user)

    const handleLogout = async () => {
        await signOut();
    }
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
