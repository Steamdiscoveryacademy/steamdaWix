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
    return trueTypeOf;
}