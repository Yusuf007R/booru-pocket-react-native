import DrawerItem from '../DrawerItem';
import React from 'react';
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
import {Linking} from 'react-native';

function DrawerContent() {
  const navigation = useNavigation();

  return (
    <Container>
      <HeadContainer>
        <TitleContainer>
          <Title>BooruPocket</Title>
        </TitleContainer>
        <Divider />
      </HeadContainer>
      <BodyContainer>
        <TopContent>
          <DrawerItem
            iconName="person-circle"
            text="Accounts"
            onPress={() => {
              console.log('pressed');
            }}
          />
          <DrawerItem
            iconName="heart"
            text="Favorites"
            onPress={() => {
              console.log('pressed');
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
      </BodyContainer>
    </Container>
  );
}

export default DrawerContent;
