// ø <---------- <spContactPrepJSON AS Step-Function>  ---------->
export async function spContactPrepJSON() {
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~680] Entering spContactPrepJSON() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->

    // let wixContactInfo = {};
    // wixContactInfo.contactInfo = {};
    // wixContactInfo.contactInfo.source = "PPENDING";

    // let contact = await steamdaGetContactFunction(local.getItem('familyId'));
    // $w('#spContactResponseJSON').value = JSON.stringify(contact,undefined,4);
    // memory.setItem('spRevision',(contact.revision).toString());

    // paramObjectThis.contactIdentifiers = {};
    // if(contact._id === local.getItem('familyId')){
    //     paramObjectThis.contactIdentifiers.contactId = contact._id;
    //     paramObjectThis.contactIdentifiers.revision = contact.revision;
    //     // paramObjectThis.contactInfo = wixContactInfo.contactInfo;
    // }else{
    //     paramObjectThis.contactIdentifiers.contactId = "EERROR";
    //     paramObjectThis.contactIdentifiers.errorContactId = contact._id;
    //     paramObjectThis.contactIdentifiers.errorMemberId = local.getItem('familyId');
    //     paramObjectThis.contactIdentifiers.revision = contact.revision;
    //     // paramObjectThis.contactInfo = wixContactInfo.contactInfo;
    //     paramObjectThis.errorString = "Member ID !== Contact ID";
    // }
    //spAction: NA|INSERT|INSERT
    let spActionArray = memory.getItem('spAction').split('|');
    let spActionContact = spActionArray[1];
    let paramObjectThis = {};
    if (spActionContact === 'INSERT') {
        let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));

        // let secondaryParent = {};
        // secondaryParent.contactInfo = {};
        // secondaryParent.contactInfo.source = "PPENDING";
        // ø <---------- <doPrimaryParentContactInfo()>  ---------->
        // ø if messy this could become its own function
        // ø @path: steamdaWixLocal/steamdaWix/agile/sprint/objectToExpressionStringArray_Examples/secondaryParentContactInfo_fromEnrollmentApplication.js

        // ! <FINAL>
        let lastupdateDATE = new Date();
        let lastupdate = lastupdateDATE.getFullYear().toString() + '-' + (lastupdateDATE.getMonth() + 1).toString() + '-' + lastupdateDATE.getDate().toString()
        let currentRegion = "Charlottesville";
        let timezoneOffest = "-4:00";

        //enrollmentObject.
        // enrollmentObject.family.student.dob.month = 2;
        // enrollmentObject.family.student.dob.day = 7;
        // let studentBDAY = ("00" + enrollmentObject.family.student.dob.month).substr(-2) + ("00" + enrollmentObject.family.student.dob.day).substr(-2);

        // console.log("studentBDAY: " + studentBDAY);
        // console.log("termBeginMMDD: " + local.getItem('termBeginMMDD'));
        // console.log("termEndMMDD: " + local.getItem('termEndMMDD'));

        // let tBDAY = studentBDAY < local.getItem('termBeginMMDD') ? false : true;
        // tBDAY = studentBDAY > local.getItem('termEndMMDD') ? false : tBDAY;
        // // tBDAY = false;
        // console.log('tBDAY: ' + tBDAY);


        // Member Active [custom.member-active]
        // Primary Parent [custom.primary-parent]
        let roleLabelKey = 'custom.secondary-parent';
        // let memberLabelKey = 'custom.member-active';


        // let idZZZToLableKeyArray = [[1,'custom.w1-2021060711'],[2,'custom.w2-2021061418'],[3,'custom.w3-2021062125'],[4,'custom.w4-2021062832'],[5,'custom.w5-2021071216'],[6,'custom.w6-2021071923'],[7,'custom.w7-2021072630'],[8,'custom.w8-2021080206'],[9,'custom.w9-2021080913'],['custom.w1-2021060711',1],['custom.w2-2021061418',2],['custom.w3-2021062125',3],['custom.w4-2021062832',4],['custom.w5-2021071216',5],['custom.w6-2021071923',6],['custom.w7-2021072630',7],['custom.w8-2021080206',8],['custom.w9-2021080913',9]];
        // let idZZZToLableKeyArray = [['custom.w0-2021010102','0101','0102'],['custom.w1-2021060711','0607','0611'],['custom.w2-2021061418','0614','0618'],['custom.w3-2021062125','0621','0625'],['custom.w4-2021062832','0628','0702'],['custom.w5-2021071216','0712','0716'],['custom.w6-2021071923','0719','0723'],['custom.w7-2021072630','0726','0730'],['custom.w8-2021080206','0802','0806'],['custom.w9-2021080913','0809','0813']];
        // let weekIdToLabelKeyJSON  = local.getItem('weekIdToLabelKeyJSON');
        // let weekIdToLabelKeyJSON = [['custom.w0-2021010102', '0101', '0102'], ['custom.w1-2021060711', '0607', '0611'], ['custom.w2-2021061418', '0614', '0618'], ['custom.w3-2021062125', '0621', '0625'], ['custom.w4-2021062832', '0628', '0702'], ['custom.w5-2021071216', '0712', '0716'], ['custom.w6-2021071923', '0719', '0723'], ['custom.w7-2021072630', '0726', '0730'], ['custom.w8-2021080206', '0802', '0806'], ['custom.w9-2021080913', '0809', '0813']];
        // let weekIdToLabelKeyArray  = JSON.parse(weekIdToLabelKeyJSON);
        // let courseArray = enrollmentObject.courses_array;
        let finalLabelKeyArray = [];
        // let labelKeyRow = [];
        // let beginBDAY = "";
        // let endBDAY = "";
        // let wkBDAY = false;
        // for (let index = 0; index < courseArray.length; index++) {
        //     let element = courseArray[index];
        //     // console.log('['+element.weekId+']element:');
        //     // console.log(element);
        //     let labelKeyRow = weekIdToLabelKeyJSON[element.weekId];
        //     console.log('[' + element.weekId + ']labelKeyRow:');
        //     console.log(labelKeyRow);
        //     if (!finalLabelKeyArray.includes(labelKeyRow[0])) {
        //         finalLabelKeyArray.push(labelKeyRow[0]);
        //     }
        //     beginBDAY = labelKeyRow[1];
        //     endBDAY = labelKeyRow[2];
        //     wkBDAY = studentBDAY < beginBDAY ? false : true;
        //     wkBDAY = studentBDAY > endBDAY ? false : wkBDAY;
        //     wkBDAY = finalLabelKeyArray.includes(labelKeyRow[0] + 'bday') ? false : wkBDAY;
        //     if (wkBDAY) {
        //         finalLabelKeyArray.push(labelKeyRow[0] + 'bday');
        //     }
        // }
        // finalLabelKeyArray.push(local.getItem('termLabelKey'));

        // if (tBDAY) {
        //     finalLabelKeyArray.push(local.getItem('termLabelKey') + 'bday')
        // }
        finalLabelKeyArray.push(roleLabelKey);
        // finalLabelKeyArray.push(memberLabelKey);
        // ! </FINAL>


        //Final Code: 
        // ! <FINAL>
        let secondaryParent = {};
        secondaryParent.contactInfo = {};
        // ø <ZXZ-TTESTING DISABLED>
        secondaryParent.contactInfo.name = {};
        secondaryParent.contactInfo.name.first = enrollmentObject.family.parent.secondary.first;
        secondaryParent.contactInfo.name.last = enrollmentObject.family.parent.secondary.last;
        secondaryParent.contactInfo.locale = "en-US";
        // ø </ZXZ-TTESTING DISABLED>
        // ! </FINAL>

        // secondaryParent.contactInfo.company = "Forest Associates";
        // secondaryParent.contactInfo.jobTitle = "Human Resources";
        // secondaryParent.contactInfo.birthdate = "1991-08-01";


        // secondaryParent.contactInfo.labelKeys = [];
        // secondaryParent.contactInfo.labelKeys[0] = "custom.gender-male";
        // secondaryParent.contactInfo.labelKeys[1] = "custom.t202106";
        // secondaryParent.contactInfo.labelKeys[2] = "custom.primary-parent";

        // ø <ZXZ-TTESTING DISABLED>
        secondaryParent.contactInfo.labelKeys = [];
        finalLabelKeyArray.forEach(element => {
            // console.log(element);
            secondaryParent.contactInfo.labelKeys.push(element);
        });
        // ø </ZXZ-TTESTING DISABLED>



        // ø <ZXZ-TTESTING DISABLED>
        secondaryParent.contactInfo.emails = [];
        secondaryParent.contactInfo.emails[0] = {};
        secondaryParent.contactInfo.emails[0].tag = "MAIN";
        // ø </ZXZ-TTESTING DISABLED>
        // enrollmentObject.family.emails[0].kind = "home";
        // ø <ZXZ-TTESTING DISABLED>
        secondaryParent.contactInfo.emails[0].email = enrollmentObject.family.emails[0].email;
        secondaryParent.contactInfo.emails[0].primary = "true";
        // ø </ZXZ-TTESTING DISABLED>
        // enrollmentObject.family.emails[0].role = "Primary Parent";
        // enrollmentObject.family.emails[0].who = "Shirley";
        // enrollmentObject.family.emails[0].usage = "Personal";

        // secondaryParent.contactInfo.emails[1] = {};
        // secondaryParent.contactInfo.emails[1].tag = "MAIN";
        // secondaryParent.contactInfo.emails[1].email = "qiqgroup+eli9375@gmail.com";
        // secondaryParent.contactInfo.emails[1].primary = "true";

        // ø <ZXZ-TTESTING DISABLED>
        secondaryParent.contactInfo.phones = [];
        secondaryParent.contactInfo.phones[0] = {};
        secondaryParent.contactInfo.phones[0].tag = "MOBILE";
        // // ø </ZXZ-TTESTING DISABLED>
        // // enrollmentObject.family.phones[0].kind = "cell";
        // // ø </ZXZ-TTESTING DISABLED>
        secondaryParent.contactInfo.phones[0].phone = enrollmentObject.family.phones[0].phone;
        secondaryParent.contactInfo.phones[0].primary = "true";
        // ø <ZXZ-TTESTING DISABLED>
        // enrollmentObject.family.phones[0].role = "Primary Parent";
        // enrollmentObject.family.phones[0].who = "Shirley";
        // enrollmentObject.family.phones[0].usage = "Personal";

        // secondaryParent.contactInfo.phones[1] = {};
        // secondaryParent.contactInfo.phones[1].tag = "HOME";
        // secondaryParent.contactInfo.phones[1].phone = "(579)-264-8376";


        // ø <ZXZ-TTESTING DISABLED>
        secondaryParent.contactInfo.addresses = [];
        secondaryParent.contactInfo.addresses[0] = {};
        secondaryParent.contactInfo.addresses[0].tag = "HOME";
        secondaryParent.contactInfo.addresses[0].address = {};
        secondaryParent.contactInfo.addresses[0].address.streetAddress = {};
        secondaryParent.contactInfo.addresses[0].address.streetAddress.number = enrollmentObject.family.addresses[0].address.streetAddress.number;
        secondaryParent.contactInfo.addresses[0].address.streetAddress.name = enrollmentObject.family.addresses[0].address.streetAddress.name;

        secondaryParent.contactInfo.addresses[0].address.addressLine2 = enrollmentObject.family.addresses[0].address.streetAddress2;
        secondaryParent.contactInfo.addresses[0].address.city = enrollmentObject.family.addresses[0].address.city;
        secondaryParent.contactInfo.addresses[0].address.subdivision = enrollmentObject.family.addresses[0].address.subdivision;
        secondaryParent.contactInfo.addresses[0].address.postalCode = enrollmentObject.family.addresses[0].address.postalCode;
        secondaryParent.contactInfo.addresses[0].address.country = enrollmentObject.family.addresses[0].address.country;
        let assignLocation = true;
        assignLocation = enrollmentObject.family.addresses[0].address.location.latitude === null ? false : assignLocation;
        assignLocation = enrollmentObject.family.addresses[0].address.location.longitue === null ? false : assignLocation;
        if (assignLocation) {
            secondaryParent.contactInfo.addresses[0].address.location = {};
            secondaryParent.contactInfo.addresses[0].address.location.latitude = enrollmentObject.family.addresses[0].address.location.latitude;
            secondaryParent.contactInfo.addresses[0].address.location.longitude = enrollmentObject.family.addresses[0].address.location.longitue;
        }
        // ø </ZXZ-TTESTING DISABLED>


        // ø <ZXZ-TTESTING DISABLED>
        secondaryParent.contactInfo.extendedFields = {};
        // ! <FINAL>
        secondaryParent.contactInfo.extendedFields['custom.last-update'] = lastupdate;
        secondaryParent.contactInfo.extendedFields['custom.current-region'] = currentRegion;
        secondaryParent.contactInfo.extendedFields['custom.timezone-offset'] = timezoneOffest;
        // ! </FINAL>
        // ø </ZXZ-TTESTING DISABLED>
        // secondaryParent.contactInfo.extendedFields.custom['legal-first'] = "Elijah";
        // enrollmentObject.family.student.name.preferred = "Danny";

        // secondaryParent.contactInfo.extendedFields.custom.seed = "b53333aa164cc0b1";

        // ø <---------- </doPrimaryParentContactInfo()> ---------->

        paramObjectThis.contactInfo = secondaryParent.contactInfo;
    }else{
        paramObjectThis.spActionContact = spActionContact;
        paramObjectThis.log = 'NO ACTION INDICATED';

    }//END if (spActionContact === 'INSERT')
    let paramJSON = JSON.stringify(paramObjectThis);
    memory.setItem('spContactPrepJSON', paramJSON);
    // if(paramJSON.length > 50){

    // }
}
// ø <---------- </spContactPrepJSON AS Step-Function> ---------->