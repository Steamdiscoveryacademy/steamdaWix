let union100 =  

[ 'memory.getItem(ppMemberPrepJSON)',
  'local.getItem(ondeckEnrollmentJSON)',
  'memory.getItem(ppMemberExecuteUpsert)',
  'local.getItem(staffIdentifiedFamilyId)',
  'local.getItem(termId)',
  'memory.getItem(stMemberPrepJSON)',
  'local.getItem(familyId)',
  'local.getItem(termLabelKey)',
  'memory.getItem(stMemberExecuteUpsert)',
  'local.getItem(studentId)',
  'local.getItem(weekIdToLabelKeyJSON)',
  'memory.getItem(ppContactPrepJSON)',
  'local.getItem(termBeginMMDD)',
  'memory.getItem(ppDatabasePrepJSON)',
  'local.getItem(termEndMMDD)',
  'memory.getItem(stContactPrepJSON)',
  'local.getItem(loopExitAfterStep)',
  'memory.getItem(stDatabasePrepJSON)',
  'memory.getItem(enrollmentStepCompleted)',
  'memory.getItem(spContactPrepJSON)',
  'memory.getItem(enrollmentStepList)',
  'memory.getItem(spDatabasePrepJSON)',
  'memory.getItem(loopExitNow)',
  'memory.getItem(ppContactExecuteUpsert)',
  'memory.getItem(ppRevision)',
  'memory.getItem(ppDatabaseExecuteUpsert)',
  'memory.getItem(stContactExecuteUpsert)',
  'memory.getItem(ppMemberOnDeckJSON)',
  'memory.getItem(stDatabaseExecuteUpsert)',
  'memory.getItem(yyyymm)',
  'memory.getItem(spContactExecuteUpsert)',
  'memory.getItem(enrollmentStepCurrent)',
  'memory.getItem(spDatabaseExecuteUpsert)',
  'memory.getItem(stepStampArray)',
  'local.getItem(wixWebhookId)',
  'memory.getItem(HHOLDER)',
  'memory.getItem(enrollmentStepNext)',
  'local.getItem(loopExitNow)',
  'memory.getItem(loopExitAfterStep)',
  'memory.getItem(stRevision)',
  'local.getItem(yyyymm)' ];

  let logStringStorage = 
  ['local.getItem(staffIdentifiedFamilyId)',
  'local.getItem(familyId)',
  'memory.getItem(ppRevision)',
  'local.getItem(studentId)',
  'memory.getItem(stRevision)',
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
  'memory.getItem(enrollmentStepCompleted)',
  'memory.getItem(enrollmentStepCurrent)',
  'memory.getItem(enrollmentStepNext)',
  'local.getItem(loopExitAfterStep)',
  'local.getItem(loopExitNow)',
  'memory.getItem(stepStampArray)',
  'memory.getItem(yyyymm)',
  'local.getItem(termId)',
  'local.getItem(termLabelKey)',
  'local.getItem(wixWebhookId)',
  'local.getItem(weekIdToLabelKeyJSON)'];

  let quickAndDirtyStorageAddedToPostEnrollment = ['local.getItem(secondaryId)',
  'memory.getItem(spRevision)'];

let unAccountedForArray = [];


  let union100_local = [];
  let union100_session = [];
  let union100_memory = [];

union100.forEach(element => {
    // console.log(element);
    if(element.substr(0,5) === 'local'){
        union100_local.push(element)
    }
    if(element.substr(0,7) === 'session'){
        union100_session.push(element)
    }
    if(element.substr(0,6) === 'memory'){
        union100_memory.push(element)
    }
    if(!logStringStorage.includes(element)){
        unAccountedForArray.push(element);
    }
});

console.warn('union100['+union100.length+']: ');
console.warn(union100);

console.warn('union100_local['+union100_local.length+']: ');
console.warn(union100_local);

console.warn('union100_session['+union100_session.length+']: ');
console.warn(union100_session);

console.warn('union100_memory['+union100_memory.length+']: ');
console.warn(union100_memory);

console.warn('unAccountedForArray['+unAccountedForArray.length+']: ');
console.warn(unAccountedForArray);



