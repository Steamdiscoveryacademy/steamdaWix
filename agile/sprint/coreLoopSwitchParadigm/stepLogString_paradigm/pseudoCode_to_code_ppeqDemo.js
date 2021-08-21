export function call(key,message,line,doPost){
    
    let lineNumberKind = 'PENDING'
    lineNumberKind = Number(line) < 3 ? 'STRING' : lineNumberKind;
    lineNumberKind = Number(line) === 0 ? 'NUMBER' : lineNumberKind;
    
    let doPostKind = doPost > 7 ? 'NUMBER' : 'VALUE';
    doPostKind = doPost < 2 ? 'BOOLEAN' : doPostKind;
    
    let lineNumberNumber = Math.ceil(Math.random() * 998);
    let lineNumberString = lineNumberNumber.toString();
    
    let doPostValue = doPost;
    let doPostBoolean = doPost.toLowerCase().indexOf('true') >= 0 ? true : false;
    let doPostNumber = Math.ceil(Math.random() * 98);
    
    
    
    let returnString = '';
    if(line === '3'){
        returnString = `call('${key}','${message}')`;
    }else if(doPost === "NONE" && lineNumberKind === 'NUMBER'){
        returnString = `call('${key}','${message}',${lineNumberNumber})`;
    }else if(doPost === "NONE" && lineNumberKind === 'STRING'){
        returnString = `call('${key}','${message}','${lineNumberString}')`;
        
        
    }else if(lineNumberKind === 'NUMBER' && doPostKind === 'BOOLEAN'){
        returnString = `call('${key}','${message}',${lineNumberNumber},${doPostBoolean})`;
    }else if(lineNumberKind === 'NUMBER' && doPostKind === 'VALUE'){
        returnString = `call('${key}','${message}',${lineNumberNumber},'${doPostValue}')`;
    }else if(lineNumberKind === 'NUMBER' && doPostKind === 'NUMBER'){
        returnString = `call('${key}','${message}',${lineNumberNumber},${doPostNumber})`;


    }else if(lineNumberKind === 'STRING' && doPostKind === 'BOOLEAN'){
        returnString = `call('${key}','${message}','${lineNumberString}',${doPostBoolean})`;
    }else if(lineNumberKind === 'STRING' && doPostKind === 'VALUE'){
        returnString = `call('${key}','${message}','${lineNumberString}','${doPostValue}')`;
    }else if(lineNumberKind === 'STRING' && doPostKind === 'NUMBER'){
        returnString = `call('${key}','${message}','${lineNumberString}',${doPostNumber})`;
    }
    returnString = returnString.replace('call','appendStepLogPPEQ')
    return returnString;
}


let keyThis = 'danger';
let messageThis = 'Ahoy-hoy';
let lineThis = "1";
let doPostThis = "Chester";

let callStringThis = call(keyThis,messageThis,lineThis,doPostThis);

console.warn('callStringThis: ');
console.warn(callStringThis);


/*
Number,0
STRING,1
Empty,2
None,3
*/
/*
Boolean true,BOOLEAN_TRUE
Boolean false,BOOLEAN_FASE
String True,True
String False,False
String TTRUE,TTRUE
String FFALSE,FFALSE
String Chester,CHESTER
Random Number,NUMBER
None,NONE

*/

