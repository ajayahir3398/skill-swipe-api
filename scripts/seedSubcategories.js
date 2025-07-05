const mongoose = require('mongoose');
const Subcategory = require('../models/subcategory');
const Category = require('../models/category');
require('dotenv').config();

const sampleSubcategories = [
  // Academic Help
  {
    key: 'subject_tutoring',
    value: 'Subject Tutoring (Math, Physics, etc.)',
    description: 'One-on-one tutoring for various academic subjects',
    categoryKey: 'academic_help'
  },
  {
    key: 'exam_notes_sharing',
    value: 'Exam Notes Sharing',
    description: 'Sharing study materials and exam preparation notes',
    categoryKey: 'academic_help'
  },
  {
    key: 'assignment_proofreading',
    value: 'Assignment Proofreading',
    description: 'Reviewing and improving academic assignments',
    categoryKey: 'academic_help'
  },
  {
    key: 'college_project_guidance',
    value: 'College Project Guidance',
    description: 'Help with college projects and research work',
    categoryKey: 'academic_help'
  },
  {
    key: 'research_paper_help',
    value: 'Research Paper Help',
    description: 'Assistance with research papers and academic writing',
    categoryKey: 'academic_help'
  },

  // Art & Creativity
  {
    key: 'drawing_sketching',
    value: 'Drawing & Sketching',
    description: 'Basic to advanced drawing and sketching techniques',
    categoryKey: 'art_creativity'
  },
  {
    key: 'painting',
    value: 'Painting',
    description: 'Various painting styles and techniques',
    categoryKey: 'art_creativity'
  },
  {
    key: 'photography',
    value: 'Photography',
    description: 'Photography skills and camera techniques',
    categoryKey: 'art_creativity'
  },
  {
    key: 'video_editing',
    value: 'Video Editing',
    description: 'Video editing and post-production skills',
    categoryKey: 'art_creativity'
  },
  {
    key: 'graphic_design',
    value: 'Graphic Design',
    description: 'Digital design and visual communication',
    categoryKey: 'art_creativity'
  },
  {
    key: 'animation',
    value: 'Animation',
    description: '2D and 3D animation techniques',
    categoryKey: 'art_creativity'
  },

  // Repairs & Fixes
  {
    key: 'mobile_computer_repair',
    value: 'Mobile/Computer Repair',
    description: 'Repair services for mobile phones and computers',
    categoryKey: 'repairs_fixes'
  },
  {
    key: 'bicycle_repair',
    value: 'Bicycle Repair',
    description: 'Bicycle maintenance and repair services',
    categoryKey: 'repairs_fixes'
  },
  {
    key: 'home_appliance_fixing',
    value: 'Home Appliance Fixing',
    description: 'Repair and maintenance of household appliances',
    categoryKey: 'repairs_fixes'
  },
  {
    key: 'electrician_help',
    value: 'Electrician Help',
    description: 'Electrical work and wiring assistance',
    categoryKey: 'repairs_fixes'
  },
  {
    key: 'plumbing_help',
    value: 'Plumbing Help',
    description: 'Plumbing repairs and installations',
    categoryKey: 'repairs_fixes'
  },

  // Education & Tutoring
  {
    key: 'maths',
    value: 'Maths',
    description: 'Mathematics tutoring and problem solving',
    categoryKey: 'education_tutoring'
  },
  {
    key: 'science',
    value: 'Science',
    description: 'Science subjects tutoring and experiments',
    categoryKey: 'education_tutoring'
  },
  {
    key: 'english',
    value: 'English',
    description: 'English language and literature tutoring',
    categoryKey: 'education_tutoring'
  },
  {
    key: 'spoken_languages',
    value: 'Spoken Languages (Hindi, Gujarati, English, etc.)',
    description: 'Conversational language learning',
    categoryKey: 'education_tutoring'
  },
  {
    key: 'exam_preparation',
    value: 'Exam Preparation (UPSC, NEET, SSC, etc.)',
    description: 'Preparation for competitive exams',
    categoryKey: 'education_tutoring'
  },

  // Cooking & Food
  {
    key: 'cooking_lessons',
    value: 'Cooking Lessons',
    description: 'Basic to advanced cooking techniques',
    categoryKey: 'cooking_food'
  },
  {
    key: 'baking',
    value: 'Baking',
    description: 'Baking and pastry making skills',
    categoryKey: 'cooking_food'
  },
  {
    key: 'regional_cuisine',
    value: 'Regional Cuisine (Gujarati, South Indian, etc.)',
    description: 'Traditional regional cooking styles',
    categoryKey: 'cooking_food'
  },
  {
    key: 'nutrition_advice',
    value: 'Nutrition Advice',
    description: 'Healthy eating and nutrition guidance',
    categoryKey: 'cooking_food'
  },
  {
    key: 'meal_planning',
    value: 'Meal Planning',
    description: 'Planning balanced and budget-friendly meals',
    categoryKey: 'cooking_food'
  },

  // Music & Dance
  {
    key: 'singing',
    value: 'Singing',
    description: 'Vocal training and singing techniques',
    categoryKey: 'music_dance'
  },
  {
    key: 'guitar',
    value: 'Guitar',
    description: 'Guitar lessons and playing techniques',
    categoryKey: 'music_dance'
  },
  {
    key: 'keyboard_piano',
    value: 'Keyboard/Piano',
    description: 'Piano and keyboard lessons',
    categoryKey: 'music_dance'
  },
  {
    key: 'classical_dance',
    value: 'Classical Dance',
    description: 'Traditional classical dance forms',
    categoryKey: 'music_dance'
  },
  {
    key: 'modern_dance',
    value: 'Modern Dance',
    description: 'Contemporary and modern dance styles',
    categoryKey: 'music_dance'
  },
  {
    key: 'djing_music_mixing',
    value: 'DJing / Music Mixing',
    description: 'DJ skills and music mixing techniques',
    categoryKey: 'music_dance'
  },
  {
    key: 'beatboxing_rap_writing',
    value: 'Beatboxing / Rap Writing',
    description: 'Beatboxing and rap writing skills',
    categoryKey: 'music_dance'
  },

  // Fitness & Sports
  {
    key: 'yoga_partner',
    value: 'Yoga Partner',
    description: 'Yoga practice partner and guidance',
    categoryKey: 'fitness_sports'
  },
  {
    key: 'home_workout_guidance',
    value: 'Home Workout Guidance',
    description: 'Home-based fitness routines and guidance',
    categoryKey: 'fitness_sports'
  },
  {
    key: 'martial_arts',
    value: 'Martial Arts',
    description: 'Martial arts training and self-defense',
    categoryKey: 'fitness_sports'
  },
  {
    key: 'sports_coaching',
    value: 'Sports Coaching (Cricket, Badminton, etc.)',
    description: 'Coaching for various sports activities',
    categoryKey: 'fitness_sports'
  },
  {
    key: 'running_partner',
    value: 'Running Partner / Routine Builder',
    description: 'Running partner and routine development',
    categoryKey: 'fitness_sports'
  },
  {
    key: 'diet_plans_budget',
    value: 'Diet Plans on a Budget',
    description: 'Affordable diet and nutrition plans',
    categoryKey: 'fitness_sports'
  },
  {
    key: 'zumba_group_exercise',
    value: 'Zumba/Group Exercise Coach',
    description: 'Group fitness and dance exercise coaching',
    categoryKey: 'fitness_sports'
  },

  // Tech & Digital Skills
  {
    key: 'web_design',
    value: 'Web Design',
    description: 'Website design and development',
    categoryKey: 'tech_digital_skills'
  },
  {
    key: 'app_development',
    value: 'App Development',
    description: 'Mobile app development and programming',
    categoryKey: 'tech_digital_skills'
  },
  {
    key: 'video_editing_tech',
    value: 'Video Editing',
    description: 'Digital video editing and post-production',
    categoryKey: 'tech_digital_skills'
  },
  {
    key: 'excel_google_sheets',
    value: 'Excel/Google Sheets',
    description: 'Spreadsheet and data management skills',
    categoryKey: 'tech_digital_skills'
  },
  {
    key: 'social_media_management',
    value: 'Social Media Management',
    description: 'Social media strategy and content management',
    categoryKey: 'tech_digital_skills'
  },
  {
    key: 'ui_ux_design',
    value: 'UI/UX Design',
    description: 'User interface and user experience design',
    categoryKey: 'tech_digital_skills'
  },

  // Language & Communication
  {
    key: 'public_speaking',
    value: 'Public Speaking',
    description: 'Public speaking and presentation skills',
    categoryKey: 'language_communication'
  },
  {
    key: 'content_writing',
    value: 'Content Writing',
    description: 'Content creation and writing skills',
    categoryKey: 'language_communication'
  },
  {
    key: 'resume_building',
    value: 'Resume Building',
    description: 'Resume writing and career document preparation',
    categoryKey: 'language_communication'
  },
  {
    key: 'job_interview_practice',
    value: 'Job Interview Practice',
    description: 'Interview preparation and mock interviews',
    categoryKey: 'language_communication'
  },
  {
    key: 'presentation_skills',
    value: 'Presentation Skills',
    description: 'Professional presentation and communication skills',
    categoryKey: 'language_communication'
  },

  // Fashion & Grooming
  {
    key: 'makeup',
    value: 'Makeup',
    description: 'Makeup application and beauty techniques',
    categoryKey: 'fashion_grooming'
  },
  {
    key: 'hair_styling',
    value: 'Hair Styling',
    description: 'Hair styling and grooming techniques',
    categoryKey: 'fashion_grooming'
  },
  {
    key: 'mehendi_art',
    value: 'Mehendi Art',
    description: 'Traditional mehendi and henna art',
    categoryKey: 'fashion_grooming'
  },
  {
    key: 'personal_styling',
    value: 'Personal Styling',
    description: 'Personal fashion and style consultation',
    categoryKey: 'fashion_grooming'
  },
  {
    key: 'skin_care_tips',
    value: 'Skin Care Tips',
    description: 'Skincare routines and beauty advice',
    categoryKey: 'fashion_grooming'
  },

  // Lifestyle & Well-being
  {
    key: 'meditation',
    value: 'Meditation',
    description: 'Meditation and mindfulness practices',
    categoryKey: 'lifestyle_wellbeing'
  },
  {
    key: 'habit_building',
    value: 'Habit Building',
    description: 'Building positive habits and routines',
    categoryKey: 'lifestyle_wellbeing'
  },
  {
    key: 'goal_planning',
    value: 'Goal Planning',
    description: 'Personal goal setting and achievement strategies',
    categoryKey: 'lifestyle_wellbeing'
  },
  {
    key: 'stress_management',
    value: 'Stress Management',
    description: 'Stress relief and mental wellness techniques',
    categoryKey: 'lifestyle_wellbeing'
  },
  {
    key: 'life_coaching',
    value: 'Life Coaching',
    description: 'Personal development and life guidance',
    categoryKey: 'lifestyle_wellbeing'
  },

  // Parenting & Home
  {
    key: 'kids_homework_help',
    value: 'Kids Homework Help',
    description: 'Assistance with children\'s homework and studies',
    categoryKey: 'parenting_home'
  },
  {
    key: 'storytelling',
    value: 'Storytelling',
    description: 'Storytelling and creative writing for children',
    categoryKey: 'parenting_home'
  },
  {
    key: 'toy_repair',
    value: 'Toy Repair',
    description: 'Repairing and maintaining children\'s toys',
    categoryKey: 'parenting_home'
  },
  {
    key: 'home_organization',
    value: 'Home Organization',
    description: 'Home organization and decluttering tips',
    categoryKey: 'parenting_home'
  },
  {
    key: 'baby_sitting',
    value: 'Baby Sitting',
    description: 'Childcare and babysitting services',
    categoryKey: 'parenting_home'
  },

  // Travel & Local Help
  {
    key: 'travel_planning',
    value: 'Travel Planning',
    description: 'Travel itinerary and trip planning assistance',
    categoryKey: 'travel_local_help'
  },
  {
    key: 'local_guide',
    value: 'Local Guide',
    description: 'Local area knowledge and guidance',
    categoryKey: 'travel_local_help'
  },
  {
    key: 'itinerary_suggestions',
    value: 'Itinerary Suggestions',
    description: 'Travel itinerary recommendations and planning',
    categoryKey: 'travel_local_help'
  },
  {
    key: 'bike_car_knowledge',
    value: 'Bike/Car Knowledge',
    description: 'Vehicle maintenance and driving tips',
    categoryKey: 'travel_local_help'
  },
  {
    key: 'public_transport_help',
    value: 'Public Transport Help',
    description: 'Public transportation guidance and tips',
    categoryKey: 'travel_local_help'
  },
  {
    key: 'cheap_travel_hacks',
    value: 'Cheap Travel Hacks',
    description: 'Budget travel tips and money-saving advice',
    categoryKey: 'travel_local_help'
  },
  {
    key: 'hostel_cooking',
    value: 'Hostel Cooking',
    description: 'Cooking tips for hostel and shared living spaces',
    categoryKey: 'travel_local_help'
  },
  {
    key: 'room_setup_help',
    value: 'Room Setup Help',
    description: 'Room decoration and setup assistance',
    categoryKey: 'travel_local_help'
  },
  {
    key: 'second_hand_books_exchange',
    value: 'Second-hand Books Exchange',
    description: 'Book exchange and sharing services',
    categoryKey: 'travel_local_help'
  },

  // Creative Skills
  {
    key: 'poster_flyer_design',
    value: 'Poster/Flyer Design (for college fests)',
    description: 'Design services for college events and promotions',
    categoryKey: 'creative_skills'
  },
  {
    key: 'logo_making',
    value: 'Logo Making',
    description: 'Logo design and branding services',
    categoryKey: 'creative_skills'
  },
  {
    key: 'instagram_reels_editing',
    value: 'Instagram Reels Editing',
    description: 'Social media content creation and editing',
    categoryKey: 'creative_skills'
  },
  {
    key: 'photography_college_events',
    value: 'Photography (for college events)',
    description: 'Event photography and documentation',
    categoryKey: 'creative_skills'
  },
  {
    key: 'meme_making_creative_writing',
    value: 'Meme Making / Creative Writing',
    description: 'Creative content creation and writing',
    categoryKey: 'creative_skills'
  },

  // Personality & Communication
  {
    key: 'public_speaking_practice',
    value: 'Public Speaking Practice',
    description: 'Public speaking practice and improvement',
    categoryKey: 'personality_communication'
  },
  {
    key: 'debating',
    value: 'Debating',
    description: 'Debate skills and argumentation techniques',
    categoryKey: 'personality_communication'
  },
  {
    key: 'english_speaking_buddy',
    value: 'English Speaking Buddy',
    description: 'English conversation practice partner',
    categoryKey: 'personality_communication'
  },
  {
    key: 'interview_preparation',
    value: 'Interview Preparation',
    description: 'Interview skills and preparation guidance',
    categoryKey: 'personality_communication'
  },
  {
    key: 'stage_hosting_tips',
    value: 'Stage Hosting Tips',
    description: 'Event hosting and stage presence skills',
    categoryKey: 'personality_communication'
  },

  // Freelancing & Side Hustles
  {
    key: 'freelance_profile_setup',
    value: 'Freelance Profile Setup (Fiverr, Upwork)',
    description: 'Setting up freelance profiles and portfolios',
    categoryKey: 'freelancing_side_hustles'
  },
  {
    key: 'instagram_page_growth',
    value: 'Instagram Page Growth Tips',
    description: 'Social media growth and marketing strategies',
    categoryKey: 'freelancing_side_hustles'
  },
  {
    key: 'money_saving_apps_advice',
    value: 'Money-Saving Apps Advice',
    description: 'Financial apps and money-saving tips',
    categoryKey: 'freelancing_side_hustles'
  },
  {
    key: 'cryptocurrency_basics',
    value: 'Cryptocurrency Basics',
    description: 'Cryptocurrency education and investment basics',
    categoryKey: 'freelancing_side_hustles'
  },
  {
    key: 'youtube_setup_help',
    value: 'YouTube Setup Help',
    description: 'YouTube channel setup and content creation',
    categoryKey: 'freelancing_side_hustles'
  },

  // Fun & Personal
  {
    key: 'tarot_astrology',
    value: 'Tarot / Astrology',
    description: 'Tarot reading and astrological guidance',
    categoryKey: 'fun_personal'
  },
  {
    key: 'gaming_partner',
    value: 'Gaming Partner (BGMI, FIFA, Valorant)',
    description: 'Gaming partner for various video games',
    categoryKey: 'fun_personal'
  },
  {
    key: 'netflix_recommendations',
    value: 'Netflix Recommendations',
    description: 'Movie and TV show recommendations',
    categoryKey: 'fun_personal'
  },
  {
    key: 'relationship_advice',
    value: 'Relationship Advice',
    description: 'Personal relationship guidance and advice',
    categoryKey: 'fun_personal'
  },
  {
    key: 'movie_night_planner',
    value: 'Movie Night Planner',
    description: 'Planning and organizing movie nights',
    categoryKey: 'fun_personal'
  },

  // Event & Fest Skills
  {
    key: 'event_management',
    value: 'Event Management',
    description: 'Event planning and management services',
    categoryKey: 'event_fest_skills'
  },
  {
    key: 'anchoring_tips',
    value: 'Anchoring Tips',
    description: 'Event anchoring and hosting skills',
    categoryKey: 'event_fest_skills'
  },
  {
    key: 'sponsorship_pitch_deck',
    value: 'Sponsorship Pitch Deck Help',
    description: 'Creating sponsorship proposals and pitch decks',
    categoryKey: 'event_fest_skills'
  },
  {
    key: 'decoration_crafts',
    value: 'Decoration Crafts',
    description: 'Event decoration and craft making',
    categoryKey: 'event_fest_skills'
  },
  {
    key: 'hosting_icebreakers_games',
    value: 'Hosting Icebreakers & Games',
    description: 'Event games and icebreaker activities',
    categoryKey: 'event_fest_skills'
  }
];

async function seedSubcategories() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/skill-swipe');
    console.log('Connected to MongoDB');

    // Clear existing subcategories
    await Subcategory.deleteMany({});
    console.log('Cleared existing subcategories');

    // Insert sample subcategories
    const result = await Subcategory.insertMany(sampleSubcategories);
    console.log(`Seeded ${result.length} subcategories successfully`);

    // Display the seeded data grouped by category
    const categories = await Category.find({}).sort({ key: 1 });
    console.log('\nSeeded subcategories by category:');
    
    for (const category of categories) {
      const subcategories = await Subcategory.find({ categoryKey: category.key }).sort({ key: 1 });
      if (subcategories.length > 0) {
        console.log(`\n${category.value}:`);
        subcategories.forEach(sub => {
          console.log(`  - ${sub.key}: ${sub.value}`);
        });
      }
    }

    mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error seeding subcategories:', error);
    process.exit(1);
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedSubcategories();
}

module.exports = seedSubcategories; 