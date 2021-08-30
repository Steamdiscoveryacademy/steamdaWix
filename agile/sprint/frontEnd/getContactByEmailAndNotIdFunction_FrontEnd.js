// ø <---------- <getContactByEmailAndNotIdFunction Front-End>  ---------->
export async function getContactByEmailAndNotIdFunction(paramObject = { diagnosticOnly: false }) {
    let emailToFind = paramObject.emailToFind;
    let notIdToFind = paramObject.notIdToFind;
    let diagnosticOnly = typeof paramObject.diagnosticOnly === 'boolean' && paramObject.diagnosticOnly === true ? true : false;
    let isValid = emailToFind.indexOf('@') > 0 ? true : false;
    isValid = notIdToFind.length !== 36 ? false : isValid;
    let logString = '';
    logString += `\nemailToFind: ${emailToFind}`;
    logString += `\nnotIdToFind: ${notIdToFind}`;
    if (!isValid) {
        logString = 'One of the two following Parameter Values is InValid:' + logString;

        // local.setItem('logString', logString);
        paramObject.logString = logString;
        return; // ¡ convey to paramobject
    }
    logString = 'For the following Parameters:' + logString;

    let queryRresults = await steamdaGetContactByEmailAndNotIdFunction(emailToFind, notIdToFind);
    let count = queryRresults.resultsCount;

    logString += `\nthe Query of Contacts for \nPrimary Email Equal to: '${emailToFind}' \nAND Contact Primary Email Not-Equal to: ${notIdToFind}`;
    logString += `\nReturned:\n`;
    logString += `BEGIN queryRresults:\n`;
    logString += JSON.stringify(queryRresults, undefined, 4);
    logString += `\nEND queryRresults\n`;
    if (count > 1) {
        local.setItem('superEnrollmentStatus', 'ALERT');
        logString += `\nThe Count is More Than One [${count}] this is a Serious Probelem, for this reason the 'superEnrollmentStatus' has been set to 'ALERT' and no further Action taken.`;
        // local.setItem('logString', logString);
        paramObject.logString = logString;
        return; // ¡ convey to paramobject
    }
    if (count === 0) {
        logString += `\nThe Count is Zero, this is the No BUG (expected) result. No further Action taken.`;
        // local.setItem('logString', logString);
        paramObject.logString = logString;
        return; // ¡ convey to paramobject
    }
    let idToDelete = queryRresults.results._items[0]._id

    if (count === 1) {
        logString += `\nThe Count is One, this is the BUG exist in the form of the Contact with ID: ${idToDelete}`;
        logString += `\ndiagnosticOnly: ${diagnosticOnly}: Meaning the found Contact will `;
        logString += diagnosticOnly ? 'NOT ' : '';
        logString += `be Deleted at this time`;
        if (diagnosticOnly) {
            // local.setItem('logString', logString);
            paramObject.logString = logString;
            return; // ¡ convey to paramobject
        }
    }

    // ø <Delete the BUG Contact>
    logString += `\n\nThe code to actually Delete Contact[${idToDelete}] would look like this:`;
    logString += `\nlet deleteResults = await steamdaDeleteContactById('${idToDelete}'')`;
    let deleteResults = await steamdaDeleteContactById(idToDelete)
    logString += `\n\ndeleteResults:\n==============\n`;
    logString += deleteResults;
    // ø </Delete the BUG Contact>
    // local.setItem('logString', logString);
    paramObject.logString = logString;

    return; // ¡ convey to paramobject
}
// ø <---------- </getContactByEmailAndNotIdFunction Front-End> ---------->