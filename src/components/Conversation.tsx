import React, { useState } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";
import Message from "./Message";
import { MessageType } from "../types";

type ConversationProps = FlexProps & {
  messages: MessageType[];
  loading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
};

const Conversation: React.FC<ConversationProps> = ({
  messages,
  loading,
  messagesEndRef,
}) => {
  const [feedbackGiven, setFeedbackGiven] = useState<boolean[]>([]);

  return (
    <Flex
      mx="auto"
      width={"100%"}
      flex={1}
      h="80%"
      overflowY="scroll"
      overflowX="hidden"
      direction="column"
      py="3"
      px="70"
    >
      {messages.map((message, index) => {
        const isLastMessage = index === messages.length - 1;
        return (
          <Message
            index={index}
            loading={loading}
            isLastMessage={isLastMessage}
            key={index}
            message={message}
            disabled={feedbackGiven[index]}
            giveFeedback={() => {
              setFeedbackGiven((prevState) => {
                const newState = [...prevState];
                newState[index] = true;
                return newState;
              });
            }}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </Flex>
  );
};

export default Conversation;
