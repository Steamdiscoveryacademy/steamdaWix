// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import {local, session, memory} from 'wix-storage';
import wixData from 'wix-data';
import wixWindow from 'wix-window';
import wixLocation from 'wix-location';
import {assignStringsOnReady} from 'public/buttonBlockModule.js'; 
import {btnblkToggleBTN_click} from 'public/buttonBlockModule.js'; 
import {btnblkDoBTN_click} from 'public/buttonBlockModule.js'; 
import {getDrupalURI} from 'backend/apiDrupalModule.jsw'; //FETCH || getDrupal || getJSON()
import {fetch} from 'wix-fetch'; //FETCH || getDrupal || getJSON()
import {getJSON} from 'wix-fetch'; //FETCH || getDrupal || getJSON()

$w.onReady(async function () {
	assignStringsOnReady([1,2,3],[1,2,3])
	await onReadyCurriculaJSON()
});
//==========================================================================================
//==================================================              <OnReady Called Functions>
export async function onReadyCurriculaJSON(){
	await load_reloadEntirePage()
}
function setUpOnReady(){
	
}

function cleanUpOnReady(){
	// Harmless to call _AS_ OnReady(), but really to call before Redirecting after change
	// ø <Memory Standard WiX-Storage>
	memory.setItem('memoryParamObject','')
	memory.setItem('memoryResponseObject','')
	memory.setItem('memoryWorkingObject','')
	memory.setItem('memoryWorkingBackupObject','')
	// ø </Memory Standard WiX-Storage>
	// ø <Memory Semi-Esoteric WiX-Storage>
	memory.setItem('memoryReversePointingObject','')
	memory.setItem('memoryWorkingObject_AFFIRMATIVE','')
	memory.setItem('memoryWorkingObject_NEGATIVE','')
	memory.setItem('memoryWorkingObject_PENDING','')
	// ø </Memory Semi-Esoteric WiX-Storage>
	console.log(`cleanUpOnReady(): was CALLED`)
}

//==================================================             </OnReady Called Functions>
//==========================================================================================

