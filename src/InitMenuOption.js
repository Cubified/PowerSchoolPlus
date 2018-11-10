const Dialogger = require('./lib/Dialogger.v2.js');

const saveSettings = (json) => {
   chrome.storage.sync.set({
      settings: json
   });
};
const loadSettings = (callback) => {
   chrome.storage.sync.get('settings', callback);
};

function InitMenuOption(ver) {
   try {
      const dialog = document.createElement('div');
      dialog.id = 'dialog-psp';
      dialog.classList.add('Dialogger');
      dialog.innerHTML = `<div><div>
			<h1>HCPS PowerSchool Plus v${ver}</h1>
			<br>
			<a href="chrome-extension://${chrome.runtime.id}/src/html/note.html">A note about grade calculation</a>
            <br>
            <a href="chrome-extension://${chrome.runtime.id}/src/html/history.html">View your grade history for this quarter</a>
            <br><br>
            <label for="toggle-gradecalc">Enable grade calculator: </label><input type='checkbox' checked id="toggle-gradecalc"><br>
            <label for="toggle-buttonripples">Enable button ripples: </label><input type='checkbox' checked id="toggle-buttonripples"><br>
            <label for="toggle-preferredname">Enable preferred name: </label><input type='checkbox' checked id="toggle-preferredname"><br>
            <label for="toggle-themes">Enable themes: </label><input type='checkbox' checked id="toggle-themes"><br>
            <label for="toggle-notifications">Enable login screen notifications: </label><input type='checkbox' checked id="toggle-notifications"><br>
            <label for="toggle-indicator">Enable grade change indicator: </label><input type='checkbox' checked id="toggle-indicator"><br>
            <label>Grade entry spacing:  </label><select id="gradedisplay">
                <option value="default" selected>Default</option>
                <option value="narrow">Narrow</option>
                <option value="comfy">Comfy</option>
            </select>
            <br><br>(Changes will come into effect when this dialog is closed)</div></div>
		`;
      document.body.appendChild(dialog);

      loadSettings((data) => {
         if(data.settings !== undefined) {
            for(let key in data.settings) {
               document.getElementById('toggle-' + key).checked = data.settings[key];
            }
         }
      });

      chrome.storage.sync.get('gradedisplay', (data) => {
         if(data.gradedisplay !== undefined) {
            document.getElementById('gradedisplay').value = data.gradedisplay;
         }
      });

      Dialogger(dialog, {
         onClose: function() {
            const json = {};
            [].forEach.call(document.getElementById('dialog-psp').querySelectorAll('input'), (e) => {
               json[e.id.split('toggle-')[1]] = e.checked;
            });
            saveSettings(json);
            chrome.storage.sync.set({
               'gradedisplay': document.getElementById('gradedisplay').value
            });
            location.reload();
         }
      });

      const createdElement = document.createElement('li');
      const createdLink = document.createElement('a');
      createdLink.classList.add('button-options');
      createdLink.innerHTML = 'PowerSchool Plus';
      createdLink.addEventListener('click', () => {
         dialog.toggleState();
      });
      createdElement.appendChild(createdLink);
      document.getElementById('btn-transportation').parentNode.appendChild(createdElement);
   } catch(e) {}
}

module.exports = InitMenuOption;

