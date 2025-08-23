// Global variables
let currentPersona = '';
let currentScenario = 1;
let totalScenarios = 25;
let correctAnswers = 0;

// Enhanced scam scenarios database
const scamScenarios = {
    student: [
        {
            title: "Emergency Scholarship Alert",
            content: "🎓 'Congratulations! You've been selected for a $5,000 emergency scholarship! To claim it immediately, we need a $200 processing fee via gift cards. This offer expires in 30 minutes!'",
            correct: "This sounds like a scam. I'll verify independently through official channels.",
            incorrect: "Oh great! What gift cards do you need?",
            explanation: "Real scholarships never require upfront fees or gift card payments. Always verify through official educational institutions."
        },
        {
            title: "Student Loan Forgiveness Scam",
            content: "📞 'This is the Federal Student Aid calling. Your loans qualify for immediate forgiveness, but you must act now and pay a $500 processing fee.'",
            correct: "I'll hang up and contact my loan servicer directly.",
            incorrect: "That's amazing! How do I pay the fee?",
            explanation: "Government agencies don't cold-call about loan forgiveness or charge processing fees."
        },
        {
            title: "Fake Job Interview",
            content: "💼 'You're hired! No interview needed. Just send $300 for equipment and training materials to this address, and you can start working from home immediately.'",
            correct: "Real jobs don't require upfront payments. This is suspicious.",
            incorrect: "Perfect! Where should I send the money?",
            explanation: "Legitimate employers never ask employees to pay for equipment or training upfront."
        }
    ],
    professional: [
        {
            title: "CEO Fraud Email",
            content: "💼 'URGENT: This is your CEO. I need you to transfer $50,000 to this account immediately for a confidential acquisition. Don't discuss this with anyone.'",
            correct: "I'll verify this request through official channels before taking any action.",
            incorrect: "Right away, sir! I'll process the transfer immediately.",
            explanation: "Always verify unusual financial requests through established communication channels, even if they appear to come from executives."
        },
        {
            title: "Cryptocurrency Investment Scam",
            content: "📈 'Limited time offer! Invest in our exclusive crypto fund and see 500% returns in 30 days. Minimum investment only $10,000!'",
            correct: "Investment returns this high are impossible. This is clearly a scam.",
            incorrect: "Amazing returns! How do I invest right away?",
            explanation: "No legitimate investment can guarantee such high returns. Always research investment opportunities thoroughly."
        }
    ],
    senior: [
        {
            title: "Medicare Fraud Call",
            content: "👴 'This is Medicare calling about your benefits. Your account will be terminated unless you verify your Social Security number and banking information right now.'",
            correct: "Medicare doesn't make unsolicited calls. I'll hang up and call Medicare directly.",
            incorrect: "Oh no! Here's my Social Security number...",
            explanation: "Medicare will never call to ask for personal information or threaten to terminate benefits."
        },
        {
            title: "Tech Support Scam",
            content: "💻 'This is Microsoft calling. Your computer is infected with viruses. Allow us remote access immediately to fix it, or your data will be lost forever.'",
            correct: "Microsoft doesn't make unsolicited calls. I'll hang up.",
            incorrect: "Please help! How do I give you access to my computer?",
            explanation: "Tech companies never cold-call about computer problems. Never give remote access to unsolicited callers."
        }
    ],
    homemaker: [
        {
            title: "Utility Shut-off Scam",
            content: "🏠 'Emergency! Your electricity will be disconnected in 30 minutes due to unpaid bills. Pay immediately with gift cards to avoid service interruption.'",
            correct: "I'll contact my utility company directly to verify my account status.",
            incorrect: "Please don't shut off my power! I'll buy gift cards right away.",
            explanation: "Utility companies don't demand immediate gift card payments. Always verify through official channels."
        },
        {
            title: "Fake Charity Scam",
            content: "❤️ 'Help hurricane victims now! Donate $500 immediately via wire transfer. Every second counts, and children are suffering!'",
            correct: "I'll research this charity and donate through official channels.",
            incorrect: "Those poor children! I'll send the money right away.",
            explanation: "Research charities before donating. Legitimate charities don't pressure for immediate wire transfers."
        }
    ]
};

