
/**
 * Removes display styling for all elements involved and then sets for a singular element using it's id value.
 * 
 * @param htmlElementId - Element id value.
 * @param htmlParentClass - Parent class name.
 */
export function toggleRadioInputWindow(htmlElementId: string, htmlParentClass:string) {
    const elementClass = document.querySelectorAll<HTMLElement>("." + htmlParentClass)
    const elementId = document.getElementById(htmlElementId)
    if (elementClass) {
      elementClass.forEach(el => el.style.display = "none")
      if (elementId) {
        elementId.style.display = "flex"
      } 
    }
  }

