const addEventBtn = document.getElementById("addEventBtn");
const clearEventsBtn = document.getElementById("clearEventsBtn");
const eventsContainer = document.getElementById("eventsContainer");
const eventCount = document.getElementById("eventCount");

// Update event counter
function updateEventCount() {
  const total = eventsContainer.querySelectorAll(".event-item").length;
  eventCount.textContent = "Total Events: " + total;
}

addEventBtn.addEventListener("click", function () {
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  if (title.trim() === "" || date === "") {
    alert("Please enter title and date");
    return;
  }

  const eventDiv = document.createElement("div");
  eventDiv.classList.add("event-item");

  eventDiv.innerHTML = `
    <h4>${title}</h4>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Category:</strong> ${category}</p>
    <p>${description}</p>
    <button class="delete-btn">Delete</button>
  `;

  // Delete event
  eventDiv.querySelector(".delete-btn").addEventListener("click", function () {
    eventDiv.remove();
    updateEventCount();
  });

  eventsContainer.appendChild(eventDiv);

  updateEventCount();

  // Clear inputs
  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  document.getElementById("description").value = "";
});

// Clear all events
clearEventsBtn.addEventListener("click", function () {
  eventsContainer.innerHTML = "";
  updateEventCount();
});

// Initialize counter on page load
updateEventCount();