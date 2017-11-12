// Various useful functions, should be relatively self explanatory
const sumAllInArray = (v) => {
    let tmp = 0;
    v.forEach((e) => {
        tmp += e
    });
    return tmp;
};
const averageForEachWeight = (arr) => {
	let out = {};
	arr.forEach((e)=>{
		if(out[e.weight]){
			out[e.weight].grade += e.grade;
			out[e.weight].num += 1;
		} else{
			out[e.weight] = {grade:e.grade,num:1};
		}
	});
	let temp = [];
	for(let key in out){
		temp.push({
			weight:parseFloat(key),
			grade:out[key].grade/out[key].num
		});
	}
	return temp;
};
const calcWeightedMean = (array) => {
	let arr = averageForEachWeight(array);

    const t = [],
        w = [];
    arr.forEach((e, i, a) => {
        t.push(e.grade * e.weight);
        w.push(e.weight);
    });
    const n = sumAllInArray(t);
    return (n / sumAllInArray(w));
};

const getNumbersInString = (str) => {
    let out = '';
    str.split('').forEach((e) => {
        if ('0123456789.'.split('').indexOf(e) > -1) {
            out += e
        }
    });
    return out;
};

const calculateLetterGrade = (grade) => {
    const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
    const floors = [97, 93, 90, 87, 83, 80, 77, 73, 70, 68, 66, 60, 0];
    let temp = '',
        hit = false;
    grades.forEach((e, i) => {
        if (grade >= floors[i] && !hit) {
            temp = e;
            hit = true;
        }
    });
    return temp;
};

const defaults = {
	Homework: 15,
	Classwork: 15,
	Quiz: 30,
	Test: 40,
	Project: 40
};

// Heuristic used to determine the weight of a grading category
// without a percentage listed in its name
const determineWeight = (category) => {	
	if(getNumbersInString(category) === ''){
		let weight = 15;
		for(let key in defaults){
			if(category.toLowerCase().indexOf(key.toLowerCase()) > -1){
				weight = defaults[key];
			}
		}
		return weight;
	} else {
		return parseFloat(getNumbersInString(category));
	}
};

const ComboBox = require('./lib/ComboBox.min.js');

// The main calculator class
class Calculator {
    constructor(currentGrade, gradeContainer, addedGradesContainer) {
        this.currentGrade = currentGrade;
		this.activeGrades = this.getExistingGrades();
		this.allGrades = this.getExistingGrades();
        this.gradeContainer = gradeContainer;
        this.addedGradesContainer = addedGradesContainer;
    }

	getExistingGrades(){
		let elements = document.querySelectorAll('#assignmentScores > table > tbody > tr'),
			out = [];
		[].forEach.call(elements,(e)=>{
			if(e.children.length > 8){
				out.push({
					weight:determineWeight(e.children[1].innerText),
					grade:parseFloat(getNumbersInString(e.children[5].innerText))
				});
			}
		});
		return out;
	}

    idIsUsed(id) {
        let hit = false;
        this.activeGrades.forEach((e) => {
            if (e.id === id) {
                hit = true;
            }
        });
        return hit;
    }

    generateId(l) {
        const a = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
        let t = '';
        for (let b = 0; b < l; b++) {
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
            if (e.id === id) {
                this.activeGrades.splice(i, 1);
            }
        });
    }

    enableGrade(id) {
        this.allGrades.forEach((e) => {
            if (e.id === id) {
                this.activeGrades.push(e);
            }
        });
    }

    calculateGrade() {
        this.currentGrade = calcWeightedMean(this.activeGrades).toFixed(1);
        this.displayGrade();
    }

    showAddedGrade(weight, grade, id) {
        const date = new Date();
        const createdTr = document.createElement('tr');
        createdTr.innerHTML = `
    		<td>${((date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)) + '/' + date.getDate() + '/' + date.getUTCFullYear()}</td>
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

        if (this.addedGradesContainer.children.length % 2 === 1) {
            createdTr.classList.add('oddRow')
        }

        createdTr.dataset.active = 'true';
        createdTr.addEventListener('click', () => {
            if (createdTr.dataset.active === 'true') {
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
        const newGrade = {
            weight: weight,
            grade: grade,
            id: this.generateId(8)
        };
        this.allGrades.push(newGrade);
        this.activeGrades.push(newGrade);
        this.calculateGrade();
        this.showAddedGrade(weight, grade, newGrade.id);
    }

    attach(elem, weight, grade, calc) {
        elem.addEventListener('click', () => {
            if ((weight.value !== '' && grade.value !== '') && !isNaN(parseFloat(weight.value))) {
                calc.addNewGrade(parseInt(weight.value), parseInt(grade.value));
            }
            else {
                alert('Please correct your inputs');
            }
        });
    }
}

function InitCalc() {
    if (location.href.indexOf('https://sis.henrico.k12.va.us/guardian/scores.html') > -1) {
        // Parent element to which new grades are added
        const parent = document.querySelectorAll('tbody')[1];

        // Create buttons/input fields of calculator
        const addGradeButton = document.createElement('button');
        addGradeButton.innerHTML = 'Add Grade';
        addGradeButton.id = 'addGradeButton';
		const comboBoxElem = document.createElement('div');
		comboBoxElem.id = 'combobox';
        const newWeightInput = document.createElement('input');
        newWeightInput.placeholder = 'Weight';
        newWeightInput.id = 'newWeightInput';
		const newWeightSelect = document.createElement('select');
		for(let key in defaults){
			newWeightSelect.innerHTML += `<option value="${defaults[key]}">${key}</option>`;
		}
		comboBoxElem.appendChild(newWeightInput);
		comboBoxElem.appendChild(newWeightSelect);
        const newGradeInput = document.createElement('input');
        newGradeInput.placeholder = 'Grade';
        newGradeInput.id = 'newGradeInput';
        newGradeInput.type = 'number';

        // Parent element for calculator
        const parentTr = document.createElement('tr');
        parentTr.innerHTML = `
    		<td>${addGradeButton.outerHTML}</td>
    		<td>${comboBoxElem.outerHTML}</td>
    		<td>${newGradeInput.outerHTML}</td>
    	`;

        // Insert the parent element
        parent.insertBefore(parentTr, parent.children[0]);

        // Create element for showing recalculated grade
        document.querySelectorAll('tr.center > td')[3].innerHTML += `<br><div id='recalculatedGrade'></div>`;

        // Initialize the calculator
        const calc = new Calculator(
            parseFloat(getNumbersInString(document.querySelectorAll('tbody')[0].children[1].children[3].innerText)).toFixed(1),
            document.getElementById('recalculatedGrade'),
            document.querySelectorAll('tbody')[1]
        );

        calc.attach(document.getElementById('addGradeButton'),
            document.getElementById('newWeightInput'),
            document.getElementById('newGradeInput'),
            calc
        );

		let combobox = new ComboBox(document.getElementById('combobox'),false);
    }
}

module.exports = InitCalc;
