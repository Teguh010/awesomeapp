export type User = {
  email: string;
  username: string;
  interests: string[];
  name?: string;
  birthday?: string;
  horoscope?: string;
  zodiac?: string;
  height?: number;
  weight?: number;
  localProfile?: {
    base64profile?: string;
    gender?: string;
    height_unit?: string;
    weight_unit?: string;
  };
};
