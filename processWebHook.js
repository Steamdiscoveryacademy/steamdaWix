import wixData from 'wix-data';
import wixLocation from 'wix-location';
import {local, session, memory} from 'wix-storage';
import wixWindow from 'wix-window';

const dashboardBaseUrl = 'https://manage.wix.com/dashboard/a8472b36-bc63-4063-bd42-95519419cb8a/admin-pages/';
const repeaterLimit = 10;
var textHOLDER = '';
var objectHOLDER = {};

$w.onReady(function () {
    if(local.getItem("ondeckEnrollmentJSON").length > 20){
        $w('#txtPayloadTitleAlert').expand()
        $w('#txtPayloadTitleAlert').text = 'ALERT: There is an On-Deck Enrollment to Post';//45characters
    }
    // console.log(local.getItem("ondeckEnrollmentJSON"));

    console.log(
        "%cReally Emphatic Console Log for Debugging [Line ~18]",
        `color: #fff;
        background-color: #EA4335;
        font-weight: bold;
        padding: 8px 16px;
        border-radius: 8px;`
        );

    sessionInstantiateDevelJSON();
    $w('#displayDevelJSON').value = session.getItem("develJSON");

    let logString = 'TESTING APPLICATIONS\n===========================';
    logString += `\n • There are still some Testing Applications which can be reached \nby selecting 'All Test' under the Drop-Down to the upper-left. \n(it defaults to 'All Pending')`;

    $w('#thisPayload').value = logString;


    let totalCount = $w("#dsWebhookPayload").getTotalCount();
    console.log('[~52]totalCount: ' + totalCount)
    memory.setItem('noFilterTotalCount',totalCount);

    wixData.query("webhookPayload")
        .count()
        .then( (num) => {
            memory.setItem('noFilterTotalCount',num.toString());
        } )
        .catch( (error) => {
            let errorMsg = error.message;
            let code = error.code;
        } );
    
    $w('#dropdownFilter').value = 'PENDING';
    dropdownFilter_change();
});
//0402errorNOT: HOLDER is a vallid string
//0402errorMAYBE: 
export function rptrTitle_click(event, $w) {
    //responseHolderFieldZZZ
    console.groupCollapsed('rptrTitle_click')
    $w('#btnUnloadTop').show()
    let status = local.getItem("ondeckEnrollmentJSON").length > 20 ? 'ALERT' : 'CONTINUE';
    $w('#txtPayloadTitleAlert').text = status === 'ALERT' ? 'ALERT: There is an On-Deck Enrollment to Post' : '';
    if(status === 'ALERT'){
        // $w('#txtPayloadTitleAlert').text = 'ALERT2';
        $w('#txtPayloadTitleAlert').hide();
        $w('#txtPayloadTitleAlert').show('puff',{"duration":4000,"delay": 0});
        console.log('puff');
        return;
    }

    let $item = $w.at(event.context);
    $item("#rptrButton").show();
    let targetItem = $w("#dsWebhookPayload").getCurrentItem();
    console.log('[~88]targetItem:');
    console.log(targetItem);
    let wixId = targetItem["_id"];
    let webhookId = targetItem['webhookId'];
    $w('#thisKey').value = wixId;
    let title = targetItem['title'];
    let payload = JSON.parse(targetItem['payload']);
    $w('#theseParents').value = typeof payload.second_parentguardian_phone.first !== 'string' ? '' : payload.second_parentguardian_phone.first;
    $w('#theseParents').value += typeof payload.second_parentguardian_phone.last !== 'string' ? '' : ' ' + payload.second_parentguardian_phone.last;
    $w('#theseParents').value = $w('#theseParents').value.trim().length === 0 ? 'No Secondary Parent' : $w('#theseParents').value.trim()
    $w('#theseParents').value = payload.primary_parentguardian_name.first + ' ' + payload.primary_parentguardian_name.last + ' (' + $w('#theseParents').value + ')';
    console.groupCollapsed('[~Z95]payload: ');
    console.dir(payload);
    console.groupEnd()
    // console.log(payload.student_name);
    let name = 'Davis, Chester';
    let applicationSummerIndex = -777;
    if(webhookId === '4223065'){
        name = payload.student_name.last + ', ' + payload.student_name.first;
        applicationSummerIndex = title.indexOf('Application Summer');    
    }
    title = title.replace('Application Summer', name);
    title = title.replace('freeLessonRequest', 'FREE! Lesson Requet ');
    if(webhookId === '4262311' || applicationSummerIndex >= 0){
        $w("#dsWebhookPayload").setFieldValue("title", title);
        $w("#dsWebhookPayload").save();
    }
    $w('#thisTitle').value = title;
    // let webhookId = targetItem['webhookId'];
    let source = targetItem['source'];
    $w('#thisSource').value = targetItem['source'];
    // let payload = targetItem['payload'];
    $w('#thisPayload').value = targetItem['payload'];
    $w('#thisWebhookId').value = targetItem['webhookId'];
    $w('#thisPayloadId').value = targetItem['payloadId'];
    $w('#thisCurrentStatus').value = targetItem['currentStatus'];
    let _createdDate = targetItem['_createdDate'];
    let createdDateString = '';
    let mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    createdDateString += mons[_createdDate.getMonth()];
    createdDateString += ' ' + _createdDate.getDate() + ' @ ';
    let hours = _createdDate.getHours();
    createdDateString += _createdDate.getHours() === 12 ? '12' : (_createdDate.getHours() % 12).toString();
    createdDateString += ':' + ('00' + _createdDate.getMinutes().toString()).substr(-2);
    createdDateString += hours > 11 ? 'pm':'am';
    console.log('typeof _createdDate: ' + typeof _createdDate);
    console.log("_createdDate.toLocaleDateString('en-US')")
    console.log(_createdDate.toLocaleDateString('en-US'))
    console.log('createdDateString: ' + createdDateString)
    let currentStatusStamp = targetItem['currentStatusStamp'].toString();
    currentStatusStamp = currentStatusStamp.substr(0, currentStatusStamp.search(" GMT"))
    $w('#thisCurrentStatusStamp').value = currentStatusStamp;
    $w('#thisResolvedStatus').value = targetItem['resolvedStatus'];
    if (targetItem['resolvedStatusStamp'] == null) {
        $w('#thisResolvedStatusStamp').value = targetItem['resolvedStatusStamp'];
    } else {
        let resolvedStatusStamp = targetItem['resolvedStatusStamp'].toString();
        resolvedStatusStamp = resolvedStatusStamp.substr(0, resolvedStatusStamp.search(" GMT"))
        $w('#thisResolvedStatusStamp').value = resolvedStatusStamp;
    }

    let sourceArray = ['FormStack']
    for (let sourceThis of sourceArray) {

        let webhookIdArray = ['4223065']
        for (let webhookIdThis of webhookIdArray) {
            console.log(`EnableButtons iteration: sourceThis['${sourceThis}''] – webhookIdThis['${webhookIdThis}'] `)
            let buttonIdConcat = '#' + sourceThis + webhookIdThis;
            if (webhookId === webhookIdThis && source === sourceThis) {
                $w(buttonIdConcat).show();
            } else {
                $w(buttonIdConcat).hide();
            }
        }
    }
    console.groupEnd()
}

export function resolveSelectedWebHook() {
    const options = {
        "suppressAuth": true,
        "suppressHooks": true
    };
    let webhookId = $w('#thisKey').value;
    wixData.get("webhookPayload", webhookId, options)
        .then( (results) => {
            let toUpdate = results;
            console.log("get.then() [Line: ~81]");
            console.log(toUpdate);
            let now = new Date();
            toUpdate.resolvedStatusStamp = now;
            toUpdate.resolvedStatus = "RESOLVED";
            console.log("returned toUpdate, updated [Line: ~86]");
            console.log(toUpdate);
            wixData.update("webhookPayload", toUpdate, options)
                .then( (results) => {
                    console.log("update.then() [Line: ~90]");
                    $w("#dsWebhookPayload").refresh()
                    .then( () => {
                        console.log("Done refreshing the dataset");
                        cleanUp();
                    } );
                } )
                .catch( (err) => {
                    console.error("resolveSelectedWebhook.catch() [Line: ~93]");
                    console.error(err);
                } );
            
        } )
        .catch( (err) => {
            console.error("resolveSelectedWebhook.catch() [Line: ~85]");
            console.error(err);
        } );
    }
export function txtStartsWith_change(event) {
	if($w('#dropdownFilter').value === 'STARTSWITH'){
        dropdownFilter_change(event);  
    }
}

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
                .eq("source", 'FormStack')
                .eq("currentStatus", 'PENDING')
                .hasSome("webhookId", ['4223065','9994262311','9994273251'])
                );

            totalCount = $w("#dsWebhookPayload").getTotalCount();
            console.log(filterValue + ': ' + totalCount);
            break;
    }
    $w('#filterDescr').text += '\n [' + totalCount.toString() + ' of ' + memory.getItem('noFilterTotalCount') + ']';
    // $w('#txtFilterCount').value = totalCount.toString();

}
// ø <---------- </dropdownFilter_change> ---------->

export function FormStack4223065_click(event, $w) {
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    var objApplicationSummer = JSON.parse($w('#thisPayload').value);
    let nameParent = objApplicationSummer.primary_parentguardian_name.first + ' ' + objApplicationSummer.primary_parentguardian_name.last;
    $w('#nameParent').value = nameParent;
    let emailParent = objApplicationSummer.primary_email_address;
    emailParent = emailParent.trim();
    $w('#emailParent').value = emailParent;
    let phone = objApplicationSummer.primary_mobile_phone;
    let pattern = /[^0-9]/g;
    let phoneRaw = phone.replace(pattern, '');
    $w('#phoneParent').value = phoneRaw;

    // let filter1 = wixData.filter().eq("mainPhone", phoneRaw);
    let filter2 = wixData.filter().startsWith("loginEmail", emailParent);
    // // let finalFilter = filter1.or(filter2);
    let finalFilter = filter2;
    $w("#dsMembers").setFilter(finalFilter);
    $w("#btnAssignNewMember").show();
}

