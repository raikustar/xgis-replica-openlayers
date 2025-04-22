import { Slider } from "@mui/material"
import { useDataSetContext } from "../../store/DataContext"

function MenuSelectOpacity() {
    const { opacity, setOpacity } = useDataSetContext()

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