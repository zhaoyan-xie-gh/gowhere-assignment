import { createContext, useContext, useState } from "react";
import { LatLongWithName } from "../types";

interface LocationSelectionContext {
  selectedLocation: LatLongWithName | undefined;
  setSelectedLocation: (location: LatLongWithName | undefined) => void;
}

const LocationSelectionContext = createContext<
  LocationSelectionContext | undefined
>(undefined);

export const LocationSelectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedLocation, setSelectedLocation] = useState<LatLongWithName>();
  return (
    <LocationSelectionContext.Provider
      value={{ selectedLocation, setSelectedLocation }}
    >
      {children}
    </LocationSelectionContext.Provider>
  );
};

export const useLocationSelection = () => {
  const context = useContext(LocationSelectionContext);
  if (!context) {
    throw new Error(
      "useLocationSelection must be used within an LocationSelectionProvider"
    );
  }
  return context;
};
