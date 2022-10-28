import React, { createContext, useContext, useEffect, useState } from "react";

const Sainsbury = createContext();

const SainsburyContext = ({ children }) => {
  const [currency, setCurrency] = useState("GBP");
  const [symbol, setSymbol] = useState("£");

  useEffect(() => {
    if (currency === "GBP") setSymbol("£");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Sainsbury.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Sainsbury.Provider>
  );
};

export default SainsburyContext;

export const SainsburyState = () => {
  return useContext(Sainsbury);
};
