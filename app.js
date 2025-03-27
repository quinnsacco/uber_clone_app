let map, driverMarker, passengerMarker;
let rides = [];
let driverLocationOn = true;
let driverLocationIntervalId = null;
let passengerLocationOn = true;
let passengerLocationIntervalId = null;

/* ---------- Home Screen Functions ---------- */
function selectLocation(loc) {
  document.getElementById("destination").value = loc;
}

function requestRide() {
  let destination = document.getElementById("destination").value;
  if (!destination) {
    alert("Please enter a destination.");
    return;
  }
  alert("Ride requested! The car is on its way (FREE).");
  // Hide home screen and show ride details (simulate ride in progress)
  document.getElementById("homeScreen").style.display = "none";
  document.getElementById("rideDetails").style.display = "block";
}

function scheduleRide() {
  alert("Scheduled Ride (FREE) - Feature coming soon!");
}

/* ---------- Passenger Location Toggle Functions ---------- */
function startPassengerSimulation() {
  if (passengerMarker) {
    map.removeLayer(passengerMarker);
  }
  // Create a passenger marker using a "🙂" emoji
  passengerMarker = L.marker([32.8423, -96.7847], {
    icon: L.divIcon({
      className: 'passenger-icon',
      html: "🙂",
      iconSize: [30, 30]
    })
  }).addTo(map);
  passengerLocationIntervalId = setInterval(function(){
    let lat = 32.8423 + (Math.random() - 0.5)/100;
    let lng = -96.7847 + (Math.random() - 0.5)/100;
    passengerMarker.setLatLng([lat, lng]);
  }, 5000);
  passengerLocationOn = true;
}

function stopPassengerSimulation() {
  if (passengerLocationIntervalId) {
    clearInterval(passengerLocationIntervalId);
    passengerLocationIntervalId = null;
  }
  if (passengerMarker) {
    map.removeLayer(passengerMarker);
    passengerMarker = null;
  }
  passengerLocationOn = false;
}

function togglePassengerLocation() {
  if (passengerLocationOn) {
    stopPassengerSimulation();
    alert("Passenger location sharing turned OFF.");
  } else {
    startPassengerSimulation();
    alert("Passenger location sharing turned ON.");
  }
}

/* ---------- Dummy Functions for Other Features ---------- */
function shareLocation() { alert("Sharing location..."); }
function emergency() { alert("Calling emergency services..."); }
function checkIn() { alert("Checking in with your ride..."); }
function messageDriver() { alert("Opening in-app chat with the driver..."); }
function callDriver() { alert("Dialing the driver..."); }
function shareTrip() { alert("Sharing trip details..."); }
function addStop() { alert("Adding an extra stop..."); }
function updateDropoff() { alert("Updating drop-off location..."); }
function viewHistory() { alert("Displaying ride history..."); }
function completeRide() {
  alert("Ride complete! Thanks for riding (FREE).");
  document.getElementById("rideDetails").style.display = "none";
  document.getElementById("homeScreen").style.display = "block";
}

/* ---------- Real-Time Tracking Simulation ---------- */
function initHomeMap() {
  map = L.map('map').setView([32.8423, -96.7847], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // Create the driver marker with a dragon emoji
  driverMarker = L.marker([32.8423, -96.7847], {
    icon: L.divIcon({
      className: 'driver-icon',
      html: "🐉",
      iconSize: [30, 30]
    })
  }).addTo(map);

  // Start both simulations on load
  startDriverSimulation();
  startPassengerSimulation();
}

function startDriverSimulation() {
  if (driverLocationIntervalId !== null) {
    clearInterval(driverLocationIntervalId);
  }
  driverLocationOn = true;
  driverLocationIntervalId = setInterval(function(){
    let lat = 32.8423 + (Math.random() - 0.5)/100;
    let lng = -96.7847 + (Math.random() - 0.5)/100;
    driverMarker.setLatLng([lat, lng]);
    map.setView([lat, lng], 14);
  }, 5000);
}

function stopDriverSimulation() {
  if (driverLocationIntervalId !== null) {
    clearInterval(driverLocationIntervalId);
    driverLocationIntervalId = null;
  }
  driverLocationOn = false;
}

function toggleDriverLocation() {
  if (driverLocationOn) {
    stopDriverSimulation();
    alert("Driver location updates turned OFF.");
  } else {
    startDriverSimulation();
    alert("Driver location updates turned ON.");
  }
}

/* ---------- Driver Screen Functions ---------- */
function loginDriver() {
  let pass = document.getElementById("driverPassword").value;
  if (pass === "dragon123") {
    document.getElementById("driverLogin").style.display = "none";
    document.getElementById("driverPanel").style.display = "block";
    initDriverMap();
  } else {
    alert("Wrong password. Access denied.");
  }
}

function initDriverMap() {
  let dmap = L.map('driverMap').setView([32.8423, -96.7847], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(dmap);
  L.marker([32.8423, -96.7847], {
    icon: L.divIcon({
      className: 'driver-icon',
      html: "🐉",
      iconSize: [30, 30]
    })
  }).addTo(dmap);
}

function acceptRide() { alert("Ride accepted! (FREE)"); }
function viewProfileDriver() { alert("Displaying driver profile, ratings, and reviews..."); }
function logoutDriver() {
  alert("Driver logged out.");
  document.getElementById("driverPanel").style.display = "none";
  document.getElementById("driverLogin").style.display = "block";
}

// Initialize the home map when the page loads
window.onload = initHomeMap;
