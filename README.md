## <a name="tech-stack">⚙️ Tech Stack</a>

- Node.js
- Next.js
- TypeScript
- TailwindCSS
- Shadcn
- Stripe
- Zustand
- Firebase
- Mogodb

## <a name="features">🔋 Features</a>

👉 **Authentication (CRUD) with NextAuth:** User management through NextAuth, ensuring secure and efficient authentication.

👉 **Products (CRUD):** Comprehensive functionality for creating, reading, updating, and deleting Products.

- **Create Products:** Only Admin can effortlessly generate new Products, providing essential details such as title, image, description, and any additional information.
- **Read Products:** Seamless access to a detailed view of all products, allowing users to explore products specifics, including descriptions, title, and related information.
- **Update Products:** Allow the admin to modyify details dynamically, ensuring that products information remains accurate and up-to-date.
- **Delete Products:** A straightforward process for removing products from the system, giving administrators the ability to manage and curate the platform effectively.

👉 **Related products:** Smartly connects products that are related and displaying on the product details page, making it more engaging for users

👉 **Search & Filter:** Empowering users with a robust search and filter system, enabling them to easily find the products that match their preferences.

👉 **New Category:** Dynamic categorization allows for the seamless addition of new product categories, keeping your platform adaptable.

👉 **Checkout and Pay with Stripe:** Smooth and secure payment transactions using Stripe, enhancing user experience during the checkout process.

👉 **product Orders:** Comprehensive order management system, providing a clear overview of all product-related transactions.

and many more, including code architecture and reusability

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Environment Variables

Create a new file named .env in the root of your project and add the following content:

```bash
#MONGODB
MONGODB_URI =

#NEXTAUTH
NEXTAUTH_SECRET =
GOOGLE_ID =
GOOGLE_SECRET =
NODE_ENV =

#NEXT
NEXT_PUBLIC_URL =

#FIREBASE
FIREBASE_API_KEY =

#STRIPE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY =
STRIPE_SECRET_KEY =
```
