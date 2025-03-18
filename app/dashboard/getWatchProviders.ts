import { getWatchProviders } from "../actions";


export async function watchProvidersWrapper(id: number) {
    try {
        const watchproviders = await getWatchProviders(id);
        // well well well
        const rentProviders = watchproviders.rent;
        const buyProviders = watchproviders.buy;
        const flatrateProviders = watchproviders.flatrate;

        return { rentProviders, buyProviders, flatrateProviders };

    } catch {
        console.error('Error getting watch providers');
        return { rentProviders: [], buyProviders: [], flatrateProviders: [] };
    }
}