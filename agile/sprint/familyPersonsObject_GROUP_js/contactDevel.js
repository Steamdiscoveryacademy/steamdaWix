// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixData from 'wix-data';
import wixWindow from 'wix-window';
import {local, session, memory} from 'wix-storage';
import { steamdaGetContactFunction } from 'backend/crmModule.jsw'
import { steamdaGetContactByEmailFunction } from 'backend/contactReference.jsw';
import { multiplyFor_familyPersonsObject } from 'backend/familyPersonsObject.jsw';
import { getFamilyPersonsObject } from 'backend/familyPersonsObject.jsw';
import { dataQueryPerson_filterByFamilyId } from 'backend/familyPersonsObject.jsw';

$w.onReady(function () {
    // let temoraryParam  = []
    // session.setItem('temporarySource',JSON.stringify(temoraryParam))
    doSimpleDemogrfxAssignment()
    populateOriginalActionValueButtons()
    $w('#secondaryResponseTXTBX').value += `\nAFTER: $w.onReady(function () => populateOriginalActionValueButtons()`
    $w('#familyIdINPT').value = local.getItem('staffIdentifiedFamilyId')
});

// QUICK FIND:
// ø getFamilyPersonsObject_NotBackend
// ø appendPerson_toPersonObjectById_NotBackend
// ø validateFamilyPersonsObject_NotBackend
// ø instantiateEnrollmentObject>
// ø return_develObject



// ø <================================================================================================>
// ø <============================== <familyPersonsObject.jsw BackEnd>  ==============================>
// ø <================================================================================================>
// ¡ <CALLING FUNCTION - from Canine-Consulting => Import Export Data>
export async function btnMultiply_click(event) {
    let uniquePipedString = await multiply($w("#operand1").value, $w("#operand2").value)
	let responseStringArray = uniquePipedString.split('|')
	// let product = await multiply($w("#operand1").value, $w("#operand2").value)
	let product = responseStringArray[1]
	$w("#product").value = product;
	let responseStringFinal = typeof session.getItem('lastMultiplyJSON') !== 'string' || (session.getItem('lastMultiplyJSON')).length < 10 ? `Invalid session.getItem('lastMultiplyJSON')` : session.getItem('lastMultiplyJSON');
	responseStringFinal = `\n==========\n` + responseStringFinal
	responseStringFinal = responseStringArray[0] + responseStringFinal
	$w("#multiplyResponseTXAREA").value = responseStringFinal
}
// ¡ </CALLING FUNCTION - from Canine-Consulting => Import Export Data>
/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export async function btnMultiply_click_1(event) {
	// $w('#multiplyResponseTXAREA').value = `Multiply for familyPersonObject.jsw`
	// $w('#multiplyResponseTXAREA').value = `Multiply for familyPersonObject.jsw: '${$w("#operand1").value} x ${$w("#operand2").value}'`
    // return
    let uniquePipedString = await multiplyFor_familyPersonsObject($w("#operand1").value, $w("#operand2").value)
	let responseStringArray = uniquePipedString.split('|')
	// let product = await multiply($w("#operand1").value, $w("#operand2").value)
	let product = responseStringArray[1]
	$w("#product").value = product;
	let responseStringFinal = typeof session.getItem('lastMultiplyJSON') !== 'string' || (session.getItem('lastMultiplyJSON')).length < 10 ? `Invalid session.getItem('lastMultiplyJSON')` : session.getItem('lastMultiplyJSON');
	responseStringFinal = `\n==========\n` + responseStringFinal
	responseStringFinal = responseStringArray[0] + responseStringFinal
	$w("#multiplyResponseTXAREA").value = responseStringFinal
}
// ø <================================================================================================>
// ø <============================== </familyPersonsObject.jsw BackEnd> ==============================>
// ø <================================================================================================>

// ø <==========================================================================================>
// ø <============================== <familyPersonsObject_GROUP>  ==============================>
// ø <==========================================================================================>

// ø <==========================================================================================>
// ø <============================== <familyPersonsObject_GROUP>  ==============================>
// ø <==========================================================================================>
// ø <-------------------- <getFamilyPersonsObject_NotBackend>  -------------------->
export async function getFamilyPersonsObject_NotBackend(familyId = 'STRING') {
    console.groupCollapsed(`getFamilyPersonsObject_NotBackend(familyId)`)
    console.log(`Full Declaration: export async function getFamilyPersonsObject_NotBackend(familyId = 'STRING')`)
    console.log(`familyId: ${familyId} [@todo: validate family id]`)
    let DOX = 'So that it is readable in the WiX Editor'
    let familyIdPersonQueryResponseObject = await dataQueryPerson_filterByFamilyId_NotBackend(familyId)
    console.log(`familyIdPersonQueryResponseObject:`)
    console.dir(familyIdPersonQueryResponseObject)
    let arrayOfPersonRecords =  familyIdPersonQueryResponseObject.items
	arrayOfPersonRecords.forEach(item => {
		item.familyAlphaKey = 'TBD'
		item.personContactEmail = 'TBD'
		delete item.objectData
		delete item.objectCorollary
		delete item.idBL
		delete item.idHH
		delete item.webhookId
		delete item.altPersonId
		delete item.fullName
		delete item.lastFirst
		delete item.comboName
		delete item._owner
		delete item._id
	});

    console.log(`arrayOfPersonRecords:`)
    console.dir(arrayOfPersonRecords)

    let pendingString = 'PENDING'
    // ø <familyDataObject INSTANTIATE>
    DOX = '<INSTANTIATE>'
    let familyDataObject = {}
    familyDataObject.familyId = familyId
    familyDataObject.familyTermIdMax = 201506
    familyDataObject.primaryTermIdMax = 201506
    familyDataObject.studentTermIdMax = 201506
    familyDataObject.secondaryTermIdMax = 201506
    familyDataObject.primaryId = pendingString
    familyDataObject.primaryEmail = pendingString
    familyDataObject.primaryIsUpToDate = false
    familyDataObject.studentId = pendingString
    familyDataObject.studentEmail = pendingString
    familyDataObject.studentIsUpToDate = false
    familyDataObject.secondaryId = pendingString
    familyDataObject.secondaryEmail = pendingString
    familyDataObject.secondaryIsUpToDate = false
    familyDataObject.familyAlphaKey_uniqueArray = []
    // ø => Validation: Should have a Single Value

    familyDataObject.personIdCount = 0
    familyDataObject.personIdArray = [] // very unlikely event where on personId has more than one role (¿primary/secondary switch?)
    familyDataObject.primaryMemberObjectsById = {}
    familyDataObject.primaryPersonCount = 0
    familyDataObject.studentMemberObjectsById = {}
    familyDataObject.studentPersonCount = 0
    familyDataObject.studentFirstTermIdConcatArray = []
    familyDataObject.studentFirstTermId2dArray = []
    familyDataObject.studentFirstArray = []
    familyDataObject.secondaryMemberObjectsById = {}
    familyDataObject.secondaryPersonCount = 0
    familyDataObject.unsupportedRolePersonIdArray = []
    familyDataObject.unsupportedRolePersonCount = 0
    // ø => Validation: Should be empty
    // ø </familyDataObject INSTANTIATE>
    DOX = '</INSTANTIATE>'
    console.log(`familyDataObject: INSTANTIATE:`)
    console.dir(familyDataObject)

    let person = {}
    for (let index = 0; index < arrayOfPersonRecords.length; index++) {
        person = arrayOfPersonRecords[index];
        await appendPerson_toPersonObjectById_NotBackend(person, familyDataObject)
    }

    console.log(`familyDataObject: Pre-Validation: `)
    console.dir(familyDataObject)
    
    await validateFamilyPersonsObject_NotBackend(familyDataObject)
    console.log(`familyDataObject: FINAL: `)
    console.dir(familyDataObject)
    local.setItem('familyPersonsObjectJSON', JSON.stringify(familyDataObject))

    console.groupEnd()
    return familyDataObject

}
// ø <-------------------- </getFamilyPersonsObject_NotBackend> -------------------->

