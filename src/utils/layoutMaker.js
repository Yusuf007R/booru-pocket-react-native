import {Dimensions, View} from 'react-native';
import {LayoutProvider} from 'recyclerlistview';

const ViewTypes = {
  FIRST: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

export const layoutMaker = (landscape, headerHeight) => {
  const {width, height} = Dimensions.get('window');
  return new LayoutProvider(
    (index) => {
      if (index === 0) {
        return ViewTypes.FIRST;
      }
      if (index % 2 === 0) {
        return ViewTypes.HALF_LEFT;
      } else {
        return ViewTypes.HALF_RIGHT;
      }
    },
    (type, dim) => {
      switch (type) {
        case ViewTypes.FIRST:
          dim.width = width;
          dim.height = headerHeight - 5;
          break;
        case ViewTypes.HALF_LEFT:
          dim.width = width / 2;
          dim.height = landscape ? height / 2 : width / 2;

          break;
        case ViewTypes.HALF_RIGHT:
          dim.width = width / 2 - 0.001;
          dim.height = landscape ? height / 2 : width / 2;

          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );
};
