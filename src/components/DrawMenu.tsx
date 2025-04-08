import { useRef, useState} from "react"

function Menu() {
  const menuWindowRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<"350px" | "0px">("350px")

  const toggleMenuWindow = () => {
    if (menuWindowRef.current?.className === "selection_menu") {
      if (width === "350px") {
        menuWindowRef.current.style.animationName = "menu-animation-close"
        setWidth("0px")
      } else {
        menuWindowRef.current.style.animationName = "menu-animation-open"
        setWidth("350px")

      }
    }
  }

  return (
    <>
        <div ref={menuWindowRef} className='selection_menu' style={{width:width}}>
            <button onClick={() => toggleMenuWindow()} className="selection_menu_button flex-c">O</button>
        </div>
    </>
  )
}

export default Menu