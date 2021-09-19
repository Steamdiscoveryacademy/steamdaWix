// ø <------------ <Update WebhookPayload WebhookStatus GROUP>  -------------->
// ø <------------ <doUpdateThisWebhookPayload(status)>  -------------->
export async function doUpdateThisWebhookPayload(status) {
	let response = "";
	let kInvalidAppend = `\nNo action taken.\nPlease try again or ask for assistnace.`;
	if($w('#thisKey').value.length < 30){
		response = "Invalid 'WiX-Webhook-ID'" + kInvalidAppend;
		// $w('#responseHolderFieldZZZ').value = response;
		// onReadyUserInterface();
		return;
	}
	if($w('#ddCurrentStatusUpdate').value === $w('#thisCurrentStatus').value){
		response = "On-deck 'Webhook-Payload' Status is the same as the Drop-Down (update) Value. No Update Indicated" + kInvalidAppend;
		// $w('#responseHolderFieldZZZ').value = response;
		// onReadyUserInterface();
		return;
	}
	await updateStatuWebhookPayloadThis();
	let lastResponse = JSON.parse(local.getItem('lastResponseObject'));
	if(lastResponse._id === $w('#thisKey').value){
		$w('#thisCurrentStatus').value = lastResponse.currentStatus;
		// if(typeof lastResponse.resolvedStatus !== 'undefined'){
		// 	local.setItem('webhookThisResolved',lastResponse.resolvedStatus);
		// }
	}
	response = "UPDATE: String Pending" + kInvalidAppend;
	// $w('#responseHolderFieldZZZ').value = response;
	// refreshWebhookPayloadDataSet()
	// onReadyUserInterface();

}
// ø <------------ </doUpdateThisWebhookPayload(status)> -------------->

// ø <------------ <updateStatuWebhookPayloadThis()>  -------------->
export async function updateStatuWebhookPayloadThis(getOnly = false){
	   const options = {
        "suppressAuth": true,
        "suppressHooks": true
    };
    let webhookId = $w('#thisKey').value;

    let updateObject = await wixData.get("webhookPayload", webhookId, options);
    let doUserInterfaceUpdate = false;
    if(getOnly){
      	local.setItem('lastResponseObject', JSON.stringify(updateObject));
        if(updateObject.currentStatus === "RESOLVED"){
            if(updateObject.resolvedStatus === "RESOLVED"){
                local.setItem('wixWebhookStatus',"RESOLVED");
                doUserInterfaceUpdate = true;
            }else{
                local.setItem('lastErrorString',"current WebhookPayload 'currentStatus' and 'resolvedStatus' are Out-Of-Sync");
            }
        }
        if(updateObject.currentStatus !== local.getItem('wixWebhookStatus')){
            local.setItem('wixWebhookStatus',updateObject.currentStatus)
            doUserInterfaceUpdate = true;
        }
        // $w('#responseHolderFieldZZZ').value = JSON.stringify(updateObject,undefined,4);
        if(doUserInterfaceUpdate){
            // doUserInterfaceCleanupCurrent();
            console.log("[~1665]'doUserInterfaceUpdate [boolean] doEquivalent for 'Process Web Hooks'?");
            console.log("[~1666]'getOnly' Webhook Payload && doUserInterfaceCleanupCurrent()");
        }
        console.log("[~2278]About to Return with 'getOnly' Webhook Payload");
        return;
    }
    // doUserInterfaceUpdate = true;

	let now = new Date();
	let nowISO = now.toISOString();
	// let updateObject = {};
	// updateObject._id = local.getItem('webhookThisId');
	updateObject.currentStatus = $w('#ddCurrentStatusUpdate').value;
	updateObject.currentStatusStamp = now;
	if($w('#ddCurrentStatusUpdate').value === 'RESOLVED'){
		updateObject.resolvedStatus = $w('#ddCurrentStatusUpdate').value;
		updateObject.resolvedStatusStamp = now;
	}
	local.setItem('lastParamObject', JSON.stringify(updateObject));
	// $w('#txareaCodeBlock').value = JSON.stringify(updateObject,undefined,4);
	let response = await wixData.update("webhookPayload", updateObject)
	local.setItem('lastResponseObject', JSON.stringify(response));
	// $w('#responseHolderFieldZZZ').value = JSON.stringify(response,undefined,4);
}
// ø <------------ </updateStatuWebhookPayloadThis()> -------------->

export function btnWebhookResolve_click(event) {
    let isValid = true;
    let invalidString = '';
    let selected = $w('#ddCurrentStatusUpdate').value;
    selected = selected.length === 0 ? 'NONE_SELECTED': selected;
    if(isValid){
        isValid = $w('#radioAreYouSure').value === 'YES' ? isValid : false;
        invalidString = "'Update Status' is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.";
    }
    if(isValid){
        isValid = $w('#thisKey').value.length > 30 ? isValid : false;
        invalidString = "'Update Status' cannot proceed. No valid Webhook Payload record selected. Select the Webhook Payload from the list at left for which you wish to change the Status.\n\nNo action taken. \nPlease try again or ask for assistance.";
    }
    if(isValid){
        let validStatusOptionArray = ['PENDING','TEST','PROBLEM','PRETRASH','TESTRESOLVED','RESOLVED'];
        isValid = validStatusOptionArray.includes(selected) ? isValid : false;
        invalidString = "'Update Status' cannot proceed. "+selected+" is NOT a valid Status.";
    }
    if(isValid){
        // let validStatusOptionArray = ['PENDING','TEST','PRETRASH','TESTRESOLVED','RESOLVED'];
        isValid = $w('#thisCurrentStatus').value !== selected ? isValid : false;
        invalidString = "'Update Status' cannot proceed. "+selected+" would mean No Change as it is the Current Status.";
    }

    if(isValid){
		// $w('#responseHolderFieldZZZ').value = "'Update Status' is NOT Enabled at this time.\n\nNo action taken. \nPlease try again or ask for assistance.";
        let statusThis = $w('#ddCurrentStatusUpdate').value;
        doUpdateThisWebhookPayload(statusThis);
    	// updateStatuWebhookPayloadThis(true); 
        // doUserInterfaceCleanupCurrent();
	}else{
		// $w('#responseHolderFieldZZZ').value = "'Resolve Webhook' is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.";
		$w('#responseHolderFieldZZZ').value = invalidString;
	}
	$w("#radioAreYouSure").value = 'NO';
    $w('#ddCurrentStatusUpdate').value = '';
	$w("#ddCurrentStatusUpdate").resetValidityIndication();

}
// ø <------------ </Update WebhookPayload WebhookStatus GROUP> -------------->