// ø <-------------------- </appendPerson_toPersonObjectById_NotBackend> -------------------->
export async function appendPerson_toPersonObjectById_NotBackend(person = {}, familyDataObject = {}) {
    // ø <personObjectById_TEMPLATE INSTANTIATE>
    let DOX = 'entering'
    console.groupCollapsed(`appendPerson_toPersonObjectById_NotBackend(person, familyDataObject)`)
    console.log(`Full Declaration: export async function appendPerson_toPersonObjectById_NotBackend(person = {}, familyDataObject = {})`)
    console.log(`person: PARAM: `)
    console.dir(person)

    // ø <familyAlphaKey CowCatcher>
    person.alphaKey = person.alphaKey == null ? 'TBDz' : person.alphaKey
    // ø </familyAlphaKey CowCatcher>

    /**
     * ø person Database Attributes
     * ø  - first
     * ø  - last
     * ø  - firstLegal
     * ø  - familyId
     * ø  - personId
     * ø  - role
     * ø  - termId
     * ø  - familyAlphaKey
     */

    let personObjectById_TEMPLATE = {}
    personObjectById_TEMPLATE.contactId = 'STRING'//redundant, but
    personObjectById_TEMPLATE.familyAlphaKey = 'STRING'//redundant, but
    personObjectById_TEMPLATE.personContactEmail = 'STRING'//redundant, but
    personObjectById_TEMPLATE.role = 'STRING'//redundant, but
    personObjectById_TEMPLATE.termId = 777
    personObjectById_TEMPLATE.first = 'STRING'//legal for student
    personObjectById_TEMPLATE.last = 'STRING'
    personObjectById_TEMPLATE.termIdArray = []
    personObjectById_TEMPLATE.firstArray = []
    personObjectById_TEMPLATE.termIdFirst2dArray = []
    // ø </personObjectById_TEMPLATE INSTANTIATE>

    let personObjectById = {}
    
    familyDataObject.personIdCount++
    familyDataObject.personIdArray.push(person.personId)
    let holderString = 'STRING'
    let holderArray = []


    // ø <pre-SWITCH Code>
    if (!familyDataObject.familyAlphaKey_uniqueArray.includes(person.familyAlphaKey)) {
        // ø => Validation: Should have a Single Value
        familyDataObject.familyAlphaKey_uniqueArray.push(person.familyAlphaKey)
    }
    // ø </pre-SWITCH Code>
    // ø <SWITCH to INSTANTIATE>
    switch (person.role) {
        case 'Primary':
            holderArray = Object.keys(familyDataObject.primaryMemberObjectsById)
            personObjectById = holderArray.includes(person.personId) ? familyDataObject.primaryMemberObjectsById[person.personId] : personObjectById_TEMPLATE
            // personObjectById.personContactEmail = person.personContactEmail === 'TDB' ? 'pp' + person.personContactEmail : person.personContactEmail
            break;
        case 'Student':
            holderArray = Object.keys(familyDataObject.studentMemberObjectsById)
            personObjectById = holderArray.includes(person.personId) ? familyDataObject.primaryMemberObjectsById[person.personId] : personObjectById_TEMPLATE
            familyDataObject.studentFirstTermIdConcatArray.push(person.firstLegal + '_' + person.termId + '_' + person.personId)
            familyDataObject.studentFirstTermId2dArray.push([person.firstLegal , person.termId , person.personId])
            familyDataObject.studentFirstArray.push(person.firstLegal)
            // if (person.personId === '1cd3b68a-1f6d-44d6-afa4-b5b72d8e496b') {
            if (person.personId === 'ZZZ_c90f23aa-2838-4e4e-9135-3995d25c5eb3') {
                // ø <FORCE_TEST for Testing Existing Student>
                console.groupCollapsed(`<KLUDGE for Testing Existing Student`)
                console.log(`person.personId: ${person.personId}`)
                familyDataObject.studentFirstArray.push('Leonel')
                console.log(`familyDataObject.studentFirstArray:`)
                console.dir(familyDataObject.studentFirstArray)
                console.groupEnd()
                // ø </FORCE_TEST for Testing Existing Student>
            }
            break;
        case 'Secondary':
            holderArray = Object.keys(familyDataObject.secondaryMemberObjectsById)
            personObjectById = holderArray.includes(person.personId) ? familyDataObject.primaryMemberObjectsById[person.personId] : personObjectById_TEMPLATE
            break;
        default:
            holderArray = [person.role, person.personId]
            familyDataObject.unsupportedRolePersonIdArray.push(holderArray)
            familyDataObject.unsupportedRolePersonCount++
            break;
    }
    // ø </SWITCH to INSTANTIATE>

    let rolePrefix = person.role === 'Primary' ? 'pp' : 'zz'
    rolePrefix = person.role === 'Student' ? 'st' : rolePrefix
    rolePrefix = person.role === 'Secondary' ? 'sp' : rolePrefix
    // ø <Populate personObjectById>
    personObjectById.familyAlphaKey = person.familyAlphaKey//redundant, but
    personObjectById.contactId = person.personId//redundant, but
    personObjectById.personContactEmail = person.personContactEmail === 'TBD' ? rolePrefix + person.personContactEmail : person.personContactEmail//redundant, but
    personObjectById.role = person.role//redundant, but
    personObjectById.termId = person.termId
    holderString = person.role === 'Student' ? person.firstLegal : person.first//legal for student
    personObjectById.first = holderString//legal for student
    personObjectById.last = person.last
    personObjectById.termIdArray.push(person.termId)
    personObjectById.termIdMax = personObjectById.termIdMax == null || personObjectById.termIdMax < person.termId ? person.termId : personObjectById.termIdMax
    familyDataObject.familyTermIdMax = person.termId > familyDataObject.familyTermIdMax ? person.termId : familyDataObject.familyTermIdMax  

    personObjectById.firstArray.push(holderString)//legal for student
    holderArray = [person.termId, holderString]
    personObjectById.termIdFirst2dArray.push(holderArray)
    // ø </Populate personObjectById>
    console.log(`${person.role}: personObjectById: SOFAR: `)
    console.dir(personObjectById)

    // ø <SWITCH to Assign>
    switch (person.role) {
        case 'Primary':
            familyDataObject.primaryMemberObjectsById[person.personId] = personObjectById
            familyDataObject.primaryPersonCount++
            familyDataObject.primaryTermIdMax = person.termId > familyDataObject.primaryTermIdMax ? person.termId : familyDataObject.primaryTermIdMax  
            break;
        case 'Student':
            familyDataObject.studentMemberObjectsById[person.personId] = personObjectById
            familyDataObject.studentPersonCount++
            familyDataObject.studentTermIdMax = person.termId > familyDataObject.studentTermIdMax ? person.termId : familyDataObject.studentTermIdMax
            break;
        case 'Secondary':
            familyDataObject.secondaryMemberObjectsById[person.personId] = personObjectById
            familyDataObject.secondaryPersonCount++
            familyDataObject.secondaryTermIdMax = person.termId > familyDataObject.secondaryTermIdMax ? person.termId : familyDataObject.secondaryTermIdMax
            break;
        default:
            DOX = 'Already dealt with above, I think that is sufficient'
            break;
    }
    // ø </SWITCH to Assign>
    console.log(`familyDataObject: ROW RESULT: `)
    console.dir(familyDataObject)
    console.groupEnd()
    return
}
// ø <-------------------- </appendPerson_toPersonObjectById_NotBackend> -------------------->

