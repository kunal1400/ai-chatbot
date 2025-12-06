import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  Conversation,
  ConversationHeader,
  ConversationList,
  ExpansionPanel,
  InfoButton,
  MessageSeparator,
  Search,
  Sidebar,
  TypingIndicator,
  VideoCallButton,
  VoiceCallButton
} from "@chatscope/chat-ui-kit-react";
import { exampleMessages } from "@/mock/message";
import React from "react";

export const conversations = [
  {
    name: "Lilly",
    lastSenderName: "Lilly",
    info: "Yes i can do it for you",
    avatar: "https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg",
    status: "available",
    active: true,
    unreadCnt: 0,
    unreadDot: false
  }
  // {
  //   name: "Joe",
  //   lastSenderName: "Joe",
  //   info: "Yes i can do it for you",
  //   avatar: "https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg",
  //   status: "dnd"
  // },
  // {
  //   name: "Emily",
  //   lastSenderName: "Emily",
  //   info: "Yes i can do it for you",
  //   avatar: "https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg",
  //   status: "available",
  //   unreadCnt: 3
  // },
  // {
  //   name: "Kai",
  //   lastSenderName: "Kai",
  //   info: "Yes i can do it for you",
  //   avatar: "https://chatscope.io/storybook/react/assets/kai-5wHRJGb2.svg",
  //   status: "unavailable",
  //   unreadDot: true
  // },
  // {
  //   name: "Akane",
  //   lastSenderName: "Akane",
  //   info: "Yes i can do it for you",
  //   avatar: "https://chatscope.io/storybook/react/assets/akane-MXhWvx63.svg",
  //   status: "eager"
  // },
  // {
  //   name: "Eliot",
  //   lastSenderName: "Eliot",
  //   info: "Yes i can do it for you",
  //   avatar: "https://chatscope.io/storybook/react/assets/eliot-JNkqSAth.svg",
  //   status: "away"
  // },
  // {
  //   name: "Zoe",
  //   lastSenderName: "Zoe",
  //   info: "Yes i can do it for you",
  //   avatar: "https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg",
  //   status: "dnd",
  // },
  // {
  //   name: "Patrik",
  //   lastSenderName: "Patrik",
  //   info: "Yes i can do it for you",
  //   avatar: "https://chatscope.io/storybook/react/assets/patrik-yC7svbAR.svg",
  //   status: "invisible"
  // }
];

function Chat() {
  const activeConversation = conversations.find((c) => c.active);

  return (
    <MainContainer
      responsive
      style={{
        height: "600px"
      }}
    >
      <Sidebar position="left">
        <Search placeholder="Search..." />
        <ConversationList>
          {conversations.map((c, index) => (
            <Conversation
              key={index}
              name={c.name}
              lastSenderName={c.lastSenderName}
              info={c.info}
              unreadCnt={c.unreadCnt}
              unreadDot={c.unreadDot}
              active={c.active}
            >
              <Avatar name={c.name} src={c.avatar} status={c.status} />
            </Conversation>
          ))}
        </ConversationList>
      </Sidebar>
      <ChatContainer>
        <ConversationHeader>
          <ConversationHeader.Back />
          <Avatar
            name={activeConversation?.name || "User"}
            src={activeConversation?.avatar}
          />
          <ConversationHeader.Content
            info="Active 10 mins ago"
            userName={activeConversation?.name || "User"}
          />
          <ConversationHeader.Actions>
            {/* <VoiceCallButton />
            <VideoCallButton /> */}
            {/* <InfoButton /> */}
          </ConversationHeader.Actions>
        </ConversationHeader>
        <MessageList
          typingIndicator={
            <TypingIndicator
              content={`${activeConversation?.name}  is typing`}
            />
          }
        >
          <MessageSeparator content="Saturday, 30 November 2019" />
          {exampleMessages.map((msg) => {
            let lastDate = "2019-11-30";
            const showSeparator = msg.date !== lastDate;
            // update lastDate for next iteration
            lastDate = msg.date;

            // If avatar field exists and is not null/empty, render Avatar as child.
            // Otherwise set avatarSpacer prop to keep bubble alignment.
            const hasAvatar = !!msg.avatar;

            return (
              <React.Fragment key={msg.id}>
                {showSeparator && (
                  <MessageSeparator
                    content={new Date(msg.date).toLocaleDateString()}
                  />
                )}

                {/* If avatar present, render Message with Avatar child. If not, pass avatarSpacer. */}
                {hasAvatar ? (
                  <Message
                    model={{
                      direction: msg.direction,
                      message: msg.message,
                      position: msg.position ?? "single",
                      sender: msg.sender,
                      sentTime: msg.sentTime
                    }}
                  >
                    <Avatar name={msg.sender} src={msg.avatar!} />
                  </Message>
                ) : (
                  <Message
                    avatarSpacer
                    model={{
                      direction: msg.direction,
                      message: msg.message,
                      position: msg.position ?? "single",
                      sender: msg.sender,
                      sentTime: msg.sentTime
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </MessageList>
        <MessageInput placeholder="Type message here" />
      </ChatContainer>
    </MainContainer>
  );
}

export default Chat;
