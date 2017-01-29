/*
 * HCPS PowerSchool Plus v0.2.0
 * Andrew Russell 2017
 */

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