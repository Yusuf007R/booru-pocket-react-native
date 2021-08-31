import React, {Fragment, useEffect, useState} from 'react';
import Animated from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerTypes} from '../../../router';
import NavBarContainer from '../navBarComponents/navBarContainer';
import NavbarIcon from '../navBarComponents/NavBarIcon';
import Dropdown from '../../Dropdown';
import {RowContainer, StyledText} from './styles';
import ModalComponent from '../../Modal';
import {NativeTouchEvent} from 'react-native';

type Props = {
  headerHeight: number;
  scrollY: Animated.Value<0>;
  setParams: React.Dispatch<
    React.SetStateAction<{
      dateObject: Date;
      scale: OptionType;
    }>
  >;
};
export type OptionType = 'day' | 'month' | 'week';

function PopularNavBar({headerHeight, scrollY, setParams}: Props) {
  const navigation = useNavigation<DrawerNavigationProp<DrawerTypes>>();
  const [toggleAnimation, setToggleAnimation] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isOptionModalVisible, setIsOptionModalVisible] = useState(false);
  const [position, setPosition] = useState<NativeTouchEvent>();
  const toggleDatePicker = () => {
    setDatePickerVisibility(prev => !prev);
  };
  const openOptionModal = () => {
    setIsOptionModalVisible(true);
  };
  const closeOptionModal = () => {
    setIsOptionModalVisible(false);
  };

  const selectOption = (type: OptionType) => {
    setParams(prev => ({...prev, scale: type}));
    setToggleAnimation(true);
    closeOptionModal();
  };

  useEffect(() => {
    if (toggleAnimation) {
      scrollY.setValue(0);
    }
  }, [toggleAnimation]);

  return (
    <Fragment>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date: Date) => {
          toggleDatePicker();
          setToggleAnimation(true);
          setParams(prev => ({...prev, dateObject: date}));
        }}
        onCancel={() => {
          toggleDatePicker();
          setToggleAnimation(true);
        }}
      />

      <NavBarContainer
        toggleAnimation={toggleAnimation}
        scrollY={scrollY}
        headerHeight={headerHeight}>
        <RowContainer>
          <NavbarIcon
            size={25}
            name={'menu'}
            onPress={() => {
              navigation.toggleDrawer();
            }}
            margin={5}
          />
          <StyledText>Popular posts </StyledText>
        </RowContainer>
        <RowContainer>
          <NavbarIcon
            size={23}
            name={'calendar-outline'}
            onPress={() => {
              toggleDatePicker();
              setToggleAnimation(false);
            }}
            margin={5}
          />
          <NavbarIcon
            size={23}
            name={'list'}
            onPress={e => {
              if (e) {
                const {nativeEvent} = e;
                setPosition(nativeEvent);
              }
              openOptionModal();
              setToggleAnimation(false);
            }}
            margin={5}
          />
        </RowContainer>
      </NavBarContainer>
      <ModalComponent
        offset={{top: -10}}
        backdropColor="transparent"
        isVisible={isOptionModalVisible}
        toggleModal={() => {
          closeOptionModal();
          setToggleAnimation(true);
        }}
        position={position}>
        <Dropdown
          options={['day', 'week', 'month']}
          icons={['today', 'calendar-sharp', 'calendar-outline']}
          onPress={selectOption}
        />
      </ModalComponent>
    </Fragment>
  );
}

export default PopularNavBar;