// ø <-------------------- <validateFamilyPersonsObject_NotBackend>  -------------------->
export async function validateFamilyPersonsObject_NotBackend(familyDataObject = {}){
    let DOX = 'TO BE VISIBLE IN WIX EDITOR'
    let unconfirmedString = 'UNCONFIRMED'
    let validationObject = {}
    // ø <VALIDATE ONTO familyDataObject>
    /**
     * ø NOTES:
     * ø   - use of local variables for clarity
     * ø   - use of inline comments to align Ternary-Operator Question Marks by Block  
     */
    
    let holderCriteria = false
    let holderArray = Object.keys(familyDataObject.primaryMemberObjectsById)
    holderCriteria = holderArray.length === 1
    holderCriteria = holderCriteria && familyDataObject.familyId === holderArray[0]

    familyDataObject.primaryId = holderCriteria ? familyDataObject.familyId : familyDataObject.primaryId
    familyDataObject.primaryEmail = holderCriteria ? familyDataObject.primaryMemberObjectsById[familyDataObject.familyId]["personContactEmail"] : familyDataObject.primaryEmail
    holderCriteria = holderCriteria && familyDataObject.familyId === holderArray[0]
    // ø \v/ Consider Using familyDataObject.familyTermIdMax, ¿but less precise?
    familyDataObject.primaryIsUpToDate = holderCriteria && familyDataObject.primaryMemberObjectsById[familyDataObject.familyId]["termIdMax"] === Number(local.getItem('termId'))? true : false
    
    holderCriteria = false
    familyDataObject.studentId = holderCriteria ? 'zRESULTz' : familyDataObject.studentId
    familyDataObject.studentEmail = holderCriteria ? 'zRESULTz' : familyDataObject.studentEmail
    familyDataObject.studentIsUpToDate = false

    holderCriteria = false
    holderArray = Object.keys(familyDataObject.secondaryMemberObjectsById)
    holderCriteria = holderArray.length === 1
    holderCriteria = holderCriteria && familyDataObject.familyId !== holderArray[0]
    familyDataObject.secondaryId = holderCriteria ? holderArray[0] : familyDataObject.secondaryId
    familyDataObject.secondaryEmail = holderCriteria ? familyDataObject.secondaryMemberObjectsById[familyDataObject.secondaryId]["personContactEmail"] : familyDataObject.secondaryEmail
    
    // ø \v/ Consider Using familyDataObject.secondaryTermIdMax, ¿but less precise?
    familyDataObject.secondaryIsUpToDate = holderCriteria && familyDataObject.secondaryMemberObjectsById[familyDataObject.secondaryId]["termIdMax"] === Number(local.getItem('termId'))? true : false
 
    // ø </VALIDATE ONTO familyDataObject>






    // ø <PROOF OF CONCEPT OVERALL>
    /**
     * ø NOTES:
     * ø   - use of local variables for clarity
     * ø   - use of inline comments to align Ternary-Operator Question Marks by Block  
     */
    let POCvalidationObject = {}
    POCvalidationObject.isValidStrings = {}
    POCvalidationObject.isValidBooleans = {}
    // ø ø <PROOF OF CONCEPT SINGLETON>
    let POCpersonIdCountString = 'ISVALID'
    let POCemptyString = ''
    let POCpersonIdCountBySum = familyDataObject.primaryPersonCount + familyDataObject.studentPersonCount + familyDataObject.secondaryPersonCount + familyDataObject.unsupportedRolePersonCount
    POCpersonIdCountString += familyDataObject.personIdCount === familyDataObject.personIdArray.length /**/ ? POCemptyString : '|personId Count does NOT match personId Array Length '
    POCpersonIdCountString += familyDataObject.personIdCount === POCpersonIdCountBySum /*...................*/ ? POCemptyString : '|[overall] personId Count does NOT match the Sum of personId Counts by Role'
    POCvalidationObject.isValidStrings.personIdCount = POCpersonIdCountString === 'ISVALID' ? POCpersonIdCountString : POCpersonIdCountString.replace('ISVALID','ISINVALID')
    POCvalidationObject.isValidBooleans.personIdCount = POCpersonIdCountString === 'ISVALID' ? true : false
    // ø ø </PROOF OF CONCEPT SINGLETON>
    // ø </PROOF OF CONCEPT OVERALL>

    
    validationObject.isValidStrings = {}
    validationObject.isValidBooleans = {}

    let holderIsValidString = 'ISVALID'
    const emptyString = ''
    let personIdCountBySum = familyDataObject.primaryPersonCount + familyDataObject.studentPersonCount + familyDataObject.secondaryPersonCount + familyDataObject.unsupportedRolePersonCount
    holderIsValidString += familyDataObject.personIdCount === familyDataObject.personIdArray.length /**/ ? emptyString : '|personId Count does NOT match personId Array Length '
    holderIsValidString += familyDataObject.personIdCount === personIdCountBySum /*...................*/ ? emptyString : '|[overall] personId Count does NOT match the Sum of personId Counts by Role'
    validationObject.isValidStrings.personIdCount = holderIsValidString === 'ISVALID' ? holderIsValidString : holderIsValidString.replace('ISVALID','ISINVALID')
    validationObject.isValidBooleans.personIdCount = holderIsValidString === 'ISVALID' ? true : false

    holderIsValidString = 'ISVALID'
    holderIsValidString += (familyDataObject.familyAlphaKey_uniqueArray).length === Math.sign(familyDataObject.personIdCount) ? emptyString : 'familyAlphaKey is NOT Unique'
    validationObject.isValidStrings.familyAlphaKey_isUnique = holderIsValidString === 'ISVALID' ? holderIsValidString : holderIsValidString.replace('ISVALID','ISINVALID')
    validationObject.isValidBooleans.familyAlphaKey_isUnique = holderIsValidString === 'ISVALID' ? true : false
    // validationObject.isValidBooleans = {}


    DOX = 'all DANGER until deployment'
    let allDangerBooleansAreValid = true
    let allWarningBooleansAreValid = true
    let allInfoBooleansAreValid = true
    let allDevelBooleansAreValid = true
    let allBooleanValuesKeyArray = Object.keys(validationObject.isValidBooleans)
    const MAYBE_warningBooleanValueKeyArray = []
    const warningBooleanValueKeyArray = []
    const MAYBE_infoBooleanValueKeyArray = []
    const infoBooleanValueKeyArray = []
    const MAYBE_develBooleanValueKeyArray = []
    const develBooleanValueKeyArray = []
    // ø NOTE: there should be no overlap of Info & Warning, but if so, Warning Wins (and, of course, Danger Wins overall)
    let keyKind = 'DANGER'
    allBooleanValuesKeyArray.forEach(key => {
        keyKind = 'DANGER'
        keyKind = develBooleanValueKeyArray.includes(key) ? 'DEVEL' : keyKind
        keyKind = infoBooleanValueKeyArray.includes(key) ? 'INFO' : keyKind
        keyKind = warningBooleanValueKeyArray.includes(key) ? 'WARNING' : keyKind
        switch (keyKind) {
            case 'WARNING':
                allWarningBooleansAreValid = validationObject.isValidBooleans[key] === false ? false : allWarningBooleansAreValid
                break;
            case 'INFO':
                allInfoBooleansAreValid = validationObject.isValidBooleans[key] === false ? false : allInfoBooleansAreValid
                break;
            case 'DEVEL':
                allInfoBooleansAreValid = validationObject.isValidBooleans[key] === false ? false : allInfoBooleansAreValid
                break;
        
            default:
                allDevelBooleansAreValid = validationObject.isValidBooleans[key] === false ? false : allDevelBooleansAreValid
                break;
        }

    });
    validationObject.allDangerBooleansAreValid = allDangerBooleansAreValid
    validationObject.allWarningBooleansAreValid = allWarningBooleansAreValid
    validationObject.allInfoBooleansAreValid = allInfoBooleansAreValid
    validationObject.allDevelBooleansAreValid = allDevelBooleansAreValid

    familyDataObject.validationObject = validationObject
}
// ø <-------------------- </validateFamilyPersonsObject_NotBackend> -------------------->

