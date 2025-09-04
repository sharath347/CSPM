# Components Documentation

## NotLoggedIn Component

A reusable component for handling authentication states when users are not logged in. This component provides a consistent, styled interface that matches the app's dark theme.

### Usage

```jsx
import NotLoggedIn from "@/components/NotLoggedIn";

// Basic usage
if (!session) {
  return <NotLoggedIn />;
}

// Custom title and message
if (!session) {
  return (
    <NotLoggedIn
      title="Access Denied"
      message="You need to be logged in to view this page. Please sign in to continue."
    />
  );
}

// Without login button (for cases where you want custom handling)
if (!session) {
  return (
    <NotLoggedIn
      title="Access Denied"
      message="You need to be logged in to view this page."
      showLoginButton={false}
    />
  );
}
```

### Props

| Prop              | Type    | Default                             | Description                          |
| ----------------- | ------- | ----------------------------------- | ------------------------------------ |
| `title`           | string  | "Authentication Required"           | The main heading displayed           |
| `message`         | string  | "Please log in to access this page" | The descriptive text below the title |
| `showLoginButton` | boolean | true                                | Whether to show the login button     |

### Features

- **Consistent Styling**: Matches the app's dark theme with proper colors and spacing
- **Responsive Design**: Works well on all screen sizes
- **Interactive Login**: Includes a styled login button that integrates with NextAuth
- **Customizable**: Allows custom titles and messages for different contexts
- **Accessibility**: Proper semantic HTML and keyboard navigation support

### Integration

The component automatically handles:

- Navigation to the login page
- Consistent styling with the app theme
- Loading states and error handling

### Examples in the App

This component is currently used in:

- `/scans` page
- `/Services/[scan]` page
- `/dangerousfindings/[scanId]` page
- `/Findings/[scanId]/[serviceName]` page
