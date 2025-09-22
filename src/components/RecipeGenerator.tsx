import React, { useState } from 'react';
import { Wand2, Loader2, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { RecipeCard } from './RecipeCard';
import { Ingredient, Recipe, mockRecipes } from '../data/mockData';

interface RecipeGeneratorProps {
  selectedIngredients: Ingredient[];
  onAddToMealPlan: (recipe: Recipe) => void;
}

export function RecipeGenerator({ selectedIngredients, onAddToMealPlan }: RecipeGeneratorProps) {
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock AI recipe generation
  const generateRecipes = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Filter recipes based on selected ingredients
    const compatibleRecipes = mockRecipes.filter(recipe => {
      const recipeIngredientIds = recipe.ingredients.map(ing => ing.ingredient.id);
      const selectedIngredientIds = selectedIngredients.map(ing => ing.id);
      
      // Recipe is compatible if it uses at least 2 of the selected ingredients
      const sharedIngredients = recipeIngredientIds.filter(id => 
        selectedIngredientIds.includes(id)
      );
      
      return sharedIngredients.length >= Math.min(2, selectedIngredients.length);
    });
    
    // If no compatible recipes, show some popular ones
    const recipesToShow = compatibleRecipes.length > 0 
      ? compatibleRecipes 
      : mockRecipes.slice(0, 3);
    
    setGeneratedRecipes(recipesToShow);
    setIsGenerating(false);
  };

  const canGenerate = selectedIngredients.length > 0;

  return (
    <Card className="glass-card shadow-2xl smooth-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 transition-all duration-300">
          <Wand2 className="w-5 h-5 text-orange-500 animate-glow" />
          AI Recipe Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedIngredients.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Wand2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Select some ingredients to generate personalized recipes!</p>
          </div>
        ) : (
          <>
            {/* Selected Ingredients Summary */}
            <div className="glass-subtle rounded-xl p-4 smooth-hover">
              <h4 className="mb-2 font-medium">Cooking with:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedIngredients.map((ingredient) => (
                  <span key={ingredient.id} className="text-sm glass-card px-3 py-1 rounded-full smooth-hover transition-all duration-200">
                    {ingredient.emoji} {ingredient.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generateRecipes}
              disabled={!canGenerate || isGenerating}
              className="w-full bg-orange-500 hover:bg-orange-600 smooth-hover smooth-focus animate-glow"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Recipes...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate AI Recipes
                </>
              )}
            </Button>

            {/* Generated Recipes */}
            {generatedRecipes.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4>✨ Generated Recipes</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateRecipes}
                    disabled={isGenerating}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {generatedRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onAddToMealPlan={onAddToMealPlan}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}