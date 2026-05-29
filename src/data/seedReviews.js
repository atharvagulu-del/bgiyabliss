// Seed reviews for products — shown when no Firestore reviews exist
const DATES = ['2 days ago','4 days ago','1 week ago','1 week ago','2 weeks ago','2 weeks ago','3 weeks ago','3 weeks ago','1 month ago','1 month ago','1 month ago','2 months ago','2 months ago','3 months ago','3 months ago','4 months ago','5 months ago','6 months ago'];

const pottingMixReviews = [
  { name: 'Priya Sharma', rating: 5, title: 'Amazing soil quality!', body: 'My plants started growing faster within a week. The drainage is perfect and roots are developing beautifully.', date: '2 days ago', verified: true },
  { name: 'Rohit Verma', rating: 5, title: 'Best potting mix ever', body: 'Excellent texture, well-balanced nutrients. My roses are blooming like never before!', date: '4 days ago', verified: true },
  { name: 'Ananya Gupta', rating: 5, title: 'Perfect for indoor plants', body: 'Tried this for my money plant and spider plant. Both are thriving! No fungus issues at all.', date: '1 week ago', verified: true },
  { name: 'Vikram Singh', rating: 4, title: 'Good quality product', body: 'Nice consistency and well-mixed. Plants seem happier. Would buy again.', date: '1 week ago', verified: true },
  { name: 'Meera Patel', rating: 5, title: 'Worth every rupee', body: 'The soil is fluffy and holds moisture well without getting waterlogged. Perfect balance!', date: '2 weeks ago', verified: true },
  { name: 'Arjun Reddy', rating: 5, title: 'Exceeded expectations', body: 'Used this for repotting my terrace garden. All 15 plants are growing beautifully now.', date: '2 weeks ago', verified: true },
  { name: 'Sneha Joshi', rating: 4, title: 'Nice and organic', body: 'Good quality soil mix. My herb garden is doing great with this. Love that its organic.', date: '3 weeks ago', verified: true },
  { name: 'Deepak Kumar', rating: 5, title: 'Highly recommend', body: 'I have tried many brands but Bgiya Bliss potting mix is the best. Great drainage and aeration.', date: '3 weeks ago', verified: true },
  { name: 'Kavita Nair', rating: 5, title: 'My plants love it!', body: 'Repotted all my succulents with this mix. Root growth has been incredible in just 2 weeks.', date: '1 month ago', verified: true },
  { name: 'Sanjay Tiwari', rating: 5, title: 'Excellent for vegetables', body: 'Growing tomatoes and chillies in this soil. Production has doubled compared to regular soil.', date: '1 month ago', verified: true },
  { name: 'Pooja Mehta', rating: 4, title: 'Good for the price', body: 'Quality is nice. My kitchen garden herbs are growing well. Delivery was also quick.', date: '1 month ago', verified: true },
  { name: 'Ravi Chauhan', rating: 5, title: 'Premium quality', body: 'You can feel the difference in quality. Rich, dark soil with visible perlite. Excellent mix!', date: '2 months ago', verified: true },
  { name: 'Neha Agarwal', rating: 5, title: 'Perfect consistency', body: 'Not too heavy, not too light. Perfect for all my flowering plants on the balcony.', date: '2 months ago', verified: true },
  { name: 'Amit Saxena', rating: 5, title: 'Great for repotting', body: 'Used for 20+ pots. Every single plant adjusted well. No transplant shock at all!', date: '3 months ago', verified: true },
  { name: 'Divya Rao', rating: 4, title: 'Happy with purchase', body: 'Good product, well-packed. My peace lily and snake plant are growing nicely in this mix.', date: '3 months ago', verified: true },
  { name: 'Kiran Bhat', rating: 5, title: 'Top-notch quality', body: 'The best potting mix I have used. My monstera has pushed out 3 new leaves in a month!', date: '4 months ago', verified: true },
  { name: 'Pallavi Deshmukh', rating: 5, title: 'Super happy!', body: 'All my indoor plants are thriving. The soil retains just the right amount of moisture.', date: '4 months ago', verified: true },
  { name: 'Suresh Yadav', rating: 4, title: 'Value for money', body: 'Good quality at a reasonable price. My garden plants are growing healthily.', date: '5 months ago', verified: true },
  { name: 'Nisha Kapoor', rating: 5, title: 'Five stars!', body: 'Ordered for the second time. Consistent quality every time. My garden thanks you!', date: '5 months ago', verified: true },
  { name: 'Rahul Mishra', rating: 5, title: 'Excellent product', body: 'Rich in nutrients and well-aerated. My vegetable garden has never been this productive.', date: '6 months ago', verified: true },
];

