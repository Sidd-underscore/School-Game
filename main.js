var db = firebase.firestore();

var prefferedColor = localStorage.getItem('p-color')

var map = {
	tile_size: 10,

	/*
	  
	Key vairables:
	  
	id       [required] - an integer that corresponds with a tile in the data array.
	color    [required] - any javascript compatible color variable.
	solid    [optional] - whether the tile is solid or not, defaults to false.
	bounce   [optional] - how much velocity is preserved upon hitting the tile, 0.5 is half.
	jump     [optional] - whether the player can jump while over the tile, defaults to false.
	friction [optional] - friction of the tile, must have X and Y values (e.g {x:0.5, y:0.5}).
	gravity  [optional] - gravity of the tile, must have X and Y values (e.g {x:0.5, y:0.5}).
	fore     [optional] - whether the tile is drawn in front of the player, defaults to false.
	script   [optional] - refers to a script in the scripts section, executed if it is touched.
	  
	*/

	keys: [
		{ id: 0, color: "#242325", solid: 0 },                        //bg color
		{ id: 1, color: "#888", solid: 0, bounce: 0.35 },             //normal tile
		{ id: 2, color: "#555", solid: 1, bounce: 0.05 },              //border
		{
			id: 3, color: "rgba(121, 220, 242, 0.4)", friction: { x: 0.9, y: 0.9 }, gravity: { x: 0, y: 0.25 }, jump: 1, fore: 1
		},                                                            //water
		{ id: 4, color: "#777", jump: 1, bounce: 0 },                  //elevator
		{ id: 5, color: "#E373FA", solid: 1, bounce: 1.1 },
		{ id: 6, color: "#666", solid: 1, bounce: 0.1 },
		{ id: 7, color: "#73C6FA", solid: 0, script: "question" },      //basic script for questions
		{ id: 8, color: "#FADF73", solid: 0, script: "next_level" },	//yelow tile
		{ id: 9, color: "#C93232", solid: 0, script: "death" },		    //lava
		{ id: 10, color: "#555", solid: 1 }, 						            	//thing that gets replaced with the "unlock" script
		{ id: 11, color: "#0FF", solid: 0, script: "unlock" },		  	//reveals secret passage thing
		{ id: 12, color: "#0FF", solid: 0, script: "sea_unlock1" },
		{ id: 13, color: "white", solid: 1 },
		{ id: 14, color: "rgba(121, 220, 242, 0.4)", solid: 0 },        //complete the sea map		
		{ id: 15, color: "white", solid: 1 },
		{ id: 16, color: "white", solid: 1 },
		{ id: 17, color: "white", solid: 1 },
		{ id: 18, color: "white", solid: 1 },
		{ id: 19, color: "white", solid: 1 },
		{ id: 20, color: "white", solid: 1 },
		{ id: 21, color: "white", solid: 1 },
		{ id: 22, color: "#0FF", solid: 0, script: "sea_unlock2" },
		{ id: 23, color: "#0FF", solid: 0, script: "sea_unlock3" },
		{ id: 24, color: "#0FF", solid: 0, script: "sea_unlock4" },
		{ id: 25, color: "#0FF", solid: 0, script: "sea_unlock5" },
		{ id: 26, color: "#0FF", solid: 0, script: "sea_unlock6" },
		{ id: 27, color: "#0FF", solid: 0, script: "sea_unlock7" },
		{ id: 28, color: "#0FF", solid: 0, script: "sea_unlock8" },
		{ id: 29, color: "lightgreen", solid: 0 },
		{ id: 30, color: "lightyellow", solid: 1 },		               //sand
		{ id: 31, color: "lightblue", solid: 1 },
		{ id: 32, color: "#555", solid: 0, bounce: 0.1 },              // non-solid border
		{ id: 33, color: "white", solid: 1 },                          // sail
		{ id: 34, color: "lightyellow", solid: 0 },		               //fake sand
		{ id: 35, color: "#242325", solid: 0 },		               //fake bg
		{ id: 36, color: "gold", solid: 0, script: "yooooo" },     //treasure
		{ id: 37, color: "#73C6FA", solid: 0, script: "mountain_question1" },      //script for mountain questions
		{ id: 38, color: "#73C6FA", solid: 0, script: "mountain_question2" },      //script for mountain questions
		{ id: 39, color: "#73C6FA", solid: 0, script: "mountain_question3" },      //script for mountain questions
		{ id: 40, color: "#73C6FA", solid: 0, script: "mountain_question4" },      //script for mountain questions
		{ id: 41, color: "#73C6FA", solid: 0, script: "mountain_question5" },      //script for mountain questions
		{ id: 42, color: "#73C6FA", solid: 0, script: "mountain_question6" },      //script for mountain questions
		{ id: 43, color: "#FADF73", solid: 0, script: "verify_mountains" },	//yelow tile
		{ id: 44, color: "#73C6FA", solid: 0, script: "lava_question1" },	//script for lava questions
		{ id: 45, color: "#73C6FA", solid: 0, script: "lava_question2" },	//script for lava questions
		{ id: 46, color: "#73C6FA", solid: 0, script: "lava_question3" },	//script for lava questions
		{ id: 47, color: "#73C6FA", solid: 0, script: "lava_question4" },	//script for lava questions
		{ id: 48, color: "#73C6FA", solid: 0, script: "lava_question5" },	//script for lava questions
		{ id: 49, color: "#73C6FA", solid: 0, script: "lava_question6" },	//script for lava questions
		{ id: 50, color: "#73C6FA", solid: 0, script: "lava_question7" },	//script for lava questions
		{ id: 51, color: "#73C6FA", solid: 0, script: "lava_question8" },	//script for lava questions
		{ id: 52, color: "#FADF73", solid: 0, script: "verify_lava" },	//yelow tile
		{ id: 53, color: "#6c4605", solid: 0 },	//trunk
		{ id: 54, color: "green", solid: 0 },	//leaves
		{ id: 55, color: "#845504", jump: 1, bounce: 0 },                  //trunk elevator
		{ id: 56, color: "#714905", solid: 1 },                  //branch
		{ id: 57, color: "#cd0909", solid: 1 },                  //brick1
		{ id: 58, color: "#e63939", solid: 1 },                  //brick2
		{ id: 59, color: "#592100", solid: 0, script: "rpg1" },                  //door
		{ id: 60, color: "#b90000", solid: 1 },                  //chimney (idk how to spell lol)
		{ id: 61, color: "rgb(500, 500, 500)", solid: 0 },                  //smoke1
		{ id: 62, color: "rgb(500, 500, 500, 75%)", solid: 0 },                  //smoke2
		{ id: 63, color: "rgb(500, 500, 500, 50%)", solid: 0 },                  //smoke3
		{ id: 64, color: "rgb(500, 500, 500, 25%)", solid: 0 },                  //smoke4
		{ id: 65, color: "#592100", solid: 0, script: "rpg1" },                  //turns into the yellow tile in the forest map
		{ id: 66, color: "#73C6FA", script: "forest_question1" },                  //turns into the blue tile in the forest map
		{ id: 67, color: "#73C6FA", script: "forest_question2" },                  //turns into the blue tile in the forest map
		{ id: 68, color: "#73C6FA", script: "forest_question3" },                  //turns into the blue tile in the forest map
		{ id: 69, color: "#73C6FA", script: "forest_question4" },                  //turns into the blue tile in the forest map     haha 69 lol




	],

	data: [],

	/* An array representing the map tiles. Each number corresponds to a key */


	/* Default gravity of the map */

	gravity: {
		x: 0,
		y: 0.3
	},

	/* Velocity limits */

	vel_limit: {
		x: 2,
		y: 10

	},

	/* Movement speed when the key is pressed */

	movement_speed: {
		jump: 6,
		left: 0.3,
		right: 0.3
	},

	/* The coordinates at which the player spawns and the color of the player */

	player: {
		x: 1,
		y: 1,
		color: prefferedColor || "white"
	},

	/* scripts refered to by the "script" variable in the tile keys */

	scripts: {
		question: 'question();this.key.left = false;this.key.up = false;this.key.right = false;',
		next_level: 'nextLevel();this.key.left = false;this.key.up = false;this.key.right = false;',
		death: 'die();this.key.left = false;this.key.up = false;this.key.right = false;',
		unlock: 'unlock();this.key.left = false;this.key.up = false;this.key.right = false;',
		sea_unlock1: 'sea_unlock(12);this.key.left = false;this.key.up = false;this.key.right = false;',
		sea_unlock2: 'sea_unlock(22);this.key.left = false;this.key.up = false;this.key.right = false;',
		sea_unlock3: 'sea_unlock(23);this.key.left = false;this.key.up = false;this.key.right = false;',
		sea_unlock4: 'sea_unlock(24);this.key.left = false;this.key.up = false;this.key.right = false;',
		sea_unlock5: 'sea_unlock(25);this.key.left = false;this.key.up = false;this.key.right = false;',
		sea_unlock6: 'sea_unlock(26);this.key.left = false;this.key.up = false;this.key.right = false;',
		sea_unlock7: 'sea_unlock(27);this.key.left = false;this.key.up = false;this.key.right = false;',
		sea_unlock8: 'sea_unlock(28);this.key.left = false;this.key.up = false;this.key.right = false;',
		sea_complete: 'sea_complete();this.key.left = false;this.key.up = false;this.key.right = false;',

		mountain_question1: 'mountain_question(37);this.key.left = false;this.key.up = false;this.key.right = false;',
		mountain_question2: 'mountain_question(38);this.key.left = false;this.key.up = false;this.key.right = false;',
		mountain_question3: 'mountain_question(39);this.key.left = false;this.key.up = false;this.key.right = false;',
		mountain_question4: 'mountain_question(40);this.key.left = false;this.key.up = false;this.key.right = false;',
		mountain_question5: 'mountain_question(41);this.key.left = false;this.key.up = false;this.key.right = false;',
		mountain_question6: 'mountain_question(42);this.key.left = false;this.key.up = false;this.key.right = false;',
		verify_mountains: 'verify_mountains();this.key.left = false;this.key.up = false;this.key.right = false;',

		lava_question1: 'lava_question(44);this.key.left = false;this.key.up = false;this.key.right = false;',
		lava_question2: 'lava_question(45);this.key.left = false;this.key.up = false;this.key.right = false;',
		lava_question3: 'lava_question(46);this.key.left = false;this.key.up = false;this.key.right = false;',
		lava_question4: 'lava_question(47);this.key.left = false;this.key.up = false;this.key.right = false;',
		lava_question5: 'lava_question(48);this.key.left = false;this.key.up = false;this.key.right = false;',
		lava_question6: 'lava_question(49);this.key.left = false;this.key.up = false;this.key.right = false;',
		lava_question7: 'lava_question(50);this.key.left = false;this.key.up = false;this.key.right = false;',
		lava_question8: 'lava_question(51);this.key.left = false;this.key.up = false;this.key.right = false;',
		verify_lava: 'verify_lava();this.key.left = false;this.key.up = false;this.key.right = false;',

		rpg1: 'forest_rpg1();this.key.left = false;this.key.up = false;this.key.right = false;',
		verify_forest: 'verify_forest();this.key.left = false;this.key.up = false;this.key.right = false;',
		forest_question1: 'forest_question(66);this.key.left = false;this.key.up = false;this.key.right = false;',
		forest_question2: 'forest_question(67);this.key.left = false;this.key.up = false;this.key.right = false;',
		forest_question3: 'forest_question(68);this.key.left = false;this.key.up = false;this.key.right = false;',
		forest_question4: 'forest_question(69);this.key.left = false;this.key.up = false;this.key.right = false;',
		yooooo: 'givePoints(100);nextLevel();this.key.left = false;this.key.up = false;this.key.right = false;',
	}
};




