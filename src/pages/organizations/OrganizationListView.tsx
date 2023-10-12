import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { OrganizationListCard } from "./OrganizationListCard";
import { useIsFocused } from "@react-navigation/native";
import { fetchOrganizations, updateSubscriptionStatus } from "../../api/organization-api-utils";
import { Organization } from "../../api/types";

export const OrganizationListView = ({ navigation }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchOrganizationsData = async () => {
      try {
        const organizationsList = await fetchOrganizations();
        setOrganizations(organizationsList);
      } catch (error) {
        console.log("Fetching organizations list error", error);
      }
    };
    isFocused && fetchOrganizationsData();
  }, [isFocused]);

  const handleCardPress = (organization) => {
    console.log(`Clicked card: ${organization.name}`);
    navigation.navigate("Organization", { organizationId: organization.id });
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

  const filteredOrganizations = organizations
    ? organizations.filter(
        (org: Organization) =>
          org.name &&
          org.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

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
        keyExtractor={(item) => item.id?.toString()}
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
