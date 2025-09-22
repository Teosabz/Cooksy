// Mock data for Cooksy app

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  emoji: string;
  nutritionPer100g: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: { ingredient: Ingredient; amount: string }[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  image: string;
  tags: string[];
}

export interface MealPlan {
  id: string;
  day: string;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe?: Recipe;
}

export const mockIngredients: Ingredient[] = [
  {
    id: 'tomato',
    name: 'Tomato',
    category: 'Vegetables',
    emoji: '🍅',
    nutritionPer100g: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2 }
  },
  {
    id: 'chicken-breast',
    name: 'Chicken Breast',
    category: 'Protein',
    emoji: '🐔',
    nutritionPer100g: { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 }
  },
  {
    id: 'rice',
    name: 'Rice',
    category: 'Grains',
    emoji: '🍚',
    nutritionPer100g: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 }
  },
  {
    id: 'onion',
    name: 'Onion',
    category: 'Vegetables',
    emoji: '🧅',
    nutritionPer100g: { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7 }
  },
  {
    id: 'garlic',
    name: 'Garlic',
    category: 'Vegetables',
    emoji: '🧄',
    nutritionPer100g: { calories: 149, protein: 6.4, carbs: 33, fat: 0.5, fiber: 2.1 }
  },
  {
    id: 'olive-oil',
    name: 'Olive Oil',
    category: 'Oils',
    emoji: '🫒',
    nutritionPer100g: { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 }
  },
  {
    id: 'spinach',
    name: 'Spinach',
    category: 'Vegetables',
    emoji: '🥬',
    nutritionPer100g: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 }
  },
  {
    id: 'pasta',
    name: 'Pasta',
    category: 'Grains',
    emoji: '🍝',
    nutritionPer100g: { calories: 371, protein: 13, carbs: 74, fat: 1.5, fiber: 3.2 }
  },
  {
    id: 'cheese',
    name: 'Cheese',
    category: 'Dairy',
    emoji: '🧀',
    nutritionPer100g: { calories: 402, protein: 25, carbs: 1.3, fat: 33, fiber: 0 }
  },
  {
    id: 'eggs',
    name: 'Eggs',
    category: 'Protein',
    emoji: '🥚',
    nutritionPer100g: { calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0 }
  },
  {
    id: 'bell-pepper',
    name: 'Bell Pepper',
    category: 'Vegetables',
    emoji: '🫑',
    nutritionPer100g: { calories: 31, protein: 1, carbs: 7, fat: 0.3, fiber: 2.5 }
  },
  {
    id: 'mushrooms',
    name: 'Mushrooms',
    category: 'Vegetables',
    emoji: '🍄',
    nutritionPer100g: { calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, fiber: 1 }
  },
  {
    id: 'lemon',
    name: 'Lemon',
    category: 'Fruits',
    emoji: '🍋',
    nutritionPer100g: { calories: 29, protein: 1.1, carbs: 9, fat: 0.3, fiber: 2.8 }
  },
  {
    id: 'basil',
    name: 'Basil',
    category: 'Herbs',
    emoji: '🌿',
    nutritionPer100g: { calories: 22, protein: 3.2, carbs: 2.6, fat: 0.6, fiber: 1.6 }
  },
  {
    id: 'salmon',
    name: 'Salmon',
    category: 'Protein',
    emoji: '🐟',
    nutritionPer100g: { calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0 }
  },
  {
    id: 'avocado',
    name: 'Avocado',
    category: 'Fruits',
    emoji: '🥑',
    nutritionPer100g: { calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7 }
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    category: 'Vegetables',
    emoji: '🥦',
    nutritionPer100g: { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6 }
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato',
    category: 'Vegetables',
    emoji: '🍠',
    nutritionPer100g: { calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3 }
  },
  {
    id: 'black-beans',
    name: 'Black Beans',
    category: 'Legumes',
    emoji: '🫘',
    nutritionPer100g: { calories: 132, protein: 8.9, carbs: 23, fat: 0.5, fiber: 8.7 }
  },
  {
    id: 'quinoa',
    name: 'Quinoa',
    category: 'Grains',
    emoji: '🌾',
    nutritionPer100g: { calories: 368, protein: 14, carbs: 64, fat: 6, fiber: 7 }
  }
];

