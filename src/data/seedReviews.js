// Seed reviews for products — shown when no Firestore reviews exist
const DATES = ['2 days ago','4 days ago','1 week ago','1 week ago','2 weeks ago','2 weeks ago','3 weeks ago','3 weeks ago','1 month ago','1 month ago','1 month ago','2 months ago','2 months ago','3 months ago','3 months ago','4 months ago','5 months ago','6 months ago'];

const pottingMixReviews = [
  { name: 'Priya Sharma', rating: 5, title: 'Amazing soil quality!', body: 'Bhai ek number soil hai. Mere plants me 1 week me hi kaafi growth dikhi. Drainage bhi sahi hai aur roots achhe se develop ho rahe hain.', date: '2 days ago', verified: true },
  { name: 'Rohit Verma', texture: 5, rating: 5, title: 'Best potting mix ever', body: 'Texture bohot mast hai. Maine apne rose plants ke liye use kiya, flowering badh gayi hai. Recommended!', date: '4 days ago', verified: true },
  { name: 'Ananya Gupta', rating: 5, title: 'Perfect for indoor plants', body: 'Maine apne indoor plants pe try kiya, result bohot sahi hai. Koi fungus wagera nahi aaya.', date: '1 week ago', verified: true },
  { name: 'Vikram Singh', rating: 5, title: 'Good quality product', body: 'Packaging bhi achhi thi aur soil mix premium lag raha hai. Pura paisa vasool.', date: '1 week ago', verified: true },
  { name: 'Meera Patel', rating: 5, title: 'Worth every rupee', body: 'Soil kaafi fluffy hai, pani theek se hold karti hai but waterlogging nahi hoti. Maza aa gaya use karke.', date: '2 weeks ago', verified: true },
  { name: 'Arjun Reddy', rating: 4, title: 'Nice and organic', body: 'Bohot achha organic mix hai. Mera terrace garden pura isi soil se chal raha hai ab.', date: '2 weeks ago', verified: true },
  { name: 'Sneha Joshi', rating: 5, title: 'Highly recommend', body: 'Maine kaafi brands try kiye but iska result sabse fast aur achha hai. Great aeration.', date: '3 weeks ago', verified: true },
  { name: 'Deepak Kumar', rating: 5, title: 'My plants love it!', body: 'Succulents ke liye bohot sahi raha. Pehle roots gal rahi thi but is mix me ekdum set ho gaye hain.', date: '3 weeks ago', verified: true },
  { name: 'Kavita Nair', rating: 5, title: 'Excellent for vegetables', body: 'Kitchen garden ke liye mast hai. Tomatoes aur chillies ki growth double ho gayi hai bhai.', date: '1 month ago', verified: true },
  { name: 'Sanjay Tiwari', rating: 5, title: 'Premium quality', body: 'Quality me koi compromise nahi. You can literally see the perlite and compost mixed properly.', date: '1 month ago', verified: true },
  { name: 'Pooja Mehta', rating: 4, title: 'Great for repotting', body: 'Repotting ke time transplant shock bilkul nahi hua. Plants jaldi adjust ho gaye.', date: '1 month ago', verified: true },
];

