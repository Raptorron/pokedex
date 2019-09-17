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

  const [ pikachu, eevee, tyranitar, lucario, gardivar, metagross, garchomp, salamance, electravire, charizard, mewtwo, machamp, gangar, butterfree, infernape, beartic, golem, lanturn, zarrena ] = await Promise.all([
    Pokemon.create({name: 'Pikachu', type01Id: electric.id, type02Id: none.id}),
    Pokemon.create({name: 'Eevee', type01Id: normal.id, type02Id: none.id}),
    Pokemon.create({name: 'Tyranitar', type01Id: rock.id, type02Id: dark.id}),
    Pokemon.create({name: 'Lucario', type01Id: steel.id, type02Id: fighting.id}),
    Pokemon.create({name: 'Gardivar', type01Id: psychic.id, type02Id: fairy.id}),
    Pokemon.create({name: 'Metagross', type01Id: steel.id, type02Id: psychic.id}),
    Pokemon.create({name: 'Garchomp', type01Id: dragon.id, type02Id: ground.id}),
    Pokemon.create({name: 'Salamance', type01Id: dragon.id, type02Id: flying.id}),
    Pokemon.create({name: 'Electravire', type01Id: electric.id, type02Id: none.id}),
    Pokemon.create({name: 'Charizard', type01Id: fire.id, type02Id: flying.id}),
    Pokemon.create({name: 'Mewtwo', type01Id: psychic.id, type02Id: none.id}),
    Pokemon.create({name: 'Machamp', type01Id: fighting.id, type02Id: none.id}),
    Pokemon.create({name: 'Gangar', type01Id: ghost.id, type02Id: poison.id}),
    Pokemon.create({name: 'Butterfree', type01Id: bug.id, type02Id: flying.id}),
    Pokemon.create({name: 'Infernape', type01Id: fire.id, type02Id: fighting.id}),
    Pokemon.create({name: 'Beartic', type01Id: ice.id, type02Id: none.id}),
    Pokemon.create({name: 'Golem', type01Id: rock.id, type02Id: ground.id}),
    Pokemon.create({name: 'Lanturn', type01Id: water.id, type02Id: electric.id }),
    Pokemon.create({name: 'Zarrena', type01Id: grass.id, type02Id: none.id })
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
