import { useCallback, useEffect, useRef, useState} from 'react'
import {  Map } from "ol"
import VectorLayer from 'ol/layer/Vector'
import { GeoJSONCollection} from '../utils/layers/LayersTypes'
import { getTileLayerToMap, addViewToOpenLayersMap, addVectorLayerToOpenLayersMap } from '../utils/layers/Layers'
import Zoom from 'ol/control/Zoom'
import { useDataSetContext } from '../store/DataContext'



/**
 * Function component that is used to draw a map. Collects data and visually applies layers to base Map class to draw data to the entire map.
 * 
 * `getCountyData` hook -> Collects all GeoJSON data.
 * 
 * `addVectorLayer` hook -> Uses GeoJSON coordinates and generates features that are added to vectorSource and finally all of them are set to vectorLayer. Returns VectorLayer class.
 * 
 * `loadOpenLayersMap` hook -> Used to finalize the actual OpenLayers Map class to be sent to a div element.
 * 
 * `toggleVectorLayer` hook -> Used to toggle if map has counties drawn or not. setMapDrawToggle state to be used to change that.
 * 
 * @returns A parent div element. Which holds a child div element that contains the entire map that is visually drawn.
 */
function DrawMap() {
  const {colorscheme, data} = useDataSetContext()

  const elementRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map>(null)
  const vectorLayerRef = useRef<VectorLayer | null>(null)
  const [regionFeatureCollection, setRegionFeatureCollection] = useState<GeoJSONCollection>([])
  const [estoniaCenterCoord] = useState<[number,number]>([25.0136, 58.5953])
  const [coordinateBounds] = useState<number[]>([2159973.2048174,7742318.501813691,3292680.504293876, 8455344.07112506])

  const getCountyData = useCallback(() => {
    fetch("static_data/geojson/counties_full.geojson")
    .then(res => res.json())
    .then(json => {
      setRegionFeatureCollection(json.features)
    })
  }, [])

  const addVectorLayer = useCallback(() => {
    return addVectorLayerToOpenLayersMap(regionFeatureCollection, colorscheme)
  }, [regionFeatureCollection, colorscheme])

  const loadOpenLayersMap = useCallback((data: GeoJSONCollection) => {
    if (!elementRef.current || mapRef.current || data.length === 0) return;
    
    const viewLayer = addViewToOpenLayersMap(estoniaCenterCoord, 5, coordinateBounds)
    const tileLayer = getTileLayerToMap()

    mapRef.current = new Map({
      controls: [new Zoom({className: "map_zoom_control"})],
      target: elementRef.current,
      view: viewLayer,
      layers: [tileLayer]
    })
    
  } ,[coordinateBounds, estoniaCenterCoord])

  const toggleVectorLayer = useCallback((mapBoolean: boolean) => {
    const vectorTest = addVectorLayer()
    if (mapRef.current) {
        if (vectorLayerRef.current === null && mapBoolean) {
          vectorLayerRef.current = vectorTest
          mapRef.current.addLayer(vectorTest) 
        } else if (vectorLayerRef.current && !mapBoolean) {
          mapRef.current.removeLayer(vectorLayerRef.current)
          vectorLayerRef.current = null
        }
    }
}, [addVectorLayer])

  useEffect(() => {
    getCountyData()
  },[getCountyData])

  useEffect(() => {
    if (regionFeatureCollection.length >= 1) {
      loadOpenLayersMap(regionFeatureCollection)
    }
    toggleVectorLayer(false)
    if (data !== undefined) {
      toggleVectorLayer(true)
    }
  }, [loadOpenLayersMap, addVectorLayer, regionFeatureCollection, toggleVectorLayer, data])

  return (
    <div id="map_parent">
      <div ref={elementRef} className="ol-map"></div>
    </div>
  )
}

export default DrawMap