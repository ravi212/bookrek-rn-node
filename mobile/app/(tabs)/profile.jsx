import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuthStore } from '../../store/authStore'

const Profile = () => {

  const {logout} =useAuthStore();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={handleLogout}><Text>Logout</Text></TouchableOpacity>
    </View>
  )
}

export default Profile