export const mockRecipes: Recipe[] = [
  {
    id: 'chicken-tomato-pasta',
    title: 'Creamy Chicken Tomato Pasta',
    description: 'A delicious pasta dish with tender chicken, fresh tomatoes, and a creamy sauce.',
    cookTime: 25,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      { ingredient: mockIngredients.find(i => i.id === 'pasta')!, amount: '400g' },
      { ingredient: mockIngredients.find(i => i.id === 'chicken-breast')!, amount: '500g' },
      { ingredient: mockIngredients.find(i => i.id === 'tomato')!, amount: '3 large' },
      { ingredient: mockIngredients.find(i => i.id === 'onion')!, amount: '1 medium' },
      { ingredient: mockIngredients.find(i => i.id === 'garlic')!, amount: '3 cloves' },
      { ingredient: mockIngredients.find(i => i.id === 'olive-oil')!, amount: '2 tbsp' }
    ],
    instructions: [
      'Boil salted water in a large pot and cook pasta according to package directions.',
      'Cut chicken breast into bite-sized pieces and season with salt and pepper.',
      'Heat olive oil in a large skillet over medium-high heat.',
      'Cook chicken pieces until golden brown and cooked through, about 6-8 minutes.',
      'Add diced onion and cook until softened, about 3 minutes.',
      'Add minced garlic and cook for another minute.',
      'Add diced tomatoes and cook until they start to break down, about 5 minutes.',
      'Drain pasta and add to the skillet with chicken and tomatoes.',
      'Toss everything together and serve hot.'
    ],
    nutrition: { calories: 485, protein: 35, carbs: 55, fat: 12, fiber: 4 },
    image: 'pasta chicken tomato',
    tags: ['Italian', 'Comfort Food', 'High Protein']
  },
  {
    id: 'salmon-quinoa-bowl',
    title: 'Grilled Salmon Quinoa Bowl',
    description: 'Healthy bowl with grilled salmon, fluffy quinoa, and fresh vegetables.',
    cookTime: 20,
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      { ingredient: mockIngredients.find(i => i.id === 'salmon')!, amount: '300g' },
      { ingredient: mockIngredients.find(i => i.id === 'quinoa')!, amount: '1 cup' },
      { ingredient: mockIngredients.find(i => i.id === 'avocado')!, amount: '1 large' },
      { ingredient: mockIngredients.find(i => i.id === 'broccoli')!, amount: '200g' },
      { ingredient: mockIngredients.find(i => i.id === 'lemon')!, amount: '1 whole' }
    ],
    instructions: [
      'Rinse quinoa and cook in 2 cups of water until fluffy, about 15 minutes.',
      'Season salmon fillets with salt, pepper, and lemon juice.',
      'Heat a grill pan or skillet over medium-high heat.',
      'Cook salmon for 4-5 minutes per side until cooked through.',
      'Steam broccoli until tender-crisp, about 5 minutes.',
      'Slice avocado and prepare lemon wedges.',
      'Divide quinoa between bowls and top with salmon, broccoli, and avocado.',
      'Serve with lemon wedges and enjoy!'
    ],
    nutrition: { calories: 520, protein: 32, carbs: 45, fat: 22, fiber: 8 },
    image: 'salmon quinoa bowl',
    tags: ['Healthy', 'High Protein', 'Gluten-Free']
  },
  {
    id: 'veggie-stir-fry',
    title: 'Colorful Vegetable Stir Fry',
    description: 'A vibrant mix of fresh vegetables stir-fried to perfection.',
    cookTime: 15,
    servings: 3,
    difficulty: 'Easy',
    ingredients: [
      { ingredient: mockIngredients.find(i => i.id === 'bell-pepper')!, amount: '2 large' },
      { ingredient: mockIngredients.find(i => i.id === 'broccoli')!, amount: '300g' },
      { ingredient: mockIngredients.find(i => i.id === 'mushrooms')!, amount: '200g' },
      { ingredient: mockIngredients.find(i => i.id === 'onion')!, amount: '1 medium' },
      { ingredient: mockIngredients.find(i => i.id === 'garlic')!, amount: '3 cloves' },
      { ingredient: mockIngredients.find(i => i.id === 'rice')!, amount: '1.5 cups' }
    ],
    instructions: [
      'Cook rice according to package directions.',
      'Cut all vegetables into bite-sized pieces.',
      'Heat oil in a large wok or skillet over high heat.',
      'Add onion and garlic, stir-fry for 1 minute.',
      'Add broccoli and bell peppers, stir-fry for 3 minutes.',
      'Add mushrooms and continue cooking for 2 minutes.',
      'Season with soy sauce, salt, and pepper.',
      'Serve hot over steamed rice.'
    ],
    nutrition: { calories: 280, protein: 8, carbs: 58, fat: 3, fiber: 6 },
    image: 'vegetable stir fry',
    tags: ['Vegetarian', 'Quick', 'Healthy']
  },
  {
    id: 'spinach-egg-scramble',
    title: 'Spinach and Cheese Scramble',
    description: 'Fluffy scrambled eggs with fresh spinach and melted cheese.',
    cookTime: 10,
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      { ingredient: mockIngredients.find(i => i.id === 'eggs')!, amount: '6 large' },
      { ingredient: mockIngredients.find(i => i.id === 'spinach')!, amount: '100g' },
      { ingredient: mockIngredients.find(i => i.id === 'cheese')!, amount: '50g' },
      { ingredient: mockIngredients.find(i => i.id === 'onion')!, amount: '0.5 medium' },
      { ingredient: mockIngredients.find(i => i.id === 'olive-oil')!, amount: '1 tbsp' }
    ],
    instructions: [
      'Beat eggs in a bowl with salt and pepper.',
      'Heat olive oil in a non-stick pan over medium heat.',
      'Add diced onion and cook until softened.',
      'Add spinach and cook until wilted.',
      'Pour in beaten eggs and gently scramble.',
      'Add cheese in the last minute of cooking.',
      'Serve immediately while hot.'
    ],
    nutrition: { calories: 320, protein: 24, carbs: 4, fat: 23, fiber: 2 },
    image: 'spinach eggs scramble',
    tags: ['Breakfast', 'High Protein', 'Quick']
  },
  {
    id: 'sweet-potato-black-bean-bowl',
    title: 'Sweet Potato & Black Bean Bowl',
    description: 'Nutritious bowl with roasted sweet potatoes, seasoned black beans, and fresh toppings.',
    cookTime: 35,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      { ingredient: mockIngredients.find(i => i.id === 'sweet-potato')!, amount: '2 large' },
      { ingredient: mockIngredients.find(i => i.id === 'black-beans')!, amount: '400g can' },
      { ingredient: mockIngredients.find(i => i.id === 'avocado')!, amount: '2 medium' },
      { ingredient: mockIngredients.find(i => i.id === 'bell-pepper')!, amount: '1 large' },
      { ingredient: mockIngredients.find(i => i.id === 'onion')!, amount: '1 medium' },
      { ingredient: mockIngredients.find(i => i.id === 'garlic')!, amount: '2 cloves' }
    ],
    instructions: [
      'Preheat oven to 425°F (220°C).',
      'Cube sweet potatoes and toss with olive oil, salt, and pepper.',
      'Roast sweet potatoes for 25-30 minutes until tender.',
      'Sauté diced onion and bell pepper until softened.',
      'Add garlic and black beans, cook until heated through.',
      'Season beans with cumin, paprika, salt, and pepper.',
      'Slice avocado just before serving.',
      'Assemble bowls with sweet potatoes, beans, and avocado.'
    ],
    nutrition: { calories: 385, protein: 12, carbs: 68, fat: 10, fiber: 15 },
    image: 'sweet potato black bean bowl',
    tags: ['Vegan', 'High Fiber', 'Meal Prep']
  }
];

export const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

export const mockMealPlan: MealPlan[] = [
  { id: '1', day: 'Monday', meal: 'breakfast', recipe: mockRecipes[3] },
  { id: '2', day: 'Monday', meal: 'lunch', recipe: mockRecipes[2] },
  { id: '3', day: 'Monday', meal: 'dinner', recipe: mockRecipes[0] },
  { id: '4', day: 'Tuesday', meal: 'breakfast', recipe: mockRecipes[3] },
  { id: '5', day: 'Tuesday', meal: 'dinner', recipe: mockRecipes[1] },
  { id: '6', day: 'Wednesday', meal: 'lunch', recipe: mockRecipes[4] },
  { id: '7', day: 'Thursday', meal: 'dinner', recipe: mockRecipes[0] },
  { id: '8', day: 'Friday', meal: 'breakfast', recipe: mockRecipes[3] },
  { id: '9', day: 'Friday', meal: 'lunch', recipe: mockRecipes[2] },
  { id: '10', day: 'Saturday', meal: 'dinner', recipe: mockRecipes[1] },
  { id: '11', day: 'Sunday', meal: 'lunch', recipe: mockRecipes[4] }
];