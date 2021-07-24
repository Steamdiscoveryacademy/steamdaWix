// ø <---------- <mxboxPostEnrollmentSevenActionScripts>  ---------->
// ø FIND pstEnrSevenCore202107 ACTION_SCRIPT-ALL

// ø <---------- <mxboxPostEnrollmentSevenActionOnReady - [within $w.onReady(function ())]>  ---------->
// ø FIND pstEnrSevenCore202107 ACTION_SCRIPT
export async function mxboxPostEnrollmentSevenActionOnReady(anyButtonLog = '{# no button log #}'){
    let responseObject = {};
    // local.getItem('timezoneOffset')
    // local.getItem('tzAbbrv')
    responseObject.TEST = true;
    responseObject.logArrayUserInterface = [];
    responseObject.logArrayDeveloper = [];
    responseObject.logArrayDeveloper.push(anyButtonLog);
    responseObject.button = 'NEXT';
    responseObject.messageKey = 'primary';
    memory.setItem('msboxLastState','stateZero')
    // let messageKeyArray= ["success","warning","danger","info","devel"];
    // responseObject.messageKey = messageKeyArray[Math.floor(Math.random() * messageKeyArray.length)];
    mxboxPostEnrollmentSevenAnyAction(responseObject);
}
// ø <---------- </mxboxPostEnrollmentSevenActionOnReady - [within $w.onReady(function ())]> ---------->
// ø <---------- <mxboxPostEnrollmentSevenActionNext - NEXT_STATE>  ---------->
// ø FIND pstEnrSevenCore202107 ACTION_SCRIPT
export async function mxboxPostEnrollmentSevenActionNext(anyButtonLog = '{# no button log #}'){
    let responseObject = {};
    responseObject.TEST = true;
    responseObject.logArrayUserInterface = [];
    responseObject.logArrayDeveloper = [];
    responseObject.logArrayDeveloper.push(anyButtonLog);
    responseObject.button = 'NEXT';
    responseObject.messageKey = 'primary';
    responseObject.messageRandomInfo = Math.random() * 100 > 66 ? true : false;
    responseObject.messageResponse = false;
    // let messageKeyArray= ["success","warning","danger","info","devel"];
    // responseObject.messageKey = messageKeyArray[Math.floor(Math.random() * messageKeyArray.length)];
    mxboxPostEnrollmentSevenAnyAction(responseObject);
    
}
// ø <---------- </mxboxPostEnrollmentSevenActionNext - NEXT_STATE> ---------->

// ø <---------- <mxboxPostEnrollmentSevenActionPerform - PERFORM_STATE_SCRIPTS>  ---------->
// ø FIND pstEnrSevenCore202107 ACTION_SCRIPT
export async function mxboxPostEnrollmentSevenActionPerform(anyButtonLog = '{# no button log #}'){
    let responseObject = {};
    responseObject.TEST = true;
    responseObject.logArrayUserInterface = [];
    responseObject.logArrayDeveloper = [];
    responseObject.logArrayDeveloper.push(anyButtonLog);
    responseObject.button = 'CURRENT';
    let messageKeyArray= ["success","success","warning","danger"];
    responseObject.messageKey = messageKeyArray[Math.floor(Math.random() * messageKeyArray.length)];
    responseObject.messageRandomInfo = Math.random() * 100 > 66 ? true : false;
    responseObject.messageResponse = true;
    mxboxPostEnrollmentSevenAnyAction(responseObject);
}
// ø <---------- </mxboxPostEnrollmentSevenActionPerform - PERFORM_STATE_SCRIPTS> ---------->

// ø FIND pstEnrSevenCore202107 ACTION_SCRIPT-ALL_END
// ø <---------- </mxboxPostEnrollmentSevenActionScripts> ---------->