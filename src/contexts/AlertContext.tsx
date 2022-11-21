import React, { useContext, useState, useEffect } from "react";

interface Props {
  setAlert: (
    header: string,
    message: string,
    duration: number,
    variant: string
  ) => void;
  alertProps: {
    header: string;
    message: string;
    duration: number;
    variant: string;
  };
}

const AlertContext = React.createContext<Props | null>(null);

export function useAlert() {
  return useContext(AlertContext);
}

type AlertProviderProps = {
  children: React.ReactNode;
};

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [message, setMessage] = useState("");
  const [header, setHeader] = useState("");
  const [variant, setVariant] = useState("success");
  const [duration, setDuration] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const setAlert = (
    header: string,
    message: string,
    duration: number,
    variant: string
  ) => {
    setHeader(header);
    setMessage(message);
    setDuration(duration);
  };

  const alertProps = {
    message: message,
    header: header,
    duration: duration,
    variant: variant,
  };

  const value: Props = {
    setAlert,
    alertProps,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};
