#!/usr/bin/env node
/**
 * Upload Test Samples to Supabase Storage
 * 
 * This script creates simple test audio files and uploads them to:
 * - sample-full bucket (for paid downloads)
 * - sample-previews bucket (for public previews)
 * 
 * Usage: node scripts/upload-test-samples.js
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file manually
function loadEnv() {
  const envPath = join(__dirname, '..', '.env');
  if (!existsSync(envPath)) {
    console.error('❌ .env file not found at:', envPath);
    console.log('Please create a .env file with SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }
  
  const envContent = readFileSync(envPath, 'utf-8');
  const lines = envContent.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    
    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    process.env[key] = value;
  }
}

loadEnv();

// Supabase config
const SUPABASE_URL = 'https://qborzulfzciqhjyfxcjz.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
});

// Free, publicly accessible test audio files
// These are from freesound.org's public API and other reliable sources
const FREE_AUDIO_URLS = [
  // SoundHelix sample music (CC0 license)
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
];

// Sample file mappings (matching samples.ts)
const SAMPLE_UPLOADS = [
  { id: 1, fullPath: 'full/sample1.wav', previewPath: 'previews/sample1.mp3' },
  { id: 2, fullPath: 'full/sample2.wav', previewPath: 'previews/sample2.mp3' },
  { id: 3, fullPath: 'full/sample3.wav', previewPath: 'previews/sample3.mp3' },
  { id: 4, fullPath: 'full/sample4.wav', previewPath: 'previews/sample4.mp3' },
  { id: 5, fullPath: 'full/sample5.wav', previewPath: 'previews/sample5.mp3' },
  { id: 6, fullPath: 'full/sample6.wav', previewPath: 'previews/sample6.mp3' },
  { id: 7, fullPath: 'full/sample7.wav', previewPath: 'previews/sample7.mp3' },
  { id: 8, fullPath: 'full/sample8.wav', previewPath: 'previews/sample8.mp3' },
  { id: 9, fullPath: 'full/sample9.wav', previewPath: 'previews/sample9.mp3' },
  { id: 10, fullPath: 'full/sample10.wav', previewPath: 'previews/sample10.mp3' },
  { id: 11, fullPath: 'full/sample11.wav', previewPath: 'previews/sample11.mp3' },
  { id: 12, fullPath: 'full/sample12.wav', previewPath: 'previews/sample12.mp3' },
  { id: 13, fullPath: 'full/sample13.wav', previewPath: 'previews/sample13.mp3' },
  { id: 14, fullPath: 'full/sample14.wav', previewPath: 'previews/sample14.mp3' },
  { id: 15, fullPath: 'full/sample15.wav', previewPath: 'previews/sample15.mp3' },
  { id: 16, fullPath: 'full/sample16.wav', previewPath: 'previews/sample16.mp3' },
  { id: 17, fullPath: 'full/sample17.wav', previewPath: 'previews/sample17.mp3' },
  { id: 18, fullPath: 'full/sample18.wav', previewPath: 'previews/sample18.mp3' },
];

async function downloadFile(url, maxBytes = 500000) {
  console.log(`  📥 Downloading: ${url.split('/').pop()}...`);
  
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'Accept': 'audio/mpeg, audio/*',
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.status} ${response.statusText}`);
  }
  
  // Read only first portion of the file (we don't need full songs)
  const reader = response.body.getReader();
  const chunks = [];
  let totalBytes = 0;
  
  while (totalBytes < maxBytes) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    totalBytes += value.length;
  }
  
  // Cancel the rest of the stream
  reader.cancel();
  
  // Combine chunks
  const result = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  
  return result;
}

async function uploadToSupabase(bucket, path, data, contentType) {
  console.log(`  ☁️  Uploading to ${bucket}/${path} (${(data.length / 1024).toFixed(1)} KB)...`);
  
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, data, {
      contentType,
      upsert: true // Overwrite if exists
    });
  
  if (error) {
    console.error(`  ❌ Upload failed: ${error.message}`);
    return false;
  }
  
  console.log(`  ✅ Uploaded successfully!`);
  return true;
}

async function main() {
  console.log('🎵 SampleVault - Test Sample Upload Script\n');
  console.log('Supabase URL:', SUPABASE_URL);
  console.log('');
  
  // Download sample audio files
  console.log('📥 Downloading test audio files from SoundHelix...\n');
  const audioFiles = [];
  
  for (let i = 0; i < FREE_AUDIO_URLS.length; i++) {
    try {
      const data = await downloadFile(FREE_AUDIO_URLS[i], 300000); // ~300KB each
      audioFiles.push(data);
      console.log(`  ✅ Downloaded (${(data.length / 1024).toFixed(1)} KB)\n`);
    } catch (err) {
      console.error(`  ❌ Failed to download: ${err.message}\n`);
      audioFiles.push(null);
    }
  }
  
  const validAudioFiles = audioFiles.filter(f => f !== null);
  if (validAudioFiles.length === 0) {
    console.error('❌ No audio files could be downloaded. Please check your internet connection.');
    process.exit(1);
  }
  
  console.log(`\n✅ Downloaded ${validAudioFiles.length} audio files\n`);
  
  // Upload to both buckets
  console.log('☁️  Uploading to Supabase Storage...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const sample of SAMPLE_UPLOADS) {
    // Pick an audio file from our downloaded samples (cycle through)
    const audioIndex = (sample.id - 1) % validAudioFiles.length;
    const audioData = validAudioFiles[audioIndex];
    
    console.log(`\n📁 Sample ${sample.id}:`);
    
    // Upload to sample-full bucket (for paid downloads)
    const fullSuccess = await uploadToSupabase(
      'sample-full',
      sample.fullPath,
      audioData,
      'audio/mpeg'
    );
    
    // Upload to sample-previews bucket (for public previews)
    const previewSuccess = await uploadToSupabase(
      'sample-previews',
      sample.previewPath,
      audioData,
      'audio/mpeg'
    );
    
    if (fullSuccess && previewSuccess) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Upload Summary:');
  console.log(`  ✅ Successful: ${successCount}`);
  console.log(`  ❌ Failed: ${failCount}`);
  console.log('='.repeat(50));
  
  // Generate public URLs for previews
  console.log('\n🔗 Public Preview URLs (sample-previews bucket):');
  for (let i = 1; i <= 5; i++) {
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/sample-previews/previews/sample${i}.mp3`;
    console.log(`  Sample ${i}: ${publicUrl}`);
  }
  
  // Test signed URL generation
  console.log('\n🔐 Testing Signed URL Generation (sample-full bucket):');
  const { data, error } = await supabase.storage
    .from('sample-full')
    .createSignedUrl('full/sample1.wav', 60 * 15); // 15 min expiry
  
  if (error) {
    console.log(`  ❌ Signed URL error: ${error.message}`);
  } else {
    console.log(`  ✅ Signed URL works!`);
    console.log(`  URL: ${data.signedUrl.slice(0, 100)}...`);
  }
  
  console.log('\n✨ Done! Your Supabase Storage is now populated with test audio files.');
  console.log('\n📝 Next steps:');
  console.log('  1. Test a purchase flow on your live site');
  console.log('  2. Check that download links work after payment');
  console.log('  3. Update samples.ts previewUrl to use Supabase public URLs (optional)');
}

main().catch(err => {
  console.error('💥 Script failed:', err);
  process.exit(1);
});
