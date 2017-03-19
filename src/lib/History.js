// This needs some work

var getNumbersInString = (str) => {
    var out = '';
    str.split('').forEach((e) => {
        if ('0123456789.'.indexOf(e) > -1) {
            out += e;
        }
    });
    return out;
};

var loadGrades = (callback) => {
    chrome.storage.sync.get('gradehistory', callback);
};

var gradeDates = (grades) => {
    var out = [];
    grades.forEach((e) => {
        var date = new Date(e.date);
        out.push(date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear());
    });
    return out;
};

var getGradesFromClass = (grades, c, quarter) => {
    var out = [];
    grades.forEach((e) => {
        e.grades.forEach((el) => {
            if (el.class.replace(/^\s+|\s+$/g, '') == c && el.quarter == quarter && el.grade !== 0) {
                out.push(el.grade);
            }
        });
    });
    return out;
};

var findNewestQuarter = (grades) => {
    var out = 'Q1';
    grades.forEach((e) => {
        e.grades.forEach((el) => {
            if (el.quarter.indexOf('Q') > -1) {
                if (getNumbersInString(out) < getNumbersInString(el.quarter)) {
                    out = el.quarter;
                }
            }
        });
    });
    return out;
};

var ctx = document.querySelector('canvas');

loadGrades((data) => {
    if (data.gradehistory.length > 1) {
        var classes = [],
            quarter = findNewestQuarter(data.gradehistory);
        data.gradehistory[0].grades.forEach((e) => {
            if (classes.indexOf(e.class) == -1) {
                classes.push(e.class);
            }
        });

        var datasets = [];
        classes.forEach((e) => {
            var col = Please.make_color({
                format: 'rgb'
            });

            datasets.push({
                label: e + '- ' + quarter,
                fill: false,
                lineTension: 0.1,
                backgroundColor: `rgba(${col.r},${col.g},${col.b},0.4)`,
                borderColor: `rgba(${col.r},${col.g},${col.b},1)`,
                data: getGradesFromClass(data.gradehistory, e.replace(/^\s+|\s+$/g, ''), quarter)
            });
        });

        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: gradeDates(data.gradehistory),
                datasets: datasets
            },
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        suggestedMin: 90
                    }
                }]
            }
        });

        document.getElementById('quarter').innerHTML = quarter.replace('Q', 'Quarter ') + ' Grade History';
    } else {
        document.getElementById('quarter').innerHTML = 'You do not have enough grade history to create a graph';
    }
});