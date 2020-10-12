import React, {useEffect } from 'react';
import {NavigationContainer, DefaultTheme, DarkTheme, useTheme} from '@react-navigation/native';
import {Provider,useSelector} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import firebase from 'firebase';
import { AppLoading } from 'expo';
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';

import {Router} from './src/components/Router';
import { reducer } from './src/reducers/reducer';
import {themeReducer} from './src/reducers/themeReducer';
import {autoplayReducer} from './src/reducers/autoplayReducer';
import { videoPosReducer } from './src/reducers/videoPosReducer';
import {nextPageReducer} from './src/reducers/nextPageReducer';
import {prevPageReducer} from './src/reducers/prevPageReducer';
import {fetchLoadingReducer} from './src/reducers/fetchloading';
import {currentChannelReducer} from './src/reducers/currentChannelReducer';
import {channelsReducer} from './src/reducers/channelsReducer';
import {endedReducer} from './src/reducers/endedReducer';
import {uiHideReducer} from './src/reducers/uiHideReducer';
import {tokenReducer} from './src/reducers/tokenReducer';
import {skipLoginReducer} from './src/reducers/skipLoginReducer';
import {domainReducer} from './src/reducers/domainReducer';
import {metaReducer} from './src/reducers/metaReducer';
import {userInfoReducer} from './src/reducers/userInfoReducer';
import {scrollReducer} from './src/reducers/scrollReducer';
import {dimensionsReducer} from './src/reducers/dimensionsReducer';
import {isPortraitReducer} from './src/reducers/isPortraitReducer';

import {firebaseConfig} from './src/core/firebaseConfig';
import GoogleLoginScreen from './src/screens/GoogleLoginScreen';


const rootReducer= combineReducers({
  cardData: reducer,
  theme:themeReducer,
  autoplay: autoplayReducer,
  videoPos: videoPosReducer,
  nextpage: nextPageReducer,
  prevpage: prevPageReducer,
  fetchloading: fetchLoadingReducer,
  currentChannel: currentChannelReducer,
  channels: channelsReducer,
  ended: endedReducer,
  uiHide: uiHideReducer,
  token: tokenReducer,
  skipLogin: skipLoginReducer,
  domain: domainReducer,
  meta:metaReducer,
  userInfo: userInfoReducer,
  scroll: scrollReducer,
  dimensions: dimensionsReducer,
  isPortrait: isPortraitReducer,
})
const Store = createStore(rootReducer)

firebase.initializeApp(firebaseConfig)

export default ()=>{
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return(
    <Provider store={Store}>
      <Router/>
    </Provider>
  )
  
}





