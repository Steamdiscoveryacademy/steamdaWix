// ø <---------- <manualEntryTitles(peSevenObject)>  ----------->
export function manualEntryTitles(peSevenObject) {
    /**
     * ø @stamp: YYYY-MM-DDTHH:II:SS
     * ø @descr: reason for version
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
        // let titleThis = 'Marais And Chester';
        // titleThis = peSevenObject.salt;
        // titleThis = '[AUG24]';
        // titleThis = 'Marais And Chester';
        titleArray.push(titleThis);
        titleThis = 'Long Title for On-Ramp';
        longTitleArray.push('Long Title for On-Ramp Customize zxzHEREzxz');
    
        titleThis = 'Instantiate';
        titleArray.push(titleThis);
        titleThis = 'Instantiate Enrollment';
        longTitleArray.push(titleThis);
    
        titleThis = 'Member Confirm';
        titleArray.push(titleThis);
        titleThis = 'Confirm Members for Primary and Student';
        longTitleArray.push(titleThis);
    
        titleThis = 'Dupe Delete';
        titleArray.push(titleThis)
        titleThis = 'Delete any Duplicate Contacts (known bug)';
        longTitleArray.push(titleThis);
    
        titleThis = 'Database for Primary and Student';
        titleArray.push(titleThis);
        titleThis = 'Insert Records into the Person Database for Primary and Student';
        longTitleArray.push(titleThis);
    
        titleThis = 'Contact for Primary and Student';
        titleArray.push(titleThis);
        titleThis = 'Update Contacts for Primary & Student with Complex Enrollment Data';
        longTitleArray.push(titleThis);
    
        titleThis = 'Contact and Database for Secondary';
        titleArray.push(titleThis);
        titleThis = 'Upsert Contact and Insert Person database Record for Secondary';
        longTitleArray.push(titleThis);
    
        titleThis = 'Resolve and Destroy';
        titleArray.push(titleThis);
        titleThis = "Resolve Webhook Payload and Off-Ramp the Post Enrollment Process";
        //XXXXXXXXXXX123456789012345678901234567890123456789012345678901234567890123456
        longTitleArray.push(titleThis);
    
        titleThis = 'Off-Ramp';
        titleArray.push(titleThis);
        titleThis = "Off-Ramp to Display Completion Data before taking Next Application";
        //XXXXXXXXXXX123456789012345678901234567890123456789012345678901234567890123456
        longTitleArray.push(titleThis);
        // ManualEntryUpdate_TITLES END
        // ø </step titles manual>
        peSevenObject.titleArray = titleArray
        peSevenObject.longTitleArray = longTitleArray
        peSevenObject.descrTitleArray = descrTitleArray
}
// ø <---------- </manualEntryTitles(peSevenObject)> ----------->