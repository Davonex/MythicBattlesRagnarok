


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
        Objet.class?.split(',').forEach ((item) => this._class.push(item) )
        this._talents = []
        if (typeof (Objet.talent1) !== 'undefined' ) { this.Talent = Objet.talent1}
        if (typeof (Objet.talent2) !== 'undefined' ) { this.Talent = Objet.talent2}
        if (typeof (Objet.talent3) !== 'undefined' ) { this.Talent = Objet.talent3}
        //this._class = Objet.class
        this._power =[]
        if (typeof (Objet.power1) !== 'undefined' ) { 
            this.Power = {"name":Objet.power1,"type":Objet.pt1,"cost":Objet.pc1} }
        if (typeof (Objet.power2) !== 'undefined' ) { 
            this.Power = {"name":Objet.power2,"type":Objet.pt2,"cost":Objet.pc2} }
        if (typeof (Objet.power3) !== 'undefined' ) { 
            this.Power = {"name":Objet.power3,"type":Objet.pt3,"cost":Objet.pc3} }        
    }
    
    /**
     *  @param {string} tal - One of talents of unit
     */
    set Talent(tal) { this._talents.push(tal);}
    /**
     * Set list power of unit 
     * @param {string} pow - One of powers of unit
     */
    set Power(pow) { this._power.push(pow);}

  
    /**
     * AddCard : Add Html code for this Unit
     */
    AddCard () {
        const Cards = document.getElementById ("Cards")

        this._HTMLCard =  this._CreateDivWithClass(["w3-col","m6","l4","w3-round","unit-"+this._type.toLowerCase()])
        // Add class list 
        this._HTMLCard.title = this._name
        this._HTMLCard.id = this._id
        // Add Image part 
            const ImagePart =  this._CreateDivWithClass(["w3-col","s6","m6","l6","w3-display-container"])
            const ImageUnit = this._CreateImgWithClass(["unit-img","w3-bar-item"],"./assets/images/" + this._id + ".png")
            ImagePart.appendChild(ImageUnit)
            if (this._act !== 0) ImagePart.appendChild(this._AddIco("act",this._act,"left"))
            ImagePart.appendChild(this._AddBox())
            if (this._aow !== 0) ImagePart.appendChild(this._AddIco("aow",this._aow,"right"))
            this._AddClass (ImagePart)
            this._HTMLCard.appendChild(ImagePart) 
            
        // Add Info Part 
            const InfoPart =  this._CreateDivWithClass(["w3-col","s6","m6","l6","w3-display-container"])
            // Add Name
            //InfoPart.append(this._AddName(this._id))
            this._AddName (InfoPart)
            this._HTMLCard.append(InfoPart)
            // Add Talents 
            this._AddTalents (InfoPart)
            // Char
            this._AddChar (InfoPart)
            // Power
            this._AddPower (InfoPart)
        Cards.appendChild(this._HTMLCard)

    }

    /**
     * 
     * @param {string[]} ClName 
     * @returns 
     */
    _CreateDivWithClass(ClName = []) {
        return this._CreateXXXWithClass ("div",ClName)
    }

        /**
     * 
     * @param {string[]} ClName 
     * @returns 
     */
        _CreateSpanWithClass(ClName = []) {
            return this._CreateXXXWithClass ("span",ClName)
        }


    /**
     * @param {htmltag} tag
     * @param {string[]} ClName 
     * @returns 
     */
    _CreateXXXWithClass(tag,ClName = []) {
        const HtmlElementTag = document.createElement(tag)
        ClName.forEach((element,index) => {
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
    _CreateImgWithClass(ClName = [],Source = "") {
        const HtmlElementImg = document.createElement("img")
        ClName.forEach((element,index) => {
            HtmlElementImg.classList.add(element)
        })
        HtmlElementImg.src = Source
        return HtmlElementImg
    }

    /**
     * Private Add Ico AOW and activation Card
     * @param {string} ico 
     * @param {integer} nrb 
     * @returns element
     */
    _AddIco (ico,nbr,where){
        //console.log (ico,nbr)
        const HTMLElementdiv = this._CreateDivWithClass(["w3-display-bottom"+where,"unit-" + ico])
        const img = this._CreateImgWithClass([],"./assets/images/" + ico + "_" + nbr + ".png")
        HTMLElementdiv.append(img)
        return HTMLElementdiv
    }

    /**
     * 
     * @returns 
     */
    _AddBox() {
        const HTMLElementdiv = this._CreateDivWithClass(["w3-display-bottommiddle","unit-box"])
        const HTMLElementspan = this._CreateSpanWithClass()
        HTMLElementspan.append(this._box.toUpperCase())
        HTMLElementdiv.append(HTMLElementspan)
        return HTMLElementdiv
    }
    
    
    /**
     * Private add  name
     * @param {id} id 
     * @returns element
     */
    _AddName (ParentEle) {
        const div = this._CreateDivWithClass(["w3-row","unit-name"])
        const img = this._CreateImgWithClass([],"./assets/images/"+ this._type +"_c.png")
            const span_name = document.createElement("span")
            const cl  = this._name.length > 13 ? "name_large" : "name"
            span_name.classList.add(cl)
            span_name.textContent = this._name
            div.append(span_name)
            const span_rp = document.createElement("span")
            span_rp.classList.add("rp")
            span_rp.textContent = this._rp
            div.append(span_rp)
        div.append(img)
        //div.append(div_txt)
        ParentEle.append(div)
    }

    /**
     * _AddClass  
     * @param { HTMLElement} ParentEle 
     */
    _AddClass (ParentEle) {
        //console.log (this._class.lenght)
        this._class.forEach((element,index) => {
            const img = document.createElement("img")    
            img.src = "./assets/images/" + element + ".png"
            img.classList.add("display-class-"+index)
            img.title = element
            ParentEle.append(img)         
        })

    }


    _AddChar (ParentEle)
    {
        const div = document.createElement("div") 
        div.classList.add("unit-car")
        // Add Background tabe
            const img = document.createElement("img")
            img.src = "./assets/images/table.png"  
            //img.src = "./assets/images/table_car.png"  
            div.appendChild(img)  
                //offence
                const off = document.createElement("span")
                off.classList.add("display-car","unit-off")
                off.textContent = this._offence
                div.appendChild(off)
                //defence
                const def = document.createElement("span")
                def.classList.add("display-car","unit-def")
                def.textContent = this._defence
                div.appendChild(def)
                 //range
                 const ran = document.createElement("span")
                 ran.classList.add("display-car","unit-ran")
                 ran.textContent = this._range
                 div.appendChild(ran)
                //move
                const mov = document.createElement("span")
                mov.classList.add("display-car","unit-mov")
                mov.textContent = this._range
                div.appendChild(mov)
                //vitality
                const vit = document.createElement("span")
                vit.classList.add("display-car","unit-vit")
                vit.textContent = this._vitality
                div.appendChild(vit)                
            //<span class="display-car unit-off">10</span>
        ParentEle.appendChild(div)
    }

    _AddPower (ParentEle){
        const div = document.createElement("div") 
        div.classList.add("unit-powers")   
        this._power.forEach((obj,index) => {

            const divUP = this._CreateDivWithClass(["unit-power"])
            let color = index % 2 === 1 ? "white" : "black"
            const img = this._CreateImgWithClass(["unit-power-type"],"./assets/images/" + obj.type + "_" + color +".png")
            img.title = obj.type
            divUP.appendChild(img) 

            const span = document.createElement("span")
                const cl  = obj.name.length > 18 ? "power-name-large" : "power-name"
                span.classList.add (cl)
                span.textContent = obj.name
                divUP.appendChild(span) 
            for (let i = 0; i < obj.cost ; i++) {
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
     * 
     * @param { HTMLElement} ParentEle 
     */
    _AddTalents (ParentEle)
    {
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




class Units {
    /* construtor */
    constructor () {
        this.CurentUnit = 1;
        this._list = {}; 
    }  

    Add (obj) {
        this._list[obj._id] = obj
        //this.AddMenu(obj)
        // if ( 
        //      obj._type === "Titans" 
        //      || obj._type === "Gods" 
        //      || obj._type === "Monsters" 
        //      ||  obj._type === "Heroes"
        //     ) {
            obj.AddCard () 
            console.log ("add obj", obj)
        // }
        // console.log ("add obj", obj)
    }
    
}




//fetch("https://raw.githubusercontent.com/Davonex/MythicBattlesRagnarok/main/asset/units.json")
fetch("http://127.0.0.1:5500/assets/units.json")
    .then(response => response.json())
    .then(response => CreateListe(response))
    .catch(error => console.log(error))


function CreateListe (units) {
    /**
     * Creation du select et de la list de unit 
     */
    
    for (const property in units) { 
        if ( 
        //    units[property].name === "ANGRBODA" 
        //    || units[property].name === "BALDR"
        //    || units[property].name === "FRIGG"
        //    || units[property].name === "JORMUNGAND"
           
                units[property].type === "Titans" 
                || units[property].type === "Gods" 
                || units[property].type === "Monsters" 
                ||  units[property].type === "Heroes"
           ) {           
                let obj = new Unit(units[property]);
                Rag.Add(obj);
           }
    }
    console.log("Fetch load succed")
}

const UnitLinks = document.querySelectorAll("div#type-select a").forEach(a => {
    a.addEventListener('click',(e)=>{
            console.log (e.currentTarget)
            //this.CurentUnit = PointerEvent.currentTarget.attributes["value"].value
            //console.log (PointerEvent.currentTarget.attributes["value"].value)
            //this.ShowCurrent ()
        })
})


// const UnitLinks = document.document.querySelectorAll('a.unit').forEach(a => {
//     a.addEventListener('click',(e)=>{
//         console.log(e.currentTarget.selectedIndex)
//         Rag.CurentUnit = e.currentTarget.selectedIndex
//         Rag.ShowCurrent ();
//     })
// })   



const Rag = new Units;