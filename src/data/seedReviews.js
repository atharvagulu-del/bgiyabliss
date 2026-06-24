// Seed reviews for products — shown when no Firestore reviews exist
const DATES = ['2 days ago','4 days ago','1 week ago','1 week ago','2 weeks ago','2 weeks ago','3 weeks ago','3 weeks ago','1 month ago','1 month ago','1 month ago','2 months ago','2 months ago','3 months ago','3 months ago','4 months ago','5 months ago','6 months ago'];

const pottingMixReviews = [
  { name: 'Priya Sharma', rating: 5, title: 'Amazing soil quality!', body: 'Bhai ek number soil hai. Mere plants me 1 week me hi kaafi growth dikhi. Drainage bhi sahi hai aur roots achhe se develop ho rahe hain.', date: '2 days ago', verified: true },
  { name: 'Rohit Verma', rating: 5, title: 'Best potting mix ever', body: 'The texture is perfect. I repotted my rose plants and the flowering has significantly improved. Highly recommended!', date: '4 days ago', verified: true },
  { name: 'Ananya Gupta', rating: 5, title: 'Perfect for indoor plants', body: 'Maine apne indoor plants pe try kiya, result bohot sahi hai. Absolutely no fungus issues at all.', date: '1 week ago', verified: true },
  { name: 'Vikram Singh', rating: 4, title: 'Good quality product', body: 'Packaging bhi achhi thi aur soil mix premium lag raha hai. The blend of cocopeat and perlite is well balanced.', date: '1 week ago', verified: true },
  { name: 'Meera Patel', rating: 5, title: 'Worth every rupee', body: 'Soil kaafi fluffy hai, holds the right amount of moisture without waterlogging. Maza aa gaya use karke.', date: '2 weeks ago', verified: true },
  { name: 'Arjun Reddy', rating: 5, title: 'Fantastic purchase', body: 'I have tried many local brands but this one stands out. Extremely clean and weed-free potting mix.', date: '2 weeks ago', verified: true },
  { name: 'Sneha Joshi', rating: 5, title: 'Highly recommend', body: 'Maine kaafi brands try kiye but iska result sabse fast aur achha hai. Great aeration for root growth.', date: '3 weeks ago', verified: true },
  { name: 'Deepak Kumar', rating: 5, title: 'My plants love it!', body: 'Succulents ke liye bohot sahi raha. Earlier I struggled with root rot but this mix is a lifesaver.', date: '1 month ago', verified: true },
  { name: 'Kavita Nair', rating: 5, title: 'Excellent for vegetables', body: 'Kitchen garden ke liye mast hai. Tomatoes and chillies are thriving like crazy.', date: '1 month ago', verified: true },
  { name: 'Sanjay Tiwari', rating: 5, title: 'Premium quality', body: 'Quality me koi compromise nahi. You can literally see the perlite and compost mixed properly.', date: '1 month ago', verified: true },
  { name: 'Pooja Mehta', rating: 5, title: 'Great for repotting', body: 'No transplant shock at all. Repotted 5 of my snake plants and they adjusted perfectly.', date: '2 months ago', verified: true },
  { name: 'Rahul Desai', rating: 4, title: 'Good stuff', body: 'Very light and airy mix. Kaafi easily plants grow hote hain isme. Will buy again for sure.', date: '2 months ago', verified: true },
  { name: 'Neha Chawla', rating: 5, title: 'Five stars!', body: 'Quality is exactly as promised. My balcony garden is looking much greener now.', date: '3 months ago', verified: true }
];

