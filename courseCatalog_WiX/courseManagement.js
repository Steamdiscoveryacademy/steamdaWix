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
// • </import from> 'public/utilityModule.js'
// • <import from> 'public/inventoryDocDbJSON.js'
import {datestampinventoryDocDbJSON} from 'public/inventoryDocDbJSON.js'
import {getInventoryResponse} from 'public/inventoryDocDbJSON.js'
// • </import from> 'public/inventoryDocDbJSON.js'
// • <import from> 'public/timeCrunchModule.js'
import {timeCrunch} from 'public/timeCrunchModule.js'
import {jsDaysOfWeekArrayToString} from 'public/timeCrunchModule.js'
import {getEndDateFromSchedule_Start_Weeks_DaysOfWeek} from 'public/timeCrunchModule.js'
// • </import from> 'public/timeCrunchModule.js'
import {sectionObjectEscapedJSON} from 'public/courseCatalogModule.js'
import {getNatoPhoneticArrayObjectItem} from 'public/natoPhoneticTestData.js';
// • </import from> 'public/'
import {getDrupalNode} from 'backend/apiDrupalModule.jsw';
import {postDrupalNode} from 'backend/apiDrupalModule.jsw';
import {patchDrupalNode} from 'backend/apiDrupalModule.jsw';
import {CONSTRUCT_apiObject_POSTbyKind} from 'public/apiObjectPrepModule.js';
// import {apiObjectPrep} from 'public/apiObjectPrepModule.js';
import {utilityDirectParseDataIntoTemplate} from 'public/apiObjectPrepModule.js';
import { compareAsc, format } from 'date-fns'
import {adminDispatch} from 'public/adminDispatch.js';

// ø QUICK_LIST:
// ø CREATE_NEW_COURSE
// ø CREATE_NEW_COURSE_±3_Click_clearCourseForm
// ø CREATE_NEW_COURSE_±2_resetCourseForm
// ø CREATE_NEW_COURSE_±1_completeCourseForm_SCRIPTS
// ø CREATE_NEW_COURSE_±1a_instantiateNewCourseObject
// ø 
// ø CREATE_NEW_COURSE_00_Click_PreviewBTN
// ø CREATE_NEW_COURSE_01_ValidateFormData
// ø CREATE_NEW_COURSE_02
// ø CREATE_NEW_COURSE_02_collectAndCalculateData [CREATE_NEW_COURSE_02_catchAndDisplayError]
// ø CREATE_NEW_COURSE_03_composeAndDisplayPreview
// ø CREATE_NEW_COURSE_03a_transformBlock
// ø CREATE_NEW_COURSE_04_Click_PostBTN
// ø CREATE_NEW_COURSE_05_newCourseDrupalPOST


$w.onReady(function () {
	// await onReadyCurriculaJSON()
	konstantSelectedCurriculaRepeaterOnReady()
	wixStorageDisplayOnReady()	
    datestampinventoryDocDbJSONOnReady()
	develOnReady()
	// callPublicADD_from_toggleExpandButtons_OnReady ()
	let buttonObjectButtonsUsedArray = [4]
	assignStringsOnReady(buttonObjectButtonsUsedArray,[4])
	wixUserPermissionsOnReady()
});
//==========================================================================================
//==================================================              <OnReady Called Functions>
//==================================================     (in the order they are called above)
async function konstantSelectedCurriculaRepeaterOnReady(){
	// ø TOP__SIDE__BY__SIDE

	let termObject = JSON.parse(memory.getItem('memoryParamObject'))
	
	//ø <REGION FORM HERE KLUDGE - @todo: gather from docDbJSON>
	let regionKeyNameObject = {"CHO":"Charlottesville","RIC":"Richmond","ROA":"Blacksburg"}
	$w('#regionNameINPUT').value = regionKeyNameObject[termObject.termRegion]
	$w('#regionNameINPUT').value += ` [${termObject.termRegion}]`
	//ø </REGION FORM HERE KLUDGE>
	
	session.setItem('termRecordId',termObject._id)
	session.setItem('termRegionId',termObject.termRegion)

	let curriculaBufferThis = termObject.curriculum.curricula

	delete termObject.curriculum
	// console.log(`termObject: [object less-curriculum below]`)
	// console.dir(termObject)
	memory.setItem('memoryParamObject', JSON.stringify(termObject))

	// console.log(`curriculaBufferThis: [array below]`)
	// console.dir(curriculaBufferThis)

	let curriculaBuffer = []
	curriculaBufferThis.forEach(element => {
		if(element.status === '7'){
		element._id = element.nid
		curriculaBuffer.push(element)

		}
	});


	// console.log(`curriculaBuffer: [array below]`)
	// console.dir(curriculaBuffer)
	
	let yesObject = {}
	yesObject.key = 'yes'
	yesObject.status = '7'
	yesObject.repeaterId = '#curriculaSelectedRPTR'
	yesObject.paginationId = '#curriculaSelectedPGNTN'
	yesObject.prefixId = 'selected'
	yesObject.pageItemCount = 8
	yesObject.forcePaginationOffset = 0
	yesObject.curriculaObjectArray = curriculaBuffer

	// console.log(`yesObject: [array below]`)
	// console.dir(yesObject)
	memory.setItem('memoryWorkingObject',JSON.stringify(yesObject))

	evaluationPaginationAndLoadRepeater()
}
//==================================================             </OnReady Called Functions>
//==========================================================================================


async function wixUserPermissionsOnReady(){
	// let optionsLocal = {
	// 	fieldsets: [ 'FULL' ]
	// 	}
	// const memberLocal = await currentMember.getMember(optionsLocal)
	// // console.log(`memberLocal: [object below]`)
	// // console.dir(memberLocal)
	// const memberLocalRoles = await currentMember.getRoles()
	// // console.log(`memberLocalRoles: [array of objects below]`)
	// // console.dir(memberLocalRoles)
	// let roleTitleArray = []
	// memberLocalRoles.filter(function(filterFunctionElement) {
    //     if(typeof filterFunctionElement.title !== 'undefined'){
    //         return roleTitleArray.push(filterFunctionElement.title)
    //     }  
    // })
	// console.log(`roleArray: [array (object?) below]`)
	// console.dir(roleArray)
    // return responseArrayOuter
    // console.log(`roleTitleArray: `)
    // console.dir(roleTitleArray)

	// const workingMemberDEP = {}
	// workingMemberDEP.id = memberLocal._id
	// workingMemberDEP.email = memberLocal.loginEmail
	// workingMemberDEP.fullName = `${memberLocal.contactDetails.firstName} ${memberLocal.contactDetails.lastName}`
	// workingMemberDEP.roles = roleTitleArray
	// console.log(`workingMemberDEP: [object below]`)
	// console.dir(workingMemberDEP)

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
	
	// return
	// const user = wixUsers.currentUser;
	// const adminShowArray = [];
	// const develShowArray = ["#develBTN"];
	// if(user.loggedIn){
  	// user.getRoles()
  	// .then( (roles) => {
	// 	console.log(roles);
    // 	if (roles.some(r => r.name === "Admin")){
	// 		for (var i = 0; i < adminShowArray.length; i++) {
    //   			$w(adminShowArray[i]).show();
	// 		}
    //   	}
    // });
	// }
}

