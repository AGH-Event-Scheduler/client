import React, {useEffect, useRef, useState} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {UserListCard} from "./UserListCard";
import {useIsFocused} from "@react-navigation/native";
import {UserWithRole} from "../../api/types";
import {useTranslation} from "react-i18next";
import {SearchBar} from "../../components/SearchBar";
import {LoadingView} from "../../components/loading/LoadingView";
import {fetchAllUsersDataWithRoleForOrganization} from "../../api/authentication-api-utils";

export const UserListView = ({navigation}) => {
  const {t} = useTranslation();
  const PAGE_SIZE = 10
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const flatListRef = useRef(null);
  const isFocused = useIsFocused();

  const renderFooter = () => {
    if (currentPage < totalPages - 1) {
      return (

        <TouchableOpacity onPress={handleLoadMore}>
          <Text>Load more</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <Text>End of list</Text>
      );
    }
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      setIsLoading(true);
      try {
        const {users: userList, totalPages: fetchedTotalPages} =
          await fetchAllUsersDataWithRoleForOrganization(
            searchQuery,
            1,
            currentPage
          );

        setUsers((prevUsers) => [...prevUsers, ...userList]);
        setTotalPages(fetchedTotalPages);
      } catch (error) {
        console.log("Fetching users list error", error);
      }
      setIsLoading(false);
    };

    isFocused && fetchUsersData();
  }, [isFocused, currentPage]);

  const handleLoadMore = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };


  return (
    <View style={styles.container}>
      <SearchBar
        onSearchChange={(searchTerm: string) => {
          setSearchQuery(searchTerm);
        }}
        style={{marginTop: 10}}
      />
      {isLoading ? (
        <LoadingView/>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.email}
          contentContainerStyle={styles.listContainer}
          renderItem={({item}) => (
            <UserListCard
              email={item.email}
              lastname={item.lastname}
              name={item.name}
              style={styles.card}
            />
          )}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          onContentSizeChange={() => {
            if (currentPage > 0) {
              flatListRef.current?.scrollToIndex({
                animated: false,
                index: users.length - 1 - PAGE_SIZE,
                viewOffset: 0,
                viewPosition: 1,
              });
            }
          }}
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
