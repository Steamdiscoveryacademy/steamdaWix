


let stepKey = 'HHOLDER';
let stepArrayOrig = ['IINSTANTIATE', 'PREP_ppMember', 'EXECUTE_ppMember', 'PREP_stMember', 'EXECUTE_stMember', 'PREP_ppContact', 'PREP_ppDatabase', 'PREP_stContact', 'PREP_stDatabase', 'PREP_spContact', 'PREP_spDatabase', 'EXECUTE_ppContact', 'EXECUTE_ppDatabase', 'EXECUTE_stContact', 'EXECUTE_stDatabase', 'EXECUTE_spContact', 'EXECUTE_spDatabase', 'CCOMPLETE'];
//`\n` + ind0 + `
let ind0 = '';
let ind0Z = '';
let ind4 = '    ';
let ind4Z = '    ';
let ind8 = '        ';
let ind8Z = '        ';
let ind12 = '            ';
let ind12Z = '            ';
let ind16 = '                ';
let comma = '';
// ! <could be a function>
// let stepArrayDeclarationString = `let stepArray = [`;
// stepArrayOrig.forEach(element => {
//     // console.log(element);
//     stepArrayDeclarationString += comma + `'` + element + `'`;
//     comma = ',';
// });
// stepArrayDeclarationString += `];`;

// let resetBlock = `\n` + ind0Z + `if(memory.getItem('enrollmentStepList').indexOf(',') < 0){`;
// resetBlock += `\n` + ind4Z + `let stepArrayList = stepArray.toString();`;
// resetBlock += `\n` + ind4Z + `memory.setItem('enrollmentStepList',stepArrayList);`;
// resetBlock += `\n` + ind4Z + `memory.setItem('enrollmentStepCurrent','PPENDING');`;
// resetBlock += `\n` + ind4Z + `let stepNext = memory.getItem('enrollmentStepList').substr(0,memory.getItem('enrollmentStepList').indexOf(','));`;
// resetBlock += `\n` + ind4Z + `memory.setItem('enrollmentStepNext',stepNext);`;
// resetBlock += `\n` + ind0Z + `}`;

// console.warn('stepArrayDeclarationString: ');
// console.warn(stepArrayDeclarationString);
// ! </could be a function>

let stepList = "IINSTANTIATE,PREP_ppMember,EXECUTE_ppMember,PREP_stMember,EXECUTE_stMember,PREP_ppContact,PREP_ppDatabase,PREP_stContact,PREP_stDatabase,PREP_spContact,PREP_spDatabase,EXECUTE_ppContact,EXECUTE_ppDatabase,EXECUTE_stContact,EXECUTE_stDatabase,EXECUTE_spContact,EXECUTE_spDatabase,CCOMPLETE";
// let stepList = "IINSTANTIATE,PREP_ppMember,EXECUTE_ppMember,PREP_stMember,EXECUTE_stMember,PREP_ppContact,PREP_ppDatabase,PREP_stContact,PREP_stDatabase,PREP_spContact,PREP_spDatabase,EXECUTE_ppContact,EXECUTE_ppDatabase,EXECUTE_stContact,EXECUTE_stDatabase,EXECUTE_spContact,EXECUTE_spDatabase,CCOMPLETE";

let stepArray = stepList.split(',');
// console.warn('stepArray: ');
// console.warn(stepArray);

// let exitAfterStepDeclarationAndCheckString = `\n` + ind0Z + `let exitAfter = 'ALL';`
//     + `\n` + ind0Z + `let exitNow = 'FFALSE';`
//     + `\n` + ind0Z + `exitNow = 'TTRUE_FORCE'; //Force: until logic below is ready`
//     + `\n` + ind0Z + `//memory.getItem(List) if indexOf(exitAfter) < indexOf('CCOMPLETE')`
//     + `\n` + ind0Z + `exitNow = exitAfter === 'ALL' ? 'TTRUE_ALL' : exitNow;`;
// console.warn('exitAfterStepDeclarationAndCheckString: ');
// console.warn(exitAfterStepDeclarationAndCheckString);

