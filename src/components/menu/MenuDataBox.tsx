
/**
 * Contains static data about where I took the actual data used in this small project.
 * 
 * Also shows the website I'm using as a guide.
 * 
 * @returns A div with child members.
 */
function MenuDataBox() {
  return (
    <>
        <div className="selection_menu_databox_datadiv">
            <p>Trying to recreate XGIS website - </p>
            <a href="https://xgis.maaamet.ee/xgis2/page/app/statistika" target="_blank">XGIS Maa-amet Website</a>
            </div>
            <div className="selection_menu_databox_datadiv">
            <p>County data gathered from Maaamet - </p>
            <a href="https://geoportaal.maaamet.ee/eng/spatial-data/administrative-and-settlement-division-p312.html" target="_blank">Maa-amet County Data Source</a>
            </div>
            <div className="selection_menu_databox_datadiv">
            <p>Geojson data gathered from Maaamet - </p>
            <a href="https://www.maaamet.ee/kinnisvara/htraru/Start.aspx" target="_blank">Maa-amet Data for GeoJSON files</a>
        </div>
    </>
  )
}

export default MenuDataBox