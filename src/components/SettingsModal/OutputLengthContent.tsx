import { Box, Flex } from "@chakra-ui/react";
import IncrementalButton from "../IncrementalButton";
import Toggle from "../Toggle";

export const OutputLengthContent: React.FC = () => (
  <Box>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <IncrementalButton
        title={"Max Length:"}
        parameterKey="max_length"
        min={1}
        max={300}
        step={1}
        precision={0}
        disabled={true}
      />
      <IncrementalButton
        title={"Max New Tokens:"}
        parameterKey="max_new_tokens"
        min={1}
        max={500}
        step={1}
        precision={0}
      />
    </Flex>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <IncrementalButton
        title={"Min Length:"}
        parameterKey="min_length"
        min={0}
        max={499}
        step={1}
        precision={0}
      />
      <IncrementalButton
        title={"Min New Tokens:"}
        parameterKey="min_new_tokens"
        min={1}
        max={299}
        step={1}
        precision={0}
      />
    </Flex>
    <Flex minH="100px" alignItems="flex-end" justifyContent="space-between">
      <Toggle title="Early Stopping:" parameterKey="early_stopping" />
      <IncrementalButton
        title={"Max Time:"}
        parameterKey="max_time"
        min={0}
        step={0.01}
        precision={2}
      />
    </Flex>
  </Box>
);
