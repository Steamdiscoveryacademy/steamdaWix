// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import {local, session, memory} from 'wix-storage';
import wixData from 'wix-data';
import wixWindow from 'wix-window';
import wixLocation from 'wix-location';
// import { currentMember } from 'wix-members';
// • <import from> 'public/'
// • <import from> 'public/buttonBlockModule.js'
import {addFrom_toggleExpandButtons} from 'public/buttonBlockModule.js'; 
import {assignStringsOnReady} from 'public/buttonBlockModule.js'; 
import {btnblkToggleBTN_click} from 'public/buttonBlockModule.js'; 
import {btnblkDoBTN_click} from 'public/buttonBlockModule.js'; 
// • </import from> 'public/buttonBlockModule.js'
// • <import from> 'public/utilityModule.js'
import {getWeekId} from 'public/utilityModule.js'; 
import {courseKeyHuman} from 'public/utilityModule.js'; 
import {getSourcedJSON_byKey} from 'public/utilityModule.js'; 
import {getCurrentMemberObject} from 'public/utilityModule.js'; 
import {stringToLinesDistrib} from 'public/utilityModule.js'; 
// • </import from> 'public/utilityModule.js'
// • <import from> 'public/inventoryDocDbJSON.js'
import {datestampinventoryDocDbJSON} from 'public/inventoryDocDbJSON.js'
import {getInventoryResponse} from 'public/inventoryDocDbJSON.js'
import {locationGetByRegionKey} from 'public/inventoryDocDbJSON.js'
import {weeksGetByTermId} from 'public/inventoryDocDbJSON.js'
import {gradeLevelGetCurrent} from 'public/inventoryDocDbJSON.js'
// • </import from> 'public/inventoryDocDbJSON.js'
// • <import from> 'public/timeCrunchModule.js'
import {timeCrunch} from 'public/timeCrunchModule.js'
import {jsDaysOfWeekArrayToString} from 'public/timeCrunchModule.js'
import {getEndDateFromSchedule_Start_Weeks_DaysOfWeek} from 'public/timeCrunchModule.js'
// • </import from> 'public/timeCrunchModule.js'
// • <import from> 'public/courseCatalogModule.js'
import {sectionObjectEscapedJSON} from 'public/courseCatalogModule.js'
import {fetchCoursesByTermIdRegionKey} from 'public/courseCatalogModule.js'
// • </import from> 'public/courseCatalogModule.js'
import {getNatoPhoneticArrayObjectItem} from 'public/natoPhoneticTestData.js';
// • </import from> 'public/'
import {getDrupalURI} from 'backend/apiDrupalModule.jsw';
import {postDrupalNode} from 'backend/apiDrupalModule.jsw';
import {patchDrupalNode} from 'backend/apiDrupalModule.jsw';
import {CONSTRUCT_apiObject_POSTbyKind} from 'public/apiObjectPrepModule.js';
// import {apiObjectPrep} from 'public/apiObjectPrepModule.js';
import {utilityDirectParseDataIntoTemplate} from 'public/apiObjectPrepModule.js';
import { compareAsc, format } from 'date-fns'
import {adminDispatch} from 'public/adminDispatch.js';
import {fetch} from 'wix-fetch';

// ø QUICK_LIST:
// ø QUICK_LIST_COURSE_EDIT
// ø QUICK_LIST_LOAD_COURSES_ON_READY
// ø QUICK_LIST_FILTER_COURSES
// ø 

// ø QUICK_LIST_LOAD_COURSES_ON_READY
// ø LOAD_COURSES_ON_READY_SG_SubGroup
// ø LOAD_COURSES_ON_READY_00a_monadLoadUpToDateCourses
// ø LOAD_COURSES_ON_READY_00b_termRegionCoursesRepeaterPreppedOnReady
// ø LOAD_COURSES_ON_READY_01_composeFilterFormObject_OnReadyForceChangeNoFilter
// ø LOAD_COURSES_ON_READY_02_applyFilterToBuffer_OnReadyForceAllCourses
// ø GRID_BUFFER_RPTRS_UI_ON_READY_SG_SubGroup
// ø GRID_BUFFER_RPTRS_UI_ON_READY_03a_rebuildBufferForGrid_OnReadyForceAllCourses
// ø GRID_BUFFER_RPTRS_UI_ON_READY_03b_LoadWeekColumnRepeaters
// ø YIKES!!! GRID_BUFFER_RPTRS_UI_ON_READY_04_evaluationPaginationAndLoadRepeater_OnReadyFirstEightCourses

// ø 
// ø QUICK_LIST_FILTER_COURSES
// ø FILTER_COURSES_00_previewCourseBTN_click
// ø FILTER_COURSES_01_validateFilterForm
// ø FILTER_COURSES_02_composeFilterFormObject | FILTER_COURSES_02err_catchAndDisplayError
// ø FILTER_COURSES_03_applyFilterToBuffer
// ø FILTER_COURSES_04_evaluationPaginationAndLoadRepeater
// ø 


$w.onReady(async function () {
    console.group(`$w.onReady(async function ()`)
    // console.groupCollapsed(`$w.onReady(async function ()`)

    console.log(`setUpOnReady()`)
	setUpOnReady()
    console.log(`await wixStorageDisplayOnReady()	//KLUDGE-CleanUp`)
	await wixStorageDisplayOnReady()	//KLUDGE-CleanUp
    console.log(`termRegionCoursesRepeaterPreppedOnReady_FRONT_END()`)
	termRegionCoursesRepeaterPreppedOnReady_FRONT_END()
    console.log(`groupEnd: $w.onReady(async function () => then Force return`)
    console.groupEnd()
    return
	let buttonObjectButtonsUsedArray = [2,3]
	assignStringsOnReady(buttonObjectButtonsUsedArray,[2,3])
	wixUserPermissionsOnReady()
});
//==========================================================================================
//==================================================              <OnReady Called Functions>
//==================================================     (in the order they are called above)
function setUpOnReady(){
    console.groupCollapsed(`setUpOnReady()`)
    // console.group(`setUpOnReady()`)
	memory.setItem('memoryResponseObject', JSON.stringify(memory.getItem('memoryParamObject')))
    console.log(`JSON.parse(memory.getItem(memory.getItem('memoryResponseObject'))) [object below]`)
    console.dir(JSON.parse(memory.getItem(memory.getItem('memoryResponseObject'))))
	memory.setItem('memoryParamObject', JSON.stringify(`{"pipedBoolean":"ON_READY"}`))//
    console.log(`JSON.parse(memory.getItem('memoryParamObject')) [object below]`)
    console.dir(JSON.parse(memory.getItem('memoryParamObject')))
	// ¯\__  triggers _FILTER_ of no-Filter onReady()  __/¯
    console.log(`groupEnd: setUpOnReady()`)
    console.groupEnd()
}
function cleanUpOnReady(){
	// memory.setItem('memoryParamObject', JSON.stringify({"pipedBoolean":"ON_READY"}))
}

