import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * SvelteKit endpoint for handling file uploads.
 * Accepts multipart/form-data POST requests with a 'file' field.
 * Saves uploaded files to 'static/uploads/'.
 */
/**
 * @param {{ request: Request }} event
 */

const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // or 'https://yourfrontend.com'
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders
    });
}
export async function POST({ request }) {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
        return new Response(JSON.stringify({ error: 'No file uploaded or file is not valid' }), { status: 400 });
    }

    // file is a File object
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || '';
    const filename = uuidv4() + ext;
    const uploadPath = path.join('static', 'uploads', filename);

    try {
        fs.writeFileSync(uploadPath, buffer);
        return new Response(JSON.stringify({
            id: filename,
            ext,
            type: file.type,
            key: filename,
            checksum: null,
            origin: null
        }), {
            status: 200,
            headers: corsHeaders
        });
    } catch (err) {
        let message = 'Unknown error';
        if (err && typeof err === 'object' && err !== null && 'message' in err) {
            message = String(err.message);
        }
        return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: corsHeaders
        });
    }
}
