// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import {local, session, memory} from 'wix-storage';
import wixData from 'wix-data';
import wixWindow from 'wix-window';
import wixLocation from 'wix-location';
import {assignStringsOnReady} from 'public/buttonBlockModule.js'; 
import {btnblkToggleBTN_click} from 'public/buttonBlockModule.js'; 
import {btnblkDoBTN_click} from 'public/buttonBlockModule.js'; 

// ø ================================================================================
// ø ============================================================        <Quick_Find>
// ø Custom_onReady_Scripts
// ø Form_Scripts
// ø ø SET_Scripts_of_Form_Scripts
// ø ø UTILITY_Scripts_of_Form_Scripts
// ø ø UNSET_Scripts_of_Form_Scripts
// ø Data_Action_Scripts
// ø Data_Collection_Scripts
// ø Term_Repeater_Selection_Scripts
// ø Buttons_ONLY_Below
// ! resetWeightTermDataset(termRegion)>
// ø ============================================================       </Quick_Find>
// ø ================================================================================

$w.onReady(function () {
	pageUtilityOnReady()
	termSelectOnReady()
	termBuildOnReady()
});
//====================================================================================================
//============================================================                <Custom_onReady_Scripts>
export function pageUtilityOnReady(){
	let buttonObjectButtonsUsedArray = [2,4,6,7]
    assignStringsOnReady(buttonObjectButtonsUsedArray,[4])
}
export async function termSelectOnReady(){
	await reloadPreviousCurrentNextTerms_byRegion()
}
export function termBuildOnReady(){
	console.log(`INERT!: Pending Term Build OnReady Functions`)
}
//============================================================               </Custom_onReady_Scripts>
//====================================================================================================

//====================================================================================================
//============================================================                          <Form_Scripts>
//====================================================================================================
//====================================================================================================
//============================================================           <SET_Scripts_of_Form_Scripts>
//====================================================================================================

// ø <---------- <doPreviewSequence()>  ---------->
export function doPreviewSequence() {
    $w('#previewErrorStringTXT').collapse()
	let previewObject = loadEmptyPreviewObject()
	loadValuesPreviewObject(previewObject);
    
	let errorObject = validatePreviewData(previewObject)
	if(errorObject === false){
        loadInputFields(previewObject);
		$w('#postTermNewBTN').show()
	} else{
        $w('#previewErrorStringTXT').expand()
		$w('#previewErrorStringTXT').text = 'Loop Through Error Object'
		let simpleErrorString = ''
		let keyArray = Object.keys(errorObject)
		let bullet = ''
		keyArray.forEach(keyThis => {
            simpleErrorString += bullet
			simpleErrorString += errorObject[keyThis][0]
			bullet = ' • '
		});
		$w('#previewErrorStringTXT').text = simpleErrorString
	}
}
// ø <---------- </doPreviewSequence()> ---------->

// ø <---------- <loadEmptyPreviewObject()>  ---------->
export function loadEmptyPreviewObject(){
    // AND HIDE BY ARRAY
	let textElmentArray = ['termDateStart','termDateEnd','termName']
	let key = ''
	textElmentArray.forEach(element => {
        let key = '#' + element + 'TXT'
		$w(key).hide()
	});
	// \_ from GOLD version in loadInputFields(previewObject)
	let previewObject = {}
	previewObject.termName = ""
	previewObject.termId = ""
	previewObject.termRegion = ""
	return previewObject
}
// ø <---------- </loadEmptyPreviewObject()> ---------->

// ø <---------- <loadValuesPreviewObject(previewObject)>  ---------->
export function loadValuesPreviewObject(previewObject){
    console.groupCollapsed(`loadValuesPreviewObject(previewObject)`)
	console.log(`$w('#termDateStartDTPKR').value: [see object below]`);
	console.dir($w('#termDateStartDTPKR').value);
	let holderDate = new Date($w('#termDateStartDTPKR').value)
	// console.log(`drop-doown-direct: holderDate: [see object below]`);
	// console.dir(holderDate);
	holderDate = new Date(holderDate.getFullYear(),holderDate.getMonth(),holderDate.getDate(), 14,0,0,0)
	// console.log(`2pm Adjusted: holderDate: [see object below]`);
	// console.dir(holderDate);
	// previewObject.termDateStart = holderDate
	previewObject.termDateStart = new Date(holderDate)
	holderDate = new Date($w('#termDateEndDTPKR').value)
	holderDate = new Date(holderDate.getFullYear(),holderDate.getMonth(),holderDate.getDate(), 14,0,0,0)
	previewObject.termDateEnd = holderDate
	// previewObject.termDateEnd = $w('#termDateEndDTPKR').value;//.toString()
	// previewObject.termName = 'Summer 2021 Charlottesville'
	previewObject.termRegion = $w('#termRegionDRPDWN').value
	calculateTermName(previewObject)
	// previewObject.termId = '202124'
	calculateTermId(previewObject)
	previewObject.weight = 777777
	console.log(`just startDate: previewObject: [see object below]`);
	console.dir(previewObject);
	console.log(`groupEnd: loadValuesPreviewObject(previewObject)`);
	console.groupEnd()
}
// ø <---------- </loadValuesPreviewObject(previewObject)> ---------->

