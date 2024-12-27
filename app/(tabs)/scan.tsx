import { useSession } from "@/components/AuthContext";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import borrowItem from "@/internal/inventory/borrowItem";
import returnItem from "@/internal/inventory/returnItem";
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Button, Dimensions, Modal, SafeAreaView, StyleSheet, } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Scan() {
  const { session } = useSession();
  const [facing, _] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [itemCode, setItemCode] = useState('');
  const [cameraStatus, setCameraStatus] = useState(true);
  const [scanModal, setScanModal] = useState(false);
  const [scanMode, setScanMode] = useState("item");
  const [returnCode, setReturnCode] = useState('');

  useFocusEffect(useCallback(() => {
    setItemCode("");
    setCameraStatus(true);
    setScanModal(false);
    setScanMode("item");
    setReturnCode("");
  }, []),
  )

  if (!permission) {
    return <ThemedView>
      <ThemedText>
        Camera Loading.
      </ThemedText>
    </ThemedView>
  }

  if (!permission.granted) {
    return (
      <SafeAreaView>
        <ThemedView style={{ height: Dimensions.get("screen").height, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ThemedText>
            Kami butuh izin untuk mengakses Kamera anda
          </ThemedText>
          <Button onPress={requestPermission} title="Grant Permission" />
        </ThemedView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ThemedView style={styles.modalContainer}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={scanModal}
            onRequestClose={() => {
              setScanModal(false)
            }}
          >
            <ThemedView style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: (Dimensions.get('screen').height / 2) - 100,
            }}>
              <ThemedText style={{ paddingTop: 30, }}>
                Apa yang anda ingin lakukan dengan barang ini?
              </ThemedText>
              <ThemedView style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
                <ThemedView style={{ padding: 30, }}>
                  <Button onPress={async () => {
                    const split = itemCode.split(":");
                    const code: string = split[split.length - 1];
                    if (split[0] == "item") {
                      await borrowItem(parseInt(code, 10), session || "");
                    }
                    router.replace('/');
                    setScanModal(false);
                    setItemCode('');
                  }} title={"Pinjam"} />
                </ThemedView>
                <ThemedView style={{ padding: 30 }}>
                  <Button onPress={() => {
                    setScanModal(false);
                    setCameraStatus(true);
                    setScanMode("return");
                  }} title={"Kembalikan"} />
                </ThemedView>
              </ThemedView>
            </ThemedView>
          </Modal>
          {cameraStatus ?
            <CameraView
              onBarcodeScanned={
                (result: BarcodeScanningResult) => {
                  setCameraStatus(false);
                  if (itemCode == '' && scanMode == "item") {
                    setItemCode(result.data);
                    setScanModal(true);
                  }
                  if (returnCode == '' && scanMode == "return") {
                    const returnSplit = result.data.split(":");
                    const itemSplit = itemCode.split(":");
                    if (returnSplit[0] == "return") {
                      returnItem(parseInt(itemSplit[itemSplit.length - 1], 10), returnSplit[returnSplit.length - 1], session || "").then(() => {
                        router.replace("/");
                      })
                    } else {
                      setReturnCode("")
                      setCameraStatus(true);
                    }
                  }
                }
              }
              style={{
                marginTop: 100,
                height: 400,
              }} facing={facing}>
            </CameraView>
            :
            <ThemedView></ThemedView>}
          <ThemedView style={{
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
          }}>
            <ThemedText style={{ fontSize: 30, paddingTop: 10, }}>
              {scanMode == "item" ? "Silahkan Scan Barang" : "Silahkan Scan Kode Unik"}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: Dimensions.get('screen').height,
    display: 'flex',
  },
  modalContainer: {
    height: Dimensions.get('screen').height,
  },
})
