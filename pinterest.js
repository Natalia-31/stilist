/**
 * SPIRA - Pinterest Module
 * Анализ вдохновляющих образов
 */

document.addEventListener('DOMContentLoaded', () => {
    initPinterestUpload();
    initPinterestUrl();
});

function initPinterestUpload() {
    const zone = document.getElementById('pinterestUploadZone');
    const input = document.getElementById('pinterestUpload');
    
    zone?.addEventListener('click', () => input?.click());
    
    zone?.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('dragover');
    });
    
    zone?.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    
    zone?.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('dragover');
        handlePinterestFiles(e.dataTransfer.files);
    });
    
    input?.addEventListener('change', () => handlePinterestFiles(input.files));
}

function handlePinterestFiles(files) {
    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            if (window.SPIRA?.state) {
                window.SPIRA.state.pinterestImages.push({
                    id: Date.now() + Math.random(),
                    image: e.target.result
                });
                window.SPIRA.saveState();
            }
            renderPinterestGallery();
            analyzePinterestImages();
        };
        reader.readAsDataURL(file);
    });
    
    window.SPIRA?.showNotification('Изображения добавлены', 'success');
}

function initPinterestUrl() {
    document.getElementById('importPinterest')?.addEventListener('click', () => {
        const url = document.getElementById('pinterestUrl')?.value;
        if (!url) {
            window.SPIRA?.showNotification('Введите ссылку', 'error');
            return;
        }
        
        window.SPIRA?.showNotification('Импорт из Pinterest пока недоступен в MVP', 'info');
    });
}

function renderPinterestGallery() {
    const gallery = document.getElementById('pinterestGallery');
    const images = window.SPIRA?.state?.pinterestImages || [];
    
    if (!gallery) return;
    
    if (images.length === 0) {
        gallery.innerHTML = '';
        return;
    }
    
    gallery.innerHTML = images.map(img => `
        <div class="pinterest-item">
            <img src="${img.image}" alt="Pinterest">
        </div>
    `).join('');
}

function analyzePinterestImages() {
    const images = window.SPIRA?.state?.pinterestImages || [];
    const results = document.getElementById('analysisResults');
    
    if (!results) return;
    
    if (images.length < 3) {
        results.innerHTML = `<p style="color:var(--text-secondary);font-size:0.8rem">Загрузите минимум 3 изображения для анализа (сейчас: ${images.length})</p>`;
        return;
    }
    
    // Мок-анализ
    const styleAnalysis = {
        dominantStyle: ['Классический', 'Минимализм', 'Кэжуал', 'Романтический'][Math.floor(Math.random() * 4)],
        colors: ['Черный', 'Белый', 'Бежевый', 'Синий'].slice(0, Math.floor(Math.random() * 3) + 2),
        silhouettes: ['Приталенный', 'Оверсайз', 'Прямой'][Math.floor(Math.random() * 3)]
    };
    
    results.innerHTML = `
        <div class="analysis-item">
            <h4>Доминирующий стиль</h4>
            <p style="color:var(--gold-light)">${styleAnalysis.dominantStyle}</p>
        </div>
        <div class="analysis-item">
            <h4>Цветовая палитра</h4>
            <p>${styleAnalysis.colors.join(', ')}</p>
        </div>
        <div class="analysis-item">
            <h4>Предпочитаемые силуэты</h4>
            <p>${styleAnalysis.silhouettes}</p>
        </div>
    `;
    
    // Обновляем стиль пользователя на основе анализа
    const styleMap = {
        'Классический': 'classic',
        'Минимализм': 'minimalist',
        'Кэжуал': 'casual',
        'Романтический': 'romantic'
    };
    
    if (window.SPIRA?.state && !window.SPIRA.state.user.style) {
        window.SPIRA.state.user.style = styleMap[styleAnalysis.dominantStyle] || 'casual';
        window.SPIRA.saveState();
    }
    
    window.SPIRA?.showNotification('Стиль определён: ' + styleAnalysis.dominantStyle, 'success');
}