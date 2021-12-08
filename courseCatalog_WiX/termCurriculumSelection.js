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
	// await develRandomOnReady()
	// return
	// await develResetOnReady()
	// return
	await onReadyCurriculaJSON()

});
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

export async function develRandomOnReady(){
	let doRandomize = true
	console.groupCollapsed(`develRandomOnReady()`)
	let termObject = JSON.parse(local.getItem('lastParamObject'))
	// ø <randomize Status>
	console.groupCollapsed(`block: randomize Status`)
	let randomValueArray = ['0','0','0','7','9']
	let randomValueThis = '0'
	console.log(`|BeginLoop|`)
		for (let index = 0; index < termObject.curriculum.curricula.length; index++) {
			const elementObject = termObject.curriculum.curricula[index];
			if(doRandomize){
				randomValueThis = randomValueArray[Math.floor(Math.random() * randomValueArray.length)]
				console.log(`random: randomValueThis: ${randomValueThis}`)
				randomValueThis = index === 0 ? '0' : randomValueThis
				randomValueThis = index === 1 ? '7' : randomValueThis
				randomValueThis = index === 2 ? '9' : randomValueThis
				console.log(`forced: randomValueThis: ${randomValueThis}`)
			}
			elementObject.status = randomValueThis
			console.log(`elementObject.status: ${elementObject.status}`)
		}
	console.log(`|EndLoop|`)
	console.log(`randomized: termObject.curriculum.curricula`)
	console.dir(termObject.curriculum.curricula)
	session.setItem('lastParamObject',JSON.stringify(termObject))
	console.log(`session.getItem('lastParamObject'): [see below]`)
	console.log(session.getItem('lastParamObject'))
	console.groupEnd()
	// ø </randomize Status>
	// $w('#txareaCodeBlock').value = JSON.stringify(termObject,undefined,4)
	// $w('#currRepeaterSourceTXBX').value = JSON.stringify(termObject.curriculum.curricula,undefined,4)
	session.setItem('curriculaBuffer',JSON.stringify(termObject.curriculum.curricula))
	console.log(`session.getItem('curriculaBuffer: [see below]')`)
	console.log(session.getItem('curriculaBuffer'))
	session.setItem('curriculaBufferNOCHANGE',JSON.stringify(termObject.curriculum.curricula))
	// await wixWindow.copyToClipboard($w('#txareaCodeBlock').value)
	// $w('#whoWeAreANCHR').scrollTo()
	console.groupEnd()
	return //OOAAOC
}
export async function develResetOnReady(){
	let doRandomize = false
	console.groupCollapsed(`develResetOnReady()`)
	let termObject = JSON.parse(local.getItem('lastParamObject'))
	// ø <randomize Status>
	console.groupCollapsed(`block: randomize Status`)
	let randomValueArray = ['0','0','0','7','9']
	let randomValueThis = '0'
	console.log(`|BeginLoop|`)
		for (let index = 0; index < termObject.curriculum.curricula.length; index++) {
			const elementObject = termObject.curriculum.curricula[index];
			elementObject.status = randomValueThis
			console.log(`elementObject.status: ${elementObject.status}`)
		}
	console.log(`|EndLoop|`)
	console.log(`reset: termObject.curriculum.curricula`)
	console.dir(termObject.curriculum.curricula)
	await wixData.save("term", termObject)
	console.log(`await wixData.save("term", termObject)`)
	console.groupEnd()
	return
}
export async function onReadyCurriculaJSON(){
	await load_reloadEntirePage()
}
//====================================================================================================
//==============================        <loadCurriculaRepeater>         ==============================
//====================================================================================================
export async function load_reloadEntirePage(kind = 'ONREADY'){
	// set lastTermNameTXT
	$w('#lastTermNameTXT').text = 'Curricula Selection for: ' + session.getItem('lastTermName')
	// FOR postCurriculaSelectionsUpdate()
	if(kind === 'POSTUPDATE') {
		console.groupCollapsed(`if(kind === 'POSTUPDATE'): if(${kind} === 'POSTUPDATE')`)
		$w('#updatesPendingCONTBX').collapse()
		let toUpdateCurriculumRecordId = session.getItem('termRecordId')
		console.log(`toUpdateCurriculumRecordId: ${toUpdateCurriculumRecordId}`)
		let toUpdateCurriculumRecord = await wixData.get("term",toUpdateCurriculumRecordId )
		console.log(`current: toUpdateCurriculumRecord: [object below] `)
		console.dir(toUpdateCurriculumRecord)
		// session.setItem('lastParamObject', JSON.stringify(toUpdateCurriculumRecord))
		session.setItem('lastParamObject', JSON.stringify(toUpdateCurriculumRecord,undefined,4))
		console.log(`current: toUpdateCurriculumRecord: [object below] `)
		console.dir(toUpdateCurriculumRecord)
		console.groupEnd()

	}
	// FOR onReadyCurriculaJSON()
	// console.groupCollapsed(`onReadyCurriculaJSON()`)
	let termObject = JSON.parse(local.getItem('lastParamObject'))
	// console.log(`termObject: [object below]`)
	// console.dir(termObject)
	// console.log(`termObject._id: ${termObject._id}`)
	// console.groupEnd()
	session.setItem('termRecordId',termObject._id)
	console.log(`session.getItem('termRecordId') ${session.getItem('termRecordId')}`)
	let curriculaBufferThis = JSON.stringify(termObject.curriculum.curricula)
	console.log(`curriculaBufferThis.length: ${curriculaBufferThis.length}`)
	if(curriculaBufferThis.length < 300){
		// curriculaBufferThis = `[{"name":"Test Kitchen","textKey":"TESTKITCH","abbrvName":"Test Kitchen","isoLastUpdate":"2021-11-09T17:06:33+0000","status":"0","counter":82,"repeaterDataArrayIndex":81,"nid":"3363"},{"name":"Art of Theater","textKey":"THEATER","abbrvName":"Theater","isoLastUpdate":"2021-11-08T16:21:44+0000","status":"0","counter":83,"repeaterDataArrayIndex":82,"nid":"19"},{"name":"Toy Inventing and Woodworking","textKey":"TOYWOOD","abbrvName":"TOYINVENTWOOD","isoLastUpdate":"2021-11-09T17:06:45+0000","status":"0","counter":85,"repeaterDataArrayIndex":84,"nid":"3330"},{"name":"Weather","textKey":"WEATHER","abbrvName":"Weather","isoLastUpdate":"2021-11-09T17:07:17+0000","status":"0","counter":89,"repeaterDataArrayIndex":88,"nid":"1225"},{"name":"Wildlife and Dissection","textKey":"WILDDISC","abbrvName":false,"isoLastUpdate":"2021-11-09T17:09:31+0000","status":"0","counter":90,"repeaterDataArrayIndex":89,"nid":"1226"},{"name":"Woodworking","textKey":"WOODWORKING","abbrvName":"Woodw","isoLastUpdate":"2021-11-09T17:07:33+0000","status":"0","counter":95,"repeaterDataArrayIndex":94,"nid":"47"}]`
		let sourcedJSON_drupalCurricula = await getSourcedJSON_byKeyPageByPage('drupalCurricula')//JSON.stringify(FIELD)
		// console.log(`sourcedJSON_drupalCurricula.curricula: [array below]`)
		// console.log(sourcedJSON_drupalCurricula)
		// console.dir(sourcedJSON_drupalCurricula.curricula)
		curriculaBufferThis = JSON.stringify(sourcedJSON_drupalCurricula.curricula)
	}
	// console.log(`curriculaBufferThis: [array below]`)
	// console.dir(curriculaBufferThis)
	// session.setItem('curriculaBuffer',JSON.stringify(curriculaBufferThis))
	// session.setItem('curriculaBufferNOCHANGE',JSON.stringify(termObject.curriculum.curricula))
	session.setItem('curriculaBuffer', curriculaBufferThis)
	session.setItem('curriculaBufferNOCHANGE',curriculaBufferThis)
	loadAllCurriculaRepeaters()
}
export function loadAllCurriculaRepeaters(){
	// ø <Tasks Upon any loadCurricularRepeater>
	if(session.getItem('curriculaBuffer') !== session.getItem('curriculaBufferNOCHANGE')){
		$w('#updatesPendingCONTBX').expand()
	}
	// ø </Tasks Upon any loadCurricularRepeater>
	// loadCurriculaRepeater()
	// let simpleParamArray = ['maybe']
	// let simpleParamArray = ['maybe','yes']
	let simpleParamArray = ['maybe','yes','no']
	// let activeRepeaterIdArray = ['#curriculaOndeckRPTR']
	// let activeRepeaterIdArray = ['#curriculaOndeckRPTR','#curriculaSelectedRPTR']
	// let activeRepeaterIdArray = ['#curriculaOndeckRPTR','#curriculaSelectedRPTR','#curriculaRejectedRPTR']
	// let activeRepeaterStatusArray = ['0']
	// let activeRepeaterStatusArray = ['0','7']
	// let activeRepeaterStatusArray = ['0','7','9']
	// for (let index = 0; index < activeRepeaterIdArray.length; index++) {
	// 	const repeaterId = activeRepeaterIdArray[index];
	// 	const status = activeRepeaterStatusArray[index];
	// 	// loadCurriculaRepeater(repeaterId, status)
	// 	loadCurriculaRepeater(repeaterId)
	// }
	let paginationObject = {}
	let paginationObjectThis = {}
	let fullCurriculaObjectArray = JSON.parse(session.getItem('curriculaBuffer'))
	// console.log(`fullCurriculaObjectArray: [array below]`)
	// console.dir(fullCurriculaObjectArray)
	// let KLUDGE = '<KLUDGE: Exit Early>'
	// return

	paginationObject.totalCountAllCurricula = fullCurriculaObjectArray.length
	// let totalCount = 0
	let paginationObjectArray = []
	for (let index = 0; index < simpleParamArray.length; index++) {
		// const repeaterId = simpleParamArray[index];
		const simpleParam = simpleParamArray[index];
		// const status = activeRepeaterStatusArray[index];
		// loadCurriculaRepeater(repeaterId, status)
		// loadCurriculaRepeater(repeaterId)
		paginationObjectThis = loadCurriculaRepeater(simpleParam)
		paginationObjectArray.push(paginationObjectThis)
	}
	paginationObject.paginationObjectArray = paginationObjectArray
	$w('#txareaCodeBlock').value = JSON.stringify(paginationObject,undefined,4)
}
export function loadCurriculaRepeater(simpleParam = 'default'){
// export function loadCurriculaRepeater(repeaterId = 'default', status = '0'){
	// console.group(`loadCurriculaRepeater(repeaterId = 'default', status = '0')`)
	console.group(`loadCurriculaRepeater(${simpleParam} = 'default')`)
	// console.log(`param: repeaterId: ${repeaterId}`)
	// console.log(`param: status: ${status}`)

	// let supportedRepeaterValues = ['maybe','yes','no']
	// let supportedPrefixValues = ['ondeck','selected','rejected']
	let supportedSimpleParam = ['maybe','yes','no']
	// repeaterId = supportedRepeaterValues.includes(repeaterId) ? repeaterId : 'maybe'
	simpleParam = supportedSimpleParam.includes(simpleParam) ? simpleParam : 'maybe'
	let status = '777'
	let repeaterId = 'repeaterIdHOLDER'
	let paginationId = 'paginationIdHOLDER'
	let prefixId = 'prefixIdHOLDER'
	console.log(`supported: simpleParam: ${simpleParam}`)
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

	// repeaterFinal2dArray.forEach(kvp => {
	// 	const key = kvp[0]
	// 	if(key === simpleParam){
	// 		status = kvp[1]
	// 		repeaterId = kvp[2]
	// 		prefixId = kvp[3]
	// 	}
	// });
	console.log(`final: simpleParam: ${simpleParam}`)
	console.log(`final: status: ${status}`)
	console.log(`final: repeaterId: ${repeaterId}`)
	console.log(`final: paginationId: ${paginationId}`)
	console.log(`final: prefixId: ${prefixId}`)
	// return
	
	// let supportedStatusrValues = ['0','7','9']
	// status = supportedStatusrValues.includes(status) ? status : '0'
	// console.log(`supported: status: ${status}`)

	let fullCurriculaObjectArray = JSON.parse(session.getItem('curriculaBuffer'))
	console.log(`fullCurriculaObjectArray: [array below]`)
	console.dir(fullCurriculaObjectArray)
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
		// done = index_id >= DEVEL_MAX ? true : false
		done = count >= pageItemCount ? true : done
		if(elementObject.status === status){
			totalCount++
			if(!done){
				// elementObject._id = index_id.toString()
				elementObject._id = elementObject.nid.toString()
				curriculaObjectArray.push(elementObject)
				count++
			}
		}
	});
	paginationObject.totalCount = totalCount
	paginationObject.pageItemCountThisPage = count
	console.log(`curriculaObjectArray: `)
	console.dir(curriculaObjectArray)




	// return
	console.groupCollapsed(`rptr load iteration: repeaterId: ${repeaterId}`)
	$w(repeaterId).data = curriculaObjectArray;
	console.log(`$w(repeaterId).data: $w(${repeaterId}).data:`)
	console.dir($w(repeaterId).data)
	let keyTXTid = '#'+ prefixId + 'KeyTXT'
	let nameTXTid = '#'+ prefixId + 'NameTXT'
	$w(repeaterId).onItemReady( ($curriculumElement, curriculumElementData, index) => {
		// $courseElement._id = index.toString();
		$curriculumElement(keyTXTid).text = curriculumElementData.textKey;
		$curriculumElement(nameTXTid).text = curriculumElementData.name;
		// $courseElement('#btnCourseAbbrvButton').label = courseElementData.courseAbrrv;
		// // $courseElement('#imgCourse').src = courseElementData.image;
		// $courseElement('#txtWeek').text = courseElementData.week;
		// $courseElement('#txtGradeLevel').text = courseElementData.gradeLevel;
		// // $courseElement('#txtLocation').html = `<span style="${elementStyle}"><a href="${courseElementData.wikiBreed}" target="_blank">${courseElementData.visibleBreed}</a></span>`;
		// $courseElement('#txtLocation').text = courseElementData.location;
		// $courseElement('#txtId').text = `[${courseElementData._id}]`;
	});

	console.log(`groupEnd: rptr load iteration: repeaterId: ${repeaterId}`)
	console.groupEnd()

	console.log(`groupEnd: loadCurriculaRepeater(${simpleParam} = 'default')`)
	console.groupEnd()
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
	console.group(`processYesMaybeNoForSix(scriptname)`)
	// console.log(`$item:`)
	// console.dir($item)
	console.log(`scriptName: ${scriptName}`)
	scriptName = scriptName.toLowerCase()
	console.log(`scriptName: ${scriptName}`)
	let repeaterId = scriptName.includes('ondeck') ? 'ondeck' : 'pending'
	repeaterId = scriptName.includes('selected') ? 'selected' : repeaterId
	repeaterId = scriptName.includes('rejected') ? 'rejected' : repeaterId
	console.log(`inferred from scriptName: repeaterId: ${repeaterId}`)
	let repeaterFinal2dArray = [['ondeck','#curriculaOndeckRPTR'],['selected','#curriculaSelectedRPTR'],['rejected','#curriculaRejectedRPTR']]
	repeaterFinal2dArray.forEach(kvp => {
		const key = kvp[0]
		if(key === repeaterId){
			repeaterId = kvp[1]
		}
	});
	console.log(`final: repeaterId: ${repeaterId}`)
	let statusChangeTo = scriptName.includes('yes') ? '7' : 'pending'
	statusChangeTo = scriptName.includes('maybe') ? '0' : statusChangeTo
	statusChangeTo = scriptName.includes('no') ? '9' : statusChangeTo
	console.log(`inferred from scriptName: statusChangeTo: ${statusChangeTo}`)

	const data = $w(repeaterId).data;
	console.log(`data`)
	console.dir(data)
    let clickedItemData = data.find(item => item._id === event.context.itemId);
	console.log(`clickedItemData:`)
	console.dir(clickedItemData)
	let bufferIndex = clickedItemData.repeaterDataArrayIndex;
	console.log(`bufferIndex: ${bufferIndex}`)
	let toModifyBuffer = JSON.parse(session.getItem('curriculaBuffer'))
	console.log(`current: toModifyBuffer:`)
	console.dir(toModifyBuffer)
	toModifyBuffer[bufferIndex].status = statusChangeTo
	console.log(`ready for UPDATE: toModifyBuffer:`)
	console.dir(toModifyBuffer)
	session.setItem('curriculaBuffer', JSON.stringify(toModifyBuffer))

	loadAllCurriculaRepeaters()



	console.groupEnd()
}
//====================================================================================================
//==============================       </Process CurriculaRepeater>     ==============================
//====================================================================================================