// ø LOAD_COURSES_ON_READY_00b_termRegionCoursesRepeaterPreppedOnReady
// ø <---------- <termRegionCoursesRepeaterPreppedOnReady_FRONT_END()>  ---------->
async function termRegionCoursesRepeaterPreppedOnReady_FRONT_END(){
	await monadLoadUpToDateCourses_FRONT_END()

	// console.groupCollapsed(`termRegionCoursesRepeaterPreppedOnReady_FRONT_END()`)
	console.group(`termRegionCoursesRepeaterPreppedOnReady_FRONT_END()`)

	
	// ø <KLUDGE_GET>
	// ø ¯\_(ツ)_/¯ => until I can get 'simple' fetch() working
	// ø </KLUDGE_GET>
	let allCoursesWorkingObject = JSON.parse(memory.getItem('TermIdRkCourses'))
	console.log(`AFTER_MONAD: allCoursesWorkingObject = JSON.parse(memory.getItem('TermIdRkCourses'))`)
	console.log(`AFTER_MONAD: KLUDGE-CleanUp: 'TermIdRkCourse' vs 'memoryWorkingBackupObject'`)
	console.log(`AFTER_MONAD: KLUDGE-CleanUp: 'session-TermStuff' vs 'memory-TermStuff'`)
	console.dir(allCoursesWorkingObject)
	
	let weekDocDbObject = weeksGetByTermId(Number(session.getItem('termId')))
	console.log(`weekDocDbObject = weeksGetByTermId(Number(session.getItem('termId')))`)
	console.log(`weekDocDbObject = weeksGetByTermId(${Number(session.getItem('termId'))})`)
	console.log(`weekDocDbObject: [object below]`)
	console.dir(weekDocDbObject)
	let weekObjectThis = {}
	// weekObjectThis = weekDocDbObject[202223]
	// console.log(`weekObjectThis: [object below]`)
	// console.log(weekObjectThis)

	let locationObject = locationGetByRegionKey(session.getItem('termRegionId'))
	console.log(`locationGetByRegionKey(session.getItem('termRegionId')) =>`)
	console.log(`locationGetByRegionKey(${session.getItem('termRegionId')}) =>`)
	console.log(`locationObject: [object below]`)
	console.dir(locationObject)


	let gradeLevelDocDbObject = gradeLevelGetCurrent()
	// console.log(`gradeLevelDocDbObject: [object below]`)
	// console.dir(gradeLevelDocDbObject)
	let gradeLevelObjectThis = {}

	
	
	for (let index = 0; index < allCoursesWorkingObject.length; index++) {
	// for (let index = 0; index < 1; index++) {
		const element = allCoursesWorkingObject[index];
		gradeLevelObjectThis = gradeLevelDocDbObject[element.gradeLevelKey]
		weekObjectThis = weekDocDbObject[element.weekId]
		if(index === 1000){
		// if(index === 1){
			console.log(`element [object below]`)
			console.dir(element)
			console.log(`gradeLevelObjectThis = gradeLevelDocDbObject[element.gradeLevelKey] => gradeLevelDocDbObject[${element.gradeLevelKey}]`)
			console.log(`gradeLevelObjectThis [object below]`)
			console.dir(gradeLevelObjectThis)
			// weekObjectThis = weekDocDbObject[(element.weekId).toString()]
			// weekObjectThis = weekDocDbObject.find((item) => {
			// 	return item.name === 'Book'
			// })
			console.log(`weekObjectThis = weekDocDbObject[element.weekId] => weekDocDbObject[${element.weekId}]`)
			// console.log(`weekObjectThis = weekDocDbObject[element.weekId] => weekDocDbObject[${(element.weekId).toString()}]`)
			console.log(`weekObjectThis: index[${index}] [object below]`)
			console.dir(weekObjectThis)
		}
		 
		element.weekNameCardinal = weekObjectThis.nameCardinal
		element.weekDateStartAbbrv = weekObjectThis.dateStartAbbrv
		element.weekDaysOfWeekString = weekObjectThis.daysOfWeekString

		let weekTimeBlockKey = (element.courseOptions).replace(',','_')
		weekTimeBlockKey = weekTimeBlockKey.includes('FD') ? 'FD' : weekTimeBlockKey
		weekTimeBlockKey = weekTimeBlockKey === 'HD_AM' ? 'AM' : weekTimeBlockKey
		weekTimeBlockKey = weekTimeBlockKey === 'HD_PM' ? 'PM' : weekTimeBlockKey
		element.weekTimeBlockKey = weekTimeBlockKey	
		element.weekTimeBlockSpanString = weekObjectThis[weekTimeBlockKey]['timeBlockSpanString']
		 
		element.locationNameCommon = locationObject[element.locationKey]['nameCommon']
		 
		element.gradeLevelHuman = gradeLevelObjectThis.humanHyphenatedKey
		element.gradeLevelFullArray = gradeLevelObjectThis.fullArray
		 
		element.weight = Number(element.weekNameCardinal) * 1000 + index
	}
	memory.setItem('memoryWorkingBackupObject',JSON.stringify(allCoursesWorkingObject))
	// $w('#developerResponseTXTBX').value = JSON.stringify(allCoursesWorkingObject,undefined,4)
	$w('#developerResponseTXTBX').value = JSON.stringify(allCoursesWorkingObject.undefined,4)
	
	console.log(`groupEnd: termRegionCoursesRepeaterPreppedOnReady_FRONT_END()`)
	console.groupEnd()
	// ! KLUDGE-CleanUp BELOW to stop error
	// composeFilterFormObject_FRONT_END()
}
// ø <---------- </termRegionCoursesRepeaterPreppedOnReady_FRONT_END()> ---------->
// ø <---------- <monadLoadUpToDateCourses_FRONT_END()>  ---------->
// ø LOAD_COURSES_ON_READY_00a_monadLoadUpToDateCourses
async function monadLoadUpToDateCourses_FRONT_END(){
	// console.groupCollapsed(`monadLoadUpToDateCourses_FRONT_END()`)
	console.group(`monadLoadUpToDateCourses_FRONT_END()`)
	// console.log(`memory.getItem('memoryTermIdRkCourses'): [ugly JSON below]`)
	// console.log(memory.getItem('memoryTermIdRkCourses'))
	console.log(`memory.getItem('memoryWorkingBackupObject'): [ugly JSON below]`)
	console.log(memory.getItem('memoryWorkingBackupObject'))

	let reloadTermIdRkCourses = false
	let reloadTermIdRkCoursesDOX = `INIT`

	let DOX = '//ø <localTermIdRkCoursesMaxChanged>'
	
	let nowTermIdRkCoursesMaxChanged = 'STRING'
	let doGetMaxChangedTermIdRk = `TTRUE: Yes always get 'doGetMaxChangedTermIdRk'`
	if(doGetMaxChangedTermIdRk.substr(0,5) === 'TTRUE'){
		let tidrKeyMaxChanged = memory.getItem('memoryTermIdRkParamKey')
		let termId = tidrKeyMaxChanged.match(/\d/g)
		let regionKey = tidrKeyMaxChanged.match(/[A-Z]/g)
		let courseMaxChangedUri = 'https://live-steamda.pantheonsite.io/courseMaxChanged/202223/CHO'
		// let termId = const regex = /\d/g;paragraph.match(regex);
		/*KLUDGE-CleanUp better RegEx {6}{3} instead of join()*/let courseUriMaxChanged = `/courseMaxChanged/${termId.join('')}/${regionKey.join('')}`
		console.log(`≈207≈ courseUriMaxChanged: '${courseUriMaxChanged}'`)
		console.log(`let nowTermIdRkCoursesMaxChangedObject = await getDrupalURI(${courseUriMaxChanged}, false)`)
		// console.log(`let nowTermIdRkCoursesMaxChangedObject = await getDrupalURI(${courseUriMaxChanged})`)
		// console.log(`≈209≈ FORCE return`)
        // return
		console.log(`≈212≈ nowTermIdRkCoursesMaxChangedObject: [object below]`)
		let nowTermIdRkCoursesMaxChangedObject = await getDrupalURI(courseUriMaxChanged, false)
		// let nowTermIdRkCoursesMaxChangedObject = await getDrupalURI(courseUriMaxChanged)
		console.log(`≈215≈ nowTermIdRkCoursesMaxChangedObject: [object below]`)
		console.dir(nowTermIdRkCoursesMaxChangedObject)
		nowTermIdRkCoursesMaxChanged = nowTermIdRkCoursesMaxChangedObject.length !== 1 ? (new Date()).toISOString() + 'KLUDGE' : nowTermIdRkCoursesMaxChangedObject[0].isoLastUpdate
		console.log(`≈218≈ nowTermIdRkCoursesMaxChanged: ${nowTermIdRkCoursesMaxChanged}`)
		// nowTermIdRkCoursesMaxChanged = (nowTermIdRkCoursesMaxChangedObject[0].isoLastUpdate).substr(0,19)
		nowTermIdRkCoursesMaxChanged = nowTermIdRkCoursesMaxChanged.substr(0,19)
		// memory.setItem('TermIdRkCourses', JSON.stringify(nowFullCoursesObjectArray))
		// console.log(`nowTermIdRkCoursesMaxChangedObject: [objects below]`)
		// console.dir(nowTermIdRkCoursesMaxChangedObject)
		console.log(`nowTermIdRkCoursesMaxChanged: '${nowTermIdRkCoursesMaxChanged}'`)
	
	}
	if(local.getItem('localTermIdRkCoursesMaxChanged') === null || (local.getItem('localTermIdRkCoursesMaxChanged')).length < 19){
		local.setItem('localTermIdRkCoursesMaxChanged',nowTermIdRkCoursesMaxChanged)
		nowTermIdRkCoursesMaxChanged = (nowTermIdRkCoursesMaxChanged).substr(0,17) + '60'
	}

	DOX = '//ø </localTermIdRkCoursesMaxChanged>'
	console.log(`groupEnd: monadLoadUpToDateCourses_FRONT_END()`)
	console.groupEnd()

	reloadTermIdRkCourses = nowTermIdRkCoursesMaxChanged > local.getItem('localTermIdRkCoursesMaxChanged') ? true : reloadTermIdRkCourses
	reloadTermIdRkCoursesDOX = nowTermIdRkCoursesMaxChanged > local.getItem('localTermIdRkCoursesMaxChanged') ? `nowTermIdRkCoursesMaxChanged > local.getItem('localTermIdRkCoursesMaxChanged') => true` : reloadTermIdRkCoursesDOX

	reloadTermIdRkCourses = memory.getItem('memoryTermIdRkParamKey') !== memory.getItem('memoryTermIdRkKey') ? true : reloadTermIdRkCourses
	reloadTermIdRkCoursesDOX = memory.getItem('memoryTermIdRkParamKey') !== memory.getItem('memoryTermIdRkKey') ? `memory.getItem('memoryTermIdRkParamKey') !== memory.getItem('memoryTermIdRkKey') => true` : reloadTermIdRkCoursesDOX
	reloadTermIdRkCourses = memory.getItem('memoryTermIdRkCourses') === null ? true : reloadTermIdRkCourses
	reloadTermIdRkCoursesDOX = memory.getItem('memoryTermIdRkCourses') === null ? `memory.getItem('memoryTermIdRkCourses') === null => true` : reloadTermIdRkCoursesDOX
	// <OK-KLUDGE>
	// let tempusFugitCourses = true
	let tempusFugitCourses = false
	// </OK-KLUDGE>
	reloadTermIdRkCourses = tempusFugitCourses ? true : reloadTermIdRkCourses
	reloadTermIdRkCoursesDOX = tempusFugitCourses ? `tempusFugitCourses => true` : reloadTermIdRkCoursesDOX

	let LOG = `≈165≈ reloadTermIdRkCourses Logic:
	let reloadTermIdRkCourses = false
	reloadTermIdRkCourses = ${nowTermIdRkCoursesMaxChanged} > ${local.getItem('localTermIdRkCoursesMaxChanged')} ? true : reloadTermIdRkCourses
	reloadTermIdRkCourses = ${memory.getItem('memoryTermIdRkParamKey')} !== ${memory.getItem('memoryTermIdRkKey')} ? true : reloadTermIdRkCourses
	reloadTermIdRkCourses = ${memory.getItem('memoryTermIdRkCourses')} === null ? true : reloadTermIdRkCourses
	// <OK-KLUDGE>
	let tempusFugitCourses = false [for now]
	// </OK-KLUDGE>
	reloadTermIdRkCourses = tempusFugitCourses ? true : reloadTermIdRkCourses
	reloadTermIdRkCourses = ${reloadTermIdRkCourses}
	reloadTermIdRkCoursesDOX = '${reloadTermIdRkCoursesDOX}'
	`
	console.log(LOG)

	if (reloadTermIdRkCourses){
		memory.setItem('memoryTermIdRkKey',memory.getItem('memoryTermIdRkParamKey'))
		let tidrKey = memory.getItem('memoryTermIdRkKey')
		let termId = tidrKey.match(/\d/g)
		let regionKey = tidrKey.match(/[A-Z]/g)
		let courseUri = `https://live-steamda.pantheonsite.io/wixcourses/202223/CHO`
		// let termId = const regex = /\d/g;paragraph.match(regex);
		/*KLUDGE-CleanUp better RegEx {6}{3} instead of join()*/courseUri = `/wixcourses/${termId.join('')}/${regionKey.join('')}`
		console.log(`≈272≈ courseUri: '${courseUri}'`)
		let nowFullCoursesObjectArray = await getDrupalURI(courseUri, false)
		memory.setItem('TermIdRkCourses', JSON.stringify(nowFullCoursesObjectArray))
		console.log(`≈275≈ TermIdRkCourses: nowFullCoursesObjectArray: [array of objects below]`)
		console.dir(nowFullCoursesObjectArray)
	}

}
// ø <---------- </monadLoadUpToDateCourses_FRONT_END()> ---------->


