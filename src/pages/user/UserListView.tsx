import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { UserListCard } from "./UserListCard";
import { useIsFocused } from "@react-navigation/native";
import { UserWithRole } from "../../api/types";
import { useTranslation } from "react-i18next";
import { SearchBar } from "../../components/SearchBar";
import { LoadingView } from "../../components/loading/LoadingView";
import { fetchAllUsersDataWithRoleForOrganization } from "../../api/user-api-utlis";
import { PaginationFooter } from "../../components/PaginationFooter";

export const UserListView = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const isFocused = useIsFocused();

  const organizationId = route.params.organizationId;

  useEffect(() => {
    const fetchUsersData = async () => {
      setIsLoading(true);
      try {
        const { users: userList, totalPages: fetchedTotalPages } =
          await fetchAllUsersDataWithRoleForOrganization(
            searchQuery,
            organizationId,
            currentPage,
          );

        setUsers(userList);
        setTotalPages(fetchedTotalPages);
      } catch (error) {
        console.log("Fetching users list error", error);
      }
      setIsLoading(false);
    };

    isFocused && fetchUsersData();
  }, [isFocused, currentPage, searchQuery]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar
        onSearchChange={(searchTerm: string) => {
          setSearchQuery(searchTerm);
          setCurrentPage(0);
        }}
        style={{ marginTop: 10 }}
      />
      {isLoading ? (
        <LoadingView />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.email}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <UserListCard
              email={item.email}
              lastname={item.lastname}
              name={item.name}
              style={styles.card}
              role={item.role}
              organizationId={organizationId}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <PaginationFooter
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={setCurrentPage}
            />
          }
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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  paginationButton: {
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#016531",
  },
  selectedPage: {
    backgroundColor: "#016531",
  },
  paginationButtonText: {
    color: "#016531",
  },
  selectedButtonText: {
    color: "#FFFFFF",
  },
  searchButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
