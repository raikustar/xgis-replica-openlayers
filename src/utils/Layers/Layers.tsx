import { MultiPolygon, Polygon } from 'ol/geom'
import { Style, Stroke, Fill, Text } from 'ol/style'
import TileLayer from 'ol/layer/Tile'
import { OSM } from 'ol/source'
import { Feature, View, } from "ol"
import { GeoJSONCollection } from './LayersTypes'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import { filterHexToRgb } from '../Common'
import { LabelSpecifier } from '../menu/MenuTypes'



/**
 * Creates a new TileLayer class with a source from the OSM class.
 * Draws the base visual map. 
 * @returns TileLayer class.
 */
export function getTileLayerToMap(): TileLayer {
    const tileLayer = new TileLayer({
        source: new OSM(),
    })
    return tileLayer
}

/**
 * 
 * @param coordinates - Polygon input coordinates. Used to draw the shape inside of the Feature class.
 * @param fillColour - Inner shape colour. Default is 'rgb(255,0,0, 0.2)'.
 * @param countyName - Name of the county. Default is an empty string.
 * @returns The Feature class that contains all coordinates and colours of a Polygon shape. Used to add to a VectorSource.
 */
export function getPolygonLayer(coordinates:any, fillColour:string = "rgb(255,0,0)", countyName:string = ""):Feature {
    const strokeColour:string = "rgb(0,0,0)"
    const feature = new Feature({
        geometry: new Polygon(coordinates),
    })
    feature.setStyle(new Style({
        fill: new Fill({ color: fillColour}),
        stroke: new Stroke({ color:strokeColour, width: 1 }),
        text: new Text({
            text:countyName,
            scale:1.2,
            fill: new Fill({ color: strokeColour}),
            stroke: new Stroke({color:"rgb(255,255,255)", width: 3})
        })         
    }))
    return feature
}

/**
 * 
 * @param coordinates - MultiPolygon input coordinates. Used to draw the shape inside of the Feature class.
 * @param fillColour - Inner shape colour. Default is 'rgb(255,0,0, 0.2)'.
 * @param countyName - Name of the county. Default is an empty string.
 * @returns The Feature class that contains all coordinates and colours of a MultiPolygon shape. Used to add to a VectorSource.
 */
export function getMultiPolygonLayer(coordinates:any, fillColour:string = "rgb(0,255,0)", countyName:string = ""):Feature {
    const strokeColour:string = "rgb(0,0,0)"
    const feature = new Feature({
        geometry: new MultiPolygon(coordinates)
    })
    feature.setStyle(new Style({
        fill: new Fill({ color: fillColour}),
        stroke: new Stroke({ color:strokeColour, width: 1 }),
        text: new Text({
            text:countyName,
            scale:1.2,
            fill: new Fill({ color: strokeColour}),
            stroke: new Stroke({color:"rgb(255,255,255)", width: 3})

        })          
    }))
    return feature
}

/**
 * The View class is added to the base Map class. Used to keep the user inside of a specific view range.
 * 
 * @param centerCoords - Array coordinates of the center of Estonia. Required input.
 * @param coordinateBounds - Array of boundry coordinates to keep the user within bounds of Estonia. 
 * @returns A View class.
 */
export function addViewToOpenLayersMap(centerCoords:number[], coordinateBounds:number[]): View {
    const zoomValue:number = 5
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
export function addVectorLayerToOpenLayersMap(geoData:GeoJSONCollection, colors:string[], defaultOpacity: number = 0.7, data:LabelSpecifier): VectorLayer {
    const vectorSource = new VectorSource({})
    geoData.forEach(county => {
        let feature;        
        const countyCode = county?.properties?.MKOOD
        const geometryType = county?.geometry?.type
        const coords = county?.geometry?.coordinates
        const countyValue = getCountyValue(data, countyCode)
        const countyName = county?.properties?.MNIMI
        
        const text:string = `${countyName} \n ${countyValue}`
        
        const colorIndex = filterColorIndex(data, countyValue, colors)
        const colour:string = filterHexToRgb(colors, colorIndex)

        if (geometryType === "Polygon" && coords) {
            feature = getPolygonLayer(coords, colour, text)
        } else if (geometryType === "MultiPolygon" && coords) {
            feature = getMultiPolygonLayer(coords, colour, text)
        }

        if (feature) {
            vectorSource.addFeature(feature)
        }
    })  
    const vectorLayer = new VectorLayer({
        opacity:defaultOpacity
    })
    vectorLayer.setSource(vectorSource)
    return vectorLayer
}


/**
 * Checks if county code has a specific key and returns that key string.
 *  
 * If not returns an empty string.
 * @returns A string.
 */ 
function getCountyValue(data:LabelSpecifier, countyCode:string):string {    
    const code = data[countyCode]
    if (code) return String(code) 
    else return ""
    
}


/**
 * Data Binning to choose a color value based on where the countyValue lands.
 * 
 * @returns A number that is used as an index to select the color value.
 */
function filterColorIndex(data:LabelSpecifier, countyValue:string, colors:string[]):number {
    const value = Number(countyValue)
    const arr = Object.values(data).sort((a,b) => b-a)
    const colorLength = colors.length
    
    const quantileSize = Math.floor(arr.length / colorLength)
    for (let i = 0; i<colorLength;i++) {
        const threshold = i * quantileSize
        if (value >= arr[threshold]) return i 
    }
    return colorLength-1
}