/**
 * ============================================================
 * BIRTHDAY WEBSITE — CONFIGURATION
 * ============================================================
 * Edit values here to customize the entire experience.
 * Do NOT store the visitor's name or age here —
 * those are captured dynamically during the intro screens.
 * ============================================================
 */

const CONFIG = {

  // ── SECURITY ─────────────────────────────────────────────
  password: "270608",

  // ── HERO ─────────────────────────────────────────────────
  heroSubtitle: "Today is your day. Every single moment of it.",

  // ── MUSIC ────────────────────────────────────────────────
  // Place your audio file in assets/audio/ and update the path.
  musicFile: "assets/audio/birthday-song.mp3",

  // ── DIGITAL LETTER ───────────────────────────────────────
  // The first line "Dear [Name]," is added automatically.
  birthdayLetter: [
    "Some people walk into your life quietly, and somehow everything feels a little warmer after.",
    "You are one of those rare people the kind who makes ordinary moments feel like they matter.",
    "On this birthday, I want you to know that the world is genuinely better because you're in it.",
    "Not because of grand gestures or perfect moments, but because of the small, real ways you show up.",
    "The laughter you bring. The patience you carry. The light that follows you without you even trying.",
    "So today, on your special day breathe it all in. You deserve every bit of the joy coming your way.",
    "Happy Birthday, ${State.name}! 🤍"
  ],

  // ── ENDING MESSAGE ───────────────────────────────────────
  endingMessage: "May every year ahead be kinder, brighter, and more beautiful than the last.",

  // ── GALLERY ──────────────────────────────────────────────
  // Add images to assets/images/ and list them here.
  // Leave src as placeholder if image doesn't exist yet.
  galleryItems: [
    { src: "assets/images/photo1.jpg",  title: "A beautiful beginning",    date: "Aug 2024",  caption: "Where it all started" },
    { src: "assets/images/photo2.jpg",  title: "A core memory",         date: "Oct 2024",  caption: "That golden light, that golden day" },
    { src: "assets/images/photo3.jpg",  title: "Caught in the moment", date: "May 2025", caption: "Best spontaneous decision ever" },
    { src: "assets/images/photo4.jpg",  title: "Back to the classroom",   date: "Oct 2024",  caption: "I still think about this day" },
    { src: "assets/images/photo5.jpg",  title: "Radiant smile",              date: "Apr 2026",  caption: "Always the life of every room" },
    { src: "assets/images/photo6.jpg",  title: "Late night talks",         date: "Sep 2024",  caption: "The conversations that matter most" },
    { src: "assets/images/photo7.jpg",  title: "Blossoming peace",         date: "Sep 2024",  caption: "Finding peace in the little things" },
    { src: "assets/images/photo8.jpg",  title: "Our little galaxy",      date: "Nov 2024",  caption: "Two astronauts, our universe" },
    { src: "assets/images/photo9.jpg",  title: "The bittersweet end",                  date: "Jan 2025",  caption: "Final chapter" },
  ],

  // ── MEMORY CARD GAME ────────────────────────────────────
  // Emoji pairs used for the memory card game
  memoryEmojis: ["🌸", "🌙", "⭐", "🎀", "🌈", "🦋", "🍀", "💫"],
  memoryUnlockMessage: "You have the patience of a saint and the memory of an elephant. Here's a little reward 🌸",

  // ── SURPRISE GIFT ────────────────────────────────────────
  giftMessage: "This little gift is really just a reminder: you are so deeply loved. Not just today, always. 🎁🤍",

};
