import { updateSubscriptionStatus } from "../api/OrganizationApiUtils";
import { useState } from "react";
import { Organization } from "../api/types";

type ButtonTypes = "primary" | "secondary";

const useFollowButtonStyle = (organization: Organization | undefined) => {
  const [buttonType, setButtonType] = useState<ButtonTypes>("primary");
  const [buttonText, setButtonText] = useState("Follow");

  const updateFollowButtonStyle = () => {
    if (organization?.isSubscribed) {
      setButtonType("secondary");
      setButtonText("Unfollow");
    } else {
      setButtonType("primary");
      setButtonText("Follow");
    }
  };

  const handleFollowButtonPress = async () => {
    if (organization) {
      organization.isSubscribed = !organization.isSubscribed;
      await updateSubscriptionStatus(
        organization.id,
        organization.isSubscribed,
      );
      updateFollowButtonStyle();
    }
  };

  return { buttonType, buttonText, handleFollowButtonPress };
};

export default useFollowButtonStyle;
