import wixData from 'wix-data';
import wixLocation from 'wix-location';

const dashboardBaseUrl = 'https://manage.wix.com/dashboard/a8472b36-bc63-4063-bd42-95519419cb8a/admin-pages/';
const repeaterLimit = 10;

$w.onReady(function () {
    $w('#filterDescr').text = "Descriptison for All Un-Resolved Webhook's Received";
    $w('#dsWebhookPayload')
    $w('#moreItems').text = "moreItems Default";

    $w("#dsWebhookPayload").setFilter(wixData.filter()
        .isEmpty("resolvedStatus"));
    let totalCount = $w("#dsWebhookPayload").getTotalCount();
    console.log('totalCount: ' + totalCount);
    $w('#moreItems').text = totalCount - repeaterLimit > 0 ? 'plus ' + Number(totalCount - repeaterLimit) + ' additional items' : '';


});

export function rptrTitle_click(event, $w) {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here:
    // console.log("rptrTitle_click: INERT");
    let $item = $w.at(event.context);
    // $item("#myRepeatedText").text = "Selected";
    $item("#rptrButton").show();
    //$item("#rptrLine").style.color = "#EA4335";
    let targetItem = $w("#dsWebhookPayload").getCurrentItem();
    // console.log("getCurrentItem: ");
    // console.log(targetItem);
    let wixId = targetItem["_id"];
    // let wixId = "testID";
    $w('#thisKey').value = wixId;
    $w('#thisTitle').value = targetItem['title'];
    let webhookId = targetItem['webhookId'];
    let source = targetItem['source'];
    $w('#thisSource').value = targetItem['source'];
    $w('#thisPayload').value = targetItem['payload'];
    $w('#thisWebhookId').value = targetItem['webhookId'];
    $w('#thisPayloadId').value = targetItem['payloadId'];
    $w('#thisCurrentStatus').value = targetItem['currentStatus'];
    let currentStatusStamp = targetItem['currentStatusStamp'].toString();
    currentStatusStamp = currentStatusStamp.substr(0, currentStatusStamp.search(" GMT"))
    $w('#thisCurrentStatusStamp').value = currentStatusStamp;
    // $w('#thisCurrentStatusStamp').value = targetItem['currentStatusStamp']; //copy pasted
    $w('#thisResolvedStatus').value = targetItem['resolvedStatus'];
    if (targetItem['resolvedStatusStamp'] === null) {
        $w('#thisResolvedStatusStamp').value = targetItem['resolvedStatusStamp'];
    } else {
        let resolvedStatusStamp = targetItem['resolvedStatusStamp'].toString();
        resolvedStatusStamp = resolvedStatusStamp.substr(0, resolvedStatusStamp.search(" GMT"))
        $w('#thisResolvedStatusStamp').value = resolvedStatusStamp;
    }

    let sourceArray = ['FormStack']
    for (let sourceThis of sourceArray) {

        let webhookIdArray = ['4223065']
        for (let webhookIdThis of webhookIdArray) {
            let buttonIdConcat = '#' + sourceThis + webhookIdThis;
            if (webhookId === webhookIdThis && source === sourceThis) {
                $w(buttonIdConcat).show();
            } else {
                $w(buttonIdConcat).hide();
            }
        }
    }
}

export function dropdownFilter_change(event) {
    var totalCount = 0;
    var filterValue = $w('#dropdownFilter').value;
    switch (filterValue) {
        case 'ALLRESOLVED':
            $w('#filterDescr').text = "Descriptison for All Resolved Webhook's Received";
            $w("#dsWebhookPayload").setFilter(wixData.filter()
                .isNotEmpty("resolvedStatus"));
            totalCount = $w("#dsWebhookPayload").getTotalCount();
            console.log(filterValue + ': ' + totalCount);
            break;

        case 'CONTACTUS':
            $w('#filterDescr').text = "Descriptison for All 'Contact Us' Webhook's Received";
            $w("#dsWebhookPayload").setFilter(wixData.filter()
                .isEmpty("resolvedStatus")
                .eq("source", 'FormStack')
                .eq("webhookId", '4273251')
            );
            totalCount = $w("#dsWebhookPayload").getTotalCount();
            console.log(filterValue + ': ' + totalCount);
            break;

        case 'APPLICATIONSUMMER':
            $w('#filterDescr').text = "Descriptison for All 'Application Summer' Webhook's Received";
            $w("#dsWebhookPayload").setFilter(wixData.filter()
                .isEmpty("resolvedStatus")
                .eq("source", 'FormStack')
                .eq("webhookId", '4223065')
            );
            totalCount = $w("#dsWebhookPayload").getTotalCount();
            console.log(filterValue + ': ' + totalCount);
            break;

        case 'FREELESSONREQUEST':
            $w('#filterDescr').text = "Descriptison for All 'Free Lesson Request' Webhook's Received";
            $w("#dsWebhookPayload").setFilter(wixData.filter()
                .isEmpty("resolvedStatus")
                .eq("source", 'FormStack')
                .eq("webhookId", '4262311')
            );
            totalCount = $w("#dsWebhookPayload").getTotalCount();
            console.log(filterValue + ': ' + totalCount);
            break;

        default:
            $w('#filterDescr').text = "Descriptison for All Un-Resolved Webhook's Received";
            $w("#dsWebhookPayload").setFilter(wixData.filter()
                .isEmpty("resolvedStatus"));
            totalCount = $w("#dsWebhookPayload").getTotalCount();
            console.log(filterValue + ': ' + totalCount);
            break;
    }
    $w('#moreItems').text = totalCount - repeaterLimit > 0 ? 'plus ' + Number(totalCount - repeaterLimit) + ' additional items' : '';

}

