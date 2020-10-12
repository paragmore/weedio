import React, { useState, useEffect } from "react";
import { FlatList, Dimensions, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from '@expo/vector-icons'; 

import Yt from "../components/YtPlayer";

import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function VideoList() {



  const cardData = useSelector((state) => {
    return state.cardData;
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
  const ended = useSelector((state) => {
    return state.ended;
  });
  const currentChannel = useSelector((state) => {
    return state.currentChannel;
  });
  const loading = useSelector((state) => {
    return state.fetchloading;
  });
  const scroll = useSelector((state) => {
    return state.scroll;
  });
  const dimensions = useSelector((state) => {
    return state.dimensions;
  });
  const [refresh, setrefresh] = useState(false);
  useEffect(() => {
    setrefresh(!refresh);
  }, [currentChannel]);
  const dispatch = useDispatch();
  const onViewRef = React.useRef((info) => {
    const changed = info.changed;
    changed.forEach((item) => {
      if (item.isViewable) {
        dispatch({ type: "autoplay", payload: item.key } );
        dispatch({ type: "scroll", payload:false});
      }
    });
  });

  const [contentOffset, setcontentOffset] = useState(0);
  useEffect(() => {
    if (ended === true) {
      scrollRef.current.scrollToOffset({
        offset: contentOffset + Dimensions.get("window").height,
        animated: true,
      });
    }
  }, [ended]);

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 40 });
  const scrollRef = React.useRef(null);
  const fetchData = () => {
    dispatch({ type: "loading", payload: true });
    if (token != null) {
      fetch(`http://${domain}/lit/list/?format=json`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "add", payload: data.results });
          dispatch({ type: "loading", payload: false });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      fetch(`http://${domain}/lit/list/?format=json`)
        .then((res) => res.json())
        .then((data) => {

          dispatch({ type: "add", payload: data.results });
          dispatch({ type: "loading", payload: false });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const fetchChannelData = () => {
    dispatch({ type: "loading", payload: true });
    if (token != null) {
      fetch(
        `http://${domain}/lit/channel/list/${currentChannel.channelId}/?format=json`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "add", payload: data.results });
          dispatch({ type: "loading", payload: false });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      fetch(
        `http://${domain}/lit/channel/list/${currentChannel.channelId}/?format=json`
      )
        .then((res) => res.json())
        .then((data) => {
        
          dispatch({ type: "add", payload: data.results });
          dispatch({ type: "loading", payload: false });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const resetBrowsers = () =>{
    if (token != null) {
      fetch(
        `http://${domain}/lit/video/browsed/delete/?format=json`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if(currentChannel.channelId===100){
            fetchData()
          }else{
            fetchChannelData()
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      fetch(
        `http://${domain}/lit/video/browsed/delete/?format=json`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
        
          if(currentChannel.channelId===100){
            fetchData()
          }else{
            fetchChannelData()
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  if(cardData.length < 1 && !loading){
    
    return(
      <View style={{flex:1, alignContent:'center', justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:'white', alignSelf:"center", fontSize:20,fontFamily:'Inter_400Regular',textAlign: 'center', alignItems:'center', alignContent:'center', margin:20}}>
        All caught up please refresh or come back later
      </Text>
      <TouchableOpacity onPress={()=>{resetBrowsers()}}>
      <Ionicons name="ios-refresh" size={24} color="white" />
      </TouchableOpacity>
      </View>
    )
  }

  return (
    <FlatList
      scrollEnabled={()=>scroll}
      ref={scrollRef}
      onEndReached={() => {
        if (currentChannel.channelId == 100) {
          fetchData();
        } else {
          fetchChannelData();
        }
      }}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
      pagingEnabled={true}
      windowSize={2}
      data={cardData}
      extraData={refresh}
      initialNumToRender={1}
      onScroll={(e) => setcontentOffset(e.nativeEvent.contentOffset.y)}
      renderItem={({ item }) => {
        return (
          
          <View style={{flex:1, height: dimensions.window.height, width: dimensions.window.width}}>
             <Yt
            videoId={item.videoId}
            title={item.caption}
            channel={item.channel_id}
          />
            
          </View>
          
        );
      }}
      keyExtractor={(item) => item.videoId}
    />
  );
}

export default React.memo(VideoList);
