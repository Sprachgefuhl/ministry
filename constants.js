const logsEl = document.querySelector('.logs');
const uploadFileBtn = document.getElementById('file-upload');
const saveFileBtn = document.getElementById('file-save');
const newLogBtn = document.getElementById('new-log');
const newDateEl = document.getElementById('new-date');
const newHrsEl = document.getElementById('new-hrs');
const editLogBtn = document.getElementById('edit-log');
let masterLogs = '';
let editRef;

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];