//====================================================================================================
//==============================      <Post Curricula Selections Update>      ========================
//====================================================================================================
export async function postCurriculaSelectionsUpdate(){
	console.groupCollapsed(`postCurriculaSelectionsUpdate()`)
	let updateCurricula = JSON.parse(session.getItem('curriculaBuffer'))
	console.log(`updateCurricula: [object below] `)
	console.dir(updateCurricula)
	let toUpdateCurriculumRecordId = session.getItem('termRecordId')
	console.log(`toUpdateCurriculumRecordId: ${toUpdateCurriculumRecordId}`)
	let toUpdateCurriculumRecord = await wixData.get("term",toUpdateCurriculumRecordId )
	console.log(`current: toUpdateCurriculumRecord: [object below] `)
	console.dir(toUpdateCurriculumRecord)
	toUpdateCurriculumRecord.curriculum.curricula = updateCurricula
	console.log(`up-to-date: toUpdateCurriculumRecord: [object below] `)
	console.dir(toUpdateCurriculumRecord)
	await wixData.save("term", toUpdateCurriculumRecord)
	console.groupEnd()
	// ø <cleanup>
	session.setItem('curriculaBuffer','')
	// session.setItem('termRecordId','')
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

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function btnblkToggle3BTN_click(event) {
	btnblkToggleBTN_click('btnblkToggle3BTN_click(event)')
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}

export function btnblkDo1BTN_click(event) {
	btnblkDoBTN_click('btnblkDo1BTN_click(event)')
}

export function btnblkDo2BTN_click(event) {
	btnblkDoBTN_click('btnblkDo2BTN_click(event)')
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function btnblkDo3BTN_click(event) {
	btnblkDoBTN_click('btnblkDo3BTN_click(event)')
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
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
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}

export function ondeckNoBTN_click(event) {
	let scriptName = 'ondeckNoBTN_click(event)'
	processYesMaybeNoForSix(event,scriptName)
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}

export function rejectedYesBTN_click(event) {
	let scriptName = 'rejectedYesBTN_click(event)'
	processYesMaybeNoForSix(event,scriptName)
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}

export function rejectedMaybeBTN_click(event) {
	let scriptName = 'rejectedMaybeBTN_click(event)'
	processYesMaybeNoForSix(event,scriptName)
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}

export function selectedMaybeBTN_click(event) {
	let scriptName = 'selectedMaybeBTN_click(event)'
	processYesMaybeNoForSix(event,scriptName)
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}

export function selectedNoBTN_click(event) {
	let scriptName = 'selectedNoBTN_click(event)'
	processYesMaybeNoForSix(event,scriptName)
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}

//====================================================================================================
//=================            SIX Yes-Maybe-No Curricula SelectionButtons           =================
//====================================================================================================


/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export async function updatesTermCurriculaBTN_click(event) {
	await postCurriculaSelectionsUpdate()
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function stateRejectedTabBTN_click(event) {
	$w("#CurriculaStateMBOX").changeState("Rejected");
	$w("#CurriculaPaginationMBOX").changeState("RejectedPagination");
	$w("#stateOndeckTabBTN").enable()
	$w("#stateRejectedTabBTN").disable()

	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function stateOndeckTabBTN_click(event) {
	$w("#CurriculaStateMBOX").changeState("OnDeck");
	$w("#CurriculaPaginationMBOX").changeState("OnDeckPagination");
	$w("#stateOndeckTabBTN").disable()
	$w("#stateRejectedTabBTN").enable()
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}


/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function button14_click(event) {
	$w("#BannerStateBox").changeState('Three');
 
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function getLastParamObjectBTN_click(event) {
	$w('#developerResponseTXTBX').value = local.getItem('lastParamObject')
	// let lastParamObject = local.getItem('lastParamObject')
	// console.log(`lastParamObject: [something below: log then dir]`)
	// console.log(lastParamObject)
	// console.dir(lastParamObject)
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export async function getFaumFormioBTN_click(event) {
	// console.groupCollapsed(`getFaumFormioBTN_click(event)`)
	console.group(`getFaumFormioBTN_click(event)`)
	let kludgeBoolean = $w('#kludgeBooleanRADIO').value === 'true' ? true : false
	console.log(`kludgeBoolean: ${kludgeBoolean}`)
	// let gizmo = 'fetch'
	// let gizmo = 'getJSON'
	let gizmo = 'apiDrupalModule'
	console.log(`gizmo: ${gizmo}`)
	let endpoint = `https://live-steamda.pantheonsite.io/fauxformio?_format=json`
	if (gizmo === 'apiDrupalModule') {
		let uri = `fauxformio`
		console.log(`gizmo: ${gizmo} : uri: ${uri}`)
		// let kludgeBoolean = $w('#kludgeBooleanRADIO').vallue === 'true' ? true : false
		let responseObject = await getDrupalURI(uri,false,kludgeBoolean)
		$w('#developerResponseTXTBX').value = JSON.stringify(responseObject,undefined,4)
	}
	if(gizmo === 'fetch'){
		let optionsThese = {}
		optionsThese.method = 'get'
		optionsThese.mode = "no-cors"

	// <fetch-primise>
	fetch(endpoint, { method: 'get', mode: 'no-cors' })
		.then( (httpResponse) => {
			if (httpResponse.ok) {
			return httpResponse.json();
			} else {
			return Promise.reject("Fetch did not succeed");
			}
		} )
		.then(json => console.log(json.someKey))
		.catch(err => console.log(err));
	// </fetch-primise>
	}
	if (gizmo === 'getJSON') {
		getJSON(endpoint,{ method: 'get', mode: 'no-cors' })
		.then(json => console.log(json))
		.catch(err => console.log(err));
	}

	console.log(`groupEnd: getFaumFormioBTN_click(event)`)
	console.groupEnd()
}