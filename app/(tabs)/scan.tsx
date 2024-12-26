import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";

export default function Scan() {
  return (
    <SafeAreaView>
      <ThemedView style={styles.mainContainer}>
        <ThemedText>Foobar</ThemedText>
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: Dimensions.get('screen').height,
  }
})
