

type Label = {
    en: string,
    et: string
}
type Code = {
    code: string
}

type DataSetLabel = {
    en:string,
    et:string
}

type DimensionLabelLanguage = {
    et:string,
    en:string
}

export type LabelSpecifier = {
    [key: string]: number
}

export type DataSingle = {
    [key: string]: LabelSpecifier[]
}

export type MainIndex = {
    code: Code,
    datasets: DataSet[]
    label: Label
}

export type DataSet = {
    code:string,
    status:string,
    updated:string,
    label: DataSetLabel
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