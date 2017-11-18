const utils = require('./lib/PowerSchoolUtil.js');

function InitPreferredName() {
	let setName = window.setName = (newName) => {
		chrome.storage.sync.set({
			'preferredName': newName
		});
		document.querySelectorAll('#userName > span')[0].innerHTML = newName;
	};
	let getName = window.getName = (callback) => {
		chrome.storage.sync.get('preferredName', callback);
	};
	if(!utils.IsLoginScreen() && document.querySelector('#userName')) {
		document.querySelectorAll('#userName > span')[0].addEventListener('click', () => {
			const response = prompt('Enter preferred name:');
			if(response !== null) {
				window.setName(response);
			}
		});

		window.getName((data) => {
			if(data.preferredName !== undefined) {
				document.querySelectorAll('#userName > span')[0].innerHTML = data.preferredName;
			}
		});
	}
}

module.exports = InitPreferredName;
