
import Preload from './scenes/Preload.js';  // Preload 클래스를 import
import First from './scenes/First.js';  // First 클래스를 import
import Guide from './scenes/Guide.js';  // Guide 클래스를 import
import Game from './scenes/Game.js';  // Game 클래스를 import
import Last from './scenes/Last.js';  // Last 클래스를 import

window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 1280,
		height: 720,
		type: Phaser.AUTO,
        backgroundColor: "#242424",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		},
		physics: {
            default: 'arcade',  // 물리 엔진 사용
            arcade: {
                gravity: { y: 300 },  // 중력 설정 (필요에 따라 변경)
                debug: false
            }
        },
        audio: {
            debug: true, // 오디오 디버그 정보 표시
        }
	});

	game.scene.add("Preload", Preload);
	game.scene.add("First", First);
	game.scene.add("Guide", Guide);
	game.scene.add("Game", Game);
	game.scene.add("Last", Last);
	game.scene.add("Boot", Boot, true);

	// 최대 크기 제한 적용
	const canvas = game.canvas; // Phaser가 생성한 캔버스를 가져옴
    canvas.style.maxWidth = '1280px'; // 최대 너비 1280px로 제한
    canvas.style.maxHeight = '720px'; // 최대 높이 720px로 제한
    canvas.style.margin = 'auto'; // 화면 중앙 정렬

});

class Boot extends Phaser.Scene {

    preload() {
        this.load.pack("pack", "assets/preload-asset-pack.json");
    }

    create() {
        this.scene.start("Preload");
    }
}