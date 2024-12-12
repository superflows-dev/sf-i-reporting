const validateName = (name) => {
    if ((name + "").length > 2) {
        return true;
    }
    return false;
};
function readCookie(key) {
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
async function callApi(url, data, authorization) {
    return new Promise((resolve) => {
        const jsonData = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr != null) {
                if (xhr.readyState === 4) {
                    resolve(xhr);
                }
            }
        });
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        if (authorization != null) {
            xhr.setRequestHeader('Authorization', 'Basic ' + authorization);
        }
        xhr.send(jsonData);
        return xhr;
    });
}
async function callApiPresignedDelete(url) {
    return new Promise((resolve) => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr != null) {
                if (xhr.readyState === 4) {
                    resolve(xhr);
                }
            }
        });
        xhr.open("DELETE", url);
        xhr.timeout = 1800000;
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(null);
        return xhr;
    });
}
async function callApiPresignedGet(url) {
    return new Promise((resolve) => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr != null) {
                if (xhr.readyState === 4) {
                    resolve(xhr);
                }
            }
        });
        xhr.open("GET", url);
        xhr.timeout = 1800000;
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(null);
        return xhr;
    });
}
const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};
const exportFunctions = {
    callApi, callApiPresignedDelete, callApiPresignedGet, validateName, readCookie, delay
};
export default exportFunctions;
//# sourceMappingURL=util.js.map