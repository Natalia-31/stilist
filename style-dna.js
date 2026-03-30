/**
 * SPIRA - Style DNA Module
 * Определение и хранение стиля пользователя
 */

const STYLES = {
    classic: { name: 'Классический', keywords: ['элегантность', 'сдержанность', 'офис'], colors: ['#000000', '#FFFFFF', '#808080', '#000080'] },
    casual: { name: 'Кэжуал', keywords: ['комфорт', 'повседневный', 'практичность'], colors: ['#808080', '#000080', '#F5F5DC', '#006400'] },
    romantic: { name: 'Романтический', keywords: ['нежность', 'женственность', 'мягкость'], colors: ['#F5F5DC', '#D4AF37', '#800020'] },
    sporty: { name: 'Спортивный', keywords: ['активность', 'динамика', 'движение'], colors: ['#000000', '#FFFFFF', '#006400'] },
    minimalist: { name: 'Минимализм', keywords: ['простота', 'чистота', 'лаконичность'], colors: ['#000000', '#FFFFFF', '#808080'] },
    boho: { name: 'Бохо', keywords: ['свобода', 'креативность', 'необычность'], colors: ['#D4AF37', '#006400', '#800020', '#F5F5DC'] }
};

// Получение информации о стиле
function getStyleInfo(styleId) {
    return STYLES[styleId] || null;
}

// Проверка совместимости цвета со стилем
function isColorCompatible(styleId, color) {
    const style = STYLES[styleId];
    if (!style) return true;
    return style.colors.some(c => c.toLowerCase() === color.toLowerCase());
}

// Рекомендации по стилю
function getStyleRecommendations(styleId) {
    const recommendations = {
        classic: ['Качественные ткани', 'Сдержанные цвета', 'Приталенный крой', 'Минимум аксессуаров'],
        casual: ['Удобный крой', 'Натуральные ткани', 'Слои', 'Практичные цвета'],
        romantic: ['Легкие ткани', 'Цветочные принты', 'Мягкие силуэты', 'Деликатные аксессуары'],
        sporty: ['Технические ткани', 'Яркие акценты', 'Оверсайз', 'Кроссовки'],
        minimalist: ['Базовые цвета', 'Чистые линии', 'Качество материалов', 'Отсутствие декора'],
        boho: ['Натуральные ткани', 'Принты и узоры', 'Слои', 'Аксессуары']
    };
    return recommendations[styleId] || [];
}

// Экспорт
window.StyleDNA = { STYLES, getStyleInfo, isColorCompatible, getStyleRecommendations };