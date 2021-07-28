import React, {useContext, useEffect, useState} from 'react';
import {
  Body,
  Container,
  Head,
  LabelContainer,
  Label,
  StyledInput,
  StyledButton,
  ProfileItemContainer,
  LogoutToucheable,
} from './styles';

import {ThemeContext} from 'styled-components';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackTypes} from '../../router';
import ProfileIcons from '../../components/ProfileItem';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {UserContext} from '../../contexts/userContext/context';
import {DanBooru} from '../../services/danbooru';

type Props = {
  navigation: StackNavigationProp<StackTypes>;
};

type UserInfoTypes = {
  username: string;
  apiKey: string;
};

function AccountScreen({navigation}: Props) {
  const {user, handleLogin, handleLogout} = useContext(UserContext);
  const themeContext = useContext(ThemeContext);
  const [userInfo, setUserInfo] = useState<UserInfoTypes>({
    username: '',
    apiKey: '',
  });
  const danbooru = new DanBooru();
  useEffect(() => {
    if (user) {
      navigation.setOptions({
        headerRight: () => (
          <LogoutToucheable onPress={async () => await handleLogout()}>
            <Ionicons
              name={'log-in-outline'}
              size={30}
              color={themeContext.iconColor}
            />
          </LogoutToucheable>
        ),
      });
    }
  }, [user]);

  return (
    <Container>
      {user ? (
        <>
          <Head>
            <Ionicons
              name={'ios-person-circle-sharp'}
              size={100}
              color={themeContext.iconColor}
            />
            <Label size={28}>{user.username}</Label>
            <Label size={16}>ID: 794231</Label>
          </Head>
          <Body>
            <ProfileItemContainer>
              <ProfileIcons
                iconName="images"
                text="Posts"
                onPress={() => {
                  navigation.navigate('Gallery', {
                    tags: [`user:${user.username}`],
                    drawer: false,
                  });
                }}
              />
              <ProfileIcons
                iconName="heart-circle"
                text="Favorites"
                onPress={() => {
                  navigation.navigate('Gallery', {
                    tags: [`fav:${user.username}`],
                    drawer: false,
                  });
                }}
              />
              <ProfileIcons
                iconName="list"
                text="Saved Posts"
                onPress={() => {
                  navigation.navigate('Gallery', {
                    tags: ['user:Yusuf-chan'],
                    drawer: false,
                  });
                }}
              />
            </ProfileItemContainer>
          </Body>
        </>
      ) : (
        <>
          <Head>
            <Label size={28}>Login</Label>
          </Head>
          <Body>
            <LabelContainer>
              <Label size={14}>Username</Label>
            </LabelContainer>
            <StyledInput
              onChangeText={query =>
                setUserInfo(prev => ({...prev, username: query}))
              }
              value={userInfo.username}
            />
            <LabelContainer>
              <Label size={14}>API key</Label>
            </LabelContainer>
            <StyledInput
              value={userInfo.apiKey}
              onChangeText={query =>
                setUserInfo(prev => ({...prev, apiKey: query}))
              }
            />
            <StyledButton
              onPress={async () => {
                try {
                  const userData = await danbooru.getUserInfo(userInfo);
                  if (userData) {
                    await handleLogin({
                      username: userInfo.username,
                      apiKey: userInfo.apiKey,
                      id: userData.id,
                    });
                  }
                } catch (error) {
                  console.log(error);
                }
              }}>
              <Label size={20}>Login</Label>
            </StyledButton>
          </Body>
        </>
      )}
    </Container>
  );
}

export default AccountScreen;
