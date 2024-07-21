// JavaScript لعرض وإخفاء الأسئلة الشائعة
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const p = item.querySelector('p');
        p.style.display = p.style.display === 'block' ? 'none' : 'block';
        item.querySelector('i').classList.toggle('fa-chevron-down');
        item.querySelector('i').classList.toggle('fa-chevron-up');
    });
});

// JavaScript لتحريك آراء الطلاب
const testimonials = document.querySelectorAll('.testimonial');
let currentIndex = 0;

function showNextTestimonial() {
    testimonials[currentIndex].style.transform = 'translateX(-100%)';
    currentIndex = (currentIndex + 1) % testimonials.length;
    testimonials[currentIndex].style.transform = 'translateX(0)';
}

setInterval(showNextTestimonial, 3000);




        // Toggle chat window
        function toggleChat() {
            var chatWindow = document.getElementById('chatWindow');
            if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
                chatWindow.style.display = 'flex';
                updateChatStatus('متصل');
            } else {
                chatWindow.style.display = 'none';
            }
        }

        // Minimize chat window
        function minimizeChat() {
            var chatWindow = document.getElementById('chatWindow');
            if (chatWindow.style.height === '30px') {
                chatWindow.style.height = '400px';
            } else {
                chatWindow.style.height = '30px';
            }
        }

        // Send message function
        function sendMessage() {
            var userInput = document.getElementById('userInput');
            var chatBody = document.getElementById('chatBody');

            if (userInput.value.trim() !== '') {
                // Add user message to chat
                var userMessage = document.createElement('div');
                userMessage.className = 'message user-message';
                userMessage.innerHTML = userInput.value + '<span class="timestamp">' + new Date().toLocaleTimeString() + '</span>';
                chatBody.appendChild(userMessage);

                // Scroll chat to bottom
                chatBody.scrollTop = chatBody.scrollHeight;

                // Clear input field
                userInput.value = '';

                // Simulate bot response
                setTimeout(function() {
                    var botMessage = document.createElement('div');
                    botMessage.className = 'message bot-message';
                    botMessage.innerHTML = getBotResponse(userMessage.innerText) + '<span class="timestamp">' + new Date().toLocaleTimeString() + '</span>';
                    chatBody.appendChild(botMessage);

                    // Scroll chat to bottom
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 1000);
            }
        }

        // Send predefined message
        function sendPredefinedMessage(message) {
            var userInput = document.getElementById('userInput');
            userInput.value = message;
            sendMessage();
        }

        // Update chat status
        function updateChatStatus(status) {
            var chatStatus = document.getElementById('chatStatus');
            chatStatus.textContent = status;
            if (status === 'متصل') {
                chatStatus.classList.remove('status-offline');
                chatStatus.classList.add('status-online');
                chatStatus.style.color = 'var(--online-color)';
            } else {
               
                chatStatus.classList.remove('status-online');
                chatStatus.classList.add('status-offline');
                chatStatus.style.color = 'var(--offline-color)';
            }
        }

        // Get bot response
        function getBotResponse(userMessage) {
            var responses = {
                "معلومات عن الدورات": "تقدم دوراتنا تغطية شاملة لجميع جوانب اللغة الإنجليزية بما في ذلك القراءة والكتابة والتحدث والاستماع.",
                "الدورات المتاحة": "لدينا العديد من الدورات المتاحة بما في ذلك دورات اللغة الإنجليزية العامة، ودورات الأعمال، ودورات الإعداد للامتحانات.",
                "مدة الدورة": "تختلف مدة الدورات حسب النوع والمستوى. عادةً ما تتراوح مدة الدورات من 4 إلى 12 أسبوعًا.",
                "رسوم الدورة": "تختلف رسوم الدورة بناءً على الدورة المختارة. يُرجى زيارة صفحة الدورات لمزيد من التفاصيل.",
                "التواصل مع مشرف": "للتواصل مع أحد المشرفين، يُرجى الاتصال على الأرقام التالية: 01000000000 أو 02000000000."
            };

            // تحويل الرسالة إلى حروف صغيرة لمطابقة النصوص
            var normalizedMessage = userMessage.toLowerCase();

            // البحث عن الإجابة الأقرب
            var closestMatch = Object.keys(responses).reduce((closest, question) => {
                var similarity = getSimilarity(normalizedMessage, question);
                return similarity > closest.similarity ? { question, similarity } : closest;
            }, { question: null, similarity: 0 });

            // إذا لم يتم العثور على تطابق، أظهر رسالة افتراضية
            if (closestMatch.similarity < 0.4) {
                return "عذرًا، لم أتمكن من فهم سؤالك. يُرجى إعادة صياغة السؤال أو التواصل مع أحد المشرفين على الأرقام التالية: 01000000000 أو 02000000000.";
            }

            return responses[closestMatch.question];
        }

        // حساب التشابه بين النصوص باستخدام خوارزمية Levenshtein Distance
        function getSimilarity(s1, s2) {
            var longer = s1.length > s2.length ? s1 : s2;
            var shorter = s1.length > s2.length ? s2 : s1;
            var longerLength = longer.length;
            if (longerLength == 0) {
                return 1.0;
            }
            return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
        }

        function editDistance(s1, s2) {
            s1 = s1.toLowerCase();
            s2 = s2.toLowerCase();
            var costs = new Array();
            for (var i = 0; i <= s1.length; i++) {
                var lastValue = i;
                for (var j = 0; j <= s2.length; j++) {
                    if (i == 0)
                        costs[j] = j;
                    else {
                        if (j > 0) {
                            var newValue = costs[j - 1];
                            if (s1.charAt(i - 1) != s2.charAt(j - 1))
                                newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                            costs[j - 1] = lastValue;
                            lastValue = newValue;
                        }
                    }
                }
                if (i > 0)
                    costs[s2.length] = lastValue;
            }
            return costs[s2.length];
        }