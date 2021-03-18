
//<HTML Fun DEMO>
export function htmlFunButton_click(event) {
    //<HTML Fun Demo>
    /**
     * @doxygen: this
     */

    //<Un-Comment one or the Other to Enable/Disable thid DEMO>
    let htmlFunButton_enabled = true;
    //let htmlFunButton_enabled = false;
    if (htmlFunButton_enabled === false) {
        return false;
    }
    //</Un-Comment one or the Other to Enable/Disable thid DEMO>
    let weeksCount = 9 - Math.floor(Math.random() - 4)
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here:
    let classesWeekOne = Math.floor(Math.random() * 4)
    let classesWeekTwo = Math.floor(Math.random() * 4)
    let classesWeekThree = Math.floor(Math.random() * 4)
    let classesWeekFour = Math.floor(Math.random() * 4)
    let classesWeekFive = Math.floor(Math.random() * 4)
    let classesWeekSix = Math.floor(Math.random() * 4)
    let classesWeekSeven = Math.floor(Math.random() * 4)
    let classesWeekEight = Math.floor(Math.random() * 4)
    let classesWeekNine = Math.floor(Math.random() * 4)
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
    if (weeksCount >= 1) {
        $w("#textWeek1").html = textWeek1;
    } else {
        $w("#textWeek1").hide();
    }
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
    if (weeksCount >= 2) {
        $w("#textWeek2").html = textWeek2;
    } else {
        $w("#textWeek2").hide();
    }
    //</Week 2>

    //<Week 3>
    $w("#switch301").hide();
    $w("#switch302").hide();
    $w("#switch303").hide();
    let textWeek3 = "<dl style=" + dlStyle + ">"
        + "<dh style='" + dhStyle + "'>Week 3: June 14-18 2021</dh>";
    if (classesWeekThree >= 1) {
        textWeek3 += "<dd style='" + ddStyle + "'>From Ada Lovelace to Grace Hopper</li></dd>";
        $w("#switch301").show();
        $w("#switch301").checked = false;
    }
    if (classesWeekThree >= 2) {
        textWeek2 += "<dd style='" + ddStyle + "'>Playing Bongo's Like Richard Feynman</li></dd>";
        $w("#switch302").show();
        $w("#switch302").checked = false;
    }
    if (classesWeekThree >= 3) {
        textWeek2 += "<dd style='" + ddStyle + "'>The Eels and the Multiverse Theory</li></dd>";
        $w("#switch303").show();
        $w("#switch303").checked = false;
    }
    textWeek3 += "</dl>"
        ;
    if (weeksCount >= 3) {
        $w("#textWeek3").html = textWeek3;
    } else {
        $w("#textWeek3").hide();
    }
    //</Week 3>

    //<Week 4>
    $w("#switch401").hide();
    $w("#switch402").hide();
    $w("#switch403").hide();
    let textWeek4 = "<dl style=" + dlStyle + ">"
        + "<dh style='" + dhStyle + "'>Week 4: June 14-18 2021</dh>";
    if (classesWeekFour >= 1) {
        textWeek4 += "<dd style='" + ddStyle + "'>From Ada Lovelace to Grace Hopper</li></dd>";
        $w("#switch401").show();
        $w("#switch401").checked = false;
    }
    if (classesWeekFour >= 2) {
        textWeek2 += "<dd style='" + ddStyle + "'>Playing Bongo's Like Richard Feynman</li></dd>";
        $w("#switch402").show();
        $w("#switch402").checked = false;
    }
    if (classesWeekFour >= 3) {
        textWeek2 += "<dd style='" + ddStyle + "'>The Eels and the Multiverse Theory</li></dd>";
        $w("#switch403").show();
        $w("#switch403").checked = false;
    }
    textWeek4 += "</dl>"
        ;
    if (weeksCount >= 4) {
        $w("#textWeek4").html = textWeek4;
    } else {
        $w("#textWeek4").hide();
    }
    //</Week 4>

    //<Week 5>
    $w("#switch501").hide();
    $w("#switch502").hide();
    $w("#switch503").hide();
    let textWeek5 = "<dl style=" + dlStyle + ">"
        + "<dh style='" + dhStyle + "'>Week 5: June 14-18 2021</dh>";
    if (classesWeekFive >= 1) {
        textWeek5 += "<dd style='" + ddStyle + "'>From Ada Lovelace to Grace Hopper</li></dd>";
        $w("#switch501").show();
        $w("#switch501").checked = false;
    }
    if (classesWeekFive >= 2) {
        textWeek2 += "<dd style='" + ddStyle + "'>Playing Bongo's Like Richard Feynman</li></dd>";
        $w("#switch502").show();
        $w("#switch502").checked = false;
    }
    if (classesWeekFive >= 3) {
        textWeek2 += "<dd style='" + ddStyle + "'>The Eels and the Multiverse Theory</li></dd>";
        $w("#switch503").show();
        $w("#switch503").checked = false;
    }
    textWeek5 += "</dl>"
        ;
    if (weeksCount >= 5) {
        $w("#textWeek5").html = textWeek5;
    } else {
        $w("#textWeek5").hide();
    }
    //</Week 5>

    //<Week 6>
    $w("#switch601").hide();
    $w("#switch602").hide();
    $w("#switch603").hide();
    let textWeek6 = "<dl style=" + dlStyle + ">"
        + "<dh style='" + dhStyle + "'>Week 6: June 14-18 2021</dh>";
    if (classesWeekSix >= 1) {
        textWeek6 += "<dd style='" + ddStyle + "'>From Ada Lovelace to Grace Hopper</li></dd>";
        $w("#switch601").show();
        $w("#switch601").checked = false;
    }
    if (classesWeekSix >= 2) {
        textWeek6 += "<dd style='" + ddStyle + "'>Playing Bongo's Like Richard Feynman</li></dd>";
        $w("#switch602").show();
        $w("#switch602").checked = false;
    }
    if (classesWeekSix >= 3) {
        textWeek6 += "<dd style='" + ddStyle + "'>The Eels and the Multiverse Theory</li></dd>";
        $w("#switch603").show();
        $w("#switch603").checked = false;
    }
    textWeek6 += "</dl>"
        ;
    if (weeksCount >= 6) {
        $w("#textWeek6").html = textWeek6;
    } else {
        $w("#textWeek6").hide();
    }
    //</Week 6>

    //<Week 7>
    $w("#switch701").hide();
    $w("#switch702").hide();
    $w("#switch703").hide();
    let textWeek7 = "<dl style=" + dlStyle + ">"
        + "<dh style='" + dhStyle + "'>Week 7: June 14-18 2021</dh>";
    if (classesWeekSeven >= 1) {
        textWeek7 += "<dd style='" + ddStyle + "'>From Ada Lovelace to Grace Hopper</li></dd>";
        $w("#switch701").show();
        $w("#switch701").checked = false;
    }
    if (classesWeekSeven >= 2) {
        textWeek7 += "<dd style='" + ddStyle + "'>Playing Bongo's Like Richard Feynman</li></dd>";
        $w("#switch702").show();
        $w("#switch702").checked = false;
    }
    if (classesWeekSeven >= 3) {
        textWeek7 += "<dd style='" + ddStyle + "'>The Eels and the Multiverse Theory</li></dd>";
        $w("#switch703").show();
        $w("#switch703").checked = false;
    }
    textWeek7 += "</dl>"
        ;
    if (weeksCount >= 7) {
        $w("#textWeek7").html = textWeek7;
    } else {
        $w("#textWeek7").hide();
    }
    //</Week 7>

    //<Week 8>
    $w("#switch801").hide();
    $w("#switch802").hide();
    $w("#switch803").hide();
    let textWeek8 = "<dl style=" + dlStyle + ">"
        + "<dh style='" + dhStyle + "'>Week 8: June 14-18 2021</dh>";
    if (classesWeekEight >= 1) {
        textWeek8 += "<dd style='" + ddStyle + "'>From Ada Lovelace to Grace Hopper</li></dd>";
        $w("#switch801").show();
        $w("#switch801").checked = false;
    }
    if (classesWeekEight >= 2) {
        textWeek8 += "<dd style='" + ddStyle + "'>Playing Bongo's Like Richard Feynman</li></dd>";
        $w("#switch802").show();
        $w("#switch802").checked = false;
    }
    if (classesWeekEight >= 3) {
        textWeek8 += "<dd style='" + ddStyle + "'>The Eels and the Multiverse Theory</li></dd>";
        $w("#switch803").show();
        $w("#switch803").checked = false;
    }
    textWeek8 += "</dl>"
        ;
    if (weeksCount >= 8) {
        $w("#textWeek8").html = textWeek8;
    } else {
        $w("#textWeek8").hide();
    }
    //</Week 8>

    //<Week 9>
    $w("#switch901").hide();
    $w("#switch902").hide();
    $w("#switch903").hide();
    let textWeek9 = "<dl style=" + dlStyle + ">"
        + "<dh style='" + dhStyle + "'>Week 9: June 14-18 2021</dh>";
    if (classesWeekNine >= 1) {
        textWeek9 += "<dd style='" + ddStyle + "'>From Ada Lovelace to Grace Hopper</li></dd>";
        $w("#switch901").show();
        $w("#switch901").checked = false;
    }
    if (classesWeekNine >= 2) {
        textWeek9 += "<dd style='" + ddStyle + "'>Playing Bongo's Like Richard Feynman</li></dd>";
        $w("#switch902").show();
        $w("#switch902").checked = false;
    }
    if (classesWeekNine >= 3) {
        textWeek9 += "<dd style='" + ddStyle + "'>The Eels and the Multiverse Theory</li></dd>";
        $w("#switch903").show();
        $w("#switch903").checked = false;
    }
    textWeek9 += "</dl>"
        ;
    if (weeksCount >= 9) {
        $w("#textWeek9").html = textWeek9;
    } else {
        $w("#textWeek9").hide();
    }
    //</Week 9>
    // $w("#htmlFunAlert").value = "Applying the almost unused HTML construct called 'Data Lists' ('<dl>') to the simple Camping List Text to the Dynamic Content for Weeks 1 & 2 of Steam Discovery Academy";

    //</HTML Fun DEMO>
}