let doInstantiateExitAfterFunction = '// ø <---------- <doInstantiateExitAfter>  ---------->';
doInstantiateExitAfterFunction += `\n` + ind0Z + `export function doInstantiateExitAfter(exitAfter = 'TTRUE_FUCNTION_DEFAULT'){`;
doInstantiateExitAfterFunction += `\n` + ind4Z + `let exitNow = 'FFALSE';`;
doInstantiateExitAfterFunction += `\n` + ind4Z + `//exitNow = 'TTRUE_FORCE'; //Force: until logic below is ready`;
doInstantiateExitAfterFunction += `\n` + ind4Z + `exitNow = exitAfter === 'ALL' ? 'TTRUE_ALL' : exitNow;`;
doInstantiateExitAfterFunction += `\n` + ind4Z + `memory.setItem('loopExitAfterStep',exitAfter);`;
doInstantiateExitAfterFunction += `\n` + ind4Z + `memory.setItem('loopExitNow',exitNow);`;
doInstantiateExitAfterFunction += `\n` + ind0Z + '}';
doInstantiateExitAfterFunction += `\n` + ind0Z + '// ø <---------- </doInstantiateExitAfter> ---------->';


let exitAfterSwitchCheckBlock = '';
exitAfterSwitchCheckBlock += `\n` + ind0Z + `// ø <ExitAfter Switch Check>`;
// exitAfterSwitchCheckBlock += `\n` + ind4Z + `exitNow = exitAfter === memory.getItem('enrollmentStepCurrent') ? 'EXIT_AFTER_MATCH' : exitNow;`;
// exitAfterSwitchCheckBlock += `\n` + ind4Z + `exitNow = memory.getItem('enrollmentStepCurrent') === 'CCOMPLETE' ? 'EXIT_CCOMPLETE_CURRENT' : exitNow;`;
exitAfterSwitchCheckBlock += `\n` + ind4Z + `doCheckExitAfter();`;
exitAfterSwitchCheckBlock += `\n` + ind4Z + `if(memory.getItem('loopExitNow') !== 'FFALSE'){`;
exitAfterSwitchCheckBlock += `\n` + ind8Z + `break;//(Break Loop is Exit)`;
exitAfterSwitchCheckBlock += `\n` + ind4Z + `}`;
exitAfterSwitchCheckBlock += `\n` + ind0Z + `// ø </ExitAfter Switch Check>`;


let exitAfterSwitchCheckFunction = '// ø <---------- <doCheckExitAfter> ---------->';
exitAfterSwitchCheckFunction += `\n` + ind0Z + 'export function doCheckExitAfter(){';
exitAfterSwitchCheckFunction += `\n` + ind0Z + `// ø <ExitAfter Switch Check>`;
exitAfterSwitchCheckFunction += `\n` + ind4Z + `let exitNow = memory.getItem('loopExitNow')`;
exitAfterSwitchCheckFunction += `\n` + ind4Z + `let exitAfter = memory.getItem('loopExitAfterStep')`;
exitAfterSwitchCheckFunction += `\n` + ind4Z + `exitNow = exitAfter === memory.getItem('enrollmentStepCurrent') ? 'EXIT_AFTER_MATCH' : exitNow;`;
exitAfterSwitchCheckFunction += `\n` + ind4Z + `exitNow = memory.getItem('enrollmentStepCurrent') === 'CCOMPLETE' ? 'EXIT_CCOMPLETE_CURRENT' : exitNow;`;
exitAfterSwitchCheckFunction += `\n` + ind4Z + `memory.setItem('loopExitNow',exitNow);`;
exitAfterSwitchCheckFunction += `\n` + ind0Z + `// ø </ExitAfter Switch Check>`;
exitAfterSwitchCheckFunction += `\n` + ind0Z + '}';
exitAfterSwitchCheckFunction += `\n` + ind0Z + '// ø <---------- <doCheckExitAfter> ---------->';





