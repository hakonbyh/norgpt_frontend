import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import HomeScreen from "./views/HomeScreen";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        overscrollBehaviorY: "none",
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <HomeScreen />
    </ChakraProvider>
  );
}

export default App;
