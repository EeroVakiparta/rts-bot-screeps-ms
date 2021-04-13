var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");

module.exports.loop = function () {
  // Soul reaper
  // -- For making sure there is not memory overload caused by souls of the dead creeps
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log("Clearing non-existing creep memory:", name);
    }
  }

  // Harvester spawner
  // --Make sure there is at least 2 harvesters at all times
  var harvesters = _.filter(
    Game.creeps,
    (creep) => creep.memory.role == "harvester"
  );
  console.log("Harvesters: " + harvesters.length);

  if (harvesters.length < 2) {
    var newName = "Harvester" + Game.time;
    console.log("Spawning new harvester: " + newName);
    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
      memory: { role: "harvester" },
    });
  }

  // Builder spawner
  // --Make sure there is at least 1 builder at all times
  var harvesters = _.filter(
    Game.creeps,
    (creep) => creep.memory.role == "builder"
  );
  console.log("Builders: " + harvesters.length);

  if (harvesters.length < 1) {
    var newName = "Builder" + Game.time;
    console.log("Spawning new builder: " + newName);
    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
      memory: { role: "builder" },
    });
  }

  // Upgrader spawner
  // --Make sure there is at least 1 upgrader at all times
  var harvesters = _.filter(
    Game.creeps,
    (creep) => creep.memory.role == "upgrader"
  );
  console.log("Upgrader: " + harvesters.length);

  if (harvesters.length < 1) {
    var newName = "Upgrader" + Game.time;
    console.log("Spawning new upgrader: " + newName);
    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
      memory: { role: "upgrader" },
    });
  }

  for (var name in Game.creeps) {
    if (Game.creeps) var creep = Game.creeps[name];
    if (creep.memory.role == "harvester") {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == "builder") {
      roleBuilder.run(creep);
    }
  }
};
