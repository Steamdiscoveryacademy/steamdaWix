// ! <FINAL>
let lastupdateDATE = new Date();
let lastupdate = lastupdateDATE.getFullYear().toString() + '-' + (lastupdateDATE.getMonth() + 1).toString() + '-' + lastupdateDATE.getDate().toString()
let currentRegion = "Charlottesville";//APP
let timezoneOffest = "-4:00";//Above and coreJSON

// let studentBDAY = /*enrollmentObj.family.student.dob.date = */ "2003-02-07T06:00:00.000Z";
// let studentBDAY = /*enrollmentObj.family.student.dob.date = */ "2003-11-24T06:00:00.000Z";
// let studentBDAY = /*enrollmentObj.family.student.dob.date = */ "2003-08-14T06:00:00.000Z";
// let studentBDAY = /*enrollmentObj.family.student.dob.date = */ "2003-06-06T06:00:00.000Z";
// let studentBDAY = /*enrollmentObj.family.student.dob.date = */ "2003-06-07T06:00:00.000Z";
let studentBDAY = ("00" + /*enrollmentObj.family.student.dob.month = */ "7").substr(-2);
studentBDAY += ("00" + /*enrollmentObj.family.student.dob.day = */ "12").substr(-2);

// studentBDAY = studentBDAY.substr(0,studentBDAY.indexOf('T'));
// studentBDAY = studentBDAY.substr(-5);
// studentBDAY = studentBDAY.substr(0,2) + studentBDAY.substr(-2);

let tBDAY = studentBDAY < '0607'/*local.getItem('termBeginMMDD')*/ ? false : true;
tBDAY = studentBDAY > '0813'/*local.getItem('termEndMMDD')*/ ? false : tBDAY;

// let idToLableKeyArray = [[1,'custom.w1-2021060711'],[2,'custom.w2-2021061418'],[3,'custom.w3-2021062125'],[4,'custom.w4-2021062832'],[5,'custom.w5-2021071216'],[6,'custom.w6-2021071923'],[7,'custom.w7-2021072630'],[8,'custom.w8-2021080206'],[9,'custom.w9-2021080913'],['custom.w1-2021060711',1],['custom.w2-2021061418',2],['custom.w3-2021062125',3],['custom.w4-2021062832',4],['custom.w5-2021071216',5],['custom.w6-2021071923',6],['custom.w7-2021072630',7],['custom.w8-2021080206',8],['custom.w9-2021080913',9]];
let idToLabelKeyArray = [['custom.w0-2021010102','0101','0102'],['custom.w1-2021060711','0607','0611'],['custom.w2-2021061418','0614','0618'],['custom.w3-2021062125','0621','0625'],['custom.w4-2021062832','0628','0702'],['custom.w5-2021071216','0712','0716'],['custom.w6-2021071923','0719','0723'],['custom.w7-2021072630','0726','0730'],['custom.w8-2021080206','0802','0806'],['custom.w9-2021080913','0809','0813']];
let weekIdToLabelKeyJSON = JSON.stringify(idToLabelKeyArray);
console.warn('weekIdToLabelKeyJSON: ');
console.warn(weekIdToLabelKeyJSON);

// let courseArray = enrollmentObj.courses_array;
let courseArray = [];
courseArray.push({"weekId":1})
// courseArray.push({"weekId":2})
// courseArray.push({"weekId":3})
courseArray.push({"weekId":4})
courseArray.push({"weekId":5})
courseArray.push({"weekId":6})
// courseArray.push({"weekId":7})
// courseArray.push({"weekId":8})
courseArray.push({"weekId":9})

let hypothesisStringArray = [];
hypothesisStringArray.push('w1 LabelKey');
let resultStringArray = [];

let finalLabelKeyArray = [];
let labelKey = "";
let beginBDAY = "";
let endBDAY = "";
for (let index = 0; index < courseArray.length; index++) {
    let element = courseArray[index];
    labelKey = idToLabelKeyArray[element.weekId][0];
    finalLabelKeyArray.push(labelKey);
    beginBDAY = idToLabelKeyArray[element.weekId][1];
    endBDAY = idToLabelKeyArray[element.weekId][2];
    wkBDAY = studentBDAY < beginBDAY ? false : true;
    wkBDAY = studentBDAY > endBDAY ? false : wkBDAY;
    if(wkBDAY){
        finalLabelKeyArray.push(labelKey + 'bday');
    }
}
finalLabelKeyArray.push('custom.t202106'/*local.getItem('termLabelKey')*/);
if(tBDAY){
    finalLabelKeyArray.push('custom.t202106'/*local.getItem('termLabelKey')*/ + 'bday')
}
// ! </FINAL>
console.warn('hypothesisStringArray: ');
console.warn(hypothesisStringArray);

console.warn('finalLabelKeyArray: ');
console.warn(finalLabelKeyArray);