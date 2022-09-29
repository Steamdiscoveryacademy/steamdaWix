// Filename: public/inventoryDocDbJSON.js
import weeksAll from 'public/weeksAll.json'
import locationsAll from 'public/locationsAll.json'

const pangram = ` The quick brown fox jumps over the lazy dog.`
export function datestampinventoryDocDbJSON(yyyy = 2021, mm = 11, dd = 20) {
	let dateStamp = yyyy * 10000 + mm * 100 + dd;
    let returnstring = `This is a simple test of the Public File, 'inventoryDocDbJSON.js' by rendering the Date Stamp of it's deployment\n`
    returnstring += `Deployment occurred on the 20th day of November in the year 2021\n`
    returnstring += `Thus the calculated Date-Stamp is: ${dateStamp}\n`
    returnstring += `Note: you are free to 'mess' with the result by supplying non-default parameters`
}
//====================================================================================================
//============================================================             <Overall Inventory Scripts>
//====================================================================================================

//==========================================================================================
//==================================================                <Universal Call Scripts>

// ø <---------- <getInventoryResponse(paramObject)>  ---------->
export function getInventoryResponse(paramObject = {}){
    paramObject.kind = typeof paramObject.kind === 'string' && (paramObject.kind).length > 0 ? paramObject.kind : 'noKind'
    let responseObject = {}
    switch (paramObject.kind) {
        case 'location':
            paramObject.key = typeof paramObject.key === 'string' && (paramObject.key).length > 0 ? paramObject.key : 'noKey'
            return locationGetByKey(paramObject.key)
            break;
        // case 'week':
        //     paramObject.key = typeof paramObject.key === 'string' && (paramObject.key).length > 0 ? paramObject.key : 'noKey'
        //     return weekGetByKey(paramObject.key)
        //     break;
    
        default:
            responseObject.errorString = ` • Invalid kind element of paramObject: paramObject.kind = ${paramObject.kind} `
            responseObject.notes = []//` • Invalid kind element of paramObject: paramObject.kind = ${paramObject.kind} ['noKind' indicates the parameter was not supplied]`
            responseObject.notes.push(`'noKind' indicates the parameter was not supplied`)
            return responseObject
            break;
    } 
}
// ø <---------- </getInventoryResponse(paramObject)> ---------->

//==================================================               </Universal Call Scripts>
//==========================================================================================

//==========================================================================================
//==================================================             <ALSO CALLABLE with Import>
//
// ø export function locationGetByKey(key)
// ø  NOTES:
// ø  ø  - The script above should make this area MOOT: however, using these scripts might feel more simple
// ø  ø  - Then again, when did things stay 'simple'?
//
//==================================================            </ALSO CALLABLE with Import>
//==========================================================================================

//====================================================================================================
//============================================================            </Overall Inventory Scripts>
//====================================================================================================

//====================================================================================================
//============================================================            <Location Inventory Scripts>
//====================================================================================================

//==========================================================================================
//==================================================                 <All the Logic Scripts>

// ø <---------- <locationGetByRegionKey(regionKey)>  ---------->
export function locationGetByRegionKey(regionKey = 'DLH'){
    let locationInstantiatedObject = locationInstantiateObject()
    return locationInstantiatedObject[regionKey]
}
// ø <---------- </locationGetByRegionKey(regionKey)> ---------->

//==================================================                </All the Logic Scripts>
//==========================================================================================

//====================================================================================================
//============================================================           </Location Inventory Scripts>
//====================================================================================================

//====================================================================================================
//============================================================                <Week Inventory Scripts>
//=============================================================================================go=======

//==========================================================================================
//==================================================                    <JUST the Inventory>