export function btnAssignNewMember_click(event) {
    $w("#thisMemberId").value = "INSTANTIATE";
    $w("#btnConfirmClasses").show();
}

export function btnConfirmClasses_click(event) {
    var returnObjectArrayObject = {"courses_array":[], "dogs_array":["Marcy","Chester","Marais"]};
    instantiateEnrollment(returnObjectArrayObject);
    var payload = JSON.parse($w('#thisPayload').value);
    var runningTotalObject = {"runningTotal": 0,"countWeekArray": [-999,0,0,0,0,0,0,0,0,0]};
    let week = payload.week_1_june_711_2021;

    returnObjectArrayObject.courses_array = returnObjectArrayObject.courses_array.concat(returnArrayObjectWeek(week, 1, runningTotalObject));
    week = payload.week_2_june_1418_2021;
    returnObjectArrayObject.courses_array = returnObjectArrayObject.courses_array.concat(returnArrayObjectWeek(week, 2, runningTotalObject));
    week = payload.week_3_june_2125_2021;
    returnObjectArrayObject.courses_array = returnObjectArrayObject.courses_array.concat(returnArrayObjectWeek(week, 3, runningTotalObject));
    week = payload.week_4_june_28july_2_2021;
    returnObjectArrayObject.courses_array = returnObjectArrayObject.courses_array.concat(returnArrayObjectWeek(week, 4, runningTotalObject));
    week = payload.week_5_july_1216_2021;
    returnObjectArrayObject.courses_array = returnObjectArrayObject.courses_array.concat(returnArrayObjectWeek(week, 5, runningTotalObject));
    week = payload.week_6_july_1923_2021;
    returnObjectArrayObject.courses_array = returnObjectArrayObject.courses_array.concat(returnArrayObjectWeek(week, 6, runningTotalObject));
    week = payload.week_7_july_2630_2021;
    returnObjectArrayObject.courses_array = returnObjectArrayObject.courses_array.concat(returnArrayObjectWeek(week, 7, runningTotalObject));
    week = payload.week_8_aug_26_2021;
    returnObjectArrayObject.courses_array = returnObjectArrayObject.courses_array.concat(returnArrayObjectWeek(week, 8, runningTotalObject));
    week = payload.week_9_august_914_2021;
    returnObjectArrayObject.courses_array = returnObjectArrayObject.courses_array.concat(returnArrayObjectWeek(week, 9, runningTotalObject));
    returnObjectArrayObject.countWeekArray = runningTotalObject.countWeekArray;
    let writeMapWeekArray = [-999,0,0,0,0,0,0,0,0,0]
    returnObjectArrayObject.writeMapWeekArray = writeMapWeekArray;
    writeCoursesSwitches(returnObjectArrayObject);

    /**
     * <mapWeekCountObject>
     * takes two arrays and makes a very useful Array of Arrays
     * * returnObjectArrayObject.writeMapWeekArray
     * * runningTotalObject.countWeekArray
     * ! superceeds either of the component arrays, but for backwards compatability they are not being removed
     * ø yet
     */
    var mapWeekCountObject = returnObjectArrayObject.writeMapWeekArray.map(function (value, index){
        return [value, runningTotalObject.countWeekArray[value]]
    });
    mapWeekCountObject[0][1] = -777;
    returnObjectArrayObject.mapWeekCountObject = mapWeekCountObject;
    // console.log("mapWeekCountObject: ");
    // console.log(mapWeekCountObject);
    //  * <mapWeekCountObject>

    console.log("[Line: ~184] returnObjectArrayObject: ");
    console.log(returnObjectArrayObject);
    $w("#superObjectHolder").value = JSON.stringify(returnObjectArrayObject, undefined, 4);
    console.log(runningTotalObject);
}

export function instantiateEnrollment (returnObjectArrayObject) {
    var objApplicationSummer = JSON.parse($w('#thisPayload').value);
    returnObjectArrayObject.formStack = {};
    returnObjectArrayObject.formStack.uniqueId = objApplicationSummer.UniqueID;
    returnObjectArrayObject.formStack.formId = objApplicationSummer.FormID;
    returnObjectArrayObject.formStack.wixWebhookId = $w("#thisKey").value;

    returnObjectArrayObject.application = {};
    returnObjectArrayObject.application.studentStatement = objApplicationSummer.why_are_you_interested_in_attending_steam_discovery_academy_this_summer;
    returnObjectArrayObject.application.photoRelease = objApplicationSummer.photo_release;

    let creationDateForm = $w("#thisCurrentStatusStamp").value;
    returnObjectArrayObject.stamps = [];
    let stampCreation = {};
    stampCreation.kind = "creation";
    let creationDate = new Date(creationDateForm);
    stampCreation.string = creationDate.toString();
    stampCreation.iso = creationDate.toISOString().replace(/[^0-9]/g,'');
    stampCreation.unix = parseInt((creationDate.getTime() / 1000).toFixed(0));
    returnObjectArrayObject.stamps.push(stampCreation);
    let stampProcess= {};
    let processDate = new Date();
    stampProcess.kind = "process";
    stampProcess.string = processDate.toString();
    stampProcess.iso = processDate.toISOString().replace(/[^0-9]/g,'');
    stampProcess.unix = parseInt((processDate.getTime() / 1000).toFixed(0));
    returnObjectArrayObject.stamps.push(stampProcess);
    // returnObjectArrayObject.creationDateUnix = Date.parse(creationDate);

    let studentStatement = objApplicationSummer.why_are_you_interested_in_attending_steam_discovery_academy_this_summer;
    $w("#studentStatement").value = studentStatement;
    let emailParent = objApplicationSummer.primary_email_address.trim();
    // emailParent = emailParent.trim();

    let parentFirst = objApplicationSummer.primary_parentguardian_name.first;
    parentFirst = parentFirst.trim();
    parentFirst = parentFirst === parentFirst.toLowerCase() || parentFirst === parentFirst.toUpperCase() ? parentFirst.substr(0,1).toUpperCase() + parentFirst.substr(1).toLowerCase(): parentFirst;
    let parentLast = objApplicationSummer.primary_parentguardian_name.last;
    parentLast = parentLast.trim();
    parentLast = parentLast === parentLast.toLowerCase() || parentLast === parentLast.toUpperCase() ? parentLast.substr(0,1).toUpperCase() + parentLast.substr(1).toLowerCase(): parentLast;
    let studentFirst = objApplicationSummer.student_name.first;
    studentFirst = studentFirst.trim();
    studentFirst = studentFirst === studentFirst.toLowerCase() || studentFirst === studentFirst.toUpperCase() ? studentFirst.substr(0,1).toUpperCase() + studentFirst.substr(1).toLowerCase(): studentFirst;
    let studentLast = objApplicationSummer.student_name.last;
    studentLast = studentLast.trim();
    studentLast = studentLast === studentLast.toLowerCase() || studentLast === studentLast.toUpperCase() ? studentLast.substr(0,1).toUpperCase() + studentLast.substr(1).toLowerCase(): studentLast;
    let preferredName = objApplicationSummer.preferred_name;
    if(renderableString(preferredName) > 0){
        preferredName = preferredName.trim();
        preferredName = preferredName === preferredName.toLowerCase() || preferredName === preferredName.toUpperCase() ? preferredName.substr(0,1).toUpperCase() + preferredName.substr(1).toLowerCase(): preferredName;
    } else {
        preferredName = studentFirst;
    }
    let studentParentCombo = preferredName + ' ' + studentLast + ' (' + parentFirst;
    studentParentCombo += studentLast === parentLast ? '' : parentLast;
    studentParentCombo += ')';
    let parentFirstSecondary = objApplicationSummer.second_parentguardian_phone.first;
    let parentLastSecondary = objApplicationSummer.second_parentguardian_phone.last;
    let parentSecondaryRenderable = false;
    if(renderableString(parentFirstSecondary) > 0) {
        parentSecondaryRenderable = true;
        parentFirstSecondary = parentFirstSecondary.trim();
        parentFirstSecondary = parentFirstSecondary === parentFirstSecondary.toLowerCase() || parentFirstSecondary === parentFirstSecondary.toUpperCase() ? parentFirstSecondary.substr(0,1).toUpperCase() + parentFirstSecondary.substr(1).toLowerCase(): parentFirstSecondary;
        // parentLastSecondary = parentLastSecondary.trim();
    }
    if(renderableString(parentLastSecondary) > 0) {
        parentSecondaryRenderable = parentSecondaryRenderable ? true : false;
        // parentFirstSecondary = parentFirstSecondary.trim();
        parentLastSecondary = parentLastSecondary.trim();
        parentLastSecondary = parentLastSecondary === parentLastSecondary.toLowerCase() || parentLastSecondary === parentLastSecondary.toUpperCase() ? parentLastSecondary.substr(0,1).toUpperCase() + studentFirst.substr(1).toLowerCase(): parentLastSecondary;
    }

    returnObjectArrayObject.family = {};
    //<phones>
    // const PhoneObject = function(phone, role, who, kind = "cell", usage = "Personal"){
    returnObjectArrayObject.family.phones = [];
    let phoneThis = new PhoneObject(objApplicationSummer.primary_mobile_phone, "Primary Parent", parentFirst);
    returnObjectArrayObject.family.phones.push(phoneThis);
    // console.log("renderableString(objApplicationSummer.secondary_phone): " + renderableString(objApplicationSummer.secondary_phone))
    if(renderableString(objApplicationSummer.secondary_phone) > 0) {
        phoneThis = new PhoneObject(objApplicationSummer.secondary_phone, "Home", "family", "landline", "Family");
        returnObjectArrayObject.family.phones.push(phoneThis);
    }
    if(renderableString(objApplicationSummer.secondary_parentguardian_mobile_phone) > 0) {
        textHOLDER = !parentSecondaryRenderable ? "Other" :parentFirstSecondary;
        phoneThis = new PhoneObject(objApplicationSummer.secondary_parentguardian_mobile_phone, "Secondary Parent", textHOLDER);
        returnObjectArrayObject.family.phones.push(phoneThis);
    }
    //</phones>
    //<emails>
    // emailThis = new EmailObject(emailParentPrimary, "Primary Parent", parentFirst );
    // const EmailObject = function(email, role, who, kind = "home", usage = "Personal"){
    returnObjectArrayObject.family.emails = [];
    let emailThis = new EmailObject(emailParent, "Primary Parent", parentFirst );
    returnObjectArrayObject.family.emails.push(emailThis);
    //</emails>
    returnObjectArrayObject.family.messages = {"dox": ["only messages you want the Whole Family to see"]};
    returnObjectArrayObject.family.student = {};
    returnObjectArrayObject.family.student.photoRelease = objApplicationSummer.photo_release === 'Approved' ? true : false;
    returnObjectArrayObject.family.student.name = {};
    returnObjectArrayObject.family.parent = {};
    returnObjectArrayObject.family.parent.messages = {"dox": ["messages you want Both Parents to see"]};
    returnObjectArrayObject.family.parent.primary = {};
    returnObjectArrayObject.family.student.name.first = studentFirst;
    returnObjectArrayObject.family.student.name.last = studentLast;
    returnObjectArrayObject.family.student.name.preferred = preferredName;
    returnObjectArrayObject.family.student.name.studentParentCombo = studentParentCombo;
    returnObjectArrayObject.family.student.name.lastFirst = studentLast + ', ' + preferredName;
    returnObjectArrayObject.family.student.name.fullName = preferredName + ' ' + studentLast;
    returnObjectArrayObject.family.student.declaredGender = objApplicationSummer.gender;
    returnObjectArrayObject.family.student.studentStatement = studentStatement;
    returnObjectArrayObject.family.student.messages = {"dox": ["messages you want the Student only to see"]};
    returnObjectArrayObject.family.parent.primary.memberId = $w("#thisMemberId").value;
    returnObjectArrayObject.family.parent.primary.messages = {"dox": ["messages you want the Primary Parent/Web Account Holder only to see"]};
    //<Secondary Parent [first, last]>
    if (parentSecondaryRenderable){
        returnObjectArrayObject.family.parent.secondary = {};
        returnObjectArrayObject.family.parent.secondary.first = parentFirstSecondary;
        returnObjectArrayObject.family.parent.secondary.last = parentLastSecondary;
    }
    //</Secondary Parent [first, last]>
    $w("#memberIdParent").value = $w("#thisMemberId").value;
    $w("#nameStudent").value = returnObjectArrayObject.family.student.name.fullName;
    $w("#namePreferredStudent").value = preferredName;
    let dobStudent = objApplicationSummer.date_of_birth;
    returnObjectArrayObject.family.student.dobString = dobStudent;
    returnObjectArrayObject.family.student.currentSchool = objApplicationSummer.current_school;
    let currentGrade = parseInt(objApplicationSummer.grade_during_the_202021_school_year[0].value);
    let currentGradeString = objApplicationSummer.grade_during_the_202021_school_year[0].label;
    returnObjectArrayObject.family.student.currentGrade = currentGrade;
    returnObjectArrayObject.family.student.currentGradeString = currentGradeString;
    // console.log('[' + currentGrade + '] ' + currentGradeString);
    let gradeLevelStudent = gradeLeveFromGrade(currentGrade);
    returnObjectArrayObject.family.student.currentGradeLevel = gradeLevelStudent;
    let currentGradeCharacter = currentGrade === 0 ? 'K' : currentGrade.toString();
    $w("#gradeLevelStudent").value = gradeLevelStudent + '     [ current grade: ' + currentGradeCharacter + ' ]';
    $w("#dobStudent").value = dobStudent;
    returnObjectArrayObject.family.parent.primary.last = parentLast;
    returnObjectArrayObject.family.parent.primary.first = parentFirst;
    returnObjectArrayObject.family.parent.primary.fullName = parentFirst + ' ' + parentLast;
    returnObjectArrayObject.family.parent.primary.lastFirst = parentLast + ', ' + parentFirst;
    $w("#nameParentCC").value = returnObjectArrayObject.family.parent.primary.fullName;
    $w("#phoneParentCC").value = returnObjectArrayObject.family.phones[0].phone;
    $w("#emailParentCC").value = $w("#emailParent").value;

    returnObjectArrayObject.family.addresses = [];
    let addressThis = {};
    addressThis.kind = "mailing";
    // console.log("addressThis: " + JSON.stringify(addressThis))

    let address = objApplicationSummer.mailing_address.address.trim();
    console.log("address: " + address);
    // let address2 = '';
    let address2 = objApplicationSummer.mailing_address.address2;
    address2 = address2 ? address2.trim() : '';
    let city = objApplicationSummer.mailing_address.city.trim();
    let state = objApplicationSummer.mailing_address.state;
    // //  \_state is Drop-Down so no .trim()
    let zip = objApplicationSummer.mailing_address.zip.trim();

    objectHOLDER = new AddressObject(address, address2, city, state, zip);
    // console.log("addressThis.address: " + JSON.stringify(objectHOLDER));
    addressThis.address = objectHOLDER;
    returnObjectArrayObject.family.addresses.push(addressThis);
}

