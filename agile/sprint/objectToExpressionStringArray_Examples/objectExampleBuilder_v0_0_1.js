// let dog = "Chester";
// let dogJSON = JSON.parse(dog);
// console.warn('dog: ');
// console.warn(dog);


let dogs = [];


let dog = {};
dog.name = "Chester";
dog.age = 14;
console.warn(`//dog: `);
console.warn(`// let dogObject =  `);
console.warn(dog);
console.warn(`// let dogJSON =  `);
console.warn(JSON.stringify(dog));
dogs.push(dog);
dog = {};
dog.name = "Marais";
dog.age = 10;
// console.warn('//dog: ');
// console.warn(dog);
// console.warn(JSON.stringify(dog));
dogs.push(dog);

console.warn('//dogs: ');
console.warn('//let dogsObjectArray = ');
console.warn(dogs);
console.warn('//let dogsJSON = ');
console.warn(JSON.stringify(dogs));

let pets = {};
pets.dogs = dogs;
let cat = {};
cat.name = "Algonquin";
cat.age = 19;
let cats = [];
cats.push(cat);
pets.cats = cats
console.warn('//pets: ');
console.warn('//petsObject = ');
console.warn(pets);
console.warn('//petsJSON = ');
console.warn(JSON.stringify(pets));


let person = {};
person.first = "Brad";
person.last = "Lowry";
person.age = 61;
person.pets = pets;

console.warn('//person: ');
console.warn('//personObject = ');
console.warn(person);
console.warn('//personJSON = ');
console.warn(JSON.stringify(person));

