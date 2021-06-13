let testElementName = 'PPENDONG';
let testElementNotes = ['an array of notes, maybe never used beyond this file'];
let testJSON =  `{"status":"PPENDING"}`;
// testElementName = 'dogObject';
// testJSON =  `{"name":"Chester","age":14}`;
// testElementName = 'dogsSimpleArray';
// testJSON = `["Chester","Marais"]`;
// testElementName = 'oneDogObjectArray';
// testJSON = `[{"name":"Chester","age":14}]`;
// testElementName = 'dogsObjectArray';
// testJSON = `[{"name":"Chester","age":14},{"name":"Marais","age":10}]`;
// testElementName = 'petsObject';
// testJSON = `{"dogs":[{"name":"Chester","age":14},{"name":"Marais","age":10}],"cats":[{"name":"Algonquin","age":19}]}`;
// testElementName = 'person';
// testJSON = `{"first":"Brad","last":"Lowry","age":61,"pets":{"dogs":[{"name":"Chester","age":14},{"name":"Marais","age":10}],"cats":[{"name":"Algonquin","age":19}]}}`;
// testElementName = 'jimmieBlack';
// testJSON = `{"gender":"custom.gender-male","name":{"title":"Mr","first":"Jimmie","last":"Black"},"location":{"street":{"number":4268,"name":"Frances Ct","apt":51},"city":"Addison","state":"Vermont","country":"US","postcode":77851,"coordinates":{"latitude":"-23.0989","longitude":"-81.9531"},"timezone":{"offset":"+6:00","description":"Almaty, Dhaka, Colombo"},"postalCode":"77851","subdivision":"VT","addressLine2":"Box 36"},"email":"jimmie.black@example.com","login":{"uuid":"81c640ec-52fe-4d49-bec4-43d361bff9dd","username":"custom.primary-parent","password":"trader","salt":"vi832tK8","md5":"f8d87cc27093561d84dd05749bf022b5","sha1":"b7be087fb63d5ca1efa5b30e0736a2a799f07b01","sha256":"b3e266e020e7133a1be1e449e549d87e1fb80ffaf1478137e8ff94f7dec465b1","usernameOrig":"smallfish361"},"dob":{"date":"1958-01-17T04:28:37.901Z","age":"custom.t202106"},"registered":{"date":"2016-11-10T14:44:08.543Z","age":5},"phone":"(307)-996-8899","cell":"(446)-659-3940","id":{"name":"SSN","value":"287-68-3151"},"picture":{"large":"https://randomuser.me/api/portraits/men/24.jpg","medium":"https://randomuser.me/api/portraits/med/men/24.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/24.jpg"},"nat":"US","seed":"2b09df5fa295637d","locale":"en-US","birthdate":"1958-01-17","company":"Frances Corporation","jobTitle":"Supervisor","emailPrimary":"qiqgroup+jimmie4268@gmail.com","custom":{"lastupdate":"2016-11-10","currentZdashZregion":"Charlottesville"},"developer":{"transformedAttributes":[["streetNumberBase:used as a 'random' number for populating _consistent/random_ data by 'seed''"],["locale:literal 'en-US'"],["postalCode:ensure 5 and string - left postcode as number"],["birthdate:dob.date to left 10. no change to original"],["subdivision:2letter version of 'state' - original not removed"],["Company:Street name + random business kind"],["jobTitle:random jobTitle"],["emailPrimary:qiqgroup + firstName - real so that enrollment happens"],["addressLine2:random number and random type (now consistent by seed)"],["street.apt:random number more useful than addressLine2 (now consistent by seed)"],["gender:changed to labelKey (original overloaded because of other code, also, core data not changed)"],["login.username:changed to role labelKey (orig renamed usernameOrig)"],["dob.age:changed to current summer termId tYYYY06 labelKey (age is calcuable)"],["created custom Object for custom attributes (extended fields)"],["registered.date:substr(0,10)"],["seed-random 5 to 1 Charlottesville, Blacksburg"]]}}`;
// testElementName = 'dannyPartridgeFamily';
// testJSON = `{"family":{"phones":[{"phone":"(218) 595-0499","role":"Primary Parent","who":"Shirley","kind":"cell","usage":"Personal"}],"emails":[{"email":"bradlowry+dannu@gmail.com","role":"Primary Parent","who":"Shirley","kind":"home","usage":"Personal"}],"messages":{"dox":["only messages you want the Whole Family to see"]},"student":{"photoRelease":true,"name":{"first":"Danny","last":"Partridge","preferred":"Danny","studentParentCombo":"Danny Partridge (Shirley)","lastFirst":"Partridge, Danny","fullName":"Danny Partridge"},"declaredGender":"Male","studentStatement":"Radio Science","messages":{"dox":["messages you want the Student only to see"]},"dobString":"02/07/2003","currentSchool":"Bonaducci Prep","currentGrade":3,"currentGradeString":"Third Grade","currentGradeLevel":"3-5","dob":{"date":"2003-02-07T06:00:00.000Z","month":2,"day":7,"year":2003}},"parent":{"messages":{"dox":["messages you want Both Parents to see"]},"primary":{"memberId":"INSTANTIATE","messages":{"dox":["messages you want the Primary Parent/Web Account Holder only to see"]},"last":"Partridge","first":"Shirley","fullName":"Shirley Partridge","lastFirst":"Partridge, Shirley"},"secondary":{"first":"Ruben","last":"Kincaid"}},"addresses":[{"kind":"mailing","address":{"streetAddress":{"number":"123","name":"Old Bus Way"},"city":"Teluca Lake","streetAddress2":"101","state":"CA","postalCode":"90210","country":"US","subdivision":"CA","location":{"latitude":null,"longitue":null},"formatted":"123 Old Bus Way, 101, Teluca Lake, CA 90210, USA"}}]}}`;
// let dannyPartridgeDirectJSON = JSON.stringify(dannyPartridgeDirect);
// testElementName = 'dannyPartridge';
// testElementNotes= ['used for unwoundEnrollmentApplication.js'];
// testJSON = {"courses_array":[{"index":0,"weekId":1,"dateString":"June 7-11, 2021","dateStart":1623070800000,"dateEnd":1623448800000,"value":"1SKC35","billing":{"discount":[{"kind":"Early Bird","amount":50}],"tuition":345,"runningTotal":295},"message":{},"day":"FULL","courseId":"1SKC35","gradeLevel":"3-5","location":"Charlottesville Catholic","courseName":"Summer Kickoff Camp","checked":true},{"index":0,"weekId":2,"dateString":"June 14-18, 2021","dateStart":1623675600000,"dateEnd":1624053600000,"value":"2ML35","billing":{"discount":[{"kind":"Early Bird","amount":50}],"tuition":345,"runningTotal":590},"message":{},"day":"FULL","courseId":"2ML35","gradeLevel":"3-5","location":"Charlottesville Catholic","courseName":"Matter Lab","checked":true},{"index":0,"weekId":3,"dateString":"June 21-25, 2021","dateStart":1624280400000,"dateEnd":1624658400000,"value":"3CP68","billing":{"discount":[{"kind":"Early Bird","amount":50}],"tuition":345,"runningTotal":885},"message":{},"day":"FULL","courseId":"3CP68","gradeLevel":"6-8","location":"Charlottesville Catholic","courseName":"Computer Programming in Video Games & E-Sports","checked":false},{"index":0,"weekId":4,"dateString":"June 28 - July 2, 2021","dateStart":1624885200000,"dateEnd":1625263200000,"value":"4UTS35","billing":{"discount":[{"kind":"Early Bird","amount":50}],"tuition":345,"runningTotal":1180},"message":{},"day":"FULL","courseId":"4UTS35","gradeLevel":"3-5","location":"Charlottesville Catholic","courseName":"Ultimate Trick Shots","checked":true},{"index":1,"weekId":4,"dateString":"June 28 - July 2, 2021","dateStart":1624885200000,"dateEnd":1625263200000,"value":"4PH35","billing":{"discount":["nnull",{"kind":"Early Bird","amount":50}],"tuition":345,"runningTotal":1475},"message":{},"day":"FULL","courseId":"4PH35","gradeLevel":"3-5","location":"Charlottesville Catholic","courseName":"Photography","checked":false},{"index":0,"weekId":5,"dateString":"July 12-16, 2021","dateStart":1626094800000,"dateEnd":1626472800000,"value":"5MT35","billing":{"discount":[{"kind":"Early Bird","amount":50}],"tuition":345,"runningTotal":1770},"message":{},"day":"FULL","courseId":"5MT35","gradeLevel":"3-5","location":"STEAM Incubator","courseName":"Media Tech: Sound & Movie Making","checked":true}],"dogs_array":["Marcy","Chester","Marais"],"formStack":{"uniqueId":"783007416","formId":"4223065","wixWebhookId":"21733792-1711-4004-8544-55ab15cef5cf"},"application":{"studentStatement":"Radio Science","photoRelease":"Approved"},"stamps":[{"kind":"creation","string":"Wed Mar 24 2021 12:47:23 GMT-0500 (Central Daylight Time)","iso":"20210324174723000","unix":1616608043},{"kind":"process","string":"Thu Jun 03 2021 09:08:40 GMT-0500 (Central Daylight Time)","iso":"20210603140840323","unix":1622729320}],"family":{"phones":[{"phone":"(218) 595-0499","role":"Primary Parent","who":"Shirley","kind":"cell","usage":"Personal"}],"emails":[{"email":"bradlowry+dannu@gmail.com","role":"Primary Parent","who":"Shirley","kind":"home","usage":"Personal"}],"messages":{"dox":["only messages you want the Whole Family to see"]},"student":{"photoRelease":true,"name":{"first":"Danny","last":"Partridge","preferred":"Danny","studentParentCombo":"Danny Partridge (Shirley)","lastFirst":"Partridge, Danny","fullName":"Danny Partridge"},"declaredGender":"Male","studentStatement":"Radio Science","messages":{"dox":["messages you want the Student only to see"]},"dobString":"02/07/2003","currentSchool":"Bonaducci Prep","currentGrade":3,"currentGradeString":"Third Grade","currentGradeLevel":"3-5","dob":{"date":"2003-02-07T06:00:00.000Z","month":2,"day":7,"year":2003}},"parent":{"messages":{"dox":["messages you want Both Parents to see"]},"primary":{"memberId":"INSTANTIATE","messages":{"dox":["messages you want the Primary Parent/Web Account Holder only to see"]},"last":"Partridge","first":"Shirley","fullName":"Shirley Partridge","lastFirst":"Partridge, Shirley"},"secondary":{"first":"Ruben","last":"Kincaid"}},"addresses":[{"kind":"mailing","address":{"streetAddress":{"number":"123","name":"Old Bus Way"},"city":"Teluca Lake","streetAddress2":"101","state":"CA","postalCode":"90210","country":"US","subdivision":"CA","location":{"latitude":"nnull","longitue":"nnull"},"formatted":"123 Old Bus Way, 101, Teluca Lake, CA 90210, USA"}}]},"countWeekArray":[-999,1,1,1,2,1,0,0,0,0],"writeMapWeekArray":[-999,1,2,3,4,5,0,0,0,0],"mapWeekCountObject":[[-999,-777],[1,1],[2,1],[3,1],[4,2],[5,1],[0,-999],[0,-999],[0,-999],[0,-999]],"blockMapArray":{"blockMapErrors":{"zeroCheckedCount":1,"multipleCheckedCount":0,"gradeLevelMismatchCount":0},"blockMapArray":[{"blockMap":-999,"week":-999,"switchIdArray":[-999],"selectedCount":-999,"checkedCount":-999,"zeroChecked":-999,"multipleChecked":-999,"gradeMismatchCount":-999},{"blockMap":1,"week":1,"switchIdArray":["#switch101","#switch102","#switch103"],"selectedCount":1,"checkedCount":1,"zeroChecked":0,"multipleChecked":0,"gradeMismatchCount":0},{"blockMap":2,"week":2,"switchIdArray":["#switch201","#switch202","#switch203"],"selectedCount":1,"checkedCount":1,"zeroChecked":0,"multipleChecked":0,"gradeMismatchCount":0},{"blockMap":3,"week":3,"switchIdArray":["#switch301","#switch302","#switch303"],"selectedCount":1,"checkedCount":0,"zeroChecked":1,"multipleChecked":0,"gradeMismatchCount":0},{"blockMap":4,"week":4,"switchIdArray":["#switch401","#switch402","#switch403"],"selectedCount":2,"checkedCount":1,"zeroChecked":0,"multipleChecked":0,"gradeMismatchCount":0},{"blockMap":5,"week":5,"switchIdArray":["#switch501","#switch502","#switch503"],"selectedCount":1,"checkedCount":1,"zeroChecked":0,"multipleChecked":0,"gradeMismatchCount":0},{"blockMap":6,"week":0,"switchIdArray":["#switch601","#switch602","#switch603"],"selectedCount":0,"checkedCount":0,"zeroChecked":0,"multipleChecked":0,"gradeMismatchCount":0},{"blockMap":7,"week":0,"switchIdArray":["#switch701","#switch702","#switch703"],"selectedCount":0,"checkedCount":0,"zeroChecked":0,"multipleChecked":0,"gradeMismatchCount":0},{"blockMap":8,"week":0,"switchIdArray":["#switch801","#switch802","#switch803"],"selectedCount":0,"checkedCount":0,"zeroChecked":0,"multipleChecked":0,"gradeMismatchCount":0},{"blockMap":9,"week":0,"switchIdArray":["#switch901","#switch902","#switch903"],"selectedCount":0,"checkedCount":0,"zeroChecked":0,"multipleChecked":0,"gradeMismatchCount":0}]},"enrollment":{"errorArray":[true,false,false,true],"overloadedErrorArray":[true,false,false,true],"messages":{"dox":["Zero Checked","Multible Checked","Student-Course GradeLevel","Grade-DOB","messaging specifically for the Enrollment Event"],"error":[],"warn":[],"fyi":[],"btw":[]},"errorNoOverloadArray":[false,false,false,false],"anyErrorWhatsoever":false}};
// testElementName = 'elijahCarpenter';
// testElementNotes= ['used for unwoundPrimaryParent.js'];
// testJSON={contactInfo:{name:{first:"Eli",last:"Carpenter"},company:"Forest Associates",jobTitle:"Human Resources",locale:"en-US",birthdate:"1991-08-01",labelKeys:["custom.gender-male","custom.t202106","custom.primary-parent"],emails:[{tag:"UNTAGGED",email:"eli.carpenter@example.com"},{tag:"MAIN",email:"qiqgroup+eli9375@gmail.com",primary:"true"}],phones:[{tag:"MOBILE",phone:"(375)-634-4884",primary:"true"},{tag:"HOME",phone:"(579)-264-8376"}],addresses:[{tag:"home",address:{streetAddress:{number:"9375",name:"Forest Ln",apt:"52"},addressLine2:"# 43",city:"Scottsdale",subdivision:"NM",postalCode:"27856",country:"US",location:{latitude:"-25.9980",longitude:"-136.6533"}}}],extendedFields:{"custom.lastupdate":"2016-01-29","custom.current-region":"Charlottesville","custom.timezone-offset":"+8:00","custom.legal-first":"Elijah","custom.seed":"b53333aa164cc0b1"}}};
// testElementName = 'penelopeGarret';
// testElementNotes= ['used for unwoundStudent.js'];
// testJSON={contactInfo:{name:{first:"Nellie",last:"Garrett"},company:"Nowlin University",jobTitle:"Manager",locale:"en-US",birthdate:"1984-06-27",labelKeys:["custom.gender-female","custom.t202106","custom.student"],emails:[{tag:"UNTAGGED",email:"nellie.garrett@example.com"},{tag:"MAIN",email:"qiqgroup+nellie9336@gmail.com",primary:"true"}],phones:[{tag:"MOBILE",phone:"(705)-610-7168",primary:"true"},{tag:"HOME",phone:"(173)-530-2911"}],addresses:[{tag:"home",address:{streetAddress:{number:"9336",name:"Nowlin Rd",apt:"13"},addressLine2:"# 4",city:"Tucson",subdivision:"TX",postalCode:"52405",country:"US",location:{latitude:"88.1425",longitude:"76.9592"}}}],extendedFields:{"custom.lastupdate":"2011-03-08","custom.current-region":"Blacksburg","custom.timezone-offset":"-4:00","custom.legal-first":"Penelope","custom.seed":"750893979db16754"}}};
// testElementName = 'lainiCooper';
// testElementNotes= ['used for unwoundSecondaryParent.js'];
// testJSON={contactInfo:{name:{first:"Laini",last:"Cooper"},company:"Robinson Incorporated",jobTitle:"Accounting",locale:"en-US",birthdate:"1980-07-15",labelKeys:["custom.gender-female","custom.t202106","custom.secondary-parent"],emails:[{tag:"UNTAGGED",email:"elaine.cooper@example.com"},{tag:"MAIN",email:"qiqgroup+elaine7686@gmail.com",primary:"true"}],phones:[{tag:"MOBILE",phone:"(984)-597-7116",primary:"true"},{tag:"HOME",phone:"(888)-829-9763"}],addresses:[{tag:"home",address:{streetAddress:{number:"7686",name:"Robinson Rd",apt:"65"},addressLine2:"# 37",city:"West Jordan",subdivision:"OH",postalCode:"15810",country:"US",location:{latitude:"86.6803",longitude:"71.6425"}}}],extendedFields:{"custom.lastupdate":"2017-01-29","custom.current-region":"Blacksburg","custom.timezone-offset":"+4:30","custom.legal-first":"Elaine","custom.seed":"f21adad517566eac"}}};
// ø <Not-Working>
// ! BECAUSE of real nulls (assumed to be 'object's in the code):
// ø </Not-Working>
// ! <CALL the Code>
let responseTest = expressionBuilderLaunch(testElementName,testJSON)
// console.warn('responseTest: ');
// console.warn(responseTest);
let finalCode = '//Final Code: ';
responseTest.expressionStringArray.forEach(line => {
    finalCode += `\n` + line;
});
console.warn(finalCode);
// ! </CALL the Code>

