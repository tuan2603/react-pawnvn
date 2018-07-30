export function getFromSession(key) {
    if(!key){
        return null;
    }
    try {
        const valueStr = sessionStorage.getItem(key);
        if(valueStr){
            return JSON.parse(valueStr);
        }
        return null;
    } catch (e) {
        return null;
    }
}

export function setInSession(key, obj) {
    if (!key) {
        console.error('Error: key is missing');
    }
    try {
        sessionStorage.setItem(key, JSON.stringify(obj));
    } catch (e) {
        console.error(e);
    }
}

export function removeSession(key) {
    sessionStorage.removeItem(key);
}

export function setupTimeOut() {
    let hours = 24; // Reset when storage is more than 24hours
    let now = new Date().getTime();
    let setupTime = sessionStorage.getItem('setupTime');
    if (setupTime == null) {
        sessionStorage.setItem('setupTime', now)
    } else {
        if(now-setupTime > hours*60*60*1000) {
            sessionStorage.clear()
            sessionStorage.setItem('setupTime', now);
        }
    }
}