/* extended scripts*/
var colorarray = []

function question() {
	askQ('game.current_map.data[14][30].color = \'#888\';game.current_map.data[14][30].script = \'null\';', 'yes')



}

function unlock() {
	askQ('game.current_map.keys[10].solid = 0;game.current_map.keys[10].color = "#888";game.current_map.keys[11].color = \'#888\';game.current_map.keys[11].script = \'null\';', 'yes')

}


function sea_unlock(id) {
	if (game.current_map.keys[13].solid === 1) {
		askQ('game.current_map.keys[13].solid = 0;game.current_map.keys[13].color = "#888";game.current_map.keys[' + id + '].color = "rgba(121, 220, 242, 0.4)";game.current_map.keys[' + id + '].script = \'null\';', 'yes')
	} else if (game.current_map.keys[15].solid === 1) {
		askQ('game.current_map.keys[15].solid = 0;game.current_map.keys[15].color = "#888";game.current_map.keys[' + id + '].color = "rgba(121, 220, 242, 0.4)";game.current_map.keys[' + id + '].script = \'null\';', 'yes')

	} else if (game.current_map.keys[16].solid === 1) {
		askQ('game.current_map.keys[16].solid = 0;game.current_map.keys[16].color = "#888";game.current_map.keys[' + id + '].color = "rgba(121, 220, 242, 0.4)";game.current_map.keys[' + id + '].script = \'null\';', 'yes')
	} else if (game.current_map.keys[17].solid === 1) {
		askQ('game.current_map.keys[17].solid = 0;game.current_map.keys[17].color = "#888";game.current_map.keys[' + id + '].color = "rgba(121, 220, 242, 0.4)";game.current_map.keys[' + id + '].script = \'null\';', 'yes')
	} else if (game.current_map.keys[18].solid === 1) {
		askQ('game.current_map.keys[18].solid = 0;game.current_map.keys[18].color = "#888";game.current_map.keys[' + id + '].color = "rgba(121, 220, 242, 0.4)";game.current_map.keys[' + id + '].script = \'null\';', 'yes')
	} else if (game.current_map.keys[19].solid === 1) {
		askQ('game.current_map.keys[19].solid = 0;game.current_map.keys[19].color = "#888";game.current_map.keys[' + id + '].color = "rgba(121, 220, 242, 0.4)";game.current_map.keys[' + id + '].script = \'null\';', 'yes')
	} else if (game.current_map.keys[20].solid === 1) {
		askQ('game.current_map.keys[20].solid = 0;game.current_map.keys[20].color = "#888";game.current_map.keys[' + id + '].color = "rgba(121, 220, 242, 0.4)";game.current_map.keys[' + id + '].script = \'null\';', 'yes')
	} else if (game.current_map.keys[21].solid === 1) {
		askQ('game.current_map.keys[21].solid = 0;game.current_map.keys[21].color = "#888";game.current_map.keys[14].color = "gold";game.current_map.keys[14].solid = 0;game.current_map.keys[14].script = "sea_complete";game.current_map.keys[' + id + '].color = "rgba(121, 220, 242, 0.4)";game.current_map.keys[' + id + '].script = \'null\';', 'yes')
	}
}

