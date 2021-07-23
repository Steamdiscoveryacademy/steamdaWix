// ! ================================================
// ! ================================================
// ! as this is a separate DOX file, only the Dox-Block will be meticulously maintained
// ! please use the DOX here and the CODE in the the main file
// ! (same filename without '_DOX' appended)
// ! there will be some effort to keep the code here up-to-date...
// ! but Again, please use the DOX here and the CODE in the the main file
// ! ================================================
// ! ================================================
// ø <---------- <doBootstrapMessage UI>  ---------->
// ø FIND superSeven202107 BOOTSTRAP-MESSAGE
// ! NOTE: perhaps this should be in 'backend/utility.jsw'
export function doBootstrapMessage(key,messageThis = 'DEFAULT', responsiveByLengthToFontSize2dArray = [],txtColor = '#007bff',bgColor = '#FFFFFF'){
// console.log("[fnc]key: " + key)
	let messages = [];
	let messageMatchKey = {};
	messageMatchKey.primary = "0";
	messageMatchKey.success = "1";
	messageMatchKey.warning = "2";
	messageMatchKey.danger = "3";
	messageMatchKey.info = "4";
	messageMatchKey.devel = "5";
	messageMatchKey['key0'] = "primary";
	messageMatchKey['key0'] = "primary";
	messageMatchKey['key1'] = "success";
	messageMatchKey['key2'] = "warning";
	messageMatchKey['key3'] = "danger";
	messageMatchKey['key4'] = "info";
	messageMatchKey['key5'] = "devel";
	messages.push('This is the Primary test message.');
	messages.push('This is the Success test message.');
	messages.push('This is the Waarning test message.');
	messages.push('This is the Danger test message.');
	messages.push('This is the Info test message.');
	messages.push('This is the Devel test message.');
	
	txtColor = key === 'primary' ? '#007bff' : txtColor;
	txtColor = key === 'success' ? '#ffffff' : txtColor;
	bgColor = key === 'success' ? '#28a745' : bgColor;
	// ! <only txtColor setting at this time>
	// txtColor = key === 'warning' ? '#ffc107' : txtColor;
	// bgColor = key === 'warning' ? '#000000' : bgColor;
	// ! OR
	txtColor = key === 'warning' ? '#000000' : txtColor;
	bgColor = key === 'warning' ? '#ffc107' : bgColor;
	// ! </only txtColor setting at this time>
    // ! <could apply to all, but especially the two negative respoinses>
	// txtColor = key === 'danger' ? '#dc3545' : txtColor;
	// bgColor = key === 'danger' ? '#FFFFFF' : bgColor;
	// ! OR
	txtColor = key === 'danger' ? '#FFFFFF' : txtColor;
	bgColor = key === 'danger' ? '#dc3545' : bgColor;
	// ! </could apply to all, but especially the two negative respoinses>
	txtColor = key === 'info' ? '#17a2b8' : txtColor;
	txtColor = key === 'devel' ? '#6610f2' : txtColor;

	let indexThis = Number(messageMatchKey[key]);
	messageThis = messageThis === 'DEFAULT' ? messages[indexThis] : messageThis;
	
	let length = messageThis.length;
	// ! <make this meaningful by trial and error if it matters>
	// ø below: use something more rigorous than a series of ternary operators, but it is nice an explicit as you are building
	// ø below: Manual and KLUDGE-y
	// ø ø    use responsiveByLengthToFontSize2dArray instead
	// ø but: IIABDFI, so not being removed at this time
	let pixelsByBreakPoint = '36';//just a good value for the original use-case
	pixelsByBreakPoint = length < 10 ? '36' : pixelsByBreakPoint;
	pixelsByBreakPoint = length < 50 ? '36' : pixelsByBreakPoint;
	pixelsByBreakPoint = length < 100 ? '36' : pixelsByBreakPoint;
	pixelsByBreakPoint = fontSizeOverride === 7 ? pixelsByBreakPoint : fontSizeOverride.toString();
	// ! </make this meaningful by trial and error if it matters>
	
	if(responsiveByLengthToFontSize2dArray.length > 0){
		/**
		 * To Override 36 to a different _single_ font-size:
		 * [[-1,18]]
		 * example above would be fo 18px for all text
		 */

		/**
		 * To use Responsively for a gradually smaller font as the length increases:
		 * * the logic is the same as the manual version above
		 * * if you fail to adhere to the paradigm 
		 * *     that is, increasing length and decreasing font-size, then the logic  will fail
		 * * *    as you _want_ the pixels (second value of the pair) 
		 *        from the last pair where the length of 'messageThis' 
		 *        is greater than the break-ppint (first value of the pair)
		 * * always start with -1 for the initial length since _every_ length is greater than -1
		 * [
		 * [-1,60],
		 * [25,48],
		 * [50,36],
		 * [75,24],
		 * [100,12]
		 * ]
		 * * NOTE: example above NOT tested, will add a concrete exmple if I remember
		 * * NOTE: this NOT intended to replace _true_ responsive design, 
		 *         it is only for a very specific use case and could 
		 *         currupt existing responive code 
		 * * NOTE: needs testing... but it should be good other than bone-head and/or typo bugs
		 */

		let length = -1;
		let fontSize = pixelsByBreakPoint;
		 responsiveByLengthToFontSize2dArray.forEach(pair => {
			// console.log(pair);
			length = pair[0];
			fontSize = pair[1];
			if(messageThis.length > length){
				pixelsByBreakPoint = fontSize;
			}
		});
	}
	
	let style = `font-size: ${pixelsByBreakPoint}px;font-family: Avenir, Arial, Helvetica, sans-serif;background-color:${bgColor};color:${txtColor};text-align:center;`

	// ø below: use something other than <p>?
	let html = `<p style="${style}">` + messageThis + `</p>`;
	// $w('#txtBootstrapPrimary').html = html;
	// $w('#txtBootstrapPrimary').expand();
    return html;
}
// ø <---------- </doBootstrapMessage UI> ---------->