var randomNumber;
var questionBase;
var answerBase;
var score = 0;
var gameMode;
var gameModes;

$(document).ready(function() {
	/* VARIABLES */

	// Define the bases questions will be asked in
	var bases = [2, 8, 10, 16];

	// Define the element that will be replaced by the generated number
	var element = ".randomNumber";
	
	// Define the element that will be replaced by the generated answer base
	var answerElement = ".answerBase";

	// Define the element that will be replaced by the current score
	var scoreElement = ".score";
	
	// Define the element that will have an animation applied when the question is answered successfully
	var tickElement = ".tick";

	// Define the available game modes
	gameModes = {
		EASY: 1,
		MEDIUM: 2,
		HARD: 3,
	};

	/* END VARIABLES */

	/* SET THE CURRENT GAME MODE */
	// By default, the game is set to easy
	gameMode = gameModes.EASY;
	$(".randomNumber").css("color", "#4cae4c");

	$(".easy").click(function() { 
		gameMode = gameModes.EASY;
		generateNumberAndShowToScreen(bases, element);
		generateBaseToAnswerIn(bases, answerElement);
		$(".randomNumber").css("color", "#4cae4c");
	});

	$(".medium").click(function() { 
		gameMode = gameModes.MEDIUM;
		generateNumberAndShowToScreen(bases, element);
		generateBaseToAnswerIn(bases, answerElement);
		$(".randomNumber").css("color", "#eea236");
	});

	$(".hard").click(function() { 
		gameMode = gameModes.HARD;
		generateNumberAndShowToScreen(bases, element);
		generateBaseToAnswerIn(bases, answerElement);
		$(".randomNumber").css("color", "#d43f3a");
	});

	updateScore(scoreElement);

	generateNumberAndShowToScreen(bases, element);
	generateBaseToAnswerIn(bases, answerElement);

	$(".answerForm").submit(function() {
		if ( parseInt( $(".answerForm input").val(), answerBase ) == randomNumber) {
			$(".answerForm .form-group").removeClass("has-error");
			$(".answerForm .form-group").addClass("has-success");

			score++;
			updateScore(scoreElement);
			
			displayCorrectAnswerAnimation(tickElement);

			generateNumberAndShowToScreen(bases, element);
			generateBaseToAnswerIn(bases, answerElement);


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
	switch (gameMode) {
		case gameModes.EASY:
			randomNumber = Math.floor(Math.random() * 50);
			break;
		case gameModes.MEDIUM:
			randomNumber = Math.floor(Math.random() * 100);
			break;
		case gameModes.HARD:
			randomNumber = Math.floor(Math.random() * 2000);
			break;
	}
	

	// Convert the randomNumber to the base, utilising a solution found here:
	// http://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
	var randomNumberInBase = (randomNumber >>> 0).toString(questionBase);

	// Add the random number to the DOM
	$(element).html(randomNumberInBase + "<sub>" + questionBase + "</sub>");
}

// Take in an array of bases, and the element we want to replace to show the generated number
function generateBaseToAnswerIn(bases, element) {
	
	// Generate a base for the question to be converted to and make sure
	// that the answer's base is not the same as the answer's base
	do {
		
		answerBase = bases[ Math.floor( Math.random() * bases.length ) ];
		
	} while( answerBase == questionBase );

	// Add the random number to the DOM
	$(element).html("What is this in base " + answerBase + "?");

	$(".answerForm input").val("");
}

// Take in element to be used as the score, and update to the latest score
function updateScore(element) {
	$(element).text(score);
}

function displayCorrectAnswerAnimation (element) {
	$(element).css("display", "inline-block");
	$(".randomNumber").css("display", "none");
	$(element).addClass("zoomIn");
	
	setTimeout(function() {
		$(element).removeClass("zoomIn");
		$(element).addClass("zoomOut");
		
		setTimeout(function() {
			$(element).removeClass("zoomOut").css("display", "none");
			$(".randomNumber").css("display", "inline-block");
		}, 200)
		
	}, 700);
}