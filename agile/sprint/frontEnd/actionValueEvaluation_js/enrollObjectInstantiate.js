// ø <-------------------- <instantiateSimpleDemogfxObject>  -------------------->
export async function instantiateSimpleDemogfxObject() {
    // let enroll = {}
    // enroll.familyId = PENDING
    // enroll.familyIdStatus = 'PENDING'//'Staff-Eye-D' inferred by Data, precision here not necessary
    // enroll.maxPreviousFamilyTermId = 201506
    // enroll.maxPreviousStudentTermId = 201506
    // enroll.wixWebhookId = local.getItem('wixWebhookId')
    // ø <demogrfx-application-processed>
    // enroll.application = {}
    // enroll.application.termId = local.getItem('termId')
    // enroll.application.staffIdentifiedFamilyId = local.getItem('staffIdentifiedFamilyId')
    // enroll.application.familySeed = local.getItem('familySeed')
    // enroll.application.primary = {}
    // enroll.application.primary.familyId = local.getItem('familyId')
    // enroll.application.primary.familyEmail = local.getItem('familyEmail')
    // enroll.application.primary.ppFirst = local.getItem('ppFirst')
    // enroll.application.primary.ppLast = local.getItem('ppLast')
    // enroll.application.student = {}
    // enroll.application.student.studentId = local.getItem('studentId')
    // enroll.application.student.studentEmail = local.getItem('studentEmail')
    // enroll.application.student.stFirst = local.getItem('stFirst')
    // enroll.application.student.stPreferredFirst = local.getItem('stPreferredFirst')
    // enroll.application.student.stLast = local.getItem('stLast')
    // enroll.application.secondary = {}
    // enroll.application.secondary.secondaryId = local.getItem('secondaryId')
    // enroll.application.secondary.secondaryEmail = local.getItem('secondaryEmail')
    // enroll.application.secondary.spFirst = local.getItem('spFirst')
    // enroll.application.secondary.spLast = local.getItem('spLast')
    // ø </demogrfx-application-processed>
    
    
    
    let enroll = {}
    enroll.familyId = PENDING
    enroll.familyIdStatus = 'PENDING'//'Staff-Eye-D' inferred by Data, precision here not necessary
    enroll.maxPreviousFamilyTermId = 201506
    enroll.maxPreviousStudentTermId = 201506
    enroll.wixWebhookId = local.getItem('wixWebhookId')
    // ø <demogrfx-application-processed>
    // ø <TESTING>
    enroll.application = {}
    enroll.application.termId = local.getItem('termId')
    enroll.application.staffIdentifiedFamilyId = '2297c168-cc91-43d1-8864-eb1182967d35'
    enroll.application.familySeed = '2297c168cc9143d18864eb1182967d35'
    enroll.application.primary = {}
    enroll.application.primary.familyId = ''
    enroll.application.primary.familyEmail = 'jessikazmuda@gmail.com'
    enroll.application.primary.ppFirst = 'Jessika'
    enroll.application.primary.ppLast = 'Bottiani'
    enroll.application.student = {}
    enroll.application.student.studentId = 'INSTANTIATE'
    enroll.application.student.studentEmail = 'steamdiscoveryacademy+grayson2297@gmail.com'
    enroll.application.student.stFirst = 'Grayson'
    enroll.application.student.stPreferredFirst = 'Grayson'
    enroll.application.student.stLast = 'Wilkinson'
    enroll.application.secondary = {}
    enroll.application.secondary.secondaryId = 'EEMPTY'
    enroll.application.secondary.secondaryEmail = 'eempty'
    enroll.application.secondary.spFirst = 'James'
    enroll.application.secondary.spLast = 'Bottiani'
    // ø </TESTING>
    // ø </demogrfx-application-processed>
    
    
    // ø <current-evaluation-personDbase-personData-wixWebhookId>
    // enroll.familyId = PENDING
    // enroll.familyIdStatus = 'PENDING'//'Staff-Eye-D' inferred by Data, precision here not necessary
    enroll.personData = {}
    enroll.personData.primary.familyId = 'FROM_familyDataObject'
    enroll.personData.primary.maxTermId = 'FROM_familyDataObject'
    enroll.personData.student.studentId = 'FROM_familyDataObject'
    enroll.personData.student.maxTermId = 'FROM_familyDataObject'
    enroll.personData.secondary.secondaryId = 'FROM_familyDataObject'
    enroll.personData.secondary.maxTermId = 'FROM_familyDataObject'
    // ø </current-evaluation-personDbase-personData-wixWebhookId>
    
    // ø <contacts-directQuery-emailQuery-emailQueryWithKludge>
    // enroll.familyId = PENDING
    // enroll.familyIdStatus = 'PENDING'//'Staff-Eye-D' inferred by Data, precision here not necessary
    enroll.emailQuery = {}
    enroll.emailQuery.primary.familyId = 'FROM_familyDataObject_OR_FROM_emailQuery'
    enroll.emailQuery.student.studentId = 'FROM_familyDataObject_OR_FROM_emailQuery'
    enroll.emailQuery.secondary.secondaryId = 'FROM_familyDataObject_OR_FROM_emailQuery'
    // ø <DATA FOR THE QUERY(IES)>
    enroll.emailQuery.primary.familyEmail = enroll.application.familyEmail
    enroll.emailQuery.student.studentEmail = enroll.application.studentEmail
    let replaceBlock = (enroll.application.studentEmail).substr((enroll.application.studentEmail).indexOf('@') - 4,5)
    enroll.emailQuery.student.studentEmailKludge = (enroll.application.studentEmail).replace(replaceBlock, 'eemp@')
    // ø </DATA FOR THE QUERY(IES)>
    // ø </contacts-directQuery-emailQuery-emailQueryWithKludge>
    
    // ø <action-actionEvaluation-final>
    // enroll.familyId = PENDING
    // enroll.familyIdStatus = 'PENDING'//'Staff-Eye-D' inferred by Data, precision here not necessary
    enroll.action = {}
    enroll.action.primary = {}
    enroll.action.primary.member = 'PENDING_LOGIC'
    enroll.action.primary.contact = 'PENDING_LOGIC'
    enroll.action.primary.dataBase = 'PENDING_LOGIC'
    // enroll.emailQuery.primary.familyId = 'DANGER'
    // enroll.action.primary.familyId = enroll.application.familyId
    enroll.action.student.member = 'PENDING_LOGIC'
    enroll.action.student.contact = 'PENDING_LOGIC'
    enroll.action.student.dataBase = 'PENDING_LOGIC'
    // enroll.action.student.studentId = enroll.application.studentId
    // enroll.emailQuery.student.studentId = 'DANGER'
    enroll.action.secondary.member = 'PENDING_LOGIC_but_NA'
    enroll.action.secondary.contact = 'PENDING_LOGIC'
    enroll.action.secondary.dataBase = 'PENDING_LOGIC'
    // enroll.emailQuery.secondary.secondaryId = 'DANGER'
    // enroll.action.secondary.secondaryId = enroll.application.secondaryId
    // ø <SAME AS APPLICATION: update if different>
    // ø <>
    enroll.action.termId = enroll.application.termId
    enroll.action.familySeed = enroll.application.familySeed
    // enroll.action.familySeed = enroll.application.familySeed
    enroll.action.primary = {}
    enroll.action.primary.familyEmail = enroll.application.familyEmail
    enroll.action.primary.ppFirst = enroll.application.ppFirst
    enroll.action.primary.ppLast = enroll.application.ppLast
    enroll.action.student = {}
    enroll.action.student.studentEmail = enroll.application.studentEmail
    enroll.action.student.stFirst = enroll.application.stFirst
    enroll.action.student.stPreferredFirst = enroll.application.stPreferredFirst
    enroll.action.student.stLast = enroll.application.stLast
    enroll.action.secondary = {}
    enroll.action.secondary.secondaryEmail = enroll.application.secondaryEmail
    enroll.action.secondary.spFirst = enroll.application.spFirst
    enroll.action.secondary.spLast = enroll.application.spLast
    // ø </>
    // ø </SAME AS APPLICATION: update if different>
    // ø </action-actionEvaluation-final>
}
// ø <-------------------- </instantiateSimpleDemogfxObject> -------------------->