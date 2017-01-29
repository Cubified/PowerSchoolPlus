function InitNotifications(){
    if (location.href == 'https://sis.henrico.k12.va.us/public/home.html' || location.href == 'https://sis.henrico.k12.va.us/public/') {
        var parentElem = document.getElementById('signin-custom-message');
        parentElem.addEventListener('click',()=>{
        	window.open('https://chrome.google.com/webstore/detail/hcps-powerschool-plus/dibndjeeemhjkcieffbjkjdgleplkhkl','_self');
        });
        parentElem.innerHTML = 'You are using HCPS PowerSchool Plus v0.2.0<br>Click to see what\'s new';
    }
}