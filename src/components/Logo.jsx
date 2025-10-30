import logo from '/sample.png';
export default function Logo(props) {
    const styles = { 
        height: "100px",
        width: props.logoWidth || "200px",
    };
    return (
        <img src={logo} className="logo react" alt="React logo" style={styles} />
    );
}
