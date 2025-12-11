export type PricingTier = "Free" | "Freemium" | "Paid" | "Enterprise";

export type ToolCategory =
  | "Code Assistant"
  | "Productivity"
  | "Image Generation"
  | "Writing & Copy"
  | "Research"
  | "Customer Support"
  | "Data & Analytics"
  | "Marketing"
  | "Audio & Speech"
  | "Video"
  | "Chatbot Platform"
  | "Developer Tools"
  | "Design"
  | "Career"
  | "Education";

export interface AiTool {
  id: string;
  name: string;
  slug: string;
  category: ToolCategory | string; // keep flexible for future categories
  tags: string[];
  pricing: PricingTier | string;
  shortDescription: string;
  longDescription: string;
  website: string;
  rating: number; // 0–5
  useCases: string[];
  featured: boolean;
  launchedYear: number;
}

export type SortOption = "rating" | "name";

export interface ToolFilterState {
  search: string;
  category: "all" | ToolCategory | string;
  pricing: "all" | PricingTier | string;
  sortBy: SortOption;
} 