export function  datestampinventoryDocDbJSONOnReady() {
    console.groupCollapsed(`'inventoryDocDbJSON.js' date-stamp function DEMO`)
    let datestampStringResult = datestampinventoryDocDbJSON();
    console.log(datestampStringResult);
    console.log(`groupEnd: 'inventoryDocDbJSON.js' date-stamp function DEMO`);
    console.groupEnd()
}
export function wixStorageDisplayOnReady(){
	// set lastTermNameTXT
	$w('#lastTermNameTXT').text = 'Course Building for: ' + session.getItem('lastTermName')
}
export async function onReadyCurriculaJSON_DEP(){
	await load_reloadEntirePage_DEP()
}
//====================================================================================================
//==============================        <loadCurriculaRepeater_DEP>         ==============================
//====================================================================================================
function evaluationPaginationAndLoadRepeater(){

	let repeaterObject = JSON.parse(memory.getItem('memoryWorkingObject'))
	// let repeaterObject = yesObject
	// console.log(`repeaterObject: [object below]`)
	// console.dir(repeaterObject)
	
	let areValidParameters = true
	repeaterObject.notes = []
	repeaterObject.notes.push('VALIDATION Is Pending')
	if(!areValidParameters){
		// return repeaterObject
		return
	}
	repeaterObject.notes.push(`'forcePaginationOffset' Attribute will be destroyed as soon as it is utilized`)
	repeaterObject.notes.push(`'forcePaginationOffset' ONLY used if the PaginationObject _cannot_ be counted on [100?,3?], especially at instantiation`)



	let pageItemCount = 8
	if($w(repeaterObject.paginationId).totalPages === 100){
		$w(repeaterObject.paginationId).currentPage = 1
		$w(repeaterObject.paginationId).totalPages = Math.ceil(repeaterObject.curriculaObjectArray.length / pageItemCount);
	}
	repeaterObject.currentPagination = {}
	repeaterObject.currentPagination.totalPages = $w(repeaterObject.paginationId).totalPages
	repeaterObject.currentPagination.currentPage = $w(repeaterObject.paginationId).currentPage
	let pageIndex = $w(repeaterObject.paginationId).currentPage - 1
	let offset = pageIndex * pageItemCount
	repeaterObject.currentPagination.pageIndex = pageIndex
	repeaterObject.currentPagination.offset = offset

	let repeaterCurriculaObjectArray = []
	for (let rptrIndex = offset ; rptrIndex < pageItemCount + offset; rptrIndex++) {
		const element = repeaterObject.curriculaObjectArray[rptrIndex];
		if(typeof element !== 'undefined'){
			repeaterCurriculaObjectArray.push(element)	
		}
	}

	let keyTXTid = '#'+ repeaterObject.prefixId + 'KeyTXT'
	let nameTXTid = '#'+ repeaterObject.prefixId + 'NameTXT'

	$w(repeaterObject.repeaterId).data = repeaterCurriculaObjectArray;
	// console.log(`$w(repeaterId).data: $w(${repeaterObject.repeaterId}).data:`)
	// console.dir($w(repeaterObject.repeaterId).data)
	$w(repeaterObject.repeaterId).onItemReady( ($curriculumElement, curriculumElementData, index) => {
		$curriculumElement(keyTXTid).text = curriculumElementData.textKey;
		$curriculumElement(nameTXTid).text = curriculumElementData.name;
	});

}

export async function load_reloadEntirePage_DEP(kind = 'ONREADY'){
	// ø BEGIN load_reloadEntirePage_DEP
	// FOR postCurriculaSelectionsUpdate()
	if(kind === 'POSTUPDATE') {
		console.groupCollapsed(`if(kind === 'POSTUPDATE'): if(${kind} === 'POSTUPDATE')`)
		// $w('#updatesPendingCONTBX').collapse()
		let toUpdateCurriculumRecordId = session.getItem('termRecordId')
		console.log(`toUpdateCurriculumRecordId: ${toUpdateCurriculumRecordId}`)
		let toUpdateCurriculumRecord = await wixData.get("term",toUpdateCurriculumRecordId )
		console.log(`current: toUpdateCurriculumRecord: [object below] `)
		console.dir(toUpdateCurriculumRecord)
		// session.setItem('lastParamObject', JSON.stringify(toUpdateCurriculumRecord,undefined,4))/*BIGBLEED*//*LINE_79*/
		console.log(`current: toUpdateCurriculumRecord: [object below] `)
		console.dir(toUpdateCurriculumRecord)
		console.groupEnd()

	}
	// FOR onReadyCurriculaJSON()
	// console.groupCollapsed(`onReadyCurriculaJSON()`)
	// let termObject = JSON.parse(local.getItem('lastParamObject'))/*BIGBLEED*//*LINE_87*/
	// ø TOP__SIDE__BY__SIDE
	let termObject = JSON.parse(memory.getItem('memoryParamObject'))/*BIGBLEED*//*LINE_87*/
	console.log(`termObject: [object belowZZZ]`)
	console.dir(termObject)
	//ø <REGION FORM HERE KLUDGE - @todo: gather from docDbJSON>
	let regionKeyNameObject = {"CHO":"Charlottesville","RIC":"Richmond","ROA":"Blacksburg"}
	$w('#regionNameINPUT').value = regionKeyNameObject[termObject.termRegion]
	$w('#regionNameINPUT').value += ` [${termObject.termRegion}]`
	//ø </REGION FORM HERE KLUDGE>
	// console.log(`termObject._id: ${termObject._id}`)
	// console.groupEnd()
	session.setItem('termRecordId',termObject._id)
	session.setItem('termRegionId',termObject.termRegion)
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
	// session.setItem('curriculaBuffer', curriculaBufferThis)/*BIGBLEED*//*LINE_112*/
	memory.setItem('memoryWorkingObject', curriculaBufferThis)/*BIGBLEED*//*LINE_112*/
	// ø CURRENT_SIDE_BY_SIDE
	// session.setItem('curriculaBufferNOCHANGE',curriculaBufferThis)/*BIGBLEED*//*LINE_113*/
	memory.setItem('memoryWorkingBackupObject',curriculaBufferThis)/*BIGBLEED*//*LINE_113*/
	loadAllCurriculaRepeaters_DEP()
	// ø END load_reloadEntirePage_DEP
}
export function loadAllCurriculaRepeaters_DEP(){
	// ø BEGIN loadAllCurriculaRepeaters_DEP
	// ø <Tasks Upon any loadCurricularRepeater>
	// 	$w('#updatesPendingCONTBX').expand()
	// }
	// ø </Tasks Upon any loadCurricularRepeater>
	let simpleParamArray = ['yes']
	// let simpleParamArray = ['maybe','yes','no']
	let paginationObject = {}
	let paginationObjectThis = {}
	// let fullCurriculaObjectArray = JSON.parse(session.getItem('curriculaBuffer'))/*BIGBLEED*//*LINE_125*/
	let fullCurriculaObjectArray = JSON.parse(memory.getItem('memoryWorkingObject'))/*BIGBLEED*//*LINE_125*/
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
		// loadCurriculaRepeater_DEP(repeaterId, status)
		// loadCurriculaRepeater_DEP(repeaterId)
		paginationObjectThis = loadCurriculaRepeater_DEP(simpleParam)
		paginationObjectArray.push(paginationObjectThis)
	}
	paginationObject.paginationObjectArray = paginationObjectArray
	$w('#developerResponseTXTBX').value = JSON.stringify(paginationObject,undefined,4)
	// ø END loadAllCurriculaRepeaters_DEP
}
export function loadCurriculaRepeater_DEP(simpleParam = 'default'){
	// ø BEING loadCurriculaRepeateZr_DEP
	// console.group(`loadCurriculaRepeater_DEP(repeaterId = 'default', status = '0')`)
	console.groupCollapsed(`loadCurriculaRepeater_DEP(${simpleParam} = 'default')`)
	// console.group(`loadCurriculaRepeater_DEP(${simpleParam} = 'default')`)
	let supportedSimpleParam = ['maybe','yes','no']
	// repeaterId = supportedRepeaterValues.includes(repeaterId) ? repeaterId : 'maybe'
	simpleParam = supportedSimpleParam.includes(simpleParam) ? simpleParam : 'maybe'
	let status = '777'
	let repeaterId = 'repeaterIdHOLDER'
	let prefixId = 'prefixIdHOLDER'
	console.log(`supported: simpleParam: ${simpleParam}`)
	let repeaterFinal2dArray = [['maybe','0','#curriculaOndeckRPTR','ondeck'],['yes','7','#curriculaSelectedRPTR','selected'],['no','9','#curriculaRejectedRPTR','rejected']]

	for (let index = 0; index < supportedSimpleParam.length; index++) {
		const key = supportedSimpleParam[index];
		const kvp = repeaterFinal2dArray[index];
		if(key === simpleParam){
			status = kvp[1]
			repeaterId = kvp[2]
			prefixId = kvp[3]
		}
		
	}

	console.log(`final: simpleParam: ${simpleParam}`)
	console.log(`final: status: ${status}`)
	console.log(`final: repeaterId: ${repeaterId}`)
	console.log(`final: prefixId: ${prefixId}`)

	// let fullCurriculaObjectArray = JSON.parse(session.getItem('curriculaBuffer'))/*BIGBLEED*//*LINE_175*/
	let fullCurriculaObjectArray = JSON.parse(memory.getItem('memoryWorkingObject'))/*BIGBLEED*//*LINE_175*/
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
		$curriculumElement(keyTXTid).text = curriculumElementData.textKey;
		$curriculumElement(nameTXTid).text = curriculumElementData.name;
	});

	console.log(`groupEnd: rptr load iteration: repeaterId: ${repeaterId}`)
	console.groupEnd()

	console.log(`groupEnd: loadCurriculaRepeater_DEP(${simpleParam} = 'default')`)
	console.groupEnd()
	return paginationObject
	// ø END loadCurriculaRepeateZr_DEP
}
export function processSelectCurriculum(event,scriptName){
	// ø BEGIN processSelectCurriculum
	console.groupCollapsed(`processSelectCurriculum(scriptname)`)
	// console.group(`processSelectCurriculum(scriptname)`)
	// console.log(`$item:`)
	// console.dir($item)
	console.log(`scriptName: ${scriptName}`)
	scriptName = scriptName.toLowerCase()
	console.log(`scriptName: ${scriptName}`)
	let repeaterId = 'selected'
	repeaterId = scriptName.includes('location') ? 'location' : repeaterId
	console.log(`inferred from scriptName: repeaterId: ${repeaterId}`)
	// let repeaterFinal2dArray = [['ondeck','#curriculaOndeckRPTR'],['selected','#curriculaSelectedRPTR'],['rejected','#curriculaRejectedRPTR']]
	let repeaterFinal2dArray = [['ondeck','#curriculaOndeckRPTR'],['selected','#curriculaSelectedRPTR'],['rejected','#curriculaRejectedRPTR'],['location','#formLocationRPTR']]
	repeaterFinal2dArray.forEach(kvp => {
		const key = kvp[0]
		if(key === repeaterId){
			repeaterId = kvp[1]
		}
	});
	console.log(`final: repeaterId: ${repeaterId}`)

	const data = $w(repeaterId).data;
	console.log(`data`)
	console.dir(data)
    let clickedItemData = data.find(item => item._id === event.context.itemId);
	console.log(`clickedItemData:`)
	console.dir(clickedItemData)
	console.log(`groupEnd: processSelectCurriculum(scriptname)`)
	console.groupEnd()
	return clickedItemData
	// ø END processSelectCurriculum
}

