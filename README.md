# Donation Site

This is a React-based donation site that allows users to make donations either anonymously or with their name. The platform supports donations in Israeli shekels (NIS) and dollars (USD) and provides features to sort, search, and display donation statistics.

## Features

- **Add Donations**: Users can make a donation in their name or anonymously.
  - Minimum donation amount is 10 NIS.
  - Option to donate in either Israeli shekels or dollars.
- **Sort Donations**: Donations can be sorted by:
  - Time of donation (oldest or newest)
  - Donation amount
- **Search Donations**: Search by donor name or dedication.
- **Donation Statistics**:
  - Shows how long ago each donation was made.
  - Tracks the campaign goal, which can be easily updated by the admin.
  - Displays the percentage of the goal achieved, the total sum of donations, and the number of donors.
- **Responsive Design**: Built with MUI components for a responsive and clean UI.
- **RTL (Right-To-Left) Support**: The application supports RTL layout using `@emotion/react` and RTL plugins for proper display of Hebrew and similar languages.

## AddDonation Form

The `AddDonation` form allows users to submit a donation with the following fields:

- **Name of Donor**: Optionally leave the name as "Anonymous".
- **Donation Amount**: The minimum required amount is 10 NIS.
- **Dedication**: Users can add a personal dedication to their donation.

Form validation includes:
- Name should consist of letters (not numbers).
- Donation amount must be greater than 0.

If validation passes, the donation is added to the list, and a confirmation message is displayed. The form uses MUI components and implements RTL styling for Hebrew text.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/donation-site.git
cd donation-site
```

2. Install dependencies:

```bash
npm install
```

3. Run the application:

```bash
npm start
```

The app should now be running on `http://localhost:3000`.

## Code Overview

### Components

- **App.js**: Main application component that sets up routing, handles global state (such as currency conversion), and integrates the Navbar, Donation Form, and Donation List components.
- **NavBar.js**: A responsive navigation bar that includes buttons to change the background style (day/night) and switch between currencies.
- **Donation Form**: A form to submit new donations, including fields for the donor's name, donation amount, and dedication.
- **Donations.js**: Displays the list of donations, with sorting functionality.
- **SelectBySort.js**: Provides sorting options for the donation list (by time and donation amount).
- **Home.js**: A home page component that welcomes users to the donation site.

### State Management

- **Context API**: The app uses React's Context API to manage the global state, including the background style (day/night) and currency conversion (ILS/USD).
- **useState Hook**: For managing component-specific states like the list of donations, the current currency rate, and the sorting method.

### RTL Support

The app supports RTL layout using `@emotion/react` with `stylis-plugin-rtl` and `prefixer` for proper text alignment and display in languages like Hebrew.

## API Integration

- **Currency Conversion**: The application integrates with an external API to fetch the latest ILS to USD conversion rate:
  
  `https://api.currencyapi.com/v3/latest`

  If the API request fails, the app will display donations only in Israeli shekels (NIS).

## Future Enhancements

- Add user authentication to allow users to track their donations.
- Include more detailed donation statistics, such as average donation amount.
- Allow setting different campaign goals for various projects.

## Dependencies

```json
{
  "dependencies": {
    "@emotion/react": "^11.11.3",
    "@emotion/styled": "^11.11.0",
    "@fontsource/roboto": "^5.0.8",
    "@mui/icons-material": "^5.15.1",
    "@mui/material": "^5.15.1",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.6.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.1",
    "react-scripts": "5.0.1",
    "stylis-plugin-rtl": "^2.1.1",
    "web-vitals": "^2.1.4"
  }
}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

