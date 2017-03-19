function InitNotifications(){
    if (location.href == 'https://sis.henrico.k12.va.us/public/home.html' || location.href == 'https://sis.henrico.k12.va.us/public/') {
    	if(document.getElementById('signin-custom-message') == null){
    		document.querySelector('fieldset').innerHTML += '<div id="signin-custom-message"></div>';
    	}
        var parentElem = document.getElementById('signin-custom-message');
        parentElem.classList.add('enabled');
        parentElem.addEventListener('click',()=>{
        	window.open('https://chrome.google.com/webstore/detail/hcps-powerschool-plus/dibndjeeemhjkcieffbjkjdgleplkhkl','_self');
        });
        parentElem.innerHTML = '<span class="full-width">You are using HCPS PowerSchool Plus v0.2.7<br>Click to see what\'s new</span>';
    }
}

module.exports = InitNotifications;