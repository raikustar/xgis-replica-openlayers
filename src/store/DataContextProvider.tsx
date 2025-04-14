import { FC, ReactNode, useState } from "react";
import { DataContext } from "./DataContext";
import { DimensionLabelPair } from "../utils/Menu/MenuTypes";

export const DataContextProvider:FC<{children:ReactNode}> = ({children}) => {
    const [code, setCode] = useState<string>("")
    const [dimensions, setDimensions] = useState<DimensionLabelPair[]>([])
    const [colorscheme, setColorscheme] = useState<string[]>([])

    return (
        <DataContext.Provider
        value={{
            code, setCode, 
            dimensions, setDimensions, 
            colorscheme, setColorscheme,
        }}>
            {children}
        </DataContext.Provider>
    )
}