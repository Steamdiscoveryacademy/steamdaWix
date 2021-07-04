export function post_blessingOfTheAnimals(request) {
    let options = {
        "headers": {
            "Content-Type": "application/json"
        }
    };

    const title = 'blessingOfTheAnimals';
    const source = "CognitoForms";
    const fsFormId = 'bradlowry1.1';
    // const verifyHandshake = '8FD7E76007870C3F4352D478B19E5AE6E61672918EBDEADC023491A7ABBE8197';
    return request.body.json()
        .then((body) => {
            // if (verifyHandshake !== body.HandshakeKey) {
            // 	// console.warn('Handshake Failed');//maybe later...
            // 	return notFound(options);
            // }
            // insert the item in a collection
            let thisPayload = JSON.stringify(body);
            let thisWebhookStamp = new Date();
            // thisWebhookStamp.shortDateTime();
            // let mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            // let thisWebhookStampShortDateTime = mons[thisWebhookStamp.getMonth()];
            // thisWebhookStampShortDateTime += ' ' + thisWebhookStamp.getDate().toString() + ' @ ' + thisWebhookStamp.getHours().toString() + ':' + ('00' + thisWebhookStamp.getMinutes().toString()).substr(-2);
            let thisTitle = title;
            let thisWebhookStampISO = thisWebhookStamp.toISOString();
            let thisCurrentStatusStamp = new Date();

            let thisCurrentStatus = 'PENDING'; //for this form
            let recordInsert = {
                "title": thisTitle,
                "source": source,
                "payload": thisPayload,
                "payloadId": "777",
                "webhookStamp": thisWebhookStampISO,
                "webhookId": "777",
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