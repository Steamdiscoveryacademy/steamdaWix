// ø <----------- <doSecondaryParentCreateContact Front-End>  ----------->
export async function doSecondaryParentCreateContact() {
    // let wixContactInfo = JSON.parse(memory.getItem('spContactPrepJSON'));
    // let paramObjectThis = {};
    let paramObjectThis = JSON.parse(memory.getItem('spContactPrepJSON'));
    // paramObjectThis.contactInfo = wixContactInfo.contactInfo;
	// console.log("[~LINE 864]paramObjectThis.contactInfo: ")
	// console.log(paramObjectThis)
	// console.log(paramObjectThis.contactInfo)
	let wixContact = await steamdaCreateContactFunction(paramObjectThis);
	// console.log('[~LINE 867]wixContact: ');
	// console.log(wixContact);
    memory.setItem('spContactExecuteUpsert',JSON.stringify(wixContact));
	// $w('#crmContactId').value = wixContact._id;
	// $w('#inputRevision').value = wixContact.revision;
	// $w('#contactCurrent').value = JSON.stringify(wixContact,undefined,4);
	// $w('#contactJSON').value = JSON.stringify(wixContact,undefined,4);
	// $w('#responseKind').value = "Contact";
	// $w('#responseHeader').text = "'Create Contact' Response";
}
// ø <----------- </doSecondaryParentCreateContact Front-End> ----------->
