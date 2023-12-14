export const collectionsSeedJson = [{ name: 'Pat' }, { name: 'Celtics' }];

export type ImageSeed = {
  url: string;
  title: string;
  alt?: string;
  collectionName?: string;
};

export const imagesSeedJson: ImageSeed[] = [
  {
    url: 'https://pbs.twimg.com/profile_images/1576682558028382208/k14lH7Xi_400x400.jpg',
    title: 'PPPAAATTT',
    alt: 'Image of Pat as triangles',
    collectionName: 'Pat',
  },
  {
    url: 'https://pbs.twimg.com/profile_images/1729900721695244289/qr4IVsnn_400x400.jpg',
    title: 'Celtics',
    alt: 'Celtics log',
    collectionName: 'Celtics',
  },
  {
    url: 'https://pbs.twimg.com/profile_images/1614721246922514434/_JrJnZ6j_400x400.jpg',
    title: 'Triangles',
    alt: 'Triangles',
  },
];

export const categoriesSeedJson = [
  { name: 'Person' },
  { name: 'Place' },
  { name: 'Thing' },
  { name: 'Animal' },
  { name: 'Other' },
];

export const tagsSeedJson = [
  { name: 'male', categoryName: 'Person', imageName: 'PPPAAATTT' },
  { name: 'new york', categoryName: 'Place', imageName: 'PPPAAATTT' },
  { name: 'AI', categoryName: 'Other', imageName: 'PPPAAATTT' },
  { name: 'boston', categoryName: 'Place', imageName: 'Celtics' },
  { name: 'logo', categoryName: 'Other', imageName: 'Celtics' },
  { name: 'computer', categoryName: 'Thing', imageName: 'Triangles' },
  { name: 'triangle', categoryName: 'Thing', imageName: 'Triangles' },
  { name: 'dog', categoryName: 'Animal' },
  { name: 'cat', categoryName: 'Animal' },
  { name: 'bird', categoryName: 'Animal' },
];
