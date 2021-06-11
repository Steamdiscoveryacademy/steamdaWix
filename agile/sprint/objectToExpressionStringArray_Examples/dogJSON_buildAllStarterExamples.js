//dog: 

let dogObject =  { name: 'Chester', age: 14 }

let dogJSON =  `{"name":"Chester","age":14}`;

//dogsSimpleArrayJSON: 

let dogsSimpleArray = ['Chester','Marais'];

let dogsSimpleArrayJSON = `["Chester","Marais"]`;

//dogs: 

let dogs = [ { name: 'Chester', age: 14 }, { name: 'Marais', age: 10 } ]

let dogsJSON = `[{"name":"Chester","age":14},{"name":"Marais","age":10}]`;

//pets: 

petsObject = { dogs: [ { name: 'Chester', age: 14 }, { name: 'Marais', age: 10 } ],
  cats: [ { name: 'Algonquin', age: 19 } ] }

petsJSON = `{"dogs":[{"name":"Chester","age":14},{"name":"Marais","age":10}],"cats":[{"name":"Algonquin","age":19}]}`;

//person: 

personObject = { first: 'Brad',
  last: 'Lowry',
  age: 61,
  pets: { dogs: [ [Object], [Object] ], cats: [ [Object] ] } }

personJSON = `{"first":"Brad","last":"Lowry","age":61,"pets":{"dogs":[{"name":"Chester","age":14},{"name":"Marais","age":10}],"cats":[{"name":"Algonquin","age":19}]}}`;
