const express = require("express")
const masterRoutes = express.Router()
const { sendQueryMail, createLangPreference, updateLangPreference, getLangPreferenceByEmail, createImage, getAllImages } = require("./Controller")
const { sendQueryMailValidation, languagePreferenceValidation, imagesValidation } = require('./validation')

/* sending mail Route */
masterRoutes.post("/send-mail", sendQueryMailValidation("to-send"), sendQueryMail);

/* language preference routes*/
masterRoutes.post("/create-lang-preference", languagePreferenceValidation("add"), createLangPreference);
masterRoutes.get("/get-lang-preference/:email", languagePreferenceValidation("get"), getLangPreferenceByEmail);
masterRoutes.put("/update-lang-preference", languagePreferenceValidation("update"), updateLangPreference);



module.exports = { masterRoutes }