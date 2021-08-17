export type Data = {
  id: number;
  image_width: number;
  image_height: number;
  file_ext: FileEXT;
  url: string;
  highQuality: string;
  lowQuality: string;
  sourceQuality: string;
  video: boolean;
};

export interface DataApiResponse {
  id: number;
  created_at: Date;
  uploader_id: number;
  score: number;
  source: string;
  md5: string;
  last_comment_bumped_at: Date | null;
  rating: Rating;
  image_width: number;
  image_height: number;
  tag_string: string;
  is_note_locked: boolean;
  fav_count: number;
  file_ext: FileEXT;
  last_noted_at: Date | null;
  is_rating_locked: boolean;
  parent_id: number | null;
  has_children: boolean;
  approver_id: number | null;
  tag_count_general: number;
  tag_count_artist: number;
  tag_count_character: number;
  tag_count_copyright: number;
  file_size: number;
  is_status_locked: boolean;
  pool_string: string;
  up_score: number;
  down_score: number;
  is_pending: boolean;
  is_flagged: boolean;
  is_deleted: boolean;
  tag_count: number;
  updated_at: Date;
  is_banned: boolean;
  pixiv_id: number | null;
  last_commented_at: Date | null;
  has_active_children: boolean;
  bit_flags: number;
  tag_count_meta: number;
  has_large: boolean | null;
  has_visible_children: boolean;
  tag_string_general: string;
  tag_string_character: string;
  tag_string_copyright: string;
  tag_string_artist: string;
  tag_string_meta: string;
  file_url: string;
  large_file_url: string;
  preview_file_url: string;
}

export enum FileEXT {
  Jpg = 'jpg',
  Mp4 = 'mp4',
  PNG = 'png',
  WEBM = 'webm',
}

export enum Rating {
  E = 'e',
  Q = 'q',
  S = 's',
}

export type Params = {
  limit: number;
  page: number;
  tags: string;
};

export type authType = {
  username: string;
  password: string;
};

export interface UserDanbooruType {
  id: number;
  name: string;
  level: number;
  inviter_id: null;
  created_at: Date;
  last_logged_in_at: Date;
  last_forum_read_at: Date;
  comment_threshold: number;
  updated_at: Date;
  default_image_size: string;
  favorite_tags: string;
  blacklisted_tags: string;
  time_zone: string;
  post_update_count: number;
  note_update_count: number;
  favorite_count: number;
  post_upload_count: number;
  per_page: number;
  custom_style: string;
  theme: string;
  is_banned: boolean;
  can_approve_posts: boolean;
  can_upload_free: boolean;
  level_string: string;
  has_mail: boolean;
  receive_email_notifications: boolean;
  always_resize_images: boolean;
  enable_post_navigation: boolean;
  new_post_navigation_layout: boolean;
  enable_private_favorites: boolean;
  enable_sequential_post_navigation: boolean;
  hide_deleted_posts: boolean;
  style_usernames: boolean;
  enable_auto_complete: boolean;
  show_deleted_children: boolean;
  has_saved_searches: boolean;
  disable_categorized_saved_searches: boolean;
  is_super_voter: boolean;
  disable_tagged_filenames: boolean;
  enable_recent_searches: boolean;
  disable_cropped_thumbnails: boolean;
  disable_mobile_gestures: boolean;
  enable_safe_mode: boolean;
  enable_desktop_mode: boolean;
  disable_post_tooltips: boolean;
  enable_recommended_posts: boolean;
  opt_out_tracking: boolean;
  no_flagging: boolean;
  no_feedback: boolean;
  requires_verification: boolean;
  is_verified: boolean;
  statement_timeout: number;
  favorite_group_limit: number;
  favorite_limit: number;
  tag_query_limit: number;
  max_saved_searches: number;
  wiki_page_version_count: number;
  artist_version_count: number;
  artist_commentary_version_count: number;
  pool_version_count: number;
  forum_post_count: number;
  comment_count: number;
  favorite_group_count: number;
  appeal_count: number;
  flag_count: number;
  positive_feedback_count: number;
  neutral_feedback_count: number;
  negative_feedback_count: number;
}

export interface AutoCompleteType {
  type: string;
  label: string;
  value: string;
  category: number;
  post_count: number;
  antecedent: string;
}
