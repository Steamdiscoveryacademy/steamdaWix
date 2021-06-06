let storageObject = {};
storageObject.storageObjectArray = [];
let storageObjectElement = {};

storageObjectElement = {};
storageObjectElement.memoryKey = 'ondeckEnrollmentJSON';
storageObjectElement.memoryKind = 'local';
storageObjectElement.codeKind = '|HHOLDER|NEW|';
storageObjectElement.confirmed = true;
storageObject.storageObjectArray.push(storageObjectElement);

storageObjectElement = {};
storageObjectElement.memoryKey = 'staffIdentifiedFamilyId';
storageObjectElement.memoryKind = 'local';
storageObjectElement.codeKind = '|HHOLDER|CURRENT|NEW|';
storageObjectElement.instantiateValue = 'enrollmentObject.family.parent.primary.memberId';
storageObjectElement.emptyValue = 'EEMPTY';
storageObjectElement.confirmed = true;
storageObject.storageObjectArray.push(storageObjectElement);

storageObjectElement = {};
storageObjectElement.memoryKey = 'familyId';
storageObjectElement.memoryKind = 'local';
storageObjectElement.codeKind = '|HHOLDER|CURRENT|NEW|';
storageObjectElement.instantiateValue = 'enrollmentObject.family.parent.primary.memberId';
storageObjectElement.emptyValue = 'EEMPTY';
storageObjectElement.confirmed = true;
storageObject.storageObjectArray.push(storageObjectElement);


storageObjectElement = {};
storageObjectElement.memoryKey = 'studentId';
storageObjectElement.memoryKind = 'local';
storageObjectElement.codeKind = '|HHOLDER|CURRENT|NEW|';
storageObjectElement.confirmed = true;
storageObject.storageObjectArray.push(storageObjectElement);
// ø <The PrepJSON Blocks>
// storageObjectElement = {};
// storageObjectElement.memoryKey = 'the Nine-ish blocks of Code';
// storageObjectElement.memoryKind = 'memory';
// storageObjectElement.codeKind = '|HHOLDER|CURRENT|NEW|';
// storageObjectElement.confirmed = false;
// storageObject.storageObjectArray.push(storageObjectElement);

storageObjectElement = {};
storageObjectElement.memoryKey = 'ppMemberOnDeckJSON';
storageObjectElement.memoryKind = 'memory';
storageObjectElement.codeKind = '|HHOLDER|CURRENT|NEW|';
storageObjectElement.confirmed = true;
storageObject.storageObjectArray.push(storageObjectElement);

storageObjectElement = {};
storageObjectElement.memoryKey = 'ppContactOnDeckJSON';
storageObjectElement.memoryKind = 'memory';
storageObjectElement.codeKind = '|HHOLDER|CURRENT|NEW|';
storageObjectElement.confirmed = true;
storageObject.storageObjectArray.push(storageObjectElement);

storageObjectElement = {};
storageObjectElement.memoryKey = 'ppDatabaseOnDeckJSON';
storageObjectElement.memoryKind = 'memory';
storageObjectElement.codeKind = '|HHOLDER|CURRENT|NEW|';
storageObjectElement.confirmed = true;
storageObject.storageObjectArray.push(storageObjectElement);

storageObjectElement = {};
storageObjectElement.memoryKey = 'stMemberOnDeckJSON';
storageObjectElement.memoryKind = 'memory';
storageObjectElement.codeKind = '|HHOLDER|CURRENT|NEW|';
storageObjectElement.confirmed = true;
storageObject.storageObjectArray.push(storageObjectElement);

storageObjectElement = {};
storageObjectElement.memoryKey = 'stContactOnDeckJSON';
storageObjectElement.memoryKind = 'memory';
storageObjectElement.codeKind = '|HHOLDER|CURRENT|NEW|';
storageObjectElement.confirmed = true;
storageObject.storageObjectArray.push(storageObjectElement);

storageObjectElement = {};
storageObjectElement.memoryKey = 'stDatabaseOnDeckJSON';
storageObjectElement.memoryKind = 'memory';
storageObjectElement.codeKind = '|HHOLDER|CURRENT|NEW|';
storageObjectElement.confirmed = true;
storageObject.storageObjectArray.push(storageObjectElement);

storageObjectElement = {};
storageObjectElement.memoryKey = 'spContactOnDeckJSON';
storageObjectElement.memoryKind = 'memory';
storageObjectElement.codeKind = '|HHOLDER|CURRENT|NEW|';
storageObjectElement.confirmed = true;
storageObject.storageObjectArray.push(storageObjectElement);

