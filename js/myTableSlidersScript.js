/* Margarita Garcia-Otero
 GUI-1 HW4
 File Name: /js/myTablesScript.js */

// Four constructors to create and initialize slider objects and add methods for events.
// (I could have written a function if I were to do it again.)
$( function() {
        let str = ""; 
        var handle = $( "#custom-handle-0" ); 
        $( "#slider_Xmin" ).slider( {
             min:-50, 
             max:50,
            create: function() {
                handle.text( $( this ).slider( "value" ) );
            },
            slide: function( event, ui ) {
                handle.text( ui.value );  
                $("#tb_Xmin").val(ui.value);
            },
            change: function( event, ui ) {
                handle.text( ui.value );
                $("#tb_Xmin").val(ui.value);
            } 
        }); // end slider constructor and literal initialization
}); // end function call to create slider        
    
$( function() {
        let str = ""; 
        var handle = $( "#custom-handle-1" ); 
        $( "#slider_Xmax" ).slider( {
             min:-50, 
             max:50,
            create: function() {
                handle.text( $( this ).slider( "value" ) );
            },
            slide: function( event, ui ) {
                handle.text( ui.value );  
                $("#tb_Xmax").val(ui.value);
            },
            change: function( event, ui ) {
                handle.text( ui.value );
                $("#tb_Xmax").val(ui.value);
            } 
        }); // end slider constructor and literal initialization
}); // end function call to create slider        
    
$( function() {
        let str = ""; 
        var handle = $( "#custom-handle-2" ); 
        $( "#slider_Ymin" ).slider( {
             min:-50, 
             max:50,
            create: function() {
                handle.text( $( this ).slider( "value" ) );
            },
            slide: function( event, ui ) {
                handle.text( ui.value );  
                $("#tb_Ymin").val(ui.value);
            },
            change: function( event, ui ) {
                handle.text( ui.value );
                $("#tb_Ymin").val(ui.value);
            } 
        }); // end slider constructor and literal initialization
}); // end function call to create slider        
                
$( function() {
        let str = ""; 
        var handle = $( "#custom-handle-3" ); 
        $( "#slider_Ymax" ).slider( {
             min:-50, 
             max:50,
            create: function() {
                handle.text( $( this ).slider( "value" ) );
            },
            slide: function( event, ui ) {
                handle.text( ui.value );  
                $("#tb_Ymax").val(ui.value);
            },
            change: function( event, ui ) {
                handle.text( ui.value );
                $("#tb_Ymax").val(ui.value);
            } 
        }); // end slider constructor and literal initialization
}); // end function call to create slider        


// Based on HW3: This function gets collection of input and messages and does
// test on desired node in array using index
// and returns T or F value in "mischiefManaged" flag variable

// HW4 update: added code at the end to update value on slider handle if valid textbox input

function isValid(i) {
    //console.log("isValid index", i);
    let elements = document.getElementsByName("number");
    let messages = document.getElementsByTagName("span");
        let mischiefManaged = false;
        let str = elements[i].value;     
        elements[i].style.background = "salmon";
        //elements[i].value = "";
        if (str == "") {
            messages[i].textContent
            = str + " empty string not allowed - reenter";  
        } else if (isNaN(str)) {
            messages[i].textContent
            = str + " is not a valid integer - reenter";
        } else if (parseFloat(str) != parseInt(str)) {
            messages[i].textContent
            = str + " floating point number not allowed - reenter";
        } else if (parseInt(str) < -50 || parseInt(str) > 50) {
        messages[i].textContent
          = str + " integer out of range - reenter";
        } else {
            mischiefManaged = true;
            elements[i].value = str;
            messages[i].textContent = "VALID";
            elements[i].style.background = "white";
        } // end if else chain of individual checks

        //console.log("before range check...", mischiefManaged);

        // now check for correct order of min and max
        if ((i === 1 || i === 3) & mischiefManaged) {
            let min = parseInt(elements[i-1].value);
            let max = parseInt(elements[i].value);
            if (min > max) {
                mischiefManaged = false;
                elements[i-1].style.background = "gold";
                //elements[0].value = "";
                messages[i-1].textContent
                    = min + " > " + max + " min cannot be GT max - reenter";
            } // end if 
        } // end if

        //console.log("leaving isValid function ", mischiefManaged)
        
        // if entry is valid update slider handle value
            //alert(mischiefManaged);
            if (mischiefManaged) {
                switch (i) {
                    case 0:
                        $("#slider_Xmin").slider("value", str );   
                        break;
                    case 1:
                        $("#slider_Xmax").slider("value", str );   
                        break;
                    case 2:
                        $("#slider_Ymin").slider("value", str );   
                        break;
                    case 3:
                        $("#sliderYmax").slider("value", str );   
                        break;  
                    default:  
                } 

            }
            
        return mischiefManaged;
} // end isValid function


// From HW3: This function runs deleteTable() and makes a new one.
// insertCell is td by default.

// HW4: update - added lines at start to make sure all input is valid before continuing

function generateTable() {
    if (  !isValid(0) || !isValid(1) || !isValid(2) || !isValid(3) ) {
        return;
    }

    deleteTable();

    let elements = document.getElementsByName("number");
    let Xmin = parseInt(elements[0].value); 
    let Xmax = parseInt(elements[1].value); 
    let Ymin = parseInt(elements[2].value); 
    let Ymax = parseInt(elements[3].value); 
    //console.log(Xmin, Xmax, Ymin, Ymax);

   // Below works !!!
    let table = document.getElementById("myTable");
    //document.getElementById("myTable").style.display="table";
    
    //add row at the end of the table and cell to end of row
    let row = table.insertRow(-1);
    let cell = row.insertCell(-1);
    cell.innerHTML = "X";
    cell.style.width = "50px";
    for (let Xcurr = Xmin; Xcurr <= Xmax; Xcurr += 1) {
        let cell = row.insertCell(-1);
        cell.innerHTML = Xcurr.toString();
        cell.style.width = "50px";
    } // end for loop

   
    // add first element in the second row
    for (let Ycurr = Ymin; Ycurr <= Ymax; Ycurr += 1) {
            let table = document.getElementById("myTable");
            let row = table.insertRow(-1);
            let cell = row.insertCell(-1);
            cell.innerHTML = Ycurr.toString();
            cell.style.width = "50px";
            
        // finish out the row
            for (let Xcurr = Xmin; Xcurr <= Xmax; Xcurr += 1) {
                let cell = row.insertCell(-1);
                cell.innerHTML = Ycurr*Xcurr;
                cell.style.width = "50px";
                cell.style.backgroundColor = "white";
                cell.style.color = "black";
                //   console.log(Ycurr,Xcurr);
            } // end inner for loop
    } // end outer for loop

}// end firstrow function

// HW3: This function removes table as long as there is a first element, which is fast to check),
// it will continue to remove the last element in while loop.
function deleteTable() {
    var myElement = document.getElementById("myTable");
    while (myElement.firstElementChild != null) {
        console.log("inside while loop");
        myElement.removeChild(myElement.lastElementChild);
    }
}