const Sequelize = require('sequelize');
const {STRING, UUID, UUIDV4} = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/pokedex_db');

const Pokemon = conn.define('pokemon', {
  id:{
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  }
});

const Type = conn.define('type', {
  id:{
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  type: {
    type: STRING,
    allowNull: false,
    unique: true
  }
})

Pokemon.belongsTo(Type);
Type.hasMany(Pokemon);

const syncAndSeed = async ()=>{
  await conn.sync({force: true});

  const [grass, fire, water, ground, rock, electric, flying, normal, fighting, steel, bug, poison, fairy, psychic, dark, ghost, dragon, ice, none] = await Promise.all([
    Type.create({ type: 'grass' }),
    Type.create({ type: 'fire' }),
    Type.create({ type: 'water' }),
    Type.create({ type: 'ground' }),
    Type.create({ type: 'rock' }),
    Type.create({ type: 'electric' }),
    Type.create({ type: 'flying' }),
    Type.create({ type: 'normal' }),
    Type.create({ type: 'fighting' }),
    Type.create({ type: 'steel' }),
    Type.create({ type: 'bug' }),
    Type.create({ type: 'poison' }),
    Type.create({ type: 'fairy' }),
    Type.create({ type: 'psychic' }),
    Type.create({ type: 'dark' }),
    Type.create({ type: 'ghost' }),
    Type.create({ type: 'dragon' }),
    Type.create({ type: 'ice' }),
    Type.create({ type: 'none'})
  ])

  const [ pikachu, eevee, tyranitar, lucario, gardevior, metagross, garchomp, salamance, electravire, charizard, mewtwo, machamp, gangar, butterfree, infernape, beartic, golem, lanturn, zarrena, volcarona, swampert ] = await Promise.all([
    Pokemon.create({name: 'Pikachu', typeId: electric.id}),
    Pokemon.create({name: 'Eevee', typeId: normal.id}),
    Pokemon.create({name: 'Tyranitar', typeId: rock.id}),
    Pokemon.create({name: 'Lucario', typeId: steel.id}),
    Pokemon.create({name: 'Gardevior', typeId: psychic.id}),
    Pokemon.create({name: 'Metagross', typeId: steel.id}),
    Pokemon.create({name: 'Garchomp', typeId: dragon.id}),
    Pokemon.create({name: 'Salamance', typeId: dragon.id}),
    Pokemon.create({name: 'Electravire', typeId: electric.id}),
    Pokemon.create({name: 'Charizard', typeId: fire.id}),
    Pokemon.create({name: 'Mewtwo', typeId: psychic.id}),
    Pokemon.create({name: 'Machamp', typeId: fighting.id}),
    Pokemon.create({name: 'Gangar', typeId: ghost.id}),
    Pokemon.create({name: 'Butterfree', typeId: bug.id}),
    Pokemon.create({name: 'Infernape', typeId: fire.id}),
    Pokemon.create({name: 'Beartic', typeId: ice.id}),
    Pokemon.create({name: 'Golem', typeId: rock.id}),
    Pokemon.create({name: 'Lanturn', typeId: water.id }),
    Pokemon.create({name: 'Zarrena', typeId: grass.id }),
    Pokemon.create({name: 'Volcarona', typeId: bug.id }),
    Pokemon.create({name: 'Swampert', typeId: water.id })
  ])

};
// syncAndSeed();
module.exports={
  syncAndSeed,
  models: {
    Pokemon,
    Type
  }
}