// ø <---------- <getSourcedJSON_byKeyPageByPage UTILITY>  ---------->
export async function getSourcedJSON_byKeyPageByPage(key) {
    // pstEnrSeven202108UTILITY SHORT
    let now = new Date();
    let nowISO = now.toISOString();
    let recordSourcedJSON = await wixData.query("sourcedJSON")
        .eq("key", key)
        .lt("versionStampTxt", nowISO)
        .descending("versionStampTxt")
        .limit(1)
        .find();
    // return JSON.stringify(recordSourcedJSON.items[0].jsonData);
    return recordSourcedJSON.items[0].jsonData
}
// ø <---------- </getSourcedJSON_byKeyPageByPage UTILITY> ---------->
//====================================================================================================
//==============================        <loadCurriculaRepeater>         ==============================
//====================================================================================================
export async function load_reloadEntirePage(kind = 'ONREADY'){
	// set lastTermNameTXT
	$w('#lastTermNameTXT').text = 'Curricula Selection for: ' + session.getItem('lastTermName')
	// FOR postCurriculaSelectionsUpdate()
	if(kind === 'POSTUPDATE') {
		$w('#updatesPendingCONTBX').collapse()
		let toUpdateCurriculumRecordId = session.getItem('termRecordId')
		let toUpdateCurriculumRecord = await wixData.get("term",toUpdateCurriculumRecordId )
	}
	// FOR onReadyCurriculaJSON()
	let termObject = JSON.parse(memory.getItem('memoryParamObject'))
	console.log(`termObject: [object below]`)
	console.dir(termObject)
	session.setItem('termRecordId',termObject._id)
	let curriculaBufferThis = JSON.stringify(termObject.curriculum.curricula)
	if(curriculaBufferThis.length < 300){
		let sourcedJSON_drupalCurricula = await getSourcedJSON_byKeyPageByPage('drupalCurricula')//JSON.stringify(FIELD)
		curriculaBufferThis = JSON.stringify(sourcedJSON_drupalCurricula.curricula)
	}
	memory.setItem('memoryWorkingObject', curriculaBufferThis)
	memory.setItem('memoryWorkingBackupObject',curriculaBufferThis)
	instantiatePageFromTermRecord()
}
export function instantiatePageFromTermRecord(){
//==========================================================================================
//==================================================     <Instantiate Page from Term Record>
	// ø <ParseCurriculaObjectArray into Three Repeater Sources>
	// ø ø <MAYBE ITS OWN FUNCTION>
	/*
				status = kvp[1]
			repeaterId = kvp[2]
			paginationId = kvp[3]
			prefixId = kvp[4]
	let repeaterFinal2dArray = [
		['maybe','0','#curriculaOndeckRPTR','#curriculaOndeckPGNTN','ondeck'],
		['yes','7','#curriculaSelectedRPTR','#curriculaSelectedPGNTN','selected'],
		['no','9','#curriculaRejectedRPTR','#curriculaRejectedPGNTN','rejected']
	]
	*/
	let yesObject = {}
	yesObject.key = 'yes'
	yesObject.status = '7'
	yesObject.repeaterId = '#curriculaSelectedRPTR'
	yesObject.paginationId = '#curriculaSelectedPGNTN'
	yesObject.prefixId = 'selected'
	yesObject.pageItemCount = 8
	yesObject.forcePaginationOffset = 0
	let noObject = {}
	noObject.key = 'no'
	noObject.status = '9'
	noObject.repeaterId = '#curriculaRejectedRPTR'
	noObject.paginationId = '#curriculaRejectedPGNTN'
	noObject.prefixId = 'rejected'
	noObject.pageItemCount = 8
	noObject.forcePaginationOffset = 0
	let maybeObject = {}
	maybeObject.key = 'maybe'
	maybeObject.status = '0'
	maybeObject.repeaterId = '#curriculaOndeckRPTR'
	maybeObject.paginationId = '#curriculaOndeckPGNTN'
	maybeObject.prefixId = 'ondeck'
	maybeObject.pageItemCount = 8
	maybeObject.forcePaginationOffset = 0
	// console.log('NOTE: maybeObject.pageItemCount will likely be the same, as in this instance, but not always')
	// console.log(`NOTE: use 'forcePaginationOffset' ONLY if the PaginationObject _cannot_ be counted on, especially at instantiation`)
	let fullCurriculaObjectArray = JSON.parse(memory.getItem('memoryWorkingObject'))
	let indexFromCurrIdObject = {}
	for (let indexFromId = 0; indexFromId < fullCurriculaObjectArray.length; indexFromId++) {
		const elementObject = fullCurriculaObjectArray[indexFromId];
		elementObject._id = elementObject.nid.toString()
		indexFromCurrIdObject[elementObject._id] = indexFromId
	}
	console.log(`fullCurriculaObjectArray: [array below]`)
	console.dir(fullCurriculaObjectArray)
	console.log(`indexFromCurrIdObject: [object below]`)
	console.dir(indexFromCurrIdObject)
	let yesCurriculaObjectArray = []
	let noCurriculaObjectArray = []
	let maybeCurriculaObjectArray = []
	for (let indexParseByStatus = 0; indexParseByStatus < fullCurriculaObjectArray.length; indexParseByStatus++) {
		const element = fullCurriculaObjectArray[indexParseByStatus];
		if(element.status === '7'){
			yesCurriculaObjectArray.push(element)
		}
		if(element.status === '9'){
			noCurriculaObjectArray.push(element)
		}
		
		if(element.status === '0'){
			maybeCurriculaObjectArray.push(element)
		}
	}
	yesObject.curriculaObjectArray = yesCurriculaObjectArray
	noObject.curriculaObjectArray = noCurriculaObjectArray
	maybeObject.curriculaObjectArray = maybeCurriculaObjectArray
	loadRepeaterByObject(yesObject)
	loadRepeaterByObject(noObject)
	loadRepeaterByObject(maybeObject)
	// console.log(`yesObject: [object below]`)
	// console.dir(yesObject)
	// console.log(`noObject: [object below]`)
	// console.dir(noObject)
	// console.log(`maybeObject: [object below]`)
	// console.dir(maybeObject)
	// ø ø <MEMORY ASSIGNMENTS>
	memory.setItem('memoryReversePointingObject', JSON.stringify(indexFromCurrIdObject))
	memory.setItem('memoryWorkingObject_AFFIRMATIVE',JSON.stringify(yesObject))
	memory.setItem('memoryWorkingObject_NEGATIVE',JSON.stringify(noObject))
	memory.setItem('memoryWorkingObject_PENDING',JSON.stringify(maybeObject))
	// ø ø </MEMORY ASSIGNMENTS>
	// $w('#developerResponseTXTBX').value = JSON.stringify($w(yesObject.paginationId),undefined,4)
	// ø ø </MAYBE ITS OWN FUNCTION>
	// ø </ParseCurriculaObjectArray into Three Repeater Sources>
//==================================================    </Instantiate Page from Term Record>
//==========================================================================================
}
//==========================================================================================
//==================================================  <loadRepeaterByObject(repeaterObject)>
function loadRepeaterByObject(repeaterObject = {}){
	if(typeof repeaterObject === 'object' && Array.isArray(repeaterObject) === false){
		let aliasKeys = Object.keys(repeaterObject)
		if(aliasKeys.length === 1 && aliasKeys[0] === 'alias'){
			// console.log(`loadRepeaterByObject: repeaterObject: [object below]`)
			// console.dir(repeaterObject)
			let alias = repeaterObject.alias
			if(alias === 'yes'){
				repeaterObject = JSON.parse(memory.getItem('memoryWorkingObject_AFFIRMATIVE'))
				// console.log(`repeaterObject: maybe: memoryWorkingObject_AFFIRMATIVE: [object below]`)
				// console.dir(repeaterObject)
			}
			if(alias === 'maybe'){
				repeaterObject = JSON.parse(memory.getItem('memoryWorkingObject_PENDING'))
				// console.log(`repeaterObject: maybe: memoryWorkingObject_PENDING: [object below]`)
				// console.dir(repeaterObject)
			}
			if(alias === 'no'){
				repeaterObject = JSON.parse(memory.getItem('memoryWorkingObject_NEGATIVE'))
				// console.log(`repeaterObject: maybe: memoryWorkingObject_PENDING: [object below]`)
				// console.dir(repeaterObject)
			}
		}
	}
	// console.groupCollapsed(`loadRepeaterByObject(repeaterObject = {})`)
	// console.group(`loadRepeaterByObject(repeaterObject = {})`)
	let areValidParameters = true
	repeaterObject.notes = []
	repeaterObject.notes.push('VALIDATION Is Pending')
	if(!areValidParameters){
		// return repeaterObject
		return
	}
	// let paginationObject = $w(repeaterObject.paginationId)
	// repeaterObject.notes.push('Pagination as Attribute for DEVEL remove eventually')
	repeaterObject.notes.push(`'forcePaginationOffset' Attribute will be destroyed as soon as it is utilized`)
	repeaterObject.notes.push(`'forcePaginationOffset' ONLY used if the PaginationObject _cannot_ be counted on [100?,3?], especially at instantiation`)
	// repeaterObject.paginationObject = paginationObject

	// let statusCurriculaObjectArray = JSON.parse(memory.getItem('memoryWorkingObject'))



	// console.log(`loadRepeaterByObject(${repeaterObject.key}Object): `)
	// console.dir(repeaterObject)
	let pageItemCount = 8
	if($w(repeaterObject.paginationId).totalPages === 100){
		$w(repeaterObject.paginationId).currentPage = 1
		$w(repeaterObject.paginationId).totalPages = Math.ceil(repeaterObject.curriculaObjectArray.length / pageItemCount);
		// console.log(`$w(repeaterObject.paginationId): [object below]`)
		// console.dir($w(repeaterObject.paginationId))
	}
	repeaterObject.currentPagination = {}
	repeaterObject.currentPagination.totalPages = $w(repeaterObject.paginationId).totalPages
	repeaterObject.currentPagination.currentPage = $w(repeaterObject.paginationId).currentPage
	let pageIndex = $w(repeaterObject.paginationId).currentPage - 1
	let offset = pageIndex * pageItemCount
	repeaterObject.currentPagination.pageIndex = pageIndex
	repeaterObject.currentPagination.offset = offset

	// let DOX = `@ToDO: rename 'curriculaObjectArray' to 'repeaterCurriculaObjectArray'`
	// // let index_id = 0
	// // let done = false
	// let repeaterCurriculaObjectArray = []
	// for (let rptrIndex = offset ; rptrIndex < pageItemCount + offset; rptrIndex++) {
	// 	const element = statusCurriculaObjectArray[rptrIndex];
	// 	// element._id = index_id
	// 	repeaterCurriculaObjectArray.push(element)	
	// 	// index_id++
	// }
	// console.log(`repeaterCurriculaObjectArray: `)
	// console.dir(repeaterCurriculaObjectArray)

	let repeaterCurriculaObjectArray = []
	for (let rptrIndex = offset ; rptrIndex < pageItemCount + offset; rptrIndex++) {
		const element = repeaterObject.curriculaObjectArray[rptrIndex];
		if(typeof element !== 'undefined'){
			repeaterCurriculaObjectArray.push(element)	
		}
	}
	// if (repeaterObject.currentPagination.totalPages === repeaterObject.currentPagination.currentPage) {
	// 	console.log(`repeaterCurriculaObjectArray: Last-Page: [array below]`)
	// 	console.dir(repeaterCurriculaObjectArray)
	// }

	// $w(repeaterId).data = curriculaObjectArray;
	let keyTXTid = '#'+ repeaterObject.prefixId + 'KeyTXT'
	let nameTXTid = '#'+ repeaterObject.prefixId + 'NameTXT'

	$w(repeaterObject.repeaterId).data = repeaterCurriculaObjectArray;
	console.log(`$w(repeaterId).data: $w(${repeaterObject.repeaterId}).data:`)
	console.dir($w(repeaterObject.repeaterId).data)
	$w(repeaterObject.repeaterId).onItemReady( ($curriculumElement, curriculumElementData, index) => {
		$curriculumElement(keyTXTid).text = curriculumElementData.textKey;
		$curriculumElement(nameTXTid).text = curriculumElementData.name;
	});

	// console.log(`groupEnd: loadRepeaterByObject(repeaterObject = {})`)
	// console.groupEnd()
}
//================================================== </loadRepeaterByObject(repeaterObject)>
//==========================================================================================

