class Question {
    constructor(scene) {
        this.scene = scene; // Game.js의 Scene 참조
        this.questions = [
            { question: "사자는 초식동물이다.", answer: false },
            { question: "모나리자는 네덜란드의 화가 레오나르도 다빈치의 작품이다.", answer: false },
            { question: "인간의 몸에는 총 206개의 뼈가 있다.", answer: true },
            { question: "비틀즈는 1960년대에 결성된 영국 밴드다.", answer: true },
            { question: "발레는 러시아에서 기원했다.", answer: false },
            { question: "고래는 포유류가 아니다.", answer: false },
            { question: "고양이는 태어나면서부터 수영을 할 수 있다.", answer: true },
            { question: "축구 경기 한 팀의 최대 선수 수는 11명이다.", answer: true },
            { question: "산소는 물(H2O) 분자 안에 포함되어 있다.", answer: true },
            { question: "조선 시대의 수도는 평양이었다.", answer: false },
            { question: "피라미드는 이집트에서만 발견된다.", answer: false },
            { question: "달에는 공기가 없다.", answer: true },
            { question: "사람은 1분에 평균적으로 15번 호흡한다. ", answer: true },
            { question: "고양이는 하루 평균 16시간 이상 잠을 잔다. ", answer: true },
            { question: "배드민턴 공은 '셔틀콕'이라고 부른다.", answer: true },
            { question: "피카소는 인상주의 화가다.", answer: false },
            { question: "미국 독립선언은 1776년에 발표되었다.", answer: true },
            { question: "인터넷의 발명은 21세기에 이루어졌다.", answer: false },
            { question: "해리포터 시리즈는 총 10권이다.", answer: false },
            { question: "물은 섭씨 0도에서 얼음으로 변한다. ", answer: true },
        ];
        this.usedQuestions = []; // 이미 출제된 질문을 저장
        this.lastAnswer = null; // 마지막 출제된 질문의 정답
    }

    // 질문 데이터에서 랜덤한 질문을 반환
    getRandomQuestion() {
        // 남은 질문이 없다면 질문 초기화
        if (this.questions.length === 0) {
            console.warn("모든 질문이 사용되었습니다. 질문을 초기화합니다.");
            this.questions = [...this.usedQuestions];
            this.usedQuestions = [];
            this.lastAnswer = null; // 초기화 시 마지막 정답 리셋
        }

         // 최근 정답과 반대되는 질문을 우선적으로 선택
         let potentialQuestions = this.questions.filter(
            (q) => this.lastAnswer === null || q.answer !== this.lastAnswer
        );

        // 만약 반대되는 정답을 가진 질문이 부족하면 모든 질문을 사용
        if (potentialQuestions.length === 0) {
            potentialQuestions = [...this.questions];
        }

         // 무작위로 질문 선택
        const randomIndex = Phaser.Math.Between(0, this.questions.length - 1);
        const selectedQuestion = this.questions.splice(randomIndex, 1)[0]; // 질문을 선택 후 제거
        this.usedQuestions.push(selectedQuestion); // 사용된 질문에 추가

        // 최근 정답 기록
        this.lastAnswer = selectedQuestion.answer;

        // 디버깅 로그
        console.log("선택된 질문:", selectedQuestion);

        return selectedQuestion;
    }

    // 질문 초기화
    initQuestion() {
        this.currentQuestion = this.getRandomQuestion(); // 랜덤 질문 가져오기

        const questionText = this.scene.children.getByName("questionText"); // 이름으로 텍스트 객체 가져오기
        if (questionText) {
            questionText.setText(this.currentQuestion.question); // 질문 텍스트 설정
            questionText.setOrigin(0.5); // 텍스트 중심 정렬
            questionText.setPosition(647, 160); // 텍스트 위치 설정
        } else {
            console.error("questionText 객체를 찾을 수 없습니다!");
        }
    }
}

export default Question;
