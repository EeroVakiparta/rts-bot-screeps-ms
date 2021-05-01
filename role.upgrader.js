var roleUpgrader = {
  /** @param {Creep} creep **/
  run: function (creep) {
        let flag = Game.flags[creep.memory.targetFlag];
        if(flag){
            if(creep.room == flag.room){
                if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
                  creep.memory.upgrading = false;
                  creep.say("⚡");
                }
                if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
                  creep.memory.upgrading = true;
                  creep.say("🔋");
                }
            
                if (creep.memory.upgrading) {
                  if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {
                      visualizePathStyle: { stroke: "#ffffff" },
                    });
                  }
                } else {
         				var containers = creep.room.find(FIND_STRUCTURES, {
        					filter: (structure) => {
        						return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 200;
        					},
        				});
        				var closest = creep.pos.findClosestByRange(containers);
        				if (creep.withdraw(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        					creep.moveTo(closest, {
        						visualizePathStyle: { stroke: "#ffaa00" },
        					});
        				}
        				creep.withdraw(closest, RESOURCE_ENERGY);
                  // tätä pitää korjaa, tässä sekasin konttia ja sourcee
                  var sources = creep.room.find(FIND_SOURCES);
                  if (creep.harvest(sources[creep.memory.sourceIndex]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.sourceIndex], { visualizePathStyle: { stroke: "#ffaa00" } });
                  }
                  
                }
    
            }else{
                creep.moveTo(flag, {visualizePathStyle: {stroke: '#cc00cc'}});
            }
        }
        },
};

module.exports = roleUpgrader;
