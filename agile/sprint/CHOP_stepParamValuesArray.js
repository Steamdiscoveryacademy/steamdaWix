//Step Key List
let markSwap = stepItemKey === 'spDatabaseExecuteUpsert' ? true : false;
markSwap = stepItemKey === 'spDatabasePrepJSON' ? true : markSwap;
let stepItemKeyArray = ['ppMemberPrepJSON','ppMemberExecuteUpsert','stMemberPrepJSON','stMemberExecuteUpsert','ppContactPrepJSON','ppDatabasePrepJSON','stContactPrepJSON','stDatabasePrepJSON','spContactPrepJSON','spDatabaseExecuteUpsert','ppContactExecuteUpsert','ppDatabaseExecuteUpsert','stContactExecuteUpsert','stDatabaseExecuteUpsert','spContactExecuteUpsert','spDatabasePrepJSON'];


let stepParamValuesArray = [
['ppAction',0,'ppMemberPrepJSON'],
['ppAction',0,'ppMemberExecuteUpsert'],
['stAction',0,'stMemberPrepJSON'],
['stAction',0,'stMemberExecuteUpsert'],
['ppAction',1,'ppContactPrepJSON'],
['ppAction',2,'ppDatabasePrepJSON'],
['stAction',1,'stContactPrepJSON'],
['stAction',2,'stDatabasePrepJSON'],
['spAction',1,'spContactPrepJSON'],
['spAction',2,'spDatabaseExecuteUpsert'],
['ppAction',1,'ppContactExecuteUpsert'],
['ppAction',2,'ppDatabaseExecuteUpsert'],
['stAction',1,'stContactExecuteUpsert'],
['stAction',2,'stDatabaseExecuteUpsert'],
['spAction',1,'spContactExecuteUpsert'],
['spAction',2,'spDatabasePrepJSON']
];


//doIfElseThen_forCurrentStep(actionKey = 'iiAction',actionKeyIndex =777,stepItemKey = 'ZXZ')

doIfElseThen_forCurrentStep('ppAction',0,'ppMemberPrepJSON');
doIfElseThen_forCurrentStep('ppAction',0,'ppMemberExecuteUpsert');
doIfElseThen_forCurrentStep('stAction',0,'stMemberPrepJSON');
doIfElseThen_forCurrentStep('stAction',0,'stMemberExecuteUpsert');
doIfElseThen_forCurrentStep('ppAction',1,'ppContactPrepJSON');
doIfElseThen_forCurrentStep('ppAction',2,'ppDatabasePrepJSON');
doIfElseThen_forCurrentStep('stAction',1,'stContactPrepJSON');
doIfElseThen_forCurrentStep('stAction',2,'stDatabasePrepJSON');
doIfElseThen_forCurrentStep('spAction',1,'spContactPrepJSON');
doIfElseThen_forCurrentStep('spAction',2,'spDatabaseExecuteUpsert');
doIfElseThen_forCurrentStep('ppAction',1,'ppContactExecuteUpsert');
doIfElseThen_forCurrentStep('ppAction',2,'ppDatabaseExecuteUpsert');
doIfElseThen_forCurrentStep('stAction',1,'stContactExecuteUpsert');
doIfElseThen_forCurrentStep('stAction',2,'stDatabaseExecuteUpsert');
doIfElseThen_forCurrentStep('spAction',1,'spContactExecuteUpsert');
doIfElseThen_forCurrentStep('spAction',2,'spDatabasePrepJSON');

let indexForMember = 0;
let indexForContact = 1;
let indexForDbase = 2;
doIfElseThen_forCurrentStep('ppAction',indexForMember,'ppMemberPrepJSON');
doIfElseThen_forCurrentStep('ppAction',indexForMember,'ppMemberExecuteUpsert');
doIfElseThen_forCurrentStep('stAction',indexForMember,'stMemberPrepJSON');
doIfElseThen_forCurrentStep('stAction',indexForMember,'stMemberExecuteUpsert');
doIfElseThen_forCurrentStep('ppAction',indexForContact,'ppContactPrepJSON');
doIfElseThen_forCurrentStep('ppAction',indexForDbase,'ppDatabasePrepJSON');
doIfElseThen_forCurrentStep('stAction',indexForContact,'stContactPrepJSON');
doIfElseThen_forCurrentStep('stAction',indexForDbase,'stDatabasePrepJSON');
doIfElseThen_forCurrentStep('spAction',indexForContact,'spContactPrepJSON');
doIfElseThen_forCurrentStep('spAction',indexForDbase,'spDatabaseExecuteUpsert');
doIfElseThen_forCurrentStep('ppAction',indexForContact,'ppContactExecuteUpsert');
doIfElseThen_forCurrentStep('ppAction',indexForDbase,'ppDatabaseExecuteUpsert');
doIfElseThen_forCurrentStep('stAction',indexForContact,'stContactExecuteUpsert');
doIfElseThen_forCurrentStep('stAction',indexForDbase,'stDatabaseExecuteUpsert');
doIfElseThen_forCurrentStep('spAction',indexForContact,'spContactExecuteUpsert');
doIfElseThen_forCurrentStep('spAction',indexForDbase,'spDatabasePrepJSON');

