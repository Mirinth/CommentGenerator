let text = `10 points

{{global.conspiracy}}
There is a global conspiracy to make this program fail.

-------------------------------------------------------------
Question 12 example

{{solution}}
Flipping any four bits in a square or rectangle pattern will
work in the particular case of the example on the slide.

# Missing (2 pts)
Missing. {{solution}}

# Error detected (2 pts)
The given example would actually be detected since the parity
bits don't match up. {{solution}}

# Too many changes (2 pts)
The given example changes more than four bits. {{solution}}

# Too few changes (2 pts)
The given example changes fewer than four bits. {{solution}}

# Unclear errors (2.5 pts)
The given example doesn't appear to match the one in the
slides, and the original it's based off wasn't provided, so
I can't tell if this is a valid answer. {{solution}}



-------------------------------------------------------------
Question 12 general case

{{solution}}
In general, any errors that happen to balance the parity
bits will go undetected by two-dimensional parity.

# Missing (3 pts)
Missing. {{solution}}

# Square (0.5 pts)
In this case, the visual layout chosen happens to make it so
all undetected four-bit errors will form a square or
rectangle, but this isn't always the case. If the data was
laid out with two bytes per row, for example, you could miss
a four-bit error with all the errors in the same row.
{{solution}}

# Errors in right place (2 pts)
{{solution}}

# Errors adjacent (2 pts)
{{solution}}

# Suffers noise (2 pts)
Noise may or may not be detected by two-dimensional parity.
{{solution}}

# Swap things (2 pts)
{{solution}}

# Second example (2 pts)
The answer for the general case was more of an example than a
description of the general case. {{solution}}

# Generally off (2 pts)
{{solution}}


-------------------------------------------------------------
Question C advantages

{{solution}}
The main advantage of CRC when compared to the Internet
checksum algorithm is that it's a much stronger algorithm
that will detect many more errors.

# Missing (2.5 pts)
The advantages of the CRC algorithm were missing.
{{solution}}


-------------------------------------------------------------
Question C disadvantages

{{solution}}
The main disadvantage of CRC when compared to the Internet
checksum algorithm is that it's much slower and may become a
bottleneck without specialized hardware to speed it up.

# Missing (2.5 pts)
Missing. {{solution}}

# Not a disadvantage (1.5 pts)
This isn't really a disadvantage of the CRC algorithm when
compared to the Internet checksum algorithm. {{solution}}

# Disadvantages off (1.5 pts)
{{solution}}

# Error, overflow, security (2.5 pts)
The Internet checksum algorithm can't correct errors at all,
so CRC without correction isn't actually a disadvantage. The
Internet checksum algorithm is even worse for protecting
against malicious changes than CRC is, so that isn't a
disadvantage either. Finally, CRC isn't susceptible to
overflow, so that isn't a disadvantage. {{solution}}

# Needs hardware (0.5 pts)
CRC doesn't strictly need special hardware to run, but it
may become a bottleneck without specialized hardware since
it's more computationally expensive than the Internet
checksum algorithm.

# Easy to implement (1 pt)
While it's true that the Internet checksum algorithm is
easier to implement, it isn't by much. {{solution}}

# Needs more bits (0.5 pts)
While a CRC may use more bits than a checksum, the
difference is small (typically at most 16 bits per message).
{{solution}}

# Not secure (2.5 pts)
Lack of security against malicious modification isn't a
disadvantage compared to the Internet checksum algorithm
since it isn't any good at this type of protection either.
{{solution}}

# Overflow (2.5 pts)
The CRC algorithm isn't susceptible to overflow. {{solution}}

`;

print = null;

//let result = parse('name', text);
//result.show();

//let reader = new Reader(text);
//let section = parsesection(reader);
//section.show();
