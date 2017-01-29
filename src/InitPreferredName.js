function InitPreferredName() {
    var setName = window.setName = (newName) => {
        chrome.storage.sync.set({
            'preferredName': newName
        });
        document.querySelectorAll('#userName > span')[0].innerHTML = newName;
    };
    var getName = window.getName = (callback) => {
        chrome.storage.sync.get('preferredName', callback);
    };
    if (location.href.indexOf('https://sis.henrico.k12.va.us/guardian/') > -1) {
        document.querySelectorAll('#userName > span')[0].addEventListener('click', () => {
            var response = prompt('Enter preferred name:');
            if (response !== null) {
                window.setName(response);
            }
        });

        window.getName((data) => {
            if (data.preferredName !== undefined) {
                document.querySelectorAll('#userName > span')[0].innerHTML = data.preferredName;
            }
        });
    }
}

module.exports = InitPreferredName;