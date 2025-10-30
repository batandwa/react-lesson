export default function Navigation({ title, children }) {
  return (
    <nav>
      <h2>{title}</h2>
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