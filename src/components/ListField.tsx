import React, { ChangeEvent, KeyboardEvent, useState, useContext } from "react";
import {
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  Input,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { ParamsContext } from "../context/ParamsContext";
import { MODAL_INPUT_HEIGHT, MODAL_INPUT_WIDTH } from "../constants";
import { getInnermostArray, setNestedArray } from "../utils";

interface ListFieldProps {
  title: string;
  parameterKey: string;
}

const LIST_FIELD_MAX_HEIGHT = "100px";

const ListField: React.FC<ListFieldProps> = ({ title, parameterKey }) => {
  const { currentParameters, setCurrentParameters } = useContext(ParamsContext);
  const [value, setValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const originalArray = currentParameters[parameterKey];
  const innermostArray = getInnermostArray(originalArray);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addNumber();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const addNumber = () => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && !innermostArray.includes(num)) {
      const updatedInnermostArray = [...innermostArray, num];
      const updatedArray = setNestedArray(originalArray, updatedInnermostArray);
      setCurrentParameters({
        ...currentParameters,
        [parameterKey]: updatedArray,
      });
      setValue("");
    }
  };

  const handleRemove = (num: number) => {
    const updatedInnermostArray = innermostArray.filter(
      (param: number) => param !== num
    );
    const updatedArray = setNestedArray(originalArray, updatedInnermostArray);
    setCurrentParameters({
      ...currentParameters,
      [parameterKey]: updatedArray,
    });
  };
  const BORDER_SIZE = "1px";
  return (
    <Box mb={0}>
      <Heading size="sm" my="4">
        {title}
      </Heading>
      <Flex
        minH={MODAL_INPUT_HEIGHT}
        maxH={LIST_FIELD_MAX_HEIGHT}
        width={MODAL_INPUT_WIDTH}
        mb={0}
        overflow={"scroll"}
        direction="row"
        wrap="wrap"
        border={BORDER_SIZE}
        borderColor={isFocused ? "#3182CE" : "#E3E8EF"}
        borderRadius="md"
        alignItems="center"
        p="0"
        boxShadow={isFocused ? "0 0 0 1px #3182CE" : "none"}
        transition="all 0.3s ease"
      >
        {innermostArray.map((num: number, index: number) => (
          <Tag
            size="sm"
            key={index}
            borderRadius="full"
            variant="solid"
            bg="#252E51"
            mx={1}
            my={2}
          >
            <TagLabel>{num}</TagLabel>
            <TagCloseButton onClick={() => handleRemove(num)} />
          </Tag>
        ))}
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={
            innermostArray.length === 0
              ? "Legg til et nummer og klikk Enter"
              : ""
          }
          flex={1}
          border="none"
          variant="none"
        />
      </Flex>
    </Box>
  );
};

export default ListField;
