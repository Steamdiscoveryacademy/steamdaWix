// ø <---------- <doIfElseThen_forCurrentStep>  ---------->
export function doIfElseThen_forCurrentStep(actionKey = 'iiAction',actionKeyIndex = 777,stepItemKey = 'iiStepKey'){
    // only two THEN response values: 'CONTINUE' or 'RETURN' 
    // only ELSE response values: 'ALERT' 
    let stepItemKeyArray = ['ppMemberPrepJSON','ppMemberExecuteUpsert','stMemberPrepJSON','stMemberExecuteUpsert','ppContactPrepJSON','ppDatabasePrepJSON','stContactPrepJSON','stDatabasePrepJSON','spContactPrepJSON','spDatabaseExecuteUpsert','ppContactExecuteUpsert','ppDatabaseExecuteUpsert','stContactExecuteUpsert','stDatabaseExecuteUpsert','spContactExecuteUpsert','spDatabasePrepJSON'];

    let whichAction = index === 0 ? 'Member' : 'ERROR';
    whichAction = index === 1 ? 'Contact' : whichAction;
    whichAction = index === 2 ? 'Dbase' : whichAction;
    
    // ø <thisELSE>
    if (stepItemKeyArray.includes(stepItemKey) === false) {
        //since there is no place to 'PUT' this ELSE then just return
        local.setItem('lastErrorString',`'ELSE_ALERT': IfElseThen stepItemKey: ${stepItemKey}`)
        return 'ELSE_ALERT';
    }
    if (actionKey === 'iiAction') {
        memory.setItem(stepItemKey,`'ELSE_ALERT': IfElseThen actionKey: ${actionKey}`);
        return 'ELSE_ALERT';
    }
    if (whichAction === 'ERROR') {
        memory.setItem(stepItemKey,`'ELSE_ALERT': IfElseThen actionKeyIndex: ${actionKeyIndex} [${whichAction}]`);
        return 'ELSE_ALERT';
    }
    // ø </thisELSE>
    
    
    // ø <ELSE>
    /**
     * ! use stepItemKeyArray to make below more precise
     */
    let responseKey = 'CONTINUE';
    let thisAction = local.getItem(actionKey).split('|')[actionKeyIndex]; 
    if(thisAction === 'SKIP'){
        logString = "based on action'" + thisAction + "' no further action in his Step-Function";
        memory.setItem(stepItemKey,logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + '\n[~ZZZ]exiting: doIfElseThen_forCurrentStep()');
        responseKey = 'RETURN';
        return responseKey;
    }
    if(thisAction === 'NA'){
        logString = "based on action'" + thisAction + "' no further action in his Step-Function";
        memory.setItem(stepItemKey,logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + '\n[~ZZZ]exiting: doIfElseThen_forCurrentStep()');
        responseKey = 'RETURN';
        return responseKey;
        // logString = "based on action'" + ppActionDbase + "' no further action in this Step-Function";
        // memory.setItem('ppDatabasePrepJSON',logString);
        // local.setItem('logString', local.getItem('logString') + "\n" + logString);
        // local.setItem('logString', local.getItem('logString') + '\n[~896]exiting: ppDatabasePrepJSON()');
    }
    if(thisAction !== 'INSERT' && thisAction !== 'UPDATE'){
        logString = "this ppActionDbase, '" + thisAction + "', is NOT supported and is an error";
        memory.setItem(stepItemKey,logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + '\n[~ZZZ]exiting: doIfElseThen_forCurrentStep()');
        // memory.setItem('ppDatabasePrepJSON',logString);
        // local.setItem('logString', local.getItem('logString') + "\n" + logString);
        // local.setItem('logString', local.getItem('logString') + "\nbased on action'" + ppActionDbase + "' no further action in this Step-Function");
        // local.setItem('logString', local.getItem('logString') + '\n[~896]exiting: ppDatabasePrepJSON()');
        local.setItem('lastErrorString',"ppActionDbase, '" + ppActionDbase + "', is NOT supported. Only 'INSERT' and 'SKIP' are supported. Please convey this message to the Developer Immediately");
        local.setItem('superEnrollmentStatus','ALERT');
        responseKey = 'RETURN';
        return responseKey;
    }
    // ø </ELSE> 
    return responseKey;
}
export function demoLoop_doIfElseThen(){
    let stepItemKeyArray = ['ppMemberPrepJSON','ppMemberExecuteUpsert','stMemberPrepJSON','stMemberExecuteUpsert','ppContactPrepJSON','ppDatabasePrepJSON','stContactPrepJSON','stDatabasePrepJSON','spContactPrepJSON','spDatabaseExecuteUpsert','ppContactExecuteUpsert','ppDatabaseExecuteUpsert','stContactExecuteUpsert','stDatabaseExecuteUpsert','spContactExecuteUpsert','spDatabasePrepJSON'];
    let testWho = 'II';
    let testWhich = 999;
    let testActionKeyIndex = 0;
    let testActionKey = 'iiAction';
    let responseThis = 'TEST_PENDING';
    let responseThisArray = [];
    let testResponseArray = [];
    stepItemKeyArray.forEach(stepItemKey => {
        // console.log(stepItemKey);
        testActionKey = stepItemKey.substr(0,2) + 'Action';
        testWho = stepItemKey.substr(0,2).toLocaleUpperCase();
        testWhich = stepItemKey.indexOf('Member') > 0 ? 0 : 777;
        testWhich = stepItemKey.indexOf('Contact') > 0 ? 1 : testWhich;
        testWhich = stepItemKey.indexOf('Database') > 0 ? 2 : testWhich;
        testActionKeyIndex = testWhich;
        // responseThis = doIfElseThen_forCurrentStep(testActionKey,testActionKeyIndex,stepItemKey);
        responseThis = 'Test Response';
        responseThisArray = [testActionKey,testActionKeyIndex,stepItemKey,responseThis];
        testResponseArray.push(responseThisArray);
        // while (testActionKeyIndex < 3) {
        //     responseThis = doIfElseThen_forCurrentStep(testActionKey,testActionKeyIndex,stepItemKey);
        //     responseThisArray = [stepItemKey,responseThis];
        //     testResponseArray.push(responseThisArray);
        // }
    });
    return testResponseArray;
}
// ø <---------- </doIfElseThen_forCurrentStep> ---------->