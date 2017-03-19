var getNumbersInString = (str) => {
    var out = '';
    str.split('').forEach((e) => {
        if ('0123456789.'.indexOf(e) > -1) {
            out += e;
        }
    });
    return out;
};
var getGrades = () => {
    var out = [];
    [].forEach.call(document.querySelectorAll('tr > td > a'), (e) => {
        if (e.href.indexOf('scores.html') > -1) {
            out.push(e);
        }
    });
    return out;
};
var convertGradesToJSON = (grades) => {
    var quarters = document.querySelectorAll('tr.center.th2')[0].children,
        out = {date:Date.now(),grades:[]};
    grades.forEach((e) => {
        [].forEach.call(quarters, (el) => {
            if (e.parentNode.offsetLeft == el.offsetLeft) {
                out.grades.push({
                    grade: parseFloat(getNumbersInString(e.innerText)),
                    class:e.parentNode.parentNode.querySelector('td[align="left"]').innerText.split('\n')[0].replace(/^\s+|\s+$/g,''),
                    quarter: el.innerText,
                    id: e.parentNode.parentNode.id,
                    element: e
                });
            }
        });
    });
    return out;
};

var loadGrades = (callback) => {
    chrome.storage.local.get('gradehistory', callback);
};
var saveGrades = (json) => {
	var difference = false;
    // This could be better, to say the least
	loadGrades((data) => {
        if (data.gradehistory !== undefined) {
            data.gradehistory.forEach((e) => {
                e.grades.forEach((el) => {
                    json.grades.forEach((ele) => {
                        if (el.class == ele.class && el.quarter == ele.quarter) {
                            if (el.grade !== ele.grade) {
                                difference = true;
                            }
                        }
                    });
                });
            });
        }
        else{
        	difference = true;
        }
		var temp = (data.gradehistory==undefined?[]:data.gradehistory);
		temp.push(json);
		if(difference){
			chrome.storage.local.set({
        		'gradehistory': temp
    		});
		}
	});
};

function InitGradeHistory(){
	if (location.href == "https://sis.henrico.k12.va.us/guardian/home.html") {
		saveGrades(convertGradesToJSON(getGrades()));
    }
}

module.exports = InitGradeHistory();