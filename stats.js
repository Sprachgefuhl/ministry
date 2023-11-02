function updateStats() {
  const hrsEl = document.getElementById('stats-hrs');
  const trackerEl = document.getElementById('stats-tracker');
  let totalHrs = 0;

  masterLogs.forEach(log => {
    totalHrs += parseFloat(log.hrs);
  });


  let diffTime = Math.abs(new Date() - new Date('9/1/23'));
  let totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  let hoursPerDay = 600 / 365;
  let totalHrsNeeded = Math.round(totalDays * hoursPerDay);
  let diff = totalHrs - totalHrsNeeded;

  hrsEl.textContent = totalHrs;
  trackerEl.textContent = diff;

  if (diff >= 0) {
    trackerEl.style.color = 'green';
  } else {
    trackerEl.style.color = 'red';
  }
}