export function FormStack4223065_click(event, $w) {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here:
    //?referralInfo=viewerNavigation
    // let url = dashboardBaseUrl + "blank-5?referralInfo=viewerNavigation&wixId=" + $w("#thisKey").value;
    // console.log(url);
    // console.log(dashboardBaseUrl);
    // console.log("blank-5?referralInfo=viewerNavigation&wixId=");
    // console.log($w("#thisKey").value);
    // // wixLocation.to(url);
    var objApplicationSummer = JSON.parse($w('#thisPayload').value);
    let nameParent = objApplicationSummer.primary_parentguardian_name.first + ' ' + objApplicationSummer.primary_parentguardian_name.last;
    $w('#nameParent').value = nameParent;
    let emailParent = objApplicationSummer.primary_email_address;
    //<Starts With Test>
    // var atPosition = emailParent.lastIndexOf("@");
    // emailParent = emailParent.substr(0, atPosition)
    //</Starts With Test>
    // let emailParent = "abbytammen@gmail.com";//TEST: FAIL
    // let emailParent = "goodphyte@gmail.com";//TEST: FAIL
    // let emailParent = "lisel@steamda.com";//TEST: FAIL
    $w('#emailParent').value = emailParent;
    let phone = objApplicationSummer.primary_mobile_phone;
    // let phone = "(434) 825-2508";
    let pattern = /[^0-9]/g;
    let phoneRaw = phone.replace(pattern, '');
    $w('#phoneParent').value = phoneRaw;

    let filter1 = wixData.filter().eq("mainPhone", phoneRaw);
    let filter2 = wixData.filter().startsWith("loginEmail", emailParent);
    // let filter1 = wixData.filter().eq("lastName", "Pritchard");
    // let filter2 = wixData.filter().eq("firstName", "Lisel");
    // let finalFilter = filter1.or(filter2);
    let finalFilter = filter2;
    $w("#dsMembers").setFilter(finalFilter);
    $w("#btnAssignMember").show();
}

export function btnAssignMember_click(event) {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here:
    $w("#thisMemberId").value = "dc74d778-c930-4cc5-8bd8-99f314b0a4c7";
    $w("#btnConfirmClasses").show();
}

