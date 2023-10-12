import { useEffect, useState } from "react";
import { AppButton, ButtonTypes } from "./AppButton";
import React from "react";

interface CheckButtonProps {
    onPress: () => void;
    title: string;
    altTitle: string;
    isChecked: boolean
}
export const AppCheckButton = ({onPress, title, altTitle, isChecked}: CheckButtonProps) => {
    const [buttonType, setButtonType] = useState<ButtonTypes>(isChecked ? ButtonTypes.Secondary : ButtonTypes.Primary);
    const [buttonText, setButtonText] = useState(isChecked ? altTitle : title);

    useEffect(() => {
        setButtonType(isChecked ? ButtonTypes.Secondary : ButtonTypes.Primary);
        setButtonText(isChecked ? altTitle : title);

    }, [isChecked])

    return (
        <AppButton
            onPress={onPress}
            title={buttonText}
            type={buttonType}
        ></AppButton>
    );
}
