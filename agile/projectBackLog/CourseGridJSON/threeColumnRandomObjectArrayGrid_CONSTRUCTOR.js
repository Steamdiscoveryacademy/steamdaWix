let columns = [1,2,3];
let letters = ['A','B','C','D','E','F'];

let rowColumnObjectPreSortArray = [];
let index = 0;
let elementObject = {};
columns.forEach(column => {
    // console.log(column);
    letters.forEach(letter => {
        // console.log(letter);
        if(Math.floor(Math.random() * 2) === 1){
            elementObject = {};
            elementObject.lable = column + letter;
            elementObject.lable2 = letter + column;
            elementObject.column = column;
            elementObject.letter = letter;
            elementObject.sort = Math.ceil(Math.random() * 100);
            elementObject.index = index;
            rowColumnObjectPreSortArray.push(elementObject);
            index++;
        }
    });
});

let rowColumnObjectArray = rowColumnObjectPreSortArray.sort((a,b) => {
    sortValue = 0;
    sortValue = a.sort > b.sort ? 1 : sortValue;
    sortValue = a.sort < b.sort ? -1 : sortValue;
    return sortValue;
})


console.warn(`//rowColumnObjectArray[${rowColumnObjectArray.length}]: `);
console.warn("let rowColumnObjectArray = `" + JSON.stringify(rowColumnObjectArray) + "`;");
