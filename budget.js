/**
 * SPIRA - Budget Module
 * Управление бюджетом пользователя
 */

// Уровни бюджета
const BUDGET_LEVELS = {
    low: { min: 0, max: 30000, name: 'Бюджетный', description: 'Оптимальные покупки до 30К' },
    medium: { min: 30000, max: 80000, name: 'Средний', description: 'Баланс цены и качества' },
    high: { min: 80000, max: Infinity, name: 'Премиум', description: 'Люкс сегмент без ограничений' }
};

// Определение уровня бюджета
function getBudgetLevel(budget) {
    if (budget <= BUDGET_LEVELS.low.max) return 'low';
    if (budget <= BUDGET_LEVELS.medium.max) return 'medium';
    return 'high';
}

// Получение рекомендаций по бюджету
function getBudgetRecommendations(budget) {
    const level = getBudgetLevel(budget);
    const recommendations = {
        low: ['Ищите распродажи', 'Базовые вещи из масс-маркета', 'Капсульный гардероб', 'Качество важнее количества'],
        medium: ['Инвестируйте в базовые вещи', 'Смешивайте масс-маркет и миддл', 'Сезонные обновления', 'Аксессуары как акценты'],
        high: ['Инвестиционные покупки', 'Натуральные ткани', 'Вечная классика', 'Кастомизация']
    };
    return recommendations[level] || [];
}

// Расчёт оптимальной цены для образа
function calculateOptimalPrice(budget, items) {
    const basePrice = budget * 0.3;
    const maxPrice = budget * 0.7;
    return Math.min(basePrice + items.length * 5000, maxPrice);
}

// Проверка доступности покупки
function canAfford(budget, price) {
    return price <= budget;
}

// Экспорт
window.BudgetManager = { 
    BUDGET_LEVELS, 
    getBudgetLevel, 
    getBudgetRecommendations, 
    calculateOptimalPrice, 
    canAfford 
};