// ! <ABANDONED HERE will use local.MEMORY>
export function insertEnrollmentRecord() {
    let now = new Date();
    let jsonEnrollment = $w('#superEnrollmentObject').value;
    let objectEnrollment = JSON.parse(jsonEnrollment);
    let objectCorollaryParam = "NOT a parameter YET";
    let objectCorollary = {};
    //<isObject>
    // this is good, needs to be dynamically extensible 
    //(buzz, buzz, but I mean it)
    let idTerm = 202106;
    let isObject = typeof objectCorollaryParam === 'object' ? true : false; 
	isObject = typeof objectCorollaryParam === null ? false : isObject; 
	isObject = Array.isArray(objectCorollaryParam) ? false : isObject; 
    if(isObject){
        objectCorollary = objectCorollaryParam;
        if ('corollaryJasonVerion' in objectCorollary === false){
            objectCorollary.corollaryJasonVerion = "1.1.1";
        }
        if ('idTerm' in objectCorollary === false){
            objectCorollary.idTerm = idTerm;
        }
    } else {
        objectCorollary = {"idTerm": 202106,"corollaryJasonVerion": "1.1.1"};
    }
    let jsonCorollary = JSON.stringify(objectCorollary, null, 0);
    //</isObject>
    jsonEnrollment = JSON.stringify(objectEnrollment, null, 0);
        //<instantate objectStatusNotes>
    let objectStatusNotes = {"statusNotes":[{"status":"PENDING","kind":"status","note":"posted enrollmentObject record","MDYdate":"4/11/2021","ISOdate":"20210411012108405"},{"status":"INSTANTIATE","kind":"initializing element","note":"instantiate","MDYdate":"4/11/2021","ISOdate":"20210411012105438"}]};
    let nowMDYdate = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
    let nowISOdate = now.toISOString().replace(/[^0-9]/g,'');
    objectStatusNotes.statusNotes[0].MDYdate = nowMDYdate;
    objectStatusNotes.statusNotes[0].ISOdate = nowISOdate;
    objectStatusNotes.statusNotes[1].MDYdate = nowMDYdate;
    objectStatusNotes.statusNotes[1].ISOdate = nowISOdate;
    // console.log(objectStatusNotes);
    let jsonStatusNotes = JSON.stringify(objectStatusNotes, null, 0);
    //</instantate objectStatusNotes>
    //<other Attributes>
    let family = objectEnrollment.family;
    let studentFirst = family.student.name.first;
	let studentLast = family.student.name.last;
	let parentFirst = family.parent.primary.first;
	let parentLast = family.parent.primary.last;
	let spTitle = family.student.name.studentParentCombo;
	// let familyId = $w("#familyId").valufamily.parent.primary.e;//ABOVE
	let idPP = family.parent.primary.memberId;
    //</other Attributes>
    let toInsert = {
        "title": spTitle,
        // "_id": "X",
        // "_owner": "X",
        // "_createdDate": "X",
        // "_updatedDate": "X",
        "studentFirst": studentFirst,
        "studentLast": studentLast,
        "parentFirst": parentFirst,
        "parentLast": parentLast,
        "idPP": idPP,
        "jsonEnrollment": jsonEnrollment,
        "jsonCorollary": jsonCorollary,
        "jsonStatusNotes": jsonStatusNotes,
        "idTerm": idTerm
    };
    console.log("prepared toInsert [Line: ~1422]");
    console.log(toInsert);
    wixData.insert("enrollmentObjects", toInsert)
	.then( (results) => {
		let item = results;
        console.log("inserted results [Line: ~1427]");
        console.log(item);
        resolveSelectedWebHook();
	} )
	.catch( (err) => {
		let errorMsg = err;
	} );


}
// ! </ABANDONED HERE will use local.MEMORY>
