import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Text, TextInput, View } from "react-native";
import {
  fetchOrganizationsList,
  updateSubscriptionStatus,
} from "../../api/OrganizationApiUtils";
import { OrganizationListCard } from "./OrganizationListCard";

export const OrganizationListView = () => {
  const [organizations, setOrganizations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const organizationsList = await fetchOrganizationsList();
      setOrganizations(organizationsList);
    } catch (error) {
      console.log("Fetching organizations list error", error);
    }
  };

  const handleCardPress = (organization) => {
    console.log(`Clicked card: ${organization.name}`);
    // TODO: Navigate to organization details screen
  };

  const handleStarPress = async (organization) => {
    console.log(`Clicked star: ${organization.name}`);
    const updatedOrganizations = organizations.map((org) => {
      if (org.id === organization.id) {
        const updatedStatus = !org.isSubscribed;
        updateSubscriptionStatus(organization.id, updatedStatus);
        return { ...org, isSubscribed: updatedStatus };
      }
      return org;
    });
    setOrganizations(updatedOrganizations);
  };

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Organizations</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredOrganizations}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <OrganizationListCard
            imageSource={{ uri: item.imageUrl }}
            text={item.name}
            isLiked={item.isSubscribed}
            onCardPress={() => handleCardPress(item)}
            onStarPress={() => handleStarPress(item)}
            style={styles.card}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#B0BCC4",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  card: {
    marginBottom: 16,
  },
});