export function btnConfirmClasses_click(event) {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here:
    var returnObjectArrayObject = {"courses_array":[], "dogs_array":["Marcy","Chester","Marais"]};
    instantiateEnrollment(returnObjectArrayObject);
    // let payload = $w('#thisPayload').value;
    var payload = JSON.parse($w('#thisPayload').value);
    // console.log("payload: ");
    // console.log(payload);
    // var runningTotalObject = {"runningTotal": 0};
    var runningTotalObject = {"runningTotal": 0,"countWeekArray": [-999,0,0,0,0,0,0,0,0,0]};
    let week = payload.week_1_june_711_2021;
    console.log("week: ");
    console.log(week);
    // let firstWeekObject = returnArrayObjectWeek(week, 1, runningTotalObject);
    console.log(runningTotalObject);
    // console.log("firstWeekObject: ");
    // console.log(firstWeekObject);

    // let payload = $w('#thisPayload').value;
    returnObjectArrayObject.courses_array = returnObjectArrayObject.courses_array.concat(returnArrayObjectWeek(week, 1, runningTotalObject));
    week = payload.week_2_june_1418_2021;
    returnObjectArrayObject.courses_array = returnObjectArrayObject.courses_array.concat(returnArrayObjectWeek(week, 2, runningTotalObject));
    week = payload.week_3_june_2125_2021;
    returnObjectArrayObject.courses_array = returnObjectArrayObject.courses_array.concat(returnArrayObjectWeek(week, 3, runningTotalObject));
    week = payload.week_4_june_28july_2_2021;
    returnObjectArrayObject.courses_array = returnObjectArrayObject.courses_array.concat(returnArrayObjectWeek(week, 4, runningTotalObject));
    week = payload.week_5_july_1216_2021;
    returnObjectArrayObject.courses_array = returnObjectArrayObject.courses_array.concat(returnArrayObjectWeek(week, 5, runningTotalObject));
    week = payload.week_6_july_1923_2021;
    returnObjectArrayObject.courses_array = returnObjectArrayObject.courses_array.concat(returnArrayObjectWeek(week, 6, runningTotalObject));
    week = payload.week_7_july_2630_2021;
    returnObjectArrayObject.courses_array = returnObjectArrayObject.courses_array.concat(returnArrayObjectWeek(week, 7, runningTotalObject));
    week = payload.week_8_aug_26_2021;
    returnObjectArrayObject.courses_array = returnObjectArrayObject.courses_array.concat(returnArrayObjectWeek(week, 8, runningTotalObject));
    week = payload.week_9_august_914_2021;
    returnObjectArrayObject.courses_array = returnObjectArrayObject.courses_array.concat(returnArrayObjectWeek(week, 9, runningTotalObject));

    returnObjectArrayObject.countWeekArray = runningTotalObject.countWeekArray;
    let writeMapWeekArray = [-999,0,0,0,0,0,0,0,0,0]
    returnObjectArrayObject.writeMapWeekArray = writeMapWeekArray;
    writeCoursesSwitches(returnObjectArrayObject);
    console.log("returnObjectArrayObject: ");
    console.log(returnObjectArrayObject);
    console.log(runningTotalObject);
    $w("#btnEnroll").show();
}

export function instantiateEnrollment (returnObjectArrayObject) {
    var objApplicationSummer = JSON.parse($w('#thisPayload').value);
    let creationDate = $w("#thisCurrentStatusStamp").value;
    returnObjectArrayObject.creationDateString = creationDate;
    returnObjectArrayObject.creationDateUnix = Date.parse(creationDate);

    returnObjectArrayObject.family = {};
    returnObjectArrayObject.family.messages = {"dox": ["only messages you want the Whole Family to see"]};
    returnObjectArrayObject.family.student = {};
    returnObjectArrayObject.family.student.name = {};
    returnObjectArrayObject.family.parent = {};
    returnObjectArrayObject.family.parent.messages = {"dox": ["messages you want Both Parents to see"]};
    returnObjectArrayObject.family.parent.primary = {};
    returnObjectArrayObject.family.student.name.first = objApplicationSummer.student_name.first;
    returnObjectArrayObject.family.student.name.last = objApplicationSummer.student_name.last;
    returnObjectArrayObject.family.student.name.lastFirst = objApplicationSummer.student_name.last + ', ' + objApplicationSummer.student_name.first;
    returnObjectArrayObject.family.student.name.fullName = objApplicationSummer.student_name.first + ' ' + objApplicationSummer.student_name.last;
    returnObjectArrayObject.family.student.messages = {"dox": ["messages you want the Student only to see"]};
    returnObjectArrayObject.family.parent.primary.memberId = $w("#thisMemberId").value;
    returnObjectArrayObject.family.parent.primary.messages = {"dox": ["messages you want the Primary Parent/Web Account Holder only to see"]};
    $w("#memberIdParent").value = $w("#thisMemberId").value;
    $w("#nameStudent").value = objApplicationSummer.student_name.first + ' ' + objApplicationSummer.student_name.last;
    $w("#namePreferredStudent").value = objApplicationSummer.preferred_name;
    let dobStudent = objApplicationSummer.date_of_birth;
    let gradeStudent = objApplicationSummer.grade_during_the_202021_school_year[0].value;
    console.log(gradeStudent);
    let gradeLevelStudnet = gradeLeveFromGrade(gradeStudent);
    $w("#gradeLevelStudent").value = gradeLevelStudnet;
    $w("#dobStudent").value = dobStudent;
    $w("#nameParentCC").value = $w("#nameParent").value;
    $w("#emailParentCC").value = $w("#emailParent").value;
    $w("#phoneParentCC").value = "(" + $w("#phoneParent").value.substr(0, 3) + ") "
        + $w("#phoneParent").value.substr(3, 3) + "-"
        + $w("#phoneParent").value.substr(-4);
    let address = objApplicationSummer.mailing_address.address;
    let address2 = objApplicationSummer.mailing_address.address2;
    let city = objApplicationSummer.mailing_address.city;
    let state = objApplicationSummer.mailing_address.state;
    let zip = objApplicationSummer.mailing_address.zip;
    if (!address2 || address2.trim().length === 0) {
        $w("#parentAddressBlock").value = `${address}\n ${city}, ${state}  ${zip}`;
    } else {
        $w("#parentAddressBlock").value = `${address}\n ${address2}\n ${city}, ${state}  ${zip}`;
    }

}

