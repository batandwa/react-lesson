import logo from '/sample.png';

/**
 * Logo Component
 *
 * This functional component displays the application's logo.
 * It demonstrates how to import and use static assets (like images) in a React component
 * and how to apply inline styles based on props.
 *
 * Props:
 * - `logoWidth` (string, optional): The desired width of the logo.
 *   If not provided, it defaults to "200px". This shows how to provide default values for props.
 *
 * Key Concepts:
 * 1. **Asset Import**: The `logo` is imported directly from the `public` directory.
 *    In Vite (and Create React App), files in the `public` directory can be referenced
 *    with a leading slash. Vite will handle serving these files.
 *    @see {@link https://vitejs.dev/guide/assets.html#public-assets}
 * 2. **Inline Styles**: The component uses a `styles` object to apply CSS properties
 *    directly to the `<img>` tag. This is a quick way to apply styles, especially when
 *    they are dynamic (based on props).
 *    @see {@link https://react.dev/learn/adding-styles#styling-with-inline-styles}
 * 3. **Default Props**: The line `width: props.logoWidth || "200px"` provides a default
 *    value for the width if `props.logoWidth` is not passed. This is a simple way to
 *    make props optional.
 *    @see {@link https://react.dev/learn/passing-props-to-a-component#specifying-a-default-value-for-a-prop}
 *
 * @param {object} props - The properties passed to the component.
 * @param {string} [props.logoWidth="200px"] - The width of the logo. Defaults to "200px".
 * @returns {JSX.Element} An image element displaying the logo.
 */
export default function Logo(props) {
    // Define a styles object for the image.
    // The `height` is fixed, while the `width` is determined by the `logoWidth` prop.
    // If `props.logoWidth` is not provided (or is falsy), it defaults to "200px".
    const styles = { 
        height: "100px",
        width: props.logoWidth || "200px",
    };

    return (
        <img 
            src={logo}          // The imported logo image.
            className="logo react" // CSS classes for styling, likely defined in a CSS file.
            alt="React logo"    // Alt text for accessibility, describing the image.
            style={styles}      // Apply the inline styles defined above.
        />
    );
}
