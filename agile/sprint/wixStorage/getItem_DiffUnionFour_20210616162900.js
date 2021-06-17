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
});

console.warn('union100['+union100.length+']: ');
console.warn(union100);

console.warn('union100_local['+union100_local.length+']: ');
console.warn(union100_local);

console.warn('union100_session['+union100_session.length+']: ');
console.warn(union100_session);

console.warn('union100_memory['+union100_memory.length+']: ');
console.warn(union100_memory);



