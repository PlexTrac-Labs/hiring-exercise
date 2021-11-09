interface props {
  left?: JSX.Element | JSX.Element[];
  middle?: JSX.Element | JSX.Element[];
  right?: JSX.Element | JSX.Element[];
}

const TitleBar: React.FC<props> = ({ left, middle, right }) => {
  return (
    <div
      style={{
        width: `calc(100% - 30px)`,
        padding: "5px 15px",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "lightgray"
      }}
    >
      <div>{left}</div>
      <div>{middle}</div>
      <div>{right}</div>
    </div>
  );
};
export default TitleBar;
