🚀 Circuitry

📝 1. Introduction

    Circuitry is a modern and flexible blogging website designed for sharing content across a wide range of topics.
    It is suitable for personal blogs, knowledge-sharing platforms, and content-focused websites that require a clean layout, fast performance, and easy customization.

    The website is built with Next.js and focuses on simplicity, readability, and scalability.
    All content is centralized in structured data files, allowing users to update site information and articles without modifying the core application logic.

    Circuitry includes multiple homepage layouts, a fully functional blog system, responsive design for all screen sizes, and essential SEO features to help content reach a wider audience.

⚙️ 2. Requirements

    Node.js version 18 or higher
    npm, pnpm, or yarn

📦 3. Installation
    
    1. Open your terminal and navigate to the project directory.
    2. Install all required dependencies: npm install
    3. Start the development server: npm run dev
        This allows you to test and preview the website locally.
    4. Build the project for production: npm run build 
        This command generates an optimized production build ready for deployment.

🗂️ 4. Project Structure
    
    /app
        Contains all application pages and layouts, and handles routing using the Next.js App Router.

    /components
        Includes reusable UI components used throughout the application.

    /data
        Stores all website content in JSON format (such as site.json, articles.json) for easy customization and content management.

    /public
        Contains static assets such as images (.jpg, .png, .svg), videos (.mp4), and other publicly accessible files used by the website.

    /utils

        Contains shared utility functions used across the project and can be extended as the project grows.

🎨 5. Customization
    
    All customization is handled entirely within the /data folder.
    This folder contains all structured data used by the website, from global site information to blog articles.
    
    To customize the website:
        - Open the JSON files inside the data folder
        - Update the values according to your needs
        - The changes will be reflected automatically on the website

    Detailed customization instructions are provided in the HelpCustomization.html file.

    This file visually explains:
        - Which JSON file affects which part of the website
        - How changing specific fields will update the UI
        - Clear mappings from JSON data to rendered website sections

🚀 6. Build for Production

    To run the project in production mode:
        1. npm run build
        2. npm start
    
    This will start the optimized production server.

💬 7. Support
    
    Support for this theme is provided via the ThemeForest comment section.
    You can request support for:
        - Installation and setup issues
        - Configuration guidance
        - Bug reports related to the theme

    Support does not include:
        - Custom feature development
        - Major design changes
        - Third-party plugin integration

    Please note that support is limited to issues related to the original theme functionality and behavior.
