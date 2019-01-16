/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button, Alert } from 'react-native'
import { NaverLogin } from 'react-native-naver-login'

const initials = {
  kConsumerKey: 'nhvymxQWDv4Thz0XDscU',
  kConsumerSecret: 'XXXXXXX',
  kServiceAppName: 'naverlogin',
  kServiceAppUrlScheme: 'naverurlschema' // only for iOS
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() =>
            NaverLogin.login(initials, (err, token) => {
              if (err) {
                Alert.alert('error', err)
                return
              }
              Alert.alert('result', token)
            })
          }
          title="naverlogin"
        />
        <Button onPress={() => NaverLogin.logout()} title="naverlogout" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