let loopBeginString = `\n` + '// ø <---------- <doStepLoopSwitch>  ---------->';
loopBeginString += `\n` + 'export function doStepLoopSwitch(){';
loopBeginString += `\n` + ind0Z + `let stepKey = 'PPENDING';`;
loopBeginString += `\n` + ind0Z + `let stepArray = memory.getItem('enrollmentStepList').split(',');`;
loopBeginString += `\n` + ind0Z + `for (let stepArrayIndex = 0; stepArrayIndex < stepArray.length; stepArrayIndex++) {`;
loopBeginString += `\n` + ind4Z + `stepKey = stepArray[stepArrayIndex];`;
loopBeginString += `\n` + ind4Z + `console.warn('stepKey[' + stepArrayIndex + ']:' + stepKey);`;
let loopEndString = `\n` + ind0Z + `}`;
loopEndString += `\n` + ind0Z + `}`;
loopEndString += `\n` + '// ø <---------- </doStepLoopSwitch> ---------->';

let switchBeginString = `\n` + ind4Z + `let errorString = '';`
    + `\n` + ind4Z + `switch (stepKey) {`;
let switchEndString = `\n\n` + ind8Z + `default:`
    + `\n` + ind12Z + `errorString = 'stepKey ('` + ` + stepKey + ` + `') is Not Supported within this Switch Structure';`
    + `\n` + ind12Z + `break;`
    + `\n` + ind4Z + `}`;
let switchCycleStepsString = `\n`+ ind4Z + `stepsCycleSteps();`;
// console.warn('switchEndString: ');
// console.warn(switchEndString);
let switchItemBeginString = `\n` + ind8Z + `case '` + stepKey + `':`;
let switchItemEndString = `\n` + ind8Z + `break;`
// console.warn('switchItemBeginString THEN switchItemEndString: ');
// console.warn(switchItemBeginString + switchItemEndString);
// console.warn('switchItemBeginString: ');
// console.warn(switchItemBeginString);
// console.warn('switchItemEndString: ');
// console.warn(switchItemEndString);

