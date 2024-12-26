import { useSession } from "@/components/AuthContext";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import getUserInfo, { UserInfo } from "@/internal/users/getUserInfo";
import { useEffect, useState } from "react";
import { Image, Pressable, SafeAreaView, StyleSheet } from "react-native";

const ProfilePicture = ({ personName }: any) => {
  return (
    <ThemedView style={{
      display: "flex",
      alignItems: "center",
    }}>
      <Image source={{ uri: "https://dummyimage.com/200x200/000/fff" }} style={{
        width: 100,
        height: 100,
        borderRadius: 100,
      }} />
      <ThemedText style={{
        paddingTop: 10,
      }}>
        {personName}
      </ThemedText>
    </ThemedView>
  );
}

const ProfileButton = () => {
  const [buttonColor, setButtonColor] = useState("white")
  const { signOut } = useSession();
  return (
    <Pressable
      onPressIn={() => setButtonColor("aliceblue")}
      onPressOut={() => setButtonColor("white")}
      onPress={() => signOut()}
    >
      <ThemedView
        style={{
          backgroundColor: buttonColor,
          borderRadius: 10,
          padding: 30,
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
          shadowColor: "black",
          shadowOpacity: 0.4,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          flexDirection: "row",
        }}>
        <IconSymbol name="person.fill" size={40} color={"gray"} style={{
          marginRight: 30,
        }} />
        <ThemedText
          style={{
            paddingTop: 12,
            fontSize: 30,
            fontWeight: "bold"
          }}>
          Logout
        </ThemedText>
      </ThemedView>
    </Pressable>
  )
}

// TODO: Get person name
// TODO: Set Picture
export default function Profile() {
  const [personName, setPersonName] = useState("");
  const { session } = useSession();

  useEffect(() => {
    async function run() {
      const userInfo: UserInfo = await getUserInfo(session || "")
      setPersonName(userInfo.name);
    }
    run()
  }, [personName])


  const Header = () => {
    return (
      <ThemedView style={styles.header}>
        <ProfilePicture personName={personName} />
      </ThemedView >
    )
  }
  return (
    <SafeAreaView>
      <Header />
      <ProfileButton />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "aliceblue",
    paddingBottom: 30,
    paddingTop: 30,
    display: "flex",
    alignItems: "center",
  },
})
