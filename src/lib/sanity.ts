import { sanityClient } from "sanity:client";
import { ALL_PHOTOS_QUERY } from '../utils/queries';

export const client = sanityClient;

export async function getPhotos() {
  return await sanityClient.fetch(ALL_PHOTOS_QUERY);
}