//====================================================================================================
//==============================        </loadCurriculaRepeater_DEP>        ==============================
//====================================================================================================

//====================================================================================================
//========================================        <Confirm Backend with Mulitply and Publick with Add>
export function callPublicADD_from_toggleExpandButtons_OnReady () {
	console.groupCollapsed(`callPublicADD_from_toggleExpandButtons_OnReady`)
	let yyyymmOfBuild = 202111
	let ddOfBuild = 9
    let sum = addFrom_toggleExpandButtons(yyyymmOfBuild,ddOfBuild);
	console.log(`${sum} = addFrom_toggleExpandButtons(${202111},${9})`)
    console.groupEnd();
}


export async function develOnReady(){
	// let termObject = JSON.parse(local.getItem('lastParamObject'))/*BIGBLEED*//*LINE_288*/
	let termObject = JSON.parse(memory.getItem('memoryParamObject'))/*BIGBLEED*//*LINE_288*/
}
//========================================       </Confirm Backend with Mulitply and Publick with Add>
//====================================================================================================

//====================================================================================================
//============================================================                  <Overall Build Course>
//====================================================================================================

//==========================================================================================
//==================================================       <Instantiate from Curricula Click>
 
// ø <---------- <restCourseFormAll>  ---------->
function resetCourseFormAll(){
// ø CREATE_NEW_COURSE_±2_resetCourseForm
	let wID_unsetArray = ['#courseNameINPUT','#courseNameDisplayINPUT','#regionLocationINPUT','#regionLocationKeyINPUT']
	for (let index = 0; index < wID_unsetArray.length; index++) {
		const element = wID_unsetArray[index];
		$w(element).value = ''
	}
	$w('#startDateDTPKR').value = null
	$w('#startDateDTPKR').resetValidityIndication()
	$w('#courseNameDisplayINPUT').resetValidityIndication()
	$w('#halfDayCBXGRP').value = []
	$w('#halfDayCBXGRP').resetValidityIndication()
	 
	$w('#previewErrorStringTXT').text = `Holder for Errors`
	$w('#previewErrorStringTXT').collapse()
	$w('#newCourseDataObjectPreview').text = `use $w('#coursePreviewTXT').html`
	$w('#previewCourseBTN').show()
	$w('#formPreviewCNTBX').hide()
	$w('#postCourseBTN').hide()
	$w('#selectedNewCourseBTN').enable()
	 
	$w('#gradeLevelDRPDN').value = 'NA'
	$w('#minGradeDRPDN').value = 'NA'
	$w('#maxGradeDRPDN').value = 'NA'
	$w('#weekCountDRPDN').value = '1'
	// $w('#daysOfWeekCBXGRP').value = ['1','2','3','4','5']
	$w('#daysOfWeekCBXGRP').value = ['MON','TUE','WED','THU','FRI']
	// $w("#myCheckboxGroup").value = ["value1", "value2"];
	// session.setItem('lastResponseObject', '')/*BIGBLEED*//*LINE_327*/
	memory.setItem('memoryResponseObject', '')/*BIGBLEED*//*LINE_327*/
	// ø TERMINUS CREATE_NEW_COURSE_±2_resetCourseForm
	// ø ±1 course form scripts, but...
	// ø NEXT-BTN_click =>  CREATE_NEW_COURSE_00_Click_PreviewBTN
}
// ø <---------- </restCourseFormAll> ---------->
 
// ø <---------- <On Click Curriculum Object>  ---------->
export function instantiateNewCourseObject(clickedItemData){
	// ø CREATE_NEW_COURSE_±1a_instantiateNewCourseObject
	console.groupCollapsed(`export function instantiateNewCourseObject(clickedItemData)`)
	console.log(`clickedItemData: [object below]`)
	console.dir(clickedItemData)

	let newCourseDataObject = {}
	newCourseDataObject.notes = []
	newCourseDataObject.abbrvName = clickedItemData.abbrvName
	newCourseDataObject.name = clickedItemData.name
	newCourseDataObject.curriculumId = clickedItemData.nid
	newCourseDataObject.textKey = clickedItemData.textKey
	newCourseDataObject.notes.push(`append clickedItemData to newCourseDataObject`)
	// console.log(`append clickedItemData: newCourseDataObject: [object below]`)
	// console.dir(newCourseDataObject)

	// let lastTermRecord =  JSON.parse(local.getItem('lastParamObject'))/*BIGBLEED*//*LINE_350*/
	let lastTermRecord =  JSON.parse(memory.getItem('memoryParamObject'))/*BIGBLEED*//*LINE_350*/
	// console.log(`lastTermRecord: [object below]`)
	// console.dir(lastTermRecord)
 
	newCourseDataObject.termDateEnd = lastTermRecord.termDateEnd
	newCourseDataObject.termDateStart = lastTermRecord.termDateStart
	newCourseDataObject.termId = lastTermRecord.termId
	newCourseDataObject.termRegion = lastTermRecord.termRegion
	newCourseDataObject.title = lastTermRecord.title
	newCourseDataObject.termWix_id = lastTermRecord._id
	newCourseDataObject.notes.push(`append lastTermRecord to  newCourseDataObject`)
	// console.log(`append lastTermRecord: newCourseDataObject: [object below]`)

	// appendLocationsJsonDocDb(newCourseDataObject)
	// console.log(`append Locations: newCourseDataObject: [object below]`)
	console.log(`CREATE_NEW_COURSE_±1a_instantiateNewCourseObject: newCourseDataObject:`)
	console.dir(newCourseDataObject)
	
	newCourseFormLoadAfterClick(newCourseDataObject)

	console.log(`groupEnd: export function instantiateNewCourseObject(clickedItemData)`)
	console.groupEnd()

}
// ø <---------- </On Click Curriculum Object> ---------->
 
 
// ø <---------- <On Change Start-Time & Duration>  ---------->
function onChangeStartTimeDurationRadioSettings(scriptName = 'STRING'){
	let whatChanged = scriptName.substr(-7) === '_change' ? scriptName.substr(0, scriptName.length - 7) : scriptName
	$w('#developerResponseTXTBX').value += 'NEW-CHANGE:\n===========\n' + whatChanged
	let supportedWhatChangedArray = ['summerTmBlksRDBTNS','startTimeTMPKR','durationTMPKR']
	if(!supportedWhatChangedArray.includes(whatChanged)){
		return
	}
	let wIdWhatChanged = '#' + whatChanged
	if(whatChanged === 'summerTmBlksRDBTNS'){
		$w('#developerResponseTXTBX').value += '\nSINCE: Summner-Block is: '+ $w('#summerTmBlksRDBTNS').value
		//Full Day,FULL; Morning,AM; Afternoon,PM
		if($w('#summerTmBlksRDBTNS').value === 'FULL'){
			$w('#developerResponseTXTBX').value += '\nSET: Start & Duration to: 9:00am - 8:00'
			// $w("#myTimeInput").value = "16:30";
			$w('#startTimeTMPKR').value = '09:00'
			$w('#durationTMPKR').value = '08:00'
			$w('#halfDayCNTBX').expand()
		}
		if($w('#summerTmBlksRDBTNS').value === 'AM'){
			$w('#developerResponseTXTBX').value += '\nSET: Start & Duration to: 9:00am - 3:30'
			// $w('#developerResponseTXTBX').value += '\nto: AM'
			$w('#startTimeTMPKR').value = '09:00'
			$w('#durationTMPKR').value = '03:30'
			$w('#halfDayCBXGRP').value = []
			$w('#halfDayCBXGRP').resetValidityIndication()
			$w('#halfDayCNTBX').collapse()
		}
		if($w('#summerTmBlksRDBTNS').value === 'PM'){
			$w('#developerResponseTXTBX').value += '\nSET: Start & Duration to: 1:30pm - 3:30'
			// $w('#developerResponseTXTBX').value += '\nto: PM'
			$w('#startTimeTMPKR').value = '13:30'
			$w('#durationTMPKR').value = '03:30'
			$w('#halfDayCBXGRP').value = []
			$w('#halfDayCBXGRP').resetValidityIndication()
			$w('#halfDayCNTBX').collapse()
		}
	}
	if(whatChanged !== 'summerTmBlksRDBTNS'){
		$w('#developerResponseTXTBX').value += `\nSINCE: StartTime: ${$w('#startTimeTMPKR').value} & Duration: ${$w('#durationTMPKR').value}`
		$w('#summerTmBlksRDBTNS').value = ''
		if($w('#startTimeTMPKR').value === '09:00:00.000' && $w('#durationTMPKR').value === '08:00:00.000'){
			$w('#developerResponseTXTBX').value += '\nSET: Summner-Block to: FULL'
			$w('#summerTmBlksRDBTNS').value = 'FULL'
			$w('#halfDayCNTBX').expand()
		}
		if($w('#startTimeTMPKR').value === '09:00:00.000' && $w('#durationTMPKR').value === '03:30:00.000'){
			$w('#developerResponseTXTBX').value += '\nSET: Summner-Block to: AM'
			$w('#summerTmBlksRDBTNS').value = 'AM'
			$w('#halfDayCBXGRP').value = []
			$w('#halfDayCBXGRP').resetValidityIndication()
			$w('#halfDayCNTBX').collapse()
		}
		if($w('#startTimeTMPKR').value === '13:30:00.000' && $w('#durationTMPKR').value === '03:30:00.000'){
			$w('#developerResponseTXTBX').value += '\nSET: Summner-Block to: PM'
			$w('#summerTmBlksRDBTNS').value = 'PM'
			$w('#halfDayCBXGRP').value = []
			$w('#halfDayCBXGRP').resetValidityIndication()
			$w('#halfDayCNTBX').collapse()
		}
		if($w('#summerTmBlksRDBTNS').value.length === 0){
			$w('#developerResponseTXTBX').value += '\nSET: Summner-Block to: EEMPTY'
			$w('#halfDayCBXGRP').value = []
			$w('#halfDayCBXGRP').resetValidityIndication()
			$w('#halfDayCNTBX').collapse()
		}
	}
		$w('#developerResponseTXTBX').value += '\n...\n'
}
// ø <---------- </On Change Start-Time & Duration> ---------->
 
