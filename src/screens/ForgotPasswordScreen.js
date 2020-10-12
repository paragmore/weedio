import React, { memo, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import {useTheme} from '@react-navigation/native';

import { emailValidator } from '../core/utils';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import Button from '../components/Button';

const ForgotPasswordScreen = ({ navigation }) => {
  
  const {colors}= useTheme()
    const headerColor= colors.headerColor
    const iconColor= colors.iconColor

  return (
    <Background >
      <View style={{flex: 1, justifyContent:"center"}} >
      <Text style={{color: 'white', fontSize:15.5}}>To reset password please contact us @ contact.curateup@gmail.com </Text>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('login')}
      >
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
});

export default memo(ForgotPasswordScreen);
