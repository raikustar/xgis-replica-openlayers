import { useCallback, useEffect, useRef, useState} from "react"
import { MainIndexCollection } from "../utils/Menu/MenuTypes"
import { useDataSetContext } from "../store/DataContext"
import MenuRenderSelectDimensions from "../utils/Menu/MenuSelectDimensions"

function DrawMenu() {
  const { setCode, setDimensions,setColorscheme } = useDataSetContext()

  const menuWindowRef = useRef<HTMLDivElement>(null)
  const [menuWidth, setMenuWidth] = useState<"0px" | "-400px">("0px")
  const [activeSelection, setActiveSelection] = useState<number>(0)
  const [mainIndexCollection, setMainIndexCollection] = useState<MainIndexCollection>([])
  
  /**
   * Updates menu to be hidden or visible.
   * Uses `menuWindowRef` div element and `menuWidth` react state to toggle the div elements left attribute.
   */
  const toggleMenuWindow = () => {
    // animation keyframes need to be manually adjusted when width changes are made
    if (menuWindowRef.current?.className === "selection_menu") {
      if (menuWidth === "-400px") {
        menuWindowRef.current.style.animationName = "menu-animation-close"
        setMenuWidth("0px")
      } else {
        menuWindowRef.current.style.animationName = "menu-animation-open"
        setMenuWidth("-400px")
      }
    }
  }

  /**
   * Retrieves initial menu data
   */
  const getIndexData = useCallback(() => {
    fetch("static_data/data/index.json")
    .then(res => res.json())
    .then(json => {
      setMainIndexCollection(json)
    })
  },[])

  useEffect(() => {
    getIndexData()
  }, [getIndexData])


  function toggleOptionWindow(id:number, stringId: string) {
    setActiveSelection(id)
    const elementClass = document.querySelectorAll<HTMLElement>(".selection_box")
    const elementId = document.getElementById(stringId)
    if (elementClass) {
      elementClass.forEach(el => el.style.display = "none")
      if (elementId) {
        elementId.style.display = "flex"
      } 
    }
  }

  function retrieveDatasetCode(dataSetCode:string) {
    const fileName = `${dataSetCode}.json`
    fetch("/static_data/data/" + fileName)
      .then(res => res.json())
      .then(json => {
        if (json) {
          setCode(json.code)
          setDimensions(json.dimensions)
          setColorscheme(json.colorscheme)
        } 
      })
  }
  
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
                {mainIndexCollection.map((element) => 
                  <div key={Number(element.code)} className="selection_menu_options_child">
                    <div className="selection_select">
                      <input type="radio" value={Number(element.code)} id={String(element.code)+1000} name="radioInputChoice" onClick={() => toggleOptionWindow(Number(element.code), String(element.code))}/>
                      <p>{element.label.et}</p>
                    </div>
                    <div className="selection_box" id={String(element.code)}>
                      {activeSelection === Number(element.code) && 
                        <div>
                          {element.datasets.map(el => 
                            <div key={el.code} className="selection_select_child">
                              <div style={{display:"flex",flexDirection:"row", alignItems:"center"}}>
                                <input type="radio" value={Number(element.code)} id={String(element.code)+2000} name="childRadioInputChoice" onClick={() => retrieveDatasetCode(el.code)}/>
                                <p>{el.code}</p>
                              </div>
                              <div>
                                <MenuRenderSelectDimensions/>
                              </div>
                            </div>
                          )}
                        </div>
                      }                      
                    </div>
                  </div>
                  
                )}

                
              </div>

              

            <div className="selection_menu_databox"> Data text</div>
          </div>
      </div>
    </>
  )
}

export default DrawMenu