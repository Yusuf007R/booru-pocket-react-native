// direct modification(basically a copypaste to change minor things) of the default react-native-spring-scrollview header

import React from 'react';
import {RefreshHeader} from 'react-native-spring-scrollview';
import {ActivityIndicator, Animated, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from 'styled-components/native';
import {Container, StyledText} from './styles';
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export class RefreshComponent extends RefreshHeader {
  static height = 70;
  static style = 'stickyContent';

  static contextType = ThemeContext;

  render() {
    return (
      <Container>
        {this._renderIcon()}
        <View>
          <StyledText> {this.getTitle()}</StyledText>
          {this.renderContent()}
        </View>
      </Container>
    );
  }

  _renderIcon() {
    const s = this.state.status;
    if (s === 'refreshing') {
      return <ActivityIndicator size={'large'} color={this.context.main} />;
    }
    const {maxHeight, offset} = this.props;
    return (
      <AnimatedIcon
        name={'arrow-up'}
        size={30}
        color={this.context.main}
        style={{
          transform: [
            {
              rotate: offset.interpolate({
                inputRange: [-maxHeight - 1 - 10, -maxHeight - 10, -50, -49],
                outputRange: ['180deg', '180deg', '0deg', '0deg'],
              }),
            },
          ],
        }}
      />
    );
  }

  renderContent() {
    return null;
  }

  getTitle() {
    const s = this.state.status;
    if (s === 'pulling' || s === 'waiting') {
      return 'Pull down to refresh';
    } else if (s === 'pullingEnough') {
      return 'Release to refresh';
    } else if (s === 'refreshing') {
      return 'Refreshing ...';
    } else if (s === 'pullingCancel') {
      return 'Give up refreshing';
    } else if (s === 'rebound') {
      return 'Refresh completed';
    }
  }
}
