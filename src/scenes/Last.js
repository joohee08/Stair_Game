
// You can write more code here

/* START OF COMPILED CODE */

class Last extends Phaser.Scene {

	constructor() {
		super("Last");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// office5
		const office5 = this.add.image(640, 349, "office5");
		office5.name = "office5";
		office5.scaleX = 1.6;
		office5.scaleY = 1.49;

		// congrats
		const congrats = this.add.image(661, 241, "congrats");
		congrats.name = "congrats";

		// sofa
		const sofa = this.add.image(650, 568, "sofa");
		sofa.name = "sofa";
		sofa.scaleX = 0.7;
		sofa.scaleY = 0.75;

		// cat6
		const cat6 = this.add.image(662, 492, "cat6");
		cat6.name = "cat6";
		cat6.scaleX = 0.55;
		cat6.scaleY = 0.55;

		// lastbtn2
		const lastbtn2 = this.add.container(947, 511);
		lastbtn2.name = "lastbtn2";

		// home
		const home = this.add.image(3, 76, "home");
		home.name = "home";
		home.scaleX = 0.4;
		home.scaleY = 0.4;
		lastbtn2.add(home);

		// catpaw1
		const catpaw1 = this.add.image(0, 0, "catpaw");
		catpaw1.name = "catpaw1";
		catpaw1.scaleX = 0.3;
		catpaw1.scaleY = 0.3;
		lastbtn2.add(catpaw1);

		// lastbtn1
		const lastbtn1 = this.add.container(368, 506);
		lastbtn1.name = "lastbtn1";

		// retry
		const retry = this.add.image(1, 77, "retry");
		retry.name = "retry";
		retry.scaleX = 0.4;
		retry.scaleY = 0.4;
		lastbtn1.add(retry);

		// catpaw2
		const catpaw2 = this.add.image(0, 0, "catpaw");
		catpaw2.name = "catpaw2";
		catpaw2.scaleX = 0.3;
		catpaw2.scaleY = 0.3;
		lastbtn1.add(catpaw2);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here
	preload() {
		//this.load.audio('Firstbgm', '/study/phaser/Project2/Stair_Game/audio/Firstbgm.mp3'); //서버실행시 주석 풀기
		//this.load.audio('clap', '/study/phaser/Project2/Stair_Game/audio/clap.mp3'); //서버실행시 주석 풀기
		//this.load.audio('click', '/study/phaser/Project2/Stair_Game/audio/click.mp3'); //서버실행시 주석 풀기
		//this.load.audio('catsound2', '/study/phaser/Project2/Stair_Game/audio/catsound2.mp3'); //서버실행시 주석 풀기
		this.load.audio('Firstbgm', 'audio/Firstbgm.mp3'); 
        this.load.audio('winner', 'audio/winner.mp3'); 
		this.load.audio('clap', 'audio/clap.mp3'); 
		this.load.audio('click', 'audio/click.mp3');
		this.load.audio('catsound2', 'audio/catsound2.mp3'); 
    }

	create(data) {

		this.editorCreate();
		
		// FirstBgm 멈추기
		const FirstSound = this.sound.get('Firstbgm');
		if (FirstSound && FirstSound.isPlaying) {
			FirstSound.stop();
			this.sound.remove(FirstSound); // 완전히 제거
		}
	
		// Winner 사운드 추가 및 재생
		const winnerSound = this.sound.add('winner', { loop: false});
		this.clapSound = this.sound.add('clap', { loop: false}); // this.clapSound로 참조 저장

		// Winner 사운드 재생 후 짧은 딜레이로 Clap 사운드 재생
		winnerSound.play();
		this.time.delayedCall(1500, () => {
			this.clapSound.play();
		});

		//별부분
		const starsStatus = data?.starsStatus || [];
        console.log(`별 상태: ${starsStatus}`);

        const starXStart = 500; // 별 표시 시작 X 좌표
        const starY = 100; // 별 표시 Y 좌표
        const starSpacing = 80; // 별 간격

        // 별 상태에 따라 별 이미지를 추가
    for (let i = 0; i < starsStatus.length; i++) {
        const starTexture = starsStatus[i] ? "star_on" : "star_off"; // 별 상태에 따라 이미지 설정
        this.add.image(starXStart + i * starSpacing, starY, starTexture).setScale(0.25);
    }
	
		const congrats = this.children.getByName("congrats"); // 이름으로 객체 가져오기
		const lastbtn1 = this.children.getByName("lastbtn1"); // 이름으로 객체 가져오기
		const lastbtn2 = this.children.getByName("lastbtn2"); // 이름으로 객체 가져오기

		const retry = lastbtn1.getByName("retry"); // Retry 버튼
		const catpaw2 = lastbtn1.getByName("catpaw2"); // Retry 버튼의 고양이 발바닥

		const home = lastbtn2.getByName("home"); // Home 버튼
		const catpaw1 = lastbtn2.getByName("catpaw1"); // Home 버튼의 고양이 발바닥

		// Congrats 팝업 애니메이션
		this.tweens.add({
			targets: congrats, // 대상 객체
			scaleX: { from: 0, to: 1.2 }, // X축 스케일 (처음 0에서 1.2까지 확대)
			scaleY: { from: 0, to: 1.2 }, // Y축 스케일 (처음 0에서 1.2까지 확대)
			ease: 'Bounce.easeOut', // 애니메이션 이징 효과
			duration: 800, // 애니메이션 시간 (밀리초)
			yoyo: true, // 역방향 실행 (줄어드는 효과)
			repeat: -1 // 반복 (-1은 무한 반복)
		});

		// Retry 버튼 상호작용
		retry.setInteractive({ cursor: 'pointer' }).on("pointerover", () => {
			this.sound.play('click'); //클릭
			retry.setScale(0.45).setAlpha(0.8);
			catpaw2.setScale(0.35).setAlpha(0.8); // 고양이 발바닥도 함께 크기 및 투명도 변경
		}).on("pointerout", () => {
			retry.setScale(0.4).setAlpha(1);
			catpaw2.setScale(0.3).setAlpha(1); // 고양이 발바닥 원래 상태로
		}).on("pointerdown", () => {
			this.sound.play('catsound2'); // catsound2 재생
			this.scene.start("Game"); // Game 씬으로 이동
		});

		// Home 버튼 상호작용
		home.setInteractive({ cursor: 'pointer' }).on("pointerover", () => {
			this.sound.play('click'); //클릭
			home.setScale(0.45).setAlpha(0.8);
			catpaw1.setScale(0.35).setAlpha(0.8); // 고양이 발바닥도 함께 크기 및 투명도 변경
		}).on("pointerout", () => {
			home.setScale(0.4).setAlpha(1);
			catpaw1.setScale(0.3).setAlpha(1); // 고양이 발바닥 원래 상태로
		}).on("pointerdown", () => {
			this.sound.play('catsound2'); // catsound2 재생
			this.scene.start("First"); // First 씬으로 이동
		});

		// 물리 엔진이 적용된 코인 그룹 생성
		this.coins = this.physics.add.group({
			defaultKey: 'coin', // 기본 코인 텍스처 키
			maxSize: 50, // 최대 코인 수
		});

		// 코인 떨어뜨리는 이벤트
		this.time.addEvent({
			delay: 200, // 0.2초마다 새로운 코인 생성
			callback: this.ManyCoin,
			callbackScope: this,
			loop: true, // 반복
		});
	}
	
	// 새로운 코인 생성 함수
	ManyCoin() {
		const x = Phaser.Math.Between(50, this.scale.width - 50); // 화면의 랜덤한 x 좌표
		const y = -50; // 화면 위쪽에서 시작

		const coin = this.coins.get(x, y); // 그룹에서 코인 가져오기 (재사용)
		if (coin) {
			coin.setActive(true); // 활성화
			coin.setVisible(true); // 보이기
			coin.setScale(0.15); // 크기 설정
			coin.body.setVelocityY(Phaser.Math.Between(200, 400)); // 아래로 떨어지는 속도 설정
			coin.body.setCollideWorldBounds(false); // 월드 경계 충돌 비활성화
			coin.body.onWorldBounds = false; // 경계를 벗어나면 이벤트 발생 X
		}
	}

	update() {
		// 화면 아래로 벗어난 코인 제거
		this.coins.children.iterate((coin) => {
			if (coin.active && coin.y > this.scale.height) {
				this.coins.killAndHide(coin); // 그룹에서 비활성화
				coin.body.stop(); // 움직임 중지
			}
		});
	}
}
export default Last;
/* END OF COMPILED CODE */

// You can write more code here
/* END-USER-CODE */
