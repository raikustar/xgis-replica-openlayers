import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useDataSetContext } from "../../store/DataContext"
import MenuSelectColors from "./MenuSelectColors"
import MenuSelectOpacity from "./MenuSelectOpacity"
import { DimensionLabelPair } from "../../utils/menu/MenuTypes"


/**
 * Renders all selectable options with mui as a component.
 * 
 * @returns MenuRenderSelectDimensions as a react function component.
 */
function MenuRenderSelectDimensions() {
  const {dimensions, setTransactionValue, setYearValue} = useDataSetContext()

  return (
    <>
      {dimensions?.map((dims:DimensionLabelPair,jndx) => 
      <div key={jndx}> 
      {dims.label.en === "Transaction" && dims.label.et === "Tehing" &&
        <div className="selection_form">
          <FormControl variant="filled">
            <div style={{display:"flex", flexDirection:"column", gap:"5px"}}>
              <InputLabel id="demo-simple-select-label"
                sx={{
                  color:'black',
                  fontSize:"18px",
                  position:"relative",
                  left:"-65px"}}> 
                {String(dims.label.et)}
              </InputLabel>
              <Select
                id="demo-simple-select"
                defaultValue={0}
                style={{
                  width:'300px', 
                  height:'50px',
                  marginLeft:'75px',
                  marginBottom:"15px"
                  }} 
                >
                {Object.values(dims.values).map((val, idx) =>
                  <MenuItem value={idx} onClickCapture={() => setTransactionValue(idx)}>{String(val["et"])}</MenuItem>            
                )}
              </Select>
            </div>
          </FormControl>
        </div>
      }
      {dims.label.en === "Year" && dims.label.et === "Aasta" &&
        <div key={jndx} className="selection_form">
          <FormControl variant="filled">
            <div style={{display:"flex", flexDirection:"column", gap:"5px"}}>
              <InputLabel id="demo-simple-select-label"
                sx={{
                  color:'black',
                  fontSize:"18px",
                  position:"relative",
                  left:"-65px"}}> 
                {String(dims.label.et)}
              </InputLabel>
              <Select
                id="demo-simple-select"
                defaultValue={0}
                style={{
                  width:'300px', 
                  height:'50px',
                  marginLeft:'75px',
                  marginBottom:"15px"
                  }} 
                >
                {Object.values(dims.values).map((val, idx) =>
                  <MenuItem value={idx} onClickCapture={() => setYearValue(idx)}>{String(val["et"])}</MenuItem>            
                )}
              </Select>
            </div>
          </FormControl>
        </div>
      }
      </div>
      )}
      <MenuSelectColors />
      <MenuSelectOpacity />
      
  </>
  )
}

export default MenuRenderSelectDimensions