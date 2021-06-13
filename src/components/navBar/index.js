import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useContext,
  useCallback,
} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Keyboard,
  // AsyncStorage,
} from 'react-native';
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
// import Reactotron from 'reactotron-react-native';

function Navbar({headerHeight, scrollY, refreshGallery, refreshingGallery}) {
  const {params, setParams} = useContext(ParamsContext);
  const input = useRef(null);
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [toggleAnimation, setToggleAnimation] = useState(true);
  const diffClamp = Animated.diffClamp(scrollY, 0, headerHeight);
  const translateY = Animated.interpolate(diffClamp, {
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
  });

  // useEffect(() => {
  //   Reactotron.onCustomCommand('test', () => Reactotron.log(inputText));
  // }, []);
  const AutoCompletefetch = async (query) => {
    const result = await autoCompleteRequest(query);
    setData(result);
  };

  useEffect(() => {
    if (toggleAnimation) {
      scrollY.setValue(0);
    }
  }, [toggleAnimation]);

  useEffect(() => {
    if (refreshingGallery.current) {
      refreshingGallery.current = false;
      refreshGallery();
    }
  }, [params.arrayTags]);

  const refresh = () => {
    refreshingGallery.current = true;
    input.current.blur();
    let tags = inputText.split(' ');
    tags = tags.filter((tag) => tag !== '');
    setInputText('');
    setParams((prev) => ({
      ...prev,
      arrayTags: [...prev.arrayTags, ...tags],
    }));
  };

  const memoizedRenderItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        onPress={() => {
          setInputText('');
          setData([]);
          setParams((prev) => ({
            ...prev,
            arrayTags: [...prev.arrayTags, item.value],
          }));
        }}>
        <View style={{backgroundColor: 'gray', height: 40}}>
          <Text>{item.label}</Text>
        </View>
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <FlexView>
      <StyledAnimated
        headerHeight={headerHeight}
        style={{
          transform: [{translateY: toggleAnimation ? translateY : 0}],
        }}>
        <InputView>
          <RowView>
            {params.arrayTags.map((item, index) => (
              <RowView key={`${index}View`}>
                <Text key={index} style={{marginLeft: 5}}>
                  {item}
                </Text>
                <TouchableOpacity
                  key={`${index}Touchable`}
                  onPress={() => {
                    let tempParams = params.arrayTags.filter(
                      (element, filterIndex) => {
                        return filterIndex !== index;
                      },
                    );
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
            onSubmitEditing={refresh}
            autoCapitalize={'none'}
            onFocus={() => {
              setData([]);
              setToggleAnimation(false);
            }}
            onBlur={() => setToggleAnimation(true)}
            ref={input}
            onChangeText={(query) => {
              setInputText(query);
              if (query === '') {
                return setData([]);
              }
              AutoCompletefetch(query);
            }}
            value={inputText}
            editable={true}
          />
          <StyledTouchable
            onPress={() => {
              input.current.clear();
              Keyboard.dismiss();
              setData([]);
            }}>
            <MaterialIcons size={25} name={'close'} />
          </StyledTouchable>
        </InputView>
      </StyledAnimated>
      <ListView headerHeight={headerHeight}>
        {!toggleAnimation && (
          <FlatList
            keyboardShouldPersistTaps={'handled'}
            data={data}
            keyExtractor={(item, index) => String(index)}
            renderItem={memoizedRenderItem}
          />
        )}
      </ListView>
    </FlexView>
  );
}

export default Navbar;
