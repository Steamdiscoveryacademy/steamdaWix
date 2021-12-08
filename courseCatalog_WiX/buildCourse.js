// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import {local, session, memory} from 'wix-storage';
import wixData from 'wix-data';
import wixWindow from 'wix-window';
import wixLocation from 'wix-location';
import {addFrom_toggleExpandButtons} from 'public/buttonBlockModule.js'; 
import {assignStringsOnReady} from 'public/buttonBlockModule.js'; 
import {btnblkToggleBTN_click} from 'public/buttonBlockModule.js'; 
import {btnblkDoBTN_click} from 'public/buttonBlockModule.js'; 
import {getWeekId} from 'public/utilityModule.js'; 
import {courseKeyHuman} from 'public/utilityModule.js'; 
import {datestampinventoryDocDbJSON} from 'public/inventoryDocDbJSON.js'
import {getInventoryResponse} from 'public/inventoryDocDbJSON.js'
import {timeCrunch} from 'public/timeCrunchModule.js'
import {getEndDateFromSchedule_Start_Weeks_DaysOfWeek} from 'public/timeCrunchModule.js'
import {sectionObjectEscapedJSON} from 'public/courseCatalogModule.js'
import {getNatoPhoneticArrayObjectItem} from 'public/natoPhoneticTestData.js';
import {getDrupalNode} from 'backend/apiDrupalModule.jsw';
import {postDrupalNode} from 'backend/apiDrupalModule.jsw';
import {patchDrupalNode} from 'backend/apiDrupalModule.jsw';
import {CONSTRUCT_apiObject_POSTbyKind} from 'public/apiObjectPrepModule.js';
// import {apiObjectPrep} from 'public/apiObjectPrepModule.js';
import {utilityDirectParseDataIntoTemplate} from 'public/apiObjectPrepModule.js';


// ø QUICK_LIST:
// ø CREATE_NEW_COURSE
// ø CREATE_NEW_COURSE_±2_Click_clearCourseForm
// ø CREATE_NEW_COURSE_±1_resetCourseForm
// ø 
// ø CREATE_NEW_COURSE_00_Click_PreviewBTN
// ø CREATE_NEW_COURSE_01_ValidateFormData
// ø CREATE_NEW_COURSE_02
// ø CREATE_NEW_COURSE_02_collectAndCalculateData [CREATE_NEW_COURSE_02_catchAndDisplayError]
// ø CREATE_NEW_COURSE_03_composeAndDisplayPreview
// ø CREATE_NEW_COURSE_04_Click_PostBTN
// • ø NOT A STEP: BUT DEP calculateDefaultSectionDEPRECATED (newCourseDataObject)
// • ø NOT A STEP: BUT DEP collectAndCalculateDataORIG_DEP(courseStartDate, courseEndDate)
// • ø CREATE_NEW_COURSE_05_buttonPostCourseSequence
// • ø CREATE_NEW_COURSE_06_calculateNewCoursePOST
// • ø ø CREATE_NEW_COURSE_06a_sectionObjectEscapedJSON
// • ø CREATE_NEW_COURSE_07_newCoursePrePOST
// ø RENAMED CREATE_NEW_COURSE_08_newCourseDrupalPOST
// ø CREATE_NEW_COURSE_05_newCourseDrupalPOST