export function expressionBuilderLaunch(elementName,elementJSON,expressionChainArray = []){
    // ! <param & response>
    let paramObject = {};
    let responseObject = {};
    responseObject.expressionStringArray = [];
    // ! </param & response>
    let elementJSONtypeOf = typeof elementJSON;
    let element = {};
    if(elementJSONtypeOf !== 'object'){
        element = JSON.parse(elementJSON);

    }else{
        element = elementJSON;
    }
    
    // ! <unlikely Validation Catch>
    let elementTypeOf = typeof element;
    if(elementTypeOf !== 'object'){
        responseObject.errorStringArray = ['The parse JSON is not (typeof) an Object'];
        return responseObject;
    }
    if(element === null){
        responseObject.errorStringArray = ['The parse JSON is null'];
        return responseObject;
    }
    // ! </unlikely Validation Catch>
    // console.warn('element: ');
    // console.warn(element);

    let trueTypeOf = Array.isArray(element) ? 'array' : 'object'
    console.warn('trueTypeOf: ' + trueTypeOf);
    paramObject.objectFunctionCount = 0;
    paramObject.terminusFunctionCount = 0;
    paramObject.nextElement = element;
    paramObject.nextElementName = elementName;
    paramObject.nextElementTrueTypeOf = trueTypeOf;
    paramObject.nextElementStringStart = 'BASE';
    paramObject.previousElementTrueTypeOf = 'BASE';
    paramObject.previousElementStringStart = 'BASE';

    expressionBuilderObject(paramObject,responseObject);  
    return responseObject;
}



