export interface SamplePack {
  id: number;
  title: string;
  category: string;
  description: string;
  samples: number;
  bpm: string;
  price: number;
  gradient: string;
  producer: string;
  audioPreview?: string;
}

export const samplePacks: SamplePack[] = [
  {
    id: 1,
    title: "Midnight Sessions",
    category: "Lo-Fi Hip Hop",
    description: "Warm vinyl textures, dusty drums, and soulful melodies for late-night production.",
    samples: 156,
    bpm: "70-90",
    price: 49,
    gradient: "sonic",
    producer: "J Dilla Estate",
    audioPreview: "/audio/midnight-sessions-preview.mp3"
  },
  {
    id: 2,
    title: "Neon Streets",
    category: "Synthwave",
    description: "Retro-futuristic synths, punchy drums, and atmospheric pads from the 80s.",
    samples: 203,
    bpm: "100-128",
    price: 59,
    gradient: "neon",
    producer: "Mitch Murder",
    audioPreview: "/audio/neon-streets-preview.mp3"
  },
  {
    id: 3,
    title: "Desert Gold",
    category: "World Fusion",
    description: "Organic percussion, ethnic instruments, and earthy textures from around the globe.",
    samples: 184,
    bpm: "80-120",
    price: 54,
    gradient: "warm",
    producer: "Karsh Kale",
    audioPreview: "/audio/desert-gold-preview.mp3"
  },
  {
    id: 4,
    title: "Deep Space",
    category: "Ambient",
    description: "Ethereal soundscapes, cosmic textures, and otherworldly atmospheres.",
    samples: 128,
    bpm: "60-80",
    price: 44,
    gradient: "bass",
    producer: "Brian Eno",
    audioPreview: "/audio/deep-space-preview.mp3"
  },
  {
    id: 5,
    title: "Club Genesis",
    category: "House",
    description: "Driving beats, infectious grooves, and peak-time energy for the dancefloor.",
    samples: 245,
    bpm: "120-128",
    price: 69,
    gradient: "neon",
    producer: "Carl Cox",
    audioPreview: "/audio/club-genesis-preview.mp3"
  },
  {
    id: 6,
    title: "Trap Kingdom",
    category: "Trap",
    description: "Hard-hitting 808s, crisp hi-hats, and melodic elements for modern production.",
    samples: 312,
    bpm: "130-160",
    price: 79,
    gradient: "sonic",
    producer: "Metro Boomin",
    audioPreview: "/audio/trap-kingdom-preview.mp3"
  },
  {
    id: 7,
    title: "Boom Bap Essentials",
    category: "Hip Hop",
    description: "Classic 90s hip hop drums, vinyl samples, and authentic breaks from the golden era.",
    samples: 198,
    bpm: "85-95",
    price: 54,
    gradient: "warm",
    producer: "9th Wonder",
    audioPreview: "/audio/boom-bap-preview.mp3"
  },
  {
    id: 8,
    title: "Future Bass Pack",
    category: "EDM",
    description: "Melodic synths, powerful drops, and colorful sound design for festival anthems.",
    samples: 267,
    bpm: "128-150",
    price: 64,
    gradient: "neon",
    producer: "Flume",
    audioPreview: "/audio/future-bass-preview.mp3"
  }
];

export const categories = [
  "All",
  "Hip Hop",
  "Trap",
  "Lo-Fi Hip Hop",
  "House",
  "EDM",
  "Ambient",
  "Synthwave",
  "World Fusion"
];

export const features = [
  {
    icon: "⚡",
    title: "Instant Download",
    description: "Get your samples immediately after purchase. No waiting, start creating right away."
  },
  {
    icon: "🎚️",
    title: "100% Royalty Free",
    description: "Use in any project, commercial or personal. No additional fees or credits required."
  },
  {
    icon: "🎛️",
    title: "DAW Compatible",
    description: "Works with Ableton, FL Studio, Logic Pro, and every major DAW. WAV & AIFF formats."
  },
  {
    icon: "🔄",
    title: "Free Updates",
    description: "Get new samples and variations added to packs you own. Lifetime access included."
  },
  {
    icon: "👥",
    title: "Grammy-Winning Producers",
    description: "Every pack crafted by industry professionals with platinum credits."
  },
  {
    icon: "🎯",
    title: "Curated Quality",
    description: "Hand-selected sounds that work. No filler, just the best samples for your productions."
  }
];

export const testimonials = [
  {
    quote: "SampleVault has the cleanest drum samples I've ever used. Game changer.",
    author: "DJ Premier",
    role: "Hip Hop Producer"
  },
  {
    quote: "The quality here rivals anything I've heard from major sample companies.",
    author: "Deadmau5",
    role: "Electronic Music Producer"
  },
  {
    quote: "Finally, a sample library that understands what producers actually need.",
    author: "Kenny Beats",
    role: "Producer & Beatmaker"
  }
];