// ø <---------- <Instantiate jsonDocDb for Locations>  ---------->
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
// ø <---------- </Instantiate jsonDocDb for Locations> ---------->

// ø <---------- <Populate Form Curriculum and Locations>  ---------->
export function newCourseFormLoadAfterClick(newCourseDataObject){
	$w('#courseNameINPUT').value = newCourseDataObject.name
	$w('#courseNameDisplayINPUT').value = newCourseDataObject.name
	// session.setItem('lastResponseObject', JSON.stringify(newCourseDataObject))/*BIGBLEED*//*LINE_473*/
	memory.setItem('memoryResponseObject', JSON.stringify(newCourseDataObject))/*BIGBLEED*//*LINE_473*/
}
// ø <---------- </Populate Form Curriculum and Locations> ---------->

//==================================================      </Instantiate from Curricula Click>
//==========================================================================================
//==========================================================================================
//==================================================              <Preview Button: Validate>

// ø <---------- <validate preview data>  ---------->
export function validateFormData(){
	// ø CREATE_NEW_COURSE_01_ValidateFormData
	let ErrorString = ''
	if(($w('#courseNameINPUT').value).length === 0){
		ErrorString += ` •  'Course Name' is blank please select a Course at Left\n`
	}
	if(($w('#courseNameDisplayINPUT').value).length === 0){
		ErrorString += ` •  'Course Name Display' cannot be blank\n`
	}
	//ø <GradeLevel>
	let isValidMaxMin = 'FFALSE'
	isValidMaxMin = $w('#minGradeDRPDN').value === 'NA' && $w('#maxGradeDRPDN').value === 'NA' ? 'BOTH_NA' : isValidMaxMin
	isValidMaxMin = $w('#minGradeDRPDN').value !== 'NA' && $w('#maxGradeDRPDN').value !== 'NA' ? 'BOTH_VALUES' : isValidMaxMin
	isValidMaxMin = isValidMaxMin === 'FFALSE' ? 'MIN_MAX_JUST_ONE' : isValidMaxMin
	isValidMaxMin = isValidMaxMin === 'BOTH_VALUES' && Number($w('#minGradeDRPDN').value) > Number($w('#maxGradeDRPDN').value) ? 'MIN_GT_MAX' : isValidMaxMin
	isValidMaxMin = isValidMaxMin === 'BOTH_NA' && $w('#gradeLevelDRPDN').value === 'NA' ? 'ALL_UNSET' : isValidMaxMin
	isValidMaxMin = isValidMaxMin === 'BOTH_VALUES' && $w('#gradeLevelDRPDN').value !== 'NA' ? 'ALL_SET' : isValidMaxMin
	let testAppendString = `\nisValidMaxMin: ${isValidMaxMin}: `
	let stringMinMax = isValidMaxMin
	isValidMaxMin = isValidMaxMin.includes('BOTH') ? 'TTRUE' : 'FFALSE'
	testAppendString += `${isValidMaxMin}`
	if(isValidMaxMin === 'FFALSE'){
		stringMinMax = stringMinMax === 'MIN_MAX_JUST_ONE' ? 'Only one-of  Min-Grade and Max-Grade is set' : stringMinMax
		stringMinMax = stringMinMax === 'MIN_GT_MAX' ? 'Min-Grade cannot be greater than Max-Grade' : stringMinMax
		stringMinMax = stringMinMax === 'ALL_UNSET' ? 'No Valid Grade-Level was selected' : stringMinMax
		stringMinMax = stringMinMax === 'ALL_SET' ? 'You cannot select both Min-Max Grades and a Grade-Level fromthe Drop-Down' : stringMinMax
		ErrorString += ` •  ${stringMinMax}\n`
		// console.log(`isValidMaxMin === '${isValidMaxMin}': ErrorString: ${ErrorString}`)
	}
	//ø </GradeLevel>

	if(($w('#daysOfWeekCBXGRP').selectedIndices).length === 0){
		ErrorString += ` •  One or more Days must be checked\n`
	}
	let coursStartDateDaysOfWeekAreNotNull = ($w('#daysOfWeekCBXGRP').selectedIndices).length === 0 ? false : true
	coursStartDateDaysOfWeekAreNotNull = $w('#startDateDTPKR').value === null ? false : coursStartDateDaysOfWeekAreNotNull
	// console.log(`coursStartDateDaysOfWeekAreNotNull: ${coursStartDateDaysOfWeekAreNotNull}`)
	let courseStartDateDate = $w('#startDateDTPKR').value
	courseStartDateDate = courseStartDateDate == null ? new Date(1961,11,25,6,59) : courseStartDateDate
	let courseStartDate = courseStartDateDate.toISOString()
	courseStartDate   =  (courseStartDate).substr(0,11) + '11:59' + ':00.000Z'//"2021-08-13T05:00:00.000Z"
	let courseEndDate = 'SKIP_TERM_DATES_LOGIC'
	if(coursStartDateDaysOfWeekAreNotNull){
		let weeks = Number($w('#weekCountDRPDN').value)
		let daysOfWeek = $w('#daysOfWeekCBXGRP').selectedIndices
		let getEndDateFromScheduleResponse = getEndDateFromSchedule_Start_Weeks_DaysOfWeek(courseStartDate, weeks, daysOfWeek)
		if(getEndDateFromScheduleResponse.affirmativeBoolean === true){
			courseEndDate = getEndDateFromScheduleResponse.affirmative.simpleResponse
		}else{
			ErrorString += ` •  Could not properly Calculat the 'End Date' of the Course\n`
			
		}
		
		// let termObject = JSON.parse(local.getItem('lastParamObject'))/*BIGBLEED*//*LINE_536*/
		let termObject = JSON.parse(memory.getItem('memoryParamObject'))/*BIGBLEED*//*LINE_536*/
		let termDateStart =  (termObject.termDateStart).substr(0,11) + '00:01' + ':00.000Z'//"2021-08-13T05:00:00.000Z"
		let termDateEnd   =  (termObject.termDateEnd).substr(0,11) + '23:59' + ':00.000Z'//"2021-08-13T05:00:00.000Z"

		if(courseEndDate !== 'SKIP_TERM_DATES_LOGIC'){
			if(courseStartDate < termDateStart){
				ErrorString += ` •  The Course begins before the Term has started\n`
			}
			if(courseEndDate > termDateEnd){
				ErrorString += ` •  The Course ends after the Term is over\n`
			}
		}
	}else{
		ErrorString += ` •  A Start Date for the Course must be selected\n`
	}
	let HOLDER = '_' + $w('#regionLocationKeyINPUT').value + '_'
	if(!(session.getItem('supportedLocationConcatString')).includes(HOLDER)){
			ErrorString += ` •  Please select a Valid Location\n`
	}

// ø CREATE_NEW_COURSE_01_ValidateFormData
	if(ErrorString.length === 0){
		// ErrorString = ErrorString.length === 0 ? 'NO ERRORS YET' : ErrorString
		// ø SUCCESS CREATE_NEW_COURSE_01_ValidateFormData
		// ø NEXT CREATE_NEW_COURSE_02_collectAndCalculateData
		$w('#previewErrorStringTXT').text = `Holder for Errors`
		$w('#previewErrorStringTXT').collapse()
		collectAndCalculateData(courseStartDate, courseEndDate)
	}else{
		// ø FAILURE CREATE_NEW_COURSE_01_ValidateFormData
		// ø NEXT CREATE_NEW_COURSE_02_catchAndDisplayError
		catchAndDisplayError(ErrorString)
	}



	// ErrorString += '\n' + testAppendString
	// $w('#formPreviewCNTBX').show()
	// $w('#coursePreviewTXT').text = ErrorString
	// return
/*
	- ‡ courseNameDisplay non-Empty
	- ‡ at least one day selected
  - GradeLevel is Valid
	  - ‡ GradeLevel DropDown is Valid 
		  - ‡ XOR 
	  - † (GradeMin Valid && GradeMax Valid) && GradMin <= GradeMax 

	- † Start Date between termDates 
	- † Start Date + Weeks + last Day of Week between TermDates 
*/
}
// ø <---------- </validate preview data> ---------->

