const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let job = new Schema({
    job_title: {
        type: String
    },
    job_description: {
        type: String
    },
    job_category: {
        type: String
    },
    job_area: {
        type: String
    }
});

module.exports = mongoose.model('job', job, 'Jobs');