$w.onReady(async function () {
	await onReadyCurriculaJSON()
	wixStorageDisplayOnReady()	
    datestampinventoryDocDbJSONOnReady()
	develOnReady()
	// callPublicADD_from_toggleExpandButtons_OnReady ()
	let buttonObjectButtonsUsedArray = [4]
	assignStringsOnReady(buttonObjectButtonsUsedArray,[4])
});
export function  datestampinventoryDocDbJSONOnReady() {
    console.groupCollapsed(`'inventoryDocDbJSON.js' date-stamp function DEMO`)
    let datestampStringResult = datestampinventoryDocDbJSON();
    console.log(datestampStringResult);
    console.log(`groupEnd: 'inventoryDocDbJSON.js' date-stamp function DEMO`);
    console.groupEnd()
}
export function wixStorageDisplayOnReady(){
	// set lastTermNameTXT
	$w('#lastTermNameTXT').text = 'Course Building for: ' + session.getItem('lastTermName')
}
export async function onReadyCurriculaJSON(){
	await load_reloadEntirePage()
}
//====================================================================================================
//==============================        <loadCurriculaRepeater>         ==============================
//====================================================================================================
export async function load_reloadEntirePage(kind = 'ONREADY'){
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
	// session.setItem('curriculaBuffer',JSON.stringify(curriculaBufferThis))
	// session.setItem('curriculaBufferNOCHANGE',JSON.stringify(termObject.curriculum.curricula))
	session.setItem('curriculaBuffer', curriculaBufferThis)
	session.setItem('curriculaBufferNOCHANGE',curriculaBufferThis)
	loadAllCurriculaRepeaters()
}
export function loadAllCurriculaRepeaters(){
	// ø <Tasks Upon any loadCurricularRepeater>
	// if(session.getItem('curriculaBuffer') !== session.getItem('curriculaBufferNOCHANGE')){
	// 	$w('#updatesPendingCONTBX').expand()
	// }
	// ø </Tasks Upon any loadCurricularRepeater>
	let simpleParamArray = ['yes']
	// let simpleParamArray = ['maybe','yes','no']
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
	$w('#developerResponseTXTBX').value = JSON.stringify(paginationObject,undefined,4)
}
export function loadCurriculaRepeater(simpleParam = 'default'){
	// console.group(`loadCurriculaRepeater(repeaterId = 'default', status = '0')`)
	console.groupCollapsed(`loadCurriculaRepeater(${simpleParam} = 'default')`)
	// console.group(`loadCurriculaRepeater(${simpleParam} = 'default')`)
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
		$curriculumElement(keyTXTid).text = curriculumElementData.textKey;
		$curriculumElement(nameTXTid).text = curriculumElementData.name;
	});

	console.log(`groupEnd: rptr load iteration: repeaterId: ${repeaterId}`)
	console.groupEnd()

	console.log(`groupEnd: loadCurriculaRepeater(${simpleParam} = 'default')`)
	console.groupEnd()
	return paginationObject
}
export function processYesMaybeNoForSix(event,scriptName){
	console.groupCollapsed(`processYesMaybeNoForSix(scriptname)`)
	// console.group(`processYesMaybeNoForSix(scriptname)`)
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
	console.log(`groupEnd: processYesMaybeNoForSix(scriptname)`)
	console.groupEnd()
	return clickedItemData

}

//====================================================================================================
//==============================        </loadCurriculaRepeater>        ==============================
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
	let termObject = JSON.parse(local.getItem('lastParamObject'))
}
//========================================       </Confirm Backend with Mulitply and Publick with Add>
//====================================================================================================

//====================================================================================================
//============================================================                  <Overall Build Course>
//====================================================================================================

//==========================================================================================
//==================================================       <Instantiate from Curricula Click>
 
// ø <---------- <restCourseFormAll>  ---------->
// ø CREATE_NEW_COURSE_±1_resetCourseForm
function resetCourseFormAll(){
	let wID_unsetArray = ['#courseNameINPUT','#courseNameDisplayINPUT','#regionLocationINPUT','#regionLocationKeyINPUT']
	for (let index = 0; index < wID_unsetArray.length; index++) {
		const element = wID_unsetArray[index];
		$w(element).value = ''
	}
	$w('#startDateDTPKR').value = null
	$w('#startDateDTPKR').resetValidityIndication()
	$w('#courseNameDisplayINPUT').resetValidityIndication()
	 
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
	session.setItem('lastResponseObject', '')
	// TERMINUS
}
// ø <---------- </restCourseFormAll> ---------->
 
