import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";
import theme  from "./Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from "react-native-responsive-screen";

function ChannelBar(props) {
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
  const dimensions = useSelector((state) => {
    return state.dimensions;
  });
  useEffect(() => {
    dispatch({ type: "loading", payload: true });
    if (token != null) {
      fetch(`http://${domain}/lit/channel/?format=json`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "channels", payload: data });
          dispatch({ type: "loading", payload: false });
        });
    } else {
      fetch(`http://${domain}/lit/channel/?format=json`)
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "channels", payload: data });
          dispatch({ type: "loading", payload: false });
        });
    }
  }, []);

  const { colors } = useTheme();
  const textcolor = colors.iconColor;
  const fetchData = () => {
    dispatch({ type: "currentChannel", payload: 100 });
    dispatch({ type: "loading", payload: true });
    fetch(`http://${domain}/lit/list/?format=json`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "replace", payload: data.results });
        dispatch({ type: "loading", payload: false });
      });
  };

  const fetchChannelData = (props) => {
    const channel = props;
    const channelId = props.channelId
    // console.log(channel)
    dispatch({ type: "currentChannel", payload: channel });
    dispatch({ type: "scroll", payload:false});
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
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      fetch(`http://${domain}/lit/channel/list/${channelId}/?format=json`)
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "replace", payload: data.results });
          dispatch({ type: "loading", payload: false });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const styles = StyleSheet.create({

    channelBarContainer:{
      position: "absolute",
      marginTop: hp("12%"),
      marginLeft: 5,
      marginRight: 5,
      zIndex:3
  },
  channelBarInnerContainer:{
      flexDirection: "row",
      alignItems: "center",
      width: dimensions.window.width,
      zIndex:3
  },
  channelBarButton:{
    marginHorizontal: 2,
    marginBottom: 5,
    height: 25,
    backgroundColor: "black",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    zIndex:10
},
buttontext: {
  fontSize:13,
  fontFamily:'Inter_600SemiBold',
  alignSelf:"center",
  color: theme.primarytextColor, 
  textAlign:'center',   
},
    
  })


  return (
    <View style={styles.channelBarContainer}>
      <View style={styles.channelBarInnerContainer}>
        <FlatList
          horizontal={true}
          data={channels}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => fetchChannelData({'channelId': item.id, 'channelName': item.channelName })}
                style={styles.channelBarButton}
              >
                <Text style={styles.buttontext}>{item.channelName}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.channelName}
        />
      </View>
    </View>
  );
}

export default React.memo(ChannelBar);
