import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, remove, onChildAdded, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBUbfSxJeVzWH39dqq7XC5RPbYnvthyPU4",
  authDomain: "chatjs-80c6d.firebaseapp.com",
  databaseURL: "https://chatjs-80c6d-default-rtdb.firebaseio.com",
  projectId: "chatjs-80c6d",
  storageBucket: "chatjs-80c6d.appspot.com",
  messagingSenderId: "434993282887",
  appId: "1:434993282887:web:5455baee7e0e74812cd662",
  measurementId: "G-P2JP3FPW8X"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

var msgTxt = document.getElementById('msgTxt');
var sender;

if (sessionStorage.getItem('sender')) {
    sender = sessionStorage.getItem('sender');
} else {
    sender = prompt('PLEASE ENTER YOUR NAME');
    sessionStorage.setItem('sender', sender);
}

function sendMsg() {
    var msg = msgTxt.value;
    var timestamp = new Date().getTime();
    set(ref(db, "messages/" + timestamp), {
        msg: msg,
        sender: sender
    });

    msgTxt.value = "";
}

document.getElementById("msgBtn").onclick = sendMsg;

msgTxt.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMsg();
    }
});

onChildAdded(ref(db, "messages"), (data) => {
    if (data.val().sender == sender) {
        messages.innerHTML += "<div style=justify-content:end class=outer id=" + data.key + "><div id=inner class=me>you : " + data.val().msg + "<button id='dltMsg'>DELETE</button></div></div>";

        document.getElementById("dltMsg").onclick = function() {
            dltMsg(data.key);
        };

    } else {
        messages.innerHTML += "<div class=outer id=" + data.key + "><div id=inner class=notMe>" + data.val().sender + " : " + data.val().msg + "</div></div>";
    }
});

function dltMsg(key) {
    remove(ref(db, "messages/" + key));
}

onChildRemoved(ref(db, "messages"), (data) => {
    var msgBox = document.getElementById(data.key);
    messages.removeChild(msgBox);
});
