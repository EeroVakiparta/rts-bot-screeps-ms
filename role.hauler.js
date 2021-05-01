var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.supplying && creep.carry.energy == 0) {
            creep.memory.supplying = false;
            
            
            creep.say('get energy');
        }
        if(!creep.memory.supplying && creep.carry.energy == creep.carryCapacity) {
            creep.memory.supplying = true;
            creep.say('🚚 deliver');
        } 
        // TODO : make so that the hauler does not change target inbetween haul
        if (creep.memory.supplying) {
            
            if(creep.memory.home == 'E23S52'){
              var  idContainer = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER &&
								structure.id == '608c7b5e59886d67bdb7b148'); // UGLY way to fixt the chockepoint problem
                    }
                });
                
                
               if(creep.transfer(idContainer[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(idContainer[0]);
                    
               }
            }else{
                            var  containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ||
								structure.structureType == STRUCTURE_SPAWN) &&
								(structure.store[RESOURCE_ENERGY] < (structure.storeCapacity / 2));
                    }
                });
            
                if (containers && containers.length > 0) {
                    containers.sort((a, b) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY]);
                }
                
                
               if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0]);
               }

            }

 

            
        } else {
            

          var containersToWithdrawFrom = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((((structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 1000) || 
                    structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > 100)) &&
								structure.id !== '608c7b5e59886d67bdb7b148');
                }
            }); 
            
  
            
            //console.log(containersToWithdrawFrom[0])
            
            //var source = creep.pos.findClosestByPath(containers);
            if (containersToWithdrawFrom.length > 0) {
               // console.log("Hauler getting energy " + containersToWithdrawFrom[0])
                containersToWithdrawFrom.sort((a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
                if(creep.withdraw(containersToWithdrawFrom[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containersToWithdrawFrom[0]);
                }
            }else{
                
                if(creep.memory.home == 'E23S52'){
                    	creep.say("😪");
					creep.moveTo(39,46);
                }else{
                    	creep.say("😪");
					creep.moveTo(42,27);
                }
                	
            }
        }
    }
};

module.exports = roleHauler;