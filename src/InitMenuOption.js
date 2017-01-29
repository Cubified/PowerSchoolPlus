var Dialogger = require('../Dialogger.js');

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

module.exports = InitMenuOption;