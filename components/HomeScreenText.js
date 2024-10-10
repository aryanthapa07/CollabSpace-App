import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const HomeScreenText = () => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.headingText}>
        Welcome to <Text style={styles.highlightText}>CollabSpace</Text>
      </Text>
      <Text style={styles.paraText}>The platform for better cooperation</Text>
      <Text style={styles.paraText}>Crafted with care & creativity.</Text>
      <Text style={styles.paraText}>Brings together everything in one place.</Text>
      <Image
        source={require("../assets/Homepageimg.png")}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  highlightText: {
    color: "#12aef5",
  },
  paraText: {
    fontSize: 16,
    color: "#555",
    marginVertical: 2,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
});

export default HomeScreenText;
