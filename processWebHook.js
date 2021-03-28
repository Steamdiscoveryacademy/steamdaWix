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
    // const develObject = {"use20210324":"Testing Validation Logic"};
    // console.log(develObject);

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
    $w("#btnAssignNewMember").show();
}

export function btnAssignNewMember_click(event) {
    $w("#thisMemberId").value = "INSTANTIATE";
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
    $w("#superObjectHolder").value = JSON.stringify(returnObjectArrayObject, undefined, 4);
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
    let preferredName = objApplicationSummer.preferred_name;
    preferredName = preferredName.length > 0 ? preferredName : objApplicationSummer.student_name.first;
    returnObjectArrayObject.family.student.name.preferred = preferredName;
    returnObjectArrayObject.family.student.name.lastFirst = objApplicationSummer.student_name.last + ', ' + preferredName;
    returnObjectArrayObject.family.student.name.fullName = preferredName + ' ' + objApplicationSummer.student_name.last;
    returnObjectArrayObject.family.student.messages = {"dox": ["messages you want the Student only to see"]};
    returnObjectArrayObject.family.parent.primary.memberId = $w("#thisMemberId").value;
    returnObjectArrayObject.family.parent.primary.messages = {"dox": ["messages you want the Primary Parent/Web Account Holder only to see"]};
    $w("#memberIdParent").value = $w("#thisMemberId").value;
    $w("#nameStudent").value = objApplicationSummer.student_name.first + ' ' + objApplicationSummer.student_name.last;
    $w("#namePreferredStudent").value = objApplicationSummer.preferred_name;
    let dobStudent = objApplicationSummer.date_of_birth;
    returnObjectArrayObject.family.student.dobString = dobStudent;
    let currentGrade = parseInt(objApplicationSummer.grade_during_the_202021_school_year[0].value);
    let currentGradeString = objApplicationSummer.grade_during_the_202021_school_year[0].label;
    returnObjectArrayObject.family.student.currentGrade = currentGrade;
    returnObjectArrayObject.family.student.currentGradeString = currentGradeString;
    console.log('[' + currentGrade + '] ' + currentGradeString);
    let gradeLevelStudent = gradeLeveFromGrade(currentGrade);
    returnObjectArrayObject.family.student.currentGradeLevel = gradeLevelStudent;
    $w("#gradeLevelStudent").value = gradeLevelStudent;
    $w("#dobStudent").value = dobStudent;
    returnObjectArrayObject.family.parent.primary.last = objApplicationSummer.primary_parentguardian_name.last;
    returnObjectArrayObject.family.parent.primary.first = objApplicationSummer.primary_parentguardian_name.first;
    returnObjectArrayObject.family.parent.primary.fullName = objApplicationSummer.primary_parentguardian_name.first + ' ' + objApplicationSummer.primary_parentguardian_name.last;
    returnObjectArrayObject.family.parent.primary.lastFirst = objApplicationSummer.primary_parentguardian_name.last + ', ' + objApplicationSummer.primary_parentguardian_name.first;
    $w("#nameParentCC").value = $w("#nameParent").value;
    $w("#emailParentCC").value = $w("#emailParent").value;
    $w("#phoneParentCC").value = "(" + $w("#phoneParent").value.substr(0, 3) + ") "
        + $w("#phoneParent").value.substr(3, 3) + "-"
        + $w("#phoneParent").value.substr(-4);
    let address = objApplicationSummer.mailing_address.address;
    let address2 = objApplicationSummer.mailing_address.address2;
    let city = objApplicationSummer.mailing_address.city;
    let state = objApplicationSummer.mailing_address.state;
    let zip = objApplicationSummer.mailing_address.zip
    let familyAddress = "";
    if (!address2 || address2.trim().length === 0) {
        familyAddress = `${address}\n ${city}, ${state}  ${zip}`;
    } else {
        familyAddress = `${address}\n ${address2}\n ${city}, ${state}  ${zip}`;
    }
    $w("#parentAddressBlock").value = familyAddress;
    returnObjectArrayObject.family.addresses = {};
    returnObjectArrayObject.family.addresses.mailing = objApplicationSummer.mailing_address;
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

    let fieldsetStyle = "\"background-color: LemonChiffon; border: SteelBlue; border-radius: 5px; border-style: solid solid solid none;\"";
    let legendStyle = "\"font-size: 16px; font-family : 'Avenir Black'; color: SteelBlue; background-color: LemonChiffon;\"";
    let ulStyle = "\"list-style-type: none;\"";
    let liStyle = "\"font-size: 16px; margin: 10px; font-family : 'Avenir Black';color: SteelBlue; font-style: italic; line-height: 1;\"";

    let courseArray = returnObjectArrayObject.courses_array;
    let writeMapArray = returnObjectArrayObject.writeMapWeekArray;
    let codeBlockArray = ["NNULL","","","","","","","","",""]
    let weekIdThis =0;
    let weekString = '';
    for ( i = 0; i < courseArray.length; i++) {
        weekIdThis = courseArray[i].weekId;
        if (codeBlockArray[weekIdThis].length === 0) {
            weekString = 'Week ' +weekIdThis + ': ' + courseArray[i].dateString;
            // codeBlockArray[weekIdThis] = "<dl style='" + dlStyle + "'><dt style='" + dtStyle + "'>" + weekString + "</dt>";               
            codeBlockArray[weekIdThis] = "<fieldset style=" + fieldsetStyle + ">"
                + "<legend style=" + legendStyle + ">" + weekString + "</legend>";
            codeBlockArray[weekIdThis] += "<ul style=" + ulStyle + ">";
        }
        codeBlockArray[weekIdThis] += "<li style=" + liStyle + ">" + courseArray[i].courseName + "</li>";
    } // END: function writeCoursesSwitches(returnObjectArrayObject)
    let mapToBlock = 0;
    let wixTextKey = '';
    for ( i = 0; i < writeMapArray.length; i++) {
        mapToBlock = writeMapArray[i];
        if (codeBlockArray[mapToBlock] !== 'NNULL' && codeBlockArray[mapToBlock] !== '') { //if HTML in codeBlock
            codeBlockArray[mapToBlock] += "</ul></fieldset>"; // finish the HTML
            wixTextKey = '#textWeek' + i; //1,2,3...
            $w(wixTextKey).html = codeBlockArray[mapToBlock];
        }
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
                break;           
                
            default:
                console.log('warn: Users Selected more than 3 for a single week'); 
                break;
        }
    }
    // console.log("codeBlockArray");
    // console.log(codeBlockArray);


}
export function validateGradeVsAge(currentGrade, DOB) {
    // return Number.random * 10 > 5 ? true : false;
    return true;
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
	// export function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
    let $item = $w.at(event.context);
    let targetItem = $w("#dsMembers").getCurrentItem();
    console.log(targetItem);
    $w("#thisMemberId").value = targetItem._id;
    $w("#btnConfirmClasses").show();

}

