"use client";

import { getWatchProviders } from "../actions";
import { getTVWatchProviders } from "../server-api";

export async function watchProvidersWrapper(id: number) {
    try {
        const watchproviders = await getWatchProviders(id);
        // well well well
        const rentProviders = watchproviders.rent;
        const buyProviders = watchproviders.buy;
        const flatrateProviders = watchproviders.flatrate;


        return { rentProviders: rentProviders, buyProviders: buyProviders, flatrateProviders: flatrateProviders };

    } catch {
        console.error('Error getting watch providers');
        return { rentProviders: [], buyProviders: [], flatrateProviders: [] };
    }
}

export async function tvWatchProvidersWrapper(id: number) {
    try {
        const watchproviders = await getTVWatchProviders(id);
        // well well well
        const rentProviders = watchproviders.rent;
        const buyProviders = watchproviders.buy;
        const flatrateProviders = watchproviders.flatrate;
        return { rentProviders: rentProviders, buyProviders: buyProviders, flatrateProviders: flatrateProviders };
    }
    catch {
        console.error('Error getting watch providers');
        return { rentProviders: [], buyProviders: [], flatrateProviders: [] };
    }
}