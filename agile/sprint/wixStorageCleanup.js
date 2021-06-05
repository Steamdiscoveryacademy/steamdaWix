let storageObject = {};
storageObject.storageObjectArray = [];
let storageObjectElement = {};

storageObjectElement = {};
storageObjectElement.memoryKey = 'staffIdentifiedFamilyId';
storageObjectElement.memoryKind = 'local';
storageObjectElement.instantiateValue = 'enrollmentObject.family.parent.primary.memberId';
storageObjectElement.emptyValue = 'EEMPTY';
storageObjectElement.confirmed = false;
storageObject.storageObjectArray.push(storageObjectElement);

storageObjectElement = {};
storageObjectElement.memoryKey = 'familyId';
storageObjectElement.memoryKind = 'local';
storageObjectElement.instantiateValue = 'enrollmentObject.family.parent.primary.memberId';
storageObjectElement.emptyValue = 'EEMPTY';
storageObjectElement.confirmed = false;

storageObjectElement = {};
storageObjectElement.memoryKey = 'the whole enrollment JSON';
storageObjectElement.memoryKind = 'local';
storageObjectElement.confirmed = false;
storageObject.storageObjectArray.push(storageObjectElement);

storageObjectElement = {};
storageObjectElement.memoryKey = 'studentId';
storageObjectElement.memoryKind = 'local';
storageObjectElement.confirmed = false;
storageObject.storageObjectArray.push(storageObjectElement);

storageObjectElement = {};
storageObjectElement.memoryKey = 'the Nine-ish blocks of Code';
storageObjectElement.memoryKind = 'memory';
storageObjectElement.confirmed = false;
storageObject.storageObjectArray.push(storageObjectElement);

storageObjectElement = {};
storageObjectElement.memoryKey = 'the stepsList';
storageObjectElement.memoryKind = 'memory';
storageObjectElement.confirmed = false;
storageObject.storageObjectArray.push(storageObjectElement);

storageObjectElement = {};
storageObjectElement.memoryKey = 'the currentStep';
storageObjectElement.memoryKind = 'memory';
storageObjectElement.confirmed = false;
storageObject.storageObjectArray.push(storageObjectElement);

storageObjectElement = {};
storageObjectElement.memoryKey = 'the nextStep';
storageObjectElement.memoryKind = 'memory';
storageObjectElement.confirmed = false;
storageObject.storageObjectArray.push(storageObjectElement);







console.warn('storageObject: ');
console.warn(storageObject);