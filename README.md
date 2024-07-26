## <a name="introduction">🎉 Introduction</a>

**Trendy** is a comprehensive e-commerce platform designed to provide a seamless shopping experience. The application offers robust authentication, product management, dynamic categorization, and secure checkout features.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Node.js
- Next.js
- TypeScript
- TailwindCSS
- Shadcn
- Stripe
- Zustand
- Firebase
- MongoDB
- Resend

## <a name="features">🔋 Features</a>

👉 **Authentication (CRUD) with NextAuth:** User management through NextAuth, ensuring secure and efficient authentication.

👉 **Products (CRUD):** Comprehensive functionality for creating, reading, updating, and deleting products.

- **Create Products:** Admin can effortlessly generate new products, providing essential details such as title, image, description, and any additional information.
- **Read Products:** Seamless access to a detailed view of all products, allowing users to explore product specifics, including descriptions, title, and related information.
- **Update Products:** Allow the admin to modify details dynamically, ensuring that product information remains accurate and up-to-date.
- **Delete Products:** A straightforward process for removing products from the system, giving administrators the ability to manage and curate the platform effectively.

👉 **Related Products:** Smartly connects products that are related and displays them on the product details page, making it more engaging for users.

👉 **Search & Filter:** Empowering users with a robust search and filter system, enabling them to easily find the products that match their preferences.

👉 **New Category:** Dynamic categorization allows for the seamless addition of new product categories, keeping your platform adaptable.

👉 **Checkout and Pay with Stripe:** Smooth and secure payment transactions using Stripe, enhancing user experience during the checkout process.

👉 **Product Orders:** Comprehensive order management system, providing a clear overview of all product-related transactions.

👉 **Send Email:** Send an email to confirm the customer order after completing the checkout process.

… and many more, including code architecture and reusability.

## <a name="prerequisites">🔧 Prerequisites</a>

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## <a name="installation">🚀 Installation</a>

1.  Clone the repository:
    ```bash
    git clone https://github.com/YousifMHelal/trendy.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd trendy
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Create a new file named `.env` in the root of your project and add the following content:

    ```bash
    #MONGODB
    MONGODB_URI=your_mongodb_uri

    #NEXTAUTH
    NEXTAUTH_SECRET=your_nextauth_secret
    GOOGLE_ID=your_google_id
    GOOGLE_SECRET=your_google_secret
    NODE_ENV=development

    #NEXT
    NEXT_PUBLIC_URL=your_public_url

    #FIREBASE
    FIREBASE_API_KEY=your_firebase_api_key

    #STRIPE
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    STRIPE_SECRET_KEY=your_stripe_secret_key

    #RESEND
    RESEND_API_KEY=your_resend_api_key
    ```

5.  Run the development server:
    ```bash
    npm run dev
    ```
6.  Open http://localhost:3000 with your browser to see the result.

## <a name="usage">📘 Usage</a>

- **Admin Panel**: Access the admin panel to manage products and categories.
- **Product Search**: Use the search and filter functionality to find specific products.
- **Checkout**: Add products to the cart and proceed to checkout using Stripe.
