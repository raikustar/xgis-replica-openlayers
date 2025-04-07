
import { useCallback, useEffect, useRef, useState} from 'react'
import { Map, View } from "ol"
import { fromLonLat } from 'ol/proj'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'


import { GeoJSONCollection} from '../utils/LayersTypes'
import { getRandomNumber } from '../utils/Common'
import { getTileLayerToMap, getPolygonLayer, getMultiPolygonLayer } from '../utils/Layers'

function OpenLayersMap() {
  const elementRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map>(null)
  const [regionFeatureCollection, setRegionFeatureCollection] = useState<GeoJSONCollection>([])

  const getCountyData = useCallback(() => {
    fetch("static_data/counties_full.geojson")
    .then(res => res.json())
    .then(json => {
      const regionData = json.features
      setRegionFeatureCollection(regionData)
    })
  }, [])

  const generateRandomColour = useCallback(() => {
    const r = getRandomNumber()
    const g = getRandomNumber()
    const b = getRandomNumber()
    return `rgb(${r},${g},${b},0.3)`
  }, [])

  const addViewToOLMap = useCallback((centerCoords:number[], zoomValue:number = 1) => {
    const view = new View({
      center: fromLonLat(centerCoords),
      zoom: zoomValue,
      minZoom: zoomValue,
    });
    return view
  }, [])

  const getVectorLayer = useCallback((data:GeoJSONCollection) => {
    const vectorSource = new VectorSource({})
    data.forEach((county) => {
      let feature;
      const geometryType = county?.geometry?.type
      const coords = county?.geometry?.coordinates
      if (geometryType === "Polygon" && coords) {
        feature = getPolygonLayer(coords, generateRandomColour())
      } else if (geometryType === "MultiPolygon" && coords) {
        feature = getMultiPolygonLayer(coords, generateRandomColour())
      }
      if (feature) {
        vectorSource.addFeature(feature)
      }
    })
    
    const vectorLayer = new VectorLayer({})
    vectorLayer.setSource(vectorSource)
    return vectorLayer
  }, [generateRandomColour])

  const loadOpenLayersMap = useCallback((data:GeoJSONCollection) => {
    if (!elementRef.current || mapRef.current || data.length === 0) return;
    
    mapRef.current = new Map({
      target: elementRef.current,
      view: addViewToOLMap([25.0136, 58.5953], 8.5),
      layers: [getTileLayerToMap(), getVectorLayer(data) ]
    })
  } ,[getVectorLayer, addViewToOLMap])

  useEffect(() => {
    getCountyData()
  },[getCountyData])

  useEffect(() => {
    if (regionFeatureCollection.length >= 1) {
      loadOpenLayersMap(regionFeatureCollection)
    }
  }, [loadOpenLayersMap, regionFeatureCollection])
  
  return (
    <div id="map_parent">
      <div ref={elementRef} className="ol-map"></div>
    </div>

  )
}

export default OpenLayersMap