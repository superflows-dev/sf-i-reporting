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
const timeSince = (date) => {
    var seconds = Math.floor((new Date().getTime() - date) / 1000);
    if (seconds > 0) {
        var interval = seconds / 31536000;
        if (interval > 1) {
            return Math.floor(interval) + " years ago";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months ago";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days ago";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours ago";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
    }
    else {
        var interval = Math.abs(seconds) / 31536000;
        console.log('timesince', seconds);
        console.log('interval year', interval);
        if (interval > 1) {
            return Math.floor(interval) + " years later";
        }
        interval = Math.abs(seconds) / 2592000;
        console.log('interval months', interval);
        if (interval > 1) {
            return Math.floor(interval) + " months later";
        }
        interval = Math.abs(seconds) / 86400;
        console.log('interval days', interval);
        if (interval > 1) {
            return Math.floor(interval) + " days later";
        }
        interval = Math.abs(seconds) / 3600;
        console.log('interval hours', interval);
        if (interval > 1) {
            return Math.floor(interval) + " hours later";
        }
        interval = Math.abs(seconds) / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes later";
        }
        return Math.floor(Math.abs(seconds)) + " seconds";
    }
};
function isInteger(value) {
    return /^-?\d+$/.test(value);
}
function isPlainObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}
const exportFunctions = {
    callApi, callApiPresignedDelete, callApiPresignedGet, validateName, readCookie, delay, timeSince, isInteger, isPlainObject
};
export default exportFunctions;
//# sourceMappingURL=util.js.map