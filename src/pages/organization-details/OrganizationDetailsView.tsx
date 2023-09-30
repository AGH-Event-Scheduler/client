import React, {useEffect, useState} from "react";
import {FlatList, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import {fetchOrganizationDetails, Organization} from "../../api/OrganizationApiUtils";
import {EventOrganizationListCard} from "../event/EventOrganizationListCard";
import {globalStyles} from "../../styles/GlobalStyles";
import {OrgEvent} from "../../api/types";
import {fetchOrganizationEvents} from "../../api/EventApiUtils";
import useFollowButtonStyle from "../../hooks/useFollowButtonStyle";
import {AppButton} from "../../components/AppButton";

export const OrganizationDetailsView = ({navigation, route}) => {
  const [organization, setOrganization] = useState<Organization>();
  const [events, setEvents] = useState<OrgEvent[]>();

  const organizationId = route.params.organizationId;

  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused && fetchOrganizationDetailsData(organizationId);
  }, [isFocused]);

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

  const handleCardPress = (event: OrgEvent) => {
    console.log(`Clicked card: ${event.name}`);
    navigation.navigate("Event", {eventId: event.id});
  };

  const {buttonType, buttonText, handleFollowButtonPress} = useFollowButtonStyle(organization);

  return (
    <ScrollView style={styles.container}>
      <View style={globalStyles.imageContainer}>
        <Image source={{uri: organization?.imageUrl}} style={globalStyles.image}/>
      </View>
      <Text style={styles.title}>{organization?.name}</Text>
      <Text style={globalStyles.description}>{organization?.description}</Text>
      <View style={styles.buttonContainer}>
        <AppButton onPress={handleFollowButtonPress} type={buttonType} title={buttonText}/>
      </View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id?.toString()}
        contentContainerStyle={styles.listContainer}
        horizontal={true}
        scrollEnabled={true}
        renderItem={({item}) => (
          <EventOrganizationListCard
            imageSource={{uri: item.imageUrl}}
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
