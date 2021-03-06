import React, { PropTypes, Component } from 'react';
import {
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

export default class Hideo extends BaseInput {

  static propTypes = {
    /*
     * this is applied as background color of icon
     */
    iconBackgroundColor: PropTypes.string,

    /*
     * This is the icon component you are importing from react-native-vector-icons.
     * import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
     * iconClass={FontAwesomeIcon}
     */
    iconClass: PropTypes.func.isRequired,
    /*
     * Passed to react-native-vector-icons library as name prop
     */
    iconName: PropTypes.string.isRequired,
    /*
     * Passed to react-native-vector-icons library as color prop
     */
    iconColor: PropTypes.string,
  };

  static defaultProps = {
    iconColor: 'white',
    iconBackgroundColor: '#899dda',
    height: 48,
    animationDuration: 200,
  };

  render() {
    const {
      iconClass,
      iconColor,
      iconName,
      iconBackgroundColor,
      style: containerStyle,
      inputStyle,
      height: inputHeight,
    } = this.props;
    const {
      focusedAnim,
      value,
    } = this.state;
    const AnimatedIcon = Animated.createAnimatedComponent(iconClass);

    return (
      <View style={[containerStyle, styles.container]} onLayout={this._onLayout}>
        <TouchableWithoutFeedback onPress={this._focus}>
          <Animated.View style={{
            backgroundColor: iconBackgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            height: inputHeight,
            width: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [60, 40],
            }),
          }}>
            <AnimatedIcon
              name={iconName}
              color={iconColor}
              style={{
                fontSize: focusedAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [25, 15],
                }),
              }}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TextInput
          ref="input"
          {...this.props}
          style={[styles.textInput, inputStyle]}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          underlineColorAndroid={'transparent'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 0,
    color: 'black',
    backgroundColor: 'white',
    fontSize: 18,
  },
});
