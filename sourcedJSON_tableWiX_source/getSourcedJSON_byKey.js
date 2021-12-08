/**
 * ø Versioned by nowISO and versionStampTxt attribute
 * @param {*} key 
 * @returns jsonData from sourceJSON database Record  
 */
// ø <---------- <getSourcedJSON_byKey UTILITY>  ---------->
// pstEnrSevenNEW202108
export async function getSourcedJSON_byKey(key, returnAs = 'stringify') {
    let supportedReturnAsValueArray = ['stringify','parse','raw']
    returnAs = supportedReturnAsValueArray.includes(returnAs) ? returnAs : 'stringify'
    // ø 'stringify' is default _only_ because it was the original, unparameterized, return state
    let now = new Date();
    let nowISO = now.toISOString();
    let recordSourcedJSON = await wixData.query("sourcedJSON")
        .eq("key", key)
        .lt("versionStampTxt", nowISO)
        .descending("versionStampTxt")
        .limit(1)
        .find();
    switch (returnAs) {
        case 'stringify':
            return JSON.stringify(recordSourcedJSON.items[0].jsonData);
            break;
        case 'parse':
            // ø 'parse' is same as 'raw' at creation, 
            // ø  ø but expecting that there _will_ be a distinction with a difference later
            return recordSourcedJSON.items[0].jsonData
            break;
        case 'raw':
            return recordSourcedJSON.items[0].jsonData
            break;
            
        default:
            // ø default: IS 'stringify'
            return JSON.stringify(recordSourcedJSON.items[0].jsonData);
        break;
    }
}
// ø <---------- </getSourcedJSON_byKey UTILITY> ---------->

/* ACTUAL CODE in postEnrollment.js
    // <202108100800> pstEnrSevenNEW202108
    let key = "pstEnrBootstrap";
    let jsonDataJSON = await getSourcedJSON_byKey(key);
    let jsonDataObject = JSON.parse(jsonDataJSON);
    memory.setItem('stepObjects',JSON.stringify(jsonDataObject.stepObjects));
    memory.setItem('stepMessaging',JSON.stringify(jsonDataObject.stepMessaging));
    msboxPostEnrollmentSevenAnyAction(responseObject);
    // </202108100800> pstEnrSevenNEW202108
*/
