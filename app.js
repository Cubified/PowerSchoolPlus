/*
 * HCPS PowerSchool Plus v0.2.0
 * Andrew Russell 2017
 */

var InitCalc = require('./src/InitCalc.js'),
	InitWaves = require('./src/InitWaves.js'),
	InitPreferredName = require('./src/InitPreferredName.js'),
	InitThemes = require('./src/InitThemes.js'),
	InitNotifications = require('./src/InitNotifications.js'),
	InitMenuOption = require('./src/InitMenuOption.js');

function PowerSchoolPlus(){
    this.init = ()=>{
    	InitCalc();
        InitWaves();
        InitPreferredName();
        InitThemes();
        InitNotifications();
        InitMenuOption();
    }
    return this;
}

var ext = new PowerSchoolPlus();
ext.init();