//getItemStringArray: 

// @source: storageObject_CleanUpCode_20210607215000

let storageObject_CleanUpCode_20210607215000 = ['memory.getItem(ppMemberPrepJSON)',
    'memory.getItem(ppMemberExecuteUpsert)',
    'memory.getItem(stMemberPrepJSON)',
    'memory.getItem(stMemberExecuteUpsert)',
    'memory.getItem(ppContactPrepJSON)',
    'memory.getItem(ppDatabasePrepJSON)',
    'memory.getItem(stContactPrepJSON)',
    'memory.getItem(stDatabasePrepJSON)',
    'memory.getItem(spContactPrepJSON)',
    'memory.getItem(spDatabasePrepJSON)',
    'memory.getItem(ppContactExecuteUpsert)',
    'memory.getItem(ppDatabaseExecuteUpsert)',
    'memory.getItem(stContactExecuteUpsert)',
    'memory.getItem(stDatabaseExecuteUpsert)',
    'memory.getItem(spContactExecuteUpsert)',
    'memory.getItem(spDatabaseExecuteUpsert)'];

// @source: storageObject_CleanUpCode_20210607215000

let wixStorageCleanup_MergeFunctionStorage = ['local.getItem(ondeckEnrollmentJSON)',
    'local.getItem(staffIdentifiedFamilyId)',
    'local.getItem(familyId)',
    'local.getItem(studentId)',
    'memory.getItem(ppMemberPrepJSON)',
    'memory.getItem(ppMemberExecuteUpsert)',
    'memory.getItem(stMemberPrepJSON)',
    'memory.getItem(stMemberExecuteUpsert)',
    'memory.getItem(ppContactPrepJSON)',
    'memory.getItem(ppDatabasePrepJSON)',
    'memory.getItem(stContactPrepJSON)',
    'memory.getItem(stDatabasePrepJSON)',
    'memory.getItem(spContactPrepJSON)',
    'memory.getItem(spDatabasePrepJSON)',
    'memory.getItem(ppContactExecuteUpsert)',
    'memory.getItem(ppDatabaseExecuteUpsert)',
    'memory.getItem(stContactExecuteUpsert)',
    'memory.getItem(stDatabaseExecuteUpsert)',
    'memory.getItem(spContactExecuteUpsert)',
    'memory.getItem(spDatabaseExecuteUpsert)',
    'memory.getItem(enrollmentStepList)',
    'memory.getItem(enrollmentStepCurrent)',
    'memory.getItem(enrollmentStepNext)',
    'local.getItem(loopExitAfterStep)',
    'local.getItem(loopExitNow)'];


// @source: wixStorageCleanup

let wixStorageCleanup = ['local.getItem(ondeckEnrollmentJSON)',
    'local.getItem(staffIdentifiedFamilyId)',
    'local.getItem(familyId)',
    'local.getItem(studentId)',
    'memory.getItem(ppMemberOnDeckJSON)',
    'memory.getItem(ppContactOnDeckJSON)',
    'memory.getItem(ppDatabaseOnDeckJSON)',
    'memory.getItem(stMemberOnDeckJSON)',
    'memory.getItem(stContactOnDeckJSON)',
    'memory.getItem(stDatabaseOnDeckJSON)',
    'memory.getItem(spContactOnDeckJSON)',
    'memory.getItem(spDatabaseOnDeckJSON)',
    'memory.getItem(enrollmentStepList)',
    'memory.getItem(enrollmentStepCurrent)',
    'memory.getItem(enrollmentStepNext)',
    'local.getItem(loopExitAfterStep)',
    'local.getItem(loopExitNow)'];


// ø deDupeKind_dot_KeyArray[41]: 

