async function loadEcharts() {
    return await new Promise(function (resolve, reject) {
        const script = document.createElement("script");
        script.onload = resolve;
        script.onerror = reject;
        script.src = "https://assets.pyecharts.org/assets/echarts.min.js";
        document.head.appendChild(script);
    }).then(() => {
        console.log("echarts.min.js loaded");
        return true;
    }).catch(() => {
        console.log("echarts.min.js failed to load");
        return false;
    });
}

module.exports = loadEcharts;