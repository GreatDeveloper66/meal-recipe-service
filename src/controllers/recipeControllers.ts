interface RecipeResponse {
    id: string;
    title: string;
    servings: number;
    prepTime: number;
    cookTime: number;
    description: string;
    ingredients: string[];
    directions: string[];
}

interface FoodItem {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    quantity?: string;
}

interface RecipeRequest {
    id: string;
    name: "breakfast" | "lunch" | "dinner";
    foods: FoodItem[];
}

export const getRecipe = async (payload: RecipeRequest): Promise<RecipeResponse> => {
    return {}
}

