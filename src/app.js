/*
 * HCPS PowerSchool Plus v0.2.5
 * Andrew Russell 2017
 */

var InitCalc = require('./InitCalc.js'),
	InitWaves = require('./InitWaves.js'),
	InitPreferredName = require('./InitPreferredName.js'),
	InitThemes = require('./InitThemes.js'),
	InitNotifications = require('./InitNotifications.js'),
    InitMenuOption = require('./InitMenuOption.js'),
    InitGradeIndicator = require('./InitGradeIndicator.js');

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