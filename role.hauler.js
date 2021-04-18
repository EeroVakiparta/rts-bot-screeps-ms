var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.supplying && creep.carry.energy == 0) {
            creep.memory.supplying = false;
            creep.say('⛟');
        }
        if(!creep.memory.supplying && creep.carry.energy == creep.carryCapacity) {
            creep.memory.supplying = true;
            creep.say('🚚');
        }
        
        if (creep.memory.supplying) {
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
                }
            });
            if (containers && containers.length > 0) {
                containers.sort((a, b) => a.storeCapacity - b.storeCapacity);
                if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0]);
                }
            }
        } else {
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0);
                }
            });
            //var source = creep.pos.findClosestByPath(containers);
            if (containers) {
                containers.sort((a, b) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY]);
                if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0]);
                }
            }
        }
    }
};

module.exports = roleHauler;