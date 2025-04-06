
import { useCallback, useEffect, useRef, useState} from 'react'
import { Feature, Map, View } from "ol"
import { fromLonLat } from 'ol/proj'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { MultiPolygon, Polygon } from 'ol/geom'
import { Style, Stroke, Fill } from 'ol/style'
import TileLayer from 'ol/layer/Tile'
import { OSM } from 'ol/source'

import { GeoJSONCollection} from '../templates/OpenLayersTypes'
import { randomNumber } from '../utils/Randomizer'

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
    const r = randomNumber()
    const g = randomNumber()
    const b = randomNumber()
    return `rgb(${r},${g},${b},0.3)`
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
      layers: [getTileLayerToOLMap(), getVectorLayer(data) ]
    })
  } ,[getVectorLayer])

  useEffect(() => {
    getCountyData()
  },[getCountyData])

  useEffect(() => {
    if (regionFeatureCollection.length >= 1) {
      loadOpenLayersMap(regionFeatureCollection)
    }
  }, [loadOpenLayersMap, regionFeatureCollection])
  
  function addViewToOLMap(centerCoords:number[], zoomValue:number = 1) {
    const view = new View({
      center: fromLonLat(centerCoords),
      zoom: zoomValue,
      minZoom: zoomValue
    });
    return view
  }

  function getTileLayerToOLMap() {
    const tileLayer = new TileLayer({
      source: new OSM()
    })
    return tileLayer
  }

  function getPolygonLayer(coordinates:any, fillColour:string = "rgb(255,0,0, 0.2)", strokeColour:string = "rgb(75,75,75,0.8)") {
    const feature = new Feature({
      geometry: new Polygon(coordinates)
    })
    feature.setStyle(new Style({
      fill: new Fill({ color: fillColour}),
      stroke: new Stroke({ color:strokeColour, width: 1 })          
    }))
    return feature
  }

  function getMultiPolygonLayer(coordinates:any, fillColour:string = "rgb(0,255,0, 0.2)", strokeColour:string = "rgb(75,75,75,0.8)") {
    const feature = new Feature({
      geometry: new MultiPolygon(coordinates)
    })
    feature.setStyle(new Style({
      fill: new Fill({ color: fillColour}),
      stroke: new Stroke({ color:strokeColour, width: 1 })          
    }))
    return feature
  }

  return (
    <div id="map_parent">
      <div ref={elementRef} className="ol-map"></div>
    </div>

  )
}

export default OpenLayersMap