export function loadCurriculaRepeater(simpleParam = 'default'){
	let supportedSimpleParam = ['maybe','yes','no']
	simpleParam = supportedSimpleParam.includes(simpleParam) ? simpleParam : 'maybe'
	let status = '777'
	let repeaterId = 'repeaterIdHOLDER'
	let paginationId = 'paginationIdHOLDER'
	let prefixId = 'prefixIdHOLDER'
	let repeaterFinal2dArray = [['maybe','0','#curriculaOndeckRPTR','#curriculaOndeckPGNTN','ondeck'],['yes','7','#curriculaSelectedRPTR','#curriculaSelectedPGNTN','selected'],['no','9','#curriculaRejectedRPTR','#curriculaRejectedPGNTN','rejected']]

	for (let index = 0; index < supportedSimpleParam.length; index++) {
		const key = supportedSimpleParam[index];
		const kvp = repeaterFinal2dArray[index];
		if(key === simpleParam){
			status = kvp[1]
			repeaterId = kvp[2]
			paginationId = kvp[3]
			prefixId = kvp[4]
		}
		
	}

	let fullCurriculaObjectArray = JSON.parse(memory.getItem('memoryWorkingObject'))
	let curriculaObjectArray = [];
	let totalCount = 0
	let count = 0
	let pageIndex = 0
	let page = pageIndex + 1
	let pageItemCount = 8
	let offset = pageIndex * pageItemCount
	let totalPages = Math.ceil(totalCount / pageItemCount)
	let paginationObject = {}

	paginationObject.simpleParam = simpleParam
	paginationObject.status = status
	paginationObject.repeaterId = repeaterId
	paginationObject.prefixId = prefixId
	
	paginationObject.pageIndex = pageIndex
	paginationObject.page = page
	paginationObject.pageItemCount = pageItemCount
	paginationObject.offset = offset
	paginationObject.totalPages = totalPages
	let DEVEL_MAX = 6
	let done = false
	fullCurriculaObjectArray.forEach(elementObject => {
		done = count >= pageItemCount ? true : done
		if(elementObject.status === status){
			totalCount++
			if(!done){
				elementObject._id = elementObject.nid.toString()
				curriculaObjectArray.push(elementObject)
				count++
			}
		}
	});
	paginationObject.totalCount = totalCount
	paginationObject.pageItemCountThisPage = count

	$w(repeaterId).data = curriculaObjectArray;
	let keyTXTid = '#'+ prefixId + 'KeyTXT'
	let nameTXTid = '#'+ prefixId + 'NameTXT'
	$w(repeaterId).onItemReady( ($curriculumElement, curriculumElementData, index) => {
		$curriculumElement(keyTXTid).text = curriculumElementData.textKey;
		$curriculumElement(nameTXTid).text = curriculumElementData.name;
	});

	return paginationObject
}
//====================================================================================================
//==============================        </loadCurriculaRepeater>        ==============================
//====================================================================================================

