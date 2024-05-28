import { Flex } from "@chakra-ui/react";
import IncrementalButton from "../IncrementalButton";

export const EncoderDecoder: React.FC = () => (
  <>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <IncrementalButton
        title={"Encoder No Repeat Ngram Size:"}
        parameterKey="encoder_no_repeat_ngram_size"
        min={1}
        step={1}
        precision={0}
      />
      <IncrementalButton
        title={"Decoder Start Token ID:"}
        parameterKey="decoder_start_token_id"
        min={1}
        step={1}
        precision={0}
      />
    </Flex>
  </>
);
