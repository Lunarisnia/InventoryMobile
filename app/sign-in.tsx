import { useSession } from '@/components/AuthContext';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';


// TODO: Create a proper login page with text input for NIS and password
export default function SignIn() {
  const { signIn } = useSession();
  const [nis, setNis] = useState("");
  const [password, setPassword] = useState("");
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    if (finished) {
      router.replace('/');
      setFinished(false);
    }
  }, [finished]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Inventory Manager</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNis}
        placeholder="NIS"
        value={nis}
      />
      <TextInput
        textContentType='password'
        secureTextEntry={true}
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Password"
        value={password}
      />
      <Button title="Login"
        onPress={async () => {
          await signIn(nis, password);
          setFinished(true);
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
