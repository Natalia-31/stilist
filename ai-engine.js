/**
 * SPIRA - AI Engine
 * Генерация образов и рекомендаций
 */

// Мок-данные товаров
const MOCK_PRODUCTS = [
    { id: 1, name: 'Кашемировый свитер', category: 'top', price: 15000, rating: 4.8, style: 'classic', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop' },
    { id: 2, name: 'Джинсы прямые', category: 'bottom', price: 8500, rating: 4.6, style: 'casual', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop' },
    { id: 3, name: 'Шелковая блуза', category: 'top', price: 12000, rating: 4.9, style: 'romantic', image: 'https://images.unsplash.com/photo-1598554747436-c9ea3d57095a?w=200&h=200&fit=crop' },
    { id: 4, name: 'Тренч классический', category: 'outerwear', price: 35000, rating: 4.7, style: 'classic', image: 'https://images.unsplash.com/photo-1544923246-77307dd628b0?w=200&h=200&fit=crop' },
    { id: 5, name: 'Кроссовки minimalist', category: 'shoes', price: 9500, rating: 4.5, style: 'sporty', image: 'https://images.unsplash.com/photo-1542291026-7eec4fd34f8d?w=200&h=200&fit=crop' },
    { id: 6, name: 'Платье миди', category: 'dress', price: 18000, rating: 4.8, style: 'romantic', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop' },
    { id: 7, name: 'Блейзер оверсайз', category: 'outerwear', price: 22000, rating: 4.6, style: 'casual', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=200&fit=crop' },
    { id: 8, name: 'Юбка-карандаш', category: 'bottom', price: 7500, rating: 4.7, style: 'classic', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=200&h=200&fit=crop' }
];

// Генерация образов
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generateOutfits')?.addEventListener('click', generateOutfits);
});

function generateOutfits() {
    const wardrobe = window.SPIRA?.state?.wardrobe || [];
    const userStyle = window.SPIRA?.state?.user?.style || 'casual';
    const budget = window.SPIRA?.state?.user?.budget || 50000;
    
    if (wardrobe.length < 2) {
        window.SPIRA?.showNotification('Добавьте минимум 2 вещи в гардероб', 'error');
        return;
    }
    
    window.SPIRA?.showNotification('Генерация образов...', 'info');
    
    // Имитация AI генерации
    setTimeout(() => {
        const outfits = createOutfits(wardrobe, userStyle, budget);
        window.SPIRA.state.generatedOutfits = outfits;
        window.SPIRA.saveState();
        renderOutfits(outfits);
        window.SPIRA?.showNotification('Образы готовы!', 'success');
    }, 1500);
}

function createOutfits(wardrobe, style, budget) {
    const outfits = [];
    const categories = { top: [], bottom: [], dress: [], outerwear: [], shoes: [], accessories: [] };
    
    wardrobe.forEach(item => {
        if (categories[item.category]) {
            categories[item.category].push(item);
        }
    });
    
    // Создаем комбинации
    for (let i = 0; i < 5; i++) {
        const outfit = {
            id: Date.now() + i,
            name: getOutfitName(style, i),
            items: [],
            totalPrice: 0,
            matchScore: Math.floor(Math.random() * 20) + 80,
            explanation: ''
        };
        
        // Добавляем верх
        if (categories.top.length) {
            const item = categories.top[Math.floor(Math.random() * categories.top.length)];
            outfit.items.push(item);
        }
        
        // Добавляем низ или платье
        if (categories.dress.length && Math.random() > 0.5) {
            outfit.items.push(categories.dress[Math.floor(Math.random() * categories.dress.length)]);
        } else if (categories.bottom.length) {
            outfit.items.push(categories.bottom[Math.floor(Math.random() * categories.bottom.length)]);
        }
        
        // Добавляем обувь
        if (categories.shoes.length) {
            outfit.items.push(categories.shoes[Math.floor(Math.random() * categories.shoes.length)]);
        }
        
        // Рассчитываем цену и объяснение
        outfit.totalPrice = Math.floor(budget * (0.3 + Math.random() * 0.4));
        outfit.explanation = generateExplanation(outfit, style);
        
        outfits.push(outfit);
    }
    
    return outfits;
}

function getOutfitName(style, index) {
    const names = {
        classic: ['Деловой', 'Офисный', 'Элегантный', 'Сдержанный', 'Статусный'],
        casual: ['Повседневный', 'Городской', 'Уютный', 'Прогулочный', 'Свободный'],
        romantic: ['Нежный', 'Женственный', 'Мягкий', 'Воздушный', 'Утончённый'],
        sporty: ['Активный', 'Динамичный', 'Спортивный', 'Тренировочный', 'Кэжуал-спорт'],
        minimalist: ['Лаконичный', 'Чистый', 'Базовый', 'Простой', 'Минимальный'],
        boho: ['Богемный', 'Свободный', 'Творческий', 'Необычный', 'Артистичный']
    };
    return names[style]?.[index] || `Образ ${index + 1}`;
}

function generateExplanation(outfit, style) {
    const explanations = [
        `Этот образ идеально подходит твоему ${style} стилю. Цветовая гамма гармонирует с твоим гардеробом.`,
        `Сочетание предметов подчеркивает твой вкус. Рекомендуем дополнить аксессуарами.`,
        `Базовый вариант на каждый день. Легко комбинируется с другими вещами.`,
        `Элегантное решение для особых случаев. Обращает внимание на детали.`,
        `Универсальный образ: от офиса до вечерней прогулки. Практично и стильно.`
    ];
    return explanations[Math.floor(Math.random() * explanations.length)];
}

function renderOutfits(outfits) {
    const grid = document.getElementById('outfitsGrid');
    if (!grid) return;
    
    if (!outfits || outfits.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <span>✨</span>
                <p>Добавьте вещи в гардероб</p>
                <p>для генерации образов</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = outfits.map(outfit => `
        <div class="outfit-card" onclick="showOutfitDetails('${outfit.id}')">
            <img class="outfit-image" src="${outfit.items[0]?.image || 'https://via.placeholder.com/400x200'}" alt="${outfit.name}">
            <div class="outfit-content">
                <div class="outfit-header">
                    <h3>${outfit.name}</h3>
                    <span class="outfit-price">~${outfit.totalPrice.toLocaleString()} ₽</span>
                </div>
                <p class="outfit-description">${outfit.explanation}</p>
                <div class="outfit-match">
                    <span>⚡</span>
                    <span>Совпадение ${outfit.matchScore}%</span>
                </div>
            </div>
        </div>
    `).join('');
}

window.showOutfitDetails = function(id) {
    const outfit = window.SPIRA?.state?.generatedOutfits?.find(o => o.id == id);
    if (!outfit) return;
    
    const content = `
        <p style="margin-bottom:1rem;color:var(--text-secondary)">${outfit.explanation}</p>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1rem">
            ${outfit.items.map(item => `
                <span style="padding:0.5rem 1rem;background:rgba(212,175,55,0.1);border-radius:12px;font-size:0.8rem;color:var(--gold-light)">
                    ${item.name || 'Вещь'}
                </span>
            `).join('')}
        </div>
        <p style="font-size:1.2rem;color:var(--gold-light)">Итого: ${outfit.totalPrice.toLocaleString()} ₽</p>
    `;
    
    window.SPIRA?.showModal(outfit.name, content);
};

// Рендер товаров
function renderProducts(maxPrice) {
    const grid = document.getElementById('productsGrid');
    const userStyle = window.SPIRA?.state?.user?.style || 'casual';
    
    if (!grid) return;
    
    const filtered = MOCK_PRODUCTS.filter(p => p.price <= maxPrice);
    const sorted = filtered.sort((a, b) => {
        if (a.style === userStyle && b.style !== userStyle) return -1;
        if (b.style === userStyle && a.style !== userStyle) return 1;
        return b.rating - a.rating;
    });
    
    grid.innerHTML = sorted.map(product => `
        <div class="product-card" onclick="showProductDetails('${product.id}')">
            <img class="product-image" src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-meta">
                    <span class="product-rating">★ ${product.rating}</span>
                    <span>${product.style}</span>
                </div>
                <p class="product-price">${product.price.toLocaleString()} ₽</p>
            </div>
        </div>
    `).join('');
}

window.showProductDetails = function(id) {
    const product = MOCK_PRODUCTS.find(p => p.id == id);
    if (!product) return;
    
    const content = `
        <img src="${product.image}" style="width:100%;height:150px;object-fit:cover;border-radius:12px;margin-bottom:1rem">
        <p style="margin-bottom:0.5rem;color:var(--text-secondary)">Рейтинг: <span style="color:var(--gold-light)">★ ${product.rating}</span></p>
        <p style="margin-bottom:1rem;color:var(--text-secondary)">Стиль: ${product.style}</p>
        <p style="font-size:1.3rem;color:var(--gold-light);margin-bottom:1rem">${product.price.toLocaleString()} ₽</p>
        <button class="btn-primary" onclick="window.SPIRA?.showNotification('Добавлено в избранное','success')">Добавить в избранное</button>
    `;
    
    window.SPIRA?.showModal(product.name, content);
};

// Инициализация товаров
document.addEventListener('DOMContentLoaded', () => {
    const range = document.getElementById('priceRange');
    if (range) {
        renderProducts(parseInt(range.value));
        range.addEventListener('input', () => renderProducts(parseInt(range.value)));
    }
});