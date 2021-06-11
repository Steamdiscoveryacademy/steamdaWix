// ! <---------- <TEST Simple Object>  ---------->
testElementName = 'dogObject';
testJSON =  `{"name":"Chester","age":14}`;

// ! <Sylvester McMonkey McBean>
// ø Simple Object
// ø v0.3.2
// ø 20210611110100
// ! <Sylvester McMonkey McBean>

//Final Code: 
let dogObject = {};
dogObject.name = "Chester";
dogObject.age = 14;

console.warn('dogObject: ');
console.warn(dogObject);
// ! <---------- </TEST Simple Object> ---------->


// ! <---------- <TEST Simple Array>  ---------->
testElementName = 'dogsSimpleArray';
testJSON = `["Chester","Marais"]`;

// ! <Sylvester McMonkey McBean>
// ø Simple Array
// ø v0.3.2
// ø 20210611110100
// ! <Sylvester McMonkey McBean>

//Final Code: 
let dogsSimpleArray = [];
dogsSimpleArray[0] = "Chester";
dogsSimpleArray[1] = "Marais";

console.warn('dogsSimpleArray: ');
console.warn(dogsSimpleArray);
// ! <---------- </TEST Simple Array> ---------->


// ! <---------- <TEST Object Array One Element>  ---------->
testElementName = 'oneDogObjectArray';
testJSON = `[{"name":"Chester","age":14}]`;

// ! <Sylvester McMonkey McBean>
// ø Object Array One Element
// ø v0.3.2
// ø 20210611110100
// ! <Sylvester McMonkey McBean>

//Final Code: 
let oneDogObjectArray = [];
oneDogObjectArray[0] = {};
oneDogObjectArray[0].name = "Chester";
oneDogObjectArray[0].age = 14;

console.warn('oneDogObjectArray: ');
console.warn(oneDogObjectArray);
// ! <---------- </TEST Object Array One Element> ---------->


// ! <---------- <TEST Object Array Two Elements>  ---------->
testElementName = 'dogsObjectArray';
testJSON = `[{"name":"Chester","age":14},{"name":"Marais","age":10}]`;

// ! <Sylvester McMonkey McBean>
// ø Object Array Two Elements
// ø v0.3.2
// ø 20210611110100
// ! <Sylvester McMonkey McBean>

//Final Code: 
let dogsObjectArray = [];
dogsObjectArray[0] = {};
dogsObjectArray[0].name = "Chester";
dogsObjectArray[0].age = 14;
dogsObjectArray[1] = {};
dogsObjectArray[1].name = "Marais";
dogsObjectArray[1].age = 10;

console.warn('dogsObjectArray: ');
console.warn(dogsObjectArray);
// ! <---------- </TEST Object Array Two Elements> ---------->




