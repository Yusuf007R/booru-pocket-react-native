import React, {useEffect, useRef, useState, useCallback, Fragment} from 'react';
import {
  FlatList,
  Text,
  Keyboard,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {ListView, StyledInput, ItemContainer} from './styles';
import {useNavigation} from '@react-navigation/native';
import {DanBooru} from '../../../services/danbooru';
import {useParamsType} from '../../../hooks/useParams';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerTypes} from '../../../router';
import NavBarContainer from '../navBarComponents/navBarContainer';
import NavbarIcon from '../navBarComponents/NavBarIcon';
import {AutoCompleteType} from '../../../services/danbooru.types';

type Props = {
  refreshGallery: () => void;
  headerHeight: number;
  scrollY: Animated.Value<0>;
  paramsObject: useParamsType;
  type: 'Gallery' | 'Stack';
  refreshing: React.MutableRefObject<boolean>;
};

function Navbar({
  headerHeight,
  scrollY,
  refreshGallery,
  paramsObject,
  type,
  refreshing,
}: Props) {
  const navigation = useNavigation<DrawerNavigationProp<DrawerTypes>>();
  const Danbooru = new DanBooru();
  const {params, paramsDispatch} = paramsObject;
  const input = useRef<TextInput>(null);
  const [data, setData] = useState<AutoCompleteType[]>([]);
  const [inputText, setInputText] = useState(params.arrayTags.join(' '));
  const [toggleAnimation, setToggleAnimation] = useState(true);

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
    if (refreshing.current) {
      refreshing.current = false;
      refreshGallery();
    }
  }, [params.arrayTags]);

  const refresh = () => {
    refreshing.current = true;
    input.current?.blur();
    let tags = inputText.split(' ');
    tags = tags.filter(tag => tag !== '');
    paramsDispatch({type: 'changeTags', payload: tags});
  };

  const memoizedRenderItem = useCallback(
    ({item}: {item: AutoCompleteType}) => (
      <TouchableHighlight
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
          <Text>{item.value}</Text>
        </ItemContainer>
      </TouchableHighlight>
    ),
    [],
  );

  return (
    <Fragment>
      <NavBarContainer
        toggleAnimation={toggleAnimation}
        scrollY={scrollY}
        headerHeight={headerHeight}>
        {type === 'Gallery' ? (
          <NavbarIcon
            size={25}
            name={'menu'}
            onPress={() => {
              navigation.toggleDrawer();
            }}
            margin={5}
          />
        ) : (
          <NavbarIcon
            size={25}
            name={'arrow-back'}
            onPress={() => {
              navigation.goBack();
            }}
            margin={5}
          />
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
        <NavbarIcon
          size={25}
          name={'close'}
          onPress={() => {
            input.current?.clear();
            Keyboard.dismiss();
            setData([]);
          }}
          margin={5}
        />
      </NavBarContainer>
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
    </Fragment>
  );
}

export default Navbar;
