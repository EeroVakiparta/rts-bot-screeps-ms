var roleArmy = {
  /** @param {Creep} creep **/
  run: function (creep) {

      var enemies = creep.room.find(Game.HOSTILE_CREEPS);

      if(enemies.length){
        creep.say("⚔️");
        creep.moveTo(enemies[0]);
        creep.attack(enemies[0]);
      }
  },
};

module.exports = roleArmy;