async function wixUserPermissionsOnReady(){
	
	let workingMember = await getCurrentMemberObject()
	// console.log(`workingMember: [object below]`)
	// console.dir(workingMember)
	
	let develEmailArray = ['brad@steamda.com'] 
	if(develEmailArray.includes(workingMember.email)){
		const develShowArray = ["#develBTN"];
		develShowArray.forEach(element => {
			$w(element).show()
		});
		// ø <expand OnReady() as well>
		// toggleTopSection()
		// ø </expand OnReady() as well>
	}
	if(workingMember.roles.includes('Admin')){
		const adminShowArray = []
		adminShowArray.forEach(element => {
			$w(element).show()
		});
	}
	
}

export function  datestampinventoryDocDbJSONOnReady() {
	console.groupCollapsed(`'inventoryDocDbJSON.js' date-stamp function DEMO`)
    let datestampStringResult = datestampinventoryDocDbJSON();
    console.log(datestampStringResult);
    console.log(`groupEnd: 'inventoryDocDbJSON.js' date-stamp function DEMO`);
    console.groupEnd()
}
export function wixStorageDisplayOnReady(){
    // console.group(`export function wixStorageDisplayOnReady()`)
    console.groupCollapsed(`export function wixStorageDisplayOnReady()`)
	// set lastTermNameTXT
	let tidrKeyMaxChanged = memory.getItem('memoryTermIdRkParamKey')
	let termId = tidrKeyMaxChanged.match(/\d{6}/g)
	let regionKey = tidrKeyMaxChanged.match(/[A-Z]{3}/g)
	if(session.getItem('termId') === null) {
		/*KLUDGE-CleanUp better wix-Storage for Parameters*/
		session.setItem('termId', termId.toString())
	}
	if(session.getItem('termRegionId') === null) {
		/*KLUDGE-CleanUp better wix-Storage for Parameters*/
		session.setItem('termRegionId',regionKey.toString())
	}


	let lastTermName = session.getItem('lastTermName')
	lastTermName = lastTermName === null ? 'Unknown Term Name' : lastTermName
	// let lastTermId = session.getItem('termId')
	let lastTermId = session.getItem('lastTermId')
	lastTermId = lastTermId === null ? 'm' + termId : 's' + lastTermId
	

	$w('#lastTermNameTXT').text = 'Course Management for:\n' + lastTermName + ' [' + lastTermId + ' | ' + regionKey + ']'
    console.log(`groupEnd: export function wixStorageDisplayOnReady()`)
    console.groupEnd()
 }

//==================================================             </OnReady Called Functions>
//==========================================================================================

//====================================================================================================
//==============================        <Filter and Load Course-Repeater>         ==============================
//====================================================================================================

// ø GRID_BUFFER_RPTRS_UI_ON_READY_04_evaluationPaginationAndLoadRepeater_OnReadyFirstEightCourses
function evaluationPaginationAndLoadRepeater(forceRepaginate = false){
	// ø FILTER_COURSES_04_evaluationPaginationAndLoadRepeater
	// console.groupCollapsed(`evaluationPaginationAndLoadRepeater`)
	console.group(`evaluationPaginationAndLoadRepeater`)
	let allCoursesWorkingObject = JSON.parse(memory.getItem('memoryWorkingBackupObject'))
	let filteredCourseBuffer = JSON.parse(memory.getItem('memoryWorkingObject'))
	// /* EVEN ONLY DEMO: SUCCESS*/ let filteredCourseBuffer = ["1","3","5","7","9","11","13","15","17","19","21","23","25","27","29","31","33","35","37","39","41"]
	// /* ODD ONLY DEMO: SUCCESS*/ let filteredCourseBuffer = ["0","2","4","6","8","10","12","14","16","18","20","22","24","26","28","30","32","34","36","38","40","42"]
	console.log(`allCoursesWorkingObject [array - from JSON.parse() below]`)
	console.dir(allCoursesWorkingObject)
	console.log(`filteredCourseBuffer [array - from JSON.parse() below]`)
	console.dir(filteredCourseBuffer)
	console.log('return FORCE: evaluationPaginationAndLoadRepeater: just logs above')

	let repeaterId = '#courseFilteredRPTR'
	let paginationId = '#courseFilteredPGNTN'
	// let pageItemCount = 8
	let pageItemCount = 1000 /*!!*/
	if(forceRepaginate === true || $w(paginationId).totalPages === 100){
		// totalPages === 100 indicates default paginationObject
		$w(paginationId).currentPage = 1
		$w(paginationId).totalPages = Math.ceil(filteredCourseBuffer.length / pageItemCount);
	}
	let pageIndex = $w(paginationId).currentPage - 1
	let offset = pageIndex * pageItemCount

	let repeaterCoursesObjectArray = []
	for (let rptrIndex = offset ; rptrIndex < pageItemCount + offset; rptrIndex++) {
		const filteredPointerIndex = filteredCourseBuffer[rptrIndex]
		const element = allCoursesWorkingObject[filteredPointerIndex];
		if(typeof element !== 'undefined'){
			repeaterCoursesObjectArray.push(element)	
		}
	}
	// console.log(`repeaterCoursesObjectArray: [array below]`)
	// console.dir(repeaterCoursesObjectArray)
	
	$w(repeaterId).data = repeaterCoursesObjectArray;
	// console.log(`$w(repeaterId).data: $w(${repeaterId}).data:`)
	// console.dir($w(repeaterId).data)

	$w(repeaterId).onItemReady( ($courseElement, courseElementData, index) => {
		console.log(`courseElementData:`)
		console.dir(courseElementData)
		$courseElement('#courseNameDisplayTXT').text = courseElementData.courseNameDisplay;
		$courseElement('#locationConcatTXT').text = `${courseElementData.locationNameCommon} [${courseElementData.locationKey}]`
		$courseElement('#simpleWeekTXT').text = `${courseElementData.weekNameCardinal} [${courseElementData.weekDateStartAbbrv}]`

		$courseElement('#gradeLevelHumanTXT').text = courseElementData.gradeLevelHuman
		$courseElement('#timeSpanStringTXT').text = courseElementData.weekTimeBlockSpanString
		$courseElement('#timeSpanStringTXT').text += (courseElementData.courseOptions.substr(3)).length > 0 ? ` [${courseElementData.courseOptions.substr(3)}]` : ''
		$courseElement('#daysOfWeekStringTXT').text = courseElementData.weekDaysOfWeekString
		$courseElement('#courseKeyTXT').text = courseElementData.courseKey;
		// /*KLUDGE-FIX*/$courseElement('#courseKeyTXT').text = courseElementData.courseKey === null ? 'NNULL' : courseElementData.courseKey;
		$courseElement('#sectionCountTXT').text = courseElementData.sectionCount.toString()
	});
	console.log(`groupEnd: evaluationPaginationAndLoadRepeater`)
	console.groupEnd()

}