storageObjectElement = {};
storageObjectElement.memoryKey = 'spDatabaseOnDeckJSON';
storageObjectElement.memoryKind = 'memory';
storageObjectElement.codeKind = '|HHOLDER|CURRENT|NEW|';
storageObjectElement.confirmed = true;
storageObject.storageObjectArray.push(storageObjectElement);

// ø </The PrepJSON Blocks>

storageObjectElement = {};
storageObjectElement.memoryKey = 'enrollmentStepList';
storageObjectElement.memoryKind = 'memory';
storageObjectElement.codeKind = '|HHOLDER|CURRENT|NEW|';
storageObjectElement.confirmed = true;
storageObject.storageObjectArray.push(storageObjectElement);

storageObjectElement = {};
storageObjectElement.memoryKey = 'enrollmentStepCurrent';
storageObjectElement.memoryKind = 'memory';
storageObjectElement.codeKind = '|HHOLDER|CURRENT|NEW|';
storageObjectElement.confirmed = true;
storageObject.storageObjectArray.push(storageObjectElement);

storageObjectElement = {};
storageObjectElement.memoryKey = 'enrollmentStepNext';
storageObjectElement.memoryKind = 'memory';
storageObjectElement.codeKind = '|HHOLDER|CURRENT|NEW|';
storageObjectElement.confirmed = true;
storageObject.storageObjectArray.push(storageObjectElement);

let ind0 = '';
let ind4 = '    ';
let cleanupCodeEnrollmentNew = `export function doEnrollmentCleanupNew(){`;
cleanupCodeEnrollmentNew += `\n` + ind0 + `// ø <code Cleanup for New Enrollment>`;
let cleanupCodeEnrollmentCurrent = `export function doEnrollmentCleanupCurrent(){`;
cleanupCodeEnrollmentCurrent += `\n` + ind0 + `// ø <code Cleanup for Current Enrollment> mostly for testing`;


let cleanupArray = storageObject.storageObjectArray;
let cleanupElementObject = {};
let cleanupElementLine = '';
let cleanupValue = '';
let cleanupValueDefault = 'EEMPTY';
for (let index = 0; index < cleanupArray.length; index++) {
    cleanupElementObject = cleanupArray[index];
    cleanupElementLine = cleanupElementObject.memoryKind;
    cleanupValue = typeof cleanupElementObject.emptyValue === 'string' && cleanupElementObject.emptyValue.length > 0 ? cleanupElementObject.emptyValue :cleanupValueDefault;
    cleanupElementLine += `.setItem('` + cleanupElementObject.memoryKey + `','` + cleanupValue + `');`;
    cleanupElementLine = cleanupElementObject.confirmed === false ? '//' + cleanupElementLine : cleanupElementLine
    
    // console.warn('cleanupElementLine: ');
    // console.warn(cleanupElementLine);
    // cleanupCodeEnrollmentNew += `\n` + ind4 + cleanupElementLine;
    if(cleanupElementObject.codeKind.indexOf('|NEW|') >= 0){
        cleanupCodeEnrollmentNew += `\n` + ind4 + cleanupElementLine;
    }else{
        cleanupCodeEnrollmentNew += `\n` + ind4 + '/*Not NEW*///' + cleanupElementLine;
    }
    if(cleanupElementObject.codeKind.indexOf('|CURRENT|') >= 0){
        cleanupCodeEnrollmentCurrent += `\n` + ind4 + cleanupElementLine;
    }else{
        cleanupCodeEnrollmentCurrent += `\n` + ind4 + '/*Not CURRENT*///' + cleanupElementLine;
    }
}



cleanupCodeEnrollmentNew += `\n` + ind0 + `// ø </code Cleanup for New Enrollment>`;
cleanupCodeEnrollmentNew += `\n` + ind0 + `}`;
cleanupCodeEnrollmentCurrent += `\n` + ind0 + `// ø </code Cleanup for Current Enrollment>`;
cleanupCodeEnrollmentCurrent += `\n` + ind0 + `}`;




console.warn('cleanupCodeEnrollmentNew: ');
console.warn(cleanupCodeEnrollmentNew);

console.warn('cleanupCodeEnrollmentCurrent: ');
console.warn(cleanupCodeEnrollmentCurrent);





// console.warn('storageObject: ');
// console.warn(storageObject);