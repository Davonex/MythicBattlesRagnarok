


/**
 * 
 */
class Unit {

	/* Construcotr */
    constructor(Id,Name,RecruitementPoint,Type,Offence,Defence,Range,Vitality) {
    this._id = Id
    this._name = Name
    this._rp = RecruitementPoint
    this._type = Type
    this._offence = Offence
    this._defence = Defence
    this._range = Range
    this._vitality = Vitality
    this._talents = []
    this._class = []
    this._power =[]
    this._act = 0
    this._aow = 0
	}

    // Set List Class
    set Class(cl) { this._class.push(cl);}

    // Set list talents of unit 
    set Talent(tal) { this._talents.push(tal);}

    // Set list power of unit 
    set Power(pow) { this._power.push(pow);}

    // Set # activation card
    set Activation(value) { this._act = value}

    // Set # activation card
    set ArtOfWar(value) { this._aow = value}

    /**
     * AddCard : Add Html code for this Unit
     */
    AddCard () {
        const Cards = document.getElementById ("Cards")
        const OneCard = document.createElement("div")
        // Add class list 
        OneCard.classList.add("w3-col","m6","l4","w3-round","unit-"+this._type.toLowerCase())
        OneCard.title = this._name
        OneCard.id = this._id
        // Add Image part 
            const ImagePart = document.createElement("div")
            ImagePart.classList.add("w3-col","s6","m6","l6","w3-display-container")
                const ImageUnit = document.createElement("img")
                ImageUnit.classList.add("unit-img","w3-bar-item")
                ImageUnit.src = "./assets/images/" + this._id + ".png"
            ImagePart.append(ImageUnit)
            if (this._act !== 0) ImagePart.append(this._AddIco("act",this._act,"left"))
            if (this._aow !== 0) ImagePart.append(this._AddIco("aow",this._aow,"right"))
            //<img id="unit-img" class="unit-img w3-bar-item" style="width:100%">
            // Add Class
            this._AddClass (ImagePart)

            OneCard.append(ImagePart) 
            
        // Add Info Part 
            const InfoPart = document.createElement("div")
            InfoPart.classList.add("w3-col","s6","m6","l6","w3-display-container")
            // Add Name
            InfoPart.append(this._AddName(this._id))
            OneCard.append(InfoPart)
            // Add Talents 
            this._AddTalents (InfoPart)
            // Char
            this._AddChar (InfoPart)
            // Power
            this._AddPower (InfoPart)
        Cards.appendChild(OneCard)

    }


    /**
     * Private Add Ico AOW and activation Card
     * @param {string} ico 
     * @param {integer} nrb 
     * @returns element
     */
    _AddIco (ico,nbr,where){
        //console.log (ico,nbr)
        const div = document.createElement("div")
        div.classList.add("w3-display-bottom"+where,"unit-" + ico)
        const img = document.createElement("img")
        img.src = "./assets/images/" + ico + "_" + nbr + ".png"
        div.append(img)
        return div
    }

    /**
     * Private add img name
     * @param {id unit} id 
     * @returns element
     */
    _AddName (id) {
        const div = document.createElement("div")
        div.classList.add("w3-row","unit-name")
        const img = document.createElement("img")
            //img.src = "./assets/images/" + id + "_c.png"
            img.src = "./assets/images/"+ this._type +"_c.png"
            //const div_txt = document.createElement("div")
           // div_txt.classList.add ("unit-name-txt")
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
        return div
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
            const divUP = document.createElement("div")  
                divUP.classList.add("unit-power")
            const img = document.createElement("img")
                let color = "black"
                if ( index % 2 === 1) color = "white"
                img.src = "./assets/images/" + obj.type + "_" + color +".png"  
                img.classList.add("unit-power-type")
                img.title = obj.type
                divUP.appendChild(img) 
            const span = document.createElement("span")
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
        if ( 
             obj._type === "Titans" 
             || obj._type === "Gods" 
             || obj._type === "Monsters" 
             ||  obj._type === "Heroes"
            ) {
            obj.AddCard () 
            console.log ("add obj", obj)
        }
        // console.log ("add obj", obj)
    }
    /**
     * 
     */
    ShowCurrent (){
        this._list[this.CurentUnit].Show ();
        console.log (this._list[this.CurentUnit]); 

    }
    /**
     * 
     * @param {*} obj 
     * @param {*} target 
     */
    // AddMenu (obj) {
    //     const sel = document.getElementById(obj._type + "-select")
    //     const opt = document.createElement("a")
    //     sel.appendChild(opt);
    //          opt.setAttribute("value", obj._id); 
    //          opt.text = obj._name
    //          opt.href = "#" + obj._name
    //          opt.className = "w3-bar-item w3-button unit"
    //     opt.addEventListener('click',(PointerEvent)=>{
    //         //console.log (PointerEvent)
    //         this.CurentUnit = PointerEvent.currentTarget.attributes["value"].value
    //         //console.log (PointerEvent.currentTarget.attributes["value"].value)
    //         this.ShowCurrent ()
    //     })
    // }
}




fetch("https://raw.githubusercontent.com/Davonex/MythicBattlesRagnarok/main/asset/units.json")
    .then(response => response.json())
    .then(response => CreateListe(response))
    .catch(error => console.log(error))


function CreateListe (units) {
    /**
     * Creation du select et de la list de unit 
     */
    
    for (const property in units) {
        // Create Obj Unit
        let obj = new Unit(
            units[property].id,
            units[property].name,
            units[property].pr,
            units[property].type,
            units[property].off,
            units[property].def,
            units[property].ran,
            units[property].vit
        )
        if (typeof (units[property].talent1) !== 'undefined' ) { obj.Talent = units[property].talent1}
        if (typeof (units[property].talent2) !== 'undefined' ) { obj.Talent = units[property].talent2}
        if (typeof (units[property].talent3) !== 'undefined' ) { obj.Talent = units[property].talent3}
        obj.Activation = units[property].act
        obj.ArtOfWar = units[property].aow
        //console.log (units[property].class)
        if (typeof (units[property].class) !== 'undefined' ) {
            units[property].class.split(',').forEach ((item) => obj.Class = item )
        }
        if (typeof (units[property].power1) !== 'undefined' ) { 
            obj.Power = {"name":units[property].power1,"type":units[property].pt1,"cost":units[property].pc1} }
        if (typeof (units[property].power2) !== 'undefined' ) { 
            obj.Power = {"name":units[property].power2,"type":units[property].pt2,"cost":units[property].pc2} }
        if (typeof (units[property].power3) !== 'undefined' ) { 
            obj.Power = {"name":units[property].power3,"type":units[property].pt3,"cost":units[property].pc3} } 
        Rag.Add(obj);
      }
      
      //Rag.ShowCurrent()
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