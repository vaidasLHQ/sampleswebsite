import { supabase, isSupabaseConfigured } from './supabase';

// Article type definition
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  author_name: string;
  author_avatar: string;
  read_time: number;
  created_at: string;
  featured: boolean;
}

// Fetch all articles
export async function getArticles(): Promise<Article[]> {
  if (!isSupabaseConfigured) {
    return getMockArticles();
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    // Fall back to mock data if table doesn't exist yet
    return getMockArticles();
  }

  return data || getMockArticles();
}

// Fetch single article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!isSupabaseConfigured) {
    return getMockArticles().find(a => a.slug === slug) || null;
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching article:', error);
    return getMockArticles().find(a => a.slug === slug) || null;
  }

  return data;
}

// Mock articles for development/fallback
export function getMockArticles(): Article[] {
  return [
    {
      id: '1',
      title: 'The Art of Layering: How to Build Massive Synth Sounds',
      slug: 'art-of-layering-synth-sounds',
      excerpt: 'Discover the secrets behind creating thick, professional synth patches by mastering the technique of layering multiple sounds together.',
      content: `
# The Art of Layering: How to Build Massive Synth Sounds

Creating thick, professional-sounding synths isn't about finding the perfect preset—it's about **layering**. The biggest producers in the world stack multiple sounds to create those massive patches you hear on chart-topping tracks.

## Why Layer?

Single synth patches often sound thin in a mix. By combining multiple layers, you can:

- Fill the frequency spectrum more effectively
- Add movement and texture
- Create unique sounds that can't be replicated

## The Three-Layer Approach

### 1. The Sub Layer
This is your foundation. A simple sine or triangle wave in the sub-bass region (20-80Hz) provides the weight and power.

### 2. The Body Layer
The mid-range layer carries the main harmonic content. This is typically a saw or square wave with some detuning for width.

### 3. The Air Layer
High-frequency content adds brilliance and presence. Use noise, FM synthesis, or bright plucks to fill the top end.

## Pro Tips

- **EQ each layer** to prevent frequency masking
- **Pan layers slightly** for stereo width
- **Use different attack times** for each layer to create evolving textures
- **Automate filter cutoffs** for movement

The key is subtlety. You want the layers to blend seamlessly into one cohesive sound, not fight each other for attention.
      `,
      cover_image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=600&fit=crop',
      category: 'Sound Design',
      author_name: 'Marcus Chen',
      author_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      read_time: 8,
      created_at: '2024-12-01T10:00:00Z',
      featured: true
    },
    {
      id: '2',
      title: 'Mixing Kick and Bass: The Low-End Battle Solved',
      slug: 'mixing-kick-and-bass',
      excerpt: 'Stop the muddiness! Learn the techniques top engineers use to make kick drums and bass lines coexist perfectly in any mix.',
      content: `
# Mixing Kick and Bass: The Low-End Battle Solved

The eternal struggle of music production: getting your kick and bass to play nicely together. Too often, one masks the other, leaving your low end either boomy and undefined or weak and thin.

## The Frequency Carving Technique

The most reliable method is **frequency carving**—giving each element its own space in the spectrum.

### Option 1: Kick Dominant
- Kick owns 50-80Hz
- Bass sits higher at 80-120Hz
- Use a high-pass filter on bass around 60Hz

### Option 2: Bass Dominant  
- Bass owns the sub frequencies (40-80Hz)
- Kick punches through at 80-120Hz
- Use a high-pass on kick around 50Hz

## Sidechain Compression

The classic technique. Route your kick to a compressor on your bass:

1. Set a fast attack (0-10ms)
2. Medium release (50-150ms, tempo-synced)
3. 3-6dB of gain reduction
4. Adjust to taste

## The "Ghost" Kick Technique

Layer a very short, high-passed kick (150Hz+) with your main kick. This adds click and presence without adding more sub content.

## Key Takeaways

- Choose who owns the subs
- Use sidechain compression tastefully
- Reference on multiple systems
- Trust your ears, not just your eyes
      `,
      cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
      category: 'Mixing',
      author_name: 'Sarah Williams',
      author_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      read_time: 6,
      created_at: '2024-11-28T14:30:00Z',
      featured: false
    },
    {
      id: '3',
      title: 'From Bedroom to Billboard: Sample Clearance Explained',
      slug: 'sample-clearance-explained',
      excerpt: 'Planning to release that flip you made? Here\'s everything you need to know about sample clearance before your track goes viral.',
      content: `
# From Bedroom to Billboard: Sample Clearance Explained

You've made a banger that flips a classic record. Before you upload it anywhere, you need to understand **sample clearance**—or risk legal trouble that could cost you everything.

## What Needs Clearing?

There are two types of rights you may need to clear:

### 1. Master Rights
The rights to the actual recording. Owned by the record label.

### 2. Publishing Rights  
The rights to the underlying composition. Owned by the songwriter/publisher.

**You typically need BOTH cleared.**

## When You DON'T Need Clearance

- Using royalty-free samples (like from SampleVault!)
- Creating your own sounds from scratch
- Using samples from public domain works

## The Clearance Process

1. **Identify the rights holders** - Use databases like ASCAP, BMI, or hire a clearance service
2. **Submit a request** - Include your track, how the sample is used, and your release plans
3. **Negotiate terms** - Could be a flat fee, percentage of royalties, or both
4. **Get it in writing** - Never proceed without a signed agreement

## The Costs

Sample clearance can cost anywhere from $500 to $500,000+ depending on:

- How famous the original is
- How prominently you use it
- Your expected commercial success
- The mood of the rights holders

## The Safe Route

Use royalty-free samples! Our packs are 100% cleared for any commercial use. Flip away without the legal headaches.
      `,
      cover_image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=600&fit=crop',
      category: 'Industry',
      author_name: 'David Park',
      author_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      read_time: 10,
      created_at: '2024-11-25T09:15:00Z',
      featured: true
    },
    {
      id: '4',
      title: 'The 808 Deep Dive: Programming Bass That Hits Different',
      slug: '808-programming-guide',
      excerpt: 'Master the art of 808 programming with techniques used by Metro Boomin, Southside, and the biggest trap producers in the game.',
      content: `
# The 808 Deep Dive: Programming Bass That Hits Different

The 808 bass is the backbone of modern hip-hop and trap. But there's a massive difference between an amateur 808 pattern and one that makes the club shake. Let's break it down.

## Choosing Your 808

Not all 808s are created equal. Consider:

- **Decay length** - Shorter for fast patterns, longer for sustained notes
- **Pitch envelope** - Some 808s have a pitch drop that adds punch
- **Harmonic content** - Dirtier 808s cut through better on small speakers

## The Glide Game

Portamento/glide is essential for that signature trap sound.

\`\`\`
Pro settings:
- Glide time: 50-150ms
- Legato mode: ON
- Only glide between connected notes
\`\`\`

## Pattern Techniques

### The Bounce
Alternate between root note and octave for energy:
\`C1 - C2 - C1 - C2\`

### The Slide
Create tension with chromatic slides:
\`C1 ~~~> D#1 ~~~> C1\`

### The Rest
Don't underestimate silence. Pulling out the 808 makes the drop hit harder.

## Mixing Your 808

1. **Saturation** - Add harmonics so it translates on phone speakers
2. **Compression** - Gentle ratio (2:1-4:1) to control dynamics
3. **Low-pass filter** - Cut everything above 150-200Hz if you have a separate bass layer
4. **Soft clip** - Tame transients while adding warmth

## The Secret Sauce

Layer a short, punchy kick sample on the attack of your 808. This gives you the best of both worlds—the punch of a kick and the sustain of an 808.

Now go make some heat. 🔥
      `,
      cover_image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=600&fit=crop',
      category: 'Production',
      author_name: 'Jaylen Moore',
      author_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      read_time: 7,
      created_at: '2024-11-20T16:45:00Z',
      featured: false
    }
  ];
}

