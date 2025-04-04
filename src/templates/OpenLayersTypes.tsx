type GeoJSONType = {
  type: string,
    geometry: {
      type: string,
      coordinates: [] | [][] | [][][]
    },
    properties: {
      EKSPORT: string,
      MKOOD: string,
      MNIMI: string
    }
}

export type GeoJSONCollection = GeoJSONType[]


