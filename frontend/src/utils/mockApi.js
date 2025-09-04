export const fetchDashboardData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        counts: {
          danger: 9,
          good: 138,
          warning: 10,
        },
        success: true,
      });
    }, 1000); // simulate 1 second delay
  });
};
