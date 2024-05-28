import { Flex } from "@chakra-ui/react";
import IncrementalButton from "../IncrementalButton";
import ListField from "../ListField";

export const SpecialTokens: React.FC = () => (
  <>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <IncrementalButton
        title={"Pad Token ID:"}
        parameterKey="pad_token_id"
        min={1}
        step={1}
        precision={0}
      />
      <IncrementalButton
        title={"Beginning Of Sentence Token ID:"}
        parameterKey="bos_token_id"
        min={1}
        step={1}
        precision={0}
      />
    </Flex>
    <ListField
      title={"End of Sequence Token ID:"}
      parameterKey="eos_token_id"
    />
  </>
);
