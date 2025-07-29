/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    if (process.env.NODE_ENV === 'development') {
        // Bypass SvelteKit's default cross-site POST protection during dev
        event.locals.skipCsrf = true;
    }

    const response = await resolve(event);
    return response;
}
