import React from 'react';
import {NavigationContainer, DefaultTheme, DarkTheme, useTheme} from '@react-navigation/native';
import {createStackNavigator, SwitchNavigator } from '@react-navigation/stack';
import {Provider,useSelector} from 'react-redux';


import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import GoogleLoginScreen from '../screens/GoogleLoginScreen';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator()

function SignInNavigation(props) {

    let currentTheme= useSelector(state=>{
      return state.theme
    })
  
    return (
        <NavigationContainer theme={props.customDarkTheme} >
        {/* <NavigationContainer theme={currentTheme ? customDarkTheme:customDefaultTheme} > */}
          <Stack.Navigator headerMode="none">
            {/* <Stack.Screen name= "register" component={RegisterScreen} />
            <Stack.Screen name= "login" component={LoginScreen} />
            <Stack.Screen name= "reset" component={ForgotPasswordScreen} /> */}
            <Stack.Screen name= "loading" component={LoadingScreen} /> 
            <Stack.Screen name= "google" component={GoogleLoginScreen} /> 
          </Stack.Navigator>
        </NavigationContainer>
  
    )
  };

export default React.memo(SignInNavigation)