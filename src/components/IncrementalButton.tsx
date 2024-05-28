import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  useNumberInput,
} from "@chakra-ui/react";
import { useContext } from "react";
import { ParamsContext } from "../context/ParamsContext";
import { MODAL_INPUT_HEIGHT, MODAL_INPUT_WIDTH } from "../constants";
import { Parameters } from "../types";

type IncrementalButtonProps = {
  title: string;
  parameterKey: keyof Parameters;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  disabled?: boolean;
};

const IncrementalButton: React.FC<IncrementalButtonProps> = ({
  title,
  parameterKey,
  min,
  max,
  step,
  precision,
  disabled = false,
}) => {
  const { currentParameters, setCurrentParameters } = useContext(ParamsContext);

  const handleChange = (valueAsString: string, valueAsNumber: number) => {
    const value = valueAsString === "" ? null : valueAsNumber;
    setCurrentParameters({
      ...currentParameters,
      [parameterKey]: value,
    });
  };

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      value: currentParameters[parameterKey] ?? "",
      min,
      max,
      step,
      precision,
      onChange: handleChange,
      isDisabled: disabled,
    });

  const incProps = getIncrementButtonProps();
  const decProps = getDecrementButtonProps();
  const inputProps = getInputProps({
    placeholder: "Valgfritt",
    disabled,
  });

  return (
    <Box width={MODAL_INPUT_WIDTH}>
      <Heading size="sm" my="4">
        {title}
      </Heading>
      <HStack>
        <Button height={MODAL_INPUT_HEIGHT} {...decProps} disabled={disabled}>
          -
        </Button>
        <Input height={MODAL_INPUT_HEIGHT} {...inputProps} />
        <Button height={MODAL_INPUT_HEIGHT} {...incProps} disabled={disabled}>
          +
        </Button>
      </HStack>
    </Box>
  );
};

export default IncrementalButton;