export function returnArrayObjectWeek(week, weekNumber, runningTotalObject){
    var returnObjectArray = [];
    var runningTotal = runningTotalObject.runningTotal;
     let emptyArray = [];
      if (typeof week === 'string') {
         return emptyArray;
     } else if (!week){
         return emptyArray;
     }
     const priceFullDay = 345;
     const priceHalfDay = 240;

     //<Billing Object Element>
     const billing = {};
     const dicountEarlyBirdAmount = 50
     const discountEarlyBirdEndDate = Date.parse('May 01 2021 23:59:59 GMT-0500 (Eastern Standard Time)');
    //  const discountEarlyBird = discountEarlyBirdEndDate > returnObjectArrayObject.creationDateUnix ? true : false;
     const discountEarlyBird = true;
     //</Billing Object Element>

     //<Date Arrays Literal>
     let weekDatesStringArray = [
         'NNULL',
         'June 7-11, 2021'
         ,'June 14-18, 2021'
         ,'June 21-25, 2021'
         ,'June 28 - July 2, 2021'
         , 'July 12-16, 2021'
         , 'July 19-23, 2021'
         , 'July 26-30, 2021'
         , 'Aug 2-6, 2021'
         , 'August 9-14, 2021'
        ];

        let weekStartDatesArray = [
            0
            , Date.parse('June 7, 2021 8:00:00 GMT-0500')
            ,Date.parse('June 14, 2021 8:00:00 GMT-0500')
            ,Date.parse('June 21, 2021 8:00:00 GMT-0500')
            ,Date.parse('June 28, 2021 8:00:00 GMT-0500')
            ,Date.parse('July 12, 2021 8:00:00 GMT-0500')
            ,Date.parse('July 19, 2021 8:00:00 GMT-0500')
            ,Date.parse('July 26, 2021 8:00:00 GMT-0500')
            ,Date.parse('August 2, 2021 8:00:00 GMT-0500')
            ,Date.parse('August 9, 2021 8:00:00 GMT-0500')
        ];

        let weekEndDatesArray = [
            0
            , Date.parse('June 11, 2021 17:00:00 GMT-0500')
            ,Date.parse('June 18, 2021 17:00:00 GMT-0500')
            ,Date.parse('June 25, 2021 17:00:00 GMT-0500')
            ,Date.parse('July 2, 2021 17:00:00 GMT-0500')
            ,Date.parse('July 16, 2021 17:00:00 GMT-0500')
            ,Date.parse('July 23, 2021 17:00:00 GMT-0500')
            ,Date.parse('July 30, 2021 17:00:00 GMT-0500')
            ,Date.parse('August 6, 2021 17:00:00 GMT-0500')
            ,Date.parse('August 14, 2021 17:00:00 GMT-0500')
        ];
        //</Date Arrays Literal>

        var label = '';
        var HOLDER = '';
        var firstColon = 0;
    var lastDash = 0;
        
    for (let i = 0; i < week.length; i++) {
        const element = {};
        element.index = i;
        element.weekId = weekNumber;
        runningTotalObject.countWeekArray[weekNumber]++;
        element.dateString = weekDatesStringArray[weekNumber];
        element.dateStart = weekStartDatesArray[weekNumber];
        element.dateEnd = weekEndDatesArray[weekNumber];
        element.value = week[i].value;
        element.billing = {};
        element.billing.discount = [];
        element.billing.discount[i] = {};
        element.message = {};
        HOLDER = week[i].value;
        if (HOLDER.substr(-1) === "H") {
            element.day = "HALF";
            HOLDER = HOLDER.substr(0,(HOLDER.length - 2));
            //0402errorNOT: HOLDER is a vallid string
            element.billing.tuition = priceHalfDay;
            runningTotal += priceHalfDay;
        } else {
            element.day = "FULL";
            element.billing.tuition = priceFullDay;
            runningTotal += priceFullDay;
        }
        if (discountEarlyBird) {
            element.billing.discount[i].kind = 'Early Bird';
            element.billing.discount[i].amount = 1 * dicountEarlyBirdAmount;
        }
        else if ("YES" === "NO: Display False Discount?".substr(0,3)){
            element.billing.discount[i].kind = 'Early Bird';
            element.billing.discount[i].amount = 0 * dicountEarlyBirdAmount;
        }
        runningTotal += element.billing.discount.map(a => a.amount).reduce((accumulator, currentValue) => { return accumulator - currentValue }, 0);
        element.courseId = HOLDER;
        label = week[i].label;
        firstColon = label.indexOf(":");
        lastDash = label.lastIndexOf("-");
        HOLDER = label.substr (0, label.indexOf(":"));
        HOLDER = HOLDER.length >= 2 ? HOLDER : "TBD";
        //0402errorNOT: HOLDER is a vallid string
        element.gradeLevel = HOLDER;
        element.location = label.substr(lastDash + 1).trim();
        element.courseName = label.substr(firstColon + 1, lastDash - firstColon - 1).trim();;
        element.billing.runningTotal = runningTotal;

        returnObjectArray[i] = element;
    } //END: for (let i = 0; i < week.length; i++)
    
    runningTotalObject.runningTotal = runningTotal;
    return returnObjectArray;
}// END: function returnArrayObjectWeek(week, weekNumber, runningTotalObject)