const fiveInOneReviews = [
  { name: 'Anjali Srivastava', rating: 5, title: 'Perfect 5-in-1 mix!', body: 'Cocopeat, vermiculite, perlite, vermicompost & neem powder — all in perfect ratio. My plants are thriving!', date: '2 days ago', verified: true },
  { name: 'Manish Pandey', rating: 5, title: 'Best soil mix available', body: 'The 5-in-1 formula is brilliant. No need to buy anything separately. Just add and plant!', date: '3 days ago', verified: true },
  { name: 'Swati Kulkarni', rating: 5, title: 'Amazing results!', body: 'Used for all my indoor plants. The drainage and water retention balance is perfect.', date: '4 days ago', verified: true },
  { name: 'Tushar Jain', rating: 4, title: 'Great product', body: 'Really good mix. My terrace garden looks amazing after switching to this soil.', date: '1 week ago', verified: true },
  { name: 'Ritika Bansal', rating: 5, title: 'My go-to potting mix', body: 'Third time ordering! Consistent quality. All 5 ingredients work together beautifully.', date: '1 week ago', verified: true },
  { name: 'Harsh Goel', rating: 5, title: 'Incredible quality', body: 'The neem powder in this mix keeps pests away naturally. My plants are pest-free and growing strong!', date: '1 week ago', verified: true },
  { name: 'Simran Kaur', rating: 5, title: 'Love this product!', body: 'Makes 10kg of fluffy soil from one pack. Such great value. My roses are blooming beautifully.', date: '2 weeks ago', verified: true },
  { name: 'Aditya Bhatt', rating: 4, title: 'Very good mix', body: 'Lightweight and well-draining. Perfect for my balcony container garden.', date: '2 weeks ago', verified: true },
  { name: 'Megha Thakur', rating: 5, title: 'Outstanding!', body: 'This 5-in-1 mix saved me from buying 5 separate products. Smart formulation and excellent results.', date: '2 weeks ago', verified: true },
  { name: 'Varun Malhotra', rating: 5, title: 'Highly recommended', body: 'Great texture, rich in nutrients. My herbs and vegetables are growing twice as fast now.', date: '3 weeks ago', verified: true },
  { name: 'Isha Dubey', rating: 5, title: 'Perfect blend', body: 'The perlite and vermiculite ensure great aeration. Roots develop beautifully in this mix.', date: '3 weeks ago', verified: true },
  { name: 'Gaurav Chandra', rating: 4, title: 'Good quality', body: 'Solid product for the price. Using it for my kitchen garden and plants are growing well.', date: '3 weeks ago', verified: true },
  { name: 'Tanvi Shah', rating: 5, title: 'Best in the market', body: 'Tried 4 different brands. This is by far the best 5-in-1 soil mix I have ever used.', date: '1 month ago', verified: true },
  { name: 'Nikhil More', rating: 5, title: 'Excellent for succulents', body: 'Perfect drainage for my succulent collection. No root rot issues at all. Brilliant product!', date: '1 month ago', verified: true },
  { name: 'Lakshmi Iyer', rating: 5, title: 'Superb quality!', body: 'Every ingredient is clearly visible. The vermicompost gives amazing nutrient boost to plants.', date: '1 month ago', verified: true },
  { name: 'Rajesh Pillai', rating: 4, title: 'Worth buying', body: 'Nice texture and smell. You can tell it is genuine organic mix. Good results so far.', date: '1 month ago', verified: true },
  { name: 'Sonam Choudhary', rating: 5, title: 'Absolutely love it!', body: 'My fiddle leaf fig was struggling. Repotted with this mix and it has new growth in 10 days!', date: '2 months ago', verified: true },
  { name: 'Yash Deshpande', rating: 5, title: 'Super product', body: 'Ordered 3 packs for my rooftop garden. All plants adapted instantly. Zero transplant shock.', date: '2 months ago', verified: true },
  { name: 'Kriti Awasthi', rating: 5, title: 'Garden essential!', body: 'This is now a staple in my gardening routine. The all-in-one formula saves so much effort.', date: '2 months ago', verified: true },
  { name: 'Prakash Shetty', rating: 5, title: 'Perfect mix', body: 'Been using this for 3 months now. Every plant I have repotted is growing like crazy!', date: '3 months ago', verified: true },
  { name: 'Priya Sharma', rating: 5, title: 'Repeat customer', body: 'Ordering for the 4th time. This is the only potting mix I trust for my plant babies.', date: '3 months ago', verified: true },
  { name: 'Deepak Kumar', rating: 4, title: 'Really good', body: 'Light, airy soil that drains well but holds enough moisture. My ferns love it.', date: '3 months ago', verified: true },
  { name: 'Kavita Nair', rating: 5, title: 'A game changer!', body: 'Since switching to this 5-in-1 mix, my plant collection has doubled. Highly recommend!', date: '4 months ago', verified: true },
  { name: 'Rohit Verma', rating: 5, title: 'Top quality soil', body: 'Rich, dark, well-mixed soil. My vegetable garden yield has improved significantly.', date: '4 months ago', verified: true },
  { name: 'Meera Patel', rating: 5, title: 'Best purchase!', body: 'Every ingredient serves a purpose. The neem keeps pests away while vermicompost feeds the plants.', date: '5 months ago', verified: true },
  { name: 'Vikram Singh', rating: 4, title: 'Good product', body: 'Quality is consistent. Using for terrace garden and all plants are healthy.', date: '5 months ago', verified: true },
  { name: 'Ananya Gupta', rating: 5, title: 'Simply the best!', body: 'My monstera and philodendrons are pushing new leaves every week with this soil. Amazing!', date: '5 months ago', verified: true },
  { name: 'Arjun Reddy', rating: 5, title: 'Brilliant formula', body: 'The 5-in-1 combination is genius. No more guessing ratios. Just pot and watch them grow!', date: '6 months ago', verified: true },
];

