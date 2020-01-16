-------------------------------------------------------------
# Using the comment generator
-------------------------------------------------------------

The "comment-generator.html" file can be opened in your
favorite web browser. It was tested with a recent version of
Firefox, but will likely work in other browsers as well. 

When you first open the comment generator, you'll see a few
miscellaneous boxes and a button. Click the "Choose a file"
button to open a window and choose a comment file.

Once the file is loaded, a number of buttons will appear
organized under different headings. Each button corresponds
to one of the comment fragments in the file. Click on any one
to toggle its fragment on or off.

At the bottom is a separate section with smaller buttons,
a number, and a text box.

The text box contains the comment generated from the
fragments you selected. You can scroll through it to review
the comments and make sure they look right.

The number box contains the computed score based on the
comments selected. This can be handy to save some mental
arithmetic when the adjustment for a comment is known.
You can also adjust its value manually and the adjustment
will be maintained as you (de)activate other comments.

The copy button will copy the contents of the text box to
the clipboard so you can paste it into Canvas. You can also
select its text and use the usual Ctrl+C keyboard shortcut,
but if your hand was already on the mouse, the button will
be a little faster.

The reset button deselects all the fragments, resets the
score box, clears the comment box and scrolls back to the
top of the page so the tool is prepared to grade the next
assignment.

You may find it convenient to move the comment generator
page to a new window and resize it to be quite narrow.
If you place it next to the SpeedGrader page, you can
quickly click back and forth to apply comments.


-------------------------------------------------------------
# Comment files
-------------------------------------------------------------

The comment generator's comment files are designed to be
human readable. It's likely you can gain a reasonably
accurate understanding of the format just by looking at it.
They should definitely be easy to use once you're familiar
with them. =)

Some general notes:
- Blank lines are ignored. Feel free to use them to make
things look nice.
- You can start any line with >! to make it a comment. Such
lines will be ignored as if they were blank.
- White-space at the start and end of a line is ignored.


# Assignment score

The comment generator can compute a score for the assignment
based on the comment fragments you select. To facilitate this,
the first line of the file specifies how many points the
assignment is worth. It starts with any number (including
decimals, like 1.7789) and ends with an optional "point" or
"pt". You can also pluralize it. If you prefer not to have
scores calculated for you, or if calculating a score isn't
practical or makes no sense, you can use a score of 0. Or
just ignore the score box in the tool.
Examples:

1 point
3.14 points
8 pt
99
0
42.09 pts


# Global macros

After the assignment score is an optional set of global
macros. See the *Local macros* section for more details.
Global macros are exactly the same, except that they can be
used anywhere in the file and they're located just after the
score line. Global macros probably won't be useful as often
as local ones, so most of the documentation is there.


# Section header

Issues can be organized into sections for easier scanning.
Each section will have its own heading that helps narrow down
the list of issues when looking for the right one. There must be at least one section, but you can use as many as you want.

There are no hard rules for what constitutes a section. You
can define them however you like. It may be convenient to use
one section for each problem in a multi-problem assignment,
a section for each facet of a rubric, or a section for each
member on a group project. You can use whatever makes the most
sense for your particular situation.

To make a section, put some dashes on a line, then put the
name of the section on the line immediately following. The
dashed line needs at least 4 dashes, but you can use more
if it makes the file look nicer.
Examples:

----
ch.1

---------------------------------
Professionalism


# Local macros

When writing comment fragments, you may find yourself writing
the same bit of text several times. For example, you may want
to address a specific way the student went wrong, then include
the correct answer for studying purposes. If you duplicate
the solution all over the place, and later decide to improve
it, you run the risk of having the copies get out of sync. Not
to mention the nuisance of tracking them down everywhere.

Macros let you define these snippets in one central place,
then reference them later. The tool will automatically fill in
the canonical copy for you so you don't have to worry about
the tedium or mistakes yourself.

Local macros occur at the start of a section and are
accessible to any comment fragments within that same section.
Global ones occur at the start of the file, after the score
line, and are accessible in any comment fragment anywhere.
Both types are defined and referenced the same way.

Note that in the event of a conflict, local macros will
override global ones. If there is still a tie, then earlier
ones override later ones. Using macros within other macros is
sort-of supported, but messy and probably best avoided.

To define a macro, write {{macro-name}} on a line by itself, where "macro-name" is the name you want to refer to the macro by. On the next line, write the text you want to replace the
macro by. You can insert newlines (and even blank lines) in
the macro's text. They'll be stripped out and discarded, then
replaced with a space. The macro's text will continue until
you start a new section, macro or issue, or the file ends.

You can specify multiple macros in a row as well. Start the
next one the same way you started the first.

You can name your macro anything you want as long as it
doesn't contain curly braces. See *Issues* below for details
on using a macro once defined.
Example:

{{solution}}
In order to get from point A to point B, you need to go 80
paces forward, turn 76 degrees to the right, and go 90 paces
forward.

{{alt.solution}}
If you take the northern pass route, you need wings first.

# Issues

Issues contain the actual comment fragments you want to use.
To define an issue, write a # and a space followed by the
name of the issue. If you want to assign a point value to the
issue, you can write something like "(-2 pts)" at the end of
the line after the issue's name to tell the comment generator
to subtract 2 points if this issue is applied. You can also
write "(1 point)" instead to add a point. The parenthesized
score is optional though, so you don't have to include it if
you don't want score adjustments for the issue.

Note that unlike the score line at the top of the file,
writing "(-2)" won't work. It needs to have either "pt", "pts", "point", or "points".

After the name and optional score, the next line will start
the text of the comment fragment. This works in much the same
way as macros, in that you can use multiple lines and it will
work just fine. The issue's body continues until you start a
new section or issue, or the file ends.

If you want to use a macro within the comment fragment's text,
simply write the macro's name in double-curly-braces just
like how you defined it above. The comment generator tool will
automatically replace it with the text it refers to. The earliest-defined local macro will be used. If no local macro
matches the name, then the earliest-defined global one will
be used instead. If there is no global one either, then the
macro's name will appear unmodified in the result.
Examples:

# Sign error (-0.1 pt)
Your drawing uses the wrong road signs. {{solution}}

# Style
According to the style guide, your paper needs to use one-inch
margins and 12pt font. I'm not taking points off this time,
but from now on I'll be docking points for not following
the style guide.


# More sections

Once you've finished writing macros and issues, you can start
a new section in the same way as before, by writing four or
more dashes and the name on the next line.


# Sample

See the accompanying sample file for a lengthy example
demonstrating all the concepts described above.
