function getBigrams(str) {
  const bigrams = new Set();
  for (let i = 0; i < str.length - 1; i += 1) {
    bigrams.add(str.substring(i, i + 2));
  }
  return bigrams;
}
  
function intersect(set1, set2) {
  return new Set([...set1].filter((x) => set2.has(x)));
}
  
function diceCoefficient(str1, str2) {
  const bigrams1 = getBigrams(str1);
  const bigrams2 = getBigrams(str2);
  return (2 * intersect(bigrams1, bigrams2).size) / (bigrams1.size + bigrams2.size);
}

function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}
// function to toggle between light and dark theme
function toggleTheme() {
 if (localStorage.getItem('theme') === 'theme-dark'){
     setTheme('theme-light');
 } else {
     setTheme('theme-dark');
 }
}

if (localStorage.getItem('theme') === 'theme-dark') {
  setTheme('theme-dark');
} else {
  setTheme('theme-light');
}