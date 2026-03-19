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
    bio: "",
    image: Gourav,
    isOwner: false,    portfolio: [
      { type: "video", src: "/videos/Rishab/Rishab-1.mp4", title: "Fade Cutting" },
      { type: "video", src: "/videos/Rishab/Rishab-4.mp4", title: "Fade Cutting" },
      { type: "video", src: "/videos/Rishab/Rishab-3.mp4", title: "Fade Cutting" },
      // { type: "image", src: "https://images.unsplash.com/photo-1595348440529-ceb849e26b6f?w=600&h=600&fit=crop", title: "Hair Styling" },
    ],  },
  {
    id: 3,
    name: "Tony",
    title: "Senior Barber",
    specialty: "Hair Styling & Grooming",
    bio: "",
    image: Tony,
    isOwner: false,
    portfolio: [
      { type: "image", src: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&h=600&fit=crop", title: "Pompadour" },
      { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/forrest_gump.mp4", title: "Beard Styling Tutorial" },
      { type: "image", src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop", title: "Beard Styling" },
      { type: "image", src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=600&fit=crop", title: "Design Fade" },
    ],
  },
  {
    id: 4,
    name: "Anuj",
    title: "Junior Barber",
    specialty: "Textured Cuts & Designs",
    bio: "",
    image: Anuj,
    isOwner: false,
    portfolio: [
      { type: "image", src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=600&fit=crop", title: "Clean Cut" },
      { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/sintel.mp4", title: "Textured Cut Demo" },
      { type: "image", src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=600&fit=crop", title: "Textured" },
      { type: "image", src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=600&fit=crop", title: "Design Line" },
    ],
  },
  {
    id: 5,
    name: "Rohit",
    title: "Junior Barber",
    specialty: "Textured Cuts & Designs",
    bio: "",
    image: Rohit,
    isOwner: false,
    portfolio: [
      { type: "image", src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=600&fit=crop", title: "Modern Fade" },
      { type: "image", src: "https://images.unsplash.com/photo-1522337660859-02fbefca6088?w=600&h=600&fit=crop", title: "Styled Look" },
      { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/testvideo.mp4", title: "Fade Technique" },
      { type: "image", src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=600&fit=crop", title: "Sharp Design" },
    ],
  },
   {
    id: 6,
    name: "Akshay",
    title: "Junior Barber",
    specialty: "Textured Cuts & Designs",
    bio: "",
    image: Akshay,
    isOwner: false,
    portfolio: [
      { type: "image", src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=600&fit=crop", title: "Textured Crop" },
      { type: "image", src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop", title: "Grooming" },
      { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/vids_google_main.mp4", title: "Precision Cutting" },
      { type: "image", src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=600&fit=crop", title: "Precision Cut" },
    ],
  },
 
 
];

export const haircutStyles = [
  {
    id: 1,
    name: "Classic Fade",
    description: "A timeless look with a gradual transition from short to longer hair on top.",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=500&fit=crop",
  },
  {
    id: 2,
    name: "Textured Crop",
    description: "Modern and stylish with natural texture and movement throughout.",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=500&fit=crop",
  },
  {
    id: 3,
    name: "Skin Fade",
    description: "A bold, clean look that fades down to the skin for maximum contrast.",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=500&fit=crop",
  },
  {
    id: 4,
    name: "Pompadour",
    description: "A sophisticated style with volume on top, perfect for a refined look.",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400&h=500&fit=crop",
  },
  {
    id: 5,
    name: "Buzz Cut",
    description: "Clean, low-maintenance, and effortlessly stylish for any occasion.",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=500&fit=crop",
  },
  {
    id: 6,
    name: "Slick Back",
    description: "A polished, classic style that exudes confidence and sophistication.",
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&h=500&fit=crop",
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