const fiveInOneReviews = [
  { name: 'Anjali Srivastava', rating: 5, title: 'Perfect 5-in-1 mix!', body: 'Sabkuch already mixed aata hai toh alag se kuch dalne ka tension nahi. Very convenient for busy plant parents.', date: '2 days ago', verified: true },
  { name: 'Manish Pandey', rating: 5, title: 'Best soil mix available', body: 'Cocopeat, perlite, neem sab theek ratio me hai. Plants bahut fast grow kar rahe hain. Excellent value.', date: '3 days ago', verified: true },
  { name: 'Swati Kulkarni', rating: 5, title: 'Amazing results!', body: 'Pehle meri soil hard ho jati thi, but ye mix hamesha soft rehta hai. It genuinely makes 10kg of fluffy soil.', date: '4 days ago', verified: true },
  { name: 'Tushar Jain', rating: 5, title: 'Great product', body: 'Neem powder hone ki wajah se pests bhi nahi lagte. Overall a fantastic all-in-one product.', date: '1 week ago', verified: true },
  { name: 'Ritika Bansal', rating: 5, title: 'My go-to potting mix', body: 'This is my third order. Consistency hamesha best rehti hai. Full value for money.', date: '1 week ago', verified: true },
  { name: 'Harsh Goel', rating: 5, title: 'Love this product!', body: 'Block ko paani me dalte hi kaafi saari soil ban jati hai. It’s so easy to store and use when needed.', date: '2 weeks ago', verified: true },
  { name: 'Simran Kaur', rating: 5, title: 'Very good mix', body: 'Lightweight aur well-draining hai. It is so much easier to move my pots around the balcony now.', date: '2 weeks ago', verified: true },
  { name: 'Aditya Bhatt', rating: 5, title: 'Outstanding!', body: 'Bhai sacchi me 10kg ban gaya. Mere saare pots bhar gaye ek block me. Brilliant concept.', date: '3 weeks ago', verified: true },
  { name: 'Megha Thakur', rating: 5, title: 'Highly recommended', body: 'Growth kafi achhi ho rhi hai plants ki isme. Nutrient rich soil that actually works.', date: '3 weeks ago', verified: true },
  { name: 'Varun Malhotra', rating: 5, title: 'Perfect blend', body: 'Best part is neem ka smell bhi aata hai, which proves it is a genuine organic product.', date: '1 month ago', verified: true },
  { name: 'Isha Dubey', rating: 5, title: 'Best in the market', body: 'My philodendrons are growing incredibly fast in this. Will never go back to regular soil.', date: '1 month ago', verified: true },
  { name: 'Gaurav Sen', rating: 4, title: 'Really nice', body: 'Kaafi time se I was looking for a good mix. Ye try kiya and it is genuinely good. Easy to use.', date: '2 months ago', verified: true },
  { name: 'Shruti Iyer', rating: 5, title: 'Game changer', body: 'This 5-in-1 formula has saved me so much time. Merged everything I needed into one block.', date: '2 months ago', verified: true }
];

const neemCakeReviews = [
  { name: 'Sneha Joshi', rating: 5, title: 'Best organic pest control!', body: 'Roses par se aphids ka problem khatam ho gaya neem cake use karne ke baad. A purely natural solution.', date: '2 days ago', verified: true },
  { name: 'Ravi Chauhan', rating: 5, title: 'Plants are pest-free now', body: 'I mixed it into my potting soil and have not seen a single pest near my pots since.', date: '4 days ago', verified: true },
  { name: 'Pooja Mehta', rating: 5, title: 'Excellent fertilizer!', body: 'Fertilizer aur pest control dono ka kaam karta hai. The powder quality is very fine and authentic.', date: '1 week ago', verified: true },
  { name: 'Sanjay Tiwari', rating: 4, title: 'Good quality neem cake', body: 'Smell se hi pata chal jata hai ki original neem khali hai. Vegetables are growing healthier now.', date: '1 week ago', verified: true },
  { name: 'Divya Rao', rating: 5, title: 'Must-have for gardeners', body: 'Mealybugs ne pareshan kiya tha, neem cake se kaafi aaram hai. Highly recommend mixing it in the soil.', date: '2 weeks ago', verified: true },
  { name: 'Amit Saxena', rating: 5, title: 'Pests gone completely!', body: 'Organic gardening karne walo ke liye must buy. Keeps both pests and fungus away effectively.', date: '2 weeks ago', verified: true },
  { name: 'Nisha Kapoor', rating: 5, title: 'Pure and organic', body: 'Powder form me hai toh use karna aasan hai. I sometimes mix it with water and apply as a liquid feed too.', date: '3 weeks ago', verified: true },
  { name: 'Kunal Verma', rating: 5, title: 'Great product', body: 'Quality me no compromise. Mera hibiscus bilkul safe hai ab insect attacks se.', date: '1 month ago', verified: true },
  { name: 'Akanksha Singh', rating: 5, title: 'Highly effective', body: 'Very happy with this purchase. Totally natural and safe for the environment.', date: '1 month ago', verified: true }
];

