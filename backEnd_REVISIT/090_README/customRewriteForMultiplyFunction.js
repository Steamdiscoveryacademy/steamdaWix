// ! <ORIGINAL - Default within any Backend File>
export function multiply(factor1, factor2) {
    return factor1 * factor2;
}
// ! </ORIGINAL - Default within any Backend File>

// ¡ <REWRITE - Make the function a the Same BUT Unique for each Backend FIle>
// export function multiply(factor1, factor2) {
//     return factor1 * factor2;
// }
export function multiplyFor_BACKEND_FILE_NAME(factor1, factor2) {
    // return factor1 * factor2;
	// rewrite function name to: multiplyFor_BACKEND_FILE_NAME
    // Now Return: Piped-Array `Unique Message|product|reminder of session.getItem()`
    let thisMultiplyJSON = 'the JSON from the BACKEND FILE FOLDER YAML'
    // session.setItem('lastMultiplyJSON',thisMultiplyJSON)
    let product =  factor1 * factor2;
    return `In SITE_NAME Backend, in the file 'BACKEND_FILE_NAME', the multiply(${factor1},${factor2}) function return a product of ${product} |${product}| [see session.getItem('lastMultiplyJSON') for YAML to JSON for this backend file]`
}
export function gatherYamlFor_BACKEND_FILE_NAME(factor1, factor2) {
    // return factor1 * factor2;
	// rewrite function name to: multiplyFor_BACKEND_FILE_NAME
    // Now Return: Piped-Array `Unique Message|product|reminder of session.getItem()`
    let thisMultiplyJSON = 'the JSON from the BACKEND FILE FOLDER YAML'
    // session.setItem('lastMultiplyJSON',thisMultiplyJSON)
    let product =  factor1 * factor2;
    return `In SITE_NAME Backend, in the file 'BACKEND_FILE_NAME', the multiply(${factor1},${factor2}) function return a product of ${product} |${product}| [see session.getItem('lastMultiplyJSON') for YAML to JSON for this backend file]`
}
// ¡ </REWRITE - Make the function a the Same BUT Unique for each Backend FIle>


// ¡ <CALLING FUNCTION - from Canine-Consulting => Import Export Data>
export async function btnMultiply_click(event) {
    let uniquePipedString = await multiply($w("#operand1").value, $w("#operand2").value)
	let responseStringArray = uniquePipedString.split('|')
	// let product = await multiply($w("#operand1").value, $w("#operand2").value)
	let product = responseStringArray[1]
	$w("#product").value = product;
	let responseStringFinal = typeof session.getItem('lastMultiplyJSON') !== 'string' || (session.getItem('lastMultiplyJSON')).length < 10 ? `Invalid session.getItem('lastMultiplyJSON')` : session.getItem('lastMultiplyJSON');
	responseStringFinal = `\n==========\n` + responseStringFinal
	responseStringFinal = responseStringArray[0] + responseStringFinal
	$w("#multiplyResponseTXAREA").value = responseStringFinal
	}
export async function btnGatherYaml_click(event) {
    let uniquePipedString = await multiply($w("#operand1").value, $w("#operand2").value)
	let responseStringArray = uniquePipedString.split('|')
	// let product = await multiply($w("#operand1").value, $w("#operand2").value)
	let product = responseStringArray[1]
	$w("#product").value = product;
	let responseStringFinal = typeof session.getItem('lastMultiplyJSON') !== 'string' || (session.getItem('lastMultiplyJSON')).length < 10 ? `Invalid session.getItem('lastMultiplyJSON')` : session.getItem('lastMultiplyJSON');
	responseStringFinal = `\n==========\n` + responseStringFinal
	responseStringFinal = responseStringArray[0] + responseStringFinal
	$w("#multiplyResponseTXAREA").value = responseStringFinal
	}
// ¡ </CALLING FUNCTION - from Canine-Consulting => Import Export Data>