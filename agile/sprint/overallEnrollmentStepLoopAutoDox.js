let stepArray = [];
//  stepArray.push('PPRE_VVALIDATE');
 stepArray.push('IINSTANTIATE');
 
 stepArray.push('PREP_ppMember');
 stepArray.push('EXECUTE_ppMember');
 stepArray.push('PREP_stMember');
 stepArray.push('EXECUTE_stMember');
 
//  stepArray.push('PPRE_PPREP_VVALIDATE');
 stepArray.push('PREP_ppContact');
 stepArray.push('PREP_ppDatabase');
 stepArray.push('PREP_stContact');
 stepArray.push('PREP_stDatabase');
//  stepArray.push('PREP_spMember');
 stepArray.push('PREP_spContact');
 stepArray.push('PREP_spDatabase');
 
//  stepArray.push('PPRE_EEXECUTE_VVALIDATE');
 stepArray.push('EXECUTE_ppContact');
 stepArray.push('EXECUTE_ppDatabase');
 stepArray.push('EXECUTE_stContact');
 stepArray.push('EXECUTE_stDatabase');
//  stepArray.push('EXECUTE_spMember');
 stepArray.push('EXECUTE_spContact');
 stepArray.push('EXECUTE_spDatabase');
 
//  stepArray.push('PPRE_CCOMPLETION_VVALIDATE');
//  stepArray.push('PPRE_CCOMPLETION_CCLEANUP');
 stepArray.push('CCOMPLETE');
 
 let stepList = stepArray.toString();
 
 console.warn('stepArray: ');
 console.warn(stepArray);
 console.warn('stepList: ');
 console.warn(stepList);

 let overallEnrollmentDoxObject = {};
 overallEnrollmentDoxObject.stepArray = stepArray;
 overallEnrollmentDoxObject.stepObjectArray = stepArray;

 let stepDoxObject = {}; 
 stepArray.forEach(step => {
    //  console.log(step);
    // stepDoxObject = {}; 
    stepDoxObject[step] = {}; 
     stepDoxObject[step].preValidationNotes = [];//["Notes on any Pre-Validation Required"]; 
     stepDoxObject[step].stepNotes = [];//["Notes on the actual Step"]; 
     stepDoxObject[step].postValidationNotes = [];//["Notes on any Post-Validation"]; 
     
     // ø <LEAVE postCleanupNotes HERE> seems 'Clean-Up' and 'Assignment' are the same thing 
     //  stepDoxObject[step].postStepCleanupNotes = [];//["Notes on any Post-Step 'Clean-Up'"]; 
     // ø </LEAVE postCleanupNotes HERE> 
     
     stepDoxObject[step].postStepAssignmentNotes = [];//["Notes on any Required Storage"]; 

 });
stepDoxObject.IINSTANTIATE.preValidationNotes[0] = /*first explicit [0] to overwrite descr*/"Validate storage-cleanup";
stepDoxObject.IINSTANTIATE.stepNotes[0] = "Prep & Execute Primary Parent Member first Then Prep & Execute Student Member second";
stepDoxObject.IINSTANTIATE.stepNotes.push("Primary Parent Member is necessary for Family ID");
stepDoxObject.IINSTANTIATE.stepNotes.push("Student Member is necessary for Student ID as Key to multi-child courseArray Key for Parent JSON in DB");
stepDoxObject.IINSTANTIATE.stepNotes.push("THEN all the Remaining PREP");
stepDoxObject.IINSTANTIATE.stepNotes.push("THEN all the Remaining EXECUTE (probably best to make this more contexual");
stepDoxObject.IINSTANTIATE.postStepAssignmentNotes[0] = "local.setItem(familyId) whatever it is";

stepDoxObject.PREP_stMember.stepNotes[0] = "AFTER t202106 there needs to be check for existing Student Member/Contact";

stepDoxObject.EXECUTE_ppMember.postStepAssignmentNotes[0] = "Overwrite local.setItem(familyId) – even if Update, one place not two";

stepDoxObject.EXECUTE_stMember.postStepAssignmentNotes[0] = "Set local.setItem(studentId) – even if Update, one place not two";


stepDoxObject.EXECUTE_ppMember.stepNotes[0] = "IF local.getItem(familyId) is 'INSTANTIATE'";
stepDoxObject.EXECUTE_ppMember.stepNotes.push("THEN New Member");
stepDoxObject.EXECUTE_ppMember.stepNotes.push("ELSE Update Member");

stepDoxObject.PREP_ppDatabase.stepNotes[0] = "build DB JSON as Courses (including financials) Keyed by StudentID (for multi-child families)";

stepDoxObject.PREP_stDatabase.stepNotes[0] = "build DB JSON to include Courses - Exclude the finanicals";

stepDoxObject.PREP_spContact.stepNotes[0] = "this part of the form is optional, could be MOOT";
stepDoxObject.EXECUTE_spContact.stepNotes[0] = "this part of the form is optional, could be MOOT";
stepDoxObject.PREP_spDatabase.stepNotes[0] = "this part of the form is optional, could be MOOT";
stepDoxObject.EXECUTE_spDatabase.stepNotes[0] = "this part of the form is optional, could be MOOT";

stepDoxObject.CCOMPLETE.postStepAssignmentNotes[0] = "run Storage Clean-Up";

 overallEnrollmentDoxObject.stepDoxObject = stepDoxObject;

//  console.warn('overallEnrollmentDoxObject.stepDoxObject: ');
//  console.warn(overallEnrollmentDoxObject.stepDoxObject);

//  console.warn('JSON.stringify(overallEnrollmentDoxObject.stepDoxObject): ');
//  console.warn(JSON.stringify(stepDoxObject));
 console.warn(JSON.stringify(stepDoxObject,undefined,4));
