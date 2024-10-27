import { atom } from 'nanostores';
import { expenseCategories } from '../constants/categories';

const initialCategoryLimits = expenseCategories.reduce((limits, category) => {
    limits[category] = 0;
    return limits;
}, {});

export const userSettingsStore = atom({
    totalBudgetLimit: 1000,
    categoryLimits: initialCategoryLimits,
    alertsEnabled: true,
    budgetExceeded: false,
});

export const updateUserSettingsStore = (updates) => {
    userSettingsStore.set({
        ...userSettingsStore.get(),
        ...updates,
    });
};

if (process.env.NODE_ENV === 'development') {
    window.userSettingsStore = userSettingsStore;
}
