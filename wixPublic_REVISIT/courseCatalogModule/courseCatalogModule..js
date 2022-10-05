// Filename: public/courseCatalogModule.js
import {local, session, memory} from 'wix-storage';
import {getJSON} from 'wix-fetch';
import {jsonTheGreatEscape} from 'public/utilityModule.js'

//====================================================================================================
//============================================================     <Esoteric Course Catalog Functions>
//====================================================================================================

//==========================================================================================
//==================================================                     <Small Group Block>

// ø <---------- <sectionObjectEscapedJSON (sectionDataObject)>  ---------->
export function sectionObjectEscapedJSON (sectionDataObject = {}){
    
    // ø SUBSCRIPT RETURN CREATE_NEW_COURSE_06a_sectionObjectEscapedJSON
    // NOTE: 'sectionDataObject' is purpopsely non-specific:
    //      • it can be an existing Section Object with a tweak
    //      • it can be just gathered Form-Data as an Object
    //      • it can be manually constructed
    //      • it can be a Course [parent] Object as in its inception

    // <MAYBE>
    // • 2021-11-23T05:47:00
    // • DESCR: Validation might be indicated, but parameterised in the object
    let requiredAttributeArray = []
    let doValidate = typeof sectionDataObject.doValidate === 'boolean' && sectionDataObject.doValidate === true ? true : false
    if (doValidate) {
        // <SOURCE>
        // • 2021-11-23T05:47:00
        // • DESCR: From Original (default for New Course)
        requiredAttributeArray = ['courseKey','sectionKey']
        // </SOURCE>
        if(Array.isArray(sectionDataObject.requiredAttributeArray)){
            requiredAttributeArray = sectionDataObject.requiredAttributeArray
        }
    }
    // </MAYBE>

	console.group(`sectionObjectEscapedJSON (sectionDataObject)`)
	// console.groupCollapsed(`sectionObjectEscapedJSON (sectionDataObject)`)
    let supportedSectionAttributeArray = []
	let attributeArray = []
	let parsingOpeningTag = 'ZYYYY'
	let parsingClosingTag = 'YYYYZ'
	let sectionTemplate = 'STRING'
	// <SOURCE>
    // • 2021-11-23T05:47:00
    // • DESCR: From Original (default for New Course)
    supportedSectionAttributeArray = ['courseKey','sectionKey']
	parsingOpeningTag = '{%'
	parsingClosingTag = '%}'

    attributeArray = Object.keys(sectionDataObject)
	// attributeArray = ['courseKey','sectionKey']
	// <SOURCE: sectionTemplate>
    // • 2021-11-23T05:47:00
    // • DESCR: From Original (default for New Course)
	// • PATH: /vsCode/steamdaWixLocal/steamdaWix/courseCatalog_WiX/section/drupal/2021-11-22T12:08:00_WorkingTEMPLATE.json>
	// sectionTemplate = "{\r\n        \"sectionId\": \"1\",\r\n        \"courseKey\": \"{%courseKey\",\r\n        \"sectionKey\": \"{%sectionKey\",\r\n        \"roomNumber\": \"TBD\",\r\n        \"roomTitle\": \"TBD\",\r\n        \"roomAliases\": [\r\n            \"TBD\"\r\n        ],\r\n        \"notes\": [\r\n            \"First Section Instantiated with New Course\",\r\n        ]\r\n    }"
	sectionTemplate = "{\r\n        \"sectionId\": \"1\",\r\n        \"courseKey\": \"{%courseKey%}\",\r\n        \"sectionKey\": \"{%sectionKey%}\",\r\n        \"roomNumber\": \"TBD\",\r\n        \"roomTitle\": \"TBD\",\r\n        \"roomAliases\": [\r\n            \"TBD\"\r\n        ],\r\n        \"notes\": [\r\n            \"First Section Instantiated with New Course\",\r\n        ]\r\n    }"
	sectionTemplate = "SECTION-HOLDER"
	// </SOURCE: sectionTemplate>
	// </SOURCE>
	
	// <PARSER-DEPRECATED>
	// DEPRECATED: Too many anomalies with forEach-anonymous-functiion structure
	// attributeArray.forEach(attribute => {
	// 	let key = parsingOpeningTag + attribute + parsingClosingTag
	// 	let value = newCourseDataObject[attribute]
	// 	sectionTemplate = sectionTemplate.replace(key, value)
	// });
	// </PARSER-DEPRECATED>
	// <PARSER>
    for (let index = 0; index < attributeArray.length; index++) {
        const attribute = attributeArray[index];
        if(supportedSectionAttributeArray.includes(attribute)){
        	let key = parsingOpeningTag + attribute + parsingClosingTag
        	let value = sectionDataObject[attribute]
        	sectionTemplate = sectionTemplate.replace(key, value)
        }

        
    }
	// </PARSER>

    // <ORIGINAL from Stack-Exchange>
// var myJSONString = JSON.stringify(sectionTemplate);
// var myEscapedJSONString = myJSONString.replace(/\\n/g, "\\n")
//                                       .replace(/\\'/g, "\\'")
//                                       .replace(/\\"/g, '\\"')
//                                       .replace(/\\&/g, "\\&")
//                                       .replace(/\\r/g, "\\r")
//                                       .replace(/\\t/g, "\\t")
//                                       .replace(/\\b/g, "\\b")
//                                       .replace(/\\f/g, "\\f");
// myEscapedJSONString is now ready to be POST'ed to the server.
	// console.log(`sectionTemplate: [_something_ below tick-dollarsign-brackets]`)
	// console.log(`${sectionTemplate}`)
	// console.log(`sectionTemplate: [_something_ below just-log]`)
	// console.log(sectionTemplate)
	// $w('#txareaCodeBlock').value = myEscapedJSONString
	// newCourseDataObject.sectionsSource = sectionTemplate
    // </ORIGINAL from Stack-Exchange>

    // <WORKING import {jsonTheGreatEscape} from 'public/utilityModule.js'>
    // DESCR: this is the Engendering Use-Case for this Function
	sectionDataObject.sectionObjectEscapedJSONString = jsonTheGreatEscape(sectionTemplate)
    // </WORKING>
	
    // newCourseDataObject.sectionsSource = 'HOLDER'
	
	console.log(`groupEnd: sectionObjectEscapedJSON (sectionDataObject)`)
	console.groupEnd()
	}
// ø <---------- </sectionObjectEscapedJSON (sectionDataObject)> ---------->

