/**
 * Navigation Component
 *
 * This functional component renders a navigation bar (`<nav>`).
 * It's designed to be a container for navigation links, typically displayed as a list.
 *
 * Props:
 * - `title` (string): The title for the navigation section, rendered in an `<h2>` tag.
 * - `children` (ReactNode): The child elements to be rendered inside the navigation's
 *   unordered list (`<ul>`). This allows the parent component to pass in the actual
 *   navigation links (e.g., `<li>` elements containing `<a>` or `<Link>` components).
 *
 * This component is a good example of a "layout" or "container" component. It doesn't
 * handle much logic itself but provides a consistent structure for its children.
 * The use of `props.children` makes it highly flexible, as any valid JSX can be passed
 * as children, allowing for dynamic content.
 *
 * Read more about composition with children:
 * @see {@link https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children}
 *
 * @param {object} props - The properties passed to the component.
 * @param {string} props.title - The title for the navigation.
 * @param {React.ReactNode} props.children - Child elements to be rendered within the navigation list.
 * @returns {JSX.Element} A navigation element containing a title and a list of children.
 */
export default function Navigation({ title, children }) {
  return (
    <nav>
      {/* The title for the navigation section. */}
      <h2>{title}</h2>
      {/* An unordered list to hold the navigation items (children). */}
      <ul>
        {children}
      </ul>
    </nav>
  );
}




//   const [searchTerm, setSearchTerm] = React.useState("");
  
//   const filteredChildren = React.Children.toArray(children).filter((child) => {
//     if(!searchTerm) return true;

//     if (React.isValidElement(child) && child.props.title) {
//       return child.props.title.toLowerCase().includes(searchTerm.toLowerCase());
//     }
//     return false;
//   });
