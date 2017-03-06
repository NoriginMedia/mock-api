var jsonfile = require("jsonfile");
var moment = require("moment");

var currentDay = moment(moment().format("YYYY-MM-DD")).valueOf();
var afterThreeDays = moment(moment().add(3, "day").format("YYYY-MM-DD")).valueOf();

var programTypes = [
  "future",
  "live",
  "catchup"
];

var updateProgramTime = function(program, type) {
  if (!type) {
    type = programTypes[Math.floor(Math.random() * (programTypes.length))];
  }

  if (type === "future") {
    program.start = moment(currentDay).add(23, "hour").add(58, "minute").format();
    program.end = moment(currentDay).add(23, "hour").add(59, "minute").format();
  } else if (type === "live") {
    program.start = moment(currentDay).format();
    program.end = moment(currentDay).add(23, "hour").add(59, "minute").format();
  } else if (type === "catchup") {
    program.start = moment(currentDay).format();
    program.end = moment(currentDay).add(1, "minute").format();
    program.catchupExpiration = moment(afterThreeDays).format();
  }
};

// SLIDES
var slidesFile = "examples/demo/slides.json";

var slidesData = jsonfile.readFileSync(slidesFile);
var slides = slidesData.slides;

for (var i = 0; i < slides.length; i++) {
  var slide = slides[i];

  slides[i] = updateProgramTime(slide);
}

slidesData.slides = slides;
jsonfile.writeFileSync(slidesFile, slidesData, {spaces: 2});

// GENRES
var genresFile = "examples/demo/genres.json";

var genresData = jsonfile.readFileSync(genresFile);
var programs = genresData.programs;

programs[0] = updateProgramTime(programs[0], "future");
programs[1] = updateProgramTime(programs[1], "live");
programs[2] = updateProgramTime(programs[2], "catchup");

genresData.programs = programs;
jsonfile.writeFileSync(genresFile, genresData, {spaces: 2});

// PROGRAM FUTURE
var futureProgramFile = "examples/demo/program_future.json";
var futureProgramData = jsonfile.readFileSync(futureProgramFile);
futureProgramData = updateProgramTime(futureProgramData, "future");
jsonfile.writeFileSync(futureProgramFile, futureProgramData, {spaces: 2});

// PROGRAM LIVE
var liveProgramFile = "examples/demo/program_live.json";
var liveProgramData = jsonfile.readFileSync(liveProgramFile);
liveProgramData = updateProgramTime(liveProgramData, "live");
jsonfile.writeFileSync(liveProgramFile, liveProgramData, {spaces: 2});

// PROGRAM CATCHUP
var catchupProgramFile = "examples/demo/program_catchup.json";
var catchupProgramData = jsonfile.readFileSync(catchupProgramFile);
catchupProgramData = updateProgramTime(catchupProgramData, "catchup");
jsonfile.writeFileSync(catchupProgramFile, catchupProgramData, {spaces: 2});