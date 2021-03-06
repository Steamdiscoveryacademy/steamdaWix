/**
 * @username: brad
 * @useremail:brad@steamda.com
 * @baseURL: steamda.com
 * @fullURL:https://www.steamda.com/summer-2021-course-1
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
 *@STEPS:
 * • remove most / enhance remaining comments
 * • onReady add wk1, wk2
 * • onChange-All Grade Levels wk1, wk2
 * • onChange-Grade Level wk1, wk2
 * • SORTs onReady
 * • Simplify by Grade Levels
 * • Simplify by All Grade Levels
 * • SORTs by Grade Levels
 * • SORTs by AllGrade Levels
 * • LINKs
 * • make onReady() more efficient
 * • clean out PAST onReady() and gradeleveldropdown_change() debris, general comment cleanup
 * • implement console.warn() for end of functions (especially after setTimeout)
 * • Background Color by GradeLevelMax Data
 * • resolve BUG below with setTimeout()
 * • REAL DATA
 * • Repoint Data wk1, wk2, wk3
 * • Point Data wk4, wk5, wk6, wk7, wk8, wk9
 * • Check that (and how) to make a column appear in Mobile A: Grouping
 * • PUBLISH
 * ø comment out console log/warn code
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

    var gradelevelValue = Number($w('#gradeleveldropdown').value) + 0;
    console.log("gradelevelValue: " + gradelevelValue);
     if (gradelevelValue <= 0) {
        console.log("All Grade Levels[" + gradelevelValue + "]: RESET FILTERS" );
       //<WHERE>
        $w("#week1courses").setFilter(wixData.filter()
            .eq("week", 1));
        $w("#week2courses").setFilter(wixData.filter()
            .eq("week", 2));
        $w("#week3courses").setFilter(wixData.filter()
            .eq("week", 3));
        $w("#week4courses").setFilter(wixData.filter()
            .eq("week", 4));
        $w("#week5courses").setFilter(wixData.filter()
            .eq("week", 5));
        $w("#week6courses").setFilter(wixData.filter()
            .eq("week", 6));
        $w("#week7courses").setFilter(wixData.filter()
            .eq("week", 7));
        $w("#week8courses").setFilter(wixData.filter()
            .eq("week", 8));
        $w("#week9courses").setFilter(wixData.filter()
            .eq("week", 9));
        //</WHERE>

        //<ORDER BY>
        $w("#week1courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week2courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week3courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week4courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week5courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week6courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week7courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week8courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week9courses").setSort(wixData.sort()
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
        $w("#week1courses").setFilter(wixData.filter()
            .eq("gradeMax", gradelevelValue)
            .eq("week", 1));
        $w("#week2courses").setFilter(wixData.filter()
            .eq("gradeMax", gradelevelValue)
            .eq("week", 2));
        $w("#week3courses").setFilter(wixData.filter()
            .eq("gradeMax", gradelevelValue)
            .eq("week", 3));
        $w("#week4courses").setFilter(wixData.filter()
            .eq("gradeMax", gradelevelValue)
            .eq("week", 4));
        $w("#week5courses").setFilter(wixData.filter()
            .eq("gradeMax", gradelevelValue)
            .eq("week", 5));
        $w("#week6courses").setFilter(wixData.filter()
            .eq("gradeMax", gradelevelValue)
            .eq("week", 6));
        $w("#week7courses").setFilter(wixData.filter()
            .eq("gradeMax", gradelevelValue)
            .eq("week", 7));
        $w("#week8courses").setFilter(wixData.filter()
            .eq("gradeMax", gradelevelValue)
            .eq("week", 8));
        $w("#week9courses").setFilter(wixData.filter()
            .eq("gradeMax", gradelevelValue)
            .eq("week", 9));
            //</WHERE>

        //<ORDER BY>
        $w("#week1courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week2courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week3courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week4courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week5courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week6courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week7courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week8courses").setSort(wixData.sort()
            // .ascending("locationId")
            .ascending("gradeMax")
            .ascending("courseName"));
        $w("#week9courses").setSort(wixData.sort()
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


export function courseNameWk3_click(event, $w) {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here:
    // console.log("courseNameWk3_click: INERT");
    let targetItem = $w("#week3courses").getCurrentItem();
    // console.log("getCurrentItem: ");
    // console.log(targetItem);
    let url = targetItem["link-summer-2021-course-title"];
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
        $item("#wk1Box").style.borderColor =  borderColor;
        $item("#wk1Box").style.backgroundColor =  backgroundColor;

        console.log("$item[" + index + "](\"#wk1Box\").style.backgroundColor =  " + backgroundColor+ ";")
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
        $item("#wk9Box").style.borderColor =  borderColor;
        $item("#wk9Box").style.backgroundColor =  backgroundColor;

        console.log("$item[" + index + "](\"#wk9Box\").style.backgroundColor =  " + backgroundColor+ ";")
    } );
    console.warn("COMPLETE: " + "refreshRepeaterWeekNine()" );
}
//</Week9>


//</CALLED FUNCTIONS>