// ø <---------- <On Click Curriculum Object>  ---------->
export function instantiateNewCourseObject(clickedItemData){
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

	let lastTermRecord =  JSON.parse(local.getItem('lastParamObject'))
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
	console.log(`newCourseDataObject:`)
	console.dir(newCourseDataObject)
	
	newCourseFormLoadAfterClick(newCourseDataObject)

	console.log(`groupEnd: export function instantiateNewCourseObject(clickedItemData)`)
	console.groupEnd()

}
// ø <---------- </On Click Curriculum Object> ---------->

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
	session.setItem('lastResponseObject', JSON.stringify(newCourseDataObject))
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
		
		let termObject = JSON.parse(local.getItem('lastParamObject'))
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
	let newCourseDataObject = JSON.parse(session.getItem('lastResponseObject'))
	// console.log(`newCourseDataObject: `)
	// console.dir(newCourseDataObject)
	// return
	let newCourseApiObject = CONSTRUCT_apiObject_POSTbyKind('courses')
	// console.log(`newCourseApiObject: `)
	// console.dir(newCourseApiObject)
	let gradeLevelKey = $w('#gradeLevelDRPDN').value === 'NA' ? 'GL' + $w('#minGradeDRPDN').value + $w('#maxGradeDRPDN').value : $w('#gradeLevelDRPDN').value
	let daysofweek = ($w('#daysOfWeekCBXGRP').selectedIndices).toString()
	console.log(`daysofweek: ${daysofweek}`)
	console.log(`typeof daysofweek: ${typeof daysofweek}`)
	newCourseApiObject.workingDataObject.type = "courses"
	newCourseApiObject.workingDataObject.title = $w('#courseNameDisplayINPUT').value
	newCourseApiObject.workingDataObject.promote = true
	newCourseApiObject.workingDataObject.sticky = false
	newCourseApiObject.workingDataObject.field_coursedateend = courseEndDate
	newCourseApiObject.workingDataObject.field_coursedatestart = courseStartDate
	newCourseApiObject.workingDataObject.field_coursekey = "z_BELOW_z"
	newCourseApiObject.workingDataObject.field_coursename = newCourseDataObject.name
	newCourseApiObject.workingDataObject.field_coursenameabbrv = newCourseDataObject.abbrvName
	newCourseApiObject.workingDataObject.field_curriculumid = Number(newCourseDataObject.curriculumId)
	newCourseApiObject.workingDataObject.field_curriculumkey = newCourseDataObject.textKey
	newCourseApiObject.workingDataObject.field_daysofweek = daysofweek
	newCourseApiObject.workingDataObject.field_enrollexcptn = "NNULL"
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
    
	session.setItem('lastResponseObject', JSON.stringify(newCourseApiObject))
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
	console.log(`attributeArrayKeyString: `)
	console.dir(attributeArrayKeyString)
	attributeArrayKeyString = ["Course Name Display","Promote","Sticky","Course Date End","Course Date Start","Course Key","Course Name","Course Name Abbrv","Curriculum ID","Curriculum Key","Days of Week","Grade Level Key","Location Key","Location Name","Section","Section Count","Term ID","Week ID"]
	maxLength = paddingSide === 'LEFT' ? maxLength * -1 : maxLength
	let padding = '                                                  '
	let previewText = ''
	//let attributeKeyString = 'PENDING'
	let attributeArray = Object.keys(workingDataObject)
	let noDisplayAttributeArray = ['promote','sticky']
	for (let index = 0; index < attributeArray.length; index++){
		attributeKeyString = attributeArrayKeyString[index]
		const attribute = attributeArray[index]
		if(!noDisplayAttributeArray.includes(attribute)){
			paddedAttribute = paddingSide === 'LEFT' ? (padding + attributeKeyString).substr(maxLength) : (attributeKeyString + padding).substr(0,maxLength)
			previewText += '\n ' + lineBeginText + ' ' + paddedAttribute + keyValueSeparatorText  
			previewText += workingDataObject[attribute].toString()
		}
	}
	// </COMPOSE_PREVIEW_TEXT>
	console.warn(previewText)
	$w('#newCourseDataObjectPreview').text = previewText
	console.groupEnd()


	// ø TERMINUS CREATE_NEW_COURSE_03_composeAndDisplayPreview
	// ø NEXT-BTN_click CREATE_NEW_COURSE_04_Click_PostBTN
}
// ø <---------- </Compose & Display Preview> ---------->

