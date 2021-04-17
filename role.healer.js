var roleHealer = {
	/** @param {Creep} creep **/
	run: function (creep) {
	    // TODO: make healer avoid enemies, maybe choose ranged heal instead?
		const targets = creep.room.find(FIND_MY_CREEPS, {
			filter: (object) => object.hits < object.hitsMax,
		});

		targets.sort((a, b) => a.hits - b.hits);

		if (targets.length > 0) {
			if (creep.heal(targets[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(targets[0]);
			}
		}
	},
};

module.exports = roleHealer;
