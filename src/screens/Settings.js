import React, { useState } from "react";
import {
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Text,
  Dimensions,
  AsyncStorage,
  Image
} from "react-native";
import firebase from 'firebase'
import { Ionicons } from "@expo/vector-icons";
import MiniCard from "../components/MiniCard";
import Constant from "expo-constants";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@react-navigation/native";
import {styles} from '../components/Styles';

//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=songs&type=video&key=AIzaSyCk8CA4RUhPKRic4IU7J64VXWKT9xH7AKs

export default function Settings({ navigation }) {
  const { colors } = useTheme();
  const headerColor = colors.headerColor;
  const iconColor = colors.iconColor;
  const dispatch = useDispatch();
  const channels = useSelector((state) => {
    return state.channels;
  });
  const token = useSelector((state) => {
    return state.token;
  });
  const domain = useSelector((state) => {
    return state.domain;
  });
  const userInfo = useSelector((state) => {
    return state.userInfo;
  });
  const [Loading, setLoading] = useState(false);
  const onSignOut = () => {
    AsyncStorage.removeItem("usertoken");
    AsyncStorage.removeItem("email");
    AsyncStorage.removeItem("first_name");
    AsyncStorage.removeItem("profile_pic");
    firebase.auth().signOut()
    fetch(`http://${domain}/api/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  };
  

  return (
    <View
      style={{
        flex: 1,
    
        width: Dimensions.get("screen").width,
      }}
    >
      
      <View style={{backgroundColor: '#383838', width: Dimensions.get("screen").width, height:130, flexDirection:"row", alignItems:'center' }}>
        <View style={{height:60, width:70, alignItems:'center'}}>
        <Image borderRadius={100} style={{height:60, width:60}} source={{
          uri: `${userInfo.profile_pic}`,
        }} />
        </View>
        <View>
        <Text style={{color:'white', fontSize:30}}>Welcome {userInfo.first_name}!</Text>
        <Text style={{color:'white', fontSize:12}}>Email Id: {userInfo.email}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton}>
        
      <Text style={{color:'white', marginLeft:15}}>
          About us
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => {
          dispatch({ type: "skipLogin", payload: false });
          dispatch({ type: "token", payload: null });
          onSignOut();
        }}
        style={styles.logoutButton}
      >
        {token ?<Text style={{color:'white', marginLeft:15}}>
          Log Out
        </Text>: <Text style={{color:'white', marginLeft:15}}>
          Log In
        </Text> }
      </TouchableOpacity>
  
    </View>
  );
}