// ø <-------------------- <instantiateEnrollmentObject>  -------------------->
export async function instantiateEnrollmentObject(familyId = 'STRING') {
    console.groupCollapsed(`instantiateEnrollmentObject(familyId)`)
    console.log(`FULL DECLARATION: export async function instantiateEnrollmentObject(${familyId} = 'STRING')`)
    let DOX = 'so that it can be viewed in the Online Editor'
    let develObject = {}
    develObject.paramObject = {}
    develObject.responseObject = {}
    develObject.responseObject.notes = []
    DOX = `instantiateEnrollmentObject(familyId = 'STRING')`
    develObject.responseObject.notes.push(DOX)
    DOX = `these notes will parallel 'enroll.notes = []`
    develObject.responseObject.notes.push(DOX)
    develObject.paramObject.familyId = familyId
    let pendingString = 'PENDING'
    let unconfirmedString = 'UNCONFIRMED'
    let enroll = {}
    enroll.notes = []
     
    /*doxNOTE*/DOX = `instantiateSimpleDemogfxObject(${familyId}) INTO enroll.application = {}`
    /*doxNOTE*/enroll.notes.push(DOX)
    /*doxNOTE*/develObject.responseObject.notes.push(DOX)
     
    /*doxNOTE*/DOX = `ALL response into holder $w('#TXAREA') elements are being removed, rather use wixStorage instead`
    /*doxNOTE*/enroll.notes.push(DOX)
    /*doxNOTE*/develObject.responseObject.notes.push(DOX)

    
    if(typeof familyId !== 'string'){
        // ø <CODE for Below>
        let contactId_PARAM = 'ZXZ'
        let emailToFind_PARAM = 'ZXZ'
        let contactById = await steamdaGetContactFunction(contactId_PARAM);
        let contactByEmail = await steamdaGetContactByEmailFunction(emailToFind_PARAM);
        // ø </CODE for Below>
    }


    enroll.action = {}
    enroll.action.superEnrollmentStatus = 'CONTINUE';//local.getItem('superEnrollmentStatus')
    enroll.action.superEnrollmentString = 'INSTANTIATE';//local.getItem('superEnrollmentStatus')

    enroll.familyId = 'PENDING'
    enroll.familyIdStatus = 'PENDING'//'Staff-Eye-D'// inferred by Data, precision here not necessary
    enroll.maxPreviousFamilyTermId = 201506
    enroll.maxPreviousStudentTermId = 201506
    enroll.wixWebhookId = local.getItem('wixWebhookId')
    // ø <demogrfx-application-processed>
    enroll.application = {}
    enroll.application.termId = local.getItem('termId')
    enroll.application.staffIdentifiedFamilyId = local.getItem('staffIdentifiedFamilyId')
    enroll.application.familySeed = local.getItem('familySeed')
    enroll.application.primary = {}
    enroll.application.primary.familyId = local.getItem('familyId')
    enroll.application.primary.familyEmail = local.getItem('familyEmail')
    enroll.application.primary.ppFirst = local.getItem('ppFirst')
    enroll.application.primary.ppLast = local.getItem('ppLast')
    enroll.application.student = {}
    enroll.application.student.studentId = local.getItem('studentId')
    enroll.application.student.studentEmail = local.getItem('studentEmail')
    enroll.application.student.stFirst = local.getItem('stFirst')
    enroll.application.student.stPreferredFirst = local.getItem('stPreferredFirst')
    enroll.application.student.stLast = local.getItem('stLast')
    enroll.application.secondary = {}
    enroll.application.secondary.secondaryId = local.getItem('secondaryId')
    enroll.application.secondary.secondaryEmail = local.getItem('secondaryEmail')
    enroll.application.secondary.spFirst = local.getItem('spFirst')
    enroll.application.secondary.spLast = local.getItem('spLast')
    // // ø </demogrfx-application-processed>
    
     
    /*doxNOTE*/DOX = `enroll = {} instantiated`
    /*doxNOTE*/develObject.responseObject.notes.push(DOX)
      
    /*doxNOTE*/DOX = `enroll.appliocation = {} instantiated)`
    /*doxNOTE*/develObject.responseObject.notes.push(DOX)
      
    develObject.responseObject.enrollSOFAR = enroll
      
    // ø <familyPersonsObjectFRONTEND>
    // let familyPersonsObjectFRONTEND = await getFamilyPersonsObject_NotBackend(familyId)
      
    // /*doxNOTE*/DOX = `getFamilyPersonsObject_NotBackend(familyId)`
    // /*doxNOTE*/develObject.responseObject.notes.push(DOX)
    
    // /*doxNOTE*/DOX = `familyId,enroll.application.termId: ${typeof enroll.application.termId}: ${enroll.application.termId}`
    // /*doxNOTE*/develObject.responseObject.notes.push(DOX)
      
    // develObject.responseObject.familyPersonsObjectFRONTEND = familyPersonsObjectFRONTEND
    // ø </familyPersonsObjectFRONTEND>
      
    // ø <familyPersonsObjectBACKEND>
    let familyPersonsObject = await getFamilyPersonsObject(familyId,Number(enroll.application.termId))
      
    /*doxNOTE*/DOX = `getFamilyPersonsObject(familyId,enroll.application.termId)`
    /*doxNOTE*/develObject.responseObject.notes.push(DOX)
      
    develObject.responseObject.familyPersonsObjectBACKEND = familyPersonsObject
    // ø </familyPersonsObjectBACKEND>
     
    // console.log(`develObject:`)
    // console.dir(develObject)
    // console.groupEnd()
    // // return_develObject
    // return develObject

    local.setItem('familyPersonsObjectJSON', JSON.stringify(familyPersonsObject))
    // $w('#secondaryResponseTXTBX').value = JSON.stringify(familyPersonsObject,undefined,4)

    // await validateFamilyPersonsObject_NotBackend(familyPersonsObject)
    console.warn('≈308≈ validateFamilyPerson: COMMENTED OUT: OKAY: inside main getFamilyPersonsObject_NotBackend() ')
    DOX = '<MOVED TO JUST BELOW familyPersonObject RENDERED>'
    DOX = '¡WHICH is where it was origially before all the intervening code was placed between!'
    DOX = '¡SO this is, essentially, placing it back where it was originally!'
    console.log(`familyPersonsObject:`)
    console.dir(familyPersonsObject)
    enroll.action.superEnrollmentStatus = familyPersonsObject.validationObject.allDangerBooleansAreValid === true ? enroll.action.superEnrollmentStatus : 'ABORT'
    enroll.action.superEnrollmentString += familyPersonsObject.validationObject.allDangerBooleansAreValid === true ? '|allDangerBooleansAreValid' : '|allDangerBooleansAre_NOT_Valid'

    // ø <current-evaluation-personDbase-personData-wixWebhookId>
    // enroll.familyId = PENDING
    // enroll.familyIdStatus = 'PENDING'//'Staff-Eye-D' inferred by Data, precision here not necessary
    // enroll.maxPreviousTermIdFamily = 201506
    // enroll.maxPreviousTermIdStudent = 201506
    let holderErrorBOOLEAN = true
    let holderIdErrorString = `HOLDER`
    enroll.personData = {}
    enroll.confirmed = {}
    enroll.confirmed.familyId = familyPersonsObject.primaryPersonCount === 1 ? familyPersonsObject.familyId : unconfirmedString
    holderErrorBOOLEAN = enroll.confirmed.familyId === unconfirmedString ? true : false
    holderIdErrorString = `Family-ID Error`
    enroll.confirmed.familyEmail = holderErrorBOOLEAN ? holderIdErrorString : familyPersonsObject.primaryMemberObjectsById[enroll.confirmed.familyId]['personContactEmail']
    enroll.confirmed.familyMaxTermId = familyPersonsObject.primaryTermIdMax
    enroll.confirmed.familyUpToDate = familyPersonsObject.primaryIsUpToDate
    enroll.confirmed.studentId = unconfirmedString
    enroll.confirmed.studentEmail = unconfirmedString
    enroll.confirmed.studentMaxTermId = 201506
    enroll.confirmed.studentUpToDate = false
    enroll.confirmed.secondaryId = familyPersonsObject.secondaryPersonCount === 1 ? familyPersonsObject.secondaryId : unconfirmedString
    holderErrorBOOLEAN = enroll.confirmed.secondaryId === unconfirmedString ? true : false
    holderIdErrorString = `Secondary-ID Error`
    enroll.confirmed.secondaryEmail = holderErrorBOOLEAN ? holderIdErrorString : familyPersonsObject.secondaryMemberObjectsById[enroll.confirmed.secondaryId]['personContactEmail']
    enroll.confirmed.secondaryMaxTermId = familyPersonsObject.secondaryTermIdMax
    enroll.confirmed.secondaryUpToDate = familyPersonsObject.secondaryIsUpToDate
    enroll.personData.primary = {}
    enroll.personData.primary.familyId = 'FROM_familyDataObject'
    enroll.personData.primary.maxTermId = 'FROM_familyDataObject'
    enroll.personData.student = {}
    enroll.personData.student.studentId = 'FROM_familyDataObject'
    enroll.personData.student.maxTermId = 'FROM_familyDataObject'
    enroll.personData.secondary = {}
    enroll.personData.secondary.secondaryId = 'FROM_familyDataObject'
    enroll.personData.secondary.maxTermId = 'FROM_familyDataObject'
    // ø </current-evaluation-personDbase-personData-wixWebhookId>
    DOX = '</MOVED TO JUST BELOW familyPersonObject RENDERED>'
    
    let doQueryPrimaryApplicationEmail = false
    let doGatherStudentFromFamilyPersonObject = false
    let doQueryStudentEmail = false
    let doQueryStudentEmailKludge = false
    /*doxNOTE*/DOX = `<do-Booleans>`
    /*doxNOTE*/enroll.notes.push(DOX)
    
    doQueryPrimaryApplicationEmail = familyPersonsObject.primaryId.length < 30 ? true: false
    /*doxNOTE*/DOX = `familyPersonsObject.primaryId.length['${familyPersonsObject.primaryId.length}'] < 30 => doQueryPrimaryApplicationEmail = ${doQueryPrimaryApplicationEmail}`
    /*doxNOTE*/enroll.notes.push(DOX)

    doGatherStudentFromFamilyPersonObject = familyPersonsObject.studentFirstArray.includes(enroll.application.student.stFirst) ? true : false 
    doGatherStudentFromFamilyPersonObject = /*OOAAOC*/ familyPersonsObject.studentFirstArray.includes(enroll.application.student.stPreferredFirst) ? true : doGatherStudentFromFamilyPersonObject 
    /*doxNOTE*/DOX = `familyPersonsObject.studentFirstArray.includes(enroll.application.student.stFirst) => ['${familyPersonsObject.studentFirstArray}']-includes('${enroll.application.student.stFirst}') => doGatherStudentFromFamilyPersonObject = ${doGatherStudentFromFamilyPersonObject}`
    /*doxNOTE*/enroll.notes.push(DOX)


    doQueryStudentEmail = !doGatherStudentFromFamilyPersonObject
    /*doxNOTE*/DOX = `doQueryStudentEmail = !doGatherStudentFromFamilyPersonObject => doQueryStudentEmail = ${doQueryStudentEmail}`
    /*doxNOTE*/enroll.notes.push(DOX)
    doQueryStudentEmailKludge = doQueryStudentEmail
    /*doxNOTE*/DOX = `doQueryStudentEmailKludge = doQueryStudentEmail => doQueryStudentEmailKludge = ${doQueryStudentEmailKludge}`
    /*doxNOTE*/enroll.notes.push(DOX)
    /*doxNOTE*/DOX = `</do-Booleans>`
    /*doxNOTE*/enroll.notes.push(DOX)
    let doProcess_primaryParentByEmail = false
    let doProcess_studentByEmail = false
    let primaryParentByEmail = {}
    if(doQueryPrimaryApplicationEmail){
        // /*doxNOTE*/DOX = `Query Primary-Application-Email IS PENDING => doQueryPrimaryApplicationEmail = ${doQueryPrimaryApplicationEmail}`
        // /*doxNOTE*/enroll.notes.push(DOX)
        primaryParentByEmail = await steamdaGetContactByEmailFunction(local.getItem('familyEmail'))
        if(primaryParentByEmail.resultsCount > 1){
            enroll.action.superEnrollmentStatus = 'ABORT'
            enroll.action.superEnrollmentString += '|Gather Student from familyPersonObject IS PENDING'
            return
        }
        if(primaryParentByEmail.resultsCount === 1){
            doProcess_primaryParentByEmail = true
            console.groupCollapsed(`doQueryPrimaryApplicationEmail === 1:`)
            console.dir(primaryParentByEmail)
            console.groupEnd()
            /*doxNOTE*/DOX = `SEE console.log() => primaryParentByEmail.resultsCount === ${primaryParentByEmail.resultsCount}`
            /*doxNOTE*/enroll.notes.push(DOX)
            $w('#tertiaryResponseTXTBX').value = JSON.stringify(primaryParentByEmail,undefined,4)
        }else{
            /*doxNOTE*/DOX = `primaryParentByEmail.resultsCount === ${primaryParentByEmail.resultsCount}`
            /*doxNOTE*/enroll.notes.push(DOX)
        }
    }
 
    if(doGatherStudentFromFamilyPersonObject){
        //     enroll.application.student.stFirst = local.getItem('stFirst')
        // enroll.application.student.stPreferredFirst = local.getItem('stPreferredFirst')

        let elementArray = []
        let doGatherMaxTermId = 'PENDING';
        let doGatherPersonId = 'PENDING';
        for (let index = 0; index < familyPersonsObject.studentFirstTermId2dArray.length; index++) {
            elementArray = familyPersonsObject.studentFirstTermId2dArray[index];
            if(enroll.application.student.stFirst === elementArray[0] || enroll.application.student.stPreferredFirst === elementArray[0]){
                doGatherMaxTermId = elementArray[1];
                doGatherPersonId = elementArray[2];
            }
            
        }
        if (doGatherMaxTermId === 'PENDING' || doGatherPersonId === 'PENDING') {
            /*doxNOTE*/DOX = `Gather Student from familyPersonObject FAILED => familyPersonsObject.studentFirstTermId2dArray[i][0] did NOT include ${enroll.application.student.stFirst}`
            /*doxNOTE*/enroll.notes.push(DOX)
            enroll.action.superEnrollmentStatus = 'ABORT'
            enroll.action.superEnrollmentString += '|Gather Student from familyPersonObject FAILED [studentFirstTermId2dArray]'
            doGatherStudentFromFamilyPersonObject = false
        }
 
        if(doGatherStudentFromFamilyPersonObject){
            if (typeof familyPersonsObject.studentMemberObjectsById[doGatherPersonId] !== 'object' || doGatherPersonId !== familyPersonsObject.studentMemberObjectsById[doGatherPersonId]['contactId']) {
                // ø <SHOULD BE IMPOSSIBLE>
                /*doxNOTE*/DOX = `Gather Student from familyPersonObject FAILED => doGatherPersonId ['${doGatherPersonId}'] does NOT match familyPersonsObject.studentMemberObjectsById[doGatherPersonId]['contactId']`
                /*doxNOTE*/enroll.notes.push(DOX)
                enroll.action.superEnrollmentStatus = 'ABORT'
                enroll.action.superEnrollmentString += '|Gather Student from familyPersonObject FAILED [doGatherPersonId MisMatch]'
                doGatherStudentFromFamilyPersonObject = false
                // ø </SHOULD BE IMPOSSIBLE>
            }
        }
 
        if(doGatherStudentFromFamilyPersonObject){
            // /*doxNOTE*/DOX = `Gather Student from familyPersonObject IS PENDING => doGatherStudentFromFamilyPersonObject = ${doGatherStudentFromFamilyPersonObject}`
            // /*doxNOTE*/enroll.notes.push(DOX)
            // enroll.action.superEnrollmentStatus = 'ABORT'
            // enroll.action.superEnrollmentString += '|Gather Student from familyPersonObject IS PENDING'
            enroll.confirmed.studentId = familyPersonsObject.studentMemberObjectsById[doGatherPersonId]['contactId']
            enroll.confirmed.studentEmail = familyPersonsObject.studentMemberObjectsById[doGatherPersonId]['personContactEmail']
            enroll.confirmed.studentMaxTermId = familyPersonsObject.studentMemberObjectsById[doGatherPersonId]['termIdMax']
            enroll.confirmed.studentUpToDate = enroll.confirmed.studentMaxTermId === Number(local.getItem('termId')) ? true : enroll.confirmed.studentUpToDate

        }

    }
 
    let studentEmail = local.getItem('studentEmail')
    let studentByEmail = {}
    if(doQueryStudentEmail){
        // /*doxNOTE*/DOX = `Query Student-Auto-Email IS PENDING => doQueryStudentEmail = ${doQueryStudentEmail}`
        // /*doxNOTE*/enroll.notes.push(DOX)
    
        /*doxNOTE*/DOX = `steamdaGetContactByEmailFunction(${studentEmail})`
        /*doxNOTE*/enroll.notes.push(DOX)
        studentByEmail = await steamdaGetContactByEmailFunction(studentEmail)
        if(studentByEmail.resultsCount > 1){
            enroll.action.superEnrollmentStatus = 'ABORT'
            enroll.action.superEnrollmentString += '|Gather Student from familyPersonObject IS PENDING'
            return
        }
        if(studentByEmail.resultsCount === 1){
            doProcess_studentByEmail = true
            doQueryStudentEmailKludge = false
            /*doxNOTE*/DOX = `SEE console.log() => studentByEmail.resultsCount === ${studentByEmail.resultsCount}`
            /*doxNOTE*/enroll.notes.push(DOX)
            /*doxNOTE*/DOX = `studentByEmail.resultsCount === ${studentByEmail.resultsCount} => doQueryStudentEmailKludge = ${doQueryStudentEmailKludge}`
            /*doxNOTE*/enroll.notes.push(DOX)
            $w('#quaternaryResponseTXTBX').value = JSON.stringify(studentByEmail,undefined,4)
        }else{
            /*doxNOTE*/DOX = `studentByEmail.resultsCount === ${studentByEmail.resultsCount}`
            /*doxNOTE*/enroll.notes.push(DOX)
        }
    }
 
    if(doQueryStudentEmailKludge){
        // /*doxNOTE*/DOX = `Query Student-Auto-Email-KLUDGE IS PENDING => doQueryStudentEmailKludge = ${doQueryStudentEmailKludge}`
        // /*doxNOTE*/enroll.notes.push(DOX)

        DOX = (enroll.application.familySeed).substr(0,4) + '@'
        studentEmail = studentEmail.replace(DOX,'eemp@')
        /*doxNOTE*/DOX = `steamdaGetContactByEmailFunction(${studentEmail})`
        /*doxNOTE*/enroll.notes.push(DOX)
        studentByEmail = await steamdaGetContactByEmailFunction(studentEmail)
        if(studentByEmail.resultsCount > 1){
            enroll.action.superEnrollmentStatus = 'ABORT'
            enroll.action.superEnrollmentString += '|Gather Student from familyPersonObject IS PENDING'
            return
        }
        if(studentByEmail.resultsCount === 1){
            doProcess_studentByEmail = true
            console.groupCollapsed(`doQueryStudentEmailKludge === 1:`)
            console.dir(studentByEmail)
            console.groupEnd()
            /*doxNOTE*/DOX = `SEE console.log() => [KLUDGE] studentByEmail.resultsCount === ${studentByEmail.resultsCount}`
            /*doxNOTE*/enroll.notes.push(DOX)
            $w('#quaternaryResponseTXTBX').value = JSON.stringify(studentByEmail,undefined,4)
        }else{
            /*doxNOTE*/DOX = `[KLUDGE] studentByEmail.resultsCount === ${studentByEmail.resultsCount}`
            /*doxNOTE*/enroll.notes.push(DOX)
        }
    }
 
    if(doProcess_primaryParentByEmail){
        /*doxNOTE*/DOX = `Process Primary-Parent-By-Email IS PENDING: doProcess_primaryParentByEmail === ${doProcess_primaryParentByEmail}`
        /*doxNOTE*/enroll.notes.push(DOX)
        
        enroll.confirmed.familyId = primaryParentByEmail.results._items[0]._id
        enroll.confirmed.familyEmail = primaryParentByEmail.results._items[0].primaryInfo.email
 
    }
    if(doProcess_studentByEmail){
        /*doxNOTE*/DOX = `doProcess_studentByEmail IS PENDING: doProcess_studentByEmail === ${doProcess_studentByEmail}`
        /*doxNOTE*/enroll.notes.push(DOX)
        
        enroll.confirmed.studentId = studentByEmail.results._items[0]._id
        enroll.confirmed.studentEmail = studentByEmail.results._items[0].primaryInfo.email
 
    }


    // ø <>
    // ø <Ecapsulated Queries>
    // ø <ENCAPSULATED QUERIES>
 
    // DOX = 'PrimaryParent:\n---\nById:\n---\n'
    // let primaryParentId = local.getItem('staffIdentifiedFamilyId')
    // let primaryParentById = await steamdaGetContactFunction(primaryParentId)
    // $w('#tertiaryResponseTXTBX').value = JSON.stringify(primaryParentById,undefined,4)
 
    // DOX = 'PrimaryParent:\n---\nByEmail:\n---\n'
    // let primaryParentEmail = local.getItem('familyEmail')
    // let primaryParentByEmail = await steamdaGetContactByEmailFunction(primaryParentEmail)
    // $w('#quaternaryResponseTXTBX').value = JSON.stringify(primaryParentByEmail,undefined,4)
 
 
    // DOX = 'Student:\n---\nById:\n---\n'
    // let studentId = 'c90f23aa-2838-4e4e-9135-3995d25c5eb3'
    // let studentById = await steamdaGetContactFunction(studentId)
    // DOX += JSON.stringify(studentById,undefined,4)
    // $w('#tertiaryResponseTXTBX').value = DOX
  
    // let studentEmail = local.getItem('studentEmail')
    // DOX = `Student:\n---\nByEmail:\nsteamdaGetContactByEmailFunction(${studentEmail})\n---\n`
    // let studentByEmail = await steamdaGetContactByEmailFunction(studentEmail)
    // DOX += JSON.stringify(studentByEmail,undefined,4)
    // $w('#tertiaryResponseTXTBX').value = DOX
 
    // DOX = familyId.substr(0,4) + '@'
    // studentEmail = studentEmail.replace(DOX,'eemp@')
    // DOX = `Student:\n---\nByEmailKludge:\nsteamdaGetContactByEmailFunction(${studentEmail})\n---\n`
    // studentByEmail = await steamdaGetContactByEmailFunction(studentEmail)
    // DOX += JSON.stringify(studentByEmail,undefined,4)
    // $w('#quaternaryResponseTXTBX').value = DOX
 
    // ø </ENCAPSULATED QUERIES>
    // ø </Ecapsulated Queries>
    // ø </>

    DOX = '<MOVED TO JUST BELOW familyPersonObject RENDERED>'
    // console.log(`familyPersonsObject:`)
    // console.dir(familyPersonsObject)
    // enroll.action.superEnrollmentStatus = familyPersonsObject.validationObject.allDangerBooleansAreValid === true ? enroll.action.superEnrollmentStatus : 'ABORT'
    // enroll.action.superEnrollmentString += familyPersonsObject.validationObject.allDangerBooleansAreValid === true ? '|allDangerBooleansAreValid' : '|allDangerBooleansAre_NOT_Valid'

    // // ø <current-evaluation-personDbase-personData-wixWebhookId>
    // // enroll.familyId = PENDING
    // // enroll.familyIdStatus = 'PENDING'//'Staff-Eye-D' inferred by Data, precision here not necessary
    // // enroll.maxPreviousTermIdFamily = 201506
    // // enroll.maxPreviousTermIdStudent = 201506
    // enroll.personData = {}
    // enroll.confirmed = {}
    // enroll.confirmed.familyId = familyPersonsObject.primaryPersonCount === 1 ? familyPersonsObject.familyId : unconfirmedString
    // enroll.confirmed.familyEmail = unconfirmedString
    // enroll.confirmed.familyMaxTermId = 201506
    // enroll.confirmed.familyUpToDate = familyPersonsObject.primaryPersonCount === 1 ? true : false
    // enroll.confirmed.studentId = unconfirmedString
    // enroll.confirmed.studentEmail = unconfirmedString
    // enroll.confirmed.studentMaxTermId = 201506
    // enroll.confirmed.studentUpToDate = false
    // enroll.confirmed.studentId = unconfirmedString
    // enroll.confirmed.studentEmail = unconfirmedString
    // enroll.confirmed.studentMaxTermId = unconfirmedString
    // enroll.confirmed.studentUpToDate = false
    // enroll.personData.primary = {}
    // enroll.personData.primary.familyId = 'FROM_familyDataObject'
    // enroll.personData.primary.maxTermId = 'FROM_familyDataObject'
    // enroll.personData.student = {}
    // enroll.personData.student.studentId = 'FROM_familyDataObject'
    // enroll.personData.student.maxTermId = 'FROM_familyDataObject'
    // enroll.personData.secondary = {}
    // enroll.personData.secondary.secondaryId = 'FROM_familyDataObject'
    // enroll.personData.secondary.maxTermId = 'FROM_familyDataObject'
    // ø </current-evaluation-personDbase-personData-wixWebhookId>
    DOX = '</MOVED TO JUST BELOW familyPersonObject RENDERED>'
    
    // ø <contacts-directQuery-emailQuery-emailQueryWithKludge>
    // enroll.familyId = PENDING
    // enroll.familyIdStatus = 'PENDING'//'Staff-Eye-D' inferred by Data, precision here not necessary
    DOX = '</ this Block ¿IS MOOT?: enroll.emailQuery = {}>'
    enroll.emailQuery = {}
    // enroll.emailQuery.primary.familyId = 'FROM_familyDataObject_OR_FROM_emailQuery'
    enroll.emailQuery.familyId = 'FROM_familyDataObject_OR_FROM_emailQuery'
    // enroll.emailQuery.student.studentId = 'FROM_familyDataObject_OR_FROM_emailQuery'
    enroll.emailQuery.studentId = 'FROM_familyDataObject_OR_FROM_emailQuery'
    // enroll.emailQuery.secondary.secondaryId = 'FROM_familyDataObject_OR_FROM_emailQuery'
    enroll.emailQuery.secondaryId = 'FROM_familyDataObject_OR_FROM_emailQuery'
    // ø <DATA FOR THE QUERY(IES)>
    // enroll.emailQuery.primary.familyEmail = enroll.application.familyEmail
    enroll.emailQuery.familyEmail = enroll.application.familyEmail
    // enroll.emailQuery.student.studentEmail = enroll.application.studentEmail
    enroll.emailQuery.studentEmail = enroll.application.studentEmail
    // let studentEmailKludge = enroll.application.student.studentEmail
    // console.log(`studentEmailKludge: ${studentEmailKludge}`)
    console.log(`replaceBlock: indexOf ${(enroll.application.student.studentEmail).indexOf('@')}`)
    console.log(`replaceBlock: substr(START: ${(enroll.application.student.studentEmail).indexOf('@')-4}`)
    let replaceBlock = (enroll.application.student.studentEmail).substr((enroll.application.student.studentEmail).indexOf('@') - 4,5)
    console.log(`replaceBlock: replaceBlock: ${replaceBlock}`)
    // enroll.emailQuery.student.studentEmailKludge = (enroll.application.studentEmail).replace(replaceBlock, 'eemp@')
    enroll.emailQuery.studentEmailKludge = (enroll.application.student.studentEmail).replace(replaceBlock, 'eemp@')
    console.log(`enroll.emailQuery.studentEmailKludge: ${enroll.emailQuery.studentEmailKludge}`)
    // ø </DATA FOR THE QUERY(IES)>
    DOX = '< this Block ¿IS MOOT?: enroll.emailQuery = {}>'
    // ø </contacts-directQuery-emailQuery-emailQueryWithKludge>
    
    // ø <action-actionEvaluation-final>
    // enroll.familyId = PENDING
    // enroll.familyIdStatus = 'PENDING'//'Staff-Eye-D' inferred by Data, precision here not necessary
    // enroll.maxPreviousTermIdFamily = 201506
    // enroll.maxPreviousTermIdStudent = 201506

    // ø <enroll.action AT TOP for superEnrollmentStatsu>
    // ø enroll.action = {}
    // ø enroll.action.superEnrollmentStatus = 'PENDING';//local.getItem('superEnrollmentStatus')
    // ø </enroll.action AT TOP for superEnrollmentStatsu>
    
    // memory.getItem('ppAction'): null
    // memory.getItem('stAction'): null
    // memory.getItem('spAction'): null
    
    enroll.action.primary = {}
    enroll.action.primary.member = 'PENDING_LOGIC'
    enroll.action.primary.contact = 'PENDING_LOGIC'
    enroll.action.primary.dataBase = 'PENDING_LOGIC'
    enroll.action.primary.ppAction = 'PENDING|PENDING|PENDING'
    // enroll.emailQuery.primary.familyId = 'DANGER'
    // enroll.action.primary.familyId = enroll.application.familyId
    enroll.action.student = {}
    enroll.action.student.member = 'PENDING_LOGIC'
    enroll.action.student.contact = 'PENDING_LOGIC'
    enroll.action.student.dataBase = 'PENDING_LOGIC'
    enroll.action.student.stAction = 'PENDING|PENDING|PENDING'
    // enroll.action.student.studentId = enroll.application.studentId
    // enroll.emailQuery.student.studentId = 'DANGER'
    enroll.action.secondary = {}
    enroll.action.secondary.member = 'PENDING_LOGIC_but_NA'
    enroll.action.secondary.contact = 'PENDING_LOGIC'
    enroll.action.secondary.dataBase = 'PENDING_LOGIC'
    enroll.action.secondary.spAction = 'PENDING|PENDING|PENDING'
    // enroll.emailQuery.secondary.secondaryId = 'DANGER'
    // enroll.action.secondary.secondaryId = enroll.application.secondaryId
    // ø <SAME AS APPLICATION: update if different>
    // ø <>
    console.groupEnd()

    DOX = '<FINAL: enroll.action By Confirmed>'
    // enroll.action.primary = {}
    enroll.action.primary.member = (enroll.confirmed.familyId).length > 30 ? 'SKIP' : 'INSERT'
    enroll.action.primary.contact = enroll.confirmed.familyUpToDate ? 'SKIP' : 'UPDATE'
    enroll.action.primary.dataBase = enroll.confirmed.familyUpToDate ? 'SKIP' : 'INSERT'
    enroll.action.primary.ppAction = enroll.action.primary.member + '|' + enroll.action.primary.contact + '|' + enroll.action.primary.dataBase
    enroll.action.primary.ppAction = enroll.action.superEnrollmentStatus !== 'CONTINUE' ? enroll.action.superEnrollmentStatus + '|' + enroll.action.superEnrollmentStatus + '|' + enroll.action.superEnrollmentStatus: enroll.action.primary.ppAction

    // enroll.action.student = {}
    enroll.action.student.member = (enroll.confirmed.studentId).length > 30 ? 'SKIP' : 'INSERT'
    enroll.action.student.contact = enroll.confirmed.studentUpToDate ? 'SKIP' : 'UPDATE'
    enroll.action.student.dataBase = enroll.confirmed.studentUpToDate ? 'SKIP' : 'INSERT'
    enroll.action.student.stAction = enroll.action.student.member + '|' + enroll.action.student.contact + '|' + enroll.action.student.dataBase
    enroll.action.student.stAction = enroll.action.superEnrollmentStatus !== 'CONTINUE' ? enroll.action.superEnrollmentStatus + '|' + enroll.action.superEnrollmentStatus + '|' + enroll.action.superEnrollmentStatus: enroll.action.student.stAction

    // enroll.action.secondary = {}
    let possibleNULLvalueArray = ['NULL', 'EMPTY', 'PENDING', 'NA', 'UNCONFIRMED', 'NNULL', 'EEMPTY', 'PPENDING', 'NNA', 'UUNCONFIRMED']
    let secondaryFirstIsValid = !possibleNULLvalueArray.includes((enroll.application.secondary.spFirst).toUpperCase())
    secondaryFirstIsValid = secondaryFirstIsValid && (enroll.application.secondary.spFirst).length > 0
    let secondaryIsPerson = (enroll.confirmed.secondaryId).length > 30 ? true : false
    let secondaryIsUpToDate = enroll.confirmed.secondaryUpToDate
    enroll.action.secondary.member = 'NA' // ALWAYS 'NA'
    enroll.action.secondary.contact = secondaryFirstIsValid ? 'UPSERT' : 'PENDING'
    enroll.action.secondary.contact = secondaryIsPerson ? 'UPDATE' : enroll.action.secondary.contact
    enroll.action.secondary.contact = secondaryIsUpToDate ? 'SKIP' : enroll.action.secondary.contact
    enroll.action.secondary.contact = enroll.action.secondary.contact === 'UPSERT' ? 'INSERT' : enroll.action.secondary.contact
    enroll.action.secondary.contact = enroll.action.secondary.contact === 'PENDING' ? 'SKIP' : enroll.action.secondary.contact
    enroll.action.secondary.dataBase = enroll.action.secondary.contact === 'UPDATE' ? 'INSERT' : enroll.action.secondary.contact
    enroll.action.secondary.spAction = enroll.action.secondary.member + '|' + enroll.action.secondary.contact + '|' + enroll.action.secondary.dataBase
    enroll.action.secondary.spAction = enroll.action.superEnrollmentStatus !== 'CONTINUE' ? enroll.action.superEnrollmentStatus + '|' + enroll.action.superEnrollmentStatus + '|' + enroll.action.superEnrollmentStatus: enroll.action.secondary.spAction
    DOX = '</FINAL: enroll.action By Confirmed>'
    // return
    enroll.action.termId = enroll.application.termId
    enroll.action.familySeed = 'PENDING'//enroll.application.familySeed
    // enroll.action.familySeed = enroll.application.familySeed
    // enroll.action.primary = {}
    enroll.action.primary.familyEmail = enroll.application.primary.familyEmail
    enroll.action.primary.ppFirst = enroll.application.primary.ppFirst
    enroll.action.primary.ppLast = enroll.application.ppLast
    // enroll.action.student = {}
    enroll.action.student.studentEmail = enroll.application.student.studentEmail
    enroll.action.student.stFirst = enroll.application.student.stFirst
    enroll.action.student.stPreferredFirst = enroll.application.student.stPreferredFirst
    enroll.action.student.stLast = enroll.application.student.stLast
    // enroll.action.secondary = {}
    enroll.action.secondary.secondaryEmail = enroll.application.secondary.secondaryEmail
    enroll.action.secondary.spFirst = enroll.application.secondary.spFirst
    enroll.action.secondary.spLast = enroll.application.secondary.spLast
    // ø </>
    // ø </SAME AS APPLICATION: update if different>
    // ø </action-actionEvaluation-final>
    local.setItem('enrollObjectJSON', JSON.stringify(enroll))
    local.setItem('lastDevelObject', JSON.stringify(develObject))

    return enroll
}
// ø <-------------------- </instantiateEnrollmentObject> -------------------->


