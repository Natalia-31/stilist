/**
 * SPIRA - Main Application
 * Premium AI Стилист
 */

// Состояние приложения
const AppState = {
    user: {
        name: '',
        budget: 50000,
        colors: [],
        style: null,
        photo: null, // новoе поле для фотографии пользователя
        colorType: null // новoе поле для цветотипа
    },
    wardrobe: [],
    pinterestImages: [],
    generatedOutfits: []
};

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSplash();
    initProfile();
    initStyleCards();
    initPriceRange();
    loadSavedState();
});

// Анализ загруженного фото для получения цветотипа
function analyzePhoto(photoFile) {
    // Заглушка функции анализа
    // Здесь должна быть реализация с использованием AI для анализа фото
    // и определения цветотипа.
    // Вернём произвольное значение для примера
    return 'Зимний'; 
}

// Обновление профиля
function initProfile() {
    // Выбор цветов
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            opt.classList.toggle('selected');
            updateSelectedColors();
        });
    });

    // Загрузка фото
    const photoUpload = document.getElementById('userPhotoUpload');
    photoUpload?.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            AppState.user.photo = URL.createObjectURL(file);
            AppState.user.colorType = analyzePhoto(file); // Анализ фото
            showNotification('Фотография добавлена и проанализирована', 'success');
        }
    });

    // Бюджет теги
    const budgetTags = document.querySelectorAll('.budget-tag');
    budgetTags.forEach(tag => {
        tag.addEventListener('click', () => {
            budgetTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            
            const budgetInput = document.getElementById('monthlyBudget');
            if (tag.classList.contains('budget-low')) budgetInput.value = 30000;
            else if (tag.classList.contains('budget-mid')) budgetInput.value = 55000;
            else budgetInput.value = 100000;
        });
    });

    // Сохранение профиля
    document.getElementById('saveProfile')?.addEventListener('click', saveProfile);
}

// Обновление генерируемых образов
function generateOutfits() {
    if (AppState.wardrobe.length === 0) {
        showNotification('Сначала добавьте вещи в гардероб', 'error');
        return;
    }

    // Заглушка логики генерации образов
    AppState.generatedOutfits = ['Образ 1', 'Образ 2', 'Образ 3'];
    // Здесь будет интеграция с AI для создания образов на основе гардероба и стиля

    renderOutfits();
    showNotification('Образы сгенерированы', 'success');
}

function renderOutfits() {
    const grid = document.getElementById('outfitsGrid');
    grid.innerHTML = ''; // Очистить содержимое

    for (const outfit of AppState.generatedOutfits) {
        const card = document.createElement('div');
        card.className = 'outfit-card';
        card.innerHTML = `<div class='outfit-content'><h4>${outfit}</h4></div>`;
        grid.appendChild(card);
    }
}

// Остальная часть кода остается без изменений