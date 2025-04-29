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

type Coordinate = [number, number];
export type PolygonCoordinate = Coordinate[][];
export type MultiPolygonCoordinate = Coordinate[][][];

export type GeoJSONCollection = GeoJSONType[]


