import React, { Component, createContext } from 'react'
import { View, Text } from 'react-native'


export const AppContext = createContext()
export default class Provider extends Component {
    constructor (props) {
        super(props)
        this.state = {
            lang: 'en',
        }
    }

  render() {
    return (
        <View>
            <Text>Provider</Text>
        </View>
    )
  }
}
