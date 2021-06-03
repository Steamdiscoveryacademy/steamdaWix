// ø <---------- <toLocalISO>  ---------->
export function toLocalISO( date ){
	let isDate = date instanceof Date && !isNaN(date.valueOf());
	let now = new Date();
	let evalDate = isDate ? date : now;
	let returnString = '';
	returnString += evalDate.getFullYear();
	returnString += ("00" + (evalDate.getMonth() + 1).toString()).substr(-2);
	returnString += ("00" + evalDate.getDate().toString()).substr(-2);
	// returnString += evalDate.getDate();
	returnString += ("00" + evalDate.getHours().toString()).substr(-2);;
	returnString += ("00" + evalDate.getMinutes().toString()).substr(-2);;
	returnString += ("00" + evalDate.getSeconds().toString()).substr(-2);;

	return returnString;
}
// ø <---------- </toLocalISO> ---------->