import React from 'react';
import {Text, View, Image,Dimensions} from 'react-native';
import {Entypo, Ionicons, MaterialIcons, MaterialCommunityIcons,} from '@expo/vector-icons'
import Constant from 'expo-constants'
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


function BottomCover(){
    const navigation = useNavigation()
    const {colors}= useTheme()
    const headerColor= colors.headerColor
    const iconColor= colors.iconColor
    const dispatch= useDispatch()
    const currentTheme= useSelector(state=>{
        return state.theme
    })
    return(
        <View style={{ height:hp('8%'), position:"absolute",width:Dimensions.get("screen").width, zIndex:1, marginTop:hp('92%')}}>
            <View style={{
                height:hp('8%'),
                backgroundColor: "black",
                elevation: 10,
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems: 'center',
            }}>
                
            </View>
        </View>
    );
}

export default React.memo(BottomCover)