// Initialize particles on page load
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Enhanced Analyzer functionality
function startAnalysis() {
    const uploadArea = document.getElementById('upload-area');
    const transcript = document.getElementById('transcript');
    const category = document.getElementById('category');
    
    // Simulate file upload
    uploadArea.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
            <div style="width: 200px; height: 40px; background: rgba(0, 212, 255, 0.2); border-radius: 10px; position: relative; overflow: hidden;">
                <div style="height: 100%; background: #00d4ff; animation: waveform 2s infinite; border-radius: 10px;"></div>
            </div>
            <span style="color: #00d4ff;">0:03</span>
        </div>
        <p style="margin-top: 1rem; color: #a1a1aa;">audio_file.mp3</p>
    `;
    
    // Simulate transcript analysis
    setTimeout(() => {
        transcript.value = "Send Puntry State the money or I'll share your picture online.";
        category.value = "Extortion Scam";
        
        // Show results
        document.getElementById('analysis-results').style.display = 'block';
    }, 2000);
}

function clearAnalysis() {
    document.getElementById('upload-area').innerHTML = `
        <div class="upload-icon">🔍</div>
        <h3 style="color: #ffffff; margin-bottom: 1rem;">Drop Audio Here</h3>
        <p style="color: #a1a1aa;">- or -</p>
        <p style="color: #a1a1aa; margin-top: 0.5rem;">Click to Upload</p>
    `;
    document.getElementById('transcript').value = '';
    document.getElementById('category').value = '';
    document.getElementById('analysis-results').style.display = 'none';
}

// Enhanced Learning functionality
function startPersonaTraining(persona) {
    currentPersona = persona;
    currentScenario = 1;
    correctAnswers = 0;
    
    document.getElementById('training-interface').style.display = 'block';
    loadScenario();
}

function loadScenario() {
    const scenarios = scamScenarios[currentPersona];
    if (!scenarios || currentScenario > totalScenarios) {
        completeTraining();
        return;
    }

    // Generate random scenario or use predefined ones
    let scenario;
    if (currentScenario <= scenarios.length) {
        scenario = scenarios[currentScenario - 1];
    } else {
        // Generate additional random scenarios
        scenario = generateRandomScenario(currentPersona);
    }

    document.getElementById('scenario-counter').textContent = `Scenario ${currentScenario} of ${totalScenarios}`;
    document.getElementById('scenario-title').textContent = scenario.title;
    document.getElementById('scenario-content').innerHTML = `
        <p><strong style="color: #ef4444;">Suspected Scammer:</strong></p>
        <p style="margin-top: 1rem; font-size: 1.1rem;">${scenario.content}</p>
    `;

    document.getElementById('response-options').innerHTML = `
        <button class="option-btn correct-option" onclick="handleResponse(true, '${scenario.explanation.replace(/'/g, "\\'")}')">
            🛡️ ${scenario.correct}
        </button>
        <button class="option-btn incorrect-option" onclick="handleResponse(false, '${scenario.explanation.replace(/'/g, "\\'")}')">
            😰 ${scenario.incorrect}
        </button>
    `;

    // Hide result and buttons
    document.getElementById('scenario-result').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('complete-btn').style.display = 'none';
}

function generateRandomScenario(persona) {
    const randomScenarios = {
        student: [
            {
                title: "Fake Internship Offer",
                content: "💼 'Congratulations! You've been selected for a paid internship at Google. Send $150 for background check processing.'",
                correct: "Google doesn't charge for background checks. This is fake.",
                incorrect: "Wow! I'll send the money for the background check.",
                explanation: "Legitimate companies never charge applicants for background checks or processing fees."
            },
            {
                title: "Online Course Scam",
                content: "📚 'Exclusive offer! Get your degree in 30 days for just $999. No studying required, guaranteed acceptance!'",
                correct: "Accredited degrees require proper coursework. This is fraudulent.",
                incorrect: "That sounds perfect for my busy schedule!",
                explanation: "Legitimate educational institutions require coursework and proper accreditation processes."
            }
        ],
        professional: [
            {
                title: "Business Account Verification",
                content: "🏢 'Your business account will be suspended. Click this link and enter your login credentials to verify your identity immediately.'",
                correct: "I'll log into my account directly through the official website.",
                incorrect: "I can't afford to lose my account! I'll click the link now.",
                explanation: "Always access accounts through official websites, never through links in emails or messages."
            },
            {
                title: "Tax Refund Scam",
                content: "💰 'IRS urgent notice: You're eligible for a $5,000 tax refund. Provide your bank details to receive it immediately.'",
                correct: "The IRS doesn't contact people this way. I'll verify through official channels.",
                incorrect: "Great! Here are my banking details.",
                explanation: "The IRS communicates through official mail, not unsolicited calls or emails demanding immediate action."
            }
        ],
        senior: [
            {
                title: "Grandchild Emergency Scam",
                content: "😢 'Grandma, it's me! I'm in jail and need $2,000 for bail right now. Please don't tell Mom and Dad!'",
                correct: "I'll hang up and call my grandchild directly to verify.",
                incorrect: "Oh my goodness! I'll send the money right away!",
                explanation: "Always verify emergency calls by contacting the person directly through known contact information."
            },
            {
                title: "Social Security Scam",
                content: "🏛️ 'This is Social Security Administration. Your benefits are suspended due to suspicious activity. Confirm your SSN immediately.'",
                correct: "SSA doesn't call about suspensions. I'll contact them directly.",
                incorrect: "Please don't suspend my benefits! My SSN is...",
                explanation: "Social Security Administration never calls to threaten benefit suspension or request personal information over the phone."
            }
        ],
        homemaker: [
            {
                title: "Romance Scam",
                content: "💕 'My love, I'm stranded overseas and need $1,000 for emergency medical treatment. Please wire money immediately!'",
                correct: "This sounds like a romance scam. I'll be cautious and investigate.",
                incorrect: "Of course, darling! I'll send the money right away.",
                explanation: "Romance scammers create fake relationships and then request money for emergencies. Always verify identity in person or through video calls."
            },
            {
                title: "Package Delivery Scam",
                content: "📦 'FedEx here. Your package requires a $25 delivery fee. Pay now or it will be returned to sender.'",
                correct: "FedEx doesn't request fees this way. I'll contact them directly.",
                incorrect: "I need that package! How do I pay the fee?",
                explanation: "Legitimate delivery companies don't request unexpected fees through unsolicited calls or texts."
            }
        ]
    };
    
    const scenarios = randomScenarios[persona] || randomScenarios.student;
    return scenarios[Math.floor(Math.random() * scenarios.length)];
}

function handleResponse(isCorrect, explanation) {
    const resultDiv = document.getElementById('scenario-result');
    
    if (isCorrect) {
        correctAnswers++;
        resultDiv.className = 'scenario-result result-correct';
        resultDiv.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">🏆</div>
            <h3 style="color: #10b981; margin-bottom: 1rem;">Excellent Choice!</h3>
            <p>${explanation}</p>
        `;
    } else {
        resultDiv.className = 'scenario-result result-incorrect';
        resultDiv.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
            <h3 style="color: #ef4444; margin-bottom: 1rem;">Danger Zone!</h3>
            <p>${explanation}</p>
        `;
    }
    
    resultDiv.style.display = 'block';
    
    if (currentScenario < totalScenarios) {
        document.getElementById('next-btn').style.display = 'inline-block';
    } else {
        document.getElementById('complete-btn').style.display = 'inline-block';
    }
}

function nextScenario() {
    currentScenario++;
    loadScenario();
}

function completeTraining() {
    const percentage = Math.round((correctAnswers / totalScenarios) * 100);
    let grade, message;
    
    if (percentage >= 90) {
        grade = "A+";
        message = "Outstanding! You're a scam detection expert!";
    } else if (percentage >= 80) {
        grade = "A";
        message = "Excellent work! You have strong scam awareness.";
    } else if (percentage >= 70) {
        grade = "B";
        message = "Good job! Keep practicing to improve further.";
    } else {
        grade = "C";
        message = "Consider reviewing the scenarios again to strengthen your skills.";
    }

    document.getElementById('scenario-content').innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
            <h3 style="color: #00d4ff; margin-bottom: 1rem;">Training Complete!</h3>
            <div style="font-size: 3rem; color: #10b981; margin: 1rem 0;">${grade}</div>
            <p style="font-size: 1.2rem; margin-bottom: 2rem;">Score: ${correctAnswers}/${totalScenarios} (${percentage}%)</p>
            <p>${message}</p>
            <button class="hero-btn" onclick="resetTraining()" style="margin-top: 2rem;">Start New Training</button>
        </div>
    `;
    
    document.getElementById('response-options').innerHTML = '';
    document.getElementById('scenario-result').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('complete-btn').style.display = 'none';
}

