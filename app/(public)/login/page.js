import React from 'react';

const Login = () => {
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h2>

                    <form>
                        {/* Email Field */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-lg font-semibold text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Remember Me Checkbox */}
                        <div className="flex items-center mb-6">
                            <input
                                type="checkbox"
                                id="remember"
                                name="remember"
                                className="h-5 w-5 text-blue-500 focus:ring-0"
                            />
                            <label htmlFor="remember" className="ml-2 text-lg text-gray-700">
                                Remember Me
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Log In
                        </button>
                    </form>

                    {/* Additional Links */}
                    <div className="flex justify-between items-center mt-6">
                        <a href="#" className="text-blue-500 hover:text-blue-600">Forgot Password?</a>
                        <a href="#" className="text-blue-500 hover:text-blue-600">Create an Account</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;