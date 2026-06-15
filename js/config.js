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
    { src: "assets/images/photo1.jpg",  title: "A beautiful beginning",    date: "Jan 2022",  caption: "Where it all started" },
    { src: "assets/images/photo2.jpg",  title: "Golden afternoon",         date: "Mar 2022",  caption: "That golden light, that golden day" },
    { src: "assets/images/photo3.jpg",  title: "The trip we almost skipped", date: "Jun 2022", caption: "Best spontaneous decision ever" },
    { src: "assets/images/photo4.jpg",  title: "Laughing until it hurt",   date: "Aug 2022",  caption: "I still think about this day" },
    { src: "assets/images/photo5.jpg",  title: "Your energy",              date: "Oct 2022",  caption: "Always the life of every room" },
    { src: "assets/images/photo6.jpg",  title: "Late night talks",         date: "Dec 2022",  caption: "The conversations that matter most" },
    { src: "assets/images/photo7.jpg",  title: "Peaceful morning",         date: "Feb 2023",  caption: "Quietly my favorite kind of day" },
    { src: "assets/images/photo8.jpg",  title: "Unplanned adventure",      date: "Apr 2023",  caption: "Two astronauts, our universe" },
    { src: "assets/images/photo9.jpg",  title: "Just us",                  date: "Jul 2023",  caption: "Final chapter" },
  ],

  // ── MEMORY CARD GAME ────────────────────────────────────
  // Emoji pairs used for the memory card game
  memoryEmojis: ["🌸", "🌙", "⭐", "🎀", "🌈", "🦋", "🍀", "💫"],
  memoryUnlockMessage: "You have the patience of a saint and the memory of an elephant. Here's a little reward 🌸",

  // ── SURPRISE GIFT ────────────────────────────────────────
  giftMessage: "This little gift is really just a reminder: you are so deeply loved. Not just today, always. 🎁🤍",

};
