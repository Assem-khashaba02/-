const questions = [
    {
        text: "My name is John. I am 10 years old. I have a cat named Whiskers. My favorite color is blue.",
        question: "What is John's favorite color?",
        options: ["Red", "Green", "Blue", "Yellow"],
        answer: 2
    },
    {
        question: "How old is John?",
        options: [5, 10, 12, 8],
        answer: 1
    },
    {
        text: "Anna likes apples. She eats one apple every day. She also likes bananas and grapes.",
        question: "What does Anna eat every day?",
        options: ["Banana", "Grape", "Apple", "Orange"],
        answer: 2
    },
    {
        question: "What other fruits does Anna like?",
        options: ["Pears and strawberries", "Bananas and grapes", "Cherries and plums", "Mangoes and pineapples"],
        answer: 1
    },
    {
        question: "Choose the correct option: She ___ (is/are) my sister.",
        options: ["is", "are", "am", "be"],
        answer: 0
    },
    {
        audio: "path/to/your/audio/file.mp3",
        question: "What did you hear in the audio?",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        answer: 1
    },
    // Add more questions similarly...
];

let currentQuestionIndex = 0;
let score = 0;
let userInfo = {};

function startTest() {
    userInfo = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        age: document.getElementById('age').value,
        phone: document.getElementById('phone').value
    };

    if (!validateUserInfo(userInfo)) {
        alert('Please fill in all required fields.');
        return;
    }

    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    document.getElementById('user-info-container').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('next-btn').style.display = 'block';

    showQuestion();
}

function validateUserInfo(userInfo) {
    return userInfo.name && userInfo.email && userInfo.address && userInfo.age && userInfo.phone;
}

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    const question = questions[currentQuestionIndex];
    
    if (question.audio) {
        const audioElem = document.createElement('audio');
        audioElem.controls = true;
        audioElem.src = question.audio;
        questionContainer.appendChild(audioElem);
    }

    if (question.text) {
        const textElem = document.createElement('p');
        textElem.textContent = question.text;
        questionContainer.appendChild(textElem);
    }

    const questionElem = document.createElement('p');
    questionElem.textContent = question.question;
    questionContainer.appendChild(questionElem);

    question.options.forEach((option, index) => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'option';
        radio.value = index;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        questionContainer.appendChild(label);
        questionContainer.appendChild(document.createElement('br'));
    });
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        if (parseInt(selectedOption.value) === questions[currentQuestionIndex].answer) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            document.getElementById('next-btn').style.display = 'none';
            document.getElementById('submit-btn').style.display = 'block';
        }
    } 
}

function submitTest() {
    // Display result
    document.body.innerHTML = `
        <div class="container">
            <h1>Test Result</h1>
            <div class="result-content">
                <img src="horses for courses.png" alt="Logo" class="logo">
                <div class="result-details">
                    <p><strong>Name:</strong> ${userInfo.name}</p>
                    <p><strong>Email:</strong> ${userInfo.email}</p>
                    <p><strong>Address:</strong> ${userInfo.address}</p>
                    <p><strong>Age:</strong> ${userInfo.age}</p>
                    <p><strong>Phone:</strong> ${userInfo.phone}</p>
                    <p><strong>Level:</strong> ${calculateLevel()}</p>
                </div>
            </div>
           
        </div>
         <button  class="a" onclick="window.print()">Print</button>
    `;
}

function calculateLevel() {
    let level = 'Foundational';

    if (score >= 2) {
        level = 'B1';
    } else if (score >= 10) {
        level = 'A2';
    } else if (score >= 0) {
        level = 'A1';
    }

    return level;
}
