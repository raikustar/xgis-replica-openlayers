import { useRef, useState} from "react"

function Menu() {
  const menuWindowRef = useRef<HTMLDivElement>(null)
  const [menuWidth, setMenuWidth] = useState<"0px" | "-350px">("0px")

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

  return (
    <>
        <div ref={menuWindowRef} className='selection_menu' style={{left:menuWidth}}>
            <button onClick={() => toggleMenuWindow()} className="selection_menu_button flex-c">O</button>
            <div className="selection_menu_fields">

            </div>
        </div>
    </>
  )
}

export default Menu