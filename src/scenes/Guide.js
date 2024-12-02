
// You can write more code here

/* START OF COMPILED CODE */

class Guide extends Phaser.Scene {

	constructor() {
		super("Guide");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// sky_background
		const sky_background = this.add.image(641, 358, "sky_background");
		sky_background.name = "sky_background";

		// ex_scene1
		const ex_scene1 = this.add.image(220, 233, "ex_scene1");
		ex_scene1.name = "ex_scene1";
		ex_scene1.scaleX = 1.15;
		ex_scene1.scaleY = 1.15;

		// txt_bubble1
		const txt_bubble1 = this.add.image(479, 513, "txt_bubble1");
		txt_bubble1.name = "txt_bubble1";
		txt_bubble1.scaleX = 1.05;
		txt_bubble1.scaleY = 1.05;

		// ex_scene2
		const ex_scene2 = this.add.image(760, 220, "ex_scene2");
		ex_scene2.name = "ex_scene2";
		ex_scene2.scaleX = 1.1;
		ex_scene2.scaleY = 1.1;

		// txt_bubble2
		const txt_bubble2 = this.add.image(1047, 501, "txt_bubble2");
		txt_bubble2.name = "txt_bubble2";
		txt_bubble2.scaleX = 1.1;
		txt_bubble2.scaleY = 1.1;

		// bub1
		const bub1 = this.add.image(137, 544, "bub1");
		bub1.name = "bub1";
		bub1.angle = 4;

		// bub2
		const bub2 = this.add.image(236, 650, "bub2");
		bub2.name = "bub2";

		// bub
		const bub = this.add.image(827, 645, "bub2");
		bub.name = "bub";

		// bub3
		const bub3 = this.add.image(757, 530, "bub3");
		bub3.name = "bub3";

		// bub5
		const bub5 = this.add.image(1128, 200, "bub5");
		bub5.name = "bub5";
		bub5.angle = 28;

		// bub6
		const bub6 = this.add.image(1223, 248, "bub6");
		bub6.name = "bub6";

		// sleeping2
		const sleeping2 = this.add.image(689, 658, "sleeping2");
		sleeping2.name = "sleeping2";

		// sleeping1
		const sleeping1 = this.add.image(510, 182, "sleeping1");
		sleeping1.name = "sleeping1";

		// go_backbtn
		const go_backbtn = this.add.image(1163, 54, "go_backbtn");
		go_backbtn.name = "go_backbtn";
		go_backbtn.scaleX = 0.45;
		go_backbtn.scaleY = 0.5;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {
		//this.load.audio('pop1', '/study/phaser/Project2/Stair_Game/audio/pop1.mp3'); //서버실행시 주석 풀기
		//this.load.audio('pop2', '/study/phaser/Project2/Stair_Game/audio/pop2.mp3'); //서버실행시 주석 풀기
		//this.load.audio('pop3', '/study/phaser/Project2/Stair_Game/audio/pop3.mp3'); //서버실행시 주석 풀기
		//this.load.audio('buttonclick', '/study/phaser/Project2/Stair_Game/audio/buttonclick.mp3'); //서버실행시 주석 풀기
		this.load.audio('pop1', 'audio/pop1.mp3');
		this.load.audio('pop2', 'audio/pop2.mp3');
		this.load.audio('pop3', 'audio/pop3.mp3');
		this.load.audio('buttonclick', 'audio/buttonclick.mp3');
	}

	create() {

		this.editorCreate();
		
		 // 떠다니는 비눗방울
		 const floatBubble = (bubble, distance, duration) => {
			this.tweens.add({
				targets: bubble,
				y: bubble.y - distance, // 위로 이동
				duration: duration, // 이동 시간
				ease: "Sine.easeInOut", // 부드러운 움직임
				yoyo: true, // 다시 원래 위치로 돌아옴
				repeat: -1 // 무한 반복
			});
		};	

	// 각 비눗방울에 애니메이션 적용
	const bubbles = ["bub1", "bub2", "bub", "bub3", "bub5", "bub6", "ex_scene1", "ex_scene2", "txt_bubble1", "txt_bubble2"];
	const distances = [10, 15, 20, 12, 18, 15, 25, 30, 20, 15]; // 이동 거리 (각 오브젝트마다 다르게 설정)
	const durations = [1000, 1500, 1200, 1400, 1300, 1100, 1700, 2000, 1600, 1500]; // 이동 시간 (각각 다르게 설정)

	bubbles.forEach((bubbleName, index) => {
		const bubble = this.children.getByName(bubbleName);
		if (bubble) {
			// 떠다니는 애니메이션 추가
			floatBubble(bubble, distances[index], durations[index]);

			// 마우스 이벤트를 위한 상호작용 설정
			bubble.setInteractive({ cursor: "pointer" });

			// 확대 효과 및 소리 추가
			bubble.on("pointerover", () => {
				this.tweens.add({
					targets: bubble,
					scale: bubble.scaleX * 1.2, // 확대
					duration: 200, // 확대 속도
					ease: "Linear",
				});

				// 비눗방울마다 다른 소리 재생
				if (index % 3 === 0) {
					this.sound.play("pop1"); // pop1 소리
				} else if (index % 3 === 1) {
					this.sound.play("pop2"); // pop2 소리
				} else {
					this.sound.play("pop3"); // pop3 소리
				}
			});

			bubble.on("pointerout", () => {
				this.tweens.add({
					targets: bubble,
					scale: bubble.scaleX / 1.2, // 원래 크기로 복귀
					duration: 200, // 복귀 속도
					ease: "Linear",
				});
			});
		} else {
			console.warn(`Bubble with name ${bubbleName} not found.`);
		}
	});


		 // '뒤로가기' 버튼 기능 추가
		 const goBackBtn = this.children.getByName("go_backbtn");
		 if (goBackBtn) {
			 goBackBtn.setInteractive({ cursor: "pointer" });
		 
			 goBackBtn.on("pointerover", () => {
				 goBackBtn.setScale(0.5); // 약간 커짐
			 });
		 
			 goBackBtn.on("pointerout", () => {
				 goBackBtn.setScale(0.45);// 원래 크기로 돌아감
			 });
		 
			 goBackBtn.on("pointerdown", () => {
				 // 버튼이 눌리는 효과
				 this.tweens.add({
					 targets: goBackBtn,
					 scale: 0.4, // 살짝 줄어듦
					 duration: 100, // 눌리는 속도
					 ease: "Linear",
					 yoyo: true, // 원래 크기로 되돌아감
					 onComplete: () => {
						this.sound.play("buttonclick"); // buttonclick 소리
						 this.scene.start("First"); // 'First' 씬으로 돌아가기
					 },
				 });
			 });
		 }
	}

	/* END-USER-CODE */
}
export default Guide;

/* END OF COMPILED CODE */

// You can write more code here
