import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import { fetchButtonList } from "../../api/OrganizationApiUtils";
import { OrganizationListCard } from "./OrganizationListCard";

export const OrganizationListView = () => {
  const [buttons, setButtons] = useState<string[]>([]);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const buttonList = await fetchButtonList();
      setButtons(buttonList);
    } catch (error) {
      console.log("Wystąpił błąd podczas pobierania listy przycisków:", error);
    }
  };

  const handleButtonPress = (button: string) => {
    console.log(`Clicked ${button}`);
  };

  return (
    <FlatList
      data={buttons}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item, index }) => (
        <OrganizationListCard
          key={index}
          imageSource={{
            uri: "https://knbit.edu.pl/assets/bit-logo-small.jpg",
          }}
          text={item}
          isLiked={index % 2 === 0}
          onPress={() => handleButtonPress(item)}
          style={styles.card}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: "5%",
    paddingHorizontal: "5%",
  },
  card: {
    width: "100%",
    marginBottom: "6%",
  },
});
