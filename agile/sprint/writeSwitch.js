


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
let resetBlock = `\n` + ind0 + `if(memory.getItem('enrollmentStepList').indexOf(',') < 0){`;
resetBlock += `\n` + ind4 + `let stepArrayList = stepArray.toString();`;
resetBlock += `\n` + ind4 + `memory.setItem('enrollmentStepList',stepArrayList);`;
resetBlock += `\n` + ind4 + `memory.setItem('enrollmentStepCurrent','PPENDING');`;
resetBlock += `\n` + ind4 + `let stepNext = memory.getItem('enrollmentStepList').substr(0,memory.getItem('enrollmentStepList').indexOf(','));`;
resetBlock += `\n` + ind4 + `memory.setItem('enrollmentStepNext',stepNext);`;
resetBlock += `\n` + ind0 + `}`;

// console.warn('stepArrayDeclarationString: ');
// console.warn(stepArrayDeclarationString);
// ! </could be a function>

let stepList = "IINSTANTIATE,PREP_ppMember,EXECUTE_ppMember,PREP_stMember,EXECUTE_stMember,PREP_ppContact,PREP_ppDatabase,PREP_stContact,PREP_stDatabase,PREP_spContact,PREP_spDatabase,EXECUTE_ppContact,EXECUTE_ppDatabase,EXECUTE_stContact,EXECUTE_stDatabase,EXECUTE_spContact,EXECUTE_spDatabase,CCOMPLETE";
// let stepList = "IINSTANTIATE,PREP_ppMember,EXECUTE_ppMember,PREP_stMember,EXECUTE_stMember,PREP_ppContact,PREP_ppDatabase,PREP_stContact,PREP_stDatabase,PREP_spContact,PREP_spDatabase,EXECUTE_ppContact,EXECUTE_ppDatabase,EXECUTE_stContact,EXECUTE_stDatabase,EXECUTE_spContact,EXECUTE_spDatabase,CCOMPLETE";

let stepArray = stepList.split(',');
// console.warn('stepArray: ');
// console.warn(stepArray);

let exitAfterStepDeclarationAndCheckString = `\n` + ind0 + `let exitAfter = 'ALL';`
    + `\n` + ind0 + `let exitNow = 'FFALSE';`
    + `\n` + ind0 + `exitNow = 'TTRUE'; //Force: until logic below is ready`
    + `\n` + ind0 + `//memory.getItem(List) if indexOf(exitAfter) < indexOf('CCOMPLETE')`
    + `\n` + ind0 + `exitNow = exitAfter === 'ALL' ? 'TTRUE' : exitNow;`;
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

let functionCode = '';
let functionCodeThis = '';
let functionStringKey = '';
let codeOverallLoopSwitch = '';
let switchElementThis = '';
let switchCode = '';
codeOverallLoopSwitch = stepArrayDeclarationString;
codeOverallLoopSwitch += resetBlock;
codeOverallLoopSwitch += exitAfterStepDeclarationAndCheckString;
codeOverallLoopSwitch += loopBeginString;
switchCode += switchBeginString;
// let buildFunctionName = '';
let prepORexecute = '';
let now = "00000000000000";
stepArray.forEach(stepKey => {
    // console.log(stepKey);
    // ! <could be a function>
    prepORexecute = stepKey.substr(0,4) === 'PREP' ? 'PREP' : 'NNULL';
    prepORexecute = stepKey.substr(0,7) === 'EXECUTE' ? 'EXECUTE' : prepORexecute;
    let functionString = stepKey.substr(0,5) === 'PREP_' ? stepKey.substr(5) : '';
    functionString = stepKey.substr(0,8) === 'EXECUTE_' ? stepKey.substr(8) : functionString;
    functionString += stepKey.substr(0,5) === 'PREP_' ? 'Prep' : '';
    functionString += stepKey.substr(0,8) === 'EXECUTE_' ? 'Execute' : '';
    functionString += stepKey.substr(0,5) === 'PREP_' ? 'JSON' : '';
    functionString += stepKey.substr(0,8) === 'EXECUTE_' ? 'Upsert' : '';
    functionStringKey = functionString.length > 0 ? functionString : '';
    functionCodeThis = functionString.length > 0 ? 'export function ' + functionString + '()' : '';
    functionString = functionString.length > 0 ? '\n'+ ind12 + functionString + '()' : '';
    if(functionCodeThis.length > 0){
        // now = toLocalISO();
        console.log
        functionCodeThis += `{`;
        if(prepORexecute === 'PREP'){
            functionCodeThis += `\n` + ind4 + `let now = new Date();`;
            functionCodeThis += `\n` + ind4 + `let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';`;
            functionCodeThis += `\n` + ind4 + `timeDateString = now.toLocaleTimeString('en-US') + timeDateString;`;
            functionCodeThis += `\n` + ind4 + `memory.setItem('` + functionStringKey + `','` + functionStringKey + `' + ' PREPPED on ' + timeDateString);`;
            // functionCodeThis += `\n` + ind4 + `console.log(memory.getItem('` + functionStringKey + `');`;
        } 
        if(prepORexecute === 'EXECUTE'){
            functionCodeThis += `\n` + ind4 + `let now = new Date();`;
            functionCodeThis += `\n` + ind4 + `let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';`;
            functionCodeThis += `\n` + ind4 + `timeDateString = now.toLocaleTimeString('en-US') + timeDateString;`;
            functionCodeThis += `\n` + ind4 + `memory.setItem('` + functionStringKey + `','` + functionStringKey + `' + ' EXECUTED on ' + timeDateString);`;
            // functionCodeThis += `\n` + ind4 + `console.log('` + functionStringKey + ` set on ' + timeDateString);`;
        }
        functionCodeThis += `\n` + ind0 + `}`; 
        functionCode += `\n\n` + functionCodeThis; 
    }

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
codeOverallLoopSwitch += switchCode;



codeOverallLoopSwitch += loopEndString;

// console.warn('switchCode: ');
// console.warn(switchCode);

// console.warn('codeOverallLoopSwitch: ');
// console.warn(codeOverallLoopSwitch);

console.warn('functionCode: ');
console.warn(functionCode);

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


