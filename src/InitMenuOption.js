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

function InitMenuOption() {
	// This is put in a try/catch statement so that it will fail silently, as the sidebar option will throw an error when it attempts to attach itself to an element that does not exist
    try {
        var dialog = document.createElement('div');
        dialog.id = 'dialog-psp';
        dialog.innerHTML = `
			<h1>HCPS PowerSchool Plus v0.2.0</h1>
			<br>
			<a class='center-inline' href="chrome-extension://dibndjeeemhjkcieffbjkjdgleplkhkl/note.html">A note about grade calculation</a>
		`;
        document.body.appendChild(dialog);

        Dialogger.attach('#dialog-psp');
        Dialogger.init();

        var createdElement = document.createElement('li');
        var createdLink = document.createElement('a');
        createdLink.classList.add('button-options');
        createdLink.innerHTML = 'PowerSchool Plus';
        createdLink.addEventListener('click', () => {
            dialog.toggleState();
        });
        createdElement.appendChild(createdLink);
        document.getElementById('btn-transportation').parentNode.appendChild(createdElement);
    }
    catch (e) {

    }
}