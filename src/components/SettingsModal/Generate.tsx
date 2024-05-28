import { Flex } from "@chakra-ui/react";
import IncrementalButton from "../IncrementalButton";
import Toggle from "../Toggle";

export const Generate: React.FC = () => (
  <>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <IncrementalButton
        title={"Number of Return Sequences:"}
        parameterKey="num_return_sequences"
        min={1}
        step={1}
        precision={0}
      />
      <Toggle title="Output Attentions:" parameterKey="output_attentions" />
    </Flex>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <Toggle
        title="Output Hidden States:"
        parameterKey="output_hidden_states"
      />
      <Toggle title="Output Scores:" parameterKey="output_scores" />
    </Flex>
    <Toggle
      title="Return Dict In Generate:"
      parameterKey="return_dict_in_generate"
    />
  </>
);
