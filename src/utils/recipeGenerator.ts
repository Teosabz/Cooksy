import { Ingredient, Recipe } from '../data/mockData';

// Recipe templates based on ingredient combinations
const recipeTemplates = [
  {
    name: "Savory Stir-Fry",
    cookTime: "15 mins",
    description: "A quick and delicious stir-fry featuring your fresh ingredients",
    baseIngredients: ["protein", "vegetables"],
    instructions: [
      "Heat oil in a large pan or wok over high heat",
      "Add protein and cook until nearly done",
      "Add harder vegetables first, then softer ones",
      "Season with salt, pepper, and your choice of sauce",
      "Stir-fry for 2-3 minutes until vegetables are tender-crisp",
      "Serve immediately over rice or noodles"
    ],
    tags: ["Quick", "Healthy", "One-Pan"]
  },
  {
    name: "Fresh Garden Salad",
    cookTime: "10 mins",
    description: "A vibrant salad showcasing the best of your fresh ingredients",
    baseIngredients: ["vegetables", "greens"],
    instructions: [
      "Wash and prepare all vegetables",
      "Chop vegetables into bite-sized pieces",
      "Arrange greens in a large bowl",
      "Add prepared vegetables on top",
      "Drizzle with olive oil and vinegar",
      "Season with salt and pepper to taste",
      "Toss gently and serve immediately"
    ],
    tags: ["Healthy", "Fresh", "No-Cook"]
  },
  {
    name: "Hearty Soup",
    cookTime: "30 mins",
    description: "A comforting soup made with your available ingredients",
    baseIngredients: ["vegetables", "herbs"],
    instructions: [
      "Heat oil in a large pot over medium heat",
      "Sauté onions and garlic until fragrant",
      "Add harder vegetables and cook for 5 minutes",
      "Pour in broth or water to cover vegetables",
      "Bring to a boil, then simmer for 20 minutes",
      "Add softer vegetables and herbs in the last 5 minutes",
      "Season with salt and pepper to taste"
    ],
    tags: ["Comfort", "Healthy", "One-Pot"]
  },
  {
    name: "Pasta Primavera",
    cookTime: "20 mins",
    description: "A colorful pasta dish highlighting your fresh vegetables",
    baseIngredients: ["vegetables", "herbs"],
    instructions: [
      "Cook pasta according to package directions",
      "Heat olive oil in a large pan",
      "Sauté garlic until fragrant",
      "Add vegetables in order of cooking time needed",
      "Cook until vegetables are tender",
      "Drain pasta and add to the pan",
      "Toss with vegetables and fresh herbs",
      "Serve with grated cheese if desired"
    ],
    tags: ["Vegetarian", "Colorful", "Italian"]
  },
  {
    name: "Protein Bowl",
    cookTime: "25 mins",
    description: "A nutritious bowl combining protein with your selected ingredients",
    baseIngredients: ["protein", "vegetables"],
    instructions: [
      "Season and cook protein according to type",
      "Prepare vegetables by roasting or steaming",
      "Cook grains or prepare base as desired",
      "Arrange all components in a bowl",
      "Drizzle with sauce or dressing",
      "Garnish with fresh herbs or nuts",
      "Serve warm or at room temperature"
    ],
    tags: ["Healthy", "Balanced", "Customizable"]
  }
];

const cuisineVariations = [
  { name: "Mediterranean", spices: ["oregano", "basil", "garlic"], sauce: "olive oil and lemon" },
  { name: "Asian", spices: ["ginger", "soy sauce", "sesame"], sauce: "soy-ginger glaze" },
  { name: "Mexican", spices: ["cumin", "paprika", "lime"], sauce: "lime-cilantro dressing" },
  { name: "Italian", spices: ["basil", "oregano", "garlic"], sauce: "herb oil" },
  { name: "Indian", spices: ["turmeric", "cumin", "coriander"], sauce: "spiced yogurt" }
];