// ø <---------- <catch & display ERROR>  ---------->
export function catchAndDisplayError(ErrorString){
	// ø TERMINUS CREATE_NEW_COURSE_02_catchAndDisplayError
	// START OVER: NEXT-BTN_click => CREATE_NEW_COURSE_±3_Click_clearCourseForm
	// ADJUST FORM: NEXT-BTN_click =>  CREATE_NEW_COURSE_00_Click_PreviewBTN
	console.log(`ErrorString: `)
	console.log(ErrorString)
	$w('#previewErrorStringTXT').expand()
	$w('#previewErrorStringTXT').text = ErrorString
}
// ø <---------- </catch & display ERROR> ---------->

//==================================================             </Preview Button: Validate>
//==========================================================================================

//==========================================================================================
//==================================================      <Preview Button: Compose & Display>

// ø <---------- <collectAndCalculateData(courseStartDate, courseEndDate)>  ---------->
export function collectAndCalculateData(courseStartDate, courseEndDate){
    // ø CREATE_NEW_COURSE_02_collectAndCalculateData
	// console.group(`collectAndCalculateData(${courseEndDate})`)
	console.groupCollapsed(`collectAndCalculateData(${courseEndDate})`)
	// let newCourseDataObject = JSON.parse(session.getItem('lastResponseObject'))/*BIGBLEED*//*LINE_613*/
	let newCourseDataObject = JSON.parse(memory.getItem('memoryResponseObject'))/*BIGBLEED*//*LINE_613*/
	// console.log(`newCourseDataObject: `)
	// console.dir(newCourseDataObject)
	// return
	let newCourseApiObject = CONSTRUCT_apiObject_POSTbyKind('courses')
	console.log(`newCourseApiObject = CONSTRUCT_apiObject_POSTbyKind('courses'): `)
	console.dir(newCourseApiObject)
	let gradeLevelKey = $w('#gradeLevelDRPDN').value === 'NA' ? 'GL' + $w('#minGradeDRPDN').value + $w('#maxGradeDRPDN').value : $w('#gradeLevelDRPDN').value
	let daysofweek = ($w('#daysOfWeekCBXGRP').selectedIndices).toString()
	console.log(`daysofweek: ${daysofweek}`)
	console.log(`typeof daysofweek: ${typeof daysofweek}`)
	newCourseApiObject.workingDataObject.type = "courses"
	newCourseApiObject.workingDataObject.title = $w('#courseNameDisplayINPUT').value
	// newCourseApiObject.workingDataObject.promote = true
	// newCourseApiObject.workingDataObject.sticky = false
	newCourseApiObject.workingDataObject.field_coursedateend = courseEndDate
	newCourseApiObject.workingDataObject.field_coursedatestart = courseStartDate
	newCourseApiObject.workingDataObject.field_coursekey = "z_BELOW_z"
	newCourseApiObject.workingDataObject.field_coursename = newCourseDataObject.name
	newCourseApiObject.workingDataObject.field_coursenameabbrv = newCourseDataObject.abbrvName
	newCourseApiObject.workingDataObject.field_coursenameabbrv = newCourseDataObject.abbrvName
	newCourseApiObject.workingDataObject.field_courseoptions = $w('#halfDayCBXGRP').value.toString()
	newCourseApiObject.workingDataObject.field_coursetimeduration = $w('#durationTMPKR').value
	newCourseApiObject.workingDataObject.field_coursetimeduration = $w('#durationTMPKR').value
	newCourseApiObject.workingDataObject.field_coursetimestart = $w('#startTimeTMPKR').value
	newCourseApiObject.workingDataObject.field_curriculumid = Number(newCourseDataObject.curriculumId)
	newCourseApiObject.workingDataObject.field_curriculumkey = newCourseDataObject.textKey
	newCourseApiObject.workingDataObject.field_daysofweek = daysofweek
	// newCourseApiObject.workingDataObject.field_enrollexcptn = "NNULL"
	newCourseApiObject.workingDataObject.field_gradelevelkey = gradeLevelKey
	newCourseApiObject.workingDataObject.field_jcal = "NNULL"
	newCourseApiObject.workingDataObject.field_locationkey = $w('#regionLocationKeyINPUT').value
	newCourseApiObject.workingDataObject.field_locationname = $w('#regionLocationINPUT').value
	newCourseApiObject.workingDataObject.field_sectionarray = "z_BELOW_z"
	newCourseApiObject.workingDataObject.field_sectioncount = 1
	newCourseApiObject.workingDataObject.field_termid = newCourseDataObject.termId
	newCourseApiObject.workingDataObject.field_weekid = getWeekId($w('#startDateDTPKR').value)
    
	// let requiredAttributesArray = ['curriculumKey', 'termId', 'weekId', 'gradeLevelKey', 'locationKey', 'sectionId']
	let courseObjectHOLDER = {}
	courseObjectHOLDER.curriculumKey = newCourseApiObject.workingDataObject.field_curriculumkey
	courseObjectHOLDER.termId = newCourseApiObject.workingDataObject.field_termid
	courseObjectHOLDER.weekId = newCourseApiObject.workingDataObject.field_weekid
	courseObjectHOLDER.gradeLevelKey = newCourseApiObject.workingDataObject.field_gradelevelkey
	courseObjectHOLDER.locationKey = newCourseApiObject.workingDataObject.field_locationkey
	courseObjectHOLDER.sectionId = newCourseApiObject.workingDataObject.field_sectioncount
	courseKeyHuman(courseObjectHOLDER)
	newCourseApiObject.workingDataObject.field_coursekey = courseObjectHOLDER.courseKey
	newCourseApiObject.workingDataObject.field_sectionarray = courseObjectHOLDER.sectionKey
    // ! CONSIDER HERE: {sectionObjectEscapedJSON} from 'public/courseCatalogModule.js'
    
	// $w('#developerTaskTXTBX').value =  JSON.stringify(newCourseApiObject)
    
	newCourseApiObject.paramObject.requestBody = utilityDirectParseDataIntoTemplate(JSON.stringify(newCourseApiObject.docDbJSON.template),newCourseApiObject.workingDataObject)
    
	// session.setItem('lastResponseObject', JSON.stringify(newCourseApiObject))/*BIGBLEED*//*LINE_663*/
	memory.setItem('memoryResponseObject', JSON.stringify(newCourseApiObject))/*BIGBLEED*//*LINE_663*/
	// ø CREATE_NEW_COURSE_02_collectAndCalculateData
	// ø NEXT CREATE_NEW_COURSE_03_composeAndDisplayPreview
	composeAndDisplayPreview(newCourseApiObject.workingDataObject)
}
// ø <---------- </collectAndCalculateData(courseStartDate, courseEndDate)> ---------->

