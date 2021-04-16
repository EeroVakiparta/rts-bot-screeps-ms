var rolePioneer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        // if in target room
        if (creep.room.name != creep.memory.target) {
            // find exit to target room
            var exit = creep.room.findExitTo(creep.memory.target);
            // move to exit
            creep.moveTo(creep.pos.findClosestByRange(exit));
            creep.say('Searching');
        }
        else {
            // try to claim controller
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // move towards the controller
                creep.moveTo(creep.room.controller);
            } else if (creep.claimController(creep.room.controller) === ERR_GCL_NOT_ENOUGH){
                creep.say('NO GCL->reserving');
                let controllerToReserve = creep.reserveController(creep.room.controller)
                if (controllerToReserve !== 0) {
                  console.log('Claimer reserving error: ' + controllerToReserve)
                  creep.moveTo(creep.room.controller);
                }
              }
        }
    }
};


module.exports = rolePioneer;