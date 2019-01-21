/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button, Alert } from 'react-native'
import { NaverLogin, getProfile } from 'react-native-naver-login'

const initials = {
  kConsumerKey: 'nhvymxQWDv4Thz0XDscU',
  kConsumerSecret: 'XXXXX',
  kServiceAppName: 'naverlogin',
  kServiceAppUrlScheme: 'naverurlschema' // only for iOS
}

class App extends Component {
  constructor(props) {
    super(props)

    console.log('\n\n Initial Page :: src/components/pages/First/index.js \n\n')

    this.state = {
      isNaverLoggingin: false,
      theToken: 'token has not fetched'
    }
  }

  // 로그인 후 내 프로필 가져오기.
  async fetchProfile() {
    const profileResult = await getProfile(this.state.theToken)
    console.log(profileResult)
    if (profileResult.resultcode === '024') {
      Alert.alert('로그인 실패', profileResult.message)
      return
    }
    Alert.alert('profile', JSON.stringify(profileResult))
  }

  // 네이버 로그인 시작.
  async naverLoginStart() {
    console.log('  naverLoginStart  ed')
    NaverLogin.login(initials, (err, token) => {
      console.log(`\n\n  Token is fetched  :: ${token} \n\n`)
      this.setState({ theToken: token })
      if (err) {
        console.log(err)
        return
      }
    })
  }

  render() {
    const { theToken } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Button
            isLoading={this.state.isNaverLoggingin}
            onPress={() => this.naverLoginStart()}
            title="NAVER LOGIN"
          />
          <Text>{theToken}</Text>
          <Button
            isLoading={this.state.isNaverLoggingin}
            onPress={() => this.fetchProfile()}
            title="Fetch Profile"
          />
          <Button onPress={() => NaverLogin.logout()} title="naverlogout" />
        </View>
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

export default App
