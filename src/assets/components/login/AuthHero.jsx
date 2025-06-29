import { useState } from "react";
import {
  User,
  Lock,
  Mail,
  Eye,
  EyeOff
} from "lucide-react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../utils/firebase"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../userContext";

const AuthHero = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUserEmail } = useUser();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = formData;
    setError("");
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(
          doc(db, "users", user.uid),
          {
            name,
            email,
            uid: user.uid,
            provider: "email",
            role: "user",
            photoURL: user.photoURL || "",
            createdAt: new Date(),
          },
          { merge: true }
        );

        setUserEmail(email);
        alert("Logged in successfully!");
        navigate("/");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          name,
          email,
          uid: user.uid,
          provider: "email",
          role: "user",
          createdAt: new Date(),
        });

        setUserEmail(email);
        alert("Account created successfully!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
          provider: "google",
          role: "user",
          createdAt: new Date(),
        },
        { merge: true }
      );

      setUserEmail(user.email);
      alert("Signed in with Google!");
      setTimeout(() => navigate("/"), 100);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 text-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-emerald-600 p-6 text-center">
          <h1 className="text-2xl font-bold">
            {isLogin ? "Welcome Back" : "Join SafeBite"}
          </h1>
          <p className="text-white text-sm">
            {isLogin ? "Login to your account" : "Create a new account"}
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-emerald-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-700 text-white pl-10 pr-4 py-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-emerald-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-700 text-white pl-10 pr-4 py-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-emerald-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-slate-700 text-white pl-10 pr-10 py-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-emerald-400 hover:text-emerald-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={toggleAuthMode}
              className="text-sm text-emerald-400 hover:underline"
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between text-gray-400 text-sm">
            <div className="border-t border-slate-600 w-full" />
            <span className="px-3">or</span>
            <div className="border-t border-slate-600 w-full" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="mt-4 w-full bg-white text-slate-800 font-medium py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="w-5 h-5"
              alt="Google"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthHero;
