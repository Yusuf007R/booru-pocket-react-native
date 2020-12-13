import React, {useEffect, useRef, useState, useMemo, useContext} from 'react';
import {View, FlatList, TouchableOpacity, Text, Keyboard} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  StyledAnimated,
  InputView,
  StyledTouchable,
  ListView,
  StyledInput,
  RowView,
} from './styles';
import autoCompleteRequest from '../../services/autoCompleteRequest';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ParamsContext} from '../../contexts/paramsContext/context';
import {FlexView} from '../Containers/';

function Navbar({headerHeight, scrollY, refreshGallery}) {
  const {params, setParams} = useContext(ParamsContext);
  const input = useRef(null);
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [toggleAnimation, setToggleAnimation] = useState(true);
  const diffClamp = Animated.diffClamp(scrollY, 0, headerHeight);
  const translateY = Animated.interpolate(diffClamp, {
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
  });

  // console.log('re-render');

  useEffect(() => {
    if (input.current.isFocused()) {
      return setToggleAnimation(false);
    }
    if (data.length && isFetching && toggleAnimation) {
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
      setIsFetching(false);
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
        headerHeight={headerHeight}
        style={{
          transform: [{translateY: toggleAnimation ? translateY : 0}],
        }}>
        <InputView>
          <RowView>
            {params.arrayTags
              .filter((text) => text !== 'rating:safe')
              .map((item, index) => (
                <RowView key={`${index}View`}>
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
                </RowView>
              ))}
          </RowView>

          <StyledInput
            onSubmitEditing={refreshGallery}
            autoCapitalize={'none'}
            onFocus={() => setToggleAnimation(false)}
            ref={input}
            onChangeText={(query) => {
              if (/\s/.test(query)) {
                if (query.length > 1) {
                  setIsFetching(false);
                  setData([]);
                  setParams((prev) => ({
                    ...prev,
                    arrayTags: [...prev.arrayTags, query],
                  }));
                  setInputText('');
                  return input.current.clear();
                }
                console.log('fuera');
                setInputText('');
                return;
              } else {
                setInputText(query);
              }
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
      <ListView headerHeight={headerHeight}>
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
