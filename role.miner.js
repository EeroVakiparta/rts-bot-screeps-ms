var roleMiner = {
	/** @param {Creep} creep **/
	run: function (creep) {
		// TODO: Make so that the C harvesters do repairs
		if (creep.store.getFreeCapacity() > 2) {
			if (creep.room.name == creep.memory.home) {
				var sourcee = creep.room.find(FIND_MINERALS)[creep.memory.sourceIndex];
				if (creep.harvest(sourcee) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sourcee, {
						visualizePathStyle: { stroke: "#ffaa00" },
					});
				}
			} else {
				creep.say("need to get home");
				var exit = creep.room.findExitTo(creep.memory.target);
				creep.moveTo(creep.pos.findClosestByRange(exit));
			}
		} else {
			priorityTargets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (
						structure.structureType == STRUCTURE_STORAGE &&
						structure.store.getFreeCapacity(RESOURCE_ENERGY) > 48
					);
				},
			});

			if (creep.transfer(priorityTargets[0], RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE) {
				creep.moveTo(priorityTargets[0], {
					visualizePathStyle: { stroke: "#ffaa00" },
				});
			}
			if (creep.transfer(priorityTargets[0], RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
				creep.moveTo(priorityTargets[0], {
					visualizePathStyle: { stroke: "#ffaa00" },
				});
			}
			if (creep.transfer(priorityTargets[0], RESOURCE_ZYNTHIUM) == ERR_NOT_IN_RANGE) {
				creep.moveTo(priorityTargets[0], {
					visualizePathStyle: { stroke: "#ffaa00" },
				});
			}
		}
	},
};

module.exports = roleMiner;
