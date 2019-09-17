/**
 * function to remove whitespaces from string
 * @param {string} str 
 */
function sanitizeString(str) {
    return str.replace(/\s+/g, '');
}


/**
 * function to check whther string is positive integer or not
 * @param {string} str 
 */
function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
}

/**
 * function to confirm that given parameter is array
 * @param {any} param 
 */
function isArray(param) {
    return Array.isArray(param);
}

module.exports = {
    sanitizeString,
    isNormalInteger,
    isArray
}