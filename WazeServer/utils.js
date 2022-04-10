/**
 * @description: deserializes the json string into json object and returns it.
 * 
 * @param jsonData(string) - the serialized data of the json object 
 * @returns - the json object created from the json string
 * @author Eylon Bash 
 */
export const deserializeJson = jsonData => {
    return JSON.deserializeJson(jsonData);
}

/**
 * @description: returns the data from the storage json.
 * 
 * @returns - the array of the data contained in the storage json
 * @author Eylon Bash
 */
export const getStorage = () => {
    return JSON.stringify(require('./dataStorage.json').storage);
}

/**
 * @description: this will saved the data it received in the storage json file accordingly
 * 
 * @param {object} data - the data that has been received and need to be saved
 * @author Eylon Bash
 */
export const addToStorage = data => {
    let newData = {
        "lat": data.latitude,
        "long": data.longitude,
        //"time": data.time,
        "color": getDataColor(data.currentSpeed, data.maxSpeed)
    }

    let storage = require('./dataStorage.json');
    storage.storage.push(newData);
    let fs = require('fs');
    fs.writeFile('./dataStorage.json', JSON.stringify(storage));
}

/**
 * @description: the function checks what the color should be returned, according to the speed and max speed it is given.
 * 
 * @param {number} speed - the speed received from the data
 * @param {number} maxSpeed - the speed limit for the data (it is received from the data)
 * @returns - the number that is needed (represents a color), according to the speed and maxSpeed parameters
 * @author Eylon Bash
 */
const getDataColor = (speed, maxSpeed) => {
    if(speed < 20) {
        return null;
    }
    if(20 <= speed <= maxSpeed) {
        return 1;
    }
    if((maxSpeed+1) <= speed <= (maxSpeed+(maxSpeed/10))) {
        return 2;
    }
    return 3;
}