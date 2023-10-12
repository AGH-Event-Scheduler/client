import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { EventOrganizationListCard } from "../event/EventOrganizationListCard";
import { globalStyles } from "../../styles/GlobalStyles";
import { OrgEvent, Organization } from "../../api/types";
import { fetchOrganizationEvents } from "../../api/event-api-utils";
import { AppCheckButton } from "../../components/AppCheckButton";
import { fetchOrganizationDetails, updateSubscriptionStatus } from "../../api/organization-api-utils";

export const OrganizationDetailsView = ({ navigation, route }) => {
  const [organization, setOrganization] = useState<Organization>(null);
  const [events, setEvents] = useState<OrgEvent[]>([]);
  const isFocused = useIsFocused();

  const organizationId = route.params.organizationId;

  useEffect(() => {
    const fetchOrganizationDetailsData = async (organizationId: number) => {
      try {
        const organization = await fetchOrganizationDetails(organizationId);
        setOrganization(organization);

        const events = await fetchOrganizationEvents(organizationId);
        setEvents(events);
      } catch (error) {
        console.log("Fetching organization details error", error);
      }
    };

    isFocused && fetchOrganizationDetailsData(organizationId);
  }, [isFocused]);

  const handleCardPress = (event: OrgEvent) => {
    console.log(`Clicked card: ${event.name}`);
    navigation.navigate("Event", { eventId: event.id });
  };

  const handleFollowButtonPress = async () => {
    if (organization) {
      setOrganization({
        ...organization,
        isSubscribed: !organization.isSubscribed,
      });

      await updateSubscriptionStatus(
        organization.id,
        !organization.isSubscribed,
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={globalStyles.imageContainer}>
        <Image
          source={{ uri: organization?.imageUrl }}
          style={globalStyles.image}
        />
      </View>
      <Text style={styles.title}>{organization?.name}</Text>
      <Text style={globalStyles.description}>{organization?.description}</Text>
      <View style={styles.buttonContainer}>
        { organization &&
        <AppCheckButton
          onPress={handleFollowButtonPress}
          title="Follow"
          altTitle="Unfollow"
          isChecked={organization.isSubscribed}
        /> }
      </View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id?.toString()}
        contentContainerStyle={styles.listContainer}
        horizontal={true}
        scrollEnabled={true}
        renderItem={({ item }) => (
          <EventOrganizationListCard
            imageSource={{ uri: item.imageUrl }}
            name={item.name}
            location={item.location}
            onCardPress={() => handleCardPress(item)}
            startDate={item.startDate}
            style={styles.card}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexGrow: 1,
    overflow: "scroll",
  },
  card: {
    width: 300,
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    ...globalStyles.title,
    marginTop: 30,
    marginBottom: 16,
  },
});