// ø <==========================================================================================>
// ø <============================== </familyPersonsObject_GROUP> ==============================>
// ø <==========================================================================================>
// ø <==========================================================================================>
// ø <============================== </familyPersonsObject_GROUP> ==============================>
// ø <==========================================================================================>

export async function dataQueryPerson_filterByFamilyId_NotBackend(familyId = 'STRING'){
	// familyId = 'b63c40a1-076a-4e23-9d92-74e985caba9a'
    let query = await wixData.query("person")
    .eq("familyId", familyId)
    // .eq("role", 'Student')
    // .gt("age", 25)
    .descending("_createdDate")
    // .limit(10)
    .find()
	return query
}
export async function dataQueryPerson_byRecordId(recordId = 'STRING'){
	recordId = '54d7e15a-62a4-4cf3-8abe-ff18e2a0ce79'
	let item = await wixData.get("person", recordId)
	// ø <LIMIT fields for clarity>
	delete item.objectData
	delete item.objectCorollary
	delete item.idBL
	delete item.idHH
	delete item.webhookId
	delete item.altPersonId
	delete item.fullName
	delete item.lastFirst
	delete item.comboName
	delete item._owner
	delete item._id
	// ø </LIMIT fields for clarity>

	return item
}


// ø <==========================================================================>
// ø <============================== <Utilities>  ==============================>
// ø <==========================================================================>

