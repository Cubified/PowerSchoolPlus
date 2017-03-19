"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++){s(r[o])}return s})({1:[function(require,module,exports){var sumAllInArray=function sumAllInArray(v){var tmp=0;v.forEach(function(e){tmp+=e});return tmp};var calcWeightedMean=function calcWeightedMean(arr){var t=[],w=[];arr.forEach(function(e,i,a){t.push(e.grade*e.weight);w.push(e.weight)});var n=sumAllInArray(t);return n/sumAllInArray(w)};var getNumbersInString=function getNumbersInString(str){var out="";str.split("").forEach(function(e){if("0123456789.".split("").indexOf(e)>-1){out+=e}});return out};var calculateLetterGrade=function calculateLetterGrade(grade){var grades=["A+","A","A-","B+","B","B-","C+","C","C-","D+","D","D-","F"];var floors=[97,93,90,87,83,80,77,73,70,68,66,60,0];var temp="",hit=false;grades.forEach(function(e,i){if(grade>=floors[i]&&!hit){temp=e;hit=true}});return temp};var Calculator=function(){function Calculator(currentGrade,gradeContainer,addedGradesContainer){_classCallCheck(this,Calculator);this.currentGrade=currentGrade;this.activeGrades=[{weight:100,grade:currentGrade}];this.allGrades=[{weight:100,grade:currentGrade}];this.gradeContainer=gradeContainer;this.addedGradesContainer=addedGradesContainer}_createClass(Calculator,[{key:"idIsUsed",value:function idIsUsed(id){var hit=false;this.activeGrades.forEach(function(e){if(e.id==id){hit=true}});return hit}},{key:"generateId",value:function generateId(l){var a="abcdefghijklmnopqrstuvwxyz0123456789".split(""),t="";for(var b=0;b<l;b++){t+=a[Math.floor(Math.random()*a.length)]}if(this.idIsUsed(t)){t=this.generateId(l)}return t}},{key:"displayGrade",value:function displayGrade(){this.gradeContainer.innerHTML="("+calculateLetterGrade(this.currentGrade)+"&nbsp;&nbsp;&nbsp;"+this.currentGrade+"%)&nbsp;&nbsp;&nbsp;"}},{key:"disableGrade",value:function disableGrade(id){var _this=this;this.activeGrades.forEach(function(e,i){if(e.id==id){_this.activeGrades.splice(i,1)}})}},{key:"enableGrade",value:function enableGrade(id){var _this2=this;this.allGrades.forEach(function(e){if(e.id==id){_this2.activeGrades.push(e)}})}},{key:"calculateGrade",value:function calculateGrade(){this.currentGrade=calcWeightedMean(this.activeGrades).toFixed(1);this.displayGrade()}},{key:"showAddedGrade",value:function showAddedGrade(weight,grade,id){var _this3=this;var date=new Date;var createdTr=document.createElement("tr");createdTr.innerHTML="\n    \t\t<td>"+((date.getMonth()<9?"0":"")+(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getUTCFullYear())+"</td>\n    \t\t<td>"+(weight+"%")+'</td>\n    \t\t<td>New Grade (Click to Disable)</td>\n    \t\t<td></td>\n    \t\t<td align="center">'+(grade.toFixed()+"/100")+'</td>\n    \t\t<td align="center">'+(grade.toFixed()+"%")+'</td>\n    \t\t<td align="center">'+calculateLetterGrade(grade)+'</td>\n    \t\t<td width="19"><img class="indicator" style="display:none" src="/images/icon_check.gif"></td>\n\t\t\t<td width="19"><img class="indicator" style="display:none" src="/images/icon_late.gif"></td>\n\t\t\t<td width="19"><img class="indicator" style="display:none" src="/images/icon_missing.gif"></td>\n\t\t\t<td width="19"><img class="indicator" style="display:none" src="/images/icon_exempt.gif"></td>\n\t\t\t<td width="19"><img class="indicator" style="display:none" src="/images/icon_excluded.gif"></td></tr>\n    \t';this.addedGradesContainer.appendChild(createdTr);createdTr.dataset.id=id;createdTr.classList.add("clickable");if(this.addedGradesContainer.children.length%2==1){createdTr.classList.add("oddRow")}createdTr.dataset.active="true";createdTr.addEventListener("click",function(){if(createdTr.dataset.active=="true"){createdTr.classList.add("faded");createdTr.dataset.active="false";_this3.disableGrade(createdTr.dataset.id)}else{createdTr.classList.remove("faded");createdTr.dataset.active="true";_this3.enableGrade(createdTr.dataset.id)}_this3.calculateGrade()})}},{key:"addNewGrade",value:function addNewGrade(weight,grade){var newGrade={weight:weight,grade:grade,id:this.generateId(8)};this.allGrades.push(newGrade);this.activeGrades.push(newGrade);this.calculateGrade();this.showAddedGrade(weight,grade,newGrade.id)}},{key:"attach",value:function attach(elem,weight,grade,calc){elem.addEventListener("click",function(){if(weight.value!==""&&grade.value!==""){calc.addNewGrade(parseInt(weight.value),parseInt(grade.value))}else{alert("Please correct your inputs")}})}}]);return Calculator}();function InitCalc(){if(location.href.indexOf("https://sis.henrico.k12.va.us/guardian/scores.html")>-1){var parent=document.querySelectorAll("tbody")[1];var addGradeButton=document.createElement("button");addGradeButton.innerHTML="Add Grade";addGradeButton.id="addGradeButton";var newWeightInput=document.createElement("input");newWeightInput.placeholder="Weight";newWeightInput.id="newWeightInput";var newGradeInput=document.createElement("input");newGradeInput.placeholder="Grade";newGradeInput.id="newGradeInput";newWeightInput.type=newGradeInput.type="number";var parentTr=document.createElement("tr");parentTr.innerHTML="\n    \t\t<td>"+addGradeButton.outerHTML+"</td>\n    \t\t<td>"+newWeightInput.outerHTML+"</td>\n    \t\t<td>"+newGradeInput.outerHTML+"</td>\n    \t";parent.insertBefore(parentTr,parent.children[0]);document.querySelectorAll("tr.center > td")[3].innerHTML+="<br><div id='recalculatedGrade'></div>";var calc=new Calculator(parseFloat(getNumbersInString(document.querySelectorAll("tbody")[0].children[1].children[3].innerText)).toFixed(1),document.getElementById("recalculatedGrade"),document.querySelectorAll("tbody")[1]);calc.attach(document.getElementById("addGradeButton"),document.getElementById("newWeightInput"),document.getElementById("newGradeInput"),calc)}}module.exports=InitCalc},{}],2:[function(require,module,exports){var getNumbersInString=function getNumbersInString(str){var out="";str.split("").forEach(function(e){if("0123456789.".indexOf(e)>-1){out+=e}});return out};var getGrades=function getGrades(){var out=[];[].forEach.call(document.querySelectorAll("tr > td > a"),function(e){if(e.href.indexOf("scores.html")>-1){out.push(e)}});return out};var convertGradesToJSON=function convertGradesToJSON(grades){var quarters=document.querySelectorAll("tr.center.th2")[0].children,out={date:Date.now(),grades:[]};grades.forEach(function(e){[].forEach.call(quarters,function(el){if(e.parentNode.offsetLeft==el.offsetLeft){out.grades.push({grade:parseFloat(getNumbersInString(e.innerText)),class:e.parentNode.parentNode.querySelector('td[align="left"]').innerText.split("\n")[0].replace(/^\s+|\s+$/g,""),quarter:el.innerText,id:e.parentNode.parentNode.id,element:e})}})});return out};var loadGrades=function loadGrades(callback){chrome.storage.local.get("gradehistory",callback)};var saveGrades=function saveGrades(json){var difference=false;loadGrades(function(data){if(data.gradehistory!==undefined){data.gradehistory.forEach(function(e){e.grades.forEach(function(el){json.grades.forEach(function(ele){if(el.class==ele.class&&el.quarter==ele.quarter){if(el.grade!==ele.grade){difference=true}}})})})}else{difference=true}var temp=data.gradehistory==undefined?[]:data.gradehistory;temp.push(json);if(difference){chrome.storage.local.set({gradehistory:temp})}})};function InitGradeHistory(){if(location.href=="https://sis.henrico.k12.va.us/guardian/home.html"){saveGrades(convertGradesToJSON(getGrades()))}}module.exports=InitGradeHistory},{}],3:[function(require,module,exports){var getNumbersInString=function getNumbersInString(str){var out="";str.split("").forEach(function(e){if("0123456789.".indexOf(e)>-1){out+=e}});return out};var getGrades=function getGrades(){var out=[];[].forEach.call(document.querySelectorAll("tr > td > a"),function(e){if(e.href.indexOf("scores.html")>-1){out.push(e)}});return out};var convertGradesToJSON=function convertGradesToJSON(grades){var quarters=document.querySelectorAll("tr.center.th2")[0].children,out=[];grades.forEach(function(e){[].forEach.call(quarters,function(el){if(e.parentNode.offsetLeft==el.offsetLeft){out.push({grade:parseFloat(getNumbersInString(e.innerText)),quarter:el.innerText,id:e.parentNode.parentNode.id,element:e})}})});return out};var saveGrades=function saveGrades(json){chrome.storage.sync.set({grades:json})};var loadGrades=function loadGrades(callback){chrome.storage.sync.get("grades",callback)};function InitGradeIndicator(){if(location.href=="https://sis.henrico.k12.va.us/guardian/home.html"){loadGrades(function(data){if(data.grades!==undefined&&data.grades!==null){data.grades.forEach(function(e){var grades=convertGradesToJSON(getGrades());grades.forEach(function(el){if(e.quarter==el.quarter&&e.id==el.id){if(e.grade>el.grade){el.element.parentNode.classList.add("gradeDown");el.element.parentNode.title="Grade decreased from "+e.grade+"% to "+el.grade+"%"}else if(e.grade<el.grade){el.element.parentNode.classList.add("gradeUp");el.element.parentNode.title="Grade increased from "+e.grade+"% to "+el.grade+"%"}}})})}saveGrades(convertGradesToJSON(getGrades()))})}}module.exports=InitGradeIndicator},{}],4:[function(require,module,exports){var Dialogger=require("./lib/Dialogger.v2.js");var saveSettings=function saveSettings(json){chrome.storage.sync.set({settings:json})};var loadSettings=function loadSettings(callback){chrome.storage.sync.get("settings",callback)};function InitMenuOption(){try{var dialog=document.createElement("div");dialog.id="dialog-psp";dialog.classList.add("Dialogger");dialog.innerHTML='<div><div>\n\t\t\t<h1>HCPS PowerSchool Plus v0.2.7</h1>\n\t\t\t<br>\n\t\t\t<a href="chrome-extension://'+chrome.runtime.id+'/src/html/note.html">A note about grade calculation</a>\n            <br>\n            <a href="chrome-extension://'+chrome.runtime.id+'/src/html/history.html">View your grade history for this quarter</a>\n            <br><br>\n            <label for="toggle-gradecalc">Enable grade calculator: </label><input type=\'checkbox\' checked id="toggle-gradecalc"><br>\n            <label for="toggle-buttonripples">Enable button ripples: </label><input type=\'checkbox\' checked id="toggle-buttonripples"><br>\n            <label for="toggle-preferredname">Enable preferred name: </label><input type=\'checkbox\' checked id="toggle-preferredname"><br>\n            <label for="toggle-themes">Enable themes: </label><input type=\'checkbox\' checked id="toggle-themes"><br>\n            <label for="toggle-notifications">Enable login screen notifications: </label><input type=\'checkbox\' checked id="toggle-notifications"><br>\n            <label for="toggle-indicator">Enable grade change indicator: </label><input type=\'checkbox\' checked id="toggle-indicator">\n            <br><br>(Changes with come into effect when this dialog is closed)</div></div>\n\t\t';document.body.appendChild(dialog);loadSettings(function(data){if(data.settings!==undefined){for(var key in data.settings){document.getElementById("toggle-"+key).checked=data.settings[key]}}});Dialogger({onClose:function onClose(){var json={};[].forEach.call(document.getElementById("dialog-psp").querySelectorAll("input"),function(e){json[e.id.split("toggle-")[1]]=e.checked});saveSettings(json);location.reload()}});var createdElement=document.createElement("li");var createdLink=document.createElement("a");createdLink.classList.add("button-options");createdLink.innerHTML="PowerSchool Plus";createdLink.addEventListener("click",function(){dialog.toggleState()});createdElement.appendChild(createdLink);document.getElementById("btn-transportation").parentNode.appendChild(createdElement)}catch(e){}}module.exports=InitMenuOption},{"./lib/Dialogger.v2.js":10}],5:[function(require,module,exports){function InitNotifications(){if(location.href=="https://sis.henrico.k12.va.us/public/home.html"||location.href=="https://sis.henrico.k12.va.us/public/"){if(document.getElementById("signin-custom-message")==null){document.querySelector("fieldset").innerHTML+='<div id="signin-custom-message"></div>'}var parentElem=document.getElementById("signin-custom-message");parentElem.classList.add("enabled");parentElem.addEventListener("click",function(){window.open("https://chrome.google.com/webstore/detail/hcps-powerschool-plus/"+chrome.runtime.id,"_self")});parentElem.innerHTML='<span class="full-width">You are using HCPS PowerSchool Plus v0.2.7<br>Click to see what\'s new</span>'}}module.exports=InitNotifications},{}],6:[function(require,module,exports){function InitPreferredName(){var setName=window.setName=function(newName){chrome.storage.sync.set({preferredName:newName});document.querySelectorAll("#userName > span")[0].innerHTML=newName};var getName=window.getName=function(callback){chrome.storage.sync.get("preferredName",callback)};if(location.href.indexOf("https://sis.henrico.k12.va.us/guardian/")>-1){document.querySelectorAll("#userName > span")[0].addEventListener("click",function(){var response=prompt("Enter preferred name:");if(response!==null){window.setName(response)}});window.getName(function(data){if(data.preferredName!==undefined){document.querySelectorAll("#userName > span")[0].innerHTML=data.preferredName}})}}module.exports=InitPreferredName},{}],7:[function(require,module,exports){function InitThemes(){var saveTheme=function saveTheme(name){chrome.storage.sync.set({theme:name})};var getTheme=function getTheme(callback){chrome.storage.sync.get("theme",callback)};var updateTheme=function updateTheme(name){saveTheme(name);location.reload()};var changeTheme=function changeTheme(){if(location.href=="https://sis.henrico.k12.va.us/public/home.html"||location.href=="https://sis.henrico.k12.va.us/public/"){var link=document.createElement("select");link.id="changeTheme";getTheme(function(data){if(data.theme!==null&&data.theme!==undefined){document.getElementById("changeTheme").value=data.theme}});var optionTwo=document.createElement("option");optionTwo.value="red";optionTwo.innerHTML="Red";var optionThree=document.createElement("option");optionThree.value="pink";optionThree.innerHTML="Pink";var optionSix=document.createElement("option");optionSix.value="orange";optionSix.innerHTML="Orange";var optionSeven=document.createElement("option");optionSeven.value="yellow";optionSeven.innerHTML="Yellow";var optionFive=document.createElement("option");optionFive.value="green";optionFive.innerHTML="Green";var optionFour=document.createElement("option");optionFour.value="cyan";optionFour.innerHTML="Cyan";var optionOne=document.createElement("option");optionOne.value="blue";optionOne.innerHTML="Blue";link.appendChild(optionTwo);link.appendChild(optionThree);link.appendChild(optionSix);link.appendChild(optionSeven);link.appendChild(optionFive);link.appendChild(optionFour);link.appendChild(optionOne);document.getElementById("login-help").appendChild(link);link.onchange=function(){updateTheme(document.getElementById("changeTheme").value)}}};changeTheme();getTheme(function(data){if(data.theme!==undefined){[].forEach.call(document.querySelectorAll("button"),function(e,i,a){e.classList.add(data.theme)});[].forEach.call(document.querySelectorAll("th"),function(e,i,a){e.classList.add(data.theme);e.style.border="1px solid black"});[].forEach.call(document.querySelectorAll("td.bold"),function(e,i,a){e.classList.add(data.theme);e.style.border="1px solid black"});if(location.href=="https://sis.henrico.k12.va.us/public/home.html"||location.href=="https://sis.henrico.k12.va.us/public/"){document.getElementById("changeTheme").value=data.theme;document.getElementById("signin-custom-message").classList.add(data.theme)}}else{[].forEach.call(document.querySelectorAll("button"),function(e,i,a){e.classList.add("blue")});[].forEach.call(document.querySelectorAll("th"),function(e,i,a){e.classList.add("blue");e.style.border="1px solid black"});[].forEach.call(document.querySelectorAll("td.bold"),function(e,i,a){e.classList.add("blue");e.style.border="1px solid black"});if(location.href=="https://sis.henrico.k12.va.us/public/home.html"||location.href=="https://sis.henrico.k12.va.us/public/"){document.getElementById("changeTheme").value="blue";document.getElementById("signin-custom-message").classList.add("blue")}}})}module.exports=InitThemes},{}],8:[function(require,module,exports){var Waves=require("./lib/waves.min.js");function InitWaves(){Waves.attach("button",["waves-button","waves-light","waves-float"]);Waves.init()}module.exports=InitWaves},{"./lib/waves.min.js":11}],9:[function(require,module,exports){var InitCalc=require("./InitCalc.js"),InitWaves=require("./InitWaves.js"),InitPreferredName=require("./InitPreferredName.js"),InitThemes=require("./InitThemes.js"),InitNotifications=require("./InitNotifications.js"),InitMenuOption=require("./InitMenuOption.js"),InitGradeIndicator=require("./InitGradeIndicator.js"),InitGradeHistory=require("./InitGradeHistory.js");function PowerSchoolPlus(){this.init=function(){chrome.storage.sync.get("settings",function(data){if(data.settings!==undefined){if(data.settings.gradecalc){InitCalc()}if(data.settings.buttonripples){InitWaves()}if(data.settings.preferredname){InitPreferredName()}if(data.settings.themes){InitThemes()}if(data.settings.notifications){InitNotifications()}if(data.settings.indicator){InitGradeIndicator()}if(data.settings.history){InitGradeHistory()}InitMenuOption()}else{InitCalc();InitWaves();InitPreferredName();InitThemes();InitNotifications();InitGradeIndicator();InitMenuOption();InitGradeHistory()}})};return this}var ext=new PowerSchoolPlus;ext.init()},{"./InitCalc.js":1,"./InitGradeHistory.js":2,"./InitGradeIndicator.js":3,"./InitMenuOption.js":4,"./InitNotifications.js":5,"./InitPreferredName.js":6,"./InitThemes.js":7,"./InitWaves.js":8}],10:[function(require,module,exports){function DialoggerV2(options){var opts=options||{onClose:function onClose(){}};[].forEach.call(document.querySelectorAll(".Dialogger"),function(e){var coverup=document.createElement("div");coverup.classList.add("Dialogger-coverup");e.innerHTML=coverup.outerHTML+e.innerHTML;e.addEventListener("click",function(event){if(event.target.classList=="Dialogger-coverup"){e.hide()}});e.children[1].id="fullWidthParent";e.children[1].addEventListener("click",function(event){if(event.target.id=="fullWidthParent"){e.hide()}});e.show=function(){e.style.visibility="visible";e.style.display="flex";setTimeout(function(){e.style.opacity=1},10);e.dataset.visible="true"};e.hide=function(){e.style.opacity=0;setTimeout(function(){e.style.visibility="hidden";e.style.display="none"},300);e.dataset.visible="false";opts.onClose()};e.toggleState=function(){if(e.dataset.visible=="true"){e.hide()}else{e.show()}};if(e.dataset.visible=="true"){e.show()}else if(e.dataset.visible=="false"){e.hide()}else{e.dataset.visible="false"}})}module.exports=DialoggerV2},{}],11:[function(require,module,exports){(function(global){!function(a,b){"use strict";"function"==typeof define&&define.amd?define([],function(){return b.apply(a)}):"object"==(typeof exports==="undefined"?"undefined":_typeof(exports))?module.exports=b.call(a):a.Waves=b.call(a)}("object"==(typeof global==="undefined"?"undefined":_typeof(global))?global:this,function(){"use strict";function a(a){return null!==a&&a===a.window}function b(b){return a(b)?b:9===b.nodeType&&b.defaultView}function c(a){var b=typeof a==="undefined"?"undefined":_typeof(a);return"function"===b||"object"===b&&!!a}function d(a){return c(a)&&a.nodeType>0}function e(a){var b=m.call(a);return"[object String]"===b?l(a):c(a)&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(b)&&a.hasOwnProperty("length")?a:d(a)?[a]:[]}function f(a){var c,d,e={top:0,left:0},f=a&&a.ownerDocument;return c=f.documentElement,"undefined"!=typeof a.getBoundingClientRect&&(e=a.getBoundingClientRect()),d=b(f),{top:e.top+d.pageYOffset-c.clientTop,left:e.left+d.pageXOffset-c.clientLeft}}function g(a){var b="";for(var c in a){a.hasOwnProperty(c)&&(b+=c+":"+a[c]+";")}return b}function h(a,b,c){if(c){c.classList.remove("waves-rippling");var d=c.getAttribute("data-x"),e=c.getAttribute("data-y"),f=c.getAttribute("data-scale"),h=c.getAttribute("data-translate"),i=Date.now()-Number(c.getAttribute("data-hold")),j=350-i;0>j&&(j=0),"mousemove"===a.type&&(j=150);var k="mousemove"===a.type?2500:o.duration;setTimeout(function(){var a={top:e+"px",left:d+"px",opacity:"0","-webkit-transition-duration":k+"ms","-moz-transition-duration":k+"ms","-o-transition-duration":k+"ms","transition-duration":k+"ms","-webkit-transform":f+" "+h,"-moz-transform":f+" "+h,"-ms-transform":f+" "+h,"-o-transform":f+" "+h,transform:f+" "+h};c.setAttribute("style",g(a)),setTimeout(function(){try{b.removeChild(c)}catch(a){return!1}},k)},j)}}function i(a){if(q.allowEvent(a)===!1)return null;for(var b=null,c=a.target||a.srcElement;null!==c.parentElement;){if(c.classList.contains("waves-effect")&&!(c instanceof SVGElement)){b=c;break}c=c.parentElement}return b}function j(a){var b=i(a);if(null!==b){if(b.disabled||b.getAttribute("disabled")||b.classList.contains("disabled"))return;if(q.registerEvent(a),"touchstart"===a.type&&o.delay){var c=!1,d=setTimeout(function(){d=null,o.show(a,b)},o.delay),e=function e(_e){d&&(clearTimeout(d),d=null,o.show(a,b)),c||(c=!0,o.hide(_e,b))},f=function f(a){d&&(clearTimeout(d),d=null),e(a)};b.addEventListener("touchmove",f,!1),b.addEventListener("touchend",e,!1),b.addEventListener("touchcancel",e,!1)}else o.show(a,b),n&&(b.addEventListener("touchend",o.hide,!1),b.addEventListener("touchcancel",o.hide,!1)),b.addEventListener("mouseup",o.hide,!1),b.addEventListener("mouseleave",o.hide,!1)}}var k=k||{},l=document.querySelectorAll.bind(document),m=Object.prototype.toString,n="ontouchstart"in window,o={duration:750,delay:200,show:function show(a,b,c){if(2===a.button)return!1;b=b||this;var d=document.createElement("div");d.className="waves-ripple waves-rippling",b.appendChild(d);var e=f(b),h=0,i=0;"touches"in a&&a.touches.length?(h=a.touches[0].pageY-e.top,i=a.touches[0].pageX-e.left):(h=a.pageY-e.top,i=a.pageX-e.left),i=i>=0?i:0,h=h>=0?h:0;var j="scale("+b.clientWidth/100*3+")",k="translate(0,0)";c&&(k="translate("+c.x+"px, "+c.y+"px)"),d.setAttribute("data-hold",Date.now()),d.setAttribute("data-x",i),d.setAttribute("data-y",h),d.setAttribute("data-scale",j),d.setAttribute("data-translate",k);var l={top:h+"px",left:i+"px"};d.classList.add("waves-notransition"),d.setAttribute("style",g(l)),d.classList.remove("waves-notransition"),l["-webkit-transform"]=j+" "+k,l["-moz-transform"]=j+" "+k,l["-ms-transform"]=j+" "+k,l["-o-transform"]=j+" "+k,l.transform=j+" "+k,l.opacity="1";var m="mousemove"===a.type?2500:o.duration;l["-webkit-transition-duration"]=m+"ms",l["-moz-transition-duration"]=m+"ms",l["-o-transition-duration"]=m+"ms",l["transition-duration"]=m+"ms",d.setAttribute("style",g(l))},hide:function hide(a,b){b=b||this;for(var c=b.getElementsByClassName("waves-rippling"),d=0,e=c.length;e>d;d++){h(a,b,c[d])}}},p={input:function input(a){var b=a.parentNode;if("i"!==b.tagName.toLowerCase()||!b.classList.contains("waves-effect")){var c=document.createElement("i");c.className=a.className+" waves-input-wrapper",a.className="waves-button-input",b.replaceChild(c,a),c.appendChild(a);var d=window.getComputedStyle(a,null),e=d.color,f=d.backgroundColor;c.setAttribute("style","color:"+e+";background:"+f),a.setAttribute("style","background-color:rgba(0,0,0,0);")}},img:function img(a){var b=a.parentNode;if("i"!==b.tagName.toLowerCase()||!b.classList.contains("waves-effect")){var c=document.createElement("i");b.replaceChild(c,a),c.appendChild(a)}}},q={touches:0,allowEvent:function allowEvent(a){var b=!0;return/^(mousedown|mousemove)$/.test(a.type)&&q.touches&&(b=!1),b},registerEvent:function registerEvent(a){var b=a.type;"touchstart"===b?q.touches+=1:/^(touchend|touchcancel)$/.test(b)&&setTimeout(function(){q.touches&&(q.touches-=1)},500)}};return k.init=function(a){var b=document.body;a=a||{},"duration"in a&&(o.duration=a.duration),"delay"in a&&(o.delay=a.delay),n&&(b.addEventListener("touchstart",j,!1),b.addEventListener("touchcancel",q.registerEvent,!1),b.addEventListener("touchend",q.registerEvent,!1)),b.addEventListener("mousedown",j,!1)},k.attach=function(a,b){a=e(a),"[object Array]"===m.call(b)&&(b=b.join(" ")),b=b?" "+b:"";for(var c,d,f=0,g=a.length;g>f;f++){c=a[f],d=c.tagName.toLowerCase(),-1!==["input","img"].indexOf(d)&&(p[d](c),c=c.parentElement),-1===c.className.indexOf("waves-effect")&&(c.className+=" waves-effect"+b)}},k.ripple=function(a,b){a=e(a);var c=a.length;if(b=b||{},b.wait=b.wait||0,b.position=b.position||null,c)for(var d,g,h,i={},j=0,k={type:"mousedown",button:1},l=function l(a,b){return function(){o.hide(a,b)}};c>j;j++){if(d=a[j],g=b.position||{x:d.clientWidth/2,y:d.clientHeight/2},h=f(d),i.x=h.left+g.x,i.y=h.top+g.y,k.pageX=i.x,k.pageY=i.y,o.show(k,d),b.wait>=0&&null!==b.wait){var m={type:"mouseup",button:1};setTimeout(l(m,d),b.wait)}}},k.calm=function(a){a=e(a);for(var b={type:"mouseup",button:1},c=0,d=a.length;d>c;c++){o.hide(b,a[c])}},k.displayEffect=function(a){k.init(a)},k})}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}]},{},[9]);