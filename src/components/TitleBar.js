import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  StatusBar,
  Alert,
  StyleSheet
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from '@expo/vector-icons'; 

import theme from './Theme'

function TitleBar(props) {
  const [likeImage, setlikeImage] = useState(false);
  const [dislikeImage, setdislikeImage] = useState(false);
  const [likes, setlikes] = useState(0);
  const [dislikes, setdislikes] = useState(0);
  const uiHide = useSelector((state) => {
    return state.uiHide;
  });
  const token = useSelector((state) => {
    return state.token;
  });
  const domain = useSelector((state) => {
    return state.domain;
  });
  const dimensions = useSelector((state) => {
    return state.dimensions;
  });
  const isPortrait = useSelector((state) => {
    return state.isPortrait;
  });
  // const props = useSelector((state) => {
  //   return state.props;
  // });


  useEffect(() => {
    // console.log(token)
    if (token !== null) {
      fetch(`http://${domain}/islikedvideo/${props.videoId}`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setlikes(data.likecount);
          if (data.isliked === "liked") {
            setlikeImage(true);
          } else {
            setlikeImage(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      fetch(`http://${domain}/isdislikedvideo/${props.videoId}`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setdislikes(data.dislikecount);
          if (data.isdisliked === "disliked") {
            setdislikeImage(true);
          } else {
            setdislikeImage(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      fetch(`http://${domain}/likescount/${props.videoId}`, {
        method: "GET",
        headers: {},
      })
        .then((res) => res.json())
        .then((data) => {
          setlikes(data.likescount);
        })
        .catch(function (error) {
          console.log(error);
        });

      fetch(`http://${domain}/dislikescount/${props.videoId}`, {
        method: "GET",
        headers: {},
      })
        .then((res) => res.json())
        .then((data) => {
          setdislikes(data.dislikescount);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [token]);
  const likeVideo = () => {
    if (token !== null) {
      fetch(`http://${domain}/likevideo/${props.videoId}`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setlikes(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setlikeImage(false);
      Alert.alert(
        "Please Login first!",
        "You should be logged in to like a video!",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Login",
            onPress: () => dispatch({ type: "skipLogin", payload: false }),
          },
        ],
        { cancelable: false }
      );
    }
  };
  const dislikeVideo = () => {
    if (token !== null) {
      fetch(`http://${domain}/dislikevideo/${props.videoId}`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setdislikes(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setdislikeImage(false);
      Alert.alert(
        "Please Login first!",
        "You should be logged in to like a video!",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Login",
            onPress: () => dispatch({ type: "skipLogin", payload: false }),
          },
        ],
        { cancelable: false }
      );
    }
  };

  const styles = StyleSheet.create({
    
    videoTitle:{
      fontSize:15, 
      fontFamily:'Inter_600SemiBold',
      width:Dimensions.get("screen").width*2.3/4, 
      color:theme.primarytextColor,
      marginTop:5
  },
  channelTitle:{
      fontSize:12,
      fontFamily:'Inter_600SemiBold',
      color:theme.primarytextColor
  },
  likedislikeCount:{
    color:"transparent", 
    alignSelf:"center", 
    marginLeft:10, 
    fontSize:10
},
likedislikeImage:{
    padding:10,
    marginLeft:0
},
    
  })

  return (
    <View  style={{
      position: "absolute",

    }}>
      {uiHide ? (
        <View
          style={{
            position: "absolute",
            marginTop: isPortrait? dimensions.window.height*73/100:dimensions.window.height*60/100 ,
            flexDirection: "row",
            zIndex:10
          }}
        >
          <View style={{ paddingLeft: 14 }}>
            <Text
              style={styles.videoTitle}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {props.title}
            </Text>
            <Text style={styles.channelTitle}>{props.channel}</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity
              onPress={() => {
                setlikeImage(!likeImage);
                likeVideo();
                if(dislikeImage){
                  setdislikeImage(!dislikeImage)
                  dislikeVideo()
                }
                
              }}
              
            >
              {likeImage ? (
                <AntDesign name="like1" style={styles.likedislikeImage} size={26} color="white" />
              ) : (
                <AntDesign name="like2" style={styles.likedislikeImage} size={26} color="white" />
              )}
            </TouchableOpacity>
            <Text style={styles.likedislikeCount}>{likes}</Text>
          </View>

          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity
              onPress={() => {
                setdislikeImage(!dislikeImage);
                dislikeVideo();
                if(likeImage){
                  setlikeImage(!likeImage)
                  likeVideo()
                }
              }}
            >
              {dislikeImage ? (
                <AntDesign name="dislike1" style={styles.likedislikeImage} size={24} color="white" />
              ) : (
                <AntDesign name="dislike2" style={styles.likedislikeImage} size={24} color="white" />
              )}
            </TouchableOpacity>
            <Text style={styles.likedislikeCount}>{dislikes}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

export default React.memo(TitleBar);
