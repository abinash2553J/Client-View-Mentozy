
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load .env
const envPath = path.resolve('.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function checkBuckets() {
    console.log('--- Checking Supabase Storage ---');
    console.log('URL:', env.VITE_SUPABASE_URL);

    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
        console.error('Error listing buckets:', error);
    } else {
        console.log('Found Buckets:', buckets.map(b => b.name));
    }

    // Try a test upload to see exact error
    console.log('\n--- Attempting Test Upload ---');
    const testFile = Buffer.from('test contents');
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('payment-scanners')
        .upload('test-' + Date.now() + '.txt', testFile, {
            contentType: 'text/plain',
            upsert: true
        });

    if (uploadError) {
        console.error('Test Upload FAILURE:', JSON.stringify(uploadError, null, 2));
    } else {
        console.log('Test Upload SUCCESS:', uploadData);
    }
}

checkBuckets();
