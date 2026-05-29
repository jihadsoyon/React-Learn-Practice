const items = Array.from({ length: 10000 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`
}));

export default items;