const vermicompostReviews = [
  { name: 'Priya Sharma', rating: 5, title: 'Rich organic compost!', body: 'Bahut badhiya khaad hai. Ekdum chai patti jaisi dark aur moisture wali. Highly recommended for organic farming.', date: '3 days ago', verified: true },
  { name: 'Manish Pandey', rating: 5, title: 'Plants love it!', body: 'Tulsi aur baki ghar ke plants ke liye use kiya. Growth has accelerated incredibly.', date: '1 week ago', verified: true },
  { name: 'Swati Kulkarni', rating: 5, title: 'Nutrient powerhouse', body: 'Bhai sach me 100% organic lag raha hai. The earthy smell proves the quality of the compost.', date: '1 week ago', verified: true },
  { name: 'Tushar Jain', rating: 5, title: 'Amazing for soil health', body: 'I mix half soil and half of this compost. Plants are looking so vibrant and happy.', date: '2 weeks ago', verified: true },
  { name: 'Ritika Bansal', rating: 5, title: 'Must have!', body: 'Koi kachra ya patthar nahi tha isme. Ekdum clean vermicompost. Top notch quality.', date: '2 weeks ago', verified: true },
  { name: 'Harsh Goel', rating: 5, title: 'Top quality!', body: 'Mera hibiscus pichle 1 saal se flower nahi de raha tha, and just 2 weeks after using this, buds appeared!', date: '3 weeks ago', verified: true },
  { name: 'Simran Kaur', rating: 5, title: 'Best compost ever', body: 'Har maheene ek mutthi daalti hu sab pots me. Keeps my plants lush green all year round.', date: '1 month ago', verified: true },
  { name: 'Ashish Kumar', rating: 4, title: 'Nice quality', body: 'Product bilkul waisa hi hai jaisa describe kiya gaya hai. Very satisfied with the results.', date: '1 month ago', verified: true },
  { name: 'Kavita Menon', rating: 5, title: 'Pure earthworm castings', body: 'I can see the difference. Leaves are bigger and greener. Best compost I have found online.', date: '2 months ago', verified: true }
];

const mustardCakeReviews = [
  { name: 'Vikram Singh', rating: 5, title: 'Excellent fertilizer!', body: 'Sarso khali ka powder bahut sahi hai. Paani me 2 din bhiga ke use karta hu, the results are fantastic.', date: '3 days ago', verified: true },
  { name: 'Meera Patel', rating: 5, title: 'Plants are thriving', body: 'I made a liquid fertilizer for my roses. Phool hi phool aa gaye garden me within weeks.', date: '1 week ago', verified: true },
  { name: 'Arjun Reddy', rating: 5, title: 'Great for flowers!', body: 'Winter flowers ke liye best khuraak. The fine powder dissolves quickly and effectively.', date: '1 week ago', verified: true },
  { name: 'Sneha Joshi', rating: 4, title: 'Best organic fertilizer', body: 'Mirchi aur tamatar ke paudho me growth kafi acchi hui hai. A staple for organic gardening.', date: '2 weeks ago', verified: true },
  { name: 'Sanjay Tiwari', rating: 5, title: 'Highly recommend!', body: 'Asli sarso ki mehak aati hai jab paani me bhigao. There is absolutely no adulteration.', date: '2 weeks ago', verified: true },
  { name: 'Pooja Mehta', rating: 5, title: 'Works brilliantly', body: 'Mere lemon tree pe phool jhad jate the, ab phal rukne lage hain. Very effective product.', date: '3 weeks ago', verified: true },
  { name: 'Rohan Gupta', rating: 5, title: 'Good results', body: 'Powder is very fine. Mane apne mogra pe use kiya and the blooms are bigger now.', date: '1 month ago', verified: true }
];