// SQL to create articles table (for reference)
export const createArticlesTableSQL = `
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  category TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_avatar TEXT NOT NULL,
  read_time INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  featured BOOLEAN DEFAULT FALSE
);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON articles
  FOR SELECT USING (true);

-- Insert sample articles
INSERT INTO articles (title, slug, excerpt, content, cover_image, category, author_name, author_avatar, read_time, featured) VALUES
('The Art of Layering: How to Build Massive Synth Sounds', 'art-of-layering-synth-sounds', 'Discover the secrets behind creating thick, professional synth patches by mastering the technique of layering multiple sounds together.', 'Full content here...', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=600&fit=crop', 'Sound Design', 'Marcus Chen', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', 8, true),
('Mixing Kick and Bass: The Low-End Battle Solved', 'mixing-kick-and-bass', 'Stop the muddiness! Learn the techniques top engineers use to make kick drums and bass lines coexist perfectly in any mix.', 'Full content here...', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop', 'Mixing', 'Sarah Williams', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', 6, false),
('From Bedroom to Billboard: Sample Clearance Explained', 'sample-clearance-explained', 'Planning to release that flip you made? Here''s everything you need to know about sample clearance before your track goes viral.', 'Full content here...', 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=600&fit=crop', 'Industry', 'David Park', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', 10, true),
('The 808 Deep Dive: Programming Bass That Hits Different', '808-programming-guide', 'Master the art of 808 programming with techniques used by Metro Boomin, Southside, and the biggest trap producers in the game.', 'Full content here...', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=600&fit=crop', 'Production', 'Jaylen Moore', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', 7, false);
`;

