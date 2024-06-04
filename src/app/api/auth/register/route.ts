import connectToDb from "@/lib/db";
import { User } from "@/models/UserModels";
import bcrypt from "bcryptjs";

export const POST = async (req: any) => {
  try {
    const { name, email, password } = await req.json();

    await connectToDb();

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return new Response(
        JSON.stringify({
          user: null,
          message: "Email address is already in use.",
        }),
        { status: 409 } // Conflict
      );
    }
    // Hash the password
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hash,
    });

    await newUser.save();

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Internal server error." }), {
      status: 500,
    });
  }
};
