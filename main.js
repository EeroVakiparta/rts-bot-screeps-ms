var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleCUpgrader = require('role.cupgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleArmy = require('role.army');
var roleHealer = require('role.healer');
var roleLDHarvester = require('role.ldharvester');
var roleHauler = require('role.hauler');
var roleCHarvester = require('role.charvester')
var roleClaim = require('role.claim')
var roleVampire = require('role.vampire')
var roleTank = require('role.tank')
var roleMiner = require('role.miner')

var underAttack = false; // could be passed to creeps in memory?
var underAttack2 = false;
var underAttack3 = false;

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
    
    
            /////////// SPAWN 3333333333333333333333333
        var cHarvSpawn3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'charvester' && creep.memory.sourceIndex == 0 && creep.memory.home == 'E21S52');
            if(cHarvSpawn3.length < 1) {
                var newName = 'CHarvester' + Game.time; // WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE
                Game.spawns['Spawn3'].spawnCreep([WORK,CARRY,MOVE], newName,
                    {memory: {role: 'charvester',
                        home: 'E21S52',
                        sourceIndex: 0
                    }});
        }
        
        var cHarvSpawn31 = _.filter(Game.creeps, (creep) => creep.memory.role == 'charvester' && creep.memory.sourceIndex == 1 && creep.memory.home == 'E21S52');
            if(cHarvSpawn31.length < 1) {
                var newName = 'CHarvester' + Game.time;
                Game.spawns['Spawn3'].spawnCreep([WORK,CARRY,MOVE], newName,
                    {memory: {role: 'charvester',
                        home: 'E21S52',
                        sourceIndex: 1
                    }});
        }
        
        var buildersSpawn3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.source == 'container' && creep.memory.sourceIndex == 0 && creep.memory.targetFlag == 'Spawni3' );
        if(buildersSpawn3.length < 1 && cHarvSpawn3.length > 0 && cHarvSpawn31.length > 0) {
            var newName = 'Builder' + Game.time;
            //console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn3'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, // WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE
                {memory: {role: 'builder', source: 'container', sourceIndex: 0, targetFlag: 'Spawni3'}}); // container, source
        }
        
        
                var haulersspawn3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.memory.home == 'E21S52');

        if(haulersspawn3.length < 1 && cHarvSpawn3.length > 0 && cHarvSpawn31.length > 0) {
            var newName = 'Hauler' + Game.time; // CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
            //console.log('Spawning new upgrader: ' + newName); 
            Game.spawns['Spawn3'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'hauler', haulTarget : false, home: 'E21S52'}});
        }
        
        var spawn3cupgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'cupgrader' && creep.memory.home == 'E21S52');
        if(spawn3cupgraders.length < 1 && cHarvSpawn3.length > 0 && cHarvSpawn31.length > 0) {
            var newName = 'CUpgrader' + Game.time; // WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
            Game.spawns['Spawn3'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'cupgrader', home: 'E21S52'}});
        }
        
        var repairers3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.memory.home == 'E21S52');
        //console.log('Repairer: ' + repairers.length);

        if(repairers3.length < 1 && cHarvSpawn3.length > 0 && cHarvSpawn31.length > 0) {
            var newName = 'Repairer' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn3'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'repairer', home: 'E21S52'}});
        }
    
            // Harvester spawner  --- FOR SPAWN2
        var harvestersSpawn3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.home == 'E21S52');
        //console.log('Harvesters: ' + harvesters.length);
        if(harvestersSpawn3.length < 1 && cHarvSpawn3.length > 0 && cHarvSpawn31.length > 0) {
            var newName = 'Harvester' + Game.time;
            //console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn3'].spawnCreep([CARRY,MOVE], newName,
                {memory: {role: 'harvester', home: 'E21S52'}});
        }
    

    if(!underAttack){
        
        /////////// START OF SPAWN  222222222222222222222 ECO
        var cHarvSpawn2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'charvester' && creep.memory.sourceIndex == 0 && creep.memory.home == 'E23S52');
            if(cHarvSpawn2.length < 1) {
                var newName = 'CHarvester' + Game.time;
                Game.spawns['Spawn2'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'charvester',
                        home: 'E23S52',
                        sourceIndex: 0
                    }});
        }
        
        var cHarvSpawn21 = _.filter(Game.creeps, (creep) => creep.memory.role == 'charvester' && creep.memory.sourceIndex == 1 && creep.memory.home == 'E23S52');
            if(cHarvSpawn21.length < 1) {
                var newName = 'CHarvester' + Game.time;
                Game.spawns['Spawn2'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'charvester',
                        home: 'E23S52',
                        sourceIndex: 1
                    }});
        }
        
        var builders1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.source == 'container' && creep.memory.sourceIndex == 0 && creep.memory.targetFlag == 'flag1' );
        if(builders1.length < 0 && cHarvSpawn2.length > 0 && cHarvSpawn21.length > 0) {
            var newName = 'Builder' + Game.time;
            //console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn2'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, // WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE
                {memory: {role: 'builder', source: 'container', sourceIndex: 0, targetFlag: 'flag1'}}); // container, source
        }
        
        var spawn2cupgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'cupgrader' && creep.memory.home == 'E23S52');
        if(spawn2cupgraders.length < 2 && cHarvSpawn2.length > 0 && cHarvSpawn21.length > 0) {
            var newName = 'CUpgrader' + Game.time; // WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
            Game.spawns['Spawn2'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'cupgrader', home: 'E23S52'}});
        }
        
        // Harvester spawner  --- FOR SPAWN2
        var harvestersSpawn2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.home == 'E23S52');
        //console.log('Harvesters: ' + harvesters.length);
        if(harvestersSpawn2.length < 5 && cHarvSpawn2.length > 0 && cHarvSpawn21.length > 0) {
            var newName = 'Harvester' + Game.time;
            //console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn2'].spawnCreep([CARRY,MOVE], newName,
                {memory: {role: 'harvester', home: 'E23S52'}});
        }
        
        var haulersspawn2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.memory.home == 'E23S52');

        if(haulersspawn2.length < 1 && cHarvSpawn2.length > 0 && cHarvSpawn21.length > 0) {
            var newName = 'Hauler' + Game.time; // CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
            //console.log('Spawning new upgrader: ' + newName); 
            Game.spawns['Spawn2'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'hauler', haulTarget : false, home: 'E23S52'}});
        }
        
        var vampires2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'vampire' && creep.memory.home == 'E23S52');
        

        if(vampires2.length < 1 && cHarvSpawn2.length > 0 && cHarvSpawn21.length > 0) {
            var newName = 'Vampire' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn2'].spawnCreep([CARRY,MOVE], newName,
                {memory: {role: 'vampire',supplying: false, home: 'E23S52'}});
        }
        
                /// MINERAL 222 MINER -- MINES ALWAYS TO STORAGE
        var minerSpawn2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.memory.sourceIndex == 0 && creep.memory.home == 'E23S52');
        //console.log(cHarvesters1.length);
        if(minerSpawn2.length < 1 && cHarvSpawn2.length > 0 && cHarvSpawn21.length > 0) {
                
            var newName = 'MinerSpawn2' + Game.time;
            Game.spawns['Spawn2'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'miner',
                    home: 'E23S52',
                    sourceIndex: 0
                }});
        }
        
        var repairers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.memory.home == 'E23S52');
        //console.log('Repairer: ' + repairers.length);

        if(repairers2.length < 1 && cHarvSpawn2.length > 0 && cHarvSpawn21.length > 0) {
            var newName = 'Repairer' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn2'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'repairer', home: 'E23S52'}});
        }
        
        
        
        
    /////////////////////////
        
        var cHarvesters0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'charvester' && creep.memory.sourceIndex == 0 && creep.memory.home == 'E24S53');
        // WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE
            if(cHarvesters0.length < 1) {
                var newName = 'CHarvester' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'charvester',
                        home: 'E24S53',
                        sourceIndex: 0
                    }});
        }
        
        var cHarvesters1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'charvester' && creep.memory.sourceIndex == 1 && creep.memory.home == 'E24S53');
        //console.log(cHarvesters1.length);
            if(cHarvesters1.length < 1) {
                
                var newName = 'CHarvester' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'charvester',
                        home: 'E24S53',
                        sourceIndex: 1
                    }});
        }
        
        // Harvester spawner --- FOR SPAWN 1 
                
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.home == 'E24S53');
        //console.log('Harvesters: ' + harvesters.length);
        if(harvesters.length < 4) {
            var newName = 'Harvester' + Game.time;
            //console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([CARRY,MOVE], newName,
                {memory: {role: 'harvester', home: 'E24S53'}});
        }
        

        
        if (cHarvesters0.length > 0 && cHarvesters1.length > 0){
            // LongDistance Harvester spawner
            var ldharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'ldharvester' && creep.memory.target == 'E23S52');
            if(ldharvesters.length < 1) {
                var newName = 'LDHarvester' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'ldharvester',
                        home: 'E23S52',
                        target: 'E23S52',
                        sourceIndex: 0
                    }});
            }
            
                    // LongDistance Harvester spawner
            var ldharvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'ldharvester' && creep.memory.target == 'E21S52');
            if(ldharvesters2.length < 0) {
                var newName = 'LDHarvester' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'ldharvester',
                        home: 'E21S52',
                        target: 'E21S52',
                        sourceIndex: 1
                    }});
            }
            
                    // LongDistance Harvester spawner
            var ldharvesters3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'ldharvester' && creep.memory.target == 'E23S53' );
            console.log(ldharvesters3.length)
            if(ldharvesters3.length < 1) {
                var newName = 'LDHarvester' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                    {memory: {role: 'ldharvester',
                        home: 'E24S53',
                        target: 'E23S53',
                        sourceIndex: 0
                    }});
            }
        }
        
        
        // Flag Builder spawner
        // --Make sure there is at least 1 builder at all times
        var buildersUnderFlag = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.source == 'container' && creep.memory.sourceIndex == 1 && creep.memory.targetFlag == 'flag1' );
        //console.log('Builders: ' + buildersUnderFlag.length);

        if(buildersUnderFlag.length < 0 && cHarvesters0.length > 0 && cHarvesters1.length > 0) {
            var newName = 'FlagBuilder' + Game.time;
            //console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, // WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE
                {memory: {role: 'builder', source: 'container', sourceIndex: 1, targetFlag: 'flag1'}}); // container, source
        }
        
        // Flag Builder spawner
        // --Make sure there is at least 1 builder at all times
        var buildersUnderFlag0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.source == 'sources' && creep.memory.sourceIndex == 0 && creep.memory.targetFlag == 'betweenRoom' );
        //console.log('Builders: ' + buildersUnderFlag0.length);

        if(buildersUnderFlag0.length < 0 && cHarvesters0.length > 0 && cHarvesters1.length > 0) {
            var newName = 'FlagBuilder' + Game.time;
            //console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, // WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE
                {memory: {role: 'builder', source: 'sources', sourceIndex: 0, targetFlag: 'betweenRoom'}}); // container, source
        }
        
                var buildersUnderFlag11 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.source == 'sources' && creep.memory.sourceIndex == 0 && creep.memory.targetFlag == 'northFromSpawn2' );
        //console.log('Builders: ' + buildersUnderFlag0.length);

        if(buildersUnderFlag11.length < 0 && cHarvesters0.length > 0 && cHarvesters1.length > 0) {
            var newName = 'FlagBuilder' + Game.time;
            //console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, // WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE
                {memory: {role: 'builder', source: 'sources', sourceIndex: 0, targetFlag: 'northFromSpawn2'}}); // container, source
        }
        
        // Builder spawner ------------------------ THIS IS THE SPAWN ! BUILDER
        // --Make sure there is at least 1 builder at all times
        var builders0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.source == 'sources' && creep.memory.sourceIndex == 0 && creep.memory.targetFlag == "homeBase");
        console.log('Builders0: ' + builders0.length);

        if(builders0.length < 1 && cHarvesters0.length > 0 && cHarvesters1.length > 0) {
            var newName = 'Builder' + Game.time;
            //console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, // WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE
                {memory: {role: 'builder', source: 'sources', sourceIndex: 0, targetFlag: 'homeBase'}}); // container, source
        }
        
                // Builder spawner
        // --Make sure there is at least 1 builder at all times

        
                // Builder spawner
        // --Make sure there is at least 1 builder at all times
        var buildersC = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.source == 'container' );
        //console.log('Builders: ' + builders.length);

        if(buildersC.length < 0 && cHarvesters0.length > 0 && cHarvesters1.length > 0) {
            var newName = 'CBuilder' + Game.time;
            //console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, // WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE
                {memory: {role: 'builder',source: 'container', sourceIndex: 1, targetFlag: 'homeBase'}}); // container, source
        }
        
        
        // Upgrader spawner
        // --Make sure there is at least 1 upgrader at all times
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        //console.log('Upgrader: ' + upgraders.length);

        if(upgraders.length < 0 && harvesters.length > 5) {
            var newName = 'Upgrader' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'upgrader'}});
        }
        
        // Flag Upgrader spawner
        // --Make sure there is at least 1 upgrader at all times
        var flagUpgraders0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.targetFlag == 'upgradeThis' && creep.memory.sourceIndex == 0);
        //console.log('Upgrader: ' + upgraders.length);

        if(flagUpgraders0.length < 1 && cHarvesters0.length > 0 && cHarvesters1.length > 0) {
            var newName = 'FlagUpgrader' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'upgrader', targetFlag: 'upgradeThis', sourceIndex: 0}});
        }
        
                // Flag Upgrader spawner
        // --Make sure there is at least 1 upgrader at all times
        var flagUpgraders1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.targetFlag == 'upgradeThis' && creep.memory.sourceIndex == 1);
        //console.log('flagUpgraders1: ' + flagUpgraders1.length);

        if(flagUpgraders1.length < 1 && cHarvesters0.length > 0 && cHarvesters1.length > 0) {
            var newName = 'FlagUpgrader' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'upgrader', targetFlag: 'upgradeThis', sourceIndex: 1}});
        }
        
        // Container pgrader spawner THESE ARE MAIN SPAWN1 UPGRADERS
        var cupgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'cupgrader' && creep.memory.home == 'E24S53');
    
        if(cupgraders.length < 3 && cHarvesters0.length > 0 && cHarvesters1.length > 0) {
            var newName = 'CUpgrader' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'cupgrader', home: 'E24S53'}});
        }
        
        // Repairer spawner
        // --Make sure there is at least 1 repairer at all times
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.memory.home == 'E24S53');
        //console.log('Repairer: ' + repairers.length);

        if(repairers.length < 1) {
            var newName = 'Repairer' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
                {memory: {role: 'repairer', home: 'E24S53'}});
        }
        
        var vampires = _.filter(Game.creeps, (creep) => creep.memory.role == 'vampire' && creep.memory.home == 'E24S53');
        

        if(vampires.length < 1) {
            var newName = 'Vampire' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([CARRY,MOVE], newName,
                {memory: {role: 'vampire',supplying: false, home: 'E24S53'}});
        }
        
        
        // Hauler spawner
        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.memory.home == 'E24S53');

        if(haulers.length < 3 && cHarvesters0.length > 0 && cHarvesters1.length > 0) {
            var newName = 'Hauler' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([CARRY,MOVE], newName,
                {memory: {role: 'hauler', haulTarget : false, home: 'E24S53'}});
        }
        
        /// MINERAL MINER -- MINES ALWAYS TO STORAGE
        var minerSpawn1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.memory.sourceIndex == 0 && creep.memory.home == 'E24S53');
        //console.log(cHarvesters1.length);
        if(minerSpawn1.length < 1 && cHarvesters0.length > 0 && cHarvesters1.length > 0) {
                
            var newName = 'MinerSpawn1' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'miner',
                    home: 'E24S53',
                    sourceIndex: 0
                }});
        }
        
    }

    // Army spawner
    // --Make defender when under attack
    var army = _.filter(Game.creeps, (creep) => creep.memory.role == 'army' &&  creep.memory.targetFlag != 'Attack1');
    var hostiles = Game.rooms['E24S53'].find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0){
        underAttack = true;
    }else {
        underAttack = false;
    }
    // It seems like equal battles are still lost before I make smarter army. So until then +1
    if(hostiles.length > army.length && underAttack) {
        var newName = 'Army' + Game.time; // TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK
        //console.log('Under attack ! Spawning new armycreep: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK], newName,
            {memory: {role: 'army', targetFlag: 'homeBase'}});
    }
    
        // Army spawner
    // --Make defender when under attack
    var army2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'army' &&  creep.memory.targetFlag == 'flag1');
    var hostiles2 = Game.rooms['E23S52'].find(FIND_HOSTILE_CREEPS);

    // It seems like equal battles are still lost before I make smarter army. So until then +1
    if(hostiles2.length  > army2.length) {
        var newName = 'Army' + Game.time;
        //console.log('Under attack ! Spawning new armycreep: ' + newName);
        Game.spawns['Spawn2'].spawnCreep([TOUGH,MOVE,MOVE,ATTACK], newName,
            {memory: {role: 'army', targetFlag: 'flag1'}});
    }

    var attack = false;
    if(attack){
        
        var armyAttack = _.filter(Game.creeps, (creep) => creep.memory.role == 'army' &&  creep.memory.targetFlag == 'Attack1');
        if(armyAttack.length < 1 && cHarvesters0.length > 0 && cHarvesters1.length > 0) {
            var newName = 'ArmyAttacker' + Game.time;
            
            Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK], newName,
                { memory: { role: 'army', targetFlag: 'Attack1'}});
        }
    }
    

    
    var attack2 = false;
    if(attack2){
         ////// !! ! ! ! TODO REPAIR HARVESTERI VERTAUKSET TÄSÄ
        var armyAttack = _.filter(Game.creeps, (creep) => creep.memory.role == 'army' &&  creep.memory.targetFlag == 'Attack2');
        if(armyAttack.length < 8 && cHarvesters0.length > 0 && cHarvesters1.length > 0) {
            var newName = 'ArmyAttacker' + Game.time;
            
            Game.spawns['Spawn2'].spawnCreep([TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK], newName,
                { memory: { role: 'army', targetFlag: 'Attack2'}});
        }
    }

   var tankAttack = false;
    if(tankAttack){
        
        var tankAttack = _.filter(Game.creeps, (creep) => creep.memory.role == 'tank' &&  creep.memory.targetFlag == 'TankAttack');
        if(tankAttack.length < 1 && cHarvesters0.length > 0 && cHarvesters1.length > 0) {
            var newName = 'TankAttacker' + Game.time;
            
            Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK], newName,
                { memory: { role: 'tank', targetFlag: 'TankAttack'}});
        }
    }


    // Healer spawner
    // --Make healer after fight
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');

    if(army.length > 9999999 && !underAttack && healers.length < 1) {
        var newName = 'Nurse' + Game.time;
        //console.log('Spawning new nurse: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([HEAL,MOVE], newName,
            {memory: {role: 'healer'}});
    }
    
    // TODO: put tower and also defend functions in same place
    if(underAttack) {
        var roomName = 'E24S53';
        var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${roomName}`);
            var towers = Game.rooms[roomName].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                
            towers.forEach(tower => tower.attack(hostiles[0]));
        }
    }else{
        var roomName = 'E24S53';
        var towers = Game.rooms[roomName].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
		const targets = towers[0].room.find(FIND_STRUCTURES, {
			filter: (object) => (object.hits < object.hitsMax && object.structureType != STRUCTURE_RAMPART && object.structureType != STRUCTURE_WALL),
		});

		targets.sort((a, b) => a.hits - b.hits);


		if (targets.length > 0 && towers[0].store[RESOURCE_ENERGY] > 500 && towers[1].store[RESOURCE_ENERGY] > 500) {

				//const closestLowHP = towers[0].pos.findClosestByRange(targets);
			//	towers.forEach(tower => tower.repair(closestLowHP));
					towers.forEach(tower => tower.repair(targets[0]));
			
		}
    }
    
    
    var hostiles2 = Game.rooms['E23S52'].find(FIND_HOSTILE_CREEPS);
    if(hostiles2.length > 0){
        underAttack2 = true;
    }else {
        underAttack2 = false;
    }
    
        if(underAttack2) {
        var roomName = 'E23S52';
        var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${roomName}`);
            var towers = Game.rooms[roomName].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                
            towers.forEach(tower => tower.attack(hostiles[0]));
        }
    }else{
        var roomName = 'E23S52';
        var towers = Game.rooms[roomName].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
		const targets = towers[0].room.find(FIND_STRUCTURES, {
			filter: (object) => (object.hits < object.hitsMax && object.structureType != STRUCTURE_RAMPART && object.structureType != STRUCTURE_WALL),
		});

		targets.sort((a, b) => a.hits - b.hits);


		if (targets.length > 0 && towers[0].store[RESOURCE_ENERGY] > 900 && towers[1].store[RESOURCE_ENERGY] > 900) {

				//const closestLowHP = towers[0].pos.findClosestByRange(targets);
			//	towers.forEach(tower => tower.repair(closestLowHP));
					towers.forEach(tower => tower.repair(targets[0]));
			
		}
    }
    
        var hostiles3 = Game.rooms['E21S52'].find(FIND_HOSTILE_CREEPS);
    if(hostiles3.length > 0){
        underAttack3 = true;
    }else {
        underAttack3 = false;
    }
    
        if(underAttack3) {
        var roomName = 'E21S52';
        var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${roomName}`);
            var towers = Game.rooms[roomName].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                
            towers.forEach(tower => tower.attack(hostiles[0]));
        }
    }else{
        var roomName = 'E23S52';
        var towers = Game.rooms[roomName].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
		const targets = towers[0].room.find(FIND_STRUCTURES, {
			filter: (object) => (object.hits < object.hitsMax && object.structureType != STRUCTURE_RAMPART && object.structureType != STRUCTURE_WALL),
		});

		targets.sort((a, b) => a.hits - b.hits);


		if (targets.length > 0 && towers[0].store[RESOURCE_ENERGY] > 900) {

				//const closestLowHP = towers[0].pos.findClosestByRange(targets);
			//	towers.forEach(tower => tower.repair(closestLowHP));
					towers.forEach(tower => tower.repair(targets[0]));
			
		}
    }


   // Claim spawner
    var claim = _.filter(Game.creeps, (creep) => creep.memory.role == 'claim');
    //console.log(claim.length);
// Game.spawns['Spawn1'].spawnCreep( [CLAIM, MOVE], 'Claimer1', { memory: { role: 'claim', targetFlag: 'flag1'}} );
    if(claim.length < 0 && Game.gcl.level > 3) {
        var newName = 'Claim' + Game.time;
        
        Game.spawns['Spawn2'].spawnCreep([CLAIM,MOVE], newName,
            { memory: { role: 'claim', targetFlag: 'claim'}});
    }
    
   //ota linkint
   var energylinks = Game.rooms['E24S53'].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
    
    //kato kummassa enemmän
    if(energylinks){
        if(energylinks[0].energy > 149 && energylinks[1].energy < 500){
            energylinks[0].transferEnergy(energylinks[1])
        }
       if(energylinks[2].energy > 149 && energylinks[1].energy < 500){
            energylinks[2].transferEnergy(energylinks[1])
        }
    }
    
   var energylinks = Game.rooms['E23S52'].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
    
    //kato kummassa enemmän
    if(energylinks){
        if(energylinks[0].energy > 199 && energylinks[1].energy < 600){
            energylinks[0].transferEnergy(energylinks[1])
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
        if(creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
        if(creep.memory.role == 'cupgrader') {
            roleCUpgrader.run(creep);
        }
        if(creep.memory.role == 'charvester') {
            roleCHarvester.run(creep);
        }
        if(creep.memory.role == 'claim') {
            roleClaim.run(creep);
        }
        if(creep.memory.role == 'vampire') {
            roleVampire.run(creep);
        }
        if(creep.memory.role == 'tank') {
            roleTank.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
    }
}