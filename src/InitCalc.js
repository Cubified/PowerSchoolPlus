/*
 * InitCalc.js: Grade calculator functionality
 * 
 * Changelog:
 * - 11/13/18:
 *   - Add support for user-adjusted weights in weighted calculator
 *     - Adjust Combobox to respond accordingly
 *   - Move utility functions to PowerSchoolUtil.js
 *   - Display average grade for each weight
 * - 11/09/18:
 *   - Fix query selector problems (due to changes to Powerschool)
 *   - Enable disabling of any existing grade with a mouse click
 *
 * TODO:
 * - Exclude exempt grades
 */

const ComboBox = require('./lib/ComboBox.min.js'),
      util     = require('./lib/PowerSchoolUtil.js');

class CalculationStrategy {
   constructor(calculationFunc, determineWeight, determineGrade, gradeDisplayFunc, onInit, onDetach) {
      this.calculate = calculationFunc;
      this.determineWeight = determineWeight;
      this.determineGrade = determineGrade;
      this.determineGradeDisplay = gradeDisplayFunc;
      this.onInit = onInit;
      this.onDetach = onDetach;
   }
}

const WeightedCalculator = new CalculationStrategy((grades) =>{
   util.updateAverages(grades);
   return util.calcWeightedMean(grades).toFixed(1);
}, (el) => {
   let e = document.querySelector(`input#${util.makeSafeString(el.children[1].innerText)}`);
   if(e){
     return parseFloat(e.value);
   }
   return util.guessWeight(el.children[1].innerText);
}, (el) => {
   return parseFloat(util.getNumbersInString(el.children[9].innerText));
}, (weight, grade) => {
   const date = new Date();
   return `
    <td>${((date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)) + '/' + date.getDate() + '/' + date.getUTCFullYear()}</td>
    <td>${weight + '%'}</td>
    <td>New Grade (Click to Disable)</td>
    <td width="14"></td>
    <td width="14"></td>
    <td width="14"></td>
    <td width="14"></td>
    <td width="19"></td>
    <td align="center">${parseFloat(grade.toFixed(2)) + '/100'}</td>
    <td align="center">${parseFloat(grade.toFixed(2)) + '%'}</td>
    <td align="center">${util.calculateLetterGrade(grade)}</td></tr>
  `;
}, (calc)=>{
  if(!document.querySelector('.box-round.weights')){
    let box = document.createElement('div');
    box.classList.add('box-round');
    box.classList.add('weights');
   
    let h2 = document.createElement('h2');
    h2.innerText = 'Weights';
    box.appendChild(h2);

    let table = document.createElement('table');
    let tbody = document.createElement('tbody');

    let weights = util.getExistingWeights();
    let grades = calc.getExistingGrades();
    let avgs = util.averageForEachWeight(grades);

    let tr0 = document.createElement('tr');
    tr0.innerHTML = '<th>Category</th><th>Weight</th><th>Average Grade</th>';
    tbody.appendChild(tr0);

    weights.forEach((e,i)=>{
      let tr = document.createElement('tr');

      let td1 = document.createElement('td');
      let td2 = document.createElement('td');
      let td3 = document.createElement('td');

      let label = document.createElement('label');
      label.classList.add('unbold');
      label.innerText = e;
      label.htmlFor = util.makeSafeString(e);

      let input = document.createElement('input');
      input.type = 'number';
      input.id = util.makeSafeString(e);
      input.value = util.guessWeight(e);
      input.addEventListener('keydown',(e)=>{
        if(e.keyCode === 13 && input.value.trim() !== ''){
          calc.recalculateGrade();
          util.updateCombobox();
        }
      });

      let avg = document.createElement('span');
      avg.classList.add('weight-average');
      avg.innerText = `${avgs[i].grade.toFixed(1)}%`;  

      td1.appendChild(label);
      td2.appendChild(input);
      td3.appendChild(avg);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    box.appendChild(table);

    document.querySelector('#content-main').insertBefore(box,document.querySelector('#legend'));
  } else {
    document.querySelector('.box-round.weights').style.display = 'block';
  }
}, ()=>{
  document.querySelector('.box-round.weights').style.display = 'none';
});
const TotalPointCalculator = new CalculationStrategy((grades) => {
   return util.calcUnweightedMean(grades).toFixed(1);
}, (el) => {
   return parseFloat(el.children[8].innerText.split('/')[1]);
}, (el) => {
   return parseFloat(el.children[8].innerText.split('/')[0]);
}, (weight, grade) => {
   const date = new Date();
   return `
      <td>${((date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)) + '/' + date.getDate() + '/' + date.getUTCFullYear()}</td>
      <td>${weight} Points</td>
      <td>New Grade (Click to Disable)</td>
      <td width="14"></td>
      <td width="14"></td>
      <td width="14"></td>
      <td width="14"></td>
      <td width="19"></td>
      <td align="center">${parseFloat(grade.toFixed(2))}/${weight}</td>
      <td align="center">${parseFloat(((grade.toFixed(2)/weight)*100).toFixed(2))}%</td>
      <td align="center">${util.calculateLetterGrade((grade/weight)*100)}</td></tr>
    `;
}, ()=>{
}, ()=>{
});

class Calculator {
   constructor(strategy, currentGrade, gradeContainer, addedGradesContainer) {
      this.strategy = strategy;
      this.currentGrade = currentGrade;

      this.strategy.onInit(this);

      this.activeGrades = this.getExistingGrades(1);
      this.allGrades = this.getExistingGrades();
      this.gradeContainer = gradeContainer;
      this.addedGradesContainer = addedGradesContainer;
      this.shouldAttach = true;
   }

   getExistingGrades(listeners) {
      let elements = document.querySelectorAll('table')[1].querySelectorAll('tbody > tr'),
         out = [],
         id = '';
      [].forEach.call(elements, (e) => {
        if(e.children.length > 8 && !isNaN(parseFloat(util.getNumbersInString(e.children[9].innerText)))) {
          id = (e.dataset.id || this.generateId(8,1));
          out.push({
            weight: this.strategy.determineWeight(e),
            grade:  this.strategy.determineGrade(e),
            id:     id
          });
          if(listeners){
            e.classList.add('clickable');
            e.dataset.active = 'true';
            e.dataset.id = id;
            e.addEventListener('click',()=>{
              if(e.dataset.active === 'true') {
                e.classList.add('faded');
                e.dataset.active = 'false';
                this.disableGrade(e.dataset.id);
              } else {
                e.classList.remove('faded');
                e.dataset.active = 'true';
                this.enableGrade(e.dataset.id);
              }
              this.calculateGrade();
            });
          }
        }
      });
      return out;
   }

   idIsUsed(id) {
      let hit = false;
      this.activeGrades.forEach((e) => {
         if(e.id === id) {
            hit = true;
         }
      });
      return hit;
   }

   generateId(l,s) {
      const a = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
      let t = '';
      for(let b = 0; b < l; b++) {
         t += a[Math.floor(Math.random() * a.length)];
      }
      if(!s && this.idIsUsed(t)) {
         t = this.generateId(l);
      }
      return t;
   }

   displayGrade() {
      this.gradeContainer.innerHTML = `(${util.calculateLetterGrade(this.currentGrade)}&nbsp;&nbsp;&nbsp;${this.currentGrade}%)&nbsp;&nbsp;&nbsp;`;
   }

   disableGrade(id) {
      this.activeGrades.forEach((e, i) => {
         if(e.id === id) {
            this.activeGrades.splice(i, 1);
         }
      });
   }

   enableGrade(id) {
      this.allGrades.forEach((e) => {
         if(e.id === id) {
            this.activeGrades.push(e);
         }
      });
   }

   calculateGrade() {
      this.currentGrade = this.strategy.calculate(this.activeGrades);
      this.displayGrade();
   }

   recalculateGrade() {
     this.activeGrades.forEach((e)=>{
       if(!e.added){
        e.weight = this.strategy.determineWeight(document.querySelector(`[data-id="${e.id}"]`));
       }
     });
     this.allGrades.forEach((e)=>{
       if(!e.added){
        e.weight = this.strategy.determineWeight(document.querySelector(`[data-id="${e.id}"]`));
       }
     });
     this.calculateGrade();
   }

   showAddedGrade(weight, grade, id) {
      const createdTr = document.createElement('tr');
      createdTr.innerHTML = this.strategy.determineGradeDisplay(weight, grade);
      this.addedGradesContainer.appendChild(createdTr);

      createdTr.dataset.id = id;

      createdTr.classList.add('clickable');

      if(this.addedGradesContainer.children.length % 2 === 1) {
         createdTr.classList.add('oddRow')
      }

      createdTr.dataset.added = 'true';
      createdTr.dataset.active = 'true';
      createdTr.addEventListener('click', () => {
         if(createdTr.dataset.active === 'true') {
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
         id: this.generateId(8),
         added: true
      };
      this.allGrades.push(newGrade);
      this.activeGrades.push(newGrade);
      this.calculateGrade();
      this.showAddedGrade(weight, grade, newGrade.id);
   }

   attach(elem, weight, grade, calc) {
      elem.addEventListener('click', () => {
         if(this.shouldAttach) {
            if((weight.value !== '' && grade.value !== '') && !isNaN(parseFloat(weight.value))) {
               calc.addNewGrade(parseFloat(weight.value), parseFloat(grade.value));
            } else {
               alert('Please correct your inputs');
            }
         }
      });
      weight.addEventListener('keydown', (e) => {
         if(e.keyCode === 13 && this.shouldAttach) {
            elem.click();
         }
      });
      grade.addEventListener('keydown', (e) => {
         if(e.keyCode === 13 && this.shouldAttach) {
            elem.click();
         }
      });

      this.calculateGrade();
   }
   detach() {
      this.shouldAttach = false;
      [].forEach.call(document.querySelectorAll('tr[data-id]'), (e) => {
        if(e.dataset.added){
          e.parentNode.removeChild(e);
        } else {
          e.classList.remove('faded');
        }
      });
      this.gradeContainer.innerHTML = '';
      this.strategy.onDetach();
   }
}

function InitCalc() {
   if(location.href.indexOf('https://sis.henrico.k12.va.us/guardian/scores.html') > -1) {
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
      const weights = util.getExistingWeights();
      weights.forEach((e)=>{
         newWeightSelect.innerHTML += `<option value="${util.guessWeight(e)}">${e}</option>`;
      });
      comboBoxElem.appendChild(newWeightInput);
      comboBoxElem.appendChild(newWeightSelect);
      const totalPointsLabel = document.createElement('label');
      totalPointsLabel.innerHTML = `Total points: `;
      totalPointsLabel.setAttribute('for', 'totalPointsCheckbox');
      const totalPointsCheckbox = document.createElement('input');
      totalPointsCheckbox.id = 'totalPointsCheckbox';
      totalPointsCheckbox.type = 'checkbox';
      const newGradeInput = document.createElement('input');
      newGradeInput.placeholder = 'Grade';
      newGradeInput.id = 'newGradeInput';
      newGradeInput.type = 'number';

      // Parent element for calculator
      const parentTr = document.createElement('tr');
      parentTr.appendChild(document.createElement('td'));
      parentTr.appendChild(document.createElement('td'));
      parentTr.appendChild(document.createElement('td'));
      parentTr.children[0].appendChild(addGradeButton);
      parentTr.children[1].appendChild(comboBoxElem);
      parentTr.children[1].appendChild(totalPointsLabel);
      parentTr.children[1].appendChild(totalPointsCheckbox);
      parentTr.children[2].appendChild(newGradeInput);

      // Insert the parent element
      parent.insertBefore(parentTr, parent.children[0]);

      // Create element for showing recalculated grade
      document.querySelectorAll('tr.center > td')[3].innerHTML += `<br><div id='recalculatedGrade'></div>`;

      // Initialize the calculator
      let calc = new Calculator(
         WeightedCalculator,
         parseFloat(util.getNumbersInString(document.querySelectorAll('tbody')[0].children[1].children[3].innerText)).toFixed(1),
         document.getElementById('recalculatedGrade'),
         document.querySelectorAll('tbody')[1]
      );

      calc.attach(document.getElementById('addGradeButton'),
         document.getElementById('newWeightInput'),
         document.getElementById('newGradeInput'),
         calc
      );

      totalPointsCheckbox.addEventListener('change', () => {
         calc.detach();

         calc = new Calculator(
            (totalPointsCheckbox.checked ? TotalPointCalculator : WeightedCalculator),
            parseFloat(util.getNumbersInString(document.querySelectorAll('tbody')[0].children[1].children[3].innerText)).toFixed(1),
            document.getElementById('recalculatedGrade'),
            document.querySelectorAll('tbody')[1]
         );

         calc.attach(document.getElementById('addGradeButton'),
            document.getElementById('newWeightInput'),
            document.getElementById('newGradeInput'),
            calc
         );

         newWeightInput.placeholder = (totalPointsCheckbox.checked ? 'Points' : 'Weight');

         newWeightInput.value = '';
         newGradeInput.value = '';
      });

      let combobox = new ComboBox(document.getElementById('combobox'), false);
   }
}

module.exports = InitCalc;