export function returnArrayObjectWeek(week, weekNumber, runningTotalObject){
    var returnObjectArray = [];
    var runningTotal = runningTotalObject.runningTotal;
     let emptyArray = [];
      if (typeof week === 'string') {
         return emptyArray;
     } else if (!week){
         return emptyArray;
     }
     const priceFullDay = 345;
     const priceHalfDay = 240;

     //<Billing Object Element>
     const billing = {};
     const dicountEarlyBirdAmount = 50
     const discountEarlyBirdEndDate = Date.parse('May 01 2021 23:59:59 GMT-0500 (Eastern Standard Time)');
    //  const discountEarlyBird = discountEarlyBirdEndDate > returnObjectArrayObject.creationDateUnix ? true : false;
     const discountEarlyBird = true;
     //</Billing Object Element>

     //<Date Arrays Literal>
     let weekDatesStringArray = [
         'NNULL',
         'June 7-11, 2021'
         ,'June 14-18, 2021'
         ,'June 21-25, 2021'
         ,'June 28 - July 2, 2021'
         , 'July 12-16, 2021'
         , 'July 19-23, 2021'
         , 'July 26-30, 2021'
         , 'Aug 2-6, 2021'
         , 'August 9-14, 2021'
        ];

        let weekStartDatesArray = [
            0
            , Date.parse('June 7, 2021 8:00:00 GMT-0500')
            ,Date.parse('June 14, 2021 8:00:00 GMT-0500')
            ,Date.parse('June 21, 2021 8:00:00 GMT-0500')
            ,Date.parse('June 28, 2021 8:00:00 GMT-0500')
            ,Date.parse('July 12, 2021 8:00:00 GMT-0500')
            ,Date.parse('July 19, 2021 8:00:00 GMT-0500')
            ,Date.parse('July 26, 2021 8:00:00 GMT-0500')
            ,Date.parse('August 2, 2021 8:00:00 GMT-0500')
            ,Date.parse('August 9, 2021 8:00:00 GMT-0500')
        ];

        let weekEndDatesArray = [
            0
            , Date.parse('June 11, 2021 17:00:00 GMT-0500')
            ,Date.parse('June 18, 2021 17:00:00 GMT-0500')
            ,Date.parse('June 25, 2021 17:00:00 GMT-0500')
            ,Date.parse('July 2, 2021 17:00:00 GMT-0500')
            ,Date.parse('July 16, 2021 17:00:00 GMT-0500')
            ,Date.parse('July 23, 2021 17:00:00 GMT-0500')
            ,Date.parse('July 30, 2021 17:00:00 GMT-0500')
            ,Date.parse('August 6, 2021 17:00:00 GMT-0500')
            ,Date.parse('August 14, 2021 17:00:00 GMT-0500')
        ];
        //</Date Arrays Literal>

        var label = '';
        var HOLDER = '';
        var firstColon = 0;
    var lastDash = 0;
        
    for (let i = 0; i < week.length; i++) {
        const element = {};
        element.index = i;
        element.weekId = weekNumber;
        runningTotalObject.countWeekArray[weekNumber]++;
        element.dateString = weekDatesStringArray[weekNumber];
        element.dateStart = weekStartDatesArray[weekNumber];
        element.dateEnd = weekEndDatesArray[weekNumber];
        element.value = week[i].value;
        element.billing = {};
        element.billing.discount = [];
        element.billing.discount[i] = {};
        element.message = {};
        HOLDER = week[i].value;
        if (HOLDER.substr(-1) === "H") {
            element.day = "HALF";
            HOLDER = HOLDER.substr(0,(HOLDER.length - 2));
            element.billing.tuition = priceHalfDay;
            runningTotal += priceHalfDay;
        } else {
            element.day = "FULL";
            element.billing.tuition = priceFullDay;
            runningTotal += priceFullDay;
        }
        if (discountEarlyBird) {
            element.billing.discount[i].kind = 'Early Bird';
            element.billing.discount[i].amount = 1 * dicountEarlyBirdAmount;
        }
        else if ("YES" === "NO: Display False Discount?".substr(0,3)){
            element.billing.discount[i].kind = 'Early Bird';
            element.billing.discount[i].amount = 0 * dicountEarlyBirdAmount;
        }
        runningTotal += element.billing.discount.map(a => a.amount).reduce((accumulator, currentValue) => { return accumulator - currentValue }, 0);
        element.courseId = HOLDER;
        label = week[i].label;
        firstColon = label.indexOf(":");
        lastDash = label.lastIndexOf("-");
        HOLDER = label.substr (0, label.indexOf(":"));
        HOLDER = HOLDER.length >= 2 ? HOLDER : "TBD";
        element.gradeLevel = HOLDER;
        element.location = label.substr(lastDash + 1).trim();
        element.courseName = label.substr(firstColon + 1, lastDash - firstColon - 1).trim();;
        // HOLDER = label.substr (0, label.indexOf(":");
        // element.courseName = label;
        // HOLDER = label.substr(lastDash + 1).trim();
        element.billing.runningTotal = runningTotal;

        returnObjectArray[i] = element;
    } //END: for (let i = 0; i < week.length; i++)
    
    runningTotalObject.runningTotal = runningTotal;
    return returnObjectArray;
}// END: function returnArrayObjectWeek(week, weekNumber, runningTotalObject)

