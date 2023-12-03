import { Alert } from "react-native";
import { getCurrentLanguage } from "../localization/languages";
import { fetchApiWithRefresh, FormDataFileUpload, Method } from "./api-utils";
import { MultiLanguageText, Organization } from "./types";

export const fetchAllOrganizationsWithStatusByUser = async (
  onlySubscribed = false,
  yourOrganizations = false,
  nameSearchQuery = "",
): Promise<Organization[]> => {
  const url = "/organizations";
  const queryParams = {
    subscribedOnly: onlySubscribed,
    yourOrganizationsOnly: yourOrganizations,
    language: getCurrentLanguage(),
  };
  if (nameSearchQuery !== "") {
    queryParams["name"] = nameSearchQuery;
  }

  try {
    const response = await fetchApiWithRefresh({
      url: url,
      queryParams: queryParams,
    });

    if (response.ok) {
      const data = await response.json();
      return data as Organization[];
    } else {
      console.error(
        `Fetching organizations${
          onlySubscribed ? " (subscribed)" : ""
        } failed:`,
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error(
      `Error fetching organizations${onlySubscribed ? " (subscribed)" : ""}:`,
      error,
    );
    throw error;
  }
};

export const fetchOrganizationById = async (
  organizationId: number,
): Promise<Organization> => {
  const url = `/organizations/${organizationId}`;
  const queryParams = {
    language: getCurrentLanguage(),
  };
  try {
    const response = await fetchApiWithRefresh({
      url: url,
      queryParams: queryParams,
    });
    const data = await response.json();

    if (response.ok) {
      return data as Organization;
    } else {
      console.error("Fetching organization by ID failed:", data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching organization by ID:", error);
    throw error;
  }
};

export const subscribeToOrganization = async (
  organizationId: number,
): Promise<boolean> => {
  const url = "/organizations/subscribe";
  try {
    const response = await fetchApiWithRefresh({
      url: url,
      method: Method.POST,
      queryParams: {
        organizationId: organizationId,
      },
    });

    if (!response.ok) {
      console.error("Subscription failed:", response.statusText);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error during subscription:", error);
    throw error;
  }
};

export const unsubscribeFromOrganization = async (
  organizationId: number,
): Promise<boolean> => {
  const url = "/organizations/unsubscribe";
  try {
    const response = await fetchApiWithRefresh({
      url: url,
      method: Method.POST,
      queryParams: {
        organizationId: organizationId,
      },
    });
    if (!response.ok) {
      console.error("Unsubscribing failed:", response.statusText);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error during Unsubscribing:", error);
    throw error;
  }
};

export const createOrganization = async (
  name: MultiLanguageText,
  description: MultiLanguageText,
  formDataBackgroundImage: FormDataFileUpload,
  formDataLogoImage: FormDataFileUpload,
  leaderEmail: string,
) => {
  const url = "/organizations";
  const formData = new FormData();

  // @ts-ignore
  formData.append("backgroundImage", formDataBackgroundImage);
  // @ts-ignore
  formData.append("logoImage", formDataLogoImage);
  formData.append("name", JSON.stringify(name));
  formData.append("description", JSON.stringify(description));
  formData.append("leaderEmail", leaderEmail);

  try {
    const response = await fetchApiWithRefresh({
      url: url,
      method: Method.POST,
      body: formData,
    });
    if (!response.ok) {
      console.error("Creating organization failed:", response.statusText);
      Alert.alert("Something went wrong with creating organization");
      return null;
    }
    return response.json();
  } catch (error) {
    console.error("Error while creating organization: ", error);
  }
};
