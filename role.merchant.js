var roleMerchant = {
	/** @param {Creep} creep **/
	run: function (creep) {
	    
	    ///////// FIRST FIGURE OUT TERMINAL AND STORAGE ///////////
		let terminalById;
		let storageById;
        
		if (creep.memory.terminalId && creep.memory.storageId) {
			terminalById = Game.getObjectById(creep.memory.terminalId);
			storageById = Game.getObjectById(creep.memory.storageId);
		} else {
			var terminal = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return structure.structureType == STRUCTURE_TERMINAL;
				},
			});
			creep.memory.terminalId = terminal[0].id;

			let storage = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return structure.structureType == STRUCTURE_STORAGE;
				},
			});
			creep.memory.storageId = storage[0].id;
		}
		
        ///////// DECIDE IF WE ARE DELIVERING OR FETCHING RESOURCES ///////////
        
		if (creep.memory.supplying && creep.store.getCapacity() == creep.store.getFreeCapacity()) {
			creep.memory.supplying = false;
			creep.say("getting");
		}
		if (!creep.memory.supplying && creep.store.getFreeCapacity() == 0) {
			creep.memory.supplying = true;
			if (creep.ticksToLive < 10) {
				// TODO: adjust this to smalles small value
				creep.suicide();
				creep.say("I ded");
			}
			creep.say("$");
		}
		
		///////// ACTIONS  ///////////
		try{ 
    		if (creep.memory.supplying) {
    			// Find rooms terminal
    
    			if (
    				creep.transfer(terminalById, creep.memory.resourceTypeSupplied) == ERR_NOT_IN_RANGE	) {
    				creep.moveTo(terminalById);
    			}
    
    			if (
    				creep.transfer(terminalById, creep.memory.resourceTypeSupplied) == ERR_NOT_IN_RANGE	) {
    				creep.moveTo(terminalById);
    			}
    		} else {
    			let gatherMarketOrder = true;
    
    			// Decide what resource to take from storage to terminal
    			// TODO: there must be a better way, maybe when done with orders?
    			if (terminalById.store[RESOURCE_ENERGY] < 2000) {
    				creep.memory.resourceTypeSupplied = RESOURCE_ENERGY;
    			} else if (terminalById.store[RESOURCE_HYDROGEN] < 3000 && creep.memory.home == "E23S52") {
    				creep.memory.resourceTypeSupplied = RESOURCE_HYDROGEN;
    			} else if (terminalById.store[RESOURCE_UTRIUM] < 2000 && creep.memory.home == "E24S53") {
    				creep.memory.resourceTypeSupplied = RESOURCE_UTRIUM;
    			} else {
    				gatherMarketOrder = false;
    				creep.say("terminal looks fine");
    			}
    
    			if (gatherMarketOrder) {
                    if(creep.withdraw(storageById, creep.memory.resourceTypeSupplied) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storageById);
                    }
    
    			} else {
    				if (creep.memory.home == "E23S52") {
    					creep.say("😪");
    					creep.moveTo(39, 46);
    				} else if (creep.memory.home == "E21S52") {
    					creep.say("😪");
    					creep.moveTo(15, 41);
    				} else {
    					creep.say("😪");
    					creep.moveTo(31, 19);
    				}
    			}
    		}
		}catch(error){
		    console.log('Merchant error stack: '+error.stack);
		}
	},
};

module.exports = roleMerchant;
