const types = [
  { type: 'bug', color: '#a8b820' },
  { type: 'dark', color: '#705848' },
  { type: 'dragon', color: '#7038f8' },
  { type: 'electric', color: '#f8d030' },
  { type: 'fairy', color: '#f8a0e0' },
  { type: 'fighting', color: '#903028' },
  { type: 'fire', color: '#f05030' },
  { type: 'flying', color: '#a890f0' },
  { type: 'ghost', color: '#705898' },
  { type: 'grass', color: '#78c850' },
  { type: 'ground', color: '#e0c068' },
  { type: 'ice', color: '#98d8d8' },
  { type: 'normal', color: '#a8a878' },
  { type: 'poison', color: '#a040a0' },
  { type: 'rock', color: '#b8a038' },
  { type: 'shadow', color: '#403246' },
  { type: 'steel', color: '#b8b8d0' },
  { type: 'water', color: '#6890f0' },
  { type: null, color: '#68a090' },
  { type: 'psychic', color: '#f85888' }
]

const getTypeColor = pokemonType =>
  types.filter(type => type.type === pokemonType)[0].color

export default getTypeColor