// ø <---------- <Compose & Display Preview>  ---------->
export function composeAndDisplayPreview(workingDataObject){
	// ø CREATE_NEW_COURSE_03_composeAndDisplayPreview
	console.group(`composeAndDisplayPreview(newCourseDataObject)`)
	// console.groupCollapsed(`composeAndDisplayPreview(newCourseDataObject)`)
	
	$w('#formPreviewCNTBX').show()

	$w('#newCourseDataObjectPreview').text = 'PASSTHRU: composeAndDisplayPreview(newCourseDataObject)'
	$w('#newCourseDataObjectPreview').text += '\nWill Use Console-Log to proceed, leave this task for last'
	
	$w('#previewCourseBTN').hide()
	$w('#postCourseBTN').show()

	console.log(`groupEnd: composeAndDisplayPreview(newCourseDataObject)`)
	console.groupEnd()
	console.group(`Automated Code from api_OOP`)

	// <COMPOSE_PREVIEW_TEXT>
	delete workingDataObject.type
	console.log(`before Preview Composition Code: workingDataObject: [object below`)
	console.dir(workingDataObject)

	let lineBeginText = ''
	let paddedAttribute = 'PENDING'
	let paddingSide = 'LEFT'
	paddingSide = paddingSide === 'LEFT' ? paddingSide : 'RIGHT'
	let keyValueSeparatorText = ': '
	let maxLength = 0
	let attributeArrayMaxLength = Object.keys(workingDataObject)
	let attributeKeyString = 'PENDING'//Separate attributes from Key-Strings so that you can get fancy later
	let attributeArrayKeyString = []//Separate attributes from Key-Strings so that you can get fancy later
	for (let indexMaxLength = 0; indexMaxLength < attributeArrayMaxLength.length; indexMaxLength++){
		attributeKeyString = '>' + attributeArrayMaxLength[indexMaxLength] + '<' // Ugly, but fancy...
		attributeArrayKeyString.push(attributeKeyString)
		//const attributeMaxLength = attributeArrayMaxLength[indexMaxLength]
		maxLength = maxLength > attributeKeyString.length ? maxLength : attributeKeyString.length
	}
	console.log(`attributeArrayKeyString: RAW:`)
	console.dir(attributeArrayKeyString)
	// ø CREATE_NEW_COURSE_03a_transformBlock
	let transformObject = {}
	// let transformObject = {"title":{"key":"title","label":"Course Name Display","reorderEdited":100,"reorderIndex":0},"field_coursedateend":{"key":"field_coursedateend","label":"Course Date End","reorderEdited":301,"reorderIndex":8},"field_coursedatestart":{"key":"field_coursedatestart","label":"Course Date Start","reorderEdited":300,"reorderIndex":7},"field_coursekey":{"key":"field_coursekey","label":"Course Key","reorderEdited":104,"reorderIndex":4},"field_coursename":{"key":"field_coursename","label":"Course Name","reorderEdited":101,"reorderIndex":1},"field_coursenameabbrv":{"key":"field_coursenameabbrv","label":"Course Name Abbrv","reorderEdited":102,"reorderIndex":2},"field_coursetimeduration":{"key":"field_coursetimeduration","label":"Course Time Duration","reorderEdited":303,"reorderIndex":10},"field_coursetimestart":{"key":"field_coursetimestart","label":"Course Time Start","reorderEdited":302,"reorderIndex":9},"field_curriculumid":{"key":"field_curriculumid","label":"Curriculum ID","reorderEdited":1001,"reorderIndex":16},"field_curriculumkey":{"key":"field_curriculumkey","label":"Curriculum Key","reorderEdited":103,"reorderIndex":3},"field_daysofweek":{"key":"field_daysofweek","label":"Days of Week","reorderEdited":304,"reorderIndex":11},"field_enrollexcptn":{"key":"field_enrollexcptn","label":"Enroll Excptn","reorderEdited":2299,"reorderIndex":19},"field_gradelevelkey":{"key":"field_gradelevelkey","label":"Grade Level Key","reorderEdited":400,"reorderIndex":13},"field_jcal":{"key":"field_jcal","label":"jCal","reorderEdited":305,"reorderIndex":12},"field_locationkey":{"key":"field_locationkey","label":"Location Key","reorderEdited":501,"reorderIndex":15},"field_locationname":{"key":"field_locationname","label":"Location Name","reorderEdited":500,"reorderIndex":14},"field_sectionarray":{"key":"field_sectionarray","label":"Section Key","reorderEdited":105,"reorderIndex":5},"field_sectioncount":{"key":"field_sectioncount","label":"Section Count","reorderEdited":106,"reorderIndex":6},"field_termid":{"key":"field_termid","label":"Term ID","reorderEdited":1900,"reorderIndex":17},"field_weekid":{"key":"field_weekid","label":"Week ID","reorderEdited":2000,"reorderIndex":18}}
	// attributeArrayKeyString = ["Course Name Display","Promote","Sticky","Course Date End","Course Date Start","Course Key","Course Name","Course Name Abbrv","Curriculum ID","Curriculum Key","Days of Week","Grade Level Key","Location Key","Location Name","Section","Section Count","Term ID","Week ID"]
	// attributeArrayKeyString = ["Course Name Display","Promote","Sticky","Course Date End","Course Date Start","Course Key","Course Name","Course Name Abbrv","Curriculum ID","Curriculum Key","Days of Week","Grade Level Key","jCal Expression","Location Key","Location Name","Section","Section Count","Term ID","Week ID"]
	// • ¯\_(ツ)_/¯   ¯\__ (keep jCAL field as 'NNULL' - expect it to be more important) __/¯
	// attributeArrayKeyString = ["Course Name Display","Course Date End","Course Date Start","Course Key","Course Name","Course Name Abbrv","Course Time Duration","Course Time Start","Curriculum ID","Curriculum Key","Days of Week","Enroll Excptn","Grade Level Key","jCal","Location Key","Location Name","Section Key","Section Count","Term ID","Week ID"]
	// ø ¯\__ (      2021-12-12T17:17:00 update to add Start Time and Time Duration, using new mechanism (AGAIN!)       ) __/¯
	// attributeArrayKeyString = ["Course Name Display","Course Date End","Course Date Start","Course Key","Course Name","Course Name Abbrv","Course Time Duration","Course Time Start","Curriculum ID","Curriculum Key","Days of Week","Enroll Excptn","Grade Level Key","jCal","Location Key","Location Name","Section Key","Section Count","Term ID","Week ID"]
	// ø ¯\__ (      2021-12-12T18:21:00 update to add Start Time and Time Duration, using new mechanism (AGAIN!)       ) __/¯
	// attributeArrayKeyString = ["Course Name DisplayZ","Course Date EndZ","Course Date StartZ","Course KeyZ","Course NameZ","Course Name AbbrvZ","Course Time DurationZ","Course Time StartZ","Curriculum IDZ","Curriculum KeyZ","Days of WeekZ","fGrade Level KeyZ","jCalZ","Location KeyZ","Location NameZ","SectionZ","Section CountZ","Term IDZ","Week IDZ"]
	// ø ¯\__ (      2021-12-13T06:21:00 Full-Boat Documented       ) __/¯
	// attributeArrayKeyString = ["ZCourse Name Display","Course Date End","Course Date Start","Course Key","Course Name","Course Name Abbrv","Course Time Duration","Course Time Start","Curriculum ID","Curriculum Key","Days of Week","Grade Level Key","jCal","Location Key","Location Name","Section Key","Section Count","Term ID","Week ID"]
	// ø ¯\__ (      2021-12-13T08:28:00 Full-Boat Documented       ) __/¯
	attributeArrayKeyString = ["Course Name Display","Course Date End","Course Date Start","Course Key","Course Name","Course Name Abbrv","Half Day Options","Course Time Duration","Course Time Start","Curriculum ID","Curriculum Key","Days of Week","Grade Level Key","jCal","Location Key","Location Name","Section Key","Section Count","Term ID","Week ID"]
	// ø ¯\__ (      2021-12-13T14:13:00 Full-Boat Documented       ) __/¯
	let attributeArrayReOrderArray = []
	// let attributeArrayReOrderArray = [0,6,7,14,13,11,4,3,10,12,16,18,17,8,9,5,15,1,2]
	// let attributeArrayReOrderArray = [0,7,8,4,1,2,10,9,16,3,11,19,13,12,15,14,5,6,17,18]
	// ø ¯\__ (      2021-12-12T17:17:00 update to add Start Time and Time Duration, using new mechanism (AGAIN!)       ) __/¯
	// let attributeArrayReOrderArray = [0,8,7,4,1,2,10,9,16,3,11,19,13,12,15,14,5,6,17,18]
	// attributeArrayReOrderArray = [2,11,10,6,3,4,13,12,9,5,14,16,15,18,17,7,8,0,1]
	// ø ¯\__ (      2021-12-13T06:21:00 Full-Boat Documented       ) __/¯
	// attributeArrayReOrderArray = [0,11,10,4,1,2,13,12,16,3,14,7,15,9,8,5,6,17,18]
	// ø ¯\__ (      2021-12-13T08:28:00 Full-Boat Documented       ) __/¯
	attributeArrayReOrderArray = [0,8,7,4,1,2,11,10,9,17,3,12,14,13,16,15,5,6,18,19]
	// ø ¯\__ (      2021-12-13T14:13:00 Full-Boat Documented       ) __/¯
	let reOrderIndex = 0
	// • ¯\_(ツ)_/¯   ¯\__ (keep jCAL field as 'NNULL' - expect it to be more important) __/¯
	// ø <Transform Literals>
	// ø ø <Transform Workings>
	console.log(`<Transform Workings>`)
	// let workingDaysOfWeek = workingDataObject.field_daysofweek.toString() + 'ZZZ'
	let workingDaysOfWeek = jsDaysOfWeekArrayToString(workingDataObject.field_daysofweek)
	console.log(`</Transform Workings>`)
	// ø ø </Transform Workings>
	let transformLiteralsObject = {}
	transformLiteralsObject.field_jcal = 'jCal formatted schedule is pending'
	transformLiteralsObject.field_daysofweek = workingDaysOfWeek
	transformLiteralsObject.field_coursedatestart = format(new Date(workingDataObject.field_coursedatestart), 'EEE MMMMMM d, yyyy')
	transformLiteralsObject.field_coursedateend = format(new Date(workingDataObject.field_coursedateend), 'EEE MMMMMM d, yyyy')
	
	// ø </Transform Literals>
	// console.log(`attributeArrayKeyString: DISPLAY:`)
	// console.dir(attributeArrayKeyString)
	// • COURSES: ["title","promote","sticky","field_coursedateend","field_coursedatestart","field_coursekey","field_coursename","field_coursenameabbrv","field_curriculumid","field_curriculumkey","field_daysofweek","field_gradelevelkey","field_jcal","field_locationkey","field_locationname","field_sectionarray","field_sectioncount","field_termid","field_weekid"]
	maxLength = paddingSide === 'LEFT' ? maxLength * -1 : maxLength
	let valueString = 'STRING'
	let padding = '                                                  '
	let previewText = ''
	//let attributeKeyString = 'PENDING'
	let attributeArray = Object.keys(workingDataObject)
	console.log(`≈673≈ attributeArray: [array below]`)
	console.dir(attributeArray)
	let develReorderAttributeArray = []
	let noDisplayAttributeArray = ['promote','sticky']
	let develReorderIndex = 777
	let develReorderIndexArray = []
	for (let index = 0; index < attributeArray.length; index++){
		reOrderIndex = index
		// develReorderIndex = 777
		if(typeof attributeArrayReOrderArray.indexOf(index) === 'number'){
			develReorderIndex = attributeArrayReOrderArray.indexOf(index)
			reOrderIndex = attributeArrayReOrderArray.indexOf(index)
		}
		develReorderIndexArray.push(develReorderIndex)
		// if(typeof transformObject[attribute]['reorderIndex'] === 'number'){
		// 	reOrderIndex = transformObject[attribute]['reorderIndex']
		// }
		const attribute = attributeArray[reOrderIndex]
		// if(typeof attributeArrayReOrderArray[index] === 'number'){
		// 	reOrderIndex = attributeArrayReOrderArray[index]
		// }
		attributeKeyString = attribute
		if (typeof attributeArrayKeyString[reOrderIndex] === 'string') {
			attributeKeyString = attributeArrayKeyString[reOrderIndex]
		}
		// if(typeof transformObject[attribute]['label'] === 'string'){
		// 	attributeKeyString = transformObject[attribute]['label']
		// }
		// if(typeof attributeArrayKeyString[reOrderIndex] === 'string'){
		// 	attributeKeyString = attributeArrayKeyString[reOrderIndex]
		// }
		develReorderAttributeArray.push(attribute)
		if(typeof workingDataObject[attribute] === 'undefined'){
			workingDataObject[attribute] = `${attribute} UNDEFINED`
		}
		valueString = typeof transformLiteralsObject[attribute] === 'string' ? transformLiteralsObject[attribute] : workingDataObject[attribute].toString()
		if(!noDisplayAttributeArray.includes(attribute)){
			paddedAttribute = paddingSide === 'LEFT' ? (padding + attributeKeyString).substr(maxLength) : (attributeKeyString + padding).substr(0,maxLength)
			previewText += '\n ' + lineBeginText + ' ' + paddedAttribute + keyValueSeparatorText  
			previewText += valueString
		}
	}
	// </COMPOSE_PREVIEW_TEXT>
	console.log(`after 'COMPOSE_PREVIEW_TEXT': develReorderIndexArray: [${develReorderIndexArray.toString()}]`)
	console.log(`after 'COMPOSE_PREVIEW_TEXT': develReorderAttributeArray: [${develReorderAttributeArray.toString()}]`)
	console.warn(previewText)
	$w('#newCourseDataObjectPreview').text = previewText
	console.groupEnd()


	// ø TERMINUS CREATE_NEW_COURSE_03_composeAndDisplayPreview
	// ø NEXT-BTN_click => CREATE_NEW_COURSE_04_Click_PostBTN
}
// ø <---------- </Compose & Display Preview> ---------->

