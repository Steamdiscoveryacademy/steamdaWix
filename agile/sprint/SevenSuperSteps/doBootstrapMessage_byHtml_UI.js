// ø <---------- <doBootstrapMessage UI>  ---------->
// ø FIND superSeven202107 BOOTSTRAP-MESSAGE
// ! NOTE: consider,INSTEAD, using 'backend/utility.jsw:renderBootstrapMarkdownString'
// !           this is where all enhancements will be place
// ! 20210723171500=>    at this time it _exists_ out there and hasn't broken anything
// ! I WILL TRY TO KEEP UP, BUT CHECK THE FILE ITSELF, and/or git to be certain
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
		let pixelsByBreakPoint = '36';//just a good value for the original use-case
		if(responsiveByLengthToFontSize2dArray.length > 0){
			/**
			 * see separate DOX file 
			 * here: steamdaWixLocal/steamdaWix/agile/sprint/SevenSuperSteps/doBootstrapMessage_byHtml_UI_DOX.js
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
		
		// ø <render STYLE>
		let style = `font-size: ${pixelsByBreakPoint}px;font-family: Avenir, Arial, Helvetica, sans-serif;background-color:${bgColor};color:${txtColor};text-align:center;`
		// ø </render STYLE>
	
		// ø <render HTML>
		let html = `<p style="${style}">` + messageThis + `</p>`;
		// ø </render HTML>
		return html;
	}
	// ø <---------- </doBootstrapMessage UI> ---------->