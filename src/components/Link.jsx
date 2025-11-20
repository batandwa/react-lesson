/**
 * Link Component
 *
 * This is a reusable functional component that renders a standard HTML anchor (<a>) tag.
 * It abstracts the common attributes of a link, making it easier to create consistent
 * links throughout the application.
 *
 * Props:
 * - `url` (string): The destination URL for the link. This is passed to the `href` attribute.
 * - `title` (string): The title attribute for the link. This provides additional information
 *   about the link, often displayed as a tooltip by browsers. It's also important for accessibility.
 * - `children` (ReactNode): The content to be displayed inside the link. This can be a string,
 *   another React component, or any valid JSX.
 *
 * This component is a good example of creating reusable UI elements in React. By encapsulating
 * the <a> tag and its common props, you can ensure consistency and reduce boilerplate code.
 *
 * Read more about reusable components:
 * @see {@link https://react.dev/learn/thinking-in-react#step-3-break-the-ui-into-a-component-hierarchy}
 *
 * @param {object} props - The properties passed to the component.
 * @param {string} props.url - The URL for the link's href attribute.
 * @param {string} props.title - The title attribute for the link.
 * @param {React.ReactNode} props.children - The content to be rendered within the link.
 * @returns {JSX.Element} An anchor tag element with the specified props.
 */
export default function Link({url, title, children}) {
    return (
        <a href={url} title={title}>{children}</a>
    );
}
