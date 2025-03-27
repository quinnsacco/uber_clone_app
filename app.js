let map, driverMarker, passengerMarker;
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
  document.getElementById("homeScreen").style.display = "none";
  document.getElementById("rideDetails").style.display = "block";
}

function scheduleRide() {
  alert("Scheduled Ride (FREE) - Feature coming soon!");
}

/* ---------- Passenger Location Sharing ---------- */
function startPassengerSharing() {
  // In a real app, you'd get actual geolocation and push to server
  passengerMarker = L.marker([32.8423, -96.7847], {
    icon: L.divIcon({
      className: 'passenger-icon',
      html: "🙂",
      iconSize: [30, 30]
    })
  }).addTo(map);

  passengerLocationIntervalId = setInterval(() => {
    let lat = 32.8423 + (Math.random() - 0.5)/100;
    let lng = -96.7847 + (Math.random() - 0.5)/100;
    passengerMarker.setLatLng([lat, lng]);
  }, 5000);

  passengerLocationOn = true;
}

function stopPassengerSharing() {
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
    stopPassengerSharing();
    alert("Passenger location sharing OFF.");
  } else {
    startPassengerSharing();
    alert("Passenger location sharing ON.");
  }
}

function shareLocation() {
  alert("Sharing real geolocation with the driver...");
  // In a real app, you'd use navigator.geolocation.getCurrentPosition() 
  // and send coords to a server or driver
}

/* ---------- Driver Location Simulation ---------- */
function startDriverSimulation() {
  driverMarker = L.marker([32.8423, -96.7847], {
    icon: L.divIcon({
      className: 'driver-icon',
      html: "🐉",
      iconSize: [30, 30]
    })
  }).addTo(map);

  driverLocationIntervalId = setInterval(() => {
    let lat = 32.8423 + (Math.random() - 0.5)/100;
    let lng = -96.7847 + (Math.random() - 0.5)/100;
    driverMarker.setLatLng([lat, lng]);
    // Removed map.setView(...) so it won't jump around
  }, 5000);

  driverLocationOn = true;
}

function stopDriverSimulation() {
  if (driverLocationIntervalId) {
    clearInterval(driverLocationIntervalId);
    driverLocationIntervalId = null;
  }
  if (driverMarker) {
    map.removeLayer(driverMarker);
    driverMarker = null;
  }
  driverLocationOn = false;
}

function toggleDriverLocation() {
  if (driverLocationOn) {
    stopDriverSimulation();
    alert("Driver location OFF.");
  } else {
    startDriverSimulation();
    alert("Driver location ON.");
  }
}

function shareLocationDriver() {
  alert("Driver is sharing actual location with passenger...");
  // Real usage would get driver geolocation, push to server
}

/* ---------- Misc. Functions ---------- */
function emergency() { alert("Emergency services called."); }
function checkIn() { alert("Ride check-in triggered."); }
function messageDriver() { alert("Opening chat with driver..."); }
function callDriver() { alert("Calling driver..."); }
function shareTrip() { alert("Sharing trip link..."); }
function addStop() { alert("Adding extra stop..."); }
function updateDropoff() { alert("Updating drop-off location..."); }
function viewHistory() { alert("Showing ride history..."); }
function completeRide() {
  alert("Ride complete! Thanks for riding (FREE).");
  document.getElementById("rideDetails").style.display = "none";
  document.getElementById("homeScreen").style.display = "block";
}

/* ---------- Map Init ---------- */
function initHomeMap() {
  map = L.map('map').setView([32.8423, -96.7847], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // Start both simulations by default
  startDriverSimulation();
  startPassengerSharing();
}

/* ---------- Driver Screen ---------- */
function loginDriver() {
  let pass = document.getElementById("driverPassword").value;
  if (pass === "dragon123") {
    document.getElementById("driverLogin").style.display = "none";
    document.getElementById("driverPanel").style.display = "block";
    // In driver screen, you might want your own map
    initDriverMap();
  } else {
    alert("Wrong password. Access denied.");
  }
}

function initDriverMap() {
  let dmap = L.map('driverMap').setView([32.8423, -96.7847], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(dmap);

  // Optionally place a static marker
  L.marker([32.8423, -96.7847], {
    icon: L.divIcon({
      className: 'driver-icon',
      html: "🐉",
      iconSize: [30, 30]
    })
  }).addTo(dmap);
}

function acceptRide() { alert("Ride accepted! (FREE)."); }
function viewProfileDriver() { alert("Driver profile displayed."); }
function logoutDriver() {
  alert("Driver logged out.");
  document.getElementById("driverPanel").style.display = "none";
  document.getElementById("driverLogin").style.display = "block";
}

// On load, init map
window.onload = initHomeMap;
