// ø <from Reuslt COPY>
let titleKeyArray = [
    "onRamp",
    "instantiate",
    "memberConfirm",
    "dupeDelete",
    "databaseForPrimaryAndStudent",
    "contactForPrimaryAndStudent",
    "contactAndDatabaseForSecondary",
    "resolveAndDestroy",
    "offRamp"
];
let stateIdArray = [
    "stateOnRamp",
    "stateInstantiate",
    "stateMemberConfirm",
    "stateDupeDelete",
    "stateDatabaseForPrimaryAndStudent",
    "stateContactForPrimaryAndStudent",
    "stateContactAndDatabaseForSecondary",
    "stateResolveAndDestroy",
    "stateOffRamp"
];
// ø </from Reuslt COPY>

// ø <from WiX getStates LIVE>
let stateObjectArray =  [
    {
        "id": "stateZero",
        "type": "$w.State",
        "global": false,
        "rendered": false,
        "background": ""
    },
    {
        "id": "stateOnramp",
        "type": "$w.State",
        "global": false,
        "rendered": true,
        "background": ""
    },
    {
        "id": "stateInstantiate",
        "type": "$w.State",
        "global": false,
        "rendered": false,
        "background": ""
    },
    {
        "id": "stateMemberConfirm",
        "type": "$w.State",
        "global": false,
        "rendered": false,
        "background": ""
    },
    {
        "id": "stateDupeDelete",
        "type": "$w.State",
        "global": false,
        "rendered": false,
        "background": ""
    },
    {
        "id": "stateDatabaseForPrimaryAndStudent",
        "type": "$w.State",
        "global": false,
        "rendered": false,
        "background": ""
    },
    {
        "id": "stateContactForPrimaryAndStudent",
        "type": "$w.State",
        "global": false,
        "rendered": false,
        "background": ""
    },
    {
        "id": "stateContactAndDatabaseForSecondary",
        "type": "$w.State",
        "global": false,
        "rendered": false,
        "background": ""
    },
    {
        "id": "stateResolveAndDestroy",
        "type": "$w.State",
        "global": false,
        "rendered": false,
        "background": ""
    },
    {
        "id": "stateOfframp",
        "type": "$w.State",
        "global": false,
        "rendered": false,
        "background": ""
    }
];
let reportString = '';
let wixStateId = '';
let stateId = ''
let titleKey = ''
let index = 0;
stateObjectArray.forEach(elementObject => {
    // console.log(elementObject);
    reportString = ''
    wixStateId = elementObject.id
    reportString = 'id: ' + wixStateId + '; '
    if (index > 0) {
        stateId = stateIdArray[index - 1]
        reportString += 'stateId: ' + stateId + '; '
        titleKey = titleKeyArray[index - 1]
        reportString += 'titleKey: ' + titleKey + '; '
        reportString += '\n' + wixStateId + '|' + stateId + '|state' + titleKey.substr(0,1).toUpperCase() + titleKey.substr(1) + '|'
    }
    console.warn(reportString)
    index++
});

