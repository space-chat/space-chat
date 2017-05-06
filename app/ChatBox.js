import React from 'react';

export default function ChatBox () {
  return (
    <form>

	  {/* select input language */}
      <select name="input-language">
        {/* can we loop through something here? */}
        <option value="english">English</option>
  	    <option value="spanish">Spanish</option>
      </select>

	  {/* select output language */}
      <select name="output-language">
	    <option value="english">English</option>
	    <option value="spanish">Spanish</option>
      </select>

	  {/* message text area */}
      <textarea name="text-input">Type your message here</textarea>

	  {/* 'send' button */}
      <button name="submit">Send</button>

    </form>
  )
}

/* --------------------------

 TO DO:
 - properly populate select tags
 - write handler for submit button
 - add some simple styling so this doesn't look terrible

FLOW:
- user types in text to be translated, selects input and output languages
- on submit, new 'message' object is created in Firebase realtime db
- message is processed with Google Translate API => text translation
- text translation is then processed through Speech Synthesis
    (WHERE DO WE PUT THIS CODE?!??)

    var synth = window.speechSynthesis
    var utterThis = new SpeechSynthesisUtterance( translation text string )
    synth.speak(utterThis)

-------------------------- */
