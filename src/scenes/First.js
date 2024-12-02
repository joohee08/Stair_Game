
// You can write more code here

/* START OF COMPILED CODE */

class First extends Phaser.Scene {

	constructor() {
		super("First");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		const background = this.add.image(640, 358, "background");
		background.name = "background";

		// mat
		const mat = this.add.image(646, 656, "mat");
		mat.name = "mat";
		mat.scaleX = 1.25;

		// chair
		const chair = this.add.image(648, 457, "chair");
		chair.name = "chair";
		chair.scaleX = 1.15;
		chair.scaleY = 1.1;

		// desk
		const desk = this.add.image(643, 543, "desk");
		desk.name = "desk";
		desk.scaleX = 1.1;

		// cat3
		const cat3 = this.add.image(598, 364, "cat3");
		cat3.name = "cat3";
		cat3.scaleX = 0.6;
		cat3.scaleY = 0.6;

		// pencilholder
		const pencilholder = this.add.image(823, 419, "pencilholder");
		pencilholder.name = "pencilholder";
		pencilholder.scaleX = 0.45;
		pencilholder.scaleY = 0.45;

		// subtable
		const subtable = this.add.image(1086, 527, "subtable");
		subtable.name = "subtable";
		subtable.scaleX = 0.75;
		subtable.scaleY = 0.75;

		// subtable_1
		const subtable_1 = this.add.image(197, 543, "subtable");
		subtable_1.name = "subtable_1";
		subtable_1.scaleX = 0.75;
		subtable_1.scaleY = 0.75;

		// startgame
		const startgame = this.add.image(1086, 298, "startgame");
		startgame.name = "startgame";
		startgame.scaleX = 0.6;
		startgame.scaleY = 0.6;

		// deco1
		const deco1 = this.add.image(989, 124, "deco1");
		deco1.name = "deco1";

		// deco2
		const deco2 = this.add.image(205, 301, "deco2");
		deco2.name = "deco2";
		deco2.scaleX = 0.75;
		deco2.scaleY = 0.75;

		// clock
		const clock = this.add.image(96, 96, "clock");
		clock.name = "clock";
		clock.scaleX = 0.4;
		clock.scaleY = 0.4;

		// sub
		const sub = this.add.image(637, 143, "sub");
		sub.name = "sub";

		// howbtn
		const howbtn = this.add.image(636, 537, "howbtn");
		howbtn.name = "howbtn";
		howbtn.scaleX = 0.6;
		howbtn.scaleY = 0.65;

		// sleep
		const sleep = this.add.image(838, 273, "sleep");
		sleep.name = "sleep";
		sleep.scaleX = 0.7;
		sleep.scaleY = 0.7;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {
		//this.load.audio('click', '/study/phaser/Project2/Stair_Game/audio/click.mp3'); //서버실행시 주석 풀기
		//this.load.audio('buttonclick', '/study/phaser/Project2/Stair_Game/audio/buttonclick.mp3'); //서버실행시 주석 풀기
		//this.load.audio('catsound', '/study/phaser/Project2/Stair_Game/audio/catsound.mp3'); //서버실행시 주석 풀기
		//this.load.audio('Firstbgm', '/study/phaser/Project2/Stair_Game/audio/Firstbgm.mp3'); //서버실행시 주석 풀기
		this.load.audio('click', 'audio/click.mp3');
		this.load.audio('buttonclick', 'audio/buttonclick.mp3');
		this.load.audio('catsound', 'audio/catsound.mp3');
		this.load.audio('Firstbgm', 'audio/Firstbgm.mp3');
	}

	create() {

		this.editorCreate();

		   // 배경 객체 가져오기
		   const background = this.children.getByName("background");

		   // 배경을 클릭 가능하도록 설정
		   background.setInteractive({ cursor: 'pointer' });
	   
		   // 배경 클릭 이벤트 추가
		   background.on("pointerdown", () => {
			   if (!this.bgm || !this.bgm.isPlaying) {
				   this.bgm = this.sound.add("Firstbgm", { loop: true, volume: 0.5 });
				   this.bgm.play(); // 배경음악 재생
			   }
		   });

		// clap 소리 멈추기 (Last 씬에서 참조)
		const lastScene = this.scene.get('Last'); // 'Last' 씬 참조 가져오기
		if (lastScene && lastScene.clapSound && lastScene.clapSound.isPlaying) {
			lastScene.clapSound.stop(); // clap 사운드 멈추기
		}

		// Get the startgame button
		const startgame = this.children.getByName("startgame");

		startgame.setInteractive({ cursor: 'pointer' });

		// Add blinking effect
		this.tweens.add({
			targets: startgame,
			alpha: { from: 1, to: 0.5 },
			duration: 900,
			ease: "Linear",
			yoyo: true,
			repeat: -1 // Infinite blinking
		});

		// startgame 버튼
        startgame.on("pointerover", () => {
			this.sound.play('click'); //클릭
         	startgame.setScale(0.65).setAlpha(0.8);
        });

        startgame.on("pointerout", () => {
            startgame.setScale(0.6).setAlpha(1);
        });

       // Startgame 버튼
        startgame.on("pointerdown", () => {
			 // Firstbgm 멈춤
			 if (this.bgm && this.bgm.isPlaying) {
				this.bgm.stop();
			}
			this.sound.play('catsound',{ volume: 10 }); // 클릭 효과음 재생
            this.scene.start("Game"); // Replace "GameScene" with your actual game scene key
        });

		// 고양이(cat3)를 버튼으로 만들기
		const cat3 = this.children.getByName("cat3");

		cat3.setInteractive({ cursor: 'pointer' });

		// 고양이에 마우스 오버 효과 추가
		cat3.on("pointerover", () => {
			cat3.setScale(0.65); // 약간 커짐
			this.sound.play("buttonclick"); // buttonclick 소리
		});

		cat3.on("pointerout", () => {
			cat3.setScale(0.6); // 원래 크기로 돌아감
		});

		// 고양이에 상하 움직임 애니메이션 추가
		this.tweens.add({
			targets: cat3,
			y: cat3.y - 20, // 위로 20픽셀 이동
			duration: 1000, // 1초 동안 이동
			ease: "Sine.easeInOut", // 부드러운 움직임
			yoyo: true, // 다시 원래 위치로 돌아옴
			repeat: -1 // 무한 반복
		});

		// 고양이 클릭 시 Guide.js로 이동
		cat3.on("pointerdown", () => {
			if (this.bgm && this.bgm.isPlaying) {
				this.bgm.stop(); // 배경음악 정지
			}
			this.sound.play('catsound',{ volume: 10 }); // 클릭 효과음 재생
			this.scene.start("Guide"); // Guide.js 씬으로 이동
		});

		// '게임설명' 버튼 기능 추가
		const gogameBtn = this.children.getByName("howbtn");
		if (gogameBtn) {
			gogameBtn.setInteractive({ cursor: "pointer" });
		
			gogameBtn.on("pointerover", () => {
				gogameBtn.setScale(0.5); // 약간 커짐
			});
		
			gogameBtn.on("pointerout", () => {
				gogameBtn.setScale(0.6);// 원래 크기로 돌아감
			});
		
			gogameBtn.on("pointerdown", () => {
				// 버튼이 눌리는 효과
				this.tweens.add({
					targets: gogameBtn,
					scale: 0.45, // 살짝 줄어듦
					duration: 100, // 눌리는 속도
					ease: "Linear",
					yoyo: true, // 원래 크기로 되돌아감
					onComplete: () => {
					   this.sound.play("buttonclick"); // buttonclick 소리
						this.scene.start("Guide"); // 'First' 씬으로 돌아가기
					},
				});
			});
		}


	}

	/* END-USER-CODE */
}
export default First;
/* END OF COMPILED CODE */

// You can write more code here
