export async function doGetRecord(what, where) {
    let whatLower = what.toLowerCase();
    let supportedWhatValues = ['ppMember', 'ppContact', 'stMember', 'stContact'];
    let kAppend = '\n\nNo Action Taken.\nPlease try again or ask for assistance.';
    let response = "'" + what + "' is Not Supported to be 'gotten' at this time." + kAppend;
    let responseObject = {};
    let familyId = typeof local.getItem('familyId') === 'string' ? local.getItem('familyId') : 'ZZZ';
    let studentId = typeof local.getItem('studentId') === 'string' ? local.getItem('studentId') : 'ZZZ';
    let secondaryId = typeof local.getItem('secondaryId') === 'string' ? local.getItem('secondaryId') : 'ZZZ';
    let valid = true;
    valid = what.substr(0, 2) === 'pp' && familyId.length < 10 ? false : valid;
    valid = what.substr(0, 2) === 'st' && studentId.length < 10 ? false : valid;
    valid = what.substr(0, 2) === 'sp' && secondaryId.length < 10 ? false : valid;
    let thisId = what.substr(0, 2) === 'pp' && valid === true ? familyId : 'ZZnomatchZZ'
    thisId = what.substr(0, 2) === 'st' && valid === true ? studentId : thisId;
    thisId = what.substr(0, 2) === 'sp' && valid === true ? secondaryId : thisId;
    if (supportedWhatValues.includes(what)) {
        if (!valid) {
            response = "'" + what + "' is not able to be 'gotten' at this time. Primary-Parent ID (aka Family ID) is not valid.";
            response += kAppend;
        }
        if (whatLower.indexOf('member') > 0) {
            responseObject = await getUserFrontEnd(thisId);
            response = JSON.stringify(responseObject, undefined, 4);
        }
        if (whatLower.indexOf('contact') > 0) {
            responseObject = await steamdaGetContactFunction(thisId);
            response = JSON.stringify(responseObject, undefined, 4);
        }
    }
    where = where.substr(0, 1) === '#' ? where : '#' + where;
    $w(where).value = response;
}