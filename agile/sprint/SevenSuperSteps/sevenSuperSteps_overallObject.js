let sssObject = {};
sssObject.stepObjectArray = [];

// ø <superStep stepAray manual>
let stepKeyArrayHolder =  [
    "zero",
    "instantiate",
    "memberConfirm",
    "dupeDelete",
    "databaseForPrimaryAndStudent",
    "contactForPrimaryAndStudent",
    "contactAndDatabaseForSecondary",
    "resolveAndDestroy"
];

let allStepArray = [];
let holderforAllStepArray = [];
let firstStepArray = [];
let lastStepArray = [];
let allStepThis = [];
let allStepThisForShift = [];
let allStepThisForPop = [];
let firstStepThis = '';
let lastStepThis = '';


// ø <Zeroth Step Manual>
allStepThis = ['zero'];
// allStepArray[0] = allStepThis;
// console.warn('allStepThis: ');
// console.warn(allStepThis);
allStepThisForShift = [...allStepThis];
allStepThisForPop = [...allStepThis];
// allStepArray.push(allStepThis);
// holderforAllStepArray = [...allStepArray];
// console.warn('holderforAllStepArray: ');
// console.warn(holderforAllStepArray);
allStepArray = allStepArray.concat([allStepThis]);
//var newArr = arr.concat([elem]);
firstStepThis = allStepThisForShift.shift();
console.warn('firstStepThis: ' + firstStepThis);
firstStepArray.push(firstStepThis);
lastStepThis = allStepThisForPop.pop();
console.warn('lastStepThis: ' + lastStepThis);
lastStepArray.push(lastStepThis);
// ø </Zeroth Step Manual>
// // ø <First Step Manual>
// allStepThis = ['zero','one','two'];
// // allStepArray[0] = allStepThis;
// // console.warn('allStepThis: ');
// // console.warn(allStepThis);
// allStepThisForShift = [...allStepThis];
// allStepThisForPop = [...allStepThis];
// // allStepArray.push(allStepThis);
// // holderforAllStepArray = [...allStepArray];
// // console.warn('holderforAllStepArray: ');
// // console.warn(holderforAllStepArray);
// allStepArray = allStepArray.concat([allStepThis]);
// //var newArr = arr.concat([elem]);
// firstStepThis = allStepThisForShift.shift();
// console.warn('firstStepThis: ' + firstStepThis);
// firstStepArray.push(firstStepThis);
// lastStepThis = allStepThisForPop.pop();
// console.warn('lastStepThis: ' + lastStepThis);
// lastStepArray.push(lastStepThis);
// // ø </First Step Manual>
// // ø <Second Step Manual>
// allStepThis = ['three','four','five'];
// // allStepArray[0] = allStepThis;
// // console.warn('allStepThis: ');
// // console.warn(allStepThis);
// allStepThisForShift = [...allStepThis];
// allStepThisForPop = [...allStepThis];
// // allStepArray.push(allStepThis);
// // holderforAllStepArray = [...allStepArray];
// // console.warn('holderforAllStepArray: ');
// // console.warn(holderforAllStepArray);
// allStepArray = allStepArray.concat([allStepThis]);
// //var newArr = arr.concat([elem]);
// firstStepThis = allStepThisForShift.shift();
// console.warn('firstStepThis: ' + firstStepThis);
// firstStepArray.push(firstStepThis);
// lastStepThis = allStepThisForPop.pop();
// console.warn('lastStepThis: ' + lastStepThis);
// lastStepArray.push(lastStepThis);
// // ø </Second Step Manual>
// // ø <Third Step Manual>
// allStepThis = ['six','seven','eight'];
// // allStepArray[0] = allStepThis;
// // console.warn('allStepThis: ');
// // console.warn(allStepThis);
// allStepThisForShift = [...allStepThis];
// allStepThisForPop = [...allStepThis];
// // allStepArray.push(allStepThis);
// // holderforAllStepArray = [...allStepArray];
// // console.warn('holderforAllStepArray: ');
// // console.warn(holderforAllStepArray);
// allStepArray = allStepArray.concat([allStepThis]);
// //var newArr = arr.concat([elem]);
// firstStepThis = allStepThisForShift.shift();
// console.warn('firstStepThis: ' + firstStepThis);
// firstStepArray.push(firstStepThis);
// lastStepThis = allStepThisForPop.pop();
// console.warn('lastStepThis: ' + lastStepThis);
// lastStepArray.push(lastStepThis);
// // ø </Third Step Manual>
// // ø <Fourth Step Manual>
// allStepThis = ['nine','ten','eleven'];
// // allStepArray[0] = allStepThis;
// // console.warn('allStepThis: ');
// // console.warn(allStepThis);
// allStepThisForShift = [...allStepThis];
// allStepThisForPop = [...allStepThis];
// // allStepArray.push(allStepThis);
// // holderforAllStepArray = [...allStepArray];
// // console.warn('holderforAllStepArray: ');
// // console.warn(holderforAllStepArray);
// allStepArray = allStepArray.concat([allStepThis]);
// //var newArr = arr.concat([elem]);
// firstStepThis = allStepThisForShift.shift();
// console.warn('firstStepThis: ' + firstStepThis);
// firstStepArray.push(firstStepThis);
// lastStepThis = allStepThisForPop.pop();
// console.warn('lastStepThis: ' + lastStepThis);
// lastStepArray.push(lastStepThis);
// // ø </Fourth Step Manual>
// // ø <Fifth Step Manual>
// allStepThis = ['twelve','thirteen','fourteen'];
// // allStepArray[0] = allStepThis;
// // console.warn('allStepThis: ');
// // console.warn(allStepThis);
// allStepThisForShift = [...allStepThis];
// allStepThisForPop = [...allStepThis];
// // allStepArray.push(allStepThis);
// // holderforAllStepArray = [...allStepArray];
// // console.warn('holderforAllStepArray: ');
// // console.warn(holderforAllStepArray);
// allStepArray = allStepArray.concat([allStepThis]);
// //var newArr = arr.concat([elem]);
// firstStepThis = allStepThisForShift.shift();
// console.warn('firstStepThis: ' + firstStepThis);
// firstStepArray.push(firstStepThis);
// lastStepThis = allStepThisForPop.pop();
// console.warn('lastStepThis: ' + lastStepThis);
// lastStepArray.push(lastStepThis);
// // ø </Fifth Step Manual>
// // ø <Sixth Step Manual>
// allStepThis = ['fifteen','sixteen','seventeen'];
// // allStepArray[0] = allStepThis;
// // console.warn('allStepThis: ');
// // console.warn(allStepThis);
// allStepThisForShift = [...allStepThis];
// allStepThisForPop = [...allStepThis];
// // allStepArray.push(allStepThis);
// // holderforAllStepArray = [...allStepArray];
// // console.warn('holderforAllStepArray: ');
// // console.warn(holderforAllStepArray);
// allStepArray = allStepArray.concat([allStepThis]);
// //var newArr = arr.concat([elem]);
// firstStepThis = allStepThisForShift.shift();
// console.warn('firstStepThis: ' + firstStepThis);
// firstStepArray.push(firstStepThis);
// lastStepThis = allStepThisForPop.pop();
// console.warn('lastStepThis: ' + lastStepThis);
// lastStepArray.push(lastStepThis);
// // ø </Sixth Step Manual>
// // ø <Seventh Step Manual>
// allStepThis = ['eighteen','ninteen','twenty'];
// // allStepArray[0] = allStepThis;
// // console.warn('allStepThis: ');
// // console.warn(allStepThis);
// allStepThisForShift = [...allStepThis];
// allStepThisForPop = [...allStepThis];
// // allStepArray.push(allStepThis);
// // holderforAllStepArray = [...allStepArray];
// // console.warn('holderforAllStepArray: ');
// // console.warn(holderforAllStepArray);
// allStepArray = allStepArray.concat([allStepThis]);
// //var newArr = arr.concat([elem]);
// firstStepThis = allStepThisForShift.shift();
// console.warn('firstStepThis: ' + firstStepThis);
// firstStepArray.push(firstStepThis);
// lastStepThis = allStepThisForPop.pop();
// console.warn('lastStepThis: ' + lastStepThis);
// lastStepArray.push(lastStepThis);
// // ø </Seventh Step Manual>

