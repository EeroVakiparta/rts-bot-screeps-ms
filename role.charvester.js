var roleCHarvester = {
	/** @param {Creep} creep **/
	run: function (creep) {
		// TODO: Make so that the C harvesters do repairs
		if (creep.store.getFreeCapacity() > 2) {
			if (creep.room.name == creep.memory.home) {
				var sourcee = creep.room.find(FIND_SOURCES)[creep.memory.sourceIndex];
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
			var priorityTargets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (
						structure.structureType == STRUCTURE_LINK &&
						structure.energyCapacity > structure.energy + 48 &&
						creep.pos.inRangeTo(structure, 2)
					);
				},
			});

			if (
				typeof priorityTargets[0] == "undefined"
			) {
				//creep.say("no link?")
				priorityTargets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (
							(structure.structureType == STRUCTURE_CONTAINER &&
								structure.store.getFreeCapacity(RESOURCE_ENERGY) > 48) ||
							(structure.structureType == STRUCTURE_TOWER &&
								structure.store.getFreeCapacity(RESOURCE_ENERGY) > 48) ||
							(structure.structureType == STRUCTURE_STORAGE &&
								structure.store.getFreeCapacity(RESOURCE_ENERGY) > 48)
						);
					},
				});
			}

			if (priorityTargets != undefined) {
				let priorityTargetsClose = creep.pos.findInRange(priorityTargets, 3);

				var closestContainer = creep.pos.findClosestByRange(
					priorityTargetsClose
				);
				if (
					creep.transfer(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
				) {
					creep.moveTo(closestContainer, {
						visualizePathStyle: { stroke: "#ffaa00" },
					});
				}
			}
		}
	},
};

module.exports = roleCHarvester;
