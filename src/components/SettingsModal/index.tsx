import { useContext } from "react";
import {
  Button,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  BoxProps,
} from "@chakra-ui/react";
import { ParamsContext } from "../../context/ParamsContext";
import { OutputLengthContent } from "./OutputLengthContent";
import { GenerationStrategyContent } from "./GenerationStrategyContent";
import { OutputLogitsContent } from "./OutputLogitsContent";
import { Generate } from "./Generate";
import { SpecialTokens } from "./SpecialTokens";
import { EncoderDecoder } from "./EncoderDecoder";

type SettingsModalProps = BoxProps & {
  isOpen: boolean;
  handleClose: () => void;
  handleSave: () => void;
  handleReset: () => void;
};

const tabData = [
  { name: "Output Length", component: <OutputLengthContent /> },
  { name: "Generation Strategy", component: <GenerationStrategyContent /> },
  { name: "Output Logits", component: <OutputLogitsContent /> },
  { name: "Generate", component: <Generate /> },
  { name: "Special Tokens", component: <SpecialTokens /> },
  { name: "Encoder Decoder", component: <EncoderDecoder /> },
];

const MODAL_HEIGHT = "45vh";

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  handleClose,
  handleSave,
  handleReset,
}) => {
  const { parameters, currentParameters, initParameters } =
    useContext(ParamsContext);

  const canReset =
    JSON.stringify(currentParameters) === JSON.stringify(initParameters);
  const canSave =
    JSON.stringify(currentParameters) === JSON.stringify(parameters);
  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="4xl">
      <ModalOverlay backdropFilter="blur(3px)" />
      <ModalContent>
        <ModalHeader>Avanserte Instillinger</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs isLazy>
            <TabList overflowX={"auto"}>
              {tabData.map((tab, index) => (
                <Tab key={index}>{tab.name}</Tab>
              ))}
            </TabList>
            <TabPanels height={MODAL_HEIGHT} overflowY="auto">
              {tabData.map((tab, index) => (
                <TabPanel key={index}>{tab.component}</TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button disabled={canReset} onClick={handleReset} colorScheme="red">
            Tilbakestill
          </Button>
          <Button onClick={handleClose} ml="auto" mr={3}>
            Lukk
          </Button>
          <Button disabled={canSave} onClick={handleSave} colorScheme="blue">
            Lagre
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
