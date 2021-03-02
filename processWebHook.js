import wixData from 'wix-data';

$w.onReady(function () {
    wixData.query("dsWebhookPayload")
        .count()
        .then((num) => {
            let numberOfItems = num;
            let moreItems = numberOfItems - 10;
            console.log("moreItems: " + moreItems);
            if (moreItems > 0) {
                moreItems = 'plus ' + moreItems + ' additional items';
                $w('#moreItems').text = moreItems;
                $w('#moreItems').show();
            }
        })
        .catch((error) => {
            let errorMsg = error.message;
            let code = error.code;
        });
});

export function rptrTitle_click(event, $w) {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here:
    // console.log("rptrTitle_click: INERT");
    let targetItem = $w("#dsWebhookPayload").getCurrentItem();
    console.log("getCurrentItem: ");
    console.log(targetItem);
    let wixId = targetItem["_id"];
    // let wixId = "testID";
    $w('#thisKey').value = wixId;
    $w('#thisTitle').value = targetItem['title'];
    $w('#thisSource').value = targetItem['source'];
    $w('#thisPayload').value = targetItem['payload'];
    $w('#thisPayloadId').value = targetItem['payloadId'];
    $w('#thisCurrentStatus').value = targetItem['currentStatus'];
    let currentStatusStamp = targetItem['currentStatusStamp'].toString();
    currentStatusStamp = currentStatusStamp.substr(0, currentStatusStamp.search(" GMT"))
    $w('#thisCurrentStatusStamp').value = currentStatusStamp;
    // $w('#thisCurrentStatusStamp').value = targetItem['currentStatusStamp']; //copy pasted
    $w('#thisResolvedStatus').value = targetItem['resolvedStatus'];
    if (targetItem['resolvedStatusStamp'] === null) {
        $w('#thisResolvedStatusStamp').value = targetItem['resolvedStatusStamp'];
    } else {
        let resolvedStatusStamp = targetItem['resolvedStatusStamp'].toString();
        resolvedStatusStamp = resolvedStatusStamp.substr(0, resolvedStatusStamp.search(" GMT"))
        $w('#thisResolvedStatusStamp').value = resolvedStatusStamp;
    }
}

export function dropdownFilter_change(event) {
    var filterValue = $w('#dropdownFilter').value;
    switch (filterValue) {
        case 'ALLRESOLVED':
            $w("#dsWebhookPayload").setFilter(wixData.filter()
                .isNotEmpty("resolvedStatus"));
            $w('#filterDescr').text = "Descriptison for All Resolved Webhook's Received";
            console.log(filterValue);
            break;

        case 'CONTACTUS':
            $w("#dsWebhookPayload").setFilter(wixData.filter()
                .isEmpty("resolvedStatus")
                .eq("source", 'FormStack')
                .eq("webhookId", '4273251')
            );
            $w('#filterDescr').text = "Descriptison for All 'Contact Us' Webhook's Received";
            console.log(filterValue);
            break;

        case 'APPLICATIONSUMMER':
            $w("#dsWebhookPayload").setFilter(wixData.filter()
                .isEmpty("resolvedStatus")
                .eq("source", 'FormStack')
                .eq("webhookId", '4223065')
            );
            $w('#filterDescr').text = "Descriptison for All 'Application Summer' Webhook's Received";
            console.log(filterValue);
            break;

        case 'FREELESSNREQUEST':
            $w("#dsWebhookPayload").setFilter(wixData.filter()
                .isEmpty("resolvedStatus")
                .eq("source", 'FormStack')
                .eq("webhookId", '4262311')
            );
            $w('#filterDescr').text = "Descriptison for All 'Free Lesson Request' Webhook's Received";
            console.log(filterValue);
            break;

        default:
            $w("#dsWebhookPayload").setFilter(wixData.filter()
                .isEmpty("resolvedStatus"));
            $w('#filterDescr').text = "Descriptison for All Un-Resolved Webhook's Received";
            console.log(filterValue);
            break;
    }
}