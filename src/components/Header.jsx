import Logo from "./Logo";

/**
 * Header Component
 *
 * This functional component represents the header section of the application.
 * It displays a logo, any children elements passed to it, and a title.
 *
 * Props:
 * - `title` (string): The main title to be displayed in the header.
 * - `children` (ReactNode): Any child elements that should be rendered within the header.
 *   This allows for flexible content to be inserted between the logo and the title.
 *
 * In React, `props` (properties) are how components receive data from their parent.
 * The `children` prop is a special prop that allows components to be passed as data
 * to other components, similar to how you might pass arguments to a function.
 *
 * Read more about props:
 * @see {@link https://react.dev/learn/passing-props-to-a-component}
 *
 * Read more about children:
 * @see {@link https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children}
 */
export default function Header(props) {
    return (
        <>
            <Logo logoWidth="10px" />
            {props.children}
            <h1>{props.title}</h1>
        </>
    )
}
