/**
 * @username: brad
 * @useremail:brad@steamda.com
 * @baseURL: steamda.com
 * @fullURL:https://www.steamda.com/summer-course/
 */
import wixLocation from 'wix-location';
import wixData from 'wix-data';
// import wixUsersBackend from 'wix-users-backend';
import wixUsers from 'wix-users';
import wixWindow from 'wix-window';

const msSpan = 2500;//10000;
let bradIdArray = ["523205d7-b40b-4478-90b5-8345dbe9e920","a8bfc307-51ba-49c2-91da-d4d859b94123"];
const isBrad = bradIdArray.indexOf(wixUsers.currentUser.id) >= 0 ? true : false;
console.log("isBrad: " + isBrad);
const isPreview = wixWindow.viewMode === "Preview" ? true : false;
console.log("isPreview: " + isPreview);

/**
 *@STEPS: - just a few final ones
 * ø remove INERT Functions()
 * ø remove gratuitous comments
 * ø remove OOAAOC console.log's and console.warn's 
 * ø change any remaining console.warn's to console.log's
 */
 /**
  * EXPECTED INITIAL CONSOLE LOGS:
  * •
  */

$w.onReady(function () {

    console.log("Number($w('#gradeleveldropdown').value) + 0: " + Number(Number($w('#gradeleveldropdown').value) + 0));
    if (Number($w('#gradeleveldropdown').value) + 0 === -7 ) {
        console.warn("ONREADY: " + Number(Number($w('#gradeleveldropdown').value) + 0 ) + " => gradeleveldropdown_change()" );
        gradeleveldropdown_change();
    }
     const query = wixLocation.query;
    if (query) {
        console.log("GET: " + JSON.stringify(query));
    }else{
        console.log("GET: " + 'No URL Parameters');
    }
    console.log("Base URL: " + wixLocation.baseUrl);
    console.warn("COMPLETE: " + "$w.onReady(function ()" );
});
export function gradeleveldropdown_change(event) {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here: 
    gradeleveldropdown_changeFull();
}


