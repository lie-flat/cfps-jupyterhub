loadJSWithRetries = require('./load-echarts.js');

module.exports = [{
    id: 'jupyterlab_cfps_preload',
    autoStart: true,
    activate: async function (app) {
        console.log('JupyterLab extension jupyterlab_cfps_preload is activated!');
        await loadJSWithRetries('https://assets.pyecharts.org/assets/echarts.min.js');
        await Promise.all([
            loadJSWithRetries('https://assets.pyecharts.org/assets/echarts-wordcloud.min.js'),
            loadJSWithRetries('https://assets.pyecharts.org/assets/maps/china.js')
        ]);
    }
}];
