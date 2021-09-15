    // ø <UNIVERSAL - Devel Notes>
    let develString = `msboxPostEnrollmentSeven 'Next-Kludge' working`;
    if (typeof develString === 'string' && develString.length > 0) {
        develString = 'develNotes:\n===========\n' + develString;
        let html = doBootstrapMessage('devel', develString, [[-1, 18]]);
        $w('#txtOnReadyDevelHMTL').html = html;
        $w('#txtOnReadyDevelHMTL').expand();
    }
    // ø </UNIVERSAL - Devel Notes>
