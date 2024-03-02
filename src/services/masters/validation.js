const { validateErrors } = require("@src/utils/helpers/express_validator");
const { body,param } = require("express-validator");

/**
 * @param {"to-send"} type
 */
exports.sendQueryMailValidation = (type) => {
    switch (type) {
        case "to-send":
            return [
                body("email", "email can't be null").notEmpty().trim(),
                validateErrors,
            ]
    }
}
/**
 * @param {"add"|"update"|"get"} type
 */
exports.languagePreferenceValidation = (type) => {
    switch (type) {
        case "add":
            return [
                body("name", "name can't be null").notEmpty().trim(),
                body("email", "email can't be null").notEmpty().trim(),
                validateErrors,
            ]
        case "update":
            return [
                body("email", "email can't be null").notEmpty().trim(),
                validateErrors,
            ]
        case "get":
            return [
                param("email", "email can't be null").notEmpty().trim(),
                validateErrors,
            ]
    }
}
/**
 * @param {"add"} type
 */
exports.imagesValidation = (type) => {
    switch (type) {
        case "add":
            return [
                body("image", "image can't be null").notEmpty().trim(),
                validateErrors,
            ]
    }
}