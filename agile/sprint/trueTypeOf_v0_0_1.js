let testOperandNull = null;
let testOperandObject = {};
let testOperandArray = [];
let testOperandString = "Happy";
let testOperand = testOperandString


let testResult = trueTypeOf(testOperand)

console.warn('testResult [' + typeof testResult + ']: ');
console.warn(testResult);










export function trueTypeOf(operand){
    if(typeof operand === undefined){
        return 'undefined';
    }
    if(operand === null){
        return 'null';
    }
    let trueTypeOf = typeof operand;
    if(trueTypeOf === 'object'){
        trueTypeOf = Array.isArray(operand) ? 'array' : trueTypeOf;
    }
    if(trueTypeOf === 'string'){
        if(operand.length < 1){
            trueTypeOf = 'empty_string'
        }
    }
    return trueTypeOf;
}