// ø <KEEP_FOR transform into 'Edit Section' && || 'Add Section'>
// ø </KEEP_FOR transform into 'Edit Section' && || 'Add Section'>

//====================================================================================================
//==============================        </Filter and Load Course-Repeater>        ==============================
//====================================================================================================

//====================================================================================================
//========================================        <Confirm Backend with Mulitply and Publick with Add>
//========================================       </Confirm Backend with Mulitply and Publick with Add>
//====================================================================================================

//====================================================================================================
//============================================================                  <Overall THINGS Course>
//============================================================        ...Some Active && Some Vestigial
//====================================================================================================

//==========================================================================================
//==================================================       <Instantiate from Curricula Click>
 
// ø <---------- <adjustCourseFiltersAany>  ---------->
function adjustCourseFiltersAany(){
	$w('#previewCourseBTN').label = 'Apply Filters'
	$w('#previewCourseBTN').show()
	$w('#clearCourseFormBTN').show()

}
// ø <---------- </adjustCourseFiltersAany> ---------->

// ø <---------- <resetCourseFiltersAll>  ---------->
function resetCourseFiltersAll(){
// ø CREATE_NEW_COURSE_±2_resetCourseForm
	// let wID_unsetArray = ['#courseNameINPUT','#courseNameDisplayINPUT','#regionLocationINPUT','#regionLocationKeyINPUT']
	$w('#clearCourseFormBTN').hide()
	let wID_unsetArray = ['#regionLocationINPUT','#regionLocationKeyINPUT']
	for (let index = 0; index < wID_unsetArray.length; index++) {
		const element = wID_unsetArray[index];
		$w(element).value = ''
	}
	$w('#selectLocationBTN').label = 'Select Location'

	$w('#startDateDTPKR').value = null
	$w('#startDateDTPKR').resetValidityIndication()
	// $w('#courseNameDisplayINPUT').resetValidityIndication()
	// $w('#halfDayCBXGRP').value = []
	// $w('#halfDayCBXGRP').resetValidityIndication()
	 
	$w('#previewErrorStringTXT').text = `Holder for Errors`
	$w('#previewErrorStringTXT').collapse()
	// $w('#newCourseDataObjectPreview').text = `use $w('#coursePreviewTXT').html`
	// $w('#previewCourseBTN').show()
	// $w('#formPreviewCNTBX').hide()
	// $w('#postCourseBTN').hide()
	// $w('#selectedNewCourseBTN').enable()
	 
	$w('#gradeLevelDRPDN').value = 'NA'
	$w('#minGradeDRPDN').value = 'NA'
	$w('#weekCountDRPDN').value = 'NA'
	// ø <#previewCourseBTN>
	$w('#previewCourseBTN').label = 'Apply No-Filters'
	$w('#previewCourseBTN').show()
	// ø </#previewCourseBTN>
	// $w('#daysOfWeekCBXGRP').value = ['1','2','3','4','5']
	// $w('#daysOfWeekCBXGRP').value = ['MON','TUE','WED','THU','FRI']
	// $w("#myCheckboxGroup").value = ["value1", "value2"];
	// session.setItem('lastResponseObject', '')/*BIGBLEED*//*LINE_327*/
	// memory.setItem('memoryResponseObject', '')/*BIGBLEED*//*LINE_327*/
	// ø TERMINUS CREATE_NEW_COURSE_±2_resetCourseForm
	// ø ±1 course form scripts, but...
	// ø NEXT-BTN_click =>  CREATE_NEW_COURSE_00_Click_PreviewBTN
}
// ø <---------- </resetCourseFiltersAll> ---------->

// ø <---------- <Instantiate jsonDocDb for Locations>  ---------->
// ø <VESTIGIAL_CODE_except_for_Location_DropDown>
export function appendLocationsJsonDocDb(newCourseDataObject){
	let paramObject = {}
	paramObject.kind = 'location'
	paramObject.key = session.getItem('termRegionId')
	let locationResponseObject = getInventoryResponse(paramObject)
	
	let locationObjectArray = locationResponseObject.data.response
	console.log(`locationResponseObject.data.response: locationObjectArray: [object below]`)
	console.dir(locationObjectArray)
	let locationKeyConcatSting = '_'
	for (let index = 0; index < locationObjectArray.length; index++) {
		const element = locationObjectArray[index];
		locationKeyConcatSting += element.key + '_'
	}
	session.setItem('supportedLocationConcatString', locationKeyConcatSting)
	
	// ø <Load Locations Repeater Right Here>
	
	// • <Specific WiX Repeater Code>
    let repeaterId = '#formLocationRPTR'
    let prefixId = 'formLocation'
	// console.groupCollapsed(`rptr load iteration: repeaterId: ${repeaterId}`)
	$w(repeaterId).data = locationObjectArray;
	// console.log(`$w(repeaterId).data: $w(${repeaterId}).data:`)
	// console.dir($w(repeaterId).data)
	let keyTXTid = '#'+ prefixId + 'KeyTXT'
	let nameTXTid = '#'+ prefixId + 'NameTXT'
	$w(repeaterId).onItemReady( ($locationElement, locationElementData, index) => {
		$locationElement(keyTXTid).text = locationElementData.key;
		$locationElement(nameTXTid).text = locationElementData.nameFull;
	});
    // • </Specific WiX Repeater Code>
	
	// ø </Load Locations Repeater Right Here>
}
// ø </VESTIGIAL_CODE_except_for_Location_DropDown>
// ø <---------- </Instantiate jsonDocDb for Locations> ---------->

//==================================================      </Instantiate from Curricula Click>
//==========================================================================================
//==========================================================================================
//==================================================         <Apply Filter Button: Validate>

// ø <---------- <validate Filter-Form data>  ---------->
export function validateFilterForm(){
	// ø FILTER_COURSES_01_validateFilterForm
	// ø CREATE_NEW_COURSE_01_ValidateFilterForm
	let ErrorString = ''
	//ø <GradeLevel>
	let isValidGradeLevel = 'TTRUE'
	isValidGradeLevel = $w('#minGradeDRPDN').value !== 'NA' && $w('#gradeLevelDRPDN').value !== 'NA' ? 'BOTH_VALUES' : isValidGradeLevel

	let stringIsValidHOLDER = ''
	if(isValidGradeLevel !== 'TTRUE'){
		stringIsValidHOLDER = isValidGradeLevel === 'BOTH_VALUES' ? `You cannot select both a 'Grade Contains' Grades and a Grade-Level from the Drop-Down` : stringIsValidHOLDER
		ErrorString += ` •  ${stringIsValidHOLDER}\n`
	}
	//ø </GradeLevel>

	//ø <Week-Contains Date>
	let isValidWeekDate = 'TTRUE'
	let date = $w("#startDateDTPKR").value;
	console.log(`date: [object below]`)
	console.dir(date)
	let stringDatePicker = ''
	if(date === null){
		stringDatePicker = `NNULL`
	} else {
		stringDatePicker = date.toISOString(); // "Fri Jan 13 2017"
	}
	console.log(`stringDatePicker: date.toISOString(): ${stringDatePicker}`)
	isValidWeekDate = $w('#weekCountDRPDN').value !== 'NA' && stringDatePicker !== 'NNULL' ? 'BOTH_VALUES' : isValidWeekDate
	stringIsValidHOLDER = ''
	if(isValidWeekDate !== 'TTRUE'){
		stringIsValidHOLDER = isValidWeekDate === 'BOTH_VALUES' ? `You cannot select both a 'Week Drop-Dow' Week and a 'Contains Date' from the Date-Picker` : stringIsValidHOLDER
		ErrorString += ` •  ${stringIsValidHOLDER}\n`
		console.log(`isValidWeekDate: ${isValidWeekDate}`)
	}
	//ø </Week-Contains Date>


	// ø CREATE_NEW_COURSE_01_ValidateFilterForm
	if(ErrorString.length === 0){
		// ø SUCCESS CREATE_NEW_COURSE_01_ValidateFilterForm
		// ø NEXT CREATE_NEW_COURSE_02_composeFilterFormObject
		$w('#previewErrorStringTXT').text = `Holder for Errors`
		$w('#previewErrorStringTXT').collapse()
		console.log('VALID CALL: composeFilterFormObject_FRONT_END()')
		composeFilterFormObject_FRONT_END()
	}else{
		// ø FAILURE CREATE_NEW_COURSE_01_ValidateFilterForm
		// ø NEXT CREATE_NEW_COURSE_02_catchAndDisplayError
		catchAndDisplayError(ErrorString)
	}
}
// ø <---------- </validate Filter-Form data> ---------->

