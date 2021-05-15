var roleAlchemist = {
	/** @param {Creep} creep **/
	run: function (creep) {
		let labByIdToSupply;

		var labsInNeedOfEnergy = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				return (
					structure.structureType == STRUCTURE_LAB &&
					structure.store[RESOURCE_ENERGY] < 1750
				);
			},
		});
		var labsInNeedOfUtrium = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				return (
					structure.structureType == STRUCTURE_LAB &&
					structure.store[RESOURCE_UTRIUM] < 2750 &&
					structure.id == "608ee4e22ba9ac7214cc32fc"
				);
			},
		});
		var labsInNeedOfHydrogen = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				return (
					structure.structureType == STRUCTURE_LAB &&
					structure.store[RESOURCE_HYDROGEN] < 2750 &&
					structure.id == "608fb6ade0fde32927855f37"
				);
			},
		});
		switch (true) {
			case labsInNeedOfEnergy.length > 0:
				creep.memory.resourceTypeSupplied = RESOURCE_ENERGY;
				labsInNeedOfEnergy.sort(
					(a, b) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY]
				);
				labByIdToSupply = labsInNeedOfEnergy[0];
				break;
			case labsInNeedOfUtrium.length > 0:
				creep.memory.resourceTypeSupplied = RESOURCE_UTRIUM;
				labByIdToSupply = labsInNeedOfUtrium[0];
				break;
			case labsInNeedOfHydrogen.length > 0:
				creep.memory.resourceTypeSupplied = RESOURCE_HYDROGEN;
				labByIdToSupply = labsInNeedOfHydrogen[0];
				break;
			default:
				labByIdToSupply = 0;
				console.log("Alchemist chilling.");
		}
		
        creep.say(creep.memory.resourceTypeSupplied);
		if (
			creep.memory.supplying &&
			creep.store.getCapacity() == creep.store.getFreeCapacity()
		) {
			creep.memory.supplying = false;
		}
		if (!creep.memory.supplying && creep.store.getFreeCapacity() == 0) {
			creep.memory.supplying = true;
		}
        
		if (creep.memory.supplying) {
			if (
				creep.transfer(labByIdToSupply, creep.memory.resourceTypeSupplied) ==	ERR_NOT_IN_RANGE
			) {
				creep.moveTo(labByIdToSupply);
			}

		} else {
			var storageToWithdrawFrom = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_TERMINAL) &&
                    structure.store[creep.memory.resourceTypeSupplied] > 250; // TODO: do some fancy thing here when not in hurry
				},
			});
			if (storageToWithdrawFrom.length > 0) {
				if (
					creep.withdraw(storageToWithdrawFrom[0], creep.memory.resourceTypeSupplied) ==
					ERR_NOT_IN_RANGE
				) {
					creep.moveTo(storageToWithdrawFrom[0]);
				}
			} else {
				if (creep.memory.home == "E23S52") {
					creep.say("😪");
					creep.moveTo(39, 46);
				} else if (creep.memory.home == "E21S52") {
					creep.say("😪");
					creep.moveTo(15, 41);
				} else if (creep.memory.home == "E21S53") {
					creep.say("😪");
					creep.moveTo(34, 22);
				} else {
					creep.say("😪");
					creep.moveTo(31, 19);
				}
			}
		}
	},
};

module.exports = roleAlchemist;
