import Button from '@/components/Button';
import ConversationItem from '@/components/ConversationItem';
import Loading from '@/components/Loading';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { useAuth } from '@/contexts/authContext';
import { testSocket } from '@/socket/socket-events';
import { verticalScale } from '@/utils/styling';
import { useRouter } from 'expo-router';
import * as Icons from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const conversations = [
  {
    name: 'Alice',
    type: 'direct',
    lastMessage: {
      senderName: 'Alice',
      content: 'Hey! Are we still on for tonight?',
      createdAt: '2025-06-22T18:45:00Z',
    },
  },
  {
    name: 'Project Team',
    type: 'group',
    lastMessage: {
      senderName: 'Sarah',
      content: 'Meeting rescheduled to 3pm tomorrow.',
      createdAt: '2025-06-21T4:40:00Z',
    },
  },
  {
    name: 'Bob',
    type: 'direct',
    lastMessage: {
      senderName: 'Bob',
      content: 'Yes I will free at night',
      createdAt: '2025-06-22T18:46:00Z',
    },
  },
];

const Home = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);

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

  let directConversations = conversations
    .filter((item: any) => item.type === 'direct')
    .sort((a: any, b: any) => {
      const aDate = a?.lastMessage?.createdAt || a.createdAt;
      const bDate = b?.lastMessage?.createdAt || b.createdAt;

      return new Date(bDate).getTime() - new Date(aDate).getTime();
    });

  let groupConversations = conversations
    .filter((item: any) => item.type === 'group')
    .sort((a: any, b: any) => {
      const aDate = a?.lastMessage?.createdAt || a.createdAt;
      const bDate = b?.lastMessage?.createdAt || b.createdAt;

      return new Date(bDate).getTime() - new Date(aDate).getTime();
    });

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.4}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Typo
              color={colors.neutral200}
              size={19}
              textProps={{ numberOfLines: 1 }}
            >
              Welcome back,{' '}
              <Typo size={20} color={colors.white} fontWeight={'800'}>
                {user?.name}
              </Typo>{' '}
              👋
            </Typo>
          </View>

          <TouchableOpacity
            style={styles.settingIcon}
            onPress={() => router.push('/(main)/profileModal')}
          >
            <Icons.GearSix
              color={colors.white}
              weight='fill'
              size={verticalScale(22)}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: spacingY._20 }}
          >
            <View style={styles.navBar}>
              <View style={styles.tabs}>
                <TouchableOpacity
                  onPress={() => setSelectedTab(0)}
                  style={[
                    styles.tabStyle,
                    selectedTab === 0 && styles.activeTabStyle,
                  ]}
                >
                  <Typo>Direct Message</Typo>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setSelectedTab(1)}
                  style={[
                    styles.tabStyle,
                    selectedTab === 1 && styles.activeTabStyle,
                  ]}
                >
                  <Typo>Groups</Typo>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.conversationList}>
              {selectedTab === 0 &&
                directConversations.map((item: any, index: number) => (
                  <ConversationItem
                    item={item}
                    key={index}
                    router={router}
                    showDivider={directConversations.length !== index + 1}
                  />
                ))}
            </View>
            {!loading && selectedTab === 0 && directConversations.length === 0}{' '}
            (
            <Typo style={{ textAlign: 'center' }}>
              {' '}
              {`You don't have any messages`}
            </Typo>
            ){!loading && selectedTab === 0 && groupConversations.length === 0}{' '}
            (
            <Typo style={{ textAlign: 'center' }}>
              {' '}
              {`You haven't joined any groups yet`}
            </Typo>
            ){loading && <Loading />}
          </ScrollView>
        </View>
      </View>

      <Button
        style={styles.floatingButton}
        onPress={() =>
          router.push({
            pathname: '/(main)/newConversationModal',
            params: { isGroup: selectedTab },
          })
        }
      >
        <Icons.Plus
          color={colors.black}
          weight='bold'
          size={verticalScale(24)}
        />
      </Button>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacingX._20,
    gap: spacingY._15,
    paddingTop: spacingY._15,
    paddingBottom: spacingY._20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius._50,
    borderTopRightRadius: radius._50,
    borderCurve: 'continuous',
    overflow: 'hidden',
    paddingHorizontal: spacingY._20,
  },
  navBar: {
    flexDirection: 'row',
    gap: spacingX._15,
    alignItems: 'center',
    paddingHorizontal: spacingX._10,
  },
  tabs: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabStyle: {
    paddingVertical: spacingY._10,
    paddingHorizontal: spacingX._20,
    borderRadius: radius.full,
    backgroundColor: colors.neutral100,
  },
  activeTabStyle: {
    backgroundColor: colors.primaryLight,
  },
  conversationList: {
    paddingVertical: spacingY._20,
  },
  settingIcon: {
    padding: spacingY._10,
    backgroundColor: colors.neutral700,
    borderRadius: radius.full,
  },
  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: 'absolute',
    bottom: verticalScale(30),
    right: verticalScale(30),
  },
});
