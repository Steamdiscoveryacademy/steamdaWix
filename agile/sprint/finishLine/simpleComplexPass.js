let test1 = simpleComplexPass();
console.warn('test1: ' + test1);
let test2 = simpleComplexPass();
console.warn('test2: ' + test2);
let test3 = simpleComplexPass();
console.warn('test3: ' + test3);

//ø <---------- <simpleComplexPass()>  ---------->
export function simpleComplexPass(){

    let alpha = "abcdefghijklmnopqrstuvwxyz";
    let numeric = "0123456789";
    let start = Math.floor(Math.random() * alpha.length);
    let password = alpha.substr(start,1);
    start = Math.floor(Math.random() * alpha.length);
    password += alpha.substr(start,1).toUpperCase();
    start = Math.floor(Math.random() * numeric.length);
    password += numeric.substr(start,1);
    alpha = alpha + alpha.toLocaleUpperCase() + numeric;
    start = Math.floor(Math.random() * alpha.length);
    password += alpha.substr(start,1);
    start = Math.floor(Math.random() * alpha.length);
    password += alpha.substr(start,1);
    start = Math.floor(Math.random() * alpha.length);
    password += alpha.substr(start,1);
    start = Math.floor(Math.random() * alpha.length);
    password += alpha.substr(start,1);
    
 return password;   
}
//ø <---------- </simpleComplexPass()> ---------->
