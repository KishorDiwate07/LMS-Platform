import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/userModel.js";
import Course from "./models/courseModel.js";
import connectDb from "./configs/db.js";

dotenv.config();

const coursesData = [
  {
    title: "Complete Python Bootcamp",
    subTitle: "Learn Python from scratch",
    description: "A comprehensive guide to learning Python programming, from basic concepts to advanced web development with Django and data science.",
    category: "Development",
    level: "Beginner",
    price: 49.99,
    thumbnail: "https://picsum.photos/seed/python/800/400",
    isPublished: true
  },
  {
    title: "Advanced JavaScript Concepts",
    subTitle: "Master modern JS",
    description: "Deep dive into closures, prototypes, async/await, and design patterns in JavaScript.",
    category: "Development",
    level: "Advanced",
    price: 59.99,
    thumbnail: "https://picsum.photos/seed/js/800/400",
    isPublished: true
  },
  {
    title: "React Native Mobile App Development",
    subTitle: "Build apps for iOS and Android",
    description: "Learn how to build cross-platform mobile applications using React Native and Expo.",
    category: "Development",
    level: "Intermediate",
    price: 69.99,
    thumbnail: "https://picsum.photos/seed/reactnative/800/400",
    isPublished: true
  },
  {
    title: "Digital Marketing Fundamentals",
    subTitle: "Grow your online presence",
    description: "Learn SEO, Social Media Marketing, Email Campaigns, and Analytics to grow any business online.",
    category: "Marketing",
    level: "Beginner",
    price: 39.99,
    thumbnail: "https://picsum.photos/seed/marketing/800/400",
    isPublished: true
  },
  {
    title: "Full-Stack Web Development with MERN",
    subTitle: "MongoDB, Express, React, Node",
    description: "Build robust full-stack web applications using the MERN stack. Includes a massive final project.",
    category: "Development",
    level: "Intermediate",
    price: 89.99,
    thumbnail: "https://picsum.photos/seed/mern/800/400",
    isPublished: true
  },
  {
    title: "Data Science with Python",
    subTitle: "Pandas, NumPy, and Scikit-Learn",
    description: "Learn data analysis and machine learning basics using the most popular Python libraries.",
    category: "Data Science",
    level: "Beginner",
    price: 79.99,
    thumbnail: "https://picsum.photos/seed/datascience/800/400",
    isPublished: true
  },
  {
    title: "UI/UX Design Masterclass",
    subTitle: "Design beautiful interfaces",
    description: "Learn Figma, design theory, user psychology, and how to create stunning user interfaces.",
    category: "Design",
    level: "Beginner",
    price: 49.99,
    thumbnail: "https://picsum.photos/seed/design/800/400",
    isPublished: true
  },
  {
    title: "Machine Learning A-Z",
    subTitle: "Hands-on Python & R",
    description: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts.",
    category: "Data Science",
    level: "Advanced",
    price: 99.99,
    thumbnail: "https://picsum.photos/seed/ml/800/400",
    isPublished: true
  },
  {
    title: "Cybersecurity Basics",
    subTitle: "Protect your digital assets",
    description: "Understand the fundamentals of cybersecurity, network defense, and ethical hacking.",
    category: "IT & Software",
    level: "Beginner",
    price: 44.99,
    thumbnail: "https://picsum.photos/seed/cyber/800/400",
    isPublished: true
  },
  {
    title: "Mastering AWS Cloud",
    subTitle: "Prepare for AWS Certification",
    description: "Comprehensive guide to Amazon Web Services. Learn EC2, S3, RDS, and serverless computing.",
    category: "IT & Software",
    level: "Intermediate",
    price: 64.99,
    thumbnail: "https://picsum.photos/seed/aws/800/400",
    isPublished: true
  },
  {
    title: "Financial Modeling and Valuation",
    subTitle: "Excel skills for finance",
    description: "Learn to build financial models from scratch and value companies like a Wall Street analyst.",
    category: "Business",
    level: "Intermediate",
    price: 54.99,
    thumbnail: "https://picsum.photos/seed/finance/800/400",
    isPublished: true
  },
  {
    title: "Introduction to Photography",
    subTitle: "Capture stunning photos",
    description: "Learn the basics of exposure, composition, and lighting to take your photography to the next level.",
    category: "Photography",
    level: "Beginner",
    price: 29.99,
    thumbnail: "https://picsum.photos/seed/photo/800/400",
    isPublished: true
  },
  {
    title: "Advanced SEO Strategies",
    subTitle: "Rank #1 on Google",
    description: "Technical SEO, link building, and content strategies to dominate search engine results.",
    category: "Marketing",
    level: "Advanced",
    price: 74.99,
    thumbnail: "https://picsum.photos/seed/seo/800/400",
    isPublished: true
  },
  {
    title: "C++ for High Performance Computing",
    subTitle: "Master C++ memory management",
    description: "Deep dive into C++ optimization, multithreading, and low-level system design.",
    category: "Development",
    level: "Advanced",
    price: 84.99,
    thumbnail: "https://picsum.photos/seed/cpp/800/400",
    isPublished: true
  },
  {
    title: "Public Speaking Mastery",
    subTitle: "Speak with confidence",
    description: "Overcome fear, structure your speeches, and deliver powerful presentations.",
    category: "Personal Development",
    level: "Beginner",
    price: 34.99,
    thumbnail: "https://picsum.photos/seed/speaking/800/400",
    isPublished: true
  },
  {
    title: "Go Programming Language",
    subTitle: "Build scalable backends",
    description: "Learn Golang to build concurrent, scalable, and high-performance server-side applications.",
    category: "Development",
    level: "Intermediate",
    price: 59.99,
    thumbnail: "https://picsum.photos/seed/golang/800/400",
    isPublished: true
  },
  {
    title: "Blockchain and Cryptocurrency",
    subTitle: "Understand Web3",
    description: "A comprehensive guide to how blockchain works, smart contracts, and decentralized finance (DeFi).",
    category: "IT & Software",
    level: "Intermediate",
    price: 69.99,
    thumbnail: "https://picsum.photos/seed/crypto/800/400",
    isPublished: true
  },
  {
    title: "Project Management Professional (PMP)",
    subTitle: "Pass the PMP exam",
    description: "Everything you need to know to pass the PMP certification exam on your first try.",
    category: "Business",
    level: "Advanced",
    price: 94.99,
    thumbnail: "https://picsum.photos/seed/pmp/800/400",
    isPublished: true
  },
  {
    title: "Music Production with Ableton Live",
    subTitle: "Create electronic music",
    description: "Learn beat making, synthesis, mixing, and mastering in Ableton Live.",
    category: "Music",
    level: "Beginner",
    price: 49.99,
    thumbnail: "https://picsum.photos/seed/music/800/400",
    isPublished: true
  },
  {
    title: "Spanish for Beginners",
    subTitle: "Learn to speak Spanish",
    description: "A practical guide to conversational Spanish for travel and business.",
    category: "Language",
    level: "Beginner",
    price: 24.99,
    thumbnail: "https://picsum.photos/seed/spanish/800/400",
    isPublished: true
  }
];

const seedDB = async () => {
  try {
    await connectDb();
    
    // Find or create the educator
    const email = "educator@gmail.com";
    const password = "test#123";
    
    let educator = await User.findOne({ email });
    
    if (!educator) {
      const hashPassword = await bcrypt.hash(password, 10);
      educator = await User.create({
        name: "Demo Educator",
        email: email,
        password: hashPassword,
        role: "educator",
        description: "An experienced educator teaching various topics."
      });
      console.log("Created new educator:", educator.email);
    } else {
        const hashPassword = await bcrypt.hash(password, 10);
        educator.password = hashPassword;
        educator.role = "educator";
        await educator.save();
        console.log("Educator already exists, updated password:", educator.email);
    }

    // Add courses
    console.log("Inserting courses...");
    
    const coursesWithCreator = coursesData.map(course => ({
        ...course,
        creator: educator._id
    }));

    await Course.insertMany(coursesWithCreator);
    
    console.log(`Successfully added ${coursesData.length} courses!`);
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding DB:", error);
    process.exit(1);
  }
};

seedDB();
