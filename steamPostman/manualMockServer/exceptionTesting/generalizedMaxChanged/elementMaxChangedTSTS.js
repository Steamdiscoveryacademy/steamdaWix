console.log('<TSTS: entering>')
const maxChangedGatheredPrevious = pm.variables.get("elementMaxChangedGathered")
console.log(`TSTS: <Starndard TESTS - .status(200) etc)>`)
// » <Starndard TESTS - .status(200) etc)>
let testCount = 0 
let passedCount = 0 
let failedCount = 0

testCount++
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
    passedCount++
    failedCount--
})

// see 'Tests Esoteric'
// console.log(`Tests Aggregate: Test Count: ${testCount}; Passed Count: ${passedCount}; Failed Count: ${(testCount + failedCount)}`)
// console.log(`if((testCount [${testCount}] + [${failedCount}] failedCount) === 0) » 'CONTINUE'`)
 
// » </Starndard TESTS - .status(200) etc)>
console.log(`TSTS: </Starndard TESTS - .status(200) etc)>`)

let maxChangedLoop = pm.variables.get("elementMaxChanged")
let maxChangedThis = pm.variables.get("elementMaxChanged")
let maxChangedGatheredThis = pm.variables.replaceIn('{{$isoTimestamp}}')

let responseLogUNIVERSAL = true
let exhaustiveDocumentation = true
exhaustiveDocumentation = false

let updated = false
let index = 0
let updatedCount = 0
let updatedTrueLogicArray = []
let updatedFalseLogicArray = []
const responseObjectArray = pm.response.json()
if(exhaustiveDocumentation === true){
    console.log(`responseObjectArray: [array of course objects below]`)
    console.log(responseObjectArray)
}

responseObjectArray.forEach(elementObject => {
    const changed = elementObject.changed
    updated = changed > maxChangedLoop ? true : updated
    updatedCount += changed > maxChangedLoop ? 1 : 0
    const updateLogicString = `'element[${index}] uid[${elementObject.uid}]: changed [${changed}] > [${maxChangedLoop}] maxChangedLoop'`
    // ø <EXAUSTIVE-DOCUMENTATION>
    // ø </EXAUSTIVE-DOCUMENTATION>
    if(exhaustiveDocumentation === true){
        // ! <EXAUSTIVE-DOCUMENT>
        if(changed > maxChangedLoop){
            updatedTrueLogicArray.push(updateLogicString)
        }else{
            updatedFalseLogicArray.push(updateLogicString)
        }
        // ! </EXAUSTIVE-DOCUMENT>
    }
    // ø </EXAUSTIVE-DOCUMENTATION>

    maxChangedThis = changed > maxChangedLoop ? changed : maxChangedThis
    maxChangedThis = changed > maxChangedLoop ? changed : maxChangedThis
    index++
})

// updated = true

if(responseLogUNIVERSAL === true){
    // ø <TSTS: Universal Response Log>
    console.log(`
    <TSTS: Universal Response Log>`)
    console.log(`PRS: pm.variables.get("blockSetName"): ${pm.variables.get("blockSetName")}`)
    console.log(`PRS: pm.variables.get("blockUsedName"): ${pm.variables.get("blockUsedName")}`)
    console.log(`PRS: pm.variables.get("blockUsed"): ${pm.variables.get("blockUsed")}`)
    console.log(`PRS: pm.variables.get("elementMaxChanged"): ${pm.variables.get("elementMaxChanged")}`)
    console.log(`PRS: pm.variables.get("elementMaxChangedGathered"): ${pm.variables.get("elementMaxChangedGathered")}`)
    console.log(`TSTS: maxChangedGatheredPrevious: ${maxChangedGatheredPrevious}`)
    console.log(`TSTS: maxChangedGatheredThis: ${maxChangedGatheredThis}`)
    console.log(`TSTS: maxChangedLoop: ${maxChangedLoop}`)
    console.log(`updated: = ${updated}`)
    console.log(`updatedCount = ${updatedCount}`)
    if(exhaustiveDocumentation === true){
        console.log(`updatedTrueLogicArray = [${updatedTrueLogicArray.toString()}]`)
        console.log(`updatedFalseLogicArray = [${updatedFalseLogicArray.toString()}]`)
    }
    // ! <PRE-TRASH>
    if(exhaustiveDocumentation === false){
    // if(exhaustiveDocumentation === 77777){
        console.log(`updatedTrueLogicArray = [${updatedTrueLogicArray.toString()}]`)
        console.log(`updatedFalseLogicArray = [${updatedFalseLogicArray.toString()}]`)
    }
    // ! </PRE-TRASH>
    console.log(`TSTS: maxChangedThis: ${maxChangedThis} [dynamic]`)
    console.log(`TSTS: maxChangedGatheredThis: ${maxChangedGatheredThis} [constant NOW]`)
    console.log(`</TSTS: Universal Response Log>
    `)
    // ø </TSTS: Universal Response Log>
}



// pm.variables.get("elementMaxChanged")
// pm.variables.get("elementMaxChangedGathered")
// let maxChangedGatheredThis = pm.variables.replaceIn('{{$randomFirstName}}')
// pm.globals.set("maxChangedGatheredThis", maxChangedGatheredThis)


if(updated === true){
    console.log(`elementMaxChanged Updated (changed) 
ACTION INDICATED:
Append the code below to the Pre-request Script:
copy below FROM HERE =>`)
    // console.log(`"maxChangedGathered", "${maxChangedGatheredThis}")`)
    console.log(`pm.globals.set("elementMaxChanged", "${maxChangedThis}")`)
    console.log(`pm.globals.set("elementMaxChangedGathered", "${maxChangedGatheredThis}")`)
    console.log(`<= TO HERE`)
}else{
console.log(`RESULT:
No Drupal Course(s) Updated (changed) since ${maxChangedGatheredPrevious}
NO ACTION INDICATED
`)
}
console.log(`TSTS: <Esoteric TESTS - updatedCount === 0>`)
// <---------- test ---------->
testCount++
pm.test(`NO EXCEPTION: No Updates Since ${pm.variables.get("elementMaxChangedGathered")}`  , function () {
    //var jsonData = pm.response.json();
    pm.expect(updatedCount, 'No Elements Changed').to.equal(0)
    passedCount++
    failedCount--
});
// <---------- test ---------->

// <---------- aggregate ---------->
console.log(`Tests Aggregate: Test Count: ${testCount}; Passed Count: ${passedCount}; Failed Count: ${(testCount + failedCount)}`)
console.log(`if((testCount [${testCount}] + [${failedCount}] failedCount) === 0) » 'CONTINUE'`)
// <---------- aggregate ---------->
console.log(`TSTS: </Esoteric TESTS - updatedCount === 0>`)

console.log('</TSTS: exiting>')