console.warn('allStepArray: ');
console.warn(JSON.stringify(allStepArray));
console.warn('firstStepArray: ');
console.warn(firstStepArray);
console.warn('lastStepArray: ');
console.warn(lastStepArray);

// ø </superStep stepAray manual>

// ø <step titles manual>
let titleArray = [];
titleArray.push('ZERO');
let longTitleArray = [];
longTitleArray.push('ZERO');

let titleThis = 'Instantiate';
titleArray.push(titleThis);
titleThis = 'Instantiate Enrollment';
longTitleArray.push(titleThis);

titleThis = 'Member Confirm';
titleArray.push(titleThis);
titleThis = 'Confirm Members for Primary and Student';
longTitleArray.push(titleThis);

titleThis = 'Dupe Delete';
titleArray.push(titleThis)
titleThis = 'Delete any Duplicate Contacts (known bug)';
longTitleArray.push(titleThis);

titleThis = 'Database for Primary and Student';
titleArray.push(titleThis);
titleThis = 'Insert Records into the Person Database for Primary and Student';
longTitleArray.push(titleThis);

titleThis = 'Contact for Primary and Student';
titleArray.push(titleThis);
titleThis = 'Update Contacts for Primary and Student with Complex Enrollment Data';
longTitleArray.push(titleThis);

