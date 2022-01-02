// ø <---------- <doCourseEdit_previewCourseTilePath(preview)> ---------->
function doCourseEdit_previewCourseTilePath(path = 'FFFALSE', topText = 'NNULL'){
	const oopsCourseTilePath = 'https://static.wixstatic.com/shapes/523205_8ec1c41ed0e04ad0ab9c57a0d5d37983.svg'
	path = path === 'FFFALSE' ? 'FFALSE' : path
	path = path === 'FFALSE' ? oopsCourseTilePath : path
	topText = topText === 'NNULL' ? '' : topText
	const wIdRepeater = '#singletonCourseTilePathRPTR'
	let repeaterDataArray = []
	let repeaterThis = {}
	repeaterThis._id = "777"
	repeaterThis.courseTilePath = path
	repeaterThis.topText = topText
	// repeaterThis.topText = `<div style="background-color:blue;"><span style="color:yellow;">`
	repeaterDataArray.push(repeaterThis)
	let response = {}
	response.repeaterDataArray = repeaterDataArray
	// $w(wIdKldgeResponseTXTBX).value = JSON.stringify(response,undefined,4)
	// console.log(`response: [object below]`)
	// console.dir(response)
	// ø LOAD_COURSES_ON_READY_03_evaluationPaginationAndLoadRepeater_OnReadyFirstEightCourses
	$w(wIdRepeater).data = repeaterDataArray

	const wIdCourseTileIMG = '#courseTilePathIMG'
	const wIdcourseTopTXT = '#courseTileTopTXT'
	// • REDUNDANCY IS A GOOD THING

	$w(wIdRepeater).onItemReady( ($courseElement, courseElementData, index) => {

		$courseElement(wIdcourseTopTXT).html = courseElementData.topText
		$courseElement(wIdCourseTileIMG).src = courseElementData.courseTilePath

		// $w(wIdKldgeResponseTXTBX).value = JSON.stringify(courseElementData,undefined,4)
		console.log(`courseElementData: [object below]`)
		console.dir(courseElementData)
	})

    

}
// ø <---------- </doCourseEdit_previewCourseTilePath(preview)> ---------->