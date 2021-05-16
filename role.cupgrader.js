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
			if (creep.memory.home == "XXXXXX") {
				var idContainer = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (
							(structure.structureType == STRUCTURE_CONTAINER &&
							structure.id == "60a0e5431d1f9bc16e096a8d" &&
							structure.store.getFreeCapacity(RESOURCE_ENERGY) < 1950)
						); // UGLY way to fixt the chockepoint problem
					},
				});

				//console.log(idContainer)
				if (
					creep.withdraw(idContainer[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
				) {
					creep.moveTo(idContainer[0]);
				}
			} else {
				var containers = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (
							(structure.structureType == STRUCTURE_CONTAINER &&
								structure.store.getFreeCapacity(RESOURCE_ENERGY) < 1950 &&
								creep.pos.inRangeTo(structure, 8)) ||
							(structure.structureType == STRUCTURE_LINK &&
								structure.energy > 49 &&
								creep.pos.inRangeTo(structure, 3)) ||
							(structure.structureType == STRUCTURE_CONTAINER &&
							structure.id == "60a0e5431d1f9bc16e096a8d" && // OMG.... Eero vhat are you doing.. sthap...
							structure.store.getFreeCapacity(RESOURCE_ENERGY) < 1950 && creep.memory.home == "E23S52") ||
							(structure.structureType == STRUCTURE_CONTAINER &&
							structure.id == "609ecc432bb7f539efd1095a" &&
							structure.store.getFreeCapacity(RESOURCE_ENERGY) < 1950 && creep.memory.home == "E21S53")
						);
					},
				});
				var closest = creep.pos.findClosestByRange(containers);
				if (creep.withdraw(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(closest, {
						visualizePathStyle: { stroke: "#ffaa00" },
					});
				}
				//creep.withdraw(closest, RESOURCE_ENERGY);
			}
		}
	},
};

module.exports = roleCUpgrader;
