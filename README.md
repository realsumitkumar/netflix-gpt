# NetflixGPT
## Link - https://sumit-netflixgpt.vercel.app/

    - create-react-app
    - configured tailwindCSS
    - header
    - Routing of app
    - Login/Sign Up form
    - Form validation
    - useRef hook
    - firebase setup
    - create signup user account in firebase
    - implement signin user api firebase
    - created redux store with userSlice
    - implemented signout
    - update profile
    - BugFix: signup user displayName and profile picture update
    - BUgFix: if the user is not logged in redirect to /login, if logged in then to /browse and vice versa.
    - Unsubscribed to the onAuthStateChanged callback inside useEffect
    - Use TMDB apis to get data and videos of movies
    - Created custom hooks to make our code modular
    - Embedded youtube video to play in the background
    - Added multi langauge support in the search bar
    - Integrate Gemini APIs to recommend movies
    - Memoization
    - Made website responsive

# Features

    -Login/Signup
        -Signin/Login form
        -redirects to /browse page

    -/browse page(after authetication)
        -Header
        -Main movie
            -Trailer in background
            -Title and Description
            -Movie Suggestions
                MovieList * n

    -NetflixGPT
        -searchBar
        -Movie suggestions
