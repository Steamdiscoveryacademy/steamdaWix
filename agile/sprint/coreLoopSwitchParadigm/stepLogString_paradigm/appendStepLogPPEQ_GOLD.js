// ø <---------- <appendStepLogPPEQ UTILITY>  ---------->
export function appendStepLogPPEQ(key = 'STRING', message = 'STRING', lineNumber = 'STRING', postLog){
    // pstEnrSeven202108UTILITY SHORT
    lineNumber = lineNumber === 'STRING' ? '' : lineNumber.toString();
    
    postLog = typeof postLog === 'boolean' && postLog === true ? 'TTRUE' : postLog;
    postLog = typeof postLog === 'string' && postLog.toLowerCase() === 'true' ? 'TTRUE' : postLog;
    postLog = postLog === 'TTRUE' ? 'TTRUE' : 'FFALSE';

    let msboxLastState= memory.getItem('msboxLastState');
    let stepThis = memory.getItem('stepThis');

    let stepStringLog = key + '=';
    stepStringLog += message + '=';
    stepStringLog += lineNumber + '=';
    stepStringLog += postLog + '=';
    stepStringLog += msboxLastState + '=';
    stepStringLog += stepThis + '|';
    memory.setItem('stepLogString', memory.getItem('stepLogString') + stepStringLog )
    return stepStringLog    
}
// ø <---------- </appendStepLogPPEQ UTILITY> ---------->