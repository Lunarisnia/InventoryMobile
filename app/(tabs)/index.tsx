import { Image, StyleSheet, Text, VirtualizedList } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSession } from '@/components/AuthContext';
import { Fragment, useEffect, useState } from 'react';
import getBorrowList, { GetBorrowListResponse } from '@/internal/inventory/getBorrowList';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { SafeAreaView } from 'react-native-safe-area-context';

//const getItem = (index: number) => {
//  return {
//    id: Math.random().toString(12).substring(0),
//    title: `Item ${index + 1}`
//  }
//}


function BorrowCard({ title, borrowDate, source }: any) {
  return (
    <ThemedView style={styles.borrowListCard}>
      <Image source={{ uri: source }} style={styles.borrowListImage} />
      <ThemedView style={styles.borrowListInformation}>
        <ThemedText style={styles.borrowCardTitle} numberOfLines={3}>
          {title}
        </ThemedText>
        <ThemedText style={{ flex: 1 }}>
          Dipinjam: {borrowDate}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  )
}

export default function HomeScreen() {
  const { signOut, session } = useSession();
  const [borrowList, setBorrowList] = useState([] as Array<GetBorrowListResponse>);
  useEffect(() => {
    async function call() {
      const borrowListResponse = await getBorrowList(session!);
      setBorrowList(borrowListResponse);
    }
    call();
  }, []);

  const getItem = (data: any, index: number) => {
    return borrowList[index];
  };

  const renderFooter = () => {
    return (
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" onPress={() => {
          signOut();
        }}>
          Step 4: Logout
        </ThemedText>
      </ThemedView>
    )
  }

  // TODO: I need the proper header with greeting
  return (
    <SafeAreaView>
      <VirtualizedList
        initialNumToRender={4}
        renderItem={(item) => {
          const d = new Date(0);
          d.setUTCSeconds(item.item.borrow_at);
          return <BorrowCard source={"https://dummyimage.com/40x40/000/fff"} title={item.item.name}
            borrowDate={d.toDateString()} />
        }}
        keyExtractor={(item) => String(item.id)}
        getItemCount={() => borrowList.length}
        getItem={getItem}
        ListHeaderComponent={renderFooter}
      />
    </SafeAreaView>
    //<ParallaxScrollView
    //  headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    //  headerImage={
    //    <ThemedView style={styles.reactLogo}>
    //      <ThemedText type="title">Inventory Manager</ThemedText>
    //    </ThemedView>
    //  }>
    //  <ThemedView style={styles.stepContainer}>
    //    <ThemedText type="subtitle" onPress={() => {
    //      signOut();
    //    }}>
    //      Step 4: Logout
    //    </ThemedText>
    //  </ThemedView>
    //</ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    //height: 178,
    //width: 290,
    bottom: 170,
    left: 10,
    position: 'absolute',
  },
  borrowListCard: {
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    borderRadius: 10,
    margin: 10,
    flexDirection: "row"
  },
  borrowListImage: {
    width: 70,
    height: 70,
  },
  borrowCardTitle: {
    overflow: 'hidden',
    paddingTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
  },
  borrowListInformation: {
    marginLeft: 10,
  },
})
