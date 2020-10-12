import React from 'react';
import {Text, View, Image,Dimensions} from 'react-native';
import {Entypo, Ionicons, MaterialIcons, MaterialCommunityIcons,} from '@expo/vector-icons'
import Constant from 'expo-constants'
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { styles } from './Styles';


function LoginHeader(){
    const navigation = useNavigation()
    const {colors}= useTheme()
    const headerColor= colors.headerColor
    const iconColor= colors.iconColor
    const dispatch= useDispatch()
    const currentTheme= useSelector(state=>{
        return state.theme
    })
    return(
        <View style={{ height:hp('10%'), position:"relative",width:Dimensions.get("screen").width}}>
            <View style={{
                height:hp('10%'),
                backgroundColor: "black",
                elevation: 10,
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems: 'center',
            }}>
                <Image source={require('../images/lt.png')} style={styles.headerBranding} />
                
            </View>
        </View>
    );
}

export default React.memo(LoginHeader)