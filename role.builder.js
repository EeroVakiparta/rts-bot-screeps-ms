var roleBuilder = {
	/** @param {Creep} creep **/
	run: function (creep) {
	    

        let flag = Game.flags[creep.memory.targetFlag];
        if(flag){
            if(creep.room == flag.room){
                	    
        		if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
        			creep.memory.building = false;
        			creep.say("⚡");
        		}
        		if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
        			creep.memory.building = true;
        			creep.say("🚧");
        		}
        
        		if (creep.memory.building) { 
        			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        			if (targets.length) {
        				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
        					creep.moveTo(targets[0], {
        						visualizePathStyle: { stroke: "#ffffff" },
        					});
        				}
        			}
        		} else {
        			if ((creep.memory.source === 'sources')) {
        				var sources = creep.room.find(FIND_SOURCES);
        				if (creep.harvest(sources[creep.memory.sourceIndex]) == ERR_NOT_IN_RANGE) {
        					creep.moveTo(sources[creep.memory.sourceIndex], {
        						visualizePathStyle: { stroke: "#ffaa00" },
        					});
        				}
        				//((creep.memory.source = "container"))
        			} else  {
        			    
        			    /*
    				let closestNonSpawn = creep.room.find(FIND_STRUCTURES, {
        					filter: (structure) => {
        						return structure.structureType == STRUCTURE_WALL;
        					},
        				});
        			let closestNonSpawnClosest = creep.pos.findClosestByRange(closestNonSpawn);
        
        			if (creep.dismantle(closestNonSpawnClosest) == ERR_NOT_IN_RANGE) {
        				creep.moveTo(closestNonSpawnClosest);
        				//console.log(creep.dismantle(closestNonSpawnClosest))
        			}
        			    */
        			    
        				var containers = creep.room.find(FIND_STRUCTURES, {
        					filter: (structure) => {
        						return ((structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 49) &&
								structure.id !== '60916bff41668439fd4370ed');
        					},
        				});
        				var closest = creep.pos.findClosestByRange(containers);
        				
        				if (creep.withdraw(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        					creep.moveTo(closest, {
        						visualizePathStyle: { stroke: "#ffaa00" },
        					});
        				}
        				creep.withdraw(closest, RESOURCE_ENERGY);
        			
        			}
        		}
            }
            else{
                creep.moveTo(flag, {visualizePathStyle: {stroke: '#cc00cc'}});
            }
        }
	    
	},
};

module.exports = roleBuilder;
