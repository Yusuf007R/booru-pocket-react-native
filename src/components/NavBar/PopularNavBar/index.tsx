import React, {Fragment, useEffect, useState} from 'react';
import Animated from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerTypes} from '../../../router';
import NavBarContainer from '../navBarComponents/navBarContainer';
import NavbarIcon from '../navBarComponents/NavBarIcon';
import {OptionModal, RowContainer, StyledText} from './styles';
import PopularIcon from '../navBarComponents/PopularIcon';

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
  const [isOptionModalVisible, setisOptionModalVisible] = useState(false);

  const toggleDatePicker = () => {
    setDatePickerVisibility(prev => !prev);
  };

  const toggleOptionModal = () => {
    setisOptionModalVisible(prev => !prev);
  };

  const selectOption = (type: OptionType) => {
    setParams(prev => ({...prev, scale: type}));
    setToggleAnimation(true);
    toggleOptionModal();
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
      {isOptionModalVisible && (
        <OptionModal>
          <PopularIcon
            name={'today'}
            optionType={'day'}
            onPress={selectOption}
          />
          <PopularIcon
            name={'calendar-outline'}
            optionType={'week'}
            onPress={selectOption}
          />
          <PopularIcon
            name={'calendar-sharp'}
            optionType={'month'}
            onPress={selectOption}
          />
        </OptionModal>
      )}
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
            onPress={() => {
              toggleOptionModal();
              setToggleAnimation(false);
            }}
            margin={5}
          />
        </RowContainer>
      </NavBarContainer>
    </Fragment>
  );
}

export default PopularNavBar;
