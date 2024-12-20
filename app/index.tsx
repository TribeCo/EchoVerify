import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Page() {
  const handleSubmit = () => {
    router.replace("/home");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{"سلام به اپلیکشین تست ما خوش آمدید!"}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>ورود به برنامه</Text>
      </TouchableOpacity>
    </View>
  );
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
});
