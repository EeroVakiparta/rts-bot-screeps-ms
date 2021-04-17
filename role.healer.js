var roleHealer = {
	/** @param {Creep} creep **/
	run: function (creep) {
		// TODO: make healer avoid enemies, maybe choose ranged heal instead?
		const targets = creep.room.find(FIND_MY_CREEPS, {
			filter: (object) => object.hits < object.hitsMax,
		});

		if (targets.length > 0) {
			targets.sort((a, b) => a.hits - b.hits);

			if (creep.heal(targets[0]) == ERR_NOT_IN_RANGE) {
				const closestLowHP = creep.pos.findClosestByRange(targets);
				if (creep.heal(closestLowHP) == ERR_NOT_IN_RANGE) {
				    creep.moveTo(closestLowHP);
				    creep.say("Heal: " + closestLowHP.name)
			    }
				
			}
		}
	},
};

module.exports = roleHealer;
