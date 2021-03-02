
import { ok, notFound, serverError } from 'wix-http-functions'; //YOUTUBE:v=4yCBplV3MPQ&t=1s
import wixData from 'wix-data';

// URL to call this HTTP function from your published site looks like:
// Premium site - https://mysite.com/_functions/example/multiply?leftOperand=3&rightOperand=4
// Premium site - https://steamda.com/_functions/freeLessonRequest
// Free site - https://brad7390.wixsite.com/my-site-2/_functions/freeLessonRequest

// URL to test this HTTP function from your saved site looks like:
// Premium site - https://steamda.com/_functions-dev/freeLessonRequest
// Free site - https://brad7390.wixsite.com/my-site-2/_functions-dev/freeLessonRequest

export function post_contactUs(request) {

	let options = {
		"headers": {
			"Content-Type": "application/json"
		}
	};


	const title = 'Contact Us';
	const source = "FormStack";
	const fsFormId = '4273251';
	const verifyHandshake = 'CB2F4FBB32DFF3F4DF1CBDC05FE4A0AFF82432F5FA02BD48F0516AE3C06A74B1';
	return request.body.json()
		.then((body) => {
			if (verifyHandshake !== body.HandshakeKey) {
				// console.warn('Handshake Failed');//maybe later...
				return notFound(options);
			}
			// insert the item in a collection
			let thisPayload = JSON.stringify(body);
			let thisWebhookStamp = new Date();
			thisWebhookStamp.shortDateTime();
			let thisTitle = title + ' on ' + thisWebhookStamp.short;
			thisWebhookStamp = thisWebhookStamp.toISOString();
			let thisCurrentStatusStamp = new Date();

			let thisCurrentStatus = 'PENDING';//for this form
			let recordInsert = {
				"title": thisTitle,
				"source": source,
				"payload": thisPayload,
				"payloadId": body.UniqueID,
				"webhookStamp": thisWebhookStamp,
				"webhookId": body.FormID,
				"currentStatus": thisCurrentStatus,
				"currentStatusStamp": thisCurrentStatusStamp,
				"resolvedStatus": null,
				"resolvedStatusStamp": null,
			}
			wixData.insert("webhookPayload", recordInsert);
			// console.log('free_lesson_request Received');//maybe later...
			// console.log(thisPayload);//maybe later...
			// console.log(recordInsert);//maybe later...
			// console.log(body.HandshakeKey);//maybe later...
			return ok(options);
		})
}

export function post_applicationSummer(request) {

	let options = {
		"headers": {
			"Content-Type": "application/json"
		}
	};


	const title = 'Application Summer';
	const source = "FormStack";
	const fsFormId = '4223065';
	const verifyHandshake = 'AB324590076895D72F0F36A40070CEAB038B99982F41ACFA83EE6DDCDFF4BB2A';
	return request.body.json()
		.then((body) => {
			if (verifyHandshake !== body.HandshakeKey) {
				// console.warn('Handshake Failed');//maybe later...
				return notFound(options);
			}
			// insert the item in a collection
			let thisPayload = JSON.stringify(body);
			let thisWebhookStamp = new Date();
			thisWebhookStamp.shortDateTime();
			let thisTitle = title + ' on ' + thisWebhookStamp.short;
			thisWebhookStamp = thisWebhookStamp.toISOString();
			let thisCurrentStatusStamp = new Date();

			let thisCurrentStatus = 'PENDING';//for this form
			let recordInsert = {
				"title": thisTitle,
				"source": source,
				"payload": thisPayload,
				"payloadId": body.UniqueID,
				"webhookStamp": thisWebhookStamp,
				"webhookId": body.FormID,
				"currentStatus": thisCurrentStatus,
				"currentStatusStamp": thisCurrentStatusStamp,
				"resolvedStatus": null,
				"resolvedStatusStamp": null,
			}
			wixData.insert("webhookPayload", recordInsert);
			// console.log('free_lesson_request Received');//maybe later...
			// console.log(thisPayload);//maybe later...
			// console.log(recordInsert);//maybe later...
			// console.log(body.HandshakeKey);//maybe later...
			return ok(options);
		})
}

export function post_freeLessonRequest(request) {
	let options = {
		"headers": {
			"Content-Type": "application/json"
		}
	};


	const title = 'freeLessonRequest';
	const source = "FormStack";
	const fsFormId = '4262311';
	const verifyHandshake = '8FD7E76007870C3F4352D478B19E5AE6E61672918EBDEADC023491A7ABBE8197';
	return request.body.json()
		.then((body) => {
			if (verifyHandshake !== body.HandshakeKey) {
				// console.warn('Handshake Failed');//maybe later...
				return notFound(options);
			}
			// insert the item in a collection
			let thisPayload = JSON.stringify(body);
			let thisWebhookStamp = new Date();
			thisWebhookStamp.shortDateTime();
			let thisTitle = title + ' on ' + thisWebhookStamp.short;
			thisWebhookStamp = thisWebhookStamp.toISOString();
			let thisCurrentStatusStamp = new Date();

			let thisCurrentStatus = 'PENDING';//for this form
			let recordInsert = {
				"title": thisTitle,
				"source": source,
				"payload": thisPayload,
				"payloadId": body.UniqueID,
				"webhookStamp": thisWebhookStamp,
				"webhookId": body.FormID,
				"currentStatus": thisCurrentStatus,
				"currentStatusStamp": thisCurrentStatusStamp,
				"resolvedStatus": null,
				"resolvedStatusStamp": null,
			}
			wixData.insert("webhookPayload", recordInsert);
			// console.log('free_lesson_request Received');//maybe later...
			// console.log(thisPayload);//maybe later...
			// console.log(recordInsert);//maybe later...
			// console.log(body.HandshakeKey);//maybe later...
			return ok(options);
		})
}

Date.prototype.shortDateTime = function () {
	let mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let mon = mons[this.getMonth()];
	let d = this.getDate();
	let yyyy = this.getFullYear();
	let h24 = this.getHours() - 6;//MANUAL, should be dynamic from site.
	let h = h24 % 12 === 0 ? 12 : h24 % 12;
	let ii = '00' + this.getMinutes();
	ii = ii.substr(-2, 2);
	let ampm = h24 > 11 ? 'PM' : 'AM';
	this.short = mon + ' ' + d + ' @ ' + h + ':' + ii + ampm;
};
