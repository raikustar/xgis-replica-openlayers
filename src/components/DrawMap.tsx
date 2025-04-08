import { useCallback, useEffect, useRef, useState} from 'react'
import { Map, View } from "ol"
import { fromLonLat } from 'ol/proj'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { GeoJSONCollection} from '../utils/LayersTypes'
import { getRandomNumber } from '../utils/Common'
import { getTileLayerToMap, getPolygonLayer, getMultiPolygonLayer } from '../utils/Layers'


/**
 * @remarks Collects data and visually applies layers to base Map class to draw data to the entire map.
 * 
 * `getCountyData` hook -> Collects all GeoJSON data.
 * 
 * `generateRandomColour` hook -> Generates a random rgb colour. Example: 'rgb(20,51,143,0.3)'.
 * 
 * `addViewToOLMap` hook -> Creates a View layer with OpenLayers. Adds center coordinates and uses zoomValue to set overall zoom and minimum zoom, also has extent coordinates to keep user within range of country. Returns View class.
 * 
 * `getVectorLayer` hook -> Uses GeoJSON coordinates and generates features that are added to vectorSource and finally all of them are set to vectorLayer. Returns VectorLayer class.
 * 
 * `loadOpenLayersMap` hook -> Used to finalize the actual OpenLayers Map class to be sent to a div element.
 * 
 * @returns A parent div element. Which holds a child div element that contains the entire map that is visually drawn.
 */
function OpenLayersMap() {
  const elementRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map>(null)
  const [regionFeatureCollection, setRegionFeatureCollection] = useState<GeoJSONCollection>([])
  const [estoniaCenterCoord] = useState<[number,number]>([25.0136, 58.5953])
  const [coordinateBounds] = useState<number[]>(  
    [
      2819973.2048174,
      8082318.501813691,
      2952680.504293876,
      8105344.071125067
    ]
  )

  const getCountyData = useCallback(() => {
    fetch("static_data/counties_full.geojson")
    .then(res => res.json())
    .then(json => {
      setRegionFeatureCollection(json.features)
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
      extent: coordinateBounds,
      constrainOnlyCenter: true
    });
    return view
  }, [coordinateBounds])

  const addVectorLayer = useCallback((data:GeoJSONCollection) => {
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
      view: addViewToOLMap(estoniaCenterCoord, 8),
      layers: [getTileLayerToMap(), addVectorLayer(data) ]
    })
  } ,[addVectorLayer, addViewToOLMap, estoniaCenterCoord])

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