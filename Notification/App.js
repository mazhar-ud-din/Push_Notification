import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RequestPermission, MessageNotification, DisplayMessage } from './src/Notification/Notification'


const App = () => {

  const [Message, setMessage] = useState(``)
  const [FcmToken, setFcmToken] = useState(``)

  useEffect(() => {
    RequestPermission(setFcmToken)
    MessageNotification(setMessage)
    DisplayMessage(Message)
  }, [Message])

  return (
    <View style={{ backgroundColor: `black`, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <Text style={{ color: `white` }}> App</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})