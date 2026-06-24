import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedReviewsPath = path.join(__dirname, 'src', 'data', 'seedReviews.js');

const indianNames = [
  "Aarav", "Vihaan", "Aditya", "Arjun", "Sai", "Riyansh", "Ayaan", "Krishna", "Ishaan", "Shaurya", "Atharv",
  "Ananya", "Diya", "Aadya", "Saanvi", "Priya", "Riya", "Aarohi", "Anika", "Navya", "Myra", "Kavya", "Ira",
  "Pooja", "Rahul", "Amit", "Suresh", "Ramesh", "Deepak", "Vikram", "Sneha", "Kiran", "Divya", "Neha",
  "Rohan", "Siddharth", "Simran", "Kabir", "Meera", "Sanjay", "Swati", "Tushar", "Harsh", "Gaurav", "Pallavi",
  "Rajesh", "Nikhil", "Tanvi", "Sonam", "Yash", "Lakshmi", "Ritu", "Karan", "Anita", "Vikas", "Sunita", "Preeti",
  "Rakesh", "Gita", "Manoj", "Dinesh", "Kajal", "Ashok", "Suman", "Geeta", "Poonam", "Ajay", "Vijay", "Rekha",
  "Sushma", "Arun", "Anil", "Seema", "Kamal", "Ravi", "Shalini", "Alok", "Prakash", "Nisha", "Umesh", "Arti"
];

const dates = ['2 days ago', '4 days ago', '1 week ago', '2 weeks ago', '3 weeks ago', '1 month ago', '2 months ago', '3 months ago', '4 months ago', '5 months ago'];

// Generic phrases that work for almost anything
const genericEnglish = [
  "Quality is exactly as promised. Very happy with the purchase.",
  "Excellent product! It works wonderfully.",
  "Highly recommend this to everyone. Great value for money.",
  "Fast delivery and premium packaging. The product is top-notch.",
  "It has made a visible difference. I'm totally satisfied.",
  "Best in the market. I will definitely order again.",
  "Nice quality and genuine product. Worth every penny.",
  "Customer service is great, and the product is amazing.",
  "Exactly what I was looking for. Five stars from me!",
  "Great experience overall. The plants seem to love it."
];

const genericHinglish = [
  "Bhai ek number product hai. Quality me koi compromise nahi.",
  "Paisa vasool item hai. Delivery bhi bahut fast thi.",
  "Maine kaafi try kiye but ye sabse best hai. Result mast aaya.",
  "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
  "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
  "100% original lag raha hai. Sahi daam pe achhi cheez.",
  "Bahut badhiya kaam kar raha hai. Ab hamesha yahi se lunga.",
  "Product waisa hi hai jaisa photo me dikhaya. Happy customer.",
  "Bohot kam stores itna sahi saman dete hain. Great job.",
  "Sahi price aur original cheez. Har gardener ko try karna chahiye."
];

