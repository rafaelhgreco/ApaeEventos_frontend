export type ChatMessage = {
  id: string;
  sender: "user" | "bot";
  text: string;
};
