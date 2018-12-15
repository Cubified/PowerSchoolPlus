/*
 * HCPS PowerSchool Plus v3.8.1
 * Andrew Russell 2018
 */

const InitCalc = require('./InitCalc.js'),
   InitWaves = require('./InitWaves.js'),
   InitPreferredName = require('./InitPreferredName.js'),
   InitThemes = require('./InitThemes.js'),
   InitNotifications = require('./InitNotifications.js'),
   InitMenuOption = require('./InitMenuOption.js'),
   InitGradeIndicator = require('./InitGradeIndicator.js'),
   InitGradeHistory = require('./InitGradeHistory.js'),
   InitGradeDisplayStyle = require('./InitGradeDisplayStyle.js'),
   InitSmallFixes = require('./InitSmallFixes.js');

const ver = '3.8.1';

function PowerSchoolPlus() {
   this.init = () => {
      chrome.storage.sync.get('settings', (data) => {
         if(data.settings !== undefined) {
            if(data.settings.gradecalc) {
               InitCalc();
            }
            if(data.settings.buttonripples) {
               InitWaves();
            }
            if(data.settings.preferredname) {
               InitPreferredName();
            }
            if(data.settings.themes) {
               InitThemes();
            }
            if(data.settings.notifications) {
               InitNotifications(ver);
            }
            if(data.settings.indicator) {
               InitGradeIndicator();
            }
            InitGradeDisplayStyle();
            InitMenuOption(ver);
            InitGradeHistory();
            InitSmallFixes();
         } else {
            InitCalc();
            InitWaves();
            InitPreferredName();
            InitThemes();
            InitNotifications(ver);
            InitGradeIndicator();
            InitMenuOption(ver);
            InitGradeHistory();
            InitSmallFixes();
         }
      });
   };
   return this;
}

const ext = new PowerSchoolPlus();
ext.init();

