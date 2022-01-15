module.exports = [
  {
    id: 'jupyterlab_cfps_preload',
    autoStart: true,
    activate: function (app) {
      console.log(
        'JupyterLab extension jupyterlab_cfps_preload is activated!'
      );
      console.log(app.commands);
    }
  }
];
