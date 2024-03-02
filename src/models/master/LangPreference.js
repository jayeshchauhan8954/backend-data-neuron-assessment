const mongoose = require('mongoose');
const { _table_name } = require('@src/utils/constants/models')

const LangPreferenceSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    name: {
        type: String,
        unique: false,
        require: true
    },
    languages: {
        type: Array,
        require: true,
        defaultValue: []
    },
}, { timestamps: true })

const LangPreference = mongoose.model(_table_name.lang_preference, LangPreferenceSchema)

module.exports = { LangPreference }