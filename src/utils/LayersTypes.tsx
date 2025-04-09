type GeoJSONType = {
  type: string,
    geometry: Geometry, 
    properties: {
      EKSPORT: string,
      MKOOD: string,
      MNIMI: string
    }
}
type PolygonGeometry = {
  type: string,
  coordinates: number[][]
}
type MultiPolygonGeometry = {
  type: string,
  coordinates: number[][][]
}
type Geometry = PolygonGeometry | MultiPolygonGeometry

type MainIndex = {
  code: Code,
  datasets: []
  label: Label
}

type Label = {
  en: string,
  et: string
}

type Code = {
  code: string
}

export type MainIndexCollection = MainIndex[]

export type GeoJSONCollection = GeoJSONType[]


