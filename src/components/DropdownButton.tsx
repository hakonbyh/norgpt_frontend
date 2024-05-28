import {
  Box,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useEffect, useState, useRef } from "react";

type DropdownItem = {
  name?: string;
  description?: string;
};

interface DropdownButtonProps {
  title: string;
  modelName: string;
  items: { [key: string]: DropdownItem };
  mb?: number;
  onChange?: (value: string) => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  title,
  modelName,
  items,
  mb,
  onChange,
}) => {
  const [selectedName, setSelectedName] = useState(modelName);
  const [buttonWidth, setButtonWidth] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setSelectedName(modelName);
  }, [modelName]);

  useEffect(() => {
    if (ref.current) {
      setButtonWidth(ref.current.getBoundingClientRect().width);
    }
  }, [ref]);

  const handleSelect = (value: string) => {
    onChange?.(value);
  };

  return (
    <Box mb={mb}>
      <Heading color="white" size="sm" my="4">
        {title}
      </Heading>
      <Menu>
        <MenuButton
          width={"100%"}
          textAlign="left"
          sx={{
            fontWeight: "400",
            backgroundColor: "white",
            borderColor: "#E3E8EF",
            borderWidth: "1px",
            _hover: {
              borderColor: "#CED6E0",
              backgroundColor: "white",
            },
            _focus: {
              borderColor: "#4880C8",
              backgroundColor: "white",
              borderWidth: "2px",
            },
            _active: {
              borderColor: "#4880C8",
              backgroundColor: "white",
              borderWidth: "2px",
            },
          }}
          as={Button}
          rightIcon={<ChevronDownIcon />}
          ref={ref}
        >
          {items[selectedName]?.name || selectedName}
        </MenuButton>
        {Object.keys(items).length > 0 && (
          <MenuList width={buttonWidth} p="0" overflow="hidden" m={"0"}>
            {Object.entries(items).map(([key, item]) => (
              <Tooltip
                key={key}
                label={item?.description || ""}
                placement="right"
              >
                <MenuItem value={key} onClick={() => handleSelect(key)}>
                  {item?.name || key}
                </MenuItem>
              </Tooltip>
            ))}
          </MenuList>
        )}
      </Menu>
    </Box>
  );
};

export default DropdownButton;