//====================================================================================================
//==============================       <Process CurriculaRepeater>      ==============================
//====================================================================================================
//====================================================================================================
export function processYesMaybeNoForSix(event,scriptName){
	scriptName = scriptName.toLowerCase()
	let repeaterId = scriptName.includes('ondeck') ? 'ondeck' : 'pending'
	repeaterId = scriptName.includes('selected') ? 'selected' : repeaterId
	repeaterId = scriptName.includes('rejected') ? 'rejected' : repeaterId
	let repeaterFinal2dArray = [['ondeck','#curriculaOndeckRPTR'],['selected','#curriculaSelectedRPTR'],['rejected','#curriculaRejectedRPTR']]
	repeaterFinal2dArray.forEach(kvp => {
		const key = kvp[0]
		if(key === repeaterId){
			repeaterId = kvp[1]
		}
	});
	let statusChangeTo = scriptName.includes('yes') ? '7' : 'pending'
	statusChangeTo = scriptName.includes('maybe') ? '0' : statusChangeTo
	statusChangeTo = scriptName.includes('no') ? '9' : statusChangeTo

	const data = $w(repeaterId).data;
    let clickedItemData = data.find(item => item._id === event.context.itemId);
	let bufferIndex = clickedItemData.repeaterDataArrayIndex;
	let toModifyBuffer = JSON.parse(memory.getItem('memoryWorkingObject'))
	toModifyBuffer[bufferIndex].status = statusChangeTo
	memory.setItem('memoryWorkingObject', JSON.stringify(toModifyBuffer))

	// loadAllCurriculaRepeaters()
}
//====================================================================================================
//==============================       </Process CurriculaRepeater>     ==============================
//====================================================================================================