export function writeCoursesSwitches(returnObjectArrayObject) {
    let textWeekThis = '';
    let writeMapThis = 0;
    let nextWeekMapIndex = 1;
    let nextWeekHide = 9;//maybe should be coded from somewhere
    var i = 0;
    for ( i = 0; i < returnObjectArrayObject.countWeekArray.length; i++) {
        if (returnObjectArrayObject.countWeekArray[i] === 0) {
            textWeekThis = "#textWeek" + nextWeekHide;
            $w(textWeekThis).hide();
            nextWeekHide--;
        } else if (returnObjectArrayObject.countWeekArray[i] > 0) {
            returnObjectArrayObject.writeMapWeekArray[nextWeekMapIndex] = i;
            nextWeekMapIndex++;            
        }  
    }

    let dlStyle = "font-size: 16px; font-family : 'Avenir Black'; background-color: white;";
    let dtStyle = "color: blue; text-decoration: underline; line-height: 1;";
    let ddStyle = "color: green; text-indent: 55px;";

    let courseArray = returnObjectArrayObject.courses_array;
    let writeMapArray = returnObjectArrayObject.writeMapWeekArray;
    let codeBlockArray = ["NNULL","","","","","","","","",""]
    let weekIdThis =0;
    let weekString = '';
    for ( i = 0; i < courseArray.length; i++) {
        weekIdThis = courseArray[i].weekId;
        if (codeBlockArray[weekIdThis].length === 0) {
            weekString = weekIdThis + ': ' + courseArray[i].dateString;
            codeBlockArray[weekIdThis] = "<dl style='" + dlStyle + "'><dt style='" + dtStyle + "'>" + weekString + "</dt>";               
        }
        codeBlockArray[weekIdThis] += "<dd style='" + ddStyle + "'>" + courseArray[i].courseName + "</dd>";
    } // END: function writeCoursesSwitches(returnObjectArrayObject)
    // codeBlockArray.map((currentValue) => currentValue + '</dl>');
    let mapToBlock = 0;
    let wixTextKey = 0;
    for ( i = 0; i < writeMapArray.length; i++) {
        mapToBlock = writeMapArray[i];
        if (codeBlockArray[mapToBlock] !== 'NNULL' && codeBlockArray[mapToBlock] !== '') { //if HTML in codeBlock
            codeBlockArray[mapToBlock] += "</dl>"; // finish the HTML
            wixTextKey = '#textWeek' + i; //1,2,3...
            $w(wixTextKey).html = codeBlockArray[mapToBlock];
            // console.log('Map HTML in block ' + mapToBlock + ' to Text Block #id ' + wixTextKey);
        }
        // console.log('[all]Map HTML in block ' + mapToBlock + ' to Text Block #id ' + i);
        // if (returnObjectArrayObject.countWeekArray[mapToBlock] === 1) {
        //     console.log('show 1 and ON [switch' + i + '01]');            
        // } else if (returnObjectArrayObject.countWeekArray[mapToBlock] > 1) {
        //     console.log('show ' + returnObjectArrayObject.countWeekArray[mapToBlock] + ' and OFF');           
        // }
        let switchKey = '';
        switch (returnObjectArrayObject.countWeekArray[mapToBlock]) {
            case -999:
                break;           
            case 0:
                break;           
            case 1:
                switchKey = '#switch' + i + '01';
                $w(switchKey).show();
                $w(switchKey).checked = true;
                console.log('show 1 and ON [switch' + i + '01]');            
                break;           
            case 2:
                switchKey = '#switch' + i + '01';
                $w(switchKey).show();
                switchKey = '#switch' + i + '02';
                $w(switchKey).show();
                console.log('show 1 and OFF [switch' + i + '01]');            
                console.log('show 2 and OFF [switch' + i + '02]');            
                break;           
            case 3:
                switchKey = '#switch' + i + '01';
                $w(switchKey).show();
                switchKey = '#switch' + i + '02';
                $w(switchKey).show();
                switchKey = '#switch' + i + '03';
                $w(switchKey).show();
                // console.log('show 1 and OFF [switch' + i + '01]');            
                // console.log('show 2 and OFF [switch' + i + '02]');            
                // console.log('show 3 and OFF [switch' + i + '03]'); 
                break;           
                
            default:
                console.log('warn: Users Selected more than 3 for a single week'); 
                break;
        }
    }
    console.log("codeBlockArray");
    console.log(codeBlockArray);


}
export function validateGradeVsAge(currentGrade, DOB) {
    return Number.random * 10 > 5 ? true : false;
}
export function gradeLeveFromGrade(currentGrade) {
    /*<ERROR is Appropriate in both cases>
    currentGrade = currentGrade ? Number(currentGrade) : 0;
    currentGrade = Number.isNaN(currentGrade) ? 0 : Number(currentGrade);
    </ERROR is Appropriate in both cases>*/
    currentGrade = Number(currentGrade);
    let gradeLevel = 'ERROR';
    gradeLevel = currentGrade <= 2 ? 'K-2' : gradeLevel;
    gradeLevel = currentGrade > 2 ? '3-5' : gradeLevel;
    gradeLevel = currentGrade > 5 ? '6-8' : gradeLevel;
    gradeLevel = currentGrade > 8 ? '9-12' : gradeLevel;
    return gradeLevel

}



