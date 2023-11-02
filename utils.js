const isFileLoaded = () => {
  return masterLogs == '' ? false : true;
}

const onBeforeUnload = (e) => {
  if (isFileLoaded()) {
    e.preventDefault();
    e.returnValue = '';
    return;
  }

  delete e['returnValue'];
}


const twoDigits = (num) => {
  if (num < 10) return '0' + num;
  return num;
}