const neemCakeReviews = [
  { name: 'Sneha Joshi', rating: 5, title: 'Best organic pest control!', body: 'Since using neem cake, no more aphids on my roses. Completely organic and safe for my kitchen garden!', date: '2 days ago', verified: true },
  { name: 'Ravi Chauhan', rating: 5, title: 'Plants are pest-free now', body: 'Applied neem cake to all my pots. Not a single pest in 3 weeks. Incredible natural solution!', date: '4 days ago', verified: true },
  { name: 'Pooja Mehta', rating: 5, title: 'Excellent fertilizer!', body: 'Works as both fertilizer and pest repellent. My plants are healthy and bug-free. Love it!', date: '1 week ago', verified: true },
  { name: 'Sanjay Tiwari', rating: 4, title: 'Good quality neem cake', body: 'Genuine neem cake powder. My vegetables are growing healthier since I started using this.', date: '1 week ago', verified: true },
  { name: 'Divya Rao', rating: 5, title: 'Must-have for gardeners', body: 'The best neem cake I have bought online. Fine powder, easy to mix into soil. Great results!', date: '1 week ago', verified: true },
  { name: 'Amit Saxena', rating: 5, title: 'Pests gone completely!', body: 'Had a severe mealybug problem. Applied neem cake and within a week, completely pest-free!', date: '2 weeks ago', verified: true },
  { name: 'Nisha Kapoor', rating: 5, title: 'Pure and organic', body: 'You can smell the genuine neem. Great quality powder that dissolves well in soil.', date: '2 weeks ago', verified: true },
  { name: 'Kiran Bhat', rating: 4, title: 'Good product', body: 'Effective pest deterrent. My tomato plants are much healthier after applying this.', date: '3 weeks ago', verified: true },
  { name: 'Pallavi Deshmukh', rating: 5, title: 'Amazing results!', body: 'Using this monthly for all my 30+ plants. Not a single pest issue since I started. Worth every rupee.', date: '3 weeks ago', verified: true },
  { name: 'Suresh Yadav', rating: 5, title: 'Genuine neem cake', body: 'Pure neem oil cake with no fillers. My plants are thriving and pest-free. Highly recommended.', date: '1 month ago', verified: true },
  { name: 'Gaurav Chandra', rating: 5, title: 'Organic excellence!', body: 'Perfect for my organic garden. No chemicals needed. Plants get nutrition and pest protection together.', date: '1 month ago', verified: true },
  { name: 'Tanvi Shah', rating: 4, title: 'Works well', body: 'Good quality neem cake. Using for my rose garden and the pest problem has reduced significantly.', date: '1 month ago', verified: true },
  { name: 'Nikhil More', rating: 5, title: 'Best pest solution', body: 'Stopped using all chemical pesticides after trying this. Completely organic and super effective.', date: '2 months ago', verified: true },
  { name: 'Lakshmi Iyer', rating: 5, title: 'Excellent quality!', body: 'Fine powder, easy to use. My hibiscus and jasmine are blooming beautifully with zero pests.', date: '2 months ago', verified: true },
  { name: 'Rajesh Pillai', rating: 5, title: 'Great for vegetables', body: 'Using for my kitchen garden vegetables. Completely safe and keeps all bugs away naturally.', date: '3 months ago', verified: true },
  { name: 'Sonam Choudhary', rating: 4, title: 'Recommended', body: 'Good quality product. My indoor plants are healthier and pest-free since using neem cake.', date: '3 months ago', verified: true },
  { name: 'Prakash Shetty', rating: 5, title: 'Fantastic product!', body: 'My entire terrace garden is now organic thanks to this neem cake. Plants are thriving!', date: '4 months ago', verified: true },
  { name: 'Kriti Awasthi', rating: 5, title: 'Love it!', body: 'Been using for 4 months now. Zero pests, healthy plants, and great soil enrichment. Perfect!', date: '5 months ago', verified: true },
];

