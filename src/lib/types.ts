// Existing types...

// User Profile types
export interface UserProfile {
  id: string;
  user_id: string;
  created_at: string;
  display_name: string;
  bio?: string;
  avatar_url?: string;
  location?: string;
  favorite_holiday?: string;
  social_links?: {
    instagram?: string;
    pinterest?: string;
    website?: string;
  };
  interests: string[];
  is_public: boolean;
}

export interface Connection {
  id: string;
  created_at: string;
  follower_id: string;
  following_id: string;
  status: 'pending' | 'accepted';
}

export interface SharedItem {
  id: string;
  created_at: string;
  user_id: string;
  item_type: 'recipe' | 'decor' | 'gift_idea' | 'party_theme';
  item_id: string;
  caption?: string;
  likes: number;
  comments: Comment[];
  is_public: boolean;
}

export interface Comment {
  id: string;
  created_at: string;
  user_id: string;
  content: string;
  likes: number;
}