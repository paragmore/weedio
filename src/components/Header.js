import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  Entypo,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import Constant from "expo-constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import theme from "./Theme";

function Header() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const headerColor = colors.headerColor;
  const iconColor = colors.iconColor;
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => {
    return state.theme;
  });
  const currentChannel = useSelector((state) => {
    return state.currentChannel;
  });
  const dimensions = useSelector((state) => {
    return state.dimensions;
  });
  
  const [channelName, setchannelName] = useState("");
  useEffect(() => {
    if (currentChannel != null) {
      setchannelName(currentChannel.channelName);
    }
  }, [channelName, currentChannel]);

  function changeScreenOrientation() {
    ScreenOrientation.getOrientationAsync().then((Promise) => {
      if (Promise === 1) {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
      }
      if (Promise === 4) {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }
    });

  }
  const styles = StyleSheet.create({
    headerContainer: {
      height: hp("10%"),
      position: "absolute",
      width: dimensions.window.width,
      zIndex: 5,
    },
    headerInnerContainer: {
      height: hp("10%"),
      backgroundColor: "transparent",
      elevation: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerBranding: {
      height: 50,
      width: 120,
      marginLeft: 5,
    },
  });
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerInnerContainer}>
        <View
          style={{
            flexDirection: "row",
            margin: 5,
          }}
        >
          {/* <Image
            source={require("../images/lt.png")}
            style={styles.headerBranding}
            onPress={() => navigation.navigate("home")}
          /> */}
          <View
            style={{
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              flex: 1,
            }}
          >
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{
                color: "white",
                fontSize: 23,
                alignContent: "center",
                justifyContent: "center",
                alignSelf: "center",
                textAlign: "center",
                alignItems: "center",
                fontFamily: "Inter_600SemiBold",
              }}
            >
              {channelName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => changeScreenOrientation()}
            style={{
              position: "absolute",
              alignContent: "center",
              justifyContent: "center",
              alignSelf: "center",
              marginLeft: "90%",
            }}
          >
            <MaterialIcons
              name="screen-rotation"
              style={{
                alignContent: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default React.memo(Header);
