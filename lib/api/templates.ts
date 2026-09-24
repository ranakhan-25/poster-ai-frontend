import { apiClient } from "./client";

export interface Template {
  _id: string;
  title: string;
  titleBn: string;
  occasionType: string;
  thumbnailUrl: string;

  layoutConfig: {
    layout: string;
    backgroundTheme: string;
    headlinePosition: string;
    photoArrangement: string;
    accentColor: string;
    secondaryColor: string;
    decorations: string[];
  };

  colors: {
    background?: string;
    text?: string;
    muted?: string;
  };

  photoSlots: {
    min?: number;
    max?: number;
  };

  headlineConfig: {
    defaultText?: string;
    fontSize?: number;
  };

  footerConfig: {
    label?: string;
  };

  isActive: boolean;
  createdAt: string;
}

export interface TemplateResponse {
  templates: Template[];
}

export interface SingleTemplateResponse {
  template: Template;
}

export const templatesApi = {
  /**
   * Get all active templates.
   * Optionally filter by occasion type.
   */
  list: (occasionType?: string) => {
    const query = occasionType
      ? `?occasionType=${encodeURIComponent(occasionType)}`
      : "";

    return apiClient.get<TemplateResponse>(`/templates${query}`);
  },

  /**
   * Get a single template by ID.
   */
  getById: (id: string) => {
    return apiClient.get<SingleTemplateResponse>(
      `/templates/${encodeURIComponent(id)}`,
    );
  },
};
