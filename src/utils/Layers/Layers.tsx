import { MultiPolygon, Polygon } from 'ol/geom'
import { Style, Stroke, Fill } from 'ol/style'
import TileLayer from 'ol/layer/Tile'
import { OSM } from 'ol/source'
import { Feature, View, } from "ol"
import { GeoJSONCollection } from './LayersTypes'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import { getRandomColour } from '../Common'


/**
 * Creates a new TileLayer class with a source from the OSM class.
 * Draws the base visual map. 
 * @returns TileLayer class.
 */
export function getTileLayerToMap(): TileLayer {
    const tileLayer = new TileLayer({
        source: new OSM()
    })
    return tileLayer
}

/**
 * 
 * @param coordinates - Polygon input coordinates. Used to draw the shape inside of the Feature class.
 * @param fillColour - Inner shape colour. Default is 'rgb(255,0,0, 0.2)'.
 * @param strokeColour - Border colour of the shape. Default is 'rgb(75,75,75,0.8)'.
 * @returns The Feature class that contains all coordinates and colours of a Polygon shape. Used to add to a VectorSource.
 */
export function getPolygonLayer(coordinates:any, fillColour:string = "rgb(255,0,0, 0.2)", strokeColour:string = "rgb(75,75,75,0.8)"):Feature {
    const feature = new Feature({
        geometry: new Polygon(coordinates)
    })
    feature.setStyle(new Style({
        fill: new Fill({ color: fillColour}),
        stroke: new Stroke({ color:strokeColour, width: 1 })          
    }))
    return feature
}

/**
 * 
 * @param coordinates - MultiPolygon input coordinates. Used to draw the shape inside of the Feature class.
 * @param fillColour - Inner shape colour. Default is 'rgb(255,0,0, 0.2)'.
 * @param strokeColour - Border colour of the shape. Default is 'rgb(75,75,75,0.8)'.
 * @returns The Feature class that contains all coordinates and colours of a MultiPolygon shape. Used to add to a VectorSource.
 */
export function getMultiPolygonLayer(coordinates:any, fillColour:string = "rgb(0,255,0, 0.2)", strokeColour:string = "rgb(75,75,75,0.8)"):Feature {
    const feature = new Feature({
        geometry: new MultiPolygon(coordinates)
    })
    feature.setStyle(new Style({
        fill: new Fill({ color: fillColour}),
        stroke: new Stroke({ color:strokeColour, width: 1 })          
    }))
    return feature
}

/**
 * The View class is added to the base Map class. Used to keep the user inside of a specific view range.
 * 
 * @param centerCoords - Array coordinates of the center of Estonia. Required input.
 * @param zoomValue - Sets initial zoom value and minimum zoom value. Default is 1.
 * @param coordinateBounds - Array of boundry coordinates to keep the user within bounds of Estonia. 
 * @returns A View class.
 */
export function addViewToOpenLayersMap(centerCoords:number[], zoomValue:number = 1, coordinateBounds:number[]): View {
    const view = new View({
        center: fromLonLat(centerCoords),
        zoom: zoomValue,
        minZoom: zoomValue,
        extent: coordinateBounds,
        padding:[0,0,0,0]
    });
    return view
}

/**
 * The VectorLayer class is added to the base Map class. Used to visual show the counties of Estonia.
 * 
 * @param data - GeoJSON data that is used to draw the Polygons and MultiPolygons..
 * @returns A VectorLayer class.
 */
export function addVectorLayerToOpenLayersMap(data:GeoJSONCollection): VectorLayer {
    const vectorSource = new VectorSource({})
    data.forEach((county) => {
        const colour = getRandomColour()
        let feature;
        const geometryType = county?.geometry?.type
        const coords = county?.geometry?.coordinates
        if (geometryType === "Polygon" && coords) {
            feature = getPolygonLayer(coords, colour)
        } else if (geometryType === "MultiPolygon" && coords) {
            feature = getMultiPolygonLayer(coords, colour)
        }
        if (feature) {
            vectorSource.addFeature(feature)
        }
    })  
    const vectorLayer = new VectorLayer({})
    vectorLayer.setSource(vectorSource)
    return vectorLayer
}