// ø <============================== <FROM PostEnrollment>  ==============================>
// ø <---------- <doSimpleDemogrfxAssignment - ON_READY> ---------->
export async function doSimpleDemogrfxAssignment(){
    // ø <--->
    // ø <added 20210909>
    // ø <Simple Demogrfx Assignment to local-Storage upon OnRamp>
        // ø updated 20210926
    // ø   - familySeed,studentEmail
    // ø updated 20210927
    // ø   - actionValueEvaluation dependent values set to 'EEMPTY' so no null-fuss
    // let actionValueNonNullLocalKeyArray_FULL = ['staffIdentifiedFamilyId','familySeed','familyId','studentId','secondaryId','familyEmail','studentEmail','secondaryEmail','ppFirst','ppLast','stFirst','stPreferredFirst','stLast','spFirst','spLast','ppRevision','stRevision'];
    let actionValueNonNullLocalKeyArray /*SUFFICIENT*/ = ['familyId','studentId','secondaryId','studentEmail','secondaryEmail'];
    let actionValueNonNullMemoryKeyArray /*SUFFICIENT*/ = ['ppRevision','stRevision'];
    let actionValueNonNullAllKeyArray /*SUFFICIENT*/ = actionValueNonNullLocalKeyArray.concat(actionValueNonNullMemoryKeyArray)
    let tempBoolean = false
    actionValueNonNullAllKeyArray.forEach(key => {
        // console.log(key);
        if(actionValueNonNullLocalKeyArray.includes(key)){
            tempBoolean = local.getItem(key) == null ? true : false;
            if (tempBoolean) {
                local.setItem(key,'EEMPTY')
            }
        }
        if(actionValueNonNullMemoryKeyArray.includes(key)){
            tempBoolean = memory.getItem(key) == null ? true : false;
            if (tempBoolean) {
                memory.setItem(key,'EEMPTY')
            }
        }

    });

    let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));
    // local.setItem('superEnrollmentStatus', enrollmentObject.descr);
    local.setItem('staffIdentifiedFamilyId', enrollmentObject.family.parent.primary.memberId);
    // ø <same code as below>
        let familySeed = enrollmentObject.family.parent.primary.memberId;
    // in stMemberPrepJSON()
        familySeed = familySeed.replace('-', '');
        familySeed = familySeed.replace('-', '');
        familySeed = familySeed.replace('-', '');
        familySeed = familySeed.replace('-', '');
        local.setItem('familySeed', familySeed);
    // ø </same code as below>
    // local.setItem('familySeed', enrollmentObject.descr);
    // local.setItem('familyId', enrollmentObject.descr);
    // local.setItem('studentId', enrollmentObject.descr);
    // local.setItem('secondaryId', enrollmentObject.descr);
    local.setItem('familyEmail', enrollmentObject.family.emails[0].email);
    // local.setItem('studentEmail', enrollmentObject.descr);
    // local.setItem('secondaryEmail', enrollmentObject.descr);
    local.setItem('ppFirst', enrollmentObject.family.parent.primary.first);
    local.setItem('ppLast', enrollmentObject.family.parent.primary.last);
    local.setItem('stFirst', enrollmentObject.family.student.name.first);
    local.setItem('stPreferredFirst', enrollmentObject.family.student.name.preferred);
    local.setItem('stLast', enrollmentObject.family.student.name.last);
    // ø <same code as below>
    // in stMemberPrepJSON()
        let email = enrollmentObject.family.student.name.first;
        let firstSpace = email.indexOf(' ');
        email = firstSpace > 0 ? email.substr(0, firstSpace) : email;
        email += local.getItem('familySeed').substr(0, 4);//should be identical to above, 
        email = 'steamdiscoveryacademy' + '+' + email + '@gmail.com';
        email = email.toLowerCase();
        local.setItem('studentEmail', email);
    // ø </same code as below>
    let spFirst = "";
    let spLast = "";
    let spAny = typeof enrollmentObject.family.parent.secondary === 'undefined' ? false : true;
    if (spAny) {
        spFirst = typeof enrollmentObject.family.parent.secondary.first === 'string' ? enrollmentObject.family.parent.secondary.first : "";
        spLast = typeof enrollmentObject.family.parent.secondary.last === 'string' ? enrollmentObject.family.parent.secondary.last : "";
        if (spLast.length === 0 && spFirst.length > 0) {
            spLast = local.getItem('ppLast');
        }
    }
    local.setItem('spFirst', spFirst);
    local.setItem('spLast', spLast);
    local.setItem('comboName', enrollmentObject.family.student.name.studentParentCombo);

    $w('#ppNameBTN').label = local.getItem('ppLast') + ',\n' + local.getItem('ppFirst')
    $w('#stNameBTN').label = local.getItem('stLast') + ',\n' + local.getItem('stFirst')
    $w('#spNameBTN').label = local.getItem('spLast') + ',\n' + local.getItem('spFirst')
    // ø </Simple Demogrfx Assignment to local-Storage upon OnRamp>
    // ø </added 20210909>
    // ø </...>
}
// ø <---------- </doSimpleDemogrfxAssignment - ON_READY> ---------->
// ø <============================== </FROM PostEnrollment> ==============================>

