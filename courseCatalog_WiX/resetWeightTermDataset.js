// ø <---------- <resetWeightTermDataset(termRegion)>  ---------->
export async function  resetWeightTermDataset(termRegion){
	console.groupCollapsed('resetWeightTermDataset(termRegion)')
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
	// }else{
	// 	$w('#txareaCodeBlock').value = JSON.stringify(responseData.items,undefined,4)
	// }
	// ø </ELSE>
	let itemArray = responseData.items
	console.log(`original: itemArray: [object below]`)
	console.dir(responseData.items)
	// console.log(`itemArray[0]: [object below]`)	
	// console.dir(itemArray[0])	
	// console.log(`itemArray[0].termDateStart: [object below]`)	
	// console.log(itemArray[0].termDateStart)	
	// console.dir(itemArray[0].termDateStart)	
	let record = {}
	let today = new Date()
	// let todayISO = today.toISOString().substr(0,10)
	// console.log(`todayISO: ${todayISO}`)
	 
	 
	let index = 0
	let weightAsSign = -777
	let indexOfZeroRecord = -777
	while (index < itemArray.length) {
	
		record = itemArray[index];
		if(record.termDateStart <= today){
			weightAsSign = -1
		}else if(record.termDateEnd >= today){
			weightAsSign = 1
		}else{
			weightAsSign = 0
			// indexOfZeroRecord = index 
			indexOfZeroRecord = index - 2
		}
		record.weight = weightAsSign
		index++
	}
	indexOfZeroRecord = indexOfZeroRecord === -777 ? index : indexOfZeroRecord
	let finalWeightIndex = itemArray[0].weight === -1 ? indexOfZeroRecord * -1 : 999
	finalWeightIndex = finalWeightIndex === 999 ? itemArray[0].weight : finalWeightIndex

	console.log(`indexOfZeroRecord: ${indexOfZeroRecord}`)
	console.log(`finalWeightIndex: ${finalWeightIndex}`)

	console.log(`weights as Sign(): responseData.items: [object below]`)
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
	// console.dir(responseData.items)
	// while (index < itemArray.length) {
	// // while (index < itemArray.length && isZeroRecord === false) {
	// 	record = itemArray[index];
	// 	if (index === 0) {
	// 		let firstRecordSign  = 0
	// 		firstRecordSign = record.termDateStart <= todayISO ? -1 : firstRecordSign;
	// 		firstRecordSign = record.termDateEnd >= todayISO ? 1 : firstRecordSign;
	// 	}
	// 	// isZeroRecord = record.termDateStart <= todayISO ? true : false;
	// 	// isZeroRecord = record.termDateEnd >= todayISO ? isZeroRecord : false;
	// 	// isZeroRecord = index >= itemArray.length ? true : isZeroRecord;

	// 	// if(isZeroRecord){
	// 	// 	indexOfZero = index
	// 	// 	offset = Math.abs(indexOfZero)
	// 	// 	startIndex = -1 * offset
	// 	// }
	// 	index++
	// }
		 
	 
	
	console.log(`startIndex: ${startIndex}`)
	
	console.groupCollapsed(`FOR-loop of ${termRegion} records`)
	for (let index = 0; index < itemArray.length; index++) {
		record = itemArray[index];
		// record.weight = startIndex
		console.log(`itemArray[${index}]: [object below]`)
		console.dir(record)
		await wixData.update("term", record)
		// startIndex++
		
	}
	let responseDataConfirm = await wixData.query("term")
	.eq("termRegion", termRegion)
	.ascending("termId")
	.limit(1000)
	.find()

	console.log(`responseDataConfirm: [object below]`)
	console.dir(responseDataConfirm)
	// itemArray.forEach(record => {
		// 	record.weight = startIndex
		// 	await wixData.update("term", record)
		// 	startIndex++
		// });
		
	console.groupEnd()
	 
	// let KLUDGE = '<Early Exit>'
	// console.groupEnd()
	// return
	// KLUDGE = '</Early Exit>'
	 
	}
	// ø <---------- </resetWeightTermDataset(termRegion)> ---------->