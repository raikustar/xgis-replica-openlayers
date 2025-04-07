import { MultiPolygon, Polygon } from 'ol/geom'
import { Style, Stroke, Fill } from 'ol/style'
import TileLayer from 'ol/layer/Tile'
import { OSM } from 'ol/source'
import { Feature, } from "ol"

/**
 * Creates a new TileLayer class with a source from the OSM class.
 * Draws the base visual map. 
 * @returns TileLayer class.
 */
export function getTileLayerToMap() {
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
export function getPolygonLayer(coordinates:any, fillColour:string = "rgb(255,0,0, 0.2)", strokeColour:string = "rgb(75,75,75,0.8)") {
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
export function getMultiPolygonLayer(coordinates:any, fillColour:string = "rgb(0,255,0, 0.2)", strokeColour:string = "rgb(75,75,75,0.8)") {
    const feature = new Feature({
        geometry: new MultiPolygon(coordinates)
    })
    feature.setStyle(new Style({
        fill: new Fill({ color: fillColour}),
        stroke: new Stroke({ color:strokeColour, width: 1 })          
    }))
    return feature
}