class Assignment {
	constructor(name, score, macros, sections) {
		this.title = name;
		this.score = score || -1;
		this.macros = macros || [];
		this.sections = sections || [];
		for (let section of this.sections) {
			section.applymacros(this.macros);
		}
	}

	show() {
		console.log("Assignment: " + this.title + "(" + this.score + ")");
		for (let macro of this.macros) {
			macro.show();
		}
		for (let section of this.sections) {
			section.show();
		}
	}
}

class Section {
	constructor(title, macros, issues) {
		this.title = title;
		this.macros = macros || [];
		this.issues = issues || [];
	}

	applymacros(macros) {
		// Note: Later macros are ignored in Issue, so
		// put global ones later to allow local overrides
		this.macros = this.macros.concat(macros);
		for (let issue of this.issues) {
			issue.applymacros(this.macros);
		}
	}

	show() {
		console.log('\tSection: ' + this.title);
		for (let macro of this.macros) {
			//console.log(macro);
			macro.show();
		}
		for (let issue of this.issues) {
			issue.show();
		}
	}
}


class Issue {
	constructor(title, score, text) {
		this.title = title;
		this.score = score;
		this.text = text;
		this.isApplied = false;
	}

	applymacros(macros) {
		for (let macro of macros) {
			while (this.text.includes(macro.name)) {
				this.text = this.text.replace(macro.name, macro.text);
			}
		}
	}

	show() {
		console.log('\t\tIssue:');
		console.log('\t\t' + this.title);
		console.log('\t\t' + this.score.toString() + ' point(s)');
		console.log('\t\t' + this.text);
		console.log();
	}
}

class Macro {
	constructor(name, text) {
		this.name = name;
		this.text = text;
	}

	show() {
		console.log('\t\tMacro: ' + this.name);
		console.log('\t\t' + this.text);
		console.log();
	}
}
