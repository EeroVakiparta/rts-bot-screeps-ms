var roleRepairer = {
	//TODO: repair target priorities
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
				}
			} else {
				const drops = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
				const tombs = creep.pos.findClosestByRange(FIND_TOMBSTONES);
				if (drops) {
					if (creep.pickup(drops) == ERR_NOT_IN_RANGE) {
						creep.moveTo(drops);
						creep.say("nom nom");
					}
				} else if (tombs) {
					if (creep.pickup(tombs) == ERR_NOT_IN_RANGE) {
						creep.moveTo(tombs);
						creep.say("nam nam");
					}
				} else {
					var sources = creep.room.find(FIND_SOURCES);
					if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(sources[0], {
							visualizePathStyle: { stroke: "#ffaa00" },
						});
					}
				}
			}
		}
	},
};

module.exports = roleRepairer;
