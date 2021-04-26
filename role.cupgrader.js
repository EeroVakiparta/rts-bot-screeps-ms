var roleCUpgrader = {
    /** @param {Creep} creep **/
    run: function (creep) {
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
                return structure.structureType == STRUCTURE_CONTAINER;
            },
        });
        var closest = creep.pos.findClosestByRange(containers);
        if (
            creep.withdraw(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
        ) {
            creep.moveTo(closest, {
                visualizePathStyle: { stroke: "#ffaa00" },
            });
        }
        creep.withdraw(closest, RESOURCE_ENERGY);
      }
    },
  };
  
  module.exports = roleCUpgrader;
  