function sea_complete() {
	nextLevel()
}

let part_rpg = 0
var edna = '../img/edna_normal.png'
var edna_with_tile = '../img/edna_with_tile.png'
var angy_edna = '../img/edna_angy.png'
var edna_img = document.querySelector('.rpg .notyou img')
var edna_talk = document.querySelector('.rpg .notyou span')
var you_talk = document.querySelector('.rpg .youbutnot span.you-talk')
var you = document.querySelector('.rpg .youbutnot div.you')


function forest_rpg1() {
	var q = prompt('Knock on door? (yes/no)')
	if (q === 'yes') {
		if (part_rpg === 14) {
			document.querySelector('.youbutnot').style.display = 'none';
			document.querySelector('.rpg').style.display = 'inherit';
			edna_img.src = angy_edna
			you.style.background = prefferedColor || 'white';
			edna_talk.innerText = 'I TOLD YOU NOT TO DISTURB ME!'
			part_rpg = 15

			return;
		} else {
			alert('You meet a chiken-duck animal called Edna... Do they have the yellow tile to beat this level? Let\'s ask.')
			part_rpg = 1

			document.querySelector('.rpg').style.display = 'inherit';
			edna_img.src = angy_edna
			edna_img.style.display = 'none'
			you.style.background = prefferedColor || 'white';
		}
	}
}

