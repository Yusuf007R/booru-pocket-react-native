import {useEffect, useState} from 'react';
import {Dimensions, Platform} from 'react-native';

export default function useDimentions() {
  const [dimentions, setDimentions] = useState<{width: number; height: number}>(
    {
      width: Dimensions.get('window').width,
      height:
        Platform.OS === 'ios'
          ? Dimensions.get('window').height
          : require('react-native-extra-dimensions-android').get(
              'REAL_WINDOW_HEIGHT',
            ),
    },
  );

  const onChange = () => {
    setDimentions({
      width: Dimensions.get('window').width,
      height:
        Platform.OS === 'ios'
          ? Dimensions.get('window').height
          : require('react-native-extra-dimensions-android').get(
              'REAL_WINDOW_HEIGHT',
            ),
    });
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange);
  }, []);

  return {...dimentions};
}
