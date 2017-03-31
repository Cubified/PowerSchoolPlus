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
    InitGradeHistory = require('./InitGradeHistory.js'),
    InitGradeDisplayStyle = require('./InitGradeDisplayStyle.js');

const ver = '3.0.0';

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
                    InitNotifications(ver);
                }
                if (data.settings.indicator) {
                    InitGradeIndicator();
                }
                InitGradeDisplayStyle();
                InitMenuOption(ver);
                InitGradeHistory();
            }
            else {
                InitCalc();
                InitWaves();
                InitPreferredName();
                InitThemes();
                InitNotifications(ver);
                InitGradeIndicator();
                InitMenuOption(ver);
                InitGradeHistory();
            }
        });
    };
    return this;
}

const ext = new PowerSchoolPlus();
ext.init();