function nextDialogue() {
	if (part_rpg === 1) {
		edna_img.style.display = 'inherit';
		edna_talk.innerText = 'WHO DARES INTERUPT MY READING?!'
		part_rpg = 2;
		return;
	} else if (part_rpg === 2) {
		you_talk.innerText = 'Uh- me?'
		part_rpg = 3;
		return;
	} else if (part_rpg === 3) {
		edna_talk.innerText = 'I CAN SEE THAT! WHAT DO YOU WANT?!'
		part_rpg = 4
	} else if (part_rpg === 4) {
		you_talk.innerText = 'I- uh- Have you seen any yellow tiles anywhere?'
		part_rpg = 5;
		return;
	} else if (part_rpg === 5) {
		edna_img.src = edna
		edna_talk.innerText = 'Yellow tiles? I was intrusted with one a very very very very long time ago by a great wizard called Sidd_. Perhaps it is the one you seek?'
		part_rpg = 6;
		return;
	} else if (part_rpg === 6) {
		you_talk.innerText = 'Yes! Could I see it?!!!!'
		part_rpg = 7;
		return;
	} else if (part_rpg === 7) {
		edna_talk.innerText = 'Hold on, I\'ll bring it out.'
		part_rpg = 8;
		return;
	} else if (part_rpg === 8) {
		edna_img.src = '../img/blank.png';
		edna_talk.innerText = '*Leaves*'
		part_rpg = 9

		return;

	} else if (part_rpg === 9) {
		edna_img.src = edna_with_tile
		edna_talk.innerText = 'Is this is?'
		part_rpg = 10
		return;
	} else if (part_rpg === 10) {
		you_talk.innerText = 'Yes!'
		part_rpg = 11
		return;
	} else if (part_rpg === 11) {
		edna_talk.innerText = 'Alright, you take this and I\'ll go back to reading my book. DO NOT DISTURB ME AGAIN!'
		part_rpg = 12
		return;
	} else if (part_rpg === 12) {
		edna_img.src = '../img/blank.png';

		edna_talk.innerText = '*Leaves*'
		part_rpg = 13
		return;
	} else if (part_rpg === 13) {
		document.querySelector('.rpg').style.display = 'none';
		game.current_map.keys[65].color = "#FADF73";
		game.current_map.keys[65].script = "verify_forest"
		part_rpg = 14
		return;

	} else if (part_rpg === 15) {
		document.querySelector('.rpg').style.display = 'none';

		part_rpg = 14
		return;
	}
}

let completed_forest = 0

function forest_question(id) {
	completed_forest = completed_forest + 1
	askQ('game.current_map.keys[' + id + '].color = "#242325";game.current_map.keys[' + id + '].script = \'null\';', 'yes')
}

function verify_forest() {
	if (completed_forest === 4) {
		nextLevel()
	} else {
		alert('Go back and complete *all* questions!')
	}
}

let underground_qs = 0
let overground_qs = 0

function mountain_question(id) {
	askQ('game.current_map.keys[' + id + '].color = "#242325";game.current_map.keys[' + id + '].script = \'null\';', 'yes')

	//37, 38, 42 = overground
	if (id === 37) {
		overground_qs = overground_qs + 1
	} else if (id === 38) {
		overground_qs = overground_qs + 1
	} else if (id === 42) {
		overground_qs = overground_qs + 1
	} else if (id === 37) {
		overground_qs = overground_qs + 1
	} else {
		underground_qs = underground_qs + 1
	}

}

function verify_mountains() {
	if (overground_qs === 3 && underground_qs === 3) {
		nextLevel()
	} else {
		alert('Go back and complete *all* questions!')
	}
}

