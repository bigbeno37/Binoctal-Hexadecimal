$(document).ready(function() {
	// Define the bases questions will be asked in
	var bases = [2, 8, 10, 16];

	// The selected base is randomly selected from the 'bases' array
	var base = bases[ Math.floor( Math.random() * bases.length ) ];

	// The random decimal number to be converted...
	var randomNumber = Math.floor(Math.random() * 100);

	// Convert the randomNumber to the base, utilising a solution found here:
	// http://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
	var randomNumberInBase = (randomNumber >>> 0).toString(base);

	$(".randomNumber").html(randomNumberInBase + "<sub>" + base + "</sub>");
});