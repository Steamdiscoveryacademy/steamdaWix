let DOX = 'HOLDER';
let wixLocalStorageLibraryObject = {
    "admin": {
        "title": "WiX-Storage 'Library' for Post-Enrollment for Steam DA",
        "descr": "a longer descr",
        "localAttributesDoxPPEQArray": ["2021-08-29T23:59:59|Baseline|collected _all_ from postEnrollment.js as baseline"],
        "localAttributesNotes": [],
        "sessionAttributesDoxPPEQArray": ["2021-08-29T23:59:59|Baseline|none so far"],
        "sessionAttributesNotes": [],
        "memoryAttributesDoxPPEQArray": ["2021-08-29T23:59:59|Baseline|not collected yet"],
        "memoryAttributesNotes": ["there are many to be collected for baseline, but postponed"],
        "notesOverall":["double-quoted everything here is not necessary, ¿but not an error?"]
    },
    "wixLocalStorageArray": [
        "comboName",
        "enrollmentStepCompletedListAll",
        "enrollmentStepListAll",
        "familyEmail",
        "familyId",
        "familySeed",
        "kAppendString",
        "lastErrorString",
        "lastParamObject",
        "lastResponseObject",
        "loopExitAfterStep",
        "loopExitNow",
        "ondeckEnrollmentJSON",
        "ppFirst",
        "ppLast",
        "secondaryEmail",
        "secondaryId",
        "spFirst",
        "spLast",
        "staffIdentifiedFamilyId",
        "stFirst",
        "stLast",
        "stPreferredFirst",
        "studentEmail",
        "studentId",
        "sufficientWatchdogBootstrapKeyArray",
        "superEnrollmentStatus",
        "termBeginMMDD",
        "termEndMMDD",
        "termEndYYYYMMDD",
        "termId",
        "termLabelKey",
        "timezoneOffset",
        "tzAbbrv",
        "uiStDobString",
        "uniqueWatchdogBootstrapKeyArray",
        "webhookThisResolved",
        "webhookThisStatus",
        "weekIdToLabelKeyJSON",
        "wixWebhookStatus",
        "wixWebhookId",
        "yyyymm"
    ],
    "wixLocalStorageArrayPRETRASH": [
        "famiZZZlyId",
        "famiZZZlySeed",
        "lastZZZErrorString",
        "lastZZZParamObject",
        "lastZZZResponseObject",
        "loopZZZExitNow",
        "ondeZZZckEnrollmentJSON",
        "timeZZZoneOffset",
        "webhZZZookThisResolved",
        "webhZZZookThisStatus",
        "wixWZZZebhookId",
        "wixWZZZebhookStatus",
        "yyyyZZZmm"
    ]
};

DOX = '2021-08-30T23:59:59|stepResponseBootstrapKey|a way to pass the resulting messaging bootstrap key to the UI from the _actual_ code, engendered by ppStDedupeDelete';
wixLocalStorageLibraryObject.admin.localAttributesDoxPPEQArray.push(DOX)
wixLocalStorageLibraryObject.wixLocalStorageArray.push('stepResponseBootstrapKey')

DOX = '2021-08-31T07:49:01|stepMessagingJSON|the result of all the PPEQ Append Calls for a Step|maybe for bug, maybe long-term';
wixLocalStorageLibraryObject.admin.localAttributesDoxPPEQArray.push(DOX)
wixLocalStorageLibraryObject.wixLocalStorageArray.push('stepMessagingJSON')

DOX = '2021-10-01T15:34:01|familyPersonsObjectJSON|the result of getFamilyPersonsObject(familyId) applied to person DataSet in Wix';
wixLocalStorageLibraryObject.admin.localAttributesDoxPPEQArray.push(DOX)
wixLocalStorageLibraryObject.wixLocalStorageArray.push('familyPersonsObjectJSON')

DOX = '2021-10-01T15:34:01|enrollObjectJSON|the result of instantiateEnrollmentObject(familyId) by Family ID';
wixLocalStorageLibraryObject.admin.localAttributesDoxPPEQArray.push(DOX)
wixLocalStorageLibraryObject.wixLocalStorageArray.push('enrollObjectJSON')
 
DOX = '2021-10-10T10:15:01|lastDevelObject|the result of develObject Response during Devel (especially for Back-End)';
wixLocalStorageLibraryObject.admin.localAttributesDoxPPEQArray.push(DOX)
DOX = '2021-10-10T10:15:01|lastDevelObject|parallel to lastParamObject & lastResponseObject the suffix JSON is implied';
wixLocalStorageLibraryObject.admin.localAttributesDoxPPEQArray.push(DOX)
wixLocalStorageLibraryObject.wixLocalStorageArray.push('lastDevelObject')
 
DOX = '2021-11-07T21:18:01|termRegion|other term local,wixStorage values this makes sense to add';
wixLocalStorageLibraryObject.admin.localAttributesDoxPPEQArray.push(DOX)
DOX = '2021-10-10T10:15:01|termRegion|parallel to termId, termBegin, termEnd';
wixLocalStorageLibraryObject.admin.localAttributesDoxPPEQArray.push(DOX)
wixLocalStorageLibraryObject.wixLocalStorageArray.push('termRegion')
 


console.warn("wixLocalStorageLibraryObject: ");
console.warn(wixLocalStorageLibraryObject);