export function copyToClipboard(string = 'STRING'){
	wixWindow.copyToClipboard(string)
  	.then( () => {
    	// handle case where text was copied
  	} )
  	.catch( (err) => {
    // handle case where an error occurred
  	} );
}


export function populateOriginalActionValueButtons(){
    console.groupCollapsed(`populateOriginalActionValueButtons()`)
    console.log(`export function populateOriginalActionValueButtons()`)

    let responseString = `session.getItem('ppAction'): ${session.getItem('ppAction')}\n`;
    responseString += `session.getItem('stAction'): ${session.getItem('stAction')}\n`;
    responseString += `session.getItem('spAction'): ${session.getItem('spAction')}`;
    $w('#secondaryResponseTXTBX').value = responseString


    let origIdArray = ['#OppMemberBTN','#OppContactBTN','#OppDbaseBTN','#OstMemberBTN','#OstContactBTN','#OstDbaseBTN','#OspMemberBTN','#OspContactBTN','#OspDbaseBTN']
    console.log(`origIdArray:`)
    console.dir(origIdArray)
    let origValuePipedArray = session.getItem('ppAction') + '|' + session.getItem('stAction') + '|' + session.getItem('spAction')
    console.log(`origValuePipedArray: ${origValuePipedArray}`)
    let origValueArray = origValuePipedArray.split('|')
    console.log(`origValueArray:`)
    console.dir(origValueArray)
    let buttonId = '';
    for (let index = 0; index < origIdArray.length; index++) {
        buttonId = origIdArray[index];
        if (typeof origValueArray[index] === 'string' && origValueArray[index] !== 'null') {
            console.log(`$w(${buttonId}).label = origValueArray[${index}] =>`)
            console.log(`${$w(buttonId).label} = ${origValueArray[index]}`)
            $w(buttonId).label = origValueArray[index]
        }
    }
}
export function populateNewActionValueButtons(action = {}){
    console.groupCollapsed(`populateNewActionValueButtons()`)
    console.log(`export function populateNewActionValueButtons()`)

    // let responseString = `session.getItem('ppAction'): ${session.getItem('ppAction')}\n`;
    // responseString += `session.getItem('stAction'): ${session.getItem('stAction')}\n`;
    // responseString += `session.getItem('spAction'): ${session.getItem('spAction')}`;
    // $w('#secondaryResponseTXTBX').value = responseString


    // let origIdArray = ['#OppMemberBTN','#OppContactBTN','#OppDbaseBTN','#OstMemberBTN','#OstContactBTN','#OstDbaseBTN','#OspMemberBTN','#OspContactBTN','#OspDbaseBTN']
    let newIdArray = ['#NppMemberBTN','#NppContactBTN','#NppDbaseBTN','#NstMemberBTN','#NstContactBTN','#NstDbaseBTN','#NspMemberBTN','#NspContactBTN','#NspDbaseBTN']

    console.log(`newIdArray:`)
    console.dir(newIdArray)
    let newValuePipedArray = action.primary.ppAction + '|' + action.student.stAction + '|' + action.secondary.spAction
    console.log(`newValuePipedArray: ${newValuePipedArray}`)
    let newValueArray = newValuePipedArray.split('|')
    console.log(`newValueArray:`)
    console.dir(newValueArray)
    let buttonId = '';
    for (let index = 0; index < newIdArray.length; index++) {
        buttonId = newIdArray[index];
        if (typeof newValueArray[index] === 'string' && newValueArray[index] !== 'null') {
            console.log(`$w(${buttonId}).label = origValueArray[${index}] =>`)
            console.log(`${$w(buttonId).label} = ${newValueArray[index]}`)
            $w(buttonId).label = newValueArray[index]
        }
    }
}
// ø <==========================================================================>
// ø <============================== </Utilities> ==============================>
// ø <==========================================================================>


