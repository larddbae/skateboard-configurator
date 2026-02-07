"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { Part } from "@/lib/types";

type CustomizerControlsContext = {
  selectedWheel?: Part;
  setWheel: (wheel: Part) => void;
  selectedDeck?: Part;
  setDeck: (deck: Part) => void;
  selectedTruck?: Part;
  setTruck: (truck: Part) => void;
  selectedBolt?: Part;
  setBolt: (bolt: Part) => void;
};

const defaultContext: CustomizerControlsContext = {
  setWheel: () => {},
  setDeck: () => {},
  setTruck: () => {},
  setBolt: () => {},
};

const CustomizerControlsContext = createContext(defaultContext);

type CustomizerControlsProviderProps = {
  defaultWheel?: Part;
  defaultDeck?: Part;
  defaultTruck?: Part;
  defaultBolt?: Part;
  children?: ReactNode;
};

export function CustomizerControlsProvider({
  defaultWheel,
  defaultDeck,
  defaultTruck,
  defaultBolt,
  children,
}: CustomizerControlsProviderProps) {
  const [selectedWheel, setWheel] = useState(defaultWheel);
  const [selectedDeck, setDeck] = useState(defaultDeck);
  const [selectedTruck, setTruck] = useState(defaultTruck);
  const [selectedBolt, setBolt] = useState(defaultBolt);

  const value = useMemo(() => {
    return {
      selectedWheel,
      setWheel,
      selectedDeck,
      setDeck,
      selectedTruck,
      setTruck,
      selectedBolt,
      setBolt,
    };
  }, [selectedWheel, selectedDeck, selectedTruck, selectedBolt]);

  return (
    <CustomizerControlsContext.Provider value={value}>
      {children}
    </CustomizerControlsContext.Provider>
  );
}

export function useCustomizerControls() {
  return useContext(CustomizerControlsContext);
}
