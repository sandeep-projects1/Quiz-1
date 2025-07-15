import {
  IMAGE_CROP_STYLE,
  SMALL_IMAGE_STYLE,
  BIG_IMAGE_STYLE,
  CROP_DIALOGUE_STYLE,
  EMOJI_STYLE,
} from './config';

export const categoryNames = {
  1: 'MY EYES',
  2: 'FANCY GUESTS',
  3: "It's all RELATIVE",
  4: 'Dates',
  5: 'The one with ALL',
  6: 'OH MY GOD!!',
  7: 'F.R.I.E.N.D.S.',
  8: 'How you doing',
};

export const questions = {
  'Category 1-10': {
    q: `<img src="./images/FRIENDS2/Janice.png" style="${BIG_IMAGE_STYLE}" /><br>
    Guess the character`,
    a: 'Janice',
  },

  'Category 5-100': {
    q: 'From the episode “The One With All the Resolutions”. What were the resolution for everyone.',
    a: 'Rachel promises to stop gossiping.<br/>Monica tries to take more pictures of the group.<br/>Phoebe wants to pilot a commercial aircraft.<br/>Joey wants to learn the guitar.<br/>Chandler must stop making jokes.<br/>Ross wants to try something new each day. ',
  },

  'Category 8-80': {
    q: `Mac Machiavelli and <br/> Computerised Humanoid Electronically Enhanced Secret Enforcer<br/>What was the show called?`,
    a: 'Mac and C.H.E.E.S.E.',
  },
};
