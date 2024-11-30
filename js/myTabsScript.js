/* Margarita Garcia-Otero
 GUI-1 HW4
 File Name: js/myTabsScript.js 
 
 This file has the code to create the tabs and the event handlers/listeners.
 */

// https://jqueryui.com/tabs/#manipulation started with sample code, removed dialog box and added
// close and checkbox options to tab

$( function() {
    var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
        tabCounter = 0;
    var tabs = $( "#tabs" ).tabs();
      
    // AddTab button modified to generate label instead of opening dialog box
    $("#add_tab").on( "click", function() {
        tabCounter++;
        let label = "Tab " + tabCounter;
        let id = "tabs-" + tabCounter;

        // create li node with new href and label
        let li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) );
        let tabLine = "Table " + tabCounter + " added.";

        tabs.find( ".ui-tabs-nav" ).append( li );
        //tabs.append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
                 
        tabs.append( "<div id='" + id + "'><p>" + tabLine + "</p></div>" );
        //  $( "#" + id ).append( $('#display_div>table') );
        // $("#" + id ).append( "<table><tr><th>" + id + "</th></tr></table></div>" );
    
        //alert( $("#myTable").html());
        $("#" + id ).append( $("#myTable").html() );

        deleteTable();

        tabs.tabs( "refresh" );

        //alert("line 48, length = " + tabs.length + "tabCounter = " + tabCounter);
    });
 

    /* This function will set class on checked box but sets the class on the checkbox element
    and not the parent which is what I need to remove the li node so I commented it out.
    $(":checkbox").change(function() {
    if ($(this).is(":checked")) {
        $(this).parent.addClass("toDelete");
    } else {
        $(this).parent.removeClass("toDelete");
    }
    });
    */

    // These two functions below are from https://jqueryui.com/tabs/#manipulation and are unchanged.

    // Close icon: removing the tab on click
    tabs.on( "click", "span.ui-icon-close", function() {
        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
    });

    tabs.on( "keyup", function( event ) {
        if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
        var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
        }
    });
} );