//====================================================================================================
//==============================      <Post Curricula Selections Update>      ========================
//====================================================================================================
export async function postCurriculaSelectionsUpdate(){
	let updateCurricula = JSON.parse(memory.getItem('memoryWorkingObject'))
	let toUpdateCurriculumRecordId = session.getItem('termRecordId')
	let toUpdateCurriculumRecord = await wixData.get("term",toUpdateCurriculumRecordId )
	toUpdateCurriculumRecord.curriculum.curricula = updateCurricula
	await wixData.save("term", toUpdateCurriculumRecord)
	// ø <cleanup>
	// session.setItem('curriculaBuffer','')
	cleanUpOnReady()
	// ø </cleanup>

	wixLocation.to("/term-building")
	return
	await load_reloadEntirePage('POSTUPDATE')
}
//====================================================================================================
//==============================      </Post Curricula Selections Update>     ========================
//====================================================================================================


//====================================================================================================
//====================================================================================================
//==============================           Buttons ONLY Below           ==============================
//==============================           (and other Events)           ==============================
//====================================================================================================

export function btnblkToggle1BTN_click(event) {
	btnblkToggleBTN_click('btnblkToggle1BTN_click(event)')
}

export function btnblkToggle2BTN_click(event) {
	btnblkToggleBTN_click('btnblkToggle2BTN_click(event)')
}

