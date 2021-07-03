import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Keyboard,
  TextInput,
} from 'react-native';
import Animated from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import autoCompleteRequest from '../../services/autoCompleteRequest';
import {ParamsContext} from '../../contexts/paramsContext/context';

import {
  StyledAnimated,
  InputView,
  StyledTouchable,
  ListView,
  StyledInput,
  RowView,
  Container,
} from './styles';
import {FlexView} from '../Containers';
import {DrawerActions, useNavigation} from '@react-navigation/native';

type Props = {
  refreshingGallery: React.MutableRefObject<boolean>;
  refreshGallery: () => void;
  headerHeight: number;
  scrollY: Animated.Value<0>;
};

function Navbar({
  headerHeight,
  scrollY,
  refreshGallery,
  refreshingGallery,
}: Props) {
  const {params, paramsDispatch} = useContext(ParamsContext);
  const navigation = useNavigation();
  const input = useRef<TextInput>(null);
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [toggleAnimation, setToggleAnimation] = useState(true);
  const diffClamp = Animated.diffClamp(scrollY, 0, headerHeight);
  const translateY = Animated.interpolate(diffClamp, {
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
  });

  const AutoCompletefetch = async (query: string) => {
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
    input.current?.blur();
    let tags = inputText.split(' ');
    tags = tags.filter(tag => tag !== '');
    setInputText('');

    paramsDispatch({type: 'addTag', payload: tags});
  };

  const memoizedRenderItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        onPress={() => {
          setInputText('');
          setData([]);

          paramsDispatch({type: 'addTag', payload: [item.value]});
        }}>
        <View style={{backgroundColor: 'gray', height: 40}}>
          <Text>{item.label}</Text>
        </View>
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <Container>
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
                    paramsDispatch({type: 'removeTag', payload: index});
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
            onChangeText={query => {
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
              input.current?.clear();
              Keyboard.dismiss();
              setData([]);

              // navigation.dispatch(DrawerActions.toggleDrawer());
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
    </Container>
  );
}

export default Navbar;
