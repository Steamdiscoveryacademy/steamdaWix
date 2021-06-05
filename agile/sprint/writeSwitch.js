
let stepKey = 'HHOLDER';
let stepArrayOrig = [ 'IINSTANTIATE','PREP_ppMember','EXECUTE_ppMember','PREP_stMember','EXECUTE_stMember','PREP_ppContact','PREP_ppDatabase','PREP_stContact','PREP_stDatabase','PREP_spContact','PREP_spDatabase','EXECUTE_ppContact','EXECUTE_ppDatabase','EXECUTE_stContact','EXECUTE_stDatabase','EXECUTE_spContact','EXECUTE_spDatabase','CCOMPLETE' ];
//`\n` + ind0 + `
let ind0 = '';
let ind4 = '    ';
let ind8 = '        ';
let ind12 = '            ';
let ind16 = '                ';
let comma = '';
// ! <could be a function>
let stepArrayDeclarationString = `let stepArray = [`;
stepArrayOrig.forEach(element => {
    // console.log(element);
    stepArrayDeclarationString += comma + `'` + element + `'`;
    comma = ',';
});
stepArrayDeclarationString += `];`;
// console.warn('stepArrayDeclarationString: ');
// console.warn(stepArrayDeclarationString);
// ! </could be a function>

let stepList = "IINSTANTIATE,PREP_ppMember,EXECUTE_ppMember,PREP_stMember,EXECUTE_stMember,PREP_ppContact,PREP_ppDatabase,PREP_stContact,PREP_stDatabase,PREP_spContact,PREP_spDatabase,EXECUTE_ppContact,EXECUTE_ppDatabase,EXECUTE_stContact,EXECUTE_stDatabase,EXECUTE_spContact,EXECUTE_spDatabase,CCOMPLETE";
// let stepList = "IINSTANTIATE,PREP_ppMember,EXECUTE_ppMember,PREP_stMember,EXECUTE_stMember,PREP_ppContact,PREP_ppDatabase,PREP_stContact,PREP_stDatabase,PREP_spContact,PREP_spDatabase,EXECUTE_ppContact,EXECUTE_ppDatabase,EXECUTE_stContact,EXECUTE_stDatabase,EXECUTE_spContact,EXECUTE_spDatabase,CCOMPLETE";

let stepArray = stepList.split(',');
// console.warn('stepArray: ');
// console.warn(stepArray);

let exitAfterStepDeclarationAndCheckString = `\n` + ind0 + `let exitAfter = 'ALL';`
    + `\n` + ind0 + `let exitNow = false;`
    + `\n` + ind0 + `exitNow = true; //Force: until logic below is ready`
    + `\n` + ind0 + `//memory.getItem(List) if indexOf(exitAfter) < indexOf('CCOMPLETE')`
    + `\n` + ind0 + `exitNow = exitAfter === 'ALL' ? true : exitNow;`;
// console.warn('exitAfterStepDeclarationAndCheckString: ');
// console.warn(exitAfterStepDeclarationAndCheckString);

let loopBeginString = `\n` + ind0 + `let stepKey = 'PPENDING';`;
loopBeginString += `\n` + ind0 + `for (let stepArrayIndex = 0; stepArrayIndex < stepArray.length; stepArrayIndex++) {`;
loopBeginString += `\n` + ind4 + `stepKey = stepArray[stepArrayIndex];`;
loopBeginString += `\n` + ind4 + `console.warn('stepKey[' + stepArrayIndex + ']:' + stepKey);`;
let loopEndString = `\n` + ind0 + `}`;

let switchBeginString = `\n` + ind4 + `let errorString = '';`
    + `\n` + ind4 + `switch (stepKey) {`;
let switchEndString = `\n\n` + ind8 + `default:`
+ `\n` + ind12 + `errorString = 'stepKey ('`+` + stepKey + `+`') is Not Supported within this Switch Structure';`
+ `\n` + ind12 + `break;`
+ `\n` + ind4 + `}`;
// console.warn('switchEndString: ');
// console.warn(switchEndString);
let switchItemBeginString = `\n` + ind8 + `case '` + stepKey + `':`;
let switchItemEndString = `\n` + ind8 + `break;`
// console.warn('switchItemBeginString THEN switchItemEndString: ');
// console.warn(switchItemBeginString + switchItemEndString);
// console.warn('switchItemBeginString: ');
// console.warn(switchItemBeginString);
// console.warn('switchItemEndString: ');
// console.warn(switchItemEndString);


let switchCode = stepArrayDeclarationString;
switchCode += exitAfterStepDeclarationAndCheckString;
switchCode += loopBeginString;
switchCode += switchBeginString;
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
    functionString = functionString.length > 0 ? '\n'+ ind12 + functionString + '()' : '';
    // console.warn('functionString: ' + functionString);
    // ! </could be a function>
    // ! <could be a function>
    let consoleLogString = `\n` + ind12 + `consoleLog('Step: ' + stepKey)`; 
    // console.warn('consoleLogString: ' + consoleLogString);
    // ! </could be a function>

    switchItemBeginString = `\n` + ind8 + `case '` + stepKey + `':`;
    switchElementThis = switchItemBeginString;
    switchElementThis += functionString;
    switchElementThis += consoleLogString;
    switchElementThis += switchItemEndString;
    // console.warn('switchElementThis: ');
    // console.warn(switchElementThis);
    switchCode += switchElementThis;
});
switchCode += switchEndString;
switchCode += loopEndString;

console.warn('switchCode: ');
console.warn(switchCode);



