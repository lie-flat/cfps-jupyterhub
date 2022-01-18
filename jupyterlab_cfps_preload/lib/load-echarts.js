async function loadJS(jsUrl) {
    return await new Promise(function (resolve, reject) {
        const script = document.createElement("script");
        script.onload = resolve;
        script.onerror = reject;
        script.src = jsUrl;
        document.head.appendChild(script);
    }).then(() => {
        console.log(`${jsUrl} loaded`);
        return true;
    }).catch(() => {
        console.log(`${jsUrl} failed to load`);
        return false;
    });
}

async function loadJSWithRetries(jsUrl) {
    let retries = 0;
    while (!(await loadJS(jsUrl))) {
        if (retries > 5) {
            console.log(`Failed to load ${jsUrl} after ${retries} retries`);
            return false;
        }
        retries++;
    }
    return true;
}

module.exports = loadJSWithRetries;