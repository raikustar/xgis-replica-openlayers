import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useDataSetContext } from "../../store/DataContext"


/**
 * Renders all selectable options with mui as a component.
 * 
 * @returns MenuRenderSelectDimensions as a react function component.
 */
function MenuRenderSelectDimensions() {
  const {dimensions} = useDataSetContext()
  
  return (
    <>
      {dimensions?.map((dims,jndx) => 
        <div key={jndx} className="selection_form">
          <FormControl variant="filled">
            <InputLabel id="demo-simple-select-label">{String(dims.label.et)}</InputLabel>
            <Select
              id="demo-simple-select"
              defaultValue={0}
              style={{width:"250px", margin:"auto"}}
              
            >
              {Object.values(dims.values).map((val, idx) => 
                <MenuItem value={idx}>{String(val["et"])}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
      )}
    </>
  )
}

export default MenuRenderSelectDimensions