const categorySpecific = {
  pottingMix: [
    { title: "Amazing soil", body: "Drainage is perfect and roots are developing beautifully." },
    { title: "Best potting mix", body: "Texture is very light. No fungus issues at all." },
    { title: "Good quality", body: "Soil kaafi fluffy hai, holds moisture well without waterlogging." },
    { title: "Great aeration", body: "The blend of cocopeat and perlite is very well balanced." },
    { title: "Plants love it", body: "Repotting ke time transplant shock bilkul nahi hua." }
  ],
  fiveInOne: [
    { title: "Perfect mix!", body: "Sabkuch already mixed aata hai, very convenient for busy plant parents." },
    { title: "Best soil available", body: "Cocopeat, perlite, neem sab theek ratio me hai. Excellent value." },
    { title: "Amazing results", body: "It genuinely makes 10kg of fluffy soil. Best part is neem ka smell bhi aata hai." },
    { title: "My go-to mix", body: "Lightweight aur well-draining hai. Pots uthane me asani hoti hai." },
    { title: "Outstanding", body: "Growth kafi achhi ho rhi hai plants ki isme. Nutrient rich soil that actually works." }
  ],
  neemCake: [
    { title: "Best pest control", body: "Roses par se aphids ka problem khatam ho gaya. A purely natural solution." },
    { title: "Plants are pest-free", body: "Maine mitti me mix kiya tha, ab koi kide makode nahi aate pots ke pas." },
    { title: "Excellent fertilizer", body: "Fertilizer aur pest control dono ka kaam karta hai. The powder quality is very fine." },
    { title: "Pure and organic", body: "Smell se hi pata chal jata hai ki original neem khali hai. Vegetables are growing healthier." },
    { title: "Pests gone!", body: "Organic gardening karne walo ke liye must buy. Keeps both pests and fungus away effectively." }
  ],
  vermicompost: [
    { title: "Rich compost", body: "Bahut badhiya khaad hai. Ekdum chai patti jaisi dark aur moisture wali." },
    { title: "Plants love it", body: "Growth has accelerated incredibly. Earthy smell proves the quality." },
    { title: "Top quality!", body: "Koi kachra ya patthar nahi tha isme. Ekdum clean vermicompost." },
    { title: "Amazing for soil", body: "I mix half soil and half of this compost. Plants are looking so vibrant and happy." },
    { title: "Pure earthworm castings", body: "I can see the difference. Leaves are bigger and greener. Best compost online." }
  ],
  mustardCake: [
    { title: "Excellent fertilizer", body: "Sarso khali ka powder bahut sahi hai. Paani me bhiga ke use karta hu, results are fantastic." },
    { title: "Plants are thriving", body: "I made a liquid fertilizer for my roses. Phool hi phool aa gaye garden me within weeks." },
    { title: "Great for flowers!", body: "Winter flowers ke liye best khuraak. The fine powder dissolves quickly and effectively." },
    { title: "Highly recommend", body: "Asli sarso ki mehak aati hai. There is absolutely no adulteration." },
    { title: "Works brilliantly", body: "Mere lemon tree pe phool jhad jate the, ab phal rukne lage hain. Very effective product." }
  ],
  cocopeat: [
    { title: "Excellent cocopeat!", body: "Paani dalte hi bahut saara ban gaya. Noticed zero debris or dust in the block. Very clean." },
    { title: "Great for seedlings", body: "Beej ugane ke liye sabse best hai. It holds moisture for a very long time which is crucial." },
    { title: "Superb water retention", body: "Garmi me roz paani dalne ki zaroorat nahi padti ab. Keeps my hanging baskets lightweight." },
    { title: "Best cocopeat", body: "Pehle se dhula hua aur clean lag raha hai. The EC levels seem perfect as my plants aren’t burning." },
    { title: "Value for money", body: "Sahi daam pe acchi quality di hai. One block was enough for multiple medium-sized pots." }
  ],
  seeds: [
    { title: "High germination rate!", body: "Bhai kya mast beej hain. 4-5 din me hi ankur nikal aaye. Very fresh and viable seeds." },
    { title: "Fresh seeds!", body: "Package achha tha. Almost 95% of the seeds sprouted successfully. Kitchen garden mast chal raha hai." },
    { title: "Excellent quality", body: "Dhania aur palak ke beej bahut jaldi nikal aaye. No need to buy these from the market anymore." },
    { title: "Amazing collection", body: "Ghar ke liye sab zaroori sabjiyo ke beej mil gaye ek sath. The germination rate is brilliant." },
    { title: "Super happy!", body: "Phool ke seeds lagaye the pichle mahine, now the flowering has started. Really good product!" }
  ],
  booster: [
    { title: "Plants growing faster!", body: 'Is booster ka asar 1 hafte me hi dikhne lag gaya. New leaves and branches everywhere.' },
    { title: "Incredible results", body: 'Phoolo wale paudhe pe dala, the flower size has visibly increased. Maza aa gaya.' },
    { title: "Must have!", body: 'Sukhne wale paudho me jaan daal di isne. It literally works like magic for struggling plants.' },
    { title: "Works wonders!", body: 'Spray kiya tha rose aur money plant pe. Leaves have turned dark green and very shiny.' },
    { title: "Amazing product", body: 'Price ke hisaab se bahut badhiya hai. Regular use definitely improves overall plant health.' }
  ]
};

