/*
 * HCPS PowerSchool Plus v0.2.5
 * Andrew Russell 2017
 */

var InitCalc = require('./src/InitCalc.js'),
	InitWaves = require('./src/InitWaves.js'),
	InitPreferredName = require('./src/InitPreferredName.js'),
	InitThemes = require('./src/InitThemes.js'),
	InitNotifications = require('./src/InitNotifications.js'),
    InitMenuOption = require('./src/InitMenuOption.js'),
    InitGradeIndicator = require('./src/InitGradeIndicator.js');

function PowerSchoolPlus(){
    this.init = ()=>{
        chrome.storage.sync.get('settings', (data)=>{
            if(data.settings !== undefined){
                if(data.settings.gradecalc){InitCalc();}
                if(data.settings.buttonripples){InitWaves();}
                if(data.settings.preferredname){InitPreferredName();}
                if(data.settings.themes){InitThemes();}
                if(data.settings.notifications){InitNotifications();}
                if(data.settings.indicator){InitGradeIndicator();}
                InitMenuOption();
            }
            else{
                InitCalc();
                InitWaves();
                InitPreferredName();
                InitThemes();
                InitNotifications();
                InitGradeIndicator();
                InitMenuOption();
            }
        });
    }
    return this;
}

var ext = new PowerSchoolPlus();
ext.init();