// import wixCrmBackend from 'wix-crm-backend';
// import { contacts } from 'wix-crm-backend';

// ø <---------- <steamdaGetContactByEmailFunction>  ---------->
export async function steamdaGetContactByEmailFunction(emailToFind) {
    // export async function steamdaGetContactByEmailFunction(emailToFind) {//ORIG CopyCode
    
        let results = await contacts.queryContacts()
        // let results = await contacts.queryContacts()//ORIG CopyCode
            // .eq("info.emails.email", emailToFind)//ORIG CopyCode
            .eq("primaryInfo.email", emailToFind)
            .find();
    
        let count = (results.items).length;
        let returnObject = {};
        returnObject.emailToFind = emailToFind;
        returnObject.resultsCount = count;
        if (count === 1) {
            returnObject.resultsString = 'Found 1 contact';
            returnObject.resultCountValid = true;
            returnObject.resultContactAction = 'UPDATE';
        } else if (count > 1) {
            returnObject.resultsString = 'Found more than 1 contact by Primary Email. This is an Error.';
            returnObject.resultCountValid = false;
            returnObject.resultContactAction = 'ABORT';
        } else {
            returnObject.resultsString = 'No contacts found';
            returnObject.resultContactAction = 'INSERT';
            returnObject.resultCountValid = true;
        }
        returnObject.results = results;
        return returnObject;
    }
    
    // ø <---------- </steamdaGetContactByEmailFunction> ---------->