export enum Extension {
  JPG = "jpg",
  PNG = "png",
  JPEG = "jpeg",
}

export interface Base {
  id: number;
  description: string;
  thumbnail: {
    path: string;
    extension: Extension;
  };
}

export interface Creator {
  id: number;
  name: string;
}
