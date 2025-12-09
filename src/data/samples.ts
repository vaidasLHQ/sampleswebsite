export interface Sample {
  id: number;
  filename: string;
  packName: string;
  packId: number;
  category: string;
  artwork: string;
  bpm: number;
  key: string;
  audioUrl?: string;
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
    audioUrl: "/audio/sample1.mp3"
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
    audioUrl: "/audio/sample2.mp3"
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
    audioUrl: "/audio/sample3.mp3"
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
    audioUrl: "/audio/sample4.mp3"
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
    audioUrl: "/audio/sample5.mp3"
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
    audioUrl: "/audio/sample6.mp3"
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
    audioUrl: "/audio/sample7.mp3"
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
    audioUrl: "/audio/sample8.mp3"
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
    audioUrl: "/audio/sample9.mp3"
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
    audioUrl: "/audio/sample10.mp3"
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
    audioUrl: "/audio/sample11.mp3"
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
    audioUrl: "/audio/sample12.mp3"
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
    audioUrl: "/audio/sample13.mp3"
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
    audioUrl: "/audio/sample14.mp3"
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
    audioUrl: "/audio/sample15.mp3"
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
    audioUrl: "/audio/sample16.mp3"
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
    audioUrl: "/audio/sample17.mp3"
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
    audioUrl: "/audio/sample18.mp3"
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

