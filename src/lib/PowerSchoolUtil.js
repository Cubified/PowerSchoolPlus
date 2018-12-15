/*
 * PowerSchoolUtil.js: Miscellaneous utility functions
 *
 * Changelog:
 * 11/13/18:
 * - Move functions from InitCalc.js into this file
 */

let Utils = {
  IsLoginScreen: () => {
    return(document.querySelector(`form[name="LoginForm"]`));
  },
  IsScoresScreen: () => {
    return(location.href.indexOf('guardian/scores.html') > -1);
  },
  defaults: {
   Homework: 15,
   HW: 15,
   Classwork: 15,
   CW: 15,
   Quiz: 30,
   QZ: 30,
   Test: 40,
   TST: 40,
   Project: 40
  },
  sumAllInArray: (v) => {
   let tmp = 0;
   v.forEach((e) => {
    tmp += e
   });
   return tmp;
  },
  averageForEachWeight: (arr) => {
   let out = {};
   arr.forEach((e) => {
      if(out[e.name]) {
         out[e.name].grade += e.grade;
         out[e.name].num += 1;
      } else {
         out[e.name] = {
            weight: e.weight,
            grade: e.grade,
            num: 1
         };
      }
   });
   let temp = [];
   for(let key in out) {
      temp.push({
         name: key,
         weight: parseFloat(out[key].weight),
         grade: out[key].grade / out[key].num
      });
   }
   return temp;
  },
  calcWeightedMean: (array) => {
   let arr = Utils.averageForEachWeight(array);

   const t = [],
      w = [];
   arr.forEach((e, i, a) => {
      t.push(e.grade * e.weight);
      w.push(e.weight);
   });
   const n = Utils.sumAllInArray(t);
   return (n / Utils.sumAllInArray(w));
  },
  calcUnweightedMean: (array) => {
   let totalGrade = 0,
      totalWeight = 0;
   array.forEach((e) => {
      totalGrade += e.grade;
      totalWeight += e.weight;
   });
   return (totalGrade / totalWeight) * 100;
  },
  getNumbersInString: (str) => {
   let out = '';
   str.split('').forEach((e) => {
      if('0123456789.'.split('').indexOf(e) > -1) {
         out += e
      }
   });
   return out;
  },
  calculateLetterGrade: (grade) => {
   const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
   const floors = [97, 93, 90, 87, 83, 80, 77, 73, 70, 68, 66, 60, 0];
   let temp = '',
      hit = false;
   grades.forEach((e, i) => {
      if(grade >= floors[i] && !hit) {
         temp = e;
         hit = true;
      }
   });
   return temp;
  },
  guessWeight: (e) => {
    let n = Utils.getNumbersInString(e)
    if(n === ''){
      let weight = 15;
      for(let key in Utils.defaults){
        if(e.toLowerCase().indexOf(key.toLowerCase()) > -1){
          weight = Utils.defaults[key];
        }
      }
      return weight;
    }
    return parseFloat(n);
  },
  makeSafeString: (str) => {
    return encodeURIComponent(str)
            .replace(/\//g,'')
            .replace(/\%/g,'')
            .replace(/\&/g,'');
  },
  getExistingWeights: () => {
    let elements = document.querySelectorAll('table')[1].querySelectorAll('tbody > tr'),
        out = [];
    [].forEach.call(elements,(e)=>{
      if(e.children.length > 8 && !isNaN(parseFloat(Utils.getNumbersInString(e.children[9].innerText))) && !e.dataset.added){
        if(out.indexOf(e.children[1].innerText) === -1){
          out.push(e.children[1].innerText);
        }
      }
    });
    return out;
  },
  updateCombobox: () => {
    const weights = Utils.getExistingWeights(),
          options = document.querySelectorAll('.cb--option');
    let i = 1;
    weights.forEach((e)=>{
      options[i].value = document.querySelector(`input#${Utils.makeSafeString(e)}`).value;
      i += 1;
    });
  },
  updateAverages: (grades) => {
    let averages = Utils.averageForEachWeight(grades);
    let spans = document.querySelectorAll('span.weight-average');
    [].forEach.call(spans,(e,i)=>{
      e.innerText = `${averages[i].grade.toFixed(1)}%`;
    });
  }
};

module.exports = Utils;