function weekInstantiateObject(termId = 205523, regionKey = 'BVT'){
    /**
     * ! TODO:
     * =======
     * • change JSON below to OBJ
     */
    // let weeksAll = {}
    // ! <NOT SWITCH> 
    let termIdString = termId.toString()
    let termIdIsValid = 'NNULL'
    let regionKeyIsValid = 'NNULL'
    let finalTermIdRegionKeyBlock = {}

    let termIdArray = Object.keys(weeksAll)
    termIdIsValid = termIdArray.includes(termIdString) ? 'TTRUE' : 'FFALSE'
    if(termIdIsValid === 'TTRUE'){
        let termIdBlock = weeksAll[termIdString]
        let regionKeyArray = Object.keys(termIdBlock)
        regionKeyIsValid = regionKeyArray.includes(regionKey) ? 'TTRUE' : 'FFALSE'
        if(regionKeyIsValid === 'TTRUE'){
            finalTermIdRegionKeyBlock = termIdBlock[regionKey]
        }
    }
    let errorObject = {}
    let logThis = {}
    errorObject.errorLog = []
    if(termIdIsValid !== 'TTRUE' || regionKeyIsValid !== 'TTRUE'){
        errorObject.overallBoolean = false
        errorObject.errorBoolean = true
        errorObject.termId = termId
        errorObject.termIdIsValid = termIdIsValid
        errorObject.regionKey = regionKey
        errorObject.regionKeyIsValid = regionKeyIsValid
    }
    
    if(termIdIsValid !== 'TTRUE'){
        // logThis = {}
    
        logThis.title = `The Term ID  is NOT supported`
        // logThis.title += pangram
        logThis.descr = `The 'termId' value [${termId}] is NOT supported (regardless of 'regionKey').`
        // logThis.descr += pangram
        logThis.logic /*As String*/ = `if(termIdIsValid !== 'TTRUE')`
        errorObject.errorLog.push(logThis)
        return errorObject
    }
    if(regionKeyIsValid !== 'TTRUE'){
        // logThis = {}
        logThis.title = `The Region Key  is NOT supported`
        // logThis.title += pangram
        logThis.descr = `The 'regionKey' value [${regionKey}] is NOT supported for the Valid termId [${termId}]`
        // logThis.descr += pangram
        logThis.logic /*As String*/ = `if(regionKeyIsValid !== 'TTRUE')`
        errorObject.errorLog.push(logThis)
        return errorObject
    }


    return finalTermIdRegionKeyBlock

}

//==================================================                   </JUST the Inventory>
//==========================================================================================

//==========================================================================================
//==================================================                 <All the Logic Scripts>

// ø <---------- <weeksGetByTermId(termId)>  ---------->
export function weeksGetByTermId(termId = 205523){
    return weekInstantiateObject(termId)
}
// ø <---------- </weeksGetByTermId(termId)> ---------->
// ø <---------- <weeksGetByTermId(termId)>  ---------->
export function weeksGetByTermIdRegionKey(termId = 205523,regionKey = 'BVT'){
    return weekInstantiateObject(termId, regionKey)
}
// ø <---------- </weeksGetByTermId(termId)> ---------->

//====================================================================================================
//============================================================         <Grade-Level Inventory Scripts>
//====================================================================================================

//==========================================================================================
//==================================================                    <JUST the Inventory>

