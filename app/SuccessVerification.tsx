import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SuccessVerification: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تأیید موفقیت آمیز</Text>
      <Text style={styles.message}>حساب شما با موفقیت تأیید شد.</Text>
      <TouchableOpacity
        onPress={() => router.replace("/")}
        style={styles.button}>
        <Text style={styles.buttonText}>بازگشت به صفحه اصلی</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#025864",
    padding: 16,
    borderRadius: 16,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    marginTop: 24,
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
});

export default SuccessVerification;