//==================================================     </Preview Button: Compose & Display>
//==========================================================================================

//==========================================================================================
//==================================================      <Post Course & API POST to Drupal>

// ø <---------- <Post Course to Drupal>  ---------->
export async function newCourseDrupalPOST(newCourseDrupalObject = {}){
    // ø CREATE_NEW_COURSE_05_newCourseDrupalPOST
	console.group(`newCourseDrupalPOST(newCourseDrupalObject)`)
	// console.groupCollapsed(`newCourseDrupalPOST(newCourseDrupalObject)`)
	console.log(`newCourseDrupalObject: prototype only: [object below]`)
	console.dir(newCourseDrupalObject)

	let kludgeOptionsReturn = $w('#kludgeBooleanRADIO').value === 'true' ? true : false
	// $w('#kludgeBooleanRADIO').value = 'false'
	if (kludgeOptionsReturn) {
        let kludgeExpires = new Date(2021,12,5)
        let now = new Date()
        if(now > kludgeExpires){
            kludgeOptionsReturn = false
        }
    }


	// let newCourseApiObject = JSON.parse(session.getItem('lastResponseObject'))/*BIGBLEED*//*LINE_789*/
	let newCourseApiObject = JSON.parse(memory.getItem('memoryResponseObject'))/*BIGBLEED*//*LINE_789*/
	if (kludgeOptionsReturn) {
		// newCourseApiObject.paramObject.requestBody = newCourseApiObject.paramObject.requestBody.replace('courses','course')
	}

	let responseObject = await postDrupalNode(newCourseApiObject.paramObject.requestBody, kludgeOptionsReturn)
	let responseString = 'PPENDING'
	let responseBoolean = null
	console.log(`newCourseDrupalPOST: postDrupalNode: responseObject: [object below]`)
	console.dir(responseObject)
	$w('#developerResponseTXTBX').value = JSON.stringify(responseObject, undefined, 4)
	// $w('#developerResponseTXTBX').value = responseObject
	if(typeof responseObject.nid === 'undefined'){
		responseBoolean = false
		responseString = 'ERROR: Course Not Posted [1]'// get fancier later if you capture the promise-error
	}else if(responseObject.nid[0].value > 3500){
		responseBoolean = true
		responseString = `SUCEESS: Course Posted [${responseObject.nid[0].value}]`// get fancier later if you capture the promise-error
	}else{
		responseBoolean = false
		responseString = 'ERROR: Course Not Posted [2]'// get fancier later if you capture the promise-error
	}

	console.log(`responseString: `)
	console.log(responseString)
	$w('#previewErrorStringTXT').expand()
	$w('#previewErrorStringTXT').text = responseString
		
	// $w('#previewErrorStringTXT').text = `Holder for Errors`
	// $w('#previewErrorStringTXT').collapse()
	$w('#newCourseDataObjectPreview').text = `use $w('#coursePreviewTXT').html`
	$w('#previewCourseBTN').hide()
	$w('#formPreviewCNTBX').hide()
	$w('#postCourseBTN').hide()
	$w('#selectedNewCourseBTN').disable()



	// ø TERMINUS CREATE_NEW_COURSE_05_newCourseDrupalPOST
	// ø ANOTHER COURSE: NEXT-BTN_click => CREATE_NEW_COURSE_±3_Click_clearCourseForm

	// console.log(`only console.log() for now...`)
	console.log(`groupEnd: newCourseDrupalPOST(newCourseDrupalObject)`)
	console.groupEnd()

}
// ø <---------- </Post Course to Drupal> ---------->

// ø <---------- <Reset WiX Page for Next Course>  ---------->
// ø <---------- </Reset WiX Page for Next Course> ---------->

//==================================================     </Post Course & API POST to Drupal>
//==========================================================================================


//====================================================================================================
//============================================================                 </Overall Build Course>
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
// KLUDGE BUTTON AS STEPS:
/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function develTestingBTN_click(event) {
	develTestingCALL() 
}
async function develTestingCALL(){
	if($w('#develTestingRADIOGRP').value === 'CURRENT'){
		await onReadyCurriculaJSON()
	}
	if($w('#develTestingRADIOGRP').value === 'ONDECK'){
		konstantSelectedCurriculaRepeaterOnReady()
	}
}
export async function doKLUDGE(){
	const wIdKldgeDoxTXTBX = '#developerTaskTXTBX'
	const wIdKldgeResponseTXTBX = '#developerResponseTXTBX'
	let KLUDGE = ''
	let step = KLUDGE
	let iso = '2021-11-26T08:44:00'
	let descrArray = []
	{
		// // let nidArray = [3473]
		// let nidArray = [3495,3496,3497,3498]
		// let nidThis = nidArray[Math.floor(Math.random() * nidArray.length)]
		// // // let nidThis = nidArray[nidArray.length - 1]
		// // let nidThis = nidArray[0]
		// console.log(`nidThis: ${nidThis}`)
		// {
		// 	// KLUDGE = 'drupalNodeGET(nidThis)'
		// 	KLUDGE = 'getDrupalNode(nidThis)'
		// 	step = KLUDGE
		// 	iso = '2021-11-30T16:53:00'
		// 	descrArray = []
		// 	KLUDGE = `getDrupalNode(${nidThis})`
		// 	descrArray.push(KLUDGE)
		// 	KLUDGE = `import {getDrupalNode} from 'backend/apiDrupalModule.jsw'`
		// 	descrArray.push(KLUDGE)
		// 	KLUDGE = `[below always last]`
		// 	KLUDGE = iso
		// 	descrArray.push(KLUDGE)
		// }

		// // drupalNodeGET(nidThis)
		// // export async function getDrupalNode(nid) 
		// let responseObject = await getDrupalNode(nidThis)
		// $w(wIdKldgeResponseTXTBX).value = JSON.stringify(responseObject, undefined, 4)
	}
	{
		// let natoPhoneticObject = getNatoPhoneticArrayObjectItem('R')
		// let natoPhoneticObject = getNatoPhoneticArrayObjectItem('Juliet')
		// let natoPhoneticObject = getNatoPhoneticArrayObjectItem('F')
		// let natoPhoneticObject = getNatoPhoneticArrayObjectItem('Oscar')
		let natoPhoneticObject = getNatoPhoneticArrayObjectItem('Ozark')
		// $w(wIdKldgeResponseTXTBX).value = JSON.stringify(natoPhoneticObject, undefined, 4)
		
		{
			KLUDGE = 'postDrupalNode(requestBodyThis)'
			step = KLUDGE
			iso = '2021-11-30T18:11:00'
			descrArray = []
			KLUDGE = 'drupalNodePOST(requestBodyThis)'
			descrArray.push(KLUDGE)
			KLUDGE = `import {postDrupalNode} from 'backend/apiDrupalModule.jsw'`
			descrArray.push(KLUDGE)
			KLUDGE = 'title: ' + natoPhoneticObject.word
			descrArray.push(KLUDGE)
			KLUDGE = 'body: ' + natoPhoneticObject.sentence
			descrArray.push(KLUDGE)
			KLUDGE = 'kludgeObject: for testing'
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
		let requestBodyThis = "{\n  \"type\":[{\"target_id\":\"page\"}],\n  \"title\":[{\"value\":\"{%title%}\"}],\n  \"body\":[{\"value\":\"{%body%}\"}]\n}"
		requestBodyThis = requestBodyThis.replace('{%title%}',natoPhoneticObject.word)
		requestBodyThis = requestBodyThis.replace('{%body%}',natoPhoneticObject.sentence)
		// console.log(`requestBodyThis: `)
		let kludgeOptionsReturn = $w('#kludgeBooleanRADIO').value === 'true' ? true : false
		// $w('#kludgeBooleanRADIO').value = 'false'
		// console.log(requestBodyThis)
		// iso = requestBodyThis
		// drupalNodePOST(requestBodyThis)
		// let responseObject = await postDrupalNode(requestBodyThis)
		// let responseObject = await postDrupalNode(requestBodyThis, true)
		let responseObject = await postDrupalNode(requestBodyThis, kludgeOptionsReturn)
		$w(wIdKldgeResponseTXTBX).value = JSON.stringify(responseObject, undefined, 4)
		
	}

}
 

//==================================================                 </KLUDGE Buttons Steps>
//==========================================================================================



//====================================================================================================
//====================================================================================================
//============================================================                      Buttons ONLY Below
//============================================================                      (and other Events)
//====================================================================================================

export function btnblkToggle4BTN_click(event) {
	btnblkToggleBTN_click('btnblkToggle4BTN_click(event)')
}

export function btnblkDo4BTN_click(event) {
	btnblkDoBTN_click('btnblkDo4BTN_click(event)') 
}

export function selectedNewCourseBTN_click(event) {
	// ø CREATE_NEW_COURSE_±1_completeCourseForm_SCRIPTS
	let scriptName = 'selectedNewCourseBTN_click'
	let clickedItemData = processSelectCurriculum(event,scriptName)
	// ø NEXT CREATE_NEW_COURSE_±1a_instantiateNewCourseObject
	instantiateNewCourseObject(clickedItemData)
}

export function btnKLUDGEdeveloperTask_click(event) {
	doKLUDGE()
}

export function selectLocationBTN_click(event) {
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
}

export function rawPreviewKLUDGE_PreTrash(){
	let newCourseDataObject = {"topping":[{"id":"5001","type":"None"},{"id":"5002","type":"Glazed"},{"id":"5005","type":"Sugar"},{"id":"5007","type":"Powdered Sugar"},{"id":"5006","type":"Chocolate with Sprinkles"},{"id":"5003","type":"Chocolate"},{"id":"5004","type":"Maple"}]}
	console.log(`newCourseDataObject: [object below] [maybe]]`)
	console.dir(newCourseDataObject)
	$w('#formPreviewCNTBX').show()
	$w('#coursePreviewTXT').text = JSON.stringify(newCourseDataObject, undefined, 4)
	
}

export function previewCourseBTN_click(event) {
	// ø CREATE_NEW_COURSE_00_Click_PreviewBTN
	// ø NEXT CREATE_NEW_COURSE_01_ValidateFormData
	validateFormData()
}
export async function postCourseBTN_click(event) {
	// ø CREATE_NEW_COURSE_04_Click_PostBTN
    // ø NEXT CREATE_NEW_COURSE_05_newCourseDrupalPOST
	$w('#postCourseBTN').hide()
	await newCourseDrupalPOST()
}

export function clearCourseFormBTN_click(event) {
	$w('#postCourseBTN').hide()
	// ø CREATE_NEW_COURSE_±3_Click_clearCourseForm
	// ø NEXT CREATE_NEW_COURSE_±2_resetCourseForm
	resetCourseFormAll()
}

export function getItemLastResponseObjectBTN_click(event) {
	// $w('#developerResponseTXTBX').value = session.getItem('lastResponseObject')/*BIGBLEED*//*LINE_1015*/
	$w('#developerResponseTXTBX').value = memory.getItem('memoryResponseObject')/*BIGBLEED*//*LINE_1015*/
}

export function kludgeDevelBTN_click(event) {
	$w("#BannerStateBox").changeState("Four");
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
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

/**
*	Adds an event handler that runs when an input element's value
 is changed.
	[Read more](https://www.wix.com/corvid/reference/$w.ValueMixin.html#onChange)
*	 @param {$w.Event} event let 
*/
export function summerTmBlksRDBTNS_change(event) {
	onChangeStartTimeDurationRadioSettings('summerTmBlksRDBTNS_change')
}

/**
*	Adds an event handler that runs when an input element's value
 is changed.
	[Read more](https://www.wix.com/corvid/reference/$w.ValueMixin.html#onChange)
*	 @param {$w.Event} event
*/
export function startTimeTMPKR_change(event) {
	onChangeStartTimeDurationRadioSettings('startTimeTMPKR_change')
}

/**
*	Adds an event handler that runs when an input element's value
 is changed.
	[Read more](https://www.wix.com/corvid/reference/$w.ValueMixin.html#onChange)
*	 @param {$w.Event} event
*/
export function durationTMPKR_change(event) {
	onChangeStartTimeDurationRadioSettings('durationTMPKR_change')
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function develBTN_click(event) {
	console.log(`export function develBTN_click(event)`)
	toggleTopSection()
}

export function curriculaSelectedPGNTN_click(event) {
	evaluationPaginationAndLoadRepeater()
}