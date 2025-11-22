import { getIdToken, userPool } from "@/lib/cognito";
// eslint-disable-next-line import/no-unresolved
import { API_BASE_URL } from "@env";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ChatMessage } from "@/types/chatbot";
import { FlatList } from "react-native";

export function useChatbot() {
  const [visible, setVisible] = useState<boolean>(false);

  // memo para evitar recriações
  const initialMessage = useMemo<ChatMessage>(
    () => ({
      id: "welcome",
      sender: "bot",
      text: "Olá! Sou o assistente virtual da APAE. Como posso ajudar?",
    }),
    []
  );

  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const flatListRef = useRef<FlatList<ChatMessage> | null>(null);

  /**
   * AUTO-SCROLL quando chegam mensagens novas
   */
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  /**
   * 🔥 DETECTAR TROCA DE USUÁRIO NO COGNITO
   */
  const currentUsername = userPool.getCurrentUser()?.getUsername() || null;

  useEffect(() => {
    // Cada vez que o username mudar → limpa o chat
    setMessages([initialMessage]);
    setVisible(false);
  }, [currentUsername, initialMessage]);

  /**
   * CONTROLES DE VISIBILIDADE
   */
  function openChat() {
    setVisible(true);
  }

  function closeChat() {
    setVisible(false);
  }

  /**
   * ENVIO DE MENSAGEM
   */
  async function sendMessage() {
    if (!input.trim()) return;

    const text = input.trim();
    setInput("");

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const currentUser = userPool.getCurrentUser();
      if (!currentUser) throw new Error("Usuário não autenticado");

      const token = await getIdToken();

      const response = await axios.post(
        `${API_BASE_URL}/chatbot/message`,
        { message: text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const botMsg: ChatMessage = {
        id: Date.now().toString() + "_bot",
        sender: "bot",
        text: response.data.reply || "Não encontrei essa informação.",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: Date.now().toString() + "_err",
        sender: "bot",
        text: "Erro ao conectar ao assistente.",
      };

      setMessages((prev) => [...prev, errorMsg]);
    }

    setLoading(false);
  }

  return {
    visible,
    openChat,
    closeChat,
    messages,
    input,
    setInput,
    sendMessage,
    loading,
    flatListRef,
  };
}
