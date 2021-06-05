
let stepKey = 'HHOLDER';
// let stepArrayOrig = [ 'IINSTANTIATE','PREP_ppMember','EXECUTE_ppMember','PREP_stMember','EXECUTE_stMember','PREP_ppContact','PREP_ppDatabase','PREP_stContact','PREP_stDatabase','PREP_spContact','PREP_spDatabase','EXECUTE_ppContact','EXECUTE_ppDatabase','EXECUTE_stContact','EXECUTE_stDatabase','EXECUTE_spContact','EXECUTE_spDatabase','CCOMPLETE' ];


let stepList = "IINSTANTIATE,PREP_ppMember,EXECUTE_ppMember,PREP_stMember,EXECUTE_stMember,PREP_ppContact,PREP_ppDatabase,PREP_stContact,PREP_stDatabase,PREP_spContact,PREP_spDatabase,EXECUTE_ppContact,EXECUTE_ppDatabase,EXECUTE_stContact,EXECUTE_stDatabase,EXECUTE_spContact,EXECUTE_spDatabase,CCOMPLETE";
// let stepList = "IINSTANTIATE,PREP_ppMember,EXECUTE_ppMember,PREP_stMember,EXECUTE_stMember,PREP_ppContact,PREP_ppDatabase,PREP_stContact,PREP_stDatabase,PREP_spContact,PREP_spDatabase,EXECUTE_ppContact,EXECUTE_ppDatabase,EXECUTE_stContact,EXECUTE_stDatabase,EXECUTE_spContact,EXECUTE_spDatabase,CCOMPLETE";

let stepArray = stepList.split(',');
// console.warn('stepArray: ');
// console.warn(stepArray);

let stepArrayDeclarationString = 'stepArrayDeclarationString is PPENDING'
let exitAfterStepDeclarationAndCheckString = `let exitAfter = 'ALL';`
    + `\nlet exitNow = false;`
    + `\nexitNow = true; //Force: until logic below is ready`
    + `\n//memory.getItem(List) if indexOf(exitAfter) < indexOf('CCOMPLETE')`
    + `\nexitNow = exitAfter === 'ALL' ? true : exitNow;//memory.getItem(List) if indexOf(exitAfter) < indexOf(CCOMPLETE)`;
// console.warn('exitAfterStepDeclarationAndCheckString: ');
// console.warn(exitAfterStepDeclarationAndCheckString);

let loopBeginString = 'loopBeginString is PPENDING';
let loopEndString = 'loopEndString is PPENDING';

let switchBeginString = `let errorString = '';`
    + `\nswitch (stepKey) {`;
let switchEndString = `\n\n    default:`
+ `\n        errorString = 'stepKey ('`+` + stepKey + `+`') is Not Supported within this Switch Structure';`
+ `\n        break;`
+ `\n    }`;
// console.warn('switchEndString: ');
// console.warn(switchEndString);
let switchItemBeginString = `\n    case '` + stepKey + `':`;
let switchItemEndString = `\n        break;`
// console.warn('switchItemBeginString THEN switchItemEndString: ');
// console.warn(switchItemBeginString + switchItemEndString);
// console.warn('switchItemBeginString: ');
// console.warn(switchItemBeginString);
// console.warn('switchItemEndString: ');
// console.warn(switchItemEndString);


let switchCode = switchBeginString;
// let buildFunctionName = '';
stepArray.forEach(stepKey => {
    // console.log(stepKey);
    // ! <could be a function>
    let functionString = stepKey.substr(0,5) === 'PREP_' ? stepKey.substr(5) : '';
    functionString = stepKey.substr(0,8) === 'EXECUTE_' ? stepKey.substr(8) : functionString;
    functionString += stepKey.substr(0,5) === 'PREP_' ? 'Prep' : '';
    functionString += stepKey.substr(0,8) === 'EXECUTE_' ? 'Execute' : '';
    functionString += stepKey.substr(0,5) === 'PREP_' ? 'JSON' : '';
    functionString += stepKey.substr(0,8) === 'EXECUTE_' ? 'Upsert' : '';
    functionString = functionString.length > 0 ? '\n        ' + functionString + '()' : '';
    // console.warn('functionString: ' + functionString);
    // ! </could be a function>
    // ! <could be a function>
    let consoleLogString = `\n        consoleLog('Step: ' + stepKey)`; 
    // console.warn('consoleLogString: ' + consoleLogString);
    // ! </could be a function>
    // if(stepKey.substr(0,5) === 'PREP_'){
        buildFunctionName = stepKey.substr(5) + `BuildOnDeckJSON();`
    // }else if(stepKey.substr(0,8) === 'EXECUTE_'){
        buildFunctionName = `$paramObject = JSON.parse(memory.getItem('` + stepKey.substr(8) + `OnDeckJSON'));`
    // }else{
        buildFunctionName = `stepKey.toUpperCase();`;
    // }

    switchItemBeginString = `\n    case '` + stepKey + `':`;
    switchElementThis = switchItemBeginString;
    switchElementThis += functionString;
    switchElementThis += consoleLogString;
    switchElementThis += switchItemEndString;
    // console.warn('switchElementThis: ');
    // console.warn(switchElementThis);
    switchCode += switchElementThis;
    // switchCode += `\n     case '` + stepKey + `':
    // ` + buildFunctionName + `
    //      break;\n`
});
switchCode += switchEndString;





// switchCode += `\n    default:
//          errorString = 'stepKey () is Not Supported within this Switch Structure';
//          break;
// }`;

console.warn('switchCode: ');
console.warn(switchCode);





// switch (key) {
//     case value:

//         break;

//     default:
//         break;
// }
