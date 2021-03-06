
//<HTML Fun DEMO>
export function htmlFunButton_click(event) {
    //<Un-Comment one or the Other to Enable/Disable thid DEMO>
    let htmlFunButton_enabled = true;
    //let htmlFunButton_enabled = false;
    if (htmlFunButton_enabled === false) {
        return false;
    }
    //</Un-Comment one or the Other to Enable/Disable thid DEMO>

    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here:
    let classesWeekOne = Math.floor(Math.random() * 4)
    let classesWeekTwo = Math.floor(Math.random() * 4)
    let dlStyle = "\"font-size: 16px; font-family : 'Avenir Black'; background-color: yellow;\"";
    let dhStyle = "color: blue; text-decoration: underline; line-height: 1";
    let ddStyle = "color: green; text-indent: 55px;";

    //<Week 1>
    $w("#switch101").hide();
    $w("#switch102").hide();
    $w("#switch103").hide();
    let textWeek1 = "<dl style=" + dlStyle + ">"
        + "<dh style='" + dhStyle + "'>Week 1: June 7-11 2021</dh>";
        if (classesWeekOne >= 1) {
            textWeek1 += "<dd style='" + ddStyle + "'>Drone Academy</li></dd>";
            $w("#switch101").show();
            $w("#switch101").checked = false;
        }
        if (classesWeekOne >= 2) {
            textWeek1 += "<dd style='" + ddStyle + "'>Gadgets & Gizmos</li></dd>";
            $w("#switch102").show();
            $w("#switch102").checked = false;
        }
        if (classesWeekOne >= 3) {
            textWeek1 += "<dd style='" + ddStyle + "'>Forsensics</li></dd>";
            $w("#switch103").show();
            $w("#switch103").checked = false;
        }
        textWeek1 += "</dl>"
            ;
    $w("#textWeek1").html = textWeek1;
    //</Week 1>

    //<Week 2>
    $w("#switch201").hide();
    $w("#switch202").hide();
    $w("#switch203").hide();
    let textWeek2 = "<dl style=" + dlStyle + ">"
        + "<dh style='" + dhStyle + "'>Week 2: June 14-18 2021</dh>";
        if (classesWeekTwo >= 1) {
            textWeek2 += "<dd style='" + ddStyle + "'>From Ada Lovelace to Grace Hopper</li></dd>";
            $w("#switch201").show();
            $w("#switch201").checked = false;
        }
        if (classesWeekTwo >= 2) {
            textWeek2 += "<dd style='" + ddStyle + "'>Playing Bongo's Like Richard Feynman</li></dd>";
            $w("#switch202").show();
            $w("#switch202").checked = false;
        }
        if (classesWeekTwo >= 3) {
            textWeek2 += "<dd style='" + ddStyle + "'>The Eels and the Multiverse Theory</li></dd>";
            $w("#switch203").show();
            $w("#switch203").checked = false;
        }
        textWeek2 += "</dl>"
            ;
    $w("#textWeek2").html = textWeek2;
    //</Week 2>



    // $w("#htmlFunAlert").value = "Applying the almost unused HTML construct called 'Data Lists' ('<dl>') to the simple Camping List Text to the Dynamic Content for Weeks 1 & 2 of Steam Discovery Academy";
}
//</HTML Fun DEMO>