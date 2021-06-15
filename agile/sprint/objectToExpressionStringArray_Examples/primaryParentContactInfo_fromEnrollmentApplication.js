        // ø <---------- <doPrimaryParentContactInfo()>  ---------->
        // ø if messy this could become its own function
        // ø @path: steamdaWixLocal/steamdaWix/agile/sprint/objectToExpressionStringArray_Examples/primaryParentContactInfo_fromEnrollmentApplication.js

        // ! <FINAL>
        let lastupdateDATE = new Date();
        let lastupdate = lastupdateDATE.getFullYear().toString() + '-' + (lastupdateDATE.getMonth() + 1).toString() + '-' + lastupdateDATE.getDate().toString()
        let currentRegion = "Charlottesville";
        let timezoneOffest = "-4:00";

        //enrollmentObject.
        // enrollmentObject.family.student.dob.month = 2;
        // enrollmentObject.family.student.dob.day = 7;
        let studentBDAY = ("00" + enrollmentObject.family.student.dob.month).substr(-2) + ("00" + enrollmentObject.family.student.dob.day).substr(-2);

        console.log("studentBDAY: " + studentBDAY);
        console.log("termBeginMMDD: " + local.getItem('termBeginMMDD'));
        console.log("termEndMMDD: " + local.getItem('termEndMMDD'));

        let tBDAY = studentBDAY < local.getItem('termBeginMMDD') ? false : true;
        tBDAY = studentBDAY > local.getItem('termEndMMDD') ? false : tBDAY;
        // tBDAY = false;
        console.log('tBDAY: ' + tBDAY);


        // Member Active [custom.member-active]
        // Primary Parent [custom.primary-parent]
        let roleLabelKey = 'custom.primary-parent';
        let memberLabelKey = 'custom.member-active';


        // let idZZZToLableKeyArray = [[1,'custom.w1-2021060711'],[2,'custom.w2-2021061418'],[3,'custom.w3-2021062125'],[4,'custom.w4-2021062832'],[5,'custom.w5-2021071216'],[6,'custom.w6-2021071923'],[7,'custom.w7-2021072630'],[8,'custom.w8-2021080206'],[9,'custom.w9-2021080913'],['custom.w1-2021060711',1],['custom.w2-2021061418',2],['custom.w3-2021062125',3],['custom.w4-2021062832',4],['custom.w5-2021071216',5],['custom.w6-2021071923',6],['custom.w7-2021072630',7],['custom.w8-2021080206',8],['custom.w9-2021080913',9]];
        // let idZZZToLableKeyArray = [['custom.w0-2021010102','0101','0102'],['custom.w1-2021060711','0607','0611'],['custom.w2-2021061418','0614','0618'],['custom.w3-2021062125','0621','0625'],['custom.w4-2021062832','0628','0702'],['custom.w5-2021071216','0712','0716'],['custom.w6-2021071923','0719','0723'],['custom.w7-2021072630','0726','0730'],['custom.w8-2021080206','0802','0806'],['custom.w9-2021080913','0809','0813']];
        // let weekIdToLabelKeyJSON  = local.getItem('weekIdToLabelKeyJSON');
        let weekIdToLabelKeyJSON = [['custom.w0-2021010102','0101','0102'],['custom.w1-2021060711','0607','0611'],['custom.w2-2021061418','0614','0618'],['custom.w3-2021062125','0621','0625'],['custom.w4-2021062832','0628','0702'],['custom.w5-2021071216','0712','0716'],['custom.w6-2021071923','0719','0723'],['custom.w7-2021072630','0726','0730'],['custom.w8-2021080206','0802','0806'],['custom.w9-2021080913','0809','0813']];
        // let weekIdToLabelKeyArray  = JSON.parse(weekIdToLabelKeyJSON);
        let courseArray = enrollmentObject.courses_array;
        let finalLabelKeyArray = [];
        // let labelKeyRow = [];
        let beginBDAY = "";
        let endBDAY = "";
        let wkBDAY = false;
        for (let index = 0; index < courseArray.length; index++) {
            let element = courseArray[index];
            // console.log('['+element.weekId+']element:');
            // console.log(element);
            let labelKeyRow = weekIdToLabelKeyJSON[element.weekId];
            console.log('['+element.weekId+']labelKeyRow:');
            console.log(labelKeyRow);
            if(!finalLabelKeyArray.includes(labelKeyRow[0])){
                finalLabelKeyArray.push(labelKeyRow[0]);
            }
            beginBDAY = labelKeyRow[1];
            endBDAY = labelKeyRow[2];
            wkBDAY = studentBDAY < beginBDAY ? false : true;
            wkBDAY = studentBDAY > endBDAY ? false : wkBDAY;
            wkBDAY = finalLabelKeyArray.includes(labelKeyRow[0] + 'bday') ? false : wkBDAY;
            if(wkBDAY){
                finalLabelKeyArray.push(labelKeyRow[0] + 'bday');
            }
        }
        finalLabelKeyArray.push(local.getItem('termLabelKey'));

        if(tBDAY){
            finalLabelKeyArray.push(local.getItem('termLabelKey') + 'bday')
        }
        finalLabelKeyArray.push(roleLabelKey);
        finalLabelKeyArray.push(memberLabelKey);
        // ! </FINAL>


        //Final Code: 
        // ! <FINAL>
        let primaryParent = {};
        primaryParent.contactInfo = {};
        primaryParent.contactInfo.name = {};
        primaryParent.contactInfo.name.first = enrollmentObject.family.parent.primary.first;
        primaryParent.contactInfo.name.last = enrollmentObject.family.parent.primary.last;
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
        finalLabelKeyArray.forEach(element => {
            // console.log(element);
            primaryParent.contactInfo.labelKeys.push(element);
        });
        //


        primaryParent.contactInfo.emails = [];
        primaryParent.contactInfo.emails[0] = {};
        primaryParent.contactInfo.emails[0].tag = "MAIN";
        // enrollmentObject.family.emails[0].kind = "home";
        primaryParent.contactInfo.emails[0].email = enrollmentObject.family.emails[0].email;
        primaryParent.contactInfo.emails[0].primary = "true";
        // enrollmentObject.family.emails[0].role = "Primary Parent";
        // enrollmentObject.family.emails[0].who = "Shirley";
        // enrollmentObject.family.emails[0].usage = "Personal";

        // primaryParent.contactInfo.emails[1] = {};
        // primaryParent.contactInfo.emails[1].tag = "MAIN";
        // primaryParent.contactInfo.emails[1].email = "qiqgroup+eli9375@gmail.com";
        // primaryParent.contactInfo.emails[1].primary = "true";

        primaryParent.contactInfo.phones = [];
        primaryParent.contactInfo.phones[0] = {};
        primaryParent.contactInfo.phones[0].tag = "MOBILE";
        // enrollmentObject.family.phones[0].kind = "cell";
        primaryParent.contactInfo.phones[0].phone = enrollmentObject.family.phones[0].phone;
        primaryParent.contactInfo.phones[0].primary = "true";
        // enrollmentObject.family.phones[0].role = "Primary Parent";
        // enrollmentObject.family.phones[0].who = "Shirley";
        // enrollmentObject.family.phones[0].usage = "Personal";

        // primaryParent.contactInfo.phones[1] = {};
        // primaryParent.contactInfo.phones[1].tag = "HOME";
        // primaryParent.contactInfo.phones[1].phone = "(579)-264-8376";


        primaryParent.contactInfo.addresses = [];
        primaryParent.contactInfo.addresses[0] = {};
        primaryParent.contactInfo.addresses[0].tag = "HOME";
        primaryParent.contactInfo.addresses[0].address = {};
        primaryParent.contactInfo.addresses[0].address.streetAddress = {};
        primaryParent.contactInfo.addresses[0].address.streetAddress.number = enrollmentObject.family.addresses[0].address.streetAddress.number;
        primaryParent.contactInfo.addresses[0].address.streetAddress.name = enrollmentObject.family.addresses[0].address.streetAddress.name;
        // primaryParent.contactInfo.addresses[0].address.streetAddress.apt = "52";

        primaryParent.contactInfo.addresses[0].address.addressLine2 = enrollmentObject.family.addresses[0].address.streetAddress2;
        primaryParent.contactInfo.addresses[0].address.city = enrollmentObject.family.addresses[0].address.city;
        primaryParent.contactInfo.addresses[0].address.subdivision = enrollmentObject.family.addresses[0].address.subdivision;
        primaryParent.contactInfo.addresses[0].address.postalCode = enrollmentObject.family.addresses[0].address.postalCode;
        primaryParent.contactInfo.addresses[0].address.country = enrollmentObject.family.addresses[0].address.country;
        primaryParent.contactInfo.addresses[0].address.location = {};
        primaryParent.contactInfo.addresses[0].address.location.latitude = enrollmentObject.family.addresses[0].address.location.latitude;
        primaryParent.contactInfo.addresses[0].address.location.longitude = enrollmentObject.family.addresses[0].address.location.longitue;


        primaryParent.contactInfo.extendedFields = {};
        // ! <FINAL>
        primaryParent.contactInfo.extendedFields['custom.lastupdate'] = lastupdate;
        primaryParent.contactInfo.extendedFields['custom.current-region'] = currentRegion;
        primaryParent.contactInfo.extendedFields['custom.timezone-offset'] = timezoneOffest;
        // ! </FINAL>
        // primaryParent.contactInfo.extendedFields.custom['legal-first'] = "Elijah";
        // enrollmentObject.family.student.name.preferred = "Danny";

        // primaryParent.contactInfo.extendedFields.custom.seed = "b53333aa164cc0b1";

        // ø <---------- </doPrimaryParentContactInfo()> ---------->