let errorString = '';
switch (stepKey) {
     case 'IINSTANTIATE':
         stepKey.toUpperCase();
         break;

     case 'PREP_ppMember':
         ppMemberBuildOnDeckJSON();
         break;

     case 'EXECUTE_ppMember':
         $paramObject = JSON.parse(memory.getItem('ppMemberOnDeckJSON'));
         break;

     case 'PREP_stMember':
         stMemberBuildOnDeckJSON();
         break;

     case 'EXECUTE_stMember':
         $paramObject = JSON.parse(memory.getItem('stMemberOnDeckJSON'));
         break;

     case 'PREP_ppContact':
         ppContactBuildOnDeckJSON();
         break;

     case 'PREP_ppDatabase':
         ppDatabaseBuildOnDeckJSON();
         break;

     case 'PREP_stContact':
         stContactBuildOnDeckJSON();
         break;

     case 'PREP_stDatabase':
         stDatabaseBuildOnDeckJSON();
         break;

     case 'PREP_spContact':
         spContactBuildOnDeckJSON();
         break;

     case 'PREP_spDatabase':
         spDatabaseBuildOnDeckJSON();
         break;

     case 'EXECUTE_ppContact':
         $paramObject = JSON.parse(memory.getItem('ppContactOnDeckJSON'));
         break;

     case 'EXECUTE_ppDatabase':
         $paramObject = JSON.parse(memory.getItem('ppDatabaseOnDeckJSON'));
         break;

     case 'EXECUTE_stContact':
         $paramObject = JSON.parse(memory.getItem('stContactOnDeckJSON'));
         break;

     case 'EXECUTE_stDatabase':
         $paramObject = JSON.parse(memory.getItem('stDatabaseOnDeckJSON'));
         break;

     case 'EXECUTE_spContact':
         $paramObject = JSON.parse(memory.getItem('spContactOnDeckJSON'));
         break;

     case 'EXECUTE_spDatabase':
         $paramObject = JSON.parse(memory.getItem('spDatabaseOnDeckJSON'));
         break;

     case 'CCOMPLETE':
         stepKey.toUpperCase();
         break;

    default:
         errorString = 'stepKey () is Not Supported within this Switch Structure';
         break;
}