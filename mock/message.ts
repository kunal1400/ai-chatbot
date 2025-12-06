export type MessageItem = {
  id: string;
  date: string; // ISO date string (used to group by day)
  direction: "incoming" | "outgoing";
  sender: string;
  message: string;
  position?: "single" | "first" | "normal" | "last";
  sentTime?: string; // human readable time (e.g. "15 mins ago" or "3:32 PM")
  avatar?: string | null; // if present, Avatar will render; otherwise avatarSpacer will be true
};

// Example messages (replace with your own data)
export const exampleMessages: MessageItem[] = [
  {
    id: "m1",
    date: "2019-11-30",
    direction: "incoming",
    sender: "Zoe",
    message: "Hi, I am Lilly, your virtual assistant!",
    position: "single",
    sentTime: "15 mins ago",
    avatar: "https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
  },
  {
    id: "m2",
    date: "2019-11-30",
    direction: "outgoing",
    sender: "Patrik",
    message: "Hi Lilly! Nice to meet you.",
    position: "single",
    sentTime: "15 mins ago",
    avatar: null
  },
  {
    id: "m3",
    date: "2019-11-30",
    direction: "incoming",
    sender: "Zoe",
    message: "How can I assist you today?",
    position: "first",
    sentTime: "14 mins ago",
    avatar: null
  },
  {
    id: "m4",
    date: "2019-11-30",
    direction: "incoming",
    sender: "Zoe",
    message: "You can ask me anything about our services.",
    position: "normal",
    sentTime: "14 mins ago",
    avatar: null
  },
  {
    id: "m5",
    date: "2019-11-30",
    direction: "incoming",
    sender: "Zoe",
    message: "You still there?",
    position: "last",
    sentTime: "14 mins ago",
    avatar: "https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
  },
  {
    id: "m6",
    date: "2019-12-01",
    direction: "outgoing",
    sender: "Patrik",
    message: "Sorry, I got distracted that time. I am available now.",
    position: "single",
    sentTime: "2 hours ago",
    avatar: null
  }
];
