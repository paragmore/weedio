import React from 'react';
import {Text, View, Image,Dimensions} from 'react-native';
import {Entypo, Ionicons, MaterialIcons, MaterialCommunityIcons,} from '@expo/vector-icons'
import Constant from 'expo-constants'
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


function YtCover(){
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
        <View style={{ flex:1, position:"absolute", zIndex:1}}>
        
        <View style={{ height:hp('10%'), position:"absolute",width:Dimensions.get("screen").width, zIndex:1}}>
            <View style={{
                height:hp('10%'),
                backgroundColor: "black",
                elevation: 10,
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems: 'center',
            }}>  
            </View>
        </View>
        <View style={{ height:hp('50%'), position:"absolute",width:Dimensions.get("screen").width, zIndex:1, marginTop:hp('75%')}}>
            <View style={{
                height:hp('50%'),
                backgroundColor: "black",
                elevation: 10,
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems: 'center',
            }}>  
            </View>
        </View>
        </View>
    );
}

export default React.memo(YtCover)