import { Slider } from "@mui/material"
import { useDataSetContext } from "../../store/DataContext"

/**
 * React component that renders a MUI Slider that is used to change the opacity of drawn county shapes.
 */
function MenuSelectOpacity() {
    const { opacity, setOpacity } = useDataSetContext()

    /**
     * MUI has two argument Event and Value 
     * 
     * @param _ - Empty event parameter
     * @param sliderValue - Value that gets used to change the opacity if context.
     */
    function changeSliderValue(_:Event, sliderValue:number) {
        setOpacity(sliderValue) 
    }
  return (
    <>
        <Slider
            value={opacity}
            onChange={changeSliderValue}
            min={0}
            max={1}
            step={0.01}
            sx={{width:"250px"}}
        >
        </Slider>
    </>
  )
}

export default MenuSelectOpacity