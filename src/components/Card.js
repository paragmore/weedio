import React, { useState, useEffect } from "react";
import {
  View,
  TouchableHighlight,
  StatusBar,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Yt from "./YtPlayer";
import TitleBar from "./TitleBar";

function Card(props) {
  // console.log("card render");

  const navigation = useNavigation();
  const { colors } = useTheme();
  const textcolor = colors.iconColor;
  const dispatch = useDispatch();
  const autoplay = useSelector((state) => {
    return state.autoplay;
  });
  const domain = useSelector((state) => {
    return state.domain;
  });
  const scrollPos = useSelector((state) => {
    return state.scrollPos;
  });
  const token = useSelector((state) => {
    return state.token;
  });
  let notchHeight = 0;
  if (StatusBar.currentHeight > 25) {
    notchHeight = StatusBar.currentHeight;
  }

  const isViewable = useSelector((state) => {
    return state.autoplay;
  });
  const uiHide = useSelector((state) => {
    return state.uiHide;
  });

  const showChannels = () => {
    dispatch({ type: "uiHide", payload: !uiHide });
  };

  useEffect(() => {
    dispatch({ type: "uiHide", payload: true });
  }, [isViewable]);

  

  return (
    <View style={{ height: hp("92.2%") }}>
      <TouchableHighlight onPress={() => showChannels()}>
        <View>
          
          <TitleBar
            videoId={props.videoId}
            title={props.title}
            channel={props.channel}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
}
export default React.memo(Card);
