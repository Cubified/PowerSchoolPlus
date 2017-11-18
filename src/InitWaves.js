const Waves = require('./lib/waves.min.js');

function InitWaves() {
   Waves.attach('button', ['waves-button', 'waves-light', 'waves-float']);
   Waves.init();
}

module.exports = InitWaves;

