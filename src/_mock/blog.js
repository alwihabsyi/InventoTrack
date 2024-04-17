import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [
  'Nasywa Agra Nasution',
  'Faradhiya Aulia Rahma',
  'Audy Fitri Ariani',
  'Kartika Aulia',
  'Nasywa Agra Nasution',
  'Faradhiya Aulia Rahma',
  'Audy Fitri Ariani',
  'Kartika Aulia',
  'Nasywa Agra Nasution',
  'Faradhiya Aulia Rahma',
  'Audy Fitri Ariani',
  'Kartika Aulia',
  'Nasywa Agra Nasution',
  'Faradhiya Aulia Rahma',
  'Audy Fitri Ariani',
  'Kartika Aulia',
  'Nasywa Agra Nasution',
  'Faradhiya Aulia Rahma',
  'Audy Fitri Ariani',
  'Kartika Aulia',
  'Nasywa Agra Nasution',
  'Faradhiya Aulia Rahma',
  'Audy Fitri Ariani',
  'Kartika Aulia',
];

export const posts = [...Array(23)].map((_, index) => ({
  id: faker.string.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past(),
  view: faker.number.int(99999),
  comment: faker.number.int(99999),
  share: faker.number.int(99999),
  favorite: faker.number.int(99999),
  author: {
    name: faker.person.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));