//==================================================                    </Small Group Block>
//==========================================================================================

//====================================================================================================
//============================================================    </Esoteric Course Catalog Functions>
//====================================================================================================

//====================================================================================================
//======================================================================      <Drupal Fetch Functions>
//====================================================================================================

//==========================================================================================
//==================================================                 <Fetch Current Courses>

// ø <---------- <fetchCoursesByTermIdRegionKey(termId,regionKey)>  ---------->
export function fetchCoursesByTermIdRegionKey( termId = 7777777, regionKey = 'DLH'){
    const KLUDGE = true
    const supportedTermIdArray = [202123,202137,202201,202223]
    const supportedRegionKeyArray = ['CHO','ROA','RIC']
    let errorLogicArray = []
    let errorNotes = []
    if(!supportedTermIdArray.includes(termId)){
        errorLogicArray.push(`!supportedTermIdArray.includes(${termId})`)
        errorNotes.push('unsupported TermId')
    }
    if(!supportedRegionKeyArray.includes(regionKey)){
        errorLogicArray.push(`!supportedRegionKeyArray.includes(${regionKey})`)
        errorNotes.push('unsupported RegionKey')
    }
    if(errorLogicArray.length > 0){
        let ifElseObject = {}
        ifElseObject.error = true
        ifElseObject.errorLogicArray = errorLogicArray
        ifElseObject.errorNotes = errorNotes
        ifElseObject.errorString = 'see Notes'
        return ifElseObject
    }
    // ! ============================================================
    // ! <This entire block will be removed when 'KLUDGE' is Solved>
    // ! ============================================================
    if(KLUDGE){
        return fetchCoursesByKLUDGE( termId , regionKey )
    }
    errorLogicArray.push(`!supportedTermIdArray.includes(${termId})`)
    errorNotes.push('unsupported TermId')
    if(errorLogicArray.length > 0){
        let ifElseObject = {}
        ifElseObject.error = true
        ifElseObject.errorLogicArray = errorLogicArray
        ifElseObject.errorNotes = errorNotes
        ifElseObject.errorString = 'see Notes'
        return ifElseObject
    }
    // ! ============================================================
    // ! </This entire block will be removed when 'KLUDGE' is Solved>
    // ! ============================================================
}
// ø <---------- </fetchCoursesByTermIdRegionKey(termId,regionKey)> ---------->

