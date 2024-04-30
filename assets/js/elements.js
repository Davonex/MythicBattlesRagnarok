/**
     * 
     * @param {string[]} ClName 
     * @returns 
     */
export function CreateDivWithClass(ClName = []) {
    return _CreateXXXWithClass("div", ClName)
}

/**
 * 
 * @param {string[]} ClName 
 * @returns 
 */
export function CreateSpanWithClass(ClName = []) {
    return _CreateXXXWithClass("span", ClName)
}

/**
 * 
 * @param {string[]} ClName 
 * @returns 
 */
export function CreateItalicWithClass(ClName = []) {
    return _CreateXXXWithClass("i", ClName)
}


/**
 * 
 * @param {string[]} ClName 
 * @param {string} Source 
 * @returns 
 */
export function CreateImgWithClass(ClName = [], Source = "") {
    
    const HtmlElementImg = _CreateXXXWithClass("img", ClName)
    HtmlElementImg.src = Source
    return HtmlElementImg
}


/**
 * @param {htmltag} tag
 * @param {string[]} ClName 
 * @returns 
 */
function _CreateXXXWithClass(tag, ClName = []) {
    const HtmlElementTag = document.createElement(tag)
    ClName.forEach((element, index) => {
        HtmlElementTag.classList.add(element)
    })
    return HtmlElementTag
}