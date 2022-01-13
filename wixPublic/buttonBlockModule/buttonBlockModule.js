// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import {local, session, memory} from 'wix-storage';
import wixData from 'wix-data';
import wixWindow from 'wix-window';
import wixLocation from 'wix-location';
import {addFrom_toggleExpandButtons} from 'public/toggleExpandButtons.js'; 
import {assignStringsOnReady} from 'public/toggleExpandButtons.js'; 
import {btnblkToggleBTN_click} from 'public/toggleExpandButtons.js'; 
import {btnblkDoBTN_click} from 'public/toggleExpandButtons.js'; 

$w.onReady(function () {
	develOnReady()
	callPublicADD_from_toggleExpandButtons_OnReady ()
	assignStringsOnReady()
});

export function callPublicADD_from_toggleExpandButtons_OnReady () {
	console.groupCollapsed(`callPublicADD_from_toggleExpandButtons_OnReady`)
	let yyyymmOfBuild = 202111
	let ddOfBuild = 9
    let sum = addFrom_toggleExpandButtons(yyyymmOfBuild,ddOfBuild);
	console.log(`${sum} = addFrom_toggleExpandButtons(${202111},${9})`)
    console.groupEnd();
}


export async function develOnReady(){
	let termObject = JSON.parse(local.getItem('lastParamObject'))
	$w('#txareaCodeBlock').value = JSON.stringify(termObject,undefined,4)
	await wixWindow.copyToClipboard($w('#txareaCodeBlock').value)
}

//====================================================================================================
//====================================================================================================
//==============================           Buttons ONLY Below           ==============================
//==============================           (and other Events)           ==============================
//====================================================================================================

export function btnblkToggle1BTN_click(event) {
	btnblkToggleBTN_click('btnblkToggle1BTN_click(event)')
}

export function btnblkToggle2BTN_click(event) {
	btnblkToggleBTN_click('btnblkToggle2BTN_click(event)')
}

export function btnblkDo1BTN_click(event) {
	btnblkDoBTN_click('btnblkDo1BTN_click(event)')
}

export function btnblkDo2BTN_click(event) {
	btnblkDoBTN_click('btnblkDo2BTN_click(event)')
}