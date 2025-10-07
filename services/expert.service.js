
const Expert = require("../models/expert.model");

const createExpert = async (data) => {
    const expert = new Expert(data);
    return await expert.save();
};

const getAllExperts = async () => {
    return await Expert.find();
};


module.exports = {
    createExpert,
    getAllExperts,
};