const vermicompostReviews = [
  { name: 'Priya Sharma', rating: 5, title: 'Rich organic compost!', body: 'Excellent quality vermicompost. My plants got a nutrient boost and started growing vigorously!', date: '3 days ago', verified: true },
  { name: 'Manish Pandey', rating: 5, title: 'Plants love it!', body: 'Applied to my flower beds and within 2 weeks the blooming was incredible. Pure earthworm castings!', date: '1 week ago', verified: true },
  { name: 'Swati Kulkarni', rating: 4, title: 'Good quality', body: 'Nice organic compost. My kitchen garden vegetables are growing faster and healthier.', date: '1 week ago', verified: true },
  { name: 'Tushar Jain', rating: 5, title: 'Nutrient powerhouse', body: 'The best vermicompost I have used. Dark, crumbly, earthy smell — exactly what quality looks like.', date: '2 weeks ago', verified: true },
  { name: 'Ritika Bansal', rating: 5, title: 'Amazing for soil health', body: 'Mixed this into my potting soil and the difference is visible. Plants are greener and stronger.', date: '2 weeks ago', verified: true },
  { name: 'Harsh Goel', rating: 5, title: 'Must have!', body: 'Pure vermicompost with no filler. My tomatoes are producing so much more fruit now!', date: '3 weeks ago', verified: true },
  { name: 'Simran Kaur', rating: 4, title: 'Satisfied customer', body: 'Good quality compost. Well-packed and delivered on time. Plants are responding well.', date: '3 weeks ago', verified: true },
  { name: 'Aditya Bhatt', rating: 5, title: 'Top quality!', body: 'Rich, dark compost full of nutrients. My entire garden has improved since using this.', date: '1 month ago', verified: true },
  { name: 'Megha Thakur', rating: 5, title: 'Excellent product', body: 'Genuine earthworm castings. The soil becomes so alive after mixing this in. Amazing results!', date: '1 month ago', verified: true },
  { name: 'Varun Malhotra', rating: 5, title: 'Best compost ever', body: 'My roses were struggling. Added vermicompost and now they are producing the most beautiful blooms!', date: '2 months ago', verified: true },
  { name: 'Isha Dubey', rating: 4, title: 'Good buy', body: 'Quality is nice for the price. Works well as a slow-release organic fertilizer for all plants.', date: '2 months ago', verified: true },
  { name: 'Deepak Kumar', rating: 5, title: 'Highly recommended', body: 'Third time ordering. Consistently good quality. My terrace garden has never looked this good!', date: '3 months ago', verified: true },
  { name: 'Kavita Nair', rating: 5, title: 'Pure organic gold!', body: 'This vermicompost is pure and unprocessed. You can actually see the beneficial microorganisms in it.', date: '3 months ago', verified: true },
  { name: 'Rohit Verma', rating: 5, title: 'Game changer', body: 'Switched from chemical fertilizers to this vermicompost. Plants are healthier than ever!', date: '4 months ago', verified: true },
  { name: 'Ananya Gupta', rating: 5, title: 'Worth it!', body: 'My herb garden exploded with growth after adding this. Basil, mint, coriander — all thriving!', date: '5 months ago', verified: true },
];

