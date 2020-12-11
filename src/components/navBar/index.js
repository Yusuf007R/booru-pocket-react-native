import React, {useEffect, useRef, useState, useMemo, useContext} from 'react';
import {View, FlatList, TouchableOpacity, Text, Keyboard} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  StyledAnimated,
  InputView,
  StyledTouchable,
  ListView,
  StyledInput,
} from './styles';
import {FlexView} from '../Containers';
import autoCompleteRequest from '../../services/autoCompleteRequest';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ParamsContext} from '../../contexts/paramsContext/context';

function Navbar({HeaderHeight, scrollY, refreshGallery}) {
  const {params, setParams} = useContext(ParamsContext);
  const input = useRef(null);
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [toggleAnimation, setToggleAnimation] = useState(true);
  const diffClamp = Animated.diffClamp(scrollY, 0, HeaderHeight);
  const translateY = Animated.interpolate(diffClamp, {
    inputRange: [0, HeaderHeight],
    outputRange: [0, -HeaderHeight],
  });

  useEffect(() => {
    if ((data.length || isFetching) && toggleAnimation) {
      return setToggleAnimation(false);
    }
    if (!toggleAnimation && !data.length) {
      setToggleAnimation(true);
    }
  }, [data]);

  const AutoCompletefetch = async (query) => {
    const result = await autoCompleteRequest(query);
    setData(result);
  };

  useEffect(() => {
    if (inputText === '') {
      return setData([]);
    }
    setIsFetching(true);
    AutoCompletefetch(inputText);
  }, [inputText]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          input.current.clear();
          setIsFetching(false);
          setData([]);
          setParams((prev) => ({
            ...prev,
            arrayTags: [...prev.arrayTags, item.name],
          }));
        }}>
        <View style={{backgroundColor: 'gray', height: 40}}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const memoizedValue = useMemo(() => renderItem, [data]);

  return (
    <FlexView>
      <StyledAnimated
        HeaderHeight={HeaderHeight}
        style={{
          transform: [{translateY: toggleAnimation ? translateY : 0}],
        }}>
        <InputView>
          <View
            style={{
              height: 45,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            {params.arrayTags
              .filter((text) => text !== 'rating:safe')
              .map((item, index) => (
                <View
                  key={`${index}View`}
                  style={{
                    height: 45,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text key={index} style={{marginLeft: 5}}>
                    {item}
                  </Text>
                  <TouchableOpacity
                    key={`${index}Touchable`}
                    onPress={() => {
                      let tempParams = params.arrayTags.filter((element) => {
                        return element !== item;
                      });
                      setParams((prev) => ({...prev, arrayTags: tempParams}));
                    }}>
                    <MaterialIcons
                      key={`${index}Icon`}
                      size={20}
                      name={'close'}
                    />
                  </TouchableOpacity>
                </View>
              ))}
          </View>

          <StyledInput
            onKeyPress={(event) => {
              if (event.nativeEvent.key === ' ') {
                setIsFetching(false);
                setData([]);
                setParams((prev) => ({
                  ...prev,
                  arrayTags: [
                    ...prev.arrayTags,
                    input.current._internalFiberInstanceHandleDEV.memoizedProps
                      .value,
                  ],
                }));
                input.current.clear();
              }
            }}
            onSubmitEditing={refreshGallery}
            autoCapitalize={'none'}
            onFocus={() => setToggleAnimation(false)}
            ref={input}
            onChangeText={(query) => {
              setInputText(query);
            }}
            value={inputText}
            editable={true}
          />
          <StyledTouchable
            onPress={() => {
              input.current.clear();
              Keyboard.dismiss();
              setIsFetching(false);
              setData([]);
            }}>
            <MaterialIcons size={25} name={'close'} />
          </StyledTouchable>
        </InputView>
      </StyledAnimated>
      <ListView HeaderHeight={HeaderHeight}>
        <FlatList
          keyboardShouldPersistTaps={'handled'}
          data={data}
          keyExtractor={(item, index) => String(index)}
          renderItem={memoizedValue}
        />
      </ListView>
    </FlexView>
  );
}

export default Navbar;
