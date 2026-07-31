const recipes = [
  {
  id: 1,
  name: "Paneer Butter Masala",
  diet: "Veg",
  cuisine: "Indian",
  taste: "Savoury",
  course: "Main Course",
  subcategory: "Curry",
  time: 40,
  difficulty: "Easy",
  image:
    "https://media.istockphoto.com/id/2221893115/photo/indian-cottage-cheese-curry-in-cream-and-cashew-nuts-gravy-directly-above-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZbQ8VTWrI1tjA59z8h4KOJDe6QNYaJ0XoAwccmtsmos=",
  youtube: "https://www.youtube.com/watch?v=bUounn_Bmy4",

  description:
    "Paneer Butter Masala is a rich and creamy North Indian curry made with soft paneer cubes cooked in a buttery tomato-based gravy flavored with aromatic spices.",

  ingredients: [
    "250g Paneer",
    "2 Tomatoes",
    "1 Onion",
    "2 tbsp Butter",
    "2 tbsp Fresh Cream",
    "1 tsp Ginger Garlic Paste",
    "1 tsp Garam Masala",
    "Salt",
    "Fresh Coriander"
  ],

  steps: [
    "Heat butter in a pan.",
    "Saute onions until golden.",
    "Add ginger garlic paste and tomatoes.",
    "Cook until soft and blend into a smooth gravy.",
    "Return gravy to the pan and add spices.",
    "Add paneer cubes and cook for 5 minutes.",
    "Stir in fresh cream.",
    "Garnish with coriander and serve hot."
  ]
},

  {
  id: 2,
  name: "Veg Fried Rice",
  diet: "Veg",
  cuisine: "Chinese",
  taste: "Savoury",
  course: "Main Course",
  subcategory: "Rice",
  time: 25,
  difficulty: "Easy",
  image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600",
  youtube: "https://www.youtube.com/watch?v=1WQVzQBNk_Q",

  description:
    "A quick and flavorful Indo-Chinese fried rice loaded with fresh vegetables and aromatic sauces.",

  ingredients: [
    "2 cups cooked rice",
    "Carrot",
    "Capsicum",
    "Beans",
    "Spring onion",
    "Soy sauce",
    "Vinegar",
    "Black pepper",
    "Oil"
  ],

  steps: [
    "Heat oil in a wok.",
    "Saute chopped vegetables on high flame.",
    "Add soy sauce and vinegar.",
    "Mix in cooked rice.",
    "Season with pepper and salt.",
    "Garnish with spring onions and serve hot."
  ]
},

  {
  id: 3,
  name: "Chicken Pasta",
  diet: "Non-Veg",
  cuisine: "Italian",
  taste: "Savoury",
  course: "Main Course",
  subcategory: "Pasta",
  time: 35,
  difficulty: "Medium",
  image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
  youtube: "https://www.youtube.com/watch?v=hh4PbBqqdCQ",

  description:
    "Creamy Italian-style chicken pasta tossed with herbs, garlic, and parmesan cheese.",

  ingredients: [
    "250g chicken",
    "200g pasta",
    "Fresh cream",
    "Garlic",
    "Butter",
    "Parmesan cheese",
    "Italian herbs",
    "Black pepper"
  ],

  steps: [
    "Boil pasta until al dente.",
    "Cook seasoned chicken until golden.",
    "Saute garlic in butter.",
    "Add cream and parmesan cheese.",
    "Mix pasta and chicken into the sauce.",
    "Season with herbs and serve."
  ]
},

  {
  id: 4,
  name: "Spring Rolls",
  diet: "Veg",
  cuisine: "Chinese",
  taste: "Savoury",
  course: "Starter",
  subcategory: "",
  time: 20,
  difficulty: "Easy",
  image: "https://images.unsplash.com/photo-1679310290259-78d9eaa32700?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3ByaW5ncm9sbHN8ZW58MHx8MHx8fDA%3D",
  youtube: "https://www.youtube.com/watch?v=-gOhyN8WJMY",

  description:
    "Crispy vegetable spring rolls filled with colorful stir-fried vegetables and served with sweet chili sauce.",

  ingredients: [
    "Spring roll sheets",
    "Cabbage",
    "Carrot",
    "Capsicum",
    "Soy sauce",
    "Cornflour slurry",
    "Oil"
  ],

  steps: [
    "Cook vegetables with soy sauce.",
    "Allow the filling to cool.",
    "Wrap the filling in spring roll sheets.",
    "Seal the edges with cornflour slurry.",
    "Deep fry until golden brown.",
    "Serve with sweet chili sauce."
  ]
},

  {
  id: 5,
  name: "Samosa",
  diet: "Veg",
  cuisine: "Indian",
  taste: "Savoury",
  course: "Snacks",
  subcategory: "",
  time: 30,
  difficulty: "Easy",
  image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600",
  youtube: "https://www.youtube.com/watch?v=snAop-1Q7EI",

  description:
    "Classic Indian snack with a crispy pastry shell stuffed with spicy potato filling.",

  ingredients: [
    "Maida",
    "Potatoes",
    "Green peas",
    "Green chilli",
    "Garam masala",
    "Cumin",
    "Oil"
  ],

  steps: [
    "Prepare the dough.",
    "Cook the potato filling with spices.",
    "Roll and cut the dough.",
    "Shape into cones and fill them.",
    "Seal the edges carefully.",
    "Deep fry until crisp and golden."
  ]
},

  {
  id: 6,
  name: "Chocolate Brownie",
  diet: "Veg",
  cuisine: "American",
  taste: "Sweet",
  course: "Dessert",
  subcategory: "",
  time: 45,
  difficulty: "Medium",
  image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600",
  youtube: "https://www.youtube.com/watch?v=tSIjSoGNrTc",

  description:
    "Rich, fudgy chocolate brownies with a crisp top and soft gooey center, perfect for dessert lovers.",

  ingredients: [
    "Dark chocolate",
    "Butter",
    "Sugar",
    "Flour",
    "Cocoa powder",
    "Eggs",
    "Vanilla essence"
  ],

  steps: [
    "Melt butter and chocolate together.",
    "Whisk eggs with sugar.",
    "Combine both mixtures.",
    "Fold in flour and cocoa powder.",
    "Pour into a baking tray.",
    "Bake at 180°C for 30–35 minutes.",
    "Cool completely before slicing."
  ]
},
];

export default recipes;