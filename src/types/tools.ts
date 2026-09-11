export type CategoryId =
    | "all"
    | "tech"
    | "finance"
    | "energy"
    | "healthcare";

export type ToolCategory =
    | "tech"
    | "finance"
    | "energy"
    | "healthcare";

export interface Category {
    id: CategoryId;
    label: string;
}

export interface Tools {
    id: number;
    symbol: string;
    name: string;
    category: ToolCategory;
    price: string;
    change: string;
    positive: boolean;
    color: string;
}