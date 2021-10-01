// WIX QUERY

    // all by FamilyId



// order by TermId Desc

// Loop until most recent NOT current TermId (that is the target)

// Loop for PrimaryId_firstName2dArray
// Loop for studentId_firstName2dArray
// Loop for SecondaryId_firstName2dArray

export async function applyFamilyPersonsObject_to_actionValueObject(actionValueObject = {}) {
    let familyPersonsObject = getFamilyPersonsObject(actionValueObject.primary.contactId)
}

// ø <-------------------- <getFamilyPersonsObject>  -------------------->
export async function getFamilyPersonsObject(familyId = 'STRING') {

    let familyIdPersonQueryResponseObject = 'THE_THING_YOU_QUERY(familyId)'
    // let arrayOfPersonRecords = familyIdPersonQueryResponseObject.items
    let arrayOfPersonRecords = []

    // ø <familyDataObject INSTANTIATE>
    let familyDataObject = {}
    familyDataObject.familyId = familyId
    familyDataObject.familyAlphaKey_uniqueArray = []
    // ø => Validation: Should have a Single Value
    familyDataObject.personIdCount = 0
    familyDataObject.personIdArray = [] // very unlikely event where on personId has more than one role (¿primary/secondary switch?)
    familyDataObject.primaryMemberObjectsById = {}
    familyDataObject.primaryPersonCount = 0
    familyDataObject.studentMemberObjectsById = {}
    familyDataObject.studentPersonCount = 0
    familyDataObject.studentFirstTermIdConcatArray = []
    familyDataObject.secondaryMemberObjectsById = {}
    familyDataObject.secondaryPersonCount = 0
    familyDataObject.unsupportedRolePersonIdArray = []
    // ø => Validation: Should be empty
    // ø </familyDataObject INSTANTIATE>
    // let arrayAsElement = []

    // let personIdObject = {}
    arrayOfPersonRecords.forEach(person => {
        appendPerson_toPersonObjectById(person, familyDataObject)



        // familyDataObject.personIdCount++
        // personIdObject = {}
        // familyDataObject.primaryPersonCount++
        // familyDataObject.studentPersonCount++

        // familyDataObject.secondaryPersonCount++


        // arrayAsElement = [person._id, person.role]
        // familyDataObject.unsupportedRolePersonIdArray.push(arrayAsElement)

    });

    // let primaryPersonIdArray = Object.keys(familyDataObject.primaryMemberObjectsById)
    // let primaryPersonIdCount = primaryPersonIdArray.length;
    // let studentPersonIdArray = Object.keys(familyDataObject.studentMemberObjectsById)
    // let studentPersonIdCount = studentPersonIdArray.length;
    // let secondaryPersonIdArray = Object.keys(familyDataObject.secondaryMemberObjectsById)
    // let secondaryPersonIdCount = secondaryPersonIdArray.length;

}
// ø <-------------------- </getFamilyPersonsObject> -------------------->

// ø <-------------------- </appendPerson_toPersonObjectById> -------------------->
export async function appendPerson_toPersonObjectById(person = {}, familyDataObject = {}) {
    // ø <personObjectById_TEMPLATE INSTANTIATE>
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
    ObjectById_TEMPLATE.familyAlphaKey = 'STRING'//redundant, but
    ObjectById_TEMPLATE.contactId = 'STRING'//redundant, but
    ObjectById_TEMPLATE.role = 'STRING'//redundant, but
    ObjectById_TEMPLATE.termId = 777
    ObjectById_TEMPLATE.first = 'STRING'//legal for student
    ObjectById_TEMPLATE.last = 'STRING'
    ObjectById_TEMPLATE.termIdArray = []
    ObjectById_TEMPLATE.firstArray = []
    ObjectById_TEMPLATE.termIdFirst2dArray = []
    // ø </personObjectById_TEMPLATE INSTANTIATE>

    let personObjectById = {}
    personObjectById.redundantId = person.personId
    familyDataObject.personIdCount++
    familyDataObject.personIdArray.push()
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
            personObjectById = holderArray.includes(person.personId) ? DataObject.primaryMemberObjectsById[person.personId] : personObjectById_TEMPLATE
            break;
        case 'Student':
            familyDataObject.studentFirstTermIdConcatArray.push(person.firstLegal + '_' + person.termId + '_' + person.personId)
            break;
        case 'Secondary':
            break;
        default:
            holderArray = [person.role, person.personId]
            familyDataObject.unsupportedRolePersonIdArray.push(holderArray)
            break;
    }
    // ø </SWITCH to INSTANTIATE>

    // ø <Populate personObjectById>
    personObjectById.familyAlphaKey = person.familyAlphaKey//redundant, but
    personObjectById.contactId = person.personId//redundant, but
    personObjectById.role = person.role//redundant, but
    personObjectById.termId = person.termId
    holderString = person.role === 'Student' ? person.firstLegal : person.first//legal for student
    personObjectById.first = holderString//legal for student
    personObjectById.last = person.last
    personObjectById.termIdArray.push(person.termId)
    personObjectById.firstArray.push(holderString)//legal for student
    holderArray = [termId, holderString]
    personObjectById.termIdFirst2dArray.push(holderArray)
    // ø </Populate personObjectById>

    // ø <SWITCH to Assign>
    switch (person.role) {
        case 'Primary':
            DataObject.primaryMemberObjectsById[person.personId] = personObjectById
            break;
        case 'Student':
            break;
        case 'Secondary':
            break;
        default:
            break;
    }
    // ø </SWITCH to Assign>
}
// ø <-------------------- </appendPerson_toPersonObjectById> -------------------->