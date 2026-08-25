import { test as base } from '@playwright/test';
import userData from './userData.json' with { type: 'json' };

export const test = base.extend({
	userData: async ({}, use) => {
		await use(userData);
	},
});

export { expect } from '@playwright/test';
