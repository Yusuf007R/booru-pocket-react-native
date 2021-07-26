import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  Keyboard,
  TextInput,
} from 'react-native';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  StyledAnimated,
  InputView,
  StyledTouchable,
  ListView,
  StyledInput,
  Container,
  ItemContainer,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import {DanBooru} from '../../services/danbooru';
import {useParamsType} from '../../hooks/useParams';
import {HeaderBackButton} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerTypes} from '../../router';

type Props = {
  refreshingGallery: React.MutableRefObject<boolean>;
  refreshGallery: () => void;
  headerHeight: number;
  scrollY: Animated.Value<0>;
  paramsObject: useParamsType;
  drawer: boolean;
};

function Navbar({
  headerHeight,
  scrollY,
  refreshGallery,
  refreshingGallery,
  paramsObject,
  drawer,
}: Props) {
  const navigation = useNavigation<DrawerNavigationProp<DrawerTypes>>();
  const Danbooru = new DanBooru();

  // const {params, paramsDispatch} = useContext(ParamsContext);
  const {params, paramsDispatch} = paramsObject;
  const input = useRef<TextInput>(null);
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState(params.arrayTags.join(' '));
  const [toggleAnimation, setToggleAnimation] = useState(true);
  const diffClamp = Animated.diffClamp(scrollY, 0, headerHeight);
  const translateY = Animated.interpolate(diffClamp, {
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
  });

  const AutoCompletefetch = async (query: string) => {
    const result = await Danbooru.autoCompleteRequest(query);
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
    paramsDispatch({type: 'changeTags', payload: tags});
  };

  const memoizedRenderItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        onPress={() => {
          let tagsString = '';
          setInputText(prev => {
            const lastIndex = prev.lastIndexOf(' ');
            tagsString = prev
              .substring(0, lastIndex + 1)
              .concat(`${item.value} `);
            return tagsString;
          });
          let tags = tagsString.split(' ').filter(tag => tag !== '');
          setData([]);
          paramsDispatch({type: 'changeTags', payload: tags});
        }}>
        <ItemContainer>
          <Text>{item.label}</Text>
        </ItemContainer>
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
          {drawer ? (
            <StyledTouchable
              marginLeft={5}
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              <Ionicons size={25} name={'menu'} />
            </StyledTouchable>
          ) : (
            <HeaderBackButton onPress={() => navigation.goBack()} />
          )}

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
              const firstIndex = query.indexOf(' ');
              if (firstIndex > 1) {
                query = query.substring(firstIndex, query.length).trim();
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
            }}>
            <Ionicons size={25} name={'close'} />
          </StyledTouchable>
        </InputView>
      </StyledAnimated>
      <ListView headerHeight={headerHeight}>
        {!toggleAnimation && (
          <FlatList
            keyboardShouldPersistTaps={'handled'}
            data={data}
            keyExtractor={(_, index) => String(index)}
            renderItem={memoizedRenderItem}
          />
        )}
      </ListView>
    </Container>
  );
}

export default Navbar;
