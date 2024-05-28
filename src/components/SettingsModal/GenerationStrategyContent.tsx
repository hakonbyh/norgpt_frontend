import { Flex } from "@chakra-ui/react";
import IncrementalButton from "../IncrementalButton";
import Toggle from "../Toggle";

export const GenerationStrategyContent: React.FC = () => (
  <>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <Toggle title="Do Sample:" parameterKey="do_sample" />
      <IncrementalButton
        title="Number of Beams:"
        parameterKey="num_beams"
        min={1}
        step={1}
        max={3}
        precision={0}
      />
    </Flex>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <IncrementalButton
        title="Number of Beam Groups:"
        parameterKey="num_beam_groups"
        min={1}
        step={1}
        max={1}
        precision={0}
      />
      <IncrementalButton
        title="Penalty Alpha:"
        parameterKey="penalty_alpha"
        min={0}
        step={0.01}
        precision={2}
      />
    </Flex>
    <Toggle title="Use Cache:" parameterKey="use_cache" />
  </>
);
