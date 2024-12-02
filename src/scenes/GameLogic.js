import * as Utils from './util.js';
import Life from './Life.js';

class GameLogic {
    constructor(scene) {
        this.scene = scene; // Game.js의 Scene 참조
        this.currentFloor = 1; // 현재 층
        this.correctBook = null; // 현재 정답 책 (blue1 또는 pink1)
        this.previousCorrectBook = null; // 바로 이전 층의 정답 책
        this.previousPreviousCorrectBook = null; // 두 층 전의 정답 책
        this.isMoving = false; // 키 입력 중복 방지 플래그
        this.isButtonDisabled = false; // 버튼 비활성화 플래그
        this.quiznum = this.scene.children.getByName("quiznum"); // 퀴즈 번호 텍스트 참조
        this.life = new Life(scene); // Life 클래스의 인스턴스 생성

        //사운드
        this.buttonClickSound = this.scene.sound.add("buttonclick");
        this.yesSound = this.scene.sound.add('yes');
        this.noSound = this.scene.sound.add('no');
    }

    initGame() {
        console.log("GameLogic 초기화 시작");

        // 버튼 및 객체 참조
        this.leftButton = this.scene.children.getByName("leftbtn1");
        this.rightButton = this.scene.children.getByName("rightbtn1");
        this.cat1 = this.scene.children.getByName("cat1");
        this.blue1 = this.scene.children.getByName("blue1");
        this.pink1 = this.scene.children.getByName("pink1");
        this.background = this.scene.children.getByName("office_bg");
      
        if (!this.quiznum) {
            console.error("quiznum 객체를 찾을 수 없습니다!");
        }

        // 객체 초기화 확인
        const objects = [this.leftButton, this.rightButton, this.cat1, this.blue1, this.pink1, this.background];
        objects.forEach((obj, index) => {
            if (!obj) console.error(`객체 ${index + 1}이(가) 초기화되지 않았습니다!`);
        });

        // 깊이 설정
        if (this.blue1 && this.pink1 && this.cat1) {
            this.blue1.setDepth(0);
            this.pink1.setDepth(0);
            this.cat1.setDepth(1); // 고양이를 항상 책보다 앞에 렌더링
        }

        // 책 초기 표시 설정 (1층에서는 blue1과 pink1만 표시)
        this.setVisibleBooksForFloor();

        // 질문 초기화
        if (this.scene.question) {
            this.scene.currentQuestion = this.scene.question.getRandomQuestion();
            const questionText = this.scene.children.getByName("questionText");

            if (questionText) {
                questionText.setText(this.scene.currentQuestion.question); // 질문 텍스트 설정
                questionText.setOrigin(0.5); // 중심 정렬
                questionText.setPosition(647, 160); // 위치 설정
            } else {
                console.error("questionText 객체를 찾을 수 없습니다!");
            }
        } else {
            console.error("Question 객체가 초기화되지 않았습니다!");
        }

        // 책 위치와 역할을 랜덤화
        this.randomizeBooks(60);

        this.updateQuizUI(); // 초기 UI 업데이트

        // 버튼 이벤트 설정
        this.setupButtonEvents();

        window.gameLogic =this;
    }

    updateQuizUI() {
        if (this.quiznum) {
            // 현재 층 번호에 따라 퀴즈 번호 업데이트
            this.quiznum.setText(`QUIZ${this.currentFloor}`);
            this.quiznum.setVisible(true);
            console.log(`퀴즈 번호 업데이트됨: QUIZ${this.currentFloor}`);
        }
    }

