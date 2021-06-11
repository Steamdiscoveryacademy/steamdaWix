let testElementName = 'PPENDONG';
let testJSON =  `{"status":"PPENDING"}`;
testElementName = 'dogObject';
testJSON =  `{"name":"Chester","age":14}`;
testElementName = 'dogsSimpleArray';
testJSON = `["Chester","Marais"]`;
testElementName = 'oneDogObjectArray';
testJSON = `[{"name":"Chester","age":14}]`;
// testElementName = 'dogsObjectArray';
// testJSON = `[{"name":"Chester","age":14},{"name":"Marais","age":10}]`;

// ! <CALL the Code>
let responseTest = expressionBuilderLaunch(testElementName,testJSON)
let finalCode = '//Final Code: ';
responseTest.expressionStringArray.forEach(line => {
    // console.log(line);
    finalCode += `\n` + line;
});
console.warn(finalCode);
// console.warn('responseObject.parameterChecklists: ');
// console.warn('\n//forLaunch ');
// console.warn(responseTest.parameterChecklists.forLaunch);
// console.warn('responseObject.parameterChecklists: ');
// console.warn('\n//forObject ');
// console.warn(responseTest.parameterChecklists.forObject);
// console.warn('responseObject.parameterChecklists: ');
// console.warn('\n//forTerminus ');
// console.warn(responseTest.parameterChecklists.forTerminus);
// console.warn('responseObject.previousStringStartLog: ');
// console.warn(responseTest.previousStringStartLog);
// console.warn('responseObject.nextStringStartLog: ');
// console.warn(responseTest.nextStringStartLog);
// • <Skip Mostly>
// • // console.warn('responseTest: ');
// • // console.warn(responseTest);
// • </Skip Mostly>
// ! </CALL the Code>

// let expressionBracketChainArray = [];
// let expressionDotChainArray = [];
// let expressionChainArrayThis =  []
export function expressionBuilderLaunch(elementName,elementJSON,expressionChainArray = []){
    // ø <TAKE paramObject>
    let paramObject = {};
    // paramObject.expressionChainArray = [];
    // paramObject.expressionChainString = '';
    // ø </TAKE paramObject>
    let responseObject = {};
    responseObject.expressionStringArray = [];
    // !-----\_ param & response _/-----
    let element = JSON.parse(elementJSON);
    
    // let elementName = name;
    // console.warn('elementName: ' + elementName);
    // console.warn('element: ');
    // paramObject.expressionChainArray.push(elementName);
    // console.warn(element);
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
    // • <MOVED to Object>
    // let stringThis = `let ${elementName} = {};`
    // if(Array.isArray(element)){
        //     stringThis = `let ${elementName} = [];`
        // }
        // responseObject.expressionStringArray.push(stringThis);
        // paramObject.expressionChainArray.push(elementName);
        // paramObject.expressionChainString + elementName;
        // • </MOVED to Object>
    // ø <PASS paramObject>
    // paramObject.baseElement = element;
    // paramObject.baseElementName = elementName;
    paramObject.nextElement = element;
    paramObject.nextElementName = elementName;
    paramObject.nextElementTrueTypeOf = trueTypeOf;
    paramObject.nextElementStringStart = 'BASE';
    paramObject.previousElementtrueTypeOf = 'NNA';
    paramObject.previousElementStringStart = 'NNA';
    // ø </PASS paramObject>
    // console.warn(elementTypeOf);
    // console.warn('expressionChainArray:');
    // console.warn(expressionChainArray);
    // console.warn('Object.keys(element):');
    // console.warn(Object.keys(element));
    // expressionBuilderObject(element,expressionChainArray)

    // ø <paramObjectCheckList>
    // let paramStatus = "|E|" + " " + "|C| " + ' – |E|-Exists – |C|-Confirmed';
    let paramStatus = "|E|" + " " + "|C| " + ' – |E|-Exists – |C|-Confirmed';
    // paramStatus += `\n` + "|X| |O| " + "paramObject.baseElement";
    // paramStatus += `\n` + "|X| |O| " + "paramObject.baseElementName";
    // ø <next>;
    paramStatus += `\n` + "|X| |O| " + "paramObject.nextElement";
    paramStatus += `\n` + "|X| |O| " + "paramObject.nextElementName";
    paramStatus += `\n` + "|X| |O| " + "paramObject.nextElementTrueTypeOf";
    paramStatus += `\n` + "|X| |O| " + "paramObject.nextElementStringStart";
    // ø </next>
    // ø <previous>;
    paramStatus += `\n` + "|ø| |O| " + "paramObject.previousElementtrueTypeOf";
    paramStatus += `\n` + "|X| |O| " + "paramObject.previousElementStringStart";
    // ø </previous>
    // ø </paramObjectCheckList>
    responseObject.parameterChecklists = {};
    responseObject.parameterChecklists.forLaunch = paramStatus;
    responseObject.nextStringStartLog = [];
    responseObject.previousStringStartLog = [];
    responseObject.nextStringStartLog.push(paramObject.nextElementStringStart);
    responseObject.previousStringStartLog.push(paramObject.previousElementStringStart);
    // console.warn('responseObject.parameterChecklists.forLaunch: ');
    // console.warn(responseObject.parameterChecklists.forLaunch);
    expressionBuilderObject(paramObject,responseObject);    
    return responseObject;
    
}



