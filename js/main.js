var randomNumber;
var questionBase;
var answerBase;

$(document).ready(function() {
	// Define the bases questions will be asked in
	var bases = [2, 8, 10, 16];

	// Define the element that will be replaced by the generated number
	var element = ".randomNumber";
	
	// Define the element that will be replaced by the generated answer base
	var answerElement = ".answerBase";

	generateNumberAndShowToScreen(bases, element);
	generateBaseToConvertTo(bases, answerElement);

	$(".answerForm").submit(function() {
		if ( parseInt( $(".answerForm input").val() ) == (randomNumber >>> 0).toString(answerBase)) {
			$(".answerForm .form-group").removeClass("has-error");
			$(".answerForm .form-group").addClass("has-success");
		}

		else {
			$(".answerForm .form-group").removeClass("has-success");
			$(".answerForm .form-group").addClass("has-error");
		}

		return false;
	});
});

// Take in an array of bases, and the element we want to replace to show the generated number
function generateNumberAndShowToScreen(bases, element) {
	// The selected base is randomly selected from the 'bases' array
	questionBase = bases[ Math.floor( Math.random() * bases.length ) ];

	// The random decimal number to be converted...
	randomNumber = Math.floor(Math.random() * 100);

	// Convert the randomNumber to the base, utilising a solution found here:
	// http://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
	var randomNumberInBase = (randomNumber >>> 0).toString(questionBase);

	// Add the random number to the DOM
	$(element).html(randomNumberInBase + "<sub>" + questionBase + "</sub>");
}

// Take in an array of bases, and the element we want to replace to show the generated number
function generateBaseToConvertTo(bases, element) {
	
	do {
		
		answerBase = bases[ Math.floor( Math.random() * bases.length ) ];
		
	} while( answerBase == questionBase );

	// Add the random number to the DOM
	$(element).html("What is this in base " + answerBase + "?");
}