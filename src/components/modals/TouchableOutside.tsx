import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

const TouchableOutside = ({ children, onPress }: any) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default TouchableOutside;
