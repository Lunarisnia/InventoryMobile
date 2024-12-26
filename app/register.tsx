import LoginPageButton from "@/components/LoginPageButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import registerUser from "@/internal/authorization/register";
import RegisterUser from "@/internal/authorization/register";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, TextInput } from "react-native";

export default function Register() {
  const [personName, setPersonName] = useState('');
  const [nis, setNis] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView>
      <ThemedView style={styles.mainContainer}>
        <ThemedText style={{
          paddingTop: 40,
          paddingBottom: 30,
          fontSize: 40,
          fontWeight: '500',
        }}>
          Register Form
        </ThemedText>
        <ThemedText>Name</ThemedText>
        <TextInput
          style={{
            ...styles.input,
          }}
          onChangeText={setPersonName}
          placeholder="Name"
          value={personName}
        />
        <ThemedText>NIS</ThemedText>
        <TextInput
          style={{
            ...styles.input,
          }}
          onChangeText={setNis}
          placeholder="NIS"
          value={nis}
        />
        <ThemedText>Password</ThemedText>
        <TextInput
          style={{
            ...styles.input,
          }}
          onChangeText={setPassword}
          secureTextEntry={true}
          textContentType="password"
          placeholder="Password"
          value={password}
        />
        <LoginPageButton title={'Submit'} color={"purple"} onPress={async () => {
          const result: boolean = await registerUser({
            name: personName, nis, password,
          })
          if (result) {
            router.replace('/sign-in');
          }
        }} />
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: Dimensions.get("screen").height,
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: Dimensions.get("window").width - 20,
  },
})
