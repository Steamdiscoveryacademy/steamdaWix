// ø <---------- <loadRepeaterWithArray 202109 GROUP>  ---------->
export async function onReadyLastEnrollmentElement(paramObject = {}){
	console.groupCollapsed('onReadyLastEnrollmentElement(paramObject')
	// session.setItem('postedEnrollmentLastElement',`{"_id":"ZXZ","familyId":"ZXZ","studentId":"ZXZ","secondaryId":"ZXZ"}`);
	// let lastEnrollmentElement = session.getItem('postedEnrollmentLastElement')
	// let lastEnrollmentElementObject = JSON.parse(session.getItem('postedEnrollmentLastElement'))
	// ø <KLUDGE>
	let lastEnrollmentElementObject = {}
	let letterArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
	let id = letterArray[Math.floor(Math.random() * letterArray.length)]
	id += ('000' + (Math.floor(Math.random() * 1000)).toString()).substr(-3)
	// let studentId = 'fbf3a29c-3d4c-4687-bff9-5216165ca47b';//A
	// let familyId = '7feb1a78-ee98-48f9-b389-8155e7b2f222';//B
	// let secondaryId = 'c2660053-903f-4bc5-b7b4-e4d7824a381f';//C
	// let studentId = '09af070d-04da-4e04-85d4-8d3ac6178f21';
	let studentId = '0f798345-7f85-4421-af92-8947c8dfc019';//Y
	let familyId = 'edb8cfba-a47a-4f48-bfd5-a0761e036795';//W
	let secondaryId = '5448c23a-2723-44f9-9809-cd7ec099a3b5';//T
	lastEnrollmentElementObject.id = id
	lastEnrollmentElementObject.familyId = familyId
	lastEnrollmentElementObject.studentId = studentId
	lastEnrollmentElementObject.secondaryId = secondaryId
	session.setItem('postedEnrollmentLastElement',JSON.stringify(lastEnrollmentElementObject));
	console.log(`session.getItem('postedEnrollmentLastElement'): ${session.getItem('postedEnrollmentLastElement')}`)
	// AFTER THIS KLUDGE - AS NORMAL: just Gather: session.getItem('postedEnrollmentLastElement')
	// ø </KLUDGE>
	let postedEnrollmentLastElementObject = JSON.parse(session.getItem('postedEnrollmentLastElement'))

	// $w('#postedEnrollmentLastKeyTxbox').value = typeof session.getItem('postedEnrollmentLastKey') !== 'string' || session.getItem('postedEnrollmentLastKey').length < 3 ? 'No Posted Enrollment This Session [key]': session.getItem('postedEnrollmentLastKey')
	// $w('#postedEnrollmentLastElementTxbox').value = typeof session.getItem('postedEnrollmentLastElement') !== 'string' || session.getItem('postedEnrollmentLastElement').length < 3 ? 'No Posted Enrollment This Session [element]': session.getItem('postedEnrollmentLastElement')
	// paramObject.responseString = typeof session.getItem('postedEnrollmentLastElement') !== 'string' || session.getItem('postedEnrollmentLastElement').length < 3 ? 'No Posted Enrollment This Session [element]': session.getItem('postedEnrollmentLastElement')
	let isValidSessionStorageValue = typeof session.getItem('postedEnrollmentLastElement') !== 'string' || session.getItem('postedEnrollmentLastElement').length < 3 ? false : true 
	if (!isValidSessionStorageValue) {
		paramObject.responseString = 'No Posted Enrollment This Session [element]'
		return;
	}
	paramObject.responseString = session.getItem('postedEnrollmentLastElement')
	// $w('#postedEnrollmentElementArrayTxbox').value = typeof session.getItem('postedEnrollmentElementArray') !== 'string' || session.getItem('postedEnrollmentElementArray').length < 3 ? 'No Posted Enrollment This Session [array]': session.getItem('postedEnrollmentElementArray')
	let paramObjectForRepeater = {}
	paramObjectForRepeater.repeaterId = 'postedEnrollmentLastElementRPTR'
	paramObjectForRepeater.containerBoxId = 'repeaterBox'
	paramObjectForRepeater.elementIdObject = {}
	paramObjectForRepeater.elementIdObjectKind = {} // default TXT
	
	// $w('#postedEnrollmentLastElementRPTR').expand()
	
	let repeaterElementObjectThis = {}
	let repeaterObject = {}
	repeaterObject.repeaterArray = []
	// ø <Manaul Assignment>
	// repeaterElementObjectThis = {}
	// repeaterElementObjectThis.title = "Student",
	paramObjectForRepeater.elementIdObject.title = 'titleTXT'
	// repeaterElementObjectThis.name = 'YIKES!'//studentId //YIKES
	paramObjectForRepeater.elementIdObject.name= 'nameTXT'
	paramObjectForRepeater.elementIdObject.labelTwo = 'labelTwoTXT'
	paramObjectForRepeater.elementIdObject.fieldTwo= 'fieldTwoTXT'
	paramObjectForRepeater.elementIdObject.avatar = 'infoPictureImage'
	paramObjectForRepeater.elementIdObjectKind.avatar = 'IMAGE'
	// repeaterElementObjectThis.titleSub = "",
	// repeaterElementObjectThis.bgColor = "https://static.wixstatic.com/media/523205_760601a9aeca428aadcc29d99a6558ec~mv2.png",
	// repeaterElementObjectThis.doxColor = "raspberry index:1",
	// repeaterElementObjectThis.doxRow = "Student",
	// repeaterElementObjectThis._id = postedEnrollmentLastElementObject.studentId
	// await repeaterObject.repeaterArray.push(repeaterElementObjectThis)

	// repeaterElementObjectThis = {}
	// repeaterElementObjectThis.title = "Primary Parent"
	// repeaterElementObjectThis.name = 'YIKES!'//familyId //YIKES
	// repeaterElementObjectThis.titleSub = ""
	// repeaterElementObjectThis.bgColor = "https://static.wixstatic.com/media/523205_5104d8acb3d2450c8b23ef9c4cb0d362~mv2.png"
	// repeaterElementObjectThis.doxColor = "mustard index:3"
	// repeaterElementObjectThis.doxRow = "Student"
	// repeaterElementObjectThis._id = postedEnrollmentLastElementObject.familyId
	// await repeaterObject.repeaterArray.push(repeaterElementObjectThis)

	// repeaterElementObjectThis = {}
	// repeaterElementObjectThis.title = "Secondary Parent",
	// repeaterElementObjectThis.name = 'YIKES!'//secondaryId //YIKES
	// repeaterElementObjectThis.titleSub = "",
	// repeaterElementObjectThis.bgColor = "https://static.wixstatic.com/media/523205_5274995693c04d1ab87b61ab8b23c94e~mv2.png"
	// repeaterElementObjectThis.doxColor = "mint index:2",
	// repeaterElementObjectThis.doxRow = "Student",
	// repeaterElementObjectThis._id = postedEnrollmentLastElementObject.secondaryId
	// await repeaterObject.repeaterArray.push(repeaterElementObjectThis)
	// ø </Manaul Assignment>
 
	// ø <L:oop Assignment>
	console.log('repeaterObject.repeaterArray:')
	console.dir(repeaterObject.repeaterArray)
	let personIdArray = []
	personIdArray.push(postedEnrollmentLastElementObject.studentId)
	personIdArray.push(postedEnrollmentLastElementObject.familyId)
	personIdArray.push(postedEnrollmentLastElementObject.secondaryId)
	let titleArray = ["Student","Primary Parent","Secondary Parent"]
	let doxRowArray = ["Student","Primary","Secondary"]
	let labelTwoArray = ["Source","Primary Info","Formatted Address"]
	let bgColorArray = []
	bgColorArray.push("https://static.wixstatic.com/media/523205_760601a9aeca428aadcc29d99a6558ec~mv2.png",)
	bgColorArray.push("https://static.wixstatic.com/media/523205_5104d8acb3d2450c8b23ef9c4cb0d362~mv2.png")
	bgColorArray.push("https://static.wixstatic.com/media/523205_5274995693c04d1ab87b61ab8b23c94e~mv2.png")
	let doxColorArray = ["raspberry index:1","mustard index:3","mint index:2"]
	// ø </L:oop Assignment>
	// let index = 0
	let repeaterRowContact = {}
	let infoPictureImagePath = ''
	console.groupCollapsed('Loop through PersonIds')
	console.log(`for (let index = 0; index < personIdArray.length; index++)`)
	for (let index = 0; index < personIdArray.length; index++) {
		// 202109_rptrForLoop

		let key = personIdArray[index];
		repeaterRowContact = await getContactById(key)

		console.log(`repeaterRowContact`)
		console.dir(repeaterRowContact)

	

		// ¡ <WHY DOESN'T THIS WORK>
		// ø <EMULATE getContactObjectById>
		// repeaterRowContact = {}
		// repeaterRowContact.adultDogName = dogNameArray[index]
		// wixEditor-ToolTip: "This expression is not callable. Type 'String' has no call signatures.""
		// ø </EMULATE getContactObjectById>
		// ¡ </WHY DOESN'T THIS WORK>
 
		repeaterObject.repeaterArray[index] = {};
		repeaterObject.repeaterArray[index].title = titleArray[index];
		repeaterObject.repeaterArray[index].doxRow = doxRowArray[index];
		// repeaterObject.repeaterArray[index].name = repeaterRowContact.adultDogName
		// repeaterObject.repeaterArray[index].name = repeaterRowContact.extendedFields['contacts.displayByFirstName']
		// repeaterObject.repeaterArray[index].name = (repeaterRowContact.info.name.first).trim() + ' ' + (repeaterRowContact.info.name.last).trim()
		repeaterObject.repeaterArray[index].name = repeaterRowContact.info.name.first + ' ' + repeaterRowContact.info.name.last
		repeaterObject.repeaterArray[index].labelTwo = labelTwoArray[index]
		repeaterObject.repeaterArray[index].fieldTwo = repeaterRowContact.source.sourceType
		repeaterObject.repeaterArray[index].fieldTwo = doxRowArray[index] === 'Primary' ? repeaterRowContact.primaryInfo.email + '\n' + repeaterRowContact.primaryInfo.phone : repeaterObject.repeaterArray[index].fieldTwo
		repeaterObject.repeaterArray[index].fieldTwo = doxRowArray[index] === 'Secondary' ? repeaterRowContact.info.addresses[0].address.formatted : repeaterObject.repeaterArray[index].fieldTwo




		// repeaterObject.repeaterArray[index].avatar = await getImagePath_ofRandomDiverseFace_NOTbackend()
		// repeaterObject.repeaterArray[index].infoPictureImage = await getImagePath_ofRandomDiverseFace_NOTbackend()
		// ø <infoPictureImagePath Manage Full Path Chunks>

		infoPictureImagePath = typeof repeaterRowContact.info.picture.image === 'string' && (repeaterRowContact.info.picture.image).length > 20 ? repeaterRowContact.info.picture.image : 'DEFAULT'
		// infoPictureImagePath = infoPictureImagePath === 'DEFAULT' ? await getImagePath_ofRandomDiverseFace_NOTbackend() : infoPictureImagePath;
		infoPictureImagePath = infoPictureImagePath === 'DEFAULT' ? await getImagePath_ofAlphabetAvatar_NOTbackend(repeaterRowContact.info.name.first) : infoPictureImagePath;
		// infoPictureImagePath = repeaterRowContact.info.picture.image
		let pathArray = [['','https://static.wixstatic.com/media/'],['https:','//static.wixstatic.com/media/'],['https://static.wixstatic.com/','media/']]
		let prepend = 'STRING'
		let ifStartsWith = 'STRING'
		pathArray.forEach(chunkArray => {
			prepend = chunkArray[0]
			ifStartsWith = chunkArray[1]
			infoPictureImagePath = infoPictureImagePath.substr(0,ifStartsWith.length) === ifStartsWith ? prepend + infoPictureImagePath : infoPictureImagePath	
		});
		ifStartsWith = 'https://static.wixstatic.com/media/'
		infoPictureImagePath = infoPictureImagePath.substr(0,ifStartsWith.length) === ifStartsWith ? infoPictureImagePath : ifStartsWith + infoPictureImagePath	
		// ø </infoPictureImagePath Manage Full Path Chunks>

		repeaterObject.repeaterArray[index].avatar = infoPictureImagePath
		// repeaterObject.repeaterArray[index].avatar.src = infoPictureImagePath
		// repeaterObject.repeaterArray[index].infoPictureImage = repeaterRowContact.info.picture.image

		repeaterObject.repeaterArray[index].bgColor = bgColorArray[index];
		repeaterObject.repeaterArray[index].doxColor = doxColorArray[index];
		repeaterObject.repeaterArray[index]._id = key;
		
	}
	console.groupEnd()

	// personIdArray.forEach(key => {
	// 	// ¡ <WHY DOESN'T THIS WORK>
	// 	// ø <EMULATE getContactObjectById>
	// 	// repeaterRowContact = {}
	// 	// repeaterRowContact.adultDogName = dogNameArray[index]
	// 	// wixEditor-ToolTip: "This expression is not callable. Type 'String' has no call signatures.""
	// 	// ø </EMULATE getContactObjectById>
	// 	// ¡ </WHY DOESN'T THIS WORK>
 
	// 	(repeaterObject.repeaterArray).push({})
	// 	repeaterObject.repeaterArray[index].title = titleArray[index];
	// 	repeaterObject.repeaterArray[index].doxRow = doxRowArray[index];
	// 	repeaterObject.repeaterArray[index].name = dogNameArray[index];
	// 	repeaterObject.repeaterArray[index].bgColor = bgColorArray[index];
	// 	repeaterObject.repeaterArray[index].doxColor = doxColorArray[index];
	// 	repeaterObject.repeaterArray[index]._id = key;
	// 	index++
	// });
 

	console.log('repeaterObject')
	console.dir(repeaterObject)
	console.groupEnd()
	paramObject.responseString = JSON.stringify(repeaterObject)
	
	await loadRepeaterWithArray(paramObjectForRepeater,repeaterObject.repeaterArray);

}

