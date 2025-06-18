import {
	QueryClient,
	defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
import SuperJSON from "superjson";

export const createQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				// With SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client
				staleTime: 5 * 60 * 1000, // 5 minutes
				gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
				retry: (failureCount, error) => {
					// Retry up to 3 times for network errors
					if (failureCount >= 3) return false;
					
					// Don't retry on 4xx errors (client errors)
					if (error instanceof Error && error.message.includes('4')) {
						return false;
					}
					
					// Retry on 5xx errors and network errors
					return true;
				},
				retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
				refetchOnWindowFocus: false, // Prevent unnecessary refetches
				refetchOnReconnect: true, // Refetch when reconnecting to network
			},
			mutations: {
				retry: (failureCount, error) => {
					// Retry mutations up to 2 times
					if (failureCount >= 2) return false;
					
					// Don't retry on 4xx errors
					if (error instanceof Error && error.message.includes('4')) {
						return false;
					}
					
					return true;
				},
				retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
			},
			dehydrate: {
				serializeData: SuperJSON.serialize,
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) ||
					query.state.status === "pending",
			},
			hydrate: {
				deserializeData: SuperJSON.deserialize,
			},
		},
	});
