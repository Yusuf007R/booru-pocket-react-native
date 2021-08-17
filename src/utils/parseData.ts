import {Data, DataApiResponse} from '../services/danbooru.types';

export default function parseData(data: DataApiResponse[]): Data[] {
  return data
    .filter(
      elem => elem.file_url || elem.large_file_url || elem.preview_file_url,
    )
    .map(elem => {
      return {
        id: elem.id,
        image_height: elem.image_height,
        image_width: elem.image_width,
        file_ext: elem.file_ext,
        url: elem.large_file_url,
        highQuality: elem.large_file_url || elem.preview_file_url,
        lowQuality: elem.preview_file_url || elem.large_file_url,
        sourceQuality:
          elem.file_url || elem.large_file_url || elem.preview_file_url,
        video: elem.file_ext === 'mp4' || elem.file_ext === 'webm',
      };
    });
}
