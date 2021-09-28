// WIX QUERY

// all by FamilyId



// order by TermId Desc

// Loop until most recent NOT current TermId (that is the target)

// Loop for PrimaryId_firstName2dArray
// Loop for studentId_firstName2dArray
// Loop for SecondaryId_firstName2dArray

export async function applyFamilyPersonsObject_to_actionValueObject(actionValueObject = {}) {
    getFamilyPersonsObject(actionValueObject.primary.contactId)
}

export async function getFamilyPersonsObject(familyId) {

    let familyId = 'THE THING YOU QUERY'
    let arrayOfPersonRecords = []
    let familyDataObject = {}
    // let familyPersionItemThis = {} 
    familyDataObject.familyId = familyId
    familyDataObject.familyAlphaKey_uniqueArray = []
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
    let arrayAsElement = []

    let personIdObject = {}
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

export async function appendPerson_toPersonObjectById(person = {}, familyDataObject = {}) {
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
    if (!familyDataObject.familyAlphaKey_uniqueArray.includes(person.familyAlphaKey)) {
        familyDataObject.familyAlphaKey_uniqueArray.push(person.familyAlphaKey)
    }


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
    let personObjectById = {}
    personObjectById.redundantId = person.personId
    familyDataObject.personIdCount++
    familyDataObject.personIdArray.push()
    let kindIdArray = []

    switch (person.role) {
        case 'Primary':
            kindIdArray = Object.keys(familyDataObject.primaryMemberObjectsById)
            personObjectById = kindIdArray.includes(person.personId) ? DataObject.primaryMemberObjectsById[person.personId] : personObjectById_TEMPLATE
            break;
        case 'Student':
            familyDataObject.studentFirstTermIdConcatArray.push(person.firstLegal + '_' + person.termId + '_' + person.personId)
            break;
        case 'Secondary':
            break;
        default:
            break;
    }
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
}