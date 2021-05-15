let roleArmy = {
	/** @param {Creep} creep **/
	run: function (creep) {
	    
        let flag = Game.flags[creep.memory.targetFlag];
        let meleeAttackBodies = _.filter(
        				creep.body,
        				(body) => body.type == ATTACK
			);
			
        if(flag){
            if(creep.room == flag.room){
                

                //console.log("army guy in flag room")
        		// Two ideas :
        		// 1. To have army creep which has a attack slot at last spot, so it could fight untill last breath.
        		// 2. Having a move in last spot so it could retreat to safety to be healed?
        		//  -- at the moment trying the "MOVE in last spot" here
        		let enemies = creep.room.find(FIND_HOSTILE_CREEPS);
        		let enemyStructures = creep.room.find(FIND_HOSTILE_STRUCTURES);
        		if (enemies.length > 0 || enemyStructures.length > 0) {
        		    //console.log(enemies.length)
        			// TODO: refactor following
        			// TODO: make an enemy creeps observations
 
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
    				let closestNonSpawn = creep.room.find(FIND_STRUCTURES, {
        					filter: (structure) => {
        						return structure.structureType == STRUCTURE_INVADER_CORE;
        					},
        				});
        			let closestNonSpawnClosest = creep.pos.findClosestByRange(closestNonSpawn);
        
        			if (creep.attack(closestNonSpawnClosest) == ERR_NOT_IN_RANGE || !functionalRangedAttackBody) {
        				creep.moveTo(closestNonSpawnClosest);
        				//console.log(creep.attack(closestNonSpawnClosest))
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
    		    }else{
    		        //console.log("nobody to attack")
    		        creep.moveTo(flag, {visualizePathStyle: {stroke: '#cc00cc'}});
    		    }
		        }else if(creep.memory.iAmBoosted == false){
    		        creep.moveTo(31,16); //TODO: MAKE THIS BETTER DEAR GOD
  
    		        if(meleeAttackBodies[0].boost){
    		            creep.memory.iAmBoosted = true;
    		            console.log("I HAVE THE POWER")
    		        }
    		    }else{
		        //console.log("moving to flag room" + flag)
		        creep.moveTo(flag, {visualizePathStyle: {stroke: '#cc00cc'}});
		    }
		}
	},
};

module.exports = roleArmy;
