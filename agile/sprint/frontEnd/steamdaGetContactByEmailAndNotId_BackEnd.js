// ø <---------- <steamdaGetContactByEmailAndNotIdFunction Back-End>  ---------->
export async function steamdaGetContactByEmailAndNotIdFunction(emailToFind,notIdToFind) {
    // validation should have been done in the Front-End
    
    let results = await contacts.queryContacts()
    // let results = await contacts.queryContacts()//ORIG CopyCode
        // .eq("info.emails.email", emailToFind)//ORIG CopyCode
        .ne("_id", notIdToFind)
        .eq("primaryInfo.email", emailToFind)
        .find();

    let count = (results.items).length;
    let returnObject = {};
    returnObject.emailToFind = emailToFind;
    returnObject.notIdToFind = notIdToFind;
    returnObject.resultsCount = count;
    if (count === 1) {
        returnObject.resultsString = 'Found 1 contact';
        returnObject.resultContactId = result.items[0]._id;
        returnObject.resultScriptAction = 'DELETE';
    } else if (count > 1) {
        returnObject.resultsString = 'Found more than 1 contact by Primary Email. This is an Error.';
        returnObject.resultContactId = 999;
        returnObject.resultScriptAction = 'ABORT';
    } else {
        returnObject.resultsString = 'No contacts found';
        returnObject.resultContactId = 777;
        returnObject.resultScriptAction = 'CONTINUE';
    }
    returnObject.results = results;
    return returnObject;
}
// ø <---------- </steamdaGetContactByEmailAndNotIdFunction Back-End> ---------->
