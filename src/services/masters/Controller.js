const { _response_message } = require("@src/utils/constants/messages")
const { _status } = require("@src/utils/constants/models")
const { serviceResponse } = require("@src/utils/helpers/api_response")
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const { rootDir } = require('@config/index')
const { sendMail } = require('@src/utils/helpers/node_mailer')
const { LangPreference } = require("@src/models/master/LangPreference")

/* master CURD for dataNeuron assessment */

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
exports.sendQueryMail = async (req, res, next) => {
    try {
        let { email, description } = req.body;
        if (!description) {
            description = `Give me all information about your company. `
        }
        const HTML = ejs.render(fs.readFileSync(path.join(rootDir, '/src/views/templates/index.ejs'), 'utf8'), { bodyText: description });

        await sendMail(email, null, "Information Query", HTML)
        return res.json(new serviceResponse({ status: 200, message: _response_message.emailSend("Query"), data: {} }))
    } catch (error) {
        return res.json(new serviceResponse({ status: 400, message: error.message }))
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
exports.createLangPreference = async (req, res, next) => {
    try {
        const { name, email, languages = [] } = req.body;
        let existingRecord = await LangPreference.findOne({ email })
        if (existingRecord) {
            return res.json(new serviceResponse({ status: 200, message: _response_message.alreadyExist('User') }));
        }
        const langPreference = LangPreference({ name, email, languages });
        await langPreference.save()
        return res.json(new serviceResponse({ status: 200, message: _response_message.created("languages preferences"), data: langPreference }));
    } catch (error) {
        return res.json(new serviceResponse({ status: 400, message: error.message }));
    }
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
exports.getLangPreferenceByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;
        const updatedLangPreference = await LangPreference.findOne({ email });
        if (!updatedLangPreference) {
            return res.json(new serviceResponse({ status: 404, message: _response_message.notFound() }));
        }
        return res.json(new serviceResponse({ status: 200, message: _response_message.found("Preferred languages"), data: updatedLangPreference }));
    } catch (error) {
        return res.json(new serviceResponse({ status: 400, message: error.message }));
    }
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
exports.updateLangPreference = async (req, res, next) => {
    try {
        const { name, email, languages } = req.body;
        const updatedLangPreference = await LangPreference.findOneAndUpdate({ email }, { name, languages }, { new: true });
        if (!updatedLangPreference) {
            return res.json(new serviceResponse({ status: 404, message: _response_message.notFound("record") }));
        }
        return res.json(new serviceResponse({ status: 200, message: _response_message.updated("languages"), data: updatedLangPreference }));
    } catch (error) {
        return res.json(new serviceResponse({ status: 400, message: error.message }));
    }
};
