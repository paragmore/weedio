import React from "react";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";

function MiniCard(props) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const textcolor = colors.iconColor;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("videoPlayer", {
          videoId: props.videoId,
          title: props.title,
        })
      }
    >
      <View style={{ flexDirection: "row", paddingLeft: 7, paddingTop: 20 }}>
        <Image
          source={{
            uri: `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`,
          }}
          style={{ width: "45%", height: 100 }}
        />
        <View style={{ paddingLeft: 14 }}>
          <Text
            style={{
              fontSize: 17,
              width: Dimensions.get("screen").width / 2,
              color: textcolor,
            }}
            ellipsizeMode="tail"
            numberOfLines={3}
          >
            {props.title}
          </Text>
          <Text style={{ color: textcolor }}>{props.channel}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(MiniCard);
