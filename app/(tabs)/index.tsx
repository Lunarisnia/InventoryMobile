import { Dimensions, Image, StyleSheet, VirtualizedList } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSession } from '@/components/AuthContext';
import React, { useCallback, useEffect, useState } from 'react';
import getBorrowList, { GetBorrowListResponse } from '@/internal/inventory/getBorrowList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';

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

//  https://dummyimage.com/600x400/000/fff
function HomeBannerCard() {
  const bannerHeight = 350;
  return (
    <ThemedView style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Image source={{ uri: "https://dummyimage.com/600x400/000/fff" }} style={{
        width: bannerHeight,
        height: bannerHeight / (16 / 9),
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
      }} />
    </ThemedView>
  );
}

export default function HomeScreen() {
  const { signOut, session } = useSession();
  const [borrowList, setBorrowList] = useState([] as Array<GetBorrowListResponse>);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(useCallback(() => {
    async function call() {
      const borrowListResponse = await getBorrowList(session!);
      setBorrowList(borrowListResponse);
    }
    call();
    return () => {
    }
  }, [])
  )

  const getItem = (data: any, index: number) => {
    return borrowList[index];
  };

  const renderHeader = () => {
    return (
      <React.Fragment>
        <HomeBannerCard />
        <ThemedView>
          <ThemedText style={{
            paddingLeft: 10,
            paddingTop: 20,
            paddingBottom: 10,
            borderBottomWidth: 1,
            fontSize: 30,
          }}>Active Borrow List</ThemedText>
        </ThemedView>
      </React.Fragment>
    )
  }
  const renderFooter = () => {
    return <ThemedView style={styles.stepContainer}>
      <ThemedText>Mohon kembalikan barang barang yang telah anda pinjam</ThemedText>
    </ThemedView>
  }

  return (
    <SafeAreaView>
      <ThemedView style={{ height: Dimensions.get("screen").height, }}>
        <VirtualizedList
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            const borrowListResponse = await getBorrowList(session!);
            setBorrowList(borrowListResponse);
            setRefreshing(false);
          }}
          initialNumToRender={4}
          renderItem={(item) => {
            const d = new Date(0);
            d.setUTCSeconds(item.item.borrow_at);
            return <BorrowCard source={item.item.image} title={item.item.name}
              borrowDate={d.toDateString()} />
          }}
          keyExtractor={(item) => String(item.id)}
          getItemCount={() => borrowList.length}
          getItem={getItem}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
        />
      </ThemedView>
    </SafeAreaView>
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
    height: 100,
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
    flexDirection: "row",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  borrowListImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
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
  cardBorder: {
    borderWidth: 1,
  },
})
