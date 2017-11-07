const utils = require('./lib/PowerSchoolUtil.js');

function InitSmallFixes(){
	if(utils.IsLoginScreen()){
		let style = document.createElement('style');
		style.innerHTML = `*:not(.waves-effect):not(.waves-rippling):not(.waves-ripple){transition:none !important;}`;
		document.head.appendChild(style);
	}
}

module.exports = InitSmallFixes;
