type MainIndex = {
    code: Code,
    datasets: DataSet[]
    label: Label
}

type Label = {
    en: string,
    et: string
}
type Code = {
    code: string
}
export type DataSet = {
    code:string,
    status:string,
    updated:string,
    label: DataSetLabel
}

type DataSetLabel = {
    en:string,
    et:string
}

type DimensionLabelLanguage = {
    et:string,
    en:string
}

export type DimensionLabelPair = {
    label: DimensionLabelLanguage,
    values: DimensionLabelLanguage[]
}

export type IndividualDataset = {
    code: string,
    dimensions: DimensionLabelPair[],
    colorscheme: string[],
}

export type MainIndexCollection = MainIndex[]