import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';

const SUPABASE_URL = 'https://apwsbzwqqtnxeevfelqw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwd3NiendxcXRueGVldmZlbHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODkyMDYsImV4cCI6MjA5NjI2NTIwNn0.1qQJ-kjCq9qct0UjgIpGEeWAO7L4crzNqh05NTGUErA';
const BUCKET = 'gallery';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const IMAGES_DIR = join(process.cwd(), 'public', 'images');

const allowedExt = ['.jpg', '.jpeg', '.png', '.webp'];

// Files to skip (not gallery images)
const skip = ['logo.png', 'founder.png', 'about.jpg', 'image.png',
  'herofirst.png', 'herosecond.png', 'herothird.jpg', 'herofourth.jpg', 'herofifth.jpg'];

const files = readdirSync(IMAGES_DIR).filter(f => {
  const ext = extname(f).toLowerCase();
  return allowedExt.includes(ext) && !skip.includes(f);
});

console.log(`Found ${files.length} gallery images to upload...\n`);

let success = 0, failed = 0;

for (const file of files) {
  const filePath = join(IMAGES_DIR, file);
  const fileBuffer = readFileSync(filePath);
  const ext = extname(file).toLowerCase();
  const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg';

  process.stdout.write(`Uploading ${file}... `);

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(file, fileBuffer, {
      contentType: mimeType,
      upsert: true,
    });

  if (error) {
    console.log(`❌ FAILED: ${error.message}`);
    failed++;
  } else {
    console.log('✅');
    success++;
  }
}

console.log(`\nDone! ${success} uploaded, ${failed} failed.`);
