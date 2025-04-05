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
  coordinates: number[][][]
}

type MultiPolygonGeometry = {
  type: string,
  coordinates: number[][][][]
}

type Geometry = PolygonGeometry | MultiPolygonGeometry
     
export type GeoJSONCollection = GeoJSONType[]


