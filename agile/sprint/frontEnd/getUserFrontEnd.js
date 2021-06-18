// ø <---------- <getUserFrontEnd Front-End>  ---------->
export async function getUserFrontEnd(memberId) {
	let thisUserData = await getUser(memberId); 
	console.log(thisUserData);
	// $w('#gotContact').value = JSON.stringify(thisUserData,undefined,4);
	// $w('#gotContact').value = JSON.stringify(thisUserData.undefined,4);
}
// ø <---------- </getUserFrontEnd Front-End> ---------->
