import { createContext, useContext } from "react";
import { DimensionLabelPair } from "../utils/Menu/MenuTypes";

type DataContextType = {
  code: string,
  setCode: (code: string) => void

  dimensions: DimensionLabelPair[],
  setDimensions: (dimensions: DimensionLabelPair[]) => void

  colorscheme: string[],
  setColorscheme: (colors: string[]) => void
}

export const DataContext = createContext<DataContextType | undefined>(undefined)

export const useDataSetContext = () => {
    const data = useContext(DataContext)
    if (!data) {
        throw new Error("useDataSetContext must be used within a provider.")
    }
    return data
}
