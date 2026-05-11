import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser, registerUser } from "../features/authSlice"; 

// shadcn/ui components
import { Button } from "./components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./components/ui/card";
import { Checkbox } from "./components/ui/checkbox";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Eye, EyeOff } from "lucide-react";

// Logo Component
const Logo = (props) => (
  <svg fill="currentColor" height="48" viewBox="0 0 40 48" width="40" {...props}>
    <clipPath id="a"><path d="m0 0h40v48h-40z" /></clipPath>
    <g clipPath="url(#a)">
      <path d="m25.0887 5.05386-3.933-1.05386-3.3145 12.3696-2.9923-11.16736-3.9331 1.05386 3.233 12.0655-8.05262-8.0526-2.87919 2.8792 8.83271 8.8328-10.99975-2.9474-1.05385625 3.933 12.01860625 3.2204c-.1376-.5935-.2104-1.2119-.2104-1.8473 0-4.4976 3.646-8.1436 8.1437-8.1436 4.4976 0 8.1436 3.646 8.1436 8.1436 0 .6313-.0719 1.2459-.2078 1.8359l10.9227 2.9267 1.0538-3.933-12.0664-3.2332 11.0005-2.9476-1.0539-3.933-12.0659 3.233 8.0526-8.0526-2.8792-2.87916-8.7102 8.71026z" />
      <path d="m27.8723 26.2214c-.3372 1.4256-1.0491 2.7063-2.0259 3.7324l7.913 7.9131 2.8792-2.8792z" />
      <path d="m25.7665 30.0366c-.9886 1.0097-2.2379 1.7632-3.6389 2.1515l2.8794 10.746 3.933-1.0539z" />
      <path d="m21.9807 32.2274c-.65.1671-1.3313.2559-2.0334.2559-.7522 0-1.4806-.102-2.1721-.2929l-2.882 10.7558 3.933 1.0538z" />
      <path d="m17.6361 32.1507c-1.3796-.4076-2.6067-1.1707-3.5751-2.1833l-7.9325 7.9325 2.87919 2.8792z" />
      <path d="m13.9956 29.8973c-.9518-1.019-1.6451-2.2826-1.9751-3.6862l-10.95836 2.9363 1.05385 3.933z" />
    </g>
  </svg>
);

export default function AuthPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Auth State
  const token = useSelector((state) => state.auth?.token);
  
  // UI State
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // --- Login Form State ---
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // --- Register Form State ---
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  // Handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username: loginUsername, password: loginPassword }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ 
      username: regUsername, 
      email: regEmail, 
      password: regPassword 
    }));
  };

  // Framer Motion Variants
  const formVariants = {
    hidden: { opacity: 0, x: isLoginView ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, x: isLoginView ? 50 : -50, transition: { duration: 0.2 } }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-2xl overflow-hidden bg-background">
          <CardHeader className="flex flex-col items-center space-y-1.5 pb-2 pt-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Logo className="w-12 h-12 text-primary" />
            </motion.div>
            <div className="space-y-1 text-center mt-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {isLoginView ? "Welcome back" : "Create an account"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isLoginView 
                  ? "Enter your credentials to access your account." 
                  : "Welcome! Fill in the details to get started."}
              </p>
            </div>
          </CardHeader>

          <CardContent className="px-8 pt-4 pb-6">
            <AnimatePresence mode="wait">
              {isLoginView ? (
                /* --- LOGIN FORM --- */
                <motion.form
                  key="login"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={handleLoginSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="login-username">Username</Label>
                    <Input 
                      id="login-username" 
                      placeholder="Enter username"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="pr-10"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full mt-4">
                    Sign in
                  </Button>
                </motion.form>
              ) : (

                /* --- REGISTER FORM --- */
                <motion.form
                  key="signup"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={handleRegisterSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="reg-username">Username</Label>
                    <Input 
                      id="reg-username" 
                      placeholder="johndoe123" 
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="reg-password"
                        type={showPassword ? "text" : "password"}
                        className="pr-10"
                        placeholder="Create a password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="terms" required />
                    <label htmlFor="terms" className="text-sm text-muted-foreground leading-none">
                      I agree to the <Link to="#" className="text-primary hover:underline">Terms</Link> and <Link to="#" className="text-primary hover:underline">Conditions</Link>
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-primary text-primary-foreground mt-4">
                    Create free account
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>

          <CardFooter className="flex justify-center border-t bg-muted/10 !py-6">
            <p className="text-center text-sm text-muted-foreground">
              {isLoginView ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLoginView(!isLoginView)}
                className="text-primary font-medium hover:underline focus:outline-none"
              >
                {isLoginView ? "Sign up" : "Sign in"}
              </button>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}