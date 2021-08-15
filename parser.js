if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}

const fs = require("fs"),
  filename = process.argv[2];
fs.readFile(filename, "utf8", function (err, data) {
  if (err) throw err;
  console.log("OK: " + filename);

  let DOMParser = require("xmldom").DOMParser;
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(data, "data/xml");

  let pointArr = [];

  if (xmlDoc.getElementsByTagName("trkpt").length !== 0) {
    for (let i = 0; i < xmlDoc.getElementsByTagName("trkpt").length; i++) {
      let point = `{
      "lat": "${xmlDoc.getElementsByTagName("trkpt")[i].getAttribute("lat")}",
      "lon": "${xmlDoc.getElementsByTagName("trkpt")[i].getAttribute("lon")}"
    }`;
      pointArr.push(point);
    }
  } else if (xmlDoc.getElementsByTagName("wpt").length !== 0) {
    let point = `{
      "lat": "${xmlDoc.getElementsByTagName("wpt")[i].getAttribute("lat")}",
      "lon": "${xmlDoc.getElementsByTagName("wpt")[i].getAttribute("lon")}"
    }`;
    pointArr.push(point);
  } else {
    console.log("Exception occurred");
    process.exit(1);
  }

  const forTXTFile = filename.replace("gpx", "json");

  fs.writeFile(`./${forTXTFile}`, `[${pointArr.toString()}]`, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
});
