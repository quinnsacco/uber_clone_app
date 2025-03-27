let map, driverMarker;
let rides = [];

/* ---------- Home Screen Functions ---------- */

// Simulate selecting a saved location
function selectLocation(loc) {
  document.getElementById("destination").value = loc;
}

// Simulate fare estimate and ETA calculation (dummy values)
function updateRideInfo() {
  document.getElementById("fare").innerText = (Math.random() * 20 + 10).toFixed(2);
  document.getElementById("etaTime").innerText = Math.floor(Math.random() * 10 + 2);
}

// Called when "Request Ride" is pressed
function requestRide() {
  let destination = document.getElementById("destination").value;
  if (!destination) {
    alert("Please enter a destination.");
    return;
  }
  updateRideInfo();
  alert("Ride requested! The car is on its way.");
  // Switch to ride details screen (simulate ride in progress)
  document.getElementById("homeScreen").style.display = "none";
  document.getElementById("rideDetails").style.display = "block";
  // Map is already initialized, but let's keep the driver moving
  startDriverSimulation();
}

// Dummy function for scheduled rides
function scheduleRide() {
  alert("Scheduled Ride: Feature coming soon!");
}

// Dummy functions for extra features
function shareLocation() {
  alert("Sharing your real-time location with trusted contacts...");
}
function emergency() {
  alert("Calling emergency services...");
}
function checkIn() {
  alert("Checking in with your ride...");
}
function messageDriver() {
  alert("Opening in-app chat with the driver...");
}
function callDriver() {
  alert("Dialing the driver...");
}
function shareTrip() {
  alert("Sharing your trip details...");
}
function addStop() {
  alert("Adding an extra stop...");
}
function updateDropoff() {
  alert("Updating your drop-off location...");
}
function viewHistory() {
  alert("Displaying your ride history and receipts...");
}
function completeRide() {
  alert("Ride complete! Thank you for riding.");
  // Return to home screen
  document.getElementById("rideDetails").style.display = "none";
  document.getElementById("homeScreen").style.display = "block";
}

/* ---------- Real-Time Tracking Simulation ---------- */

// Create the map on page load
function initHomeMap() {
  map = L.map('map').setView([32.8423, -96.7847], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // Place the dragon icon at SMU
  driverMarker = L.marker([32.8423, -96.7847], {
    icon: L.divIcon({
      className: 'driver-icon',
      html: "🐉",
      iconSize: [30, 30]
    })
  }).addTo(map);

  // Start the driver movement simulation
  startDriverSimulation();
}

// Move the driver marker around every 5 seconds
function startDriverSimulation() {
  setInterval(function(){
    let lat = 32.8423 + (Math.random() - 0.5)/100;
    let lng = -96.7847 + (Math.random() - 0.5)/100;
    driverMarker.setLatLng([lat, lng]);
    map.setView([lat, lng], 14);
  }, 5000);
}

/* ---------- Driver Screen Functions ---------- */

// Called when the driver enters password and clicks "Login"
function loginDriver() {
  let pass = document.getElementById("driverPassword").value;
  if(pass === "dragon123") { // Driver password is "dragon123"
    document.getElementById("driverLogin").style.display = "none";
    document.getElementById("driverPanel").style.display = "block";
    initDriverMap();
  } else {
    alert("Wrong password. Access denied.");
  }
}

// Initialize the driver panel map
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

// Dummy function to simulate accepting a ride
function acceptRide() {
  alert("Ride accepted! The ride is now on its way.");
}

// Dummy functions for driver options
function viewProfileDriver() {
  alert("Displaying driver profile, ratings, and reviews...");
}
function logoutDriver() {
  alert("Driver logged out.");
  document.getElementById("driverPanel").style.display = "none";
  document.getElementById("driverLogin").style.display = "block";
}

// Initialize map when home screen loads
window.onload = initHomeMap;
