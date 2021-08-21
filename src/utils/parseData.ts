import {Data, DataApiResponse} from '../services/danbooru.types';

export default function parseData(data: DataApiResponse[]): Data[] {
  return data
    .filter(
      elem => elem.file_url || elem.large_file_url || elem.preview_file_url,
    )
    .map((elem): Data => {
      return {
        id: elem.id,
        height: elem.image_height,
        width: elem.image_width,
        file_ext: elem.file_ext,
        highQuality: elem.large_file_url || elem.preview_file_url,
        lowQuality: elem.preview_file_url || elem.large_file_url,
        sourceQuality:
          elem.file_url || elem.large_file_url || elem.preview_file_url,
        video: elem.file_ext === 'mp4' || elem.file_ext === 'webm',
      };
    });
}
