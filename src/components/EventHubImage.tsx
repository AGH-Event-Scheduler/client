import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { AppButton, ButtonSize } from "./AppButton";
import { LoadingView } from "./loading/LoadingView";
import { getImageUrl } from "../api/api-utils";

interface ToggleBuEventHubImageProps {
  imageId: string;
  filename: string;
}

export const EventHubImage = ({
  imageId,
  filename,
}: ToggleBuEventHubImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const source = getImageUrl(imageId, filename);

  return (
    <View style={{ flex: 1 }}>
      <View style={StyleSheet.absoluteFillObject}>
        <LoadingView style={{ display: isLoading ? null : "none" }} />
      </View>
      <Image
        source={{ uri: source }}
        onLoadEnd={() => setIsLoading(false)}
        alt="X"
        style={[styles.image]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
  },
});
