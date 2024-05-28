import { Text } from "@chakra-ui/react";

type CharacterCounterProps = {
  text: string;
  maxLength: number;
};

const CharacterCounter: React.FC<CharacterCounterProps> = ({
  text,
  maxLength,
}) => {
  const length = text.length;
  const isLimitReached = length >= maxLength;
  const color = isLimitReached ? "red" : "gray";

  return (
    <Text fontSize="sm" color={color}>
      {length}/{maxLength}
    </Text>
  );
};

export default CharacterCounter;
