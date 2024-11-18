import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const ApiToken = "JWmR6eNWA7thbBRGE0h6WqxlHkbgxZBvE7xtq";

const Home = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const phoneRegex = /^(\+98|0)?9\d{9}$/;

    if (!phoneRegex.test(phoneNumber)) {
      setError("لطفا یک شماره تلفن معتبر وارد کنید.");
      return;
    }

    if (apiKey.length < 1) {
      setError("لطفا یک کلید دسترسی معتبر و فعال وارد کنید.");
      return;
    }

    setError("");

    setIsLoading(true);
    try {
      const response = await fetch("https://flash-call.liara.run/services/call/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination: phoneNumber,
          token: apiKey,
        }),
      });
      const data = await response.json();
      console.log(data);
      alert(data.message);

      if (data) {
        router.replace(`/WaitingForCall?VerificationCode=${data.code}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error initiating call:", error);
      alert("در هنگام تماس خطایی رخ داد، لطفا دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>{"لطفا شماره تلفن خود را وارد کنید."}</Text>
        <TextInput
          style={styles.input}
          placeholder="شماره تلفن همراه"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="توکن سرویس خود را برای تست وارد کنید."
          value={apiKey}
          onChangeText={setApiKey}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}>
          <Text style={[styles.buttonText, isLoading && styles.textDisabled]}>
            {isLoading ? "در حال ارسال..." : "ارسال کد تائید"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
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
    direction: "rtl",
    textAlign: "right",
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
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  textDisabled: {
    color: "#666",
  },
});

export default Home;
