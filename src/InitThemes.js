const utils = require('./lib/PowerSchoolUtil.js');

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
      if(utils.IsLoginScreen()) {
         const link = document.createElement('select');
         link.id = 'changeTheme';
         getTheme((data) => {
            if(data.theme !== null && data.theme !== undefined) {
               document.getElementById('changeTheme').value = data.theme;
            }
         });
         const themeNames = [
            'Red',
            'Pink',
            'Orange',
            'Yellow',
            'Green',
            'Cyan',
            'Blue',
            'Purple',
            'Gray'
         ];
         themeNames.forEach((e) => {
            link.innerHTML += `<option value="${e.toLowerCase()}">${e}</option>`;
         });
         document.getElementById('login-help').appendChild(link);

         // I have NO IDEA why what I had before stopped working.

         document.getElementById('login-inputs').onchange = (e) => {
            if(e.target === document.getElementById('changeTheme')) {
               updateTheme(document.getElementById('changeTheme').value);
            }
         };
      }
   };
   changeTheme();

   getTheme((data) => {
      if(data.theme !== undefined) {
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
         if(utils.IsLoginScreen()) {
            document.getElementById('changeTheme').value = data.theme;

            document.getElementById('signin-custom-message').classList.add(data.theme);
         }
      } else {
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
         if(utils.IsLoginScreen()) {
            document.getElementById('changeTheme').value = 'blue';
            document.getElementById('signin-custom-message').classList.add('blue');
         }
      }
   });
}

module.exports = InitThemes;

