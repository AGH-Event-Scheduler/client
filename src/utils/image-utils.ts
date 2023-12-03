import * as ImagePicker from "expo-image-picker";
import * as mime from "react-native-mime-types";
import { FormDataFileUpload } from "../api/api-utils";

export const getFormDataFileUpload = async () : Promise<FormDataFileUpload> => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
  
    const asset = result.assets[0];
  
    const uri = asset.uri;
    const type = mime.lookup(asset.uri);
    if (!type || !mime.extension(type)) {
      return;
    }
    const name = `image.${mime.extension(type)}`;
    return { uri, name, type }
  }