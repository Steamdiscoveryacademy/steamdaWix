// ø <----------- <doUpdateContact Front-End>  ----------->
export async function doUpdateContact(paramObjectThis) {
	// console.log(paramObjectThis)
    
	let wixContact = await streamdaUpdateContactFunction(paramObjectThis);
	// console.log('[~LINE 1064]wixContact: ');
	console.log(wixContact);
	$w('#crmContactId').value = wixContact._id;
	$w('#inputRevision').value = wixContact.revision;
	$w('#contactCurrent').value = JSON.stringify(wixContact,undefined,4);
}
// ø <----------- </doUpdateContact() Front-End> ----------->