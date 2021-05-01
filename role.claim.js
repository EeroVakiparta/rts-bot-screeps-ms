var roleClaim = {
	/*
	Game.spawns['Spawn1'].spawnCreep( [CLAIM, MOVE], 'Claimer1', { memory: { role: 'claim', targetFlag: 'flag1'}} );
	*/
		/** @param {Creep} creep **/
		run: function (creep) {
			let flag = Game.flags[creep.memory.targetFlag];
			let ctrl = creep.room.controller;
			if(flag){
				if(creep.room == flag.room){
					let claimResult = creep.claimController(ctrl);
					//let claimResult = creep.reserveController(ctrl);
					if(claimResult == ERR_NOT_IN_RANGE){
						creep.moveTo(ctrl, {visualizePathStyle: {stroke: '#cc00cc'}});
						creep.say("🛄")
					}
				}
				else{
					creep.moveTo(flag, {visualizePathStyle: {stroke: '#cc00cc'}});
				}
			}
		},
	};
	
	module.exports = roleClaim;
	