//row-colum becomes base 4 for demo (base 9 for live)
//then 0-25 as base 
// let base10 = 0
let columns = 4
let base4 = 0
// let mod26 = 0
let objectArray = []
let objectThis = {}
for (let index = 0; index < 30; index++) {
    // const element = array[index];
    base10 = index
    objectThis = {}
    objectThis.indexBase10 = base10
    // objectThis.base10ToString = base10.toString()
    objectThis.baseCol = Number(base10.toString(columns))
    objectThis.alphabetIndex = base10 % 26
    // objectThis.decimalFromDivMod4 = Math.round(Math.floor(base10 / 4) + (base10 % 4 / 10))
    // objectThis.decimalFromDivMod4 = Math.floor(base10 / 4).toString() + (base10 % 4 / 10).toString()
    objectThis.rowDOTcol = Math.floor(base10 / 4).toString() + '.' + (base10 % 4).toString()
    objectArray.push(objectThis)
}


console.warn(`objectArray: [object below]`)
console.dir(objectArray)