let roleArmy = {
	/** @param {Creep} creep **/
	run: function (creep) {
		// Two ideas :
		// 1. To have army creep which has a attack slot at last spot, so it could fight untill last breath.
		// 2. Having a move in last spot so it could retreat to safety to be healed?
		//  -- at the moment trying the "MOVE in last spot" here
		let enemies = creep.room.find(FIND_HOSTILE_CREEPS);
		if (enemies.length > 0) {
			// TODO: refactor following
			// TODO: make an enemy creeps observations
			let meleeAttackBodies = _.filter(
				creep.body,
				(body) => body.type == ATTACK
			);
			let rangedAttackBodies = _.filter(
				creep.body,
				(body) => body.type == RANGED_ATTACK
			);
			let moveBodies = _.filter(creep.body, (body) => body.type == MOVE);

			let functionalMeleeAttackBody = meleeAttackBodies.find((b) => b.hits > 0);
			let functionalRangedAttackBody = rangedAttackBodies.find(
				(b) => b.hits > 0
			);
			let functionalMoveBody = moveBodies.find((b) => b.hits > 0);

			/*
    if(functionalMeleeAttackBody){
        console.log("functionalMeleeAttackBody found: " + functionalMeleeAttackBody.hits + "hp");
    }
        if(functionalRangedAttackBody){
        console.log("functionalRangedAttackBody found: " + functionalRangedAttackBody.hits + "hp");
    }
        if(functionalMoveBody){
        console.log("functionalMoveBody found: " + functionalMoveBody.hits + "hp");
    }
    */

			let rangedTargets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
			let meleeTargets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 1);
			let colsestTarget = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

			if (creep.rangedAttack(colsestTarget) == ERR_NOT_IN_RANGE) {
				creep.moveTo(colsestTarget);
			} else if (meleeTargets.length > 0 && functionalMeleeAttackBody) {
				creep.attack(meleeTargets[0]);
				//creep.say("⚔️");
			} else if (rangedTargets.length > 0 && functionalRangedAttackBody) {
				// closest make most damage
				creep.rangedAttack(colsestTarget);
				//creep.say("🔫");
			} else if (
				!functionalMeleeAttackBody &&
				!functionalRangedAttackBody &&
				functionalMoveBody
			) {
				// Here could be a healer ?
				let safety = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return structure.structureType == STRUCTURE_TOWER;
					},
				});
				creep.moveTo(safety);
				creep.say("🏃️️");
			} else {
				creep.say("🏳️️");
			}
		}
	},
};

module.exports = roleArmy;
