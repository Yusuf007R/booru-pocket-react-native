import React, {useEffect, useState} from 'react';
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
};

export default function ModalComponent({
  toggleModal,
  children,
  isVisible,
  position,
  backdropColor,
}: Props) {
  const {width, height} = useDimentions();

  const [pos, setPos] = useState({left: 0, top: 0});
  const [layout, setLayout] = useState<LayoutRectangle>();

  useEffect(() => {
    const posx = () => {
      if (!position || !layout) {
        return {
          left: 0,
          top: 0,
        };
      }
      let x = position.pageX - position.locationX;
      let y = position.pageY - position.locationY;
      if (x + layout.width > width) {
        x -= layout.width;
      }
      if (y + layout.height > height) {
        y -= layout.height;
      }

      setPos({left: x, top: y});
    };

    posx();
  }, [layout, position]);

  return (
    <StyledModal
      onBackdropPress={toggleModal}
      deviceHeight={height}
      deviceWidth={width}
      animationIn="fadeIn"
      panResponderThreshold={0}
      animationOut="fadeOut"
      backdropColor={backdropColor || 'black'}
      isVisible={isVisible}>
      <ModalContainer
        onLayout={e => {
          const {
            nativeEvent: {layout: tempLayout},
          } = e;
          setLayout(tempLayout);
        }}
        style={{
          ...pos,
        }}>
        <Shadow startColor="rgba(0,0,0,0.1)">{children}</Shadow>
      </ModalContainer>
    </StyledModal>
  );
}
