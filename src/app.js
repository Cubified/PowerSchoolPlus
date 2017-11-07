/*
 * HCPS PowerSchool Plus v3.0.0
 * Andrew Russell 2017
 */

/*
 * TODO:
 * - Fix strange visual anomaly on login screen where form elements seem to scale down (occasionally reproducible, almost seems random)
 * - Fix border along bottom row of attendance/grades table
 * - Fix grade history being recorded upon every visit (also occasionally reproducible)
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
