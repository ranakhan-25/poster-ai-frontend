import { apiClient } from "./client";

export interface PosterFormData {
  templateId: string;
  headline: string;
  name: string;
  designation?: string;
  party?: string;
  organization?: string;
  district?: string;
  upazila?: string;
  footerCredit?: string;
}

export interface Poster {
  _id: string;
  userId: string;
  templateId:
    | string
    | {
        _id: string;
        title: string;
        titleBn: string;
        occasionType: string;
      };
  formData: PosterFormData;
  uploadedPhotoUrls: string[];
  generatedImageUrl?: string;
  status: "draft" | "generating" | "completed" | "failed";
  errorMessage?: string;
  generationAttempts: number;
  aiLayout?: unknown;
  aiUsedFallback: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePosterResponse {
  id: string;
  status: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface MyPostersResponse {
  posters: Poster[];
  pagination: Pagination;
}

export interface SinglePosterResponse {
  poster: Poster;
}

export interface DeletePosterResponse {
  success: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const postersApi = {
  create: async (formData: FormData) => {
    const response = await fetch(`${API_URL}/posters`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    let body: {
      success: boolean;
      data?: CreatePosterResponse;
      message?: string;
    };

    try {
      body = await response.json();
    } catch {
      throw new Error("Invalid server response");
    }

    if (!response.ok || !body.success) {
      throw new Error(body.message ?? "Failed to create poster");
    }

    return body as {
      success: true;
      data: CreatePosterResponse;
    };
  },

  listMy: (page = 1, search = "", occasionType = "") => {
    const params = new URLSearchParams();

    params.set("page", String(page));
    params.set("limit", "6");

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (occasionType.trim()) {
      params.set("occasionType", occasionType.trim());
    }

    const queryString = params.toString();

    return apiClient.get<MyPostersResponse>(`/posters/my?${queryString}`);
  },

  getById: (id: string) => {
    return apiClient.get<SinglePosterResponse>(
      `/posters/${encodeURIComponent(id)}`,
    );
  },

  regenerate: (id: string) => {
    return apiClient.post<CreatePosterResponse>(
      `/posters/${encodeURIComponent(id)}/regenerate`,
      {},
    );
  },

  delete: (id: string) => {
    return apiClient.del<DeletePosterResponse>(
      `/posters/${encodeURIComponent(id)}`,
    );
  },
};
