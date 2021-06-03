let testAllStringParam = 'All';
let testStringParam = 'spMemberOnDeckJSON';
let testErrorStringParam = 'BreakingBad';
let testAllArrayParam = ['All'];

let testArray_OneA_Param = ['spMemberOnDeckJSON'];
let testArray_OneB_Param = ['spContactOnDeckJSON'];
let testArray_TwoAParam = ['spMemberOnDeckJSON','spContactOnDeckJSON'];
let testArrayParam = [];
testArrayParam.push('ppMemberOnDeckJSON');
testArrayParam.push('ppContactOnDeckJSON');
testArrayParam.push('ppDatabaseOnDeckJSON');
testArrayParam.push('stMemberOnDeckJSON');
testArrayParam.push('stContactOnDeckJSON');
testArrayParam.push('stDatabaseOnDeckJSON');
testArrayParam.push('spMemberOnDeckJSON');
testArrayParam.push('spContactOnDeckJSON');
testArrayParam.push('spDatabaseOnDeckJSON');

// let testParam = testAllStringParam;
// let testParam = testStringParam;
// let testParam = testErrorStringParam;
// let testParam = testAllArrayParam;
let testParam = testArrayParam;

// ! <EXECUTE THE FUNCTION WITH TEST DATA>
let paramArrayToObjectThis = buildCodeOnDeckJSON_switchLoop(testParam);
// ø ------ \_ stringParam _/ -----
// let paramArrayThis = buildCodeOnDeckJSON_switchLoop(testArrayParam);
// ø ------ \_ arrayParam _/ -----
// buildCodeOnDeckJSON_switchLoop();
// ø ------ \_ emptyParam _/ -----
// ! </EXECUTE THE FUNCTION WITH TEST DATA>

// ø <RESULT>
console.warn('testParam: ');
console.warn(testParam);
console.warn('paramArrayToObjectThis: ');
console.warn(paramArrayToObjectThis);
// ø </RESULT>



export function buildCodeOnDeckJSON_switchLoop(paramArray) {
    // ø <NEVER REALLY SUPPLY paramObject>
    // ø FIX THIS
    // ø </NEVER REALLY SUPPLY paramObject>
    // let paramArray = paramArrayToObject;
    let paramArrayToObject = {};
    let onDeckMemoryKeyArrayALL = ['spMemberOnDeckJSON','spContactOnDeckJSON'];
    let status = 'PPENDING';
    let codeObject = {};
    let codeJSON = 'PPENDING';
    let error = '';
    status = typeof paramArray === 'object' && Array.isArray(paramArray) ? 'AARRAY' : status;
    status = typeof paramArray === 'string' ? 'SSTRING' : status;
    status = status === 'SSTRING' && paramArray.toUpperCase() === 'ALL' ? 'AALL' : status;
    status = status === 'AARRAY' && (paramArray[0]).toUpperCase() === 'ALL' ? 'AALL' : status;
    console.warn('status: ' + status);
    let onDeckMemoryKeyArrayTHESE = [];
    onDeckMemoryKeyArrayTHESE = status === 'AALL' ? onDeckMemoryKeyArrayALL : onDeckMemoryKeyArrayTHESE;
    // onDeckMemoryKeyArrayTHESE = status === 'AALL' ? onDeckMemoryKeyArrayALL : onDeckMemoryKeyArrayTHESE;
    
    if (status === 'SSTRING') {
        onDeckMemoryKeyArrayTHESE.push(paramArray);
    } else if (status === 'AARRAY') {
        onDeckMemoryKeyArrayTHESE = paramArray;
    }
    let keyWithMemoryKey = onDeckMemoryKeyArrayTHESE.length > 1 ? true : false;
    // keyWithMemoryKey = true;//TTESTING
    console.warn('onDeckMemoryKeyArrayTHESE: ');
    console.warn(onDeckMemoryKeyArrayTHESE);

    for (let index = 0; index < onDeckMemoryKeyArrayTHESE.length; index++) {
        let  memoryKey = onDeckMemoryKeyArrayTHESE[index];
        codeObject = {};
        // codeObject = {};
        status = "PPENDING";
        // codeObject.memoryKey = memoryKey;
        switch (memoryKey) {
            case 'ppMemberOnDeckJSON':
                codeObject.email = "ppEmail";
                codeObject.phone = "ppPhone";
                codeObject.first = "ppFirst";
                codeObject.last = "ppLast";
                codeObject.status = "ONDECK";
                break;

            case 'ppContactOnDeckJSON':
                codeObject.status = status;
                break;

            case 'ppDatabaseOnDeckJSON':
                codeObject.status = status;
                break;

            case 'stMemberOnDeckJSON':
                codeObject.email = "stFauxEmail";
                codeObject.phone = "stPhone";
                codeObject.first = "stPreferredFirst";
                codeObject.last = "stLast";
                codeObject.status = "ONDECK";
                break;

            case 'stContactOnDeckJSON':
                codeObject.status = status;
                break;

            case 'stDatabaseOnDeckJSON':
                codeObject.status = status;
                break;

            case 'spMemberOnDeckJSON':
                status = 'NNEVER_AAPPLICABLE';
                codeObject.status = status;
                break;

            case 'spContactOnDeckJSON':
                status = 'DDYNAMIC_NNOT_AAPPLICABLE';
                codeObject.status = status;
                break;

            case 'spDatabaseOnDeckJSON':
                status = 'DDYNAMIC_NNOT_AAPPLICABLE';
                codeObject.status = status;
                break;

            default:
                error = "memoryKey '" + memoryKey + "' is not supported";
                codeObject.errorString = error;
                break;
        }//END switch (memoryKey)
        if (keyWithMemoryKey) {
            paramArrayToObject[memoryKey] = codeObject;
        }else{
            codeObject.memoryKey = memoryKey;
            paramArrayToObject = codeObject;
        }
        codeJSON = JSON.stringify(codeObject);
        // memory.setItem(memoryKey, codeJSON)
    }//END For()
    return paramArrayToObject;
}//END buildCodeOnDeckJSON_switchLoop()

