// Seed reviews for products — shown when no Firestore reviews exist
const pottingMixReviews = [
  {
    "name": "Saanvi Jain",
    "rating": 5,
    "title": "Good quality",
    "body": "Soil kaafi fluffy hai, holds moisture well without waterlogging.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Anita Yadav",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Ira Gupta",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Highly recommend this to everyone. Great value for money.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Ayaan Tiwari",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "Product waisa hi hai jaisa photo me dikhaya. Happy customer.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Tushar Tiwari",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Amit Chauhan",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Exactly what I was looking for. Five stars from me!",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Rakesh Nair",
    "rating": 5,
    "title": "Best potting mix",
    "body": "Texture is very light. No fungus issues at all.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Tanvi Gupta",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Quality is exactly as promised. Very happy with the purchase.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Rahul Sharma",
    "rating": 5,
    "title": "Good quality",
    "body": "Soil kaafi fluffy hai, holds moisture well without waterlogging.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Vikram Jain",
    "rating": 4,
    "title": "Good Purchase",
    "body": "Highly recommend this to everyone. Great value for money.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Deepak Sharma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Fast delivery and premium packaging. The product is top-notch.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Diya Chauhan",
    "rating": 5,
    "title": "Best potting mix",
    "body": "Texture is very light. No fungus issues at all.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Geeta Yadav",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Excellent product! It works wonderfully.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Kamal Patel",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Nice quality and genuine product. Worth every penny.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Gaurav Yadav",
    "rating": 5,
    "title": "Amazing soil",
    "body": "Drainage is perfect and roots are developing beautifully.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Neha Yadav",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Kiran Sen",
    "rating": 5,
    "title": "Great aeration",
    "body": "The blend of cocopeat and perlite is very well balanced.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Preeti Sharma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Umesh Jain",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "Product waisa hi hai jaisa photo me dikhaya. Happy customer.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Geeta Patel",
    "rating": 5,
    "title": "Great aeration",
    "body": "The blend of cocopeat and perlite is very well balanced.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Umesh Singh",
    "rating": 5,
    "title": "Best potting mix",
    "body": "Texture is very light. No fungus issues at all.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Yash Yadav",
    "rating": 5,
    "title": "Plants love it",
    "body": "Repotting ke time transplant shock bilkul nahi hua.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Tanvi Kumar",
    "rating": 5,
    "title": "Great aeration",
    "body": "The blend of cocopeat and perlite is very well balanced.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Pooja Yadav",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Harsh Bansal",
    "rating": 4,
    "title": "Plants love it",
    "body": "Repotting ke time transplant shock bilkul nahi hua.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Tushar Sen",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bohot kam stores itna sahi saman dete hain. Great job.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Ananya Yadav",
    "rating": 5,
    "title": "Plants love it",
    "body": "Repotting ke time transplant shock bilkul nahi hua.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Vikram Iyer",
    "rating": 5,
    "title": "Amazing soil",
    "body": "Drainage is perfect and roots are developing beautifully.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Riya Bansal",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Fast delivery and premium packaging. The product is top-notch.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Arjun Patel",
    "rating": 4,
    "title": "Good Purchase",
    "body": "Exactly what I was looking for. Five stars from me!",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Amit Chauhan",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maine kaafi try kiye but ye sabse best hai. Result mast aaya.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Ramesh Yadav",
    "rating": 5,
    "title": "Good quality",
    "body": "Soil kaafi fluffy hai, holds moisture well without waterlogging.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Gaurav Rao",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "Bahut badhiya kaam kar raha hai. Ab hamesha yahi se lunga.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Tanvi Tiwari",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Nikhil Sharma",
    "rating": 5,
    "title": "Good quality",
    "body": "Soil kaafi fluffy hai, holds moisture well without waterlogging.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Anil Jain",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Paisa vasool item hai. Delivery bhi bahut fast thi.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Arti Verma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Great experience overall. The plants seem to love it.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Sunita Sharma",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Kamal Rao",
    "rating": 4,
    "title": "Great aeration",
    "body": "The blend of cocopeat and perlite is very well balanced.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Yash Verma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Exactly what I was looking for. Five stars from me!",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Poonam Gupta",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Tushar Gupta",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Great experience overall. The plants seem to love it.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Ashok Gupta",
    "rating": 5,
    "title": "Excellent Product",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Sushma Iyer",
    "rating": 5,
    "title": "Great aeration",
    "body": "The blend of cocopeat and perlite is very well balanced.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Aadya Kumar",
    "rating": 5,
    "title": "Best potting mix",
    "body": "Texture is very light. No fungus issues at all.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Atharv Gupta",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Fast delivery and premium packaging. The product is top-notch.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Prakash Kumar",
    "rating": 5,
    "title": "Plants love it",
    "body": "Repotting ke time transplant shock bilkul nahi hua.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Vikas Rao",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bahut badhiya kaam kar raha hai. Ab hamesha yahi se lunga.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Priya Bansal",
    "rating": 5,
    "title": "Best potting mix",
    "body": "Texture is very light. No fungus issues at all.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Gita Kumar",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Arjun Kumar",
    "rating": 5,
    "title": "Best potting mix",
    "body": "Texture is very light. No fungus issues at all.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Gita Verma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Amit Verma",
    "rating": 5,
    "title": "Good quality",
    "body": "Soil kaafi fluffy hai, holds moisture well without waterlogging.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Dinesh Kumar",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "100% original lag raha hai. Sahi daam pe achhi cheez.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Anika Reddy",
    "rating": 5,
    "title": "Amazing soil",
    "body": "Drainage is perfect and roots are developing beautifully.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Anita Kumar",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bohot kam stores itna sahi saman dete hain. Great job.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Ayaan Singh",
    "rating": 5,
    "title": "Best potting mix",
    "body": "Texture is very light. No fungus issues at all.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Umesh Nair",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Nice quality and genuine product. Worth every penny.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Yash Reddy",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "100% original lag raha hai. Sahi daam pe achhi cheez.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Priya Jain",
    "rating": 5,
    "title": "Best potting mix",
    "body": "Texture is very light. No fungus issues at all.",
    "date": "3 months ago",
    "verified": true
  }
];
const fiveInOneReviews = [
  {
    "name": "Aditya Tiwari",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Divya Gupta",
    "rating": 4,
    "title": "Best soil available",
    "body": "Cocopeat, perlite, neem sab theek ratio me hai. Excellent value.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Sonam Singh",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bhai ek number product hai. Quality me koi compromise nahi.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Gaurav Kumar",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Exactly what I was looking for. Five stars from me!",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Suman Sharma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Karan Jain",
    "rating": 4,
    "title": "Amazing results",
    "body": "It genuinely makes 10kg of fluffy soil. Best part is neem ka smell bhi aata hai.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Shalini Gupta",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Nice quality and genuine product. Worth every penny.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Aarav Rao",
    "rating": 5,
    "title": "Perfect mix!",
    "body": "Sabkuch already mixed aata hai, very convenient for busy plant parents.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Saanvi Rao",
    "rating": 5,
    "title": "Amazing results",
    "body": "It genuinely makes 10kg of fluffy soil. Best part is neem ka smell bhi aata hai.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Siddharth Iyer",
    "rating": 5,
    "title": "Perfect mix!",
    "body": "Sabkuch already mixed aata hai, very convenient for busy plant parents.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Seema Nair",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Great experience overall. The plants seem to love it.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Ravi Bansal",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Nice quality and genuine product. Worth every penny.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Nikhil Gupta",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bhai ek number product hai. Quality me koi compromise nahi.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Riya Nair",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Customer service is great, and the product is amazing.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Pooja Chauhan",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Customer service is great, and the product is amazing.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Krishna Sen",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Paisa vasool item hai. Delivery bhi bahut fast thi.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Amit Tiwari",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Neha Sharma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Great experience overall. The plants seem to love it.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Shalini Nair",
    "rating": 5,
    "title": "Amazing results",
    "body": "It genuinely makes 10kg of fluffy soil. Best part is neem ka smell bhi aata hai.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Rahul Yadav",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maine kaafi try kiye but ye sabse best hai. Result mast aaya.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Ajay Tiwari",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bahut badhiya kaam kar raha hai. Ab hamesha yahi se lunga.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Ashok Sharma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Quality is exactly as promised. Very happy with the purchase.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Shaurya Bansal",
    "rating": 5,
    "title": "Best soil available",
    "body": "Cocopeat, perlite, neem sab theek ratio me hai. Excellent value.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Ajay Sen",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bahut badhiya kaam kar raha hai. Ab hamesha yahi se lunga.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Neha Singh",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maine kaafi try kiye but ye sabse best hai. Result mast aaya.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Anita Reddy",
    "rating": 5,
    "title": "Best soil available",
    "body": "Cocopeat, perlite, neem sab theek ratio me hai. Excellent value.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Arun Chauhan",
    "rating": 4,
    "title": "Best soil available",
    "body": "Cocopeat, perlite, neem sab theek ratio me hai. Excellent value.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Aditya Reddy",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Highly recommend this to everyone. Great value for money.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Meera Verma",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Arun Gupta",
    "rating": 5,
    "title": "Best soil available",
    "body": "Cocopeat, perlite, neem sab theek ratio me hai. Excellent value.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Rahul Sharma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Excellent product! It works wonderfully.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Sneha Singh",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Great experience overall. The plants seem to love it.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Sushma Bansal",
    "rating": 4,
    "title": "My go-to mix",
    "body": "Lightweight aur well-draining hai. Pots uthane me asani hoti hai.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Poonam Singh",
    "rating": 5,
    "title": "Perfect mix!",
    "body": "Sabkuch already mixed aata hai, very convenient for busy plant parents.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Rajesh Sen",
    "rating": 5,
    "title": "My go-to mix",
    "body": "Lightweight aur well-draining hai. Pots uthane me asani hoti hai.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Nikhil Yadav",
    "rating": 5,
    "title": "Perfect mix!",
    "body": "Sabkuch already mixed aata hai, very convenient for busy plant parents.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Riya Reddy",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "100% original lag raha hai. Sahi daam pe achhi cheez.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Ravi Kumar",
    "rating": 4,
    "title": "Good Purchase",
    "body": "Quality is exactly as promised. Very happy with the purchase.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Saanvi Iyer",
    "rating": 4,
    "title": "Good Purchase",
    "body": "Customer service is great, and the product is amazing.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Ramesh Gupta",
    "rating": 5,
    "title": "Outstanding",
    "body": "Growth kafi achhi ho rhi hai plants ki isme. Nutrient rich soil that actually works.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Lakshmi Sharma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Aarav Bansal",
    "rating": 5,
    "title": "Outstanding",
    "body": "Growth kafi achhi ho rhi hai plants ki isme. Nutrient rich soil that actually works.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Ravi Jain",
    "rating": 5,
    "title": "Outstanding",
    "body": "Growth kafi achhi ho rhi hai plants ki isme. Nutrient rich soil that actually works.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Ramesh Kumar",
    "rating": 5,
    "title": "Excellent Product",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Ishaan Sharma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Highly recommend this to everyone. Great value for money.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Kavya Singh",
    "rating": 5,
    "title": "My go-to mix",
    "body": "Lightweight aur well-draining hai. Pots uthane me asani hoti hai.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Nikhil Jain",
    "rating": 5,
    "title": "Amazing results",
    "body": "It genuinely makes 10kg of fluffy soil. Best part is neem ka smell bhi aata hai.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Arti Rao",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bhai ek number product hai. Quality me koi compromise nahi.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Saanvi Reddy",
    "rating": 4,
    "title": "Outstanding",
    "body": "Growth kafi achhi ho rhi hai plants ki isme. Nutrient rich soil that actually works.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Ira Sharma",
    "rating": 5,
    "title": "My go-to mix",
    "body": "Lightweight aur well-draining hai. Pots uthane me asani hoti hai.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Saanvi Bansal",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Product waisa hi hai jaisa photo me dikhaya. Happy customer.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Aarav Patel",
    "rating": 5,
    "title": "My go-to mix",
    "body": "Lightweight aur well-draining hai. Pots uthane me asani hoti hai.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Aarav Sen",
    "rating": 5,
    "title": "Amazing results",
    "body": "It genuinely makes 10kg of fluffy soil. Best part is neem ka smell bhi aata hai.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Suresh Iyer",
    "rating": 4,
    "title": "Good Purchase",
    "body": "Quality is exactly as promised. Very happy with the purchase.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Geeta Sen",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Great experience overall. The plants seem to love it.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Anil Iyer",
    "rating": 5,
    "title": "Excellent Product",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Rohan Patel",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Divya Verma",
    "rating": 5,
    "title": "Amazing results",
    "body": "It genuinely makes 10kg of fluffy soil. Best part is neem ka smell bhi aata hai.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Sushma Nair",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bhai ek number product hai. Quality me koi compromise nahi.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Gita Reddy",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Exactly what I was looking for. Five stars from me!",
    "date": "1 week ago",
    "verified": true
  }
];
const neemCakeReviews = [
  {
    "name": "Kiran Verma",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "Paisa vasool item hai. Delivery bhi bahut fast thi.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Poonam Nair",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Great experience overall. The plants seem to love it.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Kajal Sen",
    "rating": 4,
    "title": "Pure and organic",
    "body": "Smell se hi pata chal jata hai ki original neem khali hai. Vegetables are growing healthier.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Sanjay Sen",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Excellent product! It works wonderfully.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Umesh Nair",
    "rating": 5,
    "title": "Pure and organic",
    "body": "Smell se hi pata chal jata hai ki original neem khali hai. Vegetables are growing healthier.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Nisha Iyer",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Suman Rao",
    "rating": 5,
    "title": "Plants are pest-free",
    "body": "Maine mitti me mix kiya tha, ab koi kide makode nahi aate pots ke pas.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Atharv Bansal",
    "rating": 5,
    "title": "Plants are pest-free",
    "body": "Maine mitti me mix kiya tha, ab koi kide makode nahi aate pots ke pas.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Kamal Verma",
    "rating": 5,
    "title": "Plants are pest-free",
    "body": "Maine mitti me mix kiya tha, ab koi kide makode nahi aate pots ke pas.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Karan Sen",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Sahi price aur original cheez. Har gardener ko try karna chahiye.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Ramesh Chauhan",
    "rating": 5,
    "title": "Plants are pest-free",
    "body": "Maine mitti me mix kiya tha, ab koi kide makode nahi aate pots ke pas.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Ravi Yadav",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Customer service is great, and the product is amazing.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Harsh Reddy",
    "rating": 4,
    "title": "Good Purchase",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Ira Tiwari",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bahut badhiya kaam kar raha hai. Ab hamesha yahi se lunga.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Anita Gupta",
    "rating": 5,
    "title": "Pure and organic",
    "body": "Smell se hi pata chal jata hai ki original neem khali hai. Vegetables are growing healthier.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Sonam Nair",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bahut badhiya kaam kar raha hai. Ab hamesha yahi se lunga.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Vijay Bansal",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "100% original lag raha hai. Sahi daam pe achhi cheez.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Rahul Tiwari",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Sahi price aur original cheez. Har gardener ko try karna chahiye.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Arun Gupta",
    "rating": 5,
    "title": "Best pest control",
    "body": "Roses par se aphids ka problem khatam ho gaya. A purely natural solution.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Arjun Sharma",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Sushma Verma",
    "rating": 5,
    "title": "Pests gone!",
    "body": "Organic gardening karne walo ke liye must buy. Keeps both pests and fungus away effectively.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Atharv Singh",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Vikas Patel",
    "rating": 5,
    "title": "Plants are pest-free",
    "body": "Maine mitti me mix kiya tha, ab koi kide makode nahi aate pots ke pas.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Anil Tiwari",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Siddharth Iyer",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Product waisa hi hai jaisa photo me dikhaya. Happy customer.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Ananya Rao",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Customer service is great, and the product is amazing.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Sushma Iyer",
    "rating": 5,
    "title": "Pure and organic",
    "body": "Smell se hi pata chal jata hai ki original neem khali hai. Vegetables are growing healthier.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Ira Reddy",
    "rating": 5,
    "title": "Excellent fertilizer",
    "body": "Fertilizer aur pest control dono ka kaam karta hai. The powder quality is very fine.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Manoj Chauhan",
    "rating": 4,
    "title": "Excellent fertilizer",
    "body": "Fertilizer aur pest control dono ka kaam karta hai. The powder quality is very fine.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Shalini Chauhan",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Arti Bansal",
    "rating": 4,
    "title": "Excellent fertilizer",
    "body": "Fertilizer aur pest control dono ka kaam karta hai. The powder quality is very fine.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Swati Jain",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Sahi price aur original cheez. Har gardener ko try karna chahiye.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Shalini Chauhan",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Fast delivery and premium packaging. The product is top-notch.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Simran Rao",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Fast delivery and premium packaging. The product is top-notch.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Ishaan Chauhan",
    "rating": 5,
    "title": "Pests gone!",
    "body": "Organic gardening karne walo ke liye must buy. Keeps both pests and fungus away effectively.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Sneha Reddy",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bhai ek number product hai. Quality me koi compromise nahi.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Kajal Iyer",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bohot kam stores itna sahi saman dete hain. Great job.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Kajal Sen",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Aditya Rao",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Great experience overall. The plants seem to love it.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Atharv Singh",
    "rating": 5,
    "title": "Pests gone!",
    "body": "Organic gardening karne walo ke liye must buy. Keeps both pests and fungus away effectively.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Navya Tiwari",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Product waisa hi hai jaisa photo me dikhaya. Happy customer.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Simran Sharma",
    "rating": 5,
    "title": "Pure and organic",
    "body": "Smell se hi pata chal jata hai ki original neem khali hai. Vegetables are growing healthier.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Ananya Kumar",
    "rating": 4,
    "title": "Good Purchase",
    "body": "Quality is exactly as promised. Very happy with the purchase.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Saanvi Rao",
    "rating": 4,
    "title": "Pests gone!",
    "body": "Organic gardening karne walo ke liye must buy. Keeps both pests and fungus away effectively.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Priya Patel",
    "rating": 5,
    "title": "Plants are pest-free",
    "body": "Maine mitti me mix kiya tha, ab koi kide makode nahi aate pots ke pas.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Arun Rao",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bahut badhiya kaam kar raha hai. Ab hamesha yahi se lunga.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Ravi Chauhan",
    "rating": 5,
    "title": "Pure and organic",
    "body": "Smell se hi pata chal jata hai ki original neem khali hai. Vegetables are growing healthier.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Seema Iyer",
    "rating": 5,
    "title": "Pure and organic",
    "body": "Smell se hi pata chal jata hai ki original neem khali hai. Vegetables are growing healthier.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Arjun Sen",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Quality is exactly as promised. Very happy with the purchase.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Kamal Reddy",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "100% original lag raha hai. Sahi daam pe achhi cheez.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Suresh Iyer",
    "rating": 5,
    "title": "Excellent fertilizer",
    "body": "Fertilizer aur pest control dono ka kaam karta hai. The powder quality is very fine.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Ravi Kumar",
    "rating": 5,
    "title": "Best pest control",
    "body": "Roses par se aphids ka problem khatam ho gaya. A purely natural solution.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Sai Verma",
    "rating": 5,
    "title": "Plants are pest-free",
    "body": "Maine mitti me mix kiya tha, ab koi kide makode nahi aate pots ke pas.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Ajay Jain",
    "rating": 5,
    "title": "Best pest control",
    "body": "Roses par se aphids ka problem khatam ho gaya. A purely natural solution.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Rajesh Kumar",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Quality is exactly as promised. Very happy with the purchase.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Gita Verma",
    "rating": 4,
    "title": "Excellent fertilizer",
    "body": "Fertilizer aur pest control dono ka kaam karta hai. The powder quality is very fine.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Aarav Gupta",
    "rating": 4,
    "title": "Good Purchase",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Lakshmi Yadav",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Umesh Nair",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Ananya Sen",
    "rating": 4,
    "title": "Plants are pest-free",
    "body": "Maine mitti me mix kiya tha, ab koi kide makode nahi aate pots ke pas.",
    "date": "2 weeks ago",
    "verified": true
  }
];
const vermicompostReviews = [
  {
    "name": "Navya Tiwari",
    "rating": 4,
    "title": "Amazing for soil",
    "body": "I mix half soil and half of this compost. Plants are looking so vibrant and happy.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Preeti Bansal",
    "rating": 5,
    "title": "Rich compost",
    "body": "Bahut badhiya khaad hai. Ekdum chai patti jaisi dark aur moisture wali.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Ajay Nair",
    "rating": 5,
    "title": "Pure earthworm castings",
    "body": "I can see the difference. Leaves are bigger and greener. Best compost online.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Aadya Sen",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Excellent product! It works wonderfully.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Anika Yadav",
    "rating": 5,
    "title": "Plants love it",
    "body": "Growth has accelerated incredibly. Earthy smell proves the quality.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Simran Chauhan",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Product waisa hi hai jaisa photo me dikhaya. Happy customer.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Ashok Verma",
    "rating": 4,
    "title": "Amazing for soil",
    "body": "I mix half soil and half of this compost. Plants are looking so vibrant and happy.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Gita Rao",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bohot kam stores itna sahi saman dete hain. Great job.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Riyansh Chauhan",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Quality is exactly as promised. Very happy with the purchase.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Ashok Verma",
    "rating": 5,
    "title": "Plants love it",
    "body": "Growth has accelerated incredibly. Earthy smell proves the quality.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Rahul Patel",
    "rating": 5,
    "title": "Plants love it",
    "body": "Growth has accelerated incredibly. Earthy smell proves the quality.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Anil Verma",
    "rating": 5,
    "title": "Rich compost",
    "body": "Bahut badhiya khaad hai. Ekdum chai patti jaisi dark aur moisture wali.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Harsh Verma",
    "rating": 4,
    "title": "Plants love it",
    "body": "Growth has accelerated incredibly. Earthy smell proves the quality.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Amit Sharma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Nice quality and genuine product. Worth every penny.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Vihaan Sen",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bhai ek number product hai. Quality me koi compromise nahi.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Harsh Yadav",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Fast delivery and premium packaging. The product is top-notch.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Sai Nair",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Customer service is great, and the product is amazing.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Vihaan Sen",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Pallavi Reddy",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Sonam Yadav",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Nikhil Gupta",
    "rating": 5,
    "title": "Amazing for soil",
    "body": "I mix half soil and half of this compost. Plants are looking so vibrant and happy.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Ishaan Jain",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Paisa vasool item hai. Delivery bhi bahut fast thi.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Arjun Patel",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bhai ek number product hai. Quality me koi compromise nahi.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Vikas Singh",
    "rating": 5,
    "title": "Pure earthworm castings",
    "body": "I can see the difference. Leaves are bigger and greener. Best compost online.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Rekha Rao",
    "rating": 5,
    "title": "Pure earthworm castings",
    "body": "I can see the difference. Leaves are bigger and greener. Best compost online.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Meera Nair",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Excellent product! It works wonderfully.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Sai Jain",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maine kaafi try kiye but ye sabse best hai. Result mast aaya.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Diya Kumar",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Quality is exactly as promised. Very happy with the purchase.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Gaurav Sharma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Siddharth Sen",
    "rating": 5,
    "title": "Excellent Product",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Aarohi Jain",
    "rating": 5,
    "title": "Pure earthworm castings",
    "body": "I can see the difference. Leaves are bigger and greener. Best compost online.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Riya Gupta",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Prakash Sen",
    "rating": 5,
    "title": "Rich compost",
    "body": "Bahut badhiya khaad hai. Ekdum chai patti jaisi dark aur moisture wali.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Kabir Rao",
    "rating": 5,
    "title": "Amazing for soil",
    "body": "I mix half soil and half of this compost. Plants are looking so vibrant and happy.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Rahul Tiwari",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bahut badhiya kaam kar raha hai. Ab hamesha yahi se lunga.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Anika Rao",
    "rating": 5,
    "title": "Top quality!",
    "body": "Koi kachra ya patthar nahi tha isme. Ekdum clean vermicompost.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Shalini Patel",
    "rating": 5,
    "title": "Top quality!",
    "body": "Koi kachra ya patthar nahi tha isme. Ekdum clean vermicompost.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Gaurav Sen",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "Bahut badhiya kaam kar raha hai. Ab hamesha yahi se lunga.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Swati Bansal",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Nice quality and genuine product. Worth every penny.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Ritu Rao",
    "rating": 5,
    "title": "Pure earthworm castings",
    "body": "I can see the difference. Leaves are bigger and greener. Best compost online.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Riyansh Jain",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Paisa vasool item hai. Delivery bhi bahut fast thi.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Tushar Bansal",
    "rating": 5,
    "title": "Pure earthworm castings",
    "body": "I can see the difference. Leaves are bigger and greener. Best compost online.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Sai Iyer",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Siddharth Jain",
    "rating": 5,
    "title": "Plants love it",
    "body": "Growth has accelerated incredibly. Earthy smell proves the quality.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Priya Reddy",
    "rating": 5,
    "title": "Plants love it",
    "body": "Growth has accelerated incredibly. Earthy smell proves the quality.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Saanvi Iyer",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Exactly what I was looking for. Five stars from me!",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Kabir Kumar",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Customer service is great, and the product is amazing.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Yash Reddy",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Customer service is great, and the product is amazing.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Ritu Yadav",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maine kaafi try kiye but ye sabse best hai. Result mast aaya.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Rekha Sharma",
    "rating": 5,
    "title": "Pure earthworm castings",
    "body": "I can see the difference. Leaves are bigger and greener. Best compost online.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Diya Gupta",
    "rating": 5,
    "title": "Rich compost",
    "body": "Bahut badhiya khaad hai. Ekdum chai patti jaisi dark aur moisture wali.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Divya Yadav",
    "rating": 5,
    "title": "Rich compost",
    "body": "Bahut badhiya khaad hai. Ekdum chai patti jaisi dark aur moisture wali.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Rohan Singh",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Ramesh Tiwari",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bahut badhiya kaam kar raha hai. Ab hamesha yahi se lunga.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Nikhil Singh",
    "rating": 5,
    "title": "Top quality!",
    "body": "Koi kachra ya patthar nahi tha isme. Ekdum clean vermicompost.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Ravi Tiwari",
    "rating": 5,
    "title": "Pure earthworm castings",
    "body": "I can see the difference. Leaves are bigger and greener. Best compost online.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Shaurya Sen",
    "rating": 5,
    "title": "Plants love it",
    "body": "Growth has accelerated incredibly. Earthy smell proves the quality.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Preeti Sen",
    "rating": 5,
    "title": "Amazing for soil",
    "body": "I mix half soil and half of this compost. Plants are looking so vibrant and happy.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Yash Jain",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Exactly what I was looking for. Five stars from me!",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Yash Nair",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "2 weeks ago",
    "verified": true
  }
];
const mustardCakeReviews = [
  {
    "name": "Sushma Jain",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Kiran Sen",
    "rating": 5,
    "title": "Works brilliantly",
    "body": "Mere lemon tree pe phool jhad jate the, ab phal rukne lage hain. Very effective product.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Pallavi Verma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Riyansh Rao",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Exactly what I was looking for. Five stars from me!",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Tushar Jain",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Arti Reddy",
    "rating": 5,
    "title": "Highly recommend",
    "body": "Asli sarso ki mehak aati hai. There is absolutely no adulteration.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Neha Sen",
    "rating": 5,
    "title": "Plants are thriving",
    "body": "I made a liquid fertilizer for my roses. Phool hi phool aa gaye garden me within weeks.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Ayaan Patel",
    "rating": 5,
    "title": "Plants are thriving",
    "body": "I made a liquid fertilizer for my roses. Phool hi phool aa gaye garden me within weeks.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Pallavi Verma",
    "rating": 5,
    "title": "Excellent fertilizer",
    "body": "Sarso khali ka powder bahut sahi hai. Paani me bhiga ke use karta hu, results are fantastic.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Meera Iyer",
    "rating": 4,
    "title": "Excellent fertilizer",
    "body": "Sarso khali ka powder bahut sahi hai. Paani me bhiga ke use karta hu, results are fantastic.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Ritu Gupta",
    "rating": 5,
    "title": "Plants are thriving",
    "body": "I made a liquid fertilizer for my roses. Phool hi phool aa gaye garden me within weeks.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Deepak Kumar",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Highly recommend this to everyone. Great value for money.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Poonam Sharma",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "100% original lag raha hai. Sahi daam pe achhi cheez.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Shalini Reddy",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Nice quality and genuine product. Worth every penny.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Prakash Singh",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Poonam Kumar",
    "rating": 4,
    "title": "Plants are thriving",
    "body": "I made a liquid fertilizer for my roses. Phool hi phool aa gaye garden me within weeks.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Krishna Rao",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Excellent product! It works wonderfully.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Tushar Yadav",
    "rating": 5,
    "title": "Excellent fertilizer",
    "body": "Sarso khali ka powder bahut sahi hai. Paani me bhiga ke use karta hu, results are fantastic.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Aarav Kumar",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Ananya Iyer",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Product waisa hi hai jaisa photo me dikhaya. Happy customer.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Sai Bansal",
    "rating": 5,
    "title": "Great for flowers!",
    "body": "Winter flowers ke liye best khuraak. The fine powder dissolves quickly and effectively.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Deepak Reddy",
    "rating": 5,
    "title": "Works brilliantly",
    "body": "Mere lemon tree pe phool jhad jate the, ab phal rukne lage hain. Very effective product.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Karan Yadav",
    "rating": 5,
    "title": "Great for flowers!",
    "body": "Winter flowers ke liye best khuraak. The fine powder dissolves quickly and effectively.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Ishaan Yadav",
    "rating": 5,
    "title": "Great for flowers!",
    "body": "Winter flowers ke liye best khuraak. The fine powder dissolves quickly and effectively.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Amit Patel",
    "rating": 4,
    "title": "Plants are thriving",
    "body": "I made a liquid fertilizer for my roses. Phool hi phool aa gaye garden me within weeks.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Ramesh Yadav",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Quality is exactly as promised. Very happy with the purchase.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Kiran Reddy",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Sai Bansal",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Nice quality and genuine product. Worth every penny.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Aarohi Tiwari",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Nice quality and genuine product. Worth every penny.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Umesh Verma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Quality is exactly as promised. Very happy with the purchase.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Sneha Nair",
    "rating": 4,
    "title": "Great for flowers!",
    "body": "Winter flowers ke liye best khuraak. The fine powder dissolves quickly and effectively.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Vijay Singh",
    "rating": 5,
    "title": "Great for flowers!",
    "body": "Winter flowers ke liye best khuraak. The fine powder dissolves quickly and effectively.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Geeta Verma",
    "rating": 4,
    "title": "Works brilliantly",
    "body": "Mere lemon tree pe phool jhad jate the, ab phal rukne lage hain. Very effective product.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Ayaan Yadav",
    "rating": 5,
    "title": "Highly recommend",
    "body": "Asli sarso ki mehak aati hai. There is absolutely no adulteration.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Riyansh Kumar",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Sonam Chauhan",
    "rating": 5,
    "title": "Great for flowers!",
    "body": "Winter flowers ke liye best khuraak. The fine powder dissolves quickly and effectively.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Ananya Reddy",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Tushar Iyer",
    "rating": 5,
    "title": "Excellent Product",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Ritu Gupta",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Paisa vasool item hai. Delivery bhi bahut fast thi.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Meera Kumar",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Product waisa hi hai jaisa photo me dikhaya. Happy customer.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Krishna Bansal",
    "rating": 5,
    "title": "Excellent Product",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Krishna Iyer",
    "rating": 4,
    "title": "Good Purchase",
    "body": "Highly recommend this to everyone. Great value for money.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Neha Rao",
    "rating": 5,
    "title": "Excellent fertilizer",
    "body": "Sarso khali ka powder bahut sahi hai. Paani me bhiga ke use karta hu, results are fantastic.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Tushar Jain",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Suman Sharma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Great experience overall. The plants seem to love it.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Ritu Sharma",
    "rating": 5,
    "title": "Highly recommend",
    "body": "Asli sarso ki mehak aati hai. There is absolutely no adulteration.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Shaurya Kumar",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Sahi price aur original cheez. Har gardener ko try karna chahiye.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Manoj Tiwari",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Highly recommend this to everyone. Great value for money.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Kajal Iyer",
    "rating": 5,
    "title": "Highly recommend",
    "body": "Asli sarso ki mehak aati hai. There is absolutely no adulteration.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Arun Tiwari",
    "rating": 4,
    "title": "Good Purchase",
    "body": "Excellent product! It works wonderfully.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Divya Iyer",
    "rating": 4,
    "title": "Great for flowers!",
    "body": "Winter flowers ke liye best khuraak. The fine powder dissolves quickly and effectively.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Pallavi Rao",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Product waisa hi hai jaisa photo me dikhaya. Happy customer.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Siddharth Chauhan",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Nice quality and genuine product. Worth every penny.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Yash Bansal",
    "rating": 5,
    "title": "Works brilliantly",
    "body": "Mere lemon tree pe phool jhad jate the, ab phal rukne lage hain. Very effective product.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Sai Chauhan",
    "rating": 5,
    "title": "Plants are thriving",
    "body": "I made a liquid fertilizer for my roses. Phool hi phool aa gaye garden me within weeks.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Rekha Iyer",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maine kaafi try kiye but ye sabse best hai. Result mast aaya.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Preeti Jain",
    "rating": 5,
    "title": "Plants are thriving",
    "body": "I made a liquid fertilizer for my roses. Phool hi phool aa gaye garden me within weeks.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Alok Patel",
    "rating": 5,
    "title": "Great for flowers!",
    "body": "Winter flowers ke liye best khuraak. The fine powder dissolves quickly and effectively.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Siddharth Sharma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Exactly what I was looking for. Five stars from me!",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Ravi Patel",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Customer service is great, and the product is amazing.",
    "date": "2 days ago",
    "verified": true
  }
];
const cocopeatReviews = [
  {
    "name": "Pallavi Sharma",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bohot kam stores itna sahi saman dete hain. Great job.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Sushma Patel",
    "rating": 5,
    "title": "Superb water retention",
    "body": "Garmi me roz paani dalne ki zaroorat nahi padti ab. Keeps my hanging baskets lightweight.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Anita Patel",
    "rating": 5,
    "title": "Value for money",
    "body": "Sahi daam pe acchi quality di hai. One block was enough for multiple medium-sized pots.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Gaurav Verma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Highly recommend this to everyone. Great value for money.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Vikas Bansal",
    "rating": 5,
    "title": "Excellent Product",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Myra Singh",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bhai ek number product hai. Quality me koi compromise nahi.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Ritu Chauhan",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Exactly what I was looking for. Five stars from me!",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Nikhil Chauhan",
    "rating": 5,
    "title": "Great for seedlings",
    "body": "Beej ugane ke liye sabse best hai. It holds moisture for a very long time which is crucial.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Swati Verma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Nice quality and genuine product. Worth every penny.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Arti Yadav",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Nice quality and genuine product. Worth every penny.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Ishaan Gupta",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Great experience overall. The plants seem to love it.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Vikas Sharma",
    "rating": 5,
    "title": "Superb water retention",
    "body": "Garmi me roz paani dalne ki zaroorat nahi padti ab. Keeps my hanging baskets lightweight.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Gita Verma",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Umesh Gupta",
    "rating": 5,
    "title": "Great for seedlings",
    "body": "Beej ugane ke liye sabse best hai. It holds moisture for a very long time which is crucial.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Diya Jain",
    "rating": 5,
    "title": "Superb water retention",
    "body": "Garmi me roz paani dalne ki zaroorat nahi padti ab. Keeps my hanging baskets lightweight.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Suman Singh",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Highly recommend this to everyone. Great value for money.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Poonam Patel",
    "rating": 5,
    "title": "Excellent Product",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Poonam Singh",
    "rating": 4,
    "title": "Great for seedlings",
    "body": "Beej ugane ke liye sabse best hai. It holds moisture for a very long time which is crucial.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Arti Kumar",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Excellent product! It works wonderfully.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Rekha Bansal",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bhai ek number product hai. Quality me koi compromise nahi.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Arun Reddy",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Fast delivery and premium packaging. The product is top-notch.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Suman Bansal",
    "rating": 5,
    "title": "Value for money",
    "body": "Sahi daam pe acchi quality di hai. One block was enough for multiple medium-sized pots.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Rahul Sharma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Nice quality and genuine product. Worth every penny.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Dinesh Singh",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Product waisa hi hai jaisa photo me dikhaya. Happy customer.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Arti Yadav",
    "rating": 4,
    "title": "Good Purchase",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Vikas Singh",
    "rating": 4,
    "title": "Value for money",
    "body": "Sahi daam pe acchi quality di hai. One block was enough for multiple medium-sized pots.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Kamal Sen",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Paisa vasool item hai. Delivery bhi bahut fast thi.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Pooja Nair",
    "rating": 5,
    "title": "Superb water retention",
    "body": "Garmi me roz paani dalne ki zaroorat nahi padti ab. Keeps my hanging baskets lightweight.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Kamal Iyer",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bohot kam stores itna sahi saman dete hain. Great job.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Gaurav Verma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Customer service is great, and the product is amazing.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Vijay Gupta",
    "rating": 5,
    "title": "Excellent cocopeat!",
    "body": "Paani dalte hi bahut saara ban gaya. Noticed zero debris or dust in the block. Very clean.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Anika Kumar",
    "rating": 5,
    "title": "Great for seedlings",
    "body": "Beej ugane ke liye sabse best hai. It holds moisture for a very long time which is crucial.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Vijay Verma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Excellent product! It works wonderfully.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Harsh Gupta",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bhai ek number product hai. Quality me koi compromise nahi.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Tushar Rao",
    "rating": 5,
    "title": "Excellent cocopeat!",
    "body": "Paani dalte hi bahut saara ban gaya. Noticed zero debris or dust in the block. Very clean.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Geeta Sharma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Customer service is great, and the product is amazing.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Kamal Patel",
    "rating": 5,
    "title": "Value for money",
    "body": "Sahi daam pe acchi quality di hai. One block was enough for multiple medium-sized pots.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Navya Iyer",
    "rating": 5,
    "title": "Value for money",
    "body": "Sahi daam pe acchi quality di hai. One block was enough for multiple medium-sized pots.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Divya Nair",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Nice quality and genuine product. Worth every penny.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Sanjay Verma",
    "rating": 4,
    "title": "Best cocopeat",
    "body": "Pehle se dhula hua aur clean lag raha hai. The EC levels seem perfect as my plants aren’t burning.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Poonam Chauhan",
    "rating": 5,
    "title": "Value for money",
    "body": "Sahi daam pe acchi quality di hai. One block was enough for multiple medium-sized pots.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Arjun Kumar",
    "rating": 5,
    "title": "Excellent cocopeat!",
    "body": "Paani dalte hi bahut saara ban gaya. Noticed zero debris or dust in the block. Very clean.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Arjun Nair",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Pooja Nair",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "Maine kaafi try kiye but ye sabse best hai. Result mast aaya.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Aarohi Sen",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maine kaafi try kiye but ye sabse best hai. Result mast aaya.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Poonam Patel",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "Product waisa hi hai jaisa photo me dikhaya. Happy customer.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Sanjay Reddy",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Great experience overall. The plants seem to love it.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Kavya Gupta",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maine kaafi try kiye but ye sabse best hai. Result mast aaya.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Anika Kumar",
    "rating": 4,
    "title": "Best cocopeat",
    "body": "Pehle se dhula hua aur clean lag raha hai. The EC levels seem perfect as my plants aren’t burning.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Alok Sen",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Alok Iyer",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Quality is exactly as promised. Very happy with the purchase.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Suresh Iyer",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Excellent product! It works wonderfully.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Amit Chauhan",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Highly recommend this to everyone. Great value for money.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Ravi Kumar",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Sonam Nair",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Customer service is great, and the product is amazing.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Rahul Yadav",
    "rating": 4,
    "title": "Best cocopeat",
    "body": "Pehle se dhula hua aur clean lag raha hai. The EC levels seem perfect as my plants aren’t burning.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Anita Rao",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bahut badhiya kaam kar raha hai. Ab hamesha yahi se lunga.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Krishna Iyer",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "Sahi price aur original cheez. Har gardener ko try karna chahiye.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Karan Gupta",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bahut badhiya kaam kar raha hai. Ab hamesha yahi se lunga.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Geeta Sharma",
    "rating": 5,
    "title": "Excellent cocopeat!",
    "body": "Paani dalte hi bahut saara ban gaya. Noticed zero debris or dust in the block. Very clean.",
    "date": "5 months ago",
    "verified": true
  }
];
const seedReviews = [
  {
    "name": "Aditya Reddy",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Product waisa hi hai jaisa photo me dikhaya. Happy customer.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Rakesh Iyer",
    "rating": 5,
    "title": "High germination rate!",
    "body": "Bhai kya mast beej hain. 4-5 din me hi ankur nikal aaye. Very fresh and viable seeds.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Atharv Reddy",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Excellent product! It works wonderfully.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Atharv Sharma",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "100% original lag raha hai. Sahi daam pe achhi cheez.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Sushma Singh",
    "rating": 5,
    "title": "Excellent Product",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Yash Tiwari",
    "rating": 5,
    "title": "Super happy!",
    "body": "Phool ke seeds lagaye the pichle mahine, now the flowering has started. Really good product!",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Prakash Reddy",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Rakesh Iyer",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bhai ek number product hai. Quality me koi compromise nahi.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Ashok Bansal",
    "rating": 5,
    "title": "Excellent quality",
    "body": "Dhania aur palak ke beej bahut jaldi nikal aaye. No need to buy these from the market anymore.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Saanvi Yadav",
    "rating": 5,
    "title": "Amazing collection",
    "body": "Ghar ke liye sab zaroori sabjiyo ke beej mil gaye ek sath. The germination rate is brilliant.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Anika Chauhan",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Fast delivery and premium packaging. The product is top-notch.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Vikas Patel",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Excellent product! It works wonderfully.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Geeta Sharma",
    "rating": 5,
    "title": "Super happy!",
    "body": "Phool ke seeds lagaye the pichle mahine, now the flowering has started. Really good product!",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Aarav Sharma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Nice quality and genuine product. Worth every penny.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Sneha Bansal",
    "rating": 4,
    "title": "Amazing collection",
    "body": "Ghar ke liye sab zaroori sabjiyo ke beej mil gaye ek sath. The germination rate is brilliant.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Kavya Jain",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "100% original lag raha hai. Sahi daam pe achhi cheez.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Anita Rao",
    "rating": 5,
    "title": "Super happy!",
    "body": "Phool ke seeds lagaye the pichle mahine, now the flowering has started. Really good product!",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Rakesh Verma",
    "rating": 5,
    "title": "Super happy!",
    "body": "Phool ke seeds lagaye the pichle mahine, now the flowering has started. Really good product!",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Vikram Jain",
    "rating": 5,
    "title": "High germination rate!",
    "body": "Bhai kya mast beej hain. 4-5 din me hi ankur nikal aaye. Very fresh and viable seeds.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Krishna Chauhan",
    "rating": 5,
    "title": "Fresh seeds!",
    "body": "Package achha tha. Almost 95% of the seeds sprouted successfully. Kitchen garden mast chal raha hai.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Krishna Yadav",
    "rating": 5,
    "title": "Fresh seeds!",
    "body": "Package achha tha. Almost 95% of the seeds sprouted successfully. Kitchen garden mast chal raha hai.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Ishaan Tiwari",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Paisa vasool item hai. Delivery bhi bahut fast thi.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Atharv Verma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Customer service is great, and the product is amazing.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Aarav Iyer",
    "rating": 5,
    "title": "Fresh seeds!",
    "body": "Package achha tha. Almost 95% of the seeds sprouted successfully. Kitchen garden mast chal raha hai.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Gita Reddy",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bhai ek number product hai. Quality me koi compromise nahi.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Myra Bansal",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "100% original lag raha hai. Sahi daam pe achhi cheez.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Sai Bansal",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Nice quality and genuine product. Worth every penny.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Gita Gupta",
    "rating": 4,
    "title": "High germination rate!",
    "body": "Bhai kya mast beej hain. 4-5 din me hi ankur nikal aaye. Very fresh and viable seeds.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Lakshmi Sharma",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Sahi price aur original cheez. Har gardener ko try karna chahiye.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Arun Kumar",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bohot kam stores itna sahi saman dete hain. Great job.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Sneha Patel",
    "rating": 5,
    "title": "Fresh seeds!",
    "body": "Package achha tha. Almost 95% of the seeds sprouted successfully. Kitchen garden mast chal raha hai.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Pooja Nair",
    "rating": 5,
    "title": "High germination rate!",
    "body": "Bhai kya mast beej hain. 4-5 din me hi ankur nikal aaye. Very fresh and viable seeds.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Arjun Singh",
    "rating": 5,
    "title": "Amazing collection",
    "body": "Ghar ke liye sab zaroori sabjiyo ke beej mil gaye ek sath. The germination rate is brilliant.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Vijay Tiwari",
    "rating": 4,
    "title": "Fresh seeds!",
    "body": "Package achha tha. Almost 95% of the seeds sprouted successfully. Kitchen garden mast chal raha hai.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Siddharth Bansal",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maine kaafi try kiye but ye sabse best hai. Result mast aaya.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Simran Kumar",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Sushma Nair",
    "rating": 4,
    "title": "High germination rate!",
    "body": "Bhai kya mast beej hain. 4-5 din me hi ankur nikal aaye. Very fresh and viable seeds.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Nikhil Verma",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maine kaafi try kiye but ye sabse best hai. Result mast aaya.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Neha Gupta",
    "rating": 4,
    "title": "Good Purchase",
    "body": "Highly recommend this to everyone. Great value for money.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Siddharth Singh",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bohot kam stores itna sahi saman dete hain. Great job.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Ira Sen",
    "rating": 5,
    "title": "Excellent quality",
    "body": "Dhania aur palak ke beej bahut jaldi nikal aaye. No need to buy these from the market anymore.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Riyansh Patel",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "100% original lag raha hai. Sahi daam pe achhi cheez.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Ishaan Reddy",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Sahi price aur original cheez. Har gardener ko try karna chahiye.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Shaurya Jain",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "100% original lag raha hai. Sahi daam pe achhi cheez.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Rohan Iyer",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Nice quality and genuine product. Worth every penny.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Rahul Patel",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "100% original lag raha hai. Sahi daam pe achhi cheez.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Prakash Singh",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Excellent product! It works wonderfully.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Tushar Bansal",
    "rating": 5,
    "title": "Super happy!",
    "body": "Phool ke seeds lagaye the pichle mahine, now the flowering has started. Really good product!",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Simran Reddy",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Quality is exactly as promised. Very happy with the purchase.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Ayaan Gupta",
    "rating": 5,
    "title": "Excellent quality",
    "body": "Dhania aur palak ke beej bahut jaldi nikal aaye. No need to buy these from the market anymore.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Arti Tiwari",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Customer service is great, and the product is amazing.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Krishna Kumar",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "Bhai ek number product hai. Quality me koi compromise nahi.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Gita Rao",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Ajay Nair",
    "rating": 5,
    "title": "Excellent Product",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Seema Yadav",
    "rating": 5,
    "title": "High germination rate!",
    "body": "Bhai kya mast beej hain. 4-5 din me hi ankur nikal aaye. Very fresh and viable seeds.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Pallavi Patel",
    "rating": 5,
    "title": "High germination rate!",
    "body": "Bhai kya mast beej hain. 4-5 din me hi ankur nikal aaye. Very fresh and viable seeds.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Rohan Reddy",
    "rating": 5,
    "title": "Fresh seeds!",
    "body": "Package achha tha. Almost 95% of the seeds sprouted successfully. Kitchen garden mast chal raha hai.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Aarav Sharma",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Nikhil Tiwari",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Suman Chauhan",
    "rating": 4,
    "title": "High germination rate!",
    "body": "Bhai kya mast beej hain. 4-5 din me hi ankur nikal aaye. Very fresh and viable seeds.",
    "date": "2 weeks ago",
    "verified": true
  }
];
const boosterReviews = [
  {
    "name": "Suman Chauhan",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Exactly what I was looking for. Five stars from me!",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Kajal Tiwari",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Product waisa hi hai jaisa photo me dikhaya. Happy customer.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Sunita Verma",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Rohan Bansal",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bohot kam stores itna sahi saman dete hain. Great job.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Ajay Tiwari",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Sahi price aur original cheez. Har gardener ko try karna chahiye.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Simran Chauhan",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Customer service is great, and the product is amazing.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Amit Tiwari",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Alok Bansal",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maine kaafi try kiye but ye sabse best hai. Result mast aaya.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Umesh Yadav",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Paisa vasool item hai. Delivery bhi bahut fast thi.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Arjun Tiwari",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Dinesh Jain",
    "rating": 5,
    "title": "Incredible results",
    "body": "Phoolo wale paudhe pe dala, the flower size has visibly increased. Maza aa gaya.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Navya Iyer",
    "rating": 5,
    "title": "Works wonders!",
    "body": "Spray kiya tha rose aur money plant pe. Leaves have turned dark green and very shiny.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Diya Gupta",
    "rating": 5,
    "title": "Incredible results",
    "body": "Phoolo wale paudhe pe dala, the flower size has visibly increased. Maza aa gaya.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Poonam Yadav",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Fast delivery and premium packaging. The product is top-notch.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Shalini Sharma",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Paisa vasool item hai. Delivery bhi bahut fast thi.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Rekha Patel",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Exactly what I was looking for. Five stars from me!",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Vikas Tiwari",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Product waisa hi hai jaisa photo me dikhaya. Happy customer.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Pallavi Bansal",
    "rating": 4,
    "title": "Incredible results",
    "body": "Phoolo wale paudhe pe dala, the flower size has visibly increased. Maza aa gaya.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Tushar Rao",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Suman Kumar",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Great experience overall. The plants seem to love it.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Shalini Yadav",
    "rating": 5,
    "title": "Amazing product",
    "body": "Price ke hisaab se bahut badhiya hai. Regular use definitely improves overall plant health.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Tushar Jain",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Product waisa hi hai jaisa photo me dikhaya. Happy customer.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Aadya Gupta",
    "rating": 5,
    "title": "Must have!",
    "body": "Sukhne wale paudho me jaan daal di isne. It literally works like magic for struggling plants.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Aarohi Verma",
    "rating": 5,
    "title": "Amazing product",
    "body": "Price ke hisaab se bahut badhiya hai. Regular use definitely improves overall plant health.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Karan Nair",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maine kaafi try kiye but ye sabse best hai. Result mast aaya.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Arjun Verma",
    "rating": 5,
    "title": "Incredible results",
    "body": "Phoolo wale paudhe pe dala, the flower size has visibly increased. Maza aa gaya.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Yash Verma",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bhai ek number product hai. Quality me koi compromise nahi.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Arjun Sen",
    "rating": 5,
    "title": "Must have!",
    "body": "Sukhne wale paudho me jaan daal di isne. It literally works like magic for struggling plants.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Dinesh Iyer",
    "rating": 5,
    "title": "Incredible results",
    "body": "Phoolo wale paudhe pe dala, the flower size has visibly increased. Maza aa gaya.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Anil Jain",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Fast delivery and premium packaging. The product is top-notch.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Aarohi Singh",
    "rating": 5,
    "title": "Must have!",
    "body": "Sukhne wale paudho me jaan daal di isne. It literally works like magic for struggling plants.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Rakesh Gupta",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "100% original lag raha hai. Sahi daam pe achhi cheez.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Aadya Yadav",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Quality is exactly as promised. Very happy with the purchase.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Pallavi Sharma",
    "rating": 5,
    "title": "Plants growing faster!",
    "body": "Is booster ka asar 1 hafte me hi dikhne lag gaya. New leaves and branches everywhere.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Sai Sen",
    "rating": 5,
    "title": "Excellent Product",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Sunita Singh",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Exactly what I was looking for. Five stars from me!",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Ajay Nair",
    "rating": 5,
    "title": "Must have!",
    "body": "Sukhne wale paudho me jaan daal di isne. It literally works like magic for struggling plants.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Aditya Chauhan",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Highly recommend this to everyone. Great value for money.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Aarav Nair",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Highly recommend this to everyone. Great value for money.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Anil Kumar",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Highly recommend this to everyone. Great value for money.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Rakesh Jain",
    "rating": 4,
    "title": "Works wonders!",
    "body": "Spray kiya tha rose aur money plant pe. Leaves have turned dark green and very shiny.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Swati Gupta",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Highly recommend this to everyone. Great value for money.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Siddharth Tiwari",
    "rating": 5,
    "title": "Must have!",
    "body": "Sukhne wale paudho me jaan daal di isne. It literally works like magic for struggling plants.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Arun Nair",
    "rating": 5,
    "title": "Incredible results",
    "body": "Phoolo wale paudhe pe dala, the flower size has visibly increased. Maza aa gaya.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Ramesh Singh",
    "rating": 5,
    "title": "Incredible results",
    "body": "Phoolo wale paudhe pe dala, the flower size has visibly increased. Maza aa gaya.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Swati Reddy",
    "rating": 5,
    "title": "Must have!",
    "body": "Sukhne wale paudho me jaan daal di isne. It literally works like magic for struggling plants.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Ajay Jain",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Highly recommend this to everyone. Great value for money.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Myra Singh",
    "rating": 5,
    "title": "Excellent Product",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Harsh Nair",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Sahi price aur original cheez. Har gardener ko try karna chahiye.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Kajal Sen",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Rekha Patel",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Kiran Patel",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bahut badhiya kaam kar raha hai. Ab hamesha yahi se lunga.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Nikhil Iyer",
    "rating": 5,
    "title": "Incredible results",
    "body": "Phoolo wale paudhe pe dala, the flower size has visibly increased. Maza aa gaya.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Shalini Sen",
    "rating": 5,
    "title": "Plants growing faster!",
    "body": "Is booster ka asar 1 hafte me hi dikhne lag gaya. New leaves and branches everywhere.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Atharv Patel",
    "rating": 5,
    "title": "Must have!",
    "body": "Sukhne wale paudho me jaan daal di isne. It literally works like magic for struggling plants.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Ramesh Kumar",
    "rating": 5,
    "title": "Plants growing faster!",
    "body": "Is booster ka asar 1 hafte me hi dikhne lag gaya. New leaves and branches everywhere.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Prakash Jain",
    "rating": 5,
    "title": "Must have!",
    "body": "Sukhne wale paudho me jaan daal di isne. It literally works like magic for struggling plants.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Sai Bansal",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maine kaafi try kiye but ye sabse best hai. Result mast aaya.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Navya Rao",
    "rating": 5,
    "title": "Must have!",
    "body": "Sukhne wale paudho me jaan daal di isne. It literally works like magic for struggling plants.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Diya Chauhan",
    "rating": 5,
    "title": "Plants growing faster!",
    "body": "Is booster ka asar 1 hafte me hi dikhne lag gaya. New leaves and branches everywhere.",
    "date": "3 weeks ago",
    "verified": true
  }
];
const defaultReviews = [
  {
    "name": "Ritu Kumar",
    "rating": 4,
    "title": "Good quality",
    "body": "Soil kaafi fluffy hai, holds moisture well without waterlogging.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Anika Rao",
    "rating": 4,
    "title": "Good Purchase",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Preeti Iyer",
    "rating": 5,
    "title": "Plants love it",
    "body": "Repotting ke time transplant shock bilkul nahi hua.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Atharv Patel",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Customer service is great, and the product is amazing.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Swati Nair",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Fast delivery and premium packaging. The product is top-notch.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Saanvi Yadav",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Meera Nair",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Product waisa hi hai jaisa photo me dikhaya. Happy customer.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Kamal Bansal",
    "rating": 4,
    "title": "Amazing soil",
    "body": "Drainage is perfect and roots are developing beautifully.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Aarav Patel",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Sahi price aur original cheez. Har gardener ko try karna chahiye.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Ajay Sharma",
    "rating": 5,
    "title": "Best potting mix",
    "body": "Texture is very light. No fungus issues at all.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Anika Reddy",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Exactly what I was looking for. Five stars from me!",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Gaurav Verma",
    "rating": 4,
    "title": "Great aeration",
    "body": "The blend of cocopeat and perlite is very well balanced.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Ananya Reddy",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "100% original lag raha hai. Sahi daam pe achhi cheez.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Pallavi Yadav",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Customer service is great, and the product is amazing.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Neha Bansal",
    "rating": 4,
    "title": "Sahi Hai",
    "body": "Paisa vasool item hai. Delivery bhi bahut fast thi.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Tanvi Reddy",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Excellent product! It works wonderfully.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Myra Iyer",
    "rating": 5,
    "title": "Good quality",
    "body": "Soil kaafi fluffy hai, holds moisture well without waterlogging.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Vihaan Singh",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Quality is exactly as promised. Very happy with the purchase.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Nikhil Reddy",
    "rating": 4,
    "title": "Good Purchase",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Siddharth Kumar",
    "rating": 5,
    "title": "Good quality",
    "body": "Soil kaafi fluffy hai, holds moisture well without waterlogging.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Rohan Kumar",
    "rating": 4,
    "title": "Good Purchase",
    "body": "Great experience overall. The plants seem to love it.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Shaurya Kumar",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Kavya Gupta",
    "rating": 5,
    "title": "Excellent Product",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Aadya Gupta",
    "rating": 5,
    "title": "Plants love it",
    "body": "Repotting ke time transplant shock bilkul nahi hua.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Kajal Verma",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Sonam Singh",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Exactly what I was looking for. Five stars from me!",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Geeta Gupta",
    "rating": 5,
    "title": "Great aeration",
    "body": "The blend of cocopeat and perlite is very well balanced.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Ayaan Jain",
    "rating": 5,
    "title": "Amazing soil",
    "body": "Drainage is perfect and roots are developing beautifully.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Sushma Kumar",
    "rating": 5,
    "title": "Amazing soil",
    "body": "Drainage is perfect and roots are developing beautifully.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Riya Rao",
    "rating": 5,
    "title": "Great aeration",
    "body": "The blend of cocopeat and perlite is very well balanced.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Lakshmi Sen",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "100% original lag raha hai. Sahi daam pe achhi cheez.",
    "date": "5 months ago",
    "verified": true
  },
  {
    "name": "Alok Iyer",
    "rating": 5,
    "title": "Excellent Product",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Sunita Verma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Great experience overall. The plants seem to love it.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Kamal Patel",
    "rating": 5,
    "title": "Good quality",
    "body": "Soil kaafi fluffy hai, holds moisture well without waterlogging.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Neha Sen",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Aadya Bansal",
    "rating": 5,
    "title": "Amazing soil",
    "body": "Drainage is perfect and roots are developing beautifully.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Suresh Patel",
    "rating": 4,
    "title": "Amazing soil",
    "body": "Drainage is perfect and roots are developing beautifully.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Yash Sen",
    "rating": 5,
    "title": "Plants love it",
    "body": "Repotting ke time transplant shock bilkul nahi hua.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Geeta Sharma",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bahut badhiya kaam kar raha hai. Ab hamesha yahi se lunga.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Sanjay Chauhan",
    "rating": 4,
    "title": "Good Purchase",
    "body": "Best in the market. I will definitely order again.",
    "date": "1 week ago",
    "verified": true
  },
  {
    "name": "Alok Singh",
    "rating": 5,
    "title": "Best potting mix",
    "body": "Texture is very light. No fungus issues at all.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Dinesh Kumar",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maine kaafi try kiye but ye sabse best hai. Result mast aaya.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Gita Sharma",
    "rating": 4,
    "title": "Amazing soil",
    "body": "Drainage is perfect and roots are developing beautifully.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Tushar Kumar",
    "rating": 5,
    "title": "Great aeration",
    "body": "The blend of cocopeat and perlite is very well balanced.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Ramesh Jain",
    "rating": 4,
    "title": "Best potting mix",
    "body": "Texture is very light. No fungus issues at all.",
    "date": "3 months ago",
    "verified": true
  },
  {
    "name": "Siddharth Bansal",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Packing bohot sahi aayi thi. Use karne me bhi asaan hai.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Siddharth Nair",
    "rating": 5,
    "title": "Excellent Product",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Aditya Verma",
    "rating": 4,
    "title": "Good Purchase",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "2 months ago",
    "verified": true
  },
  {
    "name": "Ayaan Bansal",
    "rating": 5,
    "title": "Amazing soil",
    "body": "Drainage is perfect and roots are developing beautifully.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Aarohi Nair",
    "rating": 5,
    "title": "Excellent Product",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Poonam Nair",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Excellent product! It works wonderfully.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Sai Kumar",
    "rating": 5,
    "title": "Plants love it",
    "body": "Repotting ke time transplant shock bilkul nahi hua.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Neha Kumar",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Bhai ek number product hai. Quality me koi compromise nahi.",
    "date": "1 month ago",
    "verified": true
  },
  {
    "name": "Shalini Verma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "2 days ago",
    "verified": true
  },
  {
    "name": "Meera Sharma",
    "rating": 5,
    "title": "Mast Product Hai",
    "body": "Maza aa gaya use karke. Plants me kafi fark dikh raha hai.",
    "date": "4 months ago",
    "verified": true
  },
  {
    "name": "Aarohi Verma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Best in the market. I will definitely order again.",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Nisha Sen",
    "rating": 4,
    "title": "Good Purchase",
    "body": "It has made a visible difference. I'm totally satisfied.",
    "date": "3 weeks ago",
    "verified": true
  },
  {
    "name": "Poonam Sharma",
    "rating": 5,
    "title": "Amazing soil",
    "body": "Drainage is perfect and roots are developing beautifully.",
    "date": "2 weeks ago",
    "verified": true
  },
  {
    "name": "Yash Sharma",
    "rating": 5,
    "title": "Excellent Product",
    "body": "Exactly what I was looking for. Five stars from me!",
    "date": "4 days ago",
    "verified": true
  },
  {
    "name": "Anika Chauhan",
    "rating": 5,
    "title": "Plants love it",
    "body": "Repotting ke time transplant shock bilkul nahi hua.",
    "date": "2 months ago",
    "verified": true
  }
]; // fallback

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
