import { useDataSetContext } from "../../store/DataContext"
import { LabelSpecifier } from "../../utils/menu/MenuTypes"


function MenuSelectColors() {
    const {colorscheme, data} = useDataSetContext()

    function filterColorRange(index:number, data:LabelSpecifier): string {
        const arr = Object.values(data)
        const max = arr.sort(function(a,b){return a-b}).reverse()
        if (max.length === 15) {
            if (index === 0) return `${max[2]} - ${max[0]}` 
            else if (index === 1) return `${max[5]} - ${max[3]}`
            else if (index === 2) return `${max[8]} - ${max[6]}` 
            else if (index === 3) return `${max[11]} - ${max[9]}` 
            else if (index === 4) return `${max[14]} - ${max[12]}`
            else return "Missing"
        }
        else return "Error"
    }
  
    return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"flex-end", height:"300px"}}>
        {colorscheme.map((col, idx) => 
            <div key={col} style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"flex-start", width:"300px"}}>
                <div style={{backgroundColor:col, width:"40px", height:"30px"}}></div>
                <p style={{width:"auto", textAlign:"left", marginLeft:"10px", fontSize:"14px"}}>{filterColorRange(idx, data)}</p>
            </div>
        )}
    </div>
  )
}

export default MenuSelectColors