export function btnblkToggle3BTN_click(event) {
	btnblkToggleBTN_click('btnblkToggle3BTN_click(event)')
}

export function btnblkDo1BTN_click(event) {
	btnblkDoBTN_click('btnblkDo1BTN_click(event)')
}

export function btnblkDo2BTN_click(event) {
	cleanUpOnReady()
	btnblkDoBTN_click('btnblkDo2BTN_click(event)')
}

export function btnblkDo3BTN_click(event) {
	cleanUpOnReady()
	btnblkDoBTN_click('btnblkDo3BTN_click(event)')
}
//====================================================================================================
//=================            SIX Yes-Maybe-No Curricula SelectionButtons           =================
//=================            {one of each group will always be disabled}           =================
//====================================================================================================
// ø <---------- <On-Deck Curricula Selection Repeater Buttons>  ---------->

export function ondeckYesBTN_DELETEME_click(event) {
	let scriptName = 'ondeckYesBTN_click'
	processYesMaybeNoForSix(event,scriptName)
}
// ø <---------- </On-Deck Curricula Selection Repeater Buttons> ---------->

export function ondeckYesBTN_click(event) {
	let scriptName = 'ondeckYesBTN_click(event)'
	processYesMaybeNoForSix(event,scriptName)
}

export function ondeckNoBTN_click(event) {
	let scriptName = 'ondeckNoBTN_click(event)'
	processYesMaybeNoForSix(event,scriptName)
}

export function rejectedYesBTN_click(event) {
	let scriptName = 'rejectedYesBTN_click(event)'
	processYesMaybeNoForSix(event,scriptName)
}

export function rejectedMaybeBTN_click(event) {
	let scriptName = 'rejectedMaybeBTN_click(event)'
	processYesMaybeNoForSix(event,scriptName)
}

export function selectedMaybeBTN_click(event) {
	let scriptName = 'selectedMaybeBTN_click(event)'
	processYesMaybeNoForSix(event,scriptName)
}

export function selectedNoBTN_click(event) {
	let scriptName = 'selectedNoBTN_click(event)'
	processYesMaybeNoForSix(event,scriptName)
}

//====================================================================================================
//=================            SIX Yes-Maybe-No Curricula SelectionButtons           =================
//====================================================================================================

export async function updatesTermCurriculaBTN_click(event) {
	await postCurriculaSelectionsUpdate()
}

export function stateRejectedTabBTN_click(event) {
	$w("#CurriculaStateMBOX").changeState("Rejected");
	$w("#CurriculaPaginationMBOX").changeState("RejectedPagination");
	$w("#stateOndeckTabBTN").enable()
	$w("#stateRejectedTabBTN").disable()
}

export function stateOndeckTabBTN_click(event) {
	$w("#CurriculaStateMBOX").changeState("OnDeck");
	$w("#CurriculaPaginationMBOX").changeState("OnDeckPagination");
	$w("#stateOndeckTabBTN").disable()
	$w("#stateRejectedTabBTN").enable()
}

export function button14_click(event) {
	$w("#BannerStateBox").changeState('Three');
 
}

export function getLastParamObjectBTN_click(event) {
	$w('#developerResponseTXTBX').value = memory.getItem('memoryParamObject')
}

export function curriculaOndeckPGNTN_click(event) {
	let aliasObject = {}
	aliasObject.alias = 'maybe'
	// console.log(`aliasObject: [object below]`)
	// console.dir(aliasObject)
	loadRepeaterByObject(aliasObject)
}

export function curriculaSelectedPGNTN_click(event) {
	let aliasObject = {}
	aliasObject.alias = 'yes'
	// console.log(`aliasObject: [object below]`)
	// console.dir(aliasObject)
	loadRepeaterByObject(aliasObject)
}

export function curriculaRejectedPGNTN_click(event) {
	let aliasObject = {}
	aliasObject.alias = 'yes'
	// console.log(`aliasObject: [object below]`)
	// console.dir(aliasObject)
	loadRepeaterByObject(aliasObject)
}