let lava_qs = 0


function lava_question(id) {
	askQ('game.current_map.keys[' + id + '].color = \"#242325\";game.current_map.keys[' + id + '].script = \'null\';', 'yes')

	lava_qs = lava_qs + 1

}

function verify_lava() {
	if (lava_qs === 8) {
		nextLevel()
	} else {
		alert('Go back and complete *all* questions!')
	}
}

function die() {
	alert('You died. Reloading map...')
	window.location.reload()
}



function askQ(callback, loop) {
	var questions = [
		{
			"question": "What three values are we guided by?",
			"answer": [
				"respect",
				"responsibility",
				"safety"
			],
			"all_ansers_req": true
		},
		{
			"question": "Name a value we are guided by.",
			"answer": [
				"respect",
				"responsibility",
				"safety"
			],
			"all_ansers_req": false
		},
		{
			"question": "What group of people would be a 'Resource Group'?",
			"answer": [
				"head of school",
				"head",
				"middle school division head",
				"advisor",
				"teacher",
				"counselor",
				"adult employee"
			],
			"all_ansers_req": false
		},
		{
			"question": "What 10nine learner traits are we guided by?",
			"answer": [
				"caring",
				"principled",
				"thinker",
				"communicator",
				"open",
				"risk",
				"balance",
				"reflective",
				"inquirer",
				"knowledgeable"
			],
			"all_ansers_req": true
		},
		{
			"question": "Name any of the 10 learner traits we are guided by.",
			"answer": [
				"caring",
				"principled",
				"thinker",
				"communicator",
				"open",
				"risk",
				"balance",
				"reflective",
				"inquirer",
				"knowledgeable"
			],
			"all_ansers_req": false
		},
		{
			"question": "Respect is critical to what?",
			"answer": [
				"fostering a healthy and thriving school community",
				"community",
				"health",
				"healthy community",
				"communities"
			],
			"all_ansers_req": false
		},
		{
			"question": "When/Where do we show respect?",
			"answer": [
				"community",
				"learning",
				"property",
				"buildings",
				"everywhere",
				"anywhere",
				"all",
				"time",
				"tools",
				"all the time",
				"nature"
			],
			"all_ansers_req": false
		},
		{
			"question": "How do we show respect in a community? Name as many things as possible.",
			"answer": [
				"speak",
				"the way we speak",
				"how we treat people",
				"avoiding harmful behaviors",
				"avoiding harmful",
				"kind",
				"harm",
				"differences",
				"respect"
			],
			"all_ansers_req": false
		},
		{
			"question": "What rights do children have at school regarding respect? Name as many things as possible.",
			"answer": [
				"be at school",
				"equal",
				"attention",
				"deserve",
				"polite",
				"politely",
				"feel",
				"safe",
				"voicing",
				"alone",
				"request",
				"keep",
				"to themselves",
				"to ourselves",
				"no touching",
				"no grabbing"
			],
			"all_ansers_req": false
		},
		{
			"question": "What expectations do children have at school regarding respect?  Name as many as you can.",
			"answer": [
				"considerate",
				"empathy",
				"empathic",
				"accept others",
				"no fighting",
				"abstain from fighting",
				"non-desired sexual action",
				"no sexual",
				"report actions",
				"no disrespect",
				"privacy",
				"repsect privacy",
				"listen to adults",
				"listen",
				"appropriate language",
				"appropriate",
				"no profanity",
				"caring"
			],
			"all_ansers_req": false
		},
		{
			"question": "Name as many acts that are considered violent that you know. Know that these are *absolutely* not allowed",
			"answer": [
				"pushing",
				"shoving",
				"tripping",
				"slapping",
				"kicking",
				"spitting",
				"hitting",
				"biting",
				"grabbing"
			],
			"all_ansers_req": false
		},
		{
			"question": "State one unacceptable non-verbal action.",
			"answer": [
				"gestures",
				"symbols",
				"rudness",
				"rude",
				"disrespect",
				"disrespectful",
				"vulgar",
				"spreading rumors",
				"rumors",
				"rolling",
				"eyes",
				"rolling the eyes",
				"rolling of eyes"
			],
			"all_ansers_req": false
		},
		{
			"question": "How does the French American International School define relational aggression?",
			"answer": [
				"harms",
				"behavior",
				"bad",
				"actions",
				"action",
				"damge",
				"threat of damage",
				"teasing"
			],
			"all_ansers_req": false
		}

	]

	const randomElement = questions[Math.floor(Math.random() * questions.length)];
	var prompted = prompt(randomElement.question)
	if (prompted) {
		var answer = randomElement.answer
		var asnwersreq = randomElement.all_ansers_req
		if (asnwersreq) {
			var isEvery = answer.every(item => prompted.toLowerCase().includes(item));
			if (isEvery === true) {
				alert('Nice! Added 10 points!')
				givePoints(10)
				if (callback) {
					eval(callback)
				}
				return 'correct';

			} else {
				alert('Wrong anser, removed 10 points.')
				removePoints(10)
				if (loop === 'yes') {
					alert('Summoning new question...')
					askQ(callback, loop)
				}
				return 'incorrect';
			}

		} else {
			if (answer.includes(prompted.toLowerCase())) {
				alert('Nice! Added 10 points!')

				givePoints(10)
				if (callback) {
					eval(callback)
				}
				return 'correct';

			} else {
				alert('Wrong anwser, removed 10 points.')
				removePoints(10)
				if (loop === 'yes') {
					alert('Summoning new question...')
					askQ(callback, loop)
				}
				return 'incorrect';


			}
		}
	}
}

