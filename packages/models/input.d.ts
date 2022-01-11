/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run `yarn generate` to regenerate this file.
 */
export interface BreedsInput {
  adaptability?: number;
  affection_level?: number;
  alt_names?: string;
  child_friendly?: number;
  country_code?: string;
  country_codes?: string;
  description?: string;
  dog_friendly?: number;
  energy_level?: number;
  experimental?: number;
  grooming?: number;
  hairless?: number;
  health_issues?: number;
  hypoallergenic?: number;
  id?: string;
  indoor?: number;
  intelligence?: number;
  life_span?: string;
  name?: string;
  natural?: number;
  origin?: string;
  rare?: number;
  reference_image_id?: string;
  rex?: number;
  shedding_level?: number;
  short_legs?: number;
  social_needs?: number;
  stranger_friendly?: number;
  suppressed_tail?: number;
  temperament?: string;
  vetstreet_url?: string;
  vocalisation?: number;
  wikipedia_url?: string;
}
export interface WEIGHTInput {
  imperial?: string;
  metric?: string;
}
export interface IMAGEInput {
  height?: number;
  id?: string;
  url?: string;
  width?: number;
}
export interface NFTInput {
  nftId?: string;
  status?: "pending" | "fail" | "success";
}