function resetTraining() {
    document.getElementById('training-interface').style.display = 'none';
}

// Alert system
function showAlert(title, message, type = 'normal') {
    const overlay = document.createElement('div');
    overlay.className = 'alert-overlay';
    
    const alertBox = document.createElement('div');
    alertBox.className = `alert-box ${type}`;
    
    alertBox.innerHTML = `
        <h2 class="alert-title">${title}</h2>
        <p class="alert-message">${message}</p>
        <button class="alert-btn" onclick="closeAlert(this)">OK</button>
    `;
    
    overlay.appendChild(alertBox);
    document.body.appendChild(overlay);
}

function closeAlert(button) {
    const overlay = button.closest('.alert-overlay');
    overlay.remove();
}

// Emergency functionality
function activateEmergencyProtocol() {
    showAlert('🚨 EMERGENCY PROTOCOL ACTIVATED', 
        '⚡ Immediate Actions Initiated:\n\n' +
        '• Blocking suspected scammer numbers\n' +
        '• Alerting your emergency contacts\n' +
        '• Connecting to fraud prevention hotlines\n' +
        '• Generating incident report\n' +
        '• Securing your digital accounts\n\n' +
        '📞 Emergency support connecting...', 
        'emergency');
}

function generateDetailedReport() {
    showAlert('📄 Generating Report...', 
        'Creating comprehensive analysis report:\n\n' +
        '• Threat assessment summary\n' +
        '• Audio forensic analysis\n' +
        '• Scammer profile data\n' +
        '• Recommended actions\n' +
        '• Legal documentation\n\n' +
        'Report will be ready in 30 seconds...');
}

