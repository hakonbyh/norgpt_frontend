import {
  Flex,
  Button,
  useDisclosure,
  Radio,
  RadioGroup,
  Stack,
  Heading,
  Text,
  Icon,
  useToast,
  ToastPosition,
  BoxProps,
} from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import DropdownButton from "./DropdownButton";
import SettingsModal from "./SettingsModal";
import { ParamsContext } from "../context/ParamsContext";
import { useContext } from "react";
import ConfirmationModal from "./ConfirmationModal";
import InfoModal from "./InfoModal";
import { ModelItems } from "../types";
import { Modes } from "../constants";

const TOAST_SAVE_TITLE = "Lagret";
const TOAST_SAVE_DESCRIPTION = "Endringene ble lagret";
const TOAST_RESET_TITLE = "Lagret";
const TOAST_RESET_DESCRIPTION = "Endringene ble lagret";

type SidebarProps = BoxProps & {
  selectedModel: string;
  setSelectedModel: (value: string) => void;
  selectedMode: string;
  setSelectedMode: (value: string) => void;
  modelItems: ModelItems;
  setAvailableTextModes: (value: string[]) => void;
  availableTextModes: string[];
};

const Sidebar: React.FC<SidebarProps> = ({
  selectedModel,
  setSelectedModel,
  selectedMode,
  setSelectedMode,
  modelItems,
  setAvailableTextModes,
  availableTextModes,
  ...rest
}) => {
  const {
    isOpen: isResetConfirmOpen,
    onOpen: onResetConfirmOpen,
    onClose: onResetConfirmClose,
  } = useDisclosure();

  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onClose: onSettingsClose,
  } = useDisclosure();
  const {
    isOpen: isInfoOpen,
    onOpen: onInfoOpen,
    onClose: onInfoClose,
  } = useDisclosure();

  const {
    setParameters,
    setCurrentParameters,
    parameters,
    initParameters,
    currentParameters,
  } = useContext(ParamsContext);

  const handleClose = () => {
    onSettingsClose();
    setCurrentParameters(parameters);
  };

  const changeModel = (model: string) => {
    setSelectedModel(model);
    const modelTextModes = modelItems[model].text_mode || Modes;
    setAvailableTextModes(modelTextModes);
    setSelectedMode(modelTextModes[0]);
  };
  const toast = useToast();

  const handleSave = () => {
    setParameters(currentParameters);
    toast({
      title: TOAST_SAVE_TITLE,
      description: TOAST_SAVE_DESCRIPTION,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top" as ToastPosition,
    });
  };

  const handleResetConfirm = () => {
    toast({
      title: TOAST_RESET_TITLE,
      description: TOAST_RESET_DESCRIPTION,
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top" as ToastPosition,
    });
    setParameters({ ...initParameters });
    setCurrentParameters({ ...initParameters });
    onResetConfirmClose();
  };
  return (
    <Flex bg={"#232E54"} padding={"16px"} direction={"column"} {...rest}>
      <SettingsModal
        isOpen={isSettingsOpen}
        handleClose={handleClose}
        handleSave={handleSave}
        handleReset={onResetConfirmOpen}
      />
      <ConfirmationModal
        title={"Bekreft Tilbakestilling"}
        body={"Er du sikker på at du vil tilbakestille alle parametrene?"}
        buttons={["Nei", "Ja"]}
        isOpen={isResetConfirmOpen}
        onClose={onResetConfirmClose}
        onConfirm={handleResetConfirm}
      />
      <DropdownButton
        title={"Velg modell:"}
        modelName={modelItems[selectedModel]?.name || selectedModel}
        items={modelItems}
        onChange={changeModel}
        mb={5}
      />
      <Heading size="sm" my="4" color={"white"}>
        {"Velg tekstmodus:"}
      </Heading>
      <RadioGroup
        value={selectedMode}
        onChange={setSelectedMode}
        mb={10}
        color={"white"}
      >
        <Stack>
          <Radio
            isDisabled={!availableTextModes.includes("generation")}
            value="generation"
          >
            Generer
          </Radio>
          <Radio
            isDisabled={!availableTextModes.includes("summarization")}
            value="summarization"
          >
            Oppsummer
          </Radio>
        </Stack>
      </RadioGroup>

      <Button
        onClick={onSettingsOpen}
        bg={"#4A5568"}
        color={"#F7F9FB"}
        _hover={{ bg: "#718096" }}
        transition="0.3s"
      >
        Avanserte Innstillinger
      </Button>

      <Button
        mt={5}
        onClick={onInfoOpen}
        leftIcon={<Icon as={AiOutlineInfoCircle} boxSize="1.2em" />}
        bg={"#4A5568"}
        color={"#F7F9FB"}
        _hover={{ bg: "#718096" }}
        transition="0.3s"
      >
        Informasjon
      </Button>

      <Flex mt={5} align="center" justify="center">
        <Text fontSize="5xl" as="span" color="#F7F9FB">
          Norw
        </Text>
        <Text fontSize="5xl" as="span" color="#DFB63F">
          AI
        </Text>
      </Flex>
      <Flex align="center" justify="center">
        <Text fontSize="2xl" as="span" color="#F7F9FB">
          Nor
        </Text>
        <Text fontSize="2xl" as="span" color="#DFB63F">
          GPT
        </Text>
      </Flex>
      <InfoModal isOpen={isInfoOpen} onClose={onInfoClose} />
    </Flex>
  );
};

export default Sidebar;