// ø <---------- <catch & display ERROR>  ---------->
export function catchAndDisplayError(ErrorString){
	// ø FILTER_COURSES_02err_catchAndDisplayError
	console.log(`ErrorString: `)
	console.log(ErrorString)
	$w('#previewErrorStringTXT').expand()
	$w('#previewErrorStringTXT').text = 'CANNOT APPLY FILTER:\n' + ErrorString + `use the 'Reset Filters' button to try agin...` 
}
// ø <---------- </catch & display ERROR> ---------->

//==================================================        </Apply Filter Button: Validate>
//==========================================================================================

//==========================================================================================
//==================================================      <Preview Button: Compose & Display_VESTIGIAL>

// ø <---------- <composeFilterFormObject_FRONT_END>  ---------->
// ø LOAD_COURSES_ON_READY_01_composeFilterFormObject_OnReadyForceChangeNoFilter
function composeFilterFormObject_FRONT_END(){
	// ø FILTER_COURSES_02_composeFilterFormObject
	// ø CREATE_NEW_COURSE_02_composeFilterFormObject
	// console.groupCollapsed(`composeFilterFormObject_FRONT_END()`)
	console.group(`composeFilterFormObject_FRONT_END()`)
	let paramObjectFilterForm = {}
	paramObjectFilterForm.byWeek = $w('#weekCountDRPDN').value === 'NA' ? false : true
	// paramObjectFilterForm.byContainsDate = $w('#startDateDTPKR').value === null ? false : true
	paramObjectFilterForm.byContainsDate = false
	// paramObjectFilterForm.byGradeLevel = $w('#gradeLevelDRPDN').value === 'NA' ? false : true
	paramObjectFilterForm.byGradeLevel = false
	paramObjectFilterForm.byContainsGrade = $w('#minGradeDRPDN').value === 'NA' ? false : true
	paramObjectFilterForm.byLocationKey = $w('#regionLocationKeyINPUT').value.length === 0 ? false : true
	paramObjectFilterForm.pipedBoolean = `${paramObjectFilterForm.byWeek}|`
	paramObjectFilterForm.pipedBoolean += `${paramObjectFilterForm.byContainsDate}|`
	paramObjectFilterForm.pipedBoolean += `${paramObjectFilterForm.byGradeLevel}|`
	paramObjectFilterForm.pipedBoolean += `${paramObjectFilterForm.byContainsGrade}|`
	paramObjectFilterForm.pipedBoolean += `${paramObjectFilterForm.byLocationKey}`
	if(paramObjectFilterForm.byWeek){paramObjectFilterForm.weekCardinal = Number($w('#weekCountDRPDN').value); paramObjectFilterForm.weekId = 777777}
	// if(paramObjectFilterForm.byContainsDate){paramObjectFilterForm.containsDateISO = $w('#startDateDTPKR').value.toISOString()}
	// if(paramObjectFilterForm.byGradeLevel){paramObjectFilterForm.gradeLevel = $w('#gradeLevelDRPDN').value}
	if(paramObjectFilterForm.byContainsGrade){paramObjectFilterForm.containsGrade = $w('#minGradeDRPDN').value}
	if(paramObjectFilterForm.byLocationKey){paramObjectFilterForm.locationKey = $w('#regionLocationKeyINPUT').value}

	// console.log(`paramObjectFilterForm: [object below]`)
	// console.dir(paramObjectFilterForm)
	
	let previousParmObjectFilterForm = JSON.parse(memory.getItem('memoryParamObject'))

	console.log(`previousParmObjectFilterForm: [object below]`)
	console.dir(previousParmObjectFilterForm)

	let changedContinue = false
	changedContinue = paramObjectFilterForm.pipedBoolean === previousParmObjectFilterForm.pipedBoolean ? changedContinue : true

	console.log(`pipedBoolean: changedContinue: ${changedContinue}`)
	if(!changedContinue){
		let attributeArray = Object.keys(paramObjectFilterForm)
		for (let index = 0; index < attributeArray.length; index++) {
			const attribute = attributeArray[index];
			changedContinue = paramObjectFilterForm[attribute] === previousParmObjectFilterForm[attribute] ? changedContinue : true
			console.log(`${attribute}: changedContinue: ${changedContinue}`)
		}
	}
	if(changedContinue){
		console.log(`changedContinue: ${changedContinue}: CONTINUE`)
	}
	if(!changedContinue){
		console.log(`changedContinue: ${changedContinue}: NO_ACTION`)
	}
	

	console.log(`groupEnd: composeFilterFormObject_FRONT_END()`)
	console.groupEnd()
	if(changedContinue){
		applyFilterToBuffer_FRONT_END(paramObjectFilterForm)
	}
}
// ø <---------- </composeFilterFormObject_FRONT_END> ---------->