function reportToAuthorities() {
    showAlert('🚨 REPORTING TO AUTHORITIES', 
        '📋 Filing reports with:\n\n' +
        '• Federal Trade Commission (FTC)\n' +
        '• FBI Internet Crime Complaint Center\n' +
        '• Local law enforcement\n' +
        '• Phone carrier fraud department\n\n' +
        'Your case number: GUA-2025-' + Math.random().toString(36).substr(2, 9).toUpperCase(), 
        'emergency');
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    
    // Add click handler to upload area
    const uploadArea = document.getElementById('upload-area');
    if (uploadArea) {
        uploadArea.addEventListener('click', function() {
            // Simulate file selection dialog
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'audio/*';
            input.click();
            
            input.onchange = function() {
                if (input.files.length > 0) {
                    const fileName = input.files[0].name;
                    uploadArea.innerHTML = `
                        <div class="upload-icon">📁</div>
                        <h3 style="color: #ffffff; margin-bottom: 1rem;">File Selected</h3>
                        <p style="color: #00d4ff;">${fileName}</p>
                        <p style="color: #a1a1aa; margin-top: 0.5rem;">Ready to analyze</p>
                    `;
                }
            };
        });
    }
});

function toggleProfileDropdown() {
    const profileMenu = document.getElementById('profileMenu');
    profileMenu.classList.toggle('show');
}

function editProfile() {
    const profileMenu = document.getElementById('profileMenu');
    profileMenu.classList.remove('show');
    
    showAlert('Edit Profile', 
        'Profile editing functionality:\n\n' +
        '• Update personal information\n' +
        '• Change notification preferences\n' +
        '• Modify security settings\n' +
        '• Update emergency contacts\n\n' +
        'Feature coming soon...');
}

function logout() {
    const profileMenu = document.getElementById('profileMenu');
    profileMenu.classList.remove('show');
    
    showAlert('Logout Confirmation', 
        'Are you sure you want to logout?\n\n' +
        '• Your session will be terminated\n' +
        '• Unsaved progress will be lost\n' +
        '• You\'ll need to login again\n\n' +
        'Logging out...', 
        'normal');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const profileDropdown = document.querySelector('.profile-dropdown');
    const profileMenu = document.getElementById('profileMenu');
    
    if (profileDropdown && !profileDropdown.contains(event.target)) {
        profileMenu.classList.remove('show');
    }
});
// Add these JavaScript functions to your existing script.js file

// Mobile menu toggle function
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
}

// Update the existing showSection function to close mobile menu
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Close mobile menu if open
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnToggle = mobileToggle.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('navMenu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
});



 window.addEventListener('load', () => {
            const ctx = document.getElementById('threatsChart').getContext('2d');

            const labels = ['2020', '2021', '2022', '2023', '2024'];
            const data = [120000, 180000, 320000, 650000, 1000000];

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Fraud Cases Detected in India',
                        data: data,
                        borderColor: '#5cb8ff',
                        backgroundColor: 'rgba(0, 212, 255, 0.2)',
                        pointBackgroundColor: '#00d4ff',
                        pointBorderColor: '#fff',
                        tension: 0.4,
                        fill: true,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            ticks: {
                                color: '#555'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            ticks: {
                                color: '#555'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: '#3c4142'
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            titleColor: '#3c4142',
                            bodyColor: '#555',
                            borderColor: '#00d4ff',
                            borderWidth: 1
                        }
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeInOutQuad'
                    }
                }
            });
        });