// ø <---------- <ppStContactDedupe>  ---------->
export async function ppStContactDedupe(paramObject = {}) {
    let diagnosticOnly = typeof paramObject.diagnosticOnly === 'boolean' && paramObject.diagnosticOnly === true ? true : false;
    
    // ø <ELSE>
    // ‡ validate: [DATA]local.getItem('familyId'): \b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b
    // ‡ validate: [DATA]local.getItem('studentId'): \b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b
    // ‡ validate: [DATA]local.getItem('familyEmail'): /^\S+@\S+\.\S+$/
    // ‡ validate: [DATA]local.getItem('studentEmail'): /^\S+@\S+\.\S+$/
    let regexId = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/;
    let regexEmail = /^\S+@\S+\.\S+$/;
    let allParametersValid = true;
    let expressionIsValid = regexId.test(local.getItem('familyId'));
    let DOX = `Is '${local.getItem('familyId')} a Valid PP ID?: ${expressionIsValid}`;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    allParametersValid = expressionIsValid ? allParametersValid : false;
    expressionIsValid = regexEmail.test(local.getItem('familyEmail'));
    DOX = `Is '${local.getItem('familyEmail')} a Valid PP Email?: ${expressionIsValid}`;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    allParametersValid = expressionIsValid ? allParametersValid : false;
    expressionIsValid = regexId.test(local.getItem('studentId'));
    DOX = `Is '${local.getItem('studentId')} a Valid ST ID?: ${expressionIsValid}`;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    allParametersValid = expressionIsValid ? allParametersValid : false;
    expressionIsValid = regexEmail.test(local.getItem('studentEmail'));
    DOX = `Is '${local.getItem('studentEmail')} a Valid ST Email?: ${expressionIsValid}`;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    allParametersValid = expressionIsValid ? allParametersValid : false;
    if(typeof allParametersValid !== 'boolean' || allParametersValid !== true){
        DOX = `'danger': One or more Key Data Points for the Primary Parent and Student is Invalid.`;
        local.setItem('logString', local.getItem('logString') + ',' + DOX);
        appendStepLogPPEQ('danger', `One or more Key Data Points for the Primary Parent and Student is Invalid.`);
        return;
    }
    DOX = `'success': All Key Data Points for the Primary Parent and Student are Valid.`;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    // ø </ELSE>




    // † confirm ppMemberById
    // † confirm ppMemberByEmail
    // † confirm stMemberById
    // † confirm stMemberByEmail

    // ø <pedantic at first>
    // † getContactByEmailAndNotIdFunction(diagnosticOnly)
    // † getContactByEmailAndNotIdFunction(diagnosticOnly)
    // ø </pedantic at first>
    //
 }
// ø <---------- </ppStContactDedupe> ---------->

// ø <---------- <getContactByEmailAndNotIdFunction Front-End>  ---------->
export async function getContactByEmailAndNotIdFunction(emailToFind = 'invalid Email', notIdToFind = 'invalid Id', diagnosticOnly = false) {
    let isValid = emailToFind.indexOf('@') > 0 ? true : false;
    isValid = notIdToFind.length !== 36 ? false : isValid;
    let logString = '';
    logString += `\nemailToFind: ${emailToFind}`;
    logString += `\nnotIdToFind: ${notIdToFind}`;
    if (!isValid) {
        logString = 'One of the two following Parameter Values is InValid:' + logString;

        local.setItem('logString', logString);
        return;
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
        local.setItem('logString', logString);
        return;
    }
    if (count === 0) {
        logString += `\nThe Count is Zero, this is the No BUG (expected) result. No further Action taken.`;
        local.setItem('logString', logString);
        return;
    }
    let idToDelete = queryRresults.results._items[0]._id
    //verificatio:   queryRresults.results._items[0]._id
    if (count === 1) {
        logString += `\nThe Count is One, this is the BUG exist in the form of the Contact with ID: ${idToDelete}`;
        logString += `\ndiagnosticOnly: ${diagnosticOnly}: Meaning the found Contact will `;
        logString += diagnosticOnly ? 'NOT ' : '';
        logString += `be Deleted at this time`;
        if (diagnosticOnly) {
            local.setItem('logString', logString);
            return;
        }
    }

    // ø <Delete the BUG Contact>
    logString += `\n\nThe code to actually Delete Contact[${idToDelete}] would look like this:`;
    logString += `\nlet deleteResults = await steamdaDeleteContactById('${idToDelete}'')`;
    let deleteResults = await steamdaDeleteContactById(idToDelete)
    logString += `\n\ndeleteResults:\n==============\n`;
    logString += deleteResults;
    // ø </Delete the BUG Contact>
    local.setItem('logString', logString);

    return;
}
// ø <---------- </getContactByEmailAndNotIdFunction Front-End> ---------->


// ø <---------- <Working Buttons for Finding Dupes> ---------->
export async function btnExtraContactPrimary_click(event) {
    let diagnosticOnlyThis = true;
    if ($w('#radioAreYouSure').value === 'YES') {
        diagnosticOnlyThis = false;
    }
    await getContactByEmailAndNotIdFunction(local.getItem('familyEmail'), local.getItem('familyId'), diagnosticOnlyThis);
    $w('#sessionEnrollmentJSON').value = local.getItem('logString');
    $w('#radioAreYouSure').value = 'NO';
}

export async function btnExtraContactStudent_click(event) {
    let diagnosticOnlyThis = true;
    if ($w('#radioAreYouSure').value === 'YES') {
        diagnosticOnlyThis = false;
    }
    await getContactByEmailAndNotIdFunction(local.getItem('studentEmail'), local.getItem('studentId'), diagnosticOnlyThis);
    $w('#sessionEnrollmentJSON').value = local.getItem('logString');
    $w('#radioAreYouSure').value = 'NO';
}
// ø <---------- </Working Buttons for Finding Dupes> ---------->