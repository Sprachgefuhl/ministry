const uploadFile = () => {
  const file = uploadFileBtn.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    const json = JSON.parse(reader.result);
    masterLogs = json;
    renderLogs(masterLogs);
    const today = new Date();
    newDateEl.value = today.getFullYear() + '-' + twoDigits((today.getMonth() + 1)) + '-' + twoDigits(today.getDate());
  };

  reader.readAsText(file);
}

const renderLogs = (logs) => {
  logsEl.innerHTML = '';

  let lastMonthYear;
  logs.sort((a, b) => { return new Date(b.date) - new Date(a.date) });

  logs.forEach(log => {
    const date = new Date(log.date);
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = new Date(log.date).getFullYear();
    let monthYear = month + ' ' + year;

    if (lastMonthYear == '') lastMonthYear = monthYear;
    else {
      if (monthYear !== lastMonthYear) lastMonthYear = monthYear;
      else monthYear = '';
    }

    const monthYearEl = document.createElement('h2');
    const logEl = document.createElement('div');
    const logDateEl = document.createElement('h3');
    const logInfoEL = document.createElement('div');
    const logHrsEl = document.createElement('p');
    const editBtn = document.createElement('i');
    const deleteBtn = document.createElement('i');
    logEl.classList = 'log';
    logInfoEL.classList = 'log-info';
    editBtn.classList = 'fa-solid fa-pen-to-square';
    deleteBtn.classList = 'fa-solid fa-trash';
    monthYearEl.id = 'month-year';
    logDateEl.id = 'log-date';
    logHrsEl.id = 'log-hrs';
    deleteBtn.id = 'delete-log';
    monthYearEl.textContent = monthYear;
    logDateEl.textContent = day + ', ' + date.getDate();
    logHrsEl.textContent = log.hrs;

    // logEl.addEventListener('mouseover', () => {
    //   newDateEl.value = date.getFullYear() + '-' + twoDigits((date.getMonth() + 1)) + '-' + twoDigits(date.getDate());
    //   newHrsEl.value = log.hrs;
    //   // editRef = log.ref;
    // });

    // logsEl.addEventListener('mouseleave', () => {
    //   newDateEl.value = '';
    //   newHrsEl.value = '';
    // });

    editBtn.addEventListener('click', () => {
      prepareEdit(log);
    });

    deleteBtn.addEventListener('click', () => {
      deleteLog(log);
    });

    logsEl.append(monthYearEl);
    logsEl.append(logEl);
    logEl.append(logDateEl);
    logEl.append(logInfoEL);
    logInfoEL.append(logHrsEl);
    logInfoEL.append(editBtn);
    logInfoEL.append(deleteBtn);
  });

  updateStats();
}

const saveFile = () => {
  if (!isFileLoaded()) return;
  const blob = new Blob([JSON.stringify(masterLogs)], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, 'ministryData.json');
}

const newLog = () => {
  if (!isFileLoaded()) return;

  const date = new Date(document.getElementById('new-date').value);
  const hrs = parseFloat(document.getElementById('new-hrs').value);
  const ref = generateRef();
  masterLogs.push({ date: date, hrs: hrs, ref: ref });
  renderLogs(masterLogs);
}

const generateRef = () => {
  const chars = 'abcdefghijklmnopqrstuzwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
  let ref = '';

  for (let i = 0; i < 10; i++) {
    let randomChar = chars[Math.floor(Math.random() * chars.length)];
    ref += randomChar;
  }

  return ref;
}

const prepareEdit = (log) => {
  const date = new Date(log.date);
  newDateEl.value = date.getFullYear() + '-' + twoDigits((date.getMonth() + 1)) + '-' + twoDigits(date.getDate());
  newHrsEl.value = log.hrs;
  editRef = log.ref;
}

const editLog = () => {
  const date = newDateEl.value;
  const hrs = newHrsEl.value;

  masterLogs.forEach(masterLog => {
    if (masterLog.ref === editRef) {
      masterLog.date = date;
      masterLog.hrs = hrs;
    }
  });

  renderLogs(masterLogs);
}

const deleteLog = (log) => {
  masterLogs = masterLogs.filter(masterLog => masterLog.ref !== log.ref);
  renderLogs(masterLogs);
}