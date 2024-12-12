import { useSession } from '@/components/AuthContext';
import { router } from 'expo-router';
import { useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';


// TODO: Create a proper login page with text input for NIS and password
export default function SignIn() {
  const { signIn } = useSession();
  const [nis, setNis] = useState("123123");
  const [password, setPassword] = useState("fpppfppfpf");
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Inventory Manager</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNis}
        value={nis}
      />
      <TextInput
        textContentType='password'
        secureTextEntry={true}
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Login"
        onPress={() => {
          signIn();
          router.replace('/');
        }} />
    </View>
  );
}


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: Dimensions.get("window").width - 20,
  },
  button: {
    borderWidth: 1,
    padding: 10,
  }
});