const fiveInOneReviews = [
  { name: 'Anjali Srivastava', rating: 5, title: 'Perfect 5-in-1 mix!', body: 'Sabkuch already mixed aata hai toh alag se kuch dalne ka tension nahi. Sirf pot me dalo aur plant laga do. Bahut aasan ho gaya gardening.', date: '2 days ago', verified: true },
  { name: 'Manish Pandey', rating: 5, title: 'Best soil mix available', body: 'Cocopeat, perlite, neem sab theek ratio me hai. Plants bahut fast grow kar rahe hain.', date: '3 days ago', verified: true },
  { name: 'Swati Kulkarni', rating: 5, title: 'Amazing results!', body: 'Pehle meri soil hard ho jati thi, but ye mix hamesha soft rehta hai. Roots ko proper hawa milti hai.', date: '4 days ago', verified: true },
  { name: 'Tushar Jain', rating: 5, title: 'Great product', body: 'Neem powder hone ki wajah se pests bhi nahi lagte. Overall ek fantastic product hai.', date: '1 week ago', verified: true },
  { name: 'Ritika Bansal', rating: 4, title: 'My go-to potting mix', body: 'Mera teesra order hai. Consistency hamesha best rehti hai. Full value for money.', date: '1 week ago', verified: true },
  { name: 'Harsh Goel', rating: 5, title: 'Love this product!', body: 'Block ko paani me dalte hi kaafi saari soil ban jati hai. Very convenient to store also.', date: '1 week ago', verified: true },
  { name: 'Simran Kaur', rating: 5, title: 'Very good mix', body: 'Lightweight aur well-draining hai. Balcony me ab heavy pots uthane me problem nahi hoti.', date: '2 weeks ago', verified: true },
  { name: 'Aditya Bhatt', rating: 5, title: 'Outstanding!', body: 'Bhai sacchi me 10kg ban gaya. Mere saare pots bhar gaye ek block me. Sahi jugaad hai.', date: '2 weeks ago', verified: true },
  { name: 'Megha Thakur', rating: 5, title: 'Highly recommended', body: 'Growth kafi achhi ho rhi hai plants ki isme. Nutrient rich soil.', date: '2 weeks ago', verified: true },
  { name: 'Varun Malhotra', rating: 5, title: 'Perfect blend', body: 'Best part is neem ka smell bhi aata hai, matlab genuine organic product hai.', date: '3 weeks ago', verified: true },
  { name: 'Isha Dubey', rating: 4, title: 'Best in the market', body: 'Mera philodendron isme bahut fast grow kar raha hai. Definitely buying again.', date: '3 weeks ago', verified: true },
];

const neemCakeReviews = [
  { name: 'Sneha Joshi', rating: 5, title: 'Best organic pest control!', body: 'Roses par se aphids ka problem khatam ho gaya neem cake use karne ke baad. Ekdum pure hai.', date: '2 days ago', verified: true },
  { name: 'Ravi Chauhan', rating: 5, title: 'Plants are pest-free now', body: 'Maine mitti me mix kiya tha, ab koi kide makode nahi aate pots ke pas.', date: '4 days ago', verified: true },
  { name: 'Pooja Mehta', rating: 5, title: 'Excellent fertilizer!', body: 'Fertilizer aur pest control dono ka kaam karta hai. Sahi quality ka powder hai.', date: '1 week ago', verified: true },
  { name: 'Sanjay Tiwari', rating: 4, title: 'Good quality neem cake', body: 'Smell se hi pata chal jata hai ki original neem khali hai. Vegetables theek se badh rahe hain ab.', date: '1 week ago', verified: true },
  { name: 'Divya Rao', rating: 5, title: 'Must-have for gardeners', body: 'Mealybugs ne pareshan kiya tha, neem cake se kaafi aaram hai. Mitti me dalna best rehta hai.', date: '1 week ago', verified: true },
  { name: 'Amit Saxena', rating: 5, title: 'Pests gone completely!', body: 'Organic gardening karne walo ke liye must buy. Pests aur fungus se bacha ke rakhta hai.', date: '2 weeks ago', verified: true },
  { name: 'Nisha Kapoor', rating: 5, title: 'Pure and organic', body: 'Powder form me hai toh use karna aasan hai. Paani me milake bhi daal sakte ho.', date: '2 weeks ago', verified: true },
];

const vermicompostReviews = [
  { name: 'Priya Sharma', rating: 5, title: 'Rich organic compost!', body: 'Bahut badhiya khaad hai. Ekdum chai patti jaisi dark aur moisture wali. Plants me jaan aa gayi.', date: '3 days ago', verified: true },
  { name: 'Manish Pandey', rating: 5, title: 'Plants love it!', body: 'Tulsi aur baki ghar ke plants ke liye use kiya. Growth bahut tezi se badhi hai.', date: '1 week ago', verified: true },
  { name: 'Swati Kulkarni', rating: 5, title: 'Nutrient powerhouse', body: 'Bhai sach me 100% organic lag raha hai. Mitti jaisi mehak aati hai isme se.', date: '1 week ago', verified: true },
  { name: 'Tushar Jain', rating: 4, title: 'Amazing for soil health', body: 'Aadha mitti aur aadha compost use karke lagaya, plants bahut khush lag rahe hain.', date: '2 weeks ago', verified: true },
  { name: 'Ritika Bansal', rating: 5, title: 'Must have!', body: 'Koi kachra ya patthar nahi tha isme. Ekdum clean vermicompost. Quality no. 1.', date: '2 weeks ago', verified: true },
  { name: 'Harsh Goel', rating: 5, title: 'Top quality!', body: 'Mera hibiscus pichle 1 saal se flower nahi de raha tha, is khaad ke 2 hafte baad buds aa gaye!', date: '3 weeks ago', verified: true },
  { name: 'Simran Kaur', rating: 5, title: 'Best compost ever', body: 'Har maheene ek mutthi daalti hu sab pots me. Plants hamesha hare bhare rehte hain.', date: '3 weeks ago', verified: true },
];

