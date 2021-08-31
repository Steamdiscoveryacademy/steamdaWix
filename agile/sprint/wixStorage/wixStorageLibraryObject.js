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



console.warn("wixLocalStorageLibraryObject: ");
console.warn(wixLocalStorageLibraryObject);
