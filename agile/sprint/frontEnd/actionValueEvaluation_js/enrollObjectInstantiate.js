export async function instantiateSimpleDemogfxObject() {
    // ø <final in Post-Enrollment>
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
    // ø </final in Post-Enrollment>
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
    enroll.personData = {}
    // ø </current-evaluation-personDbase-personData-wixWebhookId>
    
    // ø <contacts-directQuery-emailQuery-emailQueryWithKludge>
    enroll.emailQuery = {}
    // ø </contacts-directQuery-emailQuery-emailQueryWithKludge>
    
    // ø <action-actionEvaluation-final>
    enroll.action = {}
    enroll.action.primary = {}
    enroll.action.primary.member = PENDING
    enroll.action.primary.contact = PENDING
    enroll.action.primary.dataBase = PENDING
    enroll.action.student.member = PENDING
    enroll.action.student.contact = PENDING
    enroll.action.student.dataBase = PENDING
    enroll.action.secondary.member = NA
    enroll.action.secondary.contact = PENDING
    enroll.action.secondary.dataBase = PENDING
    // ø <SAME AS APPLICATION: update if different>
    // ø </SAME AS APPLICATION: update if different>
    // ø </action-actionEvaluation-final>
}
