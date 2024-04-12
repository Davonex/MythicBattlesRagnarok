/**
 * 
 * 
 */
class ObjetLists {
    constructor() {
        this._talents = [];
        this._type = []
        this._type[3] = {"name" : "Titans", "effect":"" }
        this._type[0] = {"name" : "Gods", "effect":"" }
        this._type[2] = {"name" : "Monsters", "effect":"" }
        this._type[1] = {"name" : "Heroes", "effect":"" }
        this._type[4] = {"name" : "Troops", "effect":"" }
        const FormType =  this._AddForm ("Type")
        this._CheckBox (FormType,this._type,"Type")
        //(this._type,"Type")
        this._filter=[]
    }  

    /**
     * 
     * @param {*} Obj 
     */
    AddAllTalents (Obj) {
        for (const property in Obj) {
            //console.log (Obj[property])
            this._talents[Obj[property].id] =  {
                 "name": Obj[property].nom,
                 "effect": Obj[property].effet    
            }
        }
        //console.log (this._list)
        const FormTalent = this._AddForm("Talent")
        this._Select (FormTalent,this._talents,"Talent")

    } 

    TalentName(id) { return this._talents[id].name 
    }

    TalentEffect(id) {return this._talents[id].effect
    }
    /**
     * 
     * @returns HtmlElement 
     */
    _AddForm (Tittle) {
        // id ="cb-unit-talent"
        const MenuBar = document.getElementById("menu-bar")

        const OneMenudiv = document.createElement("div")
            OneMenudiv.classList.add("w3-dropdown-hover")
            MenuBar.appendChild (OneMenudiv)

        const Button = document.createElement("div")
            Button.classList.add("w3-button")
            Button.textContent = Tittle
            OneMenudiv.appendChild (Button)
        //Button.id = MenuType
        const IconDown = document.createElement("i")
            IconDown.classList.add("fa","fa-caret-down")
            Button.appendChild (IconDown)

        const Form = document.createElement("form")
            Form.classList.add("w3-dropdown-content","w3-bar-block","w3-card-4")
            OneMenudiv.appendChild (Form)
        //"w3-dropdown-hover"
        //const Form = document.getElementById(MenuType)
        //this._CheckBox (Liste,Form,MenuType)
        return Form
    
    }


        /**
         * 
         * @param {*} HtmlForm 
         * @param {*} Liste 
         * @param {String} MenuType 
         */
    _CheckBox (HtmlForm,Liste,MenuType){
        // loop to add all element checkbox
        for (const id in Liste) {
            const HtmlDivButton = document.createElement("div")
                HtmlDivButton.classList.add("w3-button","bar-item")
                    const checkbox = document.createElement("input")
                    checkbox.type = "checkbox";
                    checkbox.value = Liste[id].name
                    checkbox.id = MenuType +"_"+id
                    checkbox.checked = true
                    HtmlDivButton.appendChild (checkbox)
                    const label = document.createElement("label")
                        const tn = document.createTextNode(Liste[id].name)
                        label.appendChild (tn)
                    label.htmlFor=MenuType +"_"+id
                    HtmlDivButton.appendChild (label)
                HtmlForm.appendChild (HtmlDivButton)  
            
            checkbox.addEventListener('change', (e) => {
                // console.log (
                //         e.currentTarget.getAttribute("value") + " : "
                //         + "\nField : " + e.currentTarget.id.split('_')[0]
                //         + "\nValue : "  +  e.currentTarget.id.split('_')[1]
                //         + "\n =>"  +  e.currentTarget.checked)   
                    const extract = e.currentTarget.id.split('_')
                   this._Changefilter (extract[0],extract[1],e.currentTarget.checked) 

            })
        }
    }

    _Select (HtmlForm,Liste,MenuType){
        for (const id in Liste) {
            const HtmlA = document.createElement("a") 
            HtmlA.classList.add("w3-bar-item","w3-button")
            HtmlA.textContent = Liste[id].name
            HtmlA.id = MenuType +"_"+id
            HtmlForm.appendChild (HtmlA) 
        }       
    }


    /**
     * 
     * @param {*} field 
     * @param {*} value 
     * @param {*} BoolVal 
     */
    _Changefilter (field,value,BoolVal){
        if (! BoolVal)  {
            // On doit cacher donc on ajoute le filtre
            this._filter.push ({"field":field , "value":value})
        } else {
        // on doit Effacer le liftre si il existe 
        this._filter.filter(function (rule,index,arr) {
                    if (rule.field == field && rule.value == value) 
                    {
                        arr.splice(index, 1);
                        return true; // on efface

                    }
                } );
        }
        this._Applyfilter ()
        //console.log ( this._filter)
    }
    /**
     * 
     */
    _Applyfilter ()
    {
        for(let IdUnit in Rag.ListUnits){
            let IsVisible = true
            for (let IdRule in this._filter) {
                if ( this._CheckRule (this._filter[IdRule],Rag.ListUnits[IdUnit]) )
                {
                    IsVisible = false
                    break
                }
            }

            Rag.ListUnits[IdUnit].Visibility = IsVisible
        } 
    }

