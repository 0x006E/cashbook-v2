const NotFound = (props) => {
  return (
    <div className="flex bg-blue-50 w-full h-full justify-center items-center">
      <div className="flex flex-grow mx-4 flex-col prose lg:prose-lg md:prose-md sm:prose-sm xl:prose-xl justify-center items-center text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-48 h-48"
          viewBox="0 0 48 48"
          enableBackground="new 0 0 48 48"
        >
          <path d="M43 48H5c-2.757 0-5-2.243-5-5V5c0-2.757 2.243-5 5-5h38c2.757 0 5 2.243 5 5v38c0 2.757-2.243 5-5 5zM5 2C3.346 2 2 3.346 2 5v38c0 1.654 1.346 3 3 3h38c1.654 0 3-1.346 3-3V5c0-1.654-1.346-3-3-3H5z"></path>
          <path d="M47 10H1a1 1 0 110-2h46a1 1 0 110 2zM6 6c-.13 0-.26-.03-.38-.08s-.23-.12-.33-.21c-.09-.101-.16-.21-.21-.33C5.03 5.26 5 5.13 5 5s.03-.26.08-.38.12-.23.21-.33c.1-.09.21-.16.33-.21.37-.16.81-.07 1.09.21.09.1.16.21.21.33.05.12.08.25.08.38s-.03.26-.08.38-.12.229-.21.33c-.1.09-.21.16-.33.21S6.13 6 6 6zm4 0c-.13 0-.26-.03-.38-.08s-.23-.12-.33-.21c-.09-.101-.16-.21-.21-.33C9.03 5.26 9 5.13 9 5s.03-.26.08-.38.12-.23.21-.33c.1-.09.21-.16.33-.21.37-.16.81-.07 1.09.21.09.1.16.21.21.33.05.12.08.25.08.38s-.03.26-.08.38-.12.229-.21.33c-.1.09-.21.16-.33.21S10.13 6 10 6zm26 29H12a1 1 0 110-2h24a1 1 0 110 2zm-3 4H15a1 1 0 110-2h18a1 1 0 110 2zm-8-8h-2c-1.654 0-3-1.346-3-3v-8c0-1.654 1.346-3 3-3h2c1.654 0 3 1.346 3 3v8c0 1.654-1.346 3-3 3zm-2-12c-.551 0-1 .448-1 1v8c0 .552.449 1 1 1h2c.551 0 1-.448 1-1v-8c0-.552-.449-1-1-1h-2zm-6 8h-6a1 1 0 01-.937-1.352l3-8a1 1 0 011.873.703L12.443 25H17a1 1 0 110 2z"></path>
          <path d="M16 31a1 1 0 01-1-1v-8a1 1 0 112 0v8a1 1 0 01-1 1zm21-4h-6a1 1 0 01-.937-1.352l3-8a1 1 0 011.873.703L32.443 25H37a1 1 0 110 2z"></path>
          <path d="M36 31a1 1 0 01-1-1v-8a1 1 0 112 0v8a1 1 0 01-1 1z"></path>
        </svg>
        <h1>Not Found</h1>
        <pre>Current URI: "{props.uri}"</pre>
        <p>If you think this is a mistake, please wait a few more seconds.🕔</p>
      </div>
    </div>
  );
};

export default NotFound;
