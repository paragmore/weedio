import React from 'react'
import InstagramEmbed from 'react-native-embed-instagram'  
import {Text, View,Dimensions, Platform} from 'react-native';
import {WebView} from 'react-native-webview'

function Insta() {
    return (
        <WebView
                javaScriptEnabled={true}
                domStorageEnabled={true}
                style={{ flex: .64, marginTop:"11%" }}
                source={{ uri: `https://www.instagram.com/p/fA9uwTtkSN/embed`  }}
                mediaPlaybackRequiresUserAction={((Platform.OS !== 'android') || (Platform.Version >= 17)) ? false : undefined}
                userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
                /> 
    )
}

export default Insta
