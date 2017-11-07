let Utils = {
	IsLoginScreen:()=>{
		return (document.querySelector(`form[name="LoginForm"]`));
	},
	IsScoresScreen:()=>{
		return (location.href.indexOf('guardian/scores.html') > -1);
	}
};

module.exports = Utils;
