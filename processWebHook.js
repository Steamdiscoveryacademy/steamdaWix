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
    $w("#memberIdParent").value = $w("#thisMemberId").value;
    var objApplicationSummer = JSON.parse($w('#thisPayload').value);
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



export function htmlFunRandomBtn_click(event) {
    //<Un-Comment one or the Other to Enable/Disable thid DEMO>
    let htmlFunButton_enabled = true;
    //let htmlFunButton_enabled = false;
    if (htmlFunButton_enabled === false) {
        return false;
    }
    //</Un-Comment one or the Other to Enable/Disable thid DEMO>
    let weeksCount = 9 - Math.floor(Math.random() * 5);
    // let weeksCount = 9;
    $w("#weeksCount").value = weeksCount;
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
    if (weeksCount >= 1) {
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
        $w("#textWeek1").show();
    } else {
        $w("#textWeek1").hide();
    }
    //</Week 1>

    //<Week 2>
    $w("#switch201").hide();
    $w("#switch202").hide();
    $w("#switch203").hide();
    if (weeksCount >= 2) {
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
        $w("#textWeek2").show();
    } else {
        $w("#textWeek2").hide();
    }
    //</Week 2>

    //<Week 3>
    $w("#switch301").hide();
    $w("#switch302").hide();
    $w("#switch303").hide();
    if (weeksCount >= 3) {
        let textWeek3 = "<dl style=" + dlStyle + ">"
            + "<dh style='" + dhStyle + "'>Week 3: June 14-18 2021</dh>";
        if (classesWeekThree >= 1) {
            textWeek3 += "<dd style='" + ddStyle + "'>From Ada Lovelace to Grace Hopper</li></dd>";
            $w("#switch301").show();
            $w("#switch301").checked = false;
        }
        if (classesWeekThree >= 2) {
            textWeek3 += "<dd style='" + ddStyle + "'>Playing Bongo's Like Richard Feynman</li></dd>";
            $w("#switch302").show();
            $w("#switch302").checked = false;
        }
        if (classesWeekThree >= 3) {
            textWeek3 += "<dd style='" + ddStyle + "'>The Eels and the Multiverse Theory</li></dd>";
            $w("#switch303").show();
            $w("#switch303").checked = false;
        }
            textWeek3 += "</dl>"
            ;
        $w("#textWeek3").html = textWeek3;
        $w("#textWeek3").show();
    } else {
        $w("#textWeek3").hide();
    }
    //</Week 3>

    //<Week 4>
    $w("#switch401").hide();
    $w("#switch402").hide();
    $w("#switch403").hide();
    if (weeksCount >= 4) {
        let textWeek4 = "<dl style=" + dlStyle + ">"
            + "<dh style='" + dhStyle + "'>Week 4: June 14-18 2021</dh>";
        if (classesWeekFour >= 1) {
            textWeek4 += "<dd style='" + ddStyle + "'>From Ada Lovelace to Grace Hopper</li></dd>";
            $w("#switch401").show();
            $w("#switch401").checked = false;
        }
        if (classesWeekFour >= 2) {
            textWeek4 += "<dd style='" + ddStyle + "'>Playing Bongo's Like Richard Feynman</li></dd>";
            $w("#switch402").show();
            $w("#switch402").checked = false;
        }
        if (classesWeekFour >= 3) {
            textWeek4 += "<dd style='" + ddStyle + "'>The Eels and the Multiverse Theory</li></dd>";
            $w("#switch403").show();
            $w("#switch403").checked = false;
        }
            textWeek4 += "</dl>"
            ;
        $w("#textWeek4").html = textWeek4;
        $w("#textWeek4").show();
    } else {
        $w("#textWeek4").hide();
    }
    //</Week 4>

    //<Week 5>
    $w("#switch501").hide();
    $w("#switch502").hide();
    $w("#switch503").hide();
    if (weeksCount >= 5) {
        let textWeek5 = "<dl style=" + dlStyle + ">"
            + "<dh style='" + dhStyle + "'>Week 5: June 14-18 2021</dh>";
        if (classesWeekFive >= 1) {
            textWeek5 += "<dd style='" + ddStyle + "'>From Ada Lovelace to Grace Hopper</li></dd>";
            $w("#switch501").show();
            $w("#switch501").checked = false;
        }
        if (classesWeekFive >= 2) {
            textWeek5 += "<dd style='" + ddStyle + "'>Playing Bongo's Like Richard Feynman</li></dd>";
            $w("#switch502").show();
            $w("#switch502").checked = false;
        }
        if (classesWeekFive >= 3) {
            textWeek5 += "<dd style='" + ddStyle + "'>The Eels and the Multiverse Theory</li></dd>";
            $w("#switch503").show();
            $w("#switch503").checked = false;
        }
        textWeek5 += "</dl>"
            ;
        $w("#textWeek5").html = textWeek5;
        $w("#textWeek5").show();
    } else {
        $w("#textWeek5").hide();
    }
    //</Week 5>

    //<Week 6>
    $w("#switch601").hide();
    $w("#switch602").hide();
    $w("#switch603").hide();
    if (weeksCount >= 6) {
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
        $w("#textWeek6").html = textWeek6;
        $w("#textWeek6").show();
    } else {
        $w("#textWeek6").hide();
    }
    //</Week 6>

    //<Week 7>
    $w("#switch701").hide();
    $w("#switch702").hide();
    $w("#switch703").hide();
    if (weeksCount >= 7) {
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
        $w("#textWeek7").html = textWeek7;
        $w("#textWeek7").show();
    } else {
        $w("#textWeek7").hide();
    }
    //</Week 7>

    //<Week 8>
    $w("#switch801").hide();
    $w("#switch802").hide();
    $w("#switch803").hide();
    if (weeksCount >= 8) {
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
        $w("#textWeek8").html = textWeek8;
        $w("#textWeek8").show();
    } else {
        $w("#textWeek8").hide();
    }
    //</Week 8>

    //<Week 9>
    $w("#switch901").hide();
    $w("#switch902").hide();
    $w("#switch903").hide();
    if (weeksCount >= 9) {
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
        $w("#textWeek9").html = textWeek9;
        $w("#textWeek9").show();
    } else {
        $w("#textWeek9").hide();
    }
    //</Week 9>

    // $w("#htmlFunAlert").value = "Applying the almost unused HTML construct called 'Data Lists' ('<dl>') to the simple Camping List Text to the Dynamic Content for Weeks 1 & 2 of Steam Discovery Academy";
}