import {
  IMAGE_STYLE,
  VIDEO_STYLE,
  DIALOGUE_STYLE,
  EMOJI_STYLE
} from './config';

export const questions = {
  'Category 1-10': {
    type: 'text',
    q: `Sample question 1-10	`,
    a: 'Sample answer 1-10',
  },
  'Category 1-20': {
    type: 'image',
    q: `<img src="./images/cat1_20.png" style="${IMAGE_STYLE}" /><br>Who is this`,
    a: 'Sample answer 1-20',
  },
  'Category 1-30': {
    type: 'audio',
    q: `<audio controls src="./audio/cat1_30.mp3"></audio><br>Guess the sound`,
    a: 'Sample answer 1-30',
  },
  'Category 1-40': {
    type: 'video',
    q: `<video controls src="./videos/cat1_40.mp4" style="${VIDEO_STYLE}"></video><br>Guess the scene`,
    a: 'Sample answer 1-40',
  },
  'Category 2-10': {
    type: 'text',
    q: `Sample question 2-10	`,
    a: 'Sample answer 2-10',
  },
  'Category 2-10': {
    type: 'text',
    q: `Sample question 4-10	`,
    a: 'Sample answer 4-10',
  },
  'Category 2-20': {
    type: 'image',
    q: `<img src="./images/cat2_20.png" style="${IMAGE_STYLE}" /><br>Guess the character`,
    a: 'Sample answer 2-20',
  },
  'Category 2-20': {
    type: 'image',
    q: `<img src="./images/cat4_20.png" style="${VIDEO_STYLE}" /><br>Guess the character`,
    a: 'Sample answer 4-20',
  },
  'Category 2-30': {
    type: 'audio',
    q: `<audio controls src="./audio/cat2_30.mp3"></audio><br>Whose Song`,
    a: 'Sample answer 2-30',
  },
  'Category 2-30': {
    type: 'audio',
    q: `<audio controls src="./audio/cat4_30.mp3"></audio><br>Guess the sound`,
    a: 'Sample answer 4-30',
  },
  'Category 2-40': {
    type: 'video',
    q: `<video controls src="./videos/cat2_40.mp4" style="${IMAGE_STYLE}"></video><br>Guess the scene`,
    a: 'Sample answer 2-40',
  },
  'Category 2-40': {
    type: 'video',
    q: `<video controls src="./videos/cat4_40.mp4" style="${VIDEO_STYLE}"></video><br>Guess the scene`,
    a: 'Sample answer 4-40',
  },
  'Category 3-10': {
    type: 'text',
    q: `Sample question 3-10	`,
    a: 'Sample answer 3-10',
  },
  'Category 3-20': {
    type: 'image',
    q: `<img src="./images/cat3_20.png" style="${IMAGE_STYLE}" /><br>Guess the character`,
    a: 'Sample answer 3-20',
  },
  'Category 3-30': {
    type: 'audio',
    q: `<audio controls src="./audio/cat3_30.mp3"></audio><br>Guess the sound`,
    a: 'Sample answer 3-30',
  },
  'Category 3-40': {
    type: 'video',
    q: `<video controls src="./videos/cat3_40.mp4" style="${VIDEO_STYLE}"></video><br>Whats happening`,
    a: 'Sample answer 3-40',
  },
};
