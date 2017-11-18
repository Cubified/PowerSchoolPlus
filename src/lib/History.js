// This needs some work

const getNumbersInString = (str) => {
	let out = '';
	str.split('').forEach((e) => {
		if('0123456789.'.indexOf(e) > -1) {
			out += e;
		}
	});
	return out;
};

const loadGrades = (callback) => {
	chrome.storage.local.get('gradehistory', callback);
};

const gradeDates = (grades) => {
	const out = [];
	grades.forEach((e) => {
		const date = new Date(e.date);
		out.push(date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear());
	});
	return out;
};

const getGradesFromClass = (grades, c, quarter) => {
	const out = [];
	grades.forEach((e) => {
		e.grades.forEach((el) => {
			if(el.class.replace(/^\s+|\s+$/g, '') === c && el.quarter === quarter && el.grade !== 0) {
				out.push(el.grade);
			}
		});
	});
	return out;
};

const findNewestQuarter = (grades) => {
	let out = 'Q1';
	grades.forEach((e) => {
		e.grades.forEach((el) => {
			if(el.quarter.indexOf('Q') > -1) {
				if(getNumbersInString(out) < getNumbersInString(el.quarter)) {
					out = el.quarter;
				}
			}
		});
	});
	return out;
};
const setNewestQuarter = (quarter) => {
	chrome.storage.local.set({
		'newestquarter': quarter
	});
};

const ctx = document.querySelector('canvas');

loadGrades((data) => {
	if(data.gradehistory !== undefined && data.gradehistory.length > 1) {
		const classes = [],
			quarter = findNewestQuarter(data.gradehistory);
		setNewestQuarter(quarter);
		data.gradehistory[0].grades.forEach((e) => {
			if(classes.indexOf(e.class) === -1) {
				classes.push(e.class);
			}
		});

		const datasets = [];
		classes.forEach((e) => {
			const col = Please.make_color({
				format: 'rgb'
			});

			datasets.push({
				label: e + ' - ' + quarter,
				fill: false,
				lineTension: 0.1,
				backgroundColor: `rgba(${col.r},${col.g},${col.b},0.4)`,
				borderColor: `rgba(${col.r},${col.g},${col.b},1)`,
				data: getGradesFromClass(data.gradehistory, e.replace(/^\s+|\s+$/g, ''), quarter)
			});
		});

		let chart = new Chart(ctx, {
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

		document.querySelector('#cleardata').style.background = Please.make_color({
			format: 'rgb-string'
		});
		Waves.attach('#cleardata', ['waves-button', 'waves-light', 'waves-float']);
		Waves.init();
		document.querySelector('#cleardata').style.display = 'block';
	} else {
		document.getElementById('quarter').innerHTML = 'You do not have enough grade history to create a graph';
	}
});

document.querySelector('#cleardata').onclick = () => {
	chrome.storage.local.set({
		'gradehistory': []
	});
	location.reload();
};
