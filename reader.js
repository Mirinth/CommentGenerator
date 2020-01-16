class Reader {
	constructor(content) {
		this.content = 
			content
			.replace(/(\r\n)|\r|\n/g, '\n') // use a regex with /g flag since
			.split('\n')					// .replace only replaces first
			.reverse();						// occurrence otherwise
		this.linenum = 0;
		this.line = ' ';
		this.readline();
	}

	hasmore() {
		return (this.content.length > 0);
	}

	peek() {
		return [this.linenum, this.line];
	}

	read() {
		let val = [this.linenum, this.line];
		this.readline();
		return val;
	}

	readline() {
		let line = ' ';
		let linenum = this.linenum;
		while (
			line.startsWith('>!') ||
			line.trim().length == 0 &&
			this.content.length > 0)
			{
			line = this.content.pop();
			linenum += 1;
		}
		this.linenum = linenum;
		this.line = line;
	}
}
