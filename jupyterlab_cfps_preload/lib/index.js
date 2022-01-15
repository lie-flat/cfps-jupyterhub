loadEcharts = require('./load-echarts.js');

module.exports = [
    {
        id: 'jupyterlab_cfps_preload',
        autoStart: true,
        activate: async function (app) {
            console.log(
                'JupyterLab extension jupyterlab_cfps_preload is activated!'
            );
            let counter = 5;
            while (counter --> 0) {
                if (await loadEcharts()) {
                    return;
                } else console.log("Retrying...");
            }

            console.log(app.commands);
        }
    }
];
