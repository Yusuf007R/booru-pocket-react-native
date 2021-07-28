import DrawerItem from '../DrawerItem';
import React, {useContext} from 'react';
import {Divider} from '../../Divider';
import {
  Container,
  Title,
  TitleContainer,
  HeadContainer,
  BodyContainer,
  BottomContent,
  TopContent,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import {Alert, Linking, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackTypes} from '../../../router';
import {UserContext} from '../../../contexts/userContext/context';

function DrawerContent() {
  const {user} = useContext(UserContext);

  const navigation = useNavigation<StackNavigationProp<StackTypes>>();

  return (
    <Container>
      <HeadContainer>
        <TitleContainer>
          <Title>BooruPOCKET</Title>
        </TitleContainer>
        <Divider />
      </HeadContainer>
      <BodyContainer>
        <TopContent>
          <DrawerItem
            iconName="person-circle"
            text="Accounts"
            onPress={() => {
              navigation.navigate('Account');
            }}
          />
          <DrawerItem
            iconName="heart"
            text="Favorites"
            onPress={() => {
              if (user) {
                return navigation.navigate('Gallery', {
                  tags: [`fav:${user.username}`],
                  drawer: false,
                });
              }
              Alert.alert('Auth', 'you need to login before using this option');
            }}
          />
          <DrawerItem
            iconName="list"
            text="Saved Posts"
            onPress={() => {
              console.log('pressed');
            }}
          />
          <DrawerItem
            iconName="time-outline"
            text="History"
            onPress={() => {
              console.log('pressed');
            }}
          />
          <DrawerItem
            iconName="search"
            text="SauceNao"
            onPress={() => {
              console.log('pressed');
            }}
          />
        </TopContent>
        <View>
          <Divider />
          <BottomContent>
            <DrawerItem
              iconName="logo-github"
              text="Github"
              onPress={() => {
                Linking.openURL(
                  'https://github.com/Yusuf007R/booru-pocket-react-native',
                );
              }}
            />
            <DrawerItem
              iconName="settings-outline"
              text="Settings"
              onPress={() => {
                navigation.navigate('Settings');
              }}
            />
            <DrawerItem
              iconName="information-circle-outline"
              text="About"
              onPress={() => {
                console.log('pressed');
              }}
            />
          </BottomContent>
        </View>
      </BodyContainer>
    </Container>
  );
}

export default DrawerContent;
