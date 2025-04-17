import { FC, ReactNode, useState } from "react";
import { DataContext } from "./DataContext";
import { DimensionLabelPair, LabelSpecifier } from "../utils/menu/MenuTypes";

export const DataContextProvider:FC<{children:ReactNode}> = ({children}) => {
    const [code, setCode] = useState<string>("")
    const [dimensions, setDimensions] = useState<DimensionLabelPair[]>([])
    const [colorscheme, setColorscheme] = useState<string[]>([])
    const [transactionValue, setTransactionValue] = useState<number>(0)
    const [yearValue, setYearValue] = useState<number>(0)
    const [dataSetCode, setDataSetCode] = useState<string>("")
    const [data, setData] = useState<LabelSpecifier>({})


    return (
        <DataContext.Provider
        value={{
            code, setCode, 
            dimensions, setDimensions, 
            colorscheme, setColorscheme,
            transactionValue, setTransactionValue,
            yearValue, setYearValue,
            dataSetCode, setDataSetCode,
            data, setData
        }}>
            {children}
        </DataContext.Provider>
    )
}