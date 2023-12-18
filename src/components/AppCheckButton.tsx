import { useEffect, useState } from "react";
import { AppButton, ButtonSize, ButtonTypes } from "./AppButton";
import React from "react";

interface CheckButtonProps {
  onPress: () => void;
  title: string;
  altTitle?: string;
  isChecked: boolean;
  size?: ButtonSize;
}

export const AppCheckButton = ({
  onPress,
  title,
  altTitle,
  isChecked,
  size = "default",
}: CheckButtonProps) => {
  const [buttonType, setButtonType] = useState<ButtonTypes>(
    isChecked ? "secondary" : "primary",
  );
  const [buttonText, setButtonText] = useState(
    isChecked ? (altTitle ? altTitle : title) : title,
  );

  useEffect(() => {
    setButtonType(isChecked ? "secondary" : "primary");
    setButtonText(isChecked ? (altTitle ? altTitle : title) : title);
  }, [isChecked]);

  return (
    <AppButton
      onPress={onPress}
      title={buttonText}
      type={buttonType}
      size={size}
    ></AppButton>
  );
};