// ø <---------- <applyFilterToBuffer_FRONT_END>  ---------->
// ø LOAD_COURSES_ON_READY_02_applyFilterToBuffer_OnReadyForceAllCourses
function applyFilterToBuffer_FRONT_END(paramObjectFilterForm){
	// ø FILTER_COURSES_03_applyFilterToBuffer
	// ø CREATE_NEW_COURSE_03_applyFilterToBuffer_paramObjectFilterForm
	// console.groupCollapsed(`applyFilterToBuffer_FRONT_END(paramObjectFilterForm)`)
	console.group(`applyFilterToBuffer_FRONT_END(paramObjectFilterForm)`)
	console.log(`REACHED: applyFilterToBuffer_FRONT_END(paramObjectFilterForm)`)

	// $w('#previewCourseBTN').hide()

	// let weekDocDbObject = weeksGetByTermId(Number(session.getItem('termId')))
	// console.log(`weekDocDbObject = weeksGetByTermId(Number(session.getItem('termId')))`)
	// console.log(`weekDocDbObject = weeksGetByTermId(${Number(session.getItem('termId'))})`)
	// console.log(`weekDocDbObject: [object below]`)
	// console.dir(weekDocDbObject)

	// let gradeLevelDocDbObject = gradeLevelGetCurrent()
	// console.log(`gradeLevelDocDbObject: [object below]`)
	// console.dir(gradeLevelDocDbObject)

	let allCoursesWorkingObject = JSON.parse(memory.getItem('memoryWorkingBackupObject'))
	console.log(`allCoursesWorkingObject: [array below]`)
	console.dir(allCoursesWorkingObject)
	console.log(`paramObjectFilterForm: [object below]`)
	console.dir(paramObjectFilterForm)
	// return
	let filteredCourseBuffer = []
	let filteredCourseExcludedBuffer = []
	let filteringComplete = paramObjectFilterForm.pipedBoolean === "false|false|false|false|false" ? true : false
	if(filteringComplete){
		filteredCourseBuffer = Object.keys(allCoursesWorkingObject)
		filteredCourseExcludedBuffer = []
		console.log(`ALL_FALSE: filteredCourseBuffer: [array below]`)
		console.dir(filteredCourseBuffer)
		// console.log(`LOAD_COURSE_REPEATER: evaluationPaginationAndLoadRepeater()`)
		console.log(`groupEnd: applyFilterToBuffer_FRONT_END(paramObjectFilterForm)`)
		console.groupEnd()
		memory.setItem('memoryWorkingObject',JSON.stringify(filteredCourseBuffer))
		/*!!*/
		// ø <Change for Grid> 
		// evaluationPaginationAndLoadRepeater(true)
		LoadWeekColumnRepeaters_FRONT_END()
		// ø </Change for Grid> 
		/*!!*/ 
		return
	}
	// return
	for (let index = 0; index < allCoursesWorkingObject.length; index++) {
		const courseThis = allCoursesWorkingObject[index];
		let includeThis = true

		let logicalOpertor = 'ALL_AND'// maybe 'ALL_OR' later, maybe even trickier
		// ø <logicalOpertor === 'ALL_AND'>
		if(logicalOpertor === 'ALL_AND'){

			// ø <Apply Either Grade Based Filter>
			// ø ø <Apply Grade Level Filter>
			if(paramObjectFilterForm.byGradeLevel){
				// console.log(`DO: Apply Grade Level Filter`)
				if(courseThis.gradeLevelKey !== paramObjectFilterForm.gradeLevel){
					includeThis = false
				}
			}
			// ø ø </Apply Grade Level Filter>
			// ø ø 
			// ø ø <Apply Contains Level Filter>
			if(paramObjectFilterForm.byContainsGrade){
				// console.log(`DO: Apply Contains Level Filter`)
				if(!courseThis.gradeLevelFullArray.includes(Number(paramObjectFilterForm.containsGrade))){
					includeThis = false
				}
			}
			// ø ø </Apply Contains Level Filter>
			// ø </Apply Either Grade Based Filter>
			// ø 
			// ø <Apply Either Date Based Filter>
			// ø ø <Apply Week Number Filter>
			if(paramObjectFilterForm.byWeek){
				if(Number(courseThis.weekNameCardinal) !== paramObjectFilterForm.weekCardinal){
					includeThis = false
				}
			}
			// ø ø </Apply Week Number Filter>
			// ø ø 
			// ø ø <Apply Contains Date Filter>
			if(paramObjectFilterForm.byContainsDate){
				let dateIsWithinSpan = true
				dateIsWithinSpan = paramObjectFilterForm.containsDateISO.substr(0,11) < courseThis.courseDateStart.substr(0,11) ? false : dateIsWithinSpan
				dateIsWithinSpan = paramObjectFilterForm.containsDateISO.substr(0,11) > courseThis.courseDateEnd.substr(0,11) ? false : dateIsWithinSpan
				if(!dateIsWithinSpan){
					includeThis = false
				}
			}
			// ø ø </Apply Contains Date Filter>
			// ø </Apply Either Date Based Filter>
		}
		// ø </logicalOpertor === 'ALL_AND'>
		if(includeThis){
			filteredCourseBuffer.push(index.toString())
		}
		if(!includeThis){
			filteredCourseExcludedBuffer.push(index.toString())
		}

	}

	memory.setItem('memoryWorkingObject',JSON.stringify(filteredCourseBuffer))
	console.log(`FILTER_APPLIED: filteredCourseBuffer: [array below]`)
	console.dir(filteredCourseBuffer)
	console.log(`FILTER_APPLIED: filteredCourseExcludedBuffer: [array below]`)
	console.dir(filteredCourseExcludedBuffer)




	memory.setItem('memoryParamObject', JSON.stringify(paramObjectFilterForm))

	console.log(`groupEnd: applyFilterToBuffer_FRONT_END(paramObjectFilterForm)`)
	console.groupEnd()
	// return
	/*!!*/
	// ø <Change for Grid> 
	// evaluationPaginationAndLoadRepeater(true)
	LoadWeekColumnRepeaters_FRONT_END()
	// ø </Change for Grid> 
	/*!!*/ 

}
// ø <---------- </applyFilterToBuffer_FRONT_END> ---------->

// ø <---------- <rebuildBufferForGrid_FRONT_END>  ---------->
// ø GRID_BUFFER_RPTRS_UI_ON_READY_03a_rebuildBufferForGrid_OnReadyForceAllCourses
function rebuildBufferForGrid_FRONT_END(){
    // console.group(`applyFilterToBuffer(paramObjectFilterForm)`)
    // let colCount = 4
    // console.groupCollapsed(`rebuildBufferForGrid_FRONT_END()`)
	console.group(`rebuildBufferForGrid_FRONT_END()`)
	console.log(`REACHED: rebuildBufferForGrid_FRONT_END()`)
    let doxObject = JSON.parse(memory.getItem('memoryDoxObject'))
	/*!!*/ 
	if(doxObject === null) {
		doxObject = {}
		doxObject.colCount = 9
	}
	/*!!*/ 
    let colCount = doxObject.colCount
    // let filteredCourseBuffer = JSON.parse(memory.getItem('memoryWorkingObject'))
    let filteredCourseBuffer = JSON.parse(memory.getItem('memoryWorkingBackupObject'))/*!!*/
    console.log(`filteredCourseBuffer: [array below]`)
    console.dir(filteredCourseBuffer)
    let weekColIndex = 777
    let gridWeekMaxArray = /*cardinalWeeks, Zero will be Zero so Not Max*/[0,0,0,0,0,0,0,0,0,0]
    let gridWeekKeyArray = /*cardinalWeeks, Zero will be Zero so Not Max*/['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine']
    let gridRepeaterIdArray = gridWeekKeyArray.map(key => {
		return `week${key}CourseGridRPTR`
	})
    for (let index = 0; index < filteredCourseBuffer.length; index++) {
        const element = filteredCourseBuffer[index]
		// weekColIndex = Number(element.weekNameCardinal)

        gridWeekMaxArray[Number(element.weekNameCardinal)]++
    }
    console.log(`gridWeekMaxArray: [array below]`)
    console.dir(gridWeekMaxArray)
    let rowCount = Math.max(...gridWeekMaxArray)
    console.log(`rowCount: ${rowCount}`)
    console.log(`gridWeekKeyArray: [array below]`)
    console.dir(gridWeekKeyArray)
    console.log(`gridRepeaterIdArray: [array below]`)
    console.dir(gridRepeaterIdArray)
    // console.log(`FORCE return: ≈833≈`)
	// return



    let gridRebuildCourseBuffer = []
    let gridRebuildCourseElementThis = {}
    let placedCourseIndexArray = []
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        const rowThis = rowIndex + 1 //skips ZERO /*!!*/
        for (let colIndex = 0; colIndex < colCount; colIndex++) {
            const colThis = colIndex + 1 //skips ZERO /*!!*/
            gridRebuildCourseElementThis = {}
            gridRebuildCourseElementThis.col = colThis
            gridRebuildCourseElementThis.row = rowThis
            gridRebuildCourseElementThis._id = `row${rowThis}col${colThis}`
            gridRebuildCourseElementThis.pointerIndex = null
            // ø <loop Buffer>
            for (let bufferIndex = 0; bufferIndex < filteredCourseBuffer.length; bufferIndex++) {
                const bufferElement = filteredCourseBuffer[bufferIndex]
                bufferElement.col = Number(bufferElement.weekNameCardinal)
                if(!placedCourseIndexArray.includes(bufferIndex)){
					 //¯¯\__(OOAAOC)__/¯¯  /*!!*/
                    if(colThis === bufferElement.col){
                        // gridRebuildCourseElementThis.row = rowThis
                        placedCourseIndexArray.push(bufferIndex)
                        gridRebuildCourseElementThis.pointerIndex = bufferIndex
                        break
                    }
                }
            }
            // ø </loop Buffer>
            gridRebuildCourseBuffer.push(gridRebuildCourseElementThis)
        }
    }
    console.log(`gridRebuildCourseBuffer: [array below]`)
    console.dir(gridRebuildCourseBuffer)
	// console.log(`FORCE return: ≈879≈`)
	// return

    let gridRowLastArray = /*cardinalWeeks, Zero will be Zero so Not Max*/[0,0,0,0,0,0,0,0,0,0]
    for (let index = 0; index < filteredCourseBuffer.length; index++) {
        const element = filteredCourseBuffer[index]
		// ø <raison d'être>
        element.row = gridRowLastArray[element.col] + 1
		// ø </raison d'être>
        gridRowLastArray[element.col] = element.row
    }
    console.log(`gridRowLastArray: [array below]`)
    console.dir(gridRowLastArray)

	// console.log(`FORCE return: ≈895≈`)
	// return

    let rows = Math.max(...gridRowLastArray)
    console.log(`rows: ${rows}`)
	console.log(`ROW_APPLIED: filteredCourseBuffer: [array below]`)
	console.dir(filteredCourseBuffer)

	// console.log(`FORCE return: ≈903≈`)
    // return
    /*KLUDGE-CleanUp ≈873≈*/// memory.setItem('memoryWorkingObject',JSON.stringify(gridRebuildCourseBuffer))
    console.log(`/*KLUDGE-CleanUp ≈873≈*/// memory.setItem('memoryWorkingObject',JSON.stringify(gridRebuildCourseBuffer))`)
	console.log(`GRID_APPLIED: gridRebuildCourseBuffer: [array below]`)
	console.dir(gridRebuildCourseBuffer)
	// console.log(`FILTER_APPLIED: filteredCourseExcludedBuffer: [array below]`)
	// console.dir(filteredCourseExcludedBuffer)
	$w('#developerDoxTXTBX').value = JSON.stringify(gridRebuildCourseBuffer)
	console.log(`groupEnd: rebuildBufferForGrid(KLUDGEparamObjectFilterForm)`)
	console.groupEnd()
	// console.log(`FORCE return: ≈914≈`)
	// return
	// evaluationPaginationAndLoadRepeater(true)
	LoadWeekColumnRepeaters_FRONT_END()
}
// ø <---------- </rebuildBufferForGrid_FRONT_END> ---------->

