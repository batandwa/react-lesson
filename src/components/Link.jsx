export default function Link({url, title, children}) {
    return (
        <a href={url} title={title}>{children}</a>
    );
}
