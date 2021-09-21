// ø <---------- <manualEntryTitles(peSevenObject)>  ----------->
export function manualEntryTitles(peSevenObject) {
    /**
     * ø @stamp: 2021-09-21T07:33:01
     * ø @descr: pre-Demo Update && instantiate Versioning
     * ø HOW TO:
     * ø   - Copy the Entire Function
     * ø   - Save it to a Versioned Copy
     * ø   - Make all changes and Exits as you see fit
     * ø   - PASTE-OVER this Code with the intended Vesion
     */
        // peSevenObject.errorStringArray = [];
        peSevenObject.stepObjects = {};
        // ø <step titles manual>
        // ManualEntryUpdate_TITLES BEGIN
        let titleArray = [];
        let longTitleArray = [];
        let descrTitleArray = [];
    
        let titleThis = 'On-Ramp';
        titleArray.push(titleThis);
        titleThis = 'Long Title for On-Ramp';
        longTitleArray.push(titleThis);
        titleThis = 'Long Title for On-Ramp DESCR';
        descrTitleArray.push(titleThis);
    
        titleThis = 'Instantiate';
        titleArray.push(titleThis);
        titleThis = 'Instantiate Enrollment';
        longTitleArray.push(titleThis);
        titleThis = 'Instantiate Enrollment DESCR';
        descrTitleArray.push(titleThis);
    
        titleThis = 'Member Confirm';
        titleArray.push(titleThis);
        titleThis = 'Confirm Members for Primary and Student';
        longTitleArray.push(titleThis);
        titleThis = 'Confirm Members for Primary and Student DESCR';
        descrTitleArray.push(titleThis);
    
        titleThis = 'Dupe Delete';
        titleArray.push(titleThis)
        titleThis = 'Delete any Duplicate Contacts (known bug)';
        longTitleArray.push(titleThis);
        titleThis = 'Delete any Duplicate Contacts (known bug) DESCR';
        descrTitleArray.push(titleThis);
    
        titleThis = 'Database for Primary and Student';
        titleArray.push(titleThis);
        titleThis = 'Insert Records into the Person Database for Primary and Student';
        longTitleArray.push(titleThis);
        titleThis = 'Insert Records into the Person Database for Primary and Student DESCR';
        descrTitleArray.push(titleThis);
    
        titleThis = 'Contact for Primary and Student';
        titleArray.push(titleThis);
        titleThis = 'Update Contacts for Primary & Student with Complex Enrollment Data';
        longTitleArray.push(titleThis);
        titleThis = 'Update Contacts for Primary & Student with Complex Enrollment Data DESCR';
        descrTitleArray.push(titleThis);
    
        titleThis = 'Contact and Database for Secondary';
        titleArray.push(titleThis);
        titleThis = 'Upsert Contact and Insert Person database Record for Secondary';
        longTitleArray.push(titleThis);
        titleThis = 'Upsert Contact and Insert Person database Record for Secondary DESCR';
        descrTitleArray.push(titleThis);
    
        titleThis = 'Resolve and Destroy';
        titleArray.push(titleThis);
        //XXXXXXXXXXX123456789012345678901234567890123456789012345678901234567890123456
        titleThis = "Resolve Webhook Payload and Off-Ramp the Post Enrollment Process";
        longTitleArray.push(titleThis);
        //XXXXXXXXXXX123456789012345678901234567890123456789012345678901234567890123456
        titleThis = "Resolve Webhook Payload and Off-Ramp the Post Enrollment Process DESCR";
        descrTitleArray.push(titleThis);
    
        titleThis = 'Off-Ramp';
        titleArray.push(titleThis);
        //XXXXXXXXXXX123456789012345678901234567890123456789012345678901234567890123456
        titleThis = "Off-Ramp to Display Completion Data before taking Next Application";
        longTitleArray.push(titleThis);
        titleThis = "Off-Ramp to Display Completion Data before taking Next Application DESCR";
        descrTitleArray.push(titleThis);
        // ManualEntryUpdate_TITLES END
        // ø </step titles manual>
        peSevenObject.titleArray = titleArray
        peSevenObject.longTitleArray = longTitleArray
        peSevenObject.descrTitleArray = descrTitleArray
}
// ø <---------- </manualEntryTitles(peSevenObject)> ----------->