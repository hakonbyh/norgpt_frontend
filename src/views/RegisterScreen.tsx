import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormControl,
  InputRightElement,
  Image,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import React from "react";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

interface UserRegisteredProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserRegistered: React.FC<UserRegisteredProps> = ({ isOpen, onClose }) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            User Registered
          </AlertDialogHeader>

          <AlertDialogBody>
            A mail was sent to the email address
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose} ml={3}>
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

const LoginScreen = () => {
  const navigate = useNavigate();

  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const firstName = (form.elements[0] as HTMLInputElement).value;
    const lastName = (form.elements[1] as HTMLInputElement).value;
    const email = (form.elements[2] as HTMLInputElement).value;
    const password = (form.elements[3] as HTMLInputElement).value;
    const repeatPassword = (form.elements[4] as HTMLInputElement).value;

    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);
    console.log(repeatPassword);

    setIsUserRegistered(true);
  };

  const closeUserRegisteredAlert = () => {
    setIsUserRegistered(false);
    navigate("/");
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          minW={{ base: "90%", md: "468px" }}
          backgroundColor="white"
          boxShadow="md"
        >
          <Flex flexDirection="column" alignItems="center" p="1rem">
            <Image
              src={require("../images/NorwAI_logo.png")}
              borderRadius="full"
              width="200px"
            />
            <Heading>
              <chakra.span color="rgb(230, 230, 230)">Norw</chakra.span>
              <chakra.span color="#DFB63F">AI</chakra.span>
            </Heading>
          </Flex>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} p="1rem">
              <Flex direction="row">
                <FormControl flex="1" marginRight="2">
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CFaUserAlt color="gray.300" />
                    </InputLeftElement>
                    <Input type="text" placeholder="First Name" />
                  </InputGroup>
                </FormControl>
                <FormControl flex="1" marginLeft="2">
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CFaUserAlt color="gray.300" />
                    </InputLeftElement>
                    <Input type="text" placeholder="Last Name" />
                  </InputGroup>
                </FormControl>
              </Flex>

              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input type="email" placeholder="Email" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaLock color="gray.300" />
                  </InputLeftElement>
                  <Input type={"password"} placeholder="Choose Password" />
                  <InputRightElement width="4.5rem"></InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaLock color="gray.300" />
                  </InputLeftElement>
                  <Input type={"password"} placeholder="Repeat Password" />
                </InputGroup>
              </FormControl>
              <Flex justifyContent="space-between">
                <Button
                  borderRadius={0}
                  variant="outline"
                  rounded="md"
                  width="38%"
                  onClick={() => navigate("/login")}
                >
                  Cancel
                </Button>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  rounded="md"
                  width="38%"
                >
                  Register
                </Button>
              </Flex>
            </Stack>
          </form>
        </Box>
      </Stack>
      {isUserRegistered && (
        <UserRegistered
          isOpen={isUserRegistered}
          onClose={closeUserRegisteredAlert}
        />
      )}
    </Flex>
  );
};

export default LoginScreen;
