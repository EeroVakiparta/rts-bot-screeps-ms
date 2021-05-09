var roleHarvester = {
	/** @param {Creep} creep **/
	run: function (creep) {
		let enemies = creep.room.find(FIND_HOSTILE_CREEPS);

		if (enemies.length < 99999999) {
		    // Jos on tyhjää -> eti containerit joissa on vähintään 100 energiaa
		    // Etsi lähin ja mee sieltä ottamaan
			if (creep.store.getFreeCapacity() > 0) {
				var containers = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (((structure.structureType == STRUCTURE_CONTAINER &&
								structure.store.getFreeCapacity(RESOURCE_ENERGY) < 1900)
								|| (structure.structureType == STRUCTURE_CONTAINER &&
								structure.store.getUsedCapacity > 49)) &&
								structure.id !== '60916bff41668439fd4370ed');
					},
				});
				
				
                var closestContainer = creep.pos.findClosestByRange(containers);
                
				if (creep.withdraw(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(closestContainer, {
						visualizePathStyle: { stroke: "#ffaa00" },
					});
				}
				
			} else {
			    // Hae tärkeet kohteet joissa on tilaa
			    // etsi lähin ja transferaa sinne energiaa
			    
				var priorityTargets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 99	);
					},
				});
			    
			    //Jos ei oo tärkeitä torneja niin sitte muihin
			    if(priorityTargets.length == 0){   
    				priorityTargets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (
							(structure.structureType == STRUCTURE_EXTENSION ||
								structure.structureType == STRUCTURE_SPAWN ||
								structure.structureType == STRUCTURE_TOWER) &&
							structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
						);
					},
				});
			    }

				if (priorityTargets.length > 0) {
				    
                    var closestTarget = creep.pos.findClosestByRange(priorityTargets);
					if (creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(closestTarget, {
							visualizePathStyle: { stroke: "#ffffff" },
						});
					}
				}else{
					// TODO: make better way to have harvester move away when it has nothing to do
					if(creep.memory.home == 'E23S52'){
					    						creep.say("😪");
						creep.moveTo(22,35);
					}else if(creep.memory.home == 'E21S52'){
					    						creep.say("😪");
						creep.moveTo(18,46);
					}else{
					    						creep.say("😪");
						creep.moveTo(43, 26);
					}

				}
			}
		} else {
			if (creep.store.getFreeCapacity() > 0) {
				var sources = creep.room.find(FIND_SOURCES);
				if(sources[0].energy > 3333333333){
    				if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
    					creep.moveTo(sources[0], {
    						visualizePathStyle: { stroke: "#ffaa00" },
    					});
    				}
				}else if(sources[1].energy > 0){
    				if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
    					creep.moveTo(sources[1], {
    						visualizePathStyle: { stroke: "#ffaa00" },
    					});
    				}
				}
			} else {
			    creep.say("💒");
				var priorityTargets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (
							(structure.structureType == STRUCTURE_EXTENSION ||
								structure.structureType == STRUCTURE_SPAWN) &&
							structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
						);
					},
				});
				if (priorityTargets.length > 0) {
					if (
						creep.transfer(priorityTargets[0], RESOURCE_ENERGY) ==
						ERR_NOT_IN_RANGE
					) {
						creep.moveTo(priorityTargets[0], {
							visualizePathStyle: { stroke: "#ffffff" },
						});
					}
				} else {
				    creep.say("💾");
					var secondaryTargets = creep.room.find(FIND_STRUCTURES, {
						filter: (structure) => {
							return (
								(structure.structureType == STRUCTURE_CONTAINER ||
									structure.structureType == STRUCTURE_TOWER) &&
								structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
							);
						},
					});
					//TODO: remove duplicates & speed up
					if (secondaryTargets.length > 0) {
						if (
							creep.transfer(secondaryTargets[0], RESOURCE_ENERGY) ==
							ERR_NOT_IN_RANGE
						) {
							creep.moveTo(secondaryTargets[0], {
								visualizePathStyle: { stroke: "#ffffff" },
							});
						}
					} else {
						// TODO: make better way to have harvester move away when it has nothing to do
						creep.say("😪");
						creep.moveTo(43, 26);
					}
				}
			}
		}
	},
};

module.exports = roleHarvester;
