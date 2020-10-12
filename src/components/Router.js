import React, {useEffect}from 'react'
import { AsyncStorage } from "react-native";
import {Provider,useSelector, useDispatch} from 'react-redux';
import {NavigationContainer, DefaultTheme, DarkTheme, useTheme} from '@react-navigation/native';

import HomeNavigation from './HomeNavigation';
import SignInNavigation from './SignInNavigation'


const customDarkTheme={
    ...DarkTheme,
    colors:{
      ...DarkTheme.colors,
      
    }
  }
  const customDefaultTheme={
    ...DefaultTheme,
    colors:{
      ...DefaultTheme.colors,
      headerColor:"white",
      tabIconColor: "red"
    }
  }
  
export  function Router() {
    const token = useSelector(state=>{
        return state.token
    });
    const skipLogin = useSelector(state=>{
        return state.skipLogin
    });
    dispatch = useDispatch()

    const isSignedIn = async() => {
        try {
            const storedtoken = await AsyncStorage.getItem('usertoken');
            const email = await AsyncStorage.getItem('email');
            const first_name = await AsyncStorage.getItem('first_name');
            const profile_pic = await AsyncStorage.getItem('profile_pic');
            if(storedtoken!=null){
                // console.log(token)
                dispatch({type:"token", payload: storedtoken})
                dispatch({type:"userInfo", payload: {'email': email, 'first_name': first_name, 'profile_pic': profile_pic}})

            }
          } catch (error) {
            console.log(error)
          }    
      };

      const isitSignedIn = () => {
        AsyncStorage.getItem('usertoken', (err, result) => {
            // console.log(result);
          });
      };
      
      


    useEffect(() => {
        isSignedIn()
    }, [])
    if(token!==null || skipLogin=== true ){
        // console.log(token)
        return (
            <HomeNavigation customDarkTheme= {customDarkTheme}/>
        )
    }
    else{
        return(
            <SignInNavigation customDarkTheme= {customDarkTheme}/>
        )
        
    }
    
}
