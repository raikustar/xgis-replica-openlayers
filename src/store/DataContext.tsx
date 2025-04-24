import { createContext, useContext } from "react";
import { DimensionLabelPair, LabelSpecifier } from "../utils/menu/MenuTypes";

type DataContextType = {
  code: string,
  setCode: (code: string) => void

  dimensions: DimensionLabelPair[],
  setDimensions: (dimensions: DimensionLabelPair[]) => void

  colorscheme: string[],
  setColorscheme: (colors: string[]) => void

  transactionValue: number,
  setTransactionValue: (transaction:number) => void

  yearValue: number,
  setYearValue: (year:number) => void

  dataSetCode: string,
  setDataSetCode: (code: string) => void

  data: LabelSpecifier,
  setData: (data: LabelSpecifier) => void

  opacity: number,
  setOpacity: (opacity:number) => void

  parentMenuSelection: number,
  setParentMenuSelection: (parentMenuSelection: number) => void

  childMenuSelection: string,
  setChildMenuSelection: (childMenuSelection: string) => void
}

export const DataContext = createContext<DataContextType | undefined>(undefined)

export const useDataSetContext = () => {
    const data = useContext(DataContext)
    if (!data) {
        throw new Error("useDataSetContext must be used within a provider.")
    }
    return data
}
