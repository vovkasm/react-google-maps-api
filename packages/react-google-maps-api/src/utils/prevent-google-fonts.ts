// Preventing the Google Maps libary from downloading an extra font
export const preventGoogleFonts = () => {
  const isRobotoStyle = (element: HTMLElement) => {
    // roboto font download
    if (
      (element as HTMLLinkElement).href &&
      (element as HTMLLinkElement).href.indexOf(
        "https://fonts.googleapis.com/css?family=Roboto"
      ) === 0
    ) {
      return true
    }
    // roboto style elements
    if (
      element.tagName.toLowerCase() === "style" &&
      // @ts-ignore
      element.styleSheet &&
      // @ts-ignore
      element.styleSheet.cssText &&
      // @ts-ignore
      element.styleSheet.cssText.replace("\r\n", "").indexOf(".gm-style") === 0
    ) {
      // @ts-ignore
      element.styleSheet.cssText = ""
      return true
    }
    // roboto style elements for other browsers
    if (
      element.tagName.toLowerCase() === "style" &&
      element.innerHTML &&
      element.innerHTML.replace("\r\n", "").indexOf(".gm-style") === 0
    ) {
      element.innerHTML = ""
      return true
    }
    // when google tries to add empty style
    if (
      element.tagName.toLowerCase() === "style" &&
      // @ts-ignore
      !element.styleSheet &&
      !element.innerHTML
    ) {
      return true
    }

    return false
  }

  // we override these methods only for one particular head element
  // default methods for other elements are not affected
  const head = document.getElementsByTagName("head")[0]

  const insertBefore = head.insertBefore

  // TODO: adding return before reflect solves the TS issue
  //@ts-ignore
  head.insertBefore = (
    newElement: HTMLElement,
    referenceElement: HTMLElement
  ): void => {
    if (!isRobotoStyle(newElement)) {
      Reflect.apply(insertBefore, head, [newElement, referenceElement])
    }
  }

  const appendChild = head.appendChild

  // TODO: adding return before reflect solves the TS issue
  //@ts-ignore
  head.appendChild = (textNode: HTMLElement): void => {
    if (!isRobotoStyle(textNode)) {
      Reflect.apply(appendChild, head, [textNode])
    }
  }
}
