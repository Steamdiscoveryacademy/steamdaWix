// ø <==========================================================================================>
// ø <============================== <familyPersonsObject_GROUP>  ==============================>
// ø <==========================================================================================>
// ø <-------------------- <getFamilyPersonsObject_NotBackend>  -------------------->
export async function getFamilyPersonsObject_NotBackend(familyId = 'STRING') {
    console.groupCollapsed(`getFamilyPersonsObject_NotBackend(familyId)`)
    console.log(`Full Declaration: export async function getFamilyPersonsObject_NotBackend(familyId = 'STRING')`)
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
    familyDataObject.studentTermIdMax = 201506
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
            break;
        case 'Student':
            familyDataObject.studentMemberObjectsById[person.personId] = personObjectById
            familyDataObject.studentPersonCount++
            familyDataObject.studentTermIdMax = person.termId > familyDataObject.studentTermIdMax ? person.termId : familyDataObject.studentTermIdMax
            break;
        case 'Secondary':
            familyDataObject.secondaryMemberObjectsById[person.personId] = personObjectById
            familyDataObject.secondaryPersonCount++
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

// ø <-------------------- <instantiateEnrollmentObject>  -------------------->
export async function instantiateEnrollmentObject(familyId = 'STRING') {
    console.groupCollapsed(`instantiateSimpleDemogfxObject(familyId)`)
    console.log(`FULL DECLARATION: export async function instantiateSimpleDemogfxObject(${familyId} = 'STRING')`)
    let DOX = 'so that it can be viewed in the Online Editor'
    let pendingString = 'PENDING'
    let unconfirmedString = 'UNCONFIRMED'
    let enroll = {}
    
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
    
    
    
    // let enroll = {}
    // enroll.familyId = 'PENDING'
    // enroll.familyIdStatus = 'PENDING'//'Staff-Eye-D' inferred by Data, precision here not necessary
    // enroll.maxPreviousTermIdFamily = 201506
    // enroll.maxPreviousTermIdStudent = 201506
    // enroll.wixWebhookId = local.getItem('wixWebhookId')
    // // ø <demogrfx-application-processed>
    // // ø <TESTING>
    // enroll.application = {}
    // enroll.application.termId = local.getItem('termId')
    // enroll.application.staffIdentifiedFamilyId = '2297c168-cc91-43d1-8864-eb1182967d35'
    // enroll.application.familySeed = '2297c168cc9143d18864eb1182967d35'
    // enroll.application.primary = {}
    // enroll.application.primary.familyId = ''
    // enroll.application.primary.familyEmail = 'jessikazmuda@gmail.com'
    // enroll.application.primary.ppFirst = 'Jessika'
    // enroll.application.primary.ppLast = 'Bottiani'
    // enroll.application.student = {}
    // enroll.application.student.studentId = 'INSTANTIATE'
    // enroll.application.student.studentEmail = 'steamdiscoveryacademy+grayson2297@gmail.com'
    // enroll.application.student.stFirst = 'Grayson'
    // enroll.application.student.stPreferredFirst = 'Grayson'
    // enroll.application.student.stLast = 'Wilkinson'
    // enroll.application.secondary = {}
    // enroll.application.secondary.secondaryId = 'EEMPTY'
    // enroll.application.secondary.secondaryEmail = 'eempty'
    // enroll.application.secondary.spFirst = 'James'
    // enroll.application.secondary.spLast = 'Bottiani'
    // // ø </TESTING>
    // // ø </demogrfx-application-processed>

    let familyPersonsObject = await getFamilyPersonsObject_NotBackend(familyId)
    $w('#secondaryResponseTXTBX').value = JSON.stringify(familyPersonsObject,undefined,4)
    // await validateFamilyPersonsObject_NotBackend(familyPersonsObject)
    console.warn('≈308≈ validateFamilyPerson: COMMENTED OUT: OKAY: inside main getFamilyPersonsObject_NotBackend() ')
    
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
 
 
    DOX = 'Student:\n---\nById:\n---\n'
    let studentId = 'c90f23aa-2838-4e4e-9135-3995d25c5eb3'
    let studentById = await steamdaGetContactFunction(studentId)
    DOX += JSON.stringify(studentById,undefined,4)
    $w('#tertiaryResponseTXTBX').value = DOX
 
    DOX = 'Student:\n---\nByEmail:\n---\n'
    let studentEmail = 'steamdiscoveryacademy+gabrieleemp@gmail.com'
    let studentByEmail = await steamdaGetContactByEmailFunction(studentEmail)
    DOX += JSON.stringify(studentByEmail,undefined,4)
    $w('#quaternaryResponseTXTBX').value = DOX
 
    // ø </ENCAPSULATED QUERIES>
    // ø </Ecapsulated Queries>
    // ø </>

    console.log(`familyPersonsObject:`)
    console.dir(familyPersonsObject)
    enroll.action.superEnrollmentStatus = familyPersonsObject.validationObject.allDangerBooleansAreValid === true ? enroll.action.superEnrollmentStatus : 'ABORT'
    enroll.action.superEnrollmentString += familyPersonsObject.validationObject.allDangerBooleansAreValid === true ? '|allDangerBooleansAreValid' : '|allDangerBooleansAre_NOT_Valid'

    // ø <current-evaluation-personDbase-personData-wixWebhookId>
    // enroll.familyId = PENDING
    // enroll.familyIdStatus = 'PENDING'//'Staff-Eye-D' inferred by Data, precision here not necessary
    // enroll.maxPreviousTermIdFamily = 201506
    // enroll.maxPreviousTermIdStudent = 201506
    enroll.personData = {}
    enroll.confirmed = {}
    enroll.confirmed.familyId = familyPersonsObject.primaryPersonCount === 1 ? familyPersonsObject.familyId : unconfirmedString
    enroll.confirmed.familyEmail = unconfirmedString
    enroll.confirmed.familyMaxTermId = 201506
    enroll.confirmed.familyUpToDate = familyPersonsObject.primaryPersonCount === 1 ? true : false
    enroll.confirmed.studentId = unconfirmedString
    enroll.confirmed.studentEmail = unconfirmedString
    enroll.confirmed.studentMaxTermId = 201506
    enroll.confirmed.studentUpToDate = false
    enroll.confirmed.studentId = unconfirmedString
    enroll.confirmed.studentEmail = unconfirmedString
    enroll.confirmed.studentMaxTermId = unconfirmedString
    enroll.confirmed.studentUpToDate = false
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
    
    // ø <contacts-directQuery-emailQuery-emailQueryWithKludge>
    // enroll.familyId = PENDING
    // enroll.familyIdStatus = 'PENDING'//'Staff-Eye-D' inferred by Data, precision here not necessary
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
    
    enroll.action.primary = {}
    enroll.action.primary.member = 'PENDING_LOGIC'
    enroll.action.primary.contact = 'PENDING_LOGIC'
    enroll.action.primary.dataBase = 'PENDING_LOGIC'
    // enroll.emailQuery.primary.familyId = 'DANGER'
    // enroll.action.primary.familyId = enroll.application.familyId
    enroll.action.student = {}
    enroll.action.student.member = 'PENDING_LOGIC'
    enroll.action.student.contact = 'PENDING_LOGIC'
    enroll.action.student.dataBase = 'PENDING_LOGIC'
    // enroll.action.student.studentId = enroll.application.studentId
    // enroll.emailQuery.student.studentId = 'DANGER'
    enroll.action.secondary = {}
    enroll.action.secondary.member = 'PENDING_LOGIC_but_NA'
    enroll.action.secondary.contact = 'PENDING_LOGIC'
    enroll.action.secondary.dataBase = 'PENDING_LOGIC'
    // enroll.emailQuery.secondary.secondaryId = 'DANGER'
    // enroll.action.secondary.secondaryId = enroll.application.secondaryId
    // ø <SAME AS APPLICATION: update if different>
    // ø <>
    console.groupEnd()
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

    return enroll
}
// ø <-------------------- </instantiateEnrollmentObject> -------------------->


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
    familyDataObject.primaryIsUpToDate = familyDataObject.primaryMemberObjectsById[familyDataObject.familyId]["termIdMax"] === Number(local.getItem('termId'))? true : false
    
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
    familyDataObject.secondaryIsUpToDate = false
    familyDataObject.secondaryIsUpToDate = familyDataObject.secondaryMemberObjectsById[familyDataObject.secondaryId]["termIdMax"] === Number(local.getItem('termId'))? true : false
 
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

// ø <==========================================================================================>
// ø <============================== </familyPersonsObject_GROUP> ==============================>
// ø <==========================================================================================>