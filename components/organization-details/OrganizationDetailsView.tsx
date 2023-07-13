import React, { useEffect, useState } from "react";
import { Organization, fetchOrganizationDetails, updateSubscriptionStatus } from "../../api/OrganizationApiUtils";
import { StyleSheet, Text, TextInput, View, Image, Button, Pressable, ViewStyle, StyleProp, FlatList, ScrollView } from "react-native";
import { globalStyles } from "../foundation/GlobalStyles";
import { useIsFocused } from "@react-navigation/native";
import { OrgEvent, fetchOrganizationEvents } from "../../api/EventApiUtils";
import { OrganizationListCard } from "../organization/OrganizationListCard";
import { EventOrganizationListCard } from "../event/EventOrganizationListCard";

type FollowStyle = {
  btn: StyleProp<ViewStyle>, 
  text: string,
}

export const OrganizationDetailsView = (
    {navigation, route}
) => {
    const [organization, setOrganization] = useState<Organization>();
    const [events, setEvents] = useState<OrgEvent[]>([]);
    const [followStyle, setFollowStyle] = useState<FollowStyle>();

    const organizationId = route.params.organizationId
  
    const isFocused = useIsFocused();
    useEffect(() => {
      isFocused && fetchOrganizationDetailsData(organizationId);
    }, [isFocused]);
  
    const fetchOrganizationDetailsData = async (
        organizationId: number,
    ) => {
      try {
        const organization = await fetchOrganizationDetails(organizationId);
        setOrganization(organization);

        const events = await fetchOrganizationEvents(organizationId);
        setEvents(events)
        
        updateFollowButtonStyle(organization);
      } catch (error) {
        console.log("Fetching organization details error", error);
      }
    };

    const handleFollowButtonPress = async () => {
      organization.isSubscribed = !organization.isSubscribed;
      await updateSubscriptionStatus(organization.id, organization.isSubscribed);
      updateFollowButtonStyle(organization);
    }

    const updateFollowButtonStyle = (organization: Organization) => {
      if (organization?.isSubscribed) {
        setFollowStyle({btn: [globalStyles.button, globalStyles.secondary], text: "Unfollow"})
      } else {
        setFollowStyle({btn: [globalStyles.button, globalStyles.primary], text: "Follow"})
      }
    }

    const handleCardPress = (event: OrgEvent) => {
      console.log(`Clicked card: ${event.name}`);
      navigation.navigate("Event", {eventId: event.id})
    };
  
    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={{uri: organization?.imageUrl}} style={styles.image} />
        </View>
        <Text style={styles.title}>{organization?.name}</Text>
        <Text style={styles.description}>{organization?.description}</Text>
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleFollowButtonPress}>
            <Text style={followStyle?.btn}>{followStyle?.text}</Text>
          </Pressable>
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
      overflow: "scroll"
    },
    card: {
      width: 300,
      height: 200
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
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 30,
      marginBottom: 16,
    },
    description: {
      fontSize: 16,
      marginTop: 2,
      marginBottom: 2,
      textAlign: "justify",
    },
    imageContainer: {
        display: 'flex',
        textAlign: 'center',
        width: '100%',
        height: 200,
        overflow: "hidden",
        marginTop: 5,
        marginBottom: 5
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        maxHeight: 200
    },
  });
  