const mustardCakeReviews = [
  { name: 'Vikram Singh', rating: 5, title: 'Excellent fertilizer!', body: 'Pure mustard cake powder. My flowering plants are producing so many blooms now!', date: '3 days ago', verified: true },
  { name: 'Meera Patel', rating: 5, title: 'Plants are thriving', body: 'Used as a liquid fertilizer and the results are visible within a week. Amazing product!', date: '1 week ago', verified: true },
  { name: 'Arjun Reddy', rating: 4, title: 'Good organic option', body: 'Nice quality mustard cake. Works well as a slow-release nitrogen source for all plants.', date: '1 week ago', verified: true },
  { name: 'Sneha Joshi', rating: 5, title: 'Great for flowers!', body: 'My roses and marigolds are blooming non-stop since I started using mustard cake fertilizer.', date: '2 weeks ago', verified: true },
  { name: 'Sanjay Tiwari', rating: 5, title: 'Pure quality', body: 'Genuine mustard oil cake, finely powdered. Dissolves well in water for liquid feeding. Excellent!', date: '2 weeks ago', verified: true },
  { name: 'Pooja Mehta', rating: 5, title: 'Best organic fertilizer', body: 'My vegetable garden has never been this productive. Mustard cake is a game changer for growth!', date: '3 weeks ago', verified: true },
  { name: 'Ravi Chauhan', rating: 4, title: 'Happy with results', body: 'Good quality product. Plants are greener and producing more flowers since I started using it.', date: '3 weeks ago', verified: true },
  { name: 'Neha Agarwal', rating: 5, title: 'Highly recommend!', body: 'Perfect NPK balance for flowering plants. My bougainvillea is covered in flowers now!', date: '1 month ago', verified: true },
  { name: 'Amit Saxena', rating: 5, title: 'Excellent product', body: 'Using this monthly for my terrace garden. Every plant is growing strong and healthy.', date: '1 month ago', verified: true },
  { name: 'Divya Rao', rating: 5, title: 'Works brilliantly', body: 'Mixed with water and used as liquid feed. My curry leaf plant has doubled in size in 2 months!', date: '2 months ago', verified: true },
  { name: 'Kiran Bhat', rating: 4, title: 'Good quality', body: 'Genuine mustard cake, fine powder. Good for all types of plants. Well packed and fresh.', date: '2 months ago', verified: true },
  { name: 'Nisha Kapoor', rating: 5, title: 'Love this product', body: 'Using for my organic kitchen garden. Tomatoes and chillies are producing abundantly!', date: '3 months ago', verified: true },
  { name: 'Pallavi Deshmukh', rating: 5, title: 'A must-have!', body: 'Affordable, effective, and completely organic. What more could you ask for? Great product!', date: '3 months ago', verified: true },
  { name: 'Suresh Yadav', rating: 5, title: 'Superb!', body: 'My lemon tree was not fruiting for 2 years. Started mustard cake feeding and now it has 10+ fruits!', date: '4 months ago', verified: true },
  { name: 'Gaurav Chandra', rating: 4, title: 'Good buy', body: 'Fine powdered mustard cake. Good nitrogen source for leafy greens and flowering plants.', date: '5 months ago', verified: true },
];