titleThis = 'Contact and Database for Secondary';
titleArray.push(titleThis);
titleThis = 'Upsert Contact and Insert Record into Person database for Secondary';
longTitleArray.push(titleThis);

titleThis = 'Resolve and Destroy';
titleArray.push(titleThis);
titleThis = "Resolve the Application Record of Webhook Payload Database and Off-Ramp the Post Enrollment Process";
longTitleArray.push(titleThis);

// console.warn('titleArray: ');
// console.warn(titleArray);
// console.warn('longTitleArray: ');
// console.warn(longTitleArray);
// ø </step titles manual>

// buildStepObjectArrayBase(titleArray,longTitleArray,sssObject)

// console.warn('//sssObject: ');
// console.warn(JSON.stringify(sssObject,undefined,4));
// console.warn('//stepKeyArray: ')
// console.warn(sssObject.stepKeyArray)





export function buildStepObjectArrayBase(titleArray,longTitleArray,sssObject){
    
    let titleWordArray = [];//titleThis.split(' ');
    let firstLetter = '';
    let wordRemainder = '';
    let stepKeyArray = [];
    for (let index = 0; index < titleArray.length; index++) {
        let titleThis = titleArray[index];
        let longTitleThis = longTitleArray[index];
        
        titleWordArray = titleThis.trim().split(' ');
        
        let first = true;
        let titleKeyThis = '';
        titleWordArray.forEach(word => {
            // console.log(word);
            if(first){
                titleKeyThis += word.toLowerCase();
            }
            if(!first){
                firstLetter = word.substr(0,1).toUpperCase();
                wordRemainder = word.substr(1).toLowerCase();
                titleKeyThis += firstLetter + wordRemainder;
            }
            first = false;
            
        });
        stepKeyArray.push(titleKeyThis);
        
        sssObject.stepKeyArray = stepKeyArray;
        let stepObject = {};
        stepObject.titleKey = titleKeyThis;
        stepObject.title = titleThis;
        stepObject.longTitle = longTitleThis;
        sssObject.stepObjectArray.push(stepObject);
    }
    
}