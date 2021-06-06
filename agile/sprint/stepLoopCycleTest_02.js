let numberWordJSON = {"description":["use the path 'wordsByIndex' and then the index is what you want the word for","then gather word by language key","'en' for English","'es' for Spanish","of course, this is extensible"],"wordsByIndex":[{"en":"zero","es":"cero"},{"en":"one","es":"uno"},{"en":"two","es":"dos"},{"en":"three","es":"tres"},{"en":"four","es":"cuatro"},{"en":"five","es":"cinco"},{"en":"six","es":"seis"},{"en":"seven","es":"siete"},{"en":"eight","es":"ocho"},{"en":"nine","es":"nueve"},{"en":"ten","es":"diez"},{"en":"eleven","es":"once"},{"en":"twelve","es":"doce"},{"en":"thirteen","es":"trece"},{"en":"fourteen","es":"catorce"},{"en":"fifteen","es":"quince"},{"en":"sixteen","es":"dieciséis"},{"en":"seventeen","es":"diecisiete"},{"en":"eighteen","es":"dieciocho"},{"en":"nineteen","es":"diecinueve"},{"en":"twenty","es":"veinte"},{"en":"twenty-one","es":"veintiuno"},{"en":"twenty-two","es":"veintidós"},{"en":"twenty-three","es":"veintitrés"},{"en":"twenty-four","es":"veinticuatro"},{"en":"twenty-five","es":"veinticinco"},{"en":"twenty-six","es":"veintiséis"},{"en":"twenty-seven","es":"veintisiete"},{"en":"twenty-eight","es":"veintiocho"},{"en":"twenty-nine","es":"veintinueve"},{"en":"thirty","es":"treinta"},{"en":"thirty-one","es":"treinta y uno"},{"en":"thirty-two","es":"treinta y dos"},{"en":"thirty-three","es":"treinta y tres"},{"en":"thirty-four","es":"treinta y cuatro"},{"en":"thirty-five","es":"treinta y cinco"},{"en":"thirty-six","es":"treinta y seis"},{"en":"thirty-seven","es":"treinta y siete"},{"en":"thirty-eight","es":"treinta y ocho"},{"en":"thirty-nine","es":"treinta y nueve"},{"en":"forty","es":"cuarenta"},{"en":"forty-one","es":"cuarenta y uno"},{"en":"forty-two","es":"cuarenta y dos"},{"en":"forty-three","es":"cuarenta y tres"},{"en":"forty-four","es":"cuarenta y cuatro"},{"en":"forty-five","es":"cuarenta y cinco"},{"en":"forty-six","es":"cuarenta y seis"},{"en":"forty-seven","es":"cuarenta y siete"},{"en":"forty-eight","es":"cuarenta y ocho"},{"en":"forty-nine","es":"cuarenta y nueve"},{"en":"fifty","es":"cincuenta"},{"en":"fifty-one","es":"cincuenta y uno"},{"en":"fifty-two","es":"cincuenta y dos"},{"en":"fifty-three","es":"cincuenta y tres"},{"en":"fifty-four","es":"cincuenta y cuatro"},{"en":"fifty-five","es":"cincuenta y cinco"},{"en":"fifty-six","es":"cincuenta y seis"},{"en":"fifty-seven","es":"cincuenta y siete"},{"en":"fifty-eight","es":"cincuenta y ocho"},{"en":"fifty-nine","es":"cincuenta y nueve"},{"en":"sixty","es":"sesenta"},{"en":"sixty-one","es":"sesenta y uno"},{"en":"sixty-two","es":"sesenta y dos"},{"en":"sixty-three","es":"sesenta y tres"},{"en":"sixty-four","es":"sesenta y cuatro"},{"en":"sixty-five","es":"sesenta y cinco"},{"en":"sixty-six","es":"sesenta y seis"},{"en":"sixty-seven","es":"sesenta y siete"},{"en":"sixty-eight","es":"sesenta y ocho"},{"en":"sixty-nine","es":"sesenta y nueve"},{"en":"seventy","es":"setenta"},{"en":"seventy-one","es":"setenta y uno"},{"en":"seventy-two","es":"setenta y dos"},{"en":"seventy-three","es":"setenta y tres"},{"en":"seventy-four","es":"setenta y cuatro"},{"en":"seventy-five","es":"setenta y cinco"},{"en":"seventy-six","es":"setenta y seis"},{"en":"seventy-seven","es":"setenta y siete"},{"en":"seventy-eight","es":"setenta y ocho"},{"en":"seventy-nine","es":"setenta y nueve"},{"en":"eighty","es":"ochenta"},{"en":"eighty-one","es":"ochenta y uno"},{"en":"eighty-two","es":"ochenta y dos"},{"en":"eighty-three","es":"ochenta y tres"},{"en":"eighty-four","es":"ochenta y cuatro"},{"en":"eighty-five","es":"ochenta y cinco"},{"en":"eighty-six","es":"ochenta y seis"},{"en":"eighty-seven","es":"ochenta y siete"},{"en":"eighty-eight","es":"ochenta y ocho"},{"en":"eighty-nine","es":"ochenta y nueve"},{"en":"ninety","es":"noventa"},{"en":"ninety-one","es":"noventa y uno"},{"en":"ninety-two","es":"noventa y dos"},{"en":"ninety-three","es":"noventa y tres"},{"en":"ninety-four","es":"noventa y cuatro"},{"en":"ninety-five","es":"noventa y cinco"},{"en":"ninety-six","es":"noventa y seis"},{"en":"ninety-seven","es":"noventa y siete"},{"en":"ninety-eight","es":"noventa y ocho"},{"en":"ninety-nine","es":"noventa y nueve"},{"en":"one hundred","es":"cien"}]}; 
let stepArrayOrig = [ 'IINSTANTIATE','PREP_ppMember','EXECUTE_ppMember','PREP_stMember','EXECUTE_stMember','PREP_ppContact','PREP_ppDatabase','PREP_stContact','PREP_stDatabase','PREP_spContact','PREP_spDatabase','EXECUTE_ppContact','EXECUTE_ppDatabase','EXECUTE_stContact','EXECUTE_stDatabase','EXECUTE_spContact','EXECUTE_spDatabase','CCOMPLETE' ];
let memItemLIST = stepArrayOrig.toString();
let memItemCURRENT = stepArrayOrig[0];
let memItemNEXT = stepArrayOrig[1];
let cycleReturnCurrNxtLst = 'PPENDING';
let cycleReturnArray = [];
stepsDisplayStatus(memItemLIST,memItemCURRENT,memItemNEXT,'init')