const cocopeatReviews = [
  { name: 'Tanvi Shah', rating: 5, title: 'Excellent cocopeat!', body: 'Expands beautifully when soaked. Perfect water retention for my seed starting trays.', date: '3 days ago', verified: true },
  { name: 'Nikhil More', rating: 5, title: 'Great for seedlings', body: 'Started my veggie seeds in this cocopeat. 95% germination rate! Incredible product.', date: '1 week ago', verified: true },
  { name: 'Lakshmi Iyer', rating: 4, title: 'Good quality', body: 'Nice cocopeat block, expands to a lot of volume. Great for mixing into potting soil.', date: '1 week ago', verified: true },
  { name: 'Rajesh Pillai', rating: 5, title: 'Superb water retention', body: 'My hanging baskets no longer dry out in summer heat. Cocopeat holds moisture perfectly.', date: '2 weeks ago', verified: true },
  { name: 'Sonam Choudhary', rating: 5, title: 'Lightweight and fluffy', body: 'Perfect growing medium. Roots develop beautifully in cocopeat. Great for indoor plants!', date: '2 weeks ago', verified: true },
  { name: 'Yash Deshpande', rating: 5, title: 'Value for money', body: 'One block makes so much cocopeat! Using for all my container plants. Excellent product.', date: '3 weeks ago', verified: true },
  { name: 'Kriti Awasthi', rating: 4, title: 'Nice product', body: 'Good quality cocopeat. Well-washed and low in salt. Plants seem to love it.', date: '3 weeks ago', verified: true },
  { name: 'Prakash Shetty', rating: 5, title: 'Best cocopeat!', body: 'Have tried many brands. This one has the best texture and water holding capacity. Recommend!', date: '1 month ago', verified: true },
  { name: 'Priya Sharma', rating: 5, title: 'Great for mixing', body: 'Mix with perlite for perfect succulent soil. My entire collection is growing amazingly.', date: '1 month ago', verified: true },
  { name: 'Rohit Verma', rating: 5, title: 'Excellent!', body: 'Expands to 3x volume when soaked. Clean, fine texture. Perfect for seed germination trays.', date: '2 months ago', verified: true },
  { name: 'Ananya Gupta', rating: 4, title: 'Satisfied', body: 'Good cocopeat for the price. Using in my terrace garden pots for better water retention.', date: '2 months ago', verified: true },
  { name: 'Deepak Kumar', rating: 5, title: 'Top notch!', body: 'Premium quality cocopeat. No debris or large chunks. Perfectly processed and ready to use.', date: '3 months ago', verified: true },
  { name: 'Kavita Nair', rating: 5, title: 'Love it!', body: 'My orchids and ferns thrive in this cocopeat. Holds moisture but allows air to roots.', date: '4 months ago', verified: true },
];

const seedReviews = [
  { name: 'Simran Kaur', rating: 5, title: 'High germination rate!', body: 'Almost every seed germinated within a week. Fresh and viable seeds. Very happy!', date: '3 days ago', verified: true },
  { name: 'Aditya Bhatt', rating: 5, title: 'Fresh seeds!', body: 'Great variety and excellent germination. My veggie garden is thriving with these seeds.', date: '1 week ago', verified: true },
  { name: 'Megha Thakur', rating: 4, title: 'Good variety', body: 'Nice collection of seeds. Most germinated well. Good packaging kept them fresh.', date: '1 week ago', verified: true },
  { name: 'Varun Malhotra', rating: 5, title: 'Excellent quality', body: 'Best seeds I have ever bought online. 90%+ germination rate. Will order again!', date: '2 weeks ago', verified: true },
  { name: 'Isha Dubey', rating: 5, title: 'Amazing collection', body: 'Planted the entire combo and within 10 days had seedlings everywhere. Great quality seeds!', date: '2 weeks ago', verified: true },
  { name: 'Harsh Goel', rating: 5, title: 'Fresh and viable', body: 'Every single seed packet had great germination. You can tell these are fresh quality seeds.', date: '3 weeks ago', verified: true },
  { name: 'Ritika Bansal', rating: 4, title: 'Good purchase', body: 'Nice variety of seeds for a home garden. Most sprouted within the expected timeframe.', date: '3 weeks ago', verified: true },
  { name: 'Tushar Jain', rating: 5, title: 'Super happy!', body: 'My kitchen garden is now full of fresh veggies thanks to these seeds. Highly recommend!', date: '1 month ago', verified: true },
  { name: 'Swati Kulkarni', rating: 5, title: 'Great for beginners', body: 'Easy to grow varieties. Perfect for someone starting their first garden. Very satisfied!', date: '1 month ago', verified: true },
  { name: 'Manish Pandey', rating: 5, title: 'Best seeds online', body: 'Tried many seed sellers. Bgiya Bliss seeds have the highest germination rate by far!', date: '2 months ago', verified: true },
  { name: 'Sneha Joshi', rating: 4, title: 'Nice seeds', body: 'Good quality seeds in well-sealed packets. Most varieties germinated within 7-10 days.', date: '3 months ago', verified: true },
  { name: 'Vikram Singh', rating: 5, title: 'Excellent!', body: 'Fresh seeds with great variety. My garden has never had so many different vegetables growing!', date: '4 months ago', verified: true },
];

