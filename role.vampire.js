var roleVampire = {
	/** @param {Creep} creep **/
	run: function (creep) {
		var drops = creep.room.find(FIND_DROPPED_RESOURCES, {
			filter: (resource) => {
				return resource.amount > 1;
			},
		});

		var closest = creep.pos.findClosestByRange(drops);

		const tombs = creep.pos.findClosestByRange(FIND_RUINS);

		if (
			creep.memory.supplying &&
			creep.store.getCapacity() == creep.store.getFreeCapacity()
		) {
			creep.memory.supplying = false;
			creep.say("Feeding");
			console.log("Feeding");
		}
		console.log(!creep.memory.supplying && creep.store.getFreeCapacity() == 0);
		if (!creep.memory.supplying && creep.store.getFreeCapacity() == 0) {
			creep.memory.supplying = true;
			creep.say("Returning");
			console.log("Returning");
		}
		// TODO : make so that the hauler does not change target inbetween haul
		if (creep.memory.supplying) {
			console.log("etsii storagea");
			var storages = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return structure.structureType == STRUCTURE_CONTAINER; // UGLY way to fixt the chockepoint problem
				},
			});
			//console.log("storages[0]")

			if (creep.transfer(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(storages[0]);
			}
		} else {
			if (tombs) {
				if (creep.withdraw(tombs) == ERR_NOT_IN_RANGE) {
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
		}
	},
};

module.exports = roleVampire;
