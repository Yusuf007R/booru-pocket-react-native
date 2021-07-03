import {Data} from '../services/fetchImage';

export default function get_url_extension(data: Data) {
  const highQuality = data.large_file_url || data.preview_file_url;
  const lowQuality = data.preview_file_url || data.large_file_url;
  const filetype = highQuality?.split(/[#?]/)[0].split('.').pop()?.trim();
  const video = filetype === 'mp4' || filetype === 'webm';
  return {video, filetype, highQuality, lowQuality};
}
