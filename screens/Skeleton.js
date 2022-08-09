import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Animated, Easing } from "react-native";

const { width } = Dimensions.get("window");
import { LinearGradient  } from "expo-linear-gradient";
// import Animated, { Easing } from "react-native-reanimated";

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

const Skeleton = props => {
    const animatedValue = new Animated.Value(0);

    useEffect(()=> {
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear.inOut,
                useNativeDriver: true
            }),
        ).start();
        console.log('Started: ',width);
    });

    const translateX = animatedValue.interpolate({
        inputRange: [0,1],
        outputRange: [-width, width]
    })

    return (
        <View style={{
            backgroundColor: "#a0a0a0",
            borderColor: "#67dbf8",
            width: width,
            height: '100%',
        }}>
           
            <AnimatedLG 
                colors = {['#a0a0a0','#a0a0a0','#a0a0a0','#a0a0a0']}
                start = {{ x:0, y:0 }}
                end= {{ x:1, y:0 }}
                style = {{
                    ...StyleSheet.absoluteFill,
                    transform: [{translateX: translateX}]
                }}
            />
             {/* <Text>Loading ...</Text> */}
        </View>
    )
}

export default Skeleton;

const styles = StyleSheet.create({

})