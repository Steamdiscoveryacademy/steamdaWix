export function doUserInterfaceCleanupCurrent() {
    let label = "Family ID: ";
    label += local.getItem('familyId') !== "EEMPTY" ? local.getItem('familyId') : '';
    label += Number(memory.getItem('ppRevision')) > 0 ? ' [' + memory.getItem('ppRevision') + ']' : '';
    label = "Student ID: ";
    label += local.getItem('studentId') !== "EEMPTY" ? local.getItem('studentId') : '';
    label += Number(memory.getItem('stRevision')) > 0 ? ' [' + memory.getItem('stRevision') + ']' : '';
    label = "Secondary ID: ";
    label += local.getItem('secondaryId') !== "EEMPTY" ? local.getItem('secondaryId') : '';
    let step = memory.getItem('enrollmentStepCompleted') === null ? false : true;
    step = memory.getItem('enrollmentStepCompleted') === "EEMPTY" ? false : step;
    step = memory.getItem('enrollmentStepCompleted') === "NNOT_AAPPLICABLE" ? false : step;
    step = memory.getItem('enrollmentStepCurrent') === null ? false : true;
    step = memory.getItem('enrollmentStepCurrent') === "EEMPTY" ? false : step;
    step = memory.getItem('enrollmentStepCurrent') === "NNOT_AAPPLICABLE" ? false : step;
    $w("#txtStudentDobString").value = local.getItem('uiStDobString');
    let webhookId = local.getItem('wixWebhookId')
    if (typeof webhookId === 'string' && webhookId.length > 20) {
        label = 'Webhook ID: ';
        label += local.getItem('wixWebhookId');
        label += ' [' + local.getItem('wixWebhookStatus') + ']';
    } else if (typeof webhookId === 'string' && webhookId === 'EEMPTY') {
        label = 'Webhook ID: [empty]';
    } else {
        label = 'Webhook ID: [invalid]';
    }
    $w('#btnWebhookData').label = label;
    if (local.getItem('wixWebhookStatus') === 'RESOLVED') {
        // $w('#grpCleanUpAllIncludingEnrJSON').show();
        // $w('#grpWebhookResolve').hide();
    } else {
        // $w('#grpCleanUpAllIncludingEnrJSON').hide();
        $w('#grpWebhookResolve').show();
    }
}