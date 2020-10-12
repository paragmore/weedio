import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MiniCard from "../components/MiniCard";
import Constant from "expo-constants";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { styles } from "../components/Styles";

import Header from "../components/Header";
//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=songs&type=video&key=AIzaSyCk8CA4RUhPKRic4IU7J64VXWKT9xH7AKs

export default function Search({ navigation }) {
  const { colors } = useTheme();
  const headerColor = colors.headerColor;
  const iconColor = colors.iconColor;
  const dispatch = useDispatch();
  const channels = useSelector((state) => {
    return state.channels;
  });
  const domain = useSelector((state) => {
    return state.domain;
  });
  const token = useSelector((state) => {
    return state.token;
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
  const [Loading, setLoading] = useState(false);

  const fetchChannelData = (props) => {
    const channel = props;
    const channelId = props.channelId
    dispatch({ type: "currentChannel", payload: channel });
    dispatch({ type: "loading", payload: true });
    if (token != null) {
      fetch(`http://${domain}/lit/channel/list/${channelId}/?format=json`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "replace", payload: data.results });
          dispatch({ type: "loading", payload: false });
        });
    } else {
      fetch(`http://${domain}/lit/channel/list/${channelId}/?format=json`)
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "replace", payload: data.results });
          dispatch({ type: "loading", payload: false });
        });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        width: dimensions.window.width,
        height: dimensions.window.height,
        paddingHorizontal: 15,
      }}
    >
      <View
            style={{
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 40,
              position:"absolute"

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
      <FlatList
        style={{ marginTop: 100, height: dimensions.window.height*5/10, }}
        data={channels}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                fetchChannelData({'channelId': item.id, 'channelName': item.channelName });
                navigation.navigate("Home");
              }}
              style={styles.button}
            >
              <Text style={styles.buttontext}>{item.channelName}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.channelName}
      />
    </View>
  );
}
