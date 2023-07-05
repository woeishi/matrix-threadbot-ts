import { PART, BELOW, HTML, HELP, PLAIN } from "./types";

export const getHelpMessage = () => `<p>mention this bot in a thread,<br> 
to get the thread messages captured as markdown or html<br>
e.g. <code>threadbot: part below</code></p>
<h5>options</h5>
<ul>
<li><strong>${PART}</strong>: captures only the messages up to the last mention of the bot,<br> defaults to capturing the whole thread</li>
<li><strong>${BELOW}</strong>: posts the result below the mention,<br> defaults to sending a direct message</li>
<li><strong>${HTML} or ${PLAIN}</strong>: formats the messages as html or plain text (minimal styling)<br> defaults to markdown</li>
<li><strong>${HELP}</strong> or <strong>?</strong>: shows this message, does not execute capturing</li>
</ul>
<em>threadbot v.0.1.0</em>`;