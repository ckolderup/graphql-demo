var express = require('express');
var request = require('request-promise-native');
var router = express.Router();

// TODO 1: query the API for a list of the first 150 Pokemon
const POKEMON_LIST_QUERY = `
  query {
  }
`;

// TODO 3: query the API for a given Pokemon by ID
const POKEMON_QUERY = `
  query {
  }
`;

/* GET listing. */
router.get('/', async function(req, res, next) {
  try {
    var data = await graphqlQuery(POKEMON_LIST_QUERY, {first: 150});
// TODO 2: feed the list of Pokemon into the view and edit views/pokemons.hbs
    res.render('pokemons', {pokemon: undefined, title: 'Pokedex'});
  } catch(err) {
    res.status(500).send({error: err});
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    var data = await graphqlQuery(POKEMON_QUERY, {id: req.params.id});
// TODO 4: feed the data for a Pokemon into the view and edit view/pokemon.hbs
    res.render('pokemon', {pokemon: undefined, title: `Pokedex - ${undefined}`});
  } catch(err) {
    res.status(500).send({error: err});
  }
});

const API_ROOT='https://graphql-pokemon.now.sh/'

async function graphqlQuery(queryString, variables={}) {
  return request.post(API_ROOT, {
    body: {
      query: queryString,
      variables: variables,
    },
    json: true
  }).then(response => {
    return response.data;
  }).catch(err => {
    throw err;
  });
}

module.exports = router;
