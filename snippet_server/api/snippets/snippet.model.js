const mongoose = require('mongoose')


const SnippetSchema = new mongoose.Schema({
 
    title: String,

    code_snippet: String,

    programming_language: String,

    code_snippet: String,

    created: {
        type: Date,
        default: Date.now
