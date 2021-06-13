// ! <FINAL>
let lastupdateDATE = new Date();
let lastupdate = lastupdateDATE.getFullYear().toString() + '-' + (lastupdateDATE.getMonth() + 1).toString() + '-' + lastupdateDATE.getDate().toString()
let currentRegion = "Charlottesville";
let timezoneOffest = "-4:00";

enrollmentObj.family.student.dob.month = 2;
enrollmentObj.family.student.dob.day = 7;
let studentBDAY = ("00" + enrollmentObj.family.student.dob.month = "7").substr(-2);
studentBDAY += ("00" + enrollmentObj.family.student.dob.day).substr(-2);

let tBDAY = studentBDAY < local.getItem('termBeginMMDD') ? false : true;
let tBDAY = studentBDAY > local.getItem('termEndMMDD') ? false : tBDAY;

// Member Active [custom.member-active]
// Primary Parent [custom.primary-parent]
let roleLabelKey = 'custom.primary-parent';
let memberLabelKey = 'custom.member-active';


// let idZZZToLableKeyArray = [[1,'custom.w1-2021060711'],[2,'custom.w2-2021061418'],[3,'custom.w3-2021062125'],[4,'custom.w4-2021062832'],[5,'custom.w5-2021071216'],[6,'custom.w6-2021071923'],[7,'custom.w7-2021072630'],[8,'custom.w8-2021080206'],[9,'custom.w9-2021080913'],['custom.w1-2021060711',1],['custom.w2-2021061418',2],['custom.w3-2021062125',3],['custom.w4-2021062832',4],['custom.w5-2021071216',5],['custom.w6-2021071923',6],['custom.w7-2021072630',7],['custom.w8-2021080206',8],['custom.w9-2021080913',9]];
// let idZZZToLableKeyArray = [['custom.w0-2021010102','0101','0102'],['custom.w1-2021060711','0607','0611'],['custom.w2-2021061418','0614','0618'],['custom.w3-2021062125','0621','0625'],['custom.w4-2021062832','0628','0702'],['custom.w5-2021071216','0712','0716'],['custom.w6-2021071923','0719','0723'],['custom.w7-2021072630','0726','0730'],['custom.w8-2021080206','0802','0806'],['custom.w9-2021080913','0809','0813']];
let weekIdToLabelKeyJSON  = local.getItem('weekIdToLabelKeyJSON');
let courseArray = enrollmentObj.courses_array;
finalLabelKeyArray = [];
let labelKey = "";
let beginBDAY = "";
let endBDAY = "";
for (let index = 0; index < courseArray.length; index++) {
    let element = courseArray[index];
    // labelKey = weekIdToLabelKeyJSON [element.weekId][0];
    finalLabelKeyArray.push(labelKey);
    // beginBDAY = weekIdToLabelKeyJSON [element.weekId][1];
    // endBDAY = weekIdToLabelKeyJSON [element.weekId][2];
    wkBDAY = studentBDAY < beginBDAY ? false : true;
    wkBDAY = studentBDAY > endBDAY ? false : wkBDAY;
    if(wkBDAY){
        finalLabelKeyArray.push(labelKey + 'bday');
    }
}
finalLabelKeyArray.push(local.getItem('termLabelKey'));

if(tBDAY){
    finalLableKeyArray.push(local.getItem('termLabelKey') + 'bday')
}
finalLabelKeyArray.push(roleLabelKey);
finalLabelKeyArray.push(memberLabelKey);
// ! </FINAL>


//Final Code: 
// ! <FINAL>
let primaryParent = {};
primaryParent.contactInfo = {};
primaryParent.contactInfo.name = {};
primaryParent.contactInfo.name.first = "Eli";
enrollmentObj.family.parent.primary.first = "Shirley";
primaryParent.contactInfo.name.last = "Carpenter";
enrollmentObj.family.parent.primary.last = "Partridge";
primaryParent.contactInfo.locale = "en-US";
// ! </FINAL>

// primaryParent.contactInfo.company = "Forest Associates";
// primaryParent.contactInfo.jobTitle = "Human Resources";
// primaryParent.contactInfo.birthdate = "1991-08-01";


// primaryParent.contactInfo.labelKeys = [];
// primaryParent.contactInfo.labelKeys[0] = "custom.gender-male";
// primaryParent.contactInfo.labelKeys[1] = "custom.t202106";
// primaryParent.contactInfo.labelKeys[2] = "custom.primary-parent";
primaryParent.contactInfo.labelKeys = [];
finalLableKeyArray.forEach(element => {
    // console.log(element);
    primaryParent.contactInfo.labelKeys.push(element);
});
//


