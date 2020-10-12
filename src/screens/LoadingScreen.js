import React, { useState, useEffect } from 'react'
import {View, ActivityIndicator} from 'react-native'
import firebase from 'firebase'
import {styles} from '../components/Styles'

function LoadingScreen({navigation}) {

    useEffect(() => {
        checkIfLoggedIn()
    }, [])
    checkIfLoggedIn = () =>{
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                
            }else{
                navigation.navigate("google")
            }
        })
    }

    return (
        <View>
            <ActivityIndicator
            size="large"
            color="red"
            style={styles.activityIndicator}
            />
        </View>
    )
}

export default LoadingScreen
