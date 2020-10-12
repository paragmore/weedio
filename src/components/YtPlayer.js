import React, { useRef, useState, useEffect } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { View, ActivityIndicator, Slider, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Progress from "react-native-progress";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ScreenOrientation from 'expo-screen-orientation';

import TitleBar from "../components/TitleBar";
import YtCover from "../components/YtCover";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import { set } from "react-native-reanimated";

// Render a YouTube video player
function Yt(props) {
 
  const playerRef = useRef(null);
  const sliderRef = useRef(null);
  const [PlayerLoading, setPlayerLoading] = useState(true);
  const isViewable = useSelector((state) => {
    return state.autoplay;
  });
  const domain = useSelector((state) => {
    return state.domain;
  });
  const token = useSelector((state) => {
    return state.token;
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
  const [play, setplay] = useState(false);
  const [browsed, setbrowsed] = useState(false)

  const showChannels = () => {
    dispatch({ type: "uiHide", payload: !uiHide });
    timeout = setTimeout(() => {
      dispatch({ type: "uiHide", payload: false });
    }, 11000);
  };



  useEffect(() => {
    if(uiHide== true ){
      timeout = setTimeout(() => {
        dispatch({ type: "uiHide", payload: false });
      }, 8000);
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [uiHide])
  
  useEffect(() => {
    if (isViewable === props.videoId) {
      setplay(true);
    } else {
      setplay(false);
    }
    dispatch({ type: "uiHide", payload: true });
  }, [isViewable]);

  useEffect(() => {
    dispatch({ type: "scroll", payload: true });
    if(browsed== false){
      if (token != null) {
        fetch(`http://${domain}/lit/video/browsed/create/`, {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoId: `${props.videoId}` }),
        })
          .then((res) => res.json())
          .then((data) => {
            setbrowsed(true)
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        fetch(`http://${domain}/lit/video/browsed/create/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoId: `${props.videoId}` }),
        })
          .then((res) => res.json())
          .then((data) => {
            setbrowsed(true)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
    
  }, [props.videoId, browsed]);

  const [duration, setduration] = useState(0);
  const [currentTime, setcurrentTime] = useState(0);
  const [watched, setwatched] = useState(false)

  useEffect(() => {
    if (playerRef.current != null) {
      var interval = setInterval(() => {
        playerRef.current.getCurrentTime().then((currentTime) => {
          setcurrentTime(currentTime);
        });
      }, 1000);
    }
    if (currentTime / duration >= 0.1 && duration!=0 && watched == false) {
      if (token != null) {
        fetch(`http://${domain}/lit/video/watched/create/`, {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoId: `${props.videoId}` }),
        })
          .then((res) => res.json())
          .then((data) => {
            setwatched(true)
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        fetch(`http://${domain}/lit/video/watched/create/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoId: `${props.videoId}` }),
        })
          .then((res) => res.json())
          .then((data) => {
            setwatched(true)
          })
          .catch(function (error) {
            console.log(error);
          });
    }}
    return () => {
      clearInterval(interval);
    };
  }, [currentTime, duration, watched]);
  
  iconName = play ? "ios-pause" : "ios-play";
  // var hours = Math.floor(currentTime / 60 / 60),
  minutes = Math.floor(currentTime / 60) % 60,
  seconds = Math.floor(currentTime - minutes * 60)
  if (seconds.toString().length == 1) {
    seconds = "0" + seconds;
}
  return (
    <View style={{ height: hp("92.58%") }}>
      {PlayerLoading ? (
        <ActivityIndicator
          style={{
            marginTop: dimensions.window.height*50/100,
            position: "absolute",
            alignSelf: "center",
            zIndex:5
          }}
          size="large"
          color="red"
        />
      ) : null}
      
      <TouchableHighlight
      activeOpacity={1}
        onPress={() => {
          showChannels();
        }}
      >
        <View style={{marginTop:-30}}>
        <YoutubePlayer
          controls={false}
          ref={playerRef}
          orientation= {isPortrait?"310%": "100%"}
          height={dimensions.window.height}
          width={dimensions.window.width}
          videoId={props.videoId}
          play={play}
          onChangeState={(event) => {
            if (playerRef.current != null) {
              playerRef.current.getDuration().then((getDuration) => {
                setduration(getDuration);
              });
            }
            // if(event === "playing"){
            //   setTimeout(() => {
            //     dispatch({ type: "uiHide", payload: false });
            //   }, 5000);
            // }
            if (event === "paused") {
              setplay(false)
              dispatch({ type: "uiHide", payload: true });
            }
            if(event === "buffering"){
              setPlayerLoading(true);
            }
            if(event === "playing"){
              setPlayerLoading(false);
            }
            if (event === "ended") {
              dispatch({ type: "ended", payload: true });
            } else {
              dispatch({ type: "ended", payload: false });
            }
          }}
          onReady={() => {
            //console.log("ready")
            setPlayerLoading(false);
          }}
          onError={(e) => {
            console.log(e);
            if(e === 'embed_not_allowed'){
              fetch(
                `http://${domain}/lit/video/${props.videoId}/delete/`,
                {
                  method: "DELETE",
                }
              )
                .then((res) => res.json())
                .then((data) => {
                
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
            if (e === e) {
              dispatch({ type: "ended", payload: true });
            } else {
              dispatch({ type: "ended", payload: false });
            }
          }}
          // onPlaybackQualityChange={q => console.log(q)}
          volume={100}
          playbackRate={1}
          playerParams={{
            cc_lang_pref: "us",
            showClosedCaptions: false,
          }}
        />
        <YtCover/>
        </View>
      </TouchableHighlight>
      <TitleBar
        videoId={props.videoId}
        title={props.title}
        channel={props.channel}
      />
      <Ionicons name={iconName} onPress={()=>{setplay(!play)}} style={{marginTop: hp("38.6%"),alignSelf:"center", marginLeft:12, padding:30, position:"absolute"}} size={32} color="transparent" />
      {uiHide ? (
        <View
          style={{
            flexDirection: "row",
            width: dimensions.window.width*90/100,
            height: 40,
            marginTop: isPortrait ? dimensions.window.height*85/100 :  dimensions.window.height*78/100,
            position: "absolute",
            
          }}
        >
          <Ionicons name={iconName} onPress={()=>{setplay(!play)}} style={{alignSelf:"center", marginLeft:12, padding:10}} size={32} color="white" />
          <Slider
            ref={sliderRef}
            style={{
              width: dimensions.window.width*75/100,
              height: 40,
            }}
            maximumValue={duration}
            minimumValue={0}
            value={currentTime}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#D3D3D3"
            onSlidingComplete={(val) => {
              playerRef.current.seekTo(val, true);
            }}
          />
          <Text style={{color:'white', fontSize:10, marginRight:20}}>{minutes}:{seconds}</Text>
        </View>
      ) : null}
    </View>
  );
}

export default React.memo(Yt);
