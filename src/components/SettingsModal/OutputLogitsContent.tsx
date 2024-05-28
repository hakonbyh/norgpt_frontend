import { Flex } from "@chakra-ui/react";
import IncrementalButton from "../IncrementalButton";
import Toggle from "../Toggle";
import ListField from "../ListField";

export const OutputLogitsContent: React.FC = () => (
  <>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <IncrementalButton
        title={"Select Temperature:"}
        parameterKey="temperature"
        min={0}
        step={0.01}
        precision={2}
      />
      <IncrementalButton
        title={"Top K:"}
        parameterKey="top_k"
        min={1}
        step={1}
        precision={0}
      />
    </Flex>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <IncrementalButton
        title={"Top P:"}
        parameterKey="top_p"
        min={0}
        step={0.01}
        precision={2}
      />
      <IncrementalButton
        title="Typical P:"
        parameterKey="typical_p"
        min={0}
        step={0.01}
        precision={2}
      />
    </Flex>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <IncrementalButton
        title="Epsilon Cutoff:"
        parameterKey="epsilon_cutoff"
        min={0}
        step={0.01}
        precision={2}
      />
      <IncrementalButton
        title="Eta Cutoff:"
        parameterKey="eta_cutoff"
        min={0}
        step={0.01}
        precision={2}
      />
    </Flex>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <IncrementalButton
        title="Diversity Penalty:"
        parameterKey="diversity_penalty"
        min={0}
        step={0.1}
        precision={2}
      />
      <IncrementalButton
        title="Repetition Penalty:"
        parameterKey="repetition_penalty"
        min={0}
        step={0.1}
        precision={2}
      />
    </Flex>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <IncrementalButton
        title="Encoder Repetition Penalty:"
        parameterKey="encoder_repetition_penalty"
        min={0}
        step={0.1}
        precision={2}
      />
      <IncrementalButton
        title="Length Penalty:"
        parameterKey="length_penalty"
        min={0}
        step={0.1}
        precision={2}
      />
    </Flex>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <IncrementalButton
        title="No Repeat Ngram Size:"
        parameterKey="no_repeat_ngram_size"
        min={1}
        step={1}
        precision={0}
      />
      <ListField title={"Bad Words ID's:"} parameterKey="bad_words_ids" />
    </Flex>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <ListField title={"Force Words ID's:"} parameterKey="force_words_ids" />
      <Toggle title="Renormalize Logits:" parameterKey="renormalize_logits" />
    </Flex>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <ListField title={"Constraints"} parameterKey="constraints" />

      <IncrementalButton
        title="Forced Bos Token Id:"
        parameterKey="forced_bos_token_id"
        min={0}
        step={1}
        precision={0}
      />
    </Flex>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <ListField
        title={"Forced Eos Token Id:"}
        parameterKey="forced_eos_token_id"
      />

      <Toggle
        title="Remove Invalid Values:"
        parameterKey="remove_invalid_values"
      />
    </Flex>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <IncrementalButton
        title="Exponential Decay Length Penalty:"
        parameterKey="exponential_decay_length_penalty"
        min={0}
        step={0.01}
        precision={2}
      />

      <ListField title={"Suppress Tokens:"} parameterKey="suppress_tokens" />
    </Flex>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <ListField
        title={"Begin Suppress Tokens:"}
        parameterKey="begin_suppress_tokens"
      />

      <ListField
        title={"Forced Decoder Ids:"}
        parameterKey="forced_decoder_ids"
      />
    </Flex>
  </>
);
