import React, { useState, useEffect } from 'react';

import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Browser ({route, navigation}){
    const { url, name } = route.params;


    return(
        <View>
            <WebView source={{ uri: url }} style={{ flex: 1 }} />
            
        </View>
    )
}