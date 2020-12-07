import React, {useEffect, useState} from 'react';
import {View, TextInput, FlatList, TouchableOpacity, Text} from 'react-native';
import Animated from 'react-native-reanimated';
import {StyledAnimated, StyledView} from './styles';
import {FlexView} from '../Containers';
import autoCompleteRequest from '../../services/autoCompleteRequest';

function Navbar({ListRef, HeaderHeight, scrollY}) {
  const [data, setData] = useState([]);
  const [animation, setAnimation] = useState(true);
  const diffClamp = Animated.diffClamp(scrollY, 0, HeaderHeight);
  const translateY = Animated.interpolate(diffClamp, {
    inputRange: [0, HeaderHeight],
    outputRange: [0, -HeaderHeight],
  });

  useEffect(() => {
    if (data.length) {
      scrollY.setValue(0);
      return setAnimation(false);
    }
    setAnimation(true);
  }, [data]);

  const request = async (query) => {
    const result = await autoCompleteRequest(query);
    setData(result);
  };

  return (
    <FlexView>
      <StyledAnimated
        HeaderHeight={HeaderHeight}
        style={{transform: animation && [{translateY: translateY}]}}>
        <StyledView>
          <TextInput
            onChangeText={(query) => {
              request(query);
            }}
          />
        </StyledView>
      </StyledAnimated>
      <View
        style={{
          width: '90%',
          position: 'absolute',
          top: HeaderHeight,
          left: 20,
          right: 20,
          zIndex: 1000,
        }}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={() => setData([])}>
                <View style={{backgroundColor: 'gray', height: 40}}>
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </FlexView>
  );
}

export default Navbar;
