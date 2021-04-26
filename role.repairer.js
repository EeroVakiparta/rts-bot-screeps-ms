var roleRepairer = {
	//TODO: repair target priorities
	//TODO: also make repairer eat energy form ground more.
	/** @param {Creep} creep **/
	run: function (creep) {
		let enemiesTooClose = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 5);
		if (enemiesTooClose > 0) {
			let safety = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return structure.structureType == STRUCTURE_TOWER;
				},
			});
			creep.moveTo(safety);
			creep.say("🏃️️");
		} else {
			if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
				creep.memory.repairing = false;
				creep.say("🔄");
			}
			//Trying to see what If I ceep some room for loot
			if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
				creep.memory.repairing = true;
				creep.say("🚧");
			}

			if (creep.memory.repairing) {
				const targets = creep.room.find(FIND_STRUCTURES, {
					filter: (object) => object.hits < object.hitsMax,
				});

				targets.sort((a, b) => a.hits - b.hits);

				if (targets.length > 0) {
					if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
						const closestLowHP = creep.pos.findClosestByRange(targets);
						if (creep.repair(closestLowHP) == ERR_NOT_IN_RANGE) {
							creep.moveTo(closestLowHP);
							creep.say("Repair: " + closestLowHP.name);
						}
					}
				} else {
					/*
                    const drops = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                    const tombs = creep.pos.findClosestByRange(FIND_TOMBSTONES);
                    if (drops) {
                        if (creep.pickup(drops) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(drops, {
							visualizePathStyle: { stroke: "#ffaa00" },
						});
                            creep.say("nom nom");
                        }
                    } else if (tombs) {
                        if (creep.pickup(tombs) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(tombs, {
							visualizePathStyle: { stroke: "#ffaa00" },
						});
                            creep.say("nam nam");
                        }
                    }      
                    */
				}
			} else {
				//const drops = false; 
				
				//const drops = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
				const tombs = false;//creep.pos.findClosestByRange(FIND_TOMBSTONES);
				var drops = creep.room.find(FIND_DROPPED_RESOURCES, {
					filter: (resource) => {
						return resource.amount > 49;
					},
					});
				var closest = creep.pos.findClosestByRange(drops);
				if (closest) {
					if (creep.pickup(closest) == ERR_NOT_IN_RANGE) {
						creep.moveTo(closest, {
							visualizePathStyle: { stroke: "#ffaa00" },
						});
						creep.say("🧛");
					}
				} else if (tombs) {
					if (creep.pickup(tombs) == ERR_NOT_IN_RANGE) {
						creep.moveTo(tombs, {
							visualizePathStyle: { stroke: "#ffaa00" },
						});
						creep.say("tombs");
					}
				} else {
					var containers = creep.room.find(FIND_STRUCTURES, {
						filter: (structure) => {
							return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 49;
						},
					});
					var closest = creep.pos.findClosestByRange(containers);
					if (creep.withdraw(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(closest, {
							visualizePathStyle: { stroke: "#ffaa00" },
						});
					}
					creep.withdraw(closest, RESOURCE_ENERGY);
					/*
					var sources = creep.room.find(FIND_SOURCES);
					if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(sources[0], {
							visualizePathStyle: { stroke: "#ffaa00" },
						});
						creep.say("gathering");
					}
					*/
				}
			}
		}
	},
};

module.exports = roleRepairer;
