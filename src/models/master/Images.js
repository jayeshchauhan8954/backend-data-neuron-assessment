const mongoose = require('mongoose');
const { _table_name } = require('@src/utils/constants/models')

const DataNeuronImages = new mongoose.Schema({
    image: {
        type: String,
        require: true,
    },
}, { timestamps: true })

const Images = mongoose.model(_table_name.data_neuron_images, DataNeuronImages)

module.exports = { Images }