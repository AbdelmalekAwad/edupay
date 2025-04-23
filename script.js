// Sample content data
const contentData = [
    {
        id: 1,
        title: 'الرياضيات للصف الأول',
        category: 'math',
        level: 'primary',
        type: 'pdf',
        offline: true
    },
    {
        id: 2,
        title: 'علوم الصف الثاني',
        category: 'science',
        level: 'primary',
        type: 'video',
        offline: true
    },
    {
        id: 3,
        title: 'اللغة العربية',
        category: 'arabic',
        level: 'secondary',
        type: 'pdf',
        offline: false
    }
];

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category');
    const levelSelect = document.getElementById('level');
    const contentGrid = document.querySelector('.content-grid');
    const aiForm = document.getElementById('aiForm');
    const aiSuggestions = document.querySelector('.ai-suggestions');
    const scrollTopBtn = document.querySelector('.scroll-top');

    // Initialize content grid
    renderContent(contentData);

    // Event Listeners
    categorySelect.addEventListener('change', filterContent);
    levelSelect.addEventListener('change', filterContent);
    aiForm.addEventListener('submit', handleAISuggestions);

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll to Top Button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Enhanced Content Loading
    const contentCards = document.querySelectorAll('.content-card');
    contentCards.forEach(card => {
        card.classList.add('loading');
        setTimeout(() => {
            card.classList.remove('loading');
        }, 1000);
    });
});

// Render content cards
function renderContent(content) {
    const contentGrid = document.querySelector('.content-grid');
    contentGrid.innerHTML = '';

    content.forEach(item => {
        const card = document.createElement('div');
        card.className = 'content-card';
        card.innerHTML = `
            <div class="card-content">
                <h3>${item.title}</h3>
                <div class="card-meta">
                    <span class="category">${getCategoryName(item.category)}</span>
                    <span class="level">${getLevelName(item.level)}</span>
                </div>
                <div class="card-actions">
                    <button class="btn primary">عرض المحتوى</button>
                    ${item.offline ? '<button class="btn secondary">تحميل</button>' : ''}
                </div>
            </div>
        `;
        contentGrid.appendChild(card);
    });
}

// Filter content based on selected category and level
function filterContent() {
    const category = document.getElementById('category').value;
    const level = document.getElementById('level').value;

    let filteredContent = contentData;

    if (category) {
        filteredContent = filteredContent.filter(item => item.category === category);
    }

    if (level) {
        filteredContent = filteredContent.filter(item => item.level === level);
    }

    renderContent(filteredContent);
}

// Handle AI suggestions form submission
function handleAISuggestions(e) {
    e.preventDefault();
    const level = document.getElementById('educationLevel').value;
    
    if (!level) {
        alert('الرجاء اختيار المستوى التعليمي');
        return;
    }

    // Simulate AI suggestions
    const suggestions = getAISuggestions(level);
    displayAISuggestions(suggestions);
}

// Display AI suggestions
function displayAISuggestions(suggestions) {
    const aiSuggestions = document.querySelector('.ai-suggestions');
    aiSuggestions.innerHTML = `
        <h3>المحتوى المقترح</h3>
        <div class="suggestions-list">
            ${suggestions.map(suggestion => `
                <div class="suggestion-item">
                    <h4>${suggestion.title}</h4>
                    <p>${suggestion.description}</p>
                    <button class="btn primary">عرض المحتوى</button>
                </div>
            `).join('')}
        </div>
    `;
}

// Helper functions
function getCategoryName(category) {
    const categories = {
        math: 'رياضيات',
        science: 'علوم',
        arabic: 'لغة عربية'
    };
    return categories[category] || category;
}

function getLevelName(level) {
    const levels = {
        primary: 'ابتدائي',
        secondary: 'متوسط',
        high: 'ثانوي'
    };
    return levels[level] || level;
}

function getAISuggestions(level) {
    // Simulate AI suggestions based on level
    const suggestions = {
        beginner: [
            {
                title: 'مقدمة في الرياضيات',
                description: 'دورة أساسية في الرياضيات للمبتدئين'
            },
            {
                title: 'أساسيات اللغة العربية',
                description: 'تعلم أساسيات اللغة العربية بطريقة سهلة'
            }
        ],
        intermediate: [
            {
                title: 'الجبر المتوسط',
                description: 'دورة متقدمة في الجبر'
            },
            {
                title: 'الفيزياء الأساسية',
                description: 'مقدمة في الفيزياء للمستوى المتوسط'
            }
        ],
        advanced: [
            {
                title: 'حساب التفاضل والتكامل',
                description: 'دورة متقدمة في التفاضل والتكامل'
            },
            {
                title: 'الفيزياء المتقدمة',
                description: 'مواضيع متقدمة في الفيزياء'
            }
        ]
    };

    return suggestions[level] || [];
}

// Add smooth scroll behavior
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = 'var(--background)';
    }
}); 