export function writeCoursesSwitches(returnObjectArrayObject) {
    let textWeekThis = '';
    let writeMapThis = 0;
    let nextWeekMapIndex = 1;
    let nextWeekHide = 9;//maybe should be coded from somewhere
    var i = 0;
    for ( i = 0; i < returnObjectArrayObject.countWeekArray.length; i++) {
        if (returnObjectArrayObject.countWeekArray[i] === 0) {
            textWeekThis = "#textWeek" + nextWeekHide;
            $w(textWeekThis).hide();
            nextWeekHide--;
        } else if (returnObjectArrayObject.countWeekArray[i] > 0) {
            returnObjectArrayObject.writeMapWeekArray[nextWeekMapIndex] = i;
            nextWeekMapIndex++;            
        }  
    }

    let fieldsetStyle = "\"background-color: LemonChiffon; border: SteelBlue; border-radius: 5px; border-style: solid solid solid none;\"";
    let legendStyle = "\"font-size: 16px; font-family : 'Avenir Black'; color: SteelBlue; background-color: LemonChiffon;\"";
    let ulStyle = "\"list-style-type: none;\"";
    let liStyle = "\"font-size: 16px; margin: 10px; font-family : 'Avenir Black';color: SteelBlue; font-style: italic; line-height: 1;\"";

    let courseArray = returnObjectArrayObject.courses_array;
    let writeMapArray = returnObjectArrayObject.writeMapWeekArray;
    let codeBlockArray = ["NNULL","","","","","","","","",""]
    let weekIdThis =0;
    let weekString = '';
    for ( i = 0; i < courseArray.length; i++) {
        weekIdThis = courseArray[i].weekId;
        if (codeBlockArray[weekIdThis].length === 0) {
            //0402errorMAYBE: 
            weekString = 'Week ' +weekIdThis + ': ' + courseArray[i].dateString;
            // codeBlockArray[weekIdThis] = "<dl style='" + dlStyle + "'><dt style='" + dtStyle + "'>" + weekString + "</dt>";               
            codeBlockArray[weekIdThis] = "<fieldset style=" + fieldsetStyle + ">"
                + "<legend style=" + legendStyle + ">" + weekString + "</legend>";
            codeBlockArray[weekIdThis] += "<ul style=" + ulStyle + ">";
        }
        codeBlockArray[weekIdThis] += "<li style=" + liStyle + ">" + courseArray[i].gradeLevel + ": " + courseArray[i].courseName + "</li>";
    } // END: function writeCoursesSwitches(returnObjectArrayObject)
    let mapToBlock = 0;
    let wixTextKey = '';
    for ( i = 0; i < writeMapArray.length; i++) {
        mapToBlock = writeMapArray[i];
        if (codeBlockArray[mapToBlock] !== 'NNULL' && codeBlockArray[mapToBlock] !== '') { //if HTML in codeBlock
            codeBlockArray[mapToBlock] += "</ul></fieldset>"; // finish the HTML
            wixTextKey = '#textWeek' + i; //1,2,3...
            $w(wixTextKey).html = codeBlockArray[mapToBlock];
        }
        let switchKey = '';
        switch (returnObjectArrayObject.countWeekArray[mapToBlock]) {
            case -999:
                break;           
            case 0:
                break;           
            case 1:
                switchKey = '#switch' + i.toString() + '01';
                $w(switchKey).show();
                $w(switchKey).checked = true;
                console.log('show 1 and ON [switch' + i.toString() + '01]');            
                break;           
            case 2:
                switchKey = '#switch' + i.toString() + '01';
                $w(switchKey).show();
                switchKey = '#switch' + i.toString() + '02';
                $w(switchKey).show();
                console.log('show 1 and OFF [switch' + i.toString() + '01]');            
                console.log('show 2 and OFF [switch' + i.toString() + '02]');            
                break;           
            case 3:
                switchKey = '#switch' + i.toString() + '01';
                $w(switchKey).show();
                switchKey = '#switch' + i.toString() + '02';
                $w(switchKey).show();
                switchKey = '#switch' + i.toString() + '03';
                $w(switchKey).show();
                console.log('show 1 and OFF [switch' + i.toString() + '01]');            
                console.log('show 2 and OFF [switch' + i.toString() + '02]');            
                console.log('show 3 and OFF [switch' + i.toString() + '03]');            
                break;           
                
            default:
                console.log('warn: Users Selected more than 3 for a single week'); 
                break;
        }
    }
    // console.log("codeBlockArray");
    // console.log(codeBlockArray);


}
export function validateGradeVsAge(currentGrade, DOB) {
    // return Number.random * 10 > 5 ? true : false;
    return true;
}
export function gradeLeveFromGrade(currentGrade) {
    currentGrade = Number(currentGrade);
    let gradeLevel = 'ERROR';
    gradeLevel = currentGrade <= 2 ? 'K-2' : gradeLevel;
    gradeLevel = currentGrade > 2 ? '3-5' : gradeLevel;
    gradeLevel = currentGrade > 5 ? '6-8' : gradeLevel;
    gradeLevel = currentGrade > 8 ? '9-12' : gradeLevel;
    return gradeLevel

}

export function btnMemberMatch_click(event, $w) {
    console.groupCollapsed('btnMemberMatch_click')
	// export function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
    let $item = $w.at(event.context);
    console.dir($item)
    let targetItem = $w("#dsMembers").getCurrentItem();
    console.log(targetItem);
    $w("#thisMemberId").value = targetItem._id;
    $w("#emailParent").value = targetItem.loginEmail;
    $w("#btnConfirmClasses").show();
    console.groupEnd()

}

export function validateEnrollment(returnObjectArrayObject){
    returnObjectArrayObject.validation = {};
    returnObjectArrayObject.validation.message = {};
    returnObjectArrayObject.validation.message.error = [];
    returnObjectArrayObject.validation.message.warn = [];
    returnObjectArrayObject.validation.message.fyi = [];
    returnObjectArrayObject.validation.message.btw = [];
    returnObjectArrayObject.validation.primaryBoolean = true;
    return returnObjectArrayObject.validation.primaryBoolean;



    return true;
}