primaryParent.contactInfo.emails = [];
primaryParent.contactInfo.emails[0] = {};
primaryParent.contactInfo.emails[0].tag = "MAIN";
// enrollmentObj.family.emails[0].kind = "home";
primaryParent.contactInfo.emails[0].email = "eli.carpenter@example.com";
enrollmentObj.family.emails[0].email = "bradlowry+dannu@gmail.com";
primaryParent.contactInfo.emails[0].primary = "true";
// enrollmentObj.family.emails[0].role = "Primary Parent";
// enrollmentObj.family.emails[0].who = "Shirley";
// enrollmentObj.family.emails[0].usage = "Personal";

// primaryParent.contactInfo.emails[1] = {};
// primaryParent.contactInfo.emails[1].tag = "MAIN";
// primaryParent.contactInfo.emails[1].email = "qiqgroup+eli9375@gmail.com";
// primaryParent.contactInfo.emails[1].primary = "true";

primaryParent.contactInfo.phones = [];
primaryParent.contactInfo.phones[0] = {};
primaryParent.contactInfo.phones[0].tag = "MOBILE";
// enrollmentObj.family.phones[0].kind = "cell";
primaryParent.contactInfo.phones[0].phone = "(375)-634-4884";
enrollmentObj.family.phones[0].phone = "(218) 595-0499";
primaryParent.contactInfo.phones[0].primary = "true";
// enrollmentObj.family.phones[0].role = "Primary Parent";
// enrollmentObj.family.phones[0].who = "Shirley";
// enrollmentObj.family.phones[0].usage = "Personal";

// primaryParent.contactInfo.phones[1] = {};
// primaryParent.contactInfo.phones[1].tag = "HOME";
// primaryParent.contactInfo.phones[1].phone = "(579)-264-8376";


primaryParent.contactInfo.addresses = [];
primaryParent.contactInfo.addresses[0] = {};
primaryParent.contactInfo.addresses[0].tag = "HOME";
primaryParent.contactInfo.addresses[0].address = {};
primaryParent.contactInfo.addresses[0].address.streetAddress = {};
primaryParent.contactInfo.addresses[0].address.streetAddress.number = "9375";
enrollmentObj.family.addresses[0].address.streetAddress.number = "123";
primaryParent.contactInfo.addresses[0].address.streetAddress.name = "Forest Ln";
enrollmentObj.family.addresses[0].address.streetAddress.name = "Old Bus Way";
// primaryParent.contactInfo.addresses[0].address.streetAddress.apt = "52";

primaryParent.contactInfo.addresses[0].address.addressLine2 = "# 43";
enrollmentObj.family.addresses[0].address.streetAddress2 = "101";
primaryParent.contactInfo.addresses[0].address.city = "Scottsdale";
enrollmentObj.family.addresses[0].address.city = "Teluca Lake";
primaryParent.contactInfo.addresses[0].address.subdivision = "NM";
enrollmentObj.family.addresses[0].address.subdivision = "CA";
primaryParent.contactInfo.addresses[0].address.postalCode = "27856";
enrollmentObj.family.addresses[0].address.postalCode = "90210";
primaryParent.contactInfo.addresses[0].address.country = "US";
enrollmentObj.family.addresses[0].address.country = "US";
primaryParent.contactInfo.addresses[0].address.location = {};
primaryParent.contactInfo.addresses[0].address.location.latitude = "-25.9980";
enrollmentObj.family.addresses[0].address.location.latitude = "nnull";
primaryParent.contactInfo.addresses[0].address.location.longitude = "-136.6533";
enrollmentObj.family.addresses[0].address.location.longitue = "nnull";


primaryParent.contactInfo.extendedFields = {};
// ! <FINAL>
primaryParent.contactInfo.extendedFields.custom.lastupdate = lastupdate;
primaryParent.contactInfo.extendedFields.custom['current-region'] = currentRegion;
primaryParent.contactInfo.extendedFields.custom['timezone-offset'] = timezoneOffest;
// ! </FINAL>
// primaryParent.contactInfo.extendedFields.custom['legal-first'] = "Elijah";
// enrollmentObj.family.student.name.preferred = "Danny";

// primaryParent.contactInfo.extendedFields.custom.seed = "b53333aa164cc0b1";