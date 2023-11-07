const router = require('express').Router();
const controller = require('./snippet.controller')
const middleware = require('../middleware/authorization')

// GET /snippets
router.get('/', controller.getSnippets);

// GET /snippets/:id
router.get('/:id', controller.getSnippetsById );

// POST /snippets