export function expressionBuilderObject(paramObject,responseObject){
    paramObject.objectFunctionCount++
    
    let stringThis = ``;
    if(responseObject.expressionStringArray.length === 0){
        stringThis += `let `
    }

    let nextElementKonstantHere  = paramObject.nextElement;
    let nextElementTrueTupeOfKonstantHere  = paramObject.nextElementTrueTypeOf;
    let nextElementStringStartKonstantHere  = paramObject.nextElementStringStart;
    if(paramObject.nextElementStringStart === 'BASE'){
        paramObject.nextElementStringStart = '';
    }
    
    let appendToStartString = '';
    appendToStartString += paramObject.previousElementTrueTypeOf === 'array' ? '[' :'.';
    appendToStartString += paramObject.nextElementName;
    appendToStartString += paramObject.previousElementTrueTypeOf === 'array' ? ']' : '';
    appendToStartString = nextElementStringStartKonstantHere === 'BASE' ? paramObject.nextElementName : appendToStartString;
    paramObject.nextElementStringStart += appendToStartString;
    nextElementStringStartKonstantHere  = paramObject.nextElementStringStart;
    
    stringThis += paramObject.nextElementStringStart === 'BASE' ? '' : paramObject.nextElementStringStart;
    if(Array.isArray(paramObject.nextElement)){
        stringThis += ` = [];`
    }else{
        stringThis += ` = {};`
    }
    responseObject.expressionStringArray.push(stringThis);
    paramObject.expressionChainString + paramObject.nextElementName;
    
    // ø <WAS Testing for 'null' Issue>
    // let trueTypeOf = typeof paramObject.nextElement;
    // trueTypeOf = Array.isArray(paramObject.nextElement) ? 'array' : trueTypeOf;
    // console.warn('['+paramObject.objectFunctionCount+']trueTypeOf: ' + trueTypeOf);
    // if(trueTypeOf !== 'object' && trueTypeOf !== 'array'){
    //     console.warn('paramObject.nextElement: ');
    //     console.warn(paramObject.nextElement);
    // }
    // let nextElement = paramObject.nextElement;
    // let nextElementKeyArray = Object.keys(nextElement);
    // ø </WAS Testing for 'null' Issue>
    let nextElementKeyArray = Object.keys(paramObject.nextElement);
    for (let index = 0; index < nextElementKeyArray.length; index++) {
        const elementKey = nextElementKeyArray[index];

        paramObject.previousElementTrueTypeOf = paramObject.nextElementTrueTypeOf;
        paramObject.nextElement = nextElementKonstantHere[elementKey];
        paramObject.nextElementName = elementKey; 
        paramObject.previousElementStringStart = paramObject.nextElementStringStart;
        
        let trueTypeOf = typeof paramObject.nextElement;
        let elementTypeOf = trueTypeOf;
        if(trueTypeOf === 'object'){
            trueTypeOf = Array.isArray(paramObject.nextElement) ? 'array' : trueTypeOf;
        }   
        paramObject.nextElementTrueTypeOf = trueTypeOf;
        
        if(elementTypeOf === 'object'){
            expressionBuilderObject(paramObject,responseObject);
        }else{
            expressionBuilderTerminus(paramObject,responseObject);
        }
        
        paramObject.nextElementStringStart = nextElementStringStartKonstantHere;
        paramObject.nextElementTrueTypeOf = nextElementTrueTupeOfKonstantHere;
        
    }
}

export function expressionBuilderTerminus(paramObject,responseObject){
    paramObject.terminusFunctionCount++;

    let appendToStartString = '';
    appendToStartString += paramObject.previousElementTrueTypeOf === 'array' ? '[' :'.';
    appendToStartString += paramObject.nextElementName;
    appendToStartString += paramObject.previousElementTrueTypeOf === 'array' ? ']' : '';
    let localStartString = paramObject.previousElementStringStart;
    localStartString += appendToStartString;

    let stringThisKey = localStartString;
    let stringThisValue = paramObject.nextElement;
    stringThisValue = paramObject.nextElementTrueTypeOf === 'string' ? `"${stringThisValue}"` : stringThisValue;
    let stringThis = `${stringThisKey} = ${stringThisValue};`
    responseObject.expressionStringArray.push(stringThis);
}