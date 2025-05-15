export interface Review {
  id: string;
  content: string;
  author: string;
  created_at: string | Date;
  author_details: {
    avatar_path: string | null;
    name: string;
    rating: number;
    username: string;
  };
}

export type PersonalReview =
  | {
      id: number;
      userId: string;
      mediaType: string;
      movieId: number;
      review: string;
      rate: number;
      createdAt: Date | null;
    }
  | undefined;
