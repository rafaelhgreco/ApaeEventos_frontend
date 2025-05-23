// src/components/molecules/PasswordInput.tsx

import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { PasswordToggleIcon } from "../atoms/password_toggle_icon";
import { TextInputBase } from "../atoms/text_input_base";

export const PasswordInput: React.FC<TextInputProps> = (props) => {
    const [visible, setVisible] = useState(false);

    return (
        <TextInputBase
            {...props}
            secureTextEntry={!visible}
            rightElement={
                <PasswordToggleIcon
                    visible={visible}
                    onPress={() => setVisible((v) => !v)}
                />
            }
        />
    );
};
