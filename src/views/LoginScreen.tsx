import React, { Dispatch, SetStateAction, useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

interface LoginScreenProps {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ setIsAuthenticated }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const bodyFormData = new FormData();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    bodyFormData.append("username", username);
    bodyFormData.append("password", password);

    axios({
      method: "post",
      url: "http://exibida02.idi.ntnu.no:7777/auth/login",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
        localStorage.setItem("jwt", response.data.access_token);
        setIsAuthenticated(localStorage.getItem("jwt") !== null ? true : false);
        console.log(response.data.access_token);
        navigate("/home");
      })
      .catch(function (response) {
        console.log(response);
        toast({
          title: "Error",
          description: "Wrong password or username",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
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
          <form onSubmit={handleLogin}>
            <Stack spacing={4} p="1rem">
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <CFaLock color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Skjul" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {/* <FormHelperText textAlign="right">
                  <Link onClick={() => {navigate('/register')}}>Forgot password?</Link>
                </FormHelperText> */}
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                rounded="md"
              >
                Login
              </Button>
              <FormControl>
                {/* <FormHelperText textAlign="center">
              <Link onClick={() => {navigate("/register")}}>Register</Link>
            </FormHelperText> */}
              </FormControl>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

LoginScreen.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default LoginScreen;
