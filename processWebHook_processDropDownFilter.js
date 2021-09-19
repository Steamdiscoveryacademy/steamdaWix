// ø <---------- <dropdownFilter_change>  ---------->
// ‡ All (no filter),ALL
// ‡ All Pending,PENDING
// ‡ Contact Us,CONTACTUS
// ‡ Application Summer,APPLICATIONSUMMER
// ‡ Free Lesson Request,FREELESSONREQUEST
// ‡ All Resolved,RESOLVED
// ‡ Starts with...,STARTSWITH
// ‡ All Test,TEST
// ‡ All Test-Resolved,TESTRESOLVED
// † Unsupported Forms,UNSUPPORTED
// ‡ Problem,PROBLEM
// ‡ All Pre-Trash,PRETRASH

export async function dropdownFilter_change(event) {
    var totalCount = 0;
    if (typeof memory.getItem('noFilterTotalCount') !== 'string' || memory.getItem('noFilterTotalCount') === '0') {
        memory.setItem('noFilterTotalCount', $w("#dsWebhookPayload").getTotalCount().toString());
    }
    // var noFilterTotalCount = $w("#dsWebhookPayload").getTotalCount();
    var filterValue = $w('#dropdownFilter').value;
    switch (filterValue) {
        // † Is-Default: All Pending,PENDING

        case 'RESOLVED':
            // † All Resolved,RESOLVED
            $w('#filterDescr').text = "Resolved Webhooks";
            await $w("#dsWebhookPayload").setFilter(wixData.filter()
                // .isNotEmpty("wixData.filter()")
                .eq("resolvedStatus", 'RESOLVED')
            );
            totalCount = $w("#dsWebhookPayload").getTotalCount();
            console.log(filterValue + ': ' + totalCount);
            break;
        case 'APPLICATIONSUMMER':
            // † Application Summer,APPLICATIONSUMMER
            $w('#filterDescr').text = "'Application Summer' Webhooks";
            await $w("#dsWebhookPayload").setFilter(wixData.filter()
                .isEmpty("resolvedStatus")
                .eq("source", 'FormStack')
                .eq("webhookId", '4223065')
            );
            totalCount = $w("#dsWebhookPayload").getTotalCount();
            console.log(filterValue + ': ' + totalCount);
            break;
        case 'STARTSWITH':
            // † Starts with...,STARTSWITH
            $w('#filterDescr').text = "'Free Lesson Request' Webhooks";
            let startsWith = $w('#txtStartsWith').value;
            startsWith = startsWith.length === 0 ? 'a' : startsWith;
            $w('#txtStartsWith').value = startsWith;
            await $w("#dsWebhookPayload").setFilter(wixData.filter()
                .isEmpty("resolvedStatus")
                .startsWith("title", startsWith)
                // .eq("source", 'FormStack')
                // .eq("webhookId", '4262311')
            );
            totalCount = $w("#dsWebhookPayload").getTotalCount();
            console.log(filterValue + ': ' + totalCount);
            break;
        case 'TEST':
            // † All Test,TEST
            $w('#filterDescr').text = "Webhooks with Status 'Test'";
            await $w("#dsWebhookPayload").setFilter(wixData.filter()
                // .isEmpty("resolvedStatus"));
                .eq("currentStatus", 'TEST'));

            totalCount = $w("#dsWebhookPayload").getTotalCount();
            console.log(filterValue + ': ' + totalCount);
            break;
        case 'TESTRESOLVED':
            // † All Test-Resolved,TESTRESOLVED
            $w('#filterDescr').text = "Webhooks with Status 'Test-Resolved'";
            await $w("#dsWebhookPayload").setFilter(wixData.filter()
                // .isEmpty("resolvedStatus"));
                .eq("currentStatus", 'TESTRESOLVED'));

            totalCount = $w("#dsWebhookPayload").getTotalCount();
            console.log(filterValue + ': ' + totalCount);
            break;
        case 'PROBLEM':
            // † Problem,PROBLEM
            $w('#filterDescr').text = "Webhooks with Status 'Problem'";
            await $w("#dsWebhookPayload").setFilter(wixData.filter()
                // .isEmpty("resolvedStatus"));
                .eq("currentStatus", 'PROBLEM'));

            totalCount = $w("#dsWebhookPayload").getTotalCount();
            console.log(filterValue + ': ' + totalCount);
            break;
        case 'UNSUPPORTED':
            // † Unsupported Forms,UNSUPPORTED
            $w('#filterDescr').text = "Webhooks with Source and ID that are Unsupported";
            await $w("#dsWebhookPayload").setFilter(wixData.filter()
                // .isEmpty("resolvedStatus"));
                .eq("source", 'FormStack')
                .ne("webhookId", '4223065')
                .ne("webhookId", '4262311')
                .ne("webhookId", '4273251')
                );

            totalCount = $w("#dsWebhookPayload").getTotalCount();
            console.log(filterValue + ': ' + totalCount);
            break;
        case 'PRETRASH':
            // † All Pre-Trash,PRETRASH
            $w('#filterDescr').text = "Webhooks with Status 'Pre-Trash'";
            await $w("#dsWebhookPayload").setFilter(wixData.filter()
                // .isEmpty("resolvedStatus"));
                .eq("currentStatus", 'PRETRASH'));

            totalCount = $w("#dsWebhookPayload").getTotalCount();
            console.log(filterValue + ': ' + totalCount);
            break;
        case 'CONTACTUS':
            // † Contact Us,CONTACTUS
            $w('#filterDescr').text = "'Contact Us' Webhooks";
            await $w("#dsWebhookPayload").setFilter(wixData.filter()
                .isEmpty("resolvedStatus")
                .eq("source", 'FormStack')
                .eq("webhookId", '4273251')
            );
            totalCount = $w("#dsWebhookPayload").getTotalCount();
            console.log(filterValue + ': ' + totalCount);
            break;
        case 'FREELESSONREQUEST':
            // † Free Lesson Request,FREELESSONREQUEST
            $w('#filterDescr').text = "'Free Lesson Request' Webhooks";
            await $w("#dsWebhookPayload").setFilter(wixData.filter()
                .isEmpty("resolvedStatus")
                .eq("source", 'FormStack')
                .eq("webhookId", '4262311')
            );
            totalCount = $w("#dsWebhookPayload").getTotalCount();
            console.log(filterValue + ': ' + totalCount);
            break;
        case 'ALL':
            // † All (no filter),ALLexport async function dropdownFilter_change(event) {
            $w('#filterDescr').text = "All with No Filter";
            await $w("#dsWebhookPayload").setFilter(wixData.filter()
                // .isNotEmpty("wixData.filter()")
                .ne("resolvedStatus", 'DELETED')
            );
            totalCount = $w("#dsWebhookPayload").getTotalCount();
            console.log(filterValue + ': ' + totalCount);
            break;

        default:
            $w('#filterDescr').text = "Pending Webhooks";
            await $w("#dsWebhookPayload").setFilter(wixData.filter()
                // .isEmpty("resolvedStatus"));
                .eq("currentStatus", 'PENDING'));

            totalCount = $w("#dsWebhookPayload").getTotalCount();
            console.log(filterValue + ': ' + totalCount);
            break;
    }
    $w('#filterDescr').text += '\n [' + totalCount.toString() + ' of ' + memory.getItem('noFilterTotalCount') + ']';
    // $w('#txtFilterCount').value = totalCount.toString();

}
// ø <---------- </dropdownFilter_change> ---------->