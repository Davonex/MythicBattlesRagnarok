import  * as Elements from './elements.js'

/**
 * 
 */
class Unit {

    /**
     * @constructor
     * @param {Object} Objet - Objet from the Units.json file (One Unit)
     */
    constructor(Objet,Lists) {
        this._lists = Lists
        this._id = Objet.id
        this._name = Objet.namefr
        this._rp = Objet.rp
        this._idtype = Objet.idtype
        this._type = Objet.type
        this._offence = Objet.off
        this._defence = Objet.def
        this._range = Objet.ran
        this._vitality = Objet.vit
        this._act = Objet.act
        this._aow = Objet.aow
        this._box = Objet.box
        this._class = []
        Objet.class?.split(',').forEach((item) => this._class.push(item))
        this._talents = []
            if (typeof (Objet.talent1) !== 'undefined') { this.Talent = Objet.idt1 }
            if (typeof (Objet.talent2) !== 'undefined') { this.Talent = Objet.idt2 }
            if (typeof (Objet.talent3) !== 'undefined') { this.Talent = Objet.idt3 }
        //this._class = Objet.class
        this._powers = []
            if (typeof (Objet.idpower1) !== 'undefined') {this._powers.push(Objet.idpower1) }
            if (typeof (Objet.idpower2) !== 'undefined') {this._powers.push(Objet.idpower2) }
            if (typeof (Objet.idpower3) !== 'undefined') {this._powers.push(Objet.idpower3) }

        const Cards = document.getElementById("Cards")
        Cards.appendChild (this._AddCard ())
        /// Manage filter
        //this._filter = {} 
        //this.Visibility = document.getElementById("cb-"+this._type.toLowerCase()).checked
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
            this._HTMLContainer.classList.remove("unit-visible") 
        } else {
            this._HTMLContainer.classList.add("unit-visible")
        }
    }

    get Visibility() {
        return this._visibility
    }

    get Type() {return this._type}
    get Name() {return this._name}

    /**
     * 
     * @param {*} IdTalent 
     * @returns 
     */
    IsTalent ( IdTalent) {
        if (this._talents.find((El) => El ==  IdTalent) == IdTalent)
        { return true}
        else
         {return false}
    }
    /**
     * 
     * @param {*} IdType 
     * @returns 
     */
    IsType (IdType) {
       return (this._idtype == IdType)
    }

    /**
     * 
     * @returns {boolean}
     */
    _isTroop (){
        if (this._type === "Troops") { return true}  else {return false}
    }

    /**
     * Private Method to add a card
     * _AddCard : Add Html code for this Unit
     */
    _AddCard() {
        
        this._HTMLContainer = Elements.CreateDivWithClass(["w3-col", "m6", "l4" ,"unit-card"])
        this._HTMLCard = Elements.CreateDivWithClass(["units","unit-" + this._type.toLowerCase()])
        //this._HTMLCard = Elements.CreateDivWithClass(["w3-display-container","w3-round", "unit-" + this._type.toLowerCase()])
        this._HTMLContainer.appendChild (this._HTMLCard)

        this._HTMLCard.title = this._name,
        this._HTMLCard.id = this._id
        // Add Image part 
            const ImagePart = Elements.CreateDivWithClass(["w3-col", "s6", "m6", "l6", "w3-display-container"])
            const ImageUnit = Elements.CreateImgWithClass(["unit-img", "w3-bar-item"], "./assets/images/" + this._id + ".png")
            ImagePart.appendChild(ImageUnit)
            if (this._act !== 0) ImagePart.appendChild(this._AddIco("act", this._act, "left"))
            ImagePart.appendChild(this._AddBox())
            if (this._aow !== 0) ImagePart.appendChild(this._AddIco("aow", this._aow, "right"))
            this._AddClass(ImagePart)

            ///this._AddName(ImagePart)

            this._HTMLCard.appendChild(ImagePart)

        // Add Info Part 
        const InfoPart = Elements.CreateDivWithClass(["w3-col", "s6", "m6", "l6", "w3-display-container"])
        if (this._isTroop()) {
            this._AddTroopName(ImagePart)
            const ImgInfo = Elements.CreateImgWithClass(["unit-img"], "./assets/images/" + this._type + "_c.png")
            InfoPart.appendChild(ImgInfo)

            InfoPart.appendChild(this._AddIco("vitality", this._vitality, "left")) 

            this._AddChar(InfoPart)


        } else {
        // Add Name
        //InfoPart.append(this._AddName(this._id))
            this._AddName(InfoPart)
            // Add Talents 
            this._AddTalents(InfoPart)
            // Add char
            this._AddChar(InfoPart)
            // Power
            this._AddPower(InfoPart)
        }
        // Char
        

        this._HTMLCard.append(InfoPart)
        //return(this._HTMLCard)
        return (this._HTMLContainer)
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
        const HTMLElementdiv = Elements.CreateDivWithClass(["w3-display-bottom" + where, "unit-" + ico])

        const img = Elements.CreateImgWithClass([], "./assets/images/" + ico + "_" + nbr + ".png")
        HTMLElementdiv.append(img)
        return HTMLElementdiv
    }

    

    /**
     * Private _AddBox
     * @returns 
     */
    _AddBox() {
        const HTMLElementdiv = Elements.CreateDivWithClass(["w3-display-bottommiddle", "unit-box"])
        const HTMLElementspan = Elements.CreateSpanWithClass()
        HTMLElementspan.append(this._box.toUpperCase())
        HTMLElementdiv.append(HTMLElementspan)
        return HTMLElementdiv
    }

       /**
     * Private _AddTroopName
     * @param {HtmlElement}  
     * @returns element
     */
       _AddTroopName(ParentEle) {
        const DivContainerName = Elements.CreateDivWithClass([ "unit-troopname"])
            const span_name = document.createElement("span")
            const cl = this._name.length > 13 ? "name_large" : "name"
            span_name.classList.add(cl)
            span_name.textContent = this._name
            DivContainerName.append(span_name)
        ParentEle.append(DivContainerName)
       }


    /**
     * Private _AddName
     * @param {id} id 
     * @returns element
     */
    _AddName(ParentEle) {
        const div = Elements.CreateDivWithClass(["w3-row", "unit-name"])
            const img = Elements.CreateImgWithClass([], "./assets/images/" + this._type + "_c.png")
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
            const DivElement = Elements.CreateDivWithClass(["unit-car"])
            const img = Elements.CreateImgWithClass([],"./assets/images/table.png") 
            DivElement.appendChild(img) 

            const vit = Elements.CreateSpanWithClass(["display-car", "unit-vit"])
            vit.textContent = this._vitality
            DivElement.appendChild(vit)
            Element = DivElement

            ParentEle.appendChild(DivElement)
        }
        //offence
        const off = Elements.CreateSpanWithClass(["display-car", "unit-off"])
        off.textContent = this._offence
        Element.appendChild(off)
        //defence
        const def = Elements.CreateSpanWithClass(["display-car", "unit-def"])
        def.textContent = this._defence
        Element.appendChild(def)
        //range
        const ran =  Elements.CreateSpanWithClass(["display-car", "unit-ran"])
        ran.textContent = this._range
        Element.appendChild(ran)
        //move
        const mov = Elements.CreateSpanWithClass(["display-car", "unit-mov"])
        mov.textContent = this._range
        Element.appendChild(mov)  
    }

    /**
     * Private _AddPower
     * @param {*} ParentEle 
     */
    _AddTroopPower(ParentEle) {
        const div = document.createElement("div")
        div.classList.add("unit-trooppowers")   

        ParentEle.appendChild(div)
    }
    /**
     * Private _AddPower
     * @param {*} ParentEle 
     */
    _AddPower(ParentEle) {
        
        const div = document.createElement("div")
        div.classList.add("unit-powers")
        //console.log (this._powers)
        
        this._powers.forEach((id, index) => {
            const divUP = Elements.CreateDivWithClass(["unit-power"])
            let color = index % 2 === 1 ? "white" : "black"
            const img = Elements.CreateImgWithClass(["unit-power-type"], "./assets/images/" + this._lists.PowerType(id) + "_" + color + ".png")
            img.title = this._lists.PowerType(id)
            divUP.appendChild(img)
            
            const span = document.createElement("span")
            const cl = this._lists.PowerName(id).length > 18 ? "power-name-large" : "power-name"
            span.classList.add(cl)
            span.textContent = this._lists.PowerName(id)
            span.title = this._lists.PowerEffect(id)
            divUP.appendChild(span)
            
            for (let i = 0; i < this._lists.PowerCost(id); i++) {
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
        this._talents.forEach((id) => {
            const p = document.createElement("span")
            p.textContent = this._lists.TalentName(id)
            p.className = "talent"
            p.title = this._lists.TalentEffect(id)
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

export class ObjetUnits {
    /* construtor */
    constructor(Lists) {
        this.CurentUnit = 1
        this._listUnits = []
        this._lists = Lists
        this._filter=[]
    }

    Add(Pro) {
        //this._list[obj._id] = obj
        Pro.then ((units)=>{
            for (const property in units) {
                if (
                    true
                    // units[property].name === "ANGRBODA" 
                ) 
                {
                    let obj = new Unit(units[property],this._lists);
                    // Rag.Add(obj);
                    this._listUnits[obj._id] = obj
                    console.info (obj)
                }
                
            }
            console.log ("Units : Fini")
        })
        .catch(error => console.log(error))
    }

    /**
     * get List of unity
     */
    get ListUnits() {
        return this._listUnits
    }

     /**
     * 
     * @param {*} Type 
     * @param {*} Value 
     */
     AddFilter (Type,Value){
        this._filter.push ({"type":Type , "value":Value}) 
        console.log ("Add" +  this._filter)
     }
    /**
     *  
     * */ 
    RemoveFilter (Type,Value) {
        // on doit Effacer le liftre si il existe 
        this._filter.filter(function (rule,index,arr) {
                    if (rule.type == Type && rule.value == Value) 
                    {
                        arr.splice(index, 1);
                        return true; // on efface

                    }
                } );
        }
    //    console.log ( this._filter)
    Filter() { return this._filter}

}
