import { useCallback, useEffect, useRef, useState} from "react"
import { MainIndexCollection } from "../utils/LayersTypes"
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"

function DrawMenu() {
  const menuWindowRef = useRef<HTMLDivElement>(null)
  const [menuWidth, setMenuWidth] = useState<"0px" | "-350px">("0px")
  const [activeSelection, setActiveSelection] = useState<number>(0)
  const [mainIndexCollection, setMainIndexCollection] = useState<MainIndexCollection>([])

  /**
   * Updates menu to be hidden or visible.
   * Uses `menuWindowRef` div element and `menuWidth` react state to toggle the div elements left attribute.
   */
  const toggleMenuWindow = () => {
    // animation keyframes need to be manually adjusted when width changes are made
    if (menuWindowRef.current?.className === "selection_menu") {
      if (menuWidth === "-350px") {
        menuWindowRef.current.style.animationName = "menu-animation-close"
        setMenuWidth("0px")
      } else {
        menuWindowRef.current.style.animationName = "menu-animation-open"
        setMenuWidth("-350px")
      }
    }
  }

  const getData = useCallback(() => {
    fetch("static_data/data/index.json")
    .then(res => res.json())
    .then(json => {
      setMainIndexCollection(json)
    })
  },[])

  useEffect(() => {
    getData()
  }, [getData])


  return (
    <>
        <div ref={menuWindowRef} className='selection_menu' style={{left:menuWidth}}>
            <button onClick={toggleMenuWindow} className="selection_menu_button flex-c">O</button>
            <div className="selection_menu_section">
              <div className="selection_menu_logobox flex-c">
                <h2>Default text</h2>
                <div></div>
              </div>
              <div className="selection_menu_options">
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Valikud</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                  {mainIndexCollection.map((region) => 
                  <FormControlLabel 
                    onClick={() => setActiveSelection(Number(region.code))} 
                    key={Number(region.code)} 
                    value={region.code} 
                    control={<Radio />} 
                    label={region.label.et} 
                    style={{color:"black", width:"250px"}}/>
                  )}
                  {activeSelection !== 0 &&
                    <div style={{color:"black"}}>
                      haha
                    </div>
                  }
                  </RadioGroup>
                </FormControl>
              </div>
            <div className="selection_menu_databox"> Data text</div>
          </div>
      </div>
    </>
  )
}

export default DrawMenu