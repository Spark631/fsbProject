function Splashscreen(props) {
  return (
    <div className={`absolute ${props.bgcolor} h-full w-full z-1000`}>
      <h1 className="color-red h-screen items-center flex justify-center align-middle text-8xl">
        {props.text}
      </h1>
    </div>
  );
}
export default Splashscreen;
