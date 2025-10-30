import Logo from "./Logo";

export default function Header(props) {
    return (
        <>
            <Logo logoWidth="10px" />
            {props.children}
            <h1>{props.title}</h1>
        </>
    )
}
