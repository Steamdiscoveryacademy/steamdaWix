// ! <---------- <TEST Simple Object>  ---------->
testElementName = 'dogObject';
testJSON =  `{"name":"Chester","age":14}`;

// ! <Sylvester McMonkey McBean>
// ø Simple Object
// ø v0.3.5
// ø 20210611114500
// ø NOTES:
// ø simplest object for testing
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
// ø v0.3.5
// ø 20210611114500
// ø NOTES:
// ø simplest array for testing -- kind of the other end of the telescope
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
// ø v0.3.5
// ø 20210611114500
// ø NOTES:
// ø mix them together -- started with one, since multiple was its own set of bugs
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
// ø v0.3.5
// ø 20210611114500
// ø NOTES:
// ø mix objects and arrays
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


// ! <---------- <TEST Object with Two Arrays of Objects>  ---------->
testElementName = 'petsObject';
testJSON = `{"dogs":[{"name":"Chester","age":14},{"name":"Marais","age":10}],"cats":[{"name":"Algonquin","age":19}]}`;

// ! <Sylvester McMonkey McBean>
// ø TEST Object with Two Arrays of Objects
// ø v0.3.5
// ø 20210611114500
// ø NOTES:
// ø this is the first relatively _real_ data block for testing
// ! <Sylvester McMonkey McBean>

//Final Code: 
let petsObject = {};
petsObject.dogs = [];
petsObject.dogs[0] = {};
petsObject.dogs[0].name = "Chester";
petsObject.dogs[0].age = 14;
petsObject.dogs[1] = {};
petsObject.dogs[1].name = "Marais";
petsObject.dogs[1].age = 10;
petsObject.cats = [];
petsObject.cats[0] = {};
petsObject.cats[0].name = "Algonquin";
petsObject.cats[0].age = 19;

console.warn('petsObject: ');
console.warn(petsObject);
// ! <---------- </TEST Object with Two Arrays of Objects> ---------->


// ! <---------- <TEST Person with Pets>  ---------->
testElementName = 'person';
testJSON = `{"first":"Brad","last":"Lowry","age":61,"pets":{"dogs":[{"name":"Chester","age":14},{"name":"Marais","age":10}],"cats":[{"name":"Algonquin","age":19}]}}`;

// ! <Sylvester McMonkey McBean>
// ø TEST Person with Pets
// ø v0.3.5
// ø 20210611114500
// ø NOTES:
// ø indeed, this one engendered these 'NOTES'
// ø pretty rigorous data, but my own so that I can confirm it
// ø going to Up the version to 1.0.0 and jump to Enrollment 
// ø (and back down toDog Park if it's indicated)
// ! <Sylvester McMonkey McBean>

//Final Code: 
let person = {};
person.first = "Brad";
person.last = "Lowry";
person.age = 61;
person.pets = {};
person.pets.dogs = [];
person.pets.dogs[0] = {};
person.pets.dogs[0].name = "Chester";
person.pets.dogs[0].age = 14;
person.pets.dogs[1] = {};
person.pets.dogs[1].name = "Marais";
person.pets.dogs[1].age = 10;
person.pets.cats = [];
person.pets.cats[0] = {};
person.pets.cats[0].name = "Algonquin";
person.pets.cats[0].age = 19;

console.warn('person: ');
console.warn(person);
console.warn('person.pets: ');
console.warn(person.pets);
// ! <---------- </TEST Person with Pets> ---------->