// ø <---------- <fetchCoursesByKLUDGE(termId,regionKey)>  ---------->
function fetchCoursesByKLUDGE( termId = 7777777, regionKey = 'DLH'){
    // ! RETURNS A RAW JS ARRAY (and, of course, in JS Arrays _are_ Objects)
    let courseObjectArrayALL = []
    const which = regionKey + termId.toString()
    switch (which) {
        case 'CHO202223':
            courseObjectArrayALL = [{"_id":"3562","courseNameDisplay":"Kickoff Camp","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202223","courseTilePath":"https://static.wixstatic.com/media/523205_9249dded66d24a1cb1add3acf6b7e5e4~mv2.jpeg","coursePromoPath":"FFALSE","curriculumId":"3510"},{"_id":"3563","courseNameDisplay":"Kickoff Camp","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202223","courseTilePath":"https://static.wixstatic.com/shapes/523205_b2f81f130c244bc98d8cb23395a4d700.svg","coursePromoPath":"FFALSE","curriculumId":"3510"},{"_id":"3564","courseNameDisplay":"Kickoff Camp","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202223","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3510"},{"_id":"3556","courseNameDisplay":"Architecture","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202224","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3500"},{"_id":"3572","courseNameDisplay":"Biosphere Challenge","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202224","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3520"},{"_id":"3565","courseNameDisplay":"Ceramics","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202224","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"20"},{"_id":"3571","courseNameDisplay":"Creative Creatures","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202224","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3356"},{"_id":"3568","courseNameDisplay":"Flight Technology:Gliders, Rockets and Drones","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202224","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"23"},{"_id":"3567","courseNameDisplay":"Gadgets and Gizmos","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202224","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"25"},{"_id":"3566","courseNameDisplay":"Intro to STEAM","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202224","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"39"},{"_id":"3570","courseNameDisplay":"Mad Scientist Chemistry","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202224","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"27"},{"_id":"3569","courseNameDisplay":"Robotics and Coding","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202224","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"33"},{"_id":"3578","courseNameDisplay":"Architecture","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3500"},{"_id":"3583","courseNameDisplay":"Biomechanics in Sports & Trick Shots","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3509"},{"_id":"3575","courseNameDisplay":"Ceramics","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"20"},{"_id":"3577","courseNameDisplay":"Drone Academy","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"37"},{"_id":"3579","courseNameDisplay":"Girls Leadership","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3352"},{"_id":"3580","courseNameDisplay":"Girls Leadership","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3352"},{"_id":"3581","courseNameDisplay":"Girls Leadership MS","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3360"},{"_id":"3574","courseNameDisplay":"Mad Scientist Chemistry","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"27"},{"_id":"3573","courseNameDisplay":"Pirate Science","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3511"},{"_id":"3576","courseNameDisplay":"STEAM Survivor","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3501"},{"_id":"3582","courseNameDisplay":"Superhero Science","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3514"},{"_id":"3586","courseNameDisplay":"Ceramics","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202226","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"20"},{"_id":"3584","courseNameDisplay":"Forensics Detectives","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202226","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"24"},{"_id":"3587","courseNameDisplay":"Inventing","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202226","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"50"},{"_id":"3585","courseNameDisplay":"Mad Scientist Chemistry","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202226","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"27"},{"_id":"3588","courseNameDisplay":"Maker Laboratory","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202226","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"1296"},{"_id":"3590","courseNameDisplay":"Art Lab","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202228","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"16"},{"_id":"3594","courseNameDisplay":"Construction Kids","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202228","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"1283"},{"_id":"3592","courseNameDisplay":"Drone Academy","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202228","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"37"},{"_id":"3593","courseNameDisplay":"Forensics Investigators","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202228","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"24"},{"_id":"3589","courseNameDisplay":"Journey to Atlantis","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202228","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3515"},{"_id":"3591","courseNameDisplay":"Photography 101","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202228","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"30"},{"_id":"3600","courseNameDisplay":"Sport & Trick Shot Biomechanics","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202229","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3509"},{"_id":"3595","courseNameDisplay":"Digging Dinos","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202229","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3516"},{"_id":"3598","courseNameDisplay":"Forensic Detectives","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202229","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"24"},{"_id":"3601","courseNameDisplay":"Lead with STEAM","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202229","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3461"},{"_id":"3602","courseNameDisplay":"Lead with STEAM","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202229","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3461"},{"_id":"3603","courseNameDisplay":"Lead with STEAM","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202229","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3461"},{"_id":"3596","courseNameDisplay":"Paint and Mixed Media","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202229","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"29"},{"_id":"3599","courseNameDisplay":"Photography 201*","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202229","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"30"},{"_id":"3597","courseNameDisplay":"Robotics and Coding","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202229","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"33"}]
            break;
    
        default:
            let defualtWhiichObjectArray = []
            let defualtWhiichObject = {}
            defualtWhiichObject.error = `'which', ${which}, is unsupported at this time`
            defualtWhiichObjectArray.push(defualtWhiichObject)
            
            courseObjectArrayALL = defualtWhiichObjectArray
            break;
    }
    return courseObjectArrayALL
}
// ø <---------- </fetchCoursesByKLUDGE(termId,regionKey)> ---------->
//==================================================                </Fetch Current Courses>
//==========================================================================================

//==========================================================================================
//==================================================    <Fetch and Update Current Curricula>

export function doUpdateCurrentCurricula(currentTermCurriculaObjectArray = []){

}

// ø <---------- <fetchCurriculaByTermIdRegionKey(termId,regionKey)>  ---------->
export function fetchCurriculaByTermIdRegionKey( termId = 7777777, regionKey = 'DLH'){
    const KLUDGE = true
    const supportedTermIdArray = [202123,202137,202201,202223]
    const supportedRegionKeyArray = ['CHO','ROA','RIC']
    let errorLogicArray = []
    let errorNotes = []
    if(!supportedTermIdArray.includes(termId)){
        errorLogicArray.push(`!supportedTermIdArray.includes(${termId})`)
        errorNotes.push('unsupported TermId')
    }
    if(!supportedRegionKeyArray.includes(regionKey)){
        errorLogicArray.push(`!supportedRegionKeyArray.includes(${regionKey})`)
        errorNotes.push('unsupported RegionKey')
    }
    if(errorLogicArray.length > 0){
        let ifElseObject = {}
        ifElseObject.error = true
        ifElseObject.errorLogicArray = errorLogicArray
        ifElseObject.errorNotes = errorNotes
        ifElseObject.errorString = 'see Notes'
        return ifElseObject
    }
    // ! ============================================================
    // ! <This entire block will be removed when 'KLUDGE' is Solved>
    // ! ============================================================
    if(KLUDGE){
        return fetchCoursesByKLUDGE( termId , regionKey )
    }
    errorLogicArray.push(`!supportedTermIdArray.includes(${termId})`)
    errorNotes.push('unsupported TermId')
    if(errorLogicArray.length > 0){
        let ifElseObject = {}
        ifElseObject.error = true
        ifElseObject.errorLogicArray = errorLogicArray
        ifElseObject.errorNotes = errorNotes
        ifElseObject.errorString = 'see Notes'
        return ifElseObject
    }
    // ! ============================================================
    // ! </This entire block will be removed when 'KLUDGE' is Solved>
    // ! ============================================================
}
// ø <---------- </fetchCurriculaByTermIdRegionKey(termId,regionKey)> ---------->

// ø <---------- <fetchCurriculaByKLUDGE(termId,regionKey)>  ---------->
function fetchCurriculaByKLUDGE( termId = 7777777, regionKey = 'DLH'){
    // ! RETURNS A RAW JS ARRAY (and, of course, in JS Arrays _are_ Objects)
    let curriculaObjectArrayALL = []
    switch (termId) {
        case 7777777:
            curriculaObjectArrayALL = [{"_id":"3562","courseNameDisplay":"Kickoff Camp","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202223","courseTilePath":"https://static.wixstatic.com/media/523205_9249dded66d24a1cb1add3acf6b7e5e4~mv2.jpeg","coursePromoPath":"FFALSE","curriculumId":"3510"},{"_id":"3563","courseNameDisplay":"Kickoff Camp","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202223","courseTilePath":"https://static.wixstatic.com/shapes/523205_b2f81f130c244bc98d8cb23395a4d700.svg","coursePromoPath":"FFALSE","curriculumId":"3510"},{"_id":"3564","courseNameDisplay":"Kickoff Camp","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202223","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3510"},{"_id":"3556","courseNameDisplay":"Architecture","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202224","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3500"},{"_id":"3572","courseNameDisplay":"Biosphere Challenge","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202224","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3520"},{"_id":"3565","courseNameDisplay":"Ceramics","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202224","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"20"},{"_id":"3571","courseNameDisplay":"Creative Creatures","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202224","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3356"},{"_id":"3568","courseNameDisplay":"Flight Technology:Gliders, Rockets and Drones","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202224","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"23"},{"_id":"3567","courseNameDisplay":"Gadgets and Gizmos","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202224","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"25"},{"_id":"3566","courseNameDisplay":"Intro to STEAM","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202224","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"39"},{"_id":"3570","courseNameDisplay":"Mad Scientist Chemistry","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202224","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"27"},{"_id":"3569","courseNameDisplay":"Robotics and Coding","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202224","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"33"},{"_id":"3578","courseNameDisplay":"Architecture","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3500"},{"_id":"3583","courseNameDisplay":"Biomechanics in Sports & Trick Shots","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3509"},{"_id":"3575","courseNameDisplay":"Ceramics","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"20"},{"_id":"3577","courseNameDisplay":"Drone Academy","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"37"},{"_id":"3579","courseNameDisplay":"Girls Leadership","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3352"},{"_id":"3580","courseNameDisplay":"Girls Leadership","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3352"},{"_id":"3581","courseNameDisplay":"Girls Leadership MS","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3360"},{"_id":"3574","courseNameDisplay":"Mad Scientist Chemistry","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"27"},{"_id":"3573","courseNameDisplay":"Pirate Science","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3511"},{"_id":"3576","courseNameDisplay":"STEAM Survivor","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3501"},{"_id":"3582","courseNameDisplay":"Superhero Science","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202225","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3514"},{"_id":"3586","courseNameDisplay":"Ceramics","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202226","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"20"},{"_id":"3584","courseNameDisplay":"Forensics Detectives","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202226","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"24"},{"_id":"3587","courseNameDisplay":"Inventing","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202226","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"50"},{"_id":"3585","courseNameDisplay":"Mad Scientist Chemistry","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202226","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"27"},{"_id":"3588","courseNameDisplay":"Maker Laboratory","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202226","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"1296"},{"_id":"3590","courseNameDisplay":"Art Lab","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202228","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"16"},{"_id":"3594","courseNameDisplay":"Construction Kids","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202228","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"1283"},{"_id":"3592","courseNameDisplay":"Drone Academy","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202228","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"37"},{"_id":"3593","courseNameDisplay":"Forensics Investigators","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202228","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"24"},{"_id":"3589","courseNameDisplay":"Journey to Atlantis","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202228","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3515"},{"_id":"3591","courseNameDisplay":"Photography 101","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202228","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"30"},{"_id":"3600","courseNameDisplay":"Sport & Trick Shot Biomechanics","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202229","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3509"},{"_id":"3595","courseNameDisplay":"Digging Dinos","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202229","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3516"},{"_id":"3598","courseNameDisplay":"Forensic Detectives","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202229","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"24"},{"_id":"3601","courseNameDisplay":"Lead with STEAM","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202229","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3461"},{"_id":"3602","courseNameDisplay":"Lead with STEAM","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202229","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3461"},{"_id":"3603","courseNameDisplay":"Lead with STEAM","courseRegionKey":"CHO","locationKey":"CHOa","termId":"202223","weekId":"202229","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"3461"},{"_id":"3596","courseNameDisplay":"Paint and Mixed Media","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202229","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"29"},{"_id":"3599","courseNameDisplay":"Photography 201*","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202229","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"30"},{"_id":"3597","courseNameDisplay":"Robotics and Coding","courseRegionKey":"CHO","locationKey":"CHOb","termId":"202223","weekId":"202229","courseTilePath":"FFALSE","coursePromoPath":"FFALSE","curriculumId":"33"}]
            break;
    
        default:
            curriculaObjectArrayALL = [{"nid":"3500","name":"Architecture","abbrvName":false,"textKey":"ARCHITECT","steamTags":[],"status":"0","counter":1,"isoLastUpdate":"2021-11-30T19:17:12+0000"},{"nid":"44","name":"Architecture and Wilderness Survival Skills","abbrvName":"Arch Wild","textKey":"ARCWILDSUR","steamTags":["14","15","16","17","18","19"],"status":"0","counter":2,"isoLastUpdate":"2021-11-18T19:14:53+0000"},{"nid":"16","name":"Art Lab","abbrvName":"Art Lab","textKey":"ARTLAB","steamTags":["12","13","20","21","22","23","24","25"],"status":"0","counter":3,"isoLastUpdate":"2021-11-08T14:26:17+0000"},{"nid":"3513","name":"As Seen on TV","abbrvName":false,"textKey":"ASSEENTV","steamTags":[],"status":"0","counter":4,"isoLastUpdate":"2021-12-01T19:02:38+0000"},{"nid":"3515","name":"Journey to Atlantis","abbrvName":false,"textKey":"ATLANTIS","steamTags":[],"status":"0","counter":5,"isoLastUpdate":"2021-12-01T19:09:21+0000"},{"nid":"1223","name":"Battle Bots","abbrvName":"Battle Bots","textKey":"BATTLEBOTS","steamTags":["261","262","263"],"status":"0","counter":6,"isoLastUpdate":"2021-11-08T16:22:23+0000"},{"nid":"3509","name":"Biomechanics Lab","abbrvName":false,"textKey":"BIOMECH","steamTags":[],"status":"0","counter":7,"isoLastUpdate":"2021-12-01T18:16:49+0000"},{"nid":"3520","name":"Biosphere Challenge","abbrvName":false,"textKey":"BIOSPHERE","steamTags":[],"status":"0","counter":8,"isoLastUpdate":"2021-12-02T18:58:15+0000"},{"nid":"1290","name":"Blue Ribbon Agriculture in Art","abbrvName":"BlueRibbon","textKey":"BLUERIBAG","steamTags":[],"status":"0","counter":9,"isoLastUpdate":"2021-11-08T16:22:54+0000"},{"nid":"40","name":"Brain Games","abbrvName":"Games","textKey":"BRAINGAME","steamTags":["38","39","40","41","42","43"],"status":"0","counter":10,"isoLastUpdate":"2021-11-08T16:24:35+0000"},{"nid":"1295","name":"Cardboard Engineering","abbrvName":"Cardboard","textKey":"CARDBOARD","steamTags":[],"status":"0","counter":11,"isoLastUpdate":"2021-11-08T16:26:45+0000"},{"nid":"48","name":"Carnival Science","abbrvName":"Carni","textKey":"CARNIVAL","steamTags":["44","45","46","47","48"],"status":"0","counter":12,"isoLastUpdate":"2021-11-08T16:27:01+0000"},{"nid":"1292","name":"Woodworking and Carnival Science","abbrvName":"WoodCarnival","textKey":"CARNIVALSCI","steamTags":["236","237","238","239","240","45","46"],"status":"0","counter":13,"isoLastUpdate":"2021-11-09T17:07:48+0000"},{"nid":"20","name":"Ceramics","abbrvName":"Ceramics","textKey":"CERAMICS","steamTags":["13","49","50","51","52","53","21","12","54"],"status":"0","counter":14,"isoLastUpdate":"2021-11-08T16:27:23+0000"},{"nid":"3338","name":"Sparking Circuits","abbrvName":"SPARKCIRCUITS","textKey":"CIRCUITS","steamTags":[],"status":"0","counter":15,"isoLastUpdate":"2021-11-09T17:04:37+0000"},{"nid":"3355","name":"City Design","abbrvName":"City Design","textKey":"CITYDESIGN","steamTags":[],"status":"0","counter":16,"isoLastUpdate":"2021-11-08T16:28:04+0000"},{"nid":"1283","name":"Construction Kids","abbrvName":"ConstructKids","textKey":"CONKIDS","steamTags":[],"status":"0","counter":17,"isoLastUpdate":"2021-11-08T16:40:00+0000"},{"nid":"1224","name":"Cooking With STEAM","abbrvName":"Cooking","textKey":"COOKING","steamTags":["264","265","170","125"],"status":"0","counter":18,"isoLastUpdate":"2021-11-08T16:46:43+0000"},{"nid":"3332","name":"Gaming and Computer Arts","abbrvName":"GAMECPUART","textKey":"CPUGAMING","steamTags":[],"status":"0","counter":19,"isoLastUpdate":"2021-11-09T16:50:44+0000"},{"nid":"43","name":"Craft and Design","abbrvName":"Craft","textKey":"CRAFTDES","steamTags":["84","85","86","87","290","34"],"status":"0","counter":20,"isoLastUpdate":"2021-11-08T16:47:34+0000"},{"nid":"3356","name":"Creative Creatures","abbrvName":"CreativeCreatures","textKey":"CREATURES","steamTags":[],"status":"0","counter":21,"isoLastUpdate":"2021-11-08T16:49:16+0000"},{"nid":"21","name":"Creative Writing","abbrvName":"Writing","textKey":"CRWRITING","steamTags":["88","89","90"],"status":"0","counter":22,"isoLastUpdate":"2021-11-08T16:50:39+0000"},{"nid":"3357","name":"DaVinci Design","abbrvName":"DaVinciDesign","textKey":"DAVINCID","steamTags":[],"status":"0","counter":23,"isoLastUpdate":"2021-11-08T16:50:56+0000"},{"nid":"3364","name":"STEAM Design Lab","abbrvName":"STEAM Design Lab","textKey":"DESIGNLAB","steamTags":[],"status":"0","counter":24,"isoLastUpdate":"2021-11-09T17:05:18+0000"},{"nid":"3516","name":"Digging Dinos","abbrvName":false,"textKey":"Dinosaurs","steamTags":[],"status":"0","counter":25,"isoLastUpdate":"2021-12-01T19:13:27+0000"},{"nid":"41","name":"Dissect Biology","abbrvName":"Dissect","textKey":"DISBIO","steamTags":["91","92","93","94"],"status":"0","counter":26,"isoLastUpdate":"2021-11-08T16:51:45+0000"},{"nid":"37","name":"Drone Academy","abbrvName":"Drone Acad","textKey":"DRONEAC","steamTags":["95","96","97","98","99"],"status":"0","counter":27,"isoLastUpdate":"2021-11-08T16:53:20+0000"},{"nid":"1227","name":"Drone Training","abbrvName":false,"textKey":"DRONETR","steamTags":["269","262","99"],"status":"0","counter":28,"isoLastUpdate":"2021-11-09T17:11:15+0000"},{"nid":"52","name":"Duct Tape Engineer","abbrvName":"Tape","textKey":"DUCTENG","steamTags":["100","104","105","102"],"status":"0","counter":29,"isoLastUpdate":"2021-11-08T16:54:23+0000"},{"nid":"49","name":"Duct Tape and Rubber Band Engineer","abbrvName":"Duct Rub","textKey":"DUCTRUBBER","steamTags":["100","101","102","103"],"status":"0","counter":30,"isoLastUpdate":"2021-11-08T16:53:47+0000"},{"nid":"3358","name":"Edible Architecture","abbrvName":"Edible Architecture","textKey":"EDARCH","steamTags":[],"status":"0","counter":31,"isoLastUpdate":"2021-11-08T16:54:46+0000"},{"nid":"3359","name":"Edible Art","abbrvName":"EdibleArt","textKey":"EDIBLEART","steamTags":[],"status":"0","counter":32,"isoLastUpdate":"2021-11-08T16:55:09+0000"},{"nid":"51","name":"Entrepreneurship","abbrvName":"Entrep","textKey":"ENTREPREN","steamTags":["106","107","108","109"],"status":"0","counter":33,"isoLastUpdate":"2021-11-08T16:55:27+0000"},{"nid":"3519","name":"Extreme Engineering","abbrvName":false,"textKey":"EXTREMEENG","steamTags":[],"status":"0","counter":34,"isoLastUpdate":"2021-12-02T18:31:53+0000"},{"nid":"22","name":"Fashion and Technology","abbrvName":"Fashion","textKey":"FASHIONTEC","steamTags":["110","111","112","113","114"],"status":"0","counter":35,"isoLastUpdate":"2021-11-08T16:55:54+0000"},{"nid":"3518","name":"Flight & Rockets","abbrvName":false,"textKey":"FLIGHTROCK","steamTags":[],"status":"0","counter":36,"isoLastUpdate":"2021-12-02T18:29:39+0000"},{"nid":"23","name":"Flight Technology:Gliders, Rockets and Drones","abbrvName":"Flight","textKey":"FLIGHTTECH","steamTags":["118","119","120","95","121","122"],"status":"0","counter":37,"isoLastUpdate":"2021-11-08T16:56:47+0000"},{"nid":"3333","name":"Food as Art","abbrvName":"FOODART","textKey":"FOODART","steamTags":[],"status":"0","counter":38,"isoLastUpdate":"2021-11-08T16:57:05+0000"},{"nid":"17","name":"Food Science","abbrvName":"Food Sci","textKey":"FOODSCI","steamTags":["123","124","125","126","127"],"status":"0","counter":39,"isoLastUpdate":"2021-11-08T16:57:18+0000"},{"nid":"24","name":"Forensics","abbrvName":"Forensics","textKey":"FORENSICS","steamTags":["128","129","130","131"],"status":"0","counter":40,"isoLastUpdate":"2021-11-08T16:59:36+0000"},{"nid":"25","name":"Gadgets and Gizmos","abbrvName":"Gadgets","textKey":"GADGETS","steamTags":["136","137","138","139","140","141"],"status":"0","counter":41,"isoLastUpdate":"2021-11-09T16:49:22+0000"},{"nid":"3339","name":"Board Game and Pinball Design","abbrvName":"BGAMEPINBALLDESIGN","textKey":"GAMEDESIGN","steamTags":[],"status":"0","counter":42,"isoLastUpdate":"2021-11-08T16:23:41+0000"},{"nid":"1288","name":"Gaming 101","abbrvName":"Game","textKey":"GAMING101","steamTags":["282","283","284","285"],"status":"0","counter":43,"isoLastUpdate":"2021-11-09T16:49:54+0000"},{"nid":"46","name":"Garden and Farm","abbrvName":"Garden","textKey":"GARDEN","steamTags":["142","143","144","145"],"status":"0","counter":44,"isoLastUpdate":"2021-11-09T16:51:11+0000"},{"nid":"3361","name":"Girls Impact MS","abbrvName":"GirlsImpactMS","textKey":"GIRLIMP68","steamTags":[],"status":"0","counter":45,"isoLastUpdate":"2021-11-09T16:54:31+0000"},{"nid":"3341","name":"Girls Impact Incubator","abbrvName":"GLIMPACTINCUBATOR","textKey":"GIRLINCUB","steamTags":[],"status":"0","counter":46,"isoLastUpdate":"2021-11-09T16:54:02+0000"},{"nid":"3352","name":"Girls Leadership Elem","abbrvName":"Girls Leadership Elem","textKey":"GIRLLEADEL","steamTags":["296","165"],"status":"0","counter":47,"isoLastUpdate":"2021-11-09T16:55:13+0000"},{"nid":"3360","name":"Girls Leadership MS","abbrvName":"GirlsLeadershipMS","textKey":"GIRLLEADMS","steamTags":[],"status":"0","counter":48,"isoLastUpdate":"2021-11-09T16:55:55+0000"},{"nid":"26","name":"Girls and Engineering","abbrvName":"Girls Eng","textKey":"GIRLSENG","steamTags":["146","147","148","149"],"status":"0","counter":49,"isoLastUpdate":"2021-11-09T16:51:28+0000"},{"nid":"3353","name":"Girls Impact Elem","abbrvName":"Girls Impact Elem","textKey":"GIRLSIMP","steamTags":["296","297","298","299"],"status":"0","counter":50,"isoLastUpdate":"2021-11-09T16:53:09+0000"},{"nid":"3414","name":"Girls in Tech","abbrvName":"Girls in Tech","textKey":"GIRLSTECH","steamTags":[],"status":"0","counter":51,"isoLastUpdate":"2021-11-09T16:54:51+0000"},{"nid":"3340","name":"Girls Leadership Jumpstart","abbrvName":"GLJUMPSTART","textKey":"GLJUMPSTART","steamTags":[],"status":"0","counter":52,"isoLastUpdate":"2021-11-09T16:55:36+0000"},{"nid":"3517","name":"Imagineers:City of the Future","abbrvName":false,"textKey":"IMAGINEER","steamTags":[],"status":"0","counter":53,"isoLastUpdate":"2021-12-02T17:37:05+0000"},{"nid":"39","name":"Intro to STEAM","abbrvName":"Int Ste","textKey":"INTROSTEAM","steamTags":["153","12","154","100","155","156","157","158"],"status":"0","counter":54,"isoLastUpdate":"2021-11-09T16:56:38+0000"},{"nid":"50","name":"Inventing","abbrvName":"Invent","textKey":"INVENT","steamTags":["159","160","161","162"],"status":"0","counter":55,"isoLastUpdate":"2021-12-02T20:37:55+0000"},{"nid":"3510","name":"Kickoff Camp","abbrvName":false,"textKey":"KICKOFF","steamTags":[],"status":"0","counter":56,"isoLastUpdate":"2021-12-01T18:19:32+0000"},{"nid":"3351","name":"Kitchen Science","abbrvName":"Kitchen Science","textKey":"KITCHENSCI","steamTags":["170","125","264"],"status":"0","counter":57,"isoLastUpdate":"2021-11-09T16:57:06+0000"},{"nid":"3461","name":"Lead with STEAM","abbrvName":"LeadwithSTEAM","textKey":"LEADSTEAM","steamTags":[],"status":"0","counter":58,"isoLastUpdate":"2021-11-09T16:57:22+0000"},{"nid":"64","name":"Coach Lee Wrestling","abbrvName":"Wrestle","textKey":"LEEWRESTLE","steamTags":["63","64","65"],"status":"0","counter":59,"isoLastUpdate":"2021-11-08T16:29:08+0000"},{"nid":"69","name":"Hand Lettering","abbrvName":"Lettering","textKey":"LETTERING","steamTags":["12","87","150","151","152"],"status":"0","counter":60,"isoLastUpdate":"2021-11-09T16:56:11+0000"},{"nid":"54","name":"Life Skills","abbrvName":false,"textKey":"LIFESKILLS","steamTags":["163","164","165","166"],"status":"0","counter":61,"isoLastUpdate":"2021-11-09T17:10:56+0000"},{"nid":"27","name":"Mad Scientist Chemistry","abbrvName":"Mad Science","textKey":"MADSCICHEM","steamTags":["167","155","168","169","170","171","172","173"],"status":"0","counter":62,"isoLastUpdate":"2021-11-09T16:57:37+0000"},{"nid":"1296","name":"Maker Laboratory","abbrvName":"Maker Sum","textKey":"MAKERLAB","steamTags":[],"status":"0","counter":63,"isoLastUpdate":"2021-11-09T16:57:52+0000"},{"nid":"1279","name":"MakerLab","abbrvName":"Maker","textKey":"MAKERLAB2","steamTags":[],"status":"0","counter":64,"isoLastUpdate":"2021-11-09T16:58:16+0000"},{"nid":"1286","name":"Map and Compass","abbrvName":"Map","textKey":"MAPCOMPASS","steamTags":[],"status":"0","counter":65,"isoLastUpdate":"2021-11-09T16:58:38+0000"},{"nid":"1294","name":"Math Camp","abbrvName":"Math","textKey":"MATHCAMP","steamTags":[],"status":"0","counter":66,"isoLastUpdate":"2021-11-09T16:58:49+0000"},{"nid":"3512","name":"Matter Lab","abbrvName":false,"textKey":"MATTERLAB","steamTags":[],"status":"0","counter":67,"isoLastUpdate":"2021-12-01T19:00:10+0000"},{"nid":"28","name":"Money, Money, Money","abbrvName":"Money","textKey":"MONEY","steamTags":["174","175","176","177"],"status":"0","counter":68,"isoLastUpdate":"2021-11-09T16:59:06+0000"},{"nid":"53","name":"Museum Design","abbrvName":"Museum","textKey":"MUSEUMDES","steamTags":["100","87","178","179","180","181"],"status":"0","counter":69,"isoLastUpdate":"2021-11-09T16:59:22+0000"},{"nid":"3365","name":"Rock Concert Science and Design","abbrvName":"Rock Concert Science and Design","textKey":"MUSICSCI","steamTags":["221","302","303","304"],"status":"0","counter":70,"isoLastUpdate":"2021-11-09T17:03:19+0000"},{"nid":"45","name":"Nature Art","abbrvName":"Nat Art","textKey":"NATUREART","steamTags":["182","87","183","184","185"],"status":"0","counter":71,"isoLastUpdate":"2021-11-09T17:00:04+0000"},{"nid":"29","name":"Paint and Mixed Media","abbrvName":"Paint","textKey":"PAINTMEDIA","steamTags":["21","186","187","188","189"],"status":"0","counter":72,"isoLastUpdate":"2021-11-09T17:00:42+0000"},{"nid":"1228","name":"Paper Crafts","abbrvName":false,"textKey":"PAPERCRAFT","steamTags":["270","271","272"],"status":"0","counter":73,"isoLastUpdate":"2021-11-09T17:10:23+0000"},{"nid":"68","name":"Coach Parsons Lacrosse","abbrvName":"Par Lax","textKey":"PARSONSLAX","steamTags":["66","61","67","68"],"status":"0","counter":74,"isoLastUpdate":"2021-11-08T16:29:24+0000"},{"nid":"30","name":"Photography","abbrvName":"Photo","textKey":"PHOTO","steamTags":["190","191","192","193","194","195"],"status":"0","counter":75,"isoLastUpdate":"2021-11-09T17:00:51+0000"},{"nid":"3366","name":"Pirate Science","abbrvName":"Pirate Science","textKey":"PIRATES","steamTags":[],"status":"0","counter":76,"isoLastUpdate":"2021-11-09T17:01:55+0000"},{"nid":"3511","name":"Pirate Science","abbrvName":false,"textKey":"PIRATESCI","steamTags":[],"status":"0","counter":77,"isoLastUpdate":"2021-12-01T18:22:32+0000"},{"nid":"42","name":"Presidential STEAM and Early American Life","abbrvName":"President","textKey":"PRESSTEAM","steamTags":["196","197","198","199","200","201","202"],"status":"0","counter":78,"isoLastUpdate":"2021-11-09T17:02:10+0000"},{"nid":"1291","name":"Mysterious Marks-Intro to Printmaking","abbrvName":"Printmake","textKey":"PRINTMAKE","steamTags":[],"status":"0","counter":79,"isoLastUpdate":"2021-11-09T16:59:51+0000"},{"nid":"31","name":"Public Speaking","abbrvName":false,"textKey":"PUBSPEAK","steamTags":["163","203","204","205"],"status":"0","counter":80,"isoLastUpdate":"2021-11-09T17:10:03+0000"},{"nid":"32","name":"Reading and Science","abbrvName":"Readng & Sci","textKey":"READSCI","steamTags":["206","207","208","209","210","211"],"status":"0","counter":81,"isoLastUpdate":"2021-11-09T17:02:21+0000"},{"nid":"1289","name":"Renewable Energy Design Lab","abbrvName":"Renewable Energy","textKey":"RENEWABLE","steamTags":["286","287","288","289"],"status":"0","counter":82,"isoLastUpdate":"2021-11-09T17:02:51+0000"},{"nid":"33","name":"Robotics and Coding","abbrvName":"Robot","textKey":"ROBOTCODE","steamTags":["212","213","214","215","216","217"],"status":"0","counter":83,"isoLastUpdate":"2021-11-09T17:03:07+0000"},{"nid":"56","name":"Rubber Band Engineer","abbrvName":"Rub Eng","textKey":"RUBBERBAND","steamTags":["100","162","103","101","218"],"status":"0","counter":84,"isoLastUpdate":"2021-11-09T17:03:33+0000"},{"nid":"3354","name":"Science Fair","abbrvName":"Science Fair","textKey":"SCIFAIR","steamTags":["300","301"],"status":"0","counter":85,"isoLastUpdate":"2021-11-09T17:03:48+0000"},{"nid":"60","name":"Coach Verbrugge Soccer Camp","abbrvName":"Ver Soc","textKey":"SOCCERCAMP","steamTags":["69","70","71","72"],"status":"0","counter":86,"isoLastUpdate":"2021-11-08T16:29:45+0000"},{"nid":"34","name":"Science of Seeing and Listening","abbrvName":"See Lis","textKey":"SOUNDSIGHT","steamTags":["219","220","221","222"],"status":"0","counter":87,"isoLastUpdate":"2021-11-09T17:04:27+0000"},{"nid":"58","name":"Sports Marketing and Design","abbrvName":"Sports Market","textKey":"SPORTMKTG","steamTags":["12","87","227","228","229"],"status":"0","counter":88,"isoLastUpdate":"2021-11-09T17:04:53+0000"},{"nid":"3367","name":"Physical Physics","abbrvName":"Physical Physics","textKey":"SPORTPHYSIC","steamTags":["136","230","226"],"status":"0","counter":89,"isoLastUpdate":"2021-11-09T17:01:45+0000"},{"nid":"57","name":"Sports Science","abbrvName":"SportsScience","textKey":"SPORTSCI","steamTags":["226","230","231","232","169"],"status":"0","counter":90,"isoLastUpdate":"2021-11-09T17:05:03+0000"},{"nid":"1293","name":"Stitch-it","abbrvName":"Stitch","textKey":"STITCHIT","steamTags":[],"status":"0","counter":91,"isoLastUpdate":"2021-11-09T17:05:30+0000"},{"nid":"3331","name":"StrandED","abbrvName":"STRANDED","textKey":"STRANDED","steamTags":[],"status":"0","counter":92,"isoLastUpdate":"2021-11-09T17:06:07+0000"},{"nid":"3514","name":"Superhero Science","abbrvName":false,"textKey":"SUPERHERO","steamTags":[],"status":"0","counter":93,"isoLastUpdate":"2021-12-01T19:03:38+0000"},{"nid":"3501","name":"STEAM Survivor","abbrvName":false,"textKey":"Survivor","steamTags":[],"status":"0","counter":94,"isoLastUpdate":"2021-11-30T19:25:39+0000"},{"nid":"1375","name":"Tennis Experience with ACAC","abbrvName":"Tennis","textKey":"TENNIS","steamTags":[],"status":"0","counter":95,"isoLastUpdate":"2021-11-09T17:06:19+0000"},{"nid":"3363","name":"Test Kitchen","abbrvName":"Test Kitchen","textKey":"TESTKITCH","steamTags":[],"status":"0","counter":96,"isoLastUpdate":"2021-11-09T17:06:33+0000"},{"nid":"19","name":"Art of Theater","abbrvName":"Theater","textKey":"THEATER","steamTags":["26","27","28","29","30","31"],"status":"0","counter":97,"isoLastUpdate":"2021-11-08T16:21:44+0000"},{"nid":"36","name":"Tinkering and Entrepreneurship","abbrvName":false,"textKey":"TINKERING","steamTags":["233","234","235","106","108"],"status":"0","counter":98,"isoLastUpdate":"2021-11-09T17:08:43+0000"},{"nid":"3330","name":"Toy Inventing and Woodworking","abbrvName":"TOYINVENTWOOD","textKey":"TOYWOOD","steamTags":[],"status":"0","counter":99,"isoLastUpdate":"2021-11-09T17:06:45+0000"},{"nid":"1281","name":"Transportation-Build, Race, Fly, Crash","abbrvName":"Transportation","textKey":"TRANSPORT","steamTags":[],"status":"0","counter":100,"isoLastUpdate":"2021-11-09T17:06:56+0000"},{"nid":"38","name":"Ultimate Trick Shot","abbrvName":"Trick Shot","textKey":"TRICKSHOT","steamTags":["223","224","225","226"],"status":"0","counter":101,"isoLastUpdate":"2021-11-09T17:07:06+0000"},{"nid":"1350","name":"Computer Programming in Video Games & E-Sports","abbrvName":"Programming and Gaming","textKey":"VIDEOGAMES","steamTags":[],"status":"0","counter":102,"isoLastUpdate":"2021-11-08T16:36:50+0000"},{"nid":"1225","name":"Weather","abbrvName":"Weather","textKey":"WEATHER","steamTags":["266"],"status":"0","counter":103,"isoLastUpdate":"2021-11-09T17:07:17+0000"},{"nid":"1226","name":"Wildlife and Dissection","abbrvName":false,"textKey":"WILDDISC","steamTags":["267","92","268"],"status":"0","counter":104,"isoLastUpdate":"2021-11-09T17:09:31+0000"},{"nid":"66","name":"Coach Wilke Basketball","abbrvName":"Wilk Bask","textKey":"WILKEBBALL","steamTags":["73","74","75","76"],"status":"0","counter":105,"isoLastUpdate":"2021-11-08T16:30:02+0000"},{"nid":"62","name":"Coach Wilson Basketball Camp","abbrvName":"Wils Bask","textKey":"WILSONBB","steamTags":["73","75","74","76"],"status":"0","counter":106,"isoLastUpdate":"2021-11-08T16:30:28+0000"},{"nid":"61","name":"Coach Wilson Pigskin Camp","abbrvName":"Flag Foot","textKey":"WILSONFB","steamTags":["77","78","79"],"status":"0","counter":107,"isoLastUpdate":"2021-11-08T16:30:45+0000"},{"nid":"3362","name":"Woodworking & Game Design","abbrvName":"Woodworking and Toys","textKey":"WOODTOY","steamTags":[],"status":"0","counter":108,"isoLastUpdate":"2021-12-02T17:42:52+0000"},{"nid":"47","name":"Woodworking","abbrvName":"Woodw","textKey":"WOODWORKING","steamTags":["236","237","238","239","240","241"],"status":"0","counter":109,"isoLastUpdate":"2021-11-09T17:07:33+0000"}]
            break;
    }
    return curriculaObjectArrayALL
}
// ø <---------- </fetchCurriculaByKLUDGE(termId,regionKey)> ---------->
// ø <---------- <fetchCurriculumMaxChanged()>  ---------->
function fetchCurriculumMaxChanged(){
    const KLUDGE = true
    if(KLUDGE){
        return fetchCurriculumMaxChangedByKLUDGE()
    }
    // let defualtWhiichObjectArray = []
    let curriculumMaxChangedObject = {}
    curriculumMaxChangedObject.error = `'fetchCurriculumMaxChanged()' is unsupported at this time`
    return curriculumMaxChangedObject
}
// ø <---------- </fetchCurriculumMaxChanged()> ---------->
// ø <---------- <fetchCurriculumMaxChangedByKLUDGE()>  ---------->
function fetchCurriculumMaxChangedByKLUDGE(){
    return {"nid":"50","textKey":"INVENT","isoLastUpdate":"2021-12-02T20:37:55+0000"}
}
// ø <---------- </fetchCurriculumMaxChangedByKLUDGE()> ---------->
//==================================================   </Fetch and Update Current Curricula>
//==========================================================================================

//==========================================================================================
//==================================================                            <Fetch Node>
// ø <---------- <fetchDrupalNode( nid )>  ---------->
export async function fetchDrupalNode( nid = 7777777){
    let errorLogicArray = []
    let errorNotes = []
    if(nid === 7777777){
        errorLogicArray.push(`nid === 7777777`)
        errorNotes.push(`Default nid Error`)
    }
    if(errorLogicArray.length > 0){
        let ifElseObject = {}
        ifElseObject.error = true
        ifElseObject.errorLogicArray = errorLogicArray
        ifElseObject.errorNotes = errorNotes
        ifElseObject.errorString = 'see Notes'
        return ifElseObject
    }
    let transformObject = {}
    const url = `https://live-steamda.pantheonsite.io/node/${nid}`
    let options = {}
    options.mode = "no-cors"
    transformObject.nid = nid
    transformObject.url = url
    transformObject.options = options
    let responseObject = {}
    responseObject.transformObject = transformObject
    // responseObject.responseObject = {}
    // responseObject.responseObject.HOLDER = `responseObject will be the response to the fetch() function`
    responseObject.responseObject = getJSON(url,options)
        .then(json => {
            memory.setItem('memoryHOLDER',json)
            console.log(json)
        })
        .catch(err => console.log(err));
    // responseObject.responseObject = await getJSON(url,options)
    //     .then(json => console.log(json.someKey))
    //     .catch(err => console.log(err));

    return responseObject
}
// ø <---------- </fetchDrupalNode( nid )> ---------->

//==================================================                           </Fetch Node>
//==========================================================================================

//====================================================================================================
//======================================================================     </Drupal Fetch Functions>
//====================================================================================================

//====================================================================================================
//============================================================  <Generalized Course Catalog Functions>
//====================================================================================================

//==========================================================================================
//==================================================                     <Small Group Block>

// ø <---------- <lotsOfStuffHere( whichStuff = 'All of It')>  ---------->
export function lotsOfStuffHere( whichStuff = 'All of It'){
    console.log(`Lots of Code...`)
    console.log(`Lots of Code...`)
    console.log(`Lots of Code...`)
    console.log(`Lots of Code...`)
    console.log(`Lots of Code...`)
    console.log(`Lots of Code...`)
}
// ø <---------- </lotsOfStuffHere( whichStuff = 'All of It')> ---------->

//==================================================                    </Small Group Block>
//==========================================================================================

//====================================================================================================
//============================================================ </Generalized Course Catalog Functions>
//====================================================================================================

//====================================================================================================
//====================================================================================================
//============================================================                      Buttons ONLY Below
//============================================================                      (and other Events)
//====================================================================================================
