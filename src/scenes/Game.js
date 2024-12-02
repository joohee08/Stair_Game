// You can write more code here

/* START OF COMPILED CODE */

class Game extends Phaser.Scene {

	constructor() {
		super("Game");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// office_bg
		const office_bg = this.add.image(641, -1107, "office_bg");
		office_bg.name = "office_bg";
		office_bg.scaleX = 1.6;
		office_bg.scaleY = 1.52;

		// cat1
		const cat1 = this.add.image(674, 566, "cat1");
		cat1.name = "cat1";
		cat1.scaleX = 0.6;
		cat1.scaleY = 0.6;

		// rightbtn1
		const rightbtn1 = this.add.image(1111, 656, "rightbtn1");
		rightbtn1.name = "rightbtn1";
		rightbtn1.scaleX = 0.3;
		rightbtn1.scaleY = 0.3;

		// leftbtn1
		const leftbtn1 = this.add.image(187, 654, "leftbtn1");
		leftbtn1.name = "leftbtn1";
		leftbtn1.scaleX = 0.3;
		leftbtn1.scaleY = 0.3;

		// blue1
		const blue1 = this.add.container(236, 382);
		blue1.name = "blue1";

		// bluebk1
		const bluebk1 = this.add.image(17, 0, "bluebk");
		bluebk1.name = "bluebk1";
		bluebk1.scaleX = 0.8;
		bluebk1.scaleY = 0.8;
		blue1.add(bluebk1);

		// cloud1
		const cloud1 = this.add.image(2, 67, "cloud");
		cloud1.name = "cloud1";
		cloud1.scaleX = 0.3;
		cloud1.scaleY = 0.3;
		blue1.add(cloud1);

		// o1
		const o1 = this.add.image(0, 70, "o");
		o1.name = "o1";
		o1.scaleX = 0.2;
		o1.scaleY = 0.2;
		blue1.add(o1);

		// pink1
		const pink1 = this.add.container(1007, 388);
		pink1.name = "pink1";

		// pinkbk1
		const pinkbk1 = this.add.image(23, 0, "pinkbk");
		pinkbk1.name = "pinkbk1";
		pinkbk1.scaleX = 0.8;
		pinkbk1.scaleY = 0.8;
		pink1.add(pinkbk1);

		// cloud2-1
		const cloud2_1 = this.add.image(6, 54, "cloud");
		cloud2_1.name = "cloud2-1";
		cloud2_1.scaleX = 0.3;
		cloud2_1.scaleY = 0.3;
		pink1.add(cloud2_1);

		// x1
		const x1 = this.add.image(0, 59, "x");
		x1.name = "x1";
		x1.scaleX = 0.35;
		x1.scaleY = 0.35;
		pink1.add(x1);

		// blue2
		const blue2 = this.add.container(236, 382);
		blue2.name = "blue2";

		// bluebk2
		const bluebk2 = this.add.image(17, 0, "bluebk");
		bluebk2.name = "bluebk2";
		bluebk2.scaleX = 0.8;
		bluebk2.scaleY = 0.8;
		blue2.add(bluebk2);

		// cloud1-2
		const cloud1_2 = this.add.image(2, 67, "cloud");
		cloud1_2.name = "cloud1-2";
		cloud1_2.scaleX = 0.3;
		cloud1_2.scaleY = 0.3;
		blue2.add(cloud1_2);

		// o2
		const o2 = this.add.image(0, 70, "o");
		o2.name = "o2";
		o2.scaleX = 0.2;
		o2.scaleY = 0.2;
		blue2.add(o2);

		// blue3
		const blue3 = this.add.container(236, 382);
		blue3.name = "blue3";

		// bluebk3
		const bluebk3 = this.add.image(17, 0, "bluebk");
		bluebk3.name = "bluebk3";
		bluebk3.scaleX = 0.8;
		bluebk3.scaleY = 0.8;
		blue3.add(bluebk3);

		// cloud1-3
		const cloud1_3 = this.add.image(2, 67, "cloud");
		cloud1_3.name = "cloud1-3";
		cloud1_3.scaleX = 0.3;
		cloud1_3.scaleY = 0.3;
		blue3.add(cloud1_3);

		// o3
		const o3 = this.add.image(0, 70, "o");
		o3.name = "o3";
		o3.scaleX = 0.2;
		o3.scaleY = 0.2;
		blue3.add(o3);

		// blue4
		const blue4 = this.add.container(236, 382);
		blue4.name = "blue4";

		// bluebk4
		const bluebk4 = this.add.image(17, 0, "bluebk");
		bluebk4.name = "bluebk4";
		bluebk4.scaleX = 0.8;
		bluebk4.scaleY = 0.8;
		blue4.add(bluebk4);

		// cloud1-4
		const cloud1_4 = this.add.image(2, 67, "cloud");
		cloud1_4.name = "cloud1-4";
		cloud1_4.scaleX = 0.3;
		cloud1_4.scaleY = 0.3;
		blue4.add(cloud1_4);

		// o4
		const o4 = this.add.image(0, 70, "o");
		o4.name = "o4";
		o4.scaleX = 0.2;
		o4.scaleY = 0.2;
		blue4.add(o4);

		// blue5
		const blue5 = this.add.container(236, 382);
		blue5.name = "blue5";

		// bluebk5
		const bluebk5 = this.add.image(17, 0, "bluebk");
		bluebk5.name = "bluebk5";
		bluebk5.scaleX = 0.8;
		bluebk5.scaleY = 0.8;
		blue5.add(bluebk5);

		// cloud1-5
		const cloud1_5 = this.add.image(2, 67, "cloud");
		cloud1_5.name = "cloud1-5";
		cloud1_5.scaleX = 0.3;
		cloud1_5.scaleY = 0.3;
		blue5.add(cloud1_5);

		// o5
		const o5 = this.add.image(0, 70, "o");
		o5.name = "o5";
		o5.scaleX = 0.2;
		o5.scaleY = 0.2;
		blue5.add(o5);

		// pink2
		const pink2 = this.add.container(1007, 388);
		pink2.name = "pink2";

		// pinkbk2
		const pinkbk2 = this.add.image(23, 0, "pinkbk");
		pinkbk2.name = "pinkbk2";
		pinkbk2.scaleX = 0.8;
		pinkbk2.scaleY = 0.8;
		pink2.add(pinkbk2);

		// cloud2-2
		const cloud2_2 = this.add.image(6, 54, "cloud");
		cloud2_2.name = "cloud2-2";
		cloud2_2.scaleX = 0.3;
		cloud2_2.scaleY = 0.3;
		pink2.add(cloud2_2);

		// x2
		const x2 = this.add.image(0, 59, "x");
		x2.name = "x2";
		x2.scaleX = 0.35;
		x2.scaleY = 0.35;
		pink2.add(x2);

		// pink3
		const pink3 = this.add.container(1007, 388);
		pink3.name = "pink3";

		// pinkbk3
		const pinkbk3 = this.add.image(23, 0, "pinkbk");
		pinkbk3.name = "pinkbk3";
		pinkbk3.scaleX = 0.8;
		pinkbk3.scaleY = 0.8;
		pink3.add(pinkbk3);

		// cloud2-3
		const cloud2_3 = this.add.image(6, 54, "cloud");
		cloud2_3.name = "cloud2-3";
		cloud2_3.scaleX = 0.3;
		cloud2_3.scaleY = 0.3;
		pink3.add(cloud2_3);

		// x3
		const x3 = this.add.image(0, 59, "x");
		x3.name = "x3";
		x3.scaleX = 0.35;
		x3.scaleY = 0.35;
		pink3.add(x3);

		// pink4
		const pink4 = this.add.container(1007, 388);
		pink4.name = "pink4";

		// pinkbk4
		const pinkbk4 = this.add.image(23, 0, "pinkbk");
		pinkbk4.name = "pinkbk4";
		pinkbk4.scaleX = 0.8;
		pinkbk4.scaleY = 0.8;
		pink4.add(pinkbk4);

		// cloud2-4
		const cloud2_4 = this.add.image(6, 54, "cloud");
		cloud2_4.name = "cloud2-4";
		cloud2_4.scaleX = 0.3;
		cloud2_4.scaleY = 0.3;
		pink4.add(cloud2_4);

		// x4
		const x4 = this.add.image(0, 59, "x");
		x4.name = "x4";
		x4.scaleX = 0.35;
		x4.scaleY = 0.35;
		pink4.add(x4);

		// pink5
		const pink5 = this.add.container(1007, 388);
		pink5.name = "pink5";

		// pinkbk5
		const pinkbk5 = this.add.image(23, 0, "pinkbk");
		pinkbk5.name = "pinkbk5";
		pinkbk5.scaleX = 0.8;
		pinkbk5.scaleY = 0.8;
		pink5.add(pinkbk5);

		// cloud2-5
		const cloud2_5 = this.add.image(6, 54, "cloud");
		cloud2_5.name = "cloud2-5";
		cloud2_5.scaleX = 0.3;
		cloud2_5.scaleY = 0.3;
		pink5.add(cloud2_5);

		// x5
		const x5 = this.add.image(0, 59, "x");
		x5.name = "x5";
		x5.scaleX = 0.35;
		x5.scaleY = 0.35;
		pink5.add(x5);

		// box
		const box = this.add.image(647, 160, "box");
		box.name = "box";

		// questionText
		const questionText = this.add.text(480, 127, "", {});
		questionText.name = "questionText";
		questionText.text = "문제";
		questionText.setStyle({ "align": "center", "color": "#000000ff", "fontFamily": "Arial", "fontSize": "24px" });
		questionText.setLineSpacing(4);
		questionText.setWordWrapWidth(380);

		// quizbox
		const quizbox = this.add.image(644, 42, "quizbox");
		quizbox.name = "quizbox";
		quizbox.scaleX = 1.25;
		quizbox.scaleY = 1.05;

		// quiznum
		const quiznum = this.add.text(588, 23, "", {});
		quiznum.name = "quiznum";
		quiznum.text = "퀴즈번호";
		quiznum.setStyle({ "color": "#000000ff", "fontFamily": "Arial", "fontSize": "27px" });
		quiznum.setWordWrapWidth(380);

		// FiveStars
		const fiveStars = this.add.container(57, 55);
		fiveStars.name = "FiveStars";

		// star_off1
		const star_off1 = this.add.image(0, 0, "star_off");
		star_off1.name = "star_off1";
		star_off1.scaleX = 0.2;
		star_off1.scaleY = 0.2;
		fiveStars.add(star_off1);

		// star_off3
		const star_off3 = this.add.image(137, 0, "star_off");
		star_off3.name = "star_off3";
		star_off3.scaleX = 0.2;
		star_off3.scaleY = 0.2;
		fiveStars.add(star_off3);

		// star_off2
		const star_off2 = this.add.image(70, 0, "star_off");
		star_off2.name = "star_off2";
		star_off2.scaleX = 0.2;
		star_off2.scaleY = 0.2;
		fiveStars.add(star_off2);

		// star_off5
		const star_off5 = this.add.image(272, 0, "star_off");
		star_off5.name = "star_off5";
		star_off5.scaleX = 0.2;
		star_off5.scaleY = 0.2;
		fiveStars.add(star_off5);

		// star_off4
		const star_off4 = this.add.image(204, 0, "star_off");
		star_off4.name = "star_off4";
		star_off4.scaleX = 0.2;
		star_off4.scaleY = 0.2;
		fiveStars.add(star_off4);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write more your code here

	preload() {
		// explosion.png 파일 로드
		this.load.spritesheet('explosionEffect', 'assets/explosion.png', {
			frameWidth: 171, // 각 프레임의 너비
			frameHeight: 171, // 각 프레임의 높이
		});

		// 스프라이트 시트 로드
		this.load.spritesheet('firework', 'assets/firework.png', {
			frameWidth: 113, // 각 프레임의 너비 (스프라이트 시트에 맞게 설정)
			frameHeight: 115, // 각 프레임의 높이 (스프라이트 시트에 맞게 설정)
			margin: 0, // 필요한 경우 여백 설정
			spacing: 0 // 프레임 간 간격 설정
		});

		//this.load.audio('Firstbgm', '/study/phaser/Project2/Stair_Game/audio/Firstbgm.mp3'); //서버실행시 주석 풀기
		//this.load.audio('buttonclick', '/study/phaser/Project2/Stair_Game/audio/buttonclick.mp3'); //서버실행시 주석 풀기
		//this.load.audio('yes', '/study/phaser/Project2/Stair_Game/audio/yes.mp3'); //서버실행시 주석 풀기
		//this.load.audio('no', '/study/phaser/Project2/Stair_Game/audio/no.mp3'); //서버실행시 주석 풀기
		//this.load.audio('clap', '/study/phaser/Project2/Stair_Game/audio/clap.mp3'); //서버실행시 주석 풀기
		this.load.audio('Firstbgm', 'audio/Firstbgm.mp3');
		this.load.audio('buttonclick', 'audio/buttonclick.mp3');
		this.load.audio('yes', 'audio/yes.mp3');
		this.load.audio('no', 'audio/no.mp3');
		this.load.audio('clap', 'audio/clap.mp3');
	}

	create() {
		this.editorCreate();

		// explosion 애니메이션 생성
		if (!this.anims.exists('explosion')) {
			this.anims.create({
				key: 'explosion',
				frames: this.anims.generateFrameNumbers('explosionEffect', { start: 0, end: 8 }),
				frameRate: 10,
				repeat: 0,
				hideOnComplete: true,
			});
		}
		console.log('애니메이션 생성 완료');

		// 애니메이션 생성
		if (!this.anims.exists('firework')) {
		this.anims.create({
			key: 'firework',
			frames: this.anims.generateFrameNumbers('firework', { start: 0, end: 5 }), // 프레임 범위 설정
			frameRate: 10, // 초당 프레임 수
			repeat: 0, // 반복하지 않음
			hideOnComplete: true // 애니메이션 완료 후 숨김
		});
	}

		// clap 소리 멈추기 (Last 씬에서 참조)
		const lastScene = this.scene.get('Last'); // 'Last' 씬 참조 가져오기
		if (lastScene && lastScene.clapSound && lastScene.clapSound.isPlaying) {
			lastScene.clapSound.stop(); // clap 사운드 멈추기
		}

		// FirstBgm 확인 및 실행
		const existingBgm = this.sound.get('Firstbgm');
		if (existingBgm) {
			if (!existingBgm.isPlaying) {
				existingBgm.play(); // 이미 존재하면 재생만 함
			}
			this.bgm = existingBgm;
		} else {
			this.bgm = this.sound.add('Firstbgm', { loop: true});
			this.bgm.play();
		}

		// Question 객체 초기화
		this.question = new Question(this);
		this.question.initQuestion(); // 초기 질문 설정

		// GameLogic 객체 초기화
		this.gameLogic = new GameLogic(this);
		this.gameLogic.initGame();

		// Life 객체 초기화
		this.life = new Life(this);
		this.life.initLife();
	}

	update() {
		if (this.gameLogic) {
			this.gameLogic.update();
		}
	}
}

export default Game;

/* END OF COMPILED CODE */

// You can write more code here
import Question from './Question.js';
import GameLogic from './GameLogic.js';
import Life from './Life.js';
/* END-USER-CODE */