export function generateRecipeFromIngredients(selectedIngredients: Ingredient[]): Recipe {
  if (selectedIngredients.length === 0) {
    throw new Error("No ingredients selected");
  }

  // Categorize ingredients
  const proteins = selectedIngredients.filter(ing => 
    ['chicken', 'beef', 'fish', 'tofu', 'eggs', 'beans'].some(p => 
      ing.name.toLowerCase().includes(p)
    )
  );
  
  const vegetables = selectedIngredients.filter(ing => 
    ing.category === 'Vegetables' || ing.category === 'Produce'
  );
  
  const grains = selectedIngredients.filter(ing => 
    ['rice', 'pasta', 'quinoa', 'bread'].some(g => 
      ing.name.toLowerCase().includes(g)
    )
  );

  // Select appropriate template
  let template;
  if (proteins.length > 0 && vegetables.length > 0) {
    template = recipeTemplates[Math.random() > 0.5 ? 0 : 4]; // Stir-fry or Protein Bowl
  } else if (vegetables.length >= 3) {
    template = recipeTemplates[Math.random() > 0.5 ? 1 : 2]; // Salad or Soup
  } else if (grains.length > 0 && vegetables.length > 0) {
    template = recipeTemplates[3]; // Pasta
  } else {
    template = recipeTemplates[Math.floor(Math.random() * recipeTemplates.length)];
  }

  // Select cuisine variation
  const cuisine = cuisineVariations[Math.floor(Math.random() * cuisineVariations.length)];

  // Generate recipe name
  const recipeName = `${cuisine.name} ${template.name}`;

  // Create ingredient list with quantities
  const recipeIngredients = selectedIngredients.map(ing => {
    const quantities = ["1 cup", "2 cups", "3-4", "1 lb", "2 tbsp", "1/2 cup", "1 medium", "2 large"];
    return `${quantities[Math.floor(Math.random() * quantities.length)]} ${ing.name}`;
  });

  // Add basic seasonings
  recipeIngredients.push("Salt and pepper to taste");
  recipeIngredients.push(`${cuisine.sauce}`);

  // Calculate nutrition (simplified)
  const baseCalories = selectedIngredients.reduce((total, ing) => {
    const calorieMap: Record<string, number> = {
      'Proteins': 150,
      'Vegetables': 25,
      'Fruits': 60,
      'Dairy': 100,
      'Grains': 130,
      'Produce': 30
    };
    return total + (calorieMap[ing.category] || 50);
  }, 0);

  const nutrition = {
    calories: Math.round(baseCalories + Math.random() * 100),
    protein: Math.round(15 + Math.random() * 20),
    carbs: Math.round(20 + Math.random() * 30),
    fat: Math.round(8 + Math.random() * 15),
    fiber: Math.round(3 + Math.random() * 8),
    sugar: Math.round(2 + Math.random() * 10),
    sodium: Math.round(300 + Math.random() * 500)
  };

  // Enhance instructions with selected ingredients
  const enhancedInstructions = template.instructions.map(instruction => {
    if (instruction.includes("vegetables") && vegetables.length > 0) {
      const vegNames = vegetables.map(v => v.name.toLowerCase()).join(", ");
      return instruction.replace("vegetables", `${vegNames}`);
    }
    if (instruction.includes("protein") && proteins.length > 0) {
      const proteinName = proteins[0].name.toLowerCase();
      return instruction.replace("protein", proteinName);
    }
    return instruction;
  });

  return {
    id: `generated-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: recipeName,
    description: `${template.description} with a ${cuisine.name.toLowerCase()} twist`,
    cookTime: template.cookTime,
    prepTime: "10 mins",
    servings: 2 + Math.floor(Math.random() * 3),
    difficulty: Math.random() > 0.7 ? "Medium" : "Easy",
    cuisine: cuisine.name,
    tags: [...template.tags, cuisine.name],
    ingredients: recipeIngredients,
    instructions: enhancedInstructions,
    nutrition,
    rating: Math.round((4 + Math.random()) * 10) / 10, // 4.0 - 5.0 rating
    reviews: Math.floor(Math.random() * 500) + 50
  };
}

export function generateMultipleRecipes(selectedIngredients: Ingredient[], count: number = 3): Recipe[] {
  if (selectedIngredients.length === 0) return [];
  
  const recipes: Recipe[] = [];
  const usedTemplates = new Set<number>();
  
  for (let i = 0; i < Math.min(count, 5); i++) {
    try {
      // Ensure variety by not repeating templates too quickly
      const availableTemplates = recipeTemplates.filter((_, index) => 
        !usedTemplates.has(index) || usedTemplates.size >= recipeTemplates.length
      );
      
      if (usedTemplates.size >= recipeTemplates.length) {
        usedTemplates.clear();
      }
      
      const recipe = generateRecipeFromIngredients(selectedIngredients);
      
      // Avoid duplicate names
      if (!recipes.some(r => r.title === recipe.title)) {
        recipes.push(recipe);
        // Track which template was used (simplified approach)
        usedTemplates.add(i % recipeTemplates.length);
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
    }
  }
  
  return recipes;
}