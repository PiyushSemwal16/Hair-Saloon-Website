import myImage from "../public/1773835017380 copy.png"
import Gourav from "../public/image copy 5.png"
import Anuj from "../public/image copy.png"
import Rohit from "../public/image copy 2.png"
import Tony from "../public/image copy 3.png"
import Akshay from "../public/image copy 4.png"
export const barbers = [
  {
    id: 1,
    name: "Mohit gaiswal",
    title: "Owner / Master Barber",
    specialty: "Classic & Modern Cuts",
    instagram: "https://www.instagram.com/mohitgaiswal?igsh=MTd3ZXI1ZnR1NmpnZw==",
    bio: "With over 10 years of experience, Mohit founded MG STUDIO to bring premium grooming services to the community. His expertise spans classic barbering techniques and contemporary styles.",
    image: myImage,
    isOwner: true,
    portfolio: [
      { type: "video", src: "/videos/mohit/Mohit-1.mp4", title: "Fade Cutting" },
       { type: "video", src: "/videos/mohit/Mohit-2.mp4", title: "Fade Cutting" },
        { type: "video", src: "/videos/mohit/Mohit-4.mp4", title: "Fade Cutting" },
      // { type: "image", src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=600&fit=crop", title: "Classic Fade" },
      // { type: "image", src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=600&fit=crop", title: "Textured Crop" },
    
      
    ],
  },
  {
    id: 2,
    name: "Rishab",
    title: "Unisex Hairdresser ",
    specialty: "Women’s haircuts, hair coloring, and styling",
    instagram: "https://www.instagram.com/hair_artist_rishabh?igsh=bHpsN2M5Z3k1YWxh",
    bio: "",
    image: Gourav,
    isOwner: false,    portfolio: [
      { type: "video", src: "/videos/Rishab/Rishab-1.mp4", title: "Fade Cutting" },
      { type: "video", src: "/videos/Rishab/Rishab-4.mp4", title: "Fade Cutting" },
      { type: "video", src: "/videos/Rishab/Rishab-3.mp4", title: "Fade Cutting" },
      // { type: "image", src: "https://images.unsplash.com/photo-1595348440529-ceb849e26b6f?w=600&h=600&fit=crop", title: "Hair Styling" },
    ],  },
 
  {
    id: 4,
    name: "Anuj",
    title: "Junior Barber",
    specialty: "Textured Cuts & Designs",
    bio: "",
    image: Anuj,
    isOwner: false,
    portfolio: [],
  },
  {
    id: 5,
    name: "Rohit",
    title: "Junior Barber",
    specialty: "Textured Cuts & Designs",
    bio: "",
    image: Rohit,
    isOwner: false,
    portfolio: [],
  },
   {
    id: 6,
    name: "Akshay",
    title: "Junior Barber",
    specialty: "Textured Cuts & Designs",
    bio: "",
    image: Akshay,
    isOwner: false,
    portfolio: [],
  },
  {
    id: 3,
    name: "Tony",
    title: "Senior Barber",
    specialty: "Hair Styling & Grooming",
    bio: "",
    image: Tony,
    isOwner: false,
    portfolio: [],
  },
 
];

export const haircutStyles = [
  {
    id: 1,
    name: "Classic Fade",
    description: "A timeless look with a gradual transition from short to longer hair on top.",
    image: "/Fadecut.jpg",
  },
  {
    id: 2,
    name: "Textured Crop",
    description: "Modern and stylish with natural texture and movement throughout.",
    image: "/TexturedCrop.jpg",
  },
  {
    id: 3,
    name: "Wolf Cut",
    description: "Layered texture with a bold, modern shape for a trendy and expressive look.",
    image: "/wolfcut.jpg",
  },
  {
    id: 4,
    name: "Pompadour",
    description: "A sophisticated style with volume on top, perfect for a refined look.",
    image: "/Short-Pompadour.webp",
  },
  {
    id: 5,
    name: "Buzz Cut",
    description: "Clean, low-maintenance, and effortlessly stylish for any occasion.",
    image: "/Buzz cut.jpg",
  },
  {
    id: 6,
    name: "Slick Back",
    description: "A polished, classic style that exudes confidence and sophistication.",
    image: "/Sideback.webp",
  },
];

export const ladiesSalonServices = [
  {
    id: 101,
    name: "Hair Spa",
    description: "Deep conditioning treatment to nourish and restore hair health.",
  },
  {
    id: 102,
    name: "Hair Pressing",
    description: "Smooth and sleek straightening for a polished finish.",
  },
  {
    id: 103,
    name: "Root Touch-Up",
    description: "Quick color refresh for roots and regrowth coverage.",
  },
  {
    id: 104,
    name: "Global Colour",
    description: "Full hair color service for a complete new look.",
  },
  {
    id: 105,
    name: "Highlighting",
    description: "Dimension-adding highlights for a brighter, styled appearance.",
  },
  {
    id: 106,
    name: "Manicure",
    description: "Classic nail and hand care for a clean, elegant look.",
  },
  {
    id: 107,
    name: "Pedicure",
    description: "Foot and nail grooming for comfort and freshness.",
  },
  {
    id: 108,
    name: "Nail Art",
    description: "Creative nail styling with modern designs and detailing.",
  },
  {
    id: 109,
    name: "Hydra Facial",
    description: "Hydrating facial treatment for glow, clarity, and skin renewal.",
  },
];

export const academyTuitionClasses = [
  {
    id: 201,
    name: "Beginner Barbering Basics",
    description: "Foundational training on tools, hygiene, sectioning, and classic cuts.",
  },
  {
    id: 202,
    name: "Fade & Blending Masterclass",
    description: "Hands-on fade techniques, clipper control, and smooth blending practice.",
  },
  {
    id: 203,
    name: "Beard Styling & Grooming",
    description: "Line-up precision, beard shaping, and finishing for premium client results.",
  },
  {
    id: 204,
    name: "Unisex Hair Styling Program",
    description: "Core women and unisex styling, basic coloring concepts, and salon workflow.",
  },
];

export const appointmentServices = [
  ...haircutStyles.map((style) => ({
    id: style.id,
    name: style.name,
    category: "Barbering",
  })),
  ...ladiesSalonServices.map((service) => ({
    id: service.id,
    name: service.name,
    category: "Unisex Salon (Ladies)",
  })),
  ...academyTuitionClasses.map((course) => ({
    id: course.id,
    name: course.name,
    category: "Academy / Tuition Classes",
  })),
];

export const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
];
