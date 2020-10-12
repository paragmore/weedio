import React, { Component, useState } from 'react';
import { StyleSheet, Dimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as ScreenOrientation from 'expo-screen-orientation';

import theme from './Theme' 


export const styles = StyleSheet.create({
    
    button: {
        flex:1,
        marginBottom:10,
        margin:2, 
        height:60,
        backgroundColor:"#d62828",
        borderWidth:1,
        borderRadius:5,
        justifyContent:"center", 
        alignContent:"center", 
    },
    buttontext: {
        fontSize:13,
        fontFamily:'Inter_600SemiBold',
        alignSelf:"center",
        color: theme.primarytextColor, 
        textAlign:'center',   
    },
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
    headerContainer:{ 
        height:hp('10%'),
        position:"absolute",
        width:Dimensions.get("screen").width,
        zIndex:5
    },
    headerInnerContainer:{
        height:hp('10%'),
        backgroundColor: "transparent",
        elevation: 10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems: 'center',
    },
    headerBranding:{
        height:50, 
        width:120, 
        marginLeft:5
    },
    likedislikeCount:{
        color:"transparent", 
        alignSelf:"center", 
        marginLeft:10, 
        fontSize:10
    },
    likedislikeImage:{
        height:35, 
        width:35, 
        marginLeft:15
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
        width: Dimensions.get("screen").width,
        zIndex:3
    },
    logoutButton:{
        marginBottom: 1,
        margin: 1,
        height: 60,
        backgroundColor: "black",
        borderColor: "grey",
        
        borderRadius: 2,
        justifyContent: "center",
        
    },
    activityIndicator:{
        marginTop: hp("40%"),
        position: "absolute",
        alignSelf: "center",
    },
    
  })
