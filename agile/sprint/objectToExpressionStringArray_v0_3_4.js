let testElementName = 'PPENDONG';
let testJSON =  `{"status":"PPENDING"}`;
testElementName = 'dogObject';
testJSON =  `{"name":"Chester","age":14}`;
testElementName = 'dogsSimpleArray';
testJSON = `["Chester","Marais"]`;
testElementName = 'oneDogObjectArray';
testJSON = `[{"name":"Chester","age":14}]`;
testElementName = 'dogsObjectArray';
testJSON = `[{"name":"Chester","age":14},{"name":"Marais","age":10}]`;

// ! <CALL the Code>
let responseTest = expressionBuilderLaunch(testElementName,testJSON)
let finalCode = '//Final Code: ';
responseTest.expressionStringArray.forEach(line => {
    finalCode += `\n` + line;
});
console.warn(finalCode);
// ! </CALL the Code>

export function expressionBuilderLaunch(elementName,elementJSON,expressionChainArray = []){
    // ø <TAKE paramObject>
    let paramObject = {};
    // ø </TAKE paramObject>
    let responseObject = {};
    responseObject.expressionStringArray = [];
    // !-----\_ param & response _/-----
    let element = JSON.parse(elementJSON);
    
    let elementTypeOf = typeof element;
    if(elementTypeOf !== 'object'){
        responseObject.errorStringArray = ['The parse JSON is not (typeof) an Object'];
        return responseObject;
    }
    if(element === null){
        responseObject.errorStringArray = ['The parse JSON is null'];
        return responseObject;
    }
    let trueTypeOf = Array.isArray(element) ? 'array' : 'object'
    // ø <PASS paramObject>
    paramObject.objectFunctionCount = 0;
    paramObject.terminusFunctionCount = 0;
    paramObject.nextElement = element;
    paramObject.nextElementName = elementName;
    paramObject.nextElementTrueTypeOf = trueTypeOf;
    paramObject.nextElementStringStart = 'BASE';
    paramObject.previousElementTrueTypeOf = 'BASE';
    paramObject.previousElementStringStart = 'BASE';
    // ø </PASS paramObject>

    // ø <paramObjectCheckList>
    // let paramStatus = "|E|" + " " + "|C| " + ' – |E|-Exists – |C|-Confirmed';
    // ø <next>;
    // paramStatus += `\n` + "|X| |O| " + "paramObject.nextElement";
    // paramStatus += `\n` + "|X| |O| " + "paramObject.nextElementName";
    // paramStatus += `\n` + "|X| |O| " + "paramObject.nextElementTrueTypeOf";
    // paramStatus += `\n` + "|X| |O| " + "paramObject.nextElementStringStart";
    // ø </next>
    // ø <previous>;
    // paramStatus += `\n` + "|X| |O| " + "paramObject.previousElementTrueTypeOf";
    // paramStatus += `\n` + "|X| |O| " + "paramObject.previousElementStringStart";
    // ø </previous>
    // ø </paramObjectCheckList>
    // responseObject.parameterChecklists = {};
    // responseObject.parameterChecklists.forLaunch = paramStatus;
    responseObject.nextStringStartLog = [];
    responseObject.previousStringStartLog = [];
    responseObject.nextStringStartLog.push(paramObject.nextElementStringStart);
    responseObject.previousStringStartLog.push(paramObject.previousElementStringStart);
    expressionBuilderObject(paramObject,responseObject);    
    return responseObject;
    
}



