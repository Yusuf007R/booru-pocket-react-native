import React, {useCallback, useEffect, useState} from 'react';
import {LayoutRectangle, NativeTouchEvent} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import useDimentions from '../../hooks/useDimentions';
import {ModalContainer, StyledModal} from './styles';

type Props = {
  children: React.ReactNode;
  toggleModal: () => void;
  isVisible: boolean;
  position?: NativeTouchEvent;
  backdropColor?: string;
  offset: {top?: number; left?: number};
};

export default function ModalComponent({
  toggleModal,
  children,
  isVisible,
  position,
  backdropColor,
  offset,
}: Props) {
  const {width, height} = useDimentions();
  const [pos, setPos] = useState({left: 0, top: 0});
  const [layout, setLayout] = useState<LayoutRectangle>();
  const [calculated, setCalculated] = useState(false);

  const onLayout = useCallback(e => {
    const {
      nativeEvent: {layout: tempLayout},
    } = e;
    setLayout(tempLayout);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setCalculated(false);
    }
  }, [isVisible]);

  useEffect(() => {
    const calcPos = () => {
      if (!position || !layout) {
        return {
          left: -1000,
          top: -1000,
        };
      }
      let tempLeft = position.pageX - position.locationX;
      let tempTop = position.pageY - position.locationY;
      if (tempLeft + layout.width > width) {
        tempLeft -= layout.width;
      }
      if (tempTop + layout.height > height) {
        tempTop -= layout.height;
      }
      //if top or left properties are not undefined they will add their values to the position calculated.
      if (offset) {
        if (offset.left) {
          tempLeft += offset.left;
        }
        if (offset.top) {
          tempTop += offset.top;
        }
      }
      setPos({left: tempLeft, top: tempTop});
      setCalculated(true);
    };

    calcPos();
  }, [height, layout, offset, position, width]);

  return (
    <StyledModal
      onBackdropPress={toggleModal}
      deviceHeight={height}
      deviceWidth={width}
      onBackButtonPress={toggleModal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropColor={backdropColor || 'black'}
      isVisible={isVisible}>
      <ModalContainer
        onLayout={onLayout}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...pos,
          opacity: calculated ? 1 : 0,
        }}>
        <Shadow startColor="rgba(0,0,0,0.05)">{children}</Shadow>
      </ModalContainer>
    </StyledModal>
  );
}
