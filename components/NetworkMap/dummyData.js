import manImg from '../../images/man.png'

export default {
  nodes: [
    {
      id: 1,
      shape: 'circularImage',
      size: 50,
      label: 'European Union',
      image: 'https://euro.indiana.edu/images/photo-essay/MMEU-768x768.jpg',
    },
    {
      id: 2,
      shape: 'image',
      image: 'http://clipart-library.com/images/8cxKqXjKi.png',
    },
    {
      id: 3,
      size: 30,
      shape: 'hexagon',
      color: '#A4E063',
      borderWidth: 0,
    },
    {
      id: 4,
      size: 30,
      shape: 'hexagon',
      color: '#A4E063',
      borderWidth: 0,
    },
    {
      id: 5,
      size: 30,
      shape: 'hexagon',
      color: '#A4E063',
      borderWidth: 0,
    },
    {
      id: 6,
      size: 30,
      shape: 'hexagon',
      color: '#A4E063',
      borderWidth: 0,
    },
    {
      id: 7,
      size: 30,
      shape: 'hexagon',
      color: '#A4E063',
      borderWidth: 0,
    },
    {
      id: 8,
      size: 30,
      shape: 'image',
      image: manImg,
      borderWidth: 0,
    },
  ],
  edges: [
    { from: 3, to: 1 },
    { from: 1, to: 4 },
    { from: 1, to: 5 },
    { from: 1, to: 6 },
    { from: 6, to: 2 },
    {
      from: 6,
      to: 7,
      smooth: true,
      dashes: true,
      arrows: { to: { enabled: false } },
    },
  ],
}
