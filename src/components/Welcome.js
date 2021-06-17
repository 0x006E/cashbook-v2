const Welcome = () => (
  <div className="flex bg-blue-50 w-full h-full justify-center items-center">
    <div className="flex flex-grow mx-4 flex-col prose lg:prose-lg md:prose-md sm:prose-sm xl:prose-xl justify-center items-center ">
    <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <h1>Welcome!..</h1>
      <p>
        If you are wondering why you are here, instead of the data entry pages
        then please click on the icons left-most navigaton menu.{" "}
      </p>
      <p>Thanks for using this. Bye 👋</p>
    </div>
  </div>
);

export default Welcome;
