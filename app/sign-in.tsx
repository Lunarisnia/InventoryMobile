import { useSession } from '@/components/AuthContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

const Header = () => {
  return (
    <ThemedView style={{
      display: 'flex',
      alignItems: "center",
      marginTop: 20,
      marginBottom: 30,
    }}>
      <Image source={{ uri: "https://dummyimage.com/200x200/000/fff" }} style={{
        width: 150,
        height: 150,
        borderRadius: 200,
        marginBottom: 20,
      }} />
      <ThemedText style={{
        padding: 10,
        fontSize: 30,
        fontWeight: 'bold',
      }}>Welcome! To</ThemedText>
      <ThemedText style={{
        paddingTop: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'violet',
      }}>SmartVentory</ThemedText>
    </ThemedView>
  );
}

const LoginPageButton = ({ onPress, color, title }: any) => {
  const [bgColor, setBgColor] = useState(color);
  return (
    <Pressable style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      width: Dimensions.get('screen').width - 100,
      borderRadius: 30,
      backgroundColor: bgColor,
      marginTop: 10,
      shadowColor: bgColor,
      shadowOpacity: 0.4,
      shadowOffset: {
        width: 0,
        height: 1,
      },
    }}
      onPressIn={() => setBgColor('grey')}
      onPressOut={() => setBgColor(color)}
      onPress={onPress}
    >
      <View>
        <Text style={{
          color: "white",
          fontWeight: '700',
          fontSize: 20,
        }}>{title}</Text>
      </View>
    </Pressable>
  );
}

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
    <SafeAreaView style={{ display: 'flex', alignItems: 'center', }}>
      <ThemedView style={{ display: 'flex', alignItems: 'center', height: Dimensions.get("screen").height }}>
        <Header />
        <StatusBar style="auto" />
        <TextInput
          style={{
            ...styles.input,
          }}
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
        <LoginPageButton
          title="Sign In"
          color={'purple'}
          onPress={async () => {
            await signIn(nis, password);
            setFinished(true);
          }}
        />
        <ThemedText style={{ paddingTop: 10, }}>Don't have an Account?</ThemedText>
        <LoginPageButton
          title="Register"
          color={'green'}
          onPress={() => {
            router.push('/register')
          }}
        />
      </ThemedView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  input: {
    height: 60,
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
