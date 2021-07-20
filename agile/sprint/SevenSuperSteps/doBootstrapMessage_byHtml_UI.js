// ø <---------- <doBootstrapMessage UI>  ---------->
export function doBootstrapMessage(key,txtColor = '#007bff',bgColor = '#FFFFFF'){
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
	txtColor = key === 'success' ? '#28a745' : txtColor;
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
	let messageThis = messages[indexThis];
	
	let length = messageThis.length;
	// ! <make this meaningful by trial and error if it matters>
	// ø below: use something more rigorous than a series of ternary operators, but it is nice an explicit as you are building
	let pixelsByBreakPoint = '36';
	pixelsByBreakPoint = length < 10 ? '36' : pixelsByBreakPoint;
	pixelsByBreakPoint = length < 50 ? '36' : pixelsByBreakPoint;
	pixelsByBreakPoint = length < 100 ? '36' : pixelsByBreakPoint;
	// ! </make this meaningful by trial and error if it matters>
	let style = `font-size: ${pixelsByBreakPoint}px;font-family: Avenir, Arial, Helvetica, sans-serif;background-color:${bgColor};color:${txtColor};text-align:center;`

	// ø below: use something other than <p>?
	let html = `<p style="${style}">` + messageThis + `</p>`;
	// $w('#txtBootstrap').html = html;
	// $w('#txtBootstrap').expand();
    return html;
}
// ø <---------- </doBootstrapMessage UI> ---------->