export function btnMemberMatch_click(event, $w) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
    let $item = $w.at(event.context);
    let targetItem = $w("#dsMembers").getCurrentItem();
    console.log(targetItem);
    $w("#thisMemberId").value = targetItem._id;
    $w("#btnConfirmClasses").show();

}

export function btnEnroll_click(event,returnObjectArrayObject) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
    let isValid = validateEnrollment(returnObjectArrayObject);
    if (!isValid) {
        return false;
    }
    return true; 
    //create courses Checked Courses
    //create invoice for Courses to Stripe
    // etc., etc., etc.
}

export function validateEnrollment(returnObjectArrayObject){
    returnObjectArrayObject.validation = {};
    returnObjectArrayObject.validation.message = {};
    returnObjectArrayObject.validation.message.error = [];
    returnObjectArrayObject.validation.message.warn = [];
    returnObjectArrayObject.validation.message.fyi = [];
    returnObjectArrayObject.validation.message.btw = [];
    returnObjectArrayObject.validation.primaryBoolean = true;
    return returnObjectArrayObject.validation.primaryBoolean;



    return true;
}

export function checkoutBox_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}

export function goToTopAndCleanup_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
    cleanUp();
}
export function cleanUp() {
    let switchKey = '';
    let week = 0;
    let instance = 0;
    for (var i = 0; i < 9; i++) {
       week = i + 1;
       for (var j = 0; j < 3; j++) {
           instance = j + 1;
            switchKey = '#switch' + week + '0' + instance;
            $w(switchKey).checked = false;
            $w(switchKey).hide();
       }
    }
    $w('#checkoutBox').changeState("First");
    // ø cleanup Member Strip data
    // ø cleanup Web-Hook Repeater Strip (except for yellow dot)
    // ø \_ that is, eventually, it will disappear for having been resolved
    $w("#anchorTop").scrollTo();
    return true;
}



export function btnFauxEnroll_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
    $w('#checkoutBox').changeState("Second");
}