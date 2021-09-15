export function btnResetToLastCompletedTEMP_click(event) {
    let current = local.getItem('enrollmentStepCompletedListAll');
    let tempLastCompleted_b4DeDupe = 'OnReadyReset,ZERO,IINSTANTIATE,PREP_ppMember,EXECUTE_ppMember,PREP_stMember,EXECUTE_stMember'; 
    let tempLastCompleted_b4PpStContactsAndDatabase = 'OnReadyReset,ZERO,IINSTANTIATE,PREP_ppMember,EXECUTE_ppMember,PREP_stMember,EXECUTE_stMember,OnReadyResetContinue,dedupePpStContact'; 
    let tempLastCompleted_b4DeDupe_ActiveOnly = 'PREP_ppMember,EXECUTE_ppMember,PREP_stMember,EXECUTE_stMember,OnReadyResetContinue'; 
    // ø <Logic for First and Continuing>
    let next = 'tempLastCompleted_b4DeDupe';
    next = current === tempLastCompleted_b4DeDupe ? 'tempLastCompleted_b4PpStContactsAndDatabase' : next;
    next = current === tempLastCompleted_b4PpStContactsAndDatabase ? 'tempLastCompleted_b4DeDupe_ActiveOnly' : next;
    // ø </Logic for First and Continuing>
    let tempLastCompleted = eval(next);
    local.setItem('enrollmentStepCompletedListAll',tempLastCompleted);
    $w('#spContactResponseJSON').value = local.getItem('enrollmentStepCompletedListAll');
    uiCopyTextElementThis('spContactResponseJSON');

}