// ø <---------- <calculateTermName(previewObject)>  ---------->
export function calculateTermName(previewObject){
    let regionNameObject = {"CHO":"Charlottesville","RIC":"Richmond","ROA":"Blacksburg",}
	let month = previewObject.termDateStart.getMonth() + 1
	let season = 'Spring'
	season = month > 5 ? 'Summer' : season
	season = month > 8 ? 'Fall' : season
	let year = previewObject.termDateStart.getFullYear()
	previewObject.termName = `${regionNameObject[previewObject.termRegion]} ${season} ${year.toString()}`
}
// ø <---------- </calculateTermName(previewObject)> ---------->

// ø <---------- <calculateTermId(previewObject)>  ---------->
export function calculateTermId(previewObject){
    console.groupCollapsed(`calculateTermId(previewObject)`)
	console.log(`previewObject.termDateStartISO: ${(previewObject.termDateStart).toISOString()}`)
	console.log(`previewObject.termDateStart: `)
	console.dir(previewObject.termDateStart)
	console.log(`typeof previewObject.termDateStart: ${typeof previewObject.termDateStart}`)
	let termId = getTermId_localToTermBuilding(previewObject.termDateStart)
	console.log(`termId: ${termId}`)
	console.log(`typeof termId: ${typeof termId}`)
	// termId = 202152
	previewObject.termId = termId.toString()
	console.groupEnd()
}
// ø <---------- </calculateTermId(previewObject)> ---------->