let testIndex = 0;
let testMax = 2
let testIndexWord = 'cero';
while (testIndex < testMax) {
    testIndex++;
    testIndexWord = numberWordJSON.wordsByIndex[testIndex].es;
    cycleReturnCurrNxtLst = stepsCycleSteps(memItemLIST);
    cycleReturnArray = cycleReturnCurrNxtLst.split('|');
    memItemCURRENT = cycleReturnArray[0];
    memItemNEXT = cycleReturnArray[1];
    memItemLIST = cycleReturnArray[2];
    stepsDisplayStatus(memItemLIST,memItemCURRENT,memItemNEXT,testIndexWord)
}
    
// cycleReturnCurrNxtLst = stepsCycleSteps(memItemLIST);
// cycleReturnArray = cycleReturnCurrNxtLst.split('|');
// memItemCURRENT = cycleReturnArray[0];
// memItemNEXT = cycleReturnArray[1];
// memItemLIST = cycleReturnArray[2];
// stepsDisplayStatus(memItemLIST,memItemCURRENT,memItemNEXT,'second step cycled')



export function stepsDisplayStatus(List,Current,Next,tag = 'unknown tag'){
    console.warn('========================================')
    console.warn('==========      <'+tag+'>     ==========')
    console.warn('memItemCURRENT: ' + Current)
    console.warn('memItemNEXT: ' + Next)
    console.warn('memItemLIST: ')
    List = List.replace('CCOMPLETE,', 'CCOMPLETE,\n')
    console.warn(List)
    console.warn('==========      </'+tag+'>    ==========')
    console.warn('========================================')
}

export function stepsCycleSteps(thisMemItemLIST){
    //memItemLIST will be replaced with memory.getItem()
    let funcStepArray = thisMemItemLIST.split(',');
    let funcMemItemCURRENT = funcStepArray[1];
    let funcMemItemNEXT = funcStepArray[2];
    let cycleElement = funcStepArray.shift();
    funcStepArray.push(cycleElement);
    let funcMemItemLIST = funcStepArray.toString();
    let funcMemItemCurrNxtLst = funcMemItemCURRENT + '|' + funcMemItemNEXT + '|' + funcMemItemLIST;
    return funcMemItemCurrNxtLst;
    //memItemLIST, memItemCURRENT and memItemNEXT will be replaced with memory.getItem()
    //thus, memItemCurrNxtList being returned and parsed upon return will be MOOT
}


