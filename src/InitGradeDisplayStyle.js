const loadSettings = (callback) => {
	chrome.storage.sync.get('gradedisplay', callback);
};

function InitGradeDisplayStyle() {
	if(location.href.indexOf('https://sis.henrico.k12.va.us/guardian/scores.html') > -1) {
		loadSettings((data) => {
			if(data.gradedisplay !== undefined && data.gradedisplay !== 'default') {
				let style = document.createElement('style');
				style.innerHTML = `
                    td{
                        padding:${data.gradedisplay==='narrow'?'0':'10px'}
                    }
                `;
				document.head.appendChild(style);
			}
		});
	}
}

module.exports = InitGradeDisplayStyle;
