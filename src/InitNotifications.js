const utils = require('./lib/PowerSchoolUtil.js');

function InitNotifications(ver) {
    if (utils.IsLoginScreen()) {
        if (document.getElementById('signin-custom-message') === null) {
            document.querySelector('fieldset').innerHTML += '<div id="signin-custom-message"></div>';
        }
		chrome.storage.local.get('firstrun',(data)=>{
    	    const parentElem = document.getElementById('signin-custom-message');
       		parentElem.classList.add('enabled');
   		    parentElem.addEventListener('click', () => {
   		        window.open('https://chrome.google.com/webstore/detail/hcps-powerschool-plus/' + chrome.runtime.id, '_self');
	        });
			if(data.firstrun === undefined || data.firstrun !== ver){
				parentElem.classList.add('firstrun');
				parentElem.innerHTML = '<span class="full-width">HCPS PowerSchoolPlus updated to version ' + ver + '<br>This release improves the grade calculator.  Click to see what else is new</span>';
				chrome.storage.local.set({firstrun:ver});
			} else{
	        	parentElem.innerHTML = '<span class="full-width">You are using HCPS PowerSchool Plus v'+ver+'<br>Click to see what\'s new</span>';
			}
		});
    }
}

module.exports = InitNotifications;
