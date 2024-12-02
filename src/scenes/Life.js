
class Life {
    constructor(scene) {
        this.scene = scene; // Game.js의 Scene 참조
        this.currentLives = 0; // 현재 맞춘 정답 수
        this.maxLives = 5; // 최대 별 개수 (총 문제 수)
        this.stars = []; // 별 이미지 객체 배열
        this.skippedLives = new Set(); // 오답 처리된 별 인덱스 기록
        this.currentFloorAttempted = false; // 현재 층에서 이미 시도했는지 여부
    }

    initLife() {
        // FiveStars 컨테이너에서 별들을 초기화
        const fiveStarsContainer = this.scene.children.getByName("FiveStars");
        if (!fiveStarsContainer) {
            console.error("FiveStars 컨테이너를 찾을 수 없습니다!");
            return;
        }

        // 별 이미지들을 초기화
        for (let i = 1; i <= this.maxLives; i++) {
            const star = fiveStarsContainer.getByName(`star_off${i}`);
            if (star) {
                this.stars.push(star); // 배열에 추가
            } else {
                console.error(`별 star_off${i}를 찾을 수 없습니다!`);
            }
        }

        console.log("Life 초기화 완료:", this.stars);
        window.gameLogic = this; // 디버깅용
    }

    /**
     * 별에 불을 켜는 함수
     * @param {boolean} isCorrect 정답 여부
     */
    updateLife(isCorrect) {
        console.log(`UpdateLife 호출됨: isCorrect = ${isCorrect}, currentLives = ${this.currentLives}`);

        if (this.currentLives >= this.maxLives) {
            console.log("모든 별 처리가 완료되었습니다.");
            return;
        }

        // 현재 층에서 이미 한 번 시도한 경우 별 활성화를 건너뜀
        if (this.currentFloorAttempted) {
            console.log(`현재 층(${this.currentLives + 1})은 이미 시도되었으므로 별 상태가 변경되지 않습니다.`);
            return;
        }

        const star = this.stars[this.currentLives];

        if (!isCorrect) {
            // 오답인 경우, 별을 건너뜀
            console.log(`별 ${this.currentLives + 1}은 오답 처리로 꺼진 상태를 유지합니다.`);
            this.skippedLives.add(this.currentLives); // 오답 기록
            this.currentFloorAttempted = true; // 현재 층 시도 완료
        } else if (!this.skippedLives.has(this.currentLives)) {
            // 정답인 경우, 오답으로 건너뛴 별이 아닌 경우만 활성화
            if (star) {
                this.scene.tweens.add({
                    targets: star,
                    alpha: { from: 0.5, to: 1 },
                    duration: 500,
                    ease: 'Power2',
                    onStart: () => console.log(`별 ${this.currentLives + 1} 활성화 애니메이션 시작`),
                    onComplete: () => {
                        star.setTexture("star_on");
                        console.log(`별 ${this.currentLives + 1} 불 들어옴`);
                    }
                });
            }
            this.currentFloorAttempted = true; // 현재 층 시도 완료
        }

        if (this.currentFloorAttempted) {
            // 오답 또는 정답 처리 후 다음 별로 이동
            this.currentLives++;
        }
    }

    /**
     * 층을 넘어갈 때 호출하여 상태 초기화
     */
    resetFloorAttempt() {
        this.currentFloorAttempted = false;
        console.log("현재 층 상태가 초기화되었습니다.");
    }

    getStarCount() {
        return this.currentLives - this.skippedLives.size; // 활성화된 별 개수
    }

    getStarsStatus() {
        // 별의 상태 배열 반환 (true: 활성화된 별, false: 비활성화된 별)
        return Array.from({ length: this.maxLives }, (_, i) => !this.skippedLives.has(i));
    }
}

export default Life;