// let memoryGetItemEnrollmentStepList = "RRESET";
// if(memoryGetItemEnrollmentStepList.indexOf(',') < 0){
//     memoryGetItemEnrollmentStepList = "IINSTANTIATE,PREP_ppMember,EXECUTE_ppMember,PREP_stMember,EXECUTE_stMember,PREP_ppContact,PREP_ppDatabase,PREP_stContact,PREP_stDatabase,PREP_spContact,PREP_spDatabase,EXECUTE_ppContact,EXECUTE_ppDatabase,EXECUTE_stContact,EXECUTE_stDatabase,EXECUTE_spContact,EXECUTE_spDatabase,CCOMPLETE";
//     memoryGetItemEnrollmentStepCurrent = 'PPENDING';
//     memoryGetItemEnrollmentStepNext = memoryGetItemEnrollmentStepList.substr(0,memoryGetItemEnrollmentStepList.indexOf(','));
// }

// // let exitAfter = 'ALL';
// let exitAfter = 'EXECUTE_ppMember​​​';
// let exitNow = 'FFALSE';
// // exitNow = 'TTRUE'; //Force: until logic below is ready
// //memory.getItem(List) if indexOf(exitAfter) < indexOf('CCOMPLETE')
// exitNow = exitAfter === 'ALL' ? 'TTRUE' : exitNow;
// // ø <cycleStepList>
// let i = 0;
// while (i < 77) {
//     i++;
//     // let list = memory.getItem('enrollmentStepList');
//     let list = memoryGetItemEnrollmentStepList;
//     // let cycleThis = memory.getItem('enrollmentStepList').substr(0,memory.getItem('enrollmentStepList').indexOf(','));
//     let cycleThis = memoryGetItemEnrollmentStepList.substr(0,memoryGetItemEnrollmentStepList.indexOf(','));
//     console.log('cycleThis: ' + cycleThis);
//     // let newList = memory.getItem('enrollmentStepList').substr(memory.getItem('enrollmentStepList').indexOf(',') + 1);
//     let newList = memoryGetItemEnrollmentStepList.substr(memoryGetItemEnrollmentStepList.indexOf(',') + 1);
//     // console.log('newList: ' + newList);
//     newList += ',' + cycleThis;
//     cycleThis = memoryGetItemEnrollmentStepList.substr(0,memoryGetItemEnrollmentStepList.indexOf(','));
//     memoryGetItemEnrollmentStepList = newList;
//     // memory.setItem('enrollmentStepList',newList);
    
    
//     // // memory.setItem('enrollmentStepCurrent','PPENDING');
//     // memoryGetItemEnrollmentStepCurrent = cycleThis;
//     // let indexOf = memory.getItem('enrollmentStepList').indexOf(',');
//     let indexOf = memoryGetItemEnrollmentStepList.indexOf(',');
//     // let stepNext = memory.getItem('enrollmentStepList').substr(0,indexOf + 1);
//     // // memory.setItem('enrollmentStepNext',stepNext);
//     memoryGetItemEnrollmentStepCurrent = memoryGetItemEnrollmentStepList.substr(0,indexOf);
//     // indexOf = memoryGetItemEnrollmentStepList.indexOf(',',indexOf + 1);
//     memoryGetItemEnrollmentStepNext = memoryGetItemEnrollmentStepList.substr(indexOf + 1);
//     memoryGetItemEnrollmentStepNext = memoryGetItemEnrollmentStepNext.substr(0,memoryGetItemEnrollmentStepNext.indexOf(','));
//     exitNow = exitAfter === memoryGetItemEnrollmentStepCurrent ? 'EXIT_AFTER_MATCH' : exitNow;
//     exitNow = memoryGetItemEnrollmentStepCurrent === 'CCOMPLETE' ? 'EXIT_CCOMPLETE_CURRENT' : exitNow;
    
//     if(exitNow !== 'FFALSE'){
//         break;//(Break Loop is Exit)
//     }
// }
// // ø </cycleStepList>



// console.warn('exitNow: ' + exitNow);
// console.warn('memoryGetItemEnrollmentStepCurrent: ' + memoryGetItemEnrollmentStepCurrent);
// console.warn('memoryGetItemEnrollmentStepNext: ' + memoryGetItemEnrollmentStepNext);
// console.warn('memoryGetItemEnrollmentStepList: ');
// console.warn(memoryGetItemEnrollmentStepList);