let postEnrollmentAll = [ 'local.getItem(ondeckEnrollmentJSON)',
  'local.getItem(termId)',
  'local.getItem(termLabelKey)',
  'local.getItem(weekIdToLabelKeyJSON)',
  'local.getItem(termBeginMMDD)',
  'local.getItem(termEndMMDD)',
  'local.getItem(loopExitAfterStep)',
  'memory.getItem(enrollmentStepCompleted)',
  'memory.getItem(enrollmentStepList)',
  'memory.getItem(loopExitNow)',
  'memory.getItem(ppRevision)',
  'local.getItem(familyId)',
  'memory.getItem(ppMemberOnDeckJSON)',
  'memory.getItem(yyyymm)',
  'memory.getItem(enrollmentStepCurrent)',
  'memory.getItem(stepStampArray)',
  'local.getItem(staffIdentifiedFamilyId)',
  'local.getItem(wixWebhookId)',
  'memory.getItem(ppMemberPrepJSON)',
  'memory.getItem(ppMemberExecuteUpsert)',
  'memory.getItem(HHOLDER)',
  'memory.getItem(stMemberPrepJSON)',
  'local.getItem(studentId)',
  'memory.getItem(stMemberExecuteUpsert)',
  'memory.getItem(ppContactPrepJSON)',
  'memory.getItem(ppDatabasePrepJSON)',
  'memory.getItem(stContactPrepJSON)',
  'memory.getItem(stDatabasePrepJSON)',
  'memory.getItem(spContactPrepJSON)',
  'memory.getItem(spDatabasePrepJSON)',
  'memory.getItem(ppContactExecuteUpsert)',
  'memory.getItem(ppDatabaseExecuteUpsert)',
  'memory.getItem(stContactExecuteUpsert)',
  'memory.getItem(stDatabaseExecuteUpsert)',
  'memory.getItem(spContactExecuteUpsert)',
  'memory.getItem(spDatabaseExecuteUpsert)',
  'memory.getItem(enrollmentStepNext)',
  'memory.getItem(loopExitAfterStep)',
  'memory.getItem(stRevision)',
  'local.getItem(loopExitNow)',
  'local.getItem(yyyymm)' ]



let union100 = [];
let union100count = 0;
let oneStringElement = '';
let oneIndexLimit = storageObject_CleanUpCode_20210607215000.length;
// console.warn('oneIndexLimit: ' + oneIndexLimit);
let twoStringElement = '';
let twoIndexLimit = wixStorageCleanup_MergeFunctionStorage.length;
// console.warn('twoIndexLimit: ' + oneIndexLimit);
let threeStringElement = '';
let threeIndexLimit = storageObject_CleanUpCode_20210607215000.length;
// console.warn('threeIndexLimit: ' + oneIndexLimit);
let fourStringElement = '';
let fourIndexLimit = postEnrollmentAll.length;
// console.warn('fourIndexLimit: ' + oneIndexLimit);
for (let index = 0; index < 100; index++) {

    oneStringElement = storageObject_CleanUpCode_20210607215000[index];
    if (index < oneIndexLimit) {
        if (!union100.includes(oneStringElement)) {
            union100count++;
            union100.push(oneStringElement);
        }
    }
    
    twoStringElement = wixStorageCleanup_MergeFunctionStorage[index];
    if (index < twoIndexLimit) {
        if (!union100.includes(twoStringElement)) {
            union100count++;
            union100.push(twoStringElement);
        }
    }
    
    threeStringElement = storageObject_CleanUpCode_20210607215000[index];
    if (index < threeIndexLimit) {
        if (!union100.includes(threeStringElement)) {
            union100count++;
            union100.push(threeStringElement);
        }
    }

    fourStringElement = postEnrollmentAll[index];
    if (index < fourIndexLimit) {
        if (!union100.includes(fourStringElement)) {
            union100count++;
            union100.push(fourStringElement);
        }
    }
    
}
console.warn('oneIndexLimit: ' + oneIndexLimit);
console.warn('twoIndexLimit: ' + twoIndexLimit);
console.warn('threeIndexLimit: ' + threeIndexLimit);
console.warn('fourIndexLimit: ' + fourIndexLimit);
console.warn('union100count: ' + union100count);
console.warn('union100: ');
console.warn(union100);
