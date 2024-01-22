


/**
 * 
 */
class Unit {

    /**
     * @constructor
     * @param {Object} Objet - Objet from the Units.json file (One Unit)
     */
    constructor(Objet) {
        this._visibility = true
        this._id = Objet.id
        this._name = Objet.name
        this._rp = Objet.rp
        this._type = Objet.type
        this._offence = Objet.off
        this._defence = Objet.def
        this._range = Objet.ran
        this._vitality = Objet.vit
        this._act = Objet.act
        this._aow = Objet.aow
        this._box = Objet.box
        //this._talents = [Objet?.talent1,Objet?.talent2,Objet?.talent3]
        this._class = []
        Objet.class?.split(',').forEach((item) => this._class.push(item))
        this._talents = []
        if (typeof (Objet.talent1) !== 'undefined') { this.Talent = Objet.talent1 }
        if (typeof (Objet.talent2) !== 'undefined') { this.Talent = Objet.talent2 }
        if (typeof (Objet.talent3) !== 'undefined') { this.Talent = Objet.talent3 }
        //this._class = Objet.class
        this._power = []
        if (typeof (Objet.power1) !== 'undefined') {
            this.Power = { "name": Objet.power1, "type": Objet.pt1, "cost": Objet.pc1 }
        }
        if (typeof (Objet.power2) !== 'undefined') {
            this.Power = { "name": Objet.power2, "type": Objet.pt2, "cost": Objet.pc2 }
        }
        if (typeof (Objet.power3) !== 'undefined') {
            this.Power = { "name": Objet.power3, "type": Objet.pt3, "cost": Objet.pc3 }
        }
        const Cards = document.getElementById("Cards")
        Cards.appendChild (this._AddCard ())
    }

    /**
     *  @param {string} tal - One of talents of unit
     */
    set Talent(tal) { this._talents.push(tal); }
    /**
     * Set list power of unit 
     * @param {string} pow - One of powers of unit
     */
    set Power(pow) { this._power.push(pow); }

    /**
     * Set list power of unit 
     * @param {string} pow - One of powers of unit
     */
    set Visibility(BoolVal) {
        this._visibility = BoolVal
        if (this._visibility) {
            this._HTMLCard.classList.remove("unit-visible") 
        } else {
            this._HTMLCard.classList.add("unit-visible")
        }
    }

    get Visibility() {
        return this._visibility
    }

    get Type() {
        return this._type
    }

    _isTroop (){
        if (this._type === "Troops") { return true}  else {return false}
    }

    /**
     * Private Method to add a card
     * _AddCard : Add Html code for this Unit
     */
    _AddCard() {
        this._HTMLCard = this._CreateDivWithClass(["w3-col", "m6", "l4", "w3-round", "unit-" + this._type.toLowerCase()])
        // Add class list 
        this._HTMLCard.title = this._name
        this._HTMLCard.id = this._id
        // Add Image part 
            const ImagePart = this._CreateDivWithClass(["w3-col", "s6", "m6", "l6", "w3-display-container"])
            const ImageUnit = this._CreateImgWithClass(["unit-img", "w3-bar-item"], "./assets/images/" + this._id + ".png")
            ImagePart.appendChild(ImageUnit)
            if (this._act !== 0) ImagePart.appendChild(this._AddIco("act", this._act, "left"))
            ImagePart.appendChild(this._AddBox())
            if (this._aow !== 0) ImagePart.appendChild(this._AddIco("aow", this._aow, "right"))
            this._AddClass(ImagePart)

            ///this._AddName(ImagePart)

            this._HTMLCard.appendChild(ImagePart)

        // Add Info Part 
        const InfoPart = this._CreateDivWithClass(["w3-col", "s6", "m6", "l6", "w3-display-container"])
        if (this._isTroop()) {
            const ImgInfo = this._CreateImgWithClass(["unit-img"], "./assets/images/" + this._type + "_c.png")
            InfoPart.appendChild(ImgInfo)
            this._AddChar(InfoPart)
            
            InfoPart.appendChild(this._AddIco("vitality", this._vitality, "left")) 

        } else {
        // Add Name
        //InfoPart.append(this._AddName(this._id))
            this._AddName(InfoPart)
            // Add Talents 
            this._AddTalents(InfoPart)
            // Char
            this._AddChar(InfoPart)
            // Power
            this._AddPower(InfoPart)
        }
        this._HTMLCard.append(InfoPart)
        return(this._HTMLCard)

    }

