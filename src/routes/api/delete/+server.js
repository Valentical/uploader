import fs from 'fs';
import path from 'path';

/**
 * SvelteKit endpoint for handling file deletion.
 * Accepts POST requests with a 'key' query parameter.
 * Deletes files from 'static/uploads/'.
 */
export async function POST({ url }) {
    const key = url.searchParams.get('key');
    if (!key) {
        return new Response(JSON.stringify({ success: false, message: 'No key provided' }), { status: 400 });
    }

    const filePath = path.join('static', 'uploads', key);
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ success: false, message: 'File not found' }), { status: 404 });
        }
    } catch (err) {
        let message = 'Unknown error';
        if (err && typeof err === 'object' && err !== null && 'message' in err) {
            message = String(err.message);
        }
        return new Response(JSON.stringify({ success: false, message }), { status: 500 });
    }
}
