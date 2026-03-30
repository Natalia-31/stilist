/**
 * SPIRA - Wardrobe Module
 * Управление гардеробом пользователя
 */

// Категории одежды
const CATEGORIES = {
    top: 'Верх',
    bottom: 'Низ', 
    dress: 'Платья',
    outerwear: 'Верхняя одежда',
    shoes: 'Обувь',
    accessories: 'Аксессуары'
};

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    initWardrobeUpload();
    initCategoryFilter();
    renderWardrobe();
});

// Загрузка фото
function initWardrobeUpload() {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('wardrobeUpload');
    
    // Клик по зоне
    uploadZone?.addEventListener('click', () => fileInput?.click());
    
    // Drag & Drop
    uploadZone?.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });
    
    uploadZone?.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragover');
    });
    
    uploadZone?.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });
    
    // Выбор файлов
    fileInput?.addEventListener('change', () => {
        handleFiles(fileInput.files);
    });
}

// Обработка файлов
function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const item = {
                id: Date.now() + Math.random(),
                image: e.target.result,
                category: detectCategory(file.name),
                color: null,
                name: file.name.replace(/\.[^/.]+$/, '')
            };
            
            if (window.SPIRA?.state) {
                window.SPIRA.state.wardrobe.push(item);
                window.SPIRA.saveState();
            }
            
            renderWardrobe();
            analyzeWardrobeItem(item);
        };
        reader.readAsDataURL(file);
    });
    
    window.SPIRA?.showNotification('Вещи добавлены', 'success');
}

// Определение категории по имени файла
function detectCategory(filename) {
    const name = filename.toLowerCase();
    if (name.includes('shirt') || name.includes('blouse') || name.includes('футболка') || name.includes('рубашка')) return 'top';
    if (name.includes('pant') || name.includes('jeans') || name.includes('брюки') || name.includes('джинсы')) return 'bottom';
    if (name.includes('dress') || name.includes('платье')) return 'dress';
    if (name.includes('coat') || name.includes('jacket') || name.includes('пальто') || name.includes('куртка')) return 'outerwear';
    if (name.includes('shoe') || name.includes('boot') || name.includes('обувь') || name.includes('ботинки')) return 'shoes';
    return 'accessories';
}

// Фильтр категорий
function initCategoryFilter() {
    document.getElementById('categoryFilter')?.addEventListener('change', renderWardrobe);
}

// Рендер гардероба
function renderWardrobe() {
    const grid = document.getElementById('wardrobeGrid');
    const filter = document.getElementById('categoryFilter')?.value || 'all';
    const items = window.SPIRA?.state?.wardrobe || [];
    const filtered = filter === 'all' ? items : items.filter(i => i.category === filter);
    
    if (!grid) return;
    
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <span>👗</span>
                <p>Гардероб пуст</p>
                <p>Загрузите фотографии вещей</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filtered.map(item => `
        <div class="wardrobe-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="wardrobe-item-info">
                <h4>${item.name}</h4>
                <p>${CATEGORIES[item.category] || item.category}</p>
                ${item.styleMatch ? `<p class="style-match">Подходит стилю: ${item.styleMatch}</p>` : ''}
            </div>
            <div class="wardrobe-item-actions">
                <button class="btn-edit" onclick="editWardrobeItem('${item.id}')">Изменить</button>
                <button class="btn-delete" onclick="deleteWardrobeItem('${item.id}')">Удалить</button>
            </div>
        </div>
    `).join('');
}

// Анализ вещи
function analyzeWardrobeItem(item) {
    // Определяем совместимость со стилем пользователя
    const userStyle = window.SPIRA?.state?.user?.style;
    
    const styleCompatibility = {
        classic: ['top', 'dress', 'outerwear'],
        casual: ['top', 'bottom', 'shoes'],
        romantic: ['dress', 'accessories'],
        sporty: ['top', 'bottom', 'shoes'],
        minimalist: ['top', 'bottom'],
        boho: ['dress', 'accessories', 'top']
    };
    
    if (userStyle && styleCompatibility[userStyle]?.includes(item.category)) {
        item.styleMatch = '✓ Да';
    } else if (userStyle) {
        item.styleMatch = 'Нейтрально';
    }
}

// Редактирование
window.editWardrobeItem = function(id) {
    const items = window.SPIRA?.state?.wardrobe || [];
    const item = items.find(i => i.id == id);
    if (!item) return;
    
    const newCategory = prompt('Категория (top, bottom, dress, outerwear, shoes, accessories):', item.category);
    if (newCategory && CATEGORIES[newCategory]) {
        item.category = newCategory;
        window.SPIRA.saveState();
        renderWardrobe();
    }
};

// Удаление
window.deleteWardrobeItem = function(id) {
    if (!confirm('Удалить эту вещь?')) return;
    
    const items = window.SPIRA?.state?.wardrobe || [];
    const index = items.findIndex(i => i.id == id);
    if (index > -1) {
        items.splice(index, 1);
        window.SPIRA.saveState();
        renderWardrobe();
        window.SPIRA?.showNotification('Вещь удалена', 'info');
    }
};