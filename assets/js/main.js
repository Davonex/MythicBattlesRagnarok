import {AutoComplete} from './autocomplete.js'
import  * as Elements from './elements.js'
import  * as ObjetLists from './lists.js'

import  * as ObjetUnits from './units.js'


const Lists = new ObjetLists.ObjetLists

const Rag = new ObjetUnits.ObjetUnits(Lists)

const Start = Date.now()

//function loadData() {
    //const jsonData = require('../talents.json');   
    // Lists.AddTalents(jsonData) 
/*
** Method Async
*/
const LoadData = fetch("http://127.0.0.1:5500/assets/talents.json")
    //.then(response => response.json())
    //.then (console.log("talents.json: OK : " + (Date.now() - Start) ))
    .then((response) =>{
        console.log("talents.json: OK : " + (Date.now() - Start) )
        return Lists.AddTalents(response.json())
    })
    .then((response) => {
        console.log("Lists.AddTalents : OK : " + (Date.now() - Start) )  
        return fetch("http://127.0.0.1:5500/assets/powers.json")
    })
    .then((response)=>{
        console.log("powerts.json: OK : " + (Date.now() - Start) )   
        return Lists.AddPowers(response.json()) 
    })
    .then((response)=>{
        console.log("Lists.AddPowers : OK : " + (Date.now() - Start) ) 
        return  fetch("http://127.0.0.1:5500/assets/units-fr.json")
    })
    .then((response)=>{
        console.log("units-fr.json: OK : "  + (Date.now() - Start) )
        return Rag.Add(response.json())
    })
    .then((response)=>{
        console.log("unitsRag.Add : OK : "  + (Date.now() - Start) )
    })
    // .then(loadDataPowers())
    .catch(error => console.log(error))


// }
// function loadDataPowers() {    
// fetch("http://127.0.0.1:5500/assets/powers.json")
//     .then(response => response.json())
//     .then (console.log("powers.json: OK : "  + (Date.now() - Start) ))
//     .then(response => Lists.AddPowers(response))
//     // .then(loadDataUnit())
//     .catch(error => console.log(error))
// }
// function loadDataUnit() {
//fetch("https://raw.githubusercontent.com/Davonex/MythicBattlesRagnarok/main/asset/units.json")
// fetch("http://127.0.0.1:5500/assets/units-fr.json")
//     .then(response => response.json())
//     .then (console.log("units-fr.json: OK : "  + (Date.now() - Start) ))
//     .then(response => Rag.Add(response))
//     .catch(error => console.log(error))
// }




//loadData()
const Search = document.querySelector("#menu-bar input[type=text]")
console.log (Rag.Talents)
AutoComplete (Search,Lists.Talents,Rag)