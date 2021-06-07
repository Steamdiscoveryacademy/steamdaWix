// ø <---------- <stepsDisplayStatusAsReturnString>  ---------->
export function stepsDisplayStatusAsReturnString(tag = 'unknown tag'){
	let returnString = '========================================';
    returnString += '\n' + '==========      <'+tag+'>     ==========';
    returnString += '\n' + 'memItemCOMPLETED: ' + memory.getItem('enrollmentStepCompleted');
    returnString += '\n' + 'memItemCURRENT: ' + memory.getItem('enrollmentStepCurrent');
    returnString += '\n' + 'memItemNEXT: ' + memory.getItem('enrollmentStepNext');
    returnString += '\n' + 'memItemLIST: ';
    let List = memory.getItem('enrollmentStepList'); 
	List = List.replace('CCOMPLETE,', 'CCOMPLETE,\n')
    returnString += '\n' + List;
    returnString += '\n' + '==========      </'+tag+'>    ==========';
    returnString += '\n' + '========================================';
	return returnString;
}
// ø <---------- </stepsDisplayStatusAsReturnString> ---------->