    setVisibleBooksForFloor(correctBook = null) {
        // 모든 책 숨기기
        this.scene.children.list.forEach((child) => {
            if (child.name && (child.name.startsWith("blue") || child.name.startsWith("pink"))) {
                child.setVisible(false); // 모든 책을 숨김
            }
        });
    
        // 현재 층에 해당하는 책 가져오기
        const currentBlue = this.scene.children.getByName(`blue${this.currentFloor}`);
        const currentPink = this.scene.children.getByName(`pink${this.currentFloor}`);
    
        if (currentBlue && currentPink) {
            currentBlue.setVisible(true); // 현재 층의 blue 책 보이기
            currentPink.setVisible(true); // 현재 층의 pink 책 보이기
    
            // 새로운 층 책 위치 설정
            currentBlue.setPosition(236, 382); // 왼쪽
            currentPink.setPosition(1007, 388); // 오른쪽
    
            // 깊이 설정
            currentBlue.setDepth(1);
            currentPink.setDepth(1);
        } else {
            console.error(`현재 층(${this.currentFloor})의 책을 찾을 수 없습니다!`);
        }
    
        // 이전 층에서 올라온 정답 책 유지 (정답책이 전달될 경우)
        if (correctBook) {
            correctBook.setVisible(true);
        }
    
        // 고양이 깊이 설정 (항상 모든 책 위에 표시)
        if (this.cat1) {
            this.cat1.setDepth(3);
        }
    }
    
    
    randomizeBooks(swapProbability = 60) {
        const currentBlue = this.scene.children.getByName(`blue${this.currentFloor}`);
        const currentPink = this.scene.children.getByName(`pink${this.currentFloor}`);
    
        if (!currentBlue || !currentPink) {
            console.error("현재 층의 책을 찾을 수 없습니다!");
            return;
        }
    
        const randomValue = Phaser.Math.Between(0, 99);
        console.log(`Generated random value: ${randomValue} (Threshold: ${swapProbability})`);
    
        if (randomValue < swapProbability) {
            const tempX = currentBlue.x;
            const tempY = currentBlue.y;
            currentBlue.setPosition(currentPink.x, currentPink.y);
            currentPink.setPosition(tempX, tempY);
            console.log(`책 위치 교환: ${currentBlue.name} <-> ${currentPink.name}`);
        } else {
            console.log("책 위치 유지");
        }
    
        // currentQuestion.answer를 기반으로 correctBook 설정
        if (this.scene.currentQuestion.answer === true) {
            this.correctBook = currentBlue;
        } else {
            this.correctBook = currentPink;
        }
    
        console.log("currentQuestion.answer:", this.scene.currentQuestion.answer);
        console.log("correctBook 설정됨:", this.correctBook.name);
    }


    setupButtonEvents() {
        if (this.leftButton) {
            this.leftButton.setInteractive({ cursor: "pointer" }).on("pointerdown", () => {
                if (this.isMoving || this.isButtonDisabled) {
                    console.log("버튼이 비활성화되어 있습니다. 클릭할 수 없습니다.");
                    return; // 이동 중 또는 비활성화 상태에서는 무시
                }
                this.buttonClickSound.play();
                console.log("왼쪽 버튼 클릭됨");
                this.isMoving = true;
                this.isButtonDisabled = true; // 버튼 비활성화
                this.moveCatToLeft();
            });
        }
    
        if (this.rightButton) {
            this.rightButton.setInteractive({ cursor: "pointer" }).on("pointerdown", () => {
                if (this.isMoving || this.isButtonDisabled) {
                    console.log("버튼이 비활성화되어 있습니다. 클릭할 수 없습니다.");
                    return; // 이동 중 또는 비활성화 상태에서는 무시
                }
                this.buttonClickSound.play();
                console.log("오른쪽 버튼 클릭됨");
                this.isMoving = true;
                this.isButtonDisabled = true; // 버튼 비활성화
                this.moveCatToRight();
            });
        }
    
        // 키보드 입력 설정
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.isMoving || this.isButtonDisabled) {
            console.log("이동 중이거나 버튼이 비활성화된 상태입니다.");
            return; // 이동 중 또는 버튼 비활성화 상태에서는 입력 무시
        }
    
