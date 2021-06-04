/*
{
    "email": "qiqgroup+arnold3442@gmail.com",
    "password": "test",
    "firstName": "Arnold",
    "lastName": "Mason",
    "phone": "(112)-634-6832"
}
*/
//<---------- <ppMemberBuildOnDeckJSON>  ---------->
export function ppMemberBuildOnDeckJSON(enrollmentObject){
    let ppPhoneIndex = -1;
    for (let index = 0; index < enrollmentObject.family.phones.length; index++) {
        let element = enrollmentObject.family.phones[index];
        if(element.role === "Primary Parent"){
            ppPhoneIndex = index;
        }
        
    }
    ppPhoneIndex = ppPhoneIndex === -1 ? 0 : ppPhoneIndex;

    let ppEmailIndex = -1;
    for (let index = 0; index < enrollmentObject.family.emails.length; index++) {
        let element = enrollmentObject.family.emails[index];
        if(element.role === "Primary Parent"){
            ppEmailIndex = index;
        }
        
    }
    ppEmailIndex = ppEmailIndex === -1 ? 0 : ppEmailIndex;

    paramObject = {};
    paramObject.email = enrollmentObject.family.emails[ppEmailIndex].email;
    paramObject.password = "fMcM777";
    paramObject.firstName = enrollmentObject.family.parent.primary.first;
    paramObject.lastName = enrollmentObject.family.parent.primary.last;
    memory.setItem("ppMemberOnDeckJSON", JSON.stringify(paramObject));    
}
//<---------- </ppMemberBuildOnDeckJSON> ---------->