function nextLevel() {
	game.current_map.keys[8].solid = 0;
	game.current_map.keys[8].color = "#888";
	game.current_map.keys[8].script = "null";

	var points = getPoints()
	document.querySelector('.bg').style.display = 'inline-flex';
	document.querySelector('.points-scored').innerText = points
	document.querySelector('canvas').style.display = 'none'
	let done = false;

	var docRef = db.collection("players").doc(name);

	docRef.get().then((doc) => {
		if (doc.exists) {
			console.log(doc.data())
			var usersoldpoints = doc.data().score
			var usersmusic = doc.data().music || 'none'
			if (Number.isNaN(usersoldpoints)) {
				db.collection("players").doc(doc.id).set({
					name: name,
					score: parseInt(points),
					music: usersmusic
				});
			} else {
				db.collection("players").doc(doc.id).set({
					name: name,
					score: parseInt(points + usersoldpoints),
					music: usersmusic
				});
			}
		} else {
			// doc.data() will be undefined in this case
			console.log("new player!!!")

			var db_collection = db.collection("players");

			db_collection.doc(name).set({
				name: name,
				score: parseInt(points),
				music: 'none'


			})
		}
	}).catch((error) => {
		console.log("Error getting document:", error);
	});






};

let points = 0

function givePoints(amount) {
	var pointselement = document.querySelector('.points')
	points = points + amount
	pointselement.innerText = points
}

function getPoints() {
	return points;
}


function removePoints(amount) {
	var pointselement = document.querySelector('.points')
	points = points - amount
	pointselement.innerText = points
}


/* Clarity engine */



var Clarity = function() {
	this.alert_errors = true;
	this.log_info = true;
	this.tile_size = 1000000000;
	this.limit_viewport = false;
	this.jump_switch = 0;

	this.viewport = {
		x: 100,
		y: 100
	};

	this.camera = {
		x: 0,
		y: 0
	};

	this.key = {
		left: false,
		right: false,
		up: false
	};

	this.player = {
		loc: {
			x: 0, y: 0
		},

		vel: {
			x: 0, y: 0
		},

		can_jump: true
	};

	window.onkeydown = this.keydown.bind(this);
	window.onkeyup = this.keyup.bind(this);
};

Clarity.prototype.error = function(message) {
	alert(message);
	console.log(message);
};

Clarity.prototype.log = function(message) {
	console.log(message);
	alert(message)
};

Clarity.prototype.set_viewport = function(x, y) {
	this.viewport.x = x;
	this.viewport.y = y;
};

Clarity.prototype.keydown = function(e) {
	var _this = this;

	switch (e.keyCode) {
		case 37: _this.key.left = true; break;
		case 38: _this.key.up = true; break;
		case 39: _this.key.right = true; break;
	}


};

Clarity.prototype.keyup = function(e) {
	var _this = this;

	switch (e.keyCode) {
		case 37: _this.key.left = false; break;
		case 38: _this.key.up = false; break;
		case 39: _this.key.right = false; break;
	}

};


map.data = map_data


Clarity.prototype.load_map = function(map) {
	if (
		typeof map === "undefined" ||
		typeof map.data === "undefined" ||
		typeof map.keys === "undefined"
	) {
		this.error("Error: Invalid map data!");

		return false;
	}

	this.current_map = map;

	this.current_map.background = map.background || "#242325";
	this.current_map.gravity = map.gravity || { x: 0, y: 0.1 };
	this.tile_size = map.tile_size || 16;

	var _this = this;

	this.current_map.width = 0;
	this.current_map.height = 0;

	map.keys.forEach(function(key) {
		map.data.forEach(function(row, y) {
			_this.current_map.height = Math.max(_this.current_map.height, y);
			row.forEach(function(tile, x) {
				_this.current_map.width = Math.max(_this.current_map.width, x);
				if (tile == key.id) _this.current_map.data[y][x] = key;
			});
		});
	});

	this.current_map.width_p = this.current_map.width * this.tile_size;
	this.current_map.height_p = this.current_map.height * this.tile_size;

	this.player.loc.x = map.player.x * this.tile_size || 0;
	this.player.loc.y = map.player.y * this.tile_size || 0;
	this.player.color = map.player.color || "#000";

	this.key.left = false;
	this.key.up = false;
	this.key.right = false;

	this.camera = {
		x: 0,
		y: 0
	};

	this.player.vel = {
		x: 0,
		y: 0
	};


	return true;
};