function gradeLevelInstantiateObject(current = true){
    let gradeLevelDocDbJSON = `{"GL01":{"key":"GL01","low":0,"high":1,"highLowArray":[0,1],"fullArray":[0,1],"humanKey":"K1","humanHyphenatedKey":"K-1","humanAbbrvs":"K - 1st","humanWords":"Kindergarten - First","humanPhrases":"Kindergarten - First Grade"},"GL02":{"key":"GL02","low":0,"high":2,"highLowArray":[0,2],"fullArray":[0,1,2],"humanKey":"K2","humanHyphenatedKey":"K-2","humanAbbrvs":"K - 2nd","humanWords":"Kindergarten - Second","humanPhrases":"Kindergarten - Second Grade"},"GL03":{"key":"GL03","low":0,"high":3,"highLowArray":[0,3],"fullArray":[0,1,2,3],"humanKey":"K3","humanHyphenatedKey":"K-3","humanAbbrvs":"K - 3rd","humanWords":"Kindergarten - Third","humanPhrases":"Kindergarten - Third Grade"},"GL04":{"key":"GL04","low":0,"high":4,"highLowArray":[0,4],"fullArray":[0,1,2,3,4],"humanKey":"K4","humanHyphenatedKey":"K-4","humanAbbrvs":"K - 4th","humanWords":"Kindergarten - Fourth","humanPhrases":"Kindergarten - Fourth Grade"},"GL05":{"key":"GL05","low":0,"high":5,"highLowArray":[0,5],"fullArray":[0,1,2,3,4,5],"humanKey":"K5","humanHyphenatedKey":"K-5","humanAbbrvs":"K - 5th","humanWords":"Kindergarten - Fifth","humanPhrases":"Kindergarten - Fifth Grade"},"GL06":{"key":"GL06","low":0,"high":6,"highLowArray":[0,6],"fullArray":[0,1,2,3,4,5,6],"humanKey":"K6","humanHyphenatedKey":"K-6","humanAbbrvs":"K - 6th","humanWords":"Kindergarten - Sixth","humanPhrases":"Kindergarten - Sixth Grade"},"GL07":{"key":"GL07","low":0,"high":7,"highLowArray":[0,7],"fullArray":[0,1,2,3,4,5,6,7],"humanKey":"K7","humanHyphenatedKey":"K-7","humanAbbrvs":"K - 7th","humanWords":"Kindergarten - Seventh","humanPhrases":"Kindergarten - Seventh Grade"},"GL08":{"key":"GL08","low":0,"high":8,"highLowArray":[0,8],"fullArray":[0,1,2,3,4,5,6,7,8],"humanKey":"K8","humanHyphenatedKey":"K-8","humanAbbrvs":"K - 8th","humanWords":"Kindergarten - Eighth","humanPhrases":"Kindergarten - Eighth Grade"},"GL09":{"key":"GL09","low":0,"high":9,"highLowArray":[0,9],"fullArray":[0,1,2,3,4,5,6,7,8,9],"humanKey":"K9","humanHyphenatedKey":"K-9","humanAbbrvs":"K - 9th","humanWords":"Kindergarten - Ninth","humanPhrases":"Kindergarten - Ninth Grade"},"GL010":{"key":"GL010","low":0,"high":10,"highLowArray":[0,10],"fullArray":[0,1,2,3,4,5,6,7,8,9,10],"humanKey":"K10","humanHyphenatedKey":"K-10","humanAbbrvs":"K - 10th","humanWords":"Kindergarten - Tenth","humanPhrases":"Kindergarten - Tenth Grade"},"GL011":{"key":"GL011","low":0,"high":11,"highLowArray":[0,11],"fullArray":[0,1,2,3,4,5,6,7,8,9,10,11],"humanKey":"K11","humanHyphenatedKey":"K-11","humanAbbrvs":"K - 11th","humanWords":"Kindergarten - Eleventh","humanPhrases":"Kindergarten - Eleventh Grade"},"GL012":{"key":"GL012","low":0,"high":12,"highLowArray":[0,12],"fullArray":[0,1,2,3,4,5,6,7,8,9,10,11,12],"humanKey":"K12","humanHyphenatedKey":"K-12","humanAbbrvs":"K - 12th","humanWords":"Kindergarten - Twelfth","humanPhrases":"Kindergarten - Twelfth Grade"},"GL12":{"key":"GL12","low":1,"high":2,"highLowArray":[1,2],"fullArray":[1,2],"humanKey":"12","humanHyphenatedKey":"1-2","humanAbbrvs":"1st - 2nd","humanWords":"First - Second","humanPhrases":"First Grade - Second Grade"},"GL13":{"key":"GL13","low":1,"high":3,"highLowArray":[1,3],"fullArray":[1,2,3],"humanKey":"13","humanHyphenatedKey":"1-3","humanAbbrvs":"1st - 3rd","humanWords":"First - Third","humanPhrases":"First Grade - Third Grade"},"GL14":{"key":"GL14","low":1,"high":4,"highLowArray":[1,4],"fullArray":[1,2,3,4],"humanKey":"14","humanHyphenatedKey":"1-4","humanAbbrvs":"1st - 4th","humanWords":"First - Fourth","humanPhrases":"First Grade - Fourth Grade"},"GL15":{"key":"GL15","low":1,"high":5,"highLowArray":[1,5],"fullArray":[1,2,3,4,5],"humanKey":"15","humanHyphenatedKey":"1-5","humanAbbrvs":"1st - 5th","humanWords":"First - Fifth","humanPhrases":"First Grade - Fifth Grade"},"GL16":{"key":"GL16","low":1,"high":6,"highLowArray":[1,6],"fullArray":[1,2,3,4,5,6],"humanKey":"16","humanHyphenatedKey":"1-6","humanAbbrvs":"1st - 6th","humanWords":"First - Sixth","humanPhrases":"First Grade - Sixth Grade"},"GL17":{"key":"GL17","low":1,"high":7,"highLowArray":[1,7],"fullArray":[1,2,3,4,5,6,7],"humanKey":"17","humanHyphenatedKey":"1-7","humanAbbrvs":"1st - 7th","humanWords":"First - Seventh","humanPhrases":"First Grade - Seventh Grade"},"GL18":{"key":"GL18","low":1,"high":8,"highLowArray":[1,8],"fullArray":[1,2,3,4,5,6,7,8],"humanKey":"18","humanHyphenatedKey":"1-8","humanAbbrvs":"1st - 8th","humanWords":"First - Eighth","humanPhrases":"First Grade - Eighth Grade"},"GL19":{"key":"GL19","low":1,"high":9,"highLowArray":[1,9],"fullArray":[1,2,3,4,5,6,7,8,9],"humanKey":"19","humanHyphenatedKey":"1-9","humanAbbrvs":"1st - 9th","humanWords":"First - Ninth","humanPhrases":"First Grade - Ninth Grade"},"GL110":{"key":"GL110","low":1,"high":10,"highLowArray":[1,10],"fullArray":[1,2,3,4,5,6,7,8,9,10],"humanKey":"110","humanHyphenatedKey":"1-10","humanAbbrvs":"1st - 10th","humanWords":"First - Tenth","humanPhrases":"First Grade - Tenth Grade"},"GL111":{"key":"GL111","low":1,"high":11,"highLowArray":[1,11],"fullArray":[1,2,3,4,5,6,7,8,9,10,11],"humanKey":"111","humanHyphenatedKey":"1-11","humanAbbrvs":"1st - 11th","humanWords":"First - Eleventh","humanPhrases":"First Grade - Eleventh Grade"},"GL112":{"key":"GL112","low":1,"high":12,"highLowArray":[1,12],"fullArray":[1,2,3,4,5,6,7,8,9,10,11,12],"humanKey":"112","humanHyphenatedKey":"1-12","humanAbbrvs":"1st - 12th","humanWords":"First - Twelfth","humanPhrases":"First Grade - Twelfth Grade"},"GL23":{"key":"GL23","low":2,"high":3,"highLowArray":[2,3],"fullArray":[2,3],"humanKey":"23","humanHyphenatedKey":"2-3","humanAbbrvs":"2nd - 3rd","humanWords":"Second - Third","humanPhrases":"Second Grade - Third Grade"},"GL24":{"key":"GL24","low":2,"high":4,"highLowArray":[2,4],"fullArray":[2,3,4],"humanKey":"24","humanHyphenatedKey":"2-4","humanAbbrvs":"2nd - 4th","humanWords":"Second - Fourth","humanPhrases":"Second Grade - Fourth Grade"},"GL25":{"key":"GL25","low":2,"high":5,"highLowArray":[2,5],"fullArray":[2,3,4,5],"humanKey":"25","humanHyphenatedKey":"2-5","humanAbbrvs":"2nd - 5th","humanWords":"Second - Fifth","humanPhrases":"Second Grade - Fifth Grade"},"GL26":{"key":"GL26","low":2,"high":6,"highLowArray":[2,6],"fullArray":[2,3,4,5,6],"humanKey":"26","humanHyphenatedKey":"2-6","humanAbbrvs":"2nd - 6th","humanWords":"Second - Sixth","humanPhrases":"Second Grade - Sixth Grade"},"GL27":{"key":"GL27","low":2,"high":7,"highLowArray":[2,7],"fullArray":[2,3,4,5,6,7],"humanKey":"27","humanHyphenatedKey":"2-7","humanAbbrvs":"2nd - 7th","humanWords":"Second - Seventh","humanPhrases":"Second Grade - Seventh Grade"},"GL28":{"key":"GL28","low":2,"high":8,"highLowArray":[2,8],"fullArray":[2,3,4,5,6,7,8],"humanKey":"28","humanHyphenatedKey":"2-8","humanAbbrvs":"2nd - 8th","humanWords":"Second - Eighth","humanPhrases":"Second Grade - Eighth Grade"},"GL29":{"key":"GL29","low":2,"high":9,"highLowArray":[2,9],"fullArray":[2,3,4,5,6,7,8,9],"humanKey":"29","humanHyphenatedKey":"2-9","humanAbbrvs":"2nd - 9th","humanWords":"Second - Ninth","humanPhrases":"Second Grade - Ninth Grade"},"GL210":{"key":"GL210","low":2,"high":10,"highLowArray":[2,10],"fullArray":[2,3,4,5,6,7,8,9,10],"humanKey":"210","humanHyphenatedKey":"2-10","humanAbbrvs":"2nd - 10th","humanWords":"Second - Tenth","humanPhrases":"Second Grade - Tenth Grade"},"GL211":{"key":"GL211","low":2,"high":11,"highLowArray":[2,11],"fullArray":[2,3,4,5,6,7,8,9,10,11],"humanKey":"211","humanHyphenatedKey":"2-11","humanAbbrvs":"2nd - 11th","humanWords":"Second - Eleventh","humanPhrases":"Second Grade - Eleventh Grade"},"GL212":{"key":"GL212","low":2,"high":12,"highLowArray":[2,12],"fullArray":[2,3,4,5,6,7,8,9,10,11,12],"humanKey":"212","humanHyphenatedKey":"2-12","humanAbbrvs":"2nd - 12th","humanWords":"Second - Twelfth","humanPhrases":"Second Grade - Twelfth Grade"},"GL34":{"key":"GL34","low":3,"high":4,"highLowArray":[3,4],"fullArray":[3,4],"humanKey":"34","humanHyphenatedKey":"3-4","humanAbbrvs":"3rd - 4th","humanWords":"Third - Fourth","humanPhrases":"Third Grade - Fourth Grade"},"GL35":{"key":"GL35","low":3,"high":5,"highLowArray":[3,5],"fullArray":[3,4,5],"humanKey":"35","humanHyphenatedKey":"3-5","humanAbbrvs":"3rd - 5th","humanWords":"Third - Fifth","humanPhrases":"Third Grade - Fifth Grade"},"GL36":{"key":"GL36","low":3,"high":6,"highLowArray":[3,6],"fullArray":[3,4,5,6],"humanKey":"36","humanHyphenatedKey":"3-6","humanAbbrvs":"3rd - 6th","humanWords":"Third - Sixth","humanPhrases":"Third Grade - Sixth Grade"},"GL37":{"key":"GL37","low":3,"high":7,"highLowArray":[3,7],"fullArray":[3,4,5,6,7],"humanKey":"37","humanHyphenatedKey":"3-7","humanAbbrvs":"3rd - 7th","humanWords":"Third - Seventh","humanPhrases":"Third Grade - Seventh Grade"},"GL38":{"key":"GL38","low":3,"high":8,"highLowArray":[3,8],"fullArray":[3,4,5,6,7,8],"humanKey":"38","humanHyphenatedKey":"3-8","humanAbbrvs":"3rd - 8th","humanWords":"Third - Eighth","humanPhrases":"Third Grade - Eighth Grade"},"GL39":{"key":"GL39","low":3,"high":9,"highLowArray":[3,9],"fullArray":[3,4,5,6,7,8,9],"humanKey":"39","humanHyphenatedKey":"3-9","humanAbbrvs":"3rd - 9th","humanWords":"Third - Ninth","humanPhrases":"Third Grade - Ninth Grade"},"GL310":{"key":"GL310","low":3,"high":10,"highLowArray":[3,10],"fullArray":[3,4,5,6,7,8,9,10],"humanKey":"310","humanHyphenatedKey":"3-10","humanAbbrvs":"3rd - 10th","humanWords":"Third - Tenth","humanPhrases":"Third Grade - Tenth Grade"},"GL311":{"key":"GL311","low":3,"high":11,"highLowArray":[3,11],"fullArray":[3,4,5,6,7,8,9,10,11],"humanKey":"311","humanHyphenatedKey":"3-11","humanAbbrvs":"3rd - 11th","humanWords":"Third - Eleventh","humanPhrases":"Third Grade - Eleventh Grade"},"GL312":{"key":"GL312","low":3,"high":12,"highLowArray":[3,12],"fullArray":[3,4,5,6,7,8,9,10,11,12],"humanKey":"312","humanHyphenatedKey":"3-12","humanAbbrvs":"3rd - 12th","humanWords":"Third - Twelfth","humanPhrases":"Third Grade - Twelfth Grade"},"GL45":{"key":"GL45","low":4,"high":5,"highLowArray":[4,5],"fullArray":[4,5],"humanKey":"45","humanHyphenatedKey":"4-5","humanAbbrvs":"4th - 5th","humanWords":"Fourth - Fifth","humanPhrases":"Fourth Grade - Fifth Grade"},"GL46":{"key":"GL46","low":4,"high":6,"highLowArray":[4,6],"fullArray":[4,5,6],"humanKey":"46","humanHyphenatedKey":"4-6","humanAbbrvs":"4th - 6th","humanWords":"Fourth - Sixth","humanPhrases":"Fourth Grade - Sixth Grade"},"GL47":{"key":"GL47","low":4,"high":7,"highLowArray":[4,7],"fullArray":[4,5,6,7],"humanKey":"47","humanHyphenatedKey":"4-7","humanAbbrvs":"4th - 7th","humanWords":"Fourth - Seventh","humanPhrases":"Fourth Grade - Seventh Grade"},"GL48":{"key":"GL48","low":4,"high":8,"highLowArray":[4,8],"fullArray":[4,5,6,7,8],"humanKey":"48","humanHyphenatedKey":"4-8","humanAbbrvs":"4th - 8th","humanWords":"Fourth - Eighth","humanPhrases":"Fourth Grade - Eighth Grade"},"GL49":{"key":"GL49","low":4,"high":9,"highLowArray":[4,9],"fullArray":[4,5,6,7,8,9],"humanKey":"49","humanHyphenatedKey":"4-9","humanAbbrvs":"4th - 9th","humanWords":"Fourth - Ninth","humanPhrases":"Fourth Grade - Ninth Grade"},"GL410":{"key":"GL410","low":4,"high":10,"highLowArray":[4,10],"fullArray":[4,5,6,7,8,9,10],"humanKey":"410","humanHyphenatedKey":"4-10","humanAbbrvs":"4th - 10th","humanWords":"Fourth - Tenth","humanPhrases":"Fourth Grade - Tenth Grade"},"GL411":{"key":"GL411","low":4,"high":11,"highLowArray":[4,11],"fullArray":[4,5,6,7,8,9,10,11],"humanKey":"411","humanHyphenatedKey":"4-11","humanAbbrvs":"4th - 11th","humanWords":"Fourth - Eleventh","humanPhrases":"Fourth Grade - Eleventh Grade"},"GL412":{"key":"GL412","low":4,"high":12,"highLowArray":[4,12],"fullArray":[4,5,6,7,8,9,10,11,12],"humanKey":"412","humanHyphenatedKey":"4-12","humanAbbrvs":"4th - 12th","humanWords":"Fourth - Twelfth","humanPhrases":"Fourth Grade - Twelfth Grade"},"GL56":{"key":"GL56","low":5,"high":6,"highLowArray":[5,6],"fullArray":[5,6],"humanKey":"56","humanHyphenatedKey":"5-6","humanAbbrvs":"5th - 6th","humanWords":"Fifth - Sixth","humanPhrases":"Fifth Grade - Sixth Grade"},"GL57":{"key":"GL57","low":5,"high":7,"highLowArray":[5,7],"fullArray":[5,6,7],"humanKey":"57","humanHyphenatedKey":"5-7","humanAbbrvs":"5th - 7th","humanWords":"Fifth - Seventh","humanPhrases":"Fifth Grade - Seventh Grade"},"GL58":{"key":"GL58","low":5,"high":8,"highLowArray":[5,8],"fullArray":[5,6,7,8],"humanKey":"58","humanHyphenatedKey":"5-8","humanAbbrvs":"5th - 8th","humanWords":"Fifth - Eighth","humanPhrases":"Fifth Grade - Eighth Grade"},"GL59":{"key":"GL59","low":5,"high":9,"highLowArray":[5,9],"fullArray":[5,6,7,8,9],"humanKey":"59","humanHyphenatedKey":"5-9","humanAbbrvs":"5th - 9th","humanWords":"Fifth - Ninth","humanPhrases":"Fifth Grade - Ninth Grade"},"GL510":{"key":"GL510","low":5,"high":10,"highLowArray":[5,10],"fullArray":[5,6,7,8,9,10],"humanKey":"510","humanHyphenatedKey":"5-10","humanAbbrvs":"5th - 10th","humanWords":"Fifth - Tenth","humanPhrases":"Fifth Grade - Tenth Grade"},"GL511":{"key":"GL511","low":5,"high":11,"highLowArray":[5,11],"fullArray":[5,6,7,8,9,10,11],"humanKey":"511","humanHyphenatedKey":"5-11","humanAbbrvs":"5th - 11th","humanWords":"Fifth - Eleventh","humanPhrases":"Fifth Grade - Eleventh Grade"},"GL512":{"key":"GL512","low":5,"high":12,"highLowArray":[5,12],"fullArray":[5,6,7,8,9,10,11,12],"humanKey":"512","humanHyphenatedKey":"5-12","humanAbbrvs":"5th - 12th","humanWords":"Fifth - Twelfth","humanPhrases":"Fifth Grade - Twelfth Grade"},"GL67":{"key":"GL67","low":6,"high":7,"highLowArray":[6,7],"fullArray":[6,7],"humanKey":"67","humanHyphenatedKey":"6-7","humanAbbrvs":"6th - 7th","humanWords":"Sixth - Seventh","humanPhrases":"Sixth Grade - Seventh Grade"},"GL68":{"key":"GL68","low":6,"high":8,"highLowArray":[6,8],"fullArray":[6,7,8],"humanKey":"68","humanHyphenatedKey":"6-8","humanAbbrvs":"6th - 8th","humanWords":"Sixth - Eighth","humanPhrases":"Sixth Grade - Eighth Grade"},"GL69":{"key":"GL69","low":6,"high":9,"highLowArray":[6,9],"fullArray":[6,7,8,9],"humanKey":"69","humanHyphenatedKey":"6-9","humanAbbrvs":"6th - 9th","humanWords":"Sixth - Ninth","humanPhrases":"Sixth Grade - Ninth Grade"},"GL610":{"key":"GL610","low":6,"high":10,"highLowArray":[6,10],"fullArray":[6,7,8,9,10],"humanKey":"610","humanHyphenatedKey":"6-10","humanAbbrvs":"6th - 10th","humanWords":"Sixth - Tenth","humanPhrases":"Sixth Grade - Tenth Grade"},"GL611":{"key":"GL611","low":6,"high":11,"highLowArray":[6,11],"fullArray":[6,7,8,9,10,11],"humanKey":"611","humanHyphenatedKey":"6-11","humanAbbrvs":"6th - 11th","humanWords":"Sixth - Eleventh","humanPhrases":"Sixth Grade - Eleventh Grade"},"GL612":{"key":"GL612","low":6,"high":12,"highLowArray":[6,12],"fullArray":[6,7,8,9,10,11,12],"humanKey":"612","humanHyphenatedKey":"6-12","humanAbbrvs":"6th - 12th","humanWords":"Sixth - Twelfth","humanPhrases":"Sixth Grade - Twelfth Grade"},"GL78":{"key":"GL78","low":7,"high":8,"highLowArray":[7,8],"fullArray":[7,8],"humanKey":"78","humanHyphenatedKey":"7-8","humanAbbrvs":"7th - 8th","humanWords":"Seventh - Eighth","humanPhrases":"Seventh Grade - Eighth Grade"},"GL79":{"key":"GL79","low":7,"high":9,"highLowArray":[7,9],"fullArray":[7,8,9],"humanKey":"79","humanHyphenatedKey":"7-9","humanAbbrvs":"7th - 9th","humanWords":"Seventh - Ninth","humanPhrases":"Seventh Grade - Ninth Grade"},"GL710":{"key":"GL710","low":7,"high":10,"highLowArray":[7,10],"fullArray":[7,8,9,10],"humanKey":"710","humanHyphenatedKey":"7-10","humanAbbrvs":"7th - 10th","humanWords":"Seventh - Tenth","humanPhrases":"Seventh Grade - Tenth Grade"},"GL711":{"key":"GL711","low":7,"high":11,"highLowArray":[7,11],"fullArray":[7,8,9,10,11],"humanKey":"711","humanHyphenatedKey":"7-11","humanAbbrvs":"7th - 11th","humanWords":"Seventh - Eleventh","humanPhrases":"Seventh Grade - Eleventh Grade"},"GL712":{"key":"GL712","low":7,"high":12,"highLowArray":[7,12],"fullArray":[7,8,9,10,11,12],"humanKey":"712","humanHyphenatedKey":"7-12","humanAbbrvs":"7th - 12th","humanWords":"Seventh - Twelfth","humanPhrases":"Seventh Grade - Twelfth Grade"},"GL89":{"key":"GL89","low":8,"high":9,"highLowArray":[8,9],"fullArray":[8,9],"humanKey":"89","humanHyphenatedKey":"8-9","humanAbbrvs":"8th - 9th","humanWords":"Eighth - Ninth","humanPhrases":"Eighth Grade - Ninth Grade"},"GL810":{"key":"GL810","low":8,"high":10,"highLowArray":[8,10],"fullArray":[8,9,10],"humanKey":"810","humanHyphenatedKey":"8-10","humanAbbrvs":"8th - 10th","humanWords":"Eighth - Tenth","humanPhrases":"Eighth Grade - Tenth Grade"},"GL811":{"key":"GL811","low":8,"high":11,"highLowArray":[8,11],"fullArray":[8,9,10,11],"humanKey":"811","humanHyphenatedKey":"8-11","humanAbbrvs":"8th - 11th","humanWords":"Eighth - Eleventh","humanPhrases":"Eighth Grade - Eleventh Grade"},"GL812":{"key":"GL812","low":8,"high":12,"highLowArray":[8,12],"fullArray":[8,9,10,11,12],"humanKey":"812","humanHyphenatedKey":"8-12","humanAbbrvs":"8th - 12th","humanWords":"Eighth - Twelfth","humanPhrases":"Eighth Grade - Twelfth Grade"},"GL910":{"key":"GL910","low":9,"high":10,"highLowArray":[9,10],"fullArray":[9,10],"humanKey":"910","humanHyphenatedKey":"9-10","humanAbbrvs":"9th - 10th","humanWords":"Ninth - Tenth","humanPhrases":"Ninth Grade - Tenth Grade"},"GL911":{"key":"GL911","low":9,"high":11,"highLowArray":[9,11],"fullArray":[9,10,11],"humanKey":"911","humanHyphenatedKey":"9-11","humanAbbrvs":"9th - 11th","humanWords":"Ninth - Eleventh","humanPhrases":"Ninth Grade - Eleventh Grade"},"GL912":{"key":"GL912","low":9,"high":12,"highLowArray":[9,12],"fullArray":[9,10,11,12],"humanKey":"912","humanHyphenatedKey":"9-12","humanAbbrvs":"9th - 12th","humanWords":"Ninth - Twelfth","humanPhrases":"Ninth Grade - Twelfth Grade"},"GL1011":{"key":"GL1011","low":10,"high":11,"highLowArray":[10,11],"fullArray":[10,11],"humanKey":"1011","humanHyphenatedKey":"10-11","humanAbbrvs":"10th - 11th","humanWords":"Tenth - Eleventh","humanPhrases":"Tenth Grade - Eleventh Grade"},"GL1012":{"key":"GL1012","low":10,"high":12,"highLowArray":[10,12],"fullArray":[10,11,12],"humanKey":"1012","humanHyphenatedKey":"10-12","humanAbbrvs":"10th - 12th","humanWords":"Tenth - Twelfth","humanPhrases":"Tenth Grade - Twelfth Grade"},"GL1112":{"key":"GL1112","low":11,"high":12,"highLowArray":[11,12],"fullArray":[11,12],"humanKey":"1112","humanHyphenatedKey":"11-12","humanAbbrvs":"11th - 12th","humanWords":"Eleventh - Twelfth","humanPhrases":"Eleventh Grade - Twelfth Grade"}}` 
    return JSON.parse(gradeLevelDocDbJSON)
}

//==================================================                   </JUST the Inventory>
//==========================================================================================

//==========================================================================================
//==================================================                 <All the Logic Scripts>

// ø <---------- <gradeLevelGetCurrent(current)>  ---------->
export function gradeLevelGetCurrent(current = true){
    return gradeLevelInstantiateObject(current)
}
// ø <---------- </gradeLevelGetCurrent(current)> ---------->

//==================================================                </All the Logic Scripts>
//==========================================================================================

//====================================================================================================
//============================================================        </Grade-Level Inventory Scripts>
//====================================================================================================