export function expressionBuilderObject(paramObject,responseObject){
    console.warn('!! Insde exBldrObject: ');
    console.warn('paramObject.previousElementtrueTypeOf: ');
    console.warn(paramObject.previousElementtrueTypeOf);
    // console.warn('responseObject.previousStringStartLog: ');
    // console.warn(responseObject.previousStringStartLog);
    // console.warn('paramObject: ');
    // console.warn(paramObject);
    // console.warn('paramObject.nextElement: ');
    // console.warn(paramObject.nextElement);
    
    // • <WAS in Launch>
    let stringThis = ``;
    if(responseObject.expressionStringArray.length === 0){
        stringThis += `let `
    }
    if(Array.isArray(paramObject.nextElement)){
        stringThis += `let ${paramObject.nextElementName} = [];`
    }else{
        stringThis += `${paramObject.nextElementName} = {};`
    }
    responseObject.expressionStringArray.push(stringThis);
    // paramObject.expressionChainArray.push(paramObject.nextElementName);
    paramObject.expressionChainString + paramObject.nextElementName;
    // • </WAS in Launch>
    
    let nextElementKonstantHere  = paramObject.nextElement;
    // let previousElementtrueTypeOf = paramObject.nextElementTrueTypeOf;
    paramObject.previousElementtrueTypeOf = paramObject.nextElementTrueTypeOf;
    // ø <TAKE paramObject>
    let nextElementStringStartKonstantHere  = paramObject.nextElementStringStart;////?
    if(paramObject.nextElementStringStart === 'BASE'){
        paramObject.nextElementStringStart = '';
    }
    let appendToStartString = '';
    appendToStartString += paramObject.nextElementTrueTypeOf === 'array' ? '[' :'.';
    appendToStartString += paramObject.nextElementName;
    // paramObject.previousElementStringStart += paramObject.nextElementTrueTypeOf;
    appendToStartString += paramObject.nextElementTrueTypeOf === 'array' ? ']' : '';////?
    // appendToStartString = paramObject.nextElementTrueTypeOf === 'BASE' ? paramObject.nextElementName : appendToStartString;
    appendToStartString = nextElementStringStartKonstantHere === 'BASE' ? paramObject.nextElementName : appendToStartString;
    paramObject.nextElementStringStart += appendToStartString;
    // ø </TAKE paramObject>

    let nextElementKeyArray = Object.keys(paramObject.nextElement);////?
    for (let index = 0; index < nextElementKeyArray.length; index++) {
        const elementKey = nextElementKeyArray[index];
        // ø <PASS paramObject>
        paramObject.nextElement = nextElementKonstantHere[elementKey];
        paramObject.nextElementName = elementKey; 
        // paramObject.previousElementtrueTypeOf = previousElementtrueTypeOf;
        paramObject.previousElementStringStart = paramObject.nextElementStringStart
        
        let trueTypeOf = typeof paramObject.nextElement;
        let elementTypeOf = trueTypeOf;
        if(trueTypeOf === 'object'){
            trueTypeOf = Array.isArray(paramObject.nextElement) ? 'array' : trueTypeOf;
        }   
        paramObject.nextElementTrueTypeOf = trueTypeOf;
        // ø </PASS paramObject>
        // let elementTypeOf = 'string';
        responseObject.nextStringStartLog.push(paramObject.nextElementStringStart);
        responseObject.previousStringStartLog.push(paramObject.previousElementStringStart);
        if(elementTypeOf === 'object'){
            expressionBuilderObject(paramObject,responseObject);
        }else{
            expressionBuilderTerminus(paramObject,responseObject);
        }

        
    }
    // ø <paramObjectCheckList>
    let paramStatus = "|E|" + " " + "|C| " + ' – |E|-Exists – |C|-Confirmed';
    // paramStatus += `\n` + "|•| |O| " + "paramObject.baseElement";
    // paramStatus += `\n` + "|•| |O| " + "paramObject.baseElementName";
    // ø <next>;
    paramStatus += `\n` + "|X| |O| " + "paramObject.nextElement";
    paramStatus += `\n` + "|X| |O| " + "paramObject.nextElementName";
    paramStatus += `\n` + "|X| |O| " + "paramObject.nextElementtrueTypeOf";
    paramStatus += `\n` + "|X| |O| " + "paramObject.nextElementStringStart";
    // ø </next>
    // ø <previous>;
    paramStatus += `\n` + "|X| |O| " + "paramObject.previousElementtrueTypeOf";
    paramStatus += `\n` + "|X| |O| " + "paramObject.previousElementStringStart";
    // ø </previous>
    // ø </paramObjectCheckList>
    // responseObject.parameterChecklists = {};
    responseObject.parameterChecklists.forObject = paramStatus;
    // console.warn('responseObject.parameterChecklists.forObject: ');
    // console.warn(responseObject.parameterChecklists.forObject);
    
}

