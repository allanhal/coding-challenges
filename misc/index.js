let space = [];

function isAllowed(ip, timeWindow, maxRequests) {
  const now = Date.now();
  const newSpace = space.filter(
    (obj) => obj.time > now - timeWindow && ip === obj.ip
  );
  if (newSpace.length >= maxRequests) {
    return false;
  }
  space.push({ ip, time: now });
  return true;
}

// Design and implement an in-memory rate limiter that allows N requests per IP per time window.
// Function prototype:
// function isAllowed(IP, timeWindow, maxRequests);
// Return value:
// - true if it should allow the request to pass
// - false otherwise
const ip1 = "1.1.1.1";
const ip2 = "2.2.2.2";
const window = 1000;
const max = 2;

console.log("Test 1 (Allow):", isAllowed(ip1, window, max));
console.log("Test 2 (Allow):", isAllowed(ip1, window, max));
console.log("Test 3 (Deny):", isAllowed(ip1, window, max));
console.log("Test 4 (Deny):", isAllowed(ip1, window, max));
console.log("Test 5 (Allow different IP):", isAllowed(ip2, window, max));

setTimeout(() => {
  console.log("Test 6 (Allow):", isAllowed(ip1, window, max));
}, 1000);
