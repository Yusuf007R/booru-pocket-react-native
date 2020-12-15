import {Dimensions} from 'react-native';
import {LayoutProvider} from 'recyclerlistview';

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

let {width} = Dimensions.get('window');

export const layoutMaker = () =>
  new LayoutProvider(
    (index) => {
      if (index % 2 === 0) {
        return ViewTypes.HALF_LEFT;
      } else {
        return ViewTypes.HALF_RIGHT;
      }
    },
    (type, dim) => {
      switch (type) {
        case ViewTypes.HALF_LEFT:
          dim.width = width / 2;
          dim.height = width / 2;
          break;
        case ViewTypes.HALF_RIGHT:
          dim.width = width / 2 - 0.001;
          dim.height = width / 2;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );
