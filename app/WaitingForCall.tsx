import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";

const WaitingForCall = () => {
  const [timer, setTimer] = useState(12000000);
  const [isLoading, setIsLoading] = useState(false);

  const { VerificationCode } = useLocalSearchParams<{ VerificationCode: string }>();

  const [code, setCode] = useState(["", "", "", ""]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      (inputs[index + 1] as TextInput).focus();
    } else if (!text && index > 0) {
      (inputs[index - 1] as TextInput).focus();
    }
  };

  const inputs: Array<TextInput | null> = [];

  useEffect(() => {
    if (timer === 0) {
      router.replace("/FailedVerification");
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const codeString = code.join("");
    console.log({
      codeString,
      VerificationCode,
    });
    if (codeString !== VerificationCode) {
      alert("کد وارد شده اشتباه است.");
      setIsLoading(false);
      return;
    } else {
      router.replace("/SuccessVerification");
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{"کد تایید را وارد کنید."}</Text>
      <View style={{ flexDirection: "row" }}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(input) => (inputs[index] = input)}
            style={[styles.input, { borderColor: digit ? "green" : "gray" }]}
            onChangeText={(text) => handleChange(text, index)}
            value={digit.replace(/\d/g, (d: string) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)])}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}>
        <Text style={[styles.buttonText, isLoading && styles.textDisabled]}>
          {isLoading ? "در حال ارسال..." : "تایید"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

{
  /* <Text style={styles.header}>{"در انتظار تماس..."}</Text>
      <Text style={styles.timer}>زمان باقی مانده: {timer} ثانیه </Text>
      <Text>لطفا تا اعتبار سنجی پایان اعتبار سنجی صبر کنید.</Text> */
}

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
  input: {
    height: 50,
    width: 50,
    fontSize: 22,
    fontWeight: "semibold",
    borderRadius: 8,
    borderColor: "gray",
    borderWidth: 1,
    margin: 4,
    textAlign: "center",
  },
  button: {
    marginTop: 8,
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
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  textDisabled: {
    color: "#666",
  },
});

export default WaitingForCall;
