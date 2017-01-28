/*
HCPS PowerSchool Plus v0.2.0
Andrew Russell 2017

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>
*/

function InitNotifications(){
    if (location.href == 'https://sis.henrico.k12.va.us/public/home.html' || location.href == 'https://sis.henrico.k12.va.us/public/') {
        var parentElem = document.getElementById('signin-custom-message');
        parentElem.addEventListener('click',()=>{
        	window.open('https://chrome.google.com/webstore/detail/hcps-powerschool-plus/dibndjeeemhjkcieffbjkjdgleplkhkl','_self');
        });
        parentElem.innerHTML = 'You are using HCPS PowerSchool Plus v0.2.0<br>Click to see what\'s new';
    }
}