// ø GRID_BUFFER_RPTRS_UI_ON_READY_03b_LoadWeekColumnRepeaters
function LoadWeekColumnRepeaters_FRONT_END() {
	console.group(`LoadWeekColumnRepeaters_FRONT_END()`)
	// console.groupCollapsed(`LoadWeekColumnRepeaters_FRONT_END()`)
	console.log(`PENDING: just logging: 2022-02-05T11:02:00`)
	console.log(`groupEnd: LoadWeekColumnRepeaters_FRONT_END()`)
	console.groupEnd()
}

//==================================================     </Preview Button: Compose & Display_VESTIGIAL>
//==========================================================================================



//====================================================================================================
//============================================================                </Overall THINGS Course>
//====================================================================================================
 
//====================================================================================================
//============================================================                     <Edit Course Logic>
//====================================================================================================
//==========================================================================================
//==================================================                <Course Edit Navigation>
// ø COURSE_EDIT_00b_courseEditNavigation
// ! KLUDGE: MAYBE NEED THIS CODE, FIND IT IN COURSE MANAGEMENT BY FUNCTION TAGS ABOVE & BELOW 
// ø <---------- <instantiateCourseItemSingletonRepeater(itemId)  ---------->
// ø COURSE_EDIT_00c_instantiateCourseItemSingletonRepeater
 function instantiateCourseItemSingletonRepeater(itemId = "777"){
	const wIdSingleton = '#courseEditRPTR'
	const wIdClickedRepeater = '#courseFilteredRPTR'
	// console.log(`wIdSingleton: ${wIdSingleton}`)
	const data = $w(wIdClickedRepeater).data;
	// console.log(`data`)
	// console.dir(data)
	let clickedItemData = data.find(item => item._id === itemId);

	let currentCourseTilePath = typeof clickedItemData.courseTilePath === 'string' ? 'STRING' : 'NNULL'
	currentCourseTilePath = currentCourseTilePath === 'STRING' && clickedItemData.courseTilePath. length > 20 ? clickedItemData.courseTilePath : 'NNULL'
	currentCourseTilePath = currentCourseTilePath !== 'NNULL' ? currentCourseTilePath : ''
	// $w('#currCourseTilePathINPUT').value = currentCourseTilePath !== 'NNULL' ? currentCourseTilePath : ''
	// $w('#currCourseTilePathINPUT').value = currentCourseTilePath !== 'NNULL' ? currentCourseTilePath : 'https://static.wixstatic.com/shapes/523205_8ec1c41ed0e04ad0ab9c57a0d5d37983.svg'
	

	let repeaterDataArray = []
	repeaterDataArray.push(clickedItemData)
	console.log(`repeaterDataArray:`)
	console.dir(repeaterDataArray)

	$w(wIdSingleton).data = repeaterDataArray
    
	const wIdCourseTileIMG = '#courseTileOneIMG'
	const wIdcourseTopTXT = '#courseTopOneTXT'
	// • REDUNDANCY IS A GOOD THING

	$w(wIdSingleton).onItemReady( ($courseElement, courseElementData, index) => {

		$courseElement('#courseNameDisplaySingleTXT').text = courseElementData.courseNameDisplay
		$courseElement('#locationConcatSingleTXT').text = `${courseElementData.locationNameCommon} [${courseElementData.locationKey}]`
		$courseElement('#simpleWeekSingleTXT').text = `${courseElementData.weekNameCardinal} [${courseElementData.weekDateStartAbbrv}]`
		$courseElement('#gradeLevelHumanSingleTXT').text = courseElementData.gradeLevelHuman
		$courseElement('#timeSpanStringSingleTXT').text = courseElementData.weekTimeBlockSpanString
		$courseElement('#daysOfWeekStringSingleTXT').text = courseElementData.weekDaysOfWeekString
		$courseElement('#courseKeySingleTXT').text = courseElementData.courseKey
		$courseElement('#sectionCountSingleTXT').text = courseElementData.sectionCount
		// $courseElement(wIdCourseTileIMG).src = courseElementData.courseTilePath

		$courseElement('#editUrlCourseKeyTXT').text = courseElementData.courseKey

		// $w(wIdKldgeResponseTXTBX).value = JSON.stringify(courseElementData,undefined,4)
		console.log(`≈933≈ courseElementData: [object below]`)
		console.dir(courseElementData)
	})
	return currentCourseTilePath
 }
// ø <---------- </instantiateCourseItemSingletonRepeater(itemId) ---------->
//==================================================               </Course Edit Navigation>
//==========================================================================================

//==========================================================================================
//==================================================            <Course Edit Action Scripts>
//==========================================================================================

//==========================================================================================
//==================================================         <Course Edit Tile Path Scripts>
// ø <---------- <doCourseEdit_courseTilePath(paramObject)>  ---------->
// ø COURSE_EDIT_01a_courseTilePath
// ! KLUDGE: MAYBE NEED THIS CODE, FIND IT IN COURSE MANAGEMENT BY FUNCTION TAGS ABOVE & BELOW
// ø <---------- </doCourseEdit_courseTilePath(paramObject)> ---------->
// ø <---------- <doCourseEdit_previewCourseTilePath(preview)> ---------->
// ! KLUDGE: MAYBE NEED THIS CODE, FIND IT IN COURSE MANAGEMENT BY FUNCTION TAGS ABOVE & BELOW
// ø <---------- </doCourseEdit_previewCourseTilePath(preview)> ---------->
//==================================================        </Course Edit Tile Path Scripts>
//==========================================================================================

 
// ø <---------- <doCourseEditSection(paramObject)>  ---------->
// ø COURSE_EDIT_03k_courseAddSection
function doCourseEditSection(stepThis = 'NO_OVERLOAD', paramObject = {}){
	console.log(`doCourseEditSection: paramObject; [object below]`)
	console.dir(paramObject)
	const wIdSingleton = '#courseEditRPTR'
	const dataSingleton = $w(wIdSingleton).data[0];
	console.log(`dataSingleton [object below]`)
	console.dir(dataSingleton)

	let url = `https://live-steamda.pantheonsite.io/node/${dataSingleton._id}/edit?destination=/admin/content`
	$w('#drupalEditSectionLinkTXT').text = url

}
// ø <---------- </doCourseEditSection(paramObject)> ---------->
 
//==========================================================================================
//==================================================           </Course Edit Action Scripts>
//==========================================================================================

//====================================================================================================
//============================================================                    </Edit Course Logic>
//====================================================================================================
 
//==========================================================================================
//==================================================            <Utility and Button Scripts>
 function toggleTopSection(){
	 console.log(`$w('#topPanelSCTN').isVisible: ${$w('#topPanelSCTN').isVisible}`)
	 if($w('#topPanelSCTN').isVisible){
		$w('#topPanelSCTN').collapse()
	 }else{
		$w('#topPanelSCTN').expand()
	 }
 }
//==================================================           </Utility and Button Scripts>
//==========================================================================================
 
//==========================================================================================
//==================================================                  <KLUDGE Buttons Steps>
 function doKLUDGE(){
	 rebuildBufferForGrid_FRONT_END()
 }
//  ===========
export function doKludgeBTTN_click(event) {
	doKLUDGE()
}
export function doxKludgeResetBTTN_click(event) {
	$w('#developerResponseTXTBX').value = ''
	$w('#developerDoxTXTBX').value = ''
	console.log(`$w('#developerDoxTXTBX'): ${$w('#developerDoxTXTBX')}`)
	console.log(`typeof $w('#developerDoxTXTBX'): ${typeof $w('#developerDoxTXTBX')}`)
}

