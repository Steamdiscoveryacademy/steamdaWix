// ø <---------- <getContactByEmail Front-End>  ---------->
export async function getContactByEmail(emailToFind) {
	// let emailToFind = $w('#txtEmailToFind').value.trim();
	// let queryRresults = steamdaGetContactByEmailFunctionFrontEndOnly(emailToFind);
	let queryRresults = await steamdaGetContactByEmailFunction(emailToFind);
	let results = `the Query of Contacts for \nPrimary Email: '${emailToFind}' \nReturned:\n`;
	results += `BEGIN queryRresults:\n`;
	results += JSON.stringify(queryRresults,undefined,4);
	// results += queryRresults;
	results += `\nEND queryRresults`;
	//steamdaGetContactByEmailFunction
	$w('#textResult').text = results;
	$w('#textResult').expand();
}
// ø <---------- </getContactByEmail Front-End> ---------->