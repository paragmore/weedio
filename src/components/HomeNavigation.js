import React , {useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dimensions } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';

import Home from "../screens/Home";
import Search from "../screens/Search";
import Settings from "../screens/Settings";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

function HomeNavigation(props) {
  
  let currentTheme = useSelector((state) => {
    return state.theme;
  });
  const uiHide = useSelector((state) => {
    return state.uiHide;
  });
  const dimensions = useSelector((state) => {
    return state.dimensions;
  });
  const isPortrait = useSelector((state) => {
    return state.isPortrait;
  });
  

  const dispatch = useDispatch();


    ScreenOrientation.getOrientationAsync().then(
      (Promise)=>{if(Promise===1){dispatch({ type: "isPortrait", payload: true });}if(Promise===4){dispatch({ type: "isPortrait", payload: false });}})
    

  
  if(dimensions=== null){
    dispatch({ type: "dimensions", payload: { window, screen } });
  }

  const onChange = ({ window, screen }) => {
    dispatch({ type: "dimensions", payload: { window, screen } });
  };

  


  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  return (
    <NavigationContainer theme={props.customDarkTheme}>
      {/* <NavigationContainer theme={currentTheme ? customDarkTheme:customDefaultTheme} > */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "ios-play-circle" : "ios-play-circle";
            } else if (route.name === "Search") {
              iconName = focused ? "ios-search" : "ios-search";
            } else if (route.name === "Settings") {
              iconName = focused ? "ios-person" : "ios-person";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={27} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "white",
          activeBackgroundColor: "transparent",
          inactiveBackgroundColor: "transparent",
          showLabel: false,
          style:{
            position: "absolute",
            backgroundColor: "transparent",
            borderTopWidth: 0
          } ,
        }}
        
        
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
 export default React.memo(HomeNavigation)