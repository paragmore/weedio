import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import {useDispatch, useSelector} from 'react-redux'
import { AsyncStorage, Alert } from "react-native";

import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import LoginHeader from '../components/LoginHeader'; 


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const dispatch= useDispatch()
  const token = useSelector(state=>{
    return state.token
  });
  const domain = useSelector(state=>{
    return state.domain
  });
  const onSignIn= async (usertoken)=>{
    try{
        await AsyncStorage.setItem('usertoken', usertoken);
    }catch (error) {
        console.log(error)
      }
}
  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }else{
      fetch(`http://${domain}/api/auth/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "username": `${email.value}`,
            "password": `${password.value}`
            })
          }).then(res=>res.json())
          .then(data=>{ 
              if(data.token!== undefined ){
                dispatch({type:"token", payload: data.token})
                onSignIn(data.token)
              }
              if(data.non_field_errors){
                Alert.alert(
                  `${data.non_field_errors}!`,
                  `Authentication failed. Please check your credentials and try again!`,
                  [
              
                    {
                      text: "Okay",
                      onPress: () => dispatch({ type: "skipLogin", payload: false }),
                    },
                  ],
                  { cancelable: false }
                );
                // console.log(data.non_field_errors)
              }
              
          }).catch(function (error) {
            console.log(error);
          });   
    }   
};

  return (
    <View style={{flex:1}}>
      <LoginHeader/>
    <Background>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('reset')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>
      <Button mode="contained" onPress={()=>dispatch({type:"skipLogin", payload: true})}>
        Skip
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity style={{borderWidth:1, borderColor:"white", borderRadius:10, marginHorizontal:5, paddingHorizontal:10}} onPress={() => navigation.navigate('register')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
    </View>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
