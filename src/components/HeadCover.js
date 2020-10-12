import React from 'react';
import {Text, View, Image,Dimensions} from 'react-native';
import {Entypo, Ionicons, MaterialIcons, MaterialCommunityIcons,} from '@expo/vector-icons'
import Constant from 'expo-constants'
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


function HeadCover(){
    const navigation = useNavigation()
    const {colors}= useTheme()
    const headerColor= colors.headerColor
    const iconColor= colors.iconColor
    const dispatch= useDispatch()
    const currentTheme= useSelector(state=>{
        return state.theme
    })
    const dimensions = useSelector((state) => {
        return state.dimensions;
      });
      const isPortrait = useSelector((state) => {
        return state.isPortrait;
      });
    return(
        <View style={{ height:dimensions.window.height*2/10, position:"absolute",width:dimensions.screen.width, zIndex:1}}>
            <View style={{
                height:dimensions.window.height*15/100,
                backgroundColor: isPortrait?"black": "transparent",
                elevation: 0,
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems: 'center',
            }}>
                
            </View>
        </View>
    );
}

export default React.memo(HeadCover)