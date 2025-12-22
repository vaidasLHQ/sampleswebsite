export interface Sample {
  id: number;
  filename: string;
  packName: string;
  packId: number;
  category: string;
  artwork: string;
  bpm: number;
  key: string;
  /**
   * Duration in seconds
   */
  duration: number;
  /**
   * Whether this is a new/featured sample
   */
  isNew?: boolean;
  /**
   * Public demo/preview URL (low-bitrate). Points to Supabase public bucket.
   */
  previewUrl?: string;
  /**
   * Private full-quality storage path (Supabase Storage object key) used to generate signed download URLs after purchase.
   * Example: "full/sample1.wav"
   */
  fullStoragePath: string;
  /** Price per sample in USD cents */
  priceUsdCents: number;
}

const SUPABASE_URL = "https://qborzulfzciqhjyfxcjz.supabase.co";
const PREVIEW_BUCKET = "sample-previews";

function previewUrl(sampleNum: number): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${PREVIEW_BUCKET}/previews/sample${sampleNum}.mp3`;
}

export const samples: Sample[] = [
  // Hip Hop samples
  {
    id: 1,
    filename: "rss_90_vinyl_cut_free_Emin.wav",
    packName: "Reworked Soul Selections",
    packId: 1,
    category: "Hip Hop",
    artwork: "https://images.unsplash.com/photo-1611532736570-8e28e16c78b7?w=400&h=400&fit=crop",
    bpm: 90,
    key: "E min",
    duration: 28,
    isNew: true,
    previewUrl: previewUrl(1),
    fullStoragePath: "full/sample1.wav",
    priceUsdCents: 299
  },
  {
    id: 2,
    filename: "SLS_SS2_70_songstarter_resampled_soul_true_alt_2_C#min.wav",
    packName: "The Soul Standard Volume 2",
    packId: 2,
    category: "Hip Hop",
    artwork: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=400&h=400&fit=crop",
    bpm: 70,
    key: "C# min",
    duration: 35,
    isNew: true,
    previewUrl: previewUrl(2),
    fullStoragePath: "full/sample2.wav",
    priceUsdCents: 299
  },
  {
    id: 3,
    filename: "DBM_NYM2_87_acoustic_piano_loop_queens_bridge_C#min.wav",
    packName: "New York Minute 2",
    packId: 3,
    category: "Hip Hop",
    artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    bpm: 87,
    key: "C# min",
    duration: 22,
    previewUrl: previewUrl(3),
    fullStoragePath: "full/sample3.wav",
    priceUsdCents: 299
  },
  
  // Trap samples
  {
    id: 4,
    filename: "trap_808_sub_bass_heavy_Fmin.wav",
    packName: "Trap Kingdom",
    packId: 6,
    category: "Trap",
    artwork: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
    bpm: 140,
    key: "F min",
    duration: 18,
    isNew: true,
    previewUrl: previewUrl(4),
    fullStoragePath: "full/sample4.wav",
    priceUsdCents: 299
  },
  {
    id: 5,
    filename: "trap_hihat_roll_32nd_150bpm.wav",
    packName: "Trap Kingdom",
    packId: 6,
    category: "Trap",
    artwork: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
    bpm: 150,
    key: "—",
    duration: 8,
    previewUrl: previewUrl(5),
    fullStoragePath: "full/sample5.wav",
    priceUsdCents: 299
  },
  {
    id: 6,
    filename: "metro_boomin_style_melody_Gmin.wav",
    packName: "Trap Kingdom",
    packId: 6,
    category: "Trap",
    artwork: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
    bpm: 138,
    key: "G min",
    duration: 24,
    previewUrl: previewUrl(6),
    fullStoragePath: "full/sample6.wav",
    priceUsdCents: 299
  },

  // Lo-Fi Hip Hop samples
  {
    id: 7,
    filename: "lofi_vinyl_crackle_texture_loop.wav",
    packName: "Midnight Sessions",
    packId: 1,
    category: "Lo-Fi Hip Hop",
    artwork: "https://images.unsplash.com/photo-1558057395-a88eaf04fc0e?w=400&h=400&fit=crop",
    bpm: 85,
    key: "—",
    duration: 45,
    previewUrl: previewUrl(7),
    fullStoragePath: "full/sample7.wav",
    priceUsdCents: 299
  },
  {
    id: 8,
    filename: "jazzy_rhodes_chord_progression_Dmin.wav",
    packName: "Midnight Sessions",
    packId: 1,
    category: "Lo-Fi Hip Hop",
    artwork: "https://images.unsplash.com/photo-1558057395-a88eaf04fc0e?w=400&h=400&fit=crop",
    bpm: 78,
    key: "D min",
    duration: 32,
    previewUrl: previewUrl(8),
    fullStoragePath: "full/sample8.wav",
    priceUsdCents: 299
  },

  // House samples
  {
    id: 9,
    filename: "house_kick_punchy_sidechain_ready.wav",
    packName: "Club Genesis",
    packId: 5,
    category: "House",
    artwork: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
    bpm: 125,
    key: "—",
    duration: 4,
    previewUrl: previewUrl(9),
    fullStoragePath: "full/sample9.wav",
    priceUsdCents: 299
  },
  {
    id: 10,
    filename: "house_bassline_groovy_Amin_125.wav",
    packName: "Club Genesis",
    packId: 5,
    category: "House",
    artwork: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
    bpm: 125,
    key: "A min",
    duration: 16,
    isNew: true,
    previewUrl: previewUrl(10),
    fullStoragePath: "full/sample10.wav",
    priceUsdCents: 299
  },

  // EDM samples
  {
    id: 11,
    filename: "future_bass_drop_lead_supersaws_Cmaj.wav",
    packName: "Future Bass Pack",
    packId: 8,
    category: "EDM",
    artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    bpm: 150,
    key: "C maj",
    duration: 20,
    previewUrl: previewUrl(11),
    fullStoragePath: "full/sample11.wav",
    priceUsdCents: 299
  },
  {
    id: 12,
    filename: "edm_buildup_riser_8bar_tension.wav",
    packName: "Future Bass Pack",
    packId: 8,
    category: "EDM",
    artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    bpm: 128,
    key: "—",
    duration: 30,
    previewUrl: previewUrl(12),
    fullStoragePath: "full/sample12.wav",
    priceUsdCents: 299
  },

  // Ambient samples
  {
    id: 13,
    filename: "ambient_pad_ethereal_dreamscape_Fmaj.wav",
    packName: "Deep Space",
    packId: 4,
    category: "Ambient",
    artwork: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=400&h=400&fit=crop",
    bpm: 0,
    key: "F maj",
    duration: 60,
    previewUrl: previewUrl(13),
    fullStoragePath: "full/sample13.wav",
    priceUsdCents: 299
  },

  // Synthwave samples
  {
    id: 14,
    filename: "synthwave_arp_neon_nights_Emin.wav",
    packName: "Neon Streets",
    packId: 2,
    category: "Synthwave",
    artwork: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
    bpm: 115,
    key: "E min",
    duration: 25,
    isNew: true,
    previewUrl: previewUrl(14),
    fullStoragePath: "full/sample14.wav",
    priceUsdCents: 299
  },

  // Drums
  {
    id: 15,
    filename: "snare_808_crispy_layered_processed.wav",
    packName: "Boom Bap Essentials",
    packId: 7,
    category: "Drums",
    artwork: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
    bpm: 0,
    key: "—",
    duration: 2,
    previewUrl: previewUrl(15),
    fullStoragePath: "full/sample15.wav",
    priceUsdCents: 299
  },

  // Vocals
  {
    id: 16,
    filename: "vocal_chop_oh_yeah_processed_Cmaj.wav",
    packName: "Vocal Toolkit",
    packId: 9,
    category: "Vocals",
    artwork: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop",
    bpm: 120,
    key: "C maj",
    duration: 12,
    previewUrl: previewUrl(16),
    fullStoragePath: "full/sample16.wav",
    priceUsdCents: 299
  },

  // Synths
  {
    id: 17,
    filename: "synth_lead_aggressive_saw_Amin.wav",
    packName: "Synth Arsenal",
    packId: 10,
    category: "Synths",
    artwork: "https://images.unsplash.com/photo-1563330232-57114bb0823c?w=400&h=400&fit=crop",
    bpm: 128,
    key: "A min",
    duration: 18,
    previewUrl: previewUrl(17),
    fullStoragePath: "full/sample17.wav",
    priceUsdCents: 299
  },

  // FX
  {
    id: 18,
    filename: "fx_riser_cinematic_buildup_16bar.wav",
    packName: "FX Toolkit Pro",
    packId: 11,
    category: "FX",
    artwork: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop",
    bpm: 0,
    key: "—",
    duration: 16,
    isNew: true,
    previewUrl: previewUrl(18),
    fullStoragePath: "full/sample18.wav",
    priceUsdCents: 299
  }
];

export const sampleCategories = [
  "All",
  "Hip Hop",
  "Trap",
  "Pop",
  "R&B",
  "House",
  "EDM",
  "Drums",
  "Vocals",
  "Synths",
  "FX",
  "Lo-Fi Hip Hop",
  "Ambient",
  "Synthwave"
];