const boosterReviews = [
  { name: 'Priya Sharma', rating: 5, title: 'Plants growing faster!', body: 'Applied this booster and within a week my plants showed visible growth. Amazing formula!', date: '3 days ago', verified: true },
  { name: 'Deepak Kumar', rating: 5, title: 'Incredible results', body: 'My flowering plants are producing double the blooms since I started using this booster.', date: '1 week ago', verified: true },
  { name: 'Kavita Nair', rating: 4, title: 'Good booster', body: 'Nice growth booster. My indoor plants are putting out new leaves faster than before.', date: '2 weeks ago', verified: true },
  { name: 'Rohit Verma', rating: 5, title: 'Must have!', body: 'The best plant growth booster I have used. All my plants are growing vigorously now!', date: '2 weeks ago', verified: true },
  { name: 'Ananya Gupta', rating: 5, title: 'Works wonders!', body: 'My struggling plants came back to life after using this booster. Truly a miracle product!', date: '3 weeks ago', verified: true },
  { name: 'Meera Patel', rating: 5, title: 'Great for flowers', body: 'My jasmine and roses are producing more flowers than ever. This booster really works!', date: '1 month ago', verified: true },
  { name: 'Arjun Reddy', rating: 4, title: 'Good product', body: 'Decent growth booster. Noticed improvement in leaf size and color within 2 weeks.', date: '1 month ago', verified: true },
  { name: 'Sanjay Tiwari', rating: 5, title: 'Excellent!', body: 'Using for my veggie garden. Tomato and chilli production has increased significantly!', date: '2 months ago', verified: true },
  { name: 'Pooja Mehta', rating: 5, title: 'Amazing product', body: 'Gave new life to my wilting plants. Within days they started showing healthy growth again.', date: '3 months ago', verified: true },
  { name: 'Ravi Chauhan', rating: 5, title: 'Superb!', body: 'My mango tree started flowering after I applied this booster. Incredible organic formula!', date: '4 months ago', verified: true },
];

const defaultReviews = [
  { name: 'Neha Agarwal', rating: 5, title: 'Great product!', body: 'Excellent quality and well-packaged. Exactly as described. Very happy with my purchase!', date: '3 days ago', verified: true },
  { name: 'Amit Saxena', rating: 5, title: 'Highly recommend', body: 'Top-notch quality from Bgiya Bliss. Fast delivery and product exceeded expectations.', date: '1 week ago', verified: true },
  { name: 'Divya Rao', rating: 4, title: 'Good purchase', body: 'Nice quality product. Well-packed and delivered quickly. Satisfied with the purchase.', date: '1 week ago', verified: true },
  { name: 'Kiran Bhat', rating: 5, title: 'Love it!', body: 'Been using Bgiya Bliss products for my garden. Never disappointed. Best quality always!', date: '2 weeks ago', verified: true },
  { name: 'Nisha Kapoor', rating: 5, title: 'Excellent!', body: 'Great value for money. Quality is premium and my garden plants are very happy.', date: '2 weeks ago', verified: true },
  { name: 'Pallavi Deshmukh', rating: 4, title: 'Good quality', body: 'Nice product, well-packaged. Does exactly what it claims. Would buy again.', date: '3 weeks ago', verified: true },
  { name: 'Suresh Yadav', rating: 5, title: 'Perfect!', body: 'Exactly what I needed for my home garden. Great quality at a reasonable price.', date: '1 month ago', verified: true },
  { name: 'Gaurav Chandra', rating: 5, title: 'Very satisfied', body: 'Bgiya Bliss never disappoints. This product is fantastic for gardening enthusiasts!', date: '1 month ago', verified: true },
  { name: 'Tanvi Shah', rating: 5, title: 'Worth every rupee', body: 'Premium quality product. My plants are much healthier since I started using this. Recommended!', date: '2 months ago', verified: true },
  { name: 'Nikhil More', rating: 4, title: 'Good product', body: 'Nice quality and fast delivery. Using for my terrace garden with good results.', date: '2 months ago', verified: true },
  { name: 'Lakshmi Iyer', rating: 5, title: 'Superb!', body: 'One of the best gardening products I have bought. Quality is consistent and excellent.', date: '3 months ago', verified: true },
  { name: 'Rajesh Pillai', rating: 5, title: 'Great buy!', body: 'Happy with the purchase. Good quality, fair pricing, and prompt delivery. Five stars!', date: '4 months ago', verified: true },
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
  if (name.includes('booster') || name.includes('growth')) {
    return boosterReviews;
  }
  return defaultReviews;
}
