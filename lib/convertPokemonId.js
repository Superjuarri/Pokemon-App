const convertPokemonId = id => `#${('0000' + id).slice(-3)}`

export default convertPokemonId
