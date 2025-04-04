
import { useCallback, useEffect, useState} from 'react'
import { Feature, Map, View } from "ol"
import { fromLonLat } from 'ol/proj'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { MultiPolygon, Polygon } from 'ol/geom'
import { Style, Stroke, Fill } from 'ol/style'
import TileLayer from 'ol/layer/Tile'
import { OSM } from 'ol/source'

import { GeoJSONCollection } from '../templates/OpenLayersTypes'


function OpenLayersMap() {
  // check if (div id="map") has changed, if so then rerender. currently adds additional div elements with the map tag.
  // manually remove previous map???????
  const [regionFeatureCollection, setRegionFeatureCollection] = useState<GeoJSONCollection>([])
  
  const getCountyData = useCallback(() => {
    fetch("static_data/counties_simple.geojson")
    .then(res => res.json())
    .then(json => {
      const regionData = json.features
      changeCountyCoordinates(regionData)
    })
  }, [])

  function changeCountyCoordinates(data: GeoJSONCollection) {
    data.forEach((element) => {
      const coords = element.geometry?.coordinates
      // Polygon loops to convert coords
      if (element.geometry.type === "Polygon") {
        element.geometry.coordinates = coords.map(coord => 
          coord.map(innerCoord => fromLonLat(innerCoord))
        )
      }
      // MultiPolygon loops to convert coords
      else if (element.geometry.type === "MultiPolygon") {
        element.geometry.coordinates = coords.map(coord => 
           coord.map(innerCoord => 
            innerCoord.map(inCoord => fromLonLat(inCoord))
          )   
        )
      }  
    })
    setRegionFeatureCollection(data)
  }
  
  const loadOpenLayersMap = useCallback((data:GeoJSONCollection) => {
    if (data.length === 0) return;

      new Map({
        target: 'map',
        view: addViewToOLMap([25.0136, 58.5953], 6.8),
        layers: [getTileLayerToOLMap(), firstShape(data) ]
      })
    } ,[])

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


  function getPolygonLayer(coordinates:number[], fillColour:string = "rgb(255,0,0, 0.2)", strokeColour:string = "red") {
    const feature = new Feature({
      geometry: new Polygon(coordinates)
    })
    feature.setStyle(new Style({
      fill: new Fill({ color: fillColour}),
      stroke: new Stroke({ color:strokeColour, width: 1 })          
    }))
    return feature
  }

  function getMultiPolygonLayer(coordinates:number[][], fillColour:string = "rgb(0,255,0, 0.2)", strokeColour:string = "green") {

    const feature = new Feature({
      geometry: new MultiPolygon([coordinates])
    })
    feature.setStyle(new Style({
      fill: new Fill({ color: fillColour}),
      stroke: new Stroke({ color:strokeColour, width: 1 })          
    }))
    return feature
  }




  function firstShape(data:GeoJSONCollection) {
    let i:number = 0
    const vectorSource = new VectorSource({})
    data.forEach((county) => {
      i = i + 1
      const polygonCoordinateArray:number[] = []
      const multiPolygonCoordinateArray:number[][] = []
      const geometryType = county?.geometry?.type
      const coords = county?.geometry?.coordinates
      if (geometryType === "Polygon") {
        if (coords) {
          coords.forEach((coord) => {
            if (coord) {
              polygonCoordinateArray.push(coord)
            }
          })
        }
        const feature = getPolygonLayer(polygonCoordinateArray)
        vectorSource.addFeature(feature)
      } else if (geometryType === "MultiPolygon") {
        if (coords) {
          coords.forEach(coord => 
            coord.forEach(innerCoord => 
              multiPolygonCoordinateArray.push(innerCoord)
            )
          )
        }  
        const feature = getMultiPolygonLayer(multiPolygonCoordinateArray)
        vectorSource.addFeature(feature)
      }
      
    })
    
    const vectorLayer = new VectorLayer({})
    vectorLayer.setSource(vectorSource)
    
    return vectorLayer
  }

  
  return (
    <div>
        <div id='map' className='ol-map'></div>
    </div>

  )
}

export default OpenLayersMap