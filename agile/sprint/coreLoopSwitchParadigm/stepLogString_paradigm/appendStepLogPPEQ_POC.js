// ø <---------- <appendStepLogPPEQ UTILITY>  ---------->
export function appendStepLogPPEQ(key = 'STRING', message = 'STRING', lineNumber = 'STRING', postLog = 'STRING'){
    // pstEnrSeven202108UTILITY SHORT
    lineNumber = lineNumber === 'STRING' ? '' : lineNumber.toString();
    
    console.warn('orig: postLog: ' + postLog);
    postLog = postLog === true ? 'TTRUE' : postLog;
    console.warn('boolean true: postLog: ' + postLog);
    postLog = typeof postLog === 'string' && postLog.toLowerCase() === 'true' ? 'TTRUE' : postLog;
    console.warn('string true: postLog: ' + postLog);
    postLog = postLog === 'TTRUE' ? 'TTRUE' : 'FFALSE';
    console.warn('final: postLog: ' + postLog);
    
    // postLog = typeof postLog === 'boolean' && postLog === true ? 'TTRUE' : postLog;
    // postLog = typeof postLog === 'string' && postLog === true ? 'TTRUE' : 'FFALSE';

    let msboxLastState= `memory.getItem(msboxLastState)`;
    let stepThis = `memory.getItem(stepThis)`;

    let stepStringLog = key + '=';
    stepStringLog += message + '=';
    stepStringLog += lineNumber + '=';
    stepStringLog += postLog + '=';
    stepStringLog += msboxLastState + '=';
    stepStringLog += stepThis + '|';
    // memory.setItem('stepLogString', memory.getItem('stepLogString') + stepStringLog )
    return stepStringLog    
}
// ø <---------- </appendStepLogPPEQ UTILITY> ---------->

let ppeqStringThis = appendStepLogPPEQ('devel',`The 'first' Number`,'1','true');
console.warn('ppeqStringThis: ' + ppeqStringThis);
let ddLineNumber = ['NONE','EMPTY','NUMBER','STRING']
let postLog = ['BOOLEAN_TRUE','BOOLEAN_FASE','STRING_TRUE','STRING_FALSE','STRING_TTRUE','STRING_FFALSE','STRING_CHESTER','NUMBER']

let ppeqStringTargets = "devel=The first Number=1|devel=The second Number=2|EMERGENCY=The third Number=3";
