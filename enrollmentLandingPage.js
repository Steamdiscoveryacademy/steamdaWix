// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import {local, session, memory} from 'wix-storage';
import wixLocation from 'wix-location';
import wixUsers from 'wix-users';

$w.onReady(async function () {
	let isDevel = await wixUsersOnReady();
	postedEnrollmentOnReady(isDevel)
});

export async function wixUsersOnReady(){
	console.groupCollapsed('wixUsersOnReady')
	const user = wixUsers.currentUser;
	const developerUserIdArray = ['a8bfc307-51ba-49c2-91da-d4d859b94123']
	let isDevel = developerUserIdArray.includes(user.id)
	// isDevel = false;
	console.log(`isDevel: ${isDevel}`)
	console.log('wixUsers.currentUser')
	console.dir(user)
	console.log('user.getRoles()')
	console.dir(await user.getRoles())
	console.groupEnd()
	const adminShowArray = ["#btnAdminOnly"];
	if(user.loggedIn){
		user.getRoles()
		.then( (roles) => {
			console.log(roles);
			if (roles.some(r => r.name === "Admin")){
				for (var i = 0; i < adminShowArray.length; i++) {
					$w(adminShowArray[i]).show();
				}
			}
		});
	}
	// const develShowArray = ['postedEnrollmentLastKeyTxbox','postedEnrollmentLastElementTxbox','postedEnrollmentElementArrayTxbox'];
	// if (isDevel) {
	// 	develShowArray.forEach(element => {
	// 		element = '#' + element;
	// 		$w(element).show()
	// 	});		
	// }
	return isDevel
}

export function enrollmentLandingPageOnReady(){
	let wixWebhookId = local.getItem('wixWebhookId') == null ? 'NNULL' : local.getItem('wixWebhookId');
	wixWebhookId = wixWebhookId === 'NNULL' || wixWebhookId.length > 20 ? wixWebhookId : 'INVALID';
	console.log(`wixWebhookId: ${wixWebhookId}`);
	if(wixWebhookId.length > 20){
		$w('#btnGoToApplications').hide();
		$w('#btnGoToEnrollment').show();
	}else{
		$w('#btnGoToApplications').show();
		$w('#btnGoToEnrollment').hide();
	}

}

export function postedEnrollmentOnReady(isDevel = false){
	if (isDevel) {
		const develShowArray = ['postedEnrollmentLastKeyTxbox','postedEnrollmentLastElementTxbox','postedEnrollmentElementArrayTxbox'];
		develShowArray.forEach(element => {
			element = '#' + element;
			$w(element).show()
		});		
		let isValid = typeof session.getItem('postedEnrollmentLastKey') !== 'string' || session.getItem('postedEnrollmentLastKey').length < 3 ? false : true;
		$w('#postedEnrollmentLastKeyTxbox').value =  isValid ? session.getItem('postedEnrollmentLastKey') : 'No Posted Enrollments This Session'
		isValid = typeof session.getItem('postedEnrollmentLastElement') !== 'string' || session.getItem('postedEnrollmentLastElement').length < 3 ? false : true;
		$w('#postedEnrollmentLastElementTxbox').value =  isValid ? session.getItem('postedEnrollmentLastElement') : 'No Posted Enrollments This Session'
		isValid = typeof session.getItem('postedEnrollmentElementArray') !== 'string' || session.getItem('postedEnrollmentElementArray').length < 3 ? false : true;
		$w('#postedEnrollmentElementArrayTxbox').value =  isValid ? session.getItem('postedEnrollmentElementArray') : 'No Posted Enrollments This Session'
		// $w('#postedEnrollmentLastElementTxbox').value = typeof session.getItem('postedEnrollmentLastElement') !== 'string' || session.getItem('postedEnrollmentLastElement').length < 3 ? 'No Postend Enrollment This Session':
		// $w('#postedEnrollmentLastElementTxbox').value = session.getItem('postedEnrollmentLastElement')
		// $w('#postedEnrollmentElementArrayTxbox').value = session.getItem('postedEnrollmentElementArray')
	}
}

export function btnGoToApplications_click(event) {
	$w('#BannerStateBox').changeState('Invisible')
	let wixWebhookId = local.getItem('wixWebhookId') == null ? 'NNULL' : local.getItem('wixWebhookId');
	// wixWebhookId = wixWebhookId === 'NNULL' || wixWebhookId.length > 20 ? wixWebhookId : 'INVALID';
	if(wixWebhookId.length > 20){
		$w('#BannerStateBox').changeState('ApplicationNOT')
		return
	}
	wixLocation.to("/blank-3");
}

export function btnGoToEnrollment_click(event) {
	let wixWebhookId = local.getItem('wixWebhookId') == null ? 'NNULL' : local.getItem('wixWebhookId');
	// wixWebhookId = wixWebhookId === 'NNULL' || wixWebhookId.length > 20 ? wixWebhookId : 'INVALID';
	if(wixWebhookId.length < 20){
		$w('#BannerStateBox').changeState('EnrollmentNOT')
		return
	}
	wixLocation.to("/post-enrollment");
}

export function btnAdminOnly_click(event) {
	$w('#BannerStateBox').changeState('Invisible')
	const adminShowArray = ["#btnGoToApplicationsDevel","#btnGoToEnrollmentDevel","#textAdminOnly"];
	for (var i = 0; i < adminShowArray.length; i++) {
		$w(adminShowArray[i]).show();
	} 
}