const cocopeatReviews = [
  { name: 'Tanvi Shah', rating: 5, title: 'Excellent cocopeat!', body: 'Paani dalte hi bahut saara ban gaya. Noticed zero debris or dust in the block. Very clean.', date: '3 days ago', verified: true },
  { name: 'Nikhil More', rating: 5, title: 'Great for seedlings', body: 'Beej ugane ke liye sabse best hai. It holds moisture for a very long time which is crucial.', date: '1 week ago', verified: true },
  { name: 'Lakshmi Iyer', rating: 5, title: 'Superb water retention', body: 'Garmi me roz paani dalne ki zaroorat nahi padti ab. Keeps my hanging baskets lightweight.', date: '1 week ago', verified: true },
  { name: 'Rajesh Pillai', rating: 5, title: 'Value for money', body: 'Sahi daam pe acchi quality di hai. One block was enough for multiple medium-sized pots.', date: '2 weeks ago', verified: true },
  { name: 'Sonam Choudhary', rating: 5, title: 'Best cocopeat!', body: 'Pehle se dhula hua aur clean lag raha hai. The EC levels seem perfect as my plants aren’t burning.', date: '2 weeks ago', verified: true },
  { name: 'Yash Deshpande', rating: 5, title: 'Excellent!', body: 'Potting mix me milane ke liye mast cheez hai. Makes the soil airy and crumbly.', date: '3 weeks ago', verified: true },
  { name: 'Prerna Jain', rating: 5, title: 'Nice quality', body: 'Expansion was great. Quality is premium and does exactly what cocopeat should do.', date: '1 month ago', verified: true }
];

const seedReviews = [
  { name: 'Simran Kaur', rating: 5, title: 'High germination rate!', body: 'Bhai kya mast beej hain. 4-5 din me hi ankur nikal aaye. Very fresh and viable seeds.', date: '3 days ago', verified: true },
  { name: 'Aditya Bhatt', rating: 5, title: 'Fresh seeds!', body: 'Package achha tha. Almost 95% of the seeds sprouted successfully. Kitchen garden mast chal raha hai.', date: '1 week ago', verified: true },
  { name: 'Megha Thakur', rating: 5, title: 'Excellent quality', body: 'Dhania aur palak ke beej bahut jaldi nikal aaye. No need to buy these from the market anymore.', date: '1 week ago', verified: true },
  { name: 'Varun Malhotra', rating: 5, title: 'Amazing collection', body: 'Ghar ke liye sab zaroori sabjiyo ke beej mil gaye ek sath. The germination rate is brilliant.', date: '2 weeks ago', verified: true },
  { name: 'Isha Dubey', rating: 5, title: 'Fresh and viable', body: 'Pehle meeso se liye the wo fuzul the. Is website ke beej are genuinely of high quality.', date: '2 weeks ago', verified: true },
  { name: 'Harsh Goel', rating: 5, title: 'Super happy!', body: 'Phool ke seeds lagaye the pichle mahine, now the flowering has started. Really good product!', date: '3 weeks ago', verified: true },
  { name: 'Neha Rajput', rating: 4, title: 'Good results', body: 'Most of them germinated. Packing bhi acchi thi jisse seeds fresh rahe.', date: '1 month ago', verified: true },
  { name: 'Kabir Das', rating: 5, title: 'Worth it', body: 'Mere balcony garden ke liye best seeds. The instructions provided were also helpful.', date: '1 month ago', verified: true }
];

