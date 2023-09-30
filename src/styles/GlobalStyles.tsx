import {StyleSheet} from "react-native";

export const globalStyles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  boldText: {
    fontWeight: "bold",
  },
  date: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#016531",
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#BBBBBB",
  },
  description: {
    fontSize: 16,
    marginTop: 2,
    marginBottom: 2,
    textAlign: "justify",
  },
  location: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  primary: {
    backgroundColor: "#016531",
    borderColor: "#016531",
    color: "#FFFFFF",
  },
  secondary: {
    backgroundColor: "#FFFFFF",
    borderColor: "#016531",
    color: "#016531",
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
