var roleLDHarvester = {
	/** @param {Creep} creep **/
	run: function (creep) {
		let enemies = creep.room.find(FIND_HOSTILE_CREEPS);
		/*
		console.log(creep.memory.home)
		console.log(creep.memory.target)
		console.log(creep.memory.sourceIndex)
        */
		if (enemies.length > 999999999999999999999999999999999) {
			// TODO: PANICCC
		} else {
			if (creep.store.getFreeCapacity() > 0) {
				if (creep.room.name == creep.memory.target) {
					var sourcee = creep.room.find(FIND_SOURCES)[creep.memory.sourceIndex];
					if (creep.harvest(sourcee) == ERR_NOT_IN_RANGE) {
						creep.moveTo(sourcee, {
							visualizePathStyle: { stroke: "#ffaa00" },
						});
					}
				} else {
					var exit = creep.room.findExitTo(creep.memory.target);
					creep.moveTo(creep.pos.findClosestByRange(exit));
				}
			} else {
				// If at home try to deposit
				if (creep.room.name == creep.memory.home) {
					var priorityTargets = creep.room.find(FIND_STRUCTURES, {
						filter: (structure) => {
							return (
								(structure.structureType == STRUCTURE_EXTENSION 
								||	structure.structureType == STRUCTURE_CONTAINER) &&
                                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
							);
						},
					});
					if (priorityTargets.length > 0) {
					    var closest = creep.pos.findClosestByRange(priorityTargets);
						if (
							creep.transfer(closest, RESOURCE_ENERGY) ==
							ERR_NOT_IN_RANGE
						) {
							creep.moveTo(closest, {
								visualizePathStyle: { stroke: "#ffffff" },
							});
						}
					} else {
						var secondaryTargets = creep.room.find(FIND_STRUCTURES, {
							filter: (structure) => {
								return (
									(structure.structureType == STRUCTURE_SPAWN ||
										structure.structureType == STRUCTURE_TOWER) &&
									structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
								);
							},
						});
						console.log("hello")
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
                            // FOr example upgrading ? Maybe not,,, LDHs are not fast enought upgrading
							creep.say("😪");
							creep.moveTo(22, 33);
						}
					}
				} else {
					// If not at home try to get there
					var exit = creep.room.findExitTo(creep.memory.home);
					creep.moveTo(creep.pos.findClosestByRange(exit));
				}
			}
		}
	},
};

module.exports = roleLDHarvester;
