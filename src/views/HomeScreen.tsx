import { Flex, Textarea, Button, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import ParamsProvider from "../context/ParamsContext";
import { parameters as importedParameters } from "../params/parameters";
import CharacterCounter from "../components/CharacterCounter";
import { fetchModels, makePrediction } from "../api";
import { createPostParameters, processResponse } from "../utils";
import { MessageType, ModelItems, Parameters } from "../types";
import { Modes } from "../constants";
import Sidebar from "../components/Sidebar";
import Conversation from "../components/Conversation";

const SIDEBAR_WIDTH = "300px";
const TEXT_AREA_HEIGHT = "120px";
const TEXT_AREA_WIDTH = "60%";

const HomeScreen: React.FC = () => {
  const [modelItems, setModelItems] = useState<ModelItems>({});

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const [selectedModel, setSelectedModel] = useState<string>("");

  const [selectedMode, setSelectedMode] = useState<string>("");

  const [availableTextModes, setAvailableTextModes] = useState<string[]>([]);

  const [messages, setMessages] = useState<MessageType[]>([]);

  const [messageInput, setMessageInput] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [parameters, setParameters] = useState<Parameters>(importedParameters);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [messageInput]);

  useEffect(() => {
    fetchModels()
      .then((data) => {
        setModelItems(data);
        const initialModel = Object.keys(data)[0];
        setSelectedModel(initialModel);
        const initialTextModes = data[initialModel].text_mode || Modes;
        setAvailableTextModes(initialTextModes);
        setSelectedMode(initialTextModes[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toast = useToast();

  const handleSendMessage = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();

      const newMessage: MessageType = { from: "user", text: messageInput };
      setMessages([...messages, newMessage]);

      const loadingMessage: MessageType = { from: "computer", text: "loading" };
      setMessages((prevMessages) => [...prevMessages, loadingMessage]);

      const promptText =
        selectedMode === "summarization"
          ? "Summarise the article:\\n" + messageInput + " |||\\n"
          : messageInput;

      const extraLength =
        selectedMode === "summarization"
          ? ("Summarise the article:\\n" + messageInput + " |||\\n").length
          : 0;

      const postParameters = createPostParameters(parameters, extraLength);

      try {
        setLoading(true);
        setMessageInput("");

        const response = await makePrediction(
          promptText,
          postParameters,
          selectedModel,
          modelItems[selectedModel].region
        );

        const answer = processResponse(
          selectedModel,
          selectedMode,
          response.data.generated_text
        );

        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1] = {
            from: "computer",
            text: answer,
            prompt: messageInput,
          };
          return newMessages;
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Message could not be sent",
          status: "error",
          duration: 3000,
          isClosable: true,
        });

        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages.pop();
          newMessages[newMessages.length - 1].error = true;
          return newMessages;
        });
      } finally {
        setLoading(false);
      }
    },
    [messageInput, messages, parameters, selectedModel, selectedMode]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessageInput(e.target.value);
    },
    []
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (messageInput.trim()) {
          handleSendMessage();
        }
      }
    },
    [messageInput, handleSendMessage]
  );

  return (
    <Flex h="100vh" bg={"gray.100"}>
      <ParamsProvider parameters={parameters} setParameters={setParameters}>
        <Sidebar
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
          modelItems={modelItems}
          setAvailableTextModes={setAvailableTextModes}
          availableTextModes={availableTextModes}
          w={SIDEBAR_WIDTH}
          h="100%"
        />
      </ParamsProvider>
      <Flex bg="gray.100" flex={1} direction={"column"}>
        <Conversation
          loading={loading}
          messages={messages}
          messagesEndRef={messagesEndRef}
        />
        <Flex
          height={TEXT_AREA_HEIGHT}
          width={TEXT_AREA_WIDTH}
          mx={"auto"}
          direction={"column-reverse"}
        >
          <form onSubmit={handleSendMessage} style={{ margin: "auto 0" }}>
            <Flex alignItems="center" width="100%">
              <Textarea
                ref={textareaRef}
                value={messageInput}
                width="100%"
                placeholder="Skriv noe her..."
                backgroundColor="white"
                borderColor="gray.200"
                style={{ resize: "none", maxHeight: "250px" }}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                disabled={loading}
                maxLength={1500}
                _focus={{
                  borderColor: "#232E54",
                  boxShadow: "0 0 0 1px #232E54",
                }}
              />
              <Button
                ml="3"
                size="md"
                bgColor="#232E54"
                color="white"
                _hover={{
                  bg: !messageInput.trim() || loading ? "#232E54" : "#3C4F76",
                }}
                _active={{
                  bg: !messageInput.trim() || loading ? "#232E54" : undefined,
                }}
                style={{
                  opacity: !messageInput.trim() || loading ? 0.2 : 1,
                }}
                type="submit"
                isDisabled={!messageInput.trim() || loading}
              >
                Send
              </Button>
            </Flex>
            <CharacterCounter text={messageInput} maxLength={1500} />
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HomeScreen;