Clarity.prototype.get_tile = function(x, y) {
	return this.current_map.data[y] && this.current_map.data[y][x]
		? this.current_map.data[y][x]
		: 0;
};

Clarity.prototype.draw_tile = function(x, y, tile, context) {
	if (!tile || !tile.color) return;

	context.fillStyle = tile.color;
	context.fillRect(x, y, this.tile_size, this.tile_size);
};

Clarity.prototype.draw_map = function(context, fore) {
	for (var y = 0; y < this.current_map.data.length; y++) {
		for (var x = 0; x < this.current_map.data[y].length; x++) {
			if ((!fore && !this.current_map.data[y][x].fore) || (fore && this.current_map.data[y][x].fore)) {
				var t_x = x * this.tile_size - this.camera.x; var t_y = y * this.tile_size - this.camera.y;
				if (t_x < -this.tile_size || t_y < -this.tile_size || t_x > this.viewport.x || t_y > this.viewport.y) continue;
				this.draw_tile(t_x, t_y, this.current_map.data[y][x], context);
			}
		}
	}

	if (!fore) this.draw_map(context, true);
};

Clarity.prototype.move_player = function() {
	var tX = this.player.loc.x + this.player.vel.x;
	var tY = this.player.loc.y + this.player.vel.y;

	var offset = Math.round(this.tile_size / 2 - 1);

	var tile = this.get_tile(
		Math.round(this.player.loc.x / this.tile_size),
		Math.round(this.player.loc.y / this.tile_size)
	);

	if (tile.gravity) {
		this.player.vel.x += tile.gravity.x;
		this.player.vel.y += tile.gravity.y;
	} else {
		this.player.vel.x += this.current_map.gravity.x;
		this.player.vel.y += this.current_map.gravity.y;
	}

	if (tile.friction) {
		this.player.vel.x *= tile.friction.x;
		this.player.vel.y *= tile.friction.y;
	}

	var t_y_up = Math.floor(tY / this.tile_size);
	var t_y_down = Math.ceil(tY / this.tile_size);
	var y_near1 = Math.round((this.player.loc.y - offset) / this.tile_size);
	var y_near2 = Math.round((this.player.loc.y + offset) / this.tile_size);

	var t_x_left = Math.floor(tX / this.tile_size);
	var t_x_right = Math.ceil(tX / this.tile_size);
	var x_near1 = Math.round((this.player.loc.x - offset) / this.tile_size);
	var x_near2 = Math.round((this.player.loc.x + offset) / this.tile_size);

	var top1 = this.get_tile(x_near1, t_y_up);
	var top2 = this.get_tile(x_near2, t_y_up);
	var bottom1 = this.get_tile(x_near1, t_y_down);
	var bottom2 = this.get_tile(x_near2, t_y_down);
	var left1 = this.get_tile(t_x_left, y_near1);
	var left2 = this.get_tile(t_x_left, y_near2);
	var right1 = this.get_tile(t_x_right, y_near1);
	var right2 = this.get_tile(t_x_right, y_near2);

	if (tile.jump && this.jump_switch > 15) {
		this.player.can_jump = true;

		this.jump_switch = 0;
	} else this.jump_switch++;

	this.player.vel.x = Math.min(
		Math.max(this.player.vel.x, -this.current_map.vel_limit.x),
		this.current_map.vel_limit.x
	);
	this.player.vel.y = Math.min(
		Math.max(this.player.vel.y, -this.current_map.vel_limit.y),
		this.current_map.vel_limit.y
	);

	this.player.loc.x += this.player.vel.x;
	this.player.loc.y += this.player.vel.y;

	this.player.vel.x *= 0.9;

	if (left1.solid || left2.solid || right1.solid || right2.solid) {
		/* fix overlap */

		while (this.get_tile(Math.floor(this.player.loc.x / this.tile_size), y_near1).solid || this.get_tile(Math.floor(this.player.loc.x / this.tile_size), y_near2).solid
		) this.player.loc.x += 0.1;

		while (this.get_tile(Math.ceil(this.player.loc.x / this.tile_size), y_near1).solid || this.get_tile(Math.ceil(this.player.loc.x / this.tile_size), y_near2).solid
		) this.player.loc.x -= 0.1;

		/* tile bounce */

		var bounce = 0;

		if (left1.solid && left1.bounce > bounce) bounce = left1.bounce;
		if (left2.solid && left2.bounce > bounce) bounce = left2.bounce;
		if (right1.solid && right1.bounce > bounce) bounce = right1.bounce;
		if (right2.solid && right2.bounce > bounce) bounce = right2.bounce;

		this.player.vel.x *= -bounce || 0;
	}

	if (top1.solid || top2.solid || bottom1.solid || bottom2.solid) {
		/* fix overlap */

		while (this.get_tile(x_near1, Math.floor(this.player.loc.y / this.tile_size)).solid || this.get_tile(x_near2, Math.floor(this.player.loc.y / this.tile_size)).solid
		) this.player.loc.y += 0.1;

		while (this.get_tile(x_near1, Math.ceil(this.player.loc.y / this.tile_size)).solid || this.get_tile(x_near2, Math.ceil(this.player.loc.y / this.tile_size)).solid
		) this.player.loc.y -= 0.1;

		/* tile bounce */

		var bounce = 0;

		if (top1.solid && top1.bounce > bounce) bounce = top1.bounce;
		if (top2.solid && top2.bounce > bounce) bounce = top2.bounce;
		if (bottom1.solid && bottom1.bounce > bounce) bounce = bottom1.bounce;
		if (bottom2.solid && bottom2.bounce > bounce) bounce = bottom2.bounce;

		this.player.vel.y *= -bounce || 0;

		if ((bottom1.solid || bottom2.solid) && !tile.jump) {
			this.player.on_floor = true; this.player.can_jump = true;
		}
	}

	// adjust camera

	var c_x = Math.round(this.player.loc.x - this.viewport.x / 2);
	var c_y = Math.round(this.player.loc.y - this.viewport.y / 2);
	var x_dif = Math.abs(c_x - this.camera.x);
	var y_dif = Math.abs(c_y - this.camera.y);

	if (x_dif > 5) {
		var mag = Math.round(Math.max(1, x_dif * 0.1));

		if (c_x != this.camera.x) {
			this.camera.x += c_x > this.camera.x ? mag : -mag;
			if (this.limit_viewport) {
				this.camera.x = Math.min(this.current_map.width_p - this.viewport.x + this.tile_size, this.camera.x);
				this.camera.x = Math.max(0, this.camera.x);
			}
		}
	}

	if (y_dif > 5) {
		var mag = Math.round(Math.max(1, y_dif * 0.1));

		if (c_y != this.camera.y) {
			this.camera.y += c_y > this.camera.y ? mag : -mag;
			if (this.limit_viewport) {
				this.camera.y = Math.min(this.current_map.height_p - this.viewport.y + this.tile_size, this.camera.y);
				this.camera.y = Math.max(0, this.camera.y);
			}
		}
	}

	if (this.last_tile != tile.id && tile.script) {
		eval(this.current_map.scripts[tile.script]);
		this.key.left = false;
		this.key.up = false;
		this.key.right = false;
	}



	this.last_tile = tile.id;
};

