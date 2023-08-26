import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { OrgEvent, fetchEventDetails } from "../../api/EventApiUtils";

export const EventDetailsView = (
    {navigation, route}
) => {
    const [event, setEvent] = useState<OrgEvent>();

    const eventId = route.params.eventId
  
    const isFocused = useIsFocused();
    useEffect(() => {
      isFocused && fetchEventDetailsData(eventId);
    }, [isFocused]);
  
    const fetchEventDetailsData = async (
        organizationId: number,
    ) => {
      try {
        const event = await fetchEventDetails(eventId);
        setEvent(event);

      } catch (error) {
        console.log("Fetching event details error", error);
      }
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={{uri: event?.imageUrl}} style={styles.image} />
        </View>
        <Text style={styles.title}>{event?.name}</Text>
        <Text style={styles.date}>{`${event?.startDate.getDay()}.${event?.startDate.getMonth()} ${event?.startDate.getHours()}:${event?.startDate.getMinutes()} - ${event?.endDate.getHours()}:${event?.endDate.getMinutes()}`}</Text>
        <Text style={styles.title}>{event?.location}</Text>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>{event?.description}</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 16,
    },
    date: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#016531"
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    descriptionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#BBBBBB"
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
  