export function checkoutBox_click(event) {
	// export function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}

export function goToTopAndCleanup_click(event) {
	// export function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
    cleanUp();
}
export function cleanUp(returnObjectArrayObject, runningTotalObject, objApplicationSummer) {
    //<confirmCourse>
    let switchKey = '';
    let weekTextKey = '';
    let week = 0;
    let instance = 0;
    for (var i = 0; i < 9; i++) {
       week = i + 1;
        weekTextKey = '#textWeek' + week;
        $w(weekTextKey).show();

       for (var j = 0; j < 3; j++) {
           instance = j + 1;
            switchKey = '#switch' + week + '0' + instance;
            $w(switchKey).checked = false;
            $w(switchKey).hide();
       }
    }
    displayErrors();
    let unsetElementsArray = [
        "#thisKey"
        ,"#thisTitle"
        ,"#thisSource"
        ,"#thisPayload"
        ,"#thisWebhookId"
        ,"#thisPayloadId"
        ,"#thisCurrentStatus"
        ,"#thisCurrentStatusStamp"
        ,"#thisResolvedStatus"
        ,"#thisResolvedStatusStamp"
        ,"#nameParent"
        ,"#emailParent"
        ,"#phoneParent"
        ,"#memberIdParent"
        ,"#nameStudent"
        ,"#namePreferredStudent"
        ,"#gradeLevelStudent"
        ,"#dobStudent"
        ,"#nameParentCC"
        ,"#emailParentCC"
        ,"#phoneParentCC"
        ,"#parentAddressBlock"         
        ,"#superObjectHolder"
        ,"#superEnrollmentObject"
        ,"#develObjectHolder"
        ,"#dobGradeLevelErrorText"
        ,"#warnTextBox"
        ,"#develTemp"
    ]
    unsetElementsArray.push('#theseParents')//202109 - unLoad()
    unsetElementsArray.push('#responseHolderFieldZZZ')//202109 - Change-Sttus
    unsetElementsArray.push('#studentStatement')//20210920 - double-check
    unsetElementsArray.push('#memberIdStudent')//20210920 - double-check
    unsetElementsArray.push('#displayDevelJSON')//20210920 - double-check
    $w('#btnUnloadTop').hide()//20210920 = new button that calls at top
    $w('#FormStack4223065').hide()//20210920 = as with Re-Loading Page: (see Loop for rptrTitle_click when more forms)
    let unsetTextElementsArray = ['#dobGradeLevelErrorText']

    for ( let element of unsetElementsArray) {
        if(unsetTextElementsArray.includes(element)){
            $w(element).text = '';
        }
        if(!unsetTextElementsArray.includes(element)){
            $w(element).value = null;
        }
    }
    let switchErrorIdArray = ["#swtchOverloadZeroCourses", "#swtchOverloadTwoCourses", "#swtchOverloadGradeCourse", "#swtchOverloaGradeDob"];
    for (let index = 0; index < switchErrorIdArray.length; index++) {
        // if (simpleSwitchByIdArray.indexOf(simpleHideByIdArray[index]) >= 0){
        //     $w(simpleHideByIdArray[index]).checked = false;   
        // }
        $w(switchErrorIdArray[index]).checked = false;   
        $w(switchErrorIdArray[index]).hide();   
    }
    let collapsseArray = ["#boxReadyToEnroll"];
    for ( let element of collapsseArray) {
        $w(element).collapse();
    }
    let expandArray = ["#btnValidateEnrollment"];
    for ( let element of expandArray) {
        $w(element).expand();
    }
    let disableArray = ["#warnTextBox"];
    for ( let element of disableArray) {
        $w(element).disable();
    }

    $w('#checkoutBox').changeState("First");
    //</confirmCourse>
    //<memberAssignment>
    $w("#btnAssignNewMember").hide();
    $w("#btnConfirmClasses").hide();
    $w("#thisMemberId").value = null;
    //</memberAssignment>
    //<webhookRepeater>
    //</webhookRepeater>
    objApplicationSummer = undefined;
    returnObjectArrayObject = undefined;
    runningTotalObject = undefined;
    $w("#anchorTop").scrollTo();
    // ø cleanup Member Strip data
    // ø cleanup Web-Hook Repeater Strip (except for yellow dot)
    // ø \_ that is, eventually, it will disappear for having been resolved
    // ø empty Object(s)
    // ø write out age on September 30, YYYY below gradeLevel and DOB
    // dropdownFilter_change();
    sessionInstantiateDevelJSON();
    return true;
}

export function btnProcessEnrollment_click(event) {
	// export function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
    $w('#checkoutBox').changeState("Second");
}

export function btnValidateEnrollment_click(event, returnObjectArrayObject) {
    $w("#boxReadyToEnroll").collapse();
    let dog = "Chester";
    console.log(dog);
    console.log(
    "%cHardCoded gradeLevel: 3-5 [Line ~946]",
    `color: #fff;
    background-color: #EA4335;
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 8px;`
    );

    returnObjectArrayObject = JSON.parse($w("#superObjectHolder").value);
    console.log(returnObjectArrayObject);

    fillBlockMapArray(returnObjectArrayObject);
    validateCourseGradeLevelMatch(returnObjectArrayObject);
    let enrollmentErrorArray = returnObjectArrayObject.enrollment.errorArray;
    let overloadedErrorArray = getOverloadedErrors();
    returnObjectArrayObject.enrollment.overloadedErrorArray = overloadedErrorArray;
    getStudentGradeMisMatchDob(returnObjectArrayObject);
    
    let errorArray = returnObjectArrayObject.enrollment.errorArray;
    let errorNoOverloadArray = [];
    let anyErrorWhatsoever = false;
    for (let index = 0; index < errorArray.length; index++) {
        let errorThis = errorArray[index];
        let overloadedThis = overloadedErrorArray[index];
        let finalErrorThis = errorThis && !overloadedThis ? true : false;
        errorNoOverloadArray[index] = finalErrorThis;
        anyErrorWhatsoever = finalErrorThis ? true : anyErrorWhatsoever;
    }
    returnObjectArrayObject.enrollment.errorNoOverloadArray = errorNoOverloadArray;
    returnObjectArrayObject.enrollment.anyErrorWhatsoever = anyErrorWhatsoever;
    if (!anyErrorWhatsoever){
        $w("#btnValidateEnrollment").collapse()
        $w("#boxReadyToEnroll").expand();
    }

    displayErrors(enrollmentErrorArray);
    $w("#superEnrollmentObject").value = JSON.stringify(returnObjectArrayObject, undefined, 4);
    //<maybe should be a method for ALL messages>
    let warnArray = returnObjectArrayObject.enrollment.messages.warn;
    // let warnList = 'Warning List: ' + warnArray.toString();
    let warnList = '';//warnArray.toString();
    let prepend = '';
    warnArray.forEach(element => {
        warnList += prepend; 
        warnList += element.toString();
        prepend = '\n'; 
    });
    console.log("warnList: ");
    console.log(warnList);
    if(warnList.length > 0) {
        //0402errorNOT: wasMAYBE confirmed not
        $w("#warnTextBox").value = warnList;
        $w("#warnTextBox").enable();
    }
    //</maybe should be a method for ALL messages>
    let develMessage = "Developer Message:\n";
    develMessage += errorArray.toString() + " :EA" + "\n";
    develMessage += overloadedErrorArray.toString() + " :OA" + "\n";
    develMessage += errorNoOverloadArray.toString() + " :ENO" + "\n";
    develMessage += anyErrorWhatsoever ? "Hide Message" : "Show Message";
    develMessage = develMessage.replace(/true/gi, "truue");
    develMessage = develMessage.replace(/,/g, "|");
    $w("#develObjectHolder").value = develMessage;

    
}

export function getOverloadedErrors(){
    let switchIdArray = ["#swtchOverloadZeroCourses", "#swtchOverloadTwoCourses", "#swtchOverloadGradeCourse", "#swtchOverloaGradeDob"];
    let overloadedErrorArray = [];
    for (let index = 0; index < switchIdArray.length; index++) {
        overloadedErrorArray[index] = $w(switchIdArray[index]).checked;
    }
    return overloadedErrorArray;
}

export function displayErrors(enrollmentErrorArray = [false, false, false, false]) {
    console.log("enrollmentErrorArray: ");
    console.log(enrollmentErrorArray);
    let enrollmentErrorOverloadArray = getOverloadedErrors();
    const showElementsObject = {
            "showArray": [
                {
                "index": 0,
                "show": ["#swtchOverloadZeroCourses", "#errorZeroCoursesText"]
                },
                { "index": 1, "show": ["#swtchOverloadTwoCourses", "#errorTwpCoursesText"] },
                {
                "index": 2,
                "show": ["#swtchOverloadGradeCourse", "#errorGradeCourseText"]
                },
                { "index": 3, "show": ["#swtchOverloaGradeDob", "#errorGradeDobText"] }
            ]
        }
    let simpleShowByIdArray = [];
    let simpleHideByIdArray = [];
    let simpleCheckByIdArray = [];
    let simpleSwitchByIdArray = ["#swtchOverloadZeroCourses", "#swtchOverloadTwoCourses", "#swtchOverloadGradeCourse", "#swtchOverloaGradeDob"];
    let index = 0;
    for (index = 0; index < enrollmentErrorArray.length; index++) {
        if (enrollmentErrorArray[index] === true) {
            if (showElementsObject.showArray[index].index === index) {
                simpleShowByIdArray = simpleShowByIdArray.concat(showElementsObject.showArray[index].show);
            }
            if (enrollmentErrorArray[index] && enrollmentErrorOverloadArray[index]) {
                simpleCheckByIdArray[simpleCheckByIdArray.length] = simpleSwitchByIdArray[index];
            }
        
        } else {
            if (showElementsObject.showArray[index].index === index) {
                simpleHideByIdArray = simpleHideByIdArray.concat(showElementsObject.showArray[index].show);
            }
        }
    }
    console.log(simpleShowByIdArray);
    console.log(simpleHideByIdArray);
    for (index = 0; index < simpleShowByIdArray.length; index++) {
        if (simpleSwitchByIdArray.indexOf(simpleShowByIdArray[index]) >= 0){
            $w(simpleShowByIdArray[index]).checked = false;   
        }
        $w(simpleShowByIdArray[index]).show();   
    }
    for (index = 0; index < simpleCheckByIdArray.length; index++) {
        // if (simpleSwitchByIdArray.indexOf(simpleHideByIdArray[index]) >= 0){
        //     $w(simpleHideByIdArray[index]).checked = false;   
        // }
        $w(simpleCheckByIdArray[index]).checked = true;   
    }
    for (index = 0; index < simpleHideByIdArray.length; index++) {
        // if (simpleSwitchByIdArray.indexOf(simpleHideByIdArray[index]) >= 0){
        //     $w(simpleHideByIdArray[index]).checked = false;   
        // }
        $w(simpleHideByIdArray[index]).hide();   
    }
    
}

/**
 * <Validate Enrollment>
 */
 
 export function fillBlockMapArray(enrollmentObject) {
     let blockMapArray = {
         "blockMapErrors": {
             "zeroCheckedCount": -7,
             "multipleCheckedCount": -7,
             "gradeLevelMismatchCount": -7
         },
         "blockMapArray": [
             {
                 "blockMap": -999,
                 "week": -999,
                 "switchIdArray": [-999],
                 "selectedCount": -999,
                 "checkedCount": -999,
                 "zeroChecked": -999,
                 "multipleChecked": -999,
                 "gradeMismatchCount": -999
             },
             {
                 "blockMap": 1,
                 "week": -7,
                 "switchIdArray": ["#switch101", "#switch102", "#switch103"],
                 "selectedCount": -7,
                 "checkedCount": -7,
                 "zeroChecked": -7,
                 "multipleChecked": -7,
                 "gradeMismatchCount": -7
             },
             {
                 "blockMap": 2,
                 "week": -7,
                 "switchIdArray": ["#switch201", "#switch202", "#switch203"],
                 "selectedCount": -7,
                 "checkedCount": -7,
                 "zeroChecked": -7,
                 "multipleChecked": -7,
                 "gradeMismatchCount": -7
             },
             {
                 "blockMap": 3,
                 "week": -7,
                 "switchIdArray": ["#switch301", "#switch302", "#switch303"],
                 "selectedCount": -7,
                 "checkedCount": -7,
                 "zeroChecked": -7,
                 "multipleChecked": -7,
                 "gradeMismatchCount": -7
             },
             {
                 "blockMap": 4,
                 "week": -7,
                 "switchIdArray": ["#switch401", "#switch402", "#switch403"],
                 "selectedCount": -7,
                 "checkedCount": -7,
                 "zeroChecked": -7,
                 "multipleChecked": -7,
                 "gradeMismatchCount": -7
             },
             {
                 "blockMap": 5,
                 "week": -7,
                 "switchIdArray": ["#switch501", "#switch502", "#switch503"],
                 "selectedCount": -7,
                 "checkedCount": -7,
                 "zeroChecked": -7,
                 "multipleChecked": -7,
                 "gradeMismatchCount": -7
             },
             {
                 "blockMap": 6,
                 "week": -7,
                 "switchIdArray": ["#switch601", "#switch602", "#switch603"],
                 "selectedCount": -7,
                 "checkedCount": -7,
                 "zeroChecked": -7,
                 "multipleChecked": -7,
                 "gradeMismatchCount": -7
             },
             {
                 "blockMap": 7,
                 "week": -7,
                 "switchIdArray": ["#switch701", "#switch702", "#switch703"],
                 "selectedCount": -7,
                 "checkedCount": -7,
                 "zeroChecked": -7,
                 "multipleChecked": -7,
                 "gradeMismatchCount": -7
             },
             {
                 "blockMap": 8,
                 "week": -7,
                 "switchIdArray": ["#switch801", "#switch802", "#switch803"],
                 "selectedCount": -7,
                 "checkedCount": -7,
                 "zeroChecked": -7,
                 "multipleChecked": -7,
                 "gradeMismatchCount": -7
             },
             {
                 "blockMap": 9,
                 "week": -7,
                 "switchIdArray": ["#switch901", "#switch902", "#switch903"],
                 "selectedCount": -7,
                 "checkedCount": -7,
                 "zeroChecked": -7,
                 "multipleChecked": -7,
                 "gradeMismatchCount": -7
             }
         ]
     };
    //  let studentGrade = parseInt(enrollmentObject.family.student.currentGrade);
     let index = 0;
     let weekOfBlockIndex = -7;
     let element = {};
     let arraySwitchId = [];
     let thisSwitchId = "";
     let zeroCheckedCount = 0;
     let multipleCheckedCount = 0;
     for (index = 1; index < blockMapArray.blockMapArray.length; index++) {
         element = blockMapArray.blockMapArray[index];
         weekOfBlockIndex = enrollmentObject.writeMapWeekArray[index];
         element.week = weekOfBlockIndex;
         element.checkedCount = 0;
         if (weekOfBlockIndex + 0 > 0) {
            element.selectedCount = enrollmentObject.countWeekArray[weekOfBlockIndex];
        } else {
            element.selectedCount = 0;
        }
        arraySwitchId = element.switchIdArray;
        for (let index = 0; index < element.selectedCount; index++) {
            thisSwitchId = arraySwitchId[index];
            element.checkedCount += $w(thisSwitchId).checked ? 1 : 0; 
        }
         element.gradeMismatchCount = 0;
         element.zeroChecked = element.checkedCount === 0 ? 1 : 0;
         element.zeroChecked = element.selectedCount === 0 ? 0 : element.zeroChecked;
         zeroCheckedCount += element.zeroChecked;
         element.multipleChecked = element.checkedCount > 1 ? 1 : 0;
         multipleCheckedCount += element.multipleChecked;
     }
     blockMapArray.blockMapErrors.zeroCheckedCount = zeroCheckedCount;
     blockMapArray.blockMapErrors.multipleCheckedCount = multipleCheckedCount;
     enrollmentObject.blockMapArray = blockMapArray;
     enrollmentObject.enrollment = {};
     enrollmentObject.enrollment.errorArray = [];
     enrollmentObject.enrollment.errorArray[0] = blockMapArray.blockMapErrors.zeroCheckedCount > 0 ? true : false;
     enrollmentObject.enrollment.errorArray[1] = blockMapArray.blockMapErrors.multipleCheckedCount > 0 ? true : false;
     enrollmentObject.enrollment.errorArray[2] = blockMapArray.blockMapErrors.multipleCheckedCount > 0 ? true : false;
    $w("#develTemp").value = JSON.stringify(blockMapArray, undefined, 4);
 
     //  return enrollmentObject + " Chester!";
 }
 
 export function getCoursesSwitched (enrollmentObject) {
     
 }
 
 export function getStudentGradeMisMatchDob(enrollmentObject) {
     //http://charlottesvilleschools.org/home/programs-activities/kindergarten/
     //In order to enroll, potential kindergarteners must be 5 years old by September 30.
    //  let errorString = "               Student was 15 years old on September 30, 2005";//15 spaces
     const monthK = 9;
     const dayK = 30;
     let now = new Date;
     const yearNow = now.getFullYear()
     const monthNow = now.getMonth() + 1;
     const dayNow = now.getDate();
     let lastYear = monthK > monthNow ? 1 : 0; 
     lastYear = monthK === monthNow && dayK > dayNow ? 1 : lastYear; 
     const yearK = yearNow - lastYear;
     enrollmentObject.enrollment.messages = {};
     enrollmentObject.enrollment.messages.dox = ["Zero Checked","Multible Checked","Student-Course GradeLevel","Grade-DOB","messaging specifically for the Enrollment Event"];
     enrollmentObject.enrollment.messages.error = [];
     enrollmentObject.enrollment.messages.warn = [];
     enrollmentObject.enrollment.messages.fyi = [];
     enrollmentObject.enrollment.messages.btw = [];
     let dob = new Date(enrollmentObject.family.student.dobString);
     let dobString = enrollmentObject.family.student.dobString;
     console.log(dobString);
     console.log(dob);
     // enrollmentObject.family.student.dobString = dobString;
     enrollmentObject.family.student.dob = {};
     enrollmentObject.family.student.dob.date = dob;
     let month = dob.getMonth() + 1;
     enrollmentObject.family.student.dob.month = month;
     let day = dob.getDate();
     enrollmentObject.family.student.dob.day = day;
     let year = dob.getFullYear();
     enrollmentObject.family.student.dob.year = year;
     let grade = parseInt(enrollmentObject.family.student.currentGrade);
     let ageK = yearK - year;
     let minusK = 0;
     minusK = month < monthK ? 1 : minusK;
     minusK = month === monthK  && day < dayK ? 1 : minusK;
     ageK -= minusK;
     ageK -= grade; 
     let yearKindergarden = yearK - grade;
     let errorString = "               Student was ";//15 spaces
     errorString += ageK.toString() + " ";//"               Student was 15 years old on September 30, 2005";//15 spaces
     errorString += "years old on September 30, ";//"               Student was 15 years old on September 30, 2005";//15 spaces
     errorString += yearKindergarden.toString();//"               Student was 15 years old on September 30, 2005";//15 spaces
     console.log("ageK: " + ageK);
     let ageError = false
     let ageWarning = false
     ageError = Math.abs(ageK - 5) > 1 ? true : false;
     ageWarning = !ageError && Math.abs(ageK - 5) > 0 ? true : false;
     console.log("ageError: " + ageError);
     console.log("ageWarning: " + ageWarning);
     enrollmentObject.enrollment.errorArray[3] = ageError;
     let showAgeForKindergarden = true;
     if (ageError || showAgeForKindergarden) {
         $w("#dobGradeLevelErrorText").value = errorString;
     }
     if (ageWarning) {
        //  enrollmentObject.enrollment.messages.warn[enrollmentObject.enrollment.messages.warn.length] = "Student Grade is a Mismatch with Date-of-Birth (1 year)"
         enrollmentObject.enrollment.messages.warn[enrollmentObject.enrollment.messages.warn.length] = errorString.trim();
     }
 }

function validateCourseGradeLevelMatch(superEnrollmentObject){
    /**
     * ALSO: Populate Checked within superEnrollmentObject.courses_array
     * [Line ~1180]
     * element.checked = switched;
     */
    let studentCurrentGrade = superEnrollmentObject.family.student.currentGrade;
    console.log("%cGrade: " + studentCurrentGrade +  ' [Line ~1009]',
        `color: #fff;
        background-color: #EA4335;
        font-weight: bold;
        padding: 8px 16px;
        border-radius: 8px;`
        );
    let mapIndex = 0;
    let switchWord = "#switch";
    let zeroString = "0";
    let weekIndexWas = 0;
    let weekIndexIncrement = 0;
    let weekWas = 0;
    let courseIndex = 0;
    let courseCardinality = 0;
    let switchKey = "ZXZ";
    let switchKeyDELETE = "ZXZ";
    let mismatchThis = false;
    let mismatchCount = 0;
    let switched = false;
    let gradeLevel = "Z";
    let arrHOLDER = [];
    let minString = "Z";
    let minGrade = -7;
    let maxString = "Z";
    let maxGrade = -7;
    let misMatch = 0;
    let simpleIndex = 0;
    for (let index = 0; index < superEnrollmentObject.courses_array.length; index++) {
        // console.log("index: " + index);
        const element = superEnrollmentObject.courses_array[index];
        // mapIndex = element.weekId;
        if(weekWas < element.weekId) {
            mapIndex = mapIndex + 1;
        }
        weekWas = element.weekId;
        courseCardinality = element.index + 1;
        // console.log("mapIndex: " + mapIndex);
        // const element = superEnrollmentObject.courses_array[index];
        const mapElement = superEnrollmentObject.blockMapArray.blockMapArray[mapIndex];
        console.log("index: " + index
             + "\ncourse.weekId: " + element.weekId
             + "\nmapIndex: " + mapIndex
             + "\ncourse.index: " + element.index
             + "\nswitch[course.index]: "+  mapElement.switchIdArray[element.index]);
        // console.log("element: ");
        console.log(element);
        // console.log("mapElement: ");
        console.log(mapElement);
        // console.log("index: " + index);
        // console.log(element);
        // console.log("weekId: " + element.weekId);
        // console.log("weekIndexWas: " + weekIndexWas);
        // console.log("weekId: " + element.weekId);
        // console.log("weekWas: " + weekWas
        //      + "\nweekIndexWas: " + weekIndexWas
        //      + "\weekIndexIncrement: " + weekIndexIncrement);
        weekIndexIncrement = element.weekId === weekWas ? 0 : 1;
        // console.log("weekIndexIncrement: " + weekIndexIncrement);
        weekIndexWas += weekIndexIncrement;
        arrHOLDER = element.gradeLevel.split('-');
        // console.log(arrHOLDER);
        minString = arrHOLDER[0];
        // console.log("minString raw: " + minString);
        minString =minString === 'K' ? '0' : minString;
        maxString = arrHOLDER[1];
        minGrade = parseInt(minString,10);
        maxGrade = parseInt(maxString,10);
        switchKey = mapElement.switchIdArray[element.index];
        switchKeyDELETE = switchWord.concat(weekIndexWas.toString(), zeroString, courseCardinality.toString());
        console.log("switchKeyDELETE: " + switchKeyDELETE);
        switched = $w(switchKey).checked; 
        element.checked = switched;
        // console.log("weekIndexWas: " + weekIndexWas
        //     + "\ncourseCardinality: " + courseCardinality
        //     + "\nswitchKey: " + switchKey
        //     + "\nminString: " + minString
        //     + "\nminGrade: " + minGrade
        //     + "\nmaxString: " + maxString
        //     + "\nmaxGrade: " + maxGrade
        //     + "\nswitched: " + switched);
        // console.log("weekIndexWas: " + weekIndexWas);
        // console.log("courseCardinality: " + courseCardinality);
        // console.log("switchKey: " + switchKey);
        // console.log("minString: " + minString);
        // console.log("minGrade: " + minGrade);
        // console.log("maxString: " + maxString);
        // console.log("maxGrade: " + maxGrade);
        // console.log("switched: " + switched);
        misMatch = 0;
        misMatch = studentCurrentGrade < minGrade ? 1 : 0;
        misMatch = studentCurrentGrade > maxGrade ? 1 : misMatch;
        misMatch = switched ? misMatch : 0;
        mapElement.gradeMismatchCount = misMatch;
        mismatchCount += misMatch;
        console.log("misMatch: " + misMatch);
    
    }

    superEnrollmentObject.blockMapArray.blockMapErrors.gradeLevelMismatchCount = mismatchCount;
    console.log(mismatchCount);
    superEnrollmentObject.enrollment.errorArray[2] = mismatchCount === 0 ? false : true;
}
// </Validate Enrollment>

/**
 * <Utility Functions & Constructors>
 * ? why can't these go in masterPage.js
 */
export function isJson(str) {
    let parsed = "let";
    try {
        parsed = JSON.parse(str);
    } catch (e) {
        return false;
    }
    return parsed;
}
// emailThis = new EmailObject(emailParentPrimary, "Primary Parent", parentFirst );
const EmailObject = function(email, role, who, kind = "home", usage = "Personal"){
    this.email = email.trim();
    this.role = role.trim();
    this.who = who.trim();
    this.kind = kind;
    this.usage = usage;
};
// phoneThis = new PhoneObject(phoneParentPrimary, "Primary Parent", parentFirst);
const PhoneObject = function(phone, role, who, kind = "cell", usage = "Personal"){
    phone = phone.replace(/[^0-9]/g,'');
    this.phone = "(" + phone.substr(0, 3) + ") "
    + phone.substr(3, 3) + "-"
    + phone.substr(-4);
    this.role = role.trim();
    this.who = who.trim();
    this.kind = kind;
    this.usage = usage;
};

// addressThis = new AddressObject(mileyAddress, mileyAddress2, mileyCity, mileyState, mileyZip );
const AddressObject = function(address, address2, city, state, zip){
    this.streetAddress = {};
    this.city = address.replace(" ", "|");
    console.log(this.city)
    this.streetAddress.number = this.city.split('|')[0];
    console.log(this.streetAddress.number)
    this.streetAddress.name = this.city.split('|')[1];
    console.log(this.streetAddress.name)
    let renderableAddress2 = false;
    if (renderableString(address2) > 0){
        renderableAddress2 = true;
        this.streetAddress2 = address2.trim();
    }
    this.city = city.trim() ?? '';
    console.log(this.city)
    this.state = state.trim() ?? '';
    this.postalCode = zip.trim() ?? '';
    this.country = 'US';
    this.subdivision = this.state;
    this.location = {};
    this.location.latitude = null;
    this.location.longitue = null;
    //<formatted>
    this.formatted = this.streetAddress.number;
    this.formatted += ' ';
    this.formatted += this.streetAddress.name;
    this.formatted += ', ';
    this.formatted += renderableAddress2 ? this.streetAddress2 + ', ': '';
    this.formatted += this.city;
    this.formatted += ', ';
    this.formatted += this.subdivision;
    this.formatted += ' ';
    this.formatted += this.postalCode;
    this.formatted += ', ';
    this.formatted += this.country === 'US' ? 'USA' : this.country;
    //</formatted>
};
export function renderableString(string) {
    let renderableStringLength = -777777;
    let thisType = typeof string;
    switch (thisType) {
        case 'number':
            renderableStringLength = -7;
            break;
        case 'object':
            renderableStringLength = -99999;
            break;
        case 'string':
            if (string.length === 0){
                renderableStringLength =  -77;
            } else {
                renderableStringLength =  string.length;
            }
            break;

        default:
            //SHOULD NOT HAPPEND
            renderableStringLength =  -999999;
            break;
    }
    return renderableStringLength;
}

//</Utility Functions & Constructors>


// ! <ABANDONED HERE will use local.MEMORY>
export function insertEnrollmentRecord() {
    let now = new Date();
    let jsonEnrollment = $w('#superEnrollmentObject').value;
    let objectEnrollment = JSON.parse(jsonEnrollment);
    let objectCorollaryParam = "NOT a parameter YET";
    let objectCorollary = {};
    //<isObject>
    // this is good, needs to be dynamically extensible 
    //(buzz, buzz, but I mean it)
    let idTerm = 202106;
    let isObject = typeof objectCorollaryParam === 'object' ? true : false; 
	isObject = typeof objectCorollaryParam === null ? false : isObject; 
	isObject = Array.isArray(objectCorollaryParam) ? false : isObject; 
    if(isObject){
        objectCorollary = objectCorollaryParam;
        if ('corollaryJasonVerion' in objectCorollary === false){
            objectCorollary.corollaryJasonVerion = "1.1.1";
        }
        if ('idTerm' in objectCorollary === false){
            objectCorollary.idTerm = idTerm;
        }
    } else {
        objectCorollary = {"idTerm": 202106,"corollaryJasonVerion": "1.1.1"};
    }
    let jsonCorollary = JSON.stringify(objectCorollary, null, 0);
    //</isObject>
    jsonEnrollment = JSON.stringify(objectEnrollment, null, 0);
        //<instantate objectStatusNotes>
    let objectStatusNotes = {"statusNotes":[{"status":"PENDING","kind":"status","note":"posted enrollmentObject record","MDYdate":"4/11/2021","ISOdate":"20210411012108405"},{"status":"INSTANTIATE","kind":"initializing element","note":"instantiate","MDYdate":"4/11/2021","ISOdate":"20210411012105438"}]};
    let nowMDYdate = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
    let nowISOdate = now.toISOString().replace(/[^0-9]/g,'');
    objectStatusNotes.statusNotes[0].MDYdate = nowMDYdate;
    objectStatusNotes.statusNotes[0].ISOdate = nowISOdate;
    objectStatusNotes.statusNotes[1].MDYdate = nowMDYdate;
    objectStatusNotes.statusNotes[1].ISOdate = nowISOdate;
    // console.log(objectStatusNotes);
    let jsonStatusNotes = JSON.stringify(objectStatusNotes, null, 0);
    //</instantate objectStatusNotes>
    //<other Attributes>
    let family = objectEnrollment.family;
    let studentFirst = family.student.name.first;
	let studentLast = family.student.name.last;
	let parentFirst = family.parent.primary.first;
	let parentLast = family.parent.primary.last;
	let spTitle = family.student.name.studentParentCombo;
	// let familyId = $w("#familyId").valufamily.parent.primary.e;//ABOVE
	let idPP = family.parent.primary.memberId;
    //</other Attributes>
    let toInsert = {
        "title": spTitle,
        // "_id": "X",
        // "_owner": "X",
        // "_createdDate": "X",
        // "_updatedDate": "X",
        "studentFirst": studentFirst,
        "studentLast": studentLast,
        "parentFirst": parentFirst,
        "parentLast": parentLast,
        "idPP": idPP,
        "jsonEnrollment": jsonEnrollment,
        "jsonCorollary": jsonCorollary,
        "jsonStatusNotes": jsonStatusNotes,
        "idTerm": idTerm
    };
    console.log("prepared toInsert [Line: ~1422]");
    console.log(toInsert);
    wixData.insert("enrollmentObjects", toInsert)
	.then( (results) => {
		let item = results;
        console.log("inserted results [Line: ~1427]");
        console.log(item);
        resolveSelectedWebHook();
	} )
	.catch( (err) => {
		let errorMsg = err;
	} );


}
// ! </ABANDONED HERE will use local.MEMORY>


export function postEnrollment_click(event) {
    doPostEnrollemnt()
	// cleanUp();
    // insertEnrollmentRecord()
	// resolveSelectedWebHook();
}

export function doPostEnrollemnt(){
    let jsonEnrollmentPretty = $w('#superEnrollmentObject').value;
    let webhookId = $w('#thisKey').value;
    let webhookStatus = $w('#thisCurrentStatus').value;
    let objectEnrollment = JSON.parse(jsonEnrollmentPretty);
    let jsonErnollment = JSON.stringify(objectEnrollment);
    local.setItem("ondeckEnrollmentJSON",jsonErnollment);
    local.setItem('wixWebhookId',webhookId);
    local.setItem('wixWebhookStatus',webhookStatus);
    console.log('local.getItem("ondeckEnrollmentJSON"): ');
    console.log(local.getItem("ondeckEnrollmentJSON"));
    // $w('#btnGoToPostEnrollment').show();
    // $w('#txtEnrConfirmedAbove').show();
    // $w('#txtEnrConfirmedBelow').show();
    $w('#groupEnrollmentConfirmed').expand();
    $w('#postEnrollment').collapse();
    // wixLocation.to("/post-enrollment");
}

// ø <---------- <sessionInstantiateDevelJSON>  ---------->
export function sessionInstantiateDevelJSON(){
// ø <---------- <toLocalISO>  ---------->
// ! <GET FROM BACKEND OR PROTOT DATE>
	let now = new Date();
	let evalDate = now;
	let nowISO = '';
	nowISO += evalDate.getFullYear();
	nowISO += ("00" + (evalDate.getMonth() + 1).toString()).substr(-2);
	nowISO += ("00" + evalDate.getDate().toString()).substr(-2);
	// nowISO += evalDate.getDate();
	nowISO += ("00" + evalDate.getHours().toString()).substr(-2);;
	nowISO += ("00" + evalDate.getMinutes().toString()).substr(-2);;
	nowISO += ("00" + evalDate.getSeconds().toString()).substr(-2);;
// ! </GET FROM BACKEND OR PROTOT DATE>
// ø <---------- </toLocalISO> ---------->

    let develObject = {};
    develObject.instantied = nowISO;

    if (Number(nowISO) < Number("20210814235959")) {
        develObject.manualEnrollment = true;

    }else{
        develObject.manualEnrollment = true;
    }

    let doInstantiate = typeof session.getItem("manualEnrollment") === 'string'  && (session.getItem("manualEnrollment")).length > 0? false : true;
    if (doInstantiate) {
        let develJSON = JSON.stringify(develObject);
        session.setItem("develJSON", develJSON);
    }

    if(develObject.manualEnrollment === true){
        session.setItem("manualEnrollment","TTRUE")
    }else{
        session.setItem("manualEnrollment","FFALSE")
    }
}
// ø <---------- </sessionInstantiateDevelJSON> ---------->


/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnLogEnrollmentJSON_click(event) {
	console.log('local.getItem("ondeckEnrollmentJSON"): ');
    console.dir(local.getItem("ondeckEnrollmentJSON"));
}

// ø <------------ <Update WebhookPayload WebhookStatus GROUP>  -------------->
// ø <------------ <updateStatuWebhookPayloadThis()>  -------------->
export async function updateStatuWebhookPayloadThis(getOnly = false) {
    console.groupCollapsed('updateStatuWebhookPayloadThis')
    console.log(`getOnly: ${getOnly}`)
    const options = {
        "suppressAuth": true,
        "suppressHooks": true
    };
    let webhookId = $w('#thisKey').value;

    let updateObject = await wixData.get("webhookPayload", webhookId, options);
    let doUserInterfaceUpdate = false;
    if (getOnly) {
        // local.setItem('lastResponseObject', JSON.stringify(updateObject));
        if (updateObject.currentStatus === "RESOLVED") {
            if (updateObject.resolvedStatus === "RESOLVED") {
                // local.setItem('wixWebhookStatus',"RESOLVED");// ø postEnrollmentOnly
                doUserInterfaceUpdate = true;
            } else {
                local.setItem('lastErrorString', `current WebhookPayload currentStatus['${updateObject.currentStatus}'] and resolvedStatus['${updateObject.resolvedStatus}''] are Out-Of-Sync`);
            }
        }
        // ø <postEnrollmentOnly>
        // if(updateObject.currentStatus !== local.getItem('wixWebhookStatus')){
        //     local.setItem('wixWebhookStatus',updateObject.currentStatus)
        //     doUserInterfaceUpdate = true;
        // }
        // ø </postEnrollmentOnly>
        // $w('#responseHolderFieldZZZ').value = JSON.stringify(updateObject,undefined,4);
        // if (doUserInterfaceUpdate) {
        //     // doUserInterfaceCleanupCurrent();
        //     console.log("[~Z1665]'doUserInterfaceUpdate [boolean] doEquivalent for 'Process Web Hooks'?");
        //     console.log("[~Z1666]'getOnly' Webhook Payload && doUserInterfaceCleanupCurrent()");
        //     console.log("[~Z1667] Whiskey-Tango-Foxtrot!");
        // }
        console.log("[~Z2278]About to Return with 'getOnly' Webhook Payload");
        local.setItem('lastParamObject', JSON.stringify(updateObject));
        local.setItem('lastResponseObject', '');
        console.groupEnd()
        return;
    }
    // doUserInterfaceUpdate = true;

    let now = new Date();
    let nowISO = now.toISOString();
    // let updateObject = {};
    local.setItem('lastParamObject', JSON.stringify(updateObject));
    // updateObject._id = local.getItem('webhookThisId');
    updateObject.currentStatus = $w('#ddCurrentStatusUpdate').value;
    updateObject.currentStatusStamp = now;
    console.log(`updateObject.currentStatus: ${updateObject.currentStatus}`)
    console.groupEnd()
    if ($w('#ddCurrentStatusUpdate').value === 'RESOLVED') {
        updateObject.resolvedStatus = $w('#ddCurrentStatusUpdate').value;
        updateObject.resolvedStatusStamp = now;
    }
    // $w('#txareaCodeBlock').value = JSON.stringify(updateObject,undefined,4);
    // let paramObject = {};
    // paramObject.holder = 'The Quick Brown Fox Jumps Over the Lazy Dog';
    // local.setItem('lastResponseObject', JSON.stringify(paramObject));
    // return;
    let response = await wixData.update("webhookPayload", updateObject)
    local.setItem('lastResponseObject', JSON.stringify(response));
    // local.setItem('lastResponseObject', JSON.stringify(updateObject));
    // $w('#responseHolderFieldZZZ').value = JSON.stringify(response,undefined,4);
}
// ø <------------ </updateStatuWebhookPayloadThis()> -------------->

// ø <------------ <btnWebhookResolve_click>  -------------->
export async function btnWebhookResolve_click(event) {
    let isValid = true;
    let invalidString = '';
    let selected = $w('#ddCurrentStatusUpdate').value;
    selected = selected.length === 0 ? 'NONE_SELECTED' : selected;
    if (isValid) {
        isValid = $w('#radioAreYouSure').value === 'YES' ? isValid : false;
        invalidString = "'Update Status' is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.";
    }
    if (isValid) {
        isValid = $w('#thisKey').value.length > 30 ? isValid : false;
        invalidString = "'Update Status' cannot proceed. No valid Webhook Payload record selected. Select the Webhook Payload from the list at left for which you wish to change the Status.\n\nNo action taken. \nPlease try again or ask for assistance.";
    }
    if (isValid) {
        let validStatusOptionArray = ['CURRENT','PENDING', 'TEST', 'PROBLEM', 'PRETRASH', 'TESTRESOLVED', 'RESOLVED'];
        isValid = validStatusOptionArray.includes($w('#thisCurrentStatus').value) ? isValid : false;
        invalidString = `'Update Status' cannot proceed. Current (displayed) Status ['${$w('#thisCurrentStatus').value}'] is NOT a valid Status.`;
    }
    if (isValid) {
        let validStatusOptionArray = ['CURRENT','PENDING', 'TEST', 'PROBLEM', 'PRETRASH', 'TESTRESOLVED', 'RESOLVED'];
        isValid = validStatusOptionArray.includes(selected) ? isValid : false;
        invalidString = `'Update Status' cannot proceed. ${selected} is NOT a valid Status.`;
    }
    if (isValid) {
        // let validStatusOptionArray = ['PENDING','TEST','PRETRASH','TESTRESOLVED','RESOLVED'];
        isValid = $w('#thisCurrentStatus').value !== selected ? isValid : false;
        invalidString = `'Update Status' cannot proceed. ${selected} would mean No Change as it is the Current Status.`;
    }

    if (isValid) {
        // ø <DO IT>
        let responseObject = {}
        // $w('#responseHolderFieldZZZ').value = "'Update Status' is NOT Enabled at this time.\n\nNo action taken. \nPlease try again or ask for assistance.";
        let statusThis = $w('#ddCurrentStatusUpdate').value;
        // doUpdateThisWebhookPayload(statusThis);
        // doUpdateThisWebhookPayload(statusThis);
        let getOnly = statusThis === 'CURRENT' ? true : false;
        await updateStatuWebhookPayloadThis(getOnly);
        // doUserInterfaceCleanupCurrent();
        if (local.getItem('lastResponseObject').length < 20) {
            responseObject.webhookCurrent = JSON.parse(local.getItem('lastParamObject'))
            invalidString = 'CURRENT STATUS:\n'
            invalidString += local.getItem('lastParamObject')
        } else {
            responseObject.webhookBefore = JSON.parse(local.getItem('lastParamObject'))
            invalidString = 'BEFORE UPDATE:\n'
            invalidString += local.getItem('lastParamObject')
            responseObject.webhookAfter = JSON.parse(local.getItem('lastResponseObject'))
            invalidString += '\nAFTER UPDATE:\n'
            invalidString += local.getItem('lastResponseObject')
        }
        // $w('#responseHolderFieldZZZ').value = invalidString;
        $w('#responseHolderFieldZZZ').value = JSON.stringify(responseObject,undefined,4);
        wixWindow.copyToClipboard($w('#responseHolderFieldZZZ').value)
        // ø </DO IT>
    } else {
        // ø <ELSE Show Message>
        // $w('#responseHolderFieldZZZ').value = "'Resolve Webhook' is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.";
        $w('#responseHolderFieldZZZ').value = invalidString;
        // ø <ELSE Show Message>
    }
    $w("#radioAreYouSure").value = 'NO';
    $w('#ddCurrentStatusUpdate').value = 'CURRENT';
    $w("#ddCurrentStatusUpdate").resetValidityIndication();
}
// ø <------------ </btnWebhookResolve_click> -------------->
// ø <------------ </Update WebhookPayload WebhookStatus GROUP> -------------->

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnUnloadTop_click(event) {
    cleanUp();
}

export function emailParent_change(event) {
    // let filter1 = wixData.filter().eq("mainPhone", phoneRaw);
    let filter2 = wixData.filter().startsWith("loginEmail", $w('#emailParent').value);
    // let finalFilter = filter1.or(filter2);
    let finalFilter = filter2;
    $w("#dsMembers").setFilter(finalFilter);
    $w("#btnAssignNewMember").show();

}

export function btnGoToTopAndCleanup_click(event) {
	cleanUp();
}