
export function doIfElseThen_forCurrentStep(actionKey = 'iiAction',actionKeyIndex = 777,stepItemKey = 'ZXZ'){
    stepItemKey = stepItemKey === 'ZXZ' ? 'INFER' : stepItemKey;

    let whichAction = index === 0 ? 'Member' : 'ERROR';
    whichAction = index === 1 ? 'Contact' : whichAction;
    whichAction = index === 2 ? 'Dbase' : whichAction;

    // ø <thisELSE>
    if (actionKey === 'iiAction') {
        // return 'ALERT';
        return;        
    }
    if (whichAction === 'ERROR') {
        // return 'ALERT';
        return;        
    }
    if (stepItemKey === 'INFER') {
        // return 'Not Supported Yet - Maybe Should NOT BE';
        return;        
    }
    // ø </thisELSE>

    let iiAction = local.getItem(key);





}

// ø <ELSE>
let ppActionDbase = local.getItem('ppAction').split('|')[1]; 
if(ppActionDbase === 'SKIP'){
    logString = "based on action'" + ppActionDbase + "' no further action in this Step-Function";
    memory.setItem('ppDatabasePrepJSON',logString);
    local.setItem('logString', local.getItem('logString') + "\n" + logString);
    local.setItem('logString', local.getItem('logString') + '\n[~896]exiting: ppDatabasePrepJSON()');
    return;
}
if(ppActionDbase !== 'INSERT'){
    logString = "this ppActionDbase, '" + ppActionDbase + "', is NOT supported and is an error [see local.getItem('lastErrorString')]";
    memory.setItem('ppDatabasePrepJSON',logString);
    local.setItem('logString', local.getItem('logString') + "\n" + logString);
    local.setItem('logString', local.getItem('logString') + "\nbased on action'" + ppActionDbase + "' no further action in this Step-Function");
    local.setItem('lastErrorString',"ppActionDbase, '" + ppActionDbase + "', is NOT supported. Only 'INSERT' and 'SKIP' are supported. Please convey this message to the Developer Immediately");
    local.setItem('logString', local.getItem('logString') + '\n[~896]exiting: ppDatabasePrepJSON()');
    local.setItem('superEnrollmentStatus','ALERT');
    return;
}
// ø </ELSE> 