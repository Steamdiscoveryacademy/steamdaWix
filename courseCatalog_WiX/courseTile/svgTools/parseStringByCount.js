// break words into three lines:

// let breakString = "Shirley 7, Ceecee 6, Marais 6, Chester 7,  Marcy 5 Feather 7"

function parseStringByCount(stringParam = 'STRING', byCountParam = 5, paramObject = {}){
    // ø <IF-ELSE-THEN>
    // ø <----- <destruct-construct-respons>  ----->
    // ø <----- </destruct-construct-respons> ----->

    // ø <----- <countIsValid>  ----->
    let countIsValid = true
    countIsValid = Math.floor(Math.abs(byCountParam)) !== byCountParam ? false : countIsValid
    countIsValid = byCountParam < 3 || byCountParam > 3 ? false : countIsValid
    if(!countIsValid){
        paramObject.error = {}
        paramObject.error.boolean = !countIsValid
        paramObject.error.booleanEvalString = '!countIsValid'
        paramObject.error.string = 'byCountParam value is Invalid'
        paramObject.error.notes = []
        paramObject.error.notes.push('must be an integer btween 3 and 3 inclusive')
        return
    }
    // ø <----- </countIsValid> ----->
    // ø </IF-ELSE-THEN>
    let unparsedWordArray = stringParam.split(' ')
    let parsedWordArray = []
    let parsedWordLengthArray = []
    let characterCount = 0
    unparsedWordArray.forEach(element => {
        if(element.length > 0){
            parsedWordArray.push(element)
            parsedWordLengthArray.push(element.length)
            characterCount += element.length
        }
    });
    // let paramObject = {}
    paramObject.parsedWordArray = parsedWordArray
    paramObject.parsedWordLengthArray = parsedWordLengthArray
    paramObject.characterCount = characterCount
    let characterNumberByCount = characterCount / byCountParam
    let wordCountMaxLessThan = 0
    let characterCountWordCountMaxLessThan = 0
    let wordCountMinGreaterThan = 0
    let characterCountWordCountMinGreaterThan = 0
    let wordCountEqualTo = 0
    let characterCountSoFar = 0
    parsedWordLengthArray.forEach(element => {
        characterCountSoFar += element
        if(characterCountSoFar < characterNumberByCount ){
            wordCountMaxLessThan++
            characterCountWordCountMaxLessThan += element
        }
        if(characterCountSoFar <= characterNumberByCount && wordCountMinGreaterThan === wordCountEqualTo){
            wordCountMinGreaterThan++
            characterCountWordCountMinGreaterThan += element
        }
        if(characterCountSoFar <= characterNumberByCount ){
            wordCountEqualTo++
        }
    });
    if(wordCountEqualTo === wordCountMaxLessThan){
        wordCountMaxLessThan = 0
        characterCountWordCountMaxLessThan = 0
    }
    if(wordCountMinGreaterThan === wordCountEqualTo){
        wordCountMinGreaterThan = 0
        characterCountWordCountMinGreaterThan = 0
    }
    paramObject.wordCountMaxLessThan = wordCountMaxLessThan
    paramObject.characterCountWordCountMaxLessThan = characterCountWordCountMaxLessThan
    paramObject.wordCountMinGreaterThan = wordCountMinGreaterThan
    paramObject.characterCountWordCountMinGreaterThan = characterCountWordCountMinGreaterThan
    paramObject.wordCountEqualTo = wordCountEqualTo

    paramObject.characterNumberByCount = characterNumberByCount

}




let breakString = "Shirle  Chester Feather"
let paramObjectAsResponse = {}
parseStringByCount(breakString,3,paramObjectAsResponse)

console.warn(`paramObjectAsResponse as Response: ${JSON.stringify(paramObjectAsResponse,undefined,4)}`)
console.warn(JSON.stringify(paramObjectAsResponse,undefined,4))
// console.warn(`unparsedWordArray: [${unparsedWordArray}]`)
// console.warn(`parsedWordArray: [${parsedWordArray}]`)
// console.warn(`parsedWordLengthArray: [${parsedWordLengthArray}]`)
// console.warn(`characterCount: ${characterCount}`)























/**
 * ø Featuers:
 * ø 1. Accept unlimited charactes 
 * ø 2. Accept unlimited charactes as unlimited words
 * ø 3. parse into one, two and three lines
 * ø      • as close as possible same number of characters with no unbroken words  
 * ø 
 * ø Logic:
 * ø 1. Thirds
 * ø   • identify first third
 * ø   • determine if that point is or is adjacent to a whitespace
 * ø   • IF yes:
 * ø   • THEN Break Third
 */