let functionCode = '';
let functionCodeThis = '';
let functionStringKey = '';
let codeOverallLoopSwitch = '';
let switchElementThis = '';
let switchCode = '';
// codeOverallLoopSwitch = stepArrayDeclarationString;
// codeOverallLoopSwitch += resetBlock;
// codeOverallLoopSwitch += exitAfterStepDeclarationAndCheckString;
codeOverallLoopSwitch += `\n` + loopBeginString;
switchCode += switchBeginString;
// let buildFunctionName = '';
let prepORexecute = '';
let now = "00000000000000";
stepArray.forEach(stepKey => {
    // console.log(stepKey);
    // ! <could be a function>
    prepORexecute = stepKey.substr(0, 4) === 'PREP' ? 'PREP' : 'NNULL';
    prepORexecute = stepKey.substr(0, 7) === 'EXECUTE' ? 'EXECUTE' : prepORexecute;
    let functionString = stepKey.substr(0, 5) === 'PREP_' ? stepKey.substr(5) : '';
    functionString = stepKey.substr(0, 8) === 'EXECUTE_' ? stepKey.substr(8) : functionString;
    functionString += stepKey.substr(0, 5) === 'PREP_' ? 'Prep' : '';
    functionString += stepKey.substr(0, 8) === 'EXECUTE_' ? 'Execute' : '';
    functionString += stepKey.substr(0, 5) === 'PREP_' ? 'JSON' : '';
    functionString += stepKey.substr(0, 8) === 'EXECUTE_' ? 'Upsert' : '';
    functionStringKey = functionString.length > 0 ? functionString : '';
    functionCodeThis = functionString.length > 0 ? 'export function ' + functionString + '()' : '';
    functionString = functionString.length > 0 ? '\n' + ind12Z + functionString + '()' : '';
    if (functionCodeThis.length > 0) {
        // now = toLocalISO();
        console.log
        functionCodeThis += `{`;
        if (prepORexecute === 'PREP') {
            functionCodeThis += `\n` + ind4Z + `let now = new Date();`;
            functionCodeThis += `\n` + ind4Z + `let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';`;
            functionCodeThis += `\n` + ind4Z + `timeDateString = now.toLocaleTimeString('en-US') + timeDateString;`;
            functionCodeThis += `\n` + ind4Z + `memory.setItem('` + functionStringKey + `','` + functionStringKey + `' + ' PREPPED on ' + timeDateString);`;
            // functionCodeThis += `\n` + ind4Z + `console.log(memory.getItem('` + functionStringKey + `');`;
        }
        if (prepORexecute === 'EXECUTE') {
            functionCodeThis += `\n` + ind4Z + `let now = new Date();`;
            functionCodeThis += `\n` + ind4Z + `let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';`;
            functionCodeThis += `\n` + ind4Z + `timeDateString = now.toLocaleTimeString('en-US') + timeDateString;`;
            functionCodeThis += `\n` + ind4Z + `memory.setItem('` + functionStringKey + `','` + functionStringKey + `' + ' EXECUTED on ' + timeDateString);`;
            // functionCodeThis += `\n` + ind4Z + `console.log('` + functionStringKey + ` set on ' + timeDateString);`;
        }
        functionCodeThis += `\n` + ind0Z + `}`;
        functionCode += `\n\n` + functionCodeThis;
    }

    // console.warn('functionString: ' + functionString);
    // ! </could be a function>
    // ! <could be a function>
    let consoleLogString = `\n` + ind12Z + `console.log('Step: ' + stepKey)`;
    // console.warn('consoleLogString: ' + consoleLogString);
    // ! </could be a function>

    switchItemBeginString = `\n` + ind8Z + `case '` + stepKey + `':`;
    switchElementThis = switchItemBeginString;
    switchElementThis += functionString;
    switchElementThis += consoleLogString;
    switchElementThis += switchItemEndString;
    // console.warn('switchElementThis: ');
    // console.warn(switchElementThis);
    switchCode += switchElementThis;
});
switchCode += switchEndString;
switchCode += switchCycleStepsString;
switchCode += exitAfterSwitchCheckBlock;
codeOverallLoopSwitch += switchCode;



codeOverallLoopSwitch += loopEndString;

// console.warn('switchCode: ');
// console.warn(switchCode);

console.warn('codeOverallLoopSwitch: ');
console.warn(codeOverallLoopSwitch);

// console.warn('functionCode: ');
// console.warn(functionCode);
// console.warn('//doInstantiateExitAfterFunction: ');
// console.warn(doInstantiateExitAfterFunction);
// console.warn('//exitAfterSwitchCheckFunction: ');
// console.warn(exitAfterSwitchCheckFunction);

// ø <---------- <toLocalISO>  ---------->
// export function toLocalISO( date ){
// 	let isDate = date instanceof Date && !isNaN(date.valueOf());
// 	let now = new Date();
// 	let evalDate = isDate ? date : now;
// 	let returnString = '';
// 	returnString += evalDate.getFullYear();
// 	returnString += ("00" + (evalDate.getMonth() + 1).toString()).substr(-2);
// 	returnString += ("00" + evalDate.getDate().toString()).substr(-2);
// 	// returnString += evalDate.getDate();
// 	returnString += ("00" + evalDate.getHours().toString()).substr(-2);;
// 	returnString += ("00" + evalDate.getMinutes().toString()).substr(-2);;
// 	returnString += ("00" + evalDate.getSeconds().toString()).substr(-2);;

// 	return returnString;
// }
// ø <---------- </toLocalISO> ---------->


