const descriptions = {
  DEFAULT: {
    title: 'A Nation with a Rich History',
    text: 'This country has a fascinating history shaped by geography, culture, and the resilience of its people. From ancient civilizations to modern achievements, it continues to play an important role on the global stage, contributing to science, arts, and international relations.',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&q=80',
  },
  BRA: {
    title: 'The Heart of South America',
    text: 'Brazil is the largest country in both South America and Latin America. At 8.5 million square kilometers and with over 214 million people, it is the world\'s fifth-largest country by area and the seventh most populous. Its rich biodiversity is headlined by the Amazon River basin, a vast tropical forest home to diverse wildlife.',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=500&q=80',
  },
  USA: {
    title: 'Land of Opportunity',
    text: 'The United States of America is a federal republic composed of 50 states. Spanning almost the entire North American continent, it is the world\'s third-largest country by area and third-most populous. Known for its cultural diversity, technological innovation, and global influence across culture, economy, and politics.',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=500&q=80',
  },
  JPN: {
    title: 'The Land of the Rising Sun',
    text: 'Japan is an island country in East Asia known for its stunning contrast of ancient tradition and hyper-modern technology. With a culture refined over millennia—spanning samurai, tea ceremonies, and cherry blossoms—alongside cutting-edge robotics and anime, Japan remains one of the world\'s most distinctive nations.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80',
  },
  FRA: {
    title: 'La République Française',
    text: 'France is a country in Western Europe known for its art, gastronomy, and culture. Paris, its capital, is known worldwide for the Eiffel Tower and as a major center for fashion, science, and art. France is the world\'s most-visited country and has had a profound influence on global civilization.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80',
  },
  DEU: {
    title: 'The Heart of Europe',
    text: 'Germany is a country with a rich history and a leading role in European and world affairs. Known for its engineering excellence, the legacy of Beethoven and Goethe, and its dramatic transformation after World War II, Germany today is the most populous country in the EU and Europe\'s largest economy.',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&q=80',
  },
}

export function getDescription(cca3) {
  return descriptions[cca3] || descriptions['DEFAULT']
}