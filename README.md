# Leet Info

A frontend project to fetch and display LeetCode user statistics. It uses the LeetCode GraphQL API to show solved question counts and difficulty breakdowns.

### Features

- Fetches real-time data from LeetCode via GraphQL.
- Displays Easy, Medium, and Hard problem counts.
- Dynamic circular progress bars built using CSS conic-gradients.
- Username validation and loading states for better UX.

### How to Use

Since this is a client-side only app, it uses a proxy to bypass CORS restrictions. Before searching for a username:

1. Visit [CORS Anywhere Demo](https://cors-anywhere.herokuapp.com/corsdemo).
2. Click **"Request temporary access to the demo server"**.
3. Now you can use the search feature on the site.

### Tech Stack

- HTML5 & CSS3 (Custom Variables)
- Vanilla JavaScript (Async/Await)
- LeetCode GraphQL API