function generateReviews(categoryName, specificArray) {
  const reviews = [];
  // Target 60 reviews
  for (let i = 0; i < 60; i++) {
    const name = indianNames[Math.floor(Math.random() * indianNames.length)] + " " + (["Sharma", "Verma", "Singh", "Patel", "Gupta", "Rao", "Jain", "Bansal", "Kumar", "Iyer", "Nair", "Reddy", "Tiwari", "Yadav", "Chauhan", "Sen"][Math.floor(Math.random() * 16)]);
    const rating = Math.random() > 0.85 ? 4 : 5; // Mostly 5s, some 4s
    const date = dates[Math.floor(Math.random() * dates.length)];
    
    // Choose body source: 40% specific, 30% generic English, 30% generic Hinglish
    const r = Math.random();
    let title = "";
    let body = "";
    if (r < 0.4) {
      const spec = specificArray[Math.floor(Math.random() * specificArray.length)];
      title = spec.title;
      body = spec.body;
    } else if (r < 0.7) {
      title = rating === 5 ? "Excellent Product" : "Good Purchase";
      body = genericEnglish[Math.floor(Math.random() * genericEnglish.length)];
    } else {
      title = rating === 5 ? "Mast Product Hai" : "Sahi Hai";
      body = genericHinglish[Math.floor(Math.random() * genericHinglish.length)];
    }

    reviews.push({ name, rating, title, body, date, verified: true });
  }
  return reviews;
}

const finalCode = `// Seed reviews for products — shown when no Firestore reviews exist
const pottingMixReviews = ${JSON.stringify(generateReviews('pottingMix', categorySpecific.pottingMix), null, 2)};
const fiveInOneReviews = ${JSON.stringify(generateReviews('fiveInOne', categorySpecific.fiveInOne), null, 2)};
const neemCakeReviews = ${JSON.stringify(generateReviews('neemCake', categorySpecific.neemCake), null, 2)};
const vermicompostReviews = ${JSON.stringify(generateReviews('vermicompost', categorySpecific.vermicompost), null, 2)};
const mustardCakeReviews = ${JSON.stringify(generateReviews('mustardCake', categorySpecific.mustardCake), null, 2)};
const cocopeatReviews = ${JSON.stringify(generateReviews('cocopeat', categorySpecific.cocopeat), null, 2)};
const seedReviews = ${JSON.stringify(generateReviews('seeds', categorySpecific.seeds), null, 2)};
const boosterReviews = ${JSON.stringify(generateReviews('booster', categorySpecific.booster), null, 2)};
const defaultReviews = ${JSON.stringify(generateReviews('default', categorySpecific.pottingMix), null, 2)}; // fallback

export function getSeedReviews(productSlug, productName, productCategory) {
  const name = (productName || '').toLowerCase();
  const slug = (productSlug || '').toLowerCase();

  if (name.includes('5-in-1') || name.includes('5 in 1') || slug.includes('5-in-1')) {
    return fiveInOneReviews;
  }
  if (name.includes('neem')) {
    return neemCakeReviews;
  }
  if (name.includes('cow dung') || name.includes('vermicompost')) {
    return vermicompostReviews;
  }
  if (name.includes('potting') || name.includes('soil')) {
    return pottingMixReviews;
  }
  if (name.includes('mustard')) {
    return mustardCakeReviews;
  }
  if (name.includes('cocopeat') || name.includes('coco peat')) {
    return cocopeatReviews;
  }
  if (name.includes('seed') || name.includes('bulb') || productCategory === 'seeds') {
    return seedReviews;
  }
  if (name.includes('booster') || name.includes('growth') || name.includes('epsom') || name.includes('potash')) {
    return boosterReviews;
  }
  return defaultReviews;
}
`;

fs.writeFileSync(seedReviewsPath, finalCode);
console.log('Successfully generated exactly 60 reviews per category in seedReviews.js');
