export interface DesignTypes {
  image?: string;
  title: string;
  titleColor: string;
  bio: string;
  colorType: "solid" | "gradient" | string;
  monoColor?: string;
  colorOne?: string;
  colorTwo?: string;
  colorDirection?:
    | "to top"
    | "to top right"
    | "to right"
    | "to bottom right"
    | "to bottom"
    | "to bottom left"
    | "to left"
    | "to top left"
    | string;
}

export interface UrlTypes {
  name: "facebook" | "twitter" | "instagram" | "github" | "tiktok" | string;
  url: string;
  description: string;
  displayIcon: boolean;
  disabled: boolean;
  views: number;
}

export interface DataType {
  id: string;
  link: string;
  views: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  design: DesignTypes;
}
