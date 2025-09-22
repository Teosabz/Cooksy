import React from 'react';
import { Clock, Users, ChefHat, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Recipe } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RecipeCardProps {
  recipe: Recipe;
  onAddToMealPlan?: (recipe: Recipe) => void;
  onViewDetails?: (recipe: Recipe) => void;
  imageUrl?: string;
}

const recipeImages: Record<string, string> = {
  'chicken-tomato-pasta': 'https://images.unsplash.com/photo-1593536748623-e7f2614e3b17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNoaWNrZW4lMjB0b21hdG98ZW58MXx8fHwxNzU4NTI4NjI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'salmon-quinoa-bowl': 'https://images.unsplash.com/photo-1732759959723-27f1ba1d1fa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBxdWlub2ElMjBib3dsfGVufDF8fHx8MTc1ODQ2MzgxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'veggie-stir-fry': 'https://images.unsplash.com/photo-1464500650248-1a4b45debb9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBzdGlyJTIwZnJ5fGVufDF8fHx8MTc1ODQ3NTkyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'spinach-egg-scramble': 'https://images.unsplash.com/photo-1744342245902-851a63b2edb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGluYWNoJTIwZWdncyUyMHNjcmFtYmxlfGVufDF8fHx8MTc1ODUyODYzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'sweet-potato-black-bean-bowl': 'https://images.unsplash.com/photo-1654220690928-8d87a49c87ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VldCUyMHBvdGF0byUyMGJsYWNrJTIwYmVhbiUyMGJvd2x8ZW58MXx8fHwxNzU4NTI4NjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
};

export function RecipeCard({ recipe, onAddToMealPlan, onViewDetails }: RecipeCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="group glass-card hover:shadow-2xl transition-all duration-300 overflow-hidden smooth-hover animate-float">
      {/* Recipe Image */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={recipeImages[recipe.id] || ''}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2">
          <Badge className={getDifficultyColor(recipe.difficulty)}>
            {recipe.difficulty}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="line-clamp-2">{recipe.title}</h3>
        </div>
        <p className="text-muted-foreground line-clamp-2 text-sm">{recipe.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Recipe Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.cookTime}min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings}</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4" />
            <span>{recipe.nutrition.calories} cal</span>
          </div>
        </div>

        {/* Nutrition Summary */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="glass-subtle rounded-lg p-2 smooth-hover">
            <div className="font-medium">{recipe.nutrition.protein}g</div>
            <div className="text-muted-foreground">Protein</div>
          </div>
          <div className="glass-subtle rounded-lg p-2 smooth-hover">
            <div className="font-medium">{recipe.nutrition.carbs}g</div>
            <div className="text-muted-foreground">Carbs</div>
          </div>
          <div className="glass-subtle rounded-lg p-2 smooth-hover">
            <div className="font-medium">{recipe.nutrition.fat}g</div>
            <div className="text-muted-foreground">Fat</div>
          </div>
          <div className="glass-subtle rounded-lg p-2 smooth-hover">
            <div className="font-medium">{recipe.nutrition.fiber}g</div>
            <div className="text-muted-foreground">Fiber</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {onViewDetails && (
            <Button 
              variant="outline" 
              className="flex-1 smooth-hover smooth-focus transition-all duration-300"
              onClick={() => onViewDetails(recipe)}
            >
              <ChefHat className="w-4 h-4 mr-2" />
              View Recipe
            </Button>
          )}
          {onAddToMealPlan && (
            <Button 
              className="flex-1 bg-orange-500 hover:bg-orange-600 smooth-hover smooth-focus transition-all duration-300"
              onClick={() => onAddToMealPlan(recipe)}
            >
              Add to Plan
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}