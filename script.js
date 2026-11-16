function sanitizeLog(entry, disallowedCharacters) {
  return [...entry].map(char => disallowedCharacters.includes(char) ? "#" : char).join('');
}

function cleanLogs(logs, disallowedCharacters) {
  let sanitizedLogCount = 0;
  let infoLogCount = 0;
  for (let i=0;i<logs.length;i++) {
    if (logs[i].includes("$")) return `Sanitizing stopped. Failure Reason: Fatal character occurred.`;

    if (logs[i].startsWith("/")) {
      infoLogCount++;
      continue;
    }

    sanitizeLog(logs[i], disallowedCharacters);
    sanitizedLogCount++;
  }

  return `Total Entry Count: ${logs.length}. Sanitized Entry Count: ${sanitizedLogCount}. Informational Entry Count: ${infoLogCount}. Finished sanitizing logs.`;

}

let logs_1 = [
  "INFO: Server started on port 3000",
  "DEBUG: user=admin token=abc123 connected",
  "WARN: High memory usage detected at 87%"
];

let logs_2 = [
  "FATAL: System overload detected, shutting down",
  "DEBUG: token=def456$ refreshed for session",
  "ERROR: Null pointer exception in module auth"
];

let logs_3 = [
  "ERROR: Failed to connect to db, retry=3",
  "DEBUG: api_key=XYZ789 used in request",
  "/INFO: Cache cleared successfully",
  "WARN: Disk usage at 92%, threshold=90%",
  "/INFO: Disk usage stabilized"
];

console.log(sanitizeLog("DEBUG: Server started on port 3000",["a","S","r","t"]));
console.log(sanitizeLog("WARN: Disk usage at 92%, threshold=90%",["a","A","d","e"]));
console.log(sanitizeLog("TESTING: No Disallowed Characters",["A","b","z","Y"]));
console.log(cleanLogs(logs_1, ["a","A","c","T"]));
console.log(cleanLogs(logs_2,["a","A","c","T"]));
console.log(cleanLogs(logs_3,["a","A","c","T"]));