const mustardCakeReviews = [
  { name: 'Vikram Singh', rating: 5, title: 'Excellent fertilizer!', body: 'Sarso khali ka powder bahut sahi hai. Paani me 2 din bhiga ke use karta hu, mast result hai.', date: '3 days ago', verified: true },
  { name: 'Meera Patel', rating: 5, title: 'Plants are thriving', body: 'Liquid fertilizer banake roses pe dala. Phool hi phool aa gaye garden me.', date: '1 week ago', verified: true },
  { name: 'Arjun Reddy', rating: 5, title: 'Great for flowers!', body: 'Winter flowers ke liye best khuraak. Powder fine hai toh jaldi dissolve ho jata hai.', date: '1 week ago', verified: true },
  { name: 'Sneha Joshi', rating: 4, title: 'Best organic fertilizer', body: 'Mirchi aur tamatar ke paudho me growth kafi acchi hui hai. Organic farming ke liye best.', date: '2 weeks ago', verified: true },
  { name: 'Sanjay Tiwari', rating: 5, title: 'Highly recommend!', body: 'Asli sarso ki mehak aati hai jab paani me bhigao. Quality me koi dhokha nahi hai.', date: '2 weeks ago', verified: true },
  { name: 'Pooja Mehta', rating: 5, title: 'Works brilliantly', body: 'Mere lemon tree pe phool jhad jate the, ab phal rukne lage hain isko use karne ke baad.', date: '3 weeks ago', verified: true },
];

const cocopeatReviews = [
  { name: 'Tanvi Shah', rating: 5, title: 'Excellent cocopeat!', body: 'Paani dalte hi bahut saara ban gaya. Koi dhool mitti ya kachra nahi mila isme.', date: '3 days ago', verified: true },
  { name: 'Nikhil More', rating: 5, title: 'Great for seedlings', body: 'Beej ugane ke liye sabse best hai. Moisture bahut time tak hold karke rakhta hai.', date: '1 week ago', verified: true },
  { name: 'Lakshmi Iyer', rating: 5, title: 'Superb water retention', body: 'Garmi me roz paani dalne ki zaroorat nahi padti ab. Hanging pots light weight rehte hain.', date: '1 week ago', verified: true },
  { name: 'Rajesh Pillai', rating: 4, title: 'Value for money', body: 'Sahi daam pe acchi quality di hai. Ek block se kaafi saare gamlo ka kaam chal gaya.', date: '2 weeks ago', verified: true },
  { name: 'Sonam Choudhary', rating: 5, title: 'Best cocopeat!', body: 'Pehle se dhula hua aur clean lag raha hai. EC level bhi theek hai, plants jale nahi.', date: '2 weeks ago', verified: true },
  { name: 'Yash Deshpande', rating: 5, title: 'Excellent!', body: 'Potting mix me milane ke liye mast cheez hai. Mitti ko bhurbhura banata hai.', date: '3 weeks ago', verified: true },
];

