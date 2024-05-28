import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import LoadingDots from "../components/LoadingDots";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@chakra-ui/react";
import FeedbackButton from "./FeedbackButton";
import { MessageType } from "../types";

type MessageProps = FlexProps & {
  loading: boolean;
  isLastMessage: boolean;
  message: MessageType;
  disabled: boolean;
  index: number;
  giveFeedback: () => void;
};

type MessageBoxProps = FlexProps & {
  error?: boolean;
  children: React.ReactNode;
};

const MessageBox: React.FC<MessageBoxProps> = ({
  error,
  children,
  ...rest
}) => (
  <Flex
    color="white"
    minW="100px"
    maxW="400px"
    my="1"
    p="3"
    rounded="md"
    alignItems="center"
    border="1px"
    borderColor={error ? "red.500" : "transparent"}
    {...rest}
  >
    {children}
  </Flex>
);

const Message: React.FC<MessageProps> = ({
  loading,
  isLastMessage,
  message,
  disabled,
  index,
  giveFeedback,
}) => {
  const renderFeedbackButton = (type: "up" | "down") => {
    return (
      <FeedbackButton
        type={type}
        prompt={message.prompt}
        generatedAnswer={message.text}
        disabled={disabled}
        giveFeedback={giveFeedback}
      />
    );
  };
  const bgColor = message.error ? "#EEE2E2" : "#4A5568";
  if (message.from === "user") {
    return (
      <Flex alignItems="flex-start" key={index} w="100%" justify="flex-end">
        <MessageBox bg={bgColor} error={message.error}>
          <Text
            color={message.error ? "black" : "white"}
            style={{
              overflowWrap: "break-word",
              wordWrap: "break-word",
              hyphens: "auto",
            }}
          >
            {message.text}
          </Text>
        </MessageBox>
        {message.error && (
          <Tooltip label="The message could not be sent." fontSize="md">
            <span>
              <FontAwesomeIcon
                icon={faExclamationCircle}
                size="lg"
                color="#FF6060"
                style={{ margin: "15px", alignSelf: "flex-start" }}
              />
            </span>
          </Tooltip>
        )}
      </Flex>
    );
  } else {
    return (
      <Flex key={index} w="100%">
        <Avatar
          name="Computer"
          src={require("../images/NorwAI_logo.png")}
          bg="white"
        />
        <MessageBox bg={bgColor} error={false} m={3} flexDirection={"column"}>
          {isLastMessage && loading ? (
            <LoadingDots />
          ) : (
            <>
              <Text
                style={{
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                  hyphens: "auto",
                }}
              >
                {message.text}
              </Text>
              <Box ml={2} alignSelf="flex-end" mt="5px">
                {renderFeedbackButton("up")}
                {renderFeedbackButton("down")}
              </Box>
            </>
          )}
        </MessageBox>
      </Flex>
    );
  }
};

export default Message;
