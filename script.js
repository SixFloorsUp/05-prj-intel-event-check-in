const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greetingElement = document.getElementById("greeting");
const attendeeCountElement = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

let count = 0;
const maxCount = 50;
let celebrationShown = false;

// Team counters object to track counts
const teamCounts = {
  water: 0,
  zero: 0,
  power: 0,
};

// Add welcome message above check-in form
const welcomeMessage = document.createElement("p");
welcomeMessage.textContent =
  "Welcome to the Intel Sustainability Summit! Please check in below.";
welcomeMessage.style.textAlign = "center";
welcomeMessage.style.marginBottom = "20px";
form.parentNode.insertBefore(welcomeMessage, form);

// Create attendee list container and insert it after team stats
const container = document.querySelector(".container");
const teamStats = document.querySelector(".team-stats");
const attendeeListContainer = document.createElement("div");
attendeeListContainer.className = "attendee-list";
attendeeListContainer.style.marginTop = "40px";
attendeeListContainer.innerHTML =
  '<h3>Checked-In Attendees</h3><ul id="attendeeList"></ul>';
teamStats.parentNode.insertBefore(attendeeListContainer, teamStats.nextSibling);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  // Increment total count
  count++;

  // Update total attendance display
  attendeeCountElement.textContent = count;

  // Calculate and update progress bar
  const percentage = (count / maxCount) * 100;
  progressBar.style.width = percentage + "%";

  // Update team counter
  teamCounts[team]++;
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = teamCounts[team];

  // Display personalized greeting
  const message = `Welcome, ${name} from ${teamName}!`;
  greetingElement.textContent = message;

  // Add attendee to list
  const attendeeList = document.getElementById("attendeeList");
  const listItem = document.createElement("li");
  listItem.textContent = `${name} - ${teamName}`;
  attendeeList.appendChild(listItem);

  // Check for celebration at goal
  if (count === maxCount && !celebrationShown) {
    celebrationShown = true;

    // Find team with highest count
    let maxTeamCount = 0;
    let winningTeam = "";
    let tieCount = 0;

    for (const team in teamCounts) {
      if (teamCounts[team] > maxTeamCount) {
        maxTeamCount = teamCounts[team];
        winningTeam = team;
        tieCount = 1;
      } else if (teamCounts[team] === maxTeamCount) {
        tieCount++;
      }
    }

    // Display celebration message
    let celebrationMessage =
      "� Congratulations! We reached our goal of 50 attendees! 🎉";

    if (tieCount > 1) {
      celebrationMessage += " It's a tie!";
    } else {
      const teamNameMap = {
        water: "Team Water Wise",
        zero: "Team Net Zero",
        power: "Team Renewables",
      };
      celebrationMessage += ` ${teamNameMap[winningTeam]} has the most attendees!`;
    }

    greetingElement.textContent = celebrationMessage;
  }

  form.reset();
});
