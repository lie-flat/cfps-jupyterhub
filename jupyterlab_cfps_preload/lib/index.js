loadEcharts = require('./load-echarts.js');

module.exports = [
    {
        id: 'jupyterlab_cfps_preload',
        autoStart: true,
        activate: function (app) {
            console.log(
                'JupyterLab extension jupyterlab_cfps_preload is activated!'
            );
            new Promise(async function (resolve, reject) {
                    let counter = 5;
                    while (counter-- > 0) {
                        if (await loadEcharts()) {
                            resolve();
                            return;
                        } else console.log("Retrying...");
                    }
                    reject();
                }
            ).then(() => {
            })

            console.log(app.commands);
        }
    }
];
