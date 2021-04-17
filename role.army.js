var roleArmy = {
  /** @param {Creep} creep **/
  run: function (creep) {

      var enemies = creep.room.find(FIND_HOSTILE_CREEPS);
      if(enemies.length > 0){
        creep.say("⚔️");
        creep.moveTo(enemies[0]);
        creep.attack(enemies[0]);
      }
  },
};

module.exports = roleArmy;
