import React, { useEffect, useState } from "react";
import { Organization, fetchOrganizationDetails, updateSubscriptionStatus } from "../../api/OrganizationApiUtils";
import { StyleSheet, Text, TextInput, View, Image, Button, Pressable } from "react-native";
import { globalStyles } from "../foundation/GlobalStyles";

export const OrganizationDetailsView = (
    {organizationId},
) => {
    const [organization, setOrganization] = useState<Organization>();
  
    useEffect(() => {
        fetchOrganizationDetailsData(organizationId);
    }, []);
  
    const fetchOrganizationDetailsData = async (
        organizationId: number,
    ) => {
      try {
        const organization = await fetchOrganizationDetails(organizationId);
        setOrganization(organization);
      } catch (error) {
        console.log("Fetching organization details error", error);
      }
    };

    const handleFollowButtonPress = async () => {
      organization.isSubscribed = !organization.isSubscribed;
      await updateSubscriptionStatus(organization.id, organization.isSubscribed);
      setOrganization(organization);
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={{uri: organization?.imageUrl}} style={styles.image} />
        </View>
        <Text style={styles.title}>{organization?.name}</Text>
        <Text style={styles.description}>{organization?.description}</Text>
        <View style={styles.buttonContainer}>
          {
            !organization?.isSubscribed ? 
            (
              <Pressable onPress={handleFollowButtonPress} style={globalStyles.primaryButton}>
                <Text style={globalStyles.primaryButtonText}>Follow</Text>
              </Pressable>
            ) : (
              <Pressable onPress={handleFollowButtonPress} style={globalStyles.secondaryButton}>
                <Text style={globalStyles.secondaryButtonText}>Follow</Text>
              </Pressable>
            )
          }
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
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
  