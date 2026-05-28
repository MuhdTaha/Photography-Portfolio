import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from '../lib/sanity';

const builder = createImageUrlBuilder(client);

type BuilderSource = Parameters<typeof builder.image>[0];

export type SanityImageSource = BuilderSource;

type LegacyCloudinaryImageSource = {
  _type?: 'cloudinary.asset';
  public_id?: string;
  secure_url?: string;
  url?: string;
};

type ImageFormat = 'avif' | 'webp';

type ResponsiveImageOptions = {
  widths?: number[];
  sizes?: string;
  quality?: number | 'auto';
  fit?: 'clip' | 'crop' | 'fill' | 'max' | 'scale';
};

const defaultWidths = [480, 720, 960, 1280, 1600, 2000];

const isLegacyCloudinaryImage = (source: BuilderSource | LegacyCloudinaryImageSource): source is LegacyCloudinaryImageSource => {
  return Boolean(source && typeof source === 'object' && 'public_id' in source);
};

const getCloudinaryCloudName = () => import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME as string | undefined;

const buildLegacyCloudinaryUrl = (
  source: LegacyCloudinaryImageSource,
  options: { width?: number; format?: ImageFormat | 'auto'; quality?: number | 'auto'; fit?: NonNullable<ResponsiveImageOptions['fit']> },
) => {
  const cloudName = getCloudinaryCloudName();

  if (!cloudName || !source.public_id) {
    return source.secure_url ?? source.url ?? '';
  }

  const transforms = [
    options.format === 'auto' ? 'f_auto' : `f_${options.format}`,
    options.quality === 'auto' ? 'q_auto' : `q_${options.quality ?? 80}`,
    'dpr_auto',
  ];

  if (options.width) {
    transforms.push(`w_${options.width}`);
  }

  if (options.fit && options.fit !== 'max') {
    transforms.push(`c_${options.fit}`);
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms.join(',')}/${source.public_id}`;
};

const buildSrcSet = (
  source: BuilderSource | LegacyCloudinaryImageSource,
  format: ImageFormat,
  widths: number[],
  quality: number | 'auto',
  fit: NonNullable<ResponsiveImageOptions['fit']>,
) => {
  return widths
    .map((width) => `${getImageUrl(source, { width, format, quality, fit })} ${width}w`)
    .join(', ');
};

export function getImageUrl(
  source: BuilderSource | LegacyCloudinaryImageSource,
  options: { width?: number; format?: ImageFormat | 'auto'; quality?: number | 'auto'; fit?: ResponsiveImageOptions['fit'] } = {},
) {
  if (isLegacyCloudinaryImage(source)) {
    return buildLegacyCloudinaryUrl(source, {
      width: options.width,
      format: options.format,
      quality: options.quality,
      fit: options.fit ?? 'max',
    });
  }

  const image = builder.image(source);

  if (options.width) {
    image.width(options.width);
  }

  if (options.fit) {
    image.fit(options.fit);
  }

  if (options.format === 'auto') {
    image.auto('format');
  } else if (options.format) {
    image.format(options.format);
  }

  if (options.quality !== undefined) {
    image.quality(options.quality);
  }

  return image.url();
}

export function getResponsiveImage(source: BuilderSource | LegacyCloudinaryImageSource, options: ResponsiveImageOptions = {}) {
  const widths = options.widths ?? defaultWidths;
  const quality = options.quality ?? 80;
  const fit = options.fit ?? 'max';

  return {
    avifSrcSet: buildSrcSet(source, 'avif', widths, quality, fit),
    webpSrcSet: buildSrcSet(source, 'webp', widths, quality, fit),
    src: getImageUrl(source, { width: widths[widths.length - 1], quality, fit, format: 'auto' }),
    sizes: options.sizes ?? '100vw',
  };
}