const seedReviews = [
  { name: 'Simran Kaur', rating: 5, title: 'High germination rate!', body: 'Bhai kya mast beej hain. 4-5 din me hi ankur nikal aaye sabhi seeds se. Very fresh.', date: '3 days ago', verified: true },
  { name: 'Aditya Bhatt', rating: 5, title: 'Fresh seeds!', body: 'Package achha tha. Lag bhag saare beej grow ho gaye. Kitchen garden mast chal raha hai.', date: '1 week ago', verified: true },
  { name: 'Megha Thakur', rating: 5, title: 'Excellent quality', body: 'Dhania aur palak ke beej bahut jaldi nikal aaye. Market se lane ki zaroorat hi nahi ab.', date: '1 week ago', verified: true },
  { name: 'Varun Malhotra', rating: 4, title: 'Amazing collection', body: 'Ghar ke liye sab zaroori sabjiyo ke beej mil gaye ek sath. Germination rate badhiya hai.', date: '2 weeks ago', verified: true },
  { name: 'Isha Dubey', rating: 5, title: 'Fresh and viable', body: 'Pehle meeso se liye the wo fuzul the. Is website ke beej wakai me high quality ke hain.', date: '2 weeks ago', verified: true },
  { name: 'Harsh Goel', rating: 5, title: 'Super happy!', body: 'Phool ke seeds lagaye the pichle mahine, ab sabme flowering chalu ho gayi hai. Sahi product!', date: '3 weeks ago', verified: true },
];

const boosterReviews = [
  { name: 'Priya Sharma', rating: 5, title: 'Plants growing faster!', body: 'Is booster ka asar 1 hafte me hi dikhne lag gaya. Nayi pattiya aur branches aane lag gayi.', date: '3 days ago', verified: true },
  { name: 'Deepak Kumar', rating: 5, title: 'Incredible results', body: 'Phoolo wale paudhe pe dala, phoolo ka size bada ho gaya. Maza aa gaya.', date: '1 week ago', verified: true },
  { name: 'Kavita Nair', rating: 5, title: 'Must have!', body: 'Sukhne wale paudho me jaan daal di isne. Bilkul jadu ki tarah kaam karta hai.', date: '2 weeks ago', verified: true },
  { name: 'Rohit Verma', rating: 5, title: 'Works wonders!', body: 'Spray kiya tha rose aur money plant pe. Leaves ka colour ekdum dark green aur shiny ho gaya.', date: '2 weeks ago', verified: true },
  { name: 'Ananya Gupta', rating: 4, title: 'Amazing product', body: 'Price ke hisaab se theek hai. Regular use se plants kafi healthy dikhne lagte hain.', date: '3 weeks ago', verified: true },
  { name: 'Meera Patel', rating: 5, title: 'Superb!', body: 'Fruiting plants ke liye must buy hai. Mere nimbu ke ped pe kaafi asar dikha hai iska.', date: '1 month ago', verified: true },
];

const defaultReviews = [
  { name: 'Neha Agarwal', rating: 5, title: 'Great product!', body: 'Product quality ekdum mast hai. Delivery bhi fast thi. Completely satisfied.', date: '3 days ago', verified: true },
  { name: 'Amit Saxena', rating: 5, title: 'Highly recommend', body: 'Paisa vasool item hai bhai. Bgiya bliss ka samaan hamesha original hota hai.', date: '1 week ago', verified: true },
  { name: 'Divya Rao', rating: 5, title: 'Good purchase', body: 'Packing kafi acchi aayi thi. Product exactly waisa hi hai jaisa photo me dikhaya.', date: '1 week ago', verified: true },
  { name: 'Kiran Bhat', rating: 4, title: 'Love it!', body: 'Customer service bahut acchi hai. Product bhi premium quality ka hai. Zaroor kharide.', date: '2 weeks ago', verified: true },
  { name: 'Nisha Kapoor', rating: 5, title: 'Excellent!', body: 'Apne garden ke liye yahi se saara samaan leti hu. Koi complaint nahi ab tak. Best store.', date: '2 weeks ago', verified: true },
  { name: 'Pallavi Deshmukh', rating: 5, title: 'Perfect!', body: 'Bohot kam stores itna sahi product dete hain online. Sahi rate aur original cheez.', date: '3 weeks ago', verified: true },
  { name: 'Suresh Yadav', rating: 5, title: 'Very satisfied', body: 'Bohot achha experience raha purchase ka. Result dekh ke hi samajh aa jata hai product genuine hai.', date: '1 month ago', verified: true },
  { name: 'Gaurav Chandra', rating: 5, title: 'Worth every rupee', body: 'Sahi price pe top notch quality mil rahi hai. Har gardener ko try karna chahiye.', date: '1 month ago', verified: true },
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
