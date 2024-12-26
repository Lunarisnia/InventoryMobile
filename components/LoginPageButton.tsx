import { useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

interface LoginPageButtonComponent {
  onPress: () => void,
  color: string,
  title: string,
}

export default function LoginPageButton({ onPress, color, title }: LoginPageButtonComponent) {
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