const boosterReviews = [
  { name: 'Priya Sharma', rating: 5, title: 'Plants growing faster!', body: 'Is booster ka asar 1 hafte me hi dikhne lag gaya. New leaves and branches everywhere.', date: '3 days ago', verified: true },
  { name: 'Deepak Kumar', rating: 5, title: 'Incredible results', body: 'Phoolo wale paudhe pe dala, the flower size has visibly increased. Maza aa gaya.', date: '1 week ago', verified: true },
  { name: 'Kavita Nair', rating: 5, title: 'Must have!', body: 'Sukhne wale paudho me jaan daal di isne. It literally works like magic for struggling plants.', date: '2 weeks ago', verified: true },
  { name: 'Rohit Verma', rating: 5, title: 'Works wonders!', body: 'Spray kiya tha rose aur money plant pe. Leaves have turned dark green and very shiny.', date: '2 weeks ago', verified: true },
  { name: 'Ananya Gupta', rating: 5, title: 'Amazing product', body: 'Price ke hisaab se bahut badhiya hai. Regular use definitely improves overall plant health.', date: '3 weeks ago', verified: true },
  { name: 'Meera Patel', rating: 5, title: 'Superb!', body: 'Fruiting plants ke liye must buy hai. My lemon tree is producing significantly more fruit now.', date: '1 month ago', verified: true },
  { name: 'Siddharth Rao', rating: 5, title: 'Highly recommend', body: 'Dose kam rakha but asar poora dikha. Growth kafi boost hui hai garden me.', date: '1 month ago', verified: true }
];

const defaultReviews = [
  { name: 'Neha Agarwal', rating: 5, title: 'Great product!', body: 'Product quality ekdum mast hai. Delivery was super fast too. Completely satisfied with Bgiya Bliss.', date: '3 days ago', verified: true },
  { name: 'Amit Saxena', rating: 5, title: 'Highly recommend', body: 'Paisa vasool item hai bhai. Everything I order from here is always authentic and high quality.', date: '1 week ago', verified: true },
  { name: 'Divya Rao', rating: 5, title: 'Good purchase', body: 'Packing kafi acchi aayi thi. The product is exactly as shown in the pictures.', date: '1 week ago', verified: true },
  { name: 'Kiran Bhat', rating: 5, title: 'Love it!', body: 'Customer service bahut acchi hai. Premium quality product that actually works for home gardens.', date: '2 weeks ago', verified: true },
  { name: 'Nisha Kapoor', rating: 5, title: 'Excellent!', body: 'Apne garden ke liye yahi se saara samaan leti hu. Never had a complaint so far. Best gardening store.', date: '2 weeks ago', verified: true },
  { name: 'Pallavi Deshmukh', rating: 5, title: 'Perfect!', body: 'Bohot kam stores itna sahi product dete hain online. Sahi rate, original cheez, and fast shipping.', date: '3 weeks ago', verified: true },
  { name: 'Suresh Yadav', rating: 5, title: 'Very satisfied', body: 'Bohot achha experience raha purchase ka. The visible results prove that the product is genuine.', date: '1 month ago', verified: true },
  { name: 'Gaurav Chandra', rating: 5, title: 'Worth every rupee', body: 'Sahi price pe top notch quality mil rahi hai. Every gardening enthusiast should try their products.', date: '1 month ago', verified: true },
  { name: 'Ritu Sharma', rating: 4, title: 'Nice product', body: 'Mujhe pasand aaya. Plants ki halat kaafi behtar hui hai. Happy customer.', date: '2 months ago', verified: true },
  { name: 'Karan Malhotra', rating: 5, title: 'Superb quality', body: 'Never disappointed. Everything is organic and chemical-free. Great for my indoor jungle.', date: '2 months ago', verified: true },
  { name: 'Anita Singh', rating: 5, title: 'Excellent buy', body: 'Value for money. The results speak for themselves. Definitely coming back for more.', date: '3 months ago', verified: true }
];

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