    _CheckRule (OneRule,OneUnit)
    {
        const FunctionIs = "Is" + OneRule.field
        if ( OneUnit[FunctionIs](OneRule.value) )
          {
            return true
          }  else { return false }
    }


}


/**
 * 
 */
class Unit {

    /**
     * @constructor
     * @param {Object} Objet - Objet from the Units.json file (One Unit)
     */
    constructor(Objet) {
        this._id = Objet.id
        this._name = Objet.name
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
        //this._talents = [Objet?.talent1,Objet?.talent2,Objet?.talent3]
        this._class = []
        Objet.class?.split(',').forEach((item) => this._class.push(item))
        this._talents = []
            if (typeof (Objet.talent1) !== 'undefined') { this.Talent = Objet.idt1 }
            if (typeof (Objet.talent2) !== 'undefined') { this.Talent = Objet.idt2 }
            if (typeof (Objet.talent3) !== 'undefined') { this.Talent = Objet.idt3 }
        //this._class = Objet.class
        this._power = []
        if (typeof (Objet.power1) !== 'undefined') {
            this.Power = { "name": Objet.power1, "type": Objet.pt1, "cost": Objet.pc1,
            "effect": Objet.pe1 }
        }
        if (typeof (Objet.power2) !== 'undefined') {
            this.Power = { "name": Objet.power2, "type": Objet.pt2, "cost": Objet.pc2,
            "effect": Objet.pe2  }
        }
        if (typeof (Objet.power3) !== 'undefined') {
            this.Power = { "name": Objet.power3, "type": Objet.pt3, "cost": Objet.pc3,
            "effect": Objet.pe3  }
        }
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
        
        this._HTMLContainer = this._CreateDivWithClass(["w3-col", "m6", "l4" ,"unit-card"])
        this._HTMLCard = this._CreateDivWithClass(["units","unit-" + this._type.toLowerCase()])
        //this._HTMLCard = this._CreateDivWithClass(["w3-display-container","w3-round", "unit-" + this._type.toLowerCase()])
        this._HTMLContainer.appendChild (this._HTMLCard)

        this._HTMLCard.title = this._name,
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
            this._AddTroopName(ImagePart)
            const ImgInfo = this._CreateImgWithClass(["unit-img"], "./assets/images/" + this._type + "_c.png")
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
     * Private _AddTroopName
     * @param {HtmlElement}  
     * @returns element
     */
       _AddTroopName(ParentEle) {
        const DivContainerName = this._CreateDivWithClass([ "unit-troopname"])
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
        this._talents.forEach((id) => {
            const p = document.createElement("span")
            p.textContent = Lists.TalentName(id)
            p.className = "talent"
            p.title = Lists.TalentEffect(id)
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
        this._list = [];
    }

    Add(obj) {
        this._list[obj._id] = obj
    }

    /**
     * get List of unity
     */
    get ListUnits() {
        return this._list
    }

}






function CreateListe(units) {
    /**
     * Creation du select et de la list de unit 
     */

    for (const property in units) {
        if (
            true
            // units[property].name === "ANGRBODA" 
            //    || units[property].name === "BALDR"
            //    || units[property].name === "FRIGG"
            //    || units[property].name === "JORMUNGAND"

           // units[property].type === "Titans"
           // || units[property].type === "Gods"
           // || units[property].type === "Monsters"
            //|| units[property].type === "Heroes"
            //||
            // || units[property].type === "Troops"
        ) {
            let obj = new Unit(units[property]);
            Rag.Add(obj);
            console.info (obj)
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



// document.querySelectorAll("#cb-unit-type input").forEach(input => {
//     input.addEventListener('change', (e) => {
//         filter = e.currentTarget.getAttribute("value")
//         for(let i in Rag.ListUnits){
//             //debugger
//             if (Rag.ListUnits[i].Type === filter) { Rag.ListUnits[i].Visibility = e.currentTarget.checked}    
//         }
//         //console.log (e.currentTarget.getAttribute("value"))
//         //var _val = e.is(':checked') ? 'checked' : 'unchecked';
//         //debugger
//         console.log(filter + " " + e.currentTarget.checked );


//     })
// }) 






const Rag = new Units
const Lists = new ObjetLists



/*
** Method Async
*/
fetch("http://127.0.0.1:5500/assets/talents.json")
    .then(response => response.json())
    .then(response => Lists.AddAllTalents(response))
    .catch(error => console.log(error))

//fetch("https://raw.githubusercontent.com/Davonex/MythicBattlesRagnarok/main/asset/units.json")
fetch("http://127.0.0.1:5500/assets/units-fr.json")
    .then(response => response.json())
    .then(response => CreateListe(response))
    .catch(error => console.log(error))