// ø <---------- <Updated (universal?) loadRepeaterWithArray>  ---------->
// ø <---------- <loadRepeaterWithArray>  ---------->
export async function loadRepeaterWithArray(paramObject = {}, preppedCourseRepeaterArray = []){
	console.groupCollapsed(`loadRepeaterWithArray(repeaterId = 'STRING', preppedCourseRepeaterArray = [])`)
    // 202109_UserInterface
    // 202109_ActionValueRepeaters
	if((paramObject.repeaterId).substr(0,1) !== '#'){
		paramObject.repeaterId = '#' + paramObject.repeaterId;
	}
	let repeaterId = paramObject.repeaterId;
	$w(repeaterId).expand()

	// ø <ELSE>
	if($w(paramObject.repeaterId).rendered === false){
		return;
	}
	// ø </ELSE>
	if((paramObject.containerBoxId).substr(0,1) !== '#'){
		paramObject.containerBoxId = '#' + paramObject.containerBoxId;
	}
	let supportedRepeaterElementIdArray = Object.keys(paramObject.elementIdObject);
	console.log('supportedRepeaterElementIdArray')
	console.dir(supportedRepeaterElementIdArray)
	// supportedRepeaterElementIdArray.forEach(key => {
	// 	if((paramObject.elementIdObject[key]).substr(0,1) !== '#'){
	// 		paramObject.elementIdObject[key] = '#' + paramObject.elementIdObject[key]
	// 	}
	// });
	

	// let prepKind = 'PENDING';
	// prepKind = repeaterId.indexOf('Header') ? 'header' : prepKind;
	// prepKind = repeaterId.indexOf('Primary') ? 'primary' : prepKind;



	$w(repeaterId).data = preppedCourseRepeaterArray;
	// let titleId = 'PENDING';
	// let titleSubId = 'PENDING';
	// let boxId = '#repeaterBox';// DEFAULT
	// titleId = repeaterId === '#rptrHeader' ? '#txtHdrTitle' : titleId;
	// titleId = repeaterId === '#rptrPrimary' ? '#txtPrimaryTitle' : titleId;
	// titleId = repeaterId === '#rptrStudent' ? '#txtStudentTitle' : titleId;
	// titleId = repeaterId === '#rptrSecondary' ? '#txtSecondaryTitle' : titleId;

	// titleSubId = repeaterId === '#rptrHeader' ? 'NA' : titleSubId;
	// titleSubId = repeaterId === '#rptrPrimary' ? '#txtPrimaryTitleSub' : titleSubId;
	// titleSubId = repeaterId === '#rptrStudent' ? '#txtStudentTitleSub' : titleSubId;
	// titleSubId = repeaterId === '#rptrSecondary' ? '#txtSecondaryTitleSub' : titleSubId;

	let boxId = paramObject.containerBoxId// UNTIL Refactoring
	// boxId = repeaterId === '#rptrHeader' ? '#boxHdr' : boxId;
	// boxId = repeaterId === '#rptrPrimary' ? '#boxPrimary' : boxId;
	// boxId = repeaterId === '#rptrStudent' ? '#boxStudent' : boxId;
	// boxId = repeaterId === '#rptrSecondary' ? '#boxSecondary' : boxId;
	// boxId = repeaterId === 'ZpostedEnrollmentLastElementRPTR' ? paramObject.containerBoxId : boxId;;
	
	console.groupCollapsed('repeaterIds')
	// console.log(`titleId: ${titleId}`)
	// console.log(`titleSubId: ${titleSubId}`)
	console.log(`repeaterId: ${repeaterId}`)
	console.log(`boxId: ${boxId}`)
	console.log(`paramObject.elementIdObject:`)
	console.dir(paramObject.elementIdObject)
	console.groupEnd();
	// console.groupCollapsed('repeaterIds')
	// console.groupEnd();
	let renderableKeyArray = Object.keys(paramObject.elementIdObject)
	// return;

	let elementId = '#####'
	$w(repeaterId).onItemReady( ($element, elementData,index) => {
		console.groupCollapsed(`$w(repeaterId).onItemReady( ($element, elementData,${index}) => {`)
		supportedRepeaterElementIdArray.forEach(elementKey => {
			console.groupCollapsed(`supportedRepeaterElementIdArray.forEach(${elementKey} => {`)
			// paramObject.elementIdObjectKind[elementKey] === 'IMAGE'
			elementId = '#' + paramObject.elementIdObject[elementKey]
			switch (paramObject.elementIdObjectKind[elementKey]) {
				case 'IMAGE':
					$element(elementId).src = elementData[elementKey];
					break;
			
				default:
					$element(elementId).text = elementData[elementKey];
					break;
			}
		console.groupEnd()
		});
		// let elementKey = supportedRepeaterElementIdArray[index]
		// supportedRepeaterElementIdArray.forEach(key => {e
		// 	$
		// });

		$element(boxId).background.src = elementData.bgColor;

		console.groupEnd()
	});
}
// ø <---------- </loadRepeaterWithArray> ---------->
// ø <---------- </Updated (universal?) loadRepeaterWithArray> ---------->
export async function getContactById(contactId = 'STRING') {
	console.groupCollapsed(`getContactById(contactId)`)
	// let currMemberId = 'fbf3a29c-3d4c-4687-bff9-5216165ca47b';
	console.log(`contactId: ${contactId}`)
	let contactReturned = await steamdaGetContactFunction(contactId);
	console.log(`let contactReturned = await steamdaGetContactFunction(currMemberId);`)
	// console.dir(contactReturned)
	console.groupEnd()
	return contactReturned
}
// ø <------------------------------  <getImagePath_ofRandomDiverseFace>  ------------------------------>
// ø <----------  <'_NOTbackend' Appended because this is a good candidate for BackEnd Code> ---------->
export async function getImagePath_ofRandomDiverseFace_NOTbackend(){
    
    let fileName = 'radomDiversityAvatarCollection.js'
    let source = 'https://www.constructionexec.com/article/four-ways-diversity-will-save-the-construction-industry'
    let randomizedInfoPicureImagePathArray = [
        'https://static.wixstatic.com/media/523205_ebe854e9fb3c494fa104cefa5d782cc1~mv2.jpeg',
        'https://static.wixstatic.com/media/523205_a9d51ef5e556471a8cb60760ecfd838d~mv2.jpeg',
        'https://static.wixstatic.com/media/523205_c184eec530a64a5a8f8a1adecbe416f0~mv2.jpeg',
        'https://static.wixstatic.com/media/523205_990f0d3173664f29871528dd9e10ae5b~mv2.jpeg',
        'https://static.wixstatic.com/media/523205_1a129e0f9eca4beca2ce4a8a8846d9cd~mv2.jpeg',
        'https://static.wixstatic.com/media/523205_32a2a2ae76ed4886b08f28907686a7b5~mv2.jpeg',
        'https://static.wixstatic.com/media/523205_9249dded66d24a1cb1add3acf6b7e5e4~mv2.jpeg',
        'https://static.wixstatic.com/media/523205_fe0c18716e3d450caf6671b5489cdbb7~mv2.jpeg',
        'https://static.wixstatic.com/media/523205_e4c6294828094d5a9c016f515c17c334~mv2.jpeg',
    ]
    return randomizedInfoPicureImagePathArray[Math.floor(Math.random() * randomizedInfoPicureImagePathArray.length)]
}
// ø <------------------------------  </getImagePath_ofRandomDiverseFace> ------------------------------>
// ø <------------------------------  <getImagePath_ofAlphabetAvatar>  ------------------------------>
// ø <----------  <'_NOTbackend' Appended because this is a good candidate for BackEnd Code> ---------->
export async function getImagePath_ofAlphabetAvatar_NOTbackend(letter = '#####'){
    let alphabetSimpleArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',];
    let alphabetPath2dArray = [
        ['A','https://static.wixstatic.com/media/523205_114dd1e33fdb47119f781a64296e0ad2~mv2.png'],
        ['B','https://static.wixstatic.com/media/523205_7cacff88119943d8889f06fb62c7f121~mv2.png'],
        ['C','https://static.wixstatic.com/media/523205_c48fb09bc4e246058a93521d5180bec0~mv2.png'],
        ['D','https://static.wixstatic.com/media/523205_4b27ad1015cf4b4c9f0958c5e91ac73c~mv2.png'],
        ['E','https://static.wixstatic.com/media/523205_dfb3eaab0b144d6c9a91fd36126c99ff~mv2.png'],
        ['F','https://static.wixstatic.com/media/523205_18a1cce02a3040c6b3b5ef5d259b14bb~mv2.png'],
        ['G','https://static.wixstatic.com/media/523205_e63a8e0e85bb46a883a07c2daf73f50a~mv2.png'],
        ['H','https://static.wixstatic.com/media/523205_b355d14b63d0430aad1c34cbae135c57~mv2.png'],
        ['I','https://static.wixstatic.com/media/523205_71af9a284e194c708f9860845273aca9~mv2.png'],
        ['J','https://static.wixstatic.com/media/523205_ba09afbd5d1945dfb2218a7953a8ff15~mv2.png'],
        ['K','https://static.wixstatic.com/media/523205_db9f7b3be60f4c1ea91a1fb4814a40e6~mv2.png'],
        ['L','https://static.wixstatic.com/media/523205_b37fa3b7e7c44cad8b6dd2dc682941f9~mv2.png'],
        ['M','https://static.wixstatic.com/media/523205_b8616176e53f4178945c37525720bf71~mv2.png'],
        ['N','https://static.wixstatic.com/media/523205_641f8447016542e8b4055046746dc887~mv2.png'],
        ['O','https://static.wixstatic.com/media/523205_2db0e20ef9c545bca30b45e61e57dcb3~mv2.png'],
        ['P','https://static.wixstatic.com/media/523205_795061ecbcb24c3c94ab558b01fa57bc~mv2.png'],
        ['Q','https://static.wixstatic.com/media/523205_2e90375d9f224a20b8ae6ab9e4a15a28~mv2.png'],
        ['R','https://static.wixstatic.com/media/523205_01d1e7e0cad143d0894a8dd04ae67b5c~mv2.png'],
        ['S','https://static.wixstatic.com/media/523205_29d37d6424ea4090b87cba4b872dbf55~mv2.png'],
        ['T','https://static.wixstatic.com/media/523205_3ed832ccb7244ac58434b185c9072168~mv2.png'],
        ['U','https://static.wixstatic.com/media/523205_22ce77d1585a4159b7bf6dbd3d859b90~mv2.png'],
        ['V','https://static.wixstatic.com/media/523205_c5ba8700874c4764893ae81e5d4ff514~mv2.png'],
        ['W','https://static.wixstatic.com/media/523205_559053b3b8504c21b9a6546cc2f8ea38~mv2.png'],
        ['X','https://static.wixstatic.com/media/523205_676e64b830d34a0e85b0eea3a311b4e7~mv2.png'],
        ['Y','https://static.wixstatic.com/media/523205_6d9818ec43b445848557e054944a0c48~mv2.png'],
        ['Z','https://static.wixstatic.com/media/523205_78078c0c1fa64bb8bccb5f9ee09df8fa~mv2.png']
    ];
    let altCharPath2dArray = [['@','https://static.wixstatic.com/media/523205_f29a8c1b82894bdcb1cde4f24607b15b~mv2.png']]
    
    letter = letter.toUpperCase()
    letter = letter === 'RANDOM' ? alphabetSimpleArray[Math.floor(Math.random() * alphabetSimpleArray.length)] : letter;
    while(letter.length > 1){
        if(alphabetSimpleArray.includes(letter.substr(0,1))){
            letter = letter.substr(0,1)
        }else{
            letter = letter.substr(1)
        }
    }
    // letter = alphabetSimpleArray.includes(letter.substr(0,1)) ? letter : 'RANDOM'
    // letter = letter === 'RANDOM' ? alphabetSimpleArray[Math.floor(Math.random() * alphabetSimpleArray.length)] : letter;
    letter = alphabetSimpleArray.includes(letter.substr(0,1)) ? letter : 'RANDOM_ALT'
    // letter = letter === 'RANDOM_ALT' ? altCharPath2dArray[Math.floor(Math.random() * altCharPath2dArray.length)] : letter;
    
    let letterIndex = alphabetSimpleArray.indexOf(letter)
	let path = letterIndex < 0 ? altCharPath2dArray[Math.floor(Math.random() * altCharPath2dArray.length)][1] : alphabetPath2dArray[letterIndex][1]
    return path
}
// ø <------------------------------  </getImagePath_ofAlphabetAvatar> ------------------------------>   
// ø <---------- </loadRepeaterWithArray 202109 GROUP> ---------->