export function gradeleveldropdown_changeFull(event) {

    var gradelevelValue = Number($w('#gradeleveldropdown').value) + 0;
    console.log("gradelevelValue: " + gradelevelValue);
     if (gradelevelValue <= 0) {
        console.log("All Grade Levels[" + gradelevelValue + "]: RESET FILTERS" );
       //<WHERE>
        $w("#week1Courses").setFilter(wixData.filter()
            .eq("week", 1));
        $w("#week2Courses").setFilter(wixData.filter()
            .eq("week", 2));
        $w("#week3Courses").setFilter(wixData.filter()
            .eq("week", 3));
        $w("#week4Courses").setFilter(wixData.filter()
            .eq("week", 4));
        $w("#week5Courses").setFilter(wixData.filter()
            .eq("week", 5));
        $w("#week6Courses").setFilter(wixData.filter()
            .eq("week", 6));
        $w("#week7Courses").setFilter(wixData.filter()
            .eq("week", 7));
        $w("#week8Courses").setFilter(wixData.filter()
            .eq("week", 8));
        $w("#week9Courses").setFilter(wixData.filter()
            .eq("week", 9));
        //</WHERE>

        //<ORDER BY>
        $w("#week1Courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week2Courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week3Courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week4Courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week5Courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week6Courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week7Courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week8Courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week9Courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
            //<ORDER BY>
        if (gradelevelValue === -7) {
            console.log("[" + gradelevelValue + "] timeout start: " + msSpan)
            setTimeout(refreshRepeaterAllWeeks,msSpan);
            // setTimeout(console.log,msSpan, "Faux TimeOut");
            console.warn("After all grades filter, then 10 seconds, COMPLETE: " + "gradeleveldropdown_change(event)" );
        }
     } else {
        console.log("Specific Grade Level[" + gradelevelValue + "]: FILTER BY GRADE LEVEL" );
       //<WHERE>
        $w("#week1Courses").setFilter(wixData.filter()
            .eq("gradeMax", gradelevelValue)
            .eq("week", 1));
        $w("#week2Courses").setFilter(wixData.filter()
            .eq("gradeMax", gradelevelValue)
            .eq("week", 2));
        $w("#week3Courses").setFilter(wixData.filter()
            .eq("gradeMax", gradelevelValue)
            .eq("week", 3));
        $w("#week4Courses").setFilter(wixData.filter()
            .eq("gradeMax", gradelevelValue)
            .eq("week", 4));
        $w("#week5Courses").setFilter(wixData.filter()
            .eq("gradeMax", gradelevelValue)
            .eq("week", 5));
        $w("#week6Courses").setFilter(wixData.filter()
            .eq("gradeMax", gradelevelValue)
            .eq("week", 6));
        $w("#week7Courses").setFilter(wixData.filter()
            .eq("gradeMax", gradelevelValue)
            .eq("week", 7));
        $w("#week8Courses").setFilter(wixData.filter()
            .eq("gradeMax", gradelevelValue)
            .eq("week", 8));
        $w("#week9Courses").setFilter(wixData.filter()
            .eq("gradeMax", gradelevelValue)
            .eq("week", 9));
            //</WHERE>

        //<ORDER BY>
        $w("#week1Courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week2Courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week3Courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week4Courses").setSort(wixData.sort()
         //     .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week5Courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week6Courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week7Courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week8Courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week9Courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        //<ORDER BY>

        console.log("[" + gradelevelValue + "] timeout start: " + msSpan)
        setTimeout(refreshRepeaterAllWeeks,msSpan);
        // setTimeout(console.log,msSpan, "Faux TimeOut");
        console.warn("After grade filter, then 10 seconds, COMPLETE: " + "gradeleveldropdown_change(event)" );
     }


    if (gradelevelValue === 2) {
        $w('#gradelevelstring').text = 'Showing Classes for Grade Level K-2';
    } else if (gradelevelValue === 5) {
        $w('#gradelevelstring').text = 'Showing Classes for Grade Level 3-5';
    } else if (gradelevelValue === 8) {
        $w('#gradelevelstring').text = 'Showing Classes for Grade Level 6-8';
    } else if (gradelevelValue === 12) {
        $w('#gradelevelstring').text = 'Showing Classes for Grade Level 9-12';
    } else {
        $w("#gradelevelstring").text = "Showing Classes for All Grade Levels";
        // $w("#gradelevelstring").text = "Showing Classes for All Grade Levels";
        // $w('#gradeleveldropdown').value = "All Grade Levels";
    }

}


export function courseNameWk3_clickX(event, $w) {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here:
    // console.log("courseNameWk3_click: INERT");
    // let targetItem = $w("#week3Courses").getCurrentItem();
    // console.log("getCurrentItem: ");
    // console.log(targetItem);
    // let url = targetItem["link-summer-2021-course-title"];
    let url = "CodeAbandoned courseNameWk3_clickX";
    console.warn("url: " + url);
    wixLocation.to(url);
}


export function week4courses_ready() {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here:
    console.log("[week4courses_ready()] about to run refreshRepeaterAllWeeks ")
    // refreshRepeaterAllWeeks();
    // console.warn("COMPLETE: " + "week4courses_ready()" );
    console.warn("SKIPPED: " + "week4courses_ready() will add to normal onReady()" );
}





//<CALLED FUNCTIONS>

export function refreshRepeaterAllWeeks(){
    refreshRepeaterWeekOne();
    refreshRepeaterWeekTwo();
    refreshRepeaterWeekThree();
    refreshRepeaterWeekFour();
    refreshRepeaterWeekFive();
    refreshRepeaterWeekSix();
    refreshRepeaterWeekSeven();
    refreshRepeaterWeekEight();
    refreshRepeaterWeekNine();
    console.warn("COMPLETE: " + "refreshRepeaterAllWeeks()" );
}

//<Week1>
export function refreshRepeaterWeekOne(){
    $w('#wk1rptr').forEachItem( ($item, itemData, index) => {
        var borderColor = 'springgreen';
        var backgroundColor = 'yellow';
        switch (itemData.gradeMax) {
            case 2:
                borderColor = '#C0D3EA';
                backgroundColor = '#C0D3EA';
                break;
            case 5:
                borderColor = '#C6D2D4';
                backgroundColor = '#C6D2D4';
                break;
            case 8:
                borderColor = '#E1EFF2';
                backgroundColor = '#E1EFF2';
                break;
            case 12:
                borderColor = '#EDE2DA';
                backgroundColor = '#EDE2DA';
                break;
            default:
                borderColor = 'yellow';
                backgroundColor = 'springgreen';
                break;
        }
        let spacesLeftThis = spacesLeft( itemData.currentEnrollment, itemData.maxFull, itemData.waitlist, itemData.absoluteMax, itemData.maxAm, itemData.maxPm, itemData.minFull );
        if (spacesLeftThis <= 0) {
            borderColor = 'red';
        } else if ( spacesLeftThis < 77 ) {
            borderColor = 'orange';
            $item('#spacesWk1').label = spacesLeftThis.toString();
            $item('#spacesWk1').show();
        }
        $item("#wk1Box").style.borderColor =  borderColor;
        $item("#wk1Box").style.backgroundColor =  backgroundColor;

        console.log("$item[" + index + "](\"#week1Box\").style.backgroundColor =  " + backgroundColor+ ";")
    } );
    console.warn("COMPLETE: " + "refreshRepeaterWeekOne()" );
}
//</Week1>

//<Week2>
export function refreshRepeaterWeekTwo(){
    $w('#wk2rptr').forEachItem( ($item, itemData, index) => {
        var borderColor = 'springgreen';
        var backgroundColor = 'yellow';
        switch (itemData.gradeMax) {
            case 2:
                borderColor = '#C0D3EA';
                backgroundColor = '#C0D3EA';
                break;
            case 5:
                borderColor = '#C6D2D4';
                backgroundColor = '#C6D2D4';
                break;
            case 8:
                borderColor = '#E1EFF2';
                backgroundColor = '#E1EFF2';
                break;
            case 12:
                borderColor = '#EDE2DA';
                backgroundColor = '#EDE2DA';
                break;
            default:
                borderColor = 'yellow';
                backgroundColor = 'springgreen';
                break;
        }
        let spacesLeftThis = spacesLeft( itemData.currentEnrollment, itemData.maxFull, itemData.waitlist, itemData.absoluteMax, itemData.maxAm, itemData.maxPm, itemData.minFull );
        if (spacesLeftThis <= 0) {
            borderColor = 'red';
        } else if ( spacesLeftThis < 77 ) {
            borderColor = 'orange';
            $item('#spacesWk2').label = spacesLeftThis.toString();
            $item('#spacesWk2').show();
        }
        $item("#wk2Box").style.borderColor =  borderColor;
        $item("#wk2Box").style.backgroundColor =  backgroundColor;

        console.log("$item[" + index + "](\"#wk2Box\").style.backgroundColor =  " + backgroundColor+ ";")
    } );
    console.warn("COMPLETE: " + "refreshRepeaterWeekTwo()" );
}
//</Week2>

//<Week3>
export function refreshRepeaterWeekThree(){
    $w('#wk3rptr').forEachItem( ($item, itemData, index) => {
        var borderColor = 'springgreen';
        var backgroundColor = 'yellow';
        switch (itemData.gradeMax) {
            case 2:
                borderColor = '#C0D3EA';
                backgroundColor = '#C0D3EA';
                break;
            case 5:
                borderColor = '#C6D2D4';
                backgroundColor = '#C6D2D4';
                break;
            case 8:
                borderColor = '#E1EFF2';
                backgroundColor = '#E1EFF2';
                break;
            case 12:
                borderColor = '#EDE2DA';
                backgroundColor = '#EDE2DA';
                break;
            default:
                borderColor = 'yellow';
                backgroundColor = 'springgreen';
                break;
        }
        let spacesLeftThis = spacesLeft( itemData.currentEnrollment, itemData.maxFull, itemData.waitlist, itemData.absoluteMax, itemData.maxAm, itemData.maxPm, itemData.minFull );
        if (spacesLeftThis <= 0) {
            borderColor = 'red';
        } else if ( spacesLeftThis < 77 ) {
            borderColor = 'orange';
            $item('#spacesWk3').label = spacesLeftThis.toString();
            $item('#spacesWk3').show();
        }
        $item("#wk3Box").style.borderColor =  borderColor;
        $item("#wk3Box").style.backgroundColor =  backgroundColor;

        console.log("$item[" + index + "](\"#wk3Box\").style.backgroundColor =  " + backgroundColor+ ";")
    } );
    console.warn("COMPLETE: " + "refreshRepeaterWeekThree()" );
}
//</Week3>

//<Week4>
export function refreshRepeaterWeekFour(){
    $w('#wk4rptr').forEachItem( ($item, itemData, index) => {
        var borderColor = 'springgreen';
        var backgroundColor = 'yellow';
        switch (itemData.gradeMax) {
            case 2:
                borderColor = '#C0D3EA';
                backgroundColor = '#C0D3EA';
                break;
            case 5:
                borderColor = '#C6D2D4';
                backgroundColor = '#C6D2D4';
                break;
            case 8:
                borderColor = '#E1EFF2';
                backgroundColor = '#E1EFF2';
                break;
            case 12:
                borderColor = '#EDE2DA';
                backgroundColor = '#EDE2DA';
                break;
            default:
                borderColor = 'yellow';
                backgroundColor = 'springgreen';
                break;
        }
        let spacesLeftThis = spacesLeft( itemData.currentEnrollment, itemData.maxFull, itemData.waitlist, itemData.absoluteMax, itemData.maxAm, itemData.maxPm, itemData.minFull );
        if (spacesLeftThis <= 0) {
            borderColor = 'red';
        } else if ( spacesLeftThis < 77 ) {
            borderColor = 'orange';
            $item('#spacesWk4').label = spacesLeftThis.toString();
            $item('#spacesWk4').show();
        }
        $item("#wk4Box").style.borderColor =  borderColor;
        $item("#wk4Box").style.backgroundColor =  backgroundColor;

        console.log("$item[" + index + "](\"#wk4Box\").style.backgroundColor =  " + backgroundColor+ ";")
    } );
    console.warn("COMPLETE: " + "refreshRepeaterWeekFour()" );
}
//</Week4>

//<Week5>
export function refreshRepeaterWeekFive(){
    $w('#wk5rptr').forEachItem( ($item, itemData, index) => {
        var borderColor = 'springgreen';
        var backgroundColor = 'yellow';
        switch (itemData.gradeMax) {
            case 2:
                borderColor = '#C0D3EA';
                backgroundColor = '#C0D3EA';
                break;
            case 5:
                borderColor = '#C6D2D4';
                backgroundColor = '#C6D2D4';
                break;
            case 8:
                borderColor = '#E1EFF2';
                backgroundColor = '#E1EFF2';
                break;
            case 12:
                borderColor = '#EDE2DA';
                backgroundColor = '#EDE2DA';
                break;
            default:
                borderColor = 'yellow';
                backgroundColor = 'springgreen';
                break;
        }
        let spacesLeftThis = spacesLeft( itemData.currentEnrollment, itemData.maxFull, itemData.waitlist, itemData.absoluteMax, itemData.maxAm, itemData.maxPm, itemData.minFull );
        if (spacesLeftThis <= 0) {
            borderColor = 'red';
        } else if ( spacesLeftThis < 77 ) {
            borderColor = 'orange';
            $item('#spacesWk5').label = spacesLeftThis.toString();
            $item('#spacesWk5').show();
        }
        $item("#wk5Box").style.borderColor =  borderColor;
        $item("#wk5Box").style.backgroundColor =  backgroundColor;

        console.log("$item[" + index + "](\"#wk5Box\").style.backgroundColor =  " + backgroundColor+ ";")
    } );
    console.warn("COMPLETE: " + "refreshRepeaterWeekFive()" );
}
//</Week5>

//<Week6>
export function refreshRepeaterWeekSix(){
    $w('#wk6rptr').forEachItem( ($item, itemData, index) => {
        var borderColor = 'springgreen';
        var backgroundColor = 'yellow';
        switch (itemData.gradeMax) {
            case 2:
                borderColor = '#C0D3EA';
                backgroundColor = '#C0D3EA';
                break;
            case 5:
                borderColor = '#C6D2D4';
                backgroundColor = '#C6D2D4';
                break;
            case 8:
                borderColor = '#E1EFF2';
                backgroundColor = '#E1EFF2';
                break;
            case 12:
                borderColor = '#EDE2DA';
                backgroundColor = '#EDE2DA';
                break;
            default:
                borderColor = 'yellow';
                backgroundColor = 'springgreen';
                break;
        }
        let spacesLeftThis = spacesLeft( itemData.currentEnrollment, itemData.maxFull, itemData.waitlist, itemData.absoluteMax, itemData.maxAm, itemData.maxPm, itemData.minFull );
        if (spacesLeftThis <= 0) {
            borderColor = 'red';
            $item('#spacesWk6').hide();
        } else if ( spacesLeftThis < 77 ) {
            borderColor = 'orange';
            $item('#spacesWk6').label = spacesLeftThis.toString();
            $item('#spacesWk6').show();
        } else {
            $item('#spacesWk6').hide();
        }
        $item("#wk6Box").style.borderColor =  borderColor;
        $item("#wk6Box").style.backgroundColor =  backgroundColor;

        console.log("$item[" + index + "](\"#wk6Box\").style.backgroundColor =  " + backgroundColor+ ";")
    } );
    console.warn("COMPLETE: " + "refreshRepeaterWeekSix()" );
}
//</Week6>

//<Week7>
export function refreshRepeaterWeekSeven(){
    $w('#wk7rptr').forEachItem( ($item, itemData, index) => {
        var borderColor = 'springgreen';
        var backgroundColor = 'yellow';
        switch (itemData.gradeMax) {
            case 2:
                borderColor = '#C0D3EA';
                backgroundColor = '#C0D3EA';
                break;
            case 5:
                borderColor = '#C6D2D4';
                backgroundColor = '#C6D2D4';
                break;
            case 8:
                borderColor = '#E1EFF2';
                backgroundColor = '#E1EFF2';
                break;
            case 12:
                borderColor = '#EDE2DA';
                backgroundColor = '#EDE2DA';
                break;
            default:
                borderColor = 'yellow';
                backgroundColor = 'springgreen';
                break;
        }
        let spacesLeftThis = spacesLeft( itemData.currentEnrollment, itemData.maxFull, itemData.waitlist, itemData.absoluteMax, itemData.maxAm, itemData.maxPm, itemData.minFull );
        if (spacesLeftThis <= 0) {
            borderColor = 'red';
        } else if ( spacesLeftThis < 77 ) {
            borderColor = 'orange';
            $item('#spacesWk7').label = spacesLeftThis.toString();
            $item('#spacesWk7').show();
        }
        $item("#wk7Box").style.borderColor =  borderColor;
        $item("#wk7Box").style.backgroundColor =  backgroundColor;

        console.log("$item[" + index + "](\"#wk7Box\").style.backgroundColor =  " + backgroundColor+ ";")
    } );
    console.warn("COMPLETE: " + "refreshRepeaterWeekSeven()" );
}
//</Week7>

//<Week8>
export function refreshRepeaterWeekEight(){
    $w('#wk8rptr').forEachItem( ($item, itemData, index) => {
        var borderColor = 'springgreen';
        var backgroundColor = 'yellow';
        switch (itemData.gradeMax) {
            case 2:
                borderColor = '#C0D3EA';
                backgroundColor = '#C0D3EA';
                break;
            case 5:
                borderColor = '#C6D2D4';
                backgroundColor = '#C6D2D4';
                break;
            case 8:
                borderColor = '#E1EFF2';
                backgroundColor = '#E1EFF2';
                break;
            case 12:
                borderColor = '#EDE2DA';
                backgroundColor = '#EDE2DA';
                break;
            default:
                borderColor = 'yellow';
                backgroundColor = 'springgreen';
                break;
        }
        let spacesLeftThis = spacesLeft( itemData.currentEnrollment, itemData.maxFull, itemData.waitlist, itemData.absoluteMax, itemData.maxAm, itemData.maxPm, itemData.minFull );
        if (spacesLeftThis <= 0) {
            borderColor = 'red';
        } else if ( spacesLeftThis < 77 ) {
            borderColor = 'orange';
            $item('#spacesWk8').label = spacesLeftThis.toString();
            $item('#spacesWk8').show();
        }
        $item("#wk8Box").style.borderColor =  borderColor;
        $item("#wk8Box").style.backgroundColor =  backgroundColor;

        console.log("$item[" + index + "](\"#wk8Box\").style.backgroundColor =  " + backgroundColor+ ";")
    } );
    console.warn("COMPLETE: " + "refreshRepeaterWeekEight()" );
}
//</Week8>

//<Week9>
export function refreshRepeaterWeekNine(){
    $w('#wk9rptr').forEachItem( ($item, itemData, index) => {
        var borderColor = 'springgreen';
        var backgroundColor = 'yellow';
        switch (itemData.gradeMax) {
            case 2:
                borderColor = '#C0D3EA';
                backgroundColor = '#C0D3EA';
                break;
            case 5:
                borderColor = '#C6D2D4';
                backgroundColor = '#C6D2D4';
                break;
            case 8:
                borderColor = '#E1EFF2';
                backgroundColor = '#E1EFF2';
                break;
            case 12:
                borderColor = '#EDE2DA';
                backgroundColor = '#EDE2DA';
                break;
            default:
                borderColor = 'yellow';
                backgroundColor = 'springgreen';
                break;
        }        
        let spacesLeftThis = spacesLeft( itemData.currentEnrollment, itemData.maxFull, itemData.waitlist, itemData.absoluteMax, itemData.maxAm, itemData.maxPm, itemData.minFull );
        if (spacesLeftThis <= 0) {
            borderColor = 'red';
        } else if ( spacesLeftThis < 77 ) {
            borderColor = 'orange';
            $item('#spacesWk9').label = spacesLeftThis.toString();
            $item('#spacesWk9').show();
        }
        $item("#wk9Box").style.borderColor =  borderColor;
        $item("#wk9Box").style.backgroundColor =  backgroundColor;

        console.log("$item[" + index + "](\"#wk9Box\").style.backgroundColor =  " + backgroundColor+ ";")
    } );
    console.warn("COMPLETE: " + "refreshRepeaterWeekNine()" );
}
//</Week9>

//<spacesLeft()>
export function spacesLeft( currentEnrollment, maxFull, waitlist, absoluteMax, maxAm, maxPm, minFull ){
    const maxShow = 5;
    let seats =  Number(maxFull) - Number(currentEnrollment);
    seats = steats <= maxShow ? seats : 77;
    return seats;
    // return Math.floor( Math.random() * 6 );
}
//</spacesLeft()>

//</CALLED FUNCTIONS>





export function courseNameWk9_click(event, $w) {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here: 
    // console.log("courseNameWk9_click: INERT");
    let targetItem = $w("#week9Courses").getCurrentItem();
    console.log("getCurrentItem: ");
    console.log(targetItem);
    let url = targetItem["link-summer-course-title"];
    console.warn("url: " + url);
    wixLocation.to(url);
}

export function courseNameWk1_click(event, $w) {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here:
    // console.log("courseNameWk1_click: INERT");
    let targetItem = $w("#week1Courses").getCurrentItem();
    console.log("getCurrentItem: ");
    console.log(targetItem);
    let url = targetItem["link-summer-course-title"];
    console.warn("url: " + url);
    wixLocation.to(url); 
}

export function courseNameWk2_click(event, $w) {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here: 
    // console.log("courseNameWk1_click: INERT");
    let targetItem = $w("#week2Courses").getCurrentItem();
    console.log("getCurrentItem: ");
    console.log(targetItem);
    let url = targetItem["link-summer-course-title"];
    console.warn("url: " + url);
    wixLocation.to(url); 
}

export function courseNameWk3_click(event, $w) {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here: 
    // console.log("courseNameWk1_click: INERT");
    let targetItem = $w("#week3Courses").getCurrentItem();
    console.log("getCurrentItem: ");
    console.log(targetItem);
    let url = targetItem["link-summer-course-title"];
    console.warn("url: " + url);
    wixLocation.to(url); 
}

export function courseNameWk4_click(event, $w) {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here: 
    // console.log("courseNameWk1_click: INERT");
    let targetItem = $w("#week4Courses").getCurrentItem();
    console.log("getCurrentItem: ");
    console.log(targetItem);
    let url = targetItem["link-summer-course-title"];
    console.warn("url: " + url);
    wixLocation.to(url); 
}

export function courseNameWk5_click(event, $w) {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here: 
    // console.log("courseNameWk1_click: INERT");
    let targetItem = $w("#week5Courses").getCurrentItem();
    console.log("getCurrentItem: ");
    console.log(targetItem);
    let url = targetItem["link-summer-course-title"];
    console.warn("url: " + url);
    wixLocation.to(url); 
}

export function courseNameWk6_click(event, $w) {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here: 
    // console.log("courseNameWk1_click: INERT");
    let targetItem = $w("#week6Courses").getCurrentItem();
    console.log("getCurrentItem: ");
    console.log(targetItem);
    let url = targetItem["link-summer-course-title"];
    console.warn("url: " + url);
    wixLocation.to(url); 
}


export function courseNameWk7_click(event, $w) {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here: 
    // console.log("courseNameWk1_click: INERT");
    let targetItem = $w("#week7Courses").getCurrentItem();
    console.log("getCurrentItem: ");
    console.log(targetItem);
    let url = targetItem["link-summer-course-title"];
    console.warn("url: " + url);
    wixLocation.to(url); 
}

export function courseNameWk8_click(event, $w) {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here: 
    // console.log("courseNameWk1_click: INERT");
    let targetItem = $w("#week8Courses").getCurrentItem();
    console.log("getCurrentItem: ");
    console.log(targetItem);
    let url = targetItem["link-summer-course-title"];
    console.warn("url: " + url);
    wixLocation.to(url); 
}