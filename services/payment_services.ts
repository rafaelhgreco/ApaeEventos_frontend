import { ENV } from "@/config/env";
import axios from "axios";
import { handleApiError } from "./auth_services";

const API_BASE_URL = ENV.API_BASE_URL;

interface CreatePaymentIntentParams {
    amount: number;
    eventId: number;
    paymentMethod?: string;
}

interface PaymentIntentResponse {
    paymentIntent: {
        client_secret: string;
        id: string;
        status: string;
    };
}

export const createPaymentIntent = async (
    params: CreatePaymentIntentParams,
    token: string
): Promise<PaymentIntentResponse> => {
    try {
        const response = await axios.post<PaymentIntentResponse>(
            `${API_BASE_URL}/payment/create-payment`,
            {
                amount: params.amount,
                eventId: params.eventId,
                paymentMethod: params.paymentMethod || "credit_card",
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.data.paymentIntent?.client_secret) {
            throw new Error("Client secret não encontrado na resposta");
        }

        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const confirmPayment = async (
    paymentIntentId: string,
    token: string
): Promise<void> => {
    try {
        await axios.post(
            `${API_BASE_URL}/payment/confirm`,
            { paymentIntentId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        handleApiError(error);
    }
};

export const cancelPayment = async (
    paymentIntentId: string,
    token: string
): Promise<void> => {
    try {
        await axios.post(
            `${API_BASE_URL}/payment/cancel`,
            { paymentIntentId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        handleApiError(error);
    }
};
