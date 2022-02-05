// ø <---------- <rebuildBufferForGrid_FRONT_END>  ---------->
// ø LOAD_COURSES_ON_READY_03_rebuildBufferForGrid_OnReadyForceAllCourses
function rebuildBufferForGrid_FRONT_END(){
    console.group(`applyFilterToBuffer(paramObjectFilterForm)`)
    // console.groupCollapsed(`applyFilterToBuffer(paramObjectFilterForm)`)
    // let colCount = 4
    let doxObject = JSON.parse(memory.getItem('memoryDoxObject'))
    let colCount = doxObject.colCount
	console.group(`rebuildBufferForGrid(KLUDGEparamObjectFilterForm)`)
	console.log(`REACHED: rebuildBufferForGrid(KLUDGEparamObjectFilterForm)`)
    let filteredCourseBuffer = JSON.parse(memory.getItem('memoryWorkingObject'))
    console.log(`filteredCourseBuffer: [array below]`)
    console.dir(filteredCourseBuffer)
    let gridWeekMaxArray = /*cardinalWeeks, Zero will be Zero so Not Max*/[0,0,0,0,0,0,0,0,0,0]
    for (let index = 0; index < filteredCourseBuffer.length; index++) {
        const element = filteredCourseBuffer[index]
        gridWeekMaxArray[element.col]++
    }
    console.log(`gridWeekMaxArray: [array below]`)
    console.dir(gridWeekMaxArray)
    let rowCount = Math.max(...gridWeekMaxArray)
    console.log(`rowCount: ${rowCount}`)


    let gridRebuildCourseBuffer = []
    let gridRebuildCourseElementThis = {}
    let placedCourseIndexArray = []
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        const rowThis = rowIndex + 1
        for (let colIndex = 0; colIndex < colCount; colIndex++) {
            const colThis = colIndex + 1
            gridRebuildCourseElementThis = {}
            gridRebuildCourseElementThis.col = colThis
            gridRebuildCourseElementThis.row = rowThis
            gridRebuildCourseElementThis._id = `row${rowThis}col${colThis}`
            gridRebuildCourseElementThis.pointerIndex = null
            // ø <loop Buffer>
            for (let bufferIndex = 0; bufferIndex < filteredCourseBuffer.length; bufferIndex++) {
                const bufferElement = filteredCourseBuffer[bufferIndex]
                if(!placedCourseIndexArray.includes(bufferIndex)){
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
    // console.log(`gridRebuildCourseBuffer: [array below]`)
    // console.dir(gridRebuildCourseBuffer)


    // let gridRowLasttArray = /*cardinalWeeks, Zero will be Zero so Not Max*/[0,0,0,0,0,0,0,0,0,0]
    // for (let index = 0; index < filteredCourseBuffer.length; index++) {
    //     const element = filteredCourseBuffer[index]
    //     element.row = gridRowLasttArray[element.col] + 1
    //     gridRowLasttArray[element.col] = element.row
    // }
    // console.log(`gridRowLasttArray: [array below]`)
    // console.dir(gridRowLasttArray)
    // let rows = Math.max(...gridRowLasttArray)
    // console.log(`rows: ${rows}`)
	// console.log(`ROW_APPLIED: filteredCourseBuffer: [array below]`)
	// console.dir(filteredCourseBuffer)
    // return
    memory.setItem('memoryWorkingObject',JSON.stringify(gridRebuildCourseBuffer))
	console.log(`GRID_APPLIED: gridRebuildCourseBuffer: [array below]`)
	console.dir(gridRebuildCourseBuffer)
	// console.log(`FILTER_APPLIED: filteredCourseExcludedBuffer: [array below]`)
	// console.dir(filteredCourseExcludedBuffer)

	console.log(`groupEnd: rebuildBufferForGrid(KLUDGEparamObjectFilterForm)`)
	console.groupEnd()
	// return
	evaluationPaginationAndLoadRepeater(true)

}
// ø <---------- </rebuildBufferForGrid_FRONT_END> ---------->
