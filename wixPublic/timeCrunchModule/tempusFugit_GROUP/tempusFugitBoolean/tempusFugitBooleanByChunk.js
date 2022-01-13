// ø <---------- <function tempusFugitBoolean(isoCheck, isoNow)>  ---------->
function tempusFugitBoolean(isoCheck, isoNow) {

    // let toUpdateBooleanObject = JSON.parse(`{"ONEyyyy":false,"SIXmm":false,"THREEmm":false,"ONEmm":false,"FIFTEENdd":false,"SEVENdd":false,"ONEdd":false,"TWELVEhh":false,"SIXhh":false,"ONEhh":false,"THIRTYii":false,"FIFTEENii":false,"FIVEii":false,"ONEii":false}`)
    let toUpdateBooleanObject = JSON.parse(`{"yyyy":false,"mm":false,"dd":false,"hh":false,"ii":false}`)
    let toUpdateLogicObject = {}
    let isoChunkArray = [['yyyy', /(\d{4})/], ['mm', /-(\d{2})-/], ['dd', /-(\d{2})T/], ['hh', /T(\d{2}):/], ['ii', /:(\d{2}):/], ['ss', /:(\d{2})\./]]
    let isoCheckObject = {}
    let isoNowObject = {}
    let isoCheckStingSoFar = ''
    let isoNowStingSoFar = ''
    let matchArray = []
    let evalCheckSoFarNotSame = ''
    let evalNowValueWellPastCheck = ''
    let evalNowValueJustPastCheck_Part1 = ''
    let evalNowValueJustPastCheck_Part2 = ''
    let evalNowValueJustPastCheck = ''
    // ! <Now AND Check>
    for (let index = 0; index < isoChunkArray.length; index++) {
        const elementArray = isoChunkArray[index];
        // toUpdateBooleanObject[elementArray[0]] = false
        isoCheckObject[elementArray[0]] = {}
        isoNowObject[elementArray[0]] = {}
        toUpdateLogicObject[elementArray[0]] = {}
        isoCheckObject[elementArray[0]]['regex'] = elementArray[1]
        isoNowObject[elementArray[0]]['regex'] = elementArray[1]
        matchArray = isoCheck.match(elementArray[1])
        isoCheckObject[elementArray[0]]['value'] = Number(matchArray[1])
        isoCheckObject[elementArray[0]]['stringSoFar'] = isoCheckStingSoFar
        isoCheckStingSoFar += matchArray[1]
        matchArray = isoNow.match(elementArray[1])
        isoNowObject[elementArray[0]]['value'] = Number(matchArray[1])
        isoNowObject[elementArray[0]]['stringSoFar'] = isoNowStingSoFar
        isoNowStingSoFar += matchArray[1]
    }
    // ! </Now AND Check>
    // ! <toUpdateLogicObject>
    let nextElementKey = 'DEPRECATE_ME'
    let nextElementIndex = 0
    for (let index = 0; index < isoChunkArray.length; index++) {
        const elementArray = isoChunkArray[index];
        nextElementIndex = index + 1 === isoChunkArray.length ? index : index + 1
        const nextElementArray = isoChunkArray[nextElementIndex]
        nextElementKey = nextElementArray[0]
        evalCheckSoFarNotSame = `${isoNowObject[elementArray[0]]['stringSoFar']} !== ${isoCheckObject[elementArray[0]]['stringSoFar']}`
        evalCheckSoFarNotSame = nextElementKey === 'mm' ? '0 !== 0' : evalCheckSoFarNotSame
        evalNowValueWellPastCheck = `${isoNowObject[elementArray[0]]['value']} > ${isoCheckObject[elementArray[0]]['value']} + 1`
        evalNowValueJustPastCheck_Part1 = `${isoNowObject[elementArray[0]]['value']} === ${isoCheckObject[elementArray[0]]['value']} + 1`
        evalNowValueJustPastCheck_Part2 = `${isoNowObject[nextElementKey]['value']} > ${isoCheckObject[nextElementKey]['value']} + 1`
        evalNowValueJustPastCheck = `${evalNowValueJustPastCheck_Part1} && ${evalNowValueJustPastCheck_Part2}`
        toUpdateLogicObject[elementArray[0]]['nextElementKey'] = nextElementKey
        toUpdateLogicObject[elementArray[0]]['evalCheckSoFarNotSame'] = evalCheckSoFarNotSame
        toUpdateLogicObject[elementArray[0]]['evalNowValueWellPastCheck'] = evalNowValueWellPastCheck
        toUpdateLogicObject[elementArray[0]]['evalNowValueJustPastCheck_Part1'] = evalNowValueJustPastCheck_Part1
        toUpdateLogicObject[elementArray[0]]['evalNowValueJustPastCheck_Part2'] = evalNowValueJustPastCheck_Part2
        toUpdateLogicObject[elementArray[0]]['evalNowValueJustPastCheck'] = evalNowValueJustPastCheck
    }
    // ! </toUpdateLogicObject>
    // ! <Finalize toUpdateBooleanObject>
    let incrementArray = ["yyyy", "mm", "dd", "hh", "ii"]
    let booleanCheckSoFarNotSame = null
    let booleanNowValueWellPastCheck = null
    let booleanNowValueJustPastCheck_Part1 = null
    let booleanNowValueJustPastCheck_Part2 = null
    let booleanNowValueJustPastCheck = null
    incrementArray.forEach(element => {
        toUpdateBooleanObject[element] = {}
        toUpdateBooleanObject[element]['booleanCheckSoFarNotSame'] = eval(toUpdateLogicObject[element]['evalCheckSoFarNotSame'])
        toUpdateBooleanObject[element]['booleanNowValueWellPastCheck'] = eval(toUpdateLogicObject[element]['evalNowValueWellPastCheck'])
        toUpdateBooleanObject[element]['booleanNowValueJustPastCheck_Part1'] = eval(toUpdateLogicObject[element]['evalNowValueJustPastCheck_Part1'])
        toUpdateBooleanObject[element]['booleanNowValueJustPastCheck_Part2'] = eval(toUpdateLogicObject[element]['evalNowValueJustPastCheck_Part2'])
        toUpdateBooleanObject[element]['booleanNowValueJustPastCheck'] = eval(toUpdateLogicObject[element]['evalNowValueJustPastCheck'])
        // ø <Strings for Verbosity TO_DELETE>
        toUpdateBooleanObject[element]['booleanCheckSoFarNotSame_STRING'] = toUpdateLogicObject[element]['evalCheckSoFarNotSame']
        toUpdateBooleanObject[element]['booleanNowValueWellPastCheck_STRING'] = toUpdateLogicObject[element]['evalNowValueWellPastCheck']
        toUpdateBooleanObject[element]['booleanNowValueJustPastCheck_Part1_STRING'] = toUpdateLogicObject[element]['evalNowValueJustPastCheck_Part1']
        toUpdateBooleanObject[element]['booleanNowValueJustPastCheck_Part2_STRING'] = toUpdateLogicObject[element]['evalNowValueJustPastCheck_Part2']
        toUpdateBooleanObject[element]['booleanNowValueJustPastCheck_STRING'] = toUpdateLogicObject[element]['evalNowValueJustPastCheck']
        toUpdateBooleanObject[element]['booleanOverll_STRING'] = `${toUpdateBooleanObject[element]['booleanCheckSoFarNotSame']} || ${toUpdateBooleanObject[element]['booleanNowValueWellPastCheck']} || ( ${toUpdateBooleanObject[element]['booleanNowValueJustPastCheck_Part1']} && ${toUpdateBooleanObject[element]['booleanNowValueJustPastCheck_Part2']} )`
        // ø </Strings for Verbosity TO_DELETE>
        toUpdateBooleanObject[element]['booleanOverll'] = toUpdateBooleanObject[element]['booleanCheckSoFarNotSame'] || toUpdateBooleanObject[element]['booleanNowValueWellPastCheck'] || toUpdateBooleanObject[element]['booleanNowValueJustPastCheck']
    });
    // ! </Finalize toUpdateBooleanObject>
    let responseObject = {}
    responseObject.toUpdateBooleanObject = toUpdateBooleanObject
    responseObject.isoCheckObject = isoCheckObject
    responseObject.isoNowObject = isoNowObject
    responseObject.toUpdateLogicObject = toUpdateLogicObject
    return responseObject
}
// ø <---------- </function tempusFugitBoolean(isoCheck, isoNow)> ---------->
