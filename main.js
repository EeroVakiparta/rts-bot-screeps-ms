var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleArmy = require('role.army');
var underAttack = false; // could be passed to creeps in memory?

module.exports.loop = function () {

    // Soul reaper
    // -- For making sure there is not memory overload caused by souls of the dead creeps
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    // Harvester spawner
    // --Make sure there is at least 2 harvesters at all times
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    //console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2 && !underAttack) {
        var newName = 'Harvester' + Game.time;
        //console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'harvester'}});
    }
    
    // Builder spawner
    // --Make sure there is at least 1 builder at all times
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //console.log('Builders: ' + builders.length);

    if(builders.length < 0 && !underAttack) {
        var newName = 'Builder' + Game.time;
        //console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'builder'}});
    }
    
    // Upgrader spawner
    // --Make sure there is at least 1 upgrader at all times
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //console.log('Upgrader: ' + upgraders.length);

    if(upgraders.length < 0 && !underAttack) {
        var newName = 'Upgrader' + Game.time;
        //console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }
    
    // Repairer spawner
    // --Make sure there is at least 1 repairer at all times
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    //console.log('Repairer: ' + repairers.length);

    if(repairers.length < 0 && !underAttack) {
        var newName = 'Repairer' + Game.time;
        //console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'repairer'}});
    }

    // Army spawner
    // --Make defender when under attack
    var army = _.filter(Game.creeps, (creep) => creep.memory.role == 'army');
    var hostiles = Game.rooms['W1N5'].find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0){
        underAttack = true;
    }else {
        underAttack = false;
    }
    // It seems like equal battles are still lost before I make smarter army. So until then +1
    if(hostiles.length + 1 > army.length) {
        var newName = 'Army' + Game.time;
        console.log('Under attack ! Spawning new armycreep: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,RANGED_ATTACK], newName,
            {memory: {role: 'army'}});
    }
    
    for(var name in Game.creeps) {
        if(Game.creeps)
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'army') {
            roleArmy.run(creep);
        }
    }
}