export function expressionBuilderTerminus(paramObject,responseObject){
    console.warn('!!Inside exBldrTerminus: ');
    console.warn('paramObject.previousElementtrueTypeOf: ');
    console.warn(paramObject.previousElementtrueTypeOf);
    // console.warn('responseObject.previousStringStartLog: ');
    // console.warn(responseObject.previousStringStartLog);
    // console.warn('paramObject: ');
    // console.warn('paramObject: ');
    // console.warn(paramObject);
    let appendToStartString = '';
    appendToStartString += paramObject.previousElementtrueTypeOf === 'array' ? '[' :'.';
    appendToStartString += paramObject.nextElementName;
    appendToStartString += paramObject.previousElementtrueTypeOf === 'array' ? ']' : '';////?
    // appendToStartString = paramObject.nextElementTrueTypeOf === 'BASE' ? paramObject.nextElementName : appendToStartString;
    // appendToStartString = previousElementStringStartKonstantHere === 'BASE' ? paramObject.nextElementName : appendToStartString;
    let localStartString = paramObject.previousElementStringStart;
    localStartString += appendToStartString;

    // console.warn('paramObject.nextElement: ');
    // console.warn(paramObject.nextElement);
    let stringThisKey = localStartString;////?
    // stringThisKey += paramObject.previousElementtrueTypeOf === 'array' ? `[${paramObject.nextElementName}]` : paramObject.nextElementName;////?
    let stringThisValue = paramObject.nextElement;
    stringThisValue = paramObject.nextElementTrueTypeOf === 'string' ? `"${stringThisValue}"` : stringThisValue;
    let stringThis = `${stringThisKey} = ${stringThisValue};`////?
    responseObject.expressionStringArray.push(stringThis);
    // console.warn('stringThis: ' + stringThis);

    // ø <paramObjectCheckList>
    let paramStatus = "|E|" + " " + "|C| " + ' – |E|-Exists – |C|-Confirmed';
    // paramStatus += `\n` + "|•| |O| " + "paramObject.baseElement";
    // paramStatus += `\n` + "|•| |O| " + "paramObject.baseElementName";
    // ø <next>;
    paramStatus += `\n` + "|X| |O| " + "paramObject.nextElement";
    paramStatus += `\n` + "|X| |O| " + "paramObject.nextElementName";
    paramStatus += `\n` + "|•| |O| " + "paramObject.nextElementTrueTypeOf";
    paramStatus += `\n` + "|•| |O| " + "paramObject.nextElementStringStart";
    // ø </next>
    // ø <previous>;
    paramStatus += `\n` + "|X| |O| " + "paramObject.previousElementtrueTypeOf";
    paramStatus += `\n` + "|X| |O| " + "paramObject.previousElementStringStart";
    // ø </previous>
    // ø </paramObjectCheckList>
    // responseObject.parameterChecklists = {};
    responseObject.parameterChecklists.forTerminus = paramStatus;
    responseObject.nextStringStartLog.push(paramObject.nextElementStringStart);
    responseObject.previousStringStartLog.push(paramObject.previousElementStringStart);
// console.warn('responseObject.parameterChecklists.forTerminus: ');
    // console.warn(responseObject.parameterChecklists.forTerminus);
    
}