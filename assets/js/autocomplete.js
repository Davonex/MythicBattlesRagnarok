import  * as Elements from './elements.js'

export function AutoComplete(Container, Obj, Units) {
      /*the autocomplete function takes two arguments,
      the text field element and an array of possible autocompleted values:*/
      var currentFocus;
      /*execute a function when someone writes in the text field:*/
      Container.addEventListener("input", function(e) {
          var   i, val = this.value;
          /*close any already open lists of autocompleted values*/
             closeAllLists();
         if (!val) { return false;}
          currentFocus = -1;
          /*create a DIV element that will contain the items (values):*/
            const HtmlList = document.createElement("DIV");
            HtmlList.setAttribute("id", this.id + "autocomplete-list");
            HtmlList.classList.add("w3-show","w3-dropdown-content","w3-bar-block","w3-card-4","autocomplete-items") 
          /*append the DIV element as a child of the autocomplete container:*/
          this.parentNode.appendChild(HtmlList);
          /*for each item in the array...*/
          ////for (i = 0; i < arr.length; i++) {
            const regex = new RegExp(".*" + val + ".*","i");
            const regexreplace = new RegExp (val,"i")
            const StrReplace = "<span class=\"autocomplete-strong\">" + val + "</span>"

        for (const i in Obj) {
            /*check if the item starts with the same letters as the text field value:*/
//            if (Obj[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
    
        //console.log (Obj[i].name.match(regex))
        if ( Obj[i].name.match(regex)) {  
              /*create a DIV element for each matching element:*/
              const Item = document.createElement("div")
              Item.classList.add("w3-bar-item","w3-button")
              /*make the matching letters bold:*/
              //Item.innerHTML = "<span class=\"autocomplete-strong\">" + Obj[i].name.substr(0, val.length) + "</span>";
              //Item.innerHTML += Obj[i].name.substr(val.length);
              Item.innerHTML = "Talent : " + Obj[i].name.replace(regexreplace, StrReplace);
              /*insert a input field that will hold the current array item's value:*/
              Item.innerHTML += "<input type='hidden' value='" + Obj[i].name + "'>";
              /*execute a function when someone clicks on the item value (DIV element):*/
              Item.addEventListener("click", function(e) {
                  /*insert the value for the autocomplete text field:*/
                  Container.value = ""
                  const ContainerMultiSelect = document.getElementById("MultiSelect")
                  const theFirstChild = ContainerMultiSelect
                  //.firstChild
                  //console.log (ContainerMultiSelect)
                  const SpanSelected = Elements.CreateSpanWithClass(["selected"]);
                  SpanSelected.innerHTML = this.getElementsByTagName("input")[0].value
                  SpanSelected.appendChild(Elements.CreateItalicWithClass (["fa","fa-close"]))
                  ContainerMultiSelect.insertBefore (SpanSelected,theFirstChild)
                  /* Add Filter to Unit  */
                    console.log ("AddFilter this filter")
                    Units.UpdateFilter ("Talent",Obj[i],true)
                  /*execute a function when someone clicks on the spam selected (SPAN element):*/
                  SpanSelected.addEventListener("click", function(e) {
                    Units.UpdateFilter ("Talent",Obj[i],false)
                    console.log ("remove this filter")
                    /* Remove Filter to Unit  */
                  })
              })
              HtmlList.appendChild(Item);
            }
          }
      })
      /*execute a function presses a key on the keyboard:*/
      Container.addEventListener("keydown", function(e) {
          var x = document.getElementById(this.id + "autocomplete-list");
          if (x) x = x.getElementsByTagName("div");
          if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed, increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
          } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
          } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
              /*and simulate a click on the "active" item:*/
              if (x) x[currentFocus].click();
            }
          }
      });
      function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
      }
      function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
          x[i].classList.remove("autocomplete-active");
        }
      }
      function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != Container) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      /*execute a function when someone clicks in the document:*/
      document.addEventListener("click", function (e) {
          closeAllLists(e.target);
      });
    }