export function btnEnroll_click(event,returnObjectArrayObject) {
	// export function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
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
	// export function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}

export function goToTopAndCleanup_click(event) {
	// export function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
    cleanUp();
}
export function cleanUp(returnObjectArrayObject, runningTotalObject, objApplicationSummer) {
    //<confirmCourse>
    let switchKey = '';
    let weekTextKey = '';
    let week = 0;
    let instance = 0;
    for (var i = 0; i < 9; i++) {
       week = i + 1;
        weekTextKey = '#textWeek' + week;
        $w(weekTextKey).show();

       for (var j = 0; j < 3; j++) {
           instance = j + 1;
            switchKey = '#switch' + week + '0' + instance;
            $w(switchKey).checked = false;
            $w(switchKey).hide();
       }
    }
    displayErrors();
    let unsetElementsArray = [
        "#thisKey"
        ,"#thisTitle"
        ,"#thisSource"
        ,"#thisPayload"
        ,"#thisWebhookId"
        ,"#thisPayloadId"
        ,"#thisCurrentStatus"
        ,"#thisCurrentStatusStamp"
        ,"#thisResolvedStatus"
        ,"#thisResolvedStatusStamp"
        ,"#nameParent"
        ,"#emailParent"
        ,"#phoneParent"
        ,"#memberIdParent"
        ,"#nameStudent"
        ,"#namePreferredStudent"
        ,"#gradeLevelStudent"
        ,"#dobStudent"
        ,"#nameParentCC"
        ,"#emailParentCC"
        ,"#phoneParentCC"
        ,"#parentAddressBlock"         
        ,"#superObjectHolder"
        ,"#superEnrollmentObject"
]

    for ( let element of unsetElementsArray) {
        $w(element).value = null;
    }
    let switchErrorIdArray = ["#swtchOverloadZeroCourses", "#swtchOverloadTwoCourses", "#swtchOverloadGradeCourse", "#swtchOverloaGradeDob"];
    for (let index = 0; index < switchErrorIdArray.length; index++) {
        // if (simpleSwitchByIdArray.indexOf(simpleHideByIdArray[index]) >= 0){
        //     $w(simpleHideByIdArray[index]).checked = false;   
        // }
        $w(switchErrorIdArray[index]).checked = false;   
        $w(switchErrorIdArray[index]).hide();   
    }
    let hideArray = ["#boxReadyToEnroll"];
    for ( let element of hideArray) {
        $w(element).hide();
    }

    $w('#checkoutBox').changeState("First");
    //</confirmCourse>
    //<memberAssignment>
    $w("#btnAssignNewMember").hide();
    $w("#btnConfirmClasses").hide();
    $w("#thisMemberId").value = null;
    //</memberAssignment>
    //<webhookRepeater>
    //</webhookRepeater>
    objApplicationSummer = undefined;
    returnObjectArrayObject = undefined;
    runningTotalObject = undefined;
    $w("#anchorTop").scrollTo();
    // ø cleanup Member Strip data
    // ø cleanup Web-Hook Repeater Strip (except for yellow dot)
    // ø \_ that is, eventually, it will disappear for having been resolved
    // ø empty Object(s)
    return true;
}

export function btnProcessEnrollment_click(event) {
	// export function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
    $w('#checkoutBox').changeState("Second");
}

export function btnValidateEnrollment_click(event, returnObjectArrayObject) {
    $w("#boxReadyToEnroll").hide();
    let dog = "Chester";
    console.log(dog);
    console.log(
    "%cHardCoded gradeLevel: 3-5 [Line ~946]",
    `color: #fff;
    background-color: #EA4335;
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 8px;`
    );

    // return;
    // console.log({overloadedErrorArray});
    returnObjectArrayObject = JSON.parse($w("#superObjectHolder").value);
    console.log(returnObjectArrayObject);
    // return;
    fillBlockMapArray(returnObjectArrayObject);
    validateCourseGradeLevelMatch(returnObjectArrayObject);
    let enrollmentErrorArray = returnObjectArrayObject.enrollment.errorArray;
    let overloadedErrorArray = getOverloadedErrors();
    returnObjectArrayObject.enrollment.overloadedErrorArray = overloadedErrorArray;
    getStudentGradeMisMatchDob(returnObjectArrayObject);
    
    let errorArray = returnObjectArrayObject.enrollment.errorArray;
    let errorNoOverloadArray = [];
    let anyErrorWhatsoever = false;
    for (let index = 0; index < errorArray.length; index++) {
        let errorThis = errorArray[index];
        let overloadedThis = overloadedErrorArray[index];
        let finalErrorThis = errorThis && !overloadedThis ? true : false;
        errorNoOverloadArray[index] = finalErrorThis;
        anyErrorWhatsoever = finalErrorThis ? true : anyErrorWhatsoever;
    }
    returnObjectArrayObject.enrollment.errorNoOverloadArray = errorNoOverloadArray;
    returnObjectArrayObject.enrollment.anyErrorWhatsoever = anyErrorWhatsoever;
    if (!anyErrorWhatsoever){
        $w("#boxReadyToEnroll").show();
    }

    displayErrors(enrollmentErrorArray);
    $w("#superEnrollmentObject").value = JSON.stringify(returnObjectArrayObject, undefined, 4);
    let develMessage = "Developer Message:\n";
    develMessage += errorArray.toString() + " :EA" + "\n";
    develMessage += overloadedErrorArray.toString() + " :OA" + "\n";
    develMessage += errorNoOverloadArray.toString() + " :ENO" + "\n";
    develMessage += anyErrorWhatsoever ? "Hide Message" : "Show Message";
    develMessage = develMessage.replace(/true/gi, "truue");
    develMessage = develMessage.replace(/,/g, "|");
    $w("#develObjectHolder").value = develMessage;
    /**
     * <REALLY NOT USING>
    const develObject = isJson($w("#develObjectHolder").value) ?? {"use20210324":"Testing Validation Logic","clickCount": 0};
    let enrollmentErrorArray = [];
    let develEnrollmentErrorArray = [];
    let enrollmentErrorOverloadArray = [];
    let NOTICE = "YES - Use the Real Logic for the Big Enrollment Object"
    if (NOTICE.substr(0,3) === "NO ") {
       validateEnrollment(returnObjectArrayObject); 
    } else {
        //<Test by Randomized Boolean Array>
        //<Randomize>
        let randomize = false; 
        if( typeof develObject.enrollmentErrorArray === 'undefined') {
            randomize = true;
        } 
        console.log("[617]randomize: " + randomize);
        develEnrollmentErrorArray = develObject.enrollmentErrorArray ?? [false, false, false, false];
        console.log("[619]develEnrollmentErrorArray: ");
        console.log(develEnrollmentErrorArray);

        enrollmentErrorArray = develEnrollmentErrorArray;

     */
    /**
     * </REALLY NOT USING>
     */

    /* 
        enrollmentErrorOverloadArray = getOverloadedErrors();
        console.log("enrollmentErrorOverloadArray: ")
        console.log(enrollmentErrorOverloadArray)
        // for (let index = 0; index < enrollmentErrorArray.length; index++) {}
        if (randomize) {
            let tempBoolean = false;
            for (let index = 0; index < enrollmentErrorArray.length; index++) {
                tempBoolean = Math.floor(Math.random() * 2) === 1 ? true : false;
                enrollmentErrorArray[index] = tempBoolean;
            }
        }
        //</Randomize>
        //</Test by Randomized Boolean Array>
    }
    // $w("#superObjectHolder").value = JSON.stringify(returnObjectArrayObject, undefined, 4);


    develObject.enrollmentErrorArray = enrollmentErrorArray;
    develObject.enrollmentErrorOverloadArray = enrollmentErrorOverloadArray;
    console.log("[622]develObject: ");
    console.log(develObject);
    develObject.clickCount++;
    $w("#develObjectHolder").value = JSON.stringify(develObject, undefined, 4);
    displayErrors(enrollmentErrorArray);
 */
}

export function getOverloadedErrors(){
    let switchIdArray = ["#swtchOverloadZeroCourses", "#swtchOverloadTwoCourses", "#swtchOverloadGradeCourse", "#swtchOverloaGradeDob"];
    let overloadedErrorArray = [];
    for (let index = 0; index < switchIdArray.length; index++) {
        overloadedErrorArray[index] = $w(switchIdArray[index]).checked;
    }
    return overloadedErrorArray;
}

export function displayErrors(enrollmentErrorArray = [false, false, false, false]) {
    console.log("enrollmentErrorArray: ");
    console.log(enrollmentErrorArray);
    let enrollmentErrorOverloadArray = getOverloadedErrors();
    const showElementsObject = {
            "showArray": [
                {
                "index": 0,
                "show": ["#swtchOverloadZeroCourses", "#errorZeroCoursesText"]
                },
                { "index": 1, "show": ["#swtchOverloadTwoCourses", "#errorTwpCoursesText"] },
                {
                "index": 2,
                "show": ["#swtchOverloadGradeCourse", "#errorGradeCourseText"]
                },
                { "index": 3, "show": ["#swtchOverloaGradeDob", "#errorGradeDobText"] }
            ]
        }
    let simpleShowByIdArray = [];
    let simpleHideByIdArray = [];
    let simpleCheckByIdArray = [];
    let simpleSwitchByIdArray = ["#swtchOverloadZeroCourses", "#swtchOverloadTwoCourses", "#swtchOverloadGradeCourse", "#swtchOverloaGradeDob"];
    let index = 0;
    for (index = 0; index < enrollmentErrorArray.length; index++) {
        if (enrollmentErrorArray[index] === true) {
            if (showElementsObject.showArray[index].index === index) {
                simpleShowByIdArray = simpleShowByIdArray.concat(showElementsObject.showArray[index].show);
            }
            if (enrollmentErrorArray[index] && enrollmentErrorOverloadArray[index]) {
                simpleCheckByIdArray[simpleCheckByIdArray.length] = simpleSwitchByIdArray[index];
            }
        
        } else {
            if (showElementsObject.showArray[index].index === index) {
                simpleHideByIdArray = simpleHideByIdArray.concat(showElementsObject.showArray[index].show);
            }
        }
    }
    console.log(simpleShowByIdArray);
    console.log(simpleHideByIdArray);
    for (index = 0; index < simpleShowByIdArray.length; index++) {
        if (simpleSwitchByIdArray.indexOf(simpleShowByIdArray[index]) >= 0){
            $w(simpleShowByIdArray[index]).checked = false;   
        }
        $w(simpleShowByIdArray[index]).show();   
    }
    for (index = 0; index < simpleCheckByIdArray.length; index++) {
        // if (simpleSwitchByIdArray.indexOf(simpleHideByIdArray[index]) >= 0){
        //     $w(simpleHideByIdArray[index]).checked = false;   
        // }
        $w(simpleCheckByIdArray[index]).checked = true;   
    }
    for (index = 0; index < simpleHideByIdArray.length; index++) {
        // if (simpleSwitchByIdArray.indexOf(simpleHideByIdArray[index]) >= 0){
        //     $w(simpleHideByIdArray[index]).checked = false;   
        // }
        $w(simpleHideByIdArray[index]).hide();   
    }
    
}

/**
 * <Validate Enrollment>
 */

 let marais = "dog";

 // fillBlockMapArray(enrollmentObject);
 // getStudentGradeMisMatchDob(enrollmentObject);
 
//  document.getElementById("code").innerHTML = JSON.stringify(enrollmentObject, undefined, 4);
 
 export function fillBlockMapArray(enrollmentObject) {
     let testing = false;
     // let testing = false;
     // let countWeekArray = enrollmentObject.countWeekArray;
     // let writeMapWeekArray = enrollmentObject.writeMapWeekArray;
     let blockMapArray = {
         "blockMapErrors": {
             "zeroCheckedCount": -7,
             "multipleCheckedCount": -7
         },
         "blockMapArray": [
             {
                 "blockMap": -999,
                 "week": -999,
                 "switchIdArray": [-999],
                 "selectedCount": -999,
                 "checkedCount": -999,
                 "zeroChecked": -999,
                 "multipleChecked": -999,
                 "gradeMismatchCount": -999
             },
             {
                 "blockMap": 1,
                 "week": -7,
                 "switchIdArray": ["#switch101", "#switch102", "#switch103"],
                 "selectedCount": -7,
                 "checkedCount": -7,
                 "zeroChecked": -7,
                 "multipleChecked": -7,
                 "gradeMismatchCount": -7
             },
             {
                 "blockMap": 2,
                 "week": -7,
                 "switchIdArray": ["#switch201", "#switch202", "#switch203"],
                 "selectedCount": -7,
                 "checkedCount": -7,
                 "zeroChecked": -7,
                 "multipleChecked": -7,
                 "gradeMismatchCount": -7
             },
             {
                 "blockMap": 3,
                 "week": -7,
                 "switchIdArray": ["#switch301", "#switch302", "#switch303"],
                 "selectedCount": -7,
                 "checkedCount": -7,
                 "zeroChecked": -7,
                 "multipleChecked": -7,
                 "gradeMismatchCount": -7
             },
             {
                 "blockMap": 4,
                 "week": -7,
                 "switchIdArray": ["#switch401", "#switch402", "#switch403"],
                 "selectedCount": -7,
                 "checkedCount": -7,
                 "zeroChecked": -7,
                 "multipleChecked": -7,
                 "gradeMismatchCount": -7
             },
             {
                 "blockMap": 5,
                 "week": -7,
                 "switchIdArray": ["#switch501", "#switch502", "#switch503"],
                 "selectedCount": -7,
                 "checkedCount": -7,
                 "zeroChecked": -7,
                 "multipleChecked": -7,
                 "gradeMismatchCount": -7
             },
             {
                 "blockMap": 6,
                 "week": -7,
                 "switchIdArray": ["#switch601", "#switch602", "#switch603"],
                 "selectedCount": -7,
                 "checkedCount": -7,
                 "zeroChecked": -7,
                 "multipleChecked": -7,
                 "gradeMismatchCount": -7
             },
             {
                 "blockMap": 7,
                 "week": -7,
                 "switchIdArray": ["#switch701", "#switch702", "#switch703"],
                 "selectedCount": -7,
                 "checkedCount": -7,
                 "zeroChecked": -7,
                 "multipleChecked": -7,
                 "gradeMismatchCount": -7
             },
             {
                 "blockMap": 8,
                 "week": -7,
                 "switchIdArray": ["#switch801", "#switch802", "#switch803"],
                 "selectedCount": -7,
                 "checkedCount": -7,
                 "zeroChecked": -7,
                 "multipleChecked": -7,
                 "gradeMismatchCount": -7
             },
             {
                 "blockMap": 9,
                 "week": -7,
                 "switchIdArray": ["#switch901", "#switch902", "#switch903"],
                 "selectedCount": -7,
                 "checkedCount": -7,
                 "zeroChecked": -7,
                 "multipleChecked": -7,
                 "gradeMismatchCount": -7
             }
         ]
     };
     let studentGrade = parseInt(enrollmentObject.family.student.currentGrade);
     let index = 0;
     let weekOfBlockIndex = -7;
     let element = {};
     let jindex = 0;
     let jisChecked = false;
     let jelement = "";
     let zeroCheckedCount = 0;
     let multipleCheckedCount = 0;
     let gradeMisMatchCount = 0;
     for (index = 1; index < blockMapArray.blockMapArray.length; index++) {
         element = blockMapArray.blockMapArray[index];
         weekOfBlockIndex = enrollmentObject.writeMapWeekArray[index];
         element.week = weekOfBlockIndex;
         if (weekOfBlockIndex + 0 > 0) {
             // console.log(weekOfBlockIndex);
             // console.log(enrollmentObject.countWeekArray[weekOfBlockIndex]);
             element.selectedCount = enrollmentObject.countWeekArray[weekOfBlockIndex];
         } else {
             element.selectedCount = 0;
         }
         element.checkedCount = 0;
         element.gradeMismatchCount = 0;
         for (let jindex = 0; jindex < element.switchIdArray.length; jindex++) {
             let jelement = element.switchIdArray[jindex];
             if (testing) {
                 element.checkedCount = Math.floor(Math.random() * (element.selectedCount + 1));
             } else if (testing) {
                 jisChecked = $w(jelement).checked;
                 element.checkedCount += jisChecked ? 1 : 0;
                 // FOR: weekOfBlockIndex is WEEK 1 thru 9
                 // AND: jindex is Index of Week's Course 0 thru 2
                 // AND: jisChecked
                 // THEN: getGradeLevel
                 let gradeLevel = "3-5";
                 /**
                  * "courses_array": [
                      {
                        "index": 0,
                        "weekId": 1,
                        ...
                  */
                //  console.log({gradeLevel});
                 let minString = gradeLevel.split("-")[0];
                 let minGrade = minString === "K" ? 0 : parseInt(minString);
                 let maxString = gradeLevel.split("-")[1];
                 let maxGrade = parseInt(maxString);
                 let misMatch = false;
                 misMatch = studentGrade < minGrade ? true : misMatch;
                 misMatch = studentGrade > maxGrade ? true : misMatch;
                 console.log({misMatch});
                 element.gradeMismatchCount += misMatch ? 1 : 0;
 
             }
         }
         element.zeroChecked = element.checkedCount === 0 ? 1 : 0;
         element.zeroChecked = element.selectedCount === 0 ? 0 : element.zeroChecked;
         zeroCheckedCount += element.zeroChecked;
         element.multipleChecked = element.checkedCount > 1 ? 1 : 0;
         multipleCheckedCount += element.multipleChecked;

 
 
     }
     blockMapArray.blockMapErrors.zeroCheckedCount = zeroCheckedCount;
     blockMapArray.blockMapErrors.multipleCheckedCount = multipleCheckedCount;
     enrollmentObject.blockMapArray = blockMapArray;
     enrollmentObject.enrollment = {};
     enrollmentObject.enrollment.errorArray = [];
     enrollmentObject.enrollment.errorArray[0] = blockMapArray.blockMapErrors.zeroCheckedCount > 0 ? true : false;
     enrollmentObject.enrollment.errorArray[1] = blockMapArray.blockMapErrors.multipleCheckedCount > 0 ? true : false;
     enrollmentObject.enrollment.errorArray[2] = blockMapArray.blockMapErrors.multipleCheckedCount > 0 ? true : false;
    //  return blockMapArray;
 
     //  return enrollmentObject + " Chester!";
 }
 
 export function getCoursesSwitched (enrollmentObject) {
     
 }
 
 export function getStudentGradeMisMatchDob(enrollmentObject) {
     enrollmentObject.enrollment.messages = {};
     enrollmentObject.enrollment.messages.dox = ["Zero Checked","Multible Checked","Student-Course GradeLevel","Grade-DOB","messaging specifically for the Enrollment Event"];
     enrollmentObject.enrollment.messages.error = [];
     enrollmentObject.enrollment.messages.warn = [];
     enrollmentObject.enrollment.messages.fyi = [];
     enrollmentObject.enrollment.messages.btw = [];
     //http://charlottesvilleschools.org/home/programs-activities/kindergarten/
     //In order to enroll, potential kindergarteners must be 5 years old by September 30.
     const monthK = 9;
     const dayK = 30;
     let now = new Date;
     const yearK = now.getFullYear()
     let dob = new Date(enrollmentObject.family.student.dobString);
     let dobString = enrollmentObject.family.student.dobString;
     console.log(dobString);
     console.log(dob);
     // enrollmentObject.family.student.dobString = dobString;
     enrollmentObject.family.student.dob = {};
     enrollmentObject.family.student.dob.date = dob;
     let month = dob.getMonth() + 1;
     enrollmentObject.family.student.dob.month = month;
     let day = dob.getDate();
     enrollmentObject.family.student.dob.day = day;
     let year = dob.getFullYear();
     enrollmentObject.family.student.dob.year = year;
     let grade = parseInt(enrollmentObject.family.student.currentGrade);
     let ageK = yearK - year;
     let minusK = 0;
     minusK = month < monthK ? 1 : minusK;
     minusK = month === monthK  && day < dayK ? 1 : minusK;
     ageK -= minusK;
     ageK -= grade; 
     console.log("ageK: " + ageK);
     let ageError = false
     let ageWarning = false
     ageError = Math.abs(ageK - 5) > 1 ? true : false;
     ageWarning = !ageError && Math.abs(ageK - 5) > 0 ? true : false;
     console.log("ageError: " + ageError);
     console.log("ageWarning: " + ageWarning);
     enrollmentObject.enrollment.errorArray[3] = ageError;
     if (ageWarning) {
         enrollmentObject.enrollment.messages.warn[enrollmentObject.enrollment.messages.warn.length] = "Student Grade is a Mismatch with Date-of-Birth (1 year)"
     }
 }

function validateCourseGradeLevelMatch(superEnrollmentObject){
    let studentCurrentGrade = superEnrollmentObject.family.student.currentGrade;
    console.log({studentCurrentGrade})
    let weekIndexWas = 0
    let weekWas = 0
    let courseCardinality = 0
    let switchKey = "ZXZ";
    let mismatchThis = false;
    let mismatchCount = 0;
    let switched = false;
    let minString = "Z";
    let minGrade = -7;
    let maxString = "Z";
    let maxGrade = -7;
    let misMatch = false;
    superEnrollmentObject.courses_array.forEach(element => {
        weekIndexWas = element.WeekId === weekWas ? weekIndexWas : weekIndexWas++;
        weekWas = element.WeekId;
        courseCardinality = element.index++;
        switchKey = "#switch" + weekIndexWas + "0" + courseCardinality;
        switched = $w(switchKey).checked;
        // switched = Math.random() >= 0.5;
        // switched = true;
        //<Better Logic>
        misMatch = studentCurrentGrade < minGrade ? true : misMatch;
        misMatch = studentCurrentGrade > maxGrade ? true : misMatch;
        misMatch = switched ? misMatch : false;
        console.log({misMatch});
        element.gradeMismatchCount += misMatch ? 1 : 0;
        //</Better Logic>

        //<Abandined Logic>
        // mismatchThis = false;
        // mismatchThis = studentCurrentGrade === element.gradeLevel ? false : true;
        // mismatchThis = switched ? mismatchThis : false;
        // mismatchCount += mismatchThis ? 1 : 0;
        //</Abandined Logic>
    });
    superEnrollmentObject.blockMapArray.blockMapErrors.gradeLevelMismatchCount = mismatchCount;
    console.log({mismatchCount});
    superEnrollmentObject.enrollment.errorArray[2] = mismatchCount === 0 ? false : true;
}

// <Validate Enrollment>

/**
 * <Utility Functions
 */
export function isJson(str) {
    let parsed = "let";
    try {
        parsed = JSON.parse(str);
    } catch (e) {
        return false;
    }
    return parsed;
}
//</Utility Functions>