    /**
     * 
     * @param {string[]} ClName 
     * @returns 
     */
    _CreateDivWithClass(ClName = []) {
        return this._CreateXXXWithClass("div", ClName)
    }

    /**
     * 
     * @param {string[]} ClName 
     * @returns 
     */
    _CreateSpanWithClass(ClName = []) {
        return this._CreateXXXWithClass("span", ClName)
    }


    /**
     * @param {htmltag} tag
     * @param {string[]} ClName 
     * @returns 
     */
    _CreateXXXWithClass(tag, ClName = []) {
        const HtmlElementTag = document.createElement(tag)
        ClName.forEach((element, index) => {
            HtmlElementTag.classList.add(element)
        })
        return HtmlElementTag
    }

    /**
     * 
     * @param {string[]} ClName 
     * @param {string} Source 
     * @returns 
     */
    _CreateImgWithClass(ClName = [], Source = "") {
        
        const HtmlElementImg = this._CreateXXXWithClass("img", ClName)
        HtmlElementImg.src = Source
        return HtmlElementImg
    }

    /**
     * Private _AddIco
     * Add ico AOW and activation Card
     * @param {string} ico 
     * @param {integer} nrb 
     * @returns element
     */
    _AddIco(ico, nbr, where) {
        //console.log (ico,nbr)
        const HTMLElementdiv = this._CreateDivWithClass(["w3-display-bottom" + where, "unit-" + ico])

        const img = this._CreateImgWithClass([], "./assets/images/" + ico + "_" + nbr + ".png")
        HTMLElementdiv.append(img)
        return HTMLElementdiv
    }

    

    /**
     * Private _AddBox
     * @returns 
     */
    _AddBox() {
        const HTMLElementdiv = this._CreateDivWithClass(["w3-display-bottommiddle", "unit-box"])
        const HTMLElementspan = this._CreateSpanWithClass()
        HTMLElementspan.append(this._box.toUpperCase())
        HTMLElementdiv.append(HTMLElementspan)
        return HTMLElementdiv
    }


    /**
     * Private _AddName
     * @param {id} id 
     * @returns element
     */
    _AddName(ParentEle) {
        const div = this._CreateDivWithClass(["w3-row", "unit-name"])
            const img = this._CreateImgWithClass([], "./assets/images/" + this._type + "_c.png")
            const span_name = document.createElement("span")
            const cl = this._name.length > 13 ? "name_large" : "name"
            span_name.classList.add(cl)
            span_name.textContent = this._name
            div.append(span_name)
            const span_rp = document.createElement("span")
            span_rp.classList.add("rp")
            span_rp.textContent = this._rp
            div.append(span_rp)
            div.append(img)
            //div.app

        ParentEle.append(div)
    }

    /**
     * Private _AddClass  
     * @param { HTMLElement} ParentEle 
     */
    _AddClass(ParentEle) {
        //console.log (this._class.lenght)
        this._class.forEach((element, index) => {
            const img = document.createElement("img")
            img.src = "./assets/images/" + element + ".png"
            img.classList.add("display-class-" + index)
            img.title = element
            ParentEle.append(img)
        })

    }

    /**
     * Private _AddChar 
     * @param {*} ParentEle 
     */
    _AddChar(ParentEle) {

       
        if (this._isTroop()) {
            Element = ParentEle             
        } else {
            // Add Background tabe
            const DivElement = this._CreateDivWithClass(["unit-car"])
            const img = this._CreateImgWithClass([],"./assets/images/table.png") 
            DivElement.appendChild(img) 

            const vit = this._CreateSpanWithClass(["display-car", "unit-vit"])
            vit.textContent = this._vitality
            DivElement.appendChild(vit)
            Element = DivElement

            ParentEle.appendChild(DivElement)
        }
        //offence
        const off = this._CreateSpanWithClass(["display-car", "unit-off"])
        off.textContent = this._offence
        Element.appendChild(off)
        //defence
        const def = this._CreateSpanWithClass(["display-car", "unit-def"])
        def.textContent = this._defence
        Element.appendChild(def)
        //range
        const ran =  this._CreateSpanWithClass(["display-car", "unit-ran"])
        ran.textContent = this._range
        Element.appendChild(ran)
        //move
        const mov = this._CreateSpanWithClass(["display-car", "unit-mov"])
        mov.textContent = this._range
        Element.appendChild(mov)
        //vitality


        //<span class="display-car unit-off">10</span>


        
    }

