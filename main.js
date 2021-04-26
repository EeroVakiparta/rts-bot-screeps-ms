var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleCUpgrader = require('role.cupgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var rolePioneer = require('role.pioneer');
var roleArmy = require('role.army');
var roleHealer = require('role.healer');
var roleHauler = require('role.hauler');
var roleLDHarvester = require('role.ldharvester');

var underAttack = false; // could be passed to creeps in memory?

module.exports.loop = function () {
    
    if(Game.cpu.bucket == 10000){
        Game.cpu.generatePixel()
        console.log('Bought a pixel! At: ' + Game.time)
    }
    
    // Soul reaper
    // -- For making sure there is not memory overload caused by souls of the dead creeps
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Clearing non-existing creep memory:', name);
        }
    }
    

    if(!underAttack){
        // Harvester spawner
        // --Make sure there is at least 2 harvesters at all times
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        //console.log('Harvesters: ' + harvesters.length);
        if(harvesters.length < 6) {
            var newName = 'Harvester' + Game.time;
            //console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'harvester'}});
        }
        if (harvesters.length > 5){
            // LongDistance Harvester spawner
            var ldharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'ldharvester' && creep.memory.target == 'E23S53');
            if(ldharvesters.length < 4) {
                var newName = 'LDHarvester' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'ldharvester',
                        home: 'E24S53',
                        target: 'E23S53',
                        sourceIndex: 0
                    }});
            }
            
                    // LongDistance Harvester spawner
            var ldharvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'ldharvester' && creep.memory.target == 'E23S52');
            if(ldharvesters2.length < 2) {
                var newName = 'LDHarvester' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'ldharvester',
                        home: 'E24S53',
                        target: 'E23S52',
                        sourceIndex: 1
                    }});
            }
            
                    // LongDistance Harvester spawner
            var ldharvesters3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'ldharvester' && creep.memory.target == 'E22S53' );
            //console.log(ldharvesters3.length)
            if(ldharvesters3.length < 1) {
                var newName = 'LDHarvester' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'ldharvester',
                        home: 'E24S53',
                        target: 'E22S53',
                        sourceIndex: 0
                    }});
            }
        }
        
        // Builder spawner
        // --Make sure there is at least 1 builder at all times
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        //console.log('Builders: ' + builders.length);

        if(builders.length < 1) {
            var newName = 'Builder' + Game.time;
            //console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'builder'}});
        }
        
        // Upgrader spawner
        // --Make sure there is at least 1 upgrader at all times
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        //console.log('Upgrader: ' + upgraders.length);

        if(upgraders.length < 9 && harvesters.length > 5) {
            var newName = 'Upgrader' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'upgrader'}});
        }

        // Container pgrader spawner
        var cupgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'cupgrader');

        if(cupgraders.length < 1) {
            var newName = 'CUpgrader' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'cupgrader'}});
        }
        
        // Repairer spawner
        // --Make sure there is at least 1 repairer at all times
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        //console.log('Repairer: ' + repairers.length);

        if(repairers.length < 0) {
            var newName = 'Repairer' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'repairer'}});
        }
        
        // Hauler spawner
        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');

        if(haulers.length < 1) {
            var newName = 'Hauler' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'hauler'}});
        }
    }

    // Army spawner
    // --Make defender when under attack
    var army = _.filter(Game.creeps, (creep) => creep.memory.role == 'army');
    var hostiles = Game.rooms['E24S53'].find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0){
        underAttack = true;
    }else {
        underAttack = false;
    }
    // It seems like equal battles are still lost before I make smarter army. So until then +1
    if(hostiles.length + 1 > army.length && underAttack) {
        var newName = 'Army' + Game.time;
        console.log('Under attack ! Spawning new armycreep: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,RANGED_ATTACK], newName,
            {memory: {role: 'army'}});
    }

    // Healer spawner
    // --Make healer after fight
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');

    if(army.length > 0 && !underAttack && healers.length < 1) {
        var newName = 'Nurse' + Game.time;
        console.log('Spawning new nurse: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([HEAL,MOVE], newName,
            {memory: {role: 'healer'}});
    }
    

    if(Game.spawns.Spawn1.memory.claimRoom != undefined){
                // Pioneer spawner
        // --Make sure there is at least 1 repairer at all times
        var pioneers = _.filter(Game.creeps, (creep) => creep.memory.role == 'pioneer');
        //console.log('Pioneer: ' + pioneers.length);
        var target = Game.spawns.Spawn1.memory.claimRoom;
        if(Game.gcl.level > 1) {
            var newName = 'Pioneer' + Game.time;
            //console.log('Spawning new pioneer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([CLAIM,MOVE,MOVE], newName,
                {memory: {role: 'pioneer',target: target}});
        }
        if(!(name < 0)){
            delete Game.spawns.Spawn1.memory.claimRoom;
        }

    }

    for(var name in Game.creeps) {
        if(Game.creeps)
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'ldharvester') {
            roleLDHarvester.run(creep);
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
        if(creep.memory.role == 'pioneer') {
            rolePioneer.run(creep);
        }
        if(creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
        if(creep.memory.role == 'cupgrader') {
            roleCUpgrader.run(creep);
        }
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
    }
}