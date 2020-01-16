function filechanged() {
	if (filepicker.files.length == 0) {
		displaymessage("Please select a file.");
		return;
	}

	file = filepicker.files[0];
	if (file.type != 'text/plain') {
		displaymessage("Please select a text file.");
		return;
	}

	reader = new FileReader();
	reader.onload = function(evt) { fileread('filename', evt.target.result); };
	reader.readAsText(file);
}

function fileread(name, content) {
	assignment = parse(name, content);
	assignment_score = assignment.score;
	buildui(assignment);
}

function copy() {
	textarea = document.querySelector('#commentbox');
	textarea.focus();
	textarea.select();
	document.execCommand('copy');
}

function reset() {
	document.querySelector('#commentbox').value = '';
	document.querySelector('#scorebox').value = assignment_score;
	issues.forEach(function(issue) { issue.isApplied = false; });
	document
		.querySelectorAll('.toggle-down')
		.forEach(function(element) {
			element.classList.remove('toggle-down');
			});
	window.scrollTo(0, 0);
}

function buildui(assignment) {
	document.querySelector('#scorebox').value = assignment_score;
	document.querySelector('#commentbox').value = '';
	let container = document.querySelector('#container');

	while (container.lastChild) {
		container.removeChild(container.lastChild);
	}

	for (let section of assignment.sections) {
		header = document.createElement('h1');
		header.innerText = section.title;
		container.appendChild(header);
		for (let issue of section.issues) {
			issues.push(issue);
			btn = document.createElement('p');
			btn.className = 'toggle';
			btn.innerText = issue.title;
			btn.onclick = btnClick;
			btn.grader_tool_issue_object = issue;
			container.appendChild(btn);
		}
	}
}

function updateui() {
	let commentbox = document.querySelector('#commentbox');
	let comment =
		issues
		.filter(issue => issue.isApplied)
		.map(issue => '-- ' + issue.text)
		.join('\n\n');
	commentbox.value = comment;
}

function btnClick(e) {
	let issue = e.target.grader_tool_issue_object;
	let btn = e.target;
	let scorebox = document.querySelector('#scorebox');

	if (issue.isApplied) {
		scorebox.value = float(scorebox.value) - issue.score;
		issue.isApplied = false;
		btn.classList.remove('toggle-down');
	} else {
		scorebox.value = parseFloat(scorebox.value) + issue.score;
		issue.isApplied = true;
		btn.classList.add('toggle-down');
	}

	updateui();
}

let assignment_score = 0;
let issues = [];
document.querySelector('#filepicker').addEventListener('change', filechanged);
document.querySelector('#copybtn').addEventListener('click', copy);
document.querySelector('#resetbtn').addEventListener('click', reset);
document.querySelector('#scorebox').value = 0;
document.querySelector('#commentbox').value = '';
