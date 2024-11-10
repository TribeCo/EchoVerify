import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

const FailedVerification = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>اعتبار سنجی با شکست مواجه شد!</Text>
      <Text>ما نتوانستیم شماره تلفن شما را اعتبار سنجی کنیم لطفا دوباره تلاش کنید.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/home")}>
        <Text style={styles.buttonText}>{"تلاش دوباره"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
    backgroundColor: "#025864",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "semibold",
  },
});

export default FailedVerification;
