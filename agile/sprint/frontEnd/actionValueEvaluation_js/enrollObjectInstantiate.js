export async function instantiateSimpleDemogfxObject() {
    // ø <final in Post-Enrollment>
    // let enroll = {}
    // let simpleDemogfxObject = {}
    // simpleDemogfxObject.termId = local.getItem('termId')
    // simpleDemogfxObject.staffIdentifiedFamilyId = local.getItem('staffIdentifiedFamilyId')
    // simpleDemogfxObject.familyIdStatus = 'Staff-Eye-D'
    // simpleDemogfxObject.familySeed = local.getItem('familySeed')
    // simpleDemogfxObject.primary = {}
    // simpleDemogfxObject.primary.familyId = local.getItem('familyId')
    // simpleDemogfxObject.primary.familyEmail = local.getItem('familyEmail')
    // simpleDemogfxObject.primary.ppFirst = local.getItem('ppFirst')
    // simpleDemogfxObject.primary.ppLast = local.getItem('ppLast')
    // simpleDemogfxObject.student = {}
    // simpleDemogfxObject.student.studentId = local.getItem('studentId')
    // simpleDemogfxObject.student.studentEmail = local.getItem('studentEmail')
    // simpleDemogfxObject.student.stFirst = local.getItem('stFirst')
    // simpleDemogfxObject.student.stPreferredFirst = local.getItem('stPreferredFirst')
    // simpleDemogfxObject.student.stLast = local.getItem('stLast')
    // simpleDemogfxObject.secondary = {}
    // simpleDemogfxObject.secondary.secondaryId = local.getItem('secondaryId')
    // simpleDemogfxObject.secondary.secondaryEmail = local.getItem('secondaryEmail')
    // simpleDemogfxObject.secondary.spFirst = local.getItem('spFirst')
    // simpleDemogfxObject.secondary.spLast = local.getItem('spLast')
    // ø </final in Post-Enrollment>

    // ø <TESTING>
    let enroll = {}
    let simpleDemogfxObject = {}
    simpleDemogfxObject.termId = local.getItem('termId')
    simpleDemogfxObject.staffIdentifiedFamilyId = '2297c168-cc91-43d1-8864-eb1182967d35'
    simpleDemogfxObject.familyIdStatus = 'Staff-Eye-D'
    simpleDemogfxObject.familySeed = '2297c168cc9143d18864eb1182967d35'
    simpleDemogfxObject.primary = {}
    simpleDemogfxObject.primary.familyId = ''
    simpleDemogfxObject.primary.familyEmail = 'jessikazmuda@gmail.com'
    simpleDemogfxObject.primary.ppFirst = 'Jessika'
    simpleDemogfxObject.primary.ppLast = 'Bottiani'
    simpleDemogfxObject.student = {}
    simpleDemogfxObject.student.studentId = 'INSTANTIATE'
    simpleDemogfxObject.student.studentEmail = 'steamdiscoveryacademy+grayson2297@gmail.com'
    simpleDemogfxObject.student.stFirst = 'Grayson'
    simpleDemogfxObject.student.stPreferredFirst = 'Grayson'
    simpleDemogfxObject.student.stLast = 'Wilkinson'
    simpleDemogfxObject.secondary = {}
    simpleDemogfxObject.secondary.secondaryId = 'EEMPTY'
    simpleDemogfxObject.secondary.secondaryEmail = 'eempty'
    simpleDemogfxObject.secondary.spFirst = 'James'
    simpleDemogfxObject.secondary.spLast = 'Bottiani'
    // ø </TESTING>
}
