const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
require('dotenv').config({ path: './config.env' });

// Sample users data
const users = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Passionate writer and tech enthusiast. Love sharing knowledge and experiences.',
    role: 'user'
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Travel blogger and adventure seeker. Exploring the world one story at a time.',
    role: 'user'
  },
  {
    username: 'mike_wilson',
    email: 'mike@example.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Fitness coach and health advocate. Helping people achieve their wellness goals.',
    role: 'user'
  },
  {
    username: 'sarah_jones',
    email: 'sarah@example.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Food blogger and culinary enthusiast. Sharing delicious recipes and cooking tips.',
    role: 'user'
  },
  {
    username: 'admin',
    email: 'admin@storyloom.com',
    password: 'admin123',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Administrator of StoryLoom. Ensuring the best experience for our community.',
    role: 'admin'
  }
];

// Sample posts data
const posts = [
  {
    title: "The Future of Artificial Intelligence in 2024",
    content: `Artificial Intelligence has been evolving at an unprecedented pace, and 2024 is proving to be a landmark year for this revolutionary technology. From advanced language models to autonomous systems, AI is reshaping industries and our daily lives.

The integration of AI in healthcare has led to breakthroughs in disease diagnosis and treatment planning. Machine learning algorithms can now analyze medical images with accuracy that rivals human experts, enabling earlier detection of conditions like cancer and heart disease.

In the business world, AI-powered automation is streamlining operations and improving efficiency. Companies are leveraging AI for customer service, data analysis, and decision-making processes. The result is not just cost savings, but also enhanced customer experiences and more informed strategic decisions.

However, the rapid advancement of AI also brings challenges. Questions about job displacement, privacy concerns, and ethical considerations are becoming increasingly important. As we embrace AI's potential, we must also address these issues thoughtfully and responsibly.

The key to successful AI implementation lies in finding the right balance between automation and human oversight. While AI can handle routine tasks and provide valuable insights, human creativity, empathy, and judgment remain irreplaceable.

Looking ahead, we can expect AI to become even more integrated into our lives. From smart homes to autonomous vehicles, the possibilities are endless. The challenge for society is to harness AI's power while ensuring it serves humanity's best interests.

As we navigate this AI revolution, education and awareness will be crucial. Understanding AI's capabilities and limitations will help individuals and organizations make informed decisions about its use.

The future of AI is not just about technological advancement, but about creating a world where technology enhances human potential and improves quality of life for everyone.`,
    summary: "Exploring the latest developments in AI technology and their impact on various industries, from healthcare to business automation.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    category: "Technology",
    tags: ["AI", "Technology", "Innovation", "Future"]
  },
  {
    title: "10 Must-Visit Hidden Gems in Southeast Asia",
    content: `Southeast Asia is a treasure trove of incredible destinations, but beyond the well-trodden tourist paths lie some truly magical hidden gems waiting to be discovered. These lesser-known locations offer authentic experiences and breathtaking beauty without the crowds.

In Vietnam, the ancient town of Hoi An is famous, but nearby My Son Sanctuary offers a more intimate look at Cham architecture. The temple complex, surrounded by lush jungle, provides a peaceful alternative to more crowded historical sites.

Thailand's Koh Lanta is a paradise for those seeking tranquility. Unlike its more famous neighbors, this island maintains a laid-back atmosphere with pristine beaches and authentic local culture. The slow pace of life here is perfect for digital nomads and relaxation seekers.

The Philippines' Palawan province is home to the stunning Underground River, but the lesser-known Coron Island offers equally spectacular limestone cliffs and crystal-clear waters. The island's lagoons and hidden beaches are perfect for exploration.

In Indonesia, beyond Bali's tourist centers, lies the peaceful island of Gili Meno. With no motorized vehicles and a focus on sustainability, this tiny island offers a truly off-the-grid experience with some of the best snorkeling in the region.

Malaysia's Cameron Highlands provide a cool mountain escape from the tropical heat. The rolling tea plantations and strawberry farms offer a different perspective on Southeast Asian agriculture and culture.

These destinations not only provide unique experiences but also help distribute tourism benefits to local communities that might otherwise be overlooked. Visiting these hidden gems supports sustainable tourism and preserves the authentic character of these special places.

The key to discovering these treasures is research and flexibility. Local recommendations often lead to the best experiences, and being open to changing plans can result in the most memorable adventures.

Remember to travel responsibly, respecting local customs and environments. These hidden gems are precious precisely because they haven't been overrun by mass tourism, and it's our responsibility to keep them that way.`,
    summary: "Discover lesser-known destinations in Southeast Asia that offer authentic experiences away from tourist crowds.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    category: "Travel",
    tags: ["Travel", "Southeast Asia", "Hidden Gems", "Adventure"]
  },
  {
    title: "The Science Behind Intermittent Fasting: What Research Shows",
    content: `Intermittent fasting has gained significant attention in recent years as a potential strategy for weight management and overall health improvement. But what does the scientific research actually tell us about its effectiveness and safety?

The concept of intermittent fasting involves cycling between periods of eating and fasting. The most popular methods include the 16:8 method (16 hours fasting, 8 hours eating), the 5:2 method (5 days normal eating, 2 days restricted calories), and alternate-day fasting.

Research has shown that intermittent fasting can lead to weight loss, primarily through reduced calorie intake and increased fat burning. During fasting periods, the body switches from using glucose to using stored fat for energy, a process called ketosis.

Studies have also indicated potential benefits beyond weight loss. Intermittent fasting may improve insulin sensitivity, reduce inflammation, and support cellular repair processes. Some research suggests it could help with brain health and longevity.

However, it's important to note that intermittent fasting isn't suitable for everyone. People with certain medical conditions, pregnant women, and those with a history of eating disorders should avoid this approach. It's crucial to consult with healthcare professionals before starting any fasting regimen.

The effectiveness of intermittent fasting varies among individuals. Factors such as age, activity level, and overall health play significant roles in determining outcomes. What works for one person may not work for another.

Sustainability is another important consideration. While intermittent fasting can be effective for short-term weight loss, long-term success depends on maintaining healthy eating habits during non-fasting periods.

Research is ongoing, and while the initial results are promising, more long-term studies are needed to fully understand the effects of intermittent fasting on health and longevity.

The key takeaway is that intermittent fasting can be a useful tool for some people, but it's not a magic solution. It should be part of a comprehensive approach to health that includes regular exercise, adequate sleep, and a balanced diet.`,
    summary: "Examining the scientific evidence behind intermittent fasting and its potential health benefits and considerations.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop",
    category: "Health",
    tags: ["Health", "Nutrition", "Fasting", "Wellness"]
  },
  {
    title: "Digital Marketing Strategies That Actually Work in 2024",
    content: `The digital marketing landscape is constantly evolving, and 2024 has brought new challenges and opportunities for businesses trying to reach their audiences effectively. Understanding what works now is crucial for success in the digital space.

Content marketing remains king, but the approach has shifted significantly. Long-form, value-driven content that addresses specific pain points is outperforming generic promotional material. Video content, especially short-form videos on platforms like TikTok and Instagram Reels, is driving unprecedented engagement.

Personalization has become non-negotiable. Consumers expect experiences tailored to their preferences and behaviors. AI-powered tools are making it possible to deliver highly personalized content at scale, from email campaigns to website experiences.

Social media marketing has evolved beyond simple posting. Community building and authentic engagement are now more important than follower counts. Brands that focus on creating genuine connections with their audience are seeing better results than those that prioritize vanity metrics.

Email marketing continues to be one of the most effective channels, but success requires sophisticated segmentation and automation. Personalized email sequences that guide customers through their journey are proving more effective than generic broadcasts.

SEO has become more complex with Google's algorithm updates. Focus has shifted from keyword stuffing to user intent and experience. Technical SEO, page speed, and mobile optimization are more important than ever.

Paid advertising requires more strategic thinking. With increasing competition and costs, businesses need to be more selective about their targeting and creative approaches. Retargeting and lookalike audiences are becoming essential tools.

The key to success in 2024's digital marketing landscape is integration. No single channel or tactic works in isolation. A cohesive strategy that combines multiple channels and tactics is essential for reaching and converting target audiences.

Measurement and analytics have become more sophisticated. Businesses need to look beyond surface-level metrics and focus on customer lifetime value, conversion rates, and other meaningful KPIs that drive business growth.

The future of digital marketing lies in creating authentic, valuable experiences that build trust and loyalty with customers. Technology should enhance these experiences, not replace the human element that makes marketing effective.`,
    summary: "Exploring effective digital marketing strategies for 2024, focusing on content, personalization, and integrated approaches.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "Education",
    tags: ["Marketing", "Digital", "Strategy", "Business"]
  },
  {
    title: "The Psychology of Color in Web Design: How to Influence User Behavior",
    content: `Color psychology plays a crucial role in web design, influencing how users perceive and interact with websites. Understanding the psychological impact of colors can help designers create more effective and engaging user experiences.

Red is often associated with energy, urgency, and excitement. It's commonly used for call-to-action buttons and important notifications. However, it should be used sparingly as it can also evoke feelings of danger or anger.

Blue conveys trust, stability, and professionalism. It's a popular choice for corporate websites and financial institutions. Different shades of blue can evoke different emotions - lighter blues feel more friendly, while darker blues appear more serious.

Green is associated with growth, health, and nature. It's often used for environmental and health-related websites. Green can also represent money and success, making it suitable for financial and business applications.

Yellow represents optimism, creativity, and warmth. It's great for drawing attention to important elements, but should be used carefully as it can be overwhelming in large amounts.

Purple is often associated with luxury, creativity, and wisdom. It's commonly used by brands that want to convey sophistication and innovation.

Orange combines the energy of red with the friendliness of yellow. It's often used to create a sense of enthusiasm and is effective for call-to-action buttons.

The context and cultural associations of colors are also important. Different cultures may interpret colors differently, so it's crucial to consider the target audience when choosing a color palette.

Color contrast is essential for accessibility. Ensuring sufficient contrast between text and background colors helps users with visual impairments and improves readability for everyone.

The psychology of color should be considered alongside other design elements like typography, layout, and imagery. A cohesive color scheme that aligns with the brand's personality and goals will be most effective.

Testing different color combinations with real users can provide valuable insights into how colors affect user behavior and preferences. A/B testing can help determine which color schemes drive better engagement and conversions.

Remember that color psychology is not an exact science. While certain colors tend to evoke specific emotions, individual experiences and cultural backgrounds can influence how people respond to different colors.

The key is to use color intentionally and consistently throughout the design, ensuring it supports the overall user experience and brand objectives.`,
    summary: "Understanding how color choices in web design can influence user behavior and create more effective digital experiences.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
    category: "Technology",
    tags: ["Design", "Psychology", "Web Design", "UX"]
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Seed the database
const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Post.deleteMany();
    console.log('Cleared existing data');

    // Create users
    const createdUsers = await User.create(users);
    console.log(`Created ${createdUsers.length} users`);

    // Create posts with author references
    const postsWithAuthors = posts.map((post, index) => ({
      ...post,
      author: createdUsers[index % createdUsers.length]._id,
      status: 'published'
    }));

    const createdPosts = await Post.create(postsWithAuthors);
    console.log(`Created ${createdPosts.length} posts`);

    // Add some likes and comments
    for (let i = 0; i < createdPosts.length; i++) {
      const post = createdPosts[i];
      
      // Add random likes
      const randomUsers = createdUsers
        .filter(user => user._id.toString() !== post.author.toString())
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 1);
      
      post.likes = randomUsers.map(user => user._id);
      
      // Add random comments
      const commentUsers = createdUsers
        .filter(user => user._id.toString() !== post.author.toString())
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 2) + 1);
      
      post.comments = commentUsers.map(user => ({
        user: user._id,
        content: `Great article! Thanks for sharing this valuable information.`
      }));
      
      await post.save();
    }

    console.log('Database seeded successfully!');
    console.log('\nSample login credentials:');
    console.log('Admin: admin@storyloom.com / admin123');
    console.log('User: john@example.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 