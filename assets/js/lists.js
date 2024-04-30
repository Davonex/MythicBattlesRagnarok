/**
 *  Liste des Talents et Pouvoires
 * 
 */
export class ObjetLists {
    constructor() {
        this._talents = []
        this._powers = []
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
        this._powerload=false
    }  


    get Talents() {return this._talents }
    get PowerLoad () {return this._powerload}

    /**
     * 
     * @param {*} Obj 
     */
    AddTalents (Pro) {
        //console.log (Pro)
        Pro.then ((Obj)=>{
            for (const property in Obj) {
                //console.log (Obj[property])
                this._talents[Obj[property].id] =  {
                     "name": Obj[property].nom,
                     "effect": Obj[property].effet    
                }
            }
            console.log ("Talents : Fini")
        })
        .catch(error => console.log(error))

        
        //const FormTalent = this._AddForm("Talent")
        //this._Select (FormTalent,this._talents,"Talent")
        return this
    } 

    /**
     * 
     * @param {*} Obj 
     */
    AddPowers (Pro) {
        Pro.then ((Obj)=>{
            for (const property in Obj) {
                // console.log (Obj[property])
                this._powers[Obj[property].id] =  {
                    "name": Obj[property].namefr,
                    "effect": Obj[property].effectfr,    
                    "type": Obj[property].type,
                    "cost": Obj[property].cost,    
                    "token": Obj[property].token
                    
                }
            }
            console.log ("Powers : Fini")
            this._powerload=true
        })
        .catch(error => console.log(error))
        //console.log (this._powers)
        // const FormPower = this._AddForm("Power")
        // this._Select (FormPower,this._powers,"Power")

    } 

    TalentName(id) { return this._talents[id].name}
    TalentEffect(id) {return this._talents[id].effect}

    PowerName(id){return this._powers[id].name }
    PowerEffect(id){return this._powers[id].effect }
    PowerType(id){return this._powers[id].type }
    PowerCost(id){return this._powers[id].cost }
    PowerToken(id){return this._powers[id].token }
    



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
        console.log ( this._filter)
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

