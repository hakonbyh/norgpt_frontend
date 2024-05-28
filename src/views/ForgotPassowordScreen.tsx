import { useState } from "react";
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
  Link,
  FormControl,
  FormHelperText,
  InputRightElement,
  Image,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/home");
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgotpassword");
  };

  const handleRegisterClick = () => {
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
          <form>
            <Stack spacing={4} p="1rem">
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input type="text" placeholder="Username" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Skjul" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link onClick={handleForgotPasswordClick}>
                    Forgot password?
                  </Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                rounded="md"
                onClick={handleLoginClick}
              >
                Login
              </Button>
              <FormControl>
                <FormHelperText textAlign="center">
                  <Link onClick={handleRegisterClick}>Register</Link>
                </FormHelperText>
              </FormControl>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginScreen;
