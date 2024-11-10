import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const Home = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const phoneRegex = /^(\+98|0)?9\d{9}$/;

    if (!phoneRegex.test(phoneNumber)) {
      setError("لطفا یک شماره تلفن معتبر وارد کنید.");
      return;
    }

    setError("");
    try {
      const response = await fetch("https://flashcall.liara.run/services/call/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination: phoneNumber,
          token: ".oMtDenPS7y.Zvm/GvIUcMgYkho8TnH6Fl/ju",
        }),
      });

      const data = await response.json();
      alert(data.message);

      if (data.message === "done") {
        router.replace("/WaitingForCall");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error initiating call:", error);
      alert("در هنگام تماس خطایی رخ داد، لطفا دوباره تلاش کنید.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{"لطفا شماره تلفن خود را وارد کنید."}</Text>
      <TextInput
        style={styles.input}
        placeholder="شماره تلفن همراه"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>{"ارسال کد تائید"}</Text>
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "100%",
    maxWidth: 300,
    borderRadius: 4,
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#025864",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "semibold",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 12,
  },
});

export default Home;
