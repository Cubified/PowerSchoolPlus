// Various useful functions, should be relatively self explanatory
var sumAllInArray = (v) => {
    var tmp = 0;
    v.forEach((e) => {
        tmp += e
    });
    return tmp;
};
var calcWeightedMean = (arr) => {
    var t = [],
        w = [];
    arr.forEach((e, i, a) => {
        t.push(e.grade * e.weight);
        w.push(e.weight);
    });
    var n = sumAllInArray(t);
    return (n / sumAllInArray(w));
};

var getNumbersInString = (str) => {
    var out = '';
    str.split('').forEach((e) => {
        if ('0123456789.'.split('').indexOf(e) > -1) {
            out += e
        }
    });
    return out;
};

var calculateLetterGrade = (grade) => {
    var grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
    var floors = [97, 93, 90, 87, 83, 80, 77, 73, 70, 68, 66, 60, 0];
    var temp = '',
        hit = false;
    grades.forEach((e, i) => {
        if (grade >= floors[i] && !hit) {
            temp = e;
            hit = true;
        }
    });
    return temp;
};

// The main calculator class
class Calculator {
    constructor(currentGrade, gradeContainer, addedGradesContainer) {
        this.currentGrade = currentGrade;
        this.activeGrades = [{
            weight: 100,
            grade: currentGrade
        }];
        this.allGrades = [{
            weight: 100,
            grade: currentGrade
        }];
        this.gradeContainer = gradeContainer;
        this.addedGradesContainer = addedGradesContainer;
    }

    idIsUsed(id) {
        var hit = false;
        this.activeGrades.forEach((e) => {
            if (e.id == id) {
                hit = true;
            }
        });
        return hit;
    }
    generateId(l) {
        var a = 'abcdefghijklmnopqrstuvwxyz0123456789'.split(''),
            t = '';
        for (var b = 0; b < l; b++) {
            t += a[Math.floor(Math.random() * a.length)];
        }
        if (this.idIsUsed(t)) {
            t = this.generateId(l);
        }
        return t;
    }

    displayGrade() {
        this.gradeContainer.innerHTML = `(${calculateLetterGrade(this.currentGrade)}&nbsp;&nbsp;&nbsp;${this.currentGrade}%)&nbsp;&nbsp;&nbsp;`;
    }

    disableGrade(id) {
        this.activeGrades.forEach((e, i) => {
            if (e.id == id) {
                this.activeGrades.splice(i, 1);
            }
        });
    }
    enableGrade(id) {
        this.allGrades.forEach((e) => {
            if (e.id == id) {
                this.activeGrades.push(e);
            }
        });
    }

    calculateGrade() {
        this.currentGrade = calcWeightedMean(this.activeGrades).toFixed(1);
        this.displayGrade();
    }

    showAddedGrade(weight, grade, id) {
        var date = new Date();
        var createdTr = document.createElement('tr');
        createdTr.innerHTML = `
    		<td>${((date.getMonth()<9?'0':'')+(date.getMonth() + 1)) + '/' + date.getDate() + '/' + date.getUTCFullYear()}</td>
    		<td>${weight + '%'}</td>
    		<td>New Grade (Click to Disable)</td>
    		<td></td>
    		<td align="center">${grade.toFixed() + '/100'}</td>
    		<td align="center">${grade.toFixed() + '%'}</td>
    		<td align="center">${calculateLetterGrade(grade)}</td>
    		<td width="19"><img class="indicator" style="display:none" src="/images/icon_check.gif"></td>
			<td width="19"><img class="indicator" style="display:none" src="/images/icon_late.gif"></td>
			<td width="19"><img class="indicator" style="display:none" src="/images/icon_missing.gif"></td>
			<td width="19"><img class="indicator" style="display:none" src="/images/icon_exempt.gif"></td>
			<td width="19"><img class="indicator" style="display:none" src="/images/icon_excluded.gif"></td></tr>
    	`;
        this.addedGradesContainer.appendChild(createdTr);

        createdTr.dataset.id = id;

        createdTr.classList.add('clickable');

        if(this.addedGradesContainer.children.length % 2 == 1){
        	createdTr.classList.add('oddRow')
        }

        createdTr.dataset.active = 'true';
        createdTr.addEventListener('click', () => {
            if (createdTr.dataset.active == 'true') {
            	createdTr.classList.add('faded');
                createdTr.dataset.active = 'false';
                this.disableGrade(createdTr.dataset.id);
            } else {
            	createdTr.classList.remove('faded');
                createdTr.dataset.active = 'true';
                this.enableGrade(createdTr.dataset.id);
            }
            this.calculateGrade();
        });
    }

    addNewGrade(weight, grade) {
        var newGrade = {
            weight: weight,
            grade: grade,
            id:this.generateId(8)
        };
        this.allGrades.push(newGrade);
        this.activeGrades.push(newGrade);
        this.calculateGrade();
        this.showAddedGrade(weight, grade, newGrade.id);
    }

    attach(elem, weight, grade, calc) {
        elem.addEventListener('click', () => {
            if(weight.value !== '' && grade.value !== ''){
                calc.addNewGrade(parseInt(weight.value), parseInt(grade.value));
            }
            else{
                alert('Please correct your inputs');
            }
        });
    }
}

function InitCalc() {
    if (location.href.indexOf('https://sis.henrico.k12.va.us/guardian/scores.html') > -1) {
        // Parent element to which new grades are added
        var parent = document.querySelectorAll('tbody')[1];

        // Create buttons/input fields of calculator
        var addGradeButton = document.createElement('button');
        addGradeButton.innerHTML = 'Add Grade';
        addGradeButton.id = 'addGradeButton';
        var newWeightInput = document.createElement('input');
        newWeightInput.placeholder = 'Weight';
        newWeightInput.id = 'newWeightInput';
        var newGradeInput = document.createElement('input');
        newGradeInput.placeholder = 'Grade';
        newGradeInput.id = 'newGradeInput';
        newWeightInput.type = newGradeInput.type = 'number';

        // Parent element for calculator
        var parentTr = document.createElement('tr');
        parentTr.innerHTML = `
    		<td>${addGradeButton.outerHTML}</td>
    		<td>${newWeightInput.outerHTML}</td>
    		<td>${newGradeInput.outerHTML}</td>
    	`;

        // Insert the parent element
        parent.insertBefore(parentTr, parent.children[0]);

        // Create element for showing recalculated grade
        document.querySelectorAll('tr.center > td')[3].innerHTML += `<br><div id='recalculatedGrade'></div>`;

        // Initialize the calculator
        var calc = new Calculator(
            parseFloat(getNumbersInString(document.querySelectorAll('tbody')[0].children[1].children[3].innerText)).toFixed(1),
            document.getElementById('recalculatedGrade'),
            document.querySelectorAll('tbody')[1]
        );

        calc.attach(document.getElementById('addGradeButton'),
            document.getElementById('newWeightInput'),
            document.getElementById('newGradeInput'),
            calc
        );
    }
}

module.exports = InitCalc;