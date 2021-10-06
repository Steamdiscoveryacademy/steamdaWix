// Test any backend function by clicking the "Play" button on the left side of the code panel
// About testing backend functions: https://support.wix.com/en/article/velo-testing-your-backend-functions
import wixData from 'wix-data';
// import {local, session, memory} from 'wix-storage';

// QUICK FIND:
// ø getFamilyPersonsObject
// ø appendPerson_toPersonObjectById
// ø validateFamilyPersonsObject
// ø dataQueryPerson_filterByFamilyId

// ø <Sample function>
export function multiplyFor_familyPersonsObject(factor1, factor2) {
    // return factor1 * factor2;
	// rewrite function name to: multiplyFor_BACKEND_FILE_NAME
    // Now Return: Piped-Array `Unique Message|product|reminder of session.getItem()`
    let thisMultiplyJSON = 'the JSON from the BACKEND FILE FOLDER YAML'
    // session.setItem('lastMultiplyJSON',thisMultiplyJSON)
    let product =  factor1 * factor2;
    return `In steamDA Backend, in the file 'familyPersonsObject.jsw', the multiply(${factor1},${factor2}) function return a product of ${product} |${product}| [see session.getItem('lastMultiplyJSON') for YAML to JSON for this backend file]`
}
// ø </Sample function>

// ø <==================================================================================================>
// ø <============================== <familyPersonsObject BackEnd GROUP>  ==============================>
// ø <==================================================================================================>

// ø <-------------------- <getFamilyPersonsObject>  -------------------->
export async function getFamilyPersonsObject(familyId = 'STRING', currentTermId = 201506) {
    console.groupCollapsed(`getFamilyPersonsObject(familyId)`)
    console.log(`Full Declaration: export async function getFamilyPersonsObject(familyId = 'STRING')`)
    console.log(`familyId: ${familyId} [@todo: validate family id]`)
    let DOX = 'So that it is readable in the WiX Editor'
    let familyIdPersonQueryResponseObject = await dataQueryPerson_filterByFamilyId(familyId)
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
        await appendPerson_toPersonObjectById(person, familyDataObject)
    }

    console.log(`familyDataObject: Pre-Validation: `)
    console.dir(familyDataObject)
    
    await validateFamilyPersonsObject(familyDataObject)
    console.log(`familyDataObject: FINAL: `)
    console.dir(familyDataObject)
    // localZXZ.setItem('familyPersonsObjectJSON', JSON.stringify(familyDataObject))

    console.groupEnd()
    return familyDataObject

}
// ø <-------------------- </getFamilyPersonsObject> -------------------->

// ø <-------------------- <appendPerson_toPersonObjectById>  -------------------->
export async function appendPerson_toPersonObjectById(person = {}, familyDataObject = {}) {
    // ø <personObjectById_TEMPLATE INSTANTIATE>
    let DOX = 'entering'
    console.groupCollapsed(`appendPerson_toPersonObjectById(person, familyDataObject)`)
    console.log(`Full Declaration: export async function appendPerson_toPersonObjectById(person = {}, familyDataObject = {})`)
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
// ø <-------------------- </appendPerson_toPersonObjectById> -------------------->

// ø <-------------------- <validateFamilyPersonsObject>  -------------------->
export async function validateFamilyPersonsObject(familyDataObject = {}){
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
    // familyDataObject.primaryIsUpToDate = holderCriteria && familyDataObject.primaryMemberObjectsById[familyDataObject.familyId]["termIdMax"] === Number(local.getItem('termId'))? true : false
    familyDataObject.primaryIsUpToDate = holderCriteria && familyDataObject.primaryMemberObjectsById[familyDataObject.familyId]["termIdMax"] === currentTermId? true : false
    
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
    // familyDataObject.secondaryIsUpToDate = holderCriteria && familyDataObject.secondaryMemberObjectsById[familyDataObject.secondaryId]["termIdMax"] === Number(local.getItem('termId'))? true : false
    familyDataObject.secondaryIsUpToDate = holderCriteria && familyDataObject.secondaryMemberObjectsById[familyDataObject.secondaryId]["termIdMax"] === currentTermId? true : false
 
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
// ø <-------------------- </validateFamilyPersonsObject> -------------------->




// ø <===================================================================        =======================>
// ø <============================== </familyPersonsObject BackEnd GROUP> ==============================>
// ø <===========================================================================        ===============>

// ø <-------------------- <dataQueryPerson_filterByFamilyId>  -------------------->
export async function dataQueryPerson_filterByFamilyId(familyId = 'STRING'){
	// familyId = 'b63c40a1-076a-4e23-9d92-74e985caba9a'
    let query = await wixData.query("person")
    .eq("familyId", familyId)
    // .eq("role", 'Student')
    // .gt("age", 25)
    .ascending("_createdDate")
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
// ø <-------------------- </dataQueryPerson_filterByFamilyId> -------------------->
