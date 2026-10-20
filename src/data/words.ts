export type Word = {
  word: string;
  emoji: string;
  meaning: string;
  example: string;
  category: "Animals" | "Food" | "Nature" | "Feelings";
};

export const words: Word[] = [
  { word: "Elephant", emoji: "🐘", meaning: "A very big grey animal with a long trunk.", example: "The elephant sprayed water with its trunk.", category: "Animals" },
  { word: "Rabbit", emoji: "🐰", meaning: "A small furry animal with long ears that hops.", example: "The rabbit hopped across the garden.", category: "Animals" },
  { word: "Apple", emoji: "🍎", meaning: "A round, crunchy fruit that can be red or green.", example: "I eat an apple every day.", category: "Food" },
  { word: "Banana", emoji: "🍌", meaning: "A long yellow fruit that you peel.", example: "Monkeys love to eat bananas.", category: "Food" },
  { word: "Rainbow", emoji: "🌈", meaning: "Colourful arcs in the sky after rain.", example: "We saw a rainbow after the storm.", category: "Nature" },
  { word: "Mountain", emoji: "⛰️", meaning: "A very high hill made of rock.", example: "Snow covers the top of the mountain.", category: "Nature" },
  { word: "Happy", emoji: "😊", meaning: "Feeling good and full of joy.", example: "I feel happy when I play with friends.", category: "Feelings" },
  { word: "Brave", emoji: "🦁", meaning: "Not afraid to do something hard or scary.", example: "She was brave at the doctor's office.", category: "Feelings" },
];
