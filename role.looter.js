var roleLooter = {
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
					var drops = creep.room.find(FIND_DROPPED_RESOURCES, {
						filter: (resource) => {
							return resource.amount > 1;
						},
					});

					var closest = creep.pos.findClosestByRange(drops);
					const tombs = creep.pos.findClosestByRange(FIND_TOMBSTONES);

					if (tombs) {
						if (creep.withdraw(tombs, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
							creep.moveTo(tombs, {
								visualizePathStyle: { stroke: "#ffaa00" },
							});
							creep.say("tombs");
						}
						if (creep.withdraw(tombs, RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE) {
							creep.moveTo(tombs, {
								visualizePathStyle: { stroke: "#ffaa00" },
							});
							creep.say("tombs");
						}
						if (creep.withdraw(tombs, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
							creep.moveTo(tombs, {
								visualizePathStyle: { stroke: "#ffaa00" },
							});
							creep.say("tombs");
						}
						if (creep.withdraw(tombs, RESOURCE_ZYNTHIUM) == ERR_NOT_IN_RANGE) {
							creep.moveTo(tombs, {
								visualizePathStyle: { stroke: "#ffaa00" },
							});
							creep.say("tombs");
						}
						if (creep.withdraw(tombs, RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) {
							creep.moveTo(tombs, {
								visualizePathStyle: { stroke: "#ffaa00" },
							});
							creep.say("tombs");
						}
						if (creep.withdraw(tombs, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE) {
							creep.moveTo(tombs, {
								visualizePathStyle: { stroke: "#ffaa00" },
							});
							creep.say("tombs");
						}
						if (creep.withdraw(tombs, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
							creep.moveTo(tombs, {
								visualizePathStyle: { stroke: "#ffaa00" },
							});
							creep.say("tombs");
						}
						if (creep.withdraw(tombs, RESOURCE_CATALYST) == ERR_NOT_IN_RANGE) {
							creep.moveTo(tombs, {
								visualizePathStyle: { stroke: "#ffaa00" },
							});
							creep.say("tombs");
						}
					}
					if (closest && !tombs) {
						if (creep.pickup(closest) == ERR_NOT_IN_RANGE) {
							creep.moveTo(closest, {
								visualizePathStyle: { stroke: "#ffaa00" },
							});
							creep.say("🧛");
						}
					}
				} else {
					var exit = creep.room.findExitTo(creep.memory.target);
					creep.moveTo(creep.pos.findClosestByRange(exit));
				}
			} else {
				// If at home try to deposit
				if (creep.room.name == creep.memory.home) {
					var storages = creep.room.find(FIND_STRUCTURES, {
						filter: (structure) => {
							return structure.structureType == STRUCTURE_STORAGE; // UGLY way to fixt the chockepoint problem
						},
					});

					if (
						creep.transfer(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
					) {
						creep.moveTo(storages[0]);
					}
					if (
						creep.transfer(storages[0], RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE
					) {
						creep.moveTo(storages[0]);
					}
					if (
						creep.transfer(storages[0], RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE
					) {
						creep.moveTo(storages[0]);
					}
					if (
						creep.transfer(storages[0], RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE
					) {
						creep.moveTo(storages[0]);
					}
					if (
						creep.transfer(storages[0], RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE
					) {
						creep.moveTo(storages[0]);
					}
					if (
						creep.transfer(storages[0], RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE
					) {
						creep.moveTo(storages[0]);
					}
					if (
						creep.transfer(storages[0], RESOURCE_ZYNTHIUM) == ERR_NOT_IN_RANGE
					) {
						creep.moveTo(storages[0]);
					}
					if (
						creep.transfer(storages[0], RESOURCE_CATALYST) == ERR_NOT_IN_RANGE
					) {
						creep.moveTo(storages[0]);
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

module.exports = roleLooter;