    /**
     * Private _AddPower
     * @param {*} ParentEle 
     */
    _AddPower(ParentEle) {
        const div = document.createElement("div")
        div.classList.add("unit-powers")
        this._power.forEach((obj, index) => {

            const divUP = this._CreateDivWithClass(["unit-power"])
            let color = index % 2 === 1 ? "white" : "black"
            const img = this._CreateImgWithClass(["unit-power-type"], "./assets/images/" + obj.type + "_" + color + ".png")
            img.title = obj.type
            divUP.appendChild(img)

            const span = document.createElement("span")
            const cl = obj.name.length > 18 ? "power-name-large" : "power-name"
            span.classList.add(cl)
            span.textContent = obj.name
            divUP.appendChild(span)
            for (let i = 0; i < obj.cost; i++) {
                const imgAOW = document.createElement("img")
                imgAOW.classList.add("unit-power-aow")
                imgAOW.src = "./assets/images/aow.png"
                divUP.appendChild(imgAOW)
            }
            div.appendChild(divUP)
        })
        ParentEle.appendChild(div)
    }


    /**
     * Private _AddTalents
     * @param { HTMLElement} ParentEle 
     */
    _AddTalents(ParentEle) {
        //console.log (tal)
        const div = document.createElement("div")
        div.classList.add("unit-talents")
        this._talents.forEach((el) => {
            const p = document.createElement("span")
            p.textContent = el
            p.className = "talent"
            div.appendChild(p)
        })
        ParentEle.appendChild(div)
    }

}


/**
 * Class manage all unit 
 * @class Units
 * @classdesc This is a description of the MyClass class.
 */

class Units {
    /* construtor */
    constructor() {
        this.CurentUnit = 1;
        this._list = {};
    }

    Add(obj) {
        this._list[obj._id] = obj
        //obj.AddCard()
    }

    /**
     * get List of unity
     */
    get ListUnits() {
        return this._list
    }

}




//fetch("https://raw.githubusercontent.com/Davonex/MythicBattlesRagnarok/main/asset/units.json")
fetch("http://127.0.0.1:5500/assets/units.json")
    .then(response => response.json())
    .then(response => CreateListe(response))
    .catch(error => console.log(error))


function CreateListe(units) {
    /**
     * Creation du select et de la list de unit 
     */

    for (const property in units) {
        if (
            units[property].name === "ANGRBODA" 
            //    || units[property].name === "BALDR"
            //    || units[property].name === "FRIGG"
            //    || units[property].name === "JORMUNGAND"

           // units[property].type === "Titans"
           // || units[property].type === "Gods"
           // || units[property].type === "Monsters"
            //|| units[property].type === "Heroes"
            //||
            || units[property].type === "Troops"
        ) {
            let obj = new Unit(units[property]);
            Rag.Add(obj);
            console.log (obj)
        }
    }
    console.log("Fetch load succed")
}

// const UnitLinks = document.querySelectorAll("div#type-select a").forEach(a => {
//     a.addEventListener('click', (e) => {

//         const Filter = e.currentTarget.getAttribute("unit")
//         //debugger
//         console.log (Filter)
//         for(let i in Rag.ListUnits){
//             //debugger
//             if (Rag.ListUnits[i].Type === Filter || Filter === "All") 
//                 {Rag.ListUnits[i].Visibility = true}
//             else { Rag.ListUnits[i].Visibility = false }
//         }
//     });

// })



document.querySelectorAll("#cb-unit-type input").forEach(input => {
    input.addEventListener('change', (e) => {
        filter = e.currentTarget.getAttribute("value")
        for(let i in Rag.ListUnits){
            //debugger
            if (Rag.ListUnits[i].Type === filter) { Rag.ListUnits[i].Visibility = e.currentTarget.checked}    
        }
        //console.log (e.currentTarget.getAttribute("value"))
        //var _val = e.is(':checked') ? 'checked' : 'unchecked';
        //debugger
        console.log(filter + " " + e.currentTarget.checked );


    })
})



//cb-unit-type
//})


// const UnitLinks = document.document.querySelectorAll('a.unit').forEach(a => {
//     a.addEventListener('click',(e)=>{
//         console.log(e.currentTarget.selectedIndex)
//         Rag.CurentUnit = e.currentTarget.selectedIndex
//         Rag.ShowCurrent ();
//     })
// })   



const Rag = new Units;