// ø <---------- <getTermId_localToTermBuilding(dateParam)>  ---------->
export function getTermId_localToTermBuilding(dateParam) {
    // let dateParam = new Date(dateParamString)
    // Copy date so don't modify original
    let dateResponse = new Date(Date.UTC(dateParam.getFullYear(), dateParam.getMonth(), dateParam.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    dateResponse.setUTCDate(dateResponse.getUTCDate() + 4 - (dateResponse.getUTCDay() || 7));
    // Get first day of year
    let yearStart = new Date(Date.UTC(dateResponse.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    let weekNo = Math.ceil((((Number(dateResponse) - Number(yearStart)) / 86400000) + 1) / 7);
    // Return array of year and week number
    // return [dateResponse.getUTCFullYear(), weekNo];
    return dateResponse.getUTCFullYear() * 100 + weekNo;
}
// ø <---------- </getTermId_localToTermBuilding(dateParam)> ---------->

// ø <---------- <validatePreviewData(prevewObject)>  ---------->
export function validatePreviewData(prevewObject){
    console.groupCollapsed('validatePreviewData(prevewObject)')
	let termStartDateISO = '12345'
	let termEndDateISO = '12345'
	let errorObject = {}
	let anyError = false
	if($w('#termRegionDRPDWN').value.length === 0){
        anyError = true
		errorObject.termRegion = ['Region', 'Region cannot be empty','DEV Region invalid']
	}
    
	console.log('termDateStartDTPKR' + $w('#termDateStartDTPKR').value)
	if($w('#termDateStartDTPKR').value === null){
        anyError = true
		errorObject.termDateStart = ['Start Date', 'Start Date cannot be empty','DEV Start Date invalid']
	}else{
        termStartDateISO = $w('#termDateStartDTPKR').value.toISOString()
	}
	console.log('termDateEndDTPKR' + $w('#termDateEndDTPKR').value)
	if($w('#termDateEndDTPKR').value === null){
        anyError = true
		errorObject.termDateEnd = ['End Date', 'End Date cannot be empty','DEV End Date invalid']
	}else{
        termEndDateISO = $w('#termDateEndDTPKR').value.toISOString()
	}
    
	if(anyError === false && termStartDateISO > termEndDateISO ){
        anyError = true
		errorObject.termDateStartAfteerEnd = ['Start Date > End Date', 'Start Date cannot be after End Date','DEV Start Date - End Date invalid']
	}
    
	console.log(`errorObject: [object below]`)
	console.dir(errorObject)
	let returnBoolean = Object.keys(errorObject).length === 0 ? false : true;
	console.groupEnd()
	if(returnBoolean){
        return errorObject;
	}else{
        return returnBoolean;
	}
}
// ø <---------- </validatePreviewData(prevewObject)> ---------->

//====================================================================================================
//============================================================          </SET_Scripts_of_Form_Scripts>
//====================================================================================================

//====================================================================================================
//============================================================       <UTILITY_Scripts_of_Form_Scripts>
//====================================================================================================
export function loadInputFields(previewObject){
    console.groupCollapsed(`loadInputFields(previewObject)`)
	console.log(`previewObject:`)
	console.dir(previewObject)
	let attributeArray = Object.keys(previewObject)
    
	let wId = ''
	let textElmentArray = ['termName']
	let dateElmentArray = ['termDateStart','termDateEnd']
	let dateString = ''
	let dayFullStrings = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	attributeArray.forEach(attribute => {
        wId = '#' + attribute + 'TXT'
		if(textElmentArray.includes(attribute)){
            $w(wId).text = previewObject[attribute]
			$w(wId).show()
		}else if(dateElmentArray.includes(attribute)){
            let  dateString = dayFullStrings[(previewObject[attribute]).getDay()]
			dateString = dateString.substr(0,3)
			let  componentNumber = (previewObject[attribute]).getFullYear()
			dateString = '-' + componentNumber.toString() + ' ' + dateString
			componentNumber = (previewObject[attribute]).getDate()
			dateString = '-' + ('0' + componentNumber.toString()).substr(-2) + dateString
			componentNumber = (previewObject[attribute]).getMonth() + 1
			dateString = ('0' + componentNumber.toString()).substr(-2) + dateString
			$w(wId).text = dateString
			$w(wId).show()
		}else{
            $w(wId).value = previewObject[attribute]
		}
	});
	local.setItem('lastParamObject', JSON.stringify(previewObject))
	console.log(`groupEnd: loadInputFields(previewObject)`)
	console.groupEnd()
}
//====================================================================================================
//============================================================      </UTILITY_Scripts_of_Form_Scripts>
//====================================================================================================

//====================================================================================================
//============================================================         <UNSET_Scripts_of_Form_Scripts>
//====================================================================================================
// ø <---------- <doClearFormClearPreviewHideAndShow()>  ---------->
export function doClearFormClearPreviewHideAndShow() {
    $w('#previewErrorStringTXT').collapse()
	$w('#postTermNewBTN').hide()
	unsetEditableInputFields()
	let previewObject = loadEmptyPreviewObject()
	loadInputFields(previewObject);
}
// ø <---------- </doClearFormClearPreviewHideAndShow()> ---------->

// ø <---------- <unsetEditableInputFields()>  ---------->
export function unsetEditableInputFields(){
    $w('#termRegionDRPDWN').value = ''
	$w('#termDateStartDTPKR').value = null
	$w('#termDateEndDTPKR').value = null
	$w('#termRegionDRPDWN').resetValidityIndication()
	$w('#termDateStartDTPKR').resetValidityIndication()
	$w('#termDateEndDTPKR').resetValidityIndication()
}
// ø <---------- </unsetEditableInputFields()> ---------->

//====================================================================================================
//============================================================        </UNSET_Scripts_of_Form_Scripts>
//====================================================================================================

//====================================================================================================
//============================================================                         </Form_Scripts>
//====================================================================================================

//====================================================================================================
//============================================================                   <Data_Action_Scripts>
//====================================================================================================

// ø <---------- <overallPostTerm()> ---------->
export async function overallPostTerm() {
    // ! WAS: postTermNewBTN_click(event)
	console.groupCollapsed(`overallPostTerm()`)
	// let postObject = JSON.parse(local.getItem('lastParamObject'))
	// console.log(`JSON.parse(local.getItem('lastParamObject'))`)
	// console.dir(postObject)
	let postObject = loadToPostObjecAfterPreview()
	console.log(`postObject = loadToPostObjecAfterPreview()`)
	console.dir(postObject)
	console.log(`Before POST`)
    
	await postTermRecord(postObject)
	console.log(`After POST: await postTermRecord(postObject)`)
	// await wixData.insert("term", postObject)
	// console.log(`After POST: await wixData.insert("term", postObject)`)
    
	let postResponse = await resetWeightTermDataset(postObject.termRegion)
	console.log(`let postResponse = await resetWeightTermDataset(postObject.termRegion) [object below]`)
	console.log(postResponse)
	console.dir(postResponse)

	// ø <ABANDONED FOR NOW>
	// ! this may be too proximate
	// ! changing to a rewrite of the 'Load Repeater' system
	// await addCurriculaTermUpdate(postObject)
	// ø </ABANDONED FOR NOW>

	console.groupEnd()


    
	doClearFormClearPreviewHideAndShow()
	// ! <KLUDGE exit early>
	wixWindow.scrollTo(100, 0)
}
// ø <---------- <overallPostTerm()>  ---------->

// ø <---------- <loadToPostObjecAfterPreview()>  ---------->
export function loadToPostObjecAfterPreview(){
    // ! ALL FROM INPUT FIELDS
    
	let toPostObject = {}
	toPostObject.title = $w('#termNameTXT').text
	toPostObject.termId = Number($w('#termIdTXT').value)
	toPostObject.termRegion = $w('#termRegionDRPDWN').value
	toPostObject.termDateStart = $w('#termDateStartDTPKR').value
	toPostObject.termDateEnd = $w('#termDateEndDTPKR').value
	toPostObject.weight = -77777
	toPostObject.curriculum = {"curricula":[{"name":"Holder for Actual Curriculum","textKey":"HOLDER","abbrvName":"Holder Actual","isoLastUpdate":"2021-11-10T04:27:53+0000","status":"0","counter":1,"repeaterDataArrayIndex":0,"nid":"44"}]}
	return toPostObject
}
// ø <---------- </loadToPostObjecAfterPreview()> ---------->

// ø <---------- <postTermRecord(postObject)>  ---------->
export async function postTermRecord(postObject){
    console.groupCollapsed('postTermRecord(postObject)')
    console.log(`postObject: [object below]`)
    console.dir(postObject)
    await wixData.insert("term", postObject)
    console.groupEnd()
}
// ø <---------- </postTermRecord(postObject)> ---------->

// ø <---------- <addCurriculaTermUpdate(postObject)>  ---------->
export async function addCurriculaTermUpdate(postObject){
	let termId = postObject.termId
	let termRegion = postObject.termRegion


	console.groupCollapsed(`GET Just Posted Record by termId [${termId}] and termRegion [${termRegion}]`)
	// console.log('Before SORT')
	// await $w("#termDTST").setSort( wixData.sort()
	// 	.ascending("weight")
	// 	)

	// console.log('After SORT Before FILTER')
	// let updateObjectArray = await $w("#termDTST").setFilter( wixData.filter()
	// 	.eq("termId", termId
	// 	.eq("termRegion", termRegion
	// 	)



    let updateObjectArray = await wixData.query("term")
		.eq("termId", termId)
		.eq("termRegion", termRegion)
        .find();


	console.log(`updateObjectArray: [object below]`)
	console.dir(updateObjectArray)
	console.log(`groupEnd: GET Just Posted Record by termId and termRegion`)
	console.groupEnd()
	return


    let curriculaArray = await getSourcedJSON_byKey(key)
    let curriculaObject = {}
    curriculaObject.curricula = curriculaArray
	let paramThis = 'KLUDGE'
    if(paramThis === 'KLUDGE'){
		//do(=== 'KLUDGE')
		console.log(`let curriculaArray = await getSourcedJSON_byKey(${key})`)
		console.log(`let curriculaObject = {}; curriculaObject.curricula = curriculaArray;`)
		console.log(`curriculaObject: [object below]`)
		console.dir(curriculaObject)
		console.log(`if(${paramThis} === 'KLUDGE')`)
		console.log(`toPostObject: [object below]`)
		console.dir(postObject)
		return
	}
}
// ø <---------- <addCurriculaTermUpdatepostObject()>  ---------->

// ø <---------- <resetWeightTermDataset(termRegion)>  ---------->
export async function  resetWeightTermDataset(termRegion){
	//! !!!!!WORKING!!!!!! Cleaning Up
	console.groupCollapsed(`resetWeightTermDataset(${termRegion})`)
	let done = false
	let indexOfZero = -777
	let offset = -777
	let startIndex = -1 * offset
	let responseData = await wixData.query("term")
	.eq("termRegion", termRegion)
	.ascending("termId")
	.limit(1000)
	.find()
	// ø <ELSE>
	if(responseData.length > responseData.totalCount){
		let responseError = {}
		responseError.errorString = 'responseData.length > responseData.totalCount'
		responseError.responseData = responseData
		console.log(`responseError:`)
		console.dir(responseData.items)
		$w('#txareaCodeBlock').value = JSON.stringify(responseError,undefined,4)
		done = false
	}
	// ø </ELSE>
	let itemArray = responseData.items
	console.log(`original: itemArray: [object below]`)
	console.dir(responseData.items)
	let record = {}
	let today = new Date()
	console.log(`today: ${today}`)
	 
	 
	let index = 0
	let weightAsSign = -777
	let indexOfZeroRecord = -777
	while (index < itemArray.length) {
	
		record = itemArray[index];
		// console.log(`record = itemArray[${index}]: [object below]`)
		// console.dir(record)
		if(record.termDateEnd < today){
			// console.log(`record.termDateEnd < today: ${record.termDateEnd} < ${today}: ${record.termDateEnd < today}`)
			weightAsSign = -1
		}else if(record.termDateStart > today){
			// console.log(`record.termDateStart > today: ${record.termDateStart} > ${today}: ${record.termDateStart > today}`)
			weightAsSign = 1
		}else{
			// console.log(`ELSE: record.termDateEnd < today || record.termDateStart >  today`)
			// console.log(`ELSE: ${record.termDateEnd} < ${today} || ${record.termDateStart} >  ${today}`)
			// console.log(`ELSE: ${record.termDateEnd <  today || record.termDateStart >  today}`)
			weightAsSign = 0
			indexOfZeroRecord = index 
            console.log(`SET: indexOfZeroRecord: ${indexOfZeroRecord}`)
		}
		record.weight = weightAsSign
		index++
	}
	indexOfZeroRecord = indexOfZeroRecord === -777 ? index : indexOfZeroRecord
	let finalWeightIndex = itemArray[0].weight === -1 ? indexOfZeroRecord * -1 : 999
	finalWeightIndex = finalWeightIndex === 999 ? itemArray[0].weight : finalWeightIndex

    console.log(`AFTER finalWeightIndex SET:weights as Sign(): responseData.items: [object below]`)
	console.dir(responseData.items)

	index = 0
	let finalWeight = -777
	let nonNegative = false
	while (index < itemArray.length) {
		if(nonNegative === false && itemArray[index].weight >= 0){
			finalWeightIndex = itemArray[index].weight // Zero or One as appropriate
			nonNegative = true
		}
		finalWeight = -777
		finalWeight = itemArray[index].weight === -1 ? -1 * Math.abs(finalWeightIndex) : finalWeight
		finalWeight = itemArray[index].weight === 0 ? 0 : finalWeight
		finalWeight = itemArray[index].weight === 1 ? Math.abs(finalWeightIndex) : finalWeight
		itemArray[index].weight = finalWeight

		finalWeightIndex++
		index++
	}
	console.log(`finalWeights(): responseData.items: [object below]`)
	console.dir(responseData.items)
		 
	 
	
	console.log(`startIndex: ${startIndex}`)
	
	console.groupCollapsed(`FOR-UPDATE-Loop of ${termRegion} records`)
	for (let index = 0; index < itemArray.length; index++) {
		record = itemArray[index];
		console.log(`itemArray[${index}]: [object below]`)
		console.dir(record)
		await wixData.update("term", record)
	}

	console.log(`groupEnd: FOR-loop of ${termRegion} records`)
	console.groupEnd()
	console.log(`groupEnd: resetWeightTermDataset(${termRegion})`)
	console.groupEnd()	 
}
// ø <---------- </resetWeightTermDataset(termRegion)> ---------->

//====================================================================================================
//============================================================                  </Data_Action_Scripts>
//====================================================================================================

//====================================================================================================
//============================================================               <Data_Collection_Scripts>
//====================================================================================================

// // ø <---------- <getSourcedJSON_byKeyPageByPage UTILITY>  ---------->
// export async function getSourcedJSON_byKeyPageByPage(key) {
//     // pstEnrSeven202108UTILITY SHORT
//     let now = new Date();
//     let nowISO = now.toISOString();
//     let recordSourcedJSON = await wixData.query("sourcedJSON")
//         .eq("key", key)
//         .lt("versionStampTxt", nowISO)
//         .descending("versionStampTxt")
//         .limit(1)
//         .find();
//     return JSON.stringify(recordSourcedJSON.items[0].jsonData);
// }
// // ø <---------- </getSourcedJSON_byKeyPageByPage UTILITY> ---------->

//====================================================================================================
//============================================================              </Data_Collection_Scripts>
//====================================================================================================

//====================================================================================================
//============================================================       <Term_Repeater_Selection_Scripts>
//====================================================================================================
export async function reloadPreviousCurrentNextTerms_byRegion(){
	console.groupCollapsed('reloadPreviousCurrentNextTerms_byRegion()')
	console.log('Do I need to RESET the DTST before I sort-filter [again]')
	console.log('Before SORT')
	await $w("#termDTST").setSort( wixData.sort()
		.ascending("weight")
		)

	console.log('After SORT Before FILTER')
	await $w("#termDTST").setFilter( wixData.filter()
		.eq("termRegion", $w('#termRegionRADIO').value)
		.ge("weight", -1)
		// .limit(3)
		)

	console.log('After FILTER')
	console.log('groupEnd: reloadPreviousCurrentNextTerms_byRegion()')
	console.groupEnd()
}
// ø <---------- <selectTermActionByWid(wIndex,repeaterIndex)>  ---------->
export function selectTermActionByWid(wIndex = 'courses',repeaterIndex = 777){
	// BEGIN memory. session. local.

	console.groupCollapsed(`selectTermActionByWid(wIndex = 'courses',repeaterIndex = 777)`)
	console.log(`param: wIndex: ${wIndex}`)
	console.log(`param: repeaterIndex: ${repeaterIndex}`)
	let action = 'HOLDER'
	let supportedActionArray = ['courses','curricula']
	let supportedRepeaterIndexBy2dArray = [['previous','0'],['current','1'],['next','2'],['nxtplus','3']]
	let key = 'HOLDER'
	let errorString = ''
	// let repeaterIndex = 777
	let parse = supportedActionArray.includes(wIndex) === true && repeaterIndex < 777 ? false : true 
	if(parse){
		for (let indexAction = 0; indexAction < supportedActionArray.length; indexAction++) {
			const element = supportedActionArray[indexAction]
			console.log(`≈579≈ DEVEL[${indexAction}]: ${element} = supportedActionArray[${indexAction}]`)
			console.log(`≈580≈ DEVEL[${indexAction}]: ${wIndex}.toLowerCase(): ${wIndex.toLowerCase()}`)
			action = wIndex.toLowerCase().includes(element) ? element : action
			console.log(`≈582≈ DEVEL[${indexAction}]: ${wIndex.toLowerCase().includes(element)}: ${action}`)
		}
		
		for (let indexRptrId = 0; indexRptrId < supportedRepeaterIndexBy2dArray.length; indexRptrId++) {
			const elementArray = supportedRepeaterIndexBy2dArray[indexRptrId]
			console.log(`≈587≈ DEVEL[${indexRptrId}]: [${elementArray}] = supportedRepeaterIndexBy2dArray[${indexRptrId}]`)
			key = wIndex.toLowerCase().includes(elementArray[0]) ? elementArray[0] : key
			console.log(`≈589≈ DEVEL[${indexRptrId}]: supportedRepeaterIndexBy2dArray[${indexRptrId}]: ${supportedRepeaterIndexBy2dArray[indexRptrId]}: ${key}`)
			repeaterIndex = repeaterIndex === 777 && key !== 'HOLDER' ?  Number(elementArray[1]) : repeaterIndex
			console.log(`≈591≈ DEVEL[${indexRptrId}]: Number(${elementArray[1]}): ${Number(elementArray[1])}: ${repeaterIndex}`)
		}
		errorString = action === 'HOLDER' ? ` • Invalid 'action' value` : errorString
		errorString = key === 'HOLDER' ? errorString + ` • Invalid 'key' value` : errorString
		console.log(`action or key === 'HOLDER': errorString: ${errorString}`)
		if(errorString.length > 0){
			console.log(`KLUDGE: Do Something with errorString: ${errorString}`)
			console.log(`groupEnd: ELSE-return`)
			console.groupEnd()
			return 
		}
	}else{
		action = wIndex	
	}
	console.log(`parse [${parse}]: parse result: action: '${action}'`)
	console.log(`parse [${parse}]: parse result: repeaterIndex: ${repeaterIndex}`)
	console.log(`parse [${parse}]: parse result: : repeaterIndex: repeaterIndex: ${repeaterIndex}`)
	console.log(`parse [${parse}]: parse result: errorString: '${errorString}'`)
	let repeaterData = $w('#keyThreeTermsByRegionRPTR').data;

	console.log(`repeaterData: [object below]`)
	console.dir(repeaterData)
	// let repeaterKeyArray = 
	// console.log(`repeaterData: repeaterKeysArray: [object below]`)
	// console.log(repeaterKeyArray)
	console.log(`repeaterData.length: ${repeaterData.length}`)

	 
	 
	let selectedTermRecord = repeaterData[repeaterIndex]
	// session.setItem('lastTermRecord', JSON.stringify(selectedTermRecord))
	console.log(`≈623≈ selectedTermRecord: [object below]`)
	console.dir(selectedTermRecord)
	session.setItem('lastTermName',selectedTermRecord.title)
	
	let mismatchWeight = selectedTermRecord.weight === repeaterIndex - 1 ? false : true
	if(mismatchWeight){
		console.log(`selectedTermRecord.weight [${selectedTermRecord.weight}] === repeaterIndex - 1 [${repeaterIndex - 1}]`)
		console.log(`KLUDGE: Do Something with mismatchWeight [${mismatchWeight}]`)
		console.log(`groupEnd: ELSE-return`)
		console.groupEnd()
		return
	}
	// let KLUDGE = '<KLUDGE early Exit>'
	// console.log(`groupEnd: ${KLUDGE}`)
	// return

	console.log(`≈638≈ repeaterData[${repeaterIndex}]: selectedTermRecord: [object below]`)
	// delete selectedTermRecord.currSelect
	// delete selectedTermRecord.curriculum
	local.setItem('lastParamObject',JSON.stringify(selectedTermRecord))
	// local.setItem('lastParamObject',JSON.stringify(selectedTermRecord.curriculum))
	// let path = "/course-building"
	// path = page === 'curriculum' ? "/term-curriculum-selection#whoWeAreANCHR" : path
	let path = ''
	let supportedActionPath2dArray = ['/course-building#buildANCHR','/term-curriculum-selection']
	for (let indexPath = 0; indexPath < supportedActionArray.length; indexPath++) {
		const element = supportedActionArray[indexPath];
		if(element === action){
			path = supportedActionPath2dArray[indexPath]
		}
	}
	if(path.length === 0){
		console.log(`KLUDGE: Do Something with Unsupported action: [${action}]`)
		console.log(`groupEnd: ELSE-return`)
		console.groupEnd()
		return
	}
	let DOX = []
	DOX = [`<WiX-Location => PATH>`]
	wixLocation.to(path)
	DOX = [`</WiX-Location => PATH>`]
	console.log(`groupEnd: selectTermActionByWid(wIndex = 'courses',repeaterIndex = 777)`)
	console.groupEnd()
	return
	// let KLUDGE ='<Exit Early>'
	// return
	//  KLUDGE ='</Exit Early>'

	// END memory. session. local.
}
// ø <---------- </selectTermActionByWid(wIndex,repeaterIndex)> ---------->
 
//====================================================================================================
//============================================================      </Term_Repeater_Selection_Scripts>
//====================================================================================================

//====================================================================================================
//====================================================================================================
//============================================================                    <Buttons_ONLY_Below>
//============================================================                      (and other Events)
//====================================================================================================

export function previewTermNewBTN_click(event) {
	doPreviewSequence()
}

export function previewTermClearBTN_click(event) {
	doClearFormClearPreviewHideAndShow()
}

export async function postTermNewBTN_click(event) {
	await $w('#postTermNewBTN').hide()
	await overallPostTerm()
}

export function termRegionRADIO_change(event) {
	console.log('termRegionRADIO_change(event)')
	reloadPreviousCurrentNextTerms_byRegion()
}

export function btnblkToggle4BTN_click(event) {
	btnblkToggleBTN_click('btnblkToggle4BTN_click(event)')
}

export function btnblkDo4BTN_click(event) {
	btnblkDoBTN_click('btnblkDo4BTN_click(event)') 
}

export async function kludgeDateEndBTN_click(event) {
	$w('#previewErrorStringTXT').text = 'KLUDGE: console.log(STAMP)'
	$w('#previewErrorStringTXT').expand()
	let d = new Date()
	console.log(d)
	return
	// $w('#previewErrorStringTXT').text = 'KLUDGE: This Kludge Button has no logic assiciated with it at this time...'
	$w('#previewErrorStringTXT').text = 'KLUDGE: Devel working on '
	$w('#previewErrorStringTXT').expand()
	await loadCurricula_forAnyTermsWhereEmpty()
	return
}

export async function loadCurricula_forAnyTermsWhereEmpty(){
	// console.groupCollapsed(`loadCurricula_forAnyTermsWhereEmpty()`)
	console.group(`loadCurricula_forAnyTermsWhereEmpty()`)
	// console.log('Before SORT')
	// await $w("#termDTST").setSort( wixData.sort()
	// 	.ascending("weight")
	// 	)

	// console.log('After SORT Before FILTER')
	// await $w("#termDTST").setFilter( wixData.filter()
	// 	// .eq("termRegion", $w('#repeaterRegionDRPDN').value)
	// 	// .eq("termRegion", $w('#termRegionRADIO').value)
	// 	// .ge("weight", -1)
	// 	.isEmpty("curriculum")
	// 	// .limit(3)
	// 	)


	// let updateObjectArray = await wixData.query("term")
	// // .eq("termId", termId)
	// // .eq("termRegion", termRegion)
	// 	.isEmpty("curriculum")
	// 	.find();



	let updateObjectArray = await wixData.query("term")
		.isEmpty("curriculum")
		// .eq("termRegion", termRegion)
		.ascending("termId")
		// .limit(1000)
		.limit(1)
		.find()

	// console.log(`updateObjectArray: [object below]`)
	// console.dir(updateObjectArray)

	let totalCount = updateObjectArray.totalCount
	console.log(`totalCount: ${totalCount}`)

	if(updateObjectArray.totalCount === 0){
		console.log(`updateObjectArray.totalCount === 0`)
		console.log(`groupEnd: EARLY EXIT: loadCurricula_forAnyTermsWhereEmpty() `)
		console.groupEnd()
	}
	
	let itemArray = updateObjectArray.items

	let curriculaArray = await getSourcedJSON_byKey('drupalCurricula')
    let curriculaObject = {}
    curriculaObject.curricula = curriculaArray
	// console.log(`curriculaObject: [object below]`)
	// console.dir(curriculaObject)

	let item = {}
	for (let index = 0; index < itemArray.length; index++) {
		item = itemArray[index]
		item.jsonData = JSON.parse(curriculaArray)
		delete item._owner
		delete item._createdDate
		delete item._updatedDate
		console.log(`item: [object below]`)
		console.dir(item)
		await wixData.update("sourcedJSON", item)
	}
	// await wixData.update("sourcedJSON", itemArray[0])

	console.log(`groupEnd: loadCurricula_forAnyTermsWhereEmpty()`)
	console.groupEnd()
	return


	console.log('After FILTER')
	console.log(`await $w("#termDTST").setFilter( wixData.filter().isEmpty("curriculum"))`)
	console.log(`groupEnd: loadCurricula_forAnyTermsWhereEmpty()`)
	console.groupEnd()
}

//====================================================================================================
//============================================================       <namespaceButtonMenuToggleScripts>
	export function toggleButtonMenuByWid(paramAsMultiBoxWid){
		console.groupCollapsed(`toggleButtonMenuByWid(paramAsMultiBoxWid)`)
		console.log(`param: paramAsMultiBoxWid: ${paramAsMultiBoxWid}`)
		let repeaterLength = $w('#keyThreeTermsByRegionRPTR').data.length
		console.log(`repeaterLength: $w('#keyThreeTermsByRegionRPTR').data.length: ${repeaterLength}`)
		let targetRepeaterIndex = 777
		targetRepeaterIndex = paramAsMultiBoxWid.toLowerCase().includes('previous') ? 0 : targetRepeaterIndex
		targetRepeaterIndex = paramAsMultiBoxWid.toLowerCase().includes('current')  ? 1 : targetRepeaterIndex
		targetRepeaterIndex = paramAsMultiBoxWid.toLowerCase().includes('next')     ? 2 : targetRepeaterIndex
		targetRepeaterIndex = paramAsMultiBoxWid.toLowerCase().includes('nextplus') ? 3 : targetRepeaterIndex
		console.log(`targetRepeaterIndex: paramAsMultiBoxWid.toLowerCase().includes('testString'): ${targetRepeaterIndex}`)
		if(targetRepeaterIndex >= repeaterLength){
			// ø <ELSE>
			console.log(`targetRepeaterIndex >= repeaterLength: ${targetRepeaterIndex} >= ${repeaterLength}: ${targetRepeaterIndex >= repeaterLength}`)
			console.log(`groupEnd: toggleButtonMenuByWid(paramAsMultiBoxWid): INERT: No Repeater for Index`)
			console.groupEnd()
			return
			// ø </ELSE>
		}

		let mouseInTHIS = paramAsMultiBoxWid.substr(-8) === '_mouseIn' ? true : false
		let mouseOutTHIS = paramAsMultiBoxWid.substr(-9) === '_mouseOut' ? true : false
		paramAsMultiBoxWid = paramAsMultiBoxWid.substr(-8) === '_mouseIn' ? paramAsMultiBoxWid.substr(0, paramAsMultiBoxWid.length - 8) : paramAsMultiBoxWid
		paramAsMultiBoxWid = paramAsMultiBoxWid.substr(-9) === '_mouseOut' ? paramAsMultiBoxWid.substr(0, paramAsMultiBoxWid.length - 9) : paramAsMultiBoxWid
		paramAsMultiBoxWid = paramAsMultiBoxWid.substr(0,1) === '#' ? paramAsMultiBoxWid : '#' + paramAsMultiBoxWid
		console.log(`tweaked/or not: paramAsMultiBoxWid: ${paramAsMultiBoxWid}`)
		let state = $w(paramAsMultiBoxWid).currentState;
		console.log(`state: [object below]`)
		console.dir(state)
		let stateId = state.id; // "state1"
		console.log(`stateId: state.id: ${stateId}`)
		let theseStatesArray = $w(paramAsMultiBoxWid).states;
		console.log(`theseStatesArray: [object below]`)
		console.dir(theseStatesArray)
		let buttonIndex = 777
		let menuIndex = 777
		let stateIdThis = 'HOLDER'
		for (let index = 0; index < theseStatesArray.length; index++) {
			const elementObject = theseStatesArray[index];
			stateIdThis = elementObject.id
			buttonIndex = stateIdThis.toUpperCase().includes('BUTTON') ? index : buttonIndex
			menuIndex = stateIdThis.toUpperCase().includes('MENU') ? index : menuIndex
		}
		console.log(`buttonIndex: ${buttonIndex}`)
		console.log(`menuIndex: ${menuIndex}`)

		console.log(`stateId: ${stateId}`)
		console.log(`mouseInTHIS: ${mouseInTHIS}`)
		console.log(`mouseOutTHIS: ${mouseOutTHIS}`)
		// if(stateId.toUpperCase().includes('BUTTON')){
		// 	$w(paramAsMultiBoxWid).changeState(theseStatesArray[menuIndex].id);
		// }
		// if(stateId.toUpperCase().includes('MENU')){
		// 	$w(paramAsMultiBoxWid).changeState(theseStatesArray[buttonIndex].id);
		// }
		if(mouseInTHIS){
			console.log(`action: showMenuState: mouseInTHIS === true [${mouseInTHIS}]`)
			$w(paramAsMultiBoxWid).changeState(theseStatesArray[menuIndex].id);
		}
		if(mouseOutTHIS){
			console.log(`action: showButtonState: mouseOutTHIS === true [${mouseOutTHIS}]`)
			$w(paramAsMultiBoxWid).changeState(theseStatesArray[buttonIndex].id);
		}
		console.log(`groupEnd: toggleButtonMenuByWid(paramAsMultiBoxWid)`)
		console.groupEnd()
	}
	// toggleButtonMenuByWid('copyMultiBoxWidHere')

//==========================================================================================
//==================================================         <mouseIn-mouseOut Script Pairs>
// ø =====================================================================
// ø ====================          <Previous mouseIn-mouseOut Script Pair>
export function termPreviousButtonMenuMSBOX_mouseIn(event) {
	toggleButtonMenuByWid('termPreviousButtonMenuMSBOX_mouseIn')
}
export function termPreviousButtonMenuMSBOX_mouseOut(event) {
	toggleButtonMenuByWid('termPreviousButtonMenuMSBOX_mouseOut')
}
// ø ====================         </Previous mouseIn-mouseOut Script Pair>
// ø =====================================================================
// ø =====================================================================
// ø ====================           <Current mouseIn-mouseOut Script Pair>
export function termCurrentButtonMenuMSBOX_mouseIn(event) {
	toggleButtonMenuByWid('termCurrentButtonMenuMSBOX_mouseIn')
}
export function termCurrentButtonMenuMSBOX_mouseOut(event) {
	toggleButtonMenuByWid('termCurrentButtonMenuMSBOX_mouseOut')
}
// ø ====================          </Current mouseIn-mouseOut Script Pair>
// ø =====================================================================
// ø =====================================================================
// ø ====================              <Next mouseIn-mouseOut Script Pair>
export function termNextButtonMenuMSBOX_mouseIn(event) {
	toggleButtonMenuByWid('termNextButtonMenuMSBOX_mouseIn')
}
export function termNextButtonMenuMSBOX_mouseOut(event) {
	toggleButtonMenuByWid('termNextButtonMenuMSBOX_mouseOut')
}
// ø ====================             </Next mouseIn-mouseOut Script Pair>
// ø =====================================================================
// ø =====================================================================
// ø ====================          <NextPlus mouseIn-mouseOut Script Pair>
export function termNextPlusButtonMenuMSBOX_mouseIn(event) {
	toggleButtonMenuByWid('termNextPlusButtonMenuMSBOX_mouseIn')
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}
export function termNextPlusButtonMenuMSBOX_mouseOut(event) {
	toggleButtonMenuByWid('termNextPlusButtonMenuMSBOX_mouseOut')
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}
// ø ====================          </NextPlus mouseIn-mouseOut Script Pair>
// ø =====================================================================
//==================================================        </mouseIn-mouseOut Script Pairs>
//==========================================================================================

//============================================================      </namespaceButtonMenuToggleScripts>
//====================================================================================================
//====================================================================================================
//============================================================                   <Term-Action Scripts>

export function previousCurriculaBTN_click(event) {
	selectTermActionByWid('previousCurriculaBTN_click') 
}

export function previousCoursesBTN_click(event) {
	selectTermActionByWid('previousCoursesBTN_click') 
}

export function currentCoursesBTN_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
	selectTermActionByWid('currentCoursesBTN_click') 
}

export function currentCurriculaBTN_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
	selectTermActionByWid('currentCurriculaBTN_click') 
}

export function nextCoursesBTN_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
	selectTermActionByWid('nextCoursesBTN_click') 
}

export function nextCurriculaBTN_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
	selectTermActionByWid('nextCurriculaBTN_click') 
}

export function nextplusCoursesBTN_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
	selectTermActionByWid('nxtplusCoursesBTN_click') 
}

export function nextplusCurriculaBTN_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
	selectTermActionByWid('nxtplusCurriculaBTN_click') 
}
//============================================================                   </Term-Action Scripts>
//====================================================================================================

export function btnblkToggle2BTN_click(event) {
	btnblkToggleBTN_click('btnblkToggle2BTN_click(event)')
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function btnblkDo2BTN_click(event) {
	btnblkDoBTN_click('btnblkDo2BTN_click(event)')
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function btnblkToggle7BTN_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
	btnblkToggleBTN_click('btnblkToggle7BTN_click')
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function btnblkDo7BTN_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
	btnblkDoBTN_click('btnblkDo7BTN_click')
}
