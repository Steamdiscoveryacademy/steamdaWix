/*
{
    "email": "qiqgroup+arnold3442@gmail.com",
    "password": "test",
    "firstName": "Arnold",
    "lastName": "Mason",
    "phone": "(112)-634-6832"
}
*/
//<---------- <stMemberBuildOnDeckJSON>  ---------->
export function stMemberBuildOnDeckJSON(enrollmentObject){
    // let enrollmentObject = JSON.parse(local.getItem("ondeckEnrollmentJSON"));

    let stPhoneIndex = -1;
    for (let index = 0; index < enrollmentObject.family.phones.length; index++) {
        let element = enrollmentObject.family.phones[index];
        if(element.role === "Primary Parent"){
            stPhoneIndex = index;
        }
        
    }
    stPhoneIndex = stPhoneIndex === -1 ? 0 : stPhoneIndex;

    // let stEmail = enrollmentObject.family.student.name.preferred;
    let stEmail = "al Hussen";
    stEmail = stEmail.replace(/[^0-9a-zA-Z]/g, '');
    let familyId = "fMcM777"
    stEmail += familyId.substr(0,5);
    // stEmail += (local.getItem("familyId")).substr(0,5);
    stEmail = "steamdiscoveracacademy+" + stEmail + "@gmail.com";

    paramObject = {};
    paramObject.email = stEmail;
    paramObject.password = "fMcM777";
    paramObject.firstName = enrollmentObject.family.student.name.preferred;
    paramObject.lastName = enrollmentObject.family.student.name.last;
    memory.setItem("stMemberOnDeckJSON", JSON.stringify(paramObject));    
}
//<---------- </stMemberBuildOnDeckJSON> ---------->
