import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {UserListCard} from "./UserListCard";
import {useIsFocused} from "@react-navigation/native";
import {UserWithRole} from "../../api/types";
import {useTranslation} from "react-i18next";
import {SearchBar} from "../../components/SearchBar";
import {LoadingView} from "../../components/loading/LoadingView";
import {fetchAllUsersDataWithRoleForOrganization} from "../../api/authentication-api-utils";

export const UserListView = ({
                               navigation,
                             }) => {
  const {t} = useTranslation();

  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");


  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchUsersData = async () => {
      setIsLoading(true);
      try {
        const userList: UserWithRole[] = await fetchAllUsersDataWithRoleForOrganization(
          searchQuery,
          1
        );
        setUsers(userList);
      } catch (error) {
        console.log("Fetching users list error", error);
      }
      setIsLoading(false);
    };
    isFocused && fetchUsersData();
  }, [isFocused]);


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
