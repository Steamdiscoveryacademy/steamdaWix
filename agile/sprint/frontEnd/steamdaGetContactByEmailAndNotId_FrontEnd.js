// ø <---------- <getContactByEmailAndNotIdFunction Front-End>  ---------->
export async function getContactByEmailAndNotIdFunction(emailToFind = 'invalid Email',notIdToFind = 'invalid Id') {
    let isValid = emailToFind.indexOf('@') > 0 ? true : false;
    isValid = notIdToFind.length !== 36 ? false : isValid;
    let results = '';
    if (!isValid) {
        results += 'One of the two following Parameter Values is InValid:';
        results += `\nemailToFind: ${emailToFind}`;
        results += `\nnotIdToFind: ${notIdToFind}`;

        local.setItem('logString', results);
        return;
    }

	let queryRresults = await steamdaGetContactByEmailAndNotIdFunction(emailToFind,notIdToFind);

    results += `the Query of Contacts for \nPrimary Email Equal to: '${emailToFind}' \nAND Contact Primary Email Not-Equal to: ${notIdToFind}`;
    results += `\nReturned:\n`;
    results += `BEGIN queryRresults:\n`;
    results += JSON.stringify(queryRresults,undefined,4);
    // results += queryRresults;
    results += `\nEND queryRresults`;
    local.setItem('logString', results);

}
// ø <---------- </getContactByEmailAndNotIdFunction Front-End> ---------->
