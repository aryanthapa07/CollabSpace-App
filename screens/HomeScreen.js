import React from 'react';
import { View,StyleSheet } from 'react-native';
import BlueButton from '../components/BlueButton';
import HomeScreenText from '../components/HomeScreenText';

const HomeScreen = () => {
    return (
      <View style={styles.container}>
        <HomeScreenText />
        <View style={styles.buttonContainer}>
          <BlueButton text="My Workspace" />
          <BlueButton text="My Projects" />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 16,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 16,
      marginTop: 20,
    },
  });
  
  export default HomeScreen;