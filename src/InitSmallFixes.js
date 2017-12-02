const utils = require('./lib/PowerSchoolUtil.js');

function InitSmallFixes() {
   if(utils.IsLoginScreen()) {
      // Disable strange "scaling down" bug
      let style = document.createElement('style');
      style.innerHTML = `*:not(.waves-effect):not(.waves-rippling):not(.waves-ripple){transition:none !important;}`;
      document.head.appendChild(style);

	  // Focus username input box
	  document.querySelector('#fieldAccount').focus();
   }
}

module.exports = InitSmallFixes;

