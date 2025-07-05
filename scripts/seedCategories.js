const mongoose = require('mongoose');
const Category = require('../models/category');
require('dotenv').config();

const sampleCategories = [
  {
    key: 'academic_help',
    value: 'Academic Help',
    description: 'Educational support, tutoring, and academic assistance'
  },
  {
    key: 'art_creativity',
    value: 'Art & Creativity',
    description: 'Creative arts, crafts, and artistic skills'
  },
  {
    key: 'repairs_fixes',
    value: 'Repairs & Fixes',
    description: 'Handyman services, repairs, and maintenance'
  },
  {
    key: 'education_tutoring',
    value: 'Education & Tutoring',
    description: 'Teaching, mentoring, and educational services'
  },
  {
    key: 'cooking_food',
    value: 'Cooking & Food',
    description: 'Culinary skills, cooking classes, and food preparation'
  },
  {
    key: 'music_dance',
    value: 'Music & Dance',
    description: 'Musical instruments, dance classes, and performance arts'
  },
  {
    key: 'fitness_sports',
    value: 'Fitness & Sports',
    description: 'Physical fitness, sports training, and athletic activities'
  },
  {
    key: 'tech_digital_skills',
    value: 'Tech & Digital Skills',
    description: 'Technology, digital tools, and computer skills'
  },
  {
    key: 'language_communication',
    value: 'Language & Communication',
    description: 'Language learning, communication skills, and translation'
  },
  {
    key: 'fashion_grooming',
    value: 'Fashion & Grooming',
    description: 'Fashion advice, styling, and personal grooming'
  },
  {
    key: 'lifestyle_wellbeing',
    value: 'Lifestyle & Well-being',
    description: 'Health, wellness, and lifestyle improvement'
  },
  {
    key: 'parenting_home',
    value: 'Parenting & Home',
    description: 'Parenting advice, home management, and family skills'
  },
  {
    key: 'travel_local_help',
    value: 'Travel & Local Help',
    description: 'Travel guidance, local knowledge, and tourism assistance'
  },
  {
    key: 'creative_skills',
    value: 'Creative Skills',
    description: 'Creative abilities, design, and artistic talents'
  },
  {
    key: 'personality_communication',
    value: 'Personality & Communication',
    description: 'Personal development, communication, and social skills'
  },
  {
    key: 'freelancing_side_hustles',
    value: 'Freelancing & Side Hustles',
    description: 'Freelance work, side projects, and entrepreneurial skills'
  },
  {
    key: 'fun_personal',
    value: 'Fun & Personal',
    description: 'Entertainment, hobbies, and personal interests'
  },
  {
    key: 'event_fest_skills',
    value: 'Event & Fest Skills',
    description: 'Event planning, festival organization, and celebration skills'
  }
];

async function seedCategories() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/skill-swipe');
    console.log('Connected to MongoDB');

    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Insert sample categories
    const result = await Category.insertMany(sampleCategories);
    console.log(`Seeded ${result.length} categories successfully`);

    // Display the seeded data
    const categories = await Category.find({}).sort({ key: 1 });
    console.log('\nSeeded categories:');
    categories.forEach(cat => {
      console.log(`- ${cat.key}: ${cat.value}`);
    });

    mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedCategories();
}

module.exports = seedCategories; 