Clarity.prototype.update_player = function() {
	if (this.key.left) {
		if (this.player.vel.x > -this.current_map.vel_limit.x) this.player.vel.x -= this.current_map.movement_speed.left;
	}

	if (this.key.up) {
		if (this.player.can_jump && this.player.vel.y > -this.current_map.vel_limit.y
		) {
			this.player.vel.y -= this.current_map.movement_speed.jump; this.player.can_jump = false;
		}
	}

	if (this.key.right) {
		if (this.player.vel.x < this.current_map.vel_limit.x) this.player.vel.x += this.current_map.movement_speed.left;
	}

	this.move_player();
};



Clarity.prototype.draw_player = function(context) {
	context.fillStyle = this.player.color;

	context.beginPath();

	context.arc(
		this.player.loc.x + this.tile_size / 2 - this.camera.x,
		this.player.loc.y + this.tile_size / 2 - this.camera.y,
		this.tile_size / 2 - 1,
		0,
		Math.PI * 2
	);

	context.fill();
};

Clarity.prototype.update = function() {
	this.update_player();
};

Clarity.prototype.draw = function(context) {
	this.draw_map(context, false);
	this.draw_player(context);
};

/* Setup of the engine */

window.requestAnimFrame =
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback) {
		return window.setTimeout(callback, 1000 / 60);
	};

var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");

canvas.height = document.body.clientHeight; //document.height is obsolete
canvas.width = document.body.clientWidth; //document.width is obsolete

var game = new Clarity();
game.set_viewport(canvas.width, canvas.height);
game.load_map(map);

game.limit_viewport = false;

var Loop = function() {
	ctx.fillStyle = "#242325";
	ctx.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);

	game.update();
	game.draw(ctx);

	window.requestAnimFrame(Loop);

};
Loop();
var head = document.querySelector('head')





firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		name = user.displayName;
		email = user.email;
		if (name) {
			//music
			let db = firebase.firestore()
			var docRef = db.collection("players").doc(name.toString());

			docRef.get().then((doc) => {
				if (doc.exists) {
					let waiting = true
					document.addEventListener('keydown', function(e) {
						if (waiting === true) {
							const audioo = doc.data().music

							var audio = new Audio(audioo);
							if (typeof audio.loop == 'boolean') {
								audio.loop = true;
							}
							else {
								audio.addEventListener('ended', function() {
									this.currentTime = 0;
									this.play();
								}, false);
							}
							audio.play();

							console.log(audio)
							waiting = false;
						}
					});

				}
			}).catch((error) => {
				console.log("Error getting document:", error);
			});






		} else {
			console.log('no name')
		}
	} else {
		window.location.href = "../index.html"
	}
});

