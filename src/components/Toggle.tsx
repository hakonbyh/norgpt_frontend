import { Flex, Heading, Switch, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { ParamsContext } from "../context/ParamsContext";
import { MODAL_INPUT_HEIGHT, MODAL_INPUT_WIDTH } from "../constants";
import { Parameters } from "../types";

interface ToggleProps {
  title: string;
  parameterKey: keyof Parameters;
}

function Toggle({ title, parameterKey }: ToggleProps) {
  const { currentParameters, setCurrentParameters } = useContext(ParamsContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueAsBoolean = event.target.checked;
    setCurrentParameters({
      ...currentParameters,
      [parameterKey]: valueAsBoolean,
    });
  };
  return (
    <Flex
      width={MODAL_INPUT_WIDTH}
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-end"
    >
      <Heading my="4" size="sm">
        {title}
      </Heading>
      <Flex alignItems="center" height={MODAL_INPUT_HEIGHT}>
        <Switch
          size="lg"
          colorScheme="blue"
          isChecked={currentParameters[parameterKey]}
          onChange={handleChange}
        />
      </Flex>
    </Flex>
  );
}

export default Toggle;
