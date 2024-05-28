import { ReactNode, createContext, useState } from "react";
import { parameters as importedParameters } from "../params/parameters";
import { Parameters } from "../types";

type ParamsContextType = {
  parameters: Parameters;
  setParameters: React.Dispatch<React.SetStateAction<Parameters>>;
  initParameters: Parameters;
  setInitParameters: React.Dispatch<React.SetStateAction<Parameters>>;
  currentParameters: Parameters;
  setCurrentParameters: React.Dispatch<React.SetStateAction<Parameters>>;
};

export const ParamsContext = createContext<ParamsContextType>({
  parameters: {},
  setParameters: () => {
    /* do nothing */
  },
  initParameters: {},
  setInitParameters: () => {
    /* do nothing */
  },
  currentParameters: {},
  setCurrentParameters: () => {
    /* do nothing */
  },
});

type ParamsProviderProps = {
  parameters: Parameters;
  setParameters: React.Dispatch<React.SetStateAction<Parameters>>;
  children: ReactNode;
};

const ParamsProvider: React.FC<ParamsProviderProps> = ({
  parameters,
  setParameters,
  children,
}) => {
  const [initParameters, setInitParameters] =
    useState<Parameters>(importedParameters);
  const [currentParameters, setCurrentParameters] =
    useState<Parameters>(importedParameters);
  return (
    <ParamsContext.Provider
      value={{
        parameters,
        setParameters,
        initParameters,
        setInitParameters,
        currentParameters,
        setCurrentParameters,
      }}
    >
      {children}
    </ParamsContext.Provider>
  );
};

export default ParamsProvider;
