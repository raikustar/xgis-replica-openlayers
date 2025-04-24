import { useCallback, useEffect, useRef, useState} from "react"
import { DataSet, MainIndex, MainIndexCollection } from "../utils/menu/MenuTypes"
import { useDataSetContext } from "../store/DataContext"
import MenuSelectDimensionsComponent from "./menu/MenuSelectDimensionsComponent"
import { toggleRadioInputWindow } from "../utils/menu/Menu"


/**
 * Function component which is used to render the whole left-hand side menu.
 * 
 * @returns Functional react component
 */
function DrawMenu() {
  const { transactionValue, yearValue, dataSetCode,
    parentMenuSelection, childMenuSelection,  
    setCode, setDimensions, setColorscheme, 
    setOpacity, setDataSetCode, setData,
    setParentMenuSelection, setChildMenuSelection} = useDataSetContext()

  const menuWindowRef = useRef<HTMLDivElement>(null)
  const [menuWidth, setMenuWidth] = useState<"0px" | "-400px">("0px")


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

  const getDatasetData = useCallback(() =>  {
    const fileName = `${dataSetCode}.json`
    fetch("/static_data/data/" + fileName)
      .then(res => {
        const contentType = res.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Failed to get file")
        } 
        return res.json()
      })
      .then(json => { 
        if (json) {
          const data = json.data.MK
          const text:string = `${transactionValue}.${yearValue}`
          setData(data[text])
          setOpacity(Number(json.defaultselection[1]))
          setCode(json.code)
          setDimensions(json.dimensions)
          setColorscheme(json.colorscheme)
        } 
      })
      

  },[setCode, setDimensions, setColorscheme, setData, transactionValue, yearValue, dataSetCode, setOpacity])

  useEffect(() => {
    getIndexData()
    getDatasetData()
  }, [getDatasetData, getIndexData])

  function toggleOptionWindowParent(id:number, htmlElementId: string, htmlParentClass:string) {
    setParentMenuSelection(id)
    setChildMenuSelection("")
    toggleRadioInputWindow(htmlElementId,htmlParentClass)
  }

  function toggleOptionWindowChild(htmlElementId: string, htmlParentClass:string) {
    setChildMenuSelection(htmlElementId)
    setDataSetCode(htmlElementId)
    toggleRadioInputWindow(htmlElementId,htmlParentClass)
  }

  function mainChoiceComponent(element:MainIndex) {
    return (
      <div className="selection_select">
        <input type="radio" className="radioInput" value={Number(element.code)} id={String(element.code)+1000} name="radioInputChoice" onClick={() => toggleOptionWindowParent(Number(element.code), String(element.code), "selection_box")}/>
        <p>{element.label.et}</p>
      </div>

    )
  }

  function secondaryChoiceComponent(el:DataSet, element:MainIndex) {
    return (
      <div key={el.code} id={String(el.code)} className="selection_select_child">
        <div style={{display:"flex",flexDirection:"row", alignItems:"center", marginLeft:"52px"}}>
          <input type="radio" className="radioInput" value={Number(element.code)} id={String(element.code)+2000} name="childRadioInputChoice" onClick={() => toggleOptionWindowChild(String(el.code), "selection_form")}/>
          <p>{el.code}</p>
        </div>
        <div>
          {childMenuSelection === String(el.code) &&
            <MenuSelectDimensionsComponent/>
          }
        </div>
      </div>
    )
  }
  
  return (
    <>
        <div ref={menuWindowRef} className='selection_menu' style={{left:menuWidth}}>
            <button onClick={toggleMenuWindow} className="selection_menu_button flex-c">O</button>
            <div className="selection_menu_section">
              <div className="selection_menu_logobox">
                <h2>Default text</h2>
                <div></div>
              </div>
              <div className="selection_menu_options">
                {mainIndexCollection.map((element) => 
                  <div key={Number(element.code)} className="selection_menu_options_child">
                    {mainChoiceComponent(element)}
                    <div className="selection_box" id={String(element.code)}>
                      {parentMenuSelection === Number(element.code) && 
                      
                        <div>

                          {element.datasets.map(el => 
                            secondaryChoiceComponent(el, element)
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