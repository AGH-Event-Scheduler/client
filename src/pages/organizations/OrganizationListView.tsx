import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { OrganizationListCard } from "./OrganizationListCard";
import { useIsFocused } from "@react-navigation/native";
import { Organization } from "../../api/types";
import {
  fetchAllOrganizationsWithStatusByUser,
  subscribeToOrganization,
  unsubscribeFromOrganization,
} from "../../api/organization-api-utils";
import { useTranslation } from "react-i18next";
import { SearchBar } from "../../components/SearchBar";
import { LoadingView } from "../../components/loading/LoadingView";

export const OrganizationListView = ({
  navigation,
  onlySubscribed,
  yourOrganizations,
}) => {
  const { t } = useTranslation();

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchOrganizationsData = async () => {
      setIsLoading(true);
      try {
        const organizationsList: Organization[] =
          await fetchAllOrganizationsWithStatusByUser(
            onlySubscribed,
            yourOrganizations,
            searchQuery,
          );
        setOrganizations(organizationsList);
      } catch (error) {
        console.log("Fetching organizations list error", error);
      }
      setIsLoading(false);
    };
    isFocused && fetchOrganizationsData();
  }, [isFocused, searchQuery]);

  const handleCardPress = (organization) => {
    console.log(`Clicked card: ${organization.name}`);
    navigation.navigate("Organization", { organizationId: organization.id });
  };

  const handleStarPress = async (organization) => {
    console.log(`Clicked star: ${organization.name}`);
    const updatedOrganizations = organizations.map(async (org) => {
      if (org.id === organization.id) {
        const updatedStatus = !org.isSubscribed;

        try {
          if (updatedStatus === true) {
            await subscribeToOrganization(organization.id);
          } else {
            await unsubscribeFromOrganization(organization.id);
          }
          return { ...org, isSubscribed: updatedStatus };
        } catch (error) {
          console.error("Error handling organization subscription:", error);
          return org;
        }
      }
      return org;
    });

    const updatedOrganizationsResolved =
      await Promise.all(updatedOrganizations);
    setOrganizations(updatedOrganizationsResolved);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        onSearchChange={(searchTerm: string) => {
          setSearchQuery(searchTerm);
        }}
        style={{ marginTop: 10 }}
      />
      {isLoading ? (
        <LoadingView />
      ) : (
        <FlatList
          data={organizations}
          keyExtractor={(item) => item.id?.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <OrganizationListCard
              image={item?.logoImage}
              text={item.name}
              isSubscribed={item.isSubscribed}
              onCardPress={() => handleCardPress(item)}
              onStarPress={() => handleStarPress(item)}
              style={styles.card}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  card: {
    marginBottom: 10,
  },
});
