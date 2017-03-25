/*
 * HCPS PowerSchool Plus v0.2.7
 * Andrew Russell 2017
 */

const InitCalc = require('./InitCalc.js'),
    InitWaves = require('./InitWaves.js'),
    InitPreferredName = require('./InitPreferredName.js'),
    InitThemes = require('./InitThemes.js'),
    InitNotifications = require('./InitNotifications.js'),
    InitMenuOption = require('./InitMenuOption.js'),
    InitGradeIndicator = require('./InitGradeIndicator.js'),
    InitGradeHistory = require('./InitGradeHistory.js');

function PowerSchoolPlus() {
    this.init = () => {
        chrome.storage.sync.get('settings', (data) => {
            if (data.settings !== undefined) {
                if (data.settings.gradecalc) {
                    InitCalc();
                }
                if (data.settings.buttonripples) {
                    InitWaves();
                }
                if (data.settings.preferredname) {
                    InitPreferredName();
                }
                if (data.settings.themes) {
                    InitThemes();
                }
                if (data.settings.notifications) {
                    InitNotifications();
                }
                if (data.settings.indicator) {
                    InitGradeIndicator();
                }
                if (data.settings.history) {
                    InitGradeHistory();
                }
                InitMenuOption();
            }
            else {
                InitCalc();
                InitWaves();
                InitPreferredName();
                InitThemes();
                InitNotifications();
                InitGradeIndicator();
                InitMenuOption();
                InitGradeHistory();
            }
        });
    };
    return this;
}

const ext = new PowerSchoolPlus();
ext.init();