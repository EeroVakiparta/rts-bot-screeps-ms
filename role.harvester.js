var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
      if(creep.store.getFreeCapacity() > 0) {
          var sources = creep.room.find(FIND_SOURCES);
          if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
          }
      }
      else{
          var priorityTargets = creep.room.find(FIND_STRUCTURES, {
              filter: (structure) => {
                  return (structure.structureType == STRUCTURE_EXTENSION ||
                      structure.structureType == STRUCTURE_SPAWN) &&
                      structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
              }
          });
          if(priorityTargets.length > 0) {
              if(creep.transfer(priorityTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(priorityTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
              }
          }
          else {
            var secondaryTargets = creep.room.find(FIND_STRUCTURES, {
              filter: (structure) => {
                  return (structure.structureType == STRUCTURE_CONTAINER ||
                      structure.structureType == STRUCTURE_TOWER) &&
                      structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
              }
          });
          //TODO: remove duplicates & speed up
          if(secondaryTargets.length > 0) {
              if(creep.transfer(secondaryTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(secondaryTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
              }
          }
          else {
            // TODO: make better way to have harvester move away when it has nothing to do
              creep.say("😪");
              creep.moveTo(33,16); 
          }
          }
      }
  }
};

module.exports = roleHarvester;