// ø <=============================================================================>
// ø <============================== <Just Buttons>  ==============================>
// ø <=============================================================================>

export async function familyPersonQueryBTN_click(event) {
    // ø OVERLOAD: Instantiate Enrollment Object
	if(($w('#familyIdINPT').value).length < 32){
		$w('#develRawTXTBX').value = 'INVALID FAMILY ID: please try again or ask for'
		return
	}

	// $w('#develRawTXTBX').value = JSON.stringify(await instantiateSimpleDemogfxObject($w('#familyIdINPT').value),undefined,4)
    let enrollObject = await instantiateEnrollmentObject($w('#familyIdINPT').value)
	$w('#develRawTXTBX').value = JSON.stringify(enrollObject,undefined,4)
    populateNewActionValueButtons(enrollObject.action)
	// await wixWindow.copyToClipboard($w('#develRawTXTBX').value)
	copyToClipboard($w('#develRawTXTBX').value)
}

export async function getFamilyPersonObjectBTN_click(event) {
    /**
     * ø MISNAMED button/onclick
     * ø   - SHOULD have been named 'getFamilyPersonDatabaseArray'
     * ø   - LEAING this as-is
     * ø   - BELOW button/onclick named '...FULL' to differentiate them
     */
	if(($w('#familyIdINPT').value).length < 32){
		$w('#develRawTXTBX').value = 'INVALID FAMILY ID: please try again or ask for'
		return
	}
	let dataQueryNotBackEnd = await dataQueryPerson_filterByFamilyId_NotBackend($w('#familyIdINPT').value)
    let develItem = {}
    develItem.kind = 'Button Only'
    develItem.source = 'FrontEnd'
    dataQueryNotBackEnd.items.push(develItem)
	dataQueryNotBackEnd.items.forEach(item => {
		delete item.objectData
		delete item.objectCorollary
		delete item.idBL
		delete item.idHH
		delete item.webhookId
		delete item.altPersonId
		delete item.fullName
		delete item.lastFirst
		delete item.comboName
		delete item._owner
		delete item._id
	});
	let originalLength = dataQueryNotBackEnd.length
	// delete dataQuery.items
	// delete dataQuery.totalCount
	// let count = 0
	// let maxCount = 50
	// let element = {}
	// while((dataQuery.items).length !== 0 && count < maxCount){
	// 	element = (dataQuery.items).pop()
	// 	count++
	// }
	$w('#secondaryResponseTXTBX').value = JSON.stringify(dataQueryNotBackEnd,undefined,4)
	let dataQuery = await dataQueryPerson_filterByFamilyId($w('#familyIdINPT').value)
    develItem.kind = 'Button Only'
    develItem.source = 'BackEnd'
    dataQuery.items.push(develItem)
	$w('#develRawTXTBX').value = JSON.stringify(dataQuery,undefined,4)
	copyToClipboard($w('#develRawTXTBX').value)
}

export function getRandomFamilyIdBTN_click(event) {
	let familyIdSourceArray = ['b63c40a1-076a-4e23-9d92-74e985caba9a','2297c168-cc91-43d1-8864-eb1182967d35','6396589d-54b0-4439-a569-e1cafc729df9','a8472b36-bc63-4063-bd42-95519419cb8a','1cb1212f-a581-4147-aae7-b0fc6f4c65ce','02ff550a-c93a-4913-a121-238fbcfb8a3b'];
	$w('#secondaryResponseTXTBX').value = `\n\nSOURCE familyIdArray:\n`
	$w('#secondaryResponseTXTBX').value += JSON.stringify(familyIdSourceArray,undefined,4)
	$w('#secondaryResponseTXTBX').value += `\n==========\n\n`
    let reset = false
    let temoraryParam = session.getItem('temoraryParam')
    reset = temoraryParam == null ? true : reset
    reset = reset === false && Array.isArray(JSON.parse(temoraryParam)) === false ? true : reset
    reset = reset === false && (JSON.parse(temoraryParam)).length < 1 ? true : reset
    let familyIdArray = reset === true ? familyIdSourceArray : JSON.parse(temoraryParam)
    $w('#cycleRandomRDBTNS').value === 'CYCLE'
    // let familyId  = familyIdArray.splice(Math.floor(Math.random() * familyIdArray.length),1)
    // let familyId  = familyIdArray.shift()
    if($w('#cycleRandomRDBTNS').value === 'CYCLE'){
        let familyIdCYCLE = familyIdArray.shift()
        $w('#familyIdINPT').value = familyIdCYCLE
    }else{
        let familyIdRANDOM = familyIdArray.splice(Math.floor(Math.random() * familyIdArray.length),1)
        $w('#familyIdINPT').value = familyIdRANDOM[0]

    }
    session.setItem('temoraryParam',JSON.stringify(familyIdArray))

	temoraryParam = `CURRENT familyId:\n`
	temoraryParam += $w('#familyIdINPT').value
	temoraryParam += `\nCURRENT familyIdArray:\n`
	temoraryParam += JSON.stringify(familyIdArray,undefined,4)
	$w('#secondaryResponseTXTBX').value = temoraryParam + $w('#secondaryResponseTXTBX').value
	copyToClipboard($w('#secondaryResponseTXTBX').value)

	// $w('#familyIdINPT').value = familyId[0]
}

export function resetFamilyPersonObjectBTN_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	$w('#familyIdINPT').value = ''
	$w('#develRawTXTBX').value = ''
	$w('#secondaryResponseTXTBX').value = ''
	// Add your code for this event here: 
}

export function clearResponseBTN_click(event) {
	$w('#develRawTXTBX').value = ''
	$w('#secondaryResponseTXTBX').value = ''
}
export async function getFamilyPersonObjectFUllBTN_click(event) {
    /**
     * ø MISNAMED button/onclick
     * ø   - FULL meaning the previous button/onclick was mis-named 'getFamilyPersonObjectBTN_click'
     */
    console.groupCollapsed(`getFamilyPersonObjectFUllBTN_click: ELSE-IF-THEN`)
    console.log(`MISNAMED button/onclick - FULL meaning the previous button/onclick was mis-named 'getFamilyPersonObjectBTN_click'`)
	if(($w('#familyIdINPT').value).length < 32){
		$w('#develRawTXTBX').value = 'INVALID FAMILY ID: please try again or ask for'
        console.log(`INVALID FAMILY ID: please try again or ask for`)
        console.groupEnd()
		return
	}
    console.log(`VALID FAMILY ID`)
    console.groupEnd()
    console.group(`ORIGINAL (FrontEnd) familyPersonObject`)
    let paramFamilyId = $w('#familyIdINPT').value
    console.log(`paramFamilyId: ${paramFamilyId}`)
    let currentTermId = Number(local.getItem('termId'))
    console.log(`currentTermId: ${currentTermId}`)
	let familyPersonObjectFrontEnd = await getFamilyPersonsObject_NotBackend(paramFamilyId)
	familyPersonObjectFrontEnd.buttonONLY = {}
	familyPersonObjectFrontEnd.buttonONLY.source = 'Front-End'
    console.log(`familyPersonObjectFrontEnd:`)
    console.dir(familyPersonObjectFrontEnd)
    console.groupEnd()
	$w('#secondaryResponseTXTBX').value = JSON.stringify(familyPersonObjectFrontEnd,undefined,4)
	// copyToClipboard($w('#secondaryResponseTXTBX').value)
	let familyPersonObject = await getFamilyPersonsObject(paramFamilyId, currentTermId)
	familyPersonObject.buttonONLY = {}
	familyPersonObject.buttonONLY.source = 'Back-End'
    console.groupCollapsed(`UPDATED (BackEnd) familyPersonObject`)
    console.log(`paramFamilyId: ${paramFamilyId}`)
    console.log(`currentTermId: ${currentTermId}`)
    console.log(`familyPersonObject:`)
    console.dir(familyPersonObject)
	$w('#develRawTXTBX').value = JSON.stringify(familyPersonObject,undefined,4)
	copyToClipboard($w('#develRawTXTBX').value)
    console.log(`getFamilyPersonObjectFUllBTN_click: EXIT`)
    console.groupEnd()
}
// ø <=============================================================================>
// ø <============================== </Just Buttons> ==============================>
// ø <=============================================================================>



