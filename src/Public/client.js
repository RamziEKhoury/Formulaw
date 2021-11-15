const socket = io('http://localhost:3002');
let name;
const textarea = document.querySelector('#textarea');
const messageArea = document.querySelector('.message__area');
const feedback = document.getElementById('feedback');

do {
	name = prompt('Please enter your name: ');
	socket.emit('new-user', name);
	to = prompt('Please enter sender name: ');
	// socket.emit('new-user', to)
} while (!name);

textarea.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		sendMessage(e.target.value);
	}
	if (e.key === 'Shift') {
		alert(e.key);
		userDisconnect();
	}
});


function sendMessage(message) {
	let msg = {
		user: name,
		reciever: to,
		message: message.trim(),
		currency: '$',
		amount: 140,
		messageType: 'counter',
	};

	// Append
	appendMessage(msg, 'outgoing');
	textarea.value = '';
	scrollToBottom();

	// Send message
	msg = JSON.stringify(msg);
	socket.emit('message', msg);
}

function appendMessage(msg, type) {
	const mainDiv = document.createElement('div');
	const className = type;
	mainDiv.classList.add(className, 'message');

	const markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
	mainDiv.innerHTML = markup;
	messageArea.appendChild(mainDiv);
}
let timeout;
// typing event
textarea.addEventListener('keypress', () => {
	let type = {
		user: name,
		reciever: to,
	};
	type = JSON.stringify(type);
	socket.emit('typing', type);
});
function appendTypeMessage(msg, type) {
	feedback.innerHTML = '<p><em>' + msg.user + ' is typing...</em></p>';
}

socket.on('typing', function(msg) {
	appendTypeMessage(msg, 'incoming');
});


// stop typing event
textarea.addEventListener('keyup', () => {
	let type = {
		user: name,
		reciever: to,
	};
	type = JSON.stringify(type);
	socket.emit('stopTyping', type);
});

function appendStopMessage(msg, type) {
	feedback.innerHTML = '';
}

socket.on('stopTyping', function(msg) {
	appendStopMessage(msg, 'incoming');
	scrollToBottom();
});


// Recieve messages
socket.on('message', (msg) => {
	appendMessage(msg, 'incoming');
	scrollToBottom();
});

function scrollToBottom() {
	messageArea.scrollTop = messageArea.scrollHeight;
}

function userDisconnect() {
	alert('result');
	socket.emit('disconnectUser', name);
}

