import React from "react";
import { IconButton, useToast, ToastPosition } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { logFeedback } from "../api";

const TOAST_FEEDBACK_TITLE = "Tilbakemelding sendt.";
const TOAST_FEEDBACK_DESCRIPTION = (feedback: "good" | "bad") =>
  `Du merket dette svaret som ${feedback === "good" ? "bra" : "dårlig"}.`;
const TOAST_ERROR_TITLE = "Noe gikk galt";
const TOAST_ERROR_DESCRIPTION = "Din tilbakemelding kunne ikke sendes";

type FeedbackButtonProps = {
  type: "up" | "down";
  prompt?: string;
  generatedAnswer: string;
  disabled: boolean;
  giveFeedback: () => void;
};

const postFeedback = (
  feedback: "good" | "bad",
  prompt: string | undefined,
  generatedAnswer: string,
  giveFeedback: () => void,
  toast: ReturnType<typeof useToast> // Pass the toast function as an argument
) => {
  logFeedback(prompt, generatedAnswer, feedback)
    .then(() => {
      giveFeedback();
      toast({
        title: TOAST_FEEDBACK_TITLE,
        description: TOAST_FEEDBACK_DESCRIPTION(feedback),
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top" as ToastPosition,
      });
    })
    .catch(() => {
      toast({
        title: TOAST_ERROR_TITLE,
        description: TOAST_ERROR_DESCRIPTION,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top" as ToastPosition,
      });
    });
};

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  type,
  prompt,
  generatedAnswer,
  disabled,
  giveFeedback,
}) => {
  const toast = useToast();

  const handleThumbClick = (feedback: "good" | "bad") => {
    postFeedback(feedback, prompt, generatedAnswer, giveFeedback, toast);
  };

  const icon = type === "up" ? <FaThumbsUp /> : <FaThumbsDown />;
  const feedback = type === "up" ? "good" : "bad";

  return (
    <IconButton
      aria-label={`thumb ${type}`}
      icon={icon}
      bg="transparent"
      color="white"
      onClick={() => handleThumbClick(feedback)}
      disabled={disabled}
      _hover={{
        transform: "scale(1.3)",
        transition: "transform 0.2s",
        color: "#DFB63F",
      }}
      _active={{
        bg: "transparent",
      }}
      _focus={{
        bg: "transparent",
        boxShadow: "none",
      }}
      _disabled={{
        cursor: "not-allowed",
        opacity: "0.4",
        _hover: {
          color: "white",
          transform: "none",
        },
        _active: {
          bg: "transparent",
        },
        _focus: {
          bg: "transparent",
          boxShadow: "none",
        },
      }}
    />
  );
};

export default FeedbackButton;