        if (this.cursors.left.isDown) {
            this.buttonClickSound.play();
            console.log("왼쪽 방향키 눌림");
            this.isMoving = true;
            this.isButtonDisabled = true; // 키보드도 버튼과 동일하게 처리
            this.moveCatToLeft();
        } else if (this.cursors.right.isDown) {
            this.buttonClickSound.play();
            console.log("오른쪽 방향키 눌림");
            this.isMoving = true;
            this.isButtonDisabled = true; // 키보드도 버튼과 동일하게 처리
            this.moveCatToRight();
        }
    }


    handleAnswer(selectedBook) {
        console.log("handleAnswer 호출됨, 선택된 책:", selectedBook.name);
        console.log("현재 correctBook:", this.correctBook.name);
        console.log("currentQuestion.answer:", this.scene.currentQuestion.answer);
    
        const isCorrect = selectedBook.name === this.correctBook.name;
        console.log("checkAnswer 결과:", isCorrect);
    
        // 정답 및 오답 처리 중 버튼 입력 차단
        this.isMoving = true;
        this.isButtonDisabled = true;

           // 정답 또는 오답에 따라 생명 상태 업데이트
            this.scene.life.updateLife(isCorrect);
    
        if (isCorrect) {
            this.yesSound.play(); // 정답 효과음
            console.log("정답 처리 시작");
    
            // 스프라이트 시트 애니메이션 생성 및 실행
            const fireburst = this.scene.add.sprite(this.cat1.x + 20, this.cat1.y + 100, 'firework');
            fireburst.setDepth(5); // 다른 객체보다 위에 표시
            fireburst.setScale(10); // 애니메이션 크기 조정
            fireburst.play('firework'); // 애니메이션 재생
            console.log("스프라이트 시트 애니메이션 'firework' 실행");
    
            this.scene.time.delayedCall(800, () => {
                this.moveCatAndBookToNewPosition(selectedBook);
            });
        } else {
            this.noSound.play(); // 오답 효과음
            console.log("오답 처리 시작");
           
            // 스프라이트 시트 애니메이션 생성 (오답)
            const explosion = this.scene.add.sprite(this.cat1.x - 40, this.cat1.y - 50, 'explosionEffect');
            explosion.setDepth(5); // 다른 객체보다 위에 표시
            explosion.setScale(2); // 애니메이션 크기 조정
            explosion.play('explosion'); // 애니메이션 재생
            console.log("스프라이트 시트 애니메이션 'explosion' 실행");
    
            // 애니메이션 완료 후 제거
            explosion.on('animationcomplete', () => {
                explosion.destroy();
            });
    
            // 흔들림 효과 추가
            Utils.shakeObject(selectedBook);
    
            // 고양이 위치 초기화
            this.scene.time.delayedCall(800, () => {
                this.resetCatPosition(() => {
                    // 고양이 위치 초기화 완료 후 플래그 해제
                    this.isMoving = false;
                    this.isButtonDisabled = false;
                });
            });
        }
    }
    

    isCatOnBook(targetBook) {
        const catX = this.cat1.x;
        const catY = this.cat1.y;
        const bookX = targetBook.x;
        const bookY = targetBook.y - 130;

        const tolerance = 5; // 오차 범위
        return Math.abs(catX - bookX) < tolerance && Math.abs(catY - bookY) < tolerance;
    }


    moveCatToLeft() {
        const currentBlue = this.scene.children.getByName(`blue${this.currentFloor}`);
        const currentPink = this.scene.children.getByName(`pink${this.currentFloor}`);
        const leftBook = currentBlue.x < currentPink.x ? currentBlue : currentPink;

        if (this.isCatOnBook(leftBook)) {
            console.log("고양이가 이미 왼쪽 책 위에 있습니다. 이동하지 않습니다.");
            return;
        }

        console.log("moveCatToLeft - 선택된 책:", leftBook.name);
        this.moveCat(leftBook);
    }
    
    moveCatToRight() {
        const currentBlue = this.scene.children.getByName(`blue${this.currentFloor}`);
        const currentPink = this.scene.children.getByName(`pink${this.currentFloor}`);
        const rightBook = currentBlue.x > currentPink.x ? currentBlue : currentPink;

        if (this.isCatOnBook(rightBook)) {
            console.log("고양이가 이미 오른쪽 책 위에 있습니다. 이동하지 않습니다.");
            return;
        }

        console.log("moveCatToRight - 선택된 책:", rightBook.name);
        this.moveCat(rightBook);
    }

    moveCat(targetBook) {
        if (this.cat1 && targetBook) {
            console.log(`고양이가 ${targetBook.name}로 이동`);
            this.scene.tweens.add({
                targets: this.cat1,
                x: targetBook.x + 50,
                y: targetBook.y - 130,
                duration: 500,
                ease: "Power2",
                onComplete: () => {
                    console.log(`${targetBook.name} 위에 도착`);
                    this.isMoving = false; // 이동 완료 후 플래그 해제
                     // 이동 후 추가 딜레이 설정
                        this.handleAnswer(targetBook); 
                },
            });
        }
    }

    moveCatAndBookToNewPosition(targetBook) {
        const bookNewX = 647; // 정답 책의 새로운 X 위치
        const bookNewY = 600; // 층에 따라 Y 좌표를 변경
    
        // 버튼과 질문 박스 숨기기
        this.leftButton.setVisible(false);
        this.rightButton.setVisible(false);
    
        const questionBox = this.scene.children.getByName("box");
        const questionText = this.scene.children.getByName("questionText");
        if (questionBox) questionBox.setVisible(false);
        if (questionText) questionText.setVisible(false);
    
        // 정답 책 이동
        this.scene.tweens.add({
            targets: [targetBook],
            x: bookNewX,
            y: bookNewY,
            duration: 1000,
            ease: "Power2",
            onComplete: () => console.log("정답 책이 새로운 위치로 이동했습니다."),
        });

        // 4층에서 올라온 책 제거 처리 (5층에서만 실행)
        if (this.currentFloor === 5 && this.previousCorrectBook) {
            const previousCorrectBook = this.previousCorrectBook;
            console.log(`4층에서 올라온 책(${previousCorrectBook.name}) 제거 시작`);

            const questionBox = this.scene.children.getByName("box");
            const quizbox = this.scene.children.getByName("quizbox");
            const quiznum = this.scene.children.getByName("quiznum");

            this.scene.tweens.add({
                targets: previousCorrectBook,
                alpha: 0, // 이전 책을 투명하게
                duration: 500,
                ease: "Power2",
                onComplete: () => {
                    console.log(`${previousCorrectBook.name} 책이 5층에서 제거되었습니다.`);
                    previousCorrectBook.setVisible(false); // 완전히 숨기기
                },
            });

            // 텍스트와 상자를 함께 숨기는 애니메이션
            this.scene.tweens.add({
                targets: [quizbox, quiznum],
                alpha: 0, // 투명도 감소
                duration: 500,
                ease: "Power2",
                onComplete: () => {
                    if (quizbox) quizbox.setVisible(false); // 퀴즈 상자 숨김
                    if (quiznum) quiznum.setVisible(false); // 퀴즈 번호 숨김
                    console.log("퀴즈 상자와 번호가 숨겨졌습니다.");
                },
            });

            // 질문 박스도 함께 숨김
            if (questionBox) {
                this.scene.tweens.add({
                    targets: questionBox,
                    alpha: 0, // 투명도 감소
                    duration: 500,
                    ease: "Power2",
                    onComplete: () => {
                        questionBox.setVisible(false);
                        console.log("질문 박스가 숨겨졌습니다.");
                    },
                });
            }
        }

        this.goToEndingScene();

        // 고양이 위치 이동
        this.scene.tweens.add({
            targets: [this.cat1],
            x: bookNewX + 50,
            y: bookNewY - 130,
            duration: 1000,
            ease: "Power2",
            onComplete: () => {
                console.log("고양이가 책 위로 이동했습니다.");
            },
        });
        this.moveWrongBooks(targetBook); // 오답 책 이동
        this.moveBackgroundUp(targetBook); // 이전 정답 책 전달
    }

    // 엔딩 장면 전환 함수
    goToEndingScene() {
        if (this.currentFloor === 5) {
            console.log("5층 정답 완료. 엔딩 장면으로 전환 준비 중...");
    
            const finalStarCount = this.scene.life.getStarCount();
            const starsStatus = this.scene.life.getStarsStatus();
    
            console.log(`최종 별 점수 확인: ${finalStarCount}`);
            console.log(`별 상태: ${starsStatus}`);
    
            // 데이터 전달
            this.scene.time.delayedCall(1500, () => {
                this.scene.scene.start("Last", { starsStatus }); // 별 상태를 객체로 전달
            });
        } else {
            console.log("5층이 아니므로 엔딩 장면으로 전환되지 않습니다.");
        }
    }
    
    

    resetCatPosition(callback) {
        const resetX = this.currentFloor === 1 ? 674 : 700; // 1층은 674, 나머지는 700
        const resetY = this.currentFloor === 1 ? 600 : 450; // 1층은 600, 나머지는 450
    
        this.scene.tweens.add({
            targets: this.cat1,
            x: resetX,
            y: resetY,
            duration: 500,
            ease: "Power2",
            onComplete: () => {
                console.log("고양이가 초기 위치로 돌아갔습니다.");
                if (typeof callback === "function") callback(); // 위치 초기화 후 콜백 실행
            },
        });
    }
    

    moveBackgroundUp(correctBook) {
        if (this.currentFloor < 5) {
            const previousCorrectBook = this.correctBook; // 바로 이전 층의 정답 책 저장
            const previousPreviousCorrectBook = this.previousCorrectBook; // 두 층 전의 정답 책 저장
            this.previousCorrectBook = this.correctBook; // 이전 정답 책 갱신
            this.previousPreviousCorrectBook = previousPreviousCorrectBook; // 이전-이전 정답 책 갱신
            this.correctBook = correctBook; // 새로운 층의 정답 책 설정
            this.currentFloor++; // 현재 층 증가

            // 층을 넘어갈 때 생명 관리 초기화
             this.scene.life.resetFloorAttempt();
    
            // 이전-이전 층의 정답 책을 자연스럽게 제거 (현재 층 이동 전 처리)
            if (previousPreviousCorrectBook) {
                this.scene.tweens.add({
                    targets: previousPreviousCorrectBook,
                    alpha: 0, // 투명도 감소
                    duration: 500,
                    ease: "Power2",
                    onComplete: () => {
                        console.log(`${previousPreviousCorrectBook.name} 책이 ${this.currentFloor - 2}층에서 사라집니다.`);
                        previousPreviousCorrectBook.setVisible(false);
                    },
                });
            }
    
            // 버튼 숨기기
            this.leftButton.setVisible(false);
            this.rightButton.setVisible(false);
    
            const questionBox = this.scene.children.getByName("box");
            const questionText = this.scene.children.getByName("questionText");
            if (questionBox) questionBox.setVisible(false);
            if (questionText) questionText.setVisible(false);

            const quizbox = this.scene.children.getByName("quizbox");
            const quiznum = this.scene.children.getByName("quiznum");
            if (quizbox) quizbox.setVisible(false);
            if (quiznum) quiznum.setVisible(false);
    
            // 배경 이동 애니메이션
            this.scene.tweens.add({
                targets: this.background,
                y: this.background.y + 725, // 배경 이동
                duration: 500,
                ease: "Power2",
                onComplete: () => {
                    console.log(`현재 층: ${this.currentFloor}`);
    
                    // 현재 층 정답 책 설정
                    this.setVisibleBooksForFloor(correctBook);
    
                    // 이전 층의 정답 책을 유지
                    if (previousCorrectBook) {
                        previousCorrectBook.setVisible(true);
                        previousCorrectBook.setDepth(0); // 고양이보다 위에 표시
                        console.log(`${previousCorrectBook.name} 책이 ${this.currentFloor - 1}층에 보입니다.`);
                    }

                    // 퀴즈 번호 업데이트 (여기에서 호출)
                    this.updateQuizUI();

                    // 새로운 질문 설정
                    if (this.scene.question) {
                        const previousQuestion = this.scene.currentQuestion;
                        this.scene.currentQuestion = this.scene.question.getRandomQuestion();
                        const questionText = this.scene.children.getByName("questionText");
                        if (questionText) {
                            questionText.setText(this.scene.currentQuestion.question);
                            questionText.setVisible(true);
                        }
                        console.log("이전 질문:", previousQuestion);
                        console.log("새로운 질문:", this.scene.currentQuestion);
                    }
    
                    // 새로 설정된 책들 기준으로 randomizeBooks 실행
                    this.randomizeBooks(60);

                    // 버튼 플래그 초기화
                    this.isMoving = false;
                    this.isButtonDisabled = false;
    
                    // 버튼 다시 보이게 설정
                    this.leftButton.setVisible(true);
                    this.rightButton.setVisible(true);
                    if (questionBox) questionBox.setVisible(true);
                    if (questionText) questionText.setVisible(true);
                    if (quizbox) quizbox.setVisible(true);
                    if (quiznum) quiznum.setVisible(true);
                },
            });
        } else {
            console.log("최고 층에 도달했습니다!");
        }
    }
    
     // 오답인 책을 대각선으로 이동
     moveWrongBooks(correctBook) {
        const currentBlue = this.scene.children.getByName(`blue${this.currentFloor}`);
        const currentPink = this.scene.children.getByName(`pink${this.currentFloor}`);
        const books = [currentBlue, currentPink];
    
        books.forEach((book) => {
            if (book !== correctBook) {
                const offsetX = book.x > 647 ? 800 : -800; // 오른쪽이면 오른쪽으로, 왼쪽이면 왼쪽으로 이동
                const offsetY = 600; // 아래로 이동
    
                this.scene.tweens.add({
                    targets: book,
                    x: book.x + offsetX,
                    y: book.y + offsetY,
                    alpha: 0, // 사라지게 처리
                    duration: 1000,
                    ease: "Power2",
                    onComplete: () => {
                        console.log(`${book.name}이 대각선 아래로 사라졌습니다.`);
                        book.setVisible(false); // 이동 후 숨기기
                    },
                });
            }
        });
    }
}

export default GameLogic;
