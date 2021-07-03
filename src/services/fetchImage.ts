import {request} from '../utils/request';

export interface Data {
  id?: number;
  created_at: Date;
  uploader_id: number;
  score: number;
  source: string;
  md5?: string;
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
  file_url?: string;
  large_file_url?: string;
  preview_file_url?: string;
}

export enum FileEXT {
  Jpg = 'jpg',
  Mp4 = 'mp4',
  PNG = 'png',
}

export enum Rating {
  E = 'e',
  Q = 'q',
  S = 's',
}

type Params = {
  limit: number;
  page: number;
  tags: string;
};

const fetchImage = async (params: Params): Promise<Data[]> => {
  const urlParams = new URLSearchParams(params as any);
  try {
    const data = await request({
      method: 'get',
      url: '/posts.json',
      params: urlParams,
    });
    return data.data;
  } catch (err) {
    return err;
  }
};
export default fetchImage;
