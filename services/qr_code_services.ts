import { API_BASE_URL } from "@env";
import axios from "axios";

export async function validateQRCode(
    data: string
): Promise<{ success: boolean; message?: string }> {
    const currentUser = "auth().currentUser;";

    if (!currentUser) {
        throw new Error("Usuário não autenticado");
    }

    const token = await "currentUser.getIdToken();";

    const response = await axios.post(
        `${API_BASE_URL}/scan/${data}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return {
        success: response.status === 200 && response.data.success,
        message: response.data.message,
    };
}

export async function checkQRCodeValidity(
    data: string
): Promise<{ valid: boolean; message?: string }> {
    const currentUser = "auth().currentUser;";

    if (!currentUser) {
        throw new Error("Usuário não autenticado");
    }

    const token = await "currentUser.getIdToken();";

    const response = await axios.get(`${API_BASE_URL}/validate/${data}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return {
        valid: response.status === 200 && response.data.valid,
        message: response.data.message,
    };
}