export function kludgeDataDisplayBTTN_click(event) {
	let doAppend = $w('#kludgeDataDisplayAppendSWTCH').checked
	let prefixDox =       !doAppend ? '' : $w('#developerDoxTXTBX').value
	let prefixResponse =  !doAppend ? '' : $w('#developerResponseTXTBX').value
	let lineDox = ''
	let dox = ''
	let response = ''
	let which = $w('#kludgeDataDisplayDRPDN').value
	switch (which) {
		case 'memoryTermIdRkParamKey':
			lineDox = ''
			dox += `≈PARAM≈ memoryTermIdRkParamKey\n`
			dox += `memory.getItem('memoryTermIdRkParamKey'):\n`
			response = memory.getItem('memoryTermIdRkParamKey')
			break;
		case 'TermIdRkCourses':
			lineDox = ''
			dox += `≈295≈ memory.setItem('TermIdRkCourses', JSON.stringify(nowFullCoursesObjectArray))\n`
			dox += `memory.getItem('TermIdRkCourses'):\n`
			response = memory.getItem('TermIdRkCourses')
			break;
		case 'memoryWorkingBackupObject':
			lineDox = ''
			dox += `≈194≈ memory.setItem('memoryWorkingBackupObject',JSON.stringify(allCoursesWorkingObject))\n`
			dox += `≈704≈ let allCoursesWorkingObject = JSON.parse(memory.getItem('memoryWorkingBackupObject'))\n`
			dox += `memory.getItem('memoryWorkingBackupObject'):\n`
			response = memory.getItem('memoryWorkingBackupObject')
			break;
		case 'memoryWorkingObject':
			lineDox = ''
			dox += `≈785≈ memory.setItem('memoryWorkingObject',JSON.stringify(filteredCourseBuffer))\n`
			dox += `memory.getItem('memoryWorkingObject'):\n`
			response = memory.getItem('memoryWorkingObject')
			break;
		case 'memoryParamObject':
			lineDox = ''
			dox += `≈794≈ memory.setItem('memoryParamObject', JSON.stringify(paramObjectFilterForm))\n`
			dox += `[the paramObject for the Filter Logic]\n`
			dox += `memory.getItem('memoryParamObject'):\n`
			response = memory.getItem('memoryParamObject')
			break;
		case 'memoryDoxObject':
			lineDox = ''
			dox += `≈812≈ let doxObject = JSON.parse(memory.getItem('memoryDoxObject'))\n`
			dox += `[probably DEPRECATED]\n`
			dox += `memory.getItem('memoryDoxObject'):\n`
			response = memory.getItem('memoryDoxObject')
			break;
	
		default:
			lineDox = ''
			dox = `Data Drop-Down Selection UNSUPPORTED:\n`
			response = $w('#kludgeDataDisplayDRPDN').value
			break;
	}
	dox = prefixDox + lineDox + dox +'\n\n'
	response = prefixResponse + response +'\n\n'
	$w('#developerDoxTXTBX').value = dox
	$w('#developerResponseTXTBX').value = response
}
//==================================================                 </KLUDGE Buttons Steps>
//==========================================================================================



//====================================================================================================
//====================================================================================================
//============================================================                      Buttons ONLY Below
//============================================================                      (and other Events)
//====================================================================================================
//==========================================================================================

//==================================================           <Selected-Course => StatsBox>
export function selectedCourseStatsBTTN_mouseIn(event) {
    $w('#statsDisplayCNTNRBX').show() 
}

export function selectedCourseStatsBTTN_mouseOut(event) {
$w('#statsDisplayCNTNRBX').hide() 
}
//==================================================          </Selected-Course => StatsBox>
//==========================================================================================

export function selectLocationBTN_click(event) {
	if($w('#regionLocationKeyINPUT').value.length > 0){
		$w('#regionLocationKeyINPUT').value = ''
		$w('#regionLocationINPUT').value = ''
		$w('#selectLocationBTN').label = 'Select Location'
		return
	}
	// $w('#selectLocationBTN').label = 'Toggle to All Locations'
	// ø CREATE_NEW_COURSE_±1_completeCourseForm_SCRIPTS
	if($w('#formLocationRPTR').collapsed === false){
		$w('#formLocationRPTR').collapse()
		return
	}
	let KLUDGE_newCourseDataObject = {}
	$w('#formLocationRPTR').expand()
	appendLocationsJsonDocDb(KLUDGE_newCourseDataObject)
}

export function formSelectLocationBTN_click(event) {
	let clickedItemData = processSelectCurriculum(event,'formSelectLocationBTN_click')
	console.log(`clickedItemData: [object below]`)
	console.dir(clickedItemData)
	$w('#regionLocationINPUT').value = clickedItemData.nameFull
	$w('#regionLocationKeyINPUT').value = clickedItemData.key
	$w('#formLocationRPTR').collapse()
	$w('#selectLocationBTN').label = 'Toggle to All Locations'
}

export function adminDispatchBTN_click(event) {
	// ø doKludge JUST FOR adminDispatch iterations...
	const wIdKldgeDoxTXTBX = '#developerTaskTXTBX'
	const wIdKldgeResponseTXTBX = '#developerResponseTXTBX'
	let KLUDGE = ''
	let step = KLUDGE
	let iso = '2008-01-20T12:00:00'
	iso = '2021-12-07T09:37:00'
	iso = '2021-12-07T10:53:00'
	iso = '2021-12-07T11:22:00'
	let descrArray = []
	let responseObject = {}
	let responseString = 'STRING'
		if(iso === '2021-12-07T09:37:00'){
			{
				KLUDGE = 'adminDispatch()'
				step = KLUDGE
				iso = '2021-12-07T09:37:00'
				descrArray = []
				KLUDGE = 'only defuaul parameter'
				descrArray.push(KLUDGE)
				KLUDGE = `import {adminDispatch} from 'public/adminDispatch.js'`
				descrArray.push(KLUDGE)
				KLUDGE = `paramObject.call: 'undefined''`
				descrArray.push(KLUDGE)
			// 	KLUDGE = `[below always last]`
				KLUDGE = iso
				descrArray.push(KLUDGE)
				KLUDGE = step + ':'
				descrArray.forEach(descrThis => {
					KLUDGE += '\n  - ' + descrThis
				});
				$w(wIdKldgeDoxTXTBX).value = KLUDGE
			}
			responseObject = adminDispatch()
			responseString = JSON.stringify(responseObject, undefined, 4)
		}
		if(iso === '2021-12-07T10:53:00'){
			{
				KLUDGE = 'adminDispatch(paramObject)'
				step = KLUDGE
				iso = '2021-12-07T10:53:00'
				descrArray = []
				KLUDGE = 'paramObject = {}'
				descrArray.push(KLUDGE)
				KLUDGE = `import {adminDispatch} from 'public/adminDispatch.js'`
				descrArray.push(KLUDGE)
				KLUDGE = `paramObject.call: 'undefined''`
				descrArray.push(KLUDGE)
			// 	KLUDGE = `[below always last]`
				KLUDGE = iso
				descrArray.push(KLUDGE)
				KLUDGE = step + ':'
				descrArray.forEach(descrThis => {
					KLUDGE += '\n  - ' + descrThis
				});
				$w(wIdKldgeDoxTXTBX).value = KLUDGE
			}
			let paramObject = {}
			responseObject = adminDispatch(paramObject)
			responseString = JSON.stringify(responseObject, undefined, 4)
		}
		if(iso === '2021-12-07T11:22:00'){
			let paramObject = {}
			paramObject.call = 'curriculumUpdatePeding'
			paramObject.liveDrupalCurriculaISO = '2021-12-07T11:22:00'
			paramObject.termCurriculaISO = '2021-12-07T11:22:00'
			paramObject.wixSourcedJSONCurriculaISO = '2021-12-07T11:22:00'
			{
				KLUDGE = 'adminDispatch(paramObject)'
				step = KLUDGE
				iso = '2021-12-07T11:22:00'
				descrArray = []
				KLUDGE = 'paramObject: call: ${call}'
				descrArray.push(KLUDGE)
				KLUDGE = 'paramObject: liveDrupalCurriculaISO: ${liveDrupalCurriculaISO}'
				descrArray.push(KLUDGE)
				KLUDGE = 'paramObject: termCurriculaISO: ${termCurriculaISO}'
				descrArray.push(KLUDGE)
				KLUDGE = 'paramObject: wixSourcedJSONCurriculaISO: ${wixSourcedJSONCurriculaISO}'
				descrArray.push(KLUDGE)
				KLUDGE = `import {adminDispatch} from 'public/adminDispatch.js'`
				descrArray.push(KLUDGE)
				KLUDGE = `paramObject.call: 'undefined''`
				descrArray.push(KLUDGE)
			// 	KLUDGE = `[below always last]`
				KLUDGE = iso
				descrArray.push(KLUDGE)
				KLUDGE = step + ':'
				descrArray.forEach(descrThis => {
					KLUDGE += '\n  - ' + descrThis
				});
				$w(wIdKldgeDoxTXTBX).value = KLUDGE
			}
			responseObject = adminDispatch(paramObject)
			responseString = JSON.stringify(responseObject, undefined, 4)
		}
		$w(wIdKldgeResponseTXTBX).value = responseString
		
}


export function kludgeToggleSelectedCourseStripBTTN_click(event) {
	if($w('#selectedCourseSTRP').collapsed) {
        $w('#selectedCourseSTRP').expand()
        $w('#selectedCoursseDescrSTRP').expand()
    } else {
        $w('#selectedCourseSTRP').collapse()
        $w('#selectedCoursseDescrSTRP').collapse()
    }
}
