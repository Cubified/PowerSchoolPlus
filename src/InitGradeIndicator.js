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
        out = [];
    grades.forEach((e) => {
        [].forEach.call(quarters, (el) => {
            if (e.parentNode.offsetLeft == el.offsetLeft) {
                out.push({
                    grade: parseFloat(getNumbersInString(e.innerText)),
                    quarter: el.innerText,
                    id: e.parentNode.parentNode.id,
                    element: e
                });
            }
        });
    });
    return out;
};

var saveGrades = (json) => {
    chrome.storage.sync.set({
        'grades': json
    });
};
var loadGrades = (callback) => {
    chrome.storage.sync.get('grades', callback);
};

function InitGradeIndicator() {
    if (location.href == "https://sis.henrico.k12.va.us/guardian/home.html") {
        loadGrades((data) => {
            if (data.grades !== undefined && data.grades !== null) {
                data.grades.forEach((e) => {
                    var grades = convertGradesToJSON(getGrades());
                    grades.forEach((el) => {
                        if (e.quarter == el.quarter && e.id == el.id) {
                            if (e.grade > el.grade) {
                                el.element.parentNode.classList.add('gradeDown');
                                el.element.parentNode.title = 'Grade decreased from ' + e.grade + '% to ' + el.grade + '%';
                            } else if (e.grade < el.grade) {
                                el.element.parentNode.classList.add('gradeUp');
                                el.element.parentNode.title = 'Grade increased from ' + e.grade + '% to ' + el.grade + '%';
                            }
                        }
                    });
                });
            }
            saveGrades(convertGradesToJSON(getGrades()));
        });
    }
}

module.exports = InitGradeIndicator;