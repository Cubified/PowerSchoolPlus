function InitThemes() {
    const saveTheme = (name) => {
        chrome.storage.sync.set({
            'theme': name
        });
    };
    const getTheme = (callback) => {
        chrome.storage.sync.get('theme', callback);
    };
    const updateTheme = (name) => {
        saveTheme(name);
        location.reload();
    };
    const changeTheme = () => {
        if (location.href == 'https://sis.henrico.k12.va.us/public/home.html' || location.href == 'https://sis.henrico.k12.va.us/public/') {
            const link = document.createElement('select');
            link.id = 'changeTheme';
            getTheme((data) => {
                if (data.theme !== null && data.theme !== undefined) {
                    document.getElementById('changeTheme').value = data.theme;
                }
            });
            const optionTwo = document.createElement('option');
            optionTwo.value = 'red';
            optionTwo.innerHTML = 'Red';
            const optionThree = document.createElement('option');
            optionThree.value = 'pink';
            optionThree.innerHTML = 'Pink';
            const optionSix = document.createElement('option');
            optionSix.value = 'orange';
            optionSix.innerHTML = 'Orange';
            const optionSeven = document.createElement('option');
            optionSeven.value = 'yellow';
            optionSeven.innerHTML = 'Yellow';
            const optionFive = document.createElement('option');
            optionFive.value = 'green';
            optionFive.innerHTML = 'Green';
            const optionFour = document.createElement('option');
            optionFour.value = 'cyan';
            optionFour.innerHTML = 'Cyan';
            const optionOne = document.createElement('option');
            optionOne.value = 'blue';
            optionOne.innerHTML = 'Blue';
            link.appendChild(optionTwo);
            link.appendChild(optionThree);
            link.appendChild(optionSix);
            link.appendChild(optionSeven);
            link.appendChild(optionFive);
            link.appendChild(optionFour);
            link.appendChild(optionOne);
            document.getElementById('login-help').appendChild(link);
            link.onchange = () => {
                updateTheme(document.getElementById('changeTheme').value);
            }
        }
    };
    changeTheme();

    getTheme((data) => {
        if (data.theme !== undefined) {
            [].forEach.call(document.querySelectorAll('button'), (e, i, a) => {
                e.classList.add(data.theme);
            });
            [].forEach.call(document.querySelectorAll('th'), (e, i, a) => {
                e.classList.add(data.theme);
                e.style.border = '1px solid black';
            });
            [].forEach.call(document.querySelectorAll('td.bold'), (e, i, a) => {
                e.classList.add(data.theme);
                e.style.border = '1px solid black';
            });
            if (location.href === 'https://sis.henrico.k12.va.us/public/home.html' || location.href === 'https://sis.henrico.k12.va.us/public/') {
                document.getElementById('changeTheme').value = data.theme;

                document.getElementById('signin-custom-message').classList.add(data.theme);
            }
        }
        else {
            [].forEach.call(document.querySelectorAll('button'), (e, i, a) => {
                e.classList.add('blue');
            });
            [].forEach.call(document.querySelectorAll('th'), (e, i, a) => {
                e.classList.add('blue');
                e.style.border = '1px solid black';
            });
            [].forEach.call(document.querySelectorAll('td.bold'), (e, i, a) => {
                e.classList.add('blue');
                e.style.border = '1px solid black';
            });
            if (location.href === 'https://sis.henrico.k12.va.us/public/home.html' || location.href === 'https://sis.henrico.k12.va.us/public/') {
                document.getElementById('changeTheme').value = 'blue';
                document.getElementById('signin-custom-message').classList.add('blue');
            }
        }
    });
}

module.exports = InitThemes;