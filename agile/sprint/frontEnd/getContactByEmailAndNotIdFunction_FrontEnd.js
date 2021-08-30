// ø <---------- <getContactByEmailAndNotIdFunction Front-End>  ---------->
export async function getContactByEmailAndNotIdFunction(paramObject = { diagnosticOnly: false, collectHumanLog: false }) {
    // pstEnrSeven202108getContactByEmailAndNotIdFunction
    let emailToFind = paramObject.emailToFind;
    let notIdToFind = paramObject.notIdToFind;
    let diagnosticOnly = typeof paramObject.diagnosticOnly === 'boolean' && paramObject.diagnosticOnly === true ? true : false;
    let collectHumanLog = typeof paramObject.collectHumanLog === 'boolean' && paramObject.collectHumanLog === true ? true : false;
    let isValid = emailToFind.indexOf('@') > 0 ? true : false;
    isValid = notIdToFind.length !== 36 ? false : isValid;
    let logString = '';
    logString += `\nemailToFind: ${emailToFind}`;
    logString += `\nnotIdToFind: ${notIdToFind}`;
    if (!isValid) {
        logString = 'One of the two following Parameter Values is InValid:' + logString;

        // local.setItem('logString', logString);
        paramObject.logString = collectHumanLog ? logString : 'Human Log Not Collected';
        return; 
    }
    logString = 'For the following Parameters:' + logString;

    let queryResults = await steamdaGetContactByEmailAndNotIdFunction(emailToFind, notIdToFind);
    let count = queryResults.resultsCount;
    paramObject.results = {};
    paramObject.results.queryResults = queryResults;
    paramObject.results.tobeDeletedCount = queryResults.resultsCount;
    paramObject.results.actuallyDeletedCount = 0;
    paramObject.results.descr = 'PENDING: just a holder';
    
    logString += `\nthe Query of Contacts for \nPrimary Email Equal to: '${emailToFind}' \nAND Contact Primary Email Not-Equal to: ${notIdToFind}`;
    logString += `\nReturned:\n`;
    logString += `BEGIN queryResults:\n`;
    // logString += JSON.stringify(queryResults, undefined, 4);
    logString += `DEPRECATED: see local.getItem('lastResponseObject')`;
    logString += `\nEND queryResults\n`;
    if (count > 1) {
        paramObject.results.descr = 'GREATER_THAN_ONE: Alert, No Action';
        // local.setItem('superEnrollmentStatus', 'ALERT');
        paramObject.results.superEnrollmentStatus = 'ALERT';
        logString += `\nThe Count is More Than One [${count}] this is a Serious Probelem, for this reason the 'superEnrollmentStatus' has been set to 'ALERT' and no further Action taken.`;
        // local.setItem('logString', logString);
        paramObject.logString = collectHumanLog ? logString : 'Human Log Not Collected';
        return; 
    }
    if (count === 0) {
        paramObject.results.descr = 'ZERO: Expected, No Action';
        logString += `\nThe Count is Zero, this is the No BUG (expected) result. No further Action taken.`;
        // local.setItem('logString', logString);
        paramObject.logString = collectHumanLog ? logString : 'Human Log Not Collected';
        return; 
    }
    let idToDelete = queryResults.results._items[0]._id;
    paramObject.results.idToDelete = queryResults.results._items[0]._id;
    
    if (count === 1) {
        // ø 'if (count === 1)' ABOVE is Technically Redundant
        logString += `\nThe Count is One, this is the BUG exist in the form of the Contact with ID: ${idToDelete}`;
        logString += `\ndiagnosticOnly: ${diagnosticOnly}: Meaning the found Contact will `;
        logString += diagnosticOnly ? 'NOT ' : '';
        logString += `be Deleted at this time`;
        if (diagnosticOnly) {
            paramObject.results.descr = 'ONE: Diagnostic Only, No Action';
            // local.setItem('logString', logString);
            paramObject.logString = collectHumanLog ? logString : 'Human Log Not Collected';
            return; 
        }
    }
    
    // ø <Delete the BUG Contact>
    paramObject.results.descr = 'ONE: Delete the Bug (contact)';
    logString += `\n\nThe code to actually Delete Contact[${idToDelete}] would look like this:`;
    logString += `\nlet deleteResults = await steamdaDeleteContactById('${idToDelete}'')`;
    let deleteResults = await steamdaDeleteContactById(idToDelete);
    paramObject.results.deleteResults = deleteResults;
    paramObject.results.actuallyDeletedCount = 1;// † Validate deleteResuls

    logString += `\n\ndeleteResults:\n==============\n`;
    logString += deleteResults;
    // ø </Delete the BUG Contact>
    // local.setItem('logString', logString);
    paramObject.logString = collectHumanLog ? logString : 'Human Log Not Collected';

    return;
}
// ø <---------- </getContactByEmailAndNotIdFunction Front-End> ---------->