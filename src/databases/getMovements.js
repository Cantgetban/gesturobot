const MOVEMENTS_API_URL = "https://example.com/api/movements";

export const getMovements = async () => {
  try {
    const response = await fetch(MOVEMENTS_API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    console.warn("Failed to fetch movements from API, using hardcoded list instead");
    // return a hardcoded list of movements as a fallback
    return [
      { id: 1, name: "Go left", description: "Move the robot to the left", videoUrl: "/videos/go_left.mp4" },
      { id: 2, name: "Go right", description: "Move the robot to the right", videoUrl: "/videos/go_right.mp4" },
      { id: 3, name: "Go forward", description: "Move the robot forward", videoUrl: "/videos/go_forward.mp4" },
      { id: 4, name: "Go backward", description: "Move the robot backward", videoUrl: "/videos/go_backward.mp4" },
    ];
  }
};
