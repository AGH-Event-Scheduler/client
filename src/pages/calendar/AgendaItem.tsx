import isEmpty from "lodash/isEmpty";
import React, { useCallback } from "react";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { OrganizationEvent } from "../../api/types";
import { AgendaEntry } from "react-native-calendars";

export interface AgendaListItem extends OrganizationEvent {
  displayFullDates: boolean;
}

interface ItemProps {
  item: AgendaListItem;
}

const AgendaItem = (props: ItemProps) => {
  const { item } = props;

  const itemPressed = useCallback(() => {
    Alert.alert(item.id.toString());
  }, []);

  // if (isEmpty(item)) {
  //   return (
  //     <View>
  //       <Text>No Events Planned Today</Text>
  //     </View>
  //   );
  // }

  return (
    <TouchableOpacity style={[styles.container]} onPress={itemPressed}>
      {/* <Text>{item.name} - {item.organization.name}</Text> */}

      {/* <View style={styles.imageContainer}>
        <Image source={item.org} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.text}>{text}</Text> */}
    </TouchableOpacity>
  );
};

export default AgendaItem;

const styles = StyleSheet.create({
  container: {
    marginLeft: 2,
    marginRight: 2,
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    borderRadius: 13,
    borderColor: "#D6D6D6",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 18,
    overflow: "hidden",
    marginRight: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  text: {
    flex: 1,
    marginRight: "5%",
    fontSize: 19,
    fontWeight: "500",
    flexWrap: "wrap",
  },
  likeIconContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 15,
  },
  likeIconStyle: {
    textShadowColor: "grey",
    textShadowRadius: 2,
  },
});
