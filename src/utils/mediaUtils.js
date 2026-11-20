/**
 * Media detection and helper utilities for Sky Square Infra dossiers.
 * Supports static images, direct video files (.mp4, .webm, .mov, etc.),
 * and streaming embeds (YouTube, Vimeo).
 */

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.m4v', '.ogv', '.3gp'];

/**
 * Returns true if the provided media URL or explicit type indicates a video.
 * @param {string} url - The media URL
 * @param {string} [type] - Optional explicit mediaType or MIME type
 * @returns {boolean}
 */
export const isVideoMedia = (url = '', type = '') => {
  if (type && (type === 'video' || type.startsWith('video/'))) {
    return true;
  }

  if (!url || typeof url !== 'string') {
    return false;
  }

  const trimmed = url.trim();

  // Strip query strings and hash anchors for extension checking
  const cleanPath = trimmed.split('?')[0].split('#')[0].toLowerCase();
  if (VIDEO_EXTENSIONS.some((ext) => cleanPath.endsWith(ext))) {
    return true;
  }

  // Check streaming / embed providers
  if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(trimmed)) {
    return true;
  }
  if (/^(https?:\/\/)?(www\.)?(vimeo\.com|player\.vimeo\.com)\//i.test(trimmed)) {
    return true;
  }

  return false;
};

/**
 * Extracts embed details for supported video platforms (YouTube, Vimeo).
 * @param {string} url
 * @returns {{ provider: 'youtube' | 'vimeo', id: string, embedUrl: string, thumbnailUrl: string | null } | null}
 */
export const getVideoEmbedInfo = (url = '') => {
  if (!url || typeof url !== 'string') return null;

  const trimmed = url.trim();

  // YouTube detection (watch?v=, embed/, shorts/, youtu.be/)
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    const id = ytMatch[1];
    return {
      provider: 'youtube',
      id,
      embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    };
  }

  // Vimeo detection
  const vimeoMatch = trimmed.match(
    /(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)([0-9]+)/i
  );
  if (vimeoMatch && vimeoMatch[1]) {
    const id = vimeoMatch[1];
    return {
      provider: 'vimeo',
      id,
      embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1`,
      thumbnailUrl: null,
    };
  }

  return null;
};

/**
 * Resolves a thumbnail for the given media item, if available.
 * @param {{ url: string, poster?: string, thumbnail?: string, type?: string }} plate
 * @returns {string | null}
 */
export const getMediaThumbnail = (plate) => {
  if (!plate) return null;
  if (plate.poster) return plate.poster;
  if (plate.thumbnail) return plate.thumbnail;

  const embed = getVideoEmbedInfo(plate.url);
  if (embed?.thumbnailUrl) return embed.thumbnailUrl;

  if (!isVideoMedia(plate.url, plate.type)) {
    return plate.url;
  }

  return null;
};
