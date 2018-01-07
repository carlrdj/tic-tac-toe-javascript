var selectSymbolX = document.getElementById("selectSymbolX");
var selectSymbolO = document.getElementById("selectSymbolO");
var lineSquares = document.getElementById("lineSquare");
var containerTicTacToe = document.getElementById("containerTicTacToe");
var namePlayer1 = document.getElementById("namePlayer1").value;
var namePlayer2 = document.getElementById("namePlayer2").value;
var won = document.getElementById("won");

var symbolPlayer1 = 0; 
var symbolPlayer2 = 1; 
var turn;
var turnStart;
var turns = 0;
var markedBoxes;
var colorBoxesWinnner;
var colorLines;
var colorLineSquare;
var colorContainerTicTacToe;
if (localStorage.getItem("color")) {
	changeColor(localStorage.getItem("color"));
}else{
	changeColor('red');
}
function changeColor(color){
	localStorage.setItem("color", color);
	for (var i = 0; i < 9; i++) {
		tdBox= document.getElementById("tdBox"+i);
		tdBox.classList.replace("boxesWinnner-" + colorBoxesWinnner, "boxesWinnner-" + color);
	}

	colorBoxesWinnner = color;
	lineSquares.classList.remove("colorLineSquare-" + colorLineSquare);
	lineSquares.classList.add("colorLineSquare-" + color);
	colorLineSquare = color;
	containerTicTacToe.classList.remove("container-tic-tac-toe-" + colorContainerTicTacToe);
	containerTicTacToe.classList.add("container-tic-tac-toe-" + color);
	colorContainerTicTacToe = color;
}
reset();
//var boxesMarkedWithX = [];
//var boxesMarkedWithO = [];
selectSymbol(0);
function selectSymbol(symbol){
	if (turns == 0) {
		if (symbol == 1) {
			symbolPlayer1 = symbol;
			turnStart = turn = 1;
			selectSymbolX.classList.remove("symbol-active");
			selectSymbolO.classList.add("symbol-active");
		}else{
			symbolPlayer1 = symbol;
			turnStart = turn = 0;
			selectSymbolO.classList.remove("symbol-active");
			selectSymbolX.classList.add("symbol-active");
		}		
	}
}

function checkBox(number){	
	if (markedBoxes[number][1] == null && turns < 9) {
		markedBoxes[number][1] = turn;
		var box = document.getElementById("box"+number);

		turns++;
		if (turns > 4) {
			checkThreeInARow(turn);
		}
		if (turn == 0) { 
			turn = 1;
			box.classList.add("ion-android-close");
		}else{
			turn = 0; 
			box.classList.add("ion-android-radio-button-off");
		}
	}
}


var winningResults = [];
winningResults.push([0,1,2]);
winningResults.push([0,4,8]);
winningResults.push([0,3,6]);
winningResults.push([1,4,7]);
winningResults.push([2,4,6]);
winningResults.push([2,5,8]);
winningResults.push([3,4,5]);
winningResults.push([5,4,3]);
winningResults.push([6,7,8]);

function checkThreeInARow(turn){
	var checks = 0;
	var tdBox;
	for (var i = 0; i < winningResults.length; i++) {
		checks = 0;	
		if (markedBoxes[winningResults[i][0]][1] == turn) { checks++; }
		if (markedBoxes[winningResults[i][1]][1] == turn) { checks++; }
		if (markedBoxes[winningResults[i][2]][1] == turn) { checks++; }
		
		if (checks>=3) {
			turns = 9;
			tdBox= document.getElementById("tdBox"+winningResults[i][0]);
			tdBox.classList.add("boxesWinnner-" + colorBoxesWinnner);
			tdBox = document.getElementById("tdBox"+winningResults[i][1]);
			tdBox.classList.add("boxesWinnner-" + colorBoxesWinnner);
			tdBox = document.getElementById("tdBox"+winningResults[i][2]);
			tdBox.classList.add("boxesWinnner-" + colorBoxesWinnner);
			if (symbolPlayer1 == turn) {
				console.log(namePlayer1 + " ganó !!!!");
				showModal(namePlayer1);
			}else{
				console.log(namePlayer2 + " ganó !!!!");	
				showModal(namePlayer2);			
			}
		}
	}
}

function reset(){
	turn = turnStart;
	markedBoxes = [[0, null], [1, null], [2, null], [3, null], [4, null], [5, null], [6, null], [7, null], [8, null]];
	turns = 0;
	for (var i = 0; i < 9; i++) {
		var box = document.getElementById("box"+i);
		box.classList.remove("ion-android-close");
		box.classList.remove("ion-android-radio-button-off");
		var tdBox = document.getElementById("tdBox"+i);
		tdBox.classList.remove("boxesWinnner-" + colorBoxesWinnner);
	}
	hideModal();
}

function showModal(winner){
	//one to seven
  $('#modal-container').removeAttr('class').addClass('one');
  $('#containerTicTacToe').addClass('modal-active');
  won.innerHTML = winner;
}

function hideModal() {	
  $('#modal-container').addClass('out');
  $('#containerTicTacToe').removeClass('modal-active');
}

$('#modal-container').click(function(){
	reset();
	hideModal();
});