export function expressionBuilderObject(paramObject,responseObject){
    paramObject.objectFunctionCount++
    
    let stringThis = ``;
    if(responseObject.expressionStringArray.length === 0){
        stringThis += `let `
    }

    let nextElementKonstantHere  = paramObject.nextElement;
    let nextElementTrueTupeOfKonstantHere  = paramObject.nextElementTrueTypeOf;
    let nextElementStringStartKonstantHere  = paramObject.nextElementStringStart;
    if(paramObject.nextElementStringStart === 'BASE'){
        paramObject.nextElementStringStart = '';
    }
    let appendToStartString = '';
    appendToStartString += paramObject.previousElementTrueTypeOf === 'array' ? '[' :'.';
    appendToStartString += paramObject.nextElementName;
    appendToStartString += paramObject.previousElementTrueTypeOf === 'array' ? ']' : '';////?
    appendToStartString = nextElementStringStartKonstantHere === 'BASE' ? paramObject.nextElementName : appendToStartString;
    paramObject.nextElementStringStart += appendToStartString;
    nextElementStringStartKonstantHere  = paramObject.nextElementStringStart;
    
    stringThis += paramObject.nextElementStringStart === 'BASE' ? '' : paramObject.nextElementStringStart;
    if(Array.isArray(paramObject.nextElement)){
        stringThis += ` = [];`
    }else{
        stringThis += ` = {};`
    }
    responseObject.expressionStringArray.push(stringThis);
    paramObject.expressionChainString + paramObject.nextElementName;
    
    let nextElementKeyArray = Object.keys(paramObject.nextElement);////?
    for (let index = 0; index < nextElementKeyArray.length; index++) {
        const elementKey = nextElementKeyArray[index];
        // ø <PASS paramObject>
        paramObject.previousElementTrueTypeOf = paramObject.nextElementTrueTypeOf;
        paramObject.nextElement = nextElementKonstantHere[elementKey];
        paramObject.nextElementName = elementKey; 
        paramObject.previousElementStringStart = paramObject.nextElementStringStart;
        
        let trueTypeOf = typeof paramObject.nextElement;
        let elementTypeOf = trueTypeOf;
        if(trueTypeOf === 'object'){
            trueTypeOf = Array.isArray(paramObject.nextElement) ? 'array' : trueTypeOf;
        }   
        paramObject.nextElementTrueTypeOf = trueTypeOf;
        // ø </PASS paramObject>
        responseObject.nextStringStartLog.push(paramObject.nextElementStringStart);
        responseObject.previousStringStartLog.push(paramObject.previousElementStringStart);
        
        if(elementTypeOf === 'object'){
            expressionBuilderObject(paramObject,responseObject);
        }else{
            expressionBuilderTerminus(paramObject,responseObject);
        }
        
        paramObject.nextElementStringStart = nextElementStringStartKonstantHere;
        paramObject.nextElementTrueTypeOf = nextElementTrueTupeOfKonstantHere;
        
    }
    // ø <paramObjectCheckList>
    // let paramStatus = "|E|" + " " + "|C| " + ' – |E|-Exists – |C|-Confirmed';
    // ø <next>;
    // paramStatus += `\n` + "|X| |O| " + "paramObject.nextElement";
    // paramStatus += `\n` + "|X| |O| " + "paramObject.nextElementName";
    // paramStatus += `\n` + "|X| |O| " + "paramObject.nextElementTrueTypeOf";
    // paramStatus += `\n` + "|X| |O| " + "paramObject.nextElementStringStart";
    // ø </next>
    // ø <previous>;
    // paramStatus += `\n` + "|X| |O| " + "paramObject.previousElementTrueTypeOf";
    // paramStatus += `\n` + "|X| |O| " + "paramObject.previousElementStringStart";
    // ø </previous>
    // ø </paramObjectCheckList>
    // responseObject.parameterChecklists.forObject = paramStatus;
    
}

export function expressionBuilderTerminus(paramObject,responseObject){
    paramObject.terminusFunctionCount++;

    let appendToStartString = '';
    appendToStartString += paramObject.previousElementTrueTypeOf === 'array' ? '[' :'.';
    appendToStartString += paramObject.nextElementName;
    appendToStartString += paramObject.previousElementTrueTypeOf === 'array' ? ']' : '';////?
    let localStartString = paramObject.previousElementStringStart;
    localStartString += appendToStartString;

    let stringThisKey = localStartString;////?
    let stringThisValue = paramObject.nextElement;
    stringThisValue = paramObject.nextElementTrueTypeOf === 'string' ? `"${stringThisValue}"` : stringThisValue;
    let stringThis = `${stringThisKey} = ${stringThisValue};`////?
    responseObject.expressionStringArray.push(stringThis);

    // ø <paramObjectCheckList>
    // let paramStatus = "|E|" + " " + "|C| " + ' – |E|-Exists – |C|-Confirmed';
    // ø <next>;
    // paramStatus += `\n` + "|X| |O| " + "paramObject.nextElement";
    // paramStatus += `\n` + "|X| |O| " + "paramObject.nextElementName";
    // paramStatus += `\n` + "|•| |O| " + "paramObject.nextElementTrueTypeOf";
    // paramStatus += `\n` + "|•| |O| " + "paramObject.nextElementStringStart";
    // ø </next>
    // ø <previous>;
    // paramStatus += `\n` + "|X| |O| " + "paramObject.previousElementTrueTypeOf";
    // paramStatus += `\n` + "|X| |O| " + "paramObject.previousElementStringStart";
    // ø </previous>
    // ø </paramObjectCheckList>
    // responseObject.parameterChecklists.forTerminus = paramStatus;
}