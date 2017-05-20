const getNumbersInString = (str) => {
    let out = '';
    str.split('').forEach((e) => {
        if ('0123456789.'.indexOf(e) > -1) {
            out += e;
        }
    });
    return out;
};
const getGrades = () => {
    const out = [];
    [].forEach.call(document.querySelectorAll('tr > td > a'), (e) => {
        if (e.href.indexOf('scores.html') > -1) {
            out.push(e);
        }
    });
    return out;
};
const convertGradesToJSON = (grades) => {
    const quarters = document.querySelectorAll('tr.center.th2')[0].children,
        out = {date: Date.now(), grades: []};
    grades.forEach((e) => {
        [].forEach.call(quarters, (el) => {
            if (e.parentNode.offsetLeft === el.offsetLeft) {
                out.grades.push({
                    grade: parseFloat(getNumbersInString(e.innerText)),
                    class: e.parentNode.parentNode.querySelector('td[align="left"]').innerText.split('\n')[0].replace(/^\s+|\s+$/g, ''),
                    quarter: el.innerText,
                    id: e.parentNode.parentNode.id,
                    element: e
                });
            }
        });
    });
    return out;
};
const getMax = (arr, prop)=>{
    let max;
    for (let i=0 ; i<arr.length ; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
};

const loadGrades = (callback) => {
    chrome.storage.local.get('gradehistory', callback);
};
const saveGrades = (json) => {
    loadGrades((data) => {
        let difference = false;

        if(data.gradehistory !== undefined && data.gradehistory.length > 0) {
            getMax(data.gradehistory,'date').grades.forEach((el)=>{
                json.grades.forEach((ele) => {
                    if (!isNaN(el.grade) && !isNaN(ele.grade) && el.class === ele.class && el.quarter === ele.quarter && el.grade !== ele.grade) {
                        difference = true;
                    }
                });
            });
        }
        else{
            difference = true;
        }

        const temp = (data.gradehistory === undefined ? [] : data.gradehistory);
        temp.push(json);
        if (difference) {
            chrome.storage.local.set({
                'gradehistory': temp
            });
        }
    });
};

function InitGradeHistory() {
    if (location.href === "https://sis.henrico.k12.va.us/guardian/home.html") {
        saveGrades(convertGradesToJSON(getGrades()));
    }
}

module.exports = InitGradeHistory;