//==================================================     </Preview Button: Compose & Display>
//==========================================================================================

//==========================================================================================
//==================================================      <Post Course & API POST to Drupal>

// ø <---------- <Post Course to Drupal>  ---------->
export async function newCourseDrupalPOST(newCourseDrupalObject = {}){
    // ø RENAMED CREATE_NEW_COURSE_08_newCourseDrupalPOST
    // ø CREATE_NEW_COURSE_05_newCourseDrupalPOST
	console.group(`newCourseDrupalPOST(newCourseDrupalObject)`)
	// console.groupCollapsed(`newCourseDrupalPOST(newCourseDrupalObject)`)
	console.log(`newCourseDrupalObject: prototype only: [object below]`)
	console.dir(newCourseDrupalObject)

	let kludgeOptionsReturn = $w('#kludgeBooleanRADIO').value === 'true' ? true : false
	// $w('#kludgeBooleanRADIO').value = 'false'
	if (kludgeOptionsReturn) {
        let kludgeExpires = new Date(2021,11,5)
        let now = new Date()
        if(now > kludgeExpires){
            kludgeOptionsReturn = false
        }
    }


	let newCourseApiObject = JSON.parse(session.getItem('lastResponseObject'))
	if (kludgeOptionsReturn) {
		newCourseApiObject.paramObject.requestBody = newCourseApiObject.paramObject.requestBody.replace('courses','course')
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



	// ø TERMINUS RENAMED CREATE_NEW_COURSE_08_newCourseDrupalPOST
	// ø TERMINUS CREATE_NEW_COURSE_05_newCourseDrupalPOST

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
//==================================================                  <KLUDGE Buttons Steps>
// KLUDGE BUTTON AS STEPS:
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
		
		// {
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
		// }
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
	let scriptName = 'selectedNewCourseBTN_click'
	let clickedItemData = processYesMaybeNoForSix(event,scriptName)
	instantiateNewCourseObject(clickedItemData)
}

export function btnKLUDGEdeveloperTask_click(event) {
	doKLUDGE()
}

export function selectLocationBTN_click(event) {
	if($w('#formLocationRPTR').collapsed === false){
		$w('#formLocationRPTR').collapse()
		return
	}
	let KLUDGE_newCourseDataObject = {}
	$w('#formLocationRPTR').expand()
	appendLocationsJsonDocDb(KLUDGE_newCourseDataObject)
}

export function formSelectLocationBTN_click(event) {
	let clickedItemData = processYesMaybeNoForSix(event,'formSelectLocationBTN_click')
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
	// • ø NEXT CREATE_NEW_COURSE_05_buttonPostCourseSequence
	// await buttonPostCourseSequence()
	// SKIP STEPS 5 - 6 and 7
	// ø NEXT RENAMED CREATE_NEW_COURSE_08_newCourseDrupalPOST
    // ø NEXT CREATE_NEW_COURSE_05_newCourseDrupalPOST
	await newCourseDrupalPOST()
}

export function clearCourseFormBTN_click(event) {
	$w('#postCourseBTN').hide()
	// ø CREATE_NEW_COURSE_±2_Click_clearCourseForm
	// ø NEXT CREATE_NEW_COURSE_±1_resetCourseForm
	resetCourseFormAll()
}

export function getItemLastResponseObjectBTN_click(event) {
	$w('#developerResponseTXTBX').value = session.getItem('lastResponseObject')
}

export function kludgeDevelBTN_click(event) {
	$w("#BannerStateBox").changeState("Four");
}