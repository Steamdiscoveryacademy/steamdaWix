// let dogElementName = 'dogObject';
// let dogJSON =  `{"name":"Chester","age":14}`;
let dogElementName = 'dogsSimpleArray';
let dogJSON = `["Chester","Marais"]`;
// let dogElementName = 'dogsObjectArrayJSON';
// let dogJSON = `[{"name":"Chester","age":14},{"name":"Marais","age":10}]`;

// ! <CALL the Code>
let responseTest = expressionBuilderLaunch(dogElementName,dogJSON)
let finalCode = '//Final Code: ';
responseTest.expressionStringArray.forEach(line => {
    // console.log(line);
    finalCode += `\n` + line;
});
console.warn('responseTest: ');
console.warn(responseTest);
console.warn(finalCode);
// ! </CALL the Code>

// let expressionBracketChainArray = [];
// let expressionDotChainArray = [];
// let expressionChainArrayThis =  []
export function expressionBuilderLaunch(elementName,elementJSON,expressionChainArray = []){
    let paramObject = {};
    paramObject.expressionChainArray = [];
    paramObject.expressionChainString = '';
    let responseObject = {};
    responseObject.expressionStringArray = [];
    // !-----\_ param & response _/-----
    let element = JSON.parse(elementJSON);
    paramObject.baseElement = element;
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
    // ø <MOVED to Object>
    // let stringThis = `let ${elementName} = {};`
    // if(Array.isArray(element)){
    //     stringThis = `let ${elementName} = [];`
    // }
    // responseObject.expressionStringArray.push(stringThis);
    // paramObject.expressionChainArray.push(elementName);
    // paramObject.expressionChainString + elementName;
    // ø </MOVED to Object>
    paramObject.baseElementName = elementName;
    paramObject.nextElement = element;
    paramObject.nextElementName = elementName;
    paramObject.nextElementTrueTypeOf = trueTypeOf;
    paramObject.previousElementStringStart = 'BASE';
    // console.warn(elementTypeOf);
    // console.warn('expressionChainArray:');
    // console.warn(expressionChainArray);
    // console.warn('Object.keys(element):');
    // console.warn(Object.keys(element));
    // expressionBuilderObject(element,expressionChainArray)

    expressionBuilderObject(paramObject,responseObject)
    return responseObject;
}



export function expressionBuilderObject(paramObject,responseObject){
    // console.warn('paramObject inside exBldrObject: ');
    // console.warn(paramObject);
    // console.warn('paramObject.nextElement: ');
    // console.warn(paramObject.nextElement);
    // ø <WAS in Launch>
    let stringThis = `let ${paramObject.nextElementName} = {};`
    if(Array.isArray(paramObject.nextElement)){
        stringThis = `let ${paramObject.nextElementName} = [];`
    }
    responseObject.expressionStringArray.push(stringThis);
    paramObject.expressionChainArray.push(paramObject.nextElementName);
    paramObject.expressionChainString + paramObject.nextElementName;
    // ø </WAS in Launch>

    let nextElementKonstantHere  = paramObject.nextElement;
    let previousElementTrueType = paramObject.nextElementTrueTypeOf;
    let previousElementStringStartKonstantHere  = paramObject.previousElementStringStart;
    if(paramObject.previousElementStringStart === 'BASE'){
        paramObject.previousElementStringStart = '';
    }
    let appendToStartString = '';
    appendToStartString += paramObject.nextElementTrueTypeOf === 'array' ? '[' :'.';
    appendToStartString += paramObject.nextElementName;
    // paramObject.previousElementStringStart += paramObject.nextElementTrueTypeOf;
    appendToStartString += paramObject.nextElementTrueTypeOf === 'array' ? ']' : '';
    appendToStartString = paramObject.nextElementTrueTypeOf === 'BASE' ? paramObject.nextElementName : appendToStartString;
    paramObject.previousElementStringStart += appendToStartString;

    let nextElementKeyArray = Object.keys(paramObject.nextElement);//?
    for (let index = 0; index < nextElementKeyArray.length; index++) {
        const elementKey = nextElementKeyArray[index];
        paramObject.nextElement = nextElementKonstantHere[elementKey] ;
        paramObject.nextElementName = elementKey; 
        paramObject.previousElementTrueType = previousElementTrueType;
        
        let trueTypeOf = typeof paramObject.nextElement;
        if(trueTypeOf === 'object'){
            trueTypeOf = Array.isArray(paramObject.nextElement) ? 'array' : trueTypeOf;
        }   
        paramObject.nextElementTrueTypeOf = trueTypeOf;
        let elementTypeOf = 'string';
        if(elementTypeOf === 'object'){
            expressionBuilderObject(paramObject,responseObject);
        }else{
            expressionBuilderTerminus(paramObject,responseObject);
        }

        
    }

}

export function expressionBuilderTerminus(paramObject,responseObject){
    // console.warn('paramObject inside exBldrTerminus: ');
    // console.warn(paramObject);
    // console.warn('paramObject.nextElement: ');
    // console.warn(paramObject.nextElement);
    let stringThisKey = paramObject.previousElementStringStart;//?
    stringThisKey += paramObject.previousElementTrueType === 'array' ? `[${paramObject.nextElementName}]` : stringThisKey;//?
    let stringThisValue = paramObject.nextElement;
    stringThisValue = paramObject.nextElementTrueTypeOf === 'string' ? `"${stringThisValue}"` : stringThisValue;
    let stringThis = `${stringThisKey} = ${stringThisValue};`//?
    responseObject.expressionStringArray.push(stringThis);
    // console.warn('stringThis: ' + stringThis);

}