import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const WaitingForCall = () => {
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (timer === 0) {
      router.replace("/FailedVerification");
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{"در انتظار تماس..."}</Text>
      <Text style={styles.timer}>زمان باقی مانده: {timer} ثانیه </Text>
      <Text>لطفا تا اعتبار سنجی پایان اعتبار سنجی صبر کنید.</Text>
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
  timer: {
    fontSize: 18,
    marginBottom: 12,
  },
});

export default WaitingForCall;
