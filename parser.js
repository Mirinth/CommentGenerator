class ParseError extends Error {
	constructor(linenum, expected, found, ...params) {
		let msg = `Error on line ${linenum}\n` +
				`Expected \`${expected}\`\n` +
				`found    \`${found}\``;
		super(msg, ...params);
	}
}


function parse(name, content) {
	if (!content) {
		content = name;
		name = 'Unknown';
	}

	let reader = new Reader(content);
	let score = parsescore(reader);
	let macros = klene(reader, ismacro, parsemacro);
	let sections = klene(reader, issection, parsesection);
	return new Assignment(name, score, macros, sections);
}

function parsescore(reader) {
	let linenum, line;

	let pattern = /(-?\d+(\.\d+)?) ((point|pt)s?)/;
	[linenum, line] = reader.read();
	let matches = pattern.exec(line);
	if (!matches) {
		throw new ParseError(linenum, '<number> points', line);
	}
	return parseFloat(matches[1]);
}

function issection(reader) {
	let _, line;
	[_, line] = reader.peek();
	return line.startsWith('----');
}

function parsesection(reader) {
	let linenum, divider, title;

	assert(issection(reader));
	[linenum, divider] = reader.read();
	[linenum, title] = reader.read();
	let macros = klene(reader, ismacro, parsemacro)
	let issues = klene(reader, isissue, parseissue);
	return new Section(title, macros, issues);
}

function ismacro(reader) {
	let linenum, line;
	[linenum, line] = reader.peek();
	let pattern = /^\{\{[^\}\{]+\}\}$/;
	return pattern.test(line);
}

function parsemacro(reader) {
	assert(ismacro(reader));

	let _, name;
	[_, name] = reader.read();
	let text = parsebody(reader);
	return new Macro(name, text);
}

function isissue(reader) {
	assert(reader instanceof Reader);
	let linenum, line;
	[linenum, line] = reader.peek();
	return line.startsWith('#');
}

function parseissue(reader) {
	let linenum, header, title, score;

	assert(isissue(reader));
	[linenum, header] = reader.read();
	[title, score] = parseheader(header);

	let text = parsebody(reader);
	return new Issue(title, score, text);
}

function parseheader(header) {
	header = header.slice(1).trim(); // strip off the leading #

	let rparen = header.lastIndexOf(')');
	let lparen = header.lastIndexOf('(');

	if (rparen < 0 || lparen < 0 || rparen < lparen) {
		return [header, 0];
	}

	let scorepart = header.slice(lparen+1, rparen)
	for (fragment of ['pts', 'pt', 'points', 'point']) {
		scorepart = scorepart.replace(fragment, '');
	}

	let score = parseFloat(scorepart);

	if (isNaN(score)) {
		return [header, 0];
	} else {
		let title = header.slice(0, lparen);
		return [title, score];
	}
}

function parsebody(reader) {
	let linenum, line;
	let lines = [];
	while (!issection(reader) && !isissue(reader) && reader.hasmore()) {
		[linenum, line] = reader.read();
		lines.push(line.trim());
	}
	return lines.join(' ');
}

/*
#class Issue:
#	function __init__(self, lines, macros):
#		self.title = Text.parsetitle(lines, 'issue')
#		self.score = Text.parsescore(lines, 'issue')
#		self.text = Text.parsebody(lines)
#		self.applymacros(macros)
#
#	function applymacros(self, macros):
#		for (name, text) in macros:
#			if name == '{{prefix}}':
#				self.text = macro.text + ' ' + self.text
#			else:
#				self.text = self.text.replace(name, text)



*/

function klene(reader, predicate, parse) {
	let linenum, line;
	let result = [];
	[linenum, line] = reader.peek();
	while (predicate(reader)) {
		result.push(parse(reader));
		[linenum, line] = reader.peek();
	}
	return result;
}

function assert(